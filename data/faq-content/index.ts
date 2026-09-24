import type { FaqItem } from "../service-landers";

export type FaqPageContent = {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroBlurb: string;
  faqs: FaqItem[];
  ctaLabel: string;
  ctaTitle: string;
  ctaBlurb: string;
  ctaButton: string;
};

const byLocale: Record<string, () => Promise<FaqPageContent>> = {
  en: () => import("./en").then((m) => m.default),
  tr: () => import("./tr").then((m) => m.default),
  es: () => import("./es").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
};

export async function getFaqPage(locale: string): Promise<FaqPageContent> {
  const load = byLocale[locale] ?? byLocale.en;
  return load();
}
