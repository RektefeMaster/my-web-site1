"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import DecryptedText from "./DecryptedText";
import TextType from "./TextType";

type CapId = "experiences" | "systems" | "ai";

const CAP_IDS: CapId[] = ["experiences", "systems", "ai"];

const CAP_HREF: Record<
  CapId,
  "/services/web-design" | "/services/software" | "/services/automation"
> = {
  experiences: "/services/web-design",
  systems: "/services/software",
  ai: "/services/automation",
};

const CAP_VISUAL: Record<
  CapId,
  {
    hero: string;
    objectPosition: string;
    media: string;
    copy: string;
    /** Metin kartı görselin üstüne biniyorsa künye şeridini kısalt */
    captionWidth?: string;
    caseName?: string;
    caseUrl?: string;
  }
> = {
  experiences: {
    hero: "/projects/casa-aurelia/desktop.jpg",
    objectPosition: "50% 0%",
    media: "md:col-span-7 md:col-start-1",
    copy: "md:col-span-4 md:col-start-9 md:self-end md:pb-10",
    caseName: "Casa Aurelia Roma",
    caseUrl: "https://casa-aurelia-jet.vercel.app/",
  },
  systems: {
    hero: "/projects/crm/desktop.jpg",
    objectPosition: "8% 0%",
    media: "md:col-span-6 md:col-start-7 md:order-2",
    copy: "md:col-span-5 md:col-start-1 md:order-1 md:self-center",
  },
  /*
    Bu blok bilerek ÇAKIŞIYOR: geniş görselin sağ ucunun üstüne opak metin
    kartı biniyor. `md:row-start-1` İKİSİNDE DE ŞART — kolon 8–9 ortak
    olduğu için otomatik yerleşim çakışmaya izin vermiyor ve metni ikinci
    satıra atıyordu. O zaman görselin satırı kendi içeriğine düşüyor,
    `md:flex-1` dolduracak yükseklik bulamıyor ve resim `height: 0` oluyordu:
    kadrajın sol üçte ikisi bomboş kalıyordu (1440px'te ölçüldü, ekran
    görüntüsüyle yakalandı). Satır açıkça verilince ikisi aynı satırda
    üst üste biniyor, görsel `self-stretch` ile bloğun tam boyunu dolduruyor.
    Aynı sebeple `-mt-20` kaldırıldı: iki satırlı yığılmayı telafi etmek
    içindi, tek satırda kartı görselin tepesinden yukarı taşıyor.
  */
  ai: {
    hero: "/projects/aiahi/desktop.jpg",
    /*
      Sola hizalı: kutu 845×695 (1.22), kaynak 1.6 — `object-cover` 267px
      kırpıyor. Ortadan kırpınca ekran görüntüsünün sol içeriği ("Ahi AI",
      başlık) kesiliyordu; sağ ucu zaten metin kartı örttüğü için kırpma
      payını sağdan almak kadrajı kurtarıyor.
    */
    objectPosition: "0% 14%",
    media: "md:col-span-8 md:col-start-2 md:row-start-1",
    copy: "md:col-span-5 md:col-start-8 md:row-start-1 md:self-center md:bg-background md:p-8 md:relative md:z-10",
    /*
      Künye şeridi görselin 8 kolonunu kaplıyor ama opak metin kartı son
      2 kolonun üstüne biniyor; "Ahi AI ↗" bağlantısı kartın ALTINDA kalıp
      tıklanamaz oluyordu (elementFromPoint ile doğrulandı). 6/8 = 3/4.
    */
    captionWidth: "md:w-3/4",
    caseName: "Ahi AI",
    caseUrl: "https://www.aiahi.net/",
  },
};

