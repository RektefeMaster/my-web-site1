"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations, useLocale } from "next-intl";
import HeroFilm from "./HeroFilm";
import { gsap, useGSAP } from "@/lib/gsap";
import { loadHeroScene } from "@/lib/load-hero-scene";

/** Prefetch tetikleri için re-export — HomeHeroKeepAlive / Intro. */
export { loadHeroScene };

/* Yükleme yer tutucusu yok: arkada film zaten duruyor, opak bir gradient
   basmak kadrajı sahne hazır olana kadar gizliyordu. */
const HeroScene = dynamic(loadHeroScene, { ssr: false });

function getIntroSkip() {
  return document.documentElement.dataset.intro !== "play";
}

function subscribeIntroSkip(onStoreChange: () => void) {
  const root = document.documentElement;
  const obs = new MutationObserver(onStoreChange);
  obs.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
  return () => obs.disconnect();
}

/*
  WebGL sahnesi ekrana geldi mi. Dış kaynak (HeroScene'in olayı) olduğu
  için effect + setState değil useSyncExternalStore: sahne Hero'dan önce
  hazır olabiliyor, o durumda ilk okuma zaten true dönüyor.
*/
function getSceneReady() {
  return Boolean(window.__metekHeroReady);
}

function subscribeSceneReady(onStoreChange: () => void) {
  window.addEventListener("metek:hero-ready", onStoreChange);
  return () => window.removeEventListener("metek:hero-ready", onStoreChange);
}

