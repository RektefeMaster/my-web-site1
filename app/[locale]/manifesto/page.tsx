import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import PageHero from "@/components/PageHero";
import StudioAbout from "@/components/StudioAbout";
import Manifesto from "@/components/Manifesto";
import PageCta from "@/components/PageCta";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.manifesto" });
  return pageMeta(
    {
      locale,
      path: "/manifesto",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    parent
  );
}

export default async function ManifestoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.manifesto");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        label={t("heroLabel")}
        title={t("heroTitle")}
        blurb={t("heroBlurb")}
        crumbs={[
          { label: nav("home"), href: "/" },
          { label: nav("about") },
        ]}
        showLanyard={true}
      />
      <StudioAbout />
      <Manifesto />
      <PageCta
        label={t("ctaLabel")}
        title={t("ctaTitle")}
        blurb={t("ctaBlurb")}
        cta={t("ctaButton")}
      />
    </>
  );
}
