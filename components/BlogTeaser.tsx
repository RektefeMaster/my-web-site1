import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/data/blog";
import { getBlogArticle } from "@/data/blog-content";
import { formatBlogDate } from "@/lib/blog-format";
import Reveal from "./Reveal";
import DecryptedText from "./DecryptedText";

type BlogTeaserProps = { locale: string };

/** Ana sayfa notları — bir kapak dosyası ve metin ağırlıklı içindekiler. */
export default async function BlogTeaser({ locale }: BlogTeaserProps) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = blogPosts.slice(0, 3);
  const articles = await Promise.all(
    posts.map(async (post) => ({
      post,
      article: (await getBlogArticle(locale, post.slug))!,
    }))
  );
  const [lead, ...notes] = articles;

  return (
    <section className="cv-auto bg-paper px-5 py-14 text-foreground md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-x-5 border-t border-foreground/20 pt-6 md:gap-x-6 md:pt-8">
          <Reveal className="col-span-12 md:col-span-8">
            <h2 className="font-display type-display text-[clamp(1.15rem,6.5vw,7rem)] sm:text-[clamp(3rem,8vw,7rem)] leading-[1.4] tracking-[-0.05em]">
              {t("teaserTitle")}
            </h2>
          </Reveal>
          <Reveal delay={70} className="col-span-10 col-start-3 mt-8 md:col-span-3 md:col-start-10 md:mt-1">
            <p className="text-[15px] leading-[1.7] text-foreground/62">
              {t("teaserBlurb")}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-12 md:mt-20 md:gap-x-6">
          <Reveal mode="mask" className="col-span-12 md:col-span-7">
            <Link
              href={`/blog/${lead.post.slug}`}
              scroll={false}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone md:aspect-[5/4]">
                <Image
                  src={lead.post.image}
                  alt={lead.article.imageAlt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), 58vw"
                  quality={82}
                  loading="lazy"
                  decoding="async"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                />
              </div>
              <div className="grid gap-4 border-b border-foreground/20 py-5 md:grid-cols-[1fr_2fr] md:gap-8">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/62">
                  <DecryptedText
                    text={t(`categories.${lead.post.category}`)}
                    animateOn="inViewHover"
                  />{" "}
                  · {formatBlogDate(lead.post.date, locale)}
                </p>
                <h3 className="text-2xl font-bold leading-tight tracking-[-0.035em] md:text-3xl">
                  {lead.article.title}
                </h3>
              </div>
            </Link>
          </Reveal>

          <div className="col-span-12 md:col-span-4 md:col-start-9 md:self-end">
            <div className="border-t border-foreground/20">
              {notes.map(({ post, article }, index) => (
                <Reveal key={post.slug} delay={index * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    scroll={false}
                    className="group block border-b border-foreground/20 py-7 md:py-9"
                  >
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/62">
                      <DecryptedText
                        text={String(index + 2).padStart(2, "0")}
                        animateOn="inViewHover"
                      />{" "}
                      /{" "}
                      <DecryptedText
                        text={t(`categories.${post.category}`)}
                        animateOn="inViewHover"
                      />
                    </p>
                    <h3 className="mt-8 text-2xl font-bold leading-[1.05] tracking-[-0.035em] transition-opacity group-hover:opacity-55 md:text-3xl">
                      {article.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/68">
                      {article.excerpt}
                    </p>
                    <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/62">
                      {formatBlogDate(post.date, locale)} ·{" "}
                      {t("readMinutes", { count: post.readMinutes })}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <Link
                href="/blog"
                scroll={false}
                className="group mt-8 inline-flex min-h-11 items-center gap-5 text-sm font-bold"
              >
                <DecryptedText text={t("teaserAll")} animateOn="hover" />
                <span
                  aria-hidden
                  className="inline-flex size-10 items-center justify-center border border-foreground/30 transition-[background-color,color] group-hover:bg-foreground group-hover:text-paper"
                >
                  ↗
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
