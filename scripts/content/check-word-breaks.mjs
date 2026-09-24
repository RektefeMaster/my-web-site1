#!/usr/bin/env node
/**
 * Display başlıklarında SESSİZ kelime bölünmesi var mı?
 *
 * Neden ölçülüyor: `.type-display` global `overflow-wrap: break-word`
 * taşıyor (app/craft.css). Bu, dar telefonda uzun Almanca bileşikler için
 * bilinçli bir emniyet ağı — ama punto kutusundan büyük olduğunda geniş
 * ekranda da devreye giriyor ve kelimeyi TİRESİZ ikiye bölüyor
 * ("operasyona" → "operasyo / na", 1440px'te ekran görüntüsüyle yakalandı).
 * Gözle fark edilmesi zor, kaçınılması kolay: bu gate onu ölçüyor.
 *
 * Kural: 640px ve ÜSTÜNDE hiçbir display kelimesi bölünmeyecek.
 * 640px altı bilerek muaf (bkz. AGENTS.md — "son emniyet ağı").
 *
 * Kullanım:
 *   npm run build && npm run start -- -p 3200   (ya da çalışan bir sunucu)
 *   BASE=http://localhost:3200 node scripts/content/check-word-breaks.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3200";
/** 640 altı bilerek dışarıda: orada bölünme kabul edilen emniyet ağı. */
const VIEWPORTS = [1920, 1440, 1280, 1024, 768, 640];

const ROUTES = process.env.ROUTES
  ? process.env.ROUTES.split(",")
  : [
      "/tr",
      "/tr/approach",
      "/tr/services",
      "/tr/work",
      "/tr/contact",
      "/tr/manifesto",
      "/tr/blog",
      "/tr/faq",
      "/tr/glossary",
      "/tr/industries",
      "/tr/sehirler",
      "/tr/sehirler/istanbul",
      "/tr/blog/hotel-website-design",
      "/tr/bulunmayan-sayfa",
      "/de",
      "/de/approach",
      "/de/services",
      "/de/work",
      "/de/contact",
      "/es",
      "/es/approach",
      "/es/services",
      "/es/contact",
    ];

/** Tek kelimenin birden çok satıra düşüp düşmediğini Range ile ölç. */
function collectBreaks() {
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue;
    if (!text || !text.trim()) continue;
    const el = node.parentElement;
    if (!el) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const fontSize = parseFloat(cs.fontSize);
    if (fontSize < 18) continue; // yalnız başlık ölçeği

    const re = /\S+/g;
    let m;
    while ((m = re.exec(text))) {
      const word = m[0];
      if (word.length < 4) continue;
      // Tire zaten meşru kırılma noktası ("Instagram-Chatbot").
      if (word.includes("-") || word.includes("‐")) continue;

      const range = document.createRange();
      range.setStart(node, m.index);
      range.setEnd(node, m.index + word.length);
      const rects = [...range.getClientRects()].filter(
        (r) => r.width > 0.5 && r.height > 0.5,
      );
      if (rects.length < 2) continue;
      const tops = new Set(rects.map((r) => Math.round(r.top)));
      if (tops.size < 2) continue;

      const key = `${word}|${Math.round(fontSize)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ word, fontSize: Math.round(fontSize), tag: el.tagName });
    }
  }
  return out;
}

const browser = await chromium.launch();
const findings = [];

for (const width of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    locale: "tr-TR",
  });
  for (const route of ROUTES) {
    const page = await context.newPage();
    try {
      await page.goto(`${BASE}${route}?intro=skip`, {
        waitUntil: "load",
        timeout: 45000,
      });
      await page.waitForTimeout(1200);
      const breaks = await page.evaluate(collectBreaks);
      for (const b of breaks) findings.push({ width, route, ...b });
    } catch (error) {
      console.error(`  ! ${width}px ${route}: ${String(error).slice(0, 120)}`);
    }
    await page.close();
  }
  await context.close();
  process.stdout.write(`${width} `);
}

await browser.close();
console.log("");

if (findings.length === 0) {
  console.log(`OK: ${VIEWPORTS.length} genişlik × ${ROUTES.length} sayfa — kelime bölünmesi yok`);
  process.exit(0);
}

console.error(`\nFAIL: ${findings.length} sessiz kelime bölünmesi\n`);
for (const f of findings) {
  console.error(`  ${String(f.width).padStart(4)}px  ${f.route.padEnd(30)} <${f.tag}> "${f.word}" @${f.fontSize}px`);
}
console.error(
  "\nÇözüm: puntoyu değil ÖNCE kutuyu kontrol et (`max-w-[Nch]` Goks'ta ~1em/ch," +
    "\nyani 10ch = 10em). Kutu kolondan geliyorsa clamp'in tavanını/min'ini kıs." +
    "\nTek locale taşıyorsa `[html[lang=xx]_&]:text-[...]` ile o dile özel kıs.",
);
process.exit(1);
