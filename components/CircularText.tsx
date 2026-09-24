"use client";

import type { CSSProperties } from "react";
import "./CircularText.css";

type HoverBehavior = "slowDown" | "speedUp" | "pause" | "goBonkers";

type CircularTextProps = {
  text: string;
  spinDuration?: number;
  onHover?: HoverBehavior;
  className?: string;
};

/**
 * CSS @keyframes rotate — motion/react yok (footer her sayfada).
 * Hover hızları data-hover ile CSS custom property üzerinden.
 */
export default function CircularText({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}: CircularTextProps) {
  const letters = Array.from(text);

  return (
    <div
      className={`circular-text ${className}`.trim()}
      style={{ "--circular-spin": `${spinDuration}s` } as CSSProperties}
      data-hover={onHover}
      aria-hidden
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const transform = `rotate(${rotationDeg}deg) translateY(calc(-1 * var(--circular-r))) translateX(-50%)`;

        return (
          <span
            key={`${letter}-${i}`}
            style={{ transform, WebkitTransform: transform }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        );
      })}
    </div>
  );
}
