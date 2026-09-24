import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "Anthropic-AI",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