export default function Hero({ parked = false }: { parked?: boolean }) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const sceneActive = !parked && inView;
  const mountedAt = useRef(0);
  const introSkip = useSyncExternalStore(
    subscribeIntroSkip,
    getIntroSkip,
    () => false
  );
  const [warmMount, setWarmMount] = useState(false);
  /** Sahne hazır → DOM kelime markası söner, marka camın içinden okunur */
  const sceneReady = useSyncExternalStore(
    subscribeSceneReady,
    getSceneReady,
    () => false
  );
  /*
    Sahne artık `introSkip` ile ANINDA mount olmuyor. WebGL context kurulumu +
    transmission FBO bake'i ilk boyamayla aynı karelere denk geliyordu; arkada
    HeroWall hazır durduğu için beklemenin görsel maliyeti yok. Perde
    oynuyorsa eskisi gibi "metek:hero-warm" ile, oynamıyorsa idle'da mount.
  */
  const sceneMounted = warmMount;

  useEffect(() => {
    if (warmMount || parked) return;
    const mount = () => setWarmMount(true);
    window.addEventListener("metek:hero-warm", mount);

    // Perde atlandıysa (tekrar ziyaret) idle'ı bekle
    const ric = window.requestIdleCallback as
      | typeof window.requestIdleCallback
      | undefined;
    let handle = 0;
    let timer = 0;
    if (introSkip) {
      if (ric) handle = ric(mount, { timeout: 2000 });
      else timer = window.setTimeout(mount, 700);
    } else {
      timer = window.setTimeout(mount, 3200); // failsafe
    }

    return () => {
      window.removeEventListener("metek:hero-warm", mount);
      if (handle) window.cancelIdleCallback(handle);
      if (timer) window.clearTimeout(timer);
    };
  }, [introSkip, warmMount, parked]);

  useEffect(() => {
    if (parked) return;

    const resume = requestAnimationFrame(() => {
      mountedAt.current = performance.now();
      setInView(true);
    });

    const el = sectionRef.current;
    if (!el) {
      return () => cancelAnimationFrame(resume);
    }

    // Mobil: sahne görüş dışına çıkınca hemen uyu (GPU). Desktop: soft-nav payı.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const age = performance.now() - mountedAt.current;
        if (!entry.isIntersecting && age < 900) {
          setInView(true);
          return;
        }
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: coarse ? "0px 0px -10% 0px" : "25% 0px",
        threshold: 0.01,
      }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(resume);
      io.disconnect();
    };
  }, [parked]);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const nodes = root.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(nodes, {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const softReturn =
          document.documentElement.dataset.intro === "skip";
        const alreadyShown = [...nodes].some(
          (n) => Number.parseFloat(getComputedStyle(n).opacity) > 0.9
        );
        if (softReturn || alreadyShown) {
          gsap.set(nodes, { clearProps: "opacity,transform", opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          nodes,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
            delay: 0.35,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              gsap.set(nodes, { clearProps: "opacity,transform" });
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [locale] }
  );

  const brand = t("line1");
  const splitAt = brand.indexOf(" ");
  const brandLead = splitAt > 0 ? brand.slice(0, splitAt) : brand;
  const brandTail = splitAt > 0 ? brand.slice(splitAt + 1) : "";

  return (
    <section
      ref={sectionRef}
      id={parked ? undefined : "home"}
      className="hero-section relative flex h-[100svh] min-h-[560px] flex-col overflow-x-clip overflow-y-hidden"
    >
      {/*
        Zemin: humanoid + çiçek tarlası filmi, tam ekran. Cam "M" bunun
        ÜSTÜNDE — canvas metnin de üstünde (z-[3]), böylece kelime markası
        YALNIZCA camın içinden kırılarak görünüyor. Canvas şeffaf
        (alpha:true + clearAlpha 0, scene.background yok). Film görüş
        dışına çıkınca `active` ile duruyor.
      */}
      <HeroFilm ready={sceneMounted} active={sceneActive} />

      {sceneMounted ? <HeroScene active={sceneActive} /> : null}

      <div
        aria-hidden
        data-atmosphere-idle={!sceneActive}
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        {/* Cam M'nin arkasındaki ay ışığı — siyah gökte cam kendi başına
            neredeyse görünmez; bu hale hem markayı ayırıyor hem de filmin
            içindeki tek ışık kaynağıyla (tarla) aynı dili konuşuyor. */}
        <div className="hero-halo" />
        <div className="hero-vignette" />
        <div className="hero-grain" />
      </div>

      {/*
        Jenerik kilidi. Kelime markası ekranda ÇIPLAK GÖZLE GÖRÜNMÜYOR:
        sahne hazır olunca DOM kopyası sönüyor ve marka yalnızca cam M'in
        içinden, kırılmış hâliyle okunuyor (kopyası HeroScene'de kırılma
        arkaplanına çiziliyor). <h1> yine de DOM'da kalıyor — başlık
        hiyerarşisi ve arama için; WebGL yoksa görünür kalıp marka
        kaybolmuyor.

        Konum yüzdeyle veriliyor (--hero-word-y) çünkü kadrajın kendisi de
        yüzdeyle kırpılıyor — px verilirse ultrawide'da marka figürün
        başına biniyor.
      */}
      <div
        ref={copyRef}
        data-scene-ready={sceneReady || undefined}
        className="hero-lockup pointer-events-none absolute inset-x-0 z-[2] flex justify-center px-5"
      >
        <h1 data-hero-fade className="hero-wordmark font-display">
          {/* Kelime markası iki basamak: METEK sol üstte, Digital sağ altta.
              Bölme boşluktan — marka dört locale'de de "METEK Digital",
              boşluk yoksa tek satıra düşüyor. */}
          <span className="hero-wordmark__lead">{brandLead}</span>
          {/* Boşluk metinde ŞART: iki span bitişik yazılınca <h1>'in metni
              "METEKDigital" oluyordu (ekran okuyucu ve arama motoru onu
              okuyor). `.hero-wordmark` flex container olduğu için sadece
              boşluktan oluşan bu düğüm kutu üretmiyor — görsel etkisi yok. */}
          {brandTail ? " " : null}
          {brandTail ? (
            <span className="hero-wordmark__tail">{brandTail}</span>
          ) : null}
          {/* Görünür metin yalnızca marka; tanım satırı ekran okuyucu ve
              arama için duruyor (metadata/OG ile aynı cümle). */}
          <span className="sr-only">
            {" "}
            — {t("line2")} {t("line3")}
          </span>
        </h1>
      </div>

      <div
        aria-hidden
        data-hero-fade
        className="hero-scroll pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex justify-center"
      >
        <span className="hero-scroll__line" />
      </div>

    </section>
  );
}
