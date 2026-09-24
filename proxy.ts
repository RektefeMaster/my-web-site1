import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Next 16.2.6+ / as-needed: absolute rewrite host can disagree with the
 * server bind host and leak as a self-307. Rebuild rewrite from `request.url`
 * so origin always matches the incoming request.
 */
export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const rewrite = response.headers.get("x-middleware-rewrite");
  if (!rewrite) return response;

  let rewriteUrl: URL;
  try {
    rewriteUrl = new URL(rewrite);
  } catch {
    return response;
  }

  const relative = `${rewriteUrl.pathname}${rewriteUrl.search}${rewriteUrl.hash}`;
  const fixed = new URL(relative, request.url);

  const requestHeaders = new Headers(request.headers);
  for (const [key, value] of response.headers) {
    if (key.startsWith("x-middleware-request-")) {
      requestHeaders.set(key.slice("x-middleware-request-".length), value);
    }
  }

  const next = NextResponse.rewrite(fixed, {
    request: { headers: requestHeaders },
  });

  response.headers.forEach((value, key) => {
    if (key === "x-middleware-rewrite" || key === "location") return;
    if (key.startsWith("x-middleware-request-")) return;
    if (key === "set-cookie") return;
    next.headers.set(key, value);
  });

  const setCookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [];
  for (const cookie of setCookies) {
    next.headers.append("set-cookie", cookie);
  }

  return next;
}

export const config = {
  // Metadata rotalarını i18n'den muaf tut.
  // NOT: `manifest` yazma — `/manifesto` path'ini de yutuyordu (404).
  matcher:
    "/((?!api|trpc|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|sitemap|robots|.*\\..*).*)",
};
