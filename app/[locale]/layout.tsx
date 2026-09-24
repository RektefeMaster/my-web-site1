import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HomeHeroKeepAlive from "@/components/HomeHeroKeepAlive";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import Intro from "@/components/Intro";
import RouteTransition from "@/components/RouteTransition";
import { SITE, alternatesFor, socialMeta } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  founderNode,
  graph,
  organizationNode,
  websiteNode,
} from "@/lib/seo";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import "../globals.css";

/**
 * Display — başlıklar (Hero 3D hariç). TR glifleri (ŞşĞğİı) TTF’ye gömülü.
 *
 * Italic kesim bilerek kayıtlı değil: kodun hiçbir yerinde italic display
 * metni yok, ama kayıtlıyken her sayfada preload edilip ~14KB indiriyordu.
 * Italic başlık gerekirse şu satırı geri ekle (dosya `app/fonts/` içinde):
 *   { path: "../fonts/goks-italic.ttf", weight: "400", style: "italic" },
 */
/*
  DİKEY METRİK NOTU — `ascent-override` DENENDİ, BİLEREK GERİ ALINDI.

  Goks'un gömülü metrikleri: ascent 1.360em, descent 0.340em (içerik kutusu
  1.700em). Gerçek mürekkep ise cap height 1.050em (H/M/X/O ölçüldü), alt
  uzantı -0.340em, İ 1.290em. Yani kutu mürekkepten 0.31em uzun.

  `ascent-override: 105%` kutuyu mürekkeğe indiriyor ve editöryel hizalamayı
  bedavaya getiriyor — AMA hero kelime markasını bozuyor: `.hero-wordmark`
  `line-height: 1` ile iki sabit satır; ezme taban çizgisini kutu içinde
  0.155em yukarı çekiyor, marka kilidi (~6rem'de ~15px) figürün başından ve
  cam M'in bandından kayıyor. Hero korunmuş kompozisyon → ezme yok.

  Kırpılma sorunu zaten metriklerden değil, `line-height`'tan geliyordu.
  Ölçek `app/craft.css` içindeki `.type-display-*` sınıflarında; hizalama
  `text-box: trim-both` ile metriklere dokunmadan çözülüyor.
*/
const goks = localFont({
  src: [{ path: "../fonts/goks-regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-goks",
  display: "swap",
});

/** Gövde / alt yazı / UI */
const vireon = localFont({
  src: "../fonts/vireon.otf",
  weight: "400",
  variable: "--font-vireon",
  display: "swap",
});

/** HeroScene 3D Text + yedek stack */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Perde kararı — ilk boyamadan önce html[data-intro] ayarlar (FOUC yok).
 *  `?intro=skip` atlar; `?intro` / `?intro=1` zorla oynatır (eski `indexOf("intro")`
 *  `intro=skip`’i de play sanıyordu).
 *
 *  Dar bant: perde 1.3MB video + ~10sn scroll kilidi demek. Save-Data açıkken
 *  veya 2g bağlantıda bu, siteyi "açılmıyor" gibi gösteriyor — o durumda perde
 *  reduced-motion gibi tamamen atlanır ve ziyaretçi doğrudan hero'ya iner.
 *  `?intro` ile zorlama yine çalışır (reduced-motion hariç).
 */
const introInitScript = `(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";var r=document.documentElement;var sp=new URLSearchParams(location.search);var iv=sp.get("intro");var forceSkip=iv==="skip"||iv==="0"||iv==="false";var forcePlay=!forceSkip&&(iv!==null||location.hash==="#intro");var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;var c=navigator.connection||{};var thin=c.saveData===true||/^(slow-2g|2g)$/.test(c.effectiveType||"");var seen=false;try{seen=sessionStorage.getItem("metek-intro")==="1";}catch(e){}var play=(reduce||thin)?false:(forceSkip?false:(forcePlay||!seen));if(forcePlay&&!reduce)play=true;r.setAttribute("data-intro",play?"play":"skip");if(play){setTimeout(function(){if(r.getAttribute("data-intro")==="play"){r.setAttribute("data-intro","skip");r.classList.remove("intro-lock");try{window.dispatchEvent(new Event("metek:intro-done"));}catch(e){}}},12500);}}catch(e){document.documentElement.setAttribute("data-intro","skip");}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * `NextIntlClientProvider`'a messages VERMEZSEN tüm katalog RSC payload'ına
 * gömülüyor: TR'de 26KB, ve aynı katalog her `<Link>` prefetch'inin RSC
 * cevabında TEKRAR iniyor. Aşağıdaki isim uzayları yalnızca sunucuda
 * (`getTranslations` / `generateMetadata`) okunuyor — istemciye gönderilmeleri
 * için bir sebep yok; katalogun ~%26'sı bunlar.
 *
 * Bir istemci bileşeni bunlardan birini `useTranslations` ile isterse
 * next-intl geliştirmede net bir MISSING_MESSAGE hatası atar — o zaman
 * ilgili adı buradan çıkar.
 */
const SERVER_ONLY_NAMESPACES = [
  "pages",
  "blog",
  "meta",
  "notFound",
  "faqUi",
  "intent",
] as const;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e5e8eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0d11" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    /*
      Ana sayfa canonical + hreflang. Alt rotalar kendi generateMetadata'sında
      kendi yolunu veriyor — bu sürümde relative canonical route'a göre değil
      metadataBase'e göre çözüldüğü için miras yeterli olmuyor.
    */
    alternates: {
      ...alternatesFor(locale, ""),
      types: {
        "application/rss+xml": `${SITE.url}/feed.xml`,
      },
    },
    applicationName: SITE.brand,
    authors: [{ name: "Nurullah Aydın", url: SITE.url }],
    creator: "Nurullah Aydın",
    publisher: SITE.brand,
    ...socialMeta({ locale, path: "", title, description }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const allMessages = await getMessages();
  const clientMessages = Object.fromEntries(
    Object.entries(allMessages).filter(
      ([namespace]) =>
        !(SERVER_ONLY_NAMESPACES as readonly string[]).includes(namespace),
    ),
  );

  const jsonLd = graph([
    organizationNode(tMeta("description")),
    founderNode(),
    websiteNode(locale),
  ]);

  return (
    <html
      lang={locale}
      className={`${goks.variable} ${vireon.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        {/*
          THESIS: Machine first (glass M), then brutal proof, then editorial thinking — one chrome system.
          OWN-WORLD: Carbon·Mist·Petrol — void/paper grounds, petrol accent, chrome edge; Goks+Vireon.
          STORY: Hire the studio that shows craft before claims.
          FIRST VIEWPORT: Full-bleed 3D M + display headline + one CTA group; no cards/stats.
          FORM: Atelier Signal fused world · seed:plan-atelier-signal
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: introInitScript }} />
        <JsonLd data={jsonLd} />
        <NextIntlClientProvider messages={clientMessages}>
          <ThemeProvider>
            <SmoothScroll>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:inline-flex focus:min-h-11 focus:items-center focus:bg-foreground focus:px-4 focus:text-sm focus:font-bold focus:text-background"
              >
                {tA11y("skipToContent")}
              </a>
              <Navbar />
              {/* Hero WebGL keep-alive — ana sayfa dışına çıkınca unmount olmasın */}
              <HomeHeroKeepAlive />
              <main id="main-content">{children}</main>
              <Footer />
              <WhatsAppFab />
              <Intro />
              <RouteTransition />
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
