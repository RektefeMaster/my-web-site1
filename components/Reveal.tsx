"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, attachScrollReveal } from "@/lib/gsap";
import { motion, motionEase } from "@/lib/motion";

type RevealMode = "fade" | "line" | "mask";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** ms — geriye uyumluluk; tercihen delaySec */
  delay?: number;
  delaySec?: number;
  from?: "up" | "left" | "right" | "scale";
  y?: number;
  mode?: RevealMode;
  /** true: leaveBack reverse yok */
  once?: boolean;
};

/**
 * Tek reveal primitive — mode: fade | line | mask.
 * Word/letter animasyonu yalnızca hero / manifesto için ayrı kalır.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  delaySec,
  from = "up",
  y = 40,
  mode = "fade",
  /** Varsayılan once — leaveBack reverse maliyeti yok; ST enter’da kill */
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const resolvedDelay = delaySec ?? delay / 1000;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.classList.remove("reveal-boot");
        gsap.set(el, {
          clearProps: "all",
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: "none",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let x = 0;
        let yFrom = 0;
        let scale = 1;

        switch (from) {
          case "left":
            x = -36;
            break;
          case "right":
            x = 36;
            break;
          case "scale":
            scale = 0.96;
            break;
          case "up":
            yFrom = mode === "line" ? Math.min(y, 28) : y;
            break;
          default: {
            const _exhaustive: never = from;
            void _exhaustive;
            yFrom = y;
            break;
          }
        }

        const duration =
          mode === "mask" || mode === "line" ? motion.narrative : motion.base;

        const fromVars: gsap.TweenVars = {
          opacity: 0,
          x,
          y: yFrom,
          scale,
          force3D: true,
        };
        const toVars: gsap.TweenVars = {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay: resolvedDelay,
          ease: mode === "line" ? motionEase.narrative : motionEase.out,
          force3D: true,
          immediateRender: true,
          paused: true,
        };

        if (mode === "mask") {
          fromVars.clipPath = "inset(0 0 100% 0)";
          toVars.clipPath = "inset(0 0 0% 0)";
        }

        const tween = gsap.fromTo(el, fromVars, toVars);
        tween.eventCallback("onStart", () => {
          el.classList.remove("reveal-boot");
        });

        attachScrollReveal(tween, el, once ? { once: true } : undefined);
      });

      return () => mm.revert();
    },
    { dependencies: [resolvedDelay, from, y, mode, once] }
  );

  return (
    <div
      ref={ref}
      className={`reveal-boot ${className}`.trim()}
      data-reveal=""
    >
      {children}
    </div>
  );
}
