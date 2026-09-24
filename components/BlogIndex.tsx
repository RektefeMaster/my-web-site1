import { getTranslations } from "next-intl/server";
import { blogPosts } from "@/data/blog";
import { getBlogArticle } from "@/data/blog-content";
import { formatBlogDate } from "@/lib/blog-format";
import BlogCard from "./BlogCard";

type BlogIndexProps = {
  locale: string;
};

const EDITORIAL_SLOTS = [
  {
    className: "md:col-span-10 md:col-start-3",
  },
  {
    className: "md:col-span-9 md:col-start-1",
  },
  {
    className: "md:col-span-10 md:col-start-3",
  },
  {
    className: "md:col-span-9 md:col-start-1",
  },
] as const;

export default async function BlogIndex({ locale }: BlogIndexProps) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const [featured, ...rest] = blogPosts;

  const featuredArticle = (await getBlogArticle(locale, featured.slug))!;
  const restArticles = await Promise.all(
    rest.map(async (post) => ({
      post,
      article: (await getBlogArticle(locale, post.slug))!,
    }))
  );

  return (
    <section className="bg-background px-5 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-20">
          <BlogCard
            headingLevel={2}
            post={featured}
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            categoryLabel={t(`categories.${featured.category}`)}
            dateLabel={formatBlogDate(featured.date, locale)}
            readLabel={t("readMinutes", { count: featured.readMinutes })}
            viewLabel={t("view")}
            imageAlt={featuredArticle.imageAlt}
            index={1}
            featured
          />

          {restArticles.map(({ post, article }, index) => {
            const slot = EDITORIAL_SLOTS[index % EDITORIAL_SLOTS.length];
            return (
              <BlogCard
                headingLevel={2}
                key={post.slug}
                post={post}
                title={article.title}
                excerpt={article.excerpt}
                categoryLabel={t(`categories.${post.category}`)}
                dateLabel={formatBlogDate(post.date, locale)}
                readLabel={t("readMinutes", { count: post.readMinutes })}
                viewLabel={t("view")}
                imageAlt={article.imageAlt}
                index={index + 2}
                delay={(index + 1) * 40}
                className={slot.className}
                textOnly
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
