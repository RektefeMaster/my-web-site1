/**
 * Canlı projeler için hover-scroll mockup görselleri üretir.
 * Kullanım: node scripts/capture-project-scrolls.mjs [id...]
 *
 * Not: Playwright clip viewport’a sıkışır; bu yüzden CDP
 * Page.captureScreenshot + captureBeyondViewport kullanıyoruz.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TARGETS = [
  {
    id: "wcc",
    url: "https://websites-ruddy-nu.vercel.app/",
  },
  { id: "aydnnacar", url: "https://ayd-nnacar.vercel.app/" },
  {
    id: "wuffbutik",
    url: "https://wuffbutik.vercel.app/",
    settleMs: 4200,
  },
  {
    id: "altitude-residence",
    url: "https://altitude-residence.vercel.app/",
  },
  { id: "casa-aurelia", url: "https://casa-aurelia-jet.vercel.app/" },
  {
    id: "seraphine-atelier",
    url: "https://seraphine-atelier.vercel.app/",
  },
  { id: "havva-baklava", url: "https://baklavac-site.vercel.app/" },
  { id: "sahra-butik", url: "https://sahrabutik.vercel.app/" },
  { id: "vela-skin-atelier", url: "https://vela-skin-atelier.vercel.app/" },
  { id: "aiahi", url: "https://www.aiahi.net/" },
  {
    id: "masal-koltuk",
    url: "https://malatyakoltuktemizleme.com/",
    settleMs: 4500,
  },
];

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
/** Hover scroll: max ~4 ekran — daha uzunu mockupta uçar */
const MAX_SCREENS = 4.2;
/** CDP scale/DPR sapmasına karşı mutlak tavan (px) */
const ABS_MAX_DESKTOP_H = 4200;
const ABS_MAX_MOBILE_H = 3800;

/** CDP full-page capture sticky/fixed öğeleri her karede tekrarlar — düzleştir */
async function flattenFixedElements(page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll("*").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      const style = getComputedStyle(el);
      if (style.position !== "fixed" && style.position !== "sticky") return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("position", "absolute", "important");
      el.style.setProperty(
        "top",
        `${window.scrollY + rect.top}px`,
        "important",
      );
      el.style.setProperty("left", `${rect.left}px`, "important");
      el.style.setProperty("width", `${rect.width}px`, "important");
      el.style.setProperty("right", "auto", "important");
    });
  });
}

async function captureFixed(page, url, viewport, outPath, settleMs = 0) {
  await page.setViewportSize(viewport);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForTimeout(2800);
  }

  if (settleMs > 0) {
    await page.waitForTimeout(settleMs);
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        caret-color: transparent !important;
      }
      [aria-live],
      .Toastify,
      #cookie-banner,
      .cookie-consent,
      [class*="cookie"],
      [id*="cookie"],
      [class*="consent"],
      [id*="onetrust"],
      #onetrust-banner-sdk,
      .osano-cm-window,
      [class*="privacy"],
      [class*="boot"],
      [class*="preloader"],
      [class*="loader"],
      .ahi-boot-exit {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `,
  });

  // Sabit overlay / sticky’leri bir an scroll ederek lazy içerik yükle
  await page.evaluate(async () => {
    const total = Math.min(document.documentElement.scrollHeight, 8000);
    for (let y = 0; y < total; y += 900) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);

  /* Sticky nav tekrarını önle — CDP öncesi zorunlu */
  await flattenFixedElements(page);
  await page.waitForTimeout(150);

  const metrics = await page.evaluate(() => ({
    width: Math.min(
      Math.max(
        document.documentElement.scrollWidth,
        document.body?.scrollWidth ?? 0,
      ),
      window.innerWidth,
    ),
    height: Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight ?? 0,
    ),
  }));

  const absMax =
    viewport.width <= 500 ? ABS_MAX_MOBILE_H : ABS_MAX_DESKTOP_H;
  const maxH = Math.min(Math.round(viewport.height * MAX_SCREENS), absMax);
  const clipH = Math.min(metrics.height, maxH);
  const clipW = viewport.width;

  const client = await page.context().newCDPSession(page);
  const { data } = await client.send("Page.captureScreenshot", {
    format: "webp",
    quality: 82,
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { x: 0, y: 0, width: clipW, height: clipH, scale: 1 },
  });
  await client.detach();

  /*
    Şeritler WebP: aynı q=82'de JPEG'in yarısı (ölçüldü: 8.2MB → 3.9MB,
    RMSE 2.3 — gözle fark yok). Bu dosyalar `next/image` hattının DIŞINDA
    ham servis ediliyor (uzun şeridi `naturalHeight` ile ölçüyoruz), yani
    formatı burada seçmek zorundayız.
  */
  await writeFile(outPath, Buffer.from(data, "base64"));
  console.log(`  ${path.basename(outPath)} ${clipW}×${clipH}`);
}

/** Viewport karesi — scroll şeridiyle aynı oturum, üst hizalama garantili */
async function captureViewportThumb(page, viewport, outPath) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: outPath,
    type: "jpeg",
    quality: 88,
    fullPage: false,
  });
  console.log(`  ${path.basename(outPath)} ${viewport.width}×${viewport.height}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const only = process.argv.slice(2);
  const list = only.length
    ? TARGETS.filter((t) => only.includes(t.id))
    : TARGETS;

  for (const target of list) {
    const dir = path.join(root, "public/projects", target.id);
    await mkdir(dir, { recursive: true });
    const context = await browser.newContext({
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    console.log(`→ ${target.id} desktop`);
    await captureFixed(
      page,
      target.url,
      DESKTOP,
      path.join(dir, "desktop-scroll.webp"),
      target.settleMs ?? 0,
    );
    await captureViewportThumb(
      page,
      DESKTOP,
      path.join(dir, "desktop.jpg"),
    );

    console.log(`→ ${target.id} mobile`);
    await captureFixed(
      page,
      target.url,
      MOBILE,
      path.join(dir, "mobile-scroll.webp"),
      target.settleMs ?? 0,
    );
    await captureViewportThumb(
      page,
      MOBILE,
      path.join(dir, "mobile.jpg"),
    );

    await context.close();
    console.log(`✓ ${target.id}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
