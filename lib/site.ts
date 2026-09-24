import type { Metadata, ResolvingMetadata } from "next";
import { routing } from "@/i18n/routing";
import { ogAlternateLocales, ogLocale } from "@/lib/i18n-tags";

/** Tek kaynak — iletişim ve sosyal sabitler */
export const SITE = {
  brand: "METEK Digital",
  email: "metehtec@gmail.com",
  phoneDisplay: "+90 506 055 02 39",
  phoneTel: "+905060550239",
  whatsapp: "905060550239",
  instagram: "https://www.instagram.com/meteknology",
  url: "https://www.metektechnologies.com",
} as const;

export function whatsappHref(prefill: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(prefill)}`;
}

/** `localePrefix: as-needed` — varsayılan dil önekle gezmez (`/` = EN) */
export function localePath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return path || "/";
  return path ? `/${locale}${path}` : `/${locale}`;
}

/**
 * Sayfa başına canonical + hreflang.
 *
 * Bu Next sürümünde relative canonical (`"./"`) route'a göre DEĞİL
 * `metadataBase`'e göre çözülüyor (bkz. generate-metadata.md "URL
 * Composition"), yani her sayfa kendi yolunu açıkça vermek zorunda.
 *
 * Neden şart: 4 dilli sitede hreflang yoksa Google hangi dili kime
 * göstereceğini bilemiyor ve 4 sürüm birbirinin kopyası sayılabiliyor.
 * Canonical de `as-needed` öneki yüzünden `/` ile `/en`'in ayrı sayfa
 * görünmesini engelliyor.
 */
export function alternatesFor(locale: string, path: string) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l, path)])
  );
  return {
    // Her dil KENDİNİ canonical gösterir; hepsi EN'i gösterirse
    // TR/ES/DE sürümleri kopya sayılıp indeksten düşer.
    canonical: localePath(locale, path),
    languages: {
      ...languages,
      "x-default": localePath(routing.defaultLocale, path),
    },
  };
}

/** Absolute URL — OG / JSON-LD (metadataBase relative canonical ile karışmasın). */
export function absoluteUrl(locale: string, path: string): string {
  return new URL(localePath(locale, path), SITE.url).toString();
}

/**
 * Sayfa özel openGraph + twitter.
 * Uyarı: Next nested `openGraph`’ı shallow replace eder — images’siz
 * openGraph, layout’taki opengraph-image dosyasını da siler. Alt sayfalarda
 * `pageMeta(..., parent)` kullan.
 */
export function socialMeta({
  locale,
  path,
  title,
  description,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absoluteUrl(locale, path);
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE.url}${image.startsWith("/") ? image : `/${image}`}`
    : undefined;
  return {
    openGraph: {
      title,
      description,
      url,
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      type,
      siteName: SITE.brand,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: ["Nurullah Aydın"],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

/** Alt rota metadata — parent OG/twitter görsellerini korur. */
export async function pageMeta(
  {
    locale,
    path,
    title,
    description,
    type = "website",
    image,
    publishedTime,
    modifiedTime,
  }: {
    locale: string;
    path: string;
    title: string;
    description: string;
    type?: "website" | "article";
    image?: string;
    publishedTime?: string;
    modifiedTime?: string;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMeta = await parent;
  const social = socialMeta({
    locale,
    path,
    title,
    description,
    type,
    image,
    publishedTime,
    modifiedTime,
  });
  const ogImages = image
    ? social.openGraph?.images
    : parentMeta.openGraph?.images;
  const twImages = image
    ? social.twitter?.images
    : parentMeta.twitter?.images;

  return {
    title,
    description,
    alternates: {
      ...alternatesFor(locale, path),
      types: {
        "application/rss+xml": `${SITE.url}/feed.xml`,
      },
    },
    openGraph: {
      ...social.openGraph,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      ...social.twitter,
      ...(twImages ? { images: twImages } : {}),
    },
  };
}
