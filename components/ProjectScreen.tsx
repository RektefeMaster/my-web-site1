"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { bustScrollAsset } from "@/lib/project-assets";

/*
  Şerit YALNIZCA fare olan cihazda iner.

  Şeritler `next/image` hattının dışında duran ham JPG'ler (400KB–1.4MB) ve
  tek işleri hover'da kaymak. Dokunmatikte `onEnter` zaten `pointerType`
  kontrolüyle çıkıyor, yani telefonda şerit indirilse bile HİÇ oynamıyordu —
  ölçüldü: /tr/work mobilde 8.7MB indiriyordu, 8.2MB'ı bu şeritlerdi.
  Kapı fine pointer'da: statik `src` (optimize edilmiş next/image) zaten
  ekranda duruyor, görsel çıktı dokunmatikte birebir aynı.
*/
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function getCanHover() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function subscribeCanHover(onStoreChange: () => void) {
  const mql = window.matchMedia(HOVER_QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function PlaceholderScreen({
  colors,
  label,
}: {
  colors: [string, string];
  label: string;
}) {
  const [c1, c2] = colors;
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-[8%]"
      style={{
        background: `linear-gradient(145deg, ${c1} 0%, ${c2} 100%)`,
      }}
    >
      <div className="h-[6%] w-[28%] rounded-full bg-white/25" />
      <div className="space-y-[6%]">
        <p className="truncate text-[clamp(0.55rem,1.6vw,0.85rem)] font-bold tracking-wide text-white">
          {label}
        </p>
        <div className="h-[4%] w-[70%] rounded-full bg-white/40" />
        <div className="h-[4%] w-[48%] rounded-full bg-white/25" />
      </div>
    </div>
  );
}

/**
 * Mockup ekranı — scroll şeridi tek kaynak.
 * Dinlenme: şeridin üst kısmı (translateY 0). Hover: şerit yukarı kayar.
 * object-cover + ayrı desktop.jpg kullanılmaz; hizalama kayması olmaz.
 */
export function ProjectScreen({
  src,
  scrollSrc,
  alt,
  colors,
  label,
  sizes,
  priority = false,
  scroll = false,
  quality = 75,
  objectPosition,
  eagerStrip = false,
}: {
  src?: string;
  scrollSrc?: string;
  alt: string;
  colors: [string, string];
  label: string;
  sizes: string;
  priority?: boolean;
  scroll?: boolean;
  quality?: number;
  objectPosition?: string;
  /** Hero mockup: şeridi viewport beklemeden mount et */
  eagerStrip?: boolean;
}) {
  const bustedScrollSrc = bustScrollAsset(scrollSrc);

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollImageRef = useRef<HTMLImageElement>(null);
  const hoveringRef = useRef(false);
  const stripLoadedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  /* SSR anlık görüntüsü `false` — sunucuda şerit HİÇ basılmıyor, hydrate'te
     yalnız fareli cihazda açılıyor. */
  const canHover = useSyncExternalStore(
    subscribeCanHover,
    getCanHover,
    () => false,
  );

  const scrollable = Boolean(scroll && bustedScrollSrc && canHover);
  /* IntersectionObserver / hover ile açılan kapı; `priority`/`eagerStrip`
     doğrudan `stripMounted` içinde okunuyor ki effect içinde setState
     zinciri kurulmasın. */
  const [stripRequested, setStripRequested] = useState(false);
  /* `priority` YALNIZCA statik önizlemenin (next/image) yükleme önceliği.
     Şeridi mount etmesine izin verme: /work'te ilk üç kart `priority`
     taşıyor ve bu, hover edilmeyen 6 şeridi (~1.2MB) indiriyordu.
     Şeridi erken isteyen tek yer `eagerStrip` (LCP mockup'ı). */
  const stripMounted = scrollable && (eagerStrip || stripRequested);
  const [stripLoaded, setStripLoaded] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollMetrics, setScrollMetrics] = useState({
    distance: 0,
    duration: 6,
  });

  const measureScrollImage = useCallback(() => {
    const root = rootRef.current;
    const img = scrollImageRef.current;
    if (!root || !img?.naturalWidth) return;

    const w = root.clientWidth;
    const h = root.clientHeight;
    if (w < 8 || h < 8) return;

    const displayedHeight = (img.naturalHeight / img.naturalWidth) * w;
    const distance = Math.max(0, displayedHeight - h);
    const screens = h > 0 ? distance / h : 0;
    const duration = Math.min(18, Math.max(5.5, 3.5 + screens * 2.6));

    setScrollMetrics((current) => {
      if (
        Math.abs(current.distance - distance) < 0.5 &&
        Math.abs(current.duration - duration) < 0.01
      ) {
        return current;
      }
      return { distance, duration };
    });
  }, []);

  const handleStripReady = useCallback(() => {
    if (stripLoadedRef.current) return;
    stripLoadedRef.current = true;
    measureScrollImage();
    setStripLoaded(true);
    requestAnimationFrame(measureScrollImage);
  }, [measureScrollImage]);

  const bindScrollImage = useCallback(
    (node: HTMLImageElement | null) => {
      scrollImageRef.current = node;
      if (node?.complete && node.naturalWidth > 0) {
        handleStripReady();
      }
    },
    [handleStripReady],
  );

  const activateScroll = useCallback(() => {
    if (reducedMotionRef.current || !stripLoadedRef.current) return;
    setScrollActive(true);
  }, []);

  const deactivateScroll = useCallback(() => {
    hoveringRef.current = false;
    setScrollActive(false);
  }, []);

  /* Cache'den gelen img onLoad tetiklemez — complete kontrolü */
  useEffect(() => {
    if (!stripMounted) return;
    const img = scrollImageRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      handleStripReady();
    }
  }, [stripMounted, bustedScrollSrc, handleStripReady]);

  /*
    Şerit YALNIZCA `pointerenter` ile iner — viewport tetiği YOK.

    Eskiden 280px rootMargin'li bir IntersectionObserver şeritleri önden
    çekiyordu; /tr/work'te bu, hiç hover edilmese bile 20 şerit (masaüstünde
    ~8MB) indiriyordu. Gecikme görünmüyor: `activateScroll` zaten
    `stripLoaded`'ı bekliyor ve kayma animasyonu 5.5–18sn sürüyor, yani
    şeridin ilk hover'da inmesi gözle fark edilmiyor. Beklerken statik
    `src` önizlemesi ekranda duruyor.
  */

  /* Hover — mockup kökünde dinle (çerçeve PNG pointer engeli) */
  useEffect(() => {
    if (!scrollable) return;
    const el = rootRef.current;
    if (!el) return;

    const motionTarget = el.closest("[data-mock-root]") ?? el;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReduced = () => {
      reducedMotionRef.current = reducedMotion.matches;
      if (reducedMotion.matches) deactivateScroll();
    };

    const onEnter = (event: Event) => {
      const pt = (event as PointerEvent).pointerType;
      if (pt && pt !== "mouse") return;
      hoveringRef.current = true;
      if (!stripMounted) setStripRequested(true);
      if (stripLoadedRef.current) activateScroll();
    };

    const onLeave = (event: Event) => {
      const pt = (event as PointerEvent).pointerType;
      if (pt && pt !== "mouse") return;
      deactivateScroll();
    };

    syncReduced();
    reducedMotion.addEventListener("change", syncReduced);
    motionTarget.addEventListener("pointerenter", onEnter);
    motionTarget.addEventListener("pointerleave", onLeave);

    return () => {
      reducedMotion.removeEventListener("change", syncReduced);
      motionTarget.removeEventListener("pointerenter", onEnter);
      motionTarget.removeEventListener("pointerleave", onLeave);
    };
  }, [scrollable, stripMounted, activateScroll, deactivateScroll]);

  /* Şerit yüklendi, hover bekliyor */
  useEffect(() => {
    if (!stripLoaded || !hoveringRef.current || reducedMotionRef.current) {
      return;
    }
    activateScroll();
  }, [stripLoaded, activateScroll]);

  useEffect(() => {
    if (!scrollable || !stripMounted) return;
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(measureScrollImage);
    observer.observe(root);
    measureScrollImage();
    return () => observer.disconnect();
  }, [measureScrollImage, scrollable, stripMounted]);

  if (!src && !scrollSrc) {
    return <PlaceholderScreen colors={colors} label={label} />;
  }

  if (scrollable && bustedScrollSrc) {
    const { distance, duration } = scrollMetrics;

    return (
      <div
        ref={rootRef}
        className="device-screen-scroll absolute inset-0 overflow-hidden bg-[#06080b]"
        data-scroll-active={scrollActive ? "true" : "false"}
        data-scroll-loaded={stripLoaded ? "true" : "false"}
        data-device-screen=""
      >
        {/* Şerit yüklenene kadar statik önizleme (aynı viewport crop) */}
        {!stripLoaded && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={quality}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="object-cover object-top"
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : null}

        {stripMounted ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            ref={bindScrollImage}
            src={bustedScrollSrc}
            alt={stripLoaded ? alt : ""}
            aria-hidden={!stripLoaded}
            className="device-screen-scroll__img pointer-events-none absolute left-0 top-0 z-[1] select-none"
            loading="eager"
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            draggable={false}
            style={{
              opacity: stripLoaded ? 1 : 0,
              transform: scrollActive
                ? `translate3d(0, -${distance.toFixed(2)}px, 0)`
                : "translate3d(0, 0, 0)",
              transitionProperty: "transform, opacity",
              transitionDuration: `${scrollActive ? duration : 1.1}s, 220ms`,
              transitionTimingFunction: `${
                scrollActive
                  ? "cubic-bezier(0.4, 0.08, 0.4, 0.92)"
                  : "cubic-bezier(0.33, 1, 0.68, 1)"
              }, ease-out`,
            }}
            onLoad={handleStripReady}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="absolute inset-0 bg-[#06080b]">
      <Image
        src={src ?? scrollSrc!}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="object-cover object-top"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
