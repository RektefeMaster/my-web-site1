"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { bumpNavGeneration, scrollToElement } from "@/lib/nav-scroll";

const SUFFIX_KEY = "metek-locale-suffix";

const LOCALE_META = {
  en: { code: "EN", label: "English" },
  tr: { code: "TR", label: "Türkçe" },
  es: { code: "ES", label: "Español" },
  de: { code: "DE", label: "Deutsch" },
} as const;

type AppLocale = (typeof routing.locales)[number];

function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

export default function LanguageSwitcher() {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const boot = useRef(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const listId = useId();

  const current = isAppLocale(locale)
    ? LOCALE_META[locale]
    : LOCALE_META.en;

  // Locale settle sonrası hash/search’ü geri yaz — tek rAF yetmiyordu
  useEffect(() => {
    if (boot.current) {
      boot.current = false;
      return;
    }
    let suffix = "";
    try {
      suffix = sessionStorage.getItem(SUFFIX_KEY) ?? "";
      sessionStorage.removeItem(SUFFIX_KEY);
    } catch {
      /* private mode */
    }
    // ScrollTrigger.refresh → SmoothScroll locale effect (tek sahip)
    if (!suffix) return;

    const apply = () => {
      const next = `${window.location.pathname}${suffix}`;
      const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (cur !== next) {
        window.history.replaceState(null, "", next);
      }
      window.dispatchEvent(new Event("metek:lazy-reveal"));
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const el = document.querySelector(hash);
        if (el) {
          bumpNavGeneration();
          scrollToElement(el, { immediate: true });
        }
      }
    };

    const t1 = window.setTimeout(apply, 40);
    const t2 = window.setTimeout(apply, 260);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [locale]);

  /*
    Menü fixed — nav shell `overflow-x-clip` dikey menüyü de kesiyordu.
    Tetikleyici kutusuna göre top/right CSS değişkenleriyle hizala.
  */
  useLayoutEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const trigger = triggerRef.current;
    if (!root || !trigger) return;

    const place = () => {
      const r = trigger.getBoundingClientRect();
      root.style.setProperty("--lang-menu-top", `${Math.round(r.bottom + 6)}px`);
      root.style.setProperty(
        "--lang-menu-right",
        `${Math.round(window.innerWidth - r.right)}px`
      );
    };

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = event.target;
      if (target instanceof Node && !root.contains(target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const options = rootRef.current?.querySelectorAll<HTMLButtonElement>(
          ".lang-switch__option"
        );
        if (!options || options.length === 0) return;
        const currentIdx = Array.from(options).findIndex(
          (el) => el === document.activeElement
        );
        let nextIdx = 0;
        if (event.key === "ArrowDown") {
          nextIdx = currentIdx < options.length - 1 ? currentIdx + 1 : 0;
        } else {
          nextIdx = currentIdx > 0 ? currentIdx - 1 : options.length - 1;
        }
        options[nextIdx]?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        const first = rootRef.current?.querySelector<HTMLButtonElement>(
          ".lang-switch__option"
        );
        first?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        const options = rootRef.current?.querySelectorAll<HTMLButtonElement>(
          ".lang-switch__option"
        );
        options?.[options.length - 1]?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const switchLocale = (next: AppLocale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    window.dispatchEvent(new Event("metek:route-pending"));
    const hash = window.location.hash;
    const search = window.location.search;
    try {
      if (hash || search) {
        sessionStorage.setItem(SUFFIX_KEY, `${search}${hash}`);
      } else {
        sessionStorage.removeItem(SUFFIX_KEY);
      }
    } catch {
      /* private mode */
    }
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      ref={rootRef}
      className={`lang-switch${open ? " is-open" : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className="lang-switch__trigger"
        aria-label={t("language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-switch__code" aria-hidden>
          {current.code}
        </span>
        <span className="lang-switch__chevron" aria-hidden>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1.25L5 4.75L9 1.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </span>
      </button>

      <div
        id={listId}
        className="lang-switch__menu"
        role="listbox"
        aria-label={t("language")}
        hidden={!open}
      >
        {routing.locales.map((l) => {
          const meta = LOCALE_META[l];
          const selected = l === locale;
          return (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={selected}
              className={`lang-switch__option${selected ? " is-active" : ""}`}
              onClick={() => switchLocale(l)}
            >
              <span className="lang-switch__option-label">{meta.label}</span>
              <span className="lang-switch__option-code">{meta.code}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
