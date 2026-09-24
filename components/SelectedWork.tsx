"use client";

import { Fragment, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects, type Project } from "@/data/projects";
import { getProjectCardCopy } from "@/data/project-card-copy";
import { getProjectPunch } from "@/data/project-punch";
import DeviceMockup from "./DeviceMockup";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { gsap, useGSAP } from "@/lib/gsap";

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ").filter(Boolean);

  return (
    <h3
      className="font-display type-display max-w-[13ch] text-[clamp(1.15rem,6.5vw,6.7rem)] sm:text-[clamp(2.8rem,7vw,6.7rem)] leading-[1.44] tracking-[-0.05em]"
      aria-label={text}
    >
      <span aria-hidden>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="inline-block">
              <span className="word-reveal-word">
                <span data-work-word className="inline-block">
                  {word}
                </span>
              </span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </h3>
  );
}

function MockStage({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const t = useTranslations("selectedWork");
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const tilt = tiltRef.current;
      if (!stage || !tilt) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(tilt, { clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

        const onMove = (event: PointerEvent) => {
          if (!finePointer.matches) return;
          const rect = stage.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          gsap.to(tilt, {
            rotateY: x * 2.5,
            rotateX: -y * 2,
            duration: 0.6,
            ease: "power2.out",
            transformPerspective: 1200,
          });
        };

        const onLeave = () => {
          gsap.to(tilt, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);

        return () => {
          stage.removeEventListener("pointermove", onMove);
          stage.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: stageRef }
  );

  return (
    <div
      ref={stageRef}
      className="home-mock-stage"
      data-work-mock=""
    >
      <div ref={tiltRef} className="home-mock-stage__inner">
        <DeviceMockup
          project={project}
          variant="hero"
          priority={priority}
          cardCols={9}
        />
      </div>
      <p
        aria-hidden
        className="home-mock-stage__hint pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-band-fg/55 md:bottom-4"
      >
        {t("scrollHint")}
      </p>
    </div>
  );
}

function WorkSpread({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: string;
  index: number;
}) {
  const copy = getProjectCardCopy(locale, project.id);
  const name = copy?.title ?? project.name;
  const punch = getProjectPunch(locale, project.id);
  const t = useTranslations("selectedWork");
  const mockOnRight = index % 2 === 0;

  return (
    <article
      data-project-item
      data-work-spread
      className="group/mock relative col-span-12 grid min-w-0 grid-cols-12 gap-x-5 border-t border-band-fg/18 pt-5 md:gap-x-6 md:pt-7"
    >
      <div
        data-work-rule
        aria-hidden
        className="absolute left-0 top-0 h-px w-full origin-left bg-band-fg/70"
      />

      <p
        data-work-folio
        className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.18em] text-band-fg/55 md:col-span-1"
      >
        {String(index + 1).padStart(2, "0")}
      </p>

      <div className="col-span-10 md:col-span-8">
        <AnimatedTitle text={name} />
      </div>

      <div
        data-work-meta
        className="col-span-10 col-start-3 mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-band-fg/55 md:col-span-3 md:col-start-10 md:mt-1 md:justify-end md:text-right"
      >
        {copy?.tag ? <span>{copy.tag}</span> : null}
        {project.year ? <span>{project.year}</span> : null}
      </div>

      <div
        className={`col-span-12 mt-8 grid grid-cols-12 items-center gap-x-5 gap-y-8 md:mt-12 md:gap-x-6 ${
          mockOnRight ? "" : "md:[direction:rtl] md:[&>*]:![direction:ltr]"
        }`}
      >
        <div
          data-work-copy
          className={`col-span-12 flex flex-col gap-5 md:col-span-4 ${
            mockOnRight ? "md:col-start-1 md:order-1" : "md:col-start-9 md:order-2"
          }`}
        >
          {punch ? (
            <p className="max-w-[42ch] text-[15px] leading-[1.65] text-band-fg/58">
              {punch}
            </p>
          ) : null}
          <Link
            href={`/work/${project.id}`}
            scroll={false}
            className="group/link inline-flex min-h-10 items-center gap-3 self-start text-sm font-bold"
          >
            <span className="border-b border-band-fg/35 pb-0.5 transition-colors group-hover/link:border-band-fg">
              {t("openProject")}
            </span>
            <span
              aria-hidden
              className="inline-flex size-8 items-center justify-center border border-band-fg/30 transition-[background-color,color] group-hover/link:bg-band-fg group-hover/link:text-band"
            >
              ↗
            </span>
          </Link>
        </div>

        <div
          data-work-frame
          className={`col-span-12 md:col-span-8 ${
            mockOnRight ? "md:col-start-5 md:order-2" : "md:col-start-1 md:order-1"
          }`}
        >
          <MockStage project={project} priority={index === 0} />
        </div>
      </div>
    </article>
  );
}

/** Hero sonrası: MacBook + iPhone mockup, hover scroll, scroll giriş animasyonları. */
export default function SelectedWork() {
  const t = useTranslations("selectedWork");
  const locale = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const items = getFeaturedProjects().slice(0, 3);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          root.querySelectorAll(
            "[data-work-frame], [data-work-word], [data-work-copy], [data-work-meta], [data-work-folio], [data-work-rule], [data-work-mock]"
          ),
          { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1, rotateZ: 0 }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isTouch = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
        const spreads = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-work-spread]")
        );

        spreads.forEach((spread, index) => {
          const frame = spread.querySelector<HTMLElement>("[data-work-frame]");
          const mockStage = spread.querySelector<HTMLElement>("[data-work-mock]");
          const words = spread.querySelectorAll<HTMLElement>("[data-work-word]");
          const copy = spread.querySelector<HTMLElement>("[data-work-copy]");
          const meta = spread.querySelector<HTMLElement>("[data-work-meta]");
          const folio = spread.querySelector<HTMLElement>("[data-work-folio]");
          const rule = spread.querySelector<HTMLElement>("[data-work-rule]");
          if (!frame || !mockStage) return;

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: spread,
              start: isTouch ? "top 95%" : "top 88%",
              end: isTouch ? "top 42%" : "top 32%",
              scrub: isTouch ? 0.45 : 0.75,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .fromTo(
              rule,
              { scaleX: 0, transformOrigin: index % 2 ? "right" : "left" },
              { scaleX: 1, duration: 0.24 },
              0
            )
            .fromTo(
              mockStage,
              {
                y: isTouch ? 48 : 96,
                opacity: 0.35,
                scale: isTouch ? 0.94 : 0.88,
                rotateY: index % 2 ? -10 : 10,
                transformPerspective: 1200,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 0.85,
              },
              0
            )
            .fromTo(
              frame,
              {
                y: isTouch ? 32 : 56,
              },
              { y: 0, duration: 0.85 },
              0
            )
            .fromTo(
              words,
              { yPercent: 112, opacity: 0 },
              { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.42 },
              0.06
            )
            .fromTo(
              [folio, meta],
              {
                opacity: 0,
                x: index % 2 ? (isTouch ? 12 : 24) : isTouch ? -12 : -24,
              },
              { opacity: 1, x: 0, duration: 0.4 },
              0.08
            )
            .fromTo(
              copy,
              { opacity: 0, y: isTouch ? 16 : 28 },
              { opacity: 1, y: 0, duration: 0.38 },
              0.32
            );
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="hero-work-bridge bg-band px-5 py-14 text-band-fg md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-x-5 border-t border-band-fg/18 pt-6 md:gap-x-6 md:pt-7">
          <div className="col-span-12 md:col-span-9">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-band-fg/55">
              {t("label")}
            </p>
            <WordReveal
              text={t("title")}
              className="font-display type-display text-[clamp(1.15rem,6.5vw,8.5rem)] sm:text-[clamp(3.25rem,9.5vw,8.5rem)] leading-[1.4] tracking-[-0.052em]"
            />
          </div>
          <Reveal
            delay={70}
            className="col-span-11 col-start-2 mt-5 md:col-span-3 md:col-start-10 md:mt-2"
          >
            <p className="text-[15px] leading-[1.7] text-band-fg/58">
              {t("blurb")}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-20 md:mt-20 md:gap-x-6 md:gap-y-28">
          {items.map((project, index) => (
            <WorkSpread
              key={project.id}
              project={project}
              locale={locale}
              index={index}
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex justify-end border-t border-band-fg/18 pt-6 md:mt-20">
            <Link
              href="/work"
              scroll={false}
              className="group inline-flex min-h-11 items-center gap-5 text-sm font-bold text-band-fg"
            >
              {t("viewAll")}
              <span
                aria-hidden
                className="inline-flex size-10 items-center justify-center border border-band-fg/35 transition-[background-color,color] group-hover:bg-band-fg group-hover:text-band"
              >
                ↗
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
