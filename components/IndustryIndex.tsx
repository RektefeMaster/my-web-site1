import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import type { IndustryContent, IndustrySlug } from "@/data/industries";

type HubItem = { slug: IndustrySlug; content: IndustryContent };

export default function IndustryIndex({ items }: { items: HubItem[] }) {
  return (
    <section className="bg-background px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        {items.map((item, index) => (
          <Reveal key={item.slug} delay={index * 30}>
            <Link
              href={`/industries/${item.slug}`}
              scroll={false}
              className="group grid grid-cols-12 gap-x-4 gap-y-4 border-t border-foreground/25 py-10 md:gap-x-6 md:py-14"
            >
              <p className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62 md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display type-display col-span-10 max-w-[18ch] text-[clamp(1.15rem,6.5vw,3.5rem)] sm:text-[clamp(1.55rem,3.3vw,3.1rem)] leading-[1.46] tracking-[-0.03em] md:col-span-4">
                {item.content.hubTitle}
              </h2>
              <p className="col-span-10 col-start-3 max-w-[52ch] text-[15px] leading-[1.8] text-foreground/70 md:col-span-6 md:col-start-7 md:text-base">
                {item.content.hubBlurb}
              </p>
              <span
                aria-hidden
                className="col-span-12 text-right text-lg text-foreground/62 transition-transform motion-reduce:transition-none md:col-span-1 md:col-start-12 md:self-center [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
