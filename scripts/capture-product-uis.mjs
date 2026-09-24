import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mockups = join(root, "scripts/mockups");

const items = [
  "whatsapp-bot",
  "instagram-bot",
  "crm",
  "css-system",
];

async function shot(page, fileUrl, out, w, h) {
  mkdirSync(dirname(out), { recursive: true });
  await page.setViewportSize({ width: w, height: h });
  await page.goto(fileUrl, { waitUntil: "networkidle", timeout: 60000 }).catch(async () => {
    await page.goto(fileUrl, { waitUntil: "load" });
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  }).catch(() => {});
  await page.waitForTimeout(800);
  await page.screenshot({
    path: out,
    type: "jpeg",
    quality: 98,
    fullPage: false,
  });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ deviceScaleFactor: 3 });
const page = await context.newPage();

for (const id of items) {
  const fileUrl = pathToFileURL(join(mockups, `${id}.html`)).href;
  const dir = join(root, "public/projects", id);
  console.log(id);
  // Laptop screen 16:10 + phone 9:19.5
  await shot(page, fileUrl, join(dir, "desktop.jpg"), 1600, 1000);
  await shot(page, fileUrl, join(dir, "mobile.jpg"), 390, 844);
  console.log("  ok");
}

await browser.close();
console.log("done");
