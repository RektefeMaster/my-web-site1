"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_FILM } from "@/lib/hero-media";

/**
 * Hero zemini — çiçek tarlasında duran humanoid, mutlak siyah gökyüzü.
 *
 * Kadraj kararı: kaynağın üst ~%26'sı GERÇEK siyah (ölçüldü: ilk 120 satır
 * max RGB 4/5, ortalama 0.43). Bu yüzden master'lar üstten saf siyahla
 * uzatıldı — dikiş görünmüyor (sınırda 0 → max 2) ama marka kilidine
 * (cam M + kelime markası) figürün üstünde gerçek bir gökyüzü açılıyor.
 * Uzatma olmadan nav ile figürün başı arasında ~130px kalıyordu.
 *
 * Yön başına ayrı master:
 * - yatay 1920×1500 (üstten 432px siyah dolgu, ~2.7MB)
 * - dikey 1080×1920 (kaynak 1100px'e kırpılıp üstten 868px dolgu, ~1.5MB)
 * Seçim `matchMedia("(orientation: portrait)")`; cihaz dönerse master değişir.
 *
 * Kalite/ağırlık dengesi: crf 26/27. Daha agresif sıkıştırma (crf 31) çiçek
 * dokusunu eziyordu ve gözle görülüyordu. Master kritik yolda olmadığı için
 * (boot kapısından sonra iniyor) bu ağırlık LCP'ye değil yalnızca bant
 * genişliğine yazılıyor. CSS'te de yeniden örnekleme YOK — bkz. craft.css.
 *
 * Döngü: kaynak 12.04sn ve başladığı yere dönmüyor (ilk/son kare RMSE 0.022).
 * Son 0.6sn ilk 0.6sn üstüne `xfade` ile bindirildi → 11.46sn, dikişsiz.
 * Yeni klip gelirse aynı işlemi uygula.
 *
 * Perf sözleşmesi hero'nun geri kalanıyla aynı:
 * - `ready` false iken sadece poster duruyor (`preload="none"`, src YOK) —
 *   kritik yolda tek byte video inmiyor. `ready`, Hero'daki boot kapısı
 *   (metek:hero-warm / idle) ile geliyor.
 * - `active` false olunca (hero görüş dışı / park) video duruyor.
 * - Poster `<picture>` ile geliyor: media seçimi tarayıcıda, ilk boyamada
 *   doğru yön. Video ancak `playing` olunca üstüne açılıyor (pop yok).
 * - reduced-motion: video hiç bağlanmıyor, poster kare olarak kalıyor.
 */

const {
  videoLandscape: SRC_LANDSCAPE,
  videoPortrait: SRC_PORTRAIT,
  posterLandscape: POSTER_LANDSCAPE,
  posterPortrait: POSTER_PORTRAIT,
} = HERO_FILM;

export default function HeroFilm({
  ready = false,
  active = true,
}: {
  ready?: boolean;
  active?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const portrait = window.matchMedia("(orientation: portrait)");
    const attach = () =>
      setSrc(portrait.matches ? SRC_PORTRAIT : SRC_LANDSCAPE);

    const ric = window.requestIdleCallback as
      | typeof window.requestIdleCallback
      | undefined;
    let handle = 0;
    let timer = 0;
    if (src) {
      // Cihaz döndü: kadraj artık yanlış master'dan geliyor, yenisine geç
      portrait.addEventListener("change", attach);
    } else if (ric) {
      handle = ric(attach, { timeout: 1800 });
    } else {
      timer = window.setTimeout(attach, 600);
    }

    return () => {
      portrait.removeEventListener("change", attach);
      if (handle) window.cancelIdleCallback(handle);
      if (timer) window.clearTimeout(timer);
    };
  }, [ready, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    if (active) void video.play().catch(() => {});
    else video.pause();
  }, [active, src]);

  return (
    <div aria-hidden className="hero-film absolute inset-0 overflow-hidden">
      <picture>
        <source media="(orientation: portrait)" srcSet={POSTER_PORTRAIT} />
        {/* Hero'nun ilk görseli bu poster (46KB webp) — LCP elemanı odur,
            bu yüzden eager + yüksek öncelik. Video sonra üstüne açılıyor. */}
        <img
          src={POSTER_LANDSCAPE}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="hero-film__media"
        />
      </picture>

      <video
        ref={videoRef}
        className="hero-film__media hero-film__video"
        data-playing={playing || undefined}
        {...(src ? { src } : {})}
        preload="none"
        muted
        loop
        playsInline
        autoPlay
        disableRemotePlayback
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
      />

      <div className="hero-film__veil" />
    </div>
  );
}
