import {
  INDUSTRY_SLUGS,
  type IndustryContent,
  type IndustrySlug,
} from "../industries";

const byLocale: Record<
  string,
  () => Promise<Record<IndustrySlug, IndustryContent>>
> = {
  en: () => import("./en").then((m) => m.default),
  tr: () => import("./tr").then((m) => m.default),
  es: () => import("./es").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
};

export async function getIndustry(
  locale: string,
  slug: IndustrySlug,
): Promise<IndustryContent | undefined> {
  const load = byLocale[locale] ?? byLocale.en;
  const pack = await load();
  if (pack[slug]) return pack[slug];
  if (locale !== "en") {
    const en = await byLocale.en();
    return en[slug];
  }
  return undefined;
}

export async function getIndustryHub(
  locale: string,
): Promise<{ slug: IndustrySlug; content: IndustryContent }[]> {
  const load = byLocale[locale] ?? byLocale.en;
  const pack = await load();
  return INDUSTRY_SLUGS.map((slug) => ({
    slug,
    content: pack[slug],
  }));
}
