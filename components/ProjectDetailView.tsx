import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import type { ProjectDetail } from "@/data/project-details";
import { whatsappHref } from "@/lib/site";
import { forDisplay } from "@/lib/typography";
import Reveal from "./Reveal";
import PageCta from "./PageCta";
import ProjectLiveHero from "./ProjectLiveHero";
import ProofCaptures from "./ProofCaptures";

type ProjectDetailViewProps = {
  project: Project;
  detail: ProjectDetail;
};

const GALLERY_FRAC: Record<number, number> = {
  6: 1,
  5: 0.833,
  4: 0.664,
  3: 0.494,
  2: 0.328,
};

function gallerySizes(spanClass: string): string {
  const mobileCols = Number(spanClass.match(/(?:^|\s)col-span-(\d+)/)?.[1] ?? 6);
  const desktopCols = Number(
    spanClass.match(/(?:^|\s)md:col-span-(\d+)/)?.[1] ?? mobileCols
  );
  const mobileFrac = GALLERY_FRAC[mobileCols] ?? mobileCols / 6;
  const desktopFrac = GALLERY_FRAC[desktopCols] ?? desktopCols / 6;
  const wide = Math.ceil(1258 * desktopFrac);
  return [
    `(min-width: 1360px) ${wide}px`,
    `(min-width: 768px) calc((100vw - 100px) * ${desktopFrac})`,
    `calc((100vw - 40px) * ${mobileFrac})`,
  ].join(", ");
}

const DEFAULT_GALLERY_SPANS = [
  "col-span-6 md:col-span-4 md:row-span-2 min-h-[260px] md:min-h-[560px]",
  "col-span-3 md:col-span-2 min-h-[170px] md:min-h-[272px]",
  "col-span-3 md:col-span-2 min-h-[170px] md:min-h-[272px]",
  "col-span-6 md:col-span-3 min-h-[220px] md:min-h-[300px]",
  "col-span-6 md:col-span-3 min-h-[220px] md:min-h-[300px]",
  "col-span-6 min-h-[240px] md:min-h-[420px]",
] as const;

