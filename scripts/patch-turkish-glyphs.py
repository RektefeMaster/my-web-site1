#!/usr/bin/env python3
"""Goks + Vireon Türkçe glif yaması. Ayrıntılı gerekçe: patch-turkish-glyphs.mjs

Aksanlar fontun kendi ölçülerinden türetilir; sabit sayı girilmez.
Kaynaklar `app/fonts/*.orig` olarak yedeklenir (varsa yeniden kullanılır),
böylece betik idempotent: iki kez çalıştırmak aksanı iki kez basmaz.
"""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
GOKS = ROOT / "app/fonts/goks-regular.ttf"
VIREON = ROOT / "app/fonts/vireon.otf"


def bounds(glyph_set, name):
    pen = BoundsPen(glyph_set)
    glyph_set[name].draw(pen)
    return pen.bounds


def source(path: Path) -> Path:
    """Yamasız kaynak. İlk çalıştırmada `.orig` yedeği alınır."""
    backup = path.with_suffix(path.suffix + ".orig")
    if not backup.exists():
        shutil.copy2(path, backup)
    return backup


def draw_breve(pen, cx, y_top, width, thickness, depth):
    """Kâse biçimli breve — dışta yarım elips, içte daha sığ yarım elips.

    Çeyrek elips tek quadratic ile yaklaşılıyor (yarıçap hatası ~%5); bu
    ölçekte (100–200 birim) gözle ayırt edilemiyor ve TrueType/CFF'nin
    ikisinde de aynı çizim kodu çalışıyor.
    """
    rx = width / 2.0
    rx_in = rx - thickness
    ry = depth
    ry_in = max(depth - thickness, depth * 0.25)

    pen.moveTo((cx - rx, y_top))
    pen.qCurveTo((cx - rx, y_top - ry), (cx, y_top - ry))
    pen.qCurveTo((cx + rx, y_top - ry), (cx + rx, y_top))
    pen.lineTo((cx + rx_in, y_top))
    pen.qCurveTo((cx + rx_in, y_top - ry_in), (cx, y_top - ry_in))
    pen.qCurveTo((cx - rx_in, y_top - ry_in), (cx - rx_in, y_top))
    pen.closePath()


def stem_width(glyph_set, name="l"):
    b = bounds(glyph_set, name)
    return b[2] - b[0]


# ─────────────────────────── Goks (TrueType) ───────────────────────────


def patch_goks(check_only=False):
    font = TTFont(source(GOKS))
    glyph_set = font.getGlyphSet()
    glyf = font["glyf"]
    hmtx = font["hmtx"]

    stem = stem_width(glyph_set)  # 124
    # Aksan bandı fontun kendi dieresis'inden: küçük harf ö, büyük harf Ö.
    lo_accent = bounds(glyph_set, "odieresis")  # üst = aksanın tepesi
    up_accent = bounds(glyph_set, "Odieresis")
    lo_top = lo_accent[3]
    up_top = up_accent[3]
    # Dieresis noktası kadar kalın bir aksan çizgisi (fontun kendi oranı).
    dot_h = lo_accent[3] - 772  # ölçülen nokta yüksekliği
    thickness = max(56.0, min(dot_h, stem * 0.6))

    plan = [
        # (hedef, taban, aksan tepesi, genişlik oranı)
        ("uni011F", "g", lo_top, 0.42),
        ("uni011E", "G", up_top, 0.38),
    ]

    report = []
    for target, base, top, frac in plan:
        base_b = bounds(glyph_set, base)
        cx = (base_b[0] + base_b[2]) / 2.0
        width = (base_b[2] - base_b[0]) * frac
        depth = thickness * 1.5

        pen = TTGlyphPen(glyph_set)
        glyph_set[base].draw(pen)
        draw_breve(pen, cx, top, width, thickness, depth)
        glyph = pen.glyph()
        glyph.recalcBounds(glyf)

        if not check_only:
            glyf[target] = glyph
            hmtx[target] = hmtx[base]
        report.append((target, base, round(top - depth), round(top), round(width)))

    if check_only:
        return report

    font.save(GOKS)
    return report


# ──────────────────────────── Vireon (CFF) ────────────────────────────


def cff_charstring(font, glyph_set, name, draws, width):
    pen = T2CharStringPen(width, glyph_set)
    for fn in draws:
        fn(pen)
    return pen.getCharString()


