"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import DeviceMockup from "./DeviceMockup";
import { gsap, useGSAP } from "@/lib/gsap";

type ProjectLiveHeroProps = {
  project: Project;
  title: string;
};

/** Detay sayfası — canlı MacBook + iPhone vitrin */
export default function ProjectLiveHero({
  project,
  title,
}: ProjectLiveHeroProps) {
  const t = useTranslations("projectUi");
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
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

        const onMove = (event: PointerEvent) => {
          if (!fine.matches) return;
          const rect = stage.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(tilt, {
            rotateY: x * 2.5,
            rotateX: -y * 2,
            duration: 0.55,
            ease: "power2.out",
            transformPerspective: 1400,
          });
        };

        const onLeave = () => {
          gsap.to(tilt, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.75,
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

  const host = project.url
    ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <section className="border-b border-foreground/15 bg-band text-band-fg">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-band-fg/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-band-fg/55">
              {t("livePreview")}
            </p>
            <p className="mt-2 text-sm text-band-fg/55">{t("livePreviewHint")}</p>
          </div>
          {host && project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 border border-band-fg/25 px-4 text-sm font-bold transition-[background-color,color] hover:bg-band-fg hover:text-band"
            >
              {host}
              <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>

        <div
          ref={stageRef}
          className="project-live-hero"
          data-project-item
          aria-label={title}
        >
          <div ref={tiltRef} className="project-live-hero__tilt">
            <DeviceMockup project={project} variant="hero" priority cardCols={12} />
          </div>
        </div>
      </div>
    </section>
  );
}
