import Image from "next/image";
import type { ProjectProof } from "@/data/project-details";
import Reveal from "./Reveal";

type ProofCapturesProps = {
  proof: ProjectProof;
};

const DEFAULT_SPANS = [
  "col-span-6 md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[560px]",
  "col-span-3 md:col-span-2 min-h-[220px] md:min-h-[272px]",
  "col-span-3 md:col-span-2 min-h-[220px] md:min-h-[272px]",
  "col-span-3 md:col-span-2 min-h-[220px] md:min-h-[300px]",
  "col-span-3 md:col-span-2 min-h-[220px] md:min-h-[300px]",
  "col-span-6 md:col-span-4 min-h-[220px] md:min-h-[320px]",
] as const;

function shotSizes(spanClass: string): string {
  const mobileCols = Number(spanClass.match(/(?:^|\s)col-span-(\d+)/)?.[1] ?? 6);
  const desktopCols = Number(
    spanClass.match(/(?:^|\s)md:col-span-(\d+)/)?.[1] ?? mobileCols
  );
  const mobileFrac = mobileCols / 6;
  const desktopFrac = desktopCols / 6;
  const wide = Math.ceil(1258 * desktopFrac);
  return [
    `(min-width: 1360px) ${wide}px`,
    `(min-width: 768px) calc((100vw - 100px) * ${desktopFrac})`,
    `calc((100vw - 40px) * ${mobileFrac})`,
  ].join(", ");
}

/** Yayın sonrası Google ve yapay zeka kayıtları. */
export default function ProofCaptures({ proof }: ProofCapturesProps) {
  return (
    <section className="bg-background px-5 py-16 text-foreground md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-5 gap-y-8 border-t border-foreground/25 pt-8 md:gap-x-6 md:pt-10">
            <div className="col-span-12 md:col-span-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/62">
                {proof.kicker}
              </p>
              <h2 className="font-display type-display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] leading-[1.4] tracking-[-0.045em]">
                {proof.title}
              </h2>
            </div>
            <p className="col-span-10 col-start-3 max-w-[52ch] text-[15px] leading-[1.7] text-foreground/65 md:col-span-6 md:col-start-7 md:pt-8 md:text-base">
              {proof.lead}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-6 gap-2 md:mt-16 md:gap-4">
          {proof.shots.map((shot, index) => {
            const span =
              shot.span ??
              DEFAULT_SPANS[Math.min(index, DEFAULT_SPANS.length - 1)];
            const fit = shot.fit === "cover" ? "object-cover" : "object-contain";
            return (
              <Reveal
                key={shot.src}
                mode="mask"
                delay={index * 40}
                className={span}
              >
                <figure className="flex h-full flex-col">
                  <div className="relative min-h-[200px] flex-1 overflow-hidden bg-stone md:min-h-[240px]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes={shotSizes(span)}
                      quality={82}
                      loading="lazy"
                      decoding="async"
                      className={`${fit} object-top`}
                    />
                  </div>
                  <figcaption className="border-b border-foreground/18 py-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/62">
                      {shot.source}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/68">
                      {shot.caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

        {proof.note ? (
          <Reveal delay={80}>
            <p className="mt-10 max-w-[62ch] font-mono text-[11px] leading-relaxed text-foreground/62 md:mt-12">
              {proof.note}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
