import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import PageCta from "@/components/PageCta";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbList,
  founderNode,
  graph,
  organizationNode,
  webPageNode,
} from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return pageMeta(
    {
      locale,
      path: "/services",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    parent
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    webPageNode({
      locale,
      path: "/services",
      name: t("metaTitle"),
      description: t("metaDescription"),
      type: "CollectionPage",
    }),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: nav("services"), path: "/services" },
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
          { label: nav("services") },
        ]}
      />
      <Services variant="full" />
      <PageCta
        label={t("ctaLabel")}
        title={t("ctaTitle")}
        blurb={t("ctaBlurb")}
        cta={t("ctaButton")}
      />
    </>
  );
}
