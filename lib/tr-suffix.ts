/**
 * Turkish case suffixes for proper nouns (province names).
 *
 * Şehir sayfaları metni gövde içinde çekim ekiyle geçiyor ("Bursa'da",
 * "Gaziantep'in"). Eki elle 81 kez yazmak yerine ünlü uyumundan türetiyoruz;
 * kural belirlenimci, yalnızca birleşik `-eli` adları istisna.
 *
 * Kural:
 * - Son ünlü {a, ı, â} → kalın düz · {e, i, î} → ince düz
 *   {o, u, û} → kalın yuvarlak · {ö, ü} → ince yuvarlak
 * - Son ses sert ünsüzse (f s t k ç ş h p) bulunma/ayrılma eki sertleşir (d → t)
 * - Ünlüyle biten adlarda tamlayan/yönelme kaynaştırma `n`/`y` alır
 *
 * İstisna: `-eli` ile biten il adları (Kocaeli, Kırklareli, Tunceli) iyelik
 * taşıdığı için kaynaştırma `n`'si alır: "Kocaeli'nde", "Kocaeli'nin".
 */

const VOWELS = "aeıioöuüâîû";
const BACK_UNROUNDED = "aıâ";
const FRONT_UNROUNDED = "eiî";
const BACK_ROUNDED = "ouû";
const FRONT_ROUNDED = "öü";
const VOICELESS = "fstkçşhp";

/** Birleşik `-eli` il adları: iyelik kaynaştırması alır. */
const BUFFERED = new Set(["Kocaeli", "Kırklareli", "Tunceli"]);

type Harmony = "a" | "e";
type Rounding = "ı" | "i" | "u" | "ü";

function lastVowel(name: string): string {
  const lower = name.toLocaleLowerCase("tr-TR");
  for (let i = lower.length - 1; i >= 0; i -= 1) {
    if (VOWELS.includes(lower[i])) return lower[i];
  }
  return "a";
}

function harmony(name: string): Harmony {
  const v = lastVowel(name);
  return BACK_UNROUNDED.includes(v) || BACK_ROUNDED.includes(v) ? "a" : "e";
}

function rounding(name: string): Rounding {
  const v = lastVowel(name);
  if (BACK_UNROUNDED.includes(v)) return "ı";
  if (FRONT_UNROUNDED.includes(v)) return "i";
  if (BACK_ROUNDED.includes(v)) return "u";
  if (FRONT_ROUNDED.includes(v)) return "ü";
  return "ı";
}

function endsWithVowel(name: string): boolean {
  const lower = name.toLocaleLowerCase("tr-TR");
  return VOWELS.includes(lower[lower.length - 1]);
}

function hardened(name: string): boolean {
  const lower = name.toLocaleLowerCase("tr-TR");
  return VOICELESS.includes(lower[lower.length - 1]);
}

/** Bulunma: "İstanbul'da", "Uşak'ta", "Kocaeli'nde" */
export function loc(name: string): string {
  if (BUFFERED.has(name)) return `${name}'nde`;
  const d = hardened(name) ? "t" : "d";
  return `${name}'${d}${harmony(name)}`;
}

/** Ayrılma: "İzmir'den", "Sinop'tan", "Kocaeli'nden" */
export function abl(name: string): string {
  if (BUFFERED.has(name)) return `${name}'nden`;
  const d = hardened(name) ? "t" : "d";
  return `${name}'${d}${harmony(name)}n`;
}

/** Tamlayan: "Bursa'nın", "Gaziantep'in", "Kocaeli'nin" */
export function gen(name: string): string {
  if (BUFFERED.has(name)) return `${name}'nin`;
  const buffer = endsWithVowel(name) ? "n" : "";
  return `${name}'${buffer}${rounding(name)}n`;
}

/** Yönelme: "Konya'ya", "Sivas'a", "Kocaeli'ne" */
export function dat(name: string): string {
  if (BUFFERED.has(name)) return `${name}'ne`;
  const buffer = endsWithVowel(name) ? "y" : "";
  return `${name}'${buffer}${harmony(name)}`;
}

/** Belirtme: "Ankara'yı", "Trabzon'u", "Kocaeli'ni" */
export function acc(name: string): string {
  if (BUFFERED.has(name)) return `${name}'ni`;
  const buffer = endsWithVowel(name) ? "y" : "";
  return `${name}'${buffer}${rounding(name)}`;
}
