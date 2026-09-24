"use client";

import { useTranslations } from "next-intl";
import { forDisplay } from "@/lib/typography";
import Reveal from "./Reveal";
import BlurText from "./BlurText";
import DecryptedText from "./DecryptedText";
import TextType from "./TextType";

/**
 * Ajans / Manifesto bölümü:
 * Stüdyonun temel tasarım ve mühendislik ilkelerini editoryal ve rafine animasyonlarla sunar.
 */
export default function Manifesto() {
  const t = useTranslations("manifesto");
  const lines = (t.raw("lines") as string[]).map(forDisplay);

  return (
    <section
      id="manifesto"
      className="relative border-b border-band-fg/20 bg-band px-5 py-20 text-band-fg md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Üst Editoryal Başlık */}
        <div className="mb-14 grid grid-cols-12 gap-x-5 border-b border-band-fg/20 pb-8 md:mb-20 md:gap-x-6 md:pb-12">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <DecryptedText
                text={t("label")}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-band-fg/55"
              />
            </Reveal>
            <div className="mt-3 flex min-h-[1.5rem] items-center gap-1.5 font-mono text-[11px] text-band-fg/55">
              <span className="font-bold text-accent">›</span>
              <TextType
                text={[
                  "Tavizsiz editoryal estetik",
                  "Sıfır hazır şablon garantisi",
                  "Ölçülebilir hız ve güvenilirlik"
                ]}
                typingSpeed={40}
                pauseDuration={2400}
                deletingSpeed={22}
                showCursor={true}
                cursorCharacter="▍"
                startOnVisible={true}
                loop={true}
                className="font-mono text-[11px] text-band-fg/65"
              />
            </div>
          </div>
          <div className="col-span-12 mt-4 md:col-span-9 md:mt-0">
            <BlurText
              text="Tasarım ve mühendislik standartlarımız."
              as="h2"
              className="max-w-2xl font-display type-display text-2xl font-bold tracking-[-0.03em] text-band-fg md:text-3xl lg:text-4xl"
            />
          </div>
        </div>

        {/* 4 İlkeli Editoryal Izgara */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex flex-col justify-between border-t border-band-fg/20 pt-6 md:pt-8"
            >
              <div className="flex items-center justify-between">
                <DecryptedText
                  text={String(i + 1).padStart(2, "0")}
                  className="font-mono text-xs font-bold tracking-[0.18em] text-band-fg/55"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-band-fg/55">
                  Standart
                </span>
              </div>
              <BlurText
                text={line}
                as="p"
                delay={i * 0.12}
                stagger={0.03}
                className="mt-6 font-display type-display text-xl font-medium leading-[1.45] tracking-[-0.025em] text-band-fg md:text-2xl lg:text-[1.75rem]"
              />
            </div>
          ))}
        </div>

        {/* Alt Kolofon */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-band-fg/20 pt-8 text-xs text-band-fg/50 md:mt-24">
          <Reveal delay={120}>
            <DecryptedText
              text={t("stamp")}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-band-fg/60"
            />
          </Reveal>
          <Reveal delay={140}>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-band-fg/55">
              Özel Web ve Yazılım Stüdyosu
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
