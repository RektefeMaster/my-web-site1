"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  PROJECT_LANES,
  getProjectsByPrimaryLane,
  type ProjectLane,
} from "@/data/projects";
import { editorialSpan, editorialSpanCols } from "@/lib/editorial-layout";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { gsap, useGSAP, attachScrollReveal } from "@/lib/gsap";

/** /work — türlere ayrılmış, değişken ölçekli görsel indeks. */
export default function Projects() {
  const t = useTranslations("projects");
  const tLanes = useTranslations("workLanes");
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-project-item]");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { clearProps: "all", opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.from(cards, {
        opacity: 0,
        y: 36,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
        paused: true,
      });
      attachScrollReveal(tween, grid);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="projects"
      className="scroll-mt-[var(--nav-offset)] bg-band px-5 py-14 text-band-fg md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-12 gap-x-5 border-t border-band-fg/18 pt-6 md:mb-20 md:gap-x-6 md:pt-8">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <h2 className="font-display type-display text-[clamp(1.15rem,6.5vw,8rem)] sm:text-[clamp(3.25rem,9vw,8rem)] leading-[1.4] tracking-[-0.052em]">
                {t("title")}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={60} className="col-span-10 col-start-3 mt-8 md:col-span-3 md:col-start-10 md:mt-1">
            <p className="max-w-md text-[15px] leading-[1.7] text-band-fg/58">
              {t("blurb")}
            </p>
          </Reveal>
        </div>

        <div ref={gridRef} className="space-y-18 md:space-y-24">
          {PROJECT_LANES.map((lane: ProjectLane, laneIndex) => {
            const items = getProjectsByPrimaryLane(lane);
            if (items.length === 0) return null;
            return (
              <div key={lane} className="grid grid-cols-12 gap-x-5 md:gap-x-6">
                <Reveal className="col-span-12">
                  <h3 className="mb-10 flex items-baseline justify-between border-t border-band-fg/18 pt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-band-fg/55 md:mb-14">
                    <span>{String(laneIndex + 1).padStart(2, "0")}</span>
                    {tLanes(lane)}
                  </h3>
                </Reveal>
                <div className="col-span-12 grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-12 md:gap-x-6 md:gap-y-18">
                  {items.map((project, i) => {
                    const cols = editorialSpanCols(i, project.displayPreference);
                    return (
                      <div
                        key={project.id}
                        data-project-item
                        data-cols={cols}
                        className={`cv-card min-w-0 ${editorialSpan(i, project.displayPreference)}`}
                      >
                        <ProjectCard project={project} cols={cols} index={i} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
