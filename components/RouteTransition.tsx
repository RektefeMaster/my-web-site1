"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import MetekLoader from "@/components/MetekLoader";
import { scheduleScrollTriggerRefresh } from "@/lib/nav-scroll";

/** Hızlı geçişlerde perde yok — sadece bu süre aşılırsa göster */
const SHOW_AFTER_MS = 520;
const MIN_VISIBLE_MS = 280;
const MAX_VISIBLE_MS = 1600;

function introPlaying() {
  return document.documentElement.dataset.intro === "play";
}

function isInternalPageNav(anchor: HTMLAnchorElement): boolean {
  if (
    anchor.target === "_blank" ||
    anchor.hasAttribute("download") ||
    anchor.getAttribute("rel")?.includes("external")
  ) {
    return false;
  }

  const href = anchor.getAttribute("href");
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("whatsapp:") ||
    href.startsWith("javascript:")
  ) {
    return false;
  }

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    // Aynı path (hash farkı dahil) → perde yok; SmoothScroll halleder
    if (
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Yalnızca yavaş soft-nav / geri tuşunda markalı perde.
 * Hızlı tıklamada eski settle yeni nav’ı bozmaz (yerel armId).
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const locale = useLocale();
  const tA11y = useTranslations("a11y");
  const [active, setActive] = useState(false);
  const pending = useRef(false);
  const shownAt = useRef(0);
  const showTimer = useRef(0);
  const hideTimer = useRef(0);
  const maxTimer = useRef(0);
  const pathBoot = useRef(true);
  const armId = useRef(0);

  const reveal = useCallback((id: number) => {
    if (id !== armId.current) return;
    if (!pending.current || introPlaying()) return;
    window.clearTimeout(maxTimer.current);
    shownAt.current = performance.now();
    setActive(true);
    maxTimer.current = window.setTimeout(() => {
      if (id !== armId.current) return;
      pending.current = false;
      shownAt.current = 0;
      setActive(false);
    }, MAX_VISIBLE_MS);
  }, []);

  const arm = useCallback(() => {
    if (introPlaying()) return;
    const id = ++armId.current;
    pending.current = true;
    window.clearTimeout(showTimer.current);
    window.clearTimeout(hideTimer.current);
    window.clearTimeout(maxTimer.current);

    if (shownAt.current) {
      maxTimer.current = window.setTimeout(() => {
        if (id !== armId.current) return;
        pending.current = false;
        shownAt.current = 0;
        setActive(false);
      }, MAX_VISIBLE_MS);
      return;
    }

    showTimer.current = window.setTimeout(() => reveal(id), SHOW_AFTER_MS);
  }, [reveal]);

  const settle = useCallback(() => {
    const id = armId.current;
    pending.current = false;
    window.clearTimeout(showTimer.current);
    window.clearTimeout(maxTimer.current);

    if (!shownAt.current) {
      scheduleScrollTriggerRefresh(180);
      return;
    }

    const elapsed = performance.now() - shownAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (id !== armId.current || pending.current) return;
      shownAt.current = 0;
      setActive(false);
      scheduleScrollTriggerRefresh(120);
    }, wait);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const a = (e.target as HTMLElement | null)?.closest(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!a || !isInternalPageNav(a)) return;
      arm();
    };

    const onPop = () => arm();
    const onPending = () => arm();

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    window.addEventListener("metek:route-pending", onPending);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("metek:route-pending", onPending);
      window.clearTimeout(showTimer.current);
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(maxTimer.current);
    };
  }, [arm]);

  useEffect(() => {
    if (pathBoot.current) {
      pathBoot.current = false;
      return;
    }
    settle();
  }, [pathname, locale, settle]);

  if (!active) return null;

  return (
    <div
      className="route-loader route-loader--blocking"
      role="presentation"
      aria-busy="true"
      aria-hidden={false}
    >
      <MetekLoader label={tA11y("loading")} />
    </div>
  );
}
