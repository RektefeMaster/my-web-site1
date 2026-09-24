import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { CityRegionBlock } from "@/components/CityGrid";
import {
  CITIES,
  CITY_REGIONS,
  REGION_NAMES,
  citiesInRegion,
} from "@/data/turkiye-cities";
import { REGION_CONTENT } from "@/data/turkiye-regions";
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
  return [{ locale: CITY_LOCALE }];
}

const META_TITLE = "Türkiye Geneli Web Tasarım ve Yazılım | METEK Digital";
const META_DESCRIPTION =
  "81 ilde özel web sitesi tasarımı, yönetim paneli, WhatsApp otomasyonu ve teknik SEO. Şehrinizin sektörüne göre kurulan site, uzaktan yürüyen proje.";

const HUB_SECTIONS = [
  {
    heading: "Neden il başına ayrı sayfa",
    paragraphs: [
      "Aynı hizmeti veren firmanın Denizli'deki alıcısı ile Bodrum'daki alıcısı aynı şeyi aramıyor: biri gramaj ve minimum sipariş, diğeri oda tipi ve müsaitlik soruyor. Tek bir genel sayfa ikisine de yarım cevap veriyor.",
      "Bu yüzden her il sayfası o ilin sektörüne, ticaret merkezlerine ve gerçek satın alma sorusuna göre yazıldı. İl adı değiştirilmiş kopya sayfa üretmek arama motorunun kapı sayfası tanımına giriyor ve iki sayfayı birden zayıflatıyor.",
    ],
  },
  {
    heading: "Yaptığımız dört iş",
    paragraphs: [
      "Özel web sitesi tasarımı ve geliştirme, yönetim paneli ve CRM arayüzü, WhatsApp ve Instagram otomasyonu, teknik SEO ve arama görünürlüğü. Gerektiğinde mobil uygulama ve tasarım sistemi de aynı işin parçası oluyor.",
      "Dördü aynı anda gerekmiyor. Sitenin yapması gereken işe göre hangisinin kurulacağına ilk görüşmede karar veriliyor, kapsam yazıya döküldükten sonra tasarım başlıyor.",
    ],
  },
  {
    heading: "Uzaktan yürüyen proje",
    paragraphs: [
      "Görüşme, tasarım onayı, içerik toplama ve teslim uzaktan ilerliyor; ilin merkeze uzaklığı süreyi veya fiyatı değiştirmiyor. Proje boyunca tek bir sorumlu kişi kalıyor, böylece talepler kaybolmuyor.",
      "Yerinde fotoğraf çekimi veya toplantı gerekiyorsa ayrıca planlanıyor. Kayıtlar ve onaylar yazılı tutulduğu için teslim sonrası ne yapıldığı geriye dönük izlenebiliyor.",
    ],
  },
];

