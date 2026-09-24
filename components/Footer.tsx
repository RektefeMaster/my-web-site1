import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import WhatsAppButton from "./WhatsAppButton";
import CircularText from "./CircularText";
import { SITE } from "@/lib/site";

const BRAND_RING = "METEK DIGITAL · ";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  /*
    Şehir yüzeyi yalnızca Türkçe yayınlanıyor, bu yüzden bağlantı da yalnızca
    TR'de görünüyor. Diğer dillerde gösterilirse ziyaretçi 404 alıyor.
    Anahtar dört dilde de duruyor: `content:lint` parity kontrolü eksik
    anahtarda düşüyor.
  */
  const showCities = locale === "tr";

  return (
    <footer className="border-t border-[color:var(--chrome-edge)] bg-paper px-5 pb-[calc(5.5rem+var(--safe-bottom))] pt-12 text-foreground md:px-10 md:pb-16 md:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <Link
            scroll={false}
            href="/"
            className="group relative inline-block size-[9.5rem] text-foreground md:size-[11rem]"
            aria-label={SITE.brand}
          >
            <CircularText
              text={BRAND_RING}
              spinDuration={24}
              onHover="slowDown"
              className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-100"
            />
            {/* M harfinin kütle merkezi dairenin ortasında; nokta sağa taşar */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              <span className="brand-mark relative text-4xl leading-none tracking-tight md:text-5xl">
                M
                <span className="absolute left-[0.92em] top-[0.72em] size-[0.22em] rounded-full bg-accent md:top-[0.7em]" />
              </span>
            </span>
          </Link>
          <p className="mt-5 text-sm font-bold text-ink">{t("brand")}</p>
          <p className="mt-1 text-xs text-foreground/62">{t("founder")}</p>
          <p className="mt-4 max-w-xs text-sm text-foreground/62">{t("tagline")}</p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">
            {t("quickLinks")}
          </h2>
          <ul className="space-y-1 text-sm text-foreground/62">
            <li>
              <Link
                scroll={false}
                href="/manifesto"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("manifesto")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/work"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("work")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/approach"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("approach")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/services"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("services")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/blog"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("blog")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/contact"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("bookMeeting")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/faq"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("faq")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/industries"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("industries")}
              </Link>
            </li>
            <li>
              <Link
                scroll={false}
                href="/glossary"
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {t("glossary")}
              </Link>
            </li>
            {showCities ? (
              <li>
                <Link
                  scroll={false}
                  href="/sehirler"
                  className="inline-flex min-h-10 items-center hover:text-foreground"
                >
                  {t("cities")}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">
            {t("contact")}
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-foreground/62">
            {t("location")}
          </p>
          <ul className="space-y-1 text-sm text-foreground/62">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex min-h-10 items-center hover:text-foreground"
              >
                {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">
            {t("follow")}
          </h2>
          <ul className="space-y-2 text-sm text-foreground/62">
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center font-semibold hover:text-foreground"
              >
                {t("instagram")}
              </a>
            </li>
            <li>
              <WhatsAppButton variant="footer" />
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-foreground/10 pt-6 text-xs text-foreground/62">
        © {new Date().getFullYear()} {SITE.brand} — {t("rights")}
      </div>
    </footer>
  );
}
