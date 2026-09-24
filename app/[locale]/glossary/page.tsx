import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import GlossaryView from "@/components/GlossaryView";
import { getGlossaryPage } from "@/data/glossary-content";
import {
  breadcrumbList,
  definedTermSetNode,
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
  const page = await getGlossaryPage(locale);
  return pageMeta(
    {
      locale,
      path: "/glossary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    parent,
  );
}

export default async function GlossaryRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getGlossaryPage(locale);
  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    webPageNode({
      locale,
      path: "/glossary",
      name: page.metaTitle,
      description: page.metaDescription,
    }),
    definedTermSetNode(
      locale,
      "/glossary",
      page.metaTitle,
      page.terms.map((term) => ({
        term: term.term,
        definition: term.short,
      })),
    ),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: page.heroLabel, path: "/glossary" },
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
      <GlossaryView lead={page.lead} terms={page.terms} />
      <PageCta
        label={page.ctaLabel}
        title={page.ctaTitle}
        blurb={page.ctaBlurb}
        cta={page.ctaButton}
      />
    </>
  );
}