/** Proje detayı — mockup vitrin + proje dosyası. */
export default async function ProjectDetailView({
  project,
  detail,
}: ProjectDetailViewProps) {
  const t = await getTranslations("projectUi");
  const nav = await getTranslations("nav");
  const a11y = await getTranslations("a11y");
  const whatsapp = await getTranslations("whatsapp");
  const name = detail.title ?? project.name;
  const hasMockHero = Boolean(
    project.desktopImage ||
      project.mobileImage ||
      project.desktopScrollImage ||
      project.mobileScrollImage
  );
  /*
    Hero'da BASILAN kareyi galeride tekrarlama. project-galleries.ts'teki
    `devicePack` (crm, whatsapp-bot, instagram-bot, css-system) galeri karesi
    olarak projenin kendi desktop/mobile görselini üretiyor — yani hero'nun
    aynısını. Süzgeç olmadan bu dört sayfada aynı görsel arka arkaya iki kez
    basıyor; süzgeçten sonra galeri bölümü hiç açılmıyor, ki doğrusu o.
  */
  const shown = new Set(
    [project.desktopImage, project.mobileImage].filter(Boolean)
  );
  const gallery = (detail.gallery ?? []).filter((shot) => !shown.has(shot.src));
  const hasCta = Boolean(detail.ctaTitle && detail.ctaButton);

  return (
    <article className="bg-background text-foreground">
      <header className="border-b border-foreground/25 bg-background">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-[calc(var(--nav-offset)+1.5rem)] md:px-10 md:pb-14 md:pt-[calc(var(--nav-offset)+2rem)]">
          <Reveal>
            <nav
              aria-label={a11y("breadcrumb")}
              className="flex flex-wrap items-center gap-2 border-b border-foreground/20 pb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/62"
            >
              <Link
                scroll={false}
                href="/"
                className="-my-1.5 inline-flex min-h-6 items-center py-1.5 transition-colors hover:text-foreground"
              >
                {nav("home")}
              </Link>
              <span aria-hidden>/</span>
              <Link
                scroll={false}
                href="/work"
                className="-my-1.5 inline-flex min-h-6 items-center py-1.5 transition-colors hover:text-foreground"
              >
                {nav("work")}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-foreground/75">{name}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid grid-cols-12 gap-x-5 gap-y-8 md:mt-10 md:gap-x-6">
            <Reveal className="col-span-12 md:col-span-2">
              <div className="border-t border-foreground/20 pt-4 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-foreground/62">
                <p>{detail.tag}</p>
                {project.year ? <p className="mt-2">{project.year}</p> : null}
              </div>
            </Reveal>

            <Reveal delay={45} className="col-span-12 md:col-span-10">
              <h1 className="font-display type-display max-w-[14ch] break-words text-[clamp(1.15rem,6.5vw,8rem)] sm:text-[clamp(3.25rem,9vw,8rem)] leading-[1.4] tracking-[-0.055em]">
                {forDisplay(name)}
              </h1>
              <p className="font-subtitle mt-6 max-w-[60ch] border-t border-foreground/20 pt-5 text-base leading-relaxed text-foreground/65 md:ml-auto md:text-xl">
                {detail.summary}
              </p>
            </Reveal>

            <Reveal delay={80} className="col-span-12 md:col-span-10 md:col-start-3">
              <div className="grid border-t border-foreground/20 sm:grid-cols-3">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-14 items-center justify-between border-b border-foreground/20 py-3 text-sm font-bold sm:border-r sm:pr-5"
                  >
                    {t("live")} <span aria-hidden>↗</span>
                  </a>
                ) : null}
                <Link
                  scroll={false}
                  href="/contact"
                  className="group flex min-h-14 items-center justify-between border-b border-foreground/20 py-3 text-sm font-bold sm:border-r sm:px-5"
                >
                  {detail.ctaButton ?? t("view")} <span aria-hidden>→</span>
                </Link>
                <a
                  href={whatsappHref(whatsapp("prefill"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={whatsapp("label")}
                  className="group flex min-h-14 items-center justify-between border-b border-foreground/20 py-3 text-sm text-foreground/68 sm:pl-5"
                >
                  {whatsapp("cta")} <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {hasMockHero ? (
        <ProjectLiveHero project={project} title={name} />
      ) : null}

      {detail.proof ? <ProofCaptures proof={detail.proof} /> : null}

      {gallery.length > 0 ? (
        <section className="bg-band px-5 py-16 text-band-fg md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-12 gap-x-5 border-t border-band-fg/20 pt-5 md:gap-x-6">
                <p className="col-span-10 col-start-3 max-w-[48ch] text-sm leading-relaxed text-band-fg/55 md:col-span-4 md:col-start-9 md:text-[15px]">
                  {t("galleryHint")}
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-6 gap-2 md:mt-16 md:gap-4">
              {gallery.map((shot, index) => {
                const span =
                  shot.span ??
                  DEFAULT_GALLERY_SPANS[
                    Math.min(index, DEFAULT_GALLERY_SPANS.length - 1)
                  ];
                return (
                  <Reveal
                    key={shot.src}
                    mode="mask"
                    delay={index * 35}
                    className={span}
                  >
                    <div className="relative h-full min-h-[inherit] overflow-hidden bg-stone">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes={gallerySizes(span)}
                        quality={80}
                        loading="lazy"
                        decoding="async"
                        className={`${shot.fit === "contain" ? "object-contain" : "object-cover"} object-top`}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-28">
        <Reveal>
          <section className="grid grid-cols-12 gap-x-5 gap-y-7 border-t border-foreground/25 py-10 md:gap-x-6 md:py-14">
            <h2 className="font-display type-display col-span-12 max-w-[14ch] text-[clamp(2.5rem,5vw,5rem)] leading-[1.44] tracking-[-0.045em] md:col-span-5">
              {detail.whatTitle}
            </h2>
            <ul className="col-span-10 col-start-3 border-t border-foreground/20 md:col-span-6 md:col-start-7">
              {detail.what.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-foreground/20 py-4 text-[15px] leading-relaxed text-foreground/68"
                >
                  <span className="font-mono text-[10px] font-bold text-foreground/62">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={55}>
          <section className="grid grid-cols-12 gap-x-5 gap-y-7 border-t border-foreground/25 py-10 md:gap-x-6 md:py-14">
            <h2 className="font-display type-display col-span-12 max-w-[14ch] text-[clamp(2.5rem,5vw,5rem)] leading-[1.44] tracking-[-0.045em] md:col-span-5">
              {detail.howTitle}
            </h2>
            <ol className="col-span-10 col-start-3 border-t border-foreground/20 md:col-span-6 md:col-start-7">
              {detail.how.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-foreground/20 py-4 text-[15px] leading-relaxed text-foreground/68"
                >
                  <span className="font-mono text-[10px] font-bold text-foreground/62">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {detail.result ? (
          <Reveal delay={80}>
            <blockquote className="border-y border-foreground/25 py-10 md:py-16">
              <p className="font-subtitle ml-auto max-w-[34ch] text-[clamp(1.5rem,3vw,2.75rem)] leading-[1.25] text-foreground/78">
                {detail.result}
              </p>
            </blockquote>
          </Reveal>
        ) : null}

        <Reveal delay={95}>
          <section className="grid grid-cols-12 gap-x-5 gap-y-5 border-b border-foreground/25 py-10 md:gap-x-6 md:py-14">
            <h2 className="col-span-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/62 md:col-span-2">
              {t("stack")}
            </h2>
            <p className="col-span-9 text-sm leading-loose text-foreground/65 md:col-span-8 md:col-start-5 md:text-base">
              {detail.stack.join(" · ")}
            </p>
          </section>
        </Reveal>

        <Link
          scroll={false}
          href="/work"
          className="mt-10 inline-flex min-h-11 items-center gap-4 text-sm font-bold transition-opacity hover:opacity-55"
        >
          ← {t("back")}
        </Link>
      </div>

      {hasCta ? (
        <PageCta
          label={detail.ctaLabel ?? ""}
          title={detail.ctaTitle!}
          blurb={detail.ctaBlurb ?? ""}
          cta={detail.ctaButton!}
        />
      ) : null}
    </article>
  );
}
