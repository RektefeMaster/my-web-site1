/**
 * Hero filmi — tek kaynak.
 *
 * Hem DOM katmanı (HeroFilm) hem WebGL (HeroScene) aynı dosyaları kullanıyor:
 * cam M, transmission arkaplanı olarak posteri kırıyor. Aynı URL olması şart —
 * ikinci bir indirme değil, bellekteki kopya okunuyor.
 */
export const HERO_FILM = {
  videoLandscape: "/hero/void-1920x1500.mp4",
  videoPortrait: "/hero/void-1080x1920.mp4",
  posterLandscape: "/hero/void-poster-1400.webp",
  posterPortrait: "/hero/void-poster-760x1352.webp",
} as const;
