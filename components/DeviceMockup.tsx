"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { cardImageSizes } from "@/lib/editorial-layout";
import { LiveProjectScreen } from "./LiveProjectScreen";
import { ProjectScreen } from "./ProjectScreen";

export { ProjectScreen } from "./ProjectScreen";

/**
 * Official Apple Product Bezel frames (transparent screen cutouts).
 * Fractions measured from the PNG alpha hole.
 */
const IPHONE = {
  frameSrc: "/devices/iphone-16-pro/natural-titanium.png",
  maskSrc: "/devices/iphone-16-pro/display.svg",
  frameW: 900,
  frameH: 1956,
  screen: {
    left: 0.10111,
    top: 0.10072,
    width: 0.79889,
    height: 0.79908,
    radius: "12.2%",
  },
} as const;

const MACBOOK = {
  frameSrc: "/devices/macbook-pro-16/silver.png",
  frameW: 2400,
  frameH: 1551,
  screen: {
    left: 0.16697,
    top: 0.16751,
    width: 0.66626,
    height: 0.6653,
    radius: "1.1%",
  },
} as const;

/*
  Kart içi görsellerin KART genişliğine oranı. Bunlar `sizes` hesabına girer;
  yanlışsa Next küçük varyantı seçip görseli upscale eder (ölçüldü: 12 kolonluk
  kartta 1075px kutuya 384px varyant → gözle görülür bulanıklık).

  MacBook çerçevesi kartın %84'ü (className `w-[84%]`), ekran da çerçevenin
  MACBOOK.screen.width kadarı — ikisi çarpılır.
*/
const MACBOOK_FRAME_FRAC = 0.84;
const MACBOOK_SCREEN_FRAC = MACBOOK_FRAME_FRAC * MACBOOK.screen.width;

/*
  iPhone md+'da `max-w-[140px]` ile sabitlenir (çerçeve PNG'si şeffaf kenar
  payı yüzünden kutudan ~%15 taşar → ~161px). Mobilde tek kolonlu karta göre
  ölçeklenir. cols'a bağlı olmadığı için sabit string.
*/
const IPHONE_FRAME_SIZES =
  "(min-width: 768px) 170px, calc((100vw - 40px) * 0.40)";
const IPHONE_SCREEN_SIZES =
  "(min-width: 768px) 140px, calc((100vw - 40px) * 0.32)";


