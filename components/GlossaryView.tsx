import Reveal from "./Reveal";
import type { GlossaryTerm } from "@/data/glossary";

export default function GlossaryView({
  lead,
  terms,
}: {
  lead: string;
  terms: GlossaryTerm[];
}) {
  return (
    <div className="bg-background px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="max-w-[62ch] text-[15px] leading-[1.8] text-foreground/70 md:ml-auto md:text-base">
            {lead}
          </p>
        </Reveal>
        <div className="mt-16 md:mt-24">
          {terms.map((item, index) => (
            <Reveal key={item.id} delay={index * 20}>
              <section
                id={item.id}
                className="grid grid-cols-12 gap-x-4 gap-y-5 border-t border-foreground/25 py-10 md:gap-x-6 md:py-14"
              >
                <p className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display type-display col-span-10 max-w-[18ch] text-[clamp(1.15rem,6.5vw,3.5rem)] sm:text-[clamp(1.55rem,3.3vw,3.1rem)] leading-[1.46] tracking-[-0.03em] md:col-span-4">
                  {item.term}
                </h2>
                <div className="col-span-10 col-start-3 space-y-5 md:col-span-6 md:col-start-7">
                  <p className="text-[15px] font-medium leading-[1.7] text-foreground/85 md:text-base">
                    {item.short}
                  </p>
                  {item.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-[15px] leading-[1.8] text-foreground/70 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
