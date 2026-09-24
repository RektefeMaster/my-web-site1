import { chromium } from "playwright";
import { mkdirSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const VIEWPORT = { width: 1440, height: 900 };
/** next/image max deviceSize — 1440×DPR = 1920 */
const DPR = 1920 / VIEWPORT.width;
const JPEG_QUALITY = 93;
const SETTLE_MS = 2500;

const sites = [
  {
    id: "aydnnacar",
    urls: ["https://ayd-nnacar.vercel.app/", "https://ayd-nnacar.vercel.app/koleksiyonlar"],
    waitFor: /koleksiyon|ayd|mobilya/i,
  },
  {
    id: "wuffbutik",
    urls: ["https://wuffbutik.vercel.app/"],
    waitFor: /wuff|wuuf|butik/i,
  },
  {
    id: "altitude-residence",
    urls: ["https://altitude-residence.vercel.app/"],
    waitFor: /altitude/i,
  },
  {
    id: "casa-aurelia",
    urls: ["https://casa-aurelia-jet.vercel.app/"],
    waitFor: /casa|aurelia/i,
  },
  {
    id: "havva-baklava",
    urls: ["https://baklavac-site.vercel.app/"],
    waitFor: /havva|baklava|köln|koln/i,
  },
  {
    id: "sahra-butik",
    urls: ["https://sahrabutik.vercel.app/"],
    waitFor: /sahra|lookbook/i,
  },
  {
    id: "vela-skin-atelier",
    urls: ["https://vela-skin-atelier.vercel.app/"],
    waitFor: /vela|skin|soho|atelier/i,
  },
];

function slugify(text) {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "section"
  );
}

async function hideChrome(page) {
  await page
    .addStyleTag({
      content: `
      [class*="cookie" i], [id*="cookie" i], [class*="Consent" i],
      #onetrust-banner-sdk, .cc-window, [aria-label*="cookie" i],
      [class*="whatsapp" i], [id*="whatsapp" i], .wa-fab,
      [class*="floating" i][class*="chat" i], iframe[src*="whatsapp"] {
        display: none !important; visibility: hidden !important; pointer-events: none !important;
      }
    `,
    })
    .catch(() => {});
}

async function discoverSections(page) {
  return page.evaluate(() => {
    const seen = new Map();
    const add = (y, label, el) => {
      if (!Number.isFinite(y) || y < 0) return;
      const key = Math.round(y / 8) * 8;
      const text = (label || "").trim().slice(0, 80);
      if (!seen.has(key) || (text.length > (seen.get(key).label?.length || 0))) {
        seen.set(key, { y: key, label: text, tag: el?.tagName?.toLowerCase() });
      }
    };

    document.querySelectorAll("[id]").forEach((el) => {
      const id = el.id;
      if (!id || id.length > 60) return;
      if (/^(root|app|__next|main)$/i.test(id)) return;
      const r = el.getBoundingClientRect();
      add(window.scrollY + r.top, id.replace(/-/g, " "), el);
    });

    document.querySelectorAll("section, main > div, header, footer").forEach((el) => {
      const h = el.querySelector(":scope > h1, :scope > h2, :scope > h3, h2, h3");
      const label = h?.textContent || el.getAttribute("aria-label") || "";
      const r = el.getBoundingClientRect();
      if (r.height < 80) return;
      add(window.scrollY + r.top, label, el);
    });

    document.querySelectorAll("h1, h2, h3").forEach((h) => {
      const r = h.getBoundingClientRect();
      if (r.height < 10) return;
      add(window.scrollY + r.top - 40, h.textContent || "", h);
    });

    return [...seen.values()].sort((a, b) => a.y - b.y);
  });
}

