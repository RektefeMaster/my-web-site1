import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { BlogPostMeta } from "@/data/blog";
import Reveal from "./Reveal";
import DecryptedText from "./DecryptedText";

type BlogCardProps = {
  post: BlogPostMeta;
  title: string;
  excerpt: string;
  categoryLabel: string;
  dateLabel: string;
  readLabel: string;
  viewLabel: string;
  imageAlt: string;
  index: number;
  featured?: boolean;
  /** Liste/related yüzeyinde tekrar eden stok kapakları yerine metin dosyası. */
  textOnly?: boolean;
  /** /blog'da h1'in altında h2; bölüm başlığı olan yerlerde h3 */
  headingLevel?: 2 | 3;
  delay?: number;
  className?: string;
  imageSizes?: string;
};

export default function BlogCard({
  post,
  title,
  excerpt,
  categoryLabel,
  dateLabel,
  readLabel,
  viewLabel,
  imageAlt,
  index,
  featured = false,
  textOnly = false,
  headingLevel = 3,
  delay = 0,
  className = "",
  imageSizes,
}: BlogCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const resolvedSizes =
    imageSizes ??
    (featured
      ? "(max-width: 767px) 100vw, (max-width: 1279px) 58vw, 740px"
      : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 620px");

  return (
    <Reveal
      delay={delay}
      className={`${featured ? "md:col-span-12" : ""} ${className}`.trim()}
    >
      <article className="h-full border-t border-foreground/25 pt-4">
        <Link
          scroll={false}
          href={`/blog/${post.slug}`}
          className={`group grid h-full grid-cols-12 gap-x-4 gap-y-5 md:gap-x-6 ${
            featured ? "md:min-h-[520px]" : "content-start"
          }`}
        >
          <div className="col-span-12 flex items-start justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/62">
            <DecryptedText
              text={String(index).padStart(2, "0")}
              animateOn="inViewHover"
              speed={35}
              maxIterations={8}
              className="font-mono tabular-nums text-foreground/62"
              encryptedClassName="text-accent font-mono"
            />
            <span className="flex flex-wrap justify-end gap-x-2 gap-y-1 text-right">
              <DecryptedText
                text={categoryLabel}
                animateOn="inViewHover"
                speed={40}
                maxIterations={10}
                className="text-foreground/62"
                encryptedClassName="text-accent"
              />
              <span aria-hidden>/</span>
              <time dateTime={post.date}>{dateLabel}</time>
              <span aria-hidden>/</span>
              <span>{readLabel}</span>
            </span>
          </div>

          {!textOnly ? (
            <div
              className={`relative col-span-12 overflow-hidden bg-stone ${
                featured
                  ? "aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[440px]"
                  : "aspect-[4/3]"
              }`}
            >
              <Image
                src={post.image}
                alt={imageAlt}
                fill
                sizes={resolvedSizes}
                quality={featured ? 85 : 75}
                loading={featured ? "eager" : "lazy"}
                fetchPriority={featured ? "high" : "auto"}
                decoding="async"
                className="object-cover grayscale contrast-[1.06] transition-[filter] duration-500 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:contrast-125"
              />
            </div>
          ) : null}

          <div
            className={`col-span-12 flex flex-col justify-between ${
              featured
                ? "md:col-span-5 md:pl-4"
                : textOnly
                  ? "md:col-span-10 md:col-start-3"
                  : ""
            }`}
          >
            <div>
              <Heading
                className={`font-display type-display max-w-[18ch] tracking-[-0.035em] ${
                  featured
                    ? "text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.44]"
                    : "text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.46]"
                }`}
              >
                {title}
              </Heading>
              <p
                className={`mt-5 max-w-[52ch] text-sm leading-relaxed text-foreground/62 ${
                  textOnly ? "md:max-w-[62ch]" : "md:text-base"
                }`}
              >
                {excerpt}
              </p>
            </div>

            <span className="mt-8 flex min-h-11 items-center justify-between border-b border-foreground/25 py-3 text-sm font-bold text-foreground">
              {viewLabel}
              <span
                aria-hidden
                className="text-lg transition-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
