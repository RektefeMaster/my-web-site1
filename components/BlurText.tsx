"use client";

import { useRef, createElement, Fragment, type ElementType } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP, attachScrollReveal } from "@/lib/gsap";
import { forDisplay } from "@/lib/typography";

type BlurTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  animateBy?: "words" | "letters";
  once?: boolean;
};

/**
 * BlurText: React Bits / Locomotive stili, editoryal blur-to-focus metin animasyonu.
 * Kelimeler veya harfler hafif bulanıklıktan (blur 8px) ve hafif ötelenmeden
 * netliğe doğru sırayla açılır.
 */
export default function BlurText({
  text,
  as = "h2",
  className = "",
  stagger = 0.04,
  delay = 0,
  duration = 0.75,
  animateBy = "words",
  once = true,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const locale = useLocale();
  const safe = forDisplay(text);

  const elements =
    animateBy === "words"
      ? safe.split(" ").filter(Boolean)
      : Array.from(safe);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const spans = el.querySelectorAll<HTMLElement>(".blur-text-item");
      if (!spans.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(spans, { opacity: 1, y: 0, filter: "blur(0px)" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isTouch = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
        const tween = gsap.fromTo(
          spans,
          {
            opacity: 0,
            y: isTouch ? 12 : 18,
            filter: isTouch ? "blur(5px)" : "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            ease: "power3.out",
            stagger,
            delay,
            force3D: true,
            paused: true,
            onComplete: () => {
              gsap.set(spans, { clearProps: "willChange,filter" });
            },
          }
        );

        attachScrollReveal(tween, el, {
          enter: "top 90%",
          once,
        });

        // Viewport senkronizasyonu
        const sync = () => {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.top < vh * 0.9 && rect.bottom > 0) {
            tween.progress(1);
            gsap.set(spans, { clearProps: "willChange,filter" });
          }
        };
        sync();
        requestAnimationFrame(sync);
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [safe, locale, stagger, delay, animateBy, once] }
  );

  return createElement(
    as,
    // eslint-disable-next-line react-hooks/refs
    { ref, className },
    animateBy === "words"
      ? elements.map((word, i) => (
          <Fragment key={`${locale}-${i}-${word}`}>
            <span
              className="blur-text-item inline-block will-change-[transform,opacity,filter]"
              style={{
                opacity: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            >
              {word}
            </span>
            {i < elements.length - 1 ? " " : null}
          </Fragment>
        ))
      : elements.map((char, i) => (
          <span
            key={`${locale}-${i}-${char}`}
            className="blur-text-item inline-block will-change-[transform,opacity,filter]"
            style={{
              opacity: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))
  );
}
