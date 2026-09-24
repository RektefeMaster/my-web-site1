export type GlossaryTerm = {
  id: string;
  term: string;
  short: string;
  paragraphs: string[];
};

export type GlossaryPage = {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroBlurb: string;
  lead: string;
  terms: GlossaryTerm[];
  ctaLabel: string;
  ctaTitle: string;
  ctaBlurb: string;
  ctaButton: string;
};
