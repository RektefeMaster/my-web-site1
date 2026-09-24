import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import type { CityRecord } from "@/data/turkiye-cities";

/**
 * Şehir listesi: 81 il için editöryal satır düzeni fazla uzun kalıyor,
 * bu yüzden yoğun bir sütun ızgarası. Plaka kodu sıra numarası yerine
 * geçiyor ve okuyucuya gerçek bir bilgi veriyor.
 */
export default function CityGrid({
  cities,
  showSectors = false,
}: {
  cities: CityRecord[];
  showSectors?: boolean;
}) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 border-t border-foreground/25 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <li key={city.slug}>
          <Link
            href={`/sehirler/${city.slug}`}
            scroll={false}
            className="group flex items-baseline gap-3 border-b border-foreground/15 py-3.5 text-foreground"
          >
            <span className="font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62">
              {String(city.plate).padStart(2, "0")}
            </span>
            <span className="flex-1 text-[15px] font-medium md:text-base">
              {city.name}
              {showSectors ? (
                <span className="mt-0.5 block text-[13px] font-normal leading-[1.6] text-foreground/68">
                  {city.sectors.slice(0, 2).join(", ")}
                </span>
              ) : null}
            </span>
            <span
              aria-hidden
              className="text-base text-foreground/62 transition-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Bölge bloğu: başlık, açıklama, bölge hub bağlantısı ve illeri. */
export function CityRegionBlock({
  title,
  blurb,
  href,
  cities,
  index,
}: {
  title: string;
  blurb: string;
  href: string;
  cities: CityRecord[];
  index: number;
}) {
  return (
    <Reveal delay={index * 30}>
      <section className="border-t border-foreground/25 py-10 md:py-14">
        <div className="grid grid-cols-12 gap-x-4 gap-y-5 md:gap-x-6">
          <p className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62 md:col-span-1">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className="col-span-10 md:col-span-4">
            <h2 className="font-display type-display max-w-[18ch] text-[clamp(1.15rem,6.5vw,3.5rem)] leading-[1.46] tracking-[-0.03em] sm:text-[clamp(1.55rem,3.3vw,3.1rem)]">
              {title}
            </h2>
            <Link
              href={href}
              scroll={false}
              className="-mb-1.5 mt-4 inline-block py-1.5 text-[13px] font-medium text-accent-ink underline underline-offset-4"
            >
              {title} sayfası
            </Link>
          </div>
          <p className="col-span-10 col-start-3 max-w-[52ch] text-[15px] leading-[1.8] text-foreground/70 md:col-span-6 md:col-start-7 md:text-base">
            {blurb}
          </p>
        </div>
        <div className="mt-8">
          <CityGrid cities={cities} />
        </div>
      </section>
    </Reveal>
  );
}
