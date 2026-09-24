"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/site";

/**
 * Mobil sabit WhatsApp — yalnızca aktif ana sayfa hero + #contact
 * görünürken gizlenir. Park edilmiş keep-alive hero IO’ya girmez.
 */
export default function WhatsAppFab() {
  const t = useTranslations("whatsapp");
  const pathname = usePathname();
  const href = whatsappHref(t("prefill"));
  const onHome = pathname === "/";
  /*
   * Ana sayfada IO settle olana kadar gizli başla — aksi halde ilk boyamada
   * hero CTA'ların üstüne binen FAB flaşı (opacity:1 → 0) oluşuyor.
   */
  const [hidden, setHidden] = useState(onHome);
  const [prevOnHome, setPrevOnHome] = useState(onHome);

  if (onHome !== prevOnHome) {
    setPrevOnHome(onHome);
    if (onHome) setHidden(true);
  }

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { root: null, threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    const bind = () => {
      io.disconnect();
      visible.clear();
      const homeEl = onHome
        ? (document.querySelector(
            "#home-hero-keepalive:not([data-parked]) #home, section#home"
          ) as HTMLElement | null)
        : null;
      const contactEl = document.getElementById("contact");
      const targets = [homeEl, contactEl].filter(Boolean) as HTMLElement[];
      /*
        Hero dynamic chunk gecikmesinde #home henüz yok. Eskiden hedef yok
        → FAB gösteriliyordu ve hero CTA’nın üstüne biniyordu. Home’da
        hero gelene kadar gizli kal; diğer rotalarda hedef yoksa göster.
      */
      if (targets.length === 0) {
        setHidden(onHome);
        return;
      }
      setHidden(Boolean(homeEl));
      for (const el of targets) io.observe(el);
    };

    bind();
    const keepalive = document.getElementById("home-hero-keepalive");
    const mo =
      onHome && keepalive
        ? new MutationObserver(() => bind())
        : null;
    mo?.observe(keepalive!, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo?.disconnect();
    };
  }, [onHome]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      inert={hidden ? true : undefined}
      /*
        Beyaz metin #25D366 üstünde 1.98:1 — WCAG AA 4.5 istiyor, ikon için
        de 3:1 sınırının altında. Marka yeşili korunur, yazı/ikon koyuya
        çekilir (9.7:1). Sitenin `--on-accent` mantığıyla da aynı: parlak
        aksan + koyu metin.
      */
      className={`wa-fab btn-stable fixed z-[90] inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3 text-[13px] font-bold text-[#0b2e1a] shadow-[0_12px_32px_-8px_rgba(37,211,102,0.65)] transition-all duration-300 md:hidden ${
        hidden
          ? "pointer-events-none translate-y-3 opacity-0"
          : "opacity-100"
      }`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>{t("fab")}</span>
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
