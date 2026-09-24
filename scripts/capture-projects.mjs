import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Her site için en iyi kare: asıl içerik URL + bekleme */
const sites = [
  {
    id: "wcc",
    url: "https://websites-production-4b1d.up.railway.app/",
    waitFor: "text=Wholesale Cabinet Creations",
  },
  {
    id: "aydnnacar",
    // Ana sayfa intro yerine koleksiyon grid — gerçek mobilya içeriği
    url: "https://ayd-nnacar.vercel.app/koleksiyonlar",
    waitFor: "text=Koleksiyon",
    fallbackUrl: "https://ayd-nnacar.vercel.app/urunler",
  },
  {
    id: "wuffbutik",
    url: "https://wuffbutik.vercel.app/",
    waitFor: "text=WUUF",
  },
  {
    id: "altitude-residence",
    url: "https://altitude-residence.vercel.app/",
    waitFor: "text=Altitude",
  },
  {
    id: "aiahi",
    url: "https://www.aiahi.net/",
    waitFor: "text=Ahi",
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
  {
    id: "masal-koltuk",
    url: "https://malatyakoltuktemizleme.com/",
    waitFor: "text=MASAL",
    // Hero kelime markası harf harf açılıyor; erken kare "MAS" yakalıyor.
    settleMs: 4200,
  },
];

async function hideChrome(page) {
  await page
    .addStyleTag({
      content: `
      [class*="cookie" i], [id*="cookie" i], [class*="Consent" i],
      #onetrust-banner-sdk, .cc-window, [aria-label*="cookie" i] {
        display: none !important; visibility: hidden !important;
      }
    `,
    })
    .catch(() => {});
}

async function capture(page, site, outPath, width, height) {
  mkdirSync(dirname(outPath), { recursive: true });
  await page.setViewportSize({ width, height });

  let url = site.url;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 70000 });
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 70000 });
  }

  if (site.waitFor) {
    try {
      await page.waitForSelector(site.waitFor, { timeout: 15000 });
    } catch {
      if (site.fallbackUrl) {
        url = site.fallbackUrl;
        await page.goto(url, { waitUntil: "networkidle", timeout: 70000 });
      }
    }
  }

  // Intro / loader geçsin, görseller otursun
  await page.waitForTimeout(site.settleMs ?? 2800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // Lazy image tetikle: biraz aşağı kaydırıp geri gel
  await page.evaluate(() => window.scrollTo(0, Math.min(600, document.body.scrollHeight / 3)));
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);

  await hideChrome(page);

  // Wuuf: scrollbar gutter + preloader + hero video otursun
  if (site.id === "wuffbutik") {
    await page
      .addStyleTag({
        content: `
        html, body { overflow: hidden !important; background: #111 !important; }
        ::-webkit-scrollbar { display: none !important; width: 0 !important; }
        .preloader { display: none !important; opacity: 0 !important; pointer-events: none !important; }
      `,
      })
      .catch(() => {});
    await page
      .waitForFunction(() => {
        const p = document.querySelector(".preloader");
        if (!p) return true;
        const st = getComputedStyle(p);
        return st.display === "none" || st.opacity === "0" || st.visibility === "hidden";
      }, null, { timeout: 10000 })
      .catch(() => {});
    await page.evaluate(() => document.querySelector(".preloader")?.remove());
    await page.evaluate(async () => {
      const slides = [...document.querySelectorAll(".hero__slide")];
      slides.forEach((s, i) => {
        s.classList.toggle("is-active", i === 0);
        s.style.setProperty("opacity", i === 0 ? "1" : "0", "important");
      });
      const video =
        document.querySelector(".hero__slide.is-active video") ||
        document.querySelector(".hero video");
      if (video) {
        video.muted = true;
        video.playsInline = true;
        try {
          await video.play();
        } catch {
          /* autoplay blocked — poster still helps */
        }
        await new Promise((r) => {
          if (video.readyState >= 2) return r();
          video.addEventListener("loadeddata", () => r(), { once: true });
          setTimeout(r, 5000);
        });
        try {
          video.currentTime = Math.min(1.15, Math.max(0.45, (video.duration || 3) * 0.22));
        } catch {
          /* seek may fail before metadata */
        }
        await new Promise((r) => {
          video.addEventListener("seeked", () => r(), { once: true });
          setTimeout(r, 800);
        });
        video.pause();
      }
      document.querySelectorAll(".hero-soft, .hero__content").forEach((el) => {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
        el.style.setProperty("visibility", "visible", "important");
      });
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
  }

  // Görsellerin yüklenmesini bekle (max 4s)
  await Promise.race([
    page.evaluate(async () => {
      const imgs = [...document.images];
      await Promise.all(
        imgs.map(
          (img) =>
            img.complete ||
            new Promise((r) => {
              img.onload = img.onerror = () => r(null);
              setTimeout(() => r(null), 2500);
            })
        )
      );
    }),
    page.waitForTimeout(4000),
  ]);

  await page.screenshot({
    path: outPath,
    type: "jpeg",
    quality: 98,
    fullPage: false,
  });
}

const browser = await chromium.launch({ headless: true });

/** next/image deviceSizes max=1920 — fazlası boşa dosya şişirir, UI kalitesi aynı kalır */
const DESKTOP_DPR = 1920 / 1600; // → 1920×1200
const MOBILE_DPR = 3; // 390×3 → 1170 (telefon mockup için yeterli)

/* Argümansız çalışınca TÜM projeleri yeniden çeker ve mevcut kareleri ezer.
   Tek işi tazelerken `node scripts/capture-projects.mjs <id>` kullan. */
const only = process.argv.slice(2);
const queue = only.length ? sites.filter((s) => only.includes(s.id)) : sites;

for (const site of queue) {
  const dir = join(root, "public/projects", site.id);
  mkdirSync(dir, { recursive: true });
  console.log("Capturing", site.id, "←", site.url);

  const deskCtx = await browser.newContext({
    deviceScaleFactor: DESKTOP_DPR,
    locale: "tr-TR",
  });
  const deskPage = await deskCtx.newPage();
  await capture(deskPage, site, join(dir, "desktop.jpg"), 1600, 1000);
  await deskCtx.close();
  console.log("  desktop ok");

  const mobCtx = await browser.newContext({
    deviceScaleFactor: MOBILE_DPR,
    locale: "tr-TR",
  });
  const mobPage = await mobCtx.newPage();
  await capture(mobPage, site, join(dir, "mobile.jpg"), 390, 844);
  await mobCtx.close();
  console.log("  mobile ok");
}

await browser.close();
console.log("done");
