import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    /** Hero WebGL ilk frame hazır — intro çıkışını senkronlar */
    __metekHeroReady?: boolean;
  }
}

export {};
