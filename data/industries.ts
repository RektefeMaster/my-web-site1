export const INDUSTRY_SLUGS = [
  "manufacturing",
  "furniture",
  "hospitality",
  "local-services",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

export type IndustryMeta = {
  slug: IndustrySlug;
  schemaName: string;
  relatedProjectIds: string[];
};

export const INDUSTRY_LANDERS: IndustryMeta[] = [
  {
    slug: "manufacturing",
    schemaName: "Manufacturing company website design",
    relatedProjectIds: ["wcc"],
  },
  {
    slug: "furniture",
    schemaName: "Furniture website design",
    relatedProjectIds: ["aydnnacar"],
  },
  {
    slug: "hospitality",
    schemaName: "Hotel and hospitality website design",
    relatedProjectIds: ["casa-aurelia", "altitude-residence"],
  },
  {
    slug: "local-services",
    schemaName: "Local service website and SEO pages",
    relatedProjectIds: ["masal-koltuk"],
  },
];

export type IndustryRelated = { href: string; label: string };

export type IndustryContent = {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroBlurb: string;
  lead: string;
  hubTitle: string;
  hubBlurb: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  related: IndustryRelated[];
  ctaLabel: string;
  ctaTitle: string;
  ctaBlurb: string;
  ctaButton: string;
};

export function isIndustrySlug(value: string): value is IndustrySlug {
  return (INDUSTRY_SLUGS as readonly string[]).includes(value);
}
