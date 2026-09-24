"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { loadHeroScene } from "@/lib/load-hero-scene";

/**
 * Oturum başına bir kez oynayan sessiz açılış filmi.
 * Film bittiğinde son baskı yüzeyi HeroScene'deki gerçek M geometrisinden
 * kesilir; dış yüzey iki yana, M çekirdeği yukarı ayrılarak hero'yu açar.
 */
const INTRO_IN_POINT = 5 / 24;

type FrameReadyVideo = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

function warmHomeChunks() {
  return Promise.allSettled([loadHeroScene()]);
}

export default function Intro() {
  const t = useTranslations("intro");
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const exitGridRef = useRef<HTMLDivElement>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const progressRafRef = useRef<number | null>(null);
  const videoFrameCallbackRef = useRef<number | null>(null);
  const watchdogRef = useRef<number | null>(null);
  const isExiting = useRef(false);
  const warmed = useRef(false);
  /*
    Perde kalkarken sökülecek scroll kilidi.

    Intro layout'ta duruyor ve bittiğinde `null` render ediyor — UNMOUNT
    OLMUYOR, yani effect cleanup'ı hiç çalışmıyor. Dinleyicileri cleanup'a
    bırakmak `touchmove` preventDefault'ını oturum boyunca asılı bırakıyordu:
    perde kalktıktan sonra mobilde sayfa hiç kaydırılamıyordu (ölçüldü: Pixel 7
    emülasyonu, gerçek dokunma sürüklemesi sonrası scrollY 0'da kalıyor).
    Masaüstünde fark edilmiyordu çünkü Lenis wheel'i kendi dinleyicisiyle alıp
    programatik kaydırıyor; mobilde Lenis kapalı (SmoothScroll: coarse pointer)
    ve native scroll doğrudan preventDefault yiyordu.

    Kilit bu yüzden ayrı bir kapatıcıda tutuluyor; hem completeExit hem cleanup
    aynı kapatıcıyı çağırıyor.
  */
  const releaseLockRef = useRef<(() => void) | null>(null);
  /*
    Çıkış timeline'ı GSAP ticker'ına (rAF) bağlı. Sekme arkaplandayken rAF
    donuyor, onComplete hiç gelmiyor ve completeExit çalışmıyordu — perde
    yalnızca init script'inin 12.5sn'lik CSS failsafe'iyle gizleniyor, kilit
    ise açık kalıyordu. Timeline en fazla ~1.2sn sürüyor; üstüne setTimeout
    tabanlı (rAF'tan bağımsız) sert bir tavan koyuyoruz.
  */
  const exitFailsafeRef = useRef<number | null>(null);

  const unlockScroll = useCallback(() => {
    document.documentElement.classList.remove("intro-lock");
    releaseLockRef.current?.();
    releaseLockRef.current = null;
  }, []);

  const completeExit = useCallback(() => {
    if (exitFailsafeRef.current !== null) {
      window.clearTimeout(exitFailsafeRef.current);
      exitFailsafeRef.current = null;
    }
    unlockScroll();
    document.documentElement.dataset.intro = "skip";
    window.__lenis?.start();
    setVisible(false);
    window.dispatchEvent(new Event("metek:intro-done"));

    // Perde DOM'dan çıktıktan sonra ölçüm al; intro katmanı görünürken refresh
    // etmek ScrollTrigger başlangıçlarını yanlış bir viewport'a bağlayabiliyor.
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [unlockScroll]);

  const finish = useCallback(() => {
    if (isExiting.current) return;
    isExiting.current = true;

    if (watchdogRef.current !== null) {
      window.clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
    if (progressRafRef.current !== null) {
      window.cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }

    if (pathname === "/") {
      window.dispatchEvent(new Event("metek:hero-warm"));
    }

    const video = videoRef.current;
    const frameVideo = video as FrameReadyVideo | null;
    if (videoFrameCallbackRef.current !== null) {
      frameVideo?.cancelVideoFrameCallback?.(videoFrameCallbackRef.current);
      videoFrameCallbackRef.current = null;
    }
    try {
      video?.pause();
    } catch {
      /* Medya öğesi kaldırılmışsa çıkış yine tamamlanır. */
    }

    const root = rootRef.current;
    const film = filmRef.current;
    const exitGrid = exitGridRef.current;
    const core = exitGrid?.querySelector<HTMLElement>(
      ".intro-exit-surface--core",
    );
    const shellLeft = exitGrid?.querySelector<HTMLElement>(
      ".intro-exit-shell--left",
    );
    const shellRight = exitGrid?.querySelector<HTMLElement>(
      ".intro-exit-shell--right",
    );

    if (!root || !film || !exitGrid || !core || !shellLeft || !shellRight) {
      completeExit();
      return;
    }

    // rAF donsa bile perde kalkar ve kilit açılır (bkz. exitFailsafeRef).
    exitFailsafeRef.current = window.setTimeout(completeExit, 1800);

    const mobile = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)",
    ).matches;

    exitTimelineRef.current?.kill();
    gsap.set([shellLeft, shellRight, core], {
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      scale: 1,
      autoAlpha: 1,
      willChange: "transform",
    });
    gsap.set(exitGrid, { autoAlpha: 0 });

    exitTimelineRef.current = gsap
      .timeline({ onComplete: completeExit })
      .to(
        [chromeRef.current, progressRef.current],
        { autoAlpha: 0, duration: 0.1, ease: "power2.in" },
        0,
      )
      // Oynayan kare, tamamlanmış baskı yüzeyine tek kurgu karesinde geçer.
      .set(exitGrid, { autoAlpha: 1 }, 0.04)
      .set(film, { autoAlpha: 0 }, 0.04)
      .set(root, { backgroundColor: "transparent" }, 0.05)
      // M çekirdeğini bir nefes küçültmek, hero'yu önce gerçek marka
      // siluetinin çevresinden gösteren ince bir kesim oluşturur.
      .to(
        core,
        {
          scale: mobile ? 0.975 : 0.96,
          duration: mobile ? 0.1 : 0.14,
          ease: "power2.inOut",
        },
        0.08,
      )
      // Kâğıt M, alttaki cam M'e kısa bir match-cut verir ve yukarı çıkar.
      .to(
        core,
        {
          xPercent: mobile ? 2 : 4,
          yPercent: mobile ? -103 : -108,
          rotation: mobile ? -1.5 : -3.5,
          scale: mobile ? 1.02 : 1.06,
          duration: mobile ? 0.62 : 0.78,
          ease: "expo.inOut",
        },
        mobile ? 0.2 : 0.22,
      )
      .to(
        shellLeft,
        {
          xPercent: -101,
          rotation: mobile ? -0.6 : -1.2,
          duration: mobile ? 0.7 : 0.88,
          ease: "expo.inOut",
        },
        mobile ? 0.29 : 0.31,
      )
      .to(
        shellRight,
        {
          xPercent: 101,
          rotation: mobile ? 0.6 : 1.2,
          duration: mobile ? 0.7 : 0.88,
          ease: "expo.inOut",
        },
        mobile ? 0.31 : 0.35,
      );
  }, [completeExit, pathname]);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") {
      const skipFrame = window.requestAnimationFrame(() => {
        setVisible(false);
        window.dispatchEvent(new Event("metek:intro-done"));
      });
      return () => window.cancelAnimationFrame(skipFrame);
    }

    const warmTimer =
      pathname === "/"
        ? window.setTimeout(() => void warmHomeChunks(), 900)
        : null;
    void document.fonts?.ready;

    try {
      sessionStorage.setItem("metek-intro", "1");
    } catch {
      /* Private mode. */
    }

    const html = document.documentElement;
    html.classList.add("intro-lock");
    window.__lenis?.stop();

    const preventScroll = (event: Event) => event.preventDefault();
    const scrollKeys = new Set([
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
      "Spacebar",
    ]);

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        finish();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus({ preventScroll: true });
        return;
      }

      if (scrollKeys.has(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    /* Kilidi perde kalkar kalkmaz sök — unmount'u bekleme, gelmiyor. */
    releaseLockRef.current = () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };

    /*
      WebGL ısıtma noktası cihaza göre. Masaüstünde 2sn'de hero sahnesinin
      boot'u perdenin altına rahat sığıyor. Telefonda aynı anda üç ağır iş
      çakışıyordu (perde videosu decode + WebGL context/shader derleme + hero
      filminin inmesi) ve perde gözle görülür şekilde takılıyordu. Lite'ta
      ısıtmayı filmin ikinci yarısına alıyoruz — kalan ~5sn artı çıkış
      animasyonu sahnenin hazır olmasına yetiyor, sahne kalitesi aynı.
    */
    const warmAt = window.matchMedia("(max-width: 767px), (pointer: coarse)")
      .matches
      ? 5.2
      : 2;

    let playbackFallback: number | null = null;
    let seekFallback: number | null = null;
    let playbackPrepared = false;
    let playbackStarted = false;
    const video = videoRef.current;
    const frameVideo = video as FrameReadyVideo | null;

    const renderProgress = () => {
      videoFrameCallbackRef.current = null;
      progressRafRef.current = null;
      if (isExiting.current) return;

      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        const ratio = Math.min(
          1,
          Math.max(
            0,
            (video.currentTime - INTRO_IN_POINT) /
              (video.duration - INTRO_IN_POINT),
          ),
        );
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${ratio})`;
        }

        if (video.currentTime >= warmAt && !warmed.current) {
          warmed.current = true;
          if (pathname === "/") {
            window.dispatchEvent(new Event("metek:hero-warm"));
          }
        }
      }

      // Poster yalnız ilk gerçekten decode edilmiş kare geldiğinde kalkar.
      filmRef.current?.setAttribute("data-video-ready", "true");

      if (frameVideo?.requestVideoFrameCallback) {
        videoFrameCallbackRef.current =
          frameVideo.requestVideoFrameCallback(renderProgress);
        return;
      }

      progressRafRef.current = window.requestAnimationFrame(renderProgress);
    };

    const startProgress = () => {
      if (playbackFallback !== null) {
        window.clearTimeout(playbackFallback);
        playbackFallback = null;
      }
      if (
        progressRafRef.current === null &&
        videoFrameCallbackRef.current === null &&
        !isExiting.current
      ) {
        if (frameVideo?.requestVideoFrameCallback) {
          videoFrameCallbackRef.current =
            frameVideo.requestVideoFrameCallback(renderProgress);
        } else {
          // Eski tarayıcı fallback'i compositor karesine bağlanır.
          progressRafRef.current =
            window.requestAnimationFrame(renderProgress);
        }
      }
    };

    const handlePlaybackFailure = () => {
      // Boş bir perdeyi 12 saniye tutma. Poster bir an okunur, ardından aynı
      // editöryel çıkışla sayfaya güvenli biçimde geçilir.
      if (playbackFallback === null) {
        playbackFallback = window.setTimeout(finish, 700);
      }
    };

    const beginPlayback = () => {
      if (!video || playbackStarted || isExiting.current) return;
      playbackStarted = true;
      if (seekFallback !== null) {
        window.clearTimeout(seekFallback);
        seekFallback = null;
      }
      video.removeEventListener("seeked", beginPlayback);
      /*
        Gövdeyi ANCAK arama bittikten sonra iste. `preload="auto"` baştan
        açıkken tarayıcı dosyayı 0'dan sıralı indirmeye başlıyor, hemen
        ardından gelen `currentTime = 5/24` aramasi indirmeyi iptal edip
        kaynağı 64KB ofsetinden YENİDEN indiriyordu. Ölçüldü: 1.33MB'lık webm
        için 2.53MB trafik (tam dosya + 1.25MB tekrar). Arama önce, gövde
        sonra: dosya bir kez iniyor.
      */
      video.preload = "auto";
      void video.play().then(startProgress).catch(handlePlaybackFailure);
    };

    const preparePlayback = () => {
      if (!video || playbackPrepared || isExiting.current) return;
      if (video.readyState < HTMLMediaElement.HAVE_METADATA) return;
      playbackPrepared = true;

      // Kaynağın ilk beş stop-motion karesi ile eski poster ileri/geri
      // sıçrıyordu. Yeni poster ve oynatma aynı 5/24 sn karesinde buluşur.
      video.addEventListener("seeked", beginPlayback, { once: true });
      try {
        video.currentTime = INTRO_IN_POINT;
        seekFallback = window.setTimeout(beginPlayback, 500);
      } catch {
        beginPlayback();
      }
    };

    if (video) {
      // DOM niteliği tek başına yeterli değil: her oynatmadan önce medya
      // nesnesini de sessizleştiriyoruz. Dosyaların ses izi ayrıca söküldü.
      video.defaultMuted = true;
      video.muted = true;
      video.volume = 0;
      // Önce yalnız metadata — gövde `beginPlayback`'te, aramadan SONRA istenir.
      video.preload = "metadata";
      video.addEventListener("playing", startProgress);
      video.addEventListener("error", handlePlaybackFailure);
      video.addEventListener("loadedmetadata", preparePlayback, { once: true });
      // JSX autoPlay bilerek yok: tek playback sahibi bu effect. Böylece
      // hydration sırasında play → load(reset) → play titremesi oluşmaz.
      video.load();
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        preparePlayback();
      }
    } else {
      handlePlaybackFailure();
    }

    // 10 saniyelik filmin ve çıkış animasyonunun dışında kalan sert güvenlik
    // tavanı. JS/medya kilitlense bile scroll kalıcı biçimde kapanmaz.
    watchdogRef.current = window.setTimeout(finish, 12500);
    window.requestAnimationFrame(() =>
      rootRef.current?.focus({ preventScroll: true }),
    );

    return () => {
      if (warmTimer !== null) {
        window.clearTimeout(warmTimer);
      }
      if (watchdogRef.current !== null) {
        window.clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
      if (exitFailsafeRef.current !== null) {
        window.clearTimeout(exitFailsafeRef.current);
        exitFailsafeRef.current = null;
      }
      if (playbackFallback !== null) {
        window.clearTimeout(playbackFallback);
      }
      if (seekFallback !== null) {
        window.clearTimeout(seekFallback);
      }
      if (progressRafRef.current !== null) {
        window.cancelAnimationFrame(progressRafRef.current);
        progressRafRef.current = null;
      }
      if (videoFrameCallbackRef.current !== null) {
        frameVideo?.cancelVideoFrameCallback?.(
          videoFrameCallbackRef.current,
        );
        videoFrameCallbackRef.current = null;
      }
      video?.removeEventListener("playing", startProgress);
      video?.removeEventListener("error", handlePlaybackFailure);
      video?.removeEventListener("loadedmetadata", preparePlayback);
      video?.removeEventListener("seeked", beginPlayback);
      exitTimelineRef.current?.kill();
      // Dinleyiciler unlockScroll içindeki releaseLockRef ile sökülüyor.
      unlockScroll();
      document.documentElement.dataset.intro = "skip";
      window.__lenis?.start();
    };
  }, [finish, pathname, unlockScroll]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="intro-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="metek-intro-title"
      tabIndex={-1}
    >
      <div ref={filmRef} className="intro-video-wrapper">
        <div className="intro-poster intro-film-media" aria-hidden="true" />
        <video
          ref={videoRef}
          className="intro-video intro-film-media"
          muted
          playsInline
          preload="none"
          suppressHydrationWarning
          onEnded={finish}
        >
          {/*
            webm ÖNCE. Tarayıcı oynatabildiği İLK kaynağı seçtiği için sıra
            tersken VP9 dosyası hiç kullanılmıyordu: Chrome/Android her
            ziyarette 2.03MB mp4 indiriyordu, 1.33MB webm dururken.
            Ölçüldü: 240 karede ortalama SSIM 0.9932 — gözle ayırt edilemez,
            kazanç 707KB (%35). Safari VP9/webm'i atlayıp mp4'e düşer.
          */}
          <source src="/intro/metek-intro.webm" type="video/webm" />
          <source src="/intro/metek-intro.mp4" type="video/mp4" />
        </video>
        <div className="intro-matte" aria-hidden="true" />
      </div>

      <div ref={exitGridRef} className="intro-exit-grid" aria-hidden="true">
        <div className="intro-exit-shell intro-exit-shell--left">
          <div className="intro-exit-surface intro-exit-surface--shell">
            <div className="intro-exit-frame intro-film-media" />
          </div>
        </div>
        <div className="intro-exit-shell intro-exit-shell--right">
          <div className="intro-exit-surface intro-exit-surface--shell">
            <div className="intro-exit-frame intro-film-media" />
          </div>
        </div>
        <div className="intro-exit-surface intro-exit-surface--core">
          <div className="intro-exit-frame intro-film-media" />
        </div>
      </div>

      <div ref={chromeRef} className="intro-topbar">
        <p id="metek-intro-title" className="intro-brand">
          <span>METEK DIGITAL</span>
          <span className="intro-brand__folio" aria-hidden="true">
            / FILM 01
          </span>
        </p>

        <button
          ref={skipRef}
          type="button"
          className="intro-skip-btn"
          onClick={finish}
          aria-label={t("skip")}
        >
          <svg
            className="intro-skip-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4.5 5.5 12 12l-7.5 6.5V5.5Z" />
            <path d="M11 5.5 18.5 12 11 18.5v-13Z" />
            <path d="M19.5 5.5v13" />
          </svg>
        </button>
      </div>

      <div ref={progressRef} className="intro-progress" aria-hidden="true">
        <span>00:00</span>
        <div className="intro-progress-track">
          <div
            ref={progressBarRef}
            className="intro-progress-bar"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span>00:10</span>
      </div>
    </div>
  );
}
