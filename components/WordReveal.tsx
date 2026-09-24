"use client";

import { useRef, createElement, Fragment, type ElementType } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP, attachScrollReveal } from "@/lib/gsap";
import { forDisplay } from "@/lib/typography";

type WordRevealProps = {
  /** Düz metin — kelimelere bölünüp maskeli yükseltilir */
  text: string;
  as?: ElementType;
  className?: string;
  /** Kelime başına gecikme (sn) */
  stagger?: number;
  delay?: number;
};

/**
 * Ajans imzası başlık reveal'ı — her kelime maskeden yukarı doğar.
 * TR alt-uzantı + DE umlaut için padding; dil değişince viewport’taysa hemen görünür.
 */
export default function WordReveal({
  text,
  as = "h2",
  className = "",
  stagger = 0.055,
  delay = 0,
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const locale = useLocale();
  const safe = forDisplay(text);
  const words = safe.split(" ").filter(Boolean);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inners = el.querySelectorAll<HTMLElement>(".word-reveal-inner");
      if (!inners.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(inners, { yPercent: 0, opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const settle = () => {
          inners.forEach((node) => node.classList.add("is-settled"));
        };
        const unsettle = () => {
          inners.forEach((node) => node.classList.remove("is-settled"));
        };

        const tween = gsap.fromTo(
          inners,
          { yPercent: 118, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger,
            delay,
            force3D: true,
            paused: true,
            onComplete: settle,
            onReverseComplete: unsettle,
          }
        );
        attachScrollReveal(tween, el, {
          enter: "top 88%",
          onEnter: () => {
            if (tween.progress() >= 1) settle();
          },
          onLeaveBack: unsettle,
        });

        // Dil değişimi / remount: zaten görünür alandaysa opacity:0’da kalma
        const syncInView = () => {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.top < vh * 0.92 && rect.bottom > 0) {
            tween.progress(1);
            settle();
          }
        };
        syncInView();
        requestAnimationFrame(syncInView);
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [safe, locale, stagger, delay] }
  );

  return createElement(
    as,
    // createElement'e ref geçmek standart; kural burada yanlış-pozitif veriyor.
    // eslint-disable-next-line react-hooks/refs
    { ref, className },
    words.map((word, i) => (
      <Fragment key={`${locale}-${i}-${word}`}>
        <span className="word-reveal-word">
          <span className="word-reveal-inner">{word}</span>
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    ))
  );
}
