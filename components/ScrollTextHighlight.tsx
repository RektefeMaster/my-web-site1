"use client";

import { useRef, createElement, Fragment, type ElementType } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { forDisplay } from "@/lib/typography";

type ScrollTextHighlightProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * ScrollTextHighlight: Scroll ilerledikçe kelimelerin yumuşakça parladığı
 * ve tam opasiteye ulaştığı editoryal okuma animasyonu.
 */
export default function ScrollTextHighlight({
  text,
  as = "p",
  className = "",
}: ScrollTextHighlightProps) {
  const ref = useRef<HTMLElement>(null);
  const locale = useLocale();
  const safe = forDisplay(text);
  const words = safe.split(" ").filter(Boolean);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const spans = el.querySelectorAll<HTMLElement>(".scroll-highlight-word");
      if (!spans.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(spans, { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(spans, { opacity: 0.25 });

        gsap.to(spans, {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [safe, locale] }
  );

  return createElement(
    as,
    // eslint-disable-next-line react-hooks/refs
    { ref, className },
    words.map((word, i) => (
      <Fragment key={`${locale}-${i}-${word}`}>
        <span className="scroll-highlight-word transition-colors will-change-[opacity]">
          {word}
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    ))
  );
}
