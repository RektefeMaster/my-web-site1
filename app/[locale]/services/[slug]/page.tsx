import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import { routing } from "@/i18n/routing";
import JsonLd from "@/components/JsonLd";
import IntentPageView from "@/components/IntentPageView";
import {
  SERVICE_LANDER_SLUGS,
  isServiceLanderSlug,
} from "@/data/service-landers";
import { getServiceLander } from "@/data/service-landers-content";
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
    SERVICE_LANDER_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isServiceLanderSlug(slug)) return {};
  const content = await getServiceLander(locale, slug);
  if (!content) return {};
  return pageMeta(
    {
      locale,
      path: `/services/${slug}`,
      title: content.metaTitle,
      description: content.metaDescription,
    },
    parent,
  );
}

export default async function ServiceLanderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!isServiceLanderSlug(slug)) notFound();
  const content = await getServiceLander(locale, slug);
  if (!content) notFound();

  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const tFaq = await getTranslations("faqUi");
  const tIntent = await getTranslations("intent");
  const path = `/services/${slug}`;

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
      { name: nav("services"), path: "/services" },
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
          { label: nav("services"), href: "/services" },
          { label: content.heroLabel },
        ]}
        faqHeading={tFaq("sectionTitle")}
        relatedHeading={tIntent("related")}
      />
    </>
  );
}
