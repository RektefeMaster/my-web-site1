"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectScreen } from "./ProjectScreen";

export const LIVE_VIEWPORT = {
  desktop: { width: 1440, iframeHeight: 4200 },
  mobile: { width: 390, iframeHeight: 5200 },
} as const;

type LiveVariant = keyof typeof LIVE_VIEWPORT;

type LiveProjectScreenProps = {
  url?: string;
  variant?: LiveVariant;
  alt: string;
  colors: [string, string];
  label: string;
  fallbackSrc?: string;
  fallbackScrollSrc?: string;
  priority?: boolean;
  scroll?: boolean;
  quality?: number;
  sizes: string;
};

/**
 * Canlı site önizlemesi — iframe içinde gerçek URL.
 * Hover'da sayfa aşağı kayar (transform translateY; cross-origin güvenli).
 * Yüklenemezse veya embed engellenirse screenshot şeridine düşer.
 */
export function LiveProjectScreen({
  url,
  variant = "desktop",
  alt,
  colors,
  label,
  fallbackSrc,
  fallbackScrollSrc,
  priority = false,
  scroll = true,
  quality = 75,
  sizes,
}: LiveProjectScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const maxScrollRef = useRef(0);
  const durationRef = useRef(8);
  const hoveringRef = useRef(false);

  const [shouldMount, setShouldMount] = useState(priority);
  const [failed, setFailed] = useState(false);
  const [liveVisible, setLiveVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [duration, setDuration] = useState(8);

  const preset = LIVE_VIEWPORT[variant];

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    if (w < 8 || h < 8) return;

    const s = w / preset.width;
    const max = Math.max(0, preset.iframeHeight - h / s);
    const viewScreens = h / s > 0 ? max / (h / s) : 0;
    const dur = Math.min(20, Math.max(6.5, 4 + viewScreens * 2.8));

    maxScrollRef.current = max;
    durationRef.current = dur;
    setScale(s);
    setDuration(dur);
  }, [preset]);

  /* Görünür olunca iframe mount — 3 proje × 2 cihaz ağır olabilir */
  useEffect(() => {
    if (!url || failed || shouldMount) return;
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [url, failed, shouldMount]);

  useEffect(() => {
    if (!url || failed) return;
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [measure, url, failed]);

  /* Embed zaman aşımı — X-Frame-Options engeli */
  useEffect(() => {
    if (!shouldMount || !url || failed) return;
    const timer = window.setTimeout(() => {
      if (!liveVisible) setFailed(true);
    }, 12000);
    return () => window.clearTimeout(timer);
  }, [shouldMount, url, failed, liveVisible]);

  /* Hover scroll — mockup kökünde fare niyeti */
  useEffect(() => {
    if (!scroll || !url || failed) return;
    const root = rootRef.current;
    if (!root) return;

    const motionTarget = root.closest("[data-mock-root]") ?? root;
    const preloadTarget =
      root.closest("[data-project-item]") ?? motionTarget;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncScroll = (active: boolean) => {
      if (reducedMotion.matches) return;
      setScrolling(active);
      setScrollY(active ? maxScrollRef.current : 0);
    };

    const prepare = (event: Event) => {
      const pt = (event as PointerEvent).pointerType;
      if (pt && pt !== "mouse") return;
      if (!shouldMount) setShouldMount(true);
    };

    const enter = (event: Event) => {
      const pt = (event as PointerEvent).pointerType;
      if (pt && pt !== "mouse") return;
      hoveringRef.current = true;
      if (!liveVisible) return;
      requestAnimationFrame(() => {
        if (hoveringRef.current) syncScroll(true);
      });
    };

    const leave = (event: Event) => {
      const pt = (event as PointerEvent).pointerType;
      if (pt && pt !== "mouse") return;
      hoveringRef.current = false;
      syncScroll(false);
    };

    preloadTarget.addEventListener("pointerenter", prepare);
    motionTarget.addEventListener("pointerenter", enter);
    motionTarget.addEventListener("pointerleave", leave);

    return () => {
      preloadTarget.removeEventListener("pointerenter", prepare);
      motionTarget.removeEventListener("pointerenter", enter);
      motionTarget.removeEventListener("pointerleave", leave);
    };
  }, [scroll, url, failed, shouldMount, liveVisible]);

  if (!url || failed) {
    return (
      <ProjectScreen
        src={fallbackSrc}
        scrollSrc={fallbackScrollSrc}
        alt={alt}
        colors={colors}
        label={label}
        priority={priority}
        scroll={scroll && Boolean(fallbackScrollSrc)}
        quality={quality}
        sizes={sizes}
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className="live-project-screen absolute inset-0 overflow-hidden bg-[#06080b]"
      data-live-screen=""
    >
      {/* Yüklenene kadar statik önizleme — canlı siteye yumuşak geçiş */}
      {fallbackSrc ? (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: liveVisible ? 0 : 1 }}
          aria-hidden={liveVisible}
        >
          <ProjectScreen
            src={fallbackSrc}
            scrollSrc={undefined}
            alt={alt}
            colors={colors}
            label={label}
            priority={priority}
            scroll={false}
            quality={quality}
            sizes={sizes}
          />
        </div>
      ) : null}

      {shouldMount ? (
        <div
          className="live-project-screen__track pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{
            width: preset.width,
            height: preset.iframeHeight,
            opacity: liveVisible ? 1 : 0,
            transform: `scale(${scale}) translateY(${-scrollY}px)`,
            transition: scrolling
              ? `transform ${duration}s cubic-bezier(0.4, 0.08, 0.4, 0.92), opacity 0.35s ease`
              : `transform 1.5s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.35s ease`,
            willChange: scrolling ? "transform" : undefined,
          }}
        >
          <iframe
            src={url}
            title={alt}
            width={preset.width}
            height={preset.iframeHeight}
            className="block border-0 bg-white"
            loading={priority ? "eager" : "lazy"}
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
            onLoad={() => {
              window.setTimeout(() => setLiveVisible(true), 120);
            }}
            onError={() => setFailed(true)}
          />
        </div>
      ) : null}
    </div>
  );
}
