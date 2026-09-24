import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/site";
import Reveal from "./Reveal";

type PageCtaProps = {
  label: string;
  title: string;
  blurb: string;
  cta: string;
};

/** Page-end editorial close: monochrome type, rules and two direct actions. */
export default function PageCta({ label, title, blurb, cta }: PageCtaProps) {
  const whatsapp = useTranslations("whatsapp");

  return (
    <section className="border-y border-band-fg/20 bg-band px-5 py-14 text-band-fg md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-6">
            <p className="col-span-12 border-t border-band-fg/25 pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-band-fg/55 md:col-span-2">
              {label}
            </p>

            <h2 className="font-display type-display col-span-12 max-w-[11ch] text-[clamp(1.15rem,6.5vw,7rem)] sm:text-[clamp(3rem,8vw,7rem)] leading-[1.4] tracking-[-0.05em] md:col-span-10">
              {title}
            </h2>

            <div className="col-span-12 md:col-start-7 md:col-span-6 border-t border-band-fg/25 pt-5">
              <p className="max-w-[58ch] text-base leading-[1.65] text-band-fg/68 md:text-lg">
                {blurb}
              </p>
            </div>

            <div className="col-span-12 mt-2 grid border-t border-band-fg/25 sm:grid-cols-2 md:col-start-3 md:col-span-10">
              <Link
                href="/contact"
                scroll={false}
                className="group flex min-h-16 items-center justify-between border-b border-band-fg/25 py-4 text-sm font-bold uppercase tracking-[0.08em] text-band-fg transition-colors hover:bg-band-fg hover:px-4 hover:text-band sm:border-r"
              >
                <span>{cta}</span>
                <span
                  aria-hidden
                  className="text-lg transition-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              <a
                href={whatsappHref(whatsapp("prefill"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={whatsapp("label")}
                className="group flex min-h-16 items-center justify-between border-b border-band-fg/25 py-4 text-sm font-semibold text-band-fg/65 transition-colors hover:px-4 hover:text-band-fg sm:pl-5"
              >
                <span>{whatsapp("cta")}</span>
                <span
                  aria-hidden
                  className="text-lg transition-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