const HUB_FAQS = [
  {
    question: "Türkiye'nin her ilinde hizmet veriyor musunuz?",
    answer:
      "81 ilde proje alıyoruz. Görüşme, tasarım onayı ve teslim uzaktan yürüdüğü için ilin konumu süreyi veya fiyatı değiştirmiyor. Yerinde çekim gerekiyorsa ayrıca planlanıyor.",
  },
  {
    question: "Web sitesi yaptırmak ne kadar sürer?",
    answer:
      "Beş sayfalık bir hizmet sitesi ile panelli çok dilli kurumsal site aynı ürün değil, bu yüzden süre kapsama bağlı. Kapsam yazıya döküldükten sonra takvim veriliyor ve teslim tarihleri o takvimden takip ediliyor.",
  },
  {
    question: "Şehrimin adıyla aramada üstte çıkmak mümkün mü?",
    answer:
      "Rekabete bağlı. İstanbul'da aynı sorguya yüzlerce firma giriyor ve sıralama aylarla ölçülüyor; nüfusu küçük illerde doğru kurulmuş tek bir sayfa çok daha kısa sürede üstte kalabiliyor. Hızlı sonuç sözü veren teklif genellikle riskli yöntem kullanıyor.",
  },
  {
    question: "Sadece SEO çalışması da yapıyor musunuz?",
    answer:
      "Yapıyoruz. Mevcut site duruyorsa teknik SEO ayrı bir iş olarak alınabiliyor: başlık ve açıklama yapısı, taranabilirlik, canonical, site haritası, indeks kuralları ve yapay zeka yanıtlarında kaynak olma çalışması. Site yeniden yapılıyorsa bu kalemler teslimin içinde.",
  },
  {
    question: "Yapay zeka aramalarında görünmek için ne yapılıyor?",
    answer:
      "Yapay zeka arama araçları cevabı doğrudan veren pasajları alıntılıyor, o yüzden bölümler başlığın sorusunu ilk cümlede yanıtlayacak şekilde yazılıyor. Kurum, hizmet ve sık sorulan sorular yapılandırılmış veriyle işaretleniyor. Uzun süre dokunulmayan sayfa alıntılanma sırasını kaybettiği için içerik tarihli tutuluyor.",
  },
];

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  await params;
  return trOnlyPageMeta(
    {
      path: CITY_HUB_PATH,
      title: META_TITLE,
      description: META_DESCRIPTION,
    },
    parent,
  );
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== CITY_LOCALE) notFound();
  setRequestLocale(locale);

  const jsonLd = graph([
    organizationNode(META_DESCRIPTION),
    founderNode(),
    cityWebPageNode({
      path: CITY_HUB_PATH,
      name: META_TITLE,
      description: META_DESCRIPTION,
      type: "CollectionPage",
    }),
    trItemListNode(
      CITY_HUB_PATH,
      CITIES.map((city) => ({
        name: `${city.name} web tasarım ve yazılım`,
        path: cityPath(city.slug),
      })),
    ),
    trFaqNode(CITY_HUB_PATH, HUB_FAQS),
    trBreadcrumbList([
      { name: "Ana sayfa", path: "" },
      { name: "Şehirler", path: CITY_HUB_PATH },
    ]),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        label={`Türkiye · ${CITIES.length} il`}
        title="Şehrinizde web sitesi."
        blurb="Her ilin sektörü, alıcısı ve arama davranışı farklı. Sayfalar bu farka göre yazıldı; şehrinizi seçin."
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "Şehirler" }]}
      />
      <div className="bg-background px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="max-w-[62ch] text-[15px] leading-[1.8] text-foreground/70 md:ml-auto md:text-base">
              Türkiye&apos;nin 81 ilinde özel web sitesi, yönetim paneli, WhatsApp
              otomasyonu ve teknik SEO işi yapıyoruz. Aşağıdaki sayfalar bölgeye
              ve ile göre ayrıldı; her biri o ildeki sektöre ve alıcının gerçek
              sorusuna göre yazıldı.
            </p>
          </Reveal>
          <div className="mt-16 md:mt-24">
            {HUB_SECTIONS.map((section, index) => (
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
          <div className="mt-16 md:mt-24">
            {CITY_REGIONS.map((region, index) => (
              <CityRegionBlock
                key={region}
                index={index}
                title={REGION_NAMES[region]}
                blurb={REGION_CONTENT[region].hubBlurb}
                href={regionPath(region)}
                cities={citiesInRegion(region)}
              />
            ))}
          </div>
        </div>
      </div>
      <FaqList items={HUB_FAQS} heading="Sık sorulan sorular" />
      <PageCta
        label="İletişim"
        title="Şehrinizi ve işinizi yazın."
        blurb="İşletmeyi, ziyaretçinin sitede yapması gereken eylemi ve bunun ilk site mi yenileme mi olduğunu söyleyin. Kapsamı kuran sorularla döneriz."
        cta="Proje başlat"
      />
    </>
  );
}
