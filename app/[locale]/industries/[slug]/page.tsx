import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import { routing } from "@/i18n/routing";
import JsonLd from "@/components/JsonLd";
import IntentPageView from "@/components/IntentPageView";
import { INDUSTRY_SLUGS, isIndustrySlug } from "@/data/industries";
import { getIndustry } from "@/data/industries-content";
import {
  breadcrumbList,
  faqPageNode,
  founderNode,
  graph,
  organizationNode,
  serviceNode,
  webPageNode,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    INDUSTRY_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isIndustrySlug(slug)) return {};
  const content = await getIndustry(locale, slug);
  if (!content) return {};
  return pageMeta(
    {
      locale,
      path: `/industries/${slug}`,
      title: content.metaTitle,
      description: content.metaDescription,
    },
    parent,
  );
}

export default async function IndustryLanderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!isIndustrySlug(slug)) notFound();
  const content = await getIndustry(locale, slug);
  if (!content) notFound();

  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const tFaq = await getTranslations("faqUi");
  const tIntent = await getTranslations("intent");
  const tIndustries = await getTranslations("pages.industries");
  const path = `/industries/${slug}`;

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    webPageNode({
      locale,
      path,
      name: content.metaTitle,
      description: content.metaDescription,
    }),
    serviceNode({
      locale,
      path,
      name: content.heroTitle,
      description: content.metaDescription,
    }),
    faqPageNode(locale, path, content.faqs),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: tIndustries("heroLabel"), path: "/industries" },
      { name: content.heroLabel, path },
    ]),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <IntentPageView
        content={content}
        crumbs={[
          { label: nav("home"), href: "/" },
          { label: tIndustries("heroLabel"), href: "/industries" },
          { label: content.heroLabel },
        ]}
        faqHeading={tFaq("sectionTitle")}
        relatedHeading={tIntent("related")}
      />
    </>
  );
}
