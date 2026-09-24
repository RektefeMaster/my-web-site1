import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "../..");
export const LOCALES = ["en", "tr", "es", "de"];
export const MESSAGES_DIR = path.join(ROOT, "messages");
export const INVENTORY_DIR = path.join(ROOT, "content-system", "inventory");
export const EVIDENCE_DIR = path.join(ROOT, "content-system", "evidence");
export const PROOF_POINTS_PATH = path.join(
  ROOT,
  "content-system",
  "brands",
  "metek",
  "proof-points.md",
);

export const ALLOWED_SURFACES = [
  "hero",
  "services",
  "project",
  "metadata",
  "blog",
  "about",
];

export const EVIDENCE_ID_RE = /^[A-Z][A-Z0-9]*-\d{3}$/;

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

export function flattenKeys(obj, prefix = "") {
  /** @type {string[]} */
  const keys = [];
  if (obj === null || typeof obj !== "object") return keys;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      const p = prefix ? `${prefix}[${i}]` : `[${i}]`;
      if (item !== null && typeof item === "object") {
        keys.push(...flattenKeys(item, p));
      } else {
        keys.push(p);
      }
    });
    return keys;
  }
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object") {
      keys.push(...flattenKeys(v, p));
    } else {
      keys.push(p);
    }
  }
  return keys;
}

export function getByPath(obj, keyPath) {
  const parts = keyPath.replace(/\[(\d+)\]/g, ".$1").split(".");
  let cur = obj;
  for (const part of parts) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

export function loadMessages() {
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const locale of LOCALES) {
    out[locale] = readJson(path.join(MESSAGES_DIR, `${locale}.json`));
  }
  return out;
}

/** First ```yaml / ```yml fence in a markdown file */
export function parseYamlFence(markdown) {
  const m = markdown.match(/```ya?ml\n([\s\S]*?)```/);
  if (!m) return null;
  /** @type {Record<string, string>} */
  const fields = {};
  for (const line of m[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const kv = trimmed.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!val.startsWith("[") && val.includes(" #")) {
      val = val.replace(/\s+#.*$/, "");
    }
    fields[kv[1]] = val.trim();
  }
  return fields;
}

export function parseYamlListField(raw) {
  if (!raw) return [];
  return raw
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((s) => s.replace(/["'\s]/g, ""))
    .filter(Boolean);
}

/** Claim blocks: ### `id` + following yaml fence */
export function parseProofClaims(proofMarkdown) {
  /** @type {{ id: string, fields: Record<string, string> }[]} */
  const claims = [];
  const re = /^### `([a-z0-9-]+)`\s*\n+```ya?ml\n([\s\S]*?)```/gm;
  let m;
  while ((m = re.exec(proofMarkdown))) {
    /** @type {Record<string, string>} */
    const fields = {};
    for (const line of m[2].split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const kv = trimmed.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
      if (!kv) continue;
      fields[kv[1]] = kv[2].trim();
    }
    claims.push({ id: m[1], fields });
  }
  return claims;
}

export function listEvidenceMarkdownFiles(dir = EVIDENCE_DIR) {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listEvidenceMarkdownFiles(full));
    else if (entry.name.endsWith(".md") && entry.name !== "README.md") {
      out.push(full);
    }
  }
  return out;
}

export function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

export function warn(message) {
  console.warn(`WARN: ${message}`);
}

export function ok(message) {
  console.log(`OK: ${message}`);
}
