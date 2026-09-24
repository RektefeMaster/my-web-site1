#!/usr/bin/env node
/**
 * Goks ve Vireon'a eksik/bozuk Türkçe glifleri ekler.
 *
 * NEDEN (ölçüldü, fontTools ile):
 *   app/fonts/goks-regular.ttf
 *     ğ (uni011F) = g + 49×14 birimlik NOKTA. Breve değil; 1000 upem'de
 *     %1.4 yükseklik, yani 44px puntoda 0.6px. Ekranda hiç görünmüyor:
 *     "gerektiğini" → "gerektigini" diye okunuyordu (ekran görüntüsüyle
 *     yakalandı). Ğ (uni011E) aynı hatayı taşıyor.
 *   app/fonts/vireon.otf
 *     ğ Ğ İ ş Ş glifleri HİÇ YOK. `.font-subtitle` (PageHero lede'si dahil)
 *     bu harflerde Space Grotesk'e düşüyor, yani kelimenin ortasında yüz
 *     değişiyor ("işletmeleri", "Şişli").
 *
 * NE YAPIYOR: aksanı fontun KENDİ ölçülerinden türetiyor —
 *   • aksan bandı: mevcut dieresis/caron gliflerinin y aralığı
 *   • çizgi kalınlığı: `l` sapının genişliği
 *   • yatay merkez: taban glifin bbox merkezi
 * Yani elle rakam girilmiyor, her iki yüz de kendi stiliyle tutarlı kalıyor.
 *
 * Çalıştırma (fontlar yeniden dışa aktarılırsa tekrar çalıştır):
 *   node scripts/patch-turkish-glyphs.mjs
 * Doğrulama:
 *   node scripts/patch-turkish-glyphs.mjs --check
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const py = path.join(here, "patch-turkish-glyphs.py");

const result = spawnSync("python3", [py, ...process.argv.slice(2)], {
  stdio: "inherit",
  cwd: path.resolve(here, ".."),
});
process.exit(result.status ?? 1);
