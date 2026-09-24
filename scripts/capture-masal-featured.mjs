/**
 * MASAL Koltuk Yıkama — detay sayfası galeri kareleri.
 * Kullanım: node scripts/capture-masal-featured.mjs
 *
 * Neden ayrı script (capture-featured.mjs'in otomatik bölüm keşfi yerine):
 * bu iş 32 sayfalık bir yerel SEO mimarisi; kanıt tek sayfada değil, ayrı
 * rotalarda duruyor (fiyat tablosu, önce/sonra iş kayıtları, bölge sayfaları,
 * rehber yazıları). Otomatik keşif hepsini ana sayfadan toplamaya çalışıp
 * aynı bölümün altı varyantını çekiyordu.
 */
import { chromium } from "playwright";
import { mkdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://malatyakoltuktemizleme.com";
const VIEWPORT = { width: 1440, height: 900 };
/** next/image max deviceSize — 1440×DPR = 1920 */
const DPR = 1920 / VIEWPORT.width;
const JPEG_QUALITY = 92;

/**
 * anchor: kadrajın hizalanacağı seçici (yoksa scrollY)
 * offset: anchor'ın üstünde bırakılacak pay — sticky header ~95px
 */
const SHOTS = [
  /* Ana sayfa hero'su BİLEREK yok: desktop.jpg zaten aynı kadraj, detay
     sayfası hero'yu oradan alıyor. İkinci kopya 250KB boşa gidiyordu. */
  { file: "01-hizmetler", path: "/hizmetlerimiz", anchor: "h1" },
  { file: "02-fiyatlar", path: "/fiyatlar", anchor: "table, .fiyat, [class*='price'], h1" },
  /* /isler'in h1'i tam ekran bir fotoğrafın üstüne düşüyordu — kanıt olan
     kare önce/sonra karşılaştırması, o yüzden doğrudan ona hizalanıyoruz. */
  { file: "03-isler", path: "/isler", anchor: "#once-sonra", offset: 96 },
  { file: "04-bolgeler", path: "/hizmet-bolgeleri", anchor: "h1" },
  { file: "05-rehber", path: "/blog", anchor: "h1" },
];

async function hideChrome(page) {
  await page
    .addStyleTag({
      content: `
      *, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition: none !important; }
      [class*="cookie" i], [id*="cookie" i], [class*="consent" i],
      [class*="whatsapp" i], [id*="whatsapp" i], [class*="fab" i],
      [class*="sticky-cta" i], [class*="floating" i] {
        display: none !important; visibility: hidden !important; pointer-events: none !important;
      }
      /* Giriş animasyonları scroll ile tetikleniyor; kadraj dışı kalanlar
         yarı saydam yakalanmasın. */
      [class*="is-offscreen"], [data-reveal], .reveal {
        opacity: 1 !important; transform: none !important;
      }
    `,
    })
    .catch(() => {});
}

async function settle(page) {
  await page
    .waitForFunction(() => document.fonts?.status === "loaded", null, { timeout: 8000 })
    .catch(() => {});
  await page.evaluate(async () => {
    const total = Math.min(document.documentElement.scrollHeight, 14000);
    for (let y = 0; y < total; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map(
        (img) =>
          img.complete ||
          new Promise((r) => {
            img.onload = img.onerror = () => r(null);
            setTimeout(() => r(null), 3000);
          })
      )
    );
  });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  deviceScaleFactor: DPR,
  viewport: VIEWPORT,
  locale: "tr-TR",
  reducedMotion: "reduce",
});
const page = await context.newPage();
const outDir = join(root, "public/projects/masal-koltuk/featured");
mkdirSync(outDir, { recursive: true });

for (const shot of SHOTS) {
  const url = ORIGIN + shot.path;
  console.log(`→ ${shot.file}  ${url}`);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  }
  await hideChrome(page);
  await settle(page);

  let y = shot.scrollY ?? 0;
  if (shot.anchor) {
    y = await page.evaluate(
      ({ sel, offset }) => {
        const el = document.querySelector(sel);
        if (!el) return 0;
        const top = window.scrollY + el.getBoundingClientRect().top;
        /* Başlığın biraz üstünden başla — bölüm kendi nefesiyle görünsün */
        return Math.max(0, Math.round(top - offset));
      },
      { sel: shot.anchor, offset: shot.offset ?? 140 }
    );
  }

  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(700);
  await hideChrome(page);

  const out = join(outDir, `${shot.file}.jpg`);
  await page.screenshot({ path: out, type: "jpeg", quality: JPEG_QUALITY, fullPage: false });
  console.log(`  ${shot.file}.jpg @ y=${y} (${statSync(out).size} bytes)`);
}

await context.close();
await browser.close();
console.log("done");
