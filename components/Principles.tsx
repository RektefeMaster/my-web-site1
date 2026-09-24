"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import DecryptedText from "./DecryptedText";

type Principle = {
  title: string;
  body: string;
};

/** Monokrom editorial indeks — seçim ters yüzeyle, renk kullanmadan okunur. */
export default function Principles() {
  const t = useTranslations("principles");
  const locale = useLocale();
  const items = t.raw("items") as Principle[];
  const [open, setOpen] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const rows = list.querySelectorAll<HTMLElement>("[data-principle]");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(rows, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        rows,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
          },
          onComplete: () => {
            gsap.set(rows, { clearProps: "opacity,transform" });
          },
        },
      );
    },
    { scope: listRef, dependencies: [locale, items.length] },
  );

  return (
    <section
      id="approach"
      className="overflow-hidden bg-paper px-5 py-16 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div
          aria-hidden
          className="mb-6 flex items-end justify-between border-b border-foreground/20 pb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/62 md:mb-8"
        >
          <DecryptedText text="01" animateOn="inViewHover" />
          <DecryptedText
            text={String(items.length).padStart(2, "0")}
            animateOn="inViewHover"
          />
        </div>

        <div ref={listRef}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <button
                key={item.title}
                type="button"
                data-principle
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                aria-pressed={isOpen}
                className={`group grid w-full min-w-0 grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 gap-y-5 border-b border-foreground/15 px-3 py-8 text-left transition-[color,background-color] duration-300 sm:px-4 md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10 md:px-8 md:py-11 ${
                  isOpen
                    ? "bg-foreground text-background"
                    : "text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:bg-foreground/[0.04]"
                }`}
              >
                <span
                  className={`min-w-0 font-display type-display text-[2.75rem] leading-[1.44] tracking-[-0.06em] md:text-[4.5rem] ${
                    isOpen ? "text-background/35" : "text-foreground/12"
                  }`}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`min-w-0 font-display type-display text-[clamp(1.4rem,3.2vw,3.6rem)] font-bold leading-[1.46] tracking-[-0.035em] transition-transform duration-300 ${
                    isOpen ? "translate-x-1 md:translate-x-2" : ""
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`col-start-2 min-w-0 max-w-xl self-center text-sm leading-relaxed transition-colors md:col-start-3 md:text-base ${
                    isOpen
                      ? "text-background/65"
                      : "text-foreground/62 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-foreground/65"
                  }`}
                >
                  {item.body}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
