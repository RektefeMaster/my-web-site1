export type BlogCategory = "identity" | "digital" | "process" | "strategy";

export type BlogCluster = "seo" | "website" | "software" | "identity";

export type BlogPostMeta = {
  slug: string;
  date: string;
  /** ISO date — omit when unchanged since `date`. */
  updated?: string;
  readMinutes: number;
  category: BlogCategory;
  cluster: BlogCluster;
  accent: string;
  /** public/ altındaki kapak görseli */
  image: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogArticle = {
  title: string;
  excerpt: string;
  lead: string;
  imageAlt: string;
  sections: BlogSection[];
};

/** Slug sırası = yayın sırası (yeniden eskiye) */
export const blogPosts: BlogPostMeta[] = [
  {
    slug: "chatgpt-gemini-local-service",
    date: "2026-09-01",
    readMinutes: 7,
    category: "digital",
    cluster: "seo",
    accent: "#0c6b66",
    image: "/blog/chatgpt-gemini-local-service.webp",
  },
  {
    slug: "hotel-website-design",
    date: "2026-08-28",
    readMinutes: 7,
    category: "strategy",
    cluster: "website",
    accent: "#0c6b66",
    image: "/blog/hotel-website-design.webp",
  },
  {
    slug: "manufacturing-company-website",
    date: "2026-08-27",
    readMinutes: 7,
    category: "strategy",
    cluster: "website",
    accent: "#14171c",
    image: "/blog/manufacturing-company-website.webp",
  },
  {
    slug: "local-seo-for-service-businesses",
    date: "2026-08-25",
    readMinutes: 7,
    category: "digital",
    cluster: "seo",
    accent: "#0c6b66",
    image: "/blog/local-seo-for-service-businesses.webp",
  },
  {
    slug: "schema-markup-for-business-websites",
    date: "2026-08-24",
    readMinutes: 6,
    category: "digital",
    cluster: "seo",
    accent: "#cdd6dd",
    image: "/blog/schema-markup-for-business-websites.webp",
  },
  {
    slug: "wordpress-vs-custom-website",
    date: "2026-08-21",
    readMinutes: 6,
    category: "strategy",
    cluster: "website",
    accent: "#14171c",
    image: "/blog/wordpress-vs-custom-website.webp",
  },
  {
    slug: "b2b-website-quote-requests",
    date: "2026-08-19",
    readMinutes: 6,
    category: "process",
    cluster: "website",
    accent: "#0c6b66",
    image: "/blog/b2b-website-quote-requests.webp",
  },
  {
    slug: "how-to-choose-web-design-agency",
    date: "2026-08-28",
    readMinutes: 7,
    category: "strategy",
    cluster: "website",
    accent: "#0c6b66",
    image: "/blog/how-to-choose-web-design-agency.webp",
  },
  {
    slug: "multilingual-website-seo",
    date: "2026-08-26",
    readMinutes: 7,
    category: "digital",
    cluster: "seo",
    accent: "#14171c",
    image: "/blog/multilingual-website-seo.webp",
  },
  {
    slug: "custom-admin-panel-vs-crm",
    date: "2026-08-22",
    readMinutes: 6,
    category: "process",
    cluster: "software",
    accent: "#0c6b66",
    image: "/blog/custom-admin-panel-vs-crm.webp",
  },
  {
    slug: "business-website-checklist",
    date: "2026-08-18",
    readMinutes: 6,
    category: "strategy",
    cluster: "website",
    accent: "#cdd6dd",
    image: "/blog/business-website-checklist.webp",
  },
  {
    slug: "website-redesign-keep-seo",
    date: "2026-08-14",
    readMinutes: 7,
    category: "digital",
    cluster: "seo",
    accent: "#0c6b66",
    image: "/blog/website-redesign-keep-seo.webp",
  },
  {
    slug: "custom-website-vs-template",
    date: "2026-08-10",
    readMinutes: 6,
    category: "strategy",
    cluster: "website",
    accent: "#14171c",
    image: "/blog/custom-website-vs-template.webp",
  },
  {
    slug: "what-is-seo",
    date: "2026-08-05",
    readMinutes: 6,
    category: "digital",
    cluster: "seo",
    accent: "#0c6b66",
    image: "/blog/what-is-seo.webp",
  },
  {
    slug: "website-pricing-why-cheap-costs-more",
    date: "2026-08-05",
    readMinutes: 4,
    category: "strategy",
    cluster: "website",
    accent: "#14171c",
    image: "/blog/website-pricing-why-cheap-costs-more.webp",
  },
  {
    slug: "whatsapp-chatbot-for-business",
    date: "2026-08-05",
    readMinutes: 4,
    category: "digital",
    cluster: "software",
    accent: "#25D366",
    image: "/blog/whatsapp-chatbot-for-business.webp",
  },
  {
    slug: "technical-seo-checklist-business-website",
    date: "2026-08-05",
    readMinutes: 4,
    category: "digital",
    cluster: "seo",
    accent: "#0c6b66",
    image: "/blog/technical-seo-checklist-business-website.webp",
  },
  {
    slug: "identity-at-first-glance",
    date: "2026-07-18",
    readMinutes: 3,
    category: "identity",
    cluster: "identity",
    accent: "#0c6b66",
    image: "/blog/identity-at-first-glance.webp",
  },
  {
    slug: "system-not-logo",
    date: "2026-07-12",
    readMinutes: 3,
    category: "identity",
    cluster: "identity",
    accent: "#14171c",
    image: "/blog/system-not-logo.webp",
  },
  {
    slug: "editorial-web-as-sales",
    date: "2026-07-05",
    readMinutes: 3,
    category: "digital",
    cluster: "website",
    accent: "#cdd6dd",
    image: "/blog/editorial-web-as-sales.webp",
  },
  {
    slug: "quiet-luxury-online",
    date: "2026-06-28",
    readMinutes: 3,
    category: "strategy",
    cluster: "identity",
    accent: "#a8cfe4",
    image: "/blog/quiet-luxury-online.webp",
  },
  {
    slug: "brief-that-works",
    date: "2026-06-20",
    readMinutes: 3,
    category: "process",
    cluster: "software",
    accent: "#0c6b66",
    image: "/blog/brief-that-works.webp",
  },
];

export function getPostMeta(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostMeta(slug);
  if (!current) return blogPosts.slice(0, limit);

  const same = blogPosts.filter(
    (p) => p.slug !== slug && p.cluster === current.cluster
  );
  const rest = blogPosts.filter(
    (p) => p.slug !== slug && p.cluster !== current.cluster
  );
  return [...same, ...rest].slice(0, limit);
}
