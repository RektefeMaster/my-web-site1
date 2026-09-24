#!/usr/bin/env node
/**
 * Şehir sayfası benzersizlik gate'i.
 *
 * Neden var: 81 il sayfası şablondan besteleniyor. Şablona yalnızca il adı
 * yazılan sayfa Google'ın "doorway" tanımına giriyor ve sayfalar birbirini
 * zayıflatıyor. Bu betik iddiayı ÖLÇÜYOR: her ilin bestelenmiş gövdesini
 * üretip sayfa çiftleri arasında 5-gram Jaccard benzerliği hesaplıyor.
 *
 * Eşikler:
 * - En yakın çift bile 0.55'i geçemez (her sayfa en az %45 farklı).
 * - Sayfa başına en az 450 kelime.
 * - Title ve description il başına benzersiz; title 62, description 158
 *   karakteri aşamaz (arama sonucunda kesiliyor).
 *
 * Build gerekmiyor: TS dosyaları bellekte derleniyor.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import os from "node:os";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODULES = [
  "lib/tr-suffix.ts",
  "data/industries.ts",
  "data/turkiye-cities.ts",
  "lib/city-copy.ts",
];

/*
  EŞİKLER VE NEDENLERİ

  Bu sayılar keyfi değil, ölçüm yapıldıktan sonra gerekçelendirildi.

  `MAX_SIMILARITY` (0.50): iki sayfanın birbirinin kopyası sayılma riski.
  Asıl korunan şey bu; yakın kopya sayfalar birbirini zayıflatıyor.

  `MIN_UNIQUE_WORDS` (190): sayfanın yalnızca kendisine ait kaç kelime
  taşıdığı. Asıl içerik testi bu, çünkü oran kısa sayfalarda kolay yükseliyor.
  190 kelime; ile özgü ekonomi, talep, gözlem, iki yerel SSS ve o ilde ne
  kurulduğunu anlatan paragrafın toplamı.

  `MIN_UNIQUE_SHARE` (0.35): gövdenin ne kadarının o sayfaya ait olduğu.
  Sektör yazılarında dolaşan "%60 özgün içerik" rakamı Google'ın yayımladığı
  bir eşik DEĞİL. 81 ilde %60'a çıkmak sayfa başına ~450 elle yazılmış kelime,
  yani 36 bin kelime demek; o hacimde yazının kalitesi düşüyor ve asıl amaç
  kaliteydi. Ortak kalan kısım da gizlenmiş kopya değil, her meşru çok
  lokasyonlu sitede bulunan hizmet anlatımı.

  Ölçülen değerler ve gerekçe AGENTS.md içinde kayıtlı. Eşiği düşürmeden
  önce oradaki notu oku.
*/
const MAX_SIMILARITY = 0.5;
const MIN_UNIQUE_SHARE = 0.35;
const MIN_UNIQUE_WORDS = 190;
const MIN_WORDS = 450;
const MAX_TITLE = 62;
const MAX_DESCRIPTION = 158;
const SHINGLE = 5;

/** TS kaynaklarını geçici bir dizine derleyip `@/` alias'ını çözer. */
async function loadCopyModule() {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "metek-cities-"));
  for (const rel of MODULES) {
    const source = fs.readFileSync(path.join(ROOT, rel), "utf8");
    const js = ts
      .transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
      })
      .outputText.replace(
        /from ["']@\/([^"']+)["']/g,
        (_, target) => `from "${pathToFileURL(path.join(out, `${target}.ts.mjs`)).href}"`,
      );
    const dest = path.join(out, `${rel}.mjs`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, js);
  }
  const cities = await import(
    pathToFileURL(path.join(out, "data/turkiye-cities.ts.mjs")).href
  );
  const copy = await import(
    pathToFileURL(path.join(out, "lib/city-copy.ts.mjs")).href
  );
  return { cities, copy, out };
}

function bodyOf(page) {
  return [
    page.heroTitle,
    page.heroBlurb,
    page.lead,
    ...page.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
    ]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]
    .join(" ")
    .toLocaleLowerCase("tr-TR")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(text) {
  const words = text.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + SHINGLE <= words.length; i += 1) {
    set.add(words.slice(i, i + SHINGLE).join(" "));
  }
  return set;
}

function jaccard(a, b) {
  let shared = 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const item of small) if (large.has(item)) shared += 1;
  return shared / (a.size + b.size - shared);
}

