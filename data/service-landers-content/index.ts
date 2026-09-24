import type { ServiceLanderSlug, ServiceLanderContent } from "../service-landers";

const byLocale: Record<
  string,
  () => Promise<Record<ServiceLanderSlug, ServiceLanderContent>>
> = {
  en: () => import("./en").then((m) => m.default),
  tr: () => import("./tr").then((m) => m.default),
  es: () => import("./es").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
};

export async function getServiceLander(
  locale: string,
  slug: ServiceLanderSlug,
): Promise<ServiceLanderContent | undefined> {
  const load = byLocale[locale] ?? byLocale.en;
  const pack = await load();
  if (pack[slug]) return pack[slug];
  if (locale !== "en") {
    const en = await byLocale.en();
    return en[slug];
  }
  return undefined;
}
