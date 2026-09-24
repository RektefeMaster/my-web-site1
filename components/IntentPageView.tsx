import PageHero from "./PageHero";
import PageCta from "./PageCta";
import FaqList from "./FaqList";
import Reveal from "./Reveal";
import RelatedIntentLinks from "./RelatedIntentLinks";
import type { ServiceLanderContent } from "@/data/service-landers";
import type { IndustryContent } from "@/data/industries";

type Crumb = { label: string; href?: string };
type IntentCopy = ServiceLanderContent | IndustryContent;

export default function IntentPageView({
  content,
  crumbs,
  faqHeading,
  relatedHeading,
}: {
  content: IntentCopy;
  crumbs: Crumb[];
  faqHeading: string;
  relatedHeading?: string;
}) {
  return (
    <>
      <PageHero
        label={content.heroLabel}
        title={content.heroTitle}
        blurb={content.heroBlurb}
        crumbs={crumbs}
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
                  <h2 className="font-display type-display col-span-10 max-w-[18ch] text-[clamp(1.15rem,6.5vw,3.5rem)] sm:text-[clamp(1.55rem,3.3vw,3.1rem)] leading-[1.46] tracking-[-0.03em] md:col-span-4">
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
        </div>
      </div>
      {content.faqs.length > 0 ? (
        <FaqList items={content.faqs} heading={faqHeading} />
      ) : null}
      {content.related && content.related.length > 0 && relatedHeading ? (
        <RelatedIntentLinks
          heading={relatedHeading}
          items={content.related}
        />
      ) : null}
      <PageCta
        label={content.ctaLabel}
        title={content.ctaTitle}
        blurb={content.ctaBlurb}
        cta={content.ctaButton}
      />
    </>
  );
}
