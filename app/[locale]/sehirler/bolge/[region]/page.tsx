import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import CityGrid from "@/components/CityGrid";
import {
  CITY_REGIONS,
  REGION_NAMES,
  citiesInRegion,
  isCityRegionSlug,
  type CityRegionSlug,
} from "@/data/turkiye-cities";
import { REGION_CONTENT } from "@/data/turkiye-regions";
import { cityHubBlurb } from "@/lib/city-copy";
import { graph, organizationNode, founderNode } from "@/lib/seo";
import {
  CITY_HUB_PATH,
  CITY_LOCALE,
  cityPath,
  cityWebPageNode,
  regionPath,
  trBreadcrumbList,
  trFaqNode,
  trItemListNode,
  trOnlyPageMeta,
} from "@/lib/city-seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_REGIONS.map((region) => ({
    locale: CITY_LOCALE,
    region,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; region: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { region } = await params;
  if (!isCityRegionSlug(region)) return {};
  const content = REGION_CONTENT[region];
  return trOnlyPageMeta(
    {
      path: regionPath(region),
      title: content.metaTitle,
      description: content.metaDescription,
    },
    parent,
  );
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}) {
  const { locale, region } = await params;
  if (locale !== CITY_LOCALE) notFound();
  setRequestLocale(locale);
  if (!isCityRegionSlug(region)) notFound();

  const slug = region as CityRegionSlug;
  const content = REGION_CONTENT[slug];
  const cities = citiesInRegion(slug);
  const path = regionPath(slug);

  const jsonLd = graph([
    organizationNode(content.metaDescription),
    founderNode(),
    cityWebPageNode({
      path,
      name: content.metaTitle,
      description: content.metaDescription,
      type: "CollectionPage",
    }),
    trItemListNode(
      path,
      cities.map((city) => ({
        name: `${city.name} web tasarım ve yazılım`,
        path: cityPath(city.slug),
        description: cityHubBlurb(city),
      })),
    ),
    trFaqNode(path, content.faqs),
    trBreadcrumbList([
      { name: "Ana sayfa", path: "" },
      { name: "Şehirler", path: CITY_HUB_PATH },
      { name: REGION_NAMES[slug], path },
    ]),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        label={`${REGION_NAMES[slug]} · ${cities.length} il`}
        title={content.heroTitle}
        blurb={content.heroBlurb}
        crumbs={[
          { label: "Ana sayfa", href: "/" },
          { label: "Şehirler", href: CITY_HUB_PATH },
          { label: REGION_NAMES[slug] },
        ]}
      />
      <div className="bg-background px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="max-w-[62ch] text-[15px] leading-[1.8] text-foreground/70 md:ml-auto md:text-base">
              {content.lead}
            </p>
          </Reveal>
          <div className="mt-16 md:mt-24">
            {content.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 30}>
                <section className="grid grid-cols-12 gap-x-4 gap-y-5 border-t border-foreground/25 py-10 md:gap-x-6 md:py-14">
                  <p className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62 md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display type-display col-span-10 max-w-[18ch] text-[clamp(1.15rem,6.5vw,3.5rem)] leading-[1.46] tracking-[-0.03em] sm:text-[clamp(1.55rem,3.3vw,3.1rem)] md:col-span-4">
                    {section.heading}
                  </h2>
                  <div className="col-span-10 col-start-3 space-y-5 md:col-span-6 md:col-start-7">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="text-[15px] leading-[1.8] text-foreground/70 md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h2 className="font-display type-display mt-16 max-w-[18ch] text-[clamp(1.15rem,6.5vw,3.5rem)] leading-[1.46] tracking-[-0.03em] sm:text-[clamp(1.55rem,3.3vw,3.1rem)] md:mt-24">
              {REGION_NAMES[slug]} illeri
            </h2>
          </Reveal>
          <div className="mt-10">
            <CityGrid cities={cities} showSectors />
          </div>
        </div>
      </div>
      <FaqList items={content.faqs} heading="Sık sorulan sorular" />
      <PageCta
        label="İletişim"
        title="Hangi ilde olduğunuzu yazın."
        blurb="İşletmeyi, ziyaretçinin sitede yapması gereken eylemi ve bunun ilk site mi yenileme mi olduğunu söyleyin. Kapsamı kuran sorularla döneriz."
        cta="Proje başlat"
      />
    </>
  );
}
