"use client";

import {
  useRef,
  useEffect,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
} from "react";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";
import type { SpecularFxProps } from "@/lib/specular-fx";
import "./SpecularButton.css";

type LinkHref = ComponentProps<typeof Link>["href"];

export type SpecularTone = "accent" | "ink";

type SpecularButtonBase = {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  /** Marka hazır ayarı — accent / ink birincil CTA */
  tone?: SpecularTone;
  /** Mobilde tam genişlik */
  fillMobile?: boolean;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

type SpecularButtonAsButton = SpecularButtonBase & {
  href?: undefined;
  externalHref?: undefined;
};

type SpecularButtonAsLink = SpecularButtonBase & {
  href: LinkHref;
  externalHref?: undefined;
};

type SpecularButtonAsExternal = SpecularButtonBase & {
  href?: undefined;
  externalHref: string;
};

export type SpecularButtonProps =
  | SpecularButtonAsButton
  | SpecularButtonAsLink
  | SpecularButtonAsExternal;

const TONE: Record<
  SpecularTone,
  Pick<
    SpecularButtonBase,
    "tint" | "tintOpacity" | "textColor" | "lineColor" | "baseColor" | "radius"
  >
> = {
  /*
    tint / textColor CSS'te (color-mix) çözülüyor → tema token'ı verilebilir.
    Sabit hex bırakılırsa buton koyu temada sönük kalıyor ve navbar'daki
    `bg-accent` CTA ile aynı rengi tutturmuyordu.
    lineColor / baseColor WebGL specular katmanına gidiyor; orada var()
    çözülmez, bu yüzden onlar iki temada da çalışan sabit ara tonlar.
  */
  accent: {
    tint: "var(--accent)",
    tintOpacity: 1,
    textColor: "var(--on-accent)",
    /* WebGL katmanı var() çözmez — Petrol chrome ara tonları */
    lineColor: "#f2fffe",
    baseColor: "#0a524f",
    radius: 4,
  },
  ink: {
    tint: "var(--ink)",
    tintOpacity: 1,
    textColor: "var(--ink-fg)",
    lineColor: "#3dcdc4",
    baseColor: "#222a34",
    radius: 4,
  },
};

function shouldEnableFx() {
  if (typeof window === "undefined") return false;
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

function subscribeFxPreference(onStoreChange: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = window.matchMedia("(pointer: coarse)");
  reduce.addEventListener("change", onStoreChange);
  coarse.addEventListener("change", onStoreChange);
  return () => {
    reduce.removeEventListener("change", onStoreChange);
    coarse.removeEventListener("change", onStoreChange);
  };
}

export default function SpecularButton({
  children,
  size = "md",
  radius,
  tint,
  tintOpacity,
  blur = 0,
  textColor,
  lineColor,
  baseColor,
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  tone = "accent",
  fillMobile = false,
  href,
  externalHref,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: SpecularButtonProps) {
  const preset = TONE[tone];
  const resolvedRadius = radius ?? preset.radius ?? 18;
  const resolvedTint = tint ?? preset.tint ?? "#ffffff";
  const resolvedTintOpacity = tintOpacity ?? preset.tintOpacity ?? 0;
  const resolvedTextColor = textColor ?? preset.textColor ?? "#f5f5f5";
  const resolvedLineColor = lineColor ?? preset.lineColor ?? "#ffffff";
  const resolvedBaseColor = baseColor ?? preset.baseColor ?? "#525252";

  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);
  const propsRef = useRef<SpecularFxProps>({
    radius: resolvedRadius,
    lineColor: resolvedLineColor,
    baseColor: resolvedBaseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate,
  });
  const fxOn = useSyncExternalStore(
    subscribeFxPreference,
    shouldEnableFx,
    () => false
  );

  useEffect(() => {
    propsRef.current = {
      radius: resolvedRadius,
      lineColor: resolvedLineColor,
      baseColor: resolvedBaseColor,
      intensity,
      shineSize,
      shineFade,
      thickness,
      speed,
      followMouse,
      proximity,
      autoAnimate,
    };
  }, [
    resolvedRadius,
    resolvedLineColor,
    resolvedBaseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate,
  ]);

  useEffect(() => {
    const btn = btnRef.current;
    const fx = fxRef.current;
    if (!fxOn || !btn || !fx) return;

    // ogl yalnızca görünür butonda lazy — blog/services critical path’e girmez
    let unmountFx: (() => void) | null = null;
    let cancelled = false;
    let mounting = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        const vis = entry?.isIntersecting ?? false;
        if (vis) {
          if (unmountFx || mounting) return;
          mounting = true;
          void import("@/lib/specular-fx").then(({ mountSpecularFx }) => {
            mounting = false;
            if (cancelled || unmountFx) return;
            unmountFx = mountSpecularFx(btn, fx, () => propsRef.current);
          });
          return;
        }
        if (unmountFx) {
          unmountFx();
          unmountFx = null;
        }
      },
      { rootMargin: "140px 0px" }
    );
    io.observe(btn);
    return () => {
      cancelled = true;
      io.disconnect();
      unmountFx?.();
    };
  }, [fxOn]);

  const classNames = [
    "specular-button",
    `specular-button--${size}`,
    fillMobile ? "specular-button--fill-mobile" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--sb-radius": `${resolvedRadius}px`,
    "--sb-tint": resolvedTint,
    "--sb-tint-opacity": resolvedTintOpacity,
    "--sb-blur": `${blur}px`,
    "--sb-text-color": resolvedTextColor,
  } as CSSProperties;

  const inner = (
    <>
      {/* Span her zaman DOM’da — hydration parity; GL yalnızca fxOn’da bağlanır */}
      <span
        ref={fxRef}
        className="specular-button__fx"
        aria-hidden="true"
        hidden={!fxOn}
      />
      <span className="specular-button__label">{children}</span>
    </>
  );

  if (href !== undefined) {
    return (
      <Link
        ref={btnRef as Ref<HTMLAnchorElement>}
        href={href}
        scroll={false}
        aria-label={ariaLabel}
        className={classNames}
        style={style}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  if (externalHref) {
    return (
      <a
        ref={btnRef as Ref<HTMLAnchorElement>}
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={classNames}
        style={style}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={classNames}
      style={style}
    >
      {inner}
    </button>
  );
}
