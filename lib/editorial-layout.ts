/** Editorial grid span — sıraya göre; proje verisine yazılmaz */

export const layoutPattern = ["wide", "narrow", "medium", "large"] as const;

export type LayoutSlot = (typeof layoutPattern)[number];

export const slotClass: Record<LayoutSlot, string> = {
  wide: "md:col-span-8",
  narrow: "md:col-span-4",
  medium: "md:col-span-5",
  large: "md:col-span-7",
};

export function layoutSlotAt(index: number): LayoutSlot {
  return layoutPattern[index % layoutPattern.length] ?? "medium";
}

/** Full-bleed hero preference → 12 col; otherwise pattern slot */
export function editorialSpan(
  index: number,
  displayPreference?: "default" | "hero"
): string {
  if (displayPreference === "hero") return "md:col-span-12";
  return slotClass[layoutSlotAt(index)];
}

const slotCols: Record<LayoutSlot, number> = {
  wide: 8,
  narrow: 4,
  medium: 5,
  large: 7,
};

/** editorialSpan ile aynı karar — sayısal kolon adedi (sizes hesabı için) */
export function editorialSpanCols(
  index: number,
  displayPreference?: "default" | "hero"
): number {
  if (displayPreference === "hero") return 12;
  return slotCols[layoutSlotAt(index)] ?? 5;
}

/**
 * Kart içindeki bir görselin `sizes` değeri.
 *
 * Grid geometrisi: kapsayıcı `max-w-7xl` (1280px), md+ `px-10` (2×40px),
 * altında tek kolon + `px-5` (2×20px). Yani kart genişliği:
 *   md+  → min(1280, 100vw − 80px) × cols/12
 *   <md  → 100vw − 40px
 * `frac` görselin kart genişliğine oranı (ölçüldü: MacBook 0.84, ekran 0.56).
 *
 * Neden gerekli: sabit `360px` gibi bir değer 12 kolonluk kartta 1075px'lik
 * kutuya 384px'lik varyantı düşürüyordu. Kaynak 2400px olduğu halde ~3x
 * upscale — dizüstü ekranındaki metin gözle görülür bulanıktı.
 */
export function cardImageSizes(cols: number, frac: number): string {
  const wide = Math.ceil(((1280 * cols) / 12) * frac);
  const mid = ((cols / 12) * frac).toFixed(4);
  const mob = frac.toFixed(4);
  return [
    `(min-width: 1360px) ${wide}px`,
    `(min-width: 768px) calc((100vw - 80px) * ${mid})`,
    `calc((100vw - 40px) * ${mob})`,
  ].join(", ");
}
