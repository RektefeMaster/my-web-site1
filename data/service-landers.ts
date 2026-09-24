export const SERVICE_LANDER_SLUGS = [
  "web-design",
  "software",
  "automation",
  "seo",
] as const;

export type ServiceLanderSlug = (typeof SERVICE_LANDER_SLUGS)[number];

export type ServiceLanderMeta = {
  slug: ServiceLanderSlug;
  /** Schema.org Service.name — English catalog label, not UI copy. */
  schemaName: string;
};

export const SERVICE_LANDERS: ServiceLanderMeta[] = [
  { slug: "web-design", schemaName: "Custom website design and development" },
  { slug: "software", schemaName: "Admin panel, CRM, and application development" },
  { slug: "automation", schemaName: "WhatsApp and Instagram business automation" },
  { slug: "seo", schemaName: "Technical SEO for business websites" },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceLanderContent = {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroBlurb: string;
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: FaqItem[];
  related?: { href: string; label: string }[];
  ctaLabel: string;
  ctaTitle: string;
  ctaBlurb: string;
  ctaButton: string;
};

export function isServiceLanderSlug(value: string): value is ServiceLanderSlug {
  return (SERVICE_LANDER_SLUGS as readonly string[]).includes(value);
}
