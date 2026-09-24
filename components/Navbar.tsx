"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import BrandMark from "./BrandMark";
import LanguageSwitcher from "./LanguageSwitcher";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import DecryptedText from "./DecryptedText";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { attachNavOffsetSync } from "@/lib/nav-scroll";

type NavHref =
  | "/"
  | "/manifesto"
  | "/work"
  | "/approach"
  | "/services"
  | "/blog"
  | "/contact"
  | "/faq"
  | { pathname: "/"; hash: string };

/** İnce editöryal masthead — görsel gürültü ve reklam şeridi yok. */
export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const shellRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Hero nav: İşler · Hizmetler · Notlar · Biz kimiz
  const links: { href: NavHref; label: string; match?: string }[] = [
    { href: "/work", label: t("work"), match: "/work" },
    { href: "/services", label: t("services"), match: "/services" },
    { href: "/blog", label: t("notes"), match: "/blog" },
    { href: "/manifesto", label: t("about"), match: "/manifesto" },
  ];

  const navEntered = useRef(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    return attachNavOffsetSync(shell);
  }, []);

  useGSAP(() => {
    const shell = shellRef.current;
    const header = headerRef.current;
    const progress = progressRef.current;
    if (!shell || !header) return;

    const mm = gsap.matchMedia();
    const setProgress = progress
      ? gsap.quickSetter(progress, "scaleX")
      : null;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Yalnızca ilk mount'ta giriş animasyonu — her rota değişiminde
      // opacity:0'dan yeniden oynamasın (M. ile ana sayfaya dönüşte “boş header”).
      if (!navEntered.current) {
        navEntered.current = true;
        gsap.from(shell, {
          y: -16,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          delay: 0.08,
          onComplete: () => {
            gsap.set(shell, { clearProps: "opacity,transform" });
          },
        });
      } else {
        gsap.set(shell, { clearProps: "opacity,transform" });
      }

      let scrolled = header.classList.contains("is-scrolled");
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setProgress?.(self.progress);
          const next = self.scroll() > 20;
          if (next === scrolled) return;
          scrolled = next;
          header.classList.toggle("is-scrolled", next);
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      let scrolled = header.classList.contains("is-scrolled");
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setProgress?.(self.progress);
          const next = self.scroll() > 20;
          if (next === scrolled) return;
          scrolled = next;
          header.classList.toggle("is-scrolled", next);
        },
      });
    });

    return () => mm.revert();
    // pathname’e bağlama — her soft-nav’de ST recreate + giriş animasyonu yarışı
  }, []);

  return (
    <div
      ref={shellRef}
      data-nav-shell
      className="fixed inset-x-0 top-0 z-[100] max-w-[100vw] overflow-x-clip"
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <header ref={headerRef} className="nav-shell">
        <div className="nav-glass border-b">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:px-5 md:px-10 md:py-4">
            <BrandMark />

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:gap-1 lg:flex">
              {links.map((link) => {
                const isActive = Boolean(
                  link.match &&
                  (link.match === "/"
                    ? pathname === "/"
                    : pathname === link.match ||
                    pathname.startsWith(`${link.match}/`))
                );
                const key =
                  typeof link.href === "string"
                    ? link.href
                    : `${link.href.pathname}#${link.href.hash}`;
                return (
                  <Link
                    key={key}
                    href={link.href}
                    scroll={false}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors xl:px-4 ${isActive
                        ? "text-ink after:absolute after:inset-x-3 after:bottom-1 after:h-px after:bg-ink xl:after:inset-x-4"
                        : "text-ink/62 hover:text-ink"
                      }`}
                  >
                    <DecryptedText
                      text={link.label}
                      animateOn="hover"
                      speed={25}
                      maxIterations={8}
                      sequential={true}
                      encryptedClassName="text-accent font-bold"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3.5">
              <ThemeToggle />
              <LanguageSwitcher />
              <Magnetic strength={0.18} className="shrink-0">
                <Link
                  href="/contact"
                  scroll={false}
                  aria-label={t("cta")}
                  className="btn-stable inline-flex min-h-10 shrink-0 border border-ink bg-ink px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-fg transition-[background-color,color] hover:bg-transparent hover:text-ink sm:px-4 md:min-h-11 md:px-5"
                >
                  <span className="sm:hidden" aria-hidden="true">
                    {t("ctaShort")}
                  </span>
                  <span className="hidden sm:inline" aria-hidden="true">
                    {t("cta")}
                  </span>
                </Link>
              </Magnetic>
            </div>
          </nav>

          <div className="nav-mobile-rail flex gap-5 overflow-x-auto border-t border-hairline px-4 py-1.5 sm:px-5 lg:hidden">
            {links.map((link) => {
              const isActive = Boolean(
                link.match &&
                (link.match === "/"
                  ? pathname === "/"
                  : pathname === link.match ||
                  pathname.startsWith(`${link.match}/`))
              );
              const key =
                typeof link.href === "string"
                  ? `m-${link.href}`
                  : `m-${link.href.pathname}#${link.href.hash}`;
              return (
                <Link
                  key={key}
                  href={link.href}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-10 shrink-0 items-center whitespace-nowrap py-1 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors touch-manipulation ${isActive
                      ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink"
                      : "text-ink/62 active:text-ink"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div
          ref={progressRef}
          aria-hidden
          className="h-px origin-left scale-x-0 bg-ink/35"
        />
      </header>
    </div>
  );
}
