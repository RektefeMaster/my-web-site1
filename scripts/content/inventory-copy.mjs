#!/usr/bin/env node
/** Builds compact content-system/inventory/*.json */
import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  LOCALES,
  INVENTORY_DIR,
  loadMessages,
  flattenKeys,
  writeJson,
  ok,
} from "./_shared.mjs";

function buildMessagesInventory(messages) {
  const enKeys = flattenKeys(messages.en);
  /** @type {Record<string, number>} */
  const byNamespace = {};
  for (const key of enKeys) {
    const ns = key.split(".")[0];
    byNamespace[ns] = (byNamespace[ns] || 0) + 1;
  }

  /** @type {Record<string, { leafCount: number, missingVsEn: number, extraVsEn: number }>} */
  const parity = {};
  for (const locale of LOCALES) {
    const keys = new Set(flattenKeys(messages[locale]));
    parity[locale] = {
      leafCount: keys.size,
      missingVsEn: enKeys.filter((k) => !keys.has(k)).length,
      extraVsEn: [...keys].filter((k) => !enKeys.includes(k)).length,
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    locales: LOCALES,
    totalLeafKeysEn: enKeys.length,
    byNamespace,
    parity,
  };
}

function buildProjectInventory() {
  const projectsSrc = fs.readFileSync(
    path.join(ROOT, "data/projects.ts"),
    "utf8",
  );
  const projectIds = [...projectsSrc.matchAll(/id:\s*"([^"]+)"/g)].map(
    (m) => m[1],
  );
  return {
    generatedAt: new Date().toISOString(),
    count: projectIds.length,
    projectIds,
    sources: [
      "data/projects.ts",
      "data/project-card-copy.ts",
      "data/project-punch.ts",
      "data/project-details.ts",
      "data/project-galleries.ts",
    ],
  };
}

function buildBlogInventory() {
  const blogMeta = fs.readFileSync(path.join(ROOT, "data/blog.ts"), "utf8");
  const slugs = [...blogMeta.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  return {
    generatedAt: new Date().toISOString(),
    count: slugs.length,
    slugs,
    sources: LOCALES.map((l) => `data/blog-content/${l}.ts`),
  };
}

function buildMetadataInventory() {
  return {
    generatedAt: new Date().toISOString(),
    sources: [
      "app/[locale]/layout.tsx → meta.*",
      "messages → pages.*.metaTitle/metaDescription",
      "app/[locale]/opengraph-image.tsx → hero lines",
      "work/[slug] → project summary",
      "blog/[slug] → article title/excerpt",
    ],
  };
}

function buildHardcodedInventory() {
  return {
    generatedAt: new Date().toISOString(),
    known: [
      {
        file: "components/Footer.tsx",
        reason: "Decorative brand ring",
      },
      {
        file: "components/Intro.tsx",
        reason: "Intro brand mark",
      },
    ],
  };
}

const messages = loadMessages();
const messagesInv = buildMessagesInventory(messages);
const projectInv = buildProjectInventory();
const blogInv = buildBlogInventory();

writeJson(path.join(INVENTORY_DIR, "messages-keys.json"), messagesInv);
writeJson(path.join(INVENTORY_DIR, "project-content.json"), projectInv);
writeJson(path.join(INVENTORY_DIR, "blog-content.json"), blogInv);
writeJson(
  path.join(INVENTORY_DIR, "metadata-sources.json"),
  buildMetadataInventory(),
);
writeJson(
  path.join(INVENTORY_DIR, "unresolved-hardcoded-copy.json"),
  buildHardcodedInventory(),
);

ok(
  `inventory written (${messagesInv.totalLeafKeysEn} keys, ${projectInv.count} projects, ${blogInv.count} posts)`,
);
