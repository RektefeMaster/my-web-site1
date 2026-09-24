import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import IndustryIndex from "@/components/IndustryIndex";
import JsonLd from "@/components/JsonLd";
import { getIndustryHub } from "@/data/industries-content";
import {
  breadcrumbList,
  founderNode,
  graph,
  itemListNode,
  organizationNode,
  webPageNode,
} from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.industries" });
  return pageMeta(
    {
      locale,
      path: "/industries",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    parent,
  );
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.industries");
  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const items = await getIndustryHub(locale);

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    webPageNode({
      locale,
      path: "/industries",
      name: t("metaTitle"),
      description: t("metaDescription"),
      type: "CollectionPage",
    }),
    itemListNode(
      locale,
      "/industries",
      items.map((item) => ({
        name: item.content.hubTitle,
        path: `/industries/${item.slug}`,
      })),
    ),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: t("heroLabel"), path: "/industries" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        label={t("heroLabel")}
        title={t("heroTitle")}
        blurb={t("heroBlurb")}
        crumbs={[
          { label: nav("home"), href: "/" },
          { label: t("heroLabel") },
        ]}
      />
      <IndustryIndex items={items} />
      <PageCta
        label={t("ctaLabel")}
        title={t("ctaTitle")}
        blurb={t("ctaBlurb")}
        cta={t("ctaButton")}
      />
    </>
  );
}
