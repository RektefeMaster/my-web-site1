import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { SITE, absoluteUrl, pageMeta } from "@/lib/site";
import { blogPosts, getPostMeta } from "@/data/blog";
import { getBlogArticle } from "@/data/blog-content";
import { routing } from "@/i18n/routing";
import BlogArticleView from "@/components/BlogArticleView";
import JsonLd from "@/components/JsonLd";
import {
  HOWTO_BLOG_SLUGS,
  ORG_ID,
  PERSON_ID,
  breadcrumbList,
  founderNode,
  graph,
  howToNode,
} from "@/lib/seo";
import { localeTag } from "@/lib/i18n-tags";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getPostMeta(slug);
  const article = await getBlogArticle(locale, slug);
  if (!meta || !article) return {};
  return pageMeta(
    {
      locale,
      path: `/blog/${slug}`,
      title: `${article.title} · METEK Digital`,
      description: article.excerpt,
      type: "article",
      image: meta.image,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
    },
    parent
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const meta = getPostMeta(slug);
  const article = await getBlogArticle(locale, slug);
  if (!meta || !article) notFound();

  const nav = await getTranslations("nav");
  const tBlog = await getTranslations("blog");
  const pageUrl = absoluteUrl(locale, `/blog/${slug}`);
  const modified = meta.updated ?? meta.date;
  const posting = {
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: `${SITE.url}${meta.image}`,
    datePublished: meta.date,
    dateModified: modified,
    inLanguage: localeTag(locale),
    isAccessibleForFree: true,
    articleSection: meta.category,
    author: [{ "@id": PERSON_ID }, { "@id": ORG_ID }],
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
  };
  const jsonLd = graph([
    founderNode(),
    posting,
    ...(HOWTO_BLOG_SLUGS.has(slug)
      ? [
          howToNode({
            locale,
            path: `/blog/${slug}`,
            name: article.title,
            description: article.excerpt,
            steps: article.sections.map((section) => ({
              name: section.heading,
              text: section.paragraphs.join(" "),
            })),
          }),
        ]
      : []),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: tBlog("crumbBlog"), path: "/blog" },
      { name: article.title, path: `/blog/${slug}` },
    ]),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogArticleView locale={locale} meta={meta} article={article} />
    </>
  );
}
