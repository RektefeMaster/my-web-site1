"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import DecryptedText from "./DecryptedText";

/**
 * Atölye notu — "iş siteyle bitmiyor" argümanı, üç GERÇEK yüzeyle.
 *
 * Bu bölüm daha önce üç AI stok karesiydi (eller / parmak izi / heykel) ve
 * hiçbir şey kanıtlamıyordu. Artık üç yayındaki yüzeyden birer kare taşıyor:
 * vitrin (Havva, Köln) → mesaj (WhatsApp botu) → sistem (CSS tasarım sistemi).
 * Ana sayfada SelectedWork + FeaturedCase zaten proje galerisi; buradaki
 * kareler o yüzden ORADA GEÇMEYEN işlerden seçildi (tekrar yok) ve argüman
 * "başka proje" değil, "aynı ekip üç yüzeyi de kuruyor".
 *
 * Kadrajlar bilerek farklı: yatay (1920×1200) → telefon (900×1947) → yatay.
 * Eşit üçlü grid yerine asimetrik yayılma; şablon okuması bu yüzden kırılıyor.
 *
 * Perf: `cv-auto` ile görüş dışında boyama yok, next/image + ölçülmüş `sizes`,
 * parallax tek scrub trigger (reduced-motion'da yok).
 */

type Frame = {
  label: string;
  caption: string;
  alt: string;
};

/** Kadraj içinde yumuşak dikey kayma — kare "duvara asılı" değil, canlı. */
function useParallax(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isTouch = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
        const shots = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-parallax]")
        );
        shots.forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -3.5 },
            {
              yPercent: 3.5,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: isTouch ? 0.35 : 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope }
  );
}

function Caption({
  index,
  frame,
  align = "left",
}: {
  index: string;
  frame: Frame;
  align?: "left" | "split";
}) {
  if (align === "split") {
    return (
      <figcaption className="mt-5 border-t border-band-fg/15 pt-4 md:flex md:items-start md:justify-between md:gap-8">
        <span className="studio-caption__label">
          <DecryptedText
            text={index}
            animateOn="inViewHover"
            className="studio-caption__index"
          />
          <DecryptedText text={frame.label} animateOn="inViewHover" />
        </span>
        <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-band-fg/60 md:mt-0 md:text-right md:text-sm">
          {frame.caption}
        </p>
      </figcaption>
    );
  }

  return (
    <figcaption className="mt-5 border-t border-band-fg/15 pt-4">
      <span className="studio-caption__label">
        <DecryptedText
          text={index}
          animateOn="inViewHover"
          className="studio-caption__index"
        />
        <DecryptedText text={frame.label} animateOn="inViewHover" />
      </span>
      <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-band-fg/60">
        {frame.caption}
      </p>
    </figcaption>
  );
}

export default function StudioFrames() {
  const t = useTranslations("studioFrames");
  const frames = t.raw("frames") as Frame[];
  const sectionRef = useRef<HTMLElement>(null);
  useParallax(sectionRef);

  const [storefront, messaging, system] = frames;

  return (
    <section
      ref={sectionRef}
      className="cv-auto relative overflow-hidden border-t border-band-fg/10 bg-band px-5 py-14 text-band-fg md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Yayılma A: tez + vitrin ── */}
        <div className="grid grid-cols-12 gap-x-5 gap-y-12 md:gap-x-6">
          <div className="col-span-12 md:col-span-5 md:self-end md:pb-2">
            <Reveal delay={60}>
              <h2 className="border-t border-band-fg/18 pt-6 font-display type-display text-[clamp(1.15rem,6vw,5.25rem)] sm:text-[clamp(2.2rem,4.7vw,4.35rem)] font-bold leading-[1.44] tracking-[-0.045em]">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.7] text-band-fg/62">
                {t("lede")}
              </p>
            </Reveal>
          </div>

          <figure className="col-span-12 m-0 md:col-start-7 md:col-span-6">
            <Reveal mode="mask" delay={80}>
              <div className="studio-plate relative aspect-[16/10]">
                <Image
                  data-parallax
                  src="/projects/havva-baklava/desktop-air.jpg"
                  alt={storefront.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1279px) 50vw, 700px"
                  quality={85}
                  className="studio-plate__shot object-cover object-top"
                />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <Caption index="01" frame={storefront} align="split" />
            </Reveal>
          </figure>
        </div>

        {/* ── Yayılma B: mesaj (telefon) · ara söz ── */}
        <div className="mt-12 grid grid-cols-12 items-start gap-x-5 gap-y-10 border-t border-band-fg/10 pt-10 md:mt-16 md:gap-x-6 md:pt-12">
          <figure className="col-span-6 m-0 md:col-span-3">
            <Reveal mode="mask">
              {/* Telefon kadrajı: kaynak 900×1947, kırpma yok */}
              <div className="studio-plate studio-plate--device relative aspect-[900/1947]">
                <Image
                  src="/projects/whatsapp-bot/mobile.jpg"
                  alt={messaging.alt}
                  fill
                  sizes="(max-width: 767px) 46vw, (max-width: 1279px) 26vw, 320px"
                  quality={78}
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Caption index="02" frame={messaging} />
            </Reveal>
          </figure>

          <div className="col-span-12 md:col-start-5 md:col-span-5 md:mt-24">
            <Reveal delay={60}>
              <p className="font-subtitle text-lg leading-[1.45] text-band-fg/80 md:text-[1.6rem] md:leading-[1.4]">
                {t("pullQuote")}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Yayılma C: sistem, sağa kaçık ── */}
        <div className="mt-12 grid grid-cols-12 gap-x-5 md:mt-16 md:gap-x-6">
          <figure className="col-span-12 m-0 md:col-start-4 md:col-span-9">
            <Reveal mode="mask">
              <div className="studio-plate relative aspect-[16/10]">
                <Image
                  data-parallax
                  src="/projects/css-system/desktop.jpg"
                  alt={system.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1279px) 74vw, 1040px"
                  quality={85}
                  className="studio-plate__shot object-cover object-top"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Caption index="03" frame={system} align="split" />
            </Reveal>
          </figure>
        </div>
      </div>
    </section>
  );
}
