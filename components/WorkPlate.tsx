"use client";

import type { Project } from "@/data/projects";
import { ProjectScreen, PhoneMockup } from "./DeviceMockup";
import { cardImageSizes } from "@/lib/editorial-layout";

/**
 * Bir işin görsel gövdesi — "levha".
 *
 * NEDEN LAPTOP KASASI YOK: eskiden her iş, açık gri bir kutu içinde yüzen
 * küçük bir MacBook + telefondu. Kutunun kendisi boştu, cihaz kutunun ~%60'ını
 * kaplıyordu; sonuç düz, cansız bir kare ve iki yanında ölü alan. DESIGN.md
 * zaten "proje görseli kompozisyonu taşıyabiliyorsa cihaz kasası kullanma"
 * diyor. Artık masaüstü ekranı LEVHANIN KENDİSİ: tam kanama, kadrajı dolduran
 * gerçek sayfa.
 *
 * DERİNLİK: telefon levhanın kenarından TAŞAR (`-right-*` / `-bottom-*`).
 * Kırılan kadraj hem ölçek veriyor hem de kompozisyonu düz karelikten
 * çıkarıyor — kasa yığmadan.
 *
 * ÜST ŞERİT: ağır tarayıcı kromu değil, tek hairline + gerçek yayın adresi.
 * "Gerçek site" okumasını mono tipografiyle veriyor, kasa taklit etmiyor.
 *
 * Hover'da sayfa kaydırma: `data-mock-root` üzerinde dinlenir (ProjectScreen).
 */
export default function WorkPlate({
  project,
  cols = 12,
  side = "right",
  className = "",
  priority = false,
  ratio = "aspect-[4/3] md:aspect-[16/10]",
  showPhone = true,
}: {
  project: Project;
  /** Levhanın editorial grid'te kapladığı kolon — `sizes` hesabı */
  cols?: number;
  /** Telefonun taştığı kenar; ardışık işlerde değişerek ritim kuruyor */
  side?: "left" | "right";
  className?: string;
  priority?: boolean;
  /** Kadraj oranı — /work'te kolon genişliğine göre değişiyor */
  ratio?: string;
  /**
   * Dar kartlarda telefon KAPALI: 4 kolonluk bir levhada telefon kadrajın
   * üçte birini yiyor, kompozisyon dengesizleşiyor.
   */
  showPhone?: boolean;
}) {
  const host = project.url
    ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <div
      data-mock-root
      className={`work-plate group/plate relative ${className}`}
      data-side={side}
    >
      {/*
        Masaüstü ekranı = levha. 16/10 gerçek bir tarayıcı kadrajı.
        `data-plate-screen`: giriş animasyonundaki clip-path YALNIZCA buraya
        uygulanır. Sarmalayıcıya uygulanırsa `inset(0%)` bile taşan telefonu
        kırpıyor (ölçüldü: telefon sayfa kenarında düz kesiliyordu).
      */}
      <div
        data-plate-screen
        className={`work-plate__screen relative overflow-hidden ${ratio}`}
      >
        <ProjectScreen
          src={project.desktopImage}
          scrollSrc={project.desktopScrollImage}
          alt={project.name}
          colors={project.colors}
          label={project.name}
          priority={priority}
          scroll={Boolean(project.desktopScrollImage)}
          quality={82}
          sizes={cardImageSizes(cols, 1)}
        />

        {/* Adres şeridi — ekranın ÜSTÜNDE, kasa değil. */}
        {host ? (
          <span
            aria-hidden
            className="work-plate__bar pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center gap-2 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] md:px-4 md:text-[10px]"
          >
            <span className="work-plate__dot" />
            <span className="truncate">{host}</span>
          </span>
        ) : null}
      </div>

      {/*
        Telefon levhanın dışına taşar. `pointer-events-none`: levhanın tamamı
        tek bir bağlantı, telefon tıklamayı yutmasın.
      */}
      {showPhone && (project.mobileImage || project.mobileScrollImage) ? (
        <div
          className={`work-plate__phone pointer-events-none absolute bottom-[-6%] z-30 w-[26%] max-w-[132px] sm:max-w-[150px] ${
            side === "right" ? "right-[-3%]" : "left-[-3%]"
          }`}
        >
          <PhoneMockup
            project={project}
            sizes="(min-width: 768px) 170px, 30vw"
            screenSizes="(min-width: 768px) 140px, 26vw"
            />
        </div>
      ) : null}
    </div>
  );
}
