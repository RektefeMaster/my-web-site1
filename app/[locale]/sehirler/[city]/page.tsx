import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import JsonLd from "@/components/JsonLd";
import IntentPageView from "@/components/IntentPageView";
import { CITIES, getCity, REGION_NAMES } from "@/data/turkiye-cities";
import { buildCityCopy } from "@/lib/city-copy";
import { graph, organizationNode, founderNode } from "@/lib/seo";
import {
  CITY_LOCALE,
  cityBreadcrumb,
  cityPath,
  cityServiceNodes,
  cityWebPageNode,
  regionPath,
  trBreadcrumbList,
  trFaqNode,
  trOnlyPageMeta,
} from "@/lib/city-seo";

/**
 * Şehir sayfası yalnızca `tr` locale'inde üretiliyor (bkz. lib/city-seo.ts).
 * `dynamicParams = false` diğer dillerde 404 verdiriyor; üretilmeyen bir dil
 * için isteğe bağlı render açık kalsaydı İngilizce adreste Türkçe sayfa
 * oluşurdu ve kopya içerik olarak indekslenirdi.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((city) => ({ locale: CITY_LOCALE, city: city.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; city: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const copy = buildCityCopy(city);
  return trOnlyPageMeta(
    {
      path: cityPath(city.slug),
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
    parent,
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city: slug } = await params;
  if (locale !== CITY_LOCALE) notFound();
  setRequestLocale(locale);
  const city = getCity(slug);
  if (!city) notFound();

  const copy = buildCityCopy(city);
  const path = cityPath(city.slug);

  const jsonLd = graph([
    organizationNode(copy.metaDescription),
    founderNode(),
    cityWebPageNode({
      path,
      name: copy.metaTitle,
      description: copy.metaDescription,
    }),
    ...cityServiceNodes(city),
    trFaqNode(path, copy.faqs),
    trBreadcrumbList(cityBreadcrumb(city)),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <IntentPageView
        content={copy}
        crumbs={[
          { label: "Ana sayfa", href: "/" },
          { label: "Şehirler", href: "/sehirler" },
          {
            label: REGION_NAMES[city.region],
            href: regionPath(city.region),
          },
          { label: city.name },
        ]}
        faqHeading="Sık sorulan sorular"
        relatedHeading="Yakındaki iller ve hizmetler"
      />
    </>
  );
}
