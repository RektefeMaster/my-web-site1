"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import WordReveal from "./WordReveal";
import TextType from "./TextType";
import { gsap, useGSAP, attachScrollReveal } from "@/lib/gsap";
import { scheduleScrollTriggerRefresh } from "@/lib/nav-scroll";

type ServiceItem = {
  title: string;
  description: string;
  includes: string[];
};

type ServicesProps = {
  /** teaser: ana sayfa, full: /services */
  variant?: "teaser" | "full";
};

const SERVICE_HREFS = [
  "/services/web-design",
  "/services/web-design",
  "/services/software",
  "/contact",
  "/services/software",
  "/services/automation",
] as const;

export default function Services({ variant = "full" }: ServicesProps) {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const isTeaser = variant === "teaser";
  const [open, setOpen] = useState(0);
  const panelBaseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openRef = useRef(0);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.set(panel, {
          height: i === openRef.current ? "auto" : 0,
          overflow: "hidden",
        });
      });

      const articles = list.querySelectorAll("[data-service-item]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.from(articles, {
          opacity: 0,
          y: 24,
          stagger: 0.045,
          duration: 0.5,
          ease: "power2.out",
          force3D: true,
          paused: true,
        });
        attachScrollReveal(tween, list);
      });

      return () => mm.revert();
    },
    { scope: listRef, dependencies: [items.length] },
  );

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  const toggle = (i: number) => {
    const next = openRef.current === i ? -1 : i;
    const prev = openRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    openRef.current = next;
    setOpen(next);

    if (reduced) {
      panelRefs.current.forEach((panel, idx) => {
        if (!panel) return;
        gsap.set(panel, { height: idx === next ? "auto" : 0 });
      });
      scheduleScrollTriggerRefresh(80);
      return;
    }

    tweenRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => scheduleScrollTriggerRefresh(80),
    });
    tweenRef.current = tl;

    if (prev >= 0 && prev !== next) {
      const prevPanel = panelRefs.current[prev];
      if (prevPanel) {
        tl.to(
          prevPanel,
          { height: 0, duration: 0.38, ease: "power2.inOut" },
          0,
        );
      }
    }

    if (next >= 0) {
      const nextPanel = panelRefs.current[next];
      if (nextPanel) {
        tl.to(
          nextPanel,
          { height: "auto", duration: 0.42, ease: "power2.inOut" },
          prev >= 0 && prev !== next ? 0.08 : 0,
        );
        const lines = nextPanel.querySelectorAll("[data-service-lines] > *");
        if (lines.length) {
          tl.fromTo(
            lines,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              duration: 0.28,
              ease: "power2.out",
            },
            "-=0.2",
          );
        }
      }
    }
  };

  return (
    <section
      id="services"
      className="cv-auto scroll-mt-[var(--nav-offset)] px-5 py-16 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {isTeaser && (
          <div className="mb-12 grid gap-8 border-t border-foreground/15 pt-6 md:mb-16 md:grid-cols-12 md:items-end md:pt-8">
            <div className="md:col-span-8">
              <WordReveal
                text={t("title")}
                className="font-display type-display text-[clamp(1.15rem,6.5vw,5.75rem)] sm:text-[clamp(2.5rem,7vw,5.75rem)] font-bold leading-[1.44] tracking-[-0.045em]"
              />
              <div className="mt-3 flex min-h-[1.5rem] items-center gap-2 font-mono text-xs text-foreground/62">
                <span className="font-bold text-accent">›</span>
                <TextType
                  text={[
                    "Özel Next.js & React Three Fiber Mimarisi",
                    "Sıfır Hazır Tema / Sıfır Şablon Garantisi",
                    "Uçtan Uca Tip Güvenli ve Hızlı Altyapı",
                    "Google Core Web Vitals Tam Uyum"
                  ]}
                  typingSpeed={45}
                  pauseDuration={2200}
                  deletingSpeed={25}
                  showCursor={true}
                  cursorCharacter="▍"
                  startOnVisible={true}
                  loop={true}
                  className="font-mono text-xs font-medium text-foreground/75"
                />
              </div>
            </div>
            <p
              aria-hidden
              className="justify-self-start font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/62 md:col-span-4 md:justify-self-end"
            >
              01—{String(items.length).padStart(2, "0")}
            </p>
          </div>
        )}

        <div ref={listRef} className="border-y border-foreground/20">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${panelBaseId}-panel-${i}`;
            const triggerId = `${panelBaseId}-trigger-${i}`;
            return (
              <article
                key={item.title}
                data-service-item={i}
                className="overflow-hidden border-b border-foreground/15 last:border-b-0"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="group grid w-full grid-cols-[3rem_minmax(0,1fr)_2rem] items-start gap-2 py-7 text-left text-foreground transition-opacity duration-300 md:grid-cols-[6rem_minmax(0,1fr)_3rem] md:items-center md:gap-6 md:py-10 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-60"
                >
                  <span className="pt-1 font-mono text-[10px] font-bold tracking-[0.2em] text-foreground/62 md:pt-0 md:text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`min-w-0 font-display type-display text-[clamp(1.55rem,3.4vw,3.25rem)] font-bold leading-[1.46] tracking-[-0.035em] transition-[transform,opacity] duration-300 ${
                      isOpen
                        ? "translate-x-1 opacity-100 md:translate-x-3"
                        : "opacity-75"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    aria-hidden
                    className="justify-self-end font-mono text-xl font-light leading-none text-foreground/62 md:text-2xl"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className="text-foreground"
                  style={{ height: i === 0 ? "auto" : 0, overflow: "hidden" }}
                >
                  <div
                    data-service-body
                    className="grid gap-8 border-t border-foreground/10 pb-10 pt-7 md:grid-cols-12 md:gap-6 md:pb-14 md:pt-10"
                  >
                    <div className="md:col-start-2 md:col-span-5">
                      <p className="max-w-lg text-sm leading-relaxed text-foreground/65 md:text-base">
                        {item.description}
                      </p>
                      <Link
                        href={SERVICE_HREFS[i] ?? "/contact"}
                        scroll={false}
                        className="group/link mt-7 inline-flex min-h-10 items-center gap-3 border-b border-foreground/35 text-sm font-bold text-foreground transition-colors hover:border-foreground"
                      >
                        {t("cta")}
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                    <div className="md:col-start-8 md:col-span-5">
                      <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/62">
                        {t("included")}
                      </p>
                      <ol
                        data-service-lines
                        className="border-t border-foreground/15"
                      >
                        {item.includes.map((tag, tagIndex) => (
                          <li
                            key={tag}
                            className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-foreground/10 py-2.5 text-sm text-foreground/70"
                          >
                            <span
                              aria-hidden
                              className="font-mono text-[9px] font-bold tracking-[0.14em] text-foreground/62"
                            >
                              {String(tagIndex + 1).padStart(2, "0")}
                            </span>
                            <span>{tag}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {isTeaser && (
          <div className="mt-10 flex justify-end md:mt-12">
            <Link
              href="/services"
              scroll={false}
              className="group inline-flex min-h-11 items-center gap-3 border-b border-foreground/35 text-sm font-bold text-foreground transition-colors hover:border-foreground"
            >
              {t("seeAll")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
