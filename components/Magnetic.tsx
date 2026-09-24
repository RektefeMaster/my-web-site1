"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Refined magnetic pull — restrained, no elastic bounce. */
export default function Magnetic({
  children,
  className = "",
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const rectCache = useRef<DOMRect | null>(null);

  useGSAP(
    () => {
      const el = inner.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      enabled.current = !reduce && !coarse;
      if (!enabled.current) return;
      gsap.set(el, { x: 0, y: 0 });
    },
    { scope: root }
  );

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const wrap = root.current;
    const el = inner.current;
    if (!wrap || !el || !enabled.current) return;

    // Rect'i mousemove başına değil, enter/resize sonrası cache'le
    let rect = rectCache.current;
    if (!rect) {
      rect = wrap.getBoundingClientRect();
      rectCache.current = rect;
    }

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
      force3D: true,
    });
  }

  function onEnter() {
    const wrap = root.current;
    if (wrap) rectCache.current = wrap.getBoundingClientRect();
  }

  function onLeave() {
    rectCache.current = null;
    const el = inner.current;
    if (!el || !enabled.current) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
      force3D: true,
    });
  }

  return (
    <div
      ref={root}
      className={`inline-flex ${className}`.trim()}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={inner}
        className="h-full w-full will-change-transform"
        style={{ transform: "translateZ(0)" }}
      >
        {children}
      </div>
    </div>
  );
}
