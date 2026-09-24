import type { FaqItem } from "@/data/service-landers";
import Reveal from "./Reveal";

export default function FaqList({
  items,
  heading,
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <section className="border-t border-foreground/25 bg-background px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        {heading ? (
          <Reveal>
            <h2 className="font-display type-display mb-12 max-w-[16ch] text-[clamp(1.15rem,6.5vw,4.5rem)] sm:text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.4] tracking-[-0.04em] md:mb-16">
              {heading}
            </h2>
          </Reveal>
        ) : null}
        <div>
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 30}>
              <article className="grid grid-cols-12 gap-x-4 gap-y-4 border-t border-foreground/25 py-8 md:gap-x-6 md:py-12">
                <p className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display type-display col-span-10 max-w-[28ch] text-[clamp(1.35rem,2.4vw,2.15rem)] leading-[1.4] tracking-[-0.03em] md:col-span-5">
                  {item.question}
                </h3>
                <p className="col-span-10 col-start-3 text-[15px] leading-[1.8] text-foreground/70 md:col-span-6 md:col-start-7 md:text-base">
                  {item.answer}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