function DeviceFrame({
  frameSrc,
  frameW,
  frameH,
  screen,
  maskSrc,
  children,
  className,
  style,
  priority = false,
  sizes,
  quality = 75,
}: {
  frameSrc: string;
  frameW: number;
  frameH: number;
  screen: {
    left: number;
    top: number;
    width: number;
    height: number;
    radius: string;
  };
  maskSrc?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes: string;
  quality?: number;
}) {
  return (
    <div
      className={className}
      style={{
        aspectRatio: `${frameW} / ${frameH}`,
        ...style,
      }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: `${screen.left * 100}%`,
            top: `${screen.top * 100}%`,
            width: `${screen.width * 100}%`,
            height: `${screen.height * 100}%`,
            borderRadius: maskSrc ? undefined : screen.radius,
            ...(maskSrc
              ? {
                  WebkitMaskImage: `url(${maskSrc})`,
                  maskImage: `url(${maskSrc})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }
              : null),
          }}
        >
          {children}
        </div>

        <Image
          src={frameSrc}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="pointer-events-none z-10 select-none object-contain"
          aria-hidden
        />
      </div>
    </div>
  );
}

/**
 * Telefon — ÇERÇEVELİ, tek başına.
 *
 * WorkPlate bunu kullanıyor: masaüstü ekranı artık laptop kasası içinde değil,
 * tam kanama bir levha; derinliği ve "gerçek cihaz" okumasını levhanın
 * kenarından taşan bu telefon veriyor. Laptop kasası kaldırıldığı için
 * (DESIGN.md: "Device chrome when the project image itself can carry the
 * composition" yapma listesinde) tek cihaz çerçevesi burada kalıyor.
 */
export function PhoneMockup({
  project,
  className,
  sizes = IPHONE_FRAME_SIZES,
  screenSizes = IPHONE_SCREEN_SIZES,
  scroll = true,
  eagerStrip = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  screenSizes?: string;
  scroll?: boolean;
  eagerStrip?: boolean;
}) {
  const t = useTranslations("a11y");

  return (
    <DeviceFrame
      {...IPHONE}
      priority={false}
      quality={78}
      sizes={sizes}
      className={className}
    >
      <ProjectScreen
        src={project.mobileImage}
        scrollSrc={project.mobileScrollImage}
        alt={t("deviceMobile", { name: project.name })}
        colors={project.colors}
        label={project.name.split(" ")[0] ?? project.name}
        priority={false}
        scroll={scroll && Boolean(project.mobileScrollImage)}
        quality={78}
        sizes={screenSizes}
        eagerStrip={eagerStrip}
      />
    </DeviceFrame>
  );
}

/** Selected Work / Capabilities — Apple PNG peep kaldırıldı; LightPhone kullan */
type DeviceMockupProps = {
  project: Project;
  variant?: "card" | "hero";
  priority?: boolean;
  /** Kartın editorial grid'te kapladığı kolon (4|5|7|8|12) — sizes hesabı */
  cardCols?: number;
  /** true: iframe (varsayılan kapalı — scroll şeritleri ana sayfayı gösterir) */
  preferLive?: boolean;
};

function DeviceScreenContent({
  project,
  variant,
  priority,
  scroll,
  quality,
  sizes,
  alt,
  label,
  preferLive,
  eagerStrip = false,
}: {
  project: Project;
  variant: "desktop" | "mobile";
  priority: boolean;
  scroll: boolean;
  quality: number;
  sizes: string;
  alt: string;
  label: string;
  preferLive: boolean;
  eagerStrip?: boolean;
}) {
  const isDesktop = variant === "desktop";
  const src = isDesktop ? project.desktopImage : project.mobileImage;
  const scrollSrc = isDesktop
    ? project.desktopScrollImage
    : project.mobileScrollImage;

  if (preferLive && project.url) {
    return (
      <LiveProjectScreen
        url={project.url}
        variant={variant}
        alt={alt}
        colors={project.colors}
        label={label}
        fallbackSrc={src}
        fallbackScrollSrc={scrollSrc}
        priority={priority}
        scroll={scroll}
        quality={quality}
        sizes={sizes}
      />
    );
  }

  return (
    <ProjectScreen
      src={src}
      scrollSrc={scrollSrc}
      alt={alt}
      colors={project.colors}
      label={label}
      priority={priority}
      scroll={scroll && Boolean(scrollSrc)}
      quality={quality}
      sizes={sizes}
      eagerStrip={eagerStrip}
    />
  );
}

export default function DeviceMockup({
  project,
  variant = "card",
  priority = false,
  cardCols = 5,
  preferLive = false,
}: DeviceMockupProps) {
  const t = useTranslations("a11y");
  const isHero = variant === "hero";
  const canScroll = Boolean(
    project.desktopScrollImage || project.mobileScrollImage,
  );
  const screenQ = isHero ? 85 : 75;
  const frameQ = isHero ? 85 : 75;

  return (
    <div
      data-mock-root
      className={`group/mock relative h-full w-full ${canScroll ? "device-mockup--scrollable" : ""}`}
    >
      {/* MacBook — LCP adayı yalnızca hero desktop screen */}
      <DeviceFrame
        {...MACBOOK}
        priority={false}
        quality={frameQ}
        sizes={
          isHero
            ? "(max-width: 768px) 92vw, 920px"
            : cardImageSizes(cardCols, MACBOOK_FRAME_FRAC)
        }
        className={
          isHero
            ? "device-mockup__laptop absolute left-[3%] top-[5%] w-[78%] drop-shadow-[0_28px_56px_rgba(0,0,0,0.28)] md:left-[5%] md:top-[7%] md:w-[74%]"
            : "device-mockup__laptop absolute left-[1%] top-[4%] w-[84%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.22)]"
        }
      >
        <DeviceScreenContent
          project={project}
          variant="desktop"
          alt={t("deviceDesktop", { name: project.name })}
          label={project.name}
          priority={priority}
          scroll={Boolean(project.desktopScrollImage)}
          quality={screenQ}
          preferLive={preferLive}
          eagerStrip={isHero && priority}
          sizes={
            isHero
              ? "(max-width: 768px) 82vw, 740px"
              : cardImageSizes(cardCols, MACBOOK_SCREEN_FRAC)
          }
        />
      </DeviceFrame>

      {/*
        iPhone — kartta asla priority (eski bug: !isHero → 14 eager preload).
        Hero’da da peep LCP değil → lazy.
      */}
      <DeviceFrame
        {...IPHONE}
        priority={false}
        quality={frameQ}
        sizes={isHero ? "(max-width: 768px) 34vw, 250px" : IPHONE_FRAME_SIZES}
        className={
          isHero
            ? "device-mockup__phone absolute bottom-[2%] right-[2%] z-20 w-[28%] max-w-[220px] origin-bottom -rotate-[4deg] drop-shadow-[0_22px_40px_rgba(0,0,0,0.38)] md:right-[4%] md:bottom-[3%] md:w-[23%] md:max-w-[240px]"
            : "device-mockup__phone absolute bottom-[1%] right-[1%] z-20 w-[34%] max-w-[152px] origin-bottom -rotate-[4deg] drop-shadow-[0_16px_28px_rgba(0,0,0,0.34)] sm:w-[28%] sm:max-w-[140px]"
        }
      >
        {/*
          Telefon da kaydırıyor. `mobileScrollImage` 11 projede DOLUYDU ama
          hiçbir yerde render edilmiyordu — şeritler deploy'a gidip hiç
          gösterilmiyordu. Artık laptop ile birlikte akıyor: "canlı site"
          okuması asıl buradan geliyor, çünkü mobil şerit sayfanın tamamını
          gösteriyor.

          Perf sözleşmesi değişmedi: şerit yalnızca `pointerenter` ile iner
          (ProjectScreen içindeki kapı); dokunmatik pointer şeridi yüklemez.
          Süre her şeridin kendi doğal yüksekliğinden hesaplandığı için
          laptop ile telefon aynı anda değil, hafif kaymayla ilerliyor.
        */}
        <DeviceScreenContent
          project={project}
          variant="mobile"
          alt={t("deviceMobile", { name: project.name })}
          label={project.name.split(" ")[0] ?? project.name}
          priority={false}
          scroll={Boolean(project.mobileScrollImage)}
          quality={screenQ}
          preferLive={preferLive}
          eagerStrip={isHero && priority}
          sizes={
            isHero ? "(max-width: 768px) 42vw, 280px" : IPHONE_SCREEN_SIZES
          }
        />
      </DeviceFrame>
    </div>
  );
}
