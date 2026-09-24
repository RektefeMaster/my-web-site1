import Process from "@/components/Process";

/**
 * /approach below-fold — süreç zaman çizelgesi.
 *
 * dynamic() KULLANMA: WorkBelowFold ile aynı gerekçe — SSR'de tam yükseklikte
 * basılan ana gövdenin yerine hydrate sırasında Suspense fallback'i geçiyor ve
 * altındaki bandı zıplatıyor.
 */
export default function ApproachBelowFold() {
  return <Process />;
}
