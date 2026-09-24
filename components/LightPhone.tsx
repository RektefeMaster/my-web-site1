"use client";

import Image from "next/image";

/**
 * Hafif CSS telefon peep — Apple PNG yok (homepage perf).
 * Mobilde de görünür (küçük); /work DeviceMockup ayrı kalır.
 */
export default function LightPhone({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute bottom-2.5 right-2.5 z-[2] block aspect-[9/19] w-[19%] max-w-[4.35rem] overflow-hidden rounded-sm border border-white/30 bg-[#0a0a0a] shadow-[0_10px_24px_rgba(0,0,0,0.4)] md:bottom-4 md:right-4 md:max-w-[6.5rem] md:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
      }
    >
      <Image
        src={src}
        alt=""
        width={180}
        height={380}
        quality={65}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 767px) 70px, 96px"
        className="h-full w-full object-cover object-top"
      />
    </span>
  );
}
