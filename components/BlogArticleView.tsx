import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { BlogPostMeta, BlogArticle } from "@/data/blog";
import { getRelatedPosts } from "@/data/blog";
import { getBlogArticle } from "@/data/blog-content";
import { formatBlogDate } from "@/lib/blog-format";
import { whatsappHref } from "@/lib/site";
import { forDisplay } from "@/lib/typography";
import Reveal from "./Reveal";
import BlogCard from "./BlogCard";

type BlogArticleViewProps = {
  locale: string;
  meta: BlogPostMeta;
  article: BlogArticle;
};

export default async function BlogArticleView({
  locale,
  meta,
  article,
}: BlogArticleViewProps) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const a11y = await getTranslations({ locale, namespace: "a11y" });
  const whatsapp = await getTranslations({ locale, namespace: "whatsapp" });
  const related = getRelatedPosts(meta.slug, 2);
  const relatedArticles = await Promise.all(
    related.map(async (post) => ({
      post,
      article: (await getBlogArticle(locale, post.slug))!,
    }))
  );

  return (
    <article className="bg-background">
      <header className="border-b border-foreground/25 bg-background">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-[calc(var(--nav-offset)+2rem)] md:px-10 md:pb-20 md:pt-[calc(var(--nav-offset)+3rem)]">
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
                {t("crumbHome")}
              </Link>
              <span aria-hidden className="text-foreground/62">
                /
              </span>
              <Link
                scroll={false}
                href="/blog"
                className="-my-1.5 inline-flex min-h-6 items-center py-1.5 transition-colors hover:text-foreground"
              >
                {t("crumbBlog")}
              </Link>
              <span aria-hidden className="text-foreground/62">
                /
              </span>
              <span className="text-foreground/75">
                {t(`categories.${meta.category}`)}
              </span>
            </nav>
          </Reveal>

          <div className="mt-10 grid grid-cols-12 gap-x-4 gap-y-8 md:mt-14 md:gap-x-6">
            <Reveal className="col-span-12 md:col-span-2">
              <div className="border-t border-foreground/20 pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/62">
                <p>{t("author")}</p>
                <p className="mt-2">{t(`categories.${meta.category}`)}</p>
                <time className="mt-2 block" dateTime={meta.date}>
                  {formatBlogDate(meta.date, locale)}
                </time>
                <p className="mt-2">
                  {t("readMinutes", { count: meta.readMinutes })}
                </p>
              </div>
            </Reveal>

            <Reveal delay={40} className="col-span-12 md:col-span-10">
              <h1 className="font-display type-display max-w-[13ch] break-words text-[clamp(1.15rem,6.5vw,7.5rem)] sm:text-[clamp(3.25rem,8vw,7.5rem)] leading-[1.4] tracking-[-0.05em]">
                {forDisplay(article.title)}
              </h1>
              <p className="font-subtitle mt-8 max-w-[58ch] border-t border-foreground/20 pt-5 text-base leading-relaxed text-foreground/65 md:ml-auto md:text-xl">
                {article.lead}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-12 px-5 pb-14 md:px-10 md:pb-20">
          <div className="relative col-span-12 aspect-[4/3] overflow-hidden md:col-start-3 md:col-span-10 md:aspect-[16/9]">
            <Image
              src={meta.image}
              alt={article.imageAlt}
              fill
              preload
              quality={85}
              sizes="(max-width: 767px) 100vw, (max-width: 1280px) 83vw, 1040px"
              decoding="async"
              className="object-cover grayscale contrast-[1.08]"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-28">
        <div>
          {article.sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 35}>
              <section className="grid grid-cols-12 gap-x-4 gap-y-5 border-t border-foreground/25 py-10 md:gap-x-6 md:py-14">
                <p className="col-span-2 font-mono text-[10px] font-bold tabular-nums tracking-[0.16em] text-foreground/62 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display type-display col-span-10 max-w-[18ch] text-[clamp(1.55rem,3.3vw,3.2rem)] leading-[1.46] tracking-[-0.03em] md:col-span-4">
                  {section.heading}
                </h2>
                <div className="col-span-10 col-start-3 space-y-5 md:col-span-6 md:col-start-7">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-[15px] leading-[1.8] text-foreground/70 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <section className="mt-10 grid grid-cols-12 gap-x-4 gap-y-8 border-y border-foreground/25 py-8 md:gap-x-6 md:py-10">
            <p className="col-span-12 max-w-[46ch] text-sm leading-relaxed text-foreground/62 md:col-span-5 md:text-base">
              {t("articleCtaBlurb")}
            </p>
            <div className="col-span-12 grid sm:grid-cols-2 md:col-start-7 md:col-span-6">
              <Link
                href="/contact"
                scroll={false}
                className="group flex min-h-14 items-center justify-between border-y border-foreground/25 py-3 text-sm font-bold sm:border-r"
              >
                {t("articleCta")}
                <span
                  aria-hidden
                  className="text-lg transition-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <a
                href={whatsappHref(whatsapp("prefill"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={whatsapp("label")}
                className="group flex min-h-14 items-center justify-between border-b border-foreground/25 py-3 text-sm font-semibold text-foreground/62 transition-colors hover:text-foreground sm:border-y sm:pl-5"
              >
                {whatsapp("cta")}
                <span
                  aria-hidden
                  className="text-lg transition-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </div>
          </section>
        </Reveal>
      </div>

      {relatedArticles.length > 0 ? (
        <aside className="border-t border-foreground/25 bg-paper px-5 py-16 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid grid-cols-12 gap-x-4 gap-y-5 md:mb-20 md:gap-x-6">
              <p className="col-span-12 border-t border-foreground/25 pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/62 md:col-span-2">
                {t("relatedLabel")}
              </p>
              <h2 className="font-display type-display col-span-12 text-[clamp(1.15rem,6.5vw,6.5rem)] sm:text-[clamp(3rem,7vw,6.5rem)] leading-[1.44] tracking-[-0.05em] md:col-span-10">
                {t("relatedTitle")}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
              {relatedArticles.map(({ post, article: relatedArticle }, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  title={relatedArticle.title}
                  excerpt={relatedArticle.excerpt}
                  categoryLabel={t(`categories.${post.category}`)}
                  dateLabel={formatBlogDate(post.date, locale)}
                  readLabel={t("readMinutes", { count: post.readMinutes })}
                  viewLabel={t("view")}
                  imageAlt={relatedArticle.imageAlt}
                  index={index + 1}
                  headingLevel={3}
                  delay={index * 50}
                  className="md:col-span-10 md:col-start-3"
                  textOnly
                />
              ))}
            </div>
          </div>
        </aside>
      ) : null}
    </article>
  );
}
