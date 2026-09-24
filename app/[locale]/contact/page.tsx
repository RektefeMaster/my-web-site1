import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta, SITE, whatsappHref } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import {
  breadcrumbList,
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
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return pageMeta(
    {
      locale,
      path: "/contact",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    parent,
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const whatsapp = await getTranslations("whatsapp");

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    webPageNode({
      locale,
      path: "/contact",
      name: t("metaTitle"),
      description: t("metaDescription"),
      type: "ContactPage",
    }),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: t("heroLabel"), path: "/contact" },
    ]),
  ]);

  const channels = [
    {
      label: t("emailLabel"),
      href: `mailto:${SITE.email}`,
      value: SITE.email,
    },
    {
      label: t("phoneLabel"),
      href: `tel:${SITE.phoneTel}`,
      value: SITE.phoneDisplay,
    },
    {
      label: t("whatsappLabel"),
      href: whatsappHref(whatsapp("prefill")),
      value: t("whatsappValue"),
      external: true,
    },
  ];

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
      <section className="border-b border-foreground/25 bg-background px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6">
          {channels.map((channel, index) => (
            <Reveal
              key={channel.label}
              delay={index * 40}
              className="col-span-12 border-t border-foreground/20 pt-5 md:col-span-4"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/62">
                {channel.label}
              </p>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-foreground hover:text-accent-ink"
              >
                {channel.value}
              </a>
            </Reveal>
          ))}
          <Reveal className="col-span-12 md:col-span-8 md:col-start-1">
            <p className="max-w-[52ch] text-sm leading-relaxed text-foreground/60">
              {t("hours")}
            </p>
          </Reveal>
        </div>
      </section>
      <section
        id="contact"
        className="scroll-mt-[var(--nav-offset)] bg-band px-5 py-14 text-band-fg md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-band-fg/55">
            {t("formLabel")}
          </p>
          <h2 className="mt-6 max-w-[14ch] font-display type-display text-[clamp(1.15rem,6.5vw,4.5rem)] sm:text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.4] tracking-[-0.04em]">
            {t("formTitle")}
          </h2>
          <div className="mt-12 border-t border-band-fg/20 pt-10">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
