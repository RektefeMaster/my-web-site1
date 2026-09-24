#!/usr/bin/env node
/**
 * Forbidden copy checker.
 * critical → exit 1
 * warning → print WARN
 * contextual → skip automatic fail (listed for review only when explicit context match)
 */
import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  LOCALES,
  loadMessages,
  flattenKeys,
  getByPath,
  fail,
  warn,
  ok,
} from "./_shared.mjs";

/** @type {{ severity: string, pattern: RegExp, note: string }[]} */
const PATTERNS = [
  {
    severity: "critical",
    pattern: /\binnovative solutions?\b/i,
    note: "Empty brand praise without proof",
  },
  {
    severity: "critical",
    pattern: /\bcutting[- ]edge\b/i,
    note: "Generic AI/agency filler",
  },
  {
    severity: "critical",
    pattern: /\bbest[- ]in[- ]class\b/i,
    note: "Unprovable superlative",
  },
  {
    severity: "critical",
    pattern: /\bindustry[- ]leading\b/i,
    note: "Unprovable superlative",
  },
  {
    severity: "critical",
    pattern: /\bworld[- ]class\b/i,
    note: "Unprovable superlative",
  },
  {
    severity: "critical",
    pattern: /\bgame[- ]changing\b/i,
    note: "Empty hype",
  },
  {
    severity: "critical",
    pattern: /\bdigital excellence\b/i,
    note: "Empty agency praise",
  },
  {
    severity: "critical",
    pattern: /\btailored solutions?\b/i,
    note: "Empty agency praise",
  },
  {
    severity: "critical",
    pattern: /\bfuture[- ]proof\b/i,
    note: "Empty agency praise",
  },
  {
    severity: "critical",
    pattern: /\baward[- ]winning\b/i,
    note: "Awards claim without evidence",
  },
  {
    severity: "critical",
    pattern: /\bpassionate team\b/i,
    note: "Soft fluff",
  },
  {
    severity: "critical",
    pattern: /\bcustomer[- ]centric\b/i,
    note: "Soft fluff",
  },
  {
    severity: "critical",
    pattern: /\bresults[- ]driven\b/i,
    note: "Empty agency praise",
  },
  {
    severity: "critical",
    pattern: /\btrusted by\b/i,
    note: "Trust theatre without named proof",
  },
  {
    severity: "critical",
    pattern: /\bleverage\b/i,
    note: "Corporate filler verb",
  },
  {
    severity: "critical",
    pattern: /\bseamless(ly)?\b/i,
    note: "Overused AI adjective",
  },
  {
    severity: "critical",
    pattern: /\bdelve\b/i,
    note: "AI essay tell",
  },
  {
    severity: "critical",
    pattern: /\bin today's (digital )?world\b/i,
    note: "AI opener",
  },
  {
    severity: "critical",
    pattern: /\byenilikçi çözüm/i,
    note: "TR empty praise",
  },
  {
    severity: "critical",
    pattern: /\b(?:kısa bir (?:özet|not) yeter|a short (?:summary|note) is enough)\b/i,
    note: "Repeated stock CTA closer",
  },
  {
    severity: "critical",
    pattern: /\b(?:un resumen breve basta|ein kurzer (?:überblick|hinweis) genügt)\b/i,
    note: "Repeated stock CTA closer",
  },
  {
    severity: "critical",
    pattern: /\b(?:aynı dili konuş|speak the same language|habl\w* el mismo idioma|dieselbe sprache sprechen)\b/i,
    note: "Vague system metaphor; name the shared rules",
  },
  {
    severity: "critical",
    pattern: /\b(?:günümüz(?:ün)? dijital dünyasında|in the modern digital world|en el mundo digital actual|in der heutigen digitalen welt)\b/i,
    note: "Generic AI opener",
  },
  {
    severity: "critical",
    pattern: /\b(?:uçtan uca çözümler?|end[- ]to[- ]end solutions?|soluciones? integrales?|ganzheitliche lösungen?)\b/i,
    note: "Generic agency scope claim",
  },
  {
    severity: "warning",
    pattern: /\boutcome[- ]driven\b/i,
    note: "Agency jargon — prefer concrete outcome",
  },
  {
    severity: "warning",
    pattern: /\bdesign[- ]led\b/i,
    note: "Vague positioning",
  },
  {
    severity: "warning",
    pattern: /\bnot a pitch deck\b/i,
    note: "Self-referential CTA cliché",
  },
  {
    severity: "warning",
    pattern: /\btransform(ative|ation)?\b/i,
    note: "Vague transformation claim",
  },
  {
    severity: "warning",
    pattern: /\b(elevate|empower|redefine)\b/i,
    note: "Unearned brand verb",
  },
  {
    severity: "warning",
    pattern: /\bholistic\b/i,
    note: "Vague filler",
  },
  {
    severity: "warning",
    pattern: /\bsynergy\b/i,
    note: "Corporate filler",
  },
  {
    severity: "warning",
    pattern: /—/,
    note: "Em-dash pivot; rebuild the sentence for the final editorial pass",
  },
  {
    severity: "warning",
    pattern: /\b(?:tek akış|one flow|un solo recorrido|einem ablauf)\b/i,
    note: "Vague flow claim; describe the actual sequence",
  },
  {
    severity: "warning",
    pattern: /\b(?:bu yazıda|in this article|en este artículo|in diesem artikel)\b/i,
    note: "Meta narration; open on the subject instead",
  },
  {
    severity: "contextual",
    pattern: /\binnovative\b/i,
    note: "OK only with concrete referent; not auto-fail",
  },
];

