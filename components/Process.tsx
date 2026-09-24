"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, useGSAP, attachScrollReveal } from "@/lib/gsap";
import DecryptedText from "./DecryptedText";
import TextType from "./TextType";

type Step = {
  title: string;
  body: string[];
};

export default function Process() {
  const t = useTranslations("process");
  const locale = useLocale();
  const steps = t.raw("steps") as Step[];
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const entries = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-process-entry]"),
      );

      if (reduced) {
        gsap.set(entries, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      entries.forEach((entry) => {
        const entryTween = gsap.fromTo(
          entry,
          { opacity: 0, y: 48, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            force3D: true,
            paused: true,
          },
        );
        attachScrollReveal(entryTween, entry, { once: true });
      });
    },
    { scope: sectionRef, dependencies: [locale, steps.length] },
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="scroll-mt-[var(--nav-offset)] overflow-hidden bg-paper px-5 py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <header className="grid grid-cols-12 items-end gap-x-5 border-b border-foreground/20 pb-10 md:gap-x-6 md:pb-16">
          <div className="col-span-12 md:col-span-9">
            <h2
              /*
                Punto tavanı bu başlıkta ÖLÇÜLEREK kısıldı: 9vw/8rem ile
                TR "görüşmeden" 1024–1920px arasında kolonu 3–25px taşırıp
                `overflow-wrap: break-word` üzerinden sessizce ikiye
                bölünüyordu. Almanca "Veröffentlichung" 10.3em geniş ve
                hiçbir ortak ölçekle sığmıyor — dört dili birden küçültmek
                yerine tavan yalnız `html[lang=de]` altında iniyor.
              */
              className="max-w-[11ch] font-display type-display text-[clamp(1.15rem,6.5vw,8rem)] sm:text-[clamp(3.25rem,8.6vw,7.7rem)] [html[lang=de]_&]:text-[clamp(1.15rem,6.3vw,5.7rem)] font-bold leading-[1.4] tracking-[-0.052em]"
            >
              {t("title")}
            </h2>
            <div className="mt-4 flex min-h-[2.75rem] items-center gap-1.5 font-mono text-xs text-foreground/62 sm:min-h-[1.5rem]">
              <span className="font-bold text-accent">›</span>
              <TextType
                text={[
                  "Keşif & Kapsam Belirleme",
                  "Editoryal Tasarım & Tipografi",
                  "Next.js 16 Mimarisi & R3F",
                  "Maksimum Hız & Canlı Yayına Alma",
                ]}
                typingSpeed={40}
                deletingSpeed={20}
                pauseDuration={2200}
                showCursor={true}
                cursorCharacter="▍"
                startOnVisible={true}
                loop={true}
                className="font-mono text-xs font-medium text-foreground/75"
              />
            </div>
          </div>
          <div
            aria-hidden
            className="col-span-12 mt-8 flex items-end justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/62 md:col-span-3 md:mt-0 md:block md:text-right"
          >
            <span className="md:block">
              <DecryptedText text="01" animateOn="inViewHover" />
            </span>
            <span className="md:mt-2 md:block">
              <DecryptedText
                text={String(steps.length).padStart(2, "0")}
                animateOn="inViewHover"
              />
            </span>
          </div>
        </header>

        <ol>
          {steps.map((step, i) => {
            const shifted = i % 2 === 1;
            return (
              <li
                key={step.title}
                data-process-entry
                className="relative grid grid-cols-12 gap-x-5 border-b border-foreground/15 py-12 md:min-h-[21rem] md:gap-x-6 md:py-16"
              >
                <span
                  aria-hidden
                  className="col-span-12 font-display type-display text-[clamp(1.15rem,6.5vw,7.5rem)] sm:text-[clamp(4rem,9vw,7.5rem)] leading-[1.4] tracking-[-0.06em] text-foreground/[0.1] md:col-span-2"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <article className="col-span-12 mt-8 grid min-w-0 grid-cols-1 gap-10 md:col-span-10 md:mt-0 md:grid-cols-10 md:gap-x-6">
                  <h3
                    className={`min-w-0 font-display type-display text-[clamp(1.6rem,3vw,2.9rem)] font-bold leading-[1.46] tracking-[-0.04em] md:col-span-5 ${
                      shifted ? "md:col-start-2" : ""
                    }`}
                  >
                    {step.title}
                  </h3>
                  <div
                    className={`min-w-0 border-t border-foreground/25 ${
                      shifted
                        ? "md:col-start-7 md:col-span-4"
                        : "md:col-start-6 md:col-span-5"
                    }`}
                  >
                    {step.body.map((p, noteIndex) => (
                      <div
                        key={p}
                        className="grid grid-cols-[3rem_1fr] gap-3 border-b border-foreground/10 py-4"
                      >
                        <span
                          aria-hidden
                          className="font-mono text-[9px] font-bold tracking-[0.14em] text-foreground/62"
                        >
                          {String(i + 1).padStart(2, "0")}.{noteIndex + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-foreground/62 md:text-base">
                          {p}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
