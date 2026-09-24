"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import { getProjectCardCopy } from "@/data/project-card-copy";
import { getProjectPunch } from "@/data/project-punch";
import WorkPlate from "./WorkPlate";
import DecryptedText from "./DecryptedText";

/** /work girdisi — cihaz maketi yerine işin kendisi, tam kadraj. */
export default function ProjectCard({
  project,
  cols = 5,
  index = 0,
}: {
  project: Project;
  cols?: number;
  /** Levha yönünü sırayla çevirmek için — kartlar aynı kadrajda dizilmesin */
  index?: number;
}) {
  const t = useTranslations("projectUi");
  const locale = useLocale();
  const detail = getProjectCardCopy(locale, project.id);
  const name = detail?.title ?? project.name;
  const punch = getProjectPunch(locale, project.id);
  /*
    Oran kolon genişliğinden türüyor: geniş levha sinematik, dar levha dikey
    bir sayfa gibi duruyor. Telefon yalnızca 7+ kolonda — dar kartta kadrajın
    üçte birini yiyor.
  */
  const ratio =
    cols >= 8 ? "aspect-[16/9]" : cols <= 4 ? "aspect-[4/5]" : "aspect-[5/4]";
  const showPhone = cols >= 7;

  return (
    <article className="group/mock group flex h-full flex-col" data-project-item>
      <Link
        scroll={false}
        href={`/work/${project.id}`}
        className="relative block w-full"
        aria-label={`${name} — ${t("view")}`}
      >
        {/* Ana sayfadaki levha diliyle ORTAK — adres şeridi, temas gölgesi,
            taşan telefon. /work ile home aynı sunum sözleşmesini paylaşıyor. */}
        <WorkPlate
          project={project}
          cols={cols}
          ratio={ratio}
          showPhone={showPhone}
          side={index % 2 === 0 ? "right" : "left"}
          priority={index < 3}
        />
      </Link>

      <div
        className={`flex flex-1 flex-col border-b border-band-fg/15 py-5 md:py-6 ${
          showPhone ? "mt-6 md:mt-8" : ""
        }`}
      >
        <div className="flex items-baseline justify-between gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-band-fg/55">
          {detail?.tag ? (
            <DecryptedText
              text={detail.tag}
              animateOn="inViewHover"
              speed={40}
              maxIterations={10}
              className="text-band-fg/50"
              encryptedClassName="text-accent/70"
            />
          ) : (
            <span />
          )}
          {project.year ? (
            <DecryptedText
              text={String(project.year)}
              animateOn="inViewHover"
              speed={35}
              maxIterations={8}
              className="text-band-fg/55"
              encryptedClassName="text-accent/70"
            />
          ) : null}
        </div>
        <h3 className="mt-5 text-2xl font-bold leading-none tracking-[-0.035em] text-band-fg md:text-3xl">
          <Link
            scroll={false}
            href={`/work/${project.id}`}
            className="transition-opacity hover:opacity-55"
          >
            {name}
          </Link>
        </h3>
        {punch || detail?.summary ? (
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-band-fg/55">
            {punch ?? detail?.summary}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-7 text-xs font-bold">
          <Link
            scroll={false}
            href={`/work/${project.id}`}
            className="inline-flex min-h-10 items-center gap-2 text-band-fg transition-opacity hover:opacity-55"
          >
            {t("view")} <span aria-hidden>↗</span>
          </Link>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 text-band-fg/55 transition-colors hover:text-band-fg/70"
            >
              {t("live")} <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