function planShots(sections, maxScroll) {
  const shots = [{ filename: "01-hero", scrollY: 0, label: "hero" }];
  const usedY = new Set([0]);
  const minGap = 420;

  const candidates = sections.filter((s) => s.y > 120 && s.y < maxScroll - 200);

  for (const sec of candidates) {
    const y = Math.min(Math.max(0, Math.round(sec.y)), maxScroll);
    const tooClose = [...usedY].some((u) => Math.abs(u - y) < minGap);
    if (tooClose) continue;
    usedY.add(y);
    const name = slugify(sec.label || `section-${shots.length}`);
    const num = String(shots.length + 1).padStart(2, "0");
    shots.push({ filename: `${num}-${name}`, scrollY: y, label: sec.label || name });
    if (shots.length >= 6) break;
  }

  while (shots.length < 4) {
    const frac = shots.length / 5;
    const y = Math.round(maxScroll * frac);
    const tooClose = [...usedY].some((u) => Math.abs(u - y) < minGap);
    if (!tooClose && y > 100) {
      usedY.add(y);
      const num = String(shots.length + 1).padStart(2, "0");
      shots.push({ filename: `${num}-content`, scrollY: y, label: "content" });
    } else if (maxScroll <= 100) break;
    else {
      const bump = y + minGap;
      if (bump >= maxScroll) break;
      usedY.add(bump);
      const num = String(shots.length + 1).padStart(2, "0");
      shots.push({ filename: `${num}-content`, scrollY: bump, label: "content" });
    }
    if (shots.length >= 6) break;
  }

  return shots.slice(0, 6);
}

async function waitNearbyImages(page, scrollY) {
  await page.evaluate(async (y) => {
    window.scrollTo({ top: y, behavior: "instant" });
    const vh = window.innerHeight;
    const imgs = [...document.images].filter((img) => {
      const r = img.getBoundingClientRect();
      const top = window.scrollY + r.top;
      return top >= y - 200 && top <= y + vh + 400;
    });
    await Promise.all(
      imgs.map(
        (img) =>
          img.complete ||
          new Promise((r) => {
            img.onload = img.onerror = () => r(null);
            setTimeout(() => r(null), 3500);
          })
      )
    );
  }, scrollY);
}

async function loadSite(page, site) {
  let lastErr;
  for (const url of site.urls) {
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    } catch {
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
      } catch (e) {
        lastErr = e;
        continue;
      }
    }
    await page.waitForTimeout(SETTLE_MS);
    const bodyText = await page.evaluate(() => document.body?.innerText?.slice(0, 5000) || "");
    if (site.waitFor.test(bodyText)) return url;
    if (url === site.urls[site.urls.length - 1]) return url;
  }
  if (lastErr) throw lastErr;
  return site.urls[0];
}

async function captureSite(page, site) {
  const outDir = join(root, "public/projects", site.id, "featured");
  mkdirSync(outDir, { recursive: true });
  const result = { id: site.id, url: null, files: [], error: null };

  try {
    result.url = await loadSite(page, site);
    await hideChrome(page);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(800);

    const maxScroll = await page.evaluate(() =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    );
    const sections = await discoverSections(page);
    let shots = planShots(sections, maxScroll);

    // Dedupe filenames
    const usedNames = new Set();
    shots = shots.map((s, i) => {
      let base = s.filename;
      if (usedNames.has(base)) base = `${String(i + 1).padStart(2, "0")}-${slugify(s.label)}-${i}`;
      usedNames.add(base);
      return { ...s, filename: base };
    });

    for (const shot of shots) {
      await waitNearbyImages(page, shot.scrollY);
      await page.waitForTimeout(400);
      await hideChrome(page);
      const path = join(outDir, `${shot.filename}.jpg`);
      await page.screenshot({ path, type: "jpeg", quality: JPEG_QUALITY, fullPage: false });
      const size = statSync(path).size;
      result.files.push({ file: `${shot.filename}.jpg`, bytes: size, scrollY: shot.scrollY });
      console.log(`  ${shot.filename}.jpg @ y=${shot.scrollY} (${size} bytes)`);
    }
  } catch (e) {
    result.error = e?.message || String(e);
    console.error(`  ERROR ${site.id}:`, result.error);
  }
  return result;
}

const summary = {
  skipped: {
    id: "wcc",
    reason: "featured complete (>50KB each)",
    files: ["01-hero.jpg", "02-kitchen.jpg", "03-projects.jpg", "04-brands.jpg"],
  },
  captured: [],
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: DPR,
  locale: "tr-TR",
});
const page = await context.newPage();
await page.setViewportSize(VIEWPORT);

for (const site of sites) {
  console.log("\nCapturing featured:", site.id);
  summary.captured.push(await captureSite(page, site));
}

await browser.close();

const outJson = join(root, "scripts/capture-featured-summary.json");
writeFileSync(outJson, JSON.stringify(summary, null, 2));
console.log("\n--- JSON SUMMARY ---");
console.log(JSON.stringify(summary, null, 2));
