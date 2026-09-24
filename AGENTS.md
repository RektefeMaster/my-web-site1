<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MySite — METEK Digital

METEK Digital stüdyo sitesi (kurucu: Nurullah Aydın). Next.js 16 (App Router) + React Three Fiber + next-intl.

## Copy / içerik işletim sistemi

UI, proje, blog ve meta metinlerinde **zorunlu**: `content-system/` + Cursor skill `.cursor/skills/metek-copy-pipeline`. Üçüncü taraf skill’ler yalnızca `.cursor/skills/vendor/` (pin’li SHA + LICENSE/SOURCE). Ana kaynak yazılmış TR pazarlama metni değil; **semantic brief** + bağımsız locale draft. `avoid-ai-writing` her dilin son stil editörüdür.

- `npm run content:inventory` — yüzey envanteri
- `npm run content:lint` — parity / empty / forbidden / duplicate meta / length raporu
- `npm run content:cities` — 81 şehir sayfası için benzersizlik, uzunluk ve tekrar gate'i (lint hattının içinde de çalışır)
- `npm run check:wordbreaks` — display başlıklarında SESSİZ kelime bölünmesi taraması (çalışan bir prod sunucu ister; `BASE` ile port verilebilir)

## Komutlar

- `npm run dev` — dev server (port 3000)
- `npm run build` — production build (4 locale statik üretilir)

## Mimari

