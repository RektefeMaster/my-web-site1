import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

export default function RelatedIntentLinks({
  heading,
  items,
}: {
  heading: string;
  items: { href: string; label: string }[];
}) {
  return (
    <section className="bg-background px-5 pb-16 md:px-10 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display type-display max-w-[18ch] text-[clamp(1.15rem,6.5vw,3.5rem)] sm:text-[clamp(1.55rem,3.3vw,3.1rem)] leading-[1.46] tracking-[-0.03em]">
            {heading}
          </h2>
        </Reveal>
        <ul className="mt-10 border-t border-foreground/25">
          {items.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                scroll={false}
                className="group grid grid-cols-12 items-baseline gap-x-4 border-b border-foreground/25 py-5 text-foreground md:gap-x-6"
              >
                <span className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="col-span-9 text-[15px] font-medium md:col-span-10 md:text-base">
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className="col-span-1 text-right text-lg transition-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