/** Üç üretim alanı: sekmeli panel yerine üç farklı editöryal dosya. */
export default function Capabilities() {
  const t = useTranslations("capabilities");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isTouch = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
        const shots = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-capability-shot]")
        );
        shots.forEach((shot) => {
          gsap.fromTo(
            shot,
            { yPercent: -4, scale: 1.045 },
            {
              yPercent: 4,
              scale: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: shot.parentElement ?? shot,
                start: "top bottom",
                end: "bottom top",
                scrub: isTouch ? 0.4 : 0.7,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="cv-auto scroll-mt-[var(--nav-offset)] bg-background px-5 py-14 text-foreground md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-x-5 border-t border-foreground/20 pt-6 md:gap-x-6 md:pt-8">
          <div className="col-span-12 md:col-span-8">
            <WordReveal
              text={t("title")}
              className="font-display type-display text-[clamp(1.15rem,6.5vw,7rem)] sm:text-[clamp(3rem,8vw,7rem)] leading-[1.4] tracking-[-0.05em]"
            />
          </div>
          <Reveal delay={70} className="col-span-10 col-start-3 mt-8 md:col-span-3 md:col-start-10 md:mt-1">
            <p className="text-[15px] leading-[1.7] text-foreground/62">
              {t("blurb")}
            </p>
            <div className="mt-4 flex min-h-[2.85rem] items-center gap-1.5 font-mono text-[11px] font-bold text-accent sm:min-h-[1.5rem]">
              <span>›</span>
              <TextType
                text={[
                  "Next.js 16 & React Three Fiber",
                  "Headless Mimari & Yüksek Performans",
                  "Özel CRM & İşletim Panelleri",
                  "WhatsApp & AI Entegrasyonları",
                ]}
                typingSpeed={40}
                deletingSpeed={20}
                pauseDuration={2400}
                showCursor={true}
                cursorCharacter="▍"
                startOnVisible={true}
                loop={true}
              />
            </div>
            <p className="mt-4 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.15em] text-foreground/62">
              <DecryptedText text={t("techLine")} animateOn="inViewHover" />
            </p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {CAP_IDS.map((id, index) => {
            const visual = CAP_VISUAL[id];
            const outcomes = t.raw(`items.${id}.outcomes`) as string[];
            return (
              <article
                key={id}
                className="grid grid-cols-12 items-start gap-x-5 gap-y-8 md:gap-x-6"
              >
                <Reveal
                  mode="mask"
                  className={`col-span-12 md:flex md:flex-col md:self-stretch ${visual.media}`}
                >
                  <div
                    className={`relative overflow-hidden bg-stone md:min-h-0 md:flex-1 ${
                      index === 1
                        ? "aspect-[5/4] md:aspect-auto"
                        : "aspect-[16/11] md:aspect-auto"
                    }`}
                  >
                    <Image
                      src={visual.hero}
                      alt={t(`items.${id}.visual`)}
                      fill
                      sizes={
                        index === 1
                          ? "(max-width: 767px) calc(100vw - 40px), 50vw"
                          : "(max-width: 767px) calc(100vw - 40px), 66vw"
                      }
                      quality={82}
                      loading="lazy"
                      decoding="async"
                      data-capability-shot
                      className="scale-[1.045] object-cover object-top"
                      style={{ objectPosition: visual.objectPosition }}
                    />
                  </div>
                  {visual.caseUrl && (
                    <div
                      className={`mt-4 flex shrink-0 items-center justify-between gap-4 border-t border-foreground/15 pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/62 ${visual.captionWidth ?? ""}`}
                    >
                      <span>{t("liveLabel")}</span>
                      <a
                        href={visual.caseUrl}
                        target="_blank"
                        rel="noreferrer"
                        /* py/-my çifti: hedef 24px'e çıkar, düzen kaymaz
                           (WCAG 2.2 AA 2.5.8) */
                        className="-my-1.5 inline-flex min-h-6 items-center gap-1.5 py-1.5 text-foreground/62 transition-colors hover:text-accent-ink"
                      >
                        {visual.caseName}
                        <span aria-hidden>↗</span>
                      </a>
                    </div>
                  )}
                </Reveal>

                <Reveal delay={70} className={`col-span-12 ${visual.copy}`}>
                  <div className="border-t border-foreground/20 pt-5">
                    <div className="flex items-baseline justify-between gap-5">
                      <DecryptedText
                        text={String(index + 1).padStart(2, "0")}
                        animateOn="inViewHover"
                        className="font-mono text-[10px] font-bold tracking-[0.16em] text-foreground/62"
                      />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-foreground/62">
                        <DecryptedText
                          text={t(`items.${id}.visual`)}
                          animateOn="inViewHover"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-[clamp(2rem,4.2vw,4rem)] font-bold leading-[0.94] tracking-[-0.045em]">
                      <Link
                        href={CAP_HREF[id]}
                        scroll={false}
                        className="transition-colors hover:text-accent-ink"
                      >
                        {t(`items.${id}.title`)}
                      </Link>
                    </h3>
                    <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-foreground/62">
                      {t(`items.${id}.body`)}
                    </p>
                    <p className="mt-5 max-w-[40ch] font-subtitle text-base leading-relaxed text-foreground/74">
                      {t(`items.${id}.detail`)}
                    </p>
                    <ul className="mt-8 border-t border-foreground/15">
                      {outcomes.map((item) => (
                        <li
                          key={item}
                          className="grid grid-cols-[1.25rem_1fr] gap-3 border-b border-foreground/15 py-3.5 text-sm text-foreground/62"
                        >
                          <span aria-hidden>—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16 flex justify-end border-t border-foreground/20 pt-6 md:mt-20">
            <Link
              href="/services"
              scroll={false}
              className="group inline-flex min-h-11 items-center gap-5 text-sm font-bold"
            >
              <DecryptedText text={t("cta")} animateOn="hover" />
              <span
                aria-hidden
                className="inline-flex size-10 items-center justify-center border border-foreground/30 transition-[background-color,color] group-hover:bg-foreground group-hover:text-background"
              >
                ↗
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
