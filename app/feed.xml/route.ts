import { SITE, absoluteUrl } from "@/lib/site";
import { blogPosts } from "@/data/blog";
import { getBlogArticle } from "@/data/blog-content";

export const dynamic = "force-static";

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = await Promise.all(
    blogPosts.map(async (post) => {
      const article = await getBlogArticle("en", post.slug);
      if (!article) return "";
      const url = absoluteUrl("en", `/blog/${post.slug}`);
      const updated = post.updated ?? post.date;
      return [
        "    <item>",
        `      <title>${xmlEscape(article.title)}</title>`,
        `      <link>${xmlEscape(url)}</link>`,
        `      <guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${xmlEscape(article.excerpt)}</description>`,
        `      <dc:date>${updated}</dc:date>`,
        "    </item>",
      ].join("\n");
    }),
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">`,
    "  <channel>",
    `    <title>${xmlEscape(`${SITE.brand} blog`)}</title>`,
    `    <link>${SITE.url}/blog</link>`,
    `    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>`,
    `    <description>${xmlEscape(
      "Articles from METEK Digital on custom websites, admin panels, technical SEO, and business messaging tools.",
    )}</description>`,
    "    <language>en-US</language>",
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items.filter(Boolean).join("\n"),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
