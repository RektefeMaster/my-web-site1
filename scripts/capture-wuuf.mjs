/**
 * Wuuf Butik mockup yakalama (v3)
 * - scrollbar gutter yok
 * - ilk hero slide (01-model) kilitli
 * - laptop oranı ~1.55 (MacBook ekranı)
 * - scroll: fullPage + trim
 */
import { chromium, devices } from "playwright";
import { mkdirSync, unlinkSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public/projects/wuffbutik");
const URL = "https://wuffbutik.vercel.app/";
const TAG = "v3";

mkdirSync(join(dir, "featured"), { recursive: true });

async function withRetry(fn, tries = 5) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn(i);
    } catch (e) {
      last = e;
      console.log("retry", i + 1, String(e.message).slice(0, 100));
      await new Promise((r) => setTimeout(r, 1800 + i * 900));
    }
  }
  throw last;
}

async function prepare(page) {
  await page.addStyleTag({
    content: `
      html, body { overflow: hidden !important; }
      ::-webkit-scrollbar { width: 0 !important; display: none !important; }
      .preloader { display: none !important; opacity: 0 !important; pointer-events: none !important; }
      [class*="cookie" i], #onetrust-banner-sdk { display: none !important; }
    `,
  });

  await page.evaluate(async () => {
    const highest = setTimeout(() => {}, 0);
    for (let i = 0; i <= highest; i++) {
      clearTimeout(i);
      clearInterval(i);
    }

    const slides = [...document.querySelectorAll(".hero__slide")];
    slides.forEach((s, i) => {
      const on = i === 0;
      s.classList.toggle("is-active", on);
      s.style.setProperty("opacity", on ? "1" : "0", "important");
      s.style.setProperty("visibility", on ? "visible" : "hidden", "important");
      s.style.setProperty("z-index", on ? "3" : "0", "important");
    });

    const video = slides[0]?.querySelector("video");
    if (video) {
      video.muted = true;
      video.playsInline = true;
      try {
        await video.play();
      } catch {
        /* autoplay */
      }
      await new Promise((r) => setTimeout(r, 1100));
      try {
        video.currentTime = 0.9;
      } catch {
        /* seek */
      }
      await new Promise((r) => {
        video.addEventListener("seeked", () => r(), { once: true });
        setTimeout(r, 800);
      });
      video.pause();
    }

    document.querySelectorAll(".hero__content, .hero-soft").forEach((el) => {
      el.style.opacity = "1";
      el.style.visibility = "visible";
      el.style.transform = "none";
    });
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(350);
}

async function shotHero(page, path, crop) {
  const box = await page.evaluate((c) => ({
    x: 0,
    y: 0,
    width: Math.floor(window.innerWidth),
    height: Math.floor(window.innerHeight * (1 - c)),
  }), crop);
  await page.screenshot({ path, type: "jpeg", quality: 98, clip: box });
  const m = await sharp(path).metadata();
  console.log("  hero", path.replace(root + "/", ""), `${m.width}×${m.height}`);
}

async function shotScroll(page, path, maxCssH, dpr) {
  await page.addStyleTag({
    content: `html, body { overflow: auto !important; }`,
  });
  await page.evaluate(async () => {
    const h = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    for (let y = 0; y < h; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);

  const tmp = `${path}.full.jpg`;
  await page.screenshot({
    path: tmp,
    type: "jpeg",
    quality: 86,
    fullPage: true,
    animations: "disabled",
  });
  const meta = await sharp(tmp).metadata();
  const maxPx = Math.round(maxCssH * dpr);
  if (meta.height > maxPx) {
    await sharp(tmp)
      .extract({ left: 0, top: 0, width: meta.width, height: maxPx })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path);
  } else {
    await sharp(tmp).jpeg({ quality: 88, mozjpeg: true }).toFile(path);
  }
  try {
    unlinkSync(tmp);
  } catch {
    /* ignore */
  }
  const final = await sharp(path).metadata();
  console.log("  scroll", path.replace(root + "/", ""), `${final.width}×${final.height}`);
}

const browser = await chromium.launch({ headless: true });

await withRetry(async () => {
  console.log("desktop");
  const dpr = 1.2;
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 1030 },
    deviceScaleFactor: dpr,
    locale: "tr-TR",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "commit", timeout: 90000 });
  await page.waitForTimeout(4800);
  await page.waitForSelector("section.hero", { timeout: 30000 });
  await prepare(page);
  const desk = join(dir, `desktop-${TAG}.jpg`);
  await shotHero(page, desk, 0.028);
  await sharp(desk)
    .jpeg({ quality: 96, mozjpeg: true })
    .toFile(join(dir, `featured/01-hero-${TAG}.jpg`));
  await shotScroll(page, join(dir, `desktop-scroll-${TAG}.jpg`), 5600, dpr);
  await ctx.close();
});

await withRetry(async () => {
  console.log("mobile");
  const dpr = 3;
  const ctx = await browser.newContext({
    ...devices["Pixel 7"],
    locale: "tr-TR",
    deviceScaleFactor: dpr,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "commit", timeout: 90000 });
  await page.waitForTimeout(4800);
  await page.waitForSelector("section.hero", { timeout: 30000 });
  await prepare(page);
  await shotHero(page, join(dir, `mobile-${TAG}.jpg`), 0.035);
  await shotScroll(page, join(dir, `mobile-scroll-${TAG}.jpg`), 3000, dpr);
  await ctx.close();
});

await browser.close();
console.log("wuuf capture done");
