/**
 * Soft-nav sırasında tek scroll/refresh sahibi.
 * Hızlı tıklamada eski timer ve ScrollTrigger.refresh yarışlarını keser.
 */

import { ScrollTrigger } from "@/lib/gsap";

let generation = 0;
let refreshTimer = 0;
let refreshRaf1 = 0;
let refreshRaf2 = 0;

export function bumpNavGeneration(): number {
  generation += 1;
  return generation;
}

export function isCurrentNavGeneration(id: number): boolean {
  return id === generation;
}

/** Locale / rota / pin sonrası pahalı refresh’i debounce et */
export function scheduleScrollTriggerRefresh(delayMs = 140): void {
  if (typeof window === "undefined") return;
  window.clearTimeout(refreshTimer);
  cancelAnimationFrame(refreshRaf1);
  cancelAnimationFrame(refreshRaf2);
  refreshTimer = window.setTimeout(() => {
    refreshRaf1 = requestAnimationFrame(() => {
      refreshRaf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, delayMs);
}

export function navOffsetPx(): number {
  if (typeof document === "undefined") return 120;
  const shell = document.querySelector<HTMLElement>("[data-nav-shell]");
  return shell?.getBoundingClientRect().height ?? 120;
}

/** CSS --nav-offset’u gerçek shell yüksekliğine bağla (hash scroll + hero pt) */
export function attachNavOffsetSync(shell: HTMLElement): () => void {
  const sync = () => {
    const h = Math.ceil(shell.getBoundingClientRect().height);
    if (h > 0) {
      document.documentElement.style.setProperty("--nav-offset", `${h}px`);
    }
  };
  sync();
  const ro = new ResizeObserver(sync);
  ro.observe(shell);
  window.addEventListener("orientationchange", sync);
  return () => {
    ro.disconnect();
    window.removeEventListener("orientationchange", sync);
  };
}

export function scrollWindowTo(
  top: number,
  opts?: { immediate?: boolean; duration?: number }
): void {
  const y = Math.max(0, top);
  const lenis = window.__lenis;
  const immediate = opts?.immediate ?? true;
  if (lenis) {
    // stop() iken Lenis scrollTo no-op olabiliyor — native ile de kilitle
    lenis.scrollTo(y, {
      immediate,
      duration: immediate ? 0 : (opts?.duration ?? 0.9),
    });
    if (immediate) {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    }
    return;
  }
  window.scrollTo({
    top: y,
    left: 0,
    behavior: immediate ? "auto" : "smooth",
  });
}

export function scrollWindowTop(immediate = true): void {
  scrollWindowTo(0, { immediate });
}

export function scrollToElement(
  el: Element,
  opts?: { immediate?: boolean; duration?: number; extraOffset?: number }
): void {
  const offset = navOffsetPx() + (opts?.extraOffset ?? 8);
  const lenis = window.__lenis;
  const immediate = opts?.immediate ?? true;

  if (lenis) {
    const target =
      lenis.scroll +
      (el as HTMLElement).getBoundingClientRect().top -
      offset;
    lenis.scrollTo(Math.max(0, target), {
      immediate,
      duration: immediate ? 0 : (opts?.duration ?? 1.05),
    });
    if (immediate) {
      const top =
        (el as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        offset;
      window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
    }
    return;
  }

  const top =
    (el as HTMLElement).getBoundingClientRect().top +
    window.scrollY -
    offset;
  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior: immediate ? "auto" : "smooth",
  });
}

/** Lenis varsa kısa süre kilitle — soft-nav settle sırasında wheel savaşı olmasın */
export function pauseLenis(): void {
  window.__lenis?.stop();
}

export function resumeLenis(): void {
  window.__lenis?.start();
}
