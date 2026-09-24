"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type MarqueeProps = {
  /** header: ince şerit (nav altında), section: geniş blok */
  variant?: "header" | "section";
};

/** Sonsuz yatay accent şerit — mobilde header statik (içerik aynı, compositor yok) */
export default function Marquee({ variant = "section" }: MarqueeProps) {
  const t = useTranslations("marquee");
  const items = t.raw("items") as string[];
  const isHeader = variant === "header";
  const trackRef = useRef<HTMLDivElement>(null);
  const [staticStrip, setStaticStrip] = useState(false);

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqNarrow = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      const next = isHeader && (mqCoarse.matches || mqNarrow.matches);
      setStaticStrip(next);
      const el = trackRef.current;
      if (!el) return;
      if (next || document.hidden) {
        el.style.animationPlayState = "paused";
      } else {
        el.style.animationPlayState = "running";
      }
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    mqCoarse.addEventListener("change", sync);
    mqNarrow.addEventListener("change", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      mqCoarse.removeEventListener("change", sync);
      mqNarrow.removeEventListener("change", sync);
    };
  }, [isHeader]);

  // Statik şerit: 1 set yeter; animasyonlu loop: 3 set
  const track = staticStrip ? items : [...items, ...items, ...items];

  return (
    <div
      aria-hidden
      className={
        /*
          Şerit eskiden tam doygun vurgu rengiyle doluydu — ekranın en üstünde
          reklam bandı gibi duruyordu. Artık petrol bant: anahtar kelimeler
          sakin, vurgu rengi yalnızca ritim noktalarında. Nav → şerit → hero
          tek bir koyu masthead olarak okunuyor.
        */
        isHeader
          ? "marquee-strip--header relative overflow-hidden border-t border-band-fg/10 bg-band"
          : "relative overflow-hidden border-y border-band-fg/10 bg-band py-4 md:py-5"
      }
    >
      <div
        ref={trackRef}
        className={`marquee-track flex w-max items-center ${
          isHeader ? "marquee-track--header py-2" : ""
        }`}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex items-center font-bold uppercase tracking-[0.2em] text-band-fg/75 ${
              isHeader
                ? "gap-5 px-3 text-[10px] md:gap-7 md:text-[11px]"
                : "gap-6 px-3 text-sm md:gap-10 md:px-5 md:text-base"
            }`}
          >
            {item}
            <span className="inline-block size-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
