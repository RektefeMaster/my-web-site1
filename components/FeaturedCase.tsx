"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import DecryptedText from "./DecryptedText";

const FEATURED_MAIN_SIZES =
  "(min-width: 1360px) 737px, (min-width: 768px) calc((100vw - 80px) * 0.5833), calc(100vw - 40px)";
const FEATURED_LEFT_SIZES =
  "(min-width: 1360px) 500px, (min-width: 768px) calc((100vw - 80px) * 0.395), calc((100vw - 40px) * 0.5833)";
const FEATURED_RIGHT_SIZES =
  "(min-width: 1360px) 360px, (min-width: 768px) calc((100vw - 80px) * 0.282), calc((100vw - 40px) * 0.4167)";

/** Ana vaka: MASAL yayın sonrası sohbet motoru kayıtları. */
export default function FeaturedCase() {
  const t = useTranslations("featured");
  const outcomes = t.raw("outcomes") as string[];

  return (
    <section className="cv-auto overflow-hidden bg-paper px-5 py-14 text-foreground md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-6">
          <Reveal className="col-span-12 md:col-span-4 md:pt-2">
            <p className="border-t border-foreground/20 pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/62">
              <DecryptedText text={t("client")} animateOn="inViewHover" />
            </p>
            <h2 className="mt-8 font-display type-display text-[clamp(1.15rem,6vw,5.4rem)] sm:text-[clamp(2.3rem,4.7vw,4.4rem)] leading-[1.44] tracking-[-0.05em]">
              {t("title")}
            </h2>
            <p className="mt-3 font-mono text-[11px] font-bold text-accent">
              ChatGPT · Gemini · Google AI
            </p>
            <p className="mt-5 max-w-[64ch] text-[15px] leading-[1.7] text-foreground/62">
              {t("blurb")}
            </p>

            <ol className="mt-12 border-t border-foreground/18">
              {outcomes.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-foreground/18 py-4 text-sm leading-relaxed"
                >
                  <span className="font-mono text-[10px] font-bold tabular-nums text-foreground/62">
                    <DecryptedText
                      text={String(index + 1).padStart(2, "0")}
                      animateOn="inViewHover"
                    />
                  </span>
                  <span className="text-foreground/68">{item}</span>
                </li>
              ))}
            </ol>

            <Link
              href="/contact"
              scroll={false}
              className="group mt-9 inline-flex min-h-11 items-center gap-5 text-sm font-bold"
            >
              <DecryptedText text={t("cta")} animateOn="hover" />
              <span
                aria-hidden
                className="inline-flex size-10 items-center justify-center border border-foreground/30 transition-[background-color,color] group-hover:bg-foreground group-hover:text-paper"
              >
                ↗
              </span>
            </Link>
          </Reveal>

          <div className="col-span-12 mt-14 md:col-span-7 md:col-start-6 md:mt-0">
            <Reveal mode="mask" from="right" y={0}>
              <figure className="m-0">
                <div className="relative aspect-[16/11] overflow-hidden bg-stone">
                  <Image
                    src="/projects/masal-koltuk/proof/gemini-sofa.webp"
                    alt={t("shotHero")}
                    fill
                    sizes={FEATURED_MAIN_SIZES}
                    quality={85}
                    loading="lazy"
                    decoding="async"
                    className="object-contain object-top"
                  />
                </div>
                <figcaption className="grid gap-3 border-b border-foreground/18 py-5 md:grid-cols-[1fr_1fr] md:gap-8">
                  <p className="text-lg font-bold leading-tight tracking-tight">
                    {t("sceneTitle")}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/68">
                    {t("sceneBody")}
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-12 grid grid-cols-12 items-end gap-3 md:-ml-[18%] md:mt-16 md:gap-4">
              <Reveal mode="mask" className="col-span-7">
                <div className="relative aspect-[9/16] overflow-hidden bg-stone sm:aspect-[8/11]">
                  <Image
                    src="/projects/masal-koltuk/proof/chatgpt-steam.webp"
                    alt={t("shotKitchen")}
                    fill
                    sizes={FEATURED_LEFT_SIZES}
                    quality={78}
                    loading="lazy"
                    decoding="async"
                    className="object-contain object-top"
                  />
                </div>
              </Reveal>
              <Reveal mode="mask" delay={70} className="col-span-5 md:mb-[18%]">
                <div className="relative aspect-[9/16] overflow-hidden bg-stone sm:aspect-[8/11]">
                  <Image
                    src="/projects/masal-koltuk/proof/google-ai.webp"
                    alt={t("shotProjects")}
                    fill
                    sizes={FEATURED_RIGHT_SIZES}
                    quality={78}
                    loading="lazy"
                    decoding="async"
                    className="object-contain object-top"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
