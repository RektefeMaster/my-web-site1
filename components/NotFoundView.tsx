import Link from "next/link";

type NotFoundViewProps = {
  title: string;
  blurb: string;
  homeLabel: string;
  /** Locale-aware path (`/` veya `/tr`) — i18n Link sağlayıcıya ihtiyaç duymaz. */
  homeHref?: string;
  /**
   * Locale layout içinde (nav/footer var) — 100svh kullanma;
   * aksi halde nav + tam ekran + footer çift çerçeve olur.
   */
  embedded?: boolean;
};

/** Paylaşılan 404 gövdesi — locale ve kök not-found aynı düzeni kullanır. */
export default function NotFoundView({
  title,
  blurb,
  homeLabel,
  homeHref = "/",
  embedded = false,
}: NotFoundViewProps) {
  return (
    <section
      className={
        embedded
          ? "min-h-[calc(100svh-var(--nav-offset)-14rem)] bg-background px-5 py-16 text-foreground md:px-10"
          : "min-h-[100svh] bg-background px-5 py-16 text-foreground md:px-10"
      }
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 border-y border-foreground/20 py-8 md:py-12">
        <p className="col-span-12 font-mono text-[10px] font-bold tabular-nums tracking-[0.2em] text-foreground/62 md:col-span-2">
          404 / 404
        </p>
        <div className="col-span-12 mt-16 md:col-span-9 md:col-start-4 md:mt-28">
          <h1 className="font-display type-display max-w-[12ch] text-[clamp(1.15rem,6.5vw,9rem)] sm:text-[clamp(3.4rem,9.4vw,8.4rem)] leading-[1.4] tracking-[-0.055em]">
            {title}
          </h1>
          <div className="mt-12 grid gap-8 border-t border-foreground/20 pt-6 sm:grid-cols-2 md:mt-20">
            <p className="max-w-[50ch] text-sm leading-relaxed text-foreground/65">
              {blurb}
            </p>
            <Link
              href={homeHref}
              className="group inline-flex min-h-11 items-center justify-between border-b border-foreground py-2 text-xs font-bold uppercase tracking-[0.14em]"
            >
              <span>{homeLabel}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
