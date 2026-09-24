"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import BlurText from "./BlurText";
import DecryptedText from "./DecryptedText";
import ScrollTextHighlight from "./ScrollTextHighlight";
import TextType from "./TextType";
import { forDisplay } from "@/lib/typography";

type DoItem = { title: string; body: string };

/**
 * Ajans / Hakkında gövdesi:
 * Stüdyo profili, çalışma modeli ve disiplin dökümü.
 */
export default function StudioAbout() {
  const t = useTranslations("about");
  const items = t.raw("items") as DoItem[];

  return (
    <>
      <section
        id="about"
        className="relative overflow-hidden border-b border-foreground/15 bg-paper text-foreground"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-28">
          {/* Stüdyo Başlık Çerçevesi */}
          <div className="grid grid-cols-12 border-y border-foreground/20">
            <aside className="col-span-12 border-b border-foreground/15 py-6 md:col-span-3 md:border-b-0 md:border-r md:py-10 md:pr-8">
              <Reveal>
                <DecryptedText
                  text={t("origin")}
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/62"
                />
                <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-foreground/68">
                  {t("practice")}
                </p>
              </Reveal>
            </aside>

            <div className="col-span-12 py-8 md:col-span-9 md:py-10 md:pl-10 lg:pl-16">
              <BlurText
                text={forDisplay(t("whoTitle"))}
                as="h2"
                className="max-w-3xl font-display type-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold leading-[1.35] tracking-[-0.04em]"
              />
            </div>
          </div>

          {/* İki Kolonlu Dengeli Editoryal Metin Bloğu */}
          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-x-12">
            <div className="md:col-span-6 md:border-r md:border-foreground/15 md:pr-12">
              <Reveal delay={60}>
                <p className="text-base leading-relaxed text-foreground/75 md:text-[1.05rem]">
                  {t("p1")}
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-[1.05rem]">
                  {t("p2")}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col justify-between md:col-span-6">
              <div>
                <blockquote className="border-l-2 border-foreground/30 pl-5 font-subtitle text-lg font-medium leading-snug text-foreground md:text-xl">
                  <ScrollTextHighlight text={forDisplay(t("highlight"))} as="span" />
                </blockquote>
                <Reveal delay={180}>
                  <p className="mt-6 text-base leading-relaxed text-foreground/65 md:text-[1.05rem]">
                    {t("p3")}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={220}>
                <div className="mt-10 border-t border-foreground/15 pt-5 text-sm text-foreground/68">
                  <span className="block font-semibold text-foreground/80">
                    {t("name")}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/62">
                    {t("role")}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmet Alanları / Uzmanlık Disiplini */}
      <section
        id="what-we-do"
        className="relative border-b border-foreground/15 bg-paper text-foreground"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-28">
          <div className="grid grid-cols-12 gap-x-5 md:gap-x-8">
            <div className="col-span-12 md:col-span-4">
              <Reveal>
                <DecryptedText
                  text={t("doLabel")}
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/62"
                />
                <BlurText
                  text={forDisplay(t("doTitle"))}
                  as="h2"
                  className="mt-4 max-w-[12ch] font-display type-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.3] tracking-[-0.035em]"
                />
                <p className="mt-6 max-w-sm text-base leading-relaxed text-foreground/62">
                  {t("doIntro")}
                </p>
                <div className="mt-4 flex min-h-[1.75rem] items-center gap-2 border-l border-foreground/30 pl-3 font-mono text-xs tracking-wide text-foreground/68">
                  <span className="font-bold text-accent">›</span>
                  <TextType
                    text={items.map((it) => it.title)}
                    typingSpeed={60}
                    pauseDuration={2200}
                    deletingSpeed={28}
                    showCursor={true}
                    cursorCharacter="▍"
                    startOnVisible={true}
                    loop={true}
                    className="font-mono text-xs font-medium text-foreground/75"
                  />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/20 pt-6 text-sm md:mt-12">
                  <Link
                    href="/work"
                    scroll={false}
                    className="group inline-flex min-h-10 items-center gap-2 font-semibold text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {t("linkWork")}
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </Link>
                  <Link
                    href="/services"
                    scroll={false}
                    className="group inline-flex min-h-10 items-center gap-2 font-semibold text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {t("linkServices")}
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 mt-12 md:col-span-8 md:mt-0">
              <ul className="border-t border-foreground/20">
                {items.map((item, i) => (
                  <li key={item.title} className="border-b border-foreground/15">
                    <Reveal delay={40 * i}>
                      <div className="grid grid-cols-1 gap-y-3 py-8 md:grid-cols-12 md:gap-x-6 md:py-10">
                        <span className="font-mono text-xs font-bold tracking-[0.18em] text-foreground/62 md:col-span-2">
                          <DecryptedText text={String(i + 1).padStart(2, "0")} />
                        </span>
                        <h3 className="font-display type-display text-xl font-bold leading-[1.4] tracking-[-0.025em] md:col-span-4 md:text-2xl">
                          {forDisplay(item.title)}
                        </h3>
                        <p className="text-base leading-relaxed text-foreground/65 md:col-span-6">
                          {item.body}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
