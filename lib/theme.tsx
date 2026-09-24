"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { scheduleScrollTriggerRefresh } from "@/lib/nav-scroll";

export type Theme = "light" | "dark";

const STORAGE_KEY = "metek-theme";
const THEME_EVENT = "metek-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* private mode */
  }
  return null;
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let colorSchemeTimer: ReturnType<typeof setTimeout> | null = null;

/** body/html background transition ile aynı — color-scheme erken
 *  değişirse native scrollbar chrome anında tersine döner (siyah/beyaz titreme) */
const THEME_TRANSITION_MS = 450;

function applyTheme(theme: Theme, opts?: { immediateColorScheme?: boolean }) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;

  if (colorSchemeTimer) clearTimeout(colorSchemeTimer);
  const immediateScheme =
    opts?.immediateColorScheme === true ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (immediateScheme) {
    root.style.colorScheme = theme;
  } else {
    // CSS zemin geçişi bitsin, sonra UA chrome’u güncelle
    colorSchemeTimer = setTimeout(() => {
      colorSchemeTimer = null;
      root.style.colorScheme = theme;
    }, THEME_TRANSITION_MS);
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute(
      "content",
      theme === "dark" ? "#0c0e12" : "#e6e8ec"
    );
  }

  // Nav intro GSAP opacity:0’da takılı kalmasın
  const nav = document.querySelector<HTMLElement>("[data-nav-shell]");
  if (nav) {
    const op = Number.parseFloat(getComputedStyle(nav).opacity);
    if (!Number.isFinite(op) || op < 0.99) {
      nav.style.opacity = "1";
      nav.style.transform = "";
    }
  }

  // CSS token geçişi bitsin, sonra ölç — erken refresh reveal’ları opacity:0 yapıyordu
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    scheduleScrollTriggerRefresh(0);
  }, 120);
}

/** FOUC önleyici — layout body başında inline yazılır */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(STORAGE_KEY)};var s=localStorage.getItem(k);var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";r.dataset.theme=d?"dark":"light";}catch(e){}})();`;

function themeFromDom(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getThemeSnapshot(): Theme {
  return (
    readStoredTheme() ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

function subscribeTheme(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onStoreChange();
  };
  const onCustom = () => onStoreChange();
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (readStoredTheme()) return;
    onStoreChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, onCustom);
  mq.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, onCustom);
    mq.removeEventListener("change", onSystem);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => "light" as Theme
  );

  useLayoutEffect(() => {
    applyTheme(theme, { immediateColorScheme: true });
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    const current = themeFromDom();
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
