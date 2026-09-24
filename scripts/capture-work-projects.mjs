import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** İşler → Seçili projeler grid’i için yüksek çözünürlük kareler */
const sites = [
  {
    id: "altitude-residence",
    url: "https://altitude-residence.vercel.app/",
    waitFor: "text=Altitude",
  },
  {
    id: "casa-aurelia",
    url: "https://casa-aurelia-jet.vercel.app/",
    waitFor: "text=CASA AURELIA",
  },
  {
    id: "seraphine-atelier",
    url: "https://seraphine-atelier.vercel.app/",
    waitFor: "text=SÉRAPHINE",
  },
  {
    id: "havva-baklava",
    url: "https://baklavac-site.vercel.app/",
    waitFor: "text=HAVVA",
  },
  {
    id: "sahra-butik",
    url: "https://sahrabutik.vercel.app/",
    waitFor: "text=SAHRA",
  },
  {
    id: "vela-skin-atelier",
    url: "https://vela-skin-atelier.vercel.app/",
    waitFor: "text=VELA",
  },
];

async function hideChrome(page) {
  await page
    .addStyleTag({
      content: `
      [class*="cookie" i], [id*="cookie" i], [class*="Consent" i],
      #onetrust-banner-sdk, .cc-window, [aria-label*="cookie" i],
      [class*="whatsapp" i], [id*="whatsapp" i], .wa-fab {
        display: none !important; visibility: hidden !important;
      }
    `,
    })
    .catch(() => {});
}

async function capture(page, site, outPath, width, height) {
  mkdirSync(dirname(outPath), { recursive: true });
  await page.setViewportSize({ width, height });

  try {
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 90000 });
  } catch {
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 90000 });
  }

  if (site.waitFor) {
    await page.waitForSelector(site.waitFor, { timeout: 20000 }).catch(() => {});
  }

  // Intro / loader / lazy images
  await page.waitForTimeout(3200);
  await page.evaluate(() => window.scrollTo(0, Math.min(500, document.body.scrollHeight / 4)));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  await hideChrome(page);

  await Promise.race([
    page.evaluate(async () => {
      const imgs = [...document.images];
      await Promise.all(
        imgs.map(
          (img) =>
            img.complete ||
            new Promise((r) => {
              img.onload = img.onerror = () => r(null);
              setTimeout(() => r(null), 3000);
            })
        )
      );
    }),
    page.waitForTimeout(4500),
  ]);

  await page.screenshot({
    path: outPath,
    type: "jpeg",
    quality: 98,
    fullPage: false,
  });
}

const browser = await chromium.launch({ headless: true });

/** next/image deviceSizes max=1920 — fazlası boşa dosya şişirir */
const DESKTOP_DPR = 1920 / 1600;
const MOBILE_DPR = 3;

for (const site of sites) {
  const dir = join(root, "public/projects", site.id);
  mkdirSync(dir, { recursive: true });
  console.log("Capturing", site.id, "←", site.url);

  const deskCtx = await browser.newContext({
    deviceScaleFactor: DESKTOP_DPR,
    locale: "en-US",
    colorScheme: "dark",
  });
  const deskPage = await deskCtx.newPage();
  await capture(deskPage, site, join(dir, "desktop.jpg"), 1600, 1000);
  await deskCtx.close();
  console.log("  desktop ok");

  const mobCtx = await browser.newContext({
    deviceScaleFactor: MOBILE_DPR,
    locale: "en-US",
    colorScheme: "dark",
  });
  const mobPage = await mobCtx.newPage();
  await capture(mobPage, site, join(dir, "mobile.jpg"), 390, 844);
  await mobCtx.close();
  console.log("  mobile ok");
}

await browser.close();
console.log("done");
