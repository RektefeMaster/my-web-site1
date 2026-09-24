import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import FaqList from "@/components/FaqList";
import { getFaqPage } from "@/data/faq-content";
import {
  breadcrumbList,
  faqPageNode,
  founderNode,
  graph,
  organizationNode,
  webPageNode,
} from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const page = await getFaqPage(locale);
  return pageMeta(
    {
      locale,
      path: "/faq",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    parent,
  );
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getFaqPage(locale);
  if (!page) notFound();
  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const tFaq = await getTranslations("faqUi");

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    webPageNode({
      locale,
      path: "/faq",
      name: page.metaTitle,
      description: page.metaDescription,
      type: "FAQPage",
    }),
    faqPageNode(locale, "/faq", page.faqs),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: page.heroLabel, path: "/faq" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        blurb={page.heroBlurb}
        crumbs={[
          { label: nav("home"), href: "/" },
          { label: page.heroLabel },
        ]}
      />
      <FaqList items={page.faqs} heading={tFaq("sectionTitle")} />
      <PageCta
        label={page.ctaLabel}
        title={page.ctaTitle}
        blurb={page.ctaBlurb}
        cta={page.ctaButton}
      />
    </>
  );
}
