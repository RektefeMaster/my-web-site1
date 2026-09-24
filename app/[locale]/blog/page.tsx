import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import PageHero from "@/components/PageHero";
import BlogIndex from "@/components/BlogIndex";
import PageCta from "@/components/PageCta";
import JsonLd from "@/components/JsonLd";
import { blogPosts } from "@/data/blog";
import { getBlogArticle } from "@/data/blog-content";
import {
  breadcrumbList,
  founderNode,
  graph,
  itemListNode,
  organizationNode,
  webPageNode,
} from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return pageMeta(
    {
      locale,
      path: "/blog",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    parent
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.blog");
  const nav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const listItems = await Promise.all(
    blogPosts.map(async (post) => {
      const article = await getBlogArticle(locale, post.slug);
      return {
        name: article?.title ?? post.slug,
        path: `/blog/${post.slug}`,
      };
    }),
  );

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    webPageNode({
      locale,
      path: "/blog",
      name: t("metaTitle"),
      description: t("metaDescription"),
      type: "CollectionPage",
    }),
    itemListNode(locale, "/blog", listItems),
    breadcrumbList(locale, [
      { name: nav("home"), path: "" },
      { name: nav("blog"), path: "/blog" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        label={t("heroLabel")}
        title={t("heroTitle")}
        blurb={t("heroBlurb")}
        crumbs={[
          { label: nav("home"), href: "/" },
          { label: nav("blog") },
        ]}
      />
      <BlogIndex locale={locale} />
      <PageCta
        label={t("ctaLabel")}
        title={t("ctaTitle")}
        blurb={t("ctaBlurb")}
        cta={t("ctaButton")}
      />
    </>
  );
}
