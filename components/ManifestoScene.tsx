"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import BlurText from "./BlurText";
import DecryptedText from "./DecryptedText";

/** Manifesto durak — tek cümlelik tipografik ara kapak. */
export default function ManifestoScene() {
  const t = useTranslations("manifestoScene");

  const fullSentence = `${t("before")} ${t("accent")} ${t("after")}`;

  return (
    <section
      id="idea"
      className="cv-auto relative overflow-hidden bg-paper px-5 py-20 text-foreground md:px-10 md:py-36"
    >
      <div className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-12 gap-x-5 border-y border-foreground/20 py-10 md:gap-x-6 md:py-16">
        <Reveal className="col-span-3 md:col-span-2">
          <DecryptedText
            text={t("label")}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/62"
          />
        </Reveal>
        <div className="col-span-9 col-start-4 md:col-span-9 md:col-start-4">
          <BlurText
            text={fullSentence}
            as="p"
            stagger={0.045}
            duration={0.8}
            className="max-w-[23ch] font-display type-display text-[clamp(1.15rem,6vw,5rem)] sm:text-[clamp(2.15rem,6vw,5rem)] font-bold leading-[1.44] tracking-[-0.04em]"
          />
        </div>
      </div>
    </section>
  );
}