function scanText(text, locale, key) {
  /** @type {{ severity: string, note: string, match: string, locale: string, key: string }[]} */
  const hits = [];
  for (const p of PATTERNS) {
    const m = text.match(p.pattern);
    if (m) {
      hits.push({
        severity: p.severity,
        note: p.note,
        match: m[0],
        locale,
        key,
      });
    }
  }
  return hits;
}

function collectCorpus() {
  /** @type {{ locale: string, key: string, text: string }[]} */
  const items = [];
  const messages = loadMessages();
  for (const locale of LOCALES) {
    for (const key of flattenKeys(messages[locale])) {
      const val = getByPath(messages[locale], key);
      if (typeof val === "string") {
        items.push({ locale, key: `messages:${key}`, text: val });
      }
    }
  }

  const dataFiles = [
    "data/project-card-copy.ts",
    "data/project-punch.ts",
    "data/project-details.ts",
    "data/blog-content/en.ts",
    "data/blog-content/tr.ts",
    "data/blog-content/es.ts",
    "data/blog-content/de.ts",
    "data/service-landers-content/en.ts",
    "data/service-landers-content/tr.ts",
    "data/service-landers-content/es.ts",
    "data/service-landers-content/de.ts",
    "data/faq-content/en.ts",
    "data/faq-content/tr.ts",
    "data/faq-content/es.ts",
    "data/faq-content/de.ts",
    "data/industries-content/en.ts",
    "data/industries-content/tr.ts",
    "data/industries-content/es.ts",
    "data/industries-content/de.ts",
    "data/glossary-content/en.ts",
    "data/glossary-content/tr.ts",
    "data/glossary-content/es.ts",
    "data/glossary-content/de.ts",
    // Şehir yüzeyi: 81 il kaydı, 7 bölge metni ve besteleyicinin havuzları.
    // Besteleme sonucu bu üç dosyadaki dizelerden çıkıyor, dolayısıyla
    // yasaklı kalıp taraması burada yapılmazsa 89 sayfa gate'in dışında kalır.
    "data/turkiye-cities.ts",
    "data/turkiye-regions.ts",
    "lib/city-copy.ts",
  ];
  for (const rel of dataFiles) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    const src = fs.readFileSync(full, "utf8");
    // Extract string literals roughly for scan
    const re = /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g;
    let m;
    let i = 0;
    while ((m = re.exec(src))) {
      const s = m[2];
      if (s.length < 12 || !/[a-zA-ZçğıöşüÇĞİÖŞÜáéíóúñäöüß]/u.test(s)) continue;
      if (!/\s/.test(s)) continue;
      items.push({ locale: "data", key: `${rel}#${i++}`, text: s });
    }
  }
  return items;
}

let critical = 0;
let warnings = 0;
const corpus = collectCorpus();

for (const item of corpus) {
  for (const hit of scanText(item.text, item.locale, item.key)) {
    if (hit.severity === "critical") {
      fail(`[critical] ${hit.locale} ${hit.key}: "${hit.match}" — ${hit.note}`);
      critical += 1;
    } else if (hit.severity === "warning") {
      warn(`[warning] ${hit.locale} ${hit.key}: "${hit.match}" — ${hit.note}`);
      warnings += 1;
    }
    // contextual: silent unless --contextual
  }
}

if (process.argv.includes("--contextual")) {
  for (const item of corpus) {
    for (const hit of scanText(item.text, item.locale, item.key)) {
      if (hit.severity === "contextual") {
        console.log(`[contextual] ${hit.locale} ${hit.key}: "${hit.match}" — ${hit.note}`);
      }
    }
  }
}

ok(`forbidden scan done (critical=${critical}, warnings=${warnings})`);
process.exit(critical ? 1 : 0);
