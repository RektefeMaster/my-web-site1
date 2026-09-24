/**
 * Goks display fontunda sorunlu glifleri güvenli karşılığa çevir.
 * Em/en dash ve tırnak normalize — eksik glifte stack Space Grotesk'e düşmesin.
 * ŞşĞğİı glifleri font dosyasına gömülü (app/fonts/goks-*.ttf).
 */
export function forDisplay(text: string): string {
  return text
    .replace(/\u2026/g, "...")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/ {2,}/g, " ");
}