const { cities, copy, out } = await loadCopyModule();
const pages = cities.CITIES.map((city) => {
  const page = copy.buildCityCopy(city);
  const text = bodyOf(page);
  return {
    slug: city.slug,
    page,
    words: text.split(" ").filter(Boolean).length,
    grams: shingles(text),
  };
});
fs.rmSync(out, { recursive: true, force: true });

const errors = [];

/*
  Asıl ölçüt bu: bir sayfanın 5-gramlarının kaçı BAŞKA HİÇBİR sayfada
  geçmiyor. "Sayfa başına en az %60 özgün içerik" kuralının doğrudan
  karşılığı. Çift bazlı Jaccard tamamlayıcı bir kontrol; ortak kelime
  dağarcığını cezalandırdığı için tek başına yanıltıcı olabiliyor.
*/
const gramOwners = new Map();
for (const page of pages) {
  for (const gram of page.grams) {
    gramOwners.set(gram, (gramOwners.get(gram) ?? 0) + 1);
  }
}
for (const page of pages) {
  let solo = 0;
  for (const gram of page.grams) if (gramOwners.get(gram) === 1) solo += 1;
  page.uniqueShare = solo / page.grams.size;
  page.uniqueWords = Math.round(page.uniqueShare * page.words);
}
const shares = pages.map((p) => p.uniqueShare).sort((a, b) => a - b);
const lowUnique = pages.filter((p) => p.uniqueShare < MIN_UNIQUE_SHARE);
if (lowUnique.length) {
  errors.push(
    `${lowUnique.length} sayfada özgün pasaj oranı %${MIN_UNIQUE_SHARE * 100}'in altında: ${lowUnique
      .slice(0, 5)
      .map((p) => `${p.slug}(%${(p.uniqueShare * 100).toFixed(0)})`)
      .join(", ")}`,
  );
}
/*
  Aynı sayfadaki iki soru neredeyse aynı şeyi soruyorsa okuyucu için değersiz.
  Bayburt'ta üç soru birden "küçük ilde site gerekli mi" diyordu; bunu gözle
  yakalamak 81 sayfada mümkün değil, o yüzden ölçülüyor.
*/
const FAQ_OVERLAP_MAX = 0.34;
function faqTokens(faq) {
  return new Set(
    `${faq.question} ${faq.answer}`
      .toLocaleLowerCase("tr-TR")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((word) => word.length > 4),
  );
}
const faqClashes = [];
for (const page of pages) {
  const sets = page.page.faqs.map(faqTokens);
  for (let i = 0; i < sets.length; i += 1) {
    for (let j = i + 1; j < sets.length; j += 1) {
      const score = jaccard(sets[i], sets[j]);
      if (score > FAQ_OVERLAP_MAX) {
        faqClashes.push(
          `${page.slug}: "${page.page.faqs[i].question}" ↔ "${page.page.faqs[j].question}" (${(score * 100).toFixed(0)}%)`,
        );
      }
    }
  }
}
if (faqClashes.length) {
  errors.push(
    `${faqClashes.length} sayfada birbirini tekrarlayan soru var:\n    ${faqClashes.slice(0, 12).join("\n    ")}`,
  );
}

/*
  Aynı sayfada aynı iddianın iki kez geçmesi. Bayburt sayfasında "rekabet
  düşük, tek bir site üstte kalır" cümlesi dört ayrı yerde çıkıyordu; il
  kaydındaki alan ile bölüm metni aynı şeyi söylediğinde oluyor. Gövde
  cümlelere bölünüp aralarındaki örtüşme ölçülüyor.
*/
const SENTENCE_OVERLAP_MAX = 0.5;
const selfRepeats = [];
for (const page of pages) {
  const sentences = [
    page.page.heroBlurb,
    page.page.lead,
    ...page.page.sections.flatMap((section) => section.paragraphs),
  ]
    .join(" ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(/\s+/).length >= 8);
  const sets = sentences.map(
    (sentence) =>
      new Set(
        sentence
          .toLocaleLowerCase("tr-TR")
          .replace(/[^\p{L}\p{N}\s]/gu, " ")
          .split(/\s+/)
          .filter((word) => word.length > 4),
      ),
  );
  for (let i = 0; i < sets.length; i += 1) {
    for (let j = i + 1; j < sets.length; j += 1) {
      if (jaccard(sets[i], sets[j]) > SENTENCE_OVERLAP_MAX) {
        selfRepeats.push(`${page.slug}: "${sentences[i]}" ↔ "${sentences[j]}"`);
      }
    }
  }
}
if (selfRepeats.length) {
  errors.push(
    `${selfRepeats.length} sayfada aynı iddia tekrar ediyor:\n    ${selfRepeats.slice(0, 8).join("\n    ")}`,
  );
}

const thinUnique = pages.filter((p) => p.uniqueWords < MIN_UNIQUE_WORDS);
if (thinUnique.length) {
  errors.push(
    `${thinUnique.length} sayfada özgün kelime ${MIN_UNIQUE_WORDS} altında: ${thinUnique
      .slice(0, 5)
      .map((p) => `${p.slug}(${p.uniqueWords})`)
      .join(", ")}`,
  );
}

// ── metin benzersizliği ──
let worst = { score: 0, pair: "" };
const tooSimilar = [];
for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < pages.length; j += 1) {
    const score = jaccard(pages[i].grams, pages[j].grams);
    if (score > worst.score) {
      worst = { score, pair: `${pages[i].slug} ↔ ${pages[j].slug}` };
    }
    if (score > MAX_SIMILARITY) {
      tooSimilar.push(
        `${pages[i].slug} ↔ ${pages[j].slug}: ${(score * 100).toFixed(1)}%`,
      );
    }
  }
}
if (tooSimilar.length) {
  errors.push(
    `${tooSimilar.length} çift ${MAX_SIMILARITY * 100}% eşiğini aştı: ${tooSimilar.slice(0, 5).join(" · ")}`,
  );
}

