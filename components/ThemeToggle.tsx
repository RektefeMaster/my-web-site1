"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/lib/theme";
import { gsap } from "@/lib/gsap";

/** Monokrom tema anahtarı — dekoratif cam, glow veya renk noktası yok. */
export default function ThemeToggle() {
  const t = useTranslations("a11y");
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const btnRef = useRef<HTMLButtonElement>(null);

  const onPointerDown = () => {
    const btn = btnRef.current;
    if (!btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      btn,
      { scale: 1 },
      { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  };

  return (
    <button
      ref={btnRef}
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      onPointerDown={onPointerDown}
      aria-label={isDark ? t("themeToLight") : t("themeToDark")}
      aria-pressed={isDark}
      title={isDark ? t("themeToLight") : t("themeToDark")}
      suppressHydrationWarning
    >
      <span
        className={`theme-toggle__mode${!isDark ? " is-active" : ""}`}
        aria-hidden
      >
        L
      </span>
      <span className="theme-toggle__divider" aria-hidden>/</span>
      <span
        className={`theme-toggle__mode${isDark ? " is-active" : ""}`}
        aria-hidden
      >
        D
      </span>
    </button>
  );
}
