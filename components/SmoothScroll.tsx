"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  bumpNavGeneration,
  isCurrentNavGeneration,
  pauseLenis,
  resumeLenis,
  scheduleScrollTriggerRefresh,
  scrollToElement,
  scrollWindowTop,
} from "@/lib/nav-scroll";

function hashFromHref(href: string | null): string | null {
  if (!href || href === "#") return null;
  if (href.startsWith("#") && href.length > 1) return href;

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    if (!url.hash || url.hash === "#") return null;
    return url.hash;
  } catch {
    return null;
  }
}

function isSameDocumentHashLink(href: string, hash: string): boolean {
  if (href.startsWith("#")) return true;
  try {
    const url = new URL(href, window.location.href);
    return (
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.hash === hash
    );
  } catch {
    return false;
  }
}

function pathWithoutLocale(pathname: string): string {
  // next-intl usePathname zaten locale’siz döner; yine de güvenli normalize
  return pathname || "/";
}

function hrefPathname(href: string): string | null {
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    // /tr/work → locale proxy sonrası gerçek path; Link href’leri genelde locale’siz
    return url.pathname;
  } catch {
    return null;
  }
}

function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (["en", "tr", "es", "de"].includes(parts[0]!)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const localeBoot = useRef(true);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedRef = useRef(false);
  const pathBoot = useRef(true);
  const lastKey = useRef("");

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const useLenis = !reduced && !coarse && !narrow;
    reducedRef.current = reduced;

    let onLenisScroll: (() => void) | null = null;
    let tick: ((time: number) => void) | null = null;
    let t1 = 0;
    let t2 = 0;
    let cancelled = false;
    const onLoad = () => scheduleScrollTriggerRefresh(0);

    const scrollToHash = (hash: string, smooth: boolean) => {
      const el = document.querySelector(hash);
      if (!el) return false;
      scrollToElement(el, {
        immediate: !smooth,
        duration: smooth ? 1.05 : 0,
      });
      return true;
    };

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

      const target = (e.target as HTMLElement | null)?.closest(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (
        !target ||
        target.target === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      const href = target.getAttribute("href");
      if (!href) return;

      const hash = hashFromHref(href);

      // Aynı sayfa hash: Lenis/native offset ile biz kaydır
      if (hash && isSameDocumentHashLink(href, hash)) {
        e.preventDefault();
        const gen = bumpNavGeneration();
        if (
          `${window.location.pathname}${window.location.hash}` !==
          `${window.location.pathname}${hash}`
        ) {
          window.history.pushState(null, "", hash);
        }
        // pushState hashchange ateşlemez — lastKey + dinleyiciler (FinalCta) sync
        lastKey.current = `${stripLocalePrefix(window.location.pathname)}${hash}`;
        // LazyMount (#work) — henüz mount olmamışsa reveal + poll
        window.dispatchEvent(new Event("metek:lazy-reveal"));

        const settle = (smooth: boolean) => {
          const el = document.querySelector(hash);
          if (!el) return false;
          (el as HTMLElement).style.contentVisibility = "visible";
          scrollToElement(el, {
            immediate: !smooth,
            duration: smooth ? 0.9 : 0,
          });
          return true;
        };

        // 1) Anında hizala (lazy yükseklik değişmeden önce / hedef hazırsa)
        settle(false);
        // 2) Mount + layout sonrası tekrar (içerik açılınca offset kaymasın)
        let tries = 0;
        const poll = window.setInterval(() => {
          if (!isCurrentNavGeneration(gen)) {
            window.clearInterval(poll);
            return;
          }
          tries += 1;
          settle(false);
          if (tries >= 12) {
            window.clearInterval(poll);
            settle(false);
            scheduleScrollTriggerRefresh(120);
          }
        }, 50);
        return;
      }

      const nextPath = hrefPathname(href);
      if (!nextPath) return;

      const current = stripLocalePrefix(window.location.pathname);
      const next = stripLocalePrefix(nextPath);
      if (current !== next) {
        // Cross-page (hash’li /#contact dahil): Lenis’i kilitle
        // Hash yoksa tepeyi temizle; hash varsa pathname effect hedefe götürür
        const gen = bumpNavGeneration();
        pauseLenis();
        if (!hash) scrollWindowTop(true);
        window.setTimeout(() => {
          if (isCurrentNavGeneration(gen)) resumeLenis();
        }, 420);
        return;
      }

      // Aynı path + hash buraya gelmez (üstte handle edildi)
      if (hash) return;

      // Aynı path, hash yok → tepeye; Next remount etmeyebilir
      if (window.location.hash) {
        e.preventDefault();
        bumpNavGeneration();
        window.history.pushState(null, "", current);
        lastKey.current = stripLocalePrefix(window.location.pathname);
        window.dispatchEvent(new Event("metek:lazy-reveal"));
        pauseLenis();
        scrollWindowTop(true);
        resumeLenis();
        scheduleScrollTriggerRefresh(120);
        return;
      }

      // Aynı path, zaten tepede değilse yumuşak tepe
      if (window.scrollY > 8 || (window.__lenis?.scroll ?? 0) > 8) {
        e.preventDefault();
        bumpNavGeneration();
        scrollWindowTop(false);
        scheduleScrollTriggerRefresh(180);
      }
    };

    document.addEventListener("click", onClick, true);

    if (useLenis) {
      void (async () => {
        try {
          const [{ default: LenisCtor }] = await Promise.all([
            import("lenis"),
            import("lenis/dist/lenis.css"),
          ]);
          if (cancelled) return;

          const lenis = new LenisCtor({
            duration: 1.05,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.05,
            wheelMultiplier: 1,
          });
          lenisRef.current = lenis;
          window.__lenis = lenis;
          gsap.ticker.lagSmoothing(0);

          onLenisScroll = () => {
            ScrollTrigger.update();
          };
          lenis.on("scroll", onLenisScroll);

          tick = (time: number) => {
            lenis.raf(time * 1000);
          };
          gsap.ticker.add(tick);

          t1 = window.setTimeout(() => scheduleScrollTriggerRefresh(0), 120);
          t2 = window.setTimeout(() => scheduleScrollTriggerRefresh(0), 700);
          void document.fonts?.ready.then(() =>
            scheduleScrollTriggerRefresh(0)
          );
          window.addEventListener("load", onLoad);

          // Lenis geç mount olunca mevcut hash’i yeniden hizala (LazyMount settle)
          if (window.location.hash && window.location.hash !== "#") {
            window.dispatchEvent(new Event("metek:lazy-reveal"));
            const hash = window.location.hash;
            let n = 0;
            const realign = window.setInterval(() => {
              n += 1;
              const el = document.querySelector(hash);
              if (el) {
                (el as HTMLElement).style.contentVisibility = "visible";
                scrollToElement(el, { immediate: true });
              }
              if (n >= 10) window.clearInterval(realign);
            }, 50);
          }
        } catch {
          lenisRef.current = null;
        }
      })();
    } else if (window.location.hash) {
      scrollToHash(window.location.hash, false);
    }

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", onLoad);
      const lenis = lenisRef.current;
      if (lenis && onLenisScroll) lenis.off("scroll", onLenisScroll);
      if (tick) gsap.ticker.remove(tick);
      if (lenis) {
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        if (window.__lenis === lenis) delete window.__lenis;
      }
      lenisRef.current = null;
    };
  }, []);

  // Rota + hash settle — yalnızca son generation çalışır
  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";
    const key = `${pathWithoutLocale(pathname)}${hash}`;

    if (pathBoot.current) {
      pathBoot.current = false;
      lastKey.current = key;
      // İlk yüklemede hash yoksa Lenis init yeter; hash varsa LazyMount poll şart
      if (!hash || hash === "#") return;
    } else if (lastKey.current === key) {
      // Aynı key’e tekrar (StrictMode vs.) → no-op
      return;
    } else {
      lastKey.current = key;
    }

    const gen = bumpNavGeneration();
    const timers: number[] = [];

    pauseLenis();

    const finish = () => {
      if (!isCurrentNavGeneration(gen)) return;
      resumeLenis();
      scheduleScrollTriggerRefresh(160);
    };

    if (!hash || hash === "#") {
      scrollWindowTop(true);
      timers.push(
        window.setTimeout(() => {
          if (!isCurrentNavGeneration(gen)) return;
          scrollWindowTop(true);
        }, 40)
      );
      timers.push(
        window.setTimeout(() => {
          if (!isCurrentNavGeneration(gen)) return;
          scrollWindowTop(true);
          finish();
        }, 280)
      );
      return () => {
        timers.forEach((id) => window.clearTimeout(id));
      };
    }

    // Hash hedefi — LazyMount / dynamic yükseklik için tekrarlı settle
    window.dispatchEvent(new Event("metek:lazy-reveal"));
    let tries = 0;
    const maxTries = 28;
    let lastH = -1;
    let stable = 0;
    const run = () => {
      if (!isCurrentNavGeneration(gen)) return true;
      const el = document.querySelector(hash);
      if (!el) return false;
      (el as HTMLElement).style.contentVisibility = "visible";
      const h = (el as HTMLElement).offsetHeight;
      scrollToElement(el, { immediate: true });
      if (h > 80 && Math.abs(h - lastH) < 2) {
        stable += 1;
      } else {
        stable = 0;
      }
      lastH = h;
      return stable >= 2;
    };

    const poll = window.setInterval(() => {
      tries += 1;
      if (run() || tries >= maxTries || !isCurrentNavGeneration(gen)) {
        window.clearInterval(poll);
        if (isCurrentNavGeneration(gen)) {
          run();
          timers.push(window.setTimeout(finish, 80));
        }
      }
    }, 50);
    timers.push(poll as unknown as number);

    timers.push(
      window.setTimeout(() => {
        if (!isCurrentNavGeneration(gen)) return;
        run();
        finish();
      }, 1800)
    );

    return () => {
      timers.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
    };
  }, [pathname]);

  // Hash-only değişim (pathname aynı) — örn. / → /#contact client nav
  useEffect(() => {
    let pollId = 0;

    const settleHash = (e?: Event) => {
      const key = `${pathWithoutLocale(pathname)}${window.location.hash}`;
      const hash = window.location.hash;
      const same = lastKey.current === key;

      // Geri tuşu: key aynı görünse bile (edge) tepeye kilitle
      if (same) {
        if (
          e?.type === "popstate" &&
          (!hash || hash === "#") &&
          window.scrollY > 8
        ) {
          pauseLenis();
          scrollWindowTop(true);
          resumeLenis();
        }
        return;
      }
      lastKey.current = key;

      const gen = bumpNavGeneration();
      window.clearInterval(pollId);

      if (!hash || hash === "#") {
        pauseLenis();
        scrollWindowTop(true);
        resumeLenis();
        scheduleScrollTriggerRefresh(120);
        return;
      }

      pauseLenis();
      window.dispatchEvent(new Event("metek:lazy-reveal"));
      let tries = 0;
      let lastH = -1;
      let stable = 0;
      pollId = window.setInterval(() => {
        if (!isCurrentNavGeneration(gen)) {
          window.clearInterval(pollId);
          return;
        }
        const el = document.querySelector(hash);
        tries += 1;
        if (el) {
          (el as HTMLElement).style.contentVisibility = "visible";
          const h = (el as HTMLElement).offsetHeight;
          scrollToElement(el, { immediate: true });
          if (h > 80 && Math.abs(h - lastH) < 2) stable += 1;
          else stable = 0;
          lastH = h;
          if (stable >= 2 || tries >= 28) {
            window.clearInterval(pollId);
            resumeLenis();
            scheduleScrollTriggerRefresh(160);
          }
          return;
        }
        if (tries >= 28) {
          window.clearInterval(pollId);
          resumeLenis();
        }
      }, 50);
    };

    window.addEventListener("hashchange", settleHash);
    window.addEventListener("popstate", settleHash);
    // Locale restore / pushState sonrası (hashchange yok) — lastKey sync + settle
    window.addEventListener("metek:lazy-reveal", settleHash);
    return () => {
      window.removeEventListener("hashchange", settleHash);
      window.removeEventListener("popstate", settleHash);
      window.removeEventListener("metek:lazy-reveal", settleHash);
      window.clearInterval(pollId);
    };
  }, [pathname]);

  // Dil değişimi: scroll koru, refresh debounce
  useEffect(() => {
    if (localeBoot.current) {
      localeBoot.current = false;
      return;
    }
    // Tek debounce — 80+280+fonts üçlüsü dil değişiminde jank yaratıyordu
    scheduleScrollTriggerRefresh(140);
    void document.fonts?.ready.then(() => scheduleScrollTriggerRefresh(60));
  }, [locale]);

  return children;
}
