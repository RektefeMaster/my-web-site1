#!/usr/bin/env node
/**
 * Verifies evidence machine fields + proof-points claim schema.
 * Default: quiet summary. Pass --verbose for per-file OK lines.
 */
import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  EVIDENCE_DIR,
  PROOF_POINTS_PATH,
  ALLOWED_SURFACES,
  EVIDENCE_ID_RE,
  parseYamlFence,
  parseYamlListField,
  parseProofClaims,
  listEvidenceMarkdownFiles,
  fail,
  warn,
  ok,
} from "./_shared.mjs";

const REQUIRED_CLAIM_FIELDS = [
  "layer",
  "confidence",
  "priority",
  "tags",
  "allowed_surfaces",
  "claim",
  "evidence_ids",
  "bad",
  "good",
];
const VALID_LAYERS = new Set(["verified", "supported", "derived"]);
const VALID_PRIORITIES = new Set(["core", "secondary", "optional"]);
const verbose = process.argv.includes("--verbose");

let errors = 0;
function trackFail(msg) {
  fail(msg);
  errors += 1;
}

/** @type {Map<string, { file: string, fields: Record<string, string> }>} */
const byId = new Map();

for (const file of listEvidenceMarkdownFiles(EVIDENCE_DIR)) {
  const fields = parseYamlFence(fs.readFileSync(file, "utf8"));
  const rel = path.relative(ROOT, file);
  if (!fields?.id) {
    trackFail(`${rel}: missing yaml id`);
    continue;
  }
  if (!EVIDENCE_ID_RE.test(fields.id)) {
    trackFail(`${rel}: bad id ${fields.id}`);
  }
  if (!fields.path) trackFail(`${rel}: missing path`);
  if (!fields.type) trackFail(`${rel}: missing type`);
  if (byId.has(fields.id)) {
    trackFail(`duplicate evidence id ${fields.id}`);
  } else {
    byId.set(fields.id, { file: rel, fields });
  }
  if (fields.path && !fs.existsSync(path.join(ROOT, fields.path))) {
    trackFail(`${fields.id}: path missing → ${fields.path}`);
  } else if (fields.path && verbose) {
    ok(`${fields.id}: path ok`);
  }
  if (fields.type === "project") {
    if (!fields.anchor) trackFail(`${fields.id}: project needs anchor`);
    else {
      const projects = fs.readFileSync(
        path.join(ROOT, "data/projects.ts"),
        "utf8",
      );
      if (!projects.includes(`id: "${fields.anchor}"`)) {
        trackFail(`${fields.id}: anchor not in projects.ts`);
      }
    }
  }
}

if (!fs.existsSync(PROOF_POINTS_PATH)) {
  trackFail("proof-points.md missing");
  process.exit(1);
}

const proof = fs.readFileSync(PROOF_POINTS_PATH, "utf8");

// Brand contact facts must match the runtime source of truth. A path-only
// evidence check cannot catch a stale address copied into Markdown.
const siteSource = fs.readFileSync(path.join(ROOT, "lib/site.ts"), "utf8");
const siteEmail = siteSource.match(/\bemail:\s*["']([^"']+)["']/)?.[1];
if (!siteEmail) {
  trackFail("lib/site.ts: SITE.email could not be read");
} else {
  const brandEvidencePath = path.join(
    EVIDENCE_DIR,
    "brand",
    "BRAND-001.md",
  );
  const contactDocs = [
    { name: "proof-points.md", text: proof },
    ...(fs.existsSync(brandEvidencePath)
      ? [
          {
            name: "content-system/evidence/brand/BRAND-001.md",
            text: fs.readFileSync(brandEvidencePath, "utf8"),
          },
        ]
      : []),
  ];
  for (const doc of contactDocs) {
    const emails = new Set(
      [...doc.text.matchAll(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g)].map(
        (match) => match[0],
      ),
    );
    for (const email of emails) {
      if (email !== siteEmail) {
        trackFail(`${doc.name}: ${email} differs from SITE.email (${siteEmail})`);
      }
    }
  }
}

const claims = parseProofClaims(proof);
const claimIds = new Set();
/** @type {Set<string>} */
const referenced = new Set();

if (claims.length < 5) trackFail(`too few claims (${claims.length})`);

for (const claim of claims) {
  if (claimIds.has(claim.id)) trackFail(`duplicate claim ${claim.id}`);
  claimIds.add(claim.id);

  for (const field of REQUIRED_CLAIM_FIELDS) {
    if (!claim.fields[field]) trackFail(`${claim.id}: missing ${field}`);
  }
  if (claim.fields.layer && !VALID_LAYERS.has(claim.fields.layer)) {
    trackFail(`${claim.id}: bad layer`);
  }
  if (claim.fields.priority && !VALID_PRIORITIES.has(claim.fields.priority)) {
    trackFail(`${claim.id}: bad priority`);
  }
  const confidence = Number(claim.fields.confidence);
  if (
    claim.fields.confidence != null &&
    (Number.isNaN(confidence) || confidence < 0 || confidence > 100)
  ) {
    trackFail(`${claim.id}: bad confidence`);
  }
  for (const surface of parseYamlListField(
    claim.fields.allowed_surfaces || "",
  )) {
    if (!ALLOWED_SURFACES.includes(surface)) {
      trackFail(`${claim.id}: unknown surface ${surface}`);
    }
  }
  if (
    parseYamlListField(claim.fields.allowed_surfaces || "").includes("hero") &&
    confidence < 90
  ) {
    warn(`${claim.id}: on hero but confidence ${confidence} < 90`);
  }
  const eids = parseYamlListField(claim.fields.evidence_ids || "");
  if (!eids.length) trackFail(`${claim.id}: empty evidence_ids`);
  for (const eid of eids) {
    referenced.add(eid);
    if (!EVIDENCE_ID_RE.test(eid)) trackFail(`${claim.id}: bad eid ${eid}`);
    else if (!byId.has(eid)) trackFail(`${claim.id}: missing evidence ${eid}`);
  }
}

for (const [id] of byId) {
  if (!referenced.has(id)) warn(`orphan evidence ${id}`);
}
if (!proof.includes("writing_policy:")) {
  trackFail("missing writing_policy");
}

if (!errors) {
  ok(
    `evidence ok (${byId.size} files, ${claims.length} claims)`,
  );
}
process.exit(errors ? 1 : 0);