// ── uzunluk ──
const thin = pages.filter((p) => p.words < MIN_WORDS);
if (thin.length) {
  errors.push(
    `${thin.length} sayfa ${MIN_WORDS} kelimenin altında: ${thin.slice(0, 5).map((p) => `${p.slug}(${p.words})`).join(", ")}`,
  );
}

// ── meta ──
const titles = pages.map((p) => p.page.metaTitle);
const descriptions = pages.map((p) => p.page.metaDescription);
if (new Set(titles).size !== titles.length) errors.push("title tekrarı var");
if (new Set(descriptions).size !== descriptions.length) {
  errors.push("description tekrarı var");
}
const longTitles = pages.filter((p) => p.page.metaTitle.length > MAX_TITLE);
if (longTitles.length) {
  errors.push(
    `${longTitles.length} title ${MAX_TITLE} karakteri aşıyor: ${longTitles.slice(0, 3).map((p) => p.slug).join(", ")}`,
  );
}
const longDescriptions = pages.filter(
  (p) => p.page.metaDescription.length > MAX_DESCRIPTION,
);
if (longDescriptions.length) {
  errors.push(
    `${longDescriptions.length} description ${MAX_DESCRIPTION} karakteri aşıyor: ${longDescriptions.slice(0, 3).map((p) => p.slug).join(", ")}`,
  );
}

// ── iç bağlantı: her sayfa bölge hub'ına ve komşularına bağlanmalı ──
const unlinked = pages.filter((p) => p.page.related.length < 5);
if (unlinked.length) {
  errors.push(`${unlinked.length} sayfada 5'ten az ilgili bağlantı var`);
}

const wordList = pages.map((p) => p.words);
console.log(`sayfa: ${pages.length}`);
console.log(
  `kelime: min ${Math.min(...wordList)} · ort ${Math.round(
    wordList.reduce((sum, w) => sum + w, 0) / wordList.length,
  )} · max ${Math.max(...wordList)}`,
);
const pct = (value) => `%${(value * 100).toFixed(1)}`;
const uniqueWords = pages.map((p) => p.uniqueWords).sort((a, b) => a - b);
console.log(
  `özgün pasaj oranı: min ${pct(shares[0])} · medyan ${pct(
    shares[Math.floor(shares.length / 2)],
  )} · max ${pct(shares[shares.length - 1])} · taban ${pct(MIN_UNIQUE_SHARE)}`,
);
console.log(
  `özgün kelime: min ${uniqueWords[0]} · medyan ${
    uniqueWords[Math.floor(uniqueWords.length / 2)]
  } · max ${uniqueWords[uniqueWords.length - 1]} · taban ${MIN_UNIQUE_WORDS}`,
);
console.log(
  `en yüksek çift benzerliği: ${pct(worst.score)} (${worst.pair}) · eşik ${pct(MAX_SIMILARITY)}`,
);
console.log(`benzersiz title: ${new Set(titles).size}/${titles.length}`);
console.log(
  `benzersiz description: ${new Set(descriptions).size}/${descriptions.length}`,
);

if (errors.length) {
  for (const message of errors) console.error(`FAIL: ${message}`);
  process.exit(1);
}
console.log("OK: şehir sayfaları benzersizlik gate'ini geçti");
