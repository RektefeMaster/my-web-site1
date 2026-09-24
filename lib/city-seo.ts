import type { Metadata, ResolvingMetadata } from "next";
import { SITE, absoluteUrl, localePath, socialMeta } from "@/lib/site";
import { localeTag } from "@/lib/i18n-tags";
import { ORG_ID, WEBSITE_ID } from "@/lib/seo";
import type { CityRecord } from "@/data/turkiye-cities";
import {
  REGION_NAMES,
  CITY_LOCALE,
  CITY_CONTENT_REVIEWED,
  CITY_HUB_PATH,
} from "@/data/turkiye-cities";
import { loc } from "@/lib/tr-suffix";

/**
 * Şehir yüzeyi yalnızca Türkçe yayınlanıyor.
 *
 * Neden: "Sivas web tasarım" araması Türkçe yapılıyor. Aynı sayfayı dört dile
 * çıkarmak 324 sayfa üretip hiçbirine gerçek okuyucu getirmiyor, üstelik
 * hreflang karşılıklılık ister; olmayan sürüme hreflang vermek 404'e işaret
 * eden bir dil etiketi bırakıyor. Tek dilli sayfada hreflang HİÇ verilmez,
 * yalnızca kendine dönen canonical yazılır.
 *
 * Sabitlerin kendisi `data/turkiye-cities.ts` içinde: `lib/seo.ts` de
 * okuyor ve bu modül zaten ona bağlı.
 */
export { CITY_LOCALE, CITY_CONTENT_REVIEWED, CITY_HUB_PATH };

export function cityPath(slug: string): string {
  return `${CITY_HUB_PATH}/${slug}`;
}

export function regionPath(slug: string): string {
  return `${CITY_HUB_PATH}/bolge/${slug}`;
}

/** Tek dilli sayfa metadata'sı: self-canonical, hreflang yok. */
export async function trOnlyPageMeta(
  {
    path,
    title,
    description,
  }: { path: string; title: string; description: string },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMeta = await parent;
  const social = socialMeta({
    locale: CITY_LOCALE,
    path,
    title,
    description,
  });
  return {
    title,
    description,
    alternates: {
      canonical: localePath(CITY_LOCALE, path),
    },
    openGraph: {
      ...social.openGraph,
      ...(parentMeta.openGraph?.images
        ? { images: parentMeta.openGraph.images }
        : {}),
    },
    twitter: {
      ...social.twitter,
      ...(parentMeta.twitter?.images
        ? { images: parentMeta.twitter.images }
        : {}),
    },
  };
}

/** Hizmet verilen il. Fiziksel şube iddiası DEĞİL, hizmet alanı beyanı. */
export function cityAreaNode(city: CityRecord) {
  return {
    "@type": "City",
    name: city.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.name,
      addressCountry: "TR",
    },
    containedInPlace: {
      "@type": "Country",
      name: "Türkiye",
    },
  };
}

/**
 * Şehir sayfasının WebPage düğümü.
 *
 * `dateModified` bilerek var: yapay zeka arama araçları uzun süre
 * dokunulmamış sayfayı alıntılama sırasından düşürüyor. Tarih
 * `CITY_CONTENT_REVIEWED` üzerinden tek yerden yönetiliyor.
 */
export function cityWebPageNode({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage";
}) {
  return {
    "@type": type,
    "@id": absoluteUrl(CITY_LOCALE, path),
    url: absoluteUrl(CITY_LOCALE, path),
    name,
    description,
    inLanguage: localeTag(CITY_LOCALE),
    isPartOf: { "@id": `${WEBSITE_ID}-${CITY_LOCALE}` },
    about: { "@id": ORG_ID },
    dateModified: CITY_CONTENT_REVIEWED,
    publisher: { "@id": ORG_ID },
  };
}

const CITY_SERVICES = [
  {
    slug: "web-design",
    name: (city: string) => `${city} web sitesi tasarımı ve geliştirme`,
    description: (city: string) =>
      `${loc(city)} işletmeler için özel web sitesi tasarımı ve kodlaması. Hazır tema kullanılmaz; sayfa yapısı, teklif yolu ve teknik SEO alanları yayın öncesi tamamlanır.`,
  },
  {
    slug: "software",
    name: (city: string) => `${city} yönetim paneli ve CRM yazılımı`,
    description: (city: string) =>
      `${loc(city)} işletmeler için içerik, teklif, randevu ve müşteri kaydını yöneten özel panel ve CRM arayüzü geliştirme.`,
  },
  {
    slug: "automation",
    name: (city: string) => `${city} WhatsApp ve Instagram otomasyonu`,
    description: (city: string) =>
      `${loc(city)} işletmeler için WhatsApp ve Instagram üzerinden gelen tekrar eden sorulara otomatik yanıt, randevu toplama ve personele devir kurulumu.`,
  },
  {
    slug: "seo",
    name: (city: string) => `${city} teknik SEO ve arama görünürlüğü`,
    description: (city: string) =>
      `${loc(city)} işletmeler için teknik SEO: başlık ve açıklama yapısı, taranabilirlik, canonical, site haritası, yerel arama ve yapay zeka yanıtlarında kaynak olma çalışması.`,
  },
] as const;

/** İl başına dört hizmet düğümü: site, yazılım, otomasyon ve SEO işi. */
export function cityServiceNodes(city: CityRecord) {
  const path = cityPath(city.slug);
  return CITY_SERVICES.map((service) => ({
    "@type": "Service",
    "@id": `${absoluteUrl(CITY_LOCALE, path)}#${service.slug}`,
    name: service.name(city.name),
    description: service.description(city.name),
    serviceType: service.name(city.name),
    url: absoluteUrl(CITY_LOCALE, path),
    inLanguage: localeTag(CITY_LOCALE),
    provider: { "@id": ORG_ID },
    areaServed: cityAreaNode(city),
    audience: {
      "@type": "BusinessAudience",
      name: `${city.name} ${city.sectors.slice(0, 2).join(" ve ")} işletmeleri`,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(CITY_LOCALE, "/contact"),
      servicePhone: SITE.phoneTel,
      availableLanguage: ["Turkish", "English"],
    },
  }));
}

export function cityBreadcrumb(city: CityRecord) {
  return [
    { name: "Ana sayfa", path: "" },
    { name: "Şehirler", path: CITY_HUB_PATH },
    { name: REGION_NAMES[city.region], path: regionPath(city.region) },
    { name: city.name, path: cityPath(city.slug) },
  ];
}

export function trBreadcrumbList(crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(CITY_LOCALE, crumb.path),
    })),
  };
}

export function trFaqNode(
  path: string,
  faqs: { question: string; answer: string }[],
) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(CITY_LOCALE, path)}#faq`,
    url: absoluteUrl(CITY_LOCALE, path),
    inLanguage: localeTag(CITY_LOCALE),
    dateModified: CITY_CONTENT_REVIEWED,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function trItemListNode(
  path: string,
  items: { name: string; path: string; description?: string }[],
) {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(CITY_LOCALE, path)}#list`,
    url: absoluteUrl(CITY_LOCALE, path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(CITY_LOCALE, item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}
