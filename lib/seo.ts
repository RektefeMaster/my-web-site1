import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE, absoluteUrl } from "@/lib/site";
import { localeTag } from "@/lib/i18n-tags";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { SERVICE_LANDERS } from "@/data/service-landers";
import { INDUSTRY_LANDERS } from "@/data/industries";
import {
  CITIES,
  CITY_REGIONS,
  CITY_CONTENT_REVIEWED,
  CITY_HUB_PATH,
  CITY_LOCALE,
} from "@/data/turkiye-cities";

/** Static marketing surfaces last touched in this SEO pass. */
export const CONTENT_UPDATED = "2026-08-28";

export const ORG_ID = `${SITE.url}/#org`;
export const PERSON_ID = `${SITE.url}/#founder`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export type Crumb = { name: string; path: string };

export const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/manifesto", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/approach", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/services/web-design",
    priority: 0.88,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/services/software",
    priority: 0.86,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/services/automation",
    priority: 0.86,
    changeFrequency: "monthly" as const,
  },
  { path: "/services/seo", priority: 0.84, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.83, changeFrequency: "monthly" as const },
  {
    path: "/industries/manufacturing",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/industries/furniture",
    priority: 0.78,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/industries/hospitality",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/industries/local-services",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/faq", priority: 0.72, changeFrequency: "monthly" as const },
  { path: "/glossary", priority: 0.68, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
] as const;

export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function sitemapLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return languages;
}

export function founderNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Nurullah Aydın",
    jobTitle: "Founder",
    url: absoluteUrl("en", "/manifesto"),
    worksFor: { "@id": ORG_ID },
  };
}

export function organizationNode(description: string) {
  return {
    "@type": ["ProfessionalService", "Organization"],
    "@id": ORG_ID,
    name: SITE.brand,
    alternateName: "METEK",
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon`,
      width: 256,
      height: 256,
    },
    image: `${SITE.url}/icon`,
    description,
    email: SITE.email,
    telephone: SITE.phoneTel,
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Türkiye",
      addressCountry: "TR",
    },
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Germany" },
    ],
    sameAs: [SITE.instagram],
    knowsLanguage: ["en", "tr", "es", "de"],
    knowsAbout: [
      "Custom website design",
      "Web development",
      "Admin panel development",
      "CRM interfaces",
      "WhatsApp business automation",
      "Instagram chatbot",
      "Technical SEO",
      "Manufacturing websites",
      "Hotel website design",
      "Furniture website design",
      "Local SEO",
      "CSS design systems",
      "Mobile app development",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.email,
        telephone: SITE.phoneTel,
        contactType: "sales",
        availableLanguage: ["English", "Turkish", "Spanish", "German"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "METEK Digital services",
      itemListElement: [
        ...SERVICE_LANDERS.map((lander, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: lander.schemaName,
            url: absoluteUrl("en", `/services/${lander.slug}`),
          },
        })),
        ...INDUSTRY_LANDERS.map((lander, index) => ({
          "@type": "Offer",
          position: SERVICE_LANDERS.length + index + 1,
          itemOffered: {
            "@type": "Service",
            name: lander.schemaName,
            url: absoluteUrl("en", `/industries/${lander.slug}`),
          },
        })),
      ],
    },
  };
}

export function websiteNode(locale: string) {
  return {
    "@type": "WebSite",
    "@id": `${WEBSITE_ID}-${locale}`,
    url: absoluteUrl(locale, ""),
    name: SITE.brand,
    inLanguage: localeTag(locale),
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbList(locale: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.path),
    })),
  };
}

export function faqPageNode(
  locale: string,
  path: string,
  faqs: { question: string; answer: string }[],
) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(locale, path)}#faq`,
    url: absoluteUrl(locale, path),
    inLanguage: localeTag(locale),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceNode({
  locale,
  path,
  name,
  description,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(locale, path),
    inLanguage: localeTag(locale),
    provider: { "@id": ORG_ID },
    areaServed: ["TR", "US", "DE"],
  };
}

export function webPageNode({
  locale,
  path,
  name,
  description,
  type = "WebPage",
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage" | "FAQPage";
}) {
  return {
    "@type": type,
    "@id": absoluteUrl(locale, path),
    url: absoluteUrl(locale, path),
    name,
    description,
    inLanguage: localeTag(locale),
    isPartOf: { "@id": `${WEBSITE_ID}-${locale}` },
    about: { "@id": ORG_ID },
  };
}

export function itemListNode(
  locale: string,
  path: string,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "ItemList",
    url: absoluteUrl(locale, path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(locale, item.path),
    })),
  };
}

export function definedTermSetNode(
  locale: string,
  path: string,
  name: string,
  terms: { term: string; definition: string }[],
) {
  return {
    "@type": "DefinedTermSet",
    "@id": `${absoluteUrl(locale, path)}#terms`,
    name,
    url: absoluteUrl(locale, path),
    inLanguage: localeTag(locale),
    hasDefinedTerm: terms.map((item) => ({
      "@type": "DefinedTerm",
      name: item.term,
      description: item.definition,
    })),
  };
}

export function howToNode({
  locale,
  path,
  name,
  description,
  steps,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(locale, path),
    inLanguage: localeTag(locale),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export const HOWTO_BLOG_SLUGS = new Set([
  "business-website-checklist",
  "technical-seo-checklist-business-website",
  "local-seo-for-service-businesses",
]);

export function graph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: absoluteUrl(locale, route.path),
        lastModified: CONTENT_UPDATED,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: sitemapLanguages(route.path) },
      });
    }

    for (const post of blogPosts) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: post.updated ?? post.date,
        changeFrequency: "monthly",
        priority: 0.58,
        alternates: { languages: sitemapLanguages(path) },
        images: [`${SITE.url}${post.image}`],
      });
    }

    for (const project of projects) {
      const path = `/work/${project.id}`;
      const images = project.desktopImage
        ? [`${SITE.url}${project.desktopImage}`]
        : undefined;
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: project.year
          ? `${project.year}-12-31`
          : CONTENT_UPDATED,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: { languages: sitemapLanguages(path) },
        ...(images ? { images } : {}),
      });
    }
  }

  /*
    Şehir yüzeyi yalnızca Türkçe (bkz. lib/city-seo.ts). Bu yüzden locale
    döngüsünün DIŞINDA ve `alternates` YOK: olmayan dil sürümüne hreflang
    vermek 404'e işaret eden bir dil etiketi bırakıyor.
  */
  entries.push({
    url: absoluteUrl(CITY_LOCALE, CITY_HUB_PATH),
    lastModified: CITY_CONTENT_REVIEWED,
    changeFrequency: "monthly",
    priority: 0.88,
  });

  for (const region of CITY_REGIONS) {
    entries.push({
      url: absoluteUrl(CITY_LOCALE, `${CITY_HUB_PATH}/bolge/${region}`),
      lastModified: CITY_CONTENT_REVIEWED,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const city of CITIES) {
    entries.push({
      url: absoluteUrl(CITY_LOCALE, `${CITY_HUB_PATH}/${city.slug}`),
      lastModified: CITY_CONTENT_REVIEWED,
      changeFrequency: "monthly",
      // Tier, ilin gerçek talep hacmini yansıtıyor; hepsini 0.8 yapmak
      // öncelik sinyalini tamamen anlamsız kılıyor.
      priority: city.tier === 1 ? 0.82 : city.tier === 2 ? 0.74 : 0.66,
    });
  }

  return entries;
}
