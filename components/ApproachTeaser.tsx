"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

type Step = { title: string; body: string };

/** Ana sayfa süreci — eş kartlar değil, numaralı bir üretim föyü. */
export default function ApproachTeaser() {
  const t = useTranslations("approachTeaser");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="approach-home"
      className="cv-auto scroll-mt-[var(--nav-offset)] bg-background px-5 py-14 text-foreground md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-x-5 border-t border-foreground/20 pt-6 md:gap-x-6 md:pt-8">
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-display type-display text-[clamp(1.15rem,6.5vw,7rem)] sm:text-[clamp(3rem,8vw,7rem)] leading-[1.4] tracking-[-0.05em]">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={70} className="col-span-10 col-start-3 mt-8 md:col-span-3 md:col-start-10 md:mt-1">
            <p className="text-[15px] leading-[1.7] text-foreground/62">
              {t("blurb")}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 border-t border-foreground/20 md:mt-20">
          {steps.map((step, index) => (
            <li key={step.title} className="border-b border-foreground/20">
              <Reveal delay={index * 45}>
                <div className="grid grid-cols-[3rem_1fr] gap-x-4 py-6 md:grid-cols-12 md:gap-x-6 md:py-8">
                  <span className="font-mono text-[10px] font-bold tabular-nums tracking-[0.14em] text-foreground/62 md:col-span-1 md:pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`text-2xl font-bold leading-[1.08] tracking-[-0.035em] md:col-span-5 md:text-[clamp(2rem,4vw,3.75rem)] ${
                      index % 2 === 1 ? "md:col-start-3" : ""
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="col-start-2 mt-4 max-w-[40ch] text-[15px] leading-[1.7] text-foreground/62 md:col-span-4 md:col-start-9 md:mt-0 md:pt-2">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={100}>
          <div className="mt-10 grid grid-cols-12 gap-x-5 md:mt-14 md:gap-x-6">
            <p className="col-span-10 col-start-3 max-w-[46ch] font-subtitle text-base leading-relaxed text-foreground/68 md:col-span-5 md:col-start-7 md:text-lg">
              {t("principle")}
            </p>
            <Link
              href="/approach"
              scroll={false}
              className="group col-span-10 col-start-3 mt-8 inline-flex min-h-11 w-fit items-center gap-5 text-sm font-bold md:col-span-3 md:col-start-10"
            >
              {t("cta")}
              <span
                aria-hidden
                className="inline-flex size-10 items-center justify-center border border-foreground/30 transition-[background-color,color] group-hover:bg-foreground group-hover:text-background"
              >
                ↗
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
