#!/usr/bin/env node
/**
 * Single content gate: inventory → evidence → messages → forbidden.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LOCALES,
  loadMessages,
  flattenKeys,
  getByPath,
  fail,
  warn,
  ok,
} from "./_shared.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const strictLengths = process.argv.includes("--strict-lengths");
const contextual = process.argv.includes("--contextual");

function run(file, extraArgs = []) {
  console.log(`\n── ${file} ──`);
  const r = spawnSync(
    process.execPath,
    [path.join(dir, file), ...extraArgs],
    { stdio: "inherit" },
  );
  return r.status ?? 1;
}

/** @type {{ name: string, status: number }[]} */
const results = [];
results.push({ name: "inventory", status: run("inventory-copy.mjs") });
// Şehir yüzeyi: benzersizlik, uzunluk, meta ve SSS tekrarı.
results.push({ name: "cities", status: run("check-city-uniqueness.mjs") });
results.push({
  name: "evidence",
  status: run(
    "verify-evidence.mjs",
    process.argv.includes("--verbose") ? ["--verbose"] : [],
  ),
});

// ── message checks ──
console.log("\n── messages ──");
let msgErrors = 0;
const messages = loadMessages();
const enKeys = flattenKeys(messages.en);

for (const locale of LOCALES) {
  if (locale === "en") continue;
  const keys = new Set(flattenKeys(messages[locale]));
  const missing = enKeys.filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !enKeys.includes(k));
  if (missing.length || extra.length) {
    fail(
      `[${locale}] parity fail (missing ${missing.length}, extra ${extra.length})`,
    );
    msgErrors += 1;
  }
}

for (const locale of LOCALES) {
  for (const key of flattenKeys(messages[locale])) {
    const val = getByPath(messages[locale], key);
    if (typeof val === "string" && val.trim() === "") {
      fail(`[${locale}] empty: ${key}`);
      msgErrors += 1;
    }
  }
}

/** @type {Map<string, string[]>} */
const titles = new Map();
/** @type {Map<string, string[]>} */
const descriptions = new Map();
function addMeta(map, value, ref) {
  if (typeof value !== "string" || !value.trim()) return;
  const k = value.trim().toLowerCase();
  if (!map.has(k)) map.set(k, []);
  map.get(k).push(ref);
}
for (const locale of LOCALES) {
  const m = messages[locale];
  addMeta(titles, m.meta?.title, `${locale}:meta.title`);
  addMeta(descriptions, m.meta?.description, `${locale}:meta.description`);
  for (const page of Object.keys(m.pages || {})) {
    addMeta(titles, m.pages[page].metaTitle, `${locale}:pages.${page}.metaTitle`);
    addMeta(
      descriptions,
      m.pages[page].metaDescription,
      `${locale}:pages.${page}.metaDescription`,
    );
  }
}
function reportDupes(map, label) {
  for (const [, refs] of map) {
    /** @type {Record<string, string[]>} */
    const byLocale = {};
    for (const ref of refs) {
      const loc = ref.split(":")[0];
      if (!byLocale[loc]) byLocale[loc] = [];
      byLocale[loc].push(ref);
    }
    for (const [loc, list] of Object.entries(byLocale)) {
      if (list.length > 1) {
        fail(`duplicate ${label} in ${loc}: ${list.join(", ")}`);
        msgErrors += 1;
      }
    }
  }
}
reportDupes(titles, "title");
reportDupes(descriptions, "description");

const LENGTH_RULES = {
  "hero.line1": 48,
  "hero.line2": 48,
  "hero.line3": 48,
  "hero.blurb": 140,
  "hero.ctaWork": 22,
  "hero.ctaContact": 22,
  "finalCta.title": 48,
  "finalCta.blurb": 140,
  "finalCta.cta": 22,
  "nav.cta": 22,
};
let overages = 0;
for (const locale of LOCALES) {
  for (const [key, max] of Object.entries(LENGTH_RULES)) {
    const val = getByPath(messages[locale], key);
    if (typeof val === "string" && val.length > max) {
      const msg = `[${locale}] ${key}: ${val.length}>${max}`;
      if (strictLengths) {
        fail(msg);
        msgErrors += 1;
      } else warn(msg);
      overages += 1;
    }
  }
}
if (!msgErrors) ok(`messages ok (overages=${overages})`);
results.push({ name: "messages", status: msgErrors ? 1 : 0 });

// ── forbidden ──
console.log("\n── forbidden ──");
results.push({
  name: "forbidden",
  status: run(
    "check-forbidden-copy.mjs",
    contextual ? ["--contextual"] : [],
  ),
});

console.log("\n══ summary ══");
for (const r of results) {
  console.log(`${r.status === 0 ? "PASS" : "FAIL"}  ${r.name}`);
}
const failed = results.some((r) => r.status !== 0);
console.log(failed ? "RESULT  FAIL" : "RESULT  PASS");
process.exit(failed ? 1 : 0);