- **Hero 3D** (components/HeroScene.tsx + HomeHeroKeepAlive): R3F sahnesi — kadrajın üstünde dönen, **gerçek cam/krom** stilize "M" (`MeshTransmissionMaterial`). Hero layout'ta keep-alive: ana sayfadan çıkınca unmount YOK (park: opacity-0 + `frameloop:never`); M. ile dönüşte anında görünür.
  - **Sahne artık TEMA-BAĞIMSIZ**: hero her iki temada da aynı siyah film, ışık da filmden geliyor. `dark` state / MutationObserver / tema başına env bake YOK.
  - **Kırılma arkaplanı** (`useFilmBackdrop`): transmission sahnenin FBO'sunu örnekliyor, sahne boşsa M opak levhaya dönüyor. drei'nin `background` kancasına, filmin posteri **ekran en-boyuna CSS'in cover + `object-position` matematiğiyle kırpılıp** veriliyor — cam gerçekten arkasındakini kırıyor. Posteri ham vermek yetmez: `scene.background` düz dokuyu gerer, cam yamalı bir renk lekesi olur.
  - **Marka YALNIZCA camın içinden okunuyor** (`drawWordmark`): sahne hazır olunca DOM'daki `<h1>` görsel olarak sönüyor (`[data-scene-ready]`), kelime markasının bir kopyası ise kırılma arkaplanına çiziliyor. Yani "METEK Digital" çıplak gözle görünmüyor; M üstünden geçtikçe harfler camın içinde kırılarak beliriyor. Kopya DOM'daki font/punto/konumla birebir; konum `offsetLeft/offsetTop` ile okunuyor (`getBoundingClientRect` DEĞİL — giriş animasyonunun `y:16` transform'u bake anında kopyayı kalıcı kaydırıyordu), taban çizgisi CSS half-leading formülüyle. `<h1>` DOM'da ve erişilebilirlik ağacında kalır (`visibility`/`display` kullanma); WebGL yoksa `data-scene-ready` hiç gelmez ve yazı görünür kalır.
  - **Env = filmin kendisi** (`useFilmEnvironment`): equirect canvas — üstte gece göğü (mutlak siyah DEĞİL; sıfırlanırsa M siyah bir deliğe düşüyor), ufukta figürün halesi, altta 4 kez aynalanarak döşenmiş tarla, + tek "ay" speküları. Canvas LDR olduğu için `envMapIntensity` yüksek (9) — eski elle konmuş Lightformer'lar HDR'dı.
  - **Malzeme dengesi**: `transmission 0.82` + `metalness 0.3`. Saf cam (1.0) siyah gökte fizik gereği görünmez oluyor; saf krom da "arkasını göstermiyor". `thickness` DÜNYA BİRİMİNDE ve M sahnede ~0.5 birim — 0.2 civarında tut, büyütürsen cam ekranın ta altındaki tarlayı örnekleyip mavi levhaya dönüyor.
  - **Hareket**: sürekli Y dönüşü (~16sn/tur; gövde `depth 0.5` — inceltirsen profilde marka kayboluyor) + Lissajous gezinme + imleç takibi (`state.pointer`, bu yüzden canvas'ta masaüstünde `pointer-events: auto`). Gezinme bandının merkezi kelime markasıyla ÇAKIŞIR — yazı ancak cam üstünden geçince okunduğu için M'i yukarı sabitleme. Toplam yol `MARK_LIMIT_*` ile kırpılır ve sınırlar M'in YARIM boyu kadar içeri çekilir (merkezi kırpmak yetmiyor; büyük gövdenin üstü nav'ın altına giriyordu).
  - **Perf**: DPR tavan masaüstü 2 / lite 1.75, zemin 1.5; `PerformanceMonitor bounds=[50,70]` (üst 60 olursa 60fps incline + fallback DPR'ı ezer). Transmission `resolution` desktop 1024 / lite 512 (~1024 üstüne çıkarma). Lite'ta FBO **bir kez** bake (film durağan) — kare başı sahne geçişi yok. Env tek sefer bake. M sürekli döndüğü için görünürken `frameloop:always` (mobil dahil 60fps). Boştaki maliyeti görünürlük kesiyor (görüş dışı/sekme gizli → `never`). Context loss'ta Canvas remount. `reactStrictMode: false` şart.

- **Hero zemini = film** (components/HeroFilm.tsx + `public/hero/` + `lib/hero-media.ts`): hero'nun tüm arka planı, ışıyan çiçek tarlasında duran humanoid; gökyüzü mutlak siyah. Marka kilidi (cam M + kelime markası) bu göğe oturuyor.
  - **Gökyüzü uzatıldı**: kaynağın üst ~%26'sı gerçek siyah (ölçüldü: ilk 120 satır max RGB 4/5). Master'lar üstten saf siyahla uzatıldı — dikiş görünmüyor (sınırda 0 → max 2) ama nav ile figürün başı arasında kilit için gerçek yer açılıyor (uzatmasız ~130px kalıyordu). `object-position: 50% 16%` da kırpma payını gökten değil zeminden alıyor.
  - **Siyah ezme**: x264 near-black'i blok blok 2/255'e kaldırıp gren/vinyet altında görünür dikdörtgen leke yapıyordu. `curves` ile yumuşak toe (0..~5 → 0) uygulandı; gök artık tam 0, tarlanın halesi duruyor.
  - **Yön başına ayrı master**: yatay `void-1920x1500.mp4` (~2.7MB, üstten 432px dolgu) ve dikey `void-1080x1920.mp4` (~1.5MB, kaynak 1100px'e kırpılıp üstten 868px dolgu). Seçim `matchMedia("(orientation: portrait)")`, dönüşte `change` ile master değişir. Poster yolları HeroScene ile ORTAK (`lib/hero-media.ts`) — cam aynı dosyayı kırılma/env dokusu olarak okuyor, ikinci indirme yok.
  - **Kesintisiz döngü**: kaynak 12.04sn ve başladığı yere dönmüyor (ilk/son kare RMSE 0.022); son 0.6sn ilk 0.6sn üstüne `xfade` ile bindirilip 11.46sn'ye indirildi. Yeni klip gelirse aynı işlemi uygula.
  - **Kalite**: crf 26/27. Daha agresif sıkıştırma (crf 31) çiçek dokusunu gözle görülür şekilde eziyordu. CSS'te `transform`/`filter` YOK — ikisi de kareyi yeniden örnekletip yumuşatıyor.
  - **Perf:** `preload="none"` + src YOK; kaynak ancak Hero'nun boot kapısı (`metek:hero-warm` / idle) açılınca bağlanıyor, hero görüş dışına çıkınca `pause()`. İlk görsel `<picture>` posteri (~73KB webp, `fetchPriority=high` — LCP elemanı odur); video `playing` olunca `data-playing` ile üstüne açılıyor. reduced-motion'da video hiç inmiyor, poster kalıyor. `.hero-film__veil` yalnızca iki uçta çalışıyor: üstte nav okunurluğu, altta sayfaya geçiş (%14 — tarla griye boyanmıyor).

- **Atölye kareleri** (components/StudioFrames.tsx): Capabilities ile Manifesto arasında, `bg-band` üstünde üç kareli editöryal yayılma (01 vitrin · 02 mesaj · 03 panel). Kareler artık soyut stok görseller değil, gerçek proje ekranları (`havva-baklava`, `whatsapp-bot`, `css-system`) — yani bölüm iddiayı kendi işiyle kanıtlıyor. `public/studio/` KLASÖRÜ SİLİNDİ (728KB, hiçbir yerden referans verilmiyordu); geri ekleme. Kareler `Reveal mode="mask"` + scrub parallax (`data-parallax`, reduced-motion'da yok). Metin `messages.studioFrames`.
- **Hero atmosferi + marka kilidi** (components/Hero.tsx + craft.css): hero'da **başka metin yok** — yalnızca kelime markası. `hero.line2/line3` yalnız `sr-only` tanım satırında ve OG başlığında yaşıyor (mesaj anahtarları duruyor, `opengraph-image.tsx` onları okuyor).
  - **Kelime markası** iki basamak: METEK sol üstte, Digital sağ altta (`--hero-word-stagger`, em cinsinden). Sahne hazır olunca sönüyor — marka camın içinden okunuyor (bkz. Hero 3D). Renk tema tokenı DEĞİL (`--hero-fg`): açık temada siyah kadrajda siyah yazı olurdu. Hero tokenları `.hero-section` üstünde ve tema-bağımsız; tek istisna perdenin alt ucu, orası kasten sayfanın zeminine erir.
  - **Kadraj eşlemesi**: `--hero-mark-y` / `--hero-word-y` figürün başının konumuyla hizalı (yatay master'da ~%50, dikeyde ~%61). Değiştirirsen HeroScene'deki `MARK_Y` / `MARK_Y_PORTRAIT` ile birlikte değiştir.
  - Katmanlar: `.hero-halo` (M'in arkasında ay ışığı, `--hero-mark-y`'den besleniyor), `.hero-vignette`, `.hero-grain` (statik, maskeli — yalnız tarlada; gökte hareketli gren karıncalanıyor), `.hero-scroll__line` (metinsiz kaydırma imi). Canvas bunların ÜSTÜNDE (`z-[3]`) ki cam yazının üstünden geçebilsin.
  - **Perf:** hero görüş dışına çıkınca wrapper `data-atmosphere-idle="true"` → grain/halo/scroll animasyonları duraklar; canvas zaten `frameloop:never` olur. Ekran dışında sıfır sürekli iş.

- **Sinematik video intro** (components/Intro.tsx + craft.css `.intro-*`): ilk yükleme perdesi — stop-motion kâğıt katlama/yıkım sanatı ile METEK posterine dönüşen video (`public/intro/metek-intro.{mp4,webm}`), ses açma/kapama, `Geç` (Esc/Boşluk) kontrolü ve alt ilerleme çizgisi. Kararı layout içindeki `introInitScript` ilk boyamadan önce verir → `html[data-intro="play"|"skip"]` (FOUC yok). Oturum başına bir kez (`sessionStorage['metek-intro']`), reduced-motion'da atlanır, `?intro` ile yeniden tetiklenir, JS yoksa CSS failsafe (~12.5s) temizler. Oynatma sırasında (~2s) below-fold chunk’lar + font + (home) WebGL ısıtılır (`metek:hero-warm`). Video sonlandığında veya atlandığında GSAP ile kusursuz blur/scale erimesiyle 3D Hero sahnesi açılır. Oynarken scroll kilidi **event ile** (wheel/touchmove `preventDefault` + scroll tuşları) + `html.intro-lock { touch-action:none }` + Lenis `stop()`; bitince listener'lar kalkar + `start()` + `ScrollTrigger.refresh()`. **`overflow:hidden` KULLANMA** — custom scrollbar'ı (10px) kaldırıp perde kalkınca tüm sayfayı (sabit navbar dahil) yatay kaydırıp "zıplama" yaratıyor.
- **Başlık reveal** (components/WordReveal.tsx): büyük bölüm başlıkları için maskeli kelime-kelime yükselme (GSAP + `attachScrollReveal`). Düz metin string alır; TR alt-uzantıları padding ile korunur.
- **SEO altyapısı**:
  - `app/[locale]/opengraph-image.tsx` — locale'e göre marka paylaşım kartı (`next/og` ImageResponse, 1200×630). Font: `public/fonts/SpaceGrotesk-Bold.ttf` (`readFile`). Başlık = hero satırları birleşik. Node runtime (edge yapma; `readFile` gerekir).
  - `app/icon.tsx` — marka favicon + JSON-LD logo kaynağı (`/icon`, 256×256 png).
  - JSON-LD (`app/[locale]/layout.tsx` body): `ProfessionalService`/`Organization` + `WebSite` grafiği. `<` → `<` ile kaçırılır.
  - Twitter kartı + `metadataBase` layout `generateMetadata` içinde.
  - `proxy.ts` matcher metadata rotalarını (icon vb.) i18n yönlendirmesinden muaf tutar — yoksa 307.
- **Şehir yüzeyi (81 il, YALNIZCA Türkçe)**: `/tr/sehirler` (ülke hub'ı) → `/tr/sehirler/bolge/{7 bölge}` → `/tr/sehirler/{81 il}`. Veri `data/turkiye-cities.ts`, bölge metni `data/turkiye-regions.ts`, metin besteleyici `lib/city-copy.ts`, şema `lib/city-seo.ts`.
  - **Neden ara katman var**: tek hub 15-25 alt sayfadan sonra bağ değerini dağıtıyor. Bölge hub'ları 81 sayfayı ana sayfadan üç tık mesafede tutuyor; il sayfaları ayrıca komşu illere bağlanıyor.
  - **Neden tek dilli**: "Sivas web tasarım" araması Türkçe yapılıyor. Dört dile çıkarmak 324 sayfa üretip hiçbirine okuyucu getirmiyor. Tek dilli sayfada **hreflang HİÇ verilmez** (`trOnlyPageMeta`), yalnızca kendine dönen canonical yazılır; olmayan sürüme hreflang vermek 404'e işaret eden dil etiketi bırakıyor. Rotalarda `dynamicParams = false` + `locale !== "tr"` → 404.
  - **Doorway riski ÖLÇÜLÜYOR, varsayılmıyor**: `npm run content:cities` (lint hattına bağlı). Ölçtükleri: sayfa çiftleri arası 5-gram Jaccard (eşik %50), sayfaya özgü pasaj oranı (taban %35) ve özgün kelime sayısı (taban 190), meta benzersizliği ve uzunluğu, aynı sayfadaki soru tekrarı, aynı iddianın sayfa içinde tekrarı.
  - **Ölçüm tarihçesi (eşiği düşürmeden önce oku)**: ilk sürümde dört ortak bölüm her ilde birebir aynıydı → 85 sayfa çifti %55 üstünde, özgün oran **%23**. Aynı cümleyi farklı yazmak oranı KIPIRDATMADI (%54,8'de takıldı). Oranı yükselten üç şey: (1) ortak bölümlerin `tier`/`angle`/`region`'a göre gerçekten farklılaşması, (2) il başına elle yazılan `faq2` ve `build` alanları, (3) genel SSS'lerin (fiyat, uzaktan çalışma, hazır tema) sayfadan çıkarılıp `/faq` ile hizmet sayfalarına bırakılması. Sonuç: özgün oran **%41 medyan**, özgün kelime **248 medyan**, en yüksek çift benzerliği **%41**.
  - **Sektörde dolaşan "%60 özgün içerik" rakamı Google'ın yayımladığı bir eşik değil.** 81 ilde %60'a çıkmak sayfa başına ~450 elle yazılmış kelime, yani ~36 bin kelime demek; o hacimde kalite düşüyor. Ortak kalan kısım gizlenmiş kopya değil, her meşru çok lokasyonlu sitede bulunan hizmet anlatımı.
  - **Yeni il eklerken**: `economy` / `demand` / `anchor` / `faq` / `faq2` / `build` alanlarının HEPSİ elle ve o ile özgü yazılır. Şablona il adı yazmak doorway üretiyor. `sectors` ve `hubs` gerçek olacak; uydurma OSB yazma. Ekledikten sonra `npm run content:cities` çalıştır.
  - **Türkçe ekler türetiliyor** (`lib/tr-suffix.ts`): ünlü uyumu + sert ünsüz benzeşmesi. Tek istisna `-eli` ile biten iller (Kocaeli, Kırklareli, Tunceli) kaynaştırma `n`'si alıyor. Ek elle yazma, fonksiyonu kullan.
  - **GEO tarafı**: il başına dört `Service` düğümü (site / yazılım / otomasyon / SEO) + `areaServed` City, FAQPage, BreadcrumbList ve `dateModified` (`CITY_CONTENT_REVIEWED`). Tazelik sayılıyor: uzun süre dokunulmayan sayfa alıntılanma sırasını kaybediyor, tarihi güncellerken içeriği de gözden geçir.
- **i18n**: en (varsayılan) / tr / es / de. Rotalama `i18n/routing.ts` (`localePrefix: as-needed` → `/` = EN), metinler `messages/*.json`, proxy.ts locale yönlendirmesi yapar.
- **Projeler**: `data/projects.ts` içindeki liste; kartlarda gerçekçi laptop+telefon mockup (`ProjectCard.tsx`). Ekran görselleri: `desktopImage` / `mobileImage` → dosyalar `public/projects/{id}/`. Path yoksa renkli placeholder.
- **Blog**: meta `data/blog.ts`, yazılar `data/blog-content/{tr,en,es,de}.ts`. Liste `/blog`, detay `/blog/[slug]`.

## CSS katmanları (ZORUNLU)

El yazımı CSS **her zaman `@layer components` içinde** olacak:
`app/craft.css` (globals.css `layer(components)` ile alır) ve bileşen yanı
`*.css` dosyaları (`SpecularButton.css`, `CircularText.css`, `CurvedInput.css`)
kendi `@layer components { }` bloğunu taşır.

Sebep: Tailwind v4 utility'leri `@layer utilities` içinde. Katmansız CSS
katmanlıyı **her zaman** geçer — yani katmansız `.btn-stable { display:inline-flex }`,
aynı elemandaki `md:hidden`'ı sessizce eziyordu (WhatsApp FAB masaüstünde
görünüyordu). Yeni bileşen stili eklerken katmanı atlama.

Tek istisna `globals.css` içindeki `.font-display` bloğu ve `--nav-offset`
ölçeği: bunlar **bilerek** katmansız, çünkü sırasıyla `font-bold` utility'sini
geçmeleri ve katmansız `:root` tanımıyla aynı yerde olmaları gerekiyor.

**Katman SIRASI her CSS girişinin en üstünde sabitlenir:**
`@layer theme, base, components, utilities;` — hem `globals.css` hem bileşen
yanı `*.css` dosyalarında. Silme. Sebep: bileşen CSS'i Next tarafından ayrı
stylesheet olarak globals'tan **önce** yüklenebiliyor; ilk görülen `@layer`
bildirimi sırayı belirlediği için sıra sabitlenmezse `components` en düşük
önceliğe düşüyor ve Tailwind preflight'ının `a { color: inherit }` kuralı
`.specular-button`'ın rengini eziyor — lime CTA açık gri metinle 1.2:1
kontrastta kalıyordu (ölçüldü, gözle de okunmuyordu).

## Bilinen kısıtlar / dikkat

- **Mobil performansın TAMAMI hero'da.** Ölçüldü (Pixel 7, 4x CPU kısma,
  prod build): 3D hero'lu `/tr` sayfasında 117 uzun görev / 10.9sn bloklama,
  hero'suz `/tr/services`'te 2 uzun görev / 0.16sn ve scroll 60fps. Yani
  performans ararken önce hero'ya bak, uygulamanın geri kalanına değil.
  - `samples` lite'ta **2** (6 değil): `anisotropicBlur 0.04` ile bulanıklık
    yarıçapı zaten ihmal edilebilir, fazladan örnekleme boşa ALU. Ölçüldü:
    SSIM 0.9993 (gözle fark yok), bloklama −%28.
  - `resolution` lite'ta **512'nin altına İNME**. 384 denendi: SSIM 0.934,
    kırılmada gözle görülür merdivenlenme. Geri alındı.
  - Telefonda **60fps** (`frameloop="always"`). Transmission FBO lite'ta
    **bir kez** bake edilir (film poster, mesh gizli) — drei her karede
    512×(h·dpr) sahne geçişi yapmasın. Kırılma shader'da, görüntü aynı.
    `PerformanceMonitor bounds=[50,70]` — üst 60 olursa 60fps incline sayılıp
    DPR tabana kilitlenir. 70: 60Hz'de sabit. 50'nin altında düşer.
  - Hero görüş dışına çıkınca çizim **0** (doğrulandı) — ekran dışı maliyet
    yok, oraya tekrar optimizasyon arama.
- **Intro perdesi UNMOUNT OLMAZ.** `Intro` layout'ta duruyor ve bitince `null`
  render ediyor; effect cleanup'ı hiç çalışmıyor. Scroll kilidini (wheel /
  touchmove `preventDefault`) cleanup'a bırakma — `releaseLockRef` ile perde
  kalkarken sök. Bırakılırsa mobilde sayfa oturum boyunca kaydırılamıyor
  (masaüstünde Lenis programatik kaydırdığı için fark edilmiyor; mobilde Lenis
  kapalı, native scroll doğrudan preventDefault yiyor). Çıkış timeline'ı GSAP
  ticker'ına bağlı olduğundan sekme arkaplandayken `onComplete` gelmiyor —
  `exitFailsafeRef` (setTimeout, rAF'tan bağımsız) o yüzden var.
- **Display başlıklarında punto çifti:** `text-[clamp(1.15rem,≤6.5vw,MAX)]`
  + `sm:text-[ORİJİNAL clamp]`. Telefonda eğim en fazla **6.5vw**; 640px ve
  üstünde `sm:` orijinali geri koyuyor, yani masaüstü/tablet birebir korunuyor
  (48 sayfa/genişlik kombinasyonu baseline ile karşılaştırılarak doğrulandı).
  Sebep: eski clamp'lerin TABANI (3–4rem) telefonda devreye giriyordu ve
  "platformlarından" gibi TR/DE kelimeleri 320px'te 519px sürüp maskeden
  taşıyordu. Yeni bir başlık eklerken aynı çifti kur; tek clamp yazma.
- **Reveal maskelerine `max-width: 100%` VERME.** Maskeler iç içe
  `inline-block`; iç kutunun yüzdesi dıştaki shrink-to-fit genişliğe çözülüyor
  ve genişlik kendi kendine bağımlı hâle geliyor. Sığan kelimeler bile son
  harfini alt satıra atıyor ("Casa Aurelia Roma" → "Cas/a Aureli/a Rom/a",
  "Ahi AI" → "Ah/i A/I"). Taşma punto tarafında çözülür, maske zorlanarak
  değil.
- Kelime maskelerinde boşluk sarmalayıcının **dışında** kalmalı: `inline-block`
  sonundaki beyaz boşluk kırpılıyor ve başlıklar "CasaAureliaRoma" diye
  bitişik çıkıyordu (bkz. `SelectedWork.tsx`, `Fragment` kullanımı).
- Hero'ya `max-h-[1100px]` geri koyma: 1440px+ ekranlarda film 1100px'te
  kesilip figürün bacakları ve çiçek tarlası kadraj dışında kalıyor, altında
  boş bant oluşuyordu (2560×1440'ta ölçüldü). Hero tam `100svh` olmalı.
- Blur'suz nav (coarse pointer / ≤768px) **tam opak** olmalı. %94 saydamlıkta
  altından geçen başlıklar ve proje görselleri çubuğun içinden görünüyor,
  "cam" değil hata gibi okunuyor.
- `reactStrictMode: false` ŞART: StrictMode'un çift effect çalıştırması R3F'in WebGL context'ini kalıcı kaybettiriyor (boş gri hero). Açma.
- `public/fonts/SpaceGrotesk-Bold.ttf` **silinmeyecek**: `app/icon.tsx` ve
  `opengraph-image.tsx` `readFile` ile okuyor (next/og TTF ister). Kod içinde
  import edilmediği için "kullanılmıyor" gibi görünür.
- Fontlar tek kopya: display `app/fonts/goks-regular.ttf`, aksan
  `app/fonts/vireon.otf`. `goks-italic.ttf` kayıtlı değil ama italic başlık
  gerekirse diye duruyor (bkz. `app/[locale]/layout.tsx`). Aynı yüzün ikinci
  formatını (otf/ttf ikizi) geri ekleme — ikisi de deploy'a gidiyordu.
- `--nav-offset` fallback'i gerçek header yüksekliğiyle **birebir** tutulacak
  (<640:168 · 640–767:176 · 768–1023:186 · ≥1024:121, hepsi `+ var(--safe-top)`).
  Uyuşmazsa hydrate'te tüm sayfa zıplıyor (ölçüldü: /work CLS 0.19). Nav
  padding'i değişirse bu değerleri yeniden ölç.
- Rotanın ana gövdesini `dynamic()` + `loading` ile sarma. SSR tam yükseklikte
  basıyor, hydrate'te Suspense fallback'i yerine geçip altındaki her şeyi
  zıplatıyor. `WorkBelowFold`/`ApproachBelowFold` bu yüzden statik import.
  Görüş dışı bölümler için `LazyMount` kullan (o `null` render eder, swap yok).
- **`DeviceMockup` hover şeridi: fine pointer + `pointerenter`, başka tetik YOK.**
  `ProjectScreen` şeridi `useSyncExternalStore` ile
  `(hover: hover) and (pointer: fine)` arkasına alır; dokunmatikte hiç
  mount edilmez (statik `next/image` önizlemesi zaten ekranda ve `onEnter`
  `pointerType !== "mouse"` ile çıkıyordu, yani telefonda şerit inip HİÇ
  oynamıyordu). Viewport tetiği (IntersectionObserver) BİLEREK KALDIRILDI:
  hover edilmese bile /tr/work'te 20 şerit indiriyordu.
  Ölçüldü (prod, Pixel 7 UA, 4x CPU, 1.6Mbps):
  /tr/work mobil **8695KB → 1082KB**, masaüstü **8695KB → 2538KB**;
  /tr mobil 4699KB → 2841KB. Hover gecikmesi görünmüyor —
  `activateScroll` zaten `stripLoaded`'ı bekliyor ve kayma 5.5–18sn sürüyor.
- **Şeritler WebP** (`*-scroll.webp`), `next/image` hattının DIŞINDA ham
  servis ediliyor (uzun şeridi `naturalHeight` ile ölçüyoruz). JPEG q82 →
  WebP q82: 8.2MB → 3.9MB, RMSE 2.3 (gözle fark yok).
  `scripts/capture-project-scrolls.mjs` artık doğrudan WebP yazıyor —
  JPEG'e geri döndürme. WebP tavanı 16383px: `elif-seren` mobil şeridi
  20004px olduğu için yarıya indiriliyor (telefon maketinde ~230 CSS px
  gösteriliyor, hâlâ 2x üstü).
- **`public/lanyard/card.glb` dokusu BİLEREK boş** (176KB; eskiden 2.34MB).
  Kaynak ReactBits demo modeli 1678×1677 bir atlas gömüyordu (2.19MB, dosyanın
  %94'ü) ama o doku EKRANA HİÇ ÇIKMIYOR: `card` mesh'i UV'de yalnızca
  V ∈ [0.0022, 0.7572] örnekliyor, `Lanyard.tsx`'teki `cardMap` composite'i ise
  FRONT/BACK_UV_RECT ile x[0,1] × y[0,0.757]'yi `#090a0d` + METEK kart
  görseliyle yeniden boyuyor; `clip`/`clamp` mesh'leri dokusuz "metal"
  materyalini kullanıyor. Atlas aynı ÖLÇÜDE düz `#090a0d` PNG ile değiştirildi —
  ölçü şart, çünkü composite canvas boyutunu `baseMap.image.width/height`'tan
  alıyor; küçültmek kart yüzünün çözünürlüğünü düşürür. Modeli yeniden
  dışa aktarırsan `node scripts/strip-card-glb-texture.mjs` çalıştır, yoksa
  2.2MB ölü doku geri gelir.
- **Lanyard idle'da bağlanır** (`PageHero` → `useIdleMount`). Kart rapier'ı
  (2.18MB ham / 816KB gzip — wasm base64 olarak JS'in İÇİNDE, indirilip parse
  ediliyor) + three'yi çekiyor; hydrate anında bağlanınca telefonda başlık ve
  fontlar otururken araya giriyordu. `requestIdleCallback`'in `timeout`'unu
  silme — sayfa meşgulse rIC hiç ateşlemez ve kart hiç gelmez.
- UI fontu next/font ile Space Grotesk (`latin` + `latin-ext` subset).
- `next/image` `sizes` değerine **sabit px yazma**. Editorial grid'de kart 4/5/7/8/12
  kolon olabiliyor; sabit `360px` 12 kolonluk kartta 1075px'lik kutuya 384px
  varyant düşürüp kaynağı (2400px) 3x upscale ediyordu. Kart görselleri
  `cardImageSizes(cols, frac)` (lib/editorial-layout.ts), proje galerisi
  `gallerySizes(span)` ile türetilir. Yeni görsel eklerken kutuyu ölç:
  `served_w >= box * dpr` olmalı.
- **Muted metin alfa TABANI: `text-foreground/62`, `text-band-fg/55`.**
  Bunun altına inme. Ölçüldü (WCAG 2.1 AA, 4.5:1): açık temada
  `#10141a` on `#e5e8eb` için minimum **/60**, koyu temada `#eef1f4` on
  `#0a0d11` için **/48** — sınırı açık tema koyuyor. Eski ölçek `/28`–`/45`
  arasındaydı, yani 1.84–2.92:1: 15 rotada 679 metin düğümü AA'nın altındaydı
  (footer telif satırı, tarih/okuma süresi, "01/02" indeksleri, bölüm
  kicker'ları, form placeholder'ı, "Siteyi aç" bağlantıları). Tek istisna
  `aria-hidden` filigran rakamları (`Process` `text-foreground/[0.1]`,
  `Principles` `text-foreground/12`) — sıra `<ol>` ile taşınıyor.
  Form alanı çizgileri ayrı kural: WCAG 1.4.11 (UI bileşen sınırı) 3:1
  istiyor → `border-band-fg/45`.
- **Display başlıklarda SESSİZ kelime bölünmesi**: `.type-display` global
  `overflow-wrap: break-word` taşıyor (dar telefon için bilinçli emniyet
  ağı). Punto kutusundan büyük olduğunda geniş ekranda da ateşliyor ve
  kelimeyi TİRESİZ ikiye bölüyor — "operasyona" → "operasyo / na" (1440px),
  "görüşmeden", "Llamaron", "Cuéntenos", "bulunamadı", "Website" …
  31 kelime, 7 farklı başlık kalıbı, 4 locale'de yakalandı.
  Kural: **≥640px'te hiçbir display kelimesi bölünmeyecek**;
  `npm run check:wordbreaks` bunu ölçüyor. Yeni başlık eklerken çalıştır.
  Çözerken sırayla bak: (1) kutu `max-w-[Nch]` ile mi sınırlı — Goks'ta
  **1ch ≈ 1em**, yani `max-w-[10ch]` = 10em ve punto küçültmek kutuyu da
  küçülttüğü için oranı KIPIRDATMIYOR (Process H2'de böyleydi, `11ch` çözdü);
  (2) kutu kolondan geliyorsa clamp'in tavanını/min'ini kıs; (3) taşma tek
  dilde ise `[html[lang=de]_&]:text-[...]` ile o dile özel kıs — dört dili
  birden küçültme (Almanca "Veröffentlichung" 10.3em, ortak ölçekle sığmıyor).
- **Türkçe glifler fontlarda EKSİKTİ — `scripts/patch-turkish-glyphs.mjs` ile
  yamalanıyor.** Ölçüldü: Goks'un `ğ`/`Ğ` glifi breve yerine 49×14 birimlik
  bir NOKTA taşıyordu (1000 upem'de %1.4 — 44px'te 0.6px, ekranda yok);
  "gerektiğini" → "gerektigini" diye okunuyordu. Vireon'da `ğ Ğ İ ş Ş`
  HİÇ YOKTU, `.font-subtitle` (PageHero lede'si dahil) o harflerde Space
  Grotesk'e düşüyor, kelimenin ortasında yüz değişiyordu. Betik aksanı
  fontun KENDİ ölçülerinden türetiyor (dieresis bandı, `l` sap genişliği,
  taban glif merkezi) ve `app/fonts/*.orig` yedeğinden çalıştığı için
  idempotent. Fontları yeniden dışa aktarırsan tekrar çalıştır;
  `--check` ile doğrula.
- **`NextIntlClientProvider`'a messages VER.** Boş bırakılırsa tüm katalog
  (TR 26KB) her sayfanın RSC payload'ına VE her `<Link>` prefetch cevabına
  gömülüyor. `pages / blog / meta / notFound / faqUi / intent` yalnız
  sunucuda okunuyor (`getTranslations`), o yüzden `SERVER_ONLY_NAMESPACES`
  ile ayıklanıyor — katalogun ~%26'sı. Bir istemci bileşeni bunlardan birini
  isterse next-intl net bir MISSING_MESSAGE atar.
- **Accent metin rengi tema-duyarlı**: `--accent` (#0c6b66 / dark #3dcdc4) açık
  zeminde metin olarak zayıf kalabilir. Tema-takipli yüzeylerde (`bg-background`,
  `bg-paper`) metin için `text-accent-ink` kullan. Her iki temada da koyu kalan
  bantlarda (`bg-band`, `bg-ink`, koyu buton) `text-accent` doğru olan. Dolu
  accent CTA’da `text-on-accent`. Arka plan/çizgi/nokta olarak `bg-accent`
  her yerde serbest.
- WhatsApp yeşili (#25D366) üstünde **beyaz metin kullanma** (1.98:1). Dolu
  yeşil varyantlarda yazı/ikon `#0b2e1a` (9.7:1). Outline varyantlarında zemin
  koyu olduğu için beyaz doğru.
- Dokunma hedefi min 24×24px (WCAG 2.2 AA 2.5.8). Küçük tipografili linkleri
  (breadcrumb, 11px) `py-1.5 -my-1.5` ile büyüt — hedef büyür, düzen kaymaz.

## Kişiselleştirme noktaları

- Marka: **METEK Digital** · Kurucu: Nurullah Aydın
- E-posta / site URL: `lib/site.ts` (`SITE.email`, `SITE.url`)
- Proje listesi: `data/projects.ts` (görseller `public/projects/{id}/`)
- Hero 3 satır: `messages/*.json` → `hero.line1..3`
- "M" şekli: `HeroScene.tsx` → `GlassM` içindeki `pts`
- Sosyal: Instagram + WhatsApp (`lib/site.ts`). Yeni kanal gelince `SITE` + `Footer.tsx`
