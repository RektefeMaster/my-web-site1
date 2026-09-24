"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { loadHeroScene } from "@/lib/load-hero-scene";

/**
 * Hero shell SSR edilir (duvar + copy); Canvas Hero içinde ssr:false.
 * Layout’ta static import yok → /blog three çekmez. Loading’de yükseklik
 * rezervi → CLS / boş flash yok.
 */
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => (
    <div
      className="relative h-[100svh] bg-background"
      aria-hidden
    />
  ),
});

/**
 * Ana sayfada idle’da WebGL chunk’ını ısıt. Diğer rotalarda prefetch YOK —
 * doğrudan /blog giren ziyaretçi 3D bedeli ödemesin. Keep-alive yalnızca
 * home ziyaretinden sonra `kept` ile devreye girer.
 */
function usePrefetchHeroScene(onHome: boolean) {
  useEffect(() => {
    if (!onHome) return;

    const ric = window.requestIdleCallback as
      | typeof window.requestIdleCallback
      | undefined;
    if (!ric) {
      const timer = window.setTimeout(() => void loadHeroScene(), 600);
      return () => window.clearTimeout(timer);
    }
    const handle = ric(() => void loadHeroScene(), { timeout: 1800 });
    return () => window.cancelIdleCallback(handle);
  }, [onHome]);
}

/**
 * Hero (WebGL) ana sayfadan çıkınca unmount olursa dönüşte 3–4sn boş kalıyordu
 * (context + font + transmission bake). İlk ziyaretten sonra DOM'da tutup
 * park ediyoruz — geri gelince anında görünür.
 *
 * Park’ta fixed + flow’dan çıkarma, soft-nav sırasında ~100vh layout kayması
 * yaratıyordu. Park’ta da aynı kutuyu akışta tutuyoruz (height:0 + overflow),
 * canvas’ı absolute ile park ediyoruz — document height aniden zıplamaz.
 */
export default function HomeHeroKeepAlive() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [kept, setKept] = useState(onHome);

  usePrefetchHeroScene(onHome);

  // Props’tan türetilen sticky state — effect içinde setState yok
  if (onHome && !kept) {
    setKept(true);
  }

  if (!kept) return null;

  return (
    <div
      id="home-hero-keepalive"
      data-parked={onHome ? undefined : "true"}
      aria-hidden={!onHome}
      // Park’ta Tab odağı / hayalet tıklama — aria-hidden yetmez
      inert={!onHome ? true : undefined}
      className={
        onHome
          ? "relative min-h-[100svh]"
          : "relative h-0 max-h-0 overflow-hidden opacity-0 pointer-events-none"
      }
    >
      <div
        className={
          onHome
            ? "relative"
            : "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh] overflow-hidden opacity-0"
        }
      >
        <Hero parked={!onHome} />
      </div>
    </div>
  );
}
