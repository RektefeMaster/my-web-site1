import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Principles from "@/components/Principles";
import ApproachBelowFold from "@/components/ApproachBelowFold";
import PageCta from "@/components/PageCta";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.approach" });
  return pageMeta(
    {
      locale,
      path: "/approach",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    parent
  );
}

export default async function ApproachPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.approach");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        label={t("heroLabel")}
        title={t("heroTitle")}
        blurb={t("heroBlurb")}
        crumbs={[
          { label: nav("home"), href: "/" },
          { label: nav("approach") },
        ]}
      />
      <Principles />
      <ApproachBelowFold />
      <PageCta
        label={t("ctaLabel")}
        title={t("ctaTitle")}
        blurb={t("ctaBlurb")}
        cta={t("ctaButton")}
      />
    </>
  );
}
