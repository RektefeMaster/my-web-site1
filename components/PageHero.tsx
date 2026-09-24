"use client";

import dynamic from "next/dynamic";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { forDisplay } from "@/lib/typography";
import DecryptedText from "./DecryptedText";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

/**
 * Lanyard'ı hydrate anında değil, ana iş parçacığı boşalınca bağla.
 *
 * Kart üç ağır şey çekiyor: rapier fizik motoru (2.18MB ham / 816KB gzip —
 * wasm base64 olarak JS'in içinde, yani indirilip PARSE de ediliyor), three
 * (230KB gzip) ve card.glb. `dynamic(ssr:false)` bunu hydrate biter bitmez
 * başlatıyordu; telefonda başlık yazısı ve fontlar daha oturmadan ~1MB indirme
 * + ~2MB JS parse araya giriyordu.
 *
 * Idle'a alınca kadraj aynı kalıyor (kart mutlak konumlu bir katmanda, düzen
 * kaymıyor), yalnızca kart bir tık sonra sarkmaya başlıyor. Ana sayfadaki
 * `usePrefetchHeroScene` ile aynı desen.
 *
 * `timeout` şart: sayfa meşgulse rIC hiç ateşlemeyebiliyor ve kart hiç gelmez.
 */
function useIdleMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric = window.requestIdleCallback as
      | typeof window.requestIdleCallback
      | undefined;
    if (!ric) {
      const timer = window.setTimeout(() => setReady(true), 400);
      return () => window.clearTimeout(timer);
    }
    const handle = ric(() => setReady(true), { timeout: 1200 });
    return () => window.cancelIdleCallback(handle);
  }, []);

  return ready;
}

type Crumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  label: string;
  title: string;
  blurb?: string;
  crumbs?: Crumb[];
  showLanyard?: boolean;
};

/** Secondary-route masthead: one large typographic field, divided by rules. */
export default function PageHero({
  label,
  title,
  blurb,
  crumbs,
  showLanyard = false,
}: PageHeroProps) {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const lanyardReady = useIdleMount();
  const safeTitle = forDisplay(title);
  const words = safeTitle.split(" ").filter(Boolean);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const words = el.querySelectorAll<HTMLElement>("[data-ph-word]");
      const meta = el.querySelectorAll<HTMLElement>("[data-ph-meta]");
      const blurbNode = el.querySelector<HTMLElement>("[data-ph-blurb]");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([words, meta, blurbNode], {
          clearProps: "all",
          opacity: 1,
          x: 0,
          y: 0,
          rotateZ: 0,
        });
        return;
      }

      const timeline = gsap.timeline({ delay: 0.03 });
      timeline
        .fromTo(
          meta,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: "power3.out",
            force3D: true,
          },
          0
        )
        .fromTo(
          words,
          { opacity: 0, yPercent: 112, rotateZ: 1.6 },
          {
            opacity: 1,
            yPercent: 0,
            rotateZ: 0,
            stagger: 0.055,
            duration: 0.82,
            ease: "power4.out",
            force3D: true,
          },
          0.06
        )
        .fromTo(
          blurbNode,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.62, ease: "power3.out", force3D: true },
          0.34
        );

      timeline.eventCallback("onComplete", () => {
        gsap.set([words, meta, blurbNode], {
          clearProps: "opacity,transform",
        });
      });

      return () => timeline.kill();
    },
    { scope: ref, dependencies: [locale, safeTitle, label, blurb] }
  );

  return (
    <header
      ref={ref}
      className={`relative overflow-hidden border-b border-foreground/25 bg-background ${
        showLanyard
          ? "min-h-[85vh] md:min-h-[92vh] flex flex-col justify-between"
          : ""
      }`}
    >
      {showLanyard ? (
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-auto overflow-hidden"
        >
          {lanyardReady ? (
            <Lanyard
              position={[0, 0, 20]}
              gravity={[0, -40, 0]}
              fov={20}
              frontImage="/lanyard/metek-card-black.png"
              backImage="/lanyard/metek-card-black.png"
              imageFit="contain"
              lanyardImage="/lanyard/metek-lanyard.png"
              lanyardWidth={1.25}
              transparent={true}
            />
          ) : null}
        </div>
      ) : null}

      <div className="relative z-20 pointer-events-none mx-auto w-full max-w-7xl px-5 pb-12 pt-[calc(var(--nav-offset)+1.5rem)] md:px-10 md:pb-16 md:pt-[calc(var(--nav-offset)+2.25rem)]">
        {crumbs && crumbs.length > 0 ? (
          <nav
            data-ph-meta
            aria-label={t("breadcrumb")}
            className="pointer-events-auto flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-foreground/20 pb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/62"
          >
            {crumbs.map((crumb, index) => (
              <span
                key={`${crumb.label}-${index}`}
                className="inline-flex items-center gap-2"
              >
                {index > 0 ? (
                  <span aria-hidden className="opacity-40">
                    /
                  </span>
                ) : null}
                {crumb.href ? (
                  <Link
                    scroll={false}
                    href={crumb.href}
                    className="-my-1.5 inline-flex min-h-6 items-center py-1.5 transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground/75">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="mt-8 grid grid-cols-12 gap-x-4 gap-y-8 md:mt-12 md:gap-x-6">
          <p
            data-ph-meta
            className="col-span-12 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/62 md:col-span-2 md:pt-3"
          >
            <DecryptedText text={label} animateOn="inViewHover" />
          </p>

          <h1
            className="font-display type-display col-span-12 max-w-[13ch] break-words text-[clamp(1.15rem,6.5vw,8rem)] sm:text-[clamp(3.25rem,9vw,8rem)] leading-[1.4] tracking-[-0.052em] md:col-span-10"
            aria-label={safeTitle}
          >
            <span aria-hidden>
              {words.map((word, index) => (
                <Fragment key={`${locale}-${word}-${index}`}>
                  <span className="word-reveal-word inline-block">
                    <span data-ph-word className="inline-block">
                      {word}
                    </span>
                  </span>
                  {index < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          </h1>

          {blurb ? (
            <p
              data-ph-blurb
              className="font-subtitle col-span-12 border-t border-foreground/20 pt-5 text-base leading-[1.65] text-foreground/68 md:col-start-7 md:col-span-6 md:text-lg"
            >
              {blurb}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
