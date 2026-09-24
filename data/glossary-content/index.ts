import type { GlossaryPage } from "../glossary";

const byLocale: Record<string, () => Promise<GlossaryPage>> = {
  en: () => import("./en").then((m) => m.default),
  tr: () => import("./tr").then((m) => m.default),
  es: () => import("./es").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
};

export async function getGlossaryPage(locale: string): Promise<GlossaryPage> {
  const load = byLocale[locale] ?? byLocale.en;
  return load();
}
