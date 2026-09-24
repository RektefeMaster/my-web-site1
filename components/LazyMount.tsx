"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

type LazyMountProps = {
  children: ReactNode;
  /** Mount öncesi yer tutucu — CLS yok */
  minHeight?: string;
  rootMargin?: string;
  className?: string;
  /**
   * Hash hedefi — children mount olmasa da DOM’da kalır (#work vb.).
   * Hash eşleşince veya hashchange ile hemen mount.
   */
  id?: string;
};

/**
 * Viewport'a yaklaşınca children mount. dynamic() yalnızca bundle böler;
 * bu gerçek iş / ST / image decode ertelemesi sağlar.
 *
 * show her zaman false ile hydrate olur (SSR/client parity) — hash
 * yalnızca effect’te açılır (SmoothScroll poll ile uyumlu).
 */
export default function LazyMount({
  children,
  minHeight = "min(48vh, 520px)",
  rootMargin = "280px 0px",
  className,
  id,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;

    const reveal = () => setShow(true);

    if (id) {
      const match = () => {
        if (window.location.hash === `#${id}`) reveal();
      };
      match();
      window.addEventListener("hashchange", match);
      window.addEventListener("metek:lazy-reveal", match as EventListener);

      if (typeof IntersectionObserver === "undefined") {
        reveal();
        return () => {
          window.removeEventListener("hashchange", match);
          window.removeEventListener(
            "metek:lazy-reveal",
            match as EventListener
          );
        };
      }

      const el = ref.current;
      if (!el) {
        return () => {
          window.removeEventListener("hashchange", match);
          window.removeEventListener(
            "metek:lazy-reveal",
            match as EventListener
          );
        };
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          reveal();
          io.disconnect();
        },
        { rootMargin }
      );
      io.observe(el);
      return () => {
        io.disconnect();
        window.removeEventListener("hashchange", match);
        window.removeEventListener(
          "metek:lazy-reveal",
          match as EventListener
        );
      };
    }

    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        reveal();
        io.disconnect();
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin, id]);

  // content-visibility:auto burada KULLANMA — IO hedefini “skip” edip
  // mid-fold’un hiç mount olmamasına yol açabiliyor (Chromium).
  const style: CSSProperties | undefined = show ? undefined : { minHeight };

  return (
    <div ref={ref} id={id} className={className} style={style}>
      {show ? children : null}
    </div>
  );
}
