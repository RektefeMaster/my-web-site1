/** Scroll şeridi yeniden yakalandığında artır — tarayıcı cache kırılır */
export const SCROLL_STRIP_VERSION = 5;

export function bustScrollAsset(url?: string): string | undefined {
  if (!url) return undefined;
  const base = url.split("?")[0];
  return `${base}?v=${SCROLL_STRIP_VERSION}`;
}
