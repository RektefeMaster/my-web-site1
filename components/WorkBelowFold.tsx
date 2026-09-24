import Projects from "@/components/Projects";

/**
 * /work below-fold — lane gruplu Projects.
 * FeaturedCase yalnızca ana sayfada (WCC tekrarı yok).
 *
 * dynamic() KULLANMA: Projects bu rotanın ana gövdesi ve SSR'de tam
 * yükseklikte basılıyor. Suspense fallback (min(48vh,520px)) hydrate
 * sırasında ~8000px'lik içeriğin yerine geçip altındaki PageCta'yı
 * zıplatıyordu (/work CLS 0.19). Statik import = fallback yok = CLS yok.
 */
export default function WorkBelowFold() {
  return <Projects />;
}