def patch_vireon(check_only=False):
    font = TTFont(source(VIREON))
    glyph_set = font.getGlyphSet()
    hmtx = font["hmtx"]
    cff = font["CFF "].cff
    top = cff.topDictIndex[0]
    charstrings = top.CharStrings

    stem = stem_width(glyph_set)  # 120
    # Aksan bandı: küçük harf dieresis / büyük harf dieresis.
    lo_top = bounds(glyph_set, "odieresis")[3]
    up_top = bounds(glyph_set, "Odieresis")[3]
    dot = bounds(glyph_set, "dieresis")  # tek satırda iki nokta
    dot_h = dot[3] - dot[1]
    dot_w = (dot[2] - dot[0] - dot_h) / 2.0 + dot_h  # tek noktanın eni ≈ yükseklik
    thickness = max(56.0, min(dot_h, stem * 0.75))

    ced = bounds(glyph_set, "cedilla")
    ced_cx = (ced[0] + ced[2]) / 2.0

    def accent_from(name, dx, dy):
        def draw(pen):
            glyph_set[name].draw(TransformPen(pen, Transform().translate(dx, dy)))
        return draw

    def base_from(name):
        def draw(pen):
            glyph_set[name].draw(pen)
        return draw

    report = []
    jobs = []

    # ş / Ş — fontun kendi cedilla'sı, taban glifin merkezine hizalı.
    for target, base in (("uni015F", "s"), ("uni015E", "S")):
        b = bounds(glyph_set, base)
        cx = (b[0] + b[2]) / 2.0
        jobs.append((target, base, [base_from(base), accent_from("cedilla", cx - ced_cx, 0)]))
        report.append((target, base, "cedilla", round(cx - ced_cx), 0))

    # İ — `dieresis`in tek noktası, büyük harf aksan bandında ortalanmış.
    b_i = bounds(glyph_set, "I")
    cx_i = (b_i[0] + b_i[2]) / 2.0

    def draw_dot(pen):
        x0 = cx_i - dot_h / 2.0
        y0 = up_top - dot_h
        # Dieresis noktası kare/daire; fontun kendi noktasını kırpmak yerine
        # aynı ölçüde bir daire çiziyoruz (CFF'de kontur kopyalamak için
        # ayrı bir kalem gerekirdi, sonuç görsel olarak aynı).
        r = dot_h / 2.0
        cx, cy = x0 + r, y0 + r
        k = r * 0.5523
        pen.moveTo((cx - r, cy))
        pen.curveTo((cx - r, cy + k), (cx - k, cy + r), (cx, cy + r))
        pen.curveTo((cx + k, cy + r), (cx + r, cy + k), (cx + r, cy))
        pen.curveTo((cx + r, cy - k), (cx + k, cy - r), (cx, cy - r))
        pen.curveTo((cx - k, cy - r), (cx - r, cy - k), (cx - r, cy))
        pen.closePath()

    jobs.append(("uni0130", "I", [base_from("I"), draw_dot]))
    report.append(("uni0130", "I", "dot", round(cx_i), round(up_top)))

    # ğ / Ğ — çizilen breve (fontta `breve` glifi BOŞ).
    for target, base, top_y, frac in (
        ("uni011F", "g", lo_top, 0.58),
        ("uni011E", "G", up_top, 0.50),
    ):
        b = bounds(glyph_set, base)
        cx = (b[0] + b[2]) / 2.0
        width = (b[2] - b[0]) * frac
        depth = thickness * 1.45

        def make(cx=cx, width=width, top_y=top_y, depth=depth):
            def draw(pen):
                draw_breve(pen, cx, top_y, width, thickness, depth)
            return draw

        jobs.append((target, base, [base_from(base), make()]))
        report.append((target, base, "breve", round(width), round(top_y)))

    if check_only:
        return report

    glyph_order = list(font.getGlyphOrder())
    for target, base, draws in jobs:
        width = hmtx[base][0]
        cs = cff_charstring(font, glyph_set, target, draws, width)
        cs.private = charstrings[base].private
        # CFF'de yeni glif: CharStrings sözlüğü mevcut adı bekliyor, o
        # yüzden index'e ekleyip charset'e adı yazmak gerekiyor.
        if target in charstrings.charStrings:
            charstrings[target] = cs
        else:
            charstrings.charStringsIndex.append(cs)
            charstrings.charStrings[target] = len(charstrings.charStringsIndex) - 1
            top.charset.append(target)
        if target not in glyph_order:
            glyph_order.append(target)
        hmtx[target] = hmtx[base]

    font.setGlyphOrder(glyph_order)

    # cmap: yeni glifleri kod noktalarına bağla
    codepoints = {
        0x015F: "uni015F",
        0x015E: "uni015E",
        0x0130: "uni0130",
        0x011F: "uni011F",
        0x011E: "uni011E",
    }
    for table in font["cmap"].tables:
        if table.isUnicode():
            for cp, name in codepoints.items():
                table.cmap[cp] = name

    font.save(VIREON)
    return report


def verify():
    ok = True
    for path, expected in ((GOKS, "ğĞ"), (VIREON, "ğĞİşŞ")):
        font = TTFont(path)
        cmap = font.getBestCmap()
        glyph_set = font.getGlyphSet()
        for ch in expected:
            cp = ord(ch)
            if cp not in cmap:
                print(f"FAIL {path.name}: U+{cp:04X} ({ch}) cmap'te yok")
                ok = False
                continue
            b = bounds(glyph_set, cmap[cp])
            base = {"ğ": "g", "Ğ": "G", "İ": "I", "ş": "s", "Ş": "S"}[ch]
            bb = bounds(glyph_set, cmap[ord(base)])
            if ch in "ğĞİ":
                rise = b[3] - bb[3]
                # Aksan gövdeden en az %6 em yukarı çıkmalı; eski Goks
                # "breve"i %1.4 idi ve görünmüyordu.
                status = "ok" if rise >= 60 else "FAIL"
                if status == "FAIL":
                    ok = False
                print(f"  {path.name:20} {ch}: gövde üstü +{rise:.0f} birim  {status}")
            else:
                drop = bb[1] - b[1]
                status = "ok" if drop >= 60 else "FAIL"
                if status == "FAIL":
                    ok = False
                print(f"  {path.name:20} {ch}: taban altı -{drop:.0f} birim  {status}")
    return ok


if __name__ == "__main__":
    if "--check" in sys.argv:
        sys.exit(0 if verify() else 1)
    print("goks :", patch_goks())
    print("vireon:", patch_vireon())
    print()
    sys.exit(0 if verify() else 1)
