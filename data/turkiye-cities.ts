import type { IndustrySlug } from "./industries";

/**
 * 81 il için gerçek ekonomik profil.
 *
 * Bu dosya şehir sayfalarının TEK doğruluk kaynağı. Sayfa metni buradaki
 * alanlardan bestelenir; şablona il adı yazmakla yetinen sayfa Google'ın
 * doorway tanımına girer, o yüzden her ilin kendi sektörü, kendi ticaret
 * merkezi ve kendi sorusu var.
 *
 * Alan kuralları:
 * - `economy` / `demand` / `anchor` / `faq`: il başına ELLE yazılır, kopyalanmaz.
 * - `sectors` / `hubs`: gerçek. Uydurma OSB veya sektör yazma.
 * - `angle`: sayfanın bölüm iskeletini seçer (bkz. lib/city-copy.ts).
 *   Aynı iskeleti tüm illere vermek yapısal tekrar üretiyordu.
 * - `neighbors`: iç bağlantı için komşu iller. Bölge hub'ı + komşular,
 *   81 sayfanın birbirine bağlanma yolu.
 */

/**
 * Şehir yüzeyi yalnızca Türkçe yayınlanıyor (gerekçe: lib/city-seo.ts).
 * Sabitler burada duruyor çünkü hem `lib/seo.ts` hem `lib/city-seo.ts`
 * okuyor; `lib/city-seo.ts` zaten `lib/seo.ts`'e bağlı, sabitler orada
 * kalsaydı iki modül birbirini import ederdi.
 */
export const CITY_LOCALE = "tr";

/** Şehir yüzeyinin son elden geçirilme tarihi (GEO tazelik sinyali). */
export const CITY_CONTENT_REVIEWED = "2026-08-30";

export const CITY_HUB_PATH = "/sehirler";

export const CITY_REGIONS = [
  "marmara",
  "ege",
  "akdeniz",
  "ic-anadolu",
  "karadeniz",
  "dogu-anadolu",
  "guneydogu-anadolu",
] as const;

export type CityRegionSlug = (typeof CITY_REGIONS)[number];

/** Sayfanın hangi satın alma sorunu etrafında kurulacağı. */
export type CityAngle =
  | "metropol"
  | "sanayi"
  | "turizm"
  | "tarim"
  | "ticaret"
  | "hizmet";

export type CityRecord = {
  slug: string;
  name: string;
  plate: number;
  region: CityRegionSlug;
  /** 1 = kendi hizmet sayfalarını hak eden hacim, 3 = tek sayfa yeter. */
  tier: 1 | 2 | 3;
  angle: CityAngle;
  sectors: string[];
  hubs: string[];
  /** İlin ekonomik karakteri. Sayfanın açılış argümanı. */
  economy: string;
  /** Bu ildeki işletmenin siteden gerçekten ne istediği. */
  demand: string;
  /** İle özgü tek ayırt edici gözlem. Sayfanın tekrar etmeyen cümlesi. */
  anchor: string;
  /** İle özgü soru. Ortak SSS'lerin üstüne eklenir. */
  faq: { question: string; answer: string };
  /**
   * İkinci ile özgü soru.
   *
   * Neden iki tane: ölçüm (npm run content:cities) sayfa başına özgün pasaj
   * oranını %23'te buldu, çünkü gövdenin çoğu havuzdan geliyordu. Aynı cümleyi
   * farklı yazmak oranı kıpırdatmadı; oranı yükselten tek şey il başına ELLE
   * yazılmış malzeme.
   */
  faq2: { question: string; answer: string };
  /** O ilde somut olarak ne kurulduğu. Jenerik hizmet listesi değil. */
  build: string;
  industries: IndustrySlug[];
  neighbors: string[];
};

export const REGION_NAMES: Record<CityRegionSlug, string> = {
  marmara: "Marmara Bölgesi",
  ege: "Ege Bölgesi",
  akdeniz: "Akdeniz Bölgesi",
  "ic-anadolu": "İç Anadolu Bölgesi",
  karadeniz: "Karadeniz Bölgesi",
  "dogu-anadolu": "Doğu Anadolu Bölgesi",
  "guneydogu-anadolu": "Güneydoğu Anadolu Bölgesi",
};

const MARMARA: CityRecord[] = [
  // ── Marmara ──
  {
    slug: "istanbul",
    name: "İstanbul",
    plate: 34,
    region: "marmara",
    tier: 1,
    angle: "metropol",
    sectors: ["ihracat ve dış ticaret", "tekstil ve hazır giyim", "kurumsal hizmet", "e-ticaret"],
    hubs: ["Maslak", "İkitelli OSB", "Ümraniye", "Beylikdüzü", "Şişli"],
    economy:
      "Türkiye'nin ihracat, finans ve ajans hacminin büyük bölümü tek şehirde toplanıyor. Aynı hizmeti veren yüzlerce firma aynı anahtar kelimeye giriyor, dolayısıyla arama sonucunda üstte çıkmak tek başına iş getirmiyor.",
    demand:
      "Kurumsal alıcı burada tek site değil üç dört site birden geziyor. Sizden istenen şey, hangi işi yaptığınızın ilk ekranda anlaşılması ve teklif isteme yolunun aramaya gerek bırakmaması.",
    anchor:
      "İstanbul'da ziyaretçinin karşılaştırma alışkanlığı yüksek: aynı sekmede rakibiniz açık. Site, ikinci sekmeye geçmeden önce ne yaptığınızı ve nasıl teklif alınacağını söylemek zorunda.",
    faq: {
      question: "İstanbul'da onlarca web tasarım firması varken sizi ne ayırıyor?",
      answer:
        "Hazır tema kurup üstüne logo koymuyoruz. Arayüz markaya göre tasarlanıp kodlanıyor, sayfa yapısı sizin satış yolunuza göre kuruluyor ve teknik SEO alanları yayın öncesi tamamlanıyor. Karşılaştırdığınız her ajansa şunu sorun: yayından sonra başlıkları, yönlendirmeleri ve içerik güncellemesini kim sahipleniyor.",
    },
    faq2: {
      question:
        "İstanbul'da ajans fiyatları neden bu kadar farklı?",
      answer:
        "Aynı isimle çok farklı işler satıldığı için. Bir teklif hazır temaya logo koymayı, diğeri sıfırdan tasarım, panel ve teknik SEO'yu kapsıyor. Karşılaştırırken şunu sorun: tasarım özel mi, metni kim yazıyor, panel var mı, yayından sonra başlık ve yönlendirmeleri kim sahipleniyor. Bu dört soru fiyat farkının neredeyse tamamını açıklıyor.",
    },
    build:
      "İstanbul'da genellikle kurumsal tanıtım sayfaları, hizmet başına ayrı adresler ve teklif formunu kaynağıyla birlikte kaydeden bir panel kuruyoruz; çok dilli sürüm ihracat veya yabancı müşteri varsa ekleniyor.",
    industries: ["manufacturing", "hospitality", "local-services"],
    neighbors: ["kocaeli", "tekirdag", "yalova", "bursa"],
  },
  {
    slug: "bursa",
    name: "Bursa",
    plate: 16,
    region: "marmara",
    tier: 1,
    angle: "sanayi",
    sectors: ["otomotiv yan sanayi", "tekstil", "mobilya", "makine imalatı"],
    hubs: ["Nilüfer", "İnegöl", "Demirtaş OSB", "Hasanağa OSB"],
    economy:
      "Otomotiv yan sanayi, tekstil ve İnegöl merkezli mobilya üretimi ilin dış ticaretini taşıyor. Alıcının çoğu kurumsal: satın alma birimi, ithalatçı veya bayi.",
    demand:
      "Sanayi firmasının sitesinden beklenen şey ürün kataloğunun teknik doğrulukla durması ve teklif talebinin eksiksiz gelmesi. Ölçü, kapasite ve sertifika bilgisi sayfada yoksa yazışma iki hafta uzuyor.",
    anchor:
      "Bursa'da alıcı önce ürünü, sonra firmayı arıyor. Ürün ailesi başına ayrı sayfa açmayan üretici, kendi kataloğunu aranabilir hale getirmemiş oluyor.",
    faq: {
      question: "Bursa'daki üretici firmamız için ürün kataloğu siteye nasıl taşınır?",
      answer:
        "Ürün ailesi başına ayrı sayfa açılır, teknik alanlar (ölçü, malzeme, kapasite, sertifika) tabloya çevrilir ve her ürün sayfasından teklif formuna doğrudan bağlantı verilir. Kataloğu tek PDF olarak koymak arama motorunun ürünlerinizi ayrı ayrı indekslemesini engelliyor. Ekip ürün ekleyecekse yönetim paneli aynı teslimde kurulur.",
    },
    faq2: {
      question:
        "İnegöl'de mobilya üreticisiyiz, koleksiyonu siteye nasıl taşırız?",
      answer:
        "Koleksiyon başına ayrı sayfa açılıyor ve her üründe ölçü, kumaş seçenekleri ile teslim süresi yazılı duruyor. Tek bir karma galeri arama motoruna hangi ürünü sattığınızı söylemiyor. Bayi çalışıyorsanız fiyat listesi şifreli bir alanda tutuluyor, böylece perakende müşteri toptan fiyatı görmüyor.",
    },
    build:
      "Bursa'da ürün ailesi başına sayfa, ölçü ve kapasite tabloları, teknik resim yüklenebilen teklif formu ve ekibin ürün ekleyeceği panel kuruyoruz; ihracat varsa İngilizce sürüm aynı yapıyla yazılıyor.",
    industries: ["manufacturing", "furniture"],
    neighbors: ["istanbul", "kocaeli", "yalova", "balikesir", "bilecik"],
  },
  {
    slug: "kocaeli",
    name: "Kocaeli",
    plate: 41,
    region: "marmara",
    tier: 1,
    angle: "sanayi",
    sectors: ["kimya ve petrokimya", "otomotiv", "lojistik", "makine"],
    hubs: ["Gebze", "Dilovası", "Körfez", "GOSB"],
    economy:
      "Gebze hattı boyunca kimya, otomotiv ve lojistik firmaları yoğunlaşıyor. İşin büyük kısmı uluslararası tedarik zincirine bağlı, yani site çoğu zaman yabancı bir satın almacı tarafından okunuyor.",
    demand:
      "İngilizce sürüm burada süs değil gereklilik. Firma tanıtımı, kapasite bilgisi ve iletişim yolu iki dilde aynı doğrulukla durmazsa yazışma e-postaya değil rakibe gidiyor.",
    anchor:
      "Kocaeli'nde tedarik zinciri denetimli çalışıyor: alıcı yalnızca ürüne değil belgeye, kapasiteye ve sürekliliğe bakıyor. Bu üçü yazılı değilse görüşme başlamıyor.",
    faq: {
      question: "Kocaeli'ndeki fabrikamız için çok dilli site gerekli mi?",
      answer:
        "İhracat yapıyorsanız veya yabancı satın alma birimleriyle çalışıyorsanız evet. Metin satır satır çevrilmiyor, her pazar için ayrı yazılıyor; teknik terimler o pazarın kullandığı karşılıkla giriyor. Dil sürümleri arasında hreflang ve canonical kurulmazsa arama motoru sürümleri birbirinin kopyası sayabiliyor.",
    },
    faq2: {
      question:
        "Ana müşterimiz bizi zaten tanıyor, site ne işe yarayacak?",
      answer:
        "İkinci ve üçüncü müşteriye. Tedarikçi arayan satın alma birimi ön elemeyi internetten yapıyor ve kapasitesi yazılı olmayan firmayı listeye almıyor. Tek müşteriye bağlı çalışmak sözleşme yenilenmediğinde riskli hale geliyor; site o riski azaltan ilk adım.",
    },
    build:
      "Kocaeli'nde firma tanıtımı, üretim hatları, kalite belgeleri ve kapasite sayfalarını İngilizce sürümle birlikte kuruyoruz; teklif formu teknik resim ve miktar alanlarıyla geliyor.",
    industries: ["manufacturing"],
    neighbors: ["istanbul", "sakarya", "yalova", "bursa", "duzce"],
  },
  {
    slug: "tekirdag",
    name: "Tekirdağ",
    plate: 59,
    region: "marmara",
    tier: 2,
    angle: "sanayi",
    sectors: ["tekstil", "gıda", "deri", "tarım"],
    hubs: ["Çerkezköy", "Çorlu", "Kapaklı", "Süleymanpaşa"],
    economy:
      "Çerkezköy ve Çorlu hattı Trakya sanayisinin merkezi. Tekstil ve gıda üretimi hem yurt içi zincirlere hem Avrupa'ya çalışıyor.",
    demand:
      "Fason ve toptan çalışan firmada site, kapasiteyi ve çalışma modelini anlatan yer. Minimum sipariş, üretim süresi ve teslim koşulu sayfada yoksa gelen talebin çoğu elenmiyor, sadece geciktiriyor.",
    anchor:
      "Tekirdağ'da sanayi sitesi ile perakende sitesi karıştırılıyor. Fason üreticiye vitrin tasarımı yapmak, alıcının sorduğu kapasite sorusunu cevapsız bırakıyor.",
    faq: {
      question: "Çerkezköy veya Çorlu'daki tesisimiz için nasıl bir site kurulmalı?",
      answer:
        "Üretim hatları, kapasite ve çalışma modeli ayrı sayfalarda durmalı; teklif formu minimum sipariş ve teslim süresini soracak alanlarla kurulmalı. Fason üretimde alıcının ilk sorusu fiyat değil uygunluk oluyor. Site bu uygunluğu peşinen anlatırsa yazışma tek turda bitiyor.",
    },
    faq2: {
      question:
        "Fason üretim yapıyoruz, sitede fiyat vermeli miyiz?",
      answer:
        "Hayır. Fasonda fiyat parti büyüklüğüne, kumaşa ve teslim süresine göre değişiyor; sayfaya sabit rakam yazmak sizi bağlıyor. Bunun yerine minimum sipariş, üretim süresi ve çalıştığınız ürün grupları yazılıyor. Alıcı uygunluğu görüp teklif isterken zaten miktarı söylüyor.",
    },
    build:
      "Tekirdağ'da üretim hatları, kapasite ve çalışma modeli sayfalarını kurup teklif formunu minimum sipariş, teslim süresi ve numune talebi alanlarıyla bağlıyoruz.",
    industries: ["manufacturing"],
    neighbors: ["istanbul", "kirklareli", "edirne", "canakkale"],
  },
  {
    slug: "balikesir",
    name: "Balıkesir",
    plate: 10,
    region: "marmara",
    tier: 2,
    angle: "tarim",
    sectors: ["zeytin ve zeytinyağı", "süt ürünleri", "tarım makineleri", "kıyı turizmi"],
    hubs: ["Bandırma", "Edremit", "Ayvalık", "Susurluk"],
    economy:
      "Edremit Körfezi zeytinyağı üretiminin, Bandırma sanayi ve limanın, Susurluk süt ürünlerinin merkezi. Üç ayrı ekonomi tek il sınırında çalışıyor.",
    demand:
      "Zeytinyağı ve süt üreticisinin sitesi iki işi birden yapıyor: toptan alıcıya üretim bilgisi vermek ve son tüketiciye doğrudan satış açmak. İkisini aynı sayfaya sıkıştırmak ikisini de zayıflatıyor.",
    anchor:
      "Balıkesir'de markalaşan üreticinin sorunu görünürlük değil, doğrudan satış: ürün aracıdan geçtiği için üretici kendi adıyla aranmıyor.",
    faq: {
      question: "Zeytinyağı üreticimiz için hem toptan hem perakende satış nasıl kurulur?",
      answer:
        "Toptan ve perakende ayrı yollar olarak kurulur: toptan tarafta hacim, ambalaj ve sertifika bilgisiyle teklif formu, perakende tarafta ürün sayfası ve sepet. Aynı sayfada iki fiyat mantığını birleştirmek ziyaretçiyi durduruyor. Hasat dönemi ürünleri panelden yönetilir.",
    },
    faq2: {
      question:
        "Zeytinyağımızı kendi markamızla satmaya başlarsak ne değişir?",
      answer:
        "Fiyatı siz belirlemeye başlıyorsunuz. Aracıya satarken ürün isimsiz gidiyor ve rekabet yalnızca fiyatta oluyor. Kendi sayfanızda hasat tarihi, sıkım yöntemi ve asitlik değeri yazılı durduğunda ürün karşılaştırmanın dışına çıkıyor. Toptan satışı bırakmak gerekmiyor, perakende ikinci kanal olarak açılıyor.",
    },
    build:
      "Balıkesir'de toptan ve perakende iki ayrı yol kuruyoruz: toptan tarafta hacim ve ambalaj soran teklif formu, perakende tarafta ürün sayfası ve sipariş; hasat dönemi ürünleri panelden yönetiliyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["bursa", "canakkale", "manisa", "izmir", "kutahya"],
  },
  {
    slug: "canakkale",
    name: "Çanakkale",
    plate: 17,
    region: "marmara",
    tier: 3,
    angle: "turizm",
    sectors: ["turizm", "tarım", "balıkçılık", "seramik ve mermer"],
    hubs: ["Bozcaada", "Gelibolu", "Ayvacık", "Assos"],
    economy:
      "Gelibolu tarihi alanı, Assos ve Bozcaada ile turizm ilin en görünür işi. Sezon kısa olduğu için rezervasyonun aracıya değil işletmeye gelmesi doğrudan gelir farkı yaratıyor.",
    demand:
      "Butik otel ve pansiyonun ihtiyacı komisyonsuz rezervasyon yolu. Oda tipi, müsaitlik ve fiyat sitede görünmüyorsa ziyaretçi platforma dönüyor ve satış aracıya gidiyor.",
    anchor:
      "Çanakkale'de konaklama aramaları sezona ve etkinliğe göre sıçrıyor. Site yılda üç ay çalışan bir vitrin değil, tüm yıl indekste duran bir kayıt olmak zorunda.",
    faq: {
      question: "Bozcaada veya Assos'taki pansiyonumuz platform komisyonundan nasıl kurtulur?",
      answer:
        "Site üzerinden doğrudan talep alan bir yol kurulur: oda tipi sayfaları, müsaitlik takvimi ve WhatsApp ile rezervasyon talebi. Platformu tamamen bırakmak gerekmiyor, doğrudan gelen misafire fark yaratan bir sebep vermek yetiyor. Sezon dışı içerik sayfanın indeksten düşmesini engelliyor.",
    },
    faq2: {
      question:
        "Sezon üç ay sürüyor, yıl boyu site tutmak mantıklı mı?",
      answer:
        "Mantıklı, çünkü rezervasyon sezondan önce yapılıyor. Nisanda arama yapan misafir sayfanızı martta indekslenmiş halde buluyor; sezonda açılan site o aramaya yetişemiyor. Kış aylarında bölge rehberi ve erken rezervasyon içeriği sayfayı ayakta tutuyor, maliyeti de düşük.",
    },
    build:
      "Çanakkale'de oda tipi sayfaları, müsaitlik takvimi ve WhatsApp'a bağlı rezervasyon talebi kuruyoruz; sezon dışında indekste kalması için bölge ve ulaşım içerikleri ekleniyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["balikesir", "tekirdag", "edirne"],
  },
  {
    slug: "edirne",
    name: "Edirne",
    plate: 22,
    region: "marmara",
    tier: 3,
    angle: "ticaret",
    sectors: ["sınır ticareti", "tarım", "turizm", "gıda"],
    hubs: ["Keşan", "Uzunköprü", "Kapıkule", "Enez"],
    economy:
      "Kapıkule sınır kapısı ve Selimiye Camii ili iki farklı akışa bağlıyor: lojistik ile ticaret bir yanda, günübirlik ve kültür turizmi diğer yanda.",
    demand:
      "Sınır ticaretinde çalışan firmanın sitesi Bulgarca ve Yunanca soruyu da karşılıyor. Turizm tarafında ise aranan şey menü, konum ve çalışma saati gibi doğrulanabilir bilgi.",
    anchor:
      "Edirne'de ziyaretçinin çoğu şehirde değil yolda arama yapıyor. Telefonda açılmayan veya konumu net olmayan sayfa, o aramayı komşu işletmeye bırakıyor.",
    faq: {
      question: "Edirne'de ciğerci veya restoran işletmesi için site gerçekten gerekli mi?",
      answer:
        "Google İşletme Profili tek başına yetmiyor. Menü, fiyat aralığı, kapasite ve rezervasyon yolu kendi adresinizde durduğunda arama sonucunda daha fazla alan kaplıyorsunuz ve yapay zeka yanıtları da bu sayfayı kaynak alabiliyor. Profil ile site birbirini besliyor.",
    },
    faq2: {
      question:
        "Google İşletme Profilimiz var, ayrıca siteye ihtiyacımız var mı?",
      answer:
        "Profil sizin kontrolünüzde olmayan bir alan; Google düzenini değiştirdiğinde ne göründüğü de değişiyor. Site kendi adresiniz: menü, fiyat aralığı, kapasite ve rezervasyon yolu orada kalıcı duruyor. İkisi birbirini besliyor, çünkü profildeki bağlantı siteye gidiyor ve arama sonucunda daha fazla alan kaplıyorsunuz.",
    },
    build:
      "Edirne'de menü veya hizmet listesini metin olarak yayınlayan, konum ve çalışma saatini öne alan sade bir yapı kuruyoruz; sınır ticareti varsa ikinci dil ekleniyor.",
    industries: ["local-services", "hospitality"],
    neighbors: ["kirklareli", "tekirdag", "canakkale"],
  },
  {
    slug: "kirklareli",
    name: "Kırklareli",
    plate: 39,
    region: "marmara",
    tier: 3,
    angle: "sanayi",
    sectors: ["sanayi üretimi", "tarım", "peynircilik", "gıda"],
    hubs: ["Lüleburgaz", "Babaeski", "Vize", "Pınarhisar"],
    economy:
      "Lüleburgaz hattındaki fabrikalar ile küçük ölçekli gıda üreticisi aynı ilde yan yana çalışıyor. Sanayi kurumsal alıcıya, gıda bölgesel pazara satıyor.",
    demand:
      "Küçük üreticinin sitesi bayilik ve toptan talebi karşılamak için var. Ürün listesi ve iletişim yeterli görünüyor ama fiyat aralığı ile teslim bölgesi yazılmazsa gelen talep boşa çıkıyor.",
    anchor:
      "Kırklareli'nde çoğu firma il dışından aranıyor. Sayfada hangi illere teslim yapıldığı yazmadığında, uzaktaki alıcı sormadan vazgeçiyor.",
    faq: {
      question: "Küçük bir üretici için site yatırımı ne zaman anlamlı?",
      answer:
        "Ürününüz il dışından soruluyorsa ve talep telefonla tek tek anlatılıyorsa anlamlı. Site o tekrar eden anlatımı üstlenir: ürün, ambalaj, minimum sipariş ve teslim bölgesi yazılı durur. İlk sürüm beş sayfa olabilir, büyük bir platform olmak zorunda değil.",
    },
    faq2: {
      question:
        "Beş sayfalık bir site bize yeter mi?",
      answer:
        "Çoğu durumda yetiyor. Ana sayfa, ürünler, üretim, sık sorulanlar ve iletişim. Belirleyici olan sayfa sayısı değil, her sayfanın tek bir konusu olması ve teslim bölgesi ile minimum siparişin yazılı durması. İş büyüdükçe sayfa eklemek sonradan kolay, adres düzeni doğru kurulduysa maliyeti de düşük.",
    },
    build:
      "Kırklareli'nde ürün listesi, teslim bölgesi ve toptan talep formundan oluşan sade bir yapı kuruyoruz; bayilik veriliyorsa başvuru sayfası ayrı açılıyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["edirne", "tekirdag", "istanbul"],
  },
  {
    slug: "sakarya",
    name: "Sakarya",
    plate: 54,
    region: "marmara",
    tier: 2,
    angle: "sanayi",
    sectors: ["otomotiv", "makine", "fındık ve tarım", "gıda"],
    hubs: ["Adapazarı", "Hendek", "Arifiye", "Sakarya OSB"],
    economy:
      "Otomotiv üretimi ve yan sanayi ilin sanayi omurgasını kuruyor, fındık ise tarımsal ihracatı taşıyor. İki ekonominin alıcı tipi tamamen farklı.",
    demand:
      "Yan sanayi firmasının sitesinde aranan şey parça listesi, uygunluk bilgisi ve hızlı teklif. Fındık tarafında ise ihracatçı sertifika, hasat ve depolama bilgisi arıyor.",
    anchor:
      "Sakarya'da firmalar çoğu zaman tek bir büyük müşteriye bağlı çalışıyor. Site, o bağımlılığı azaltacak ikinci alıcının sizi bulabildiği tek yer.",
    faq: {
      question: "Tek müşteriye çalışan yan sanayi firması siteden ne kazanır?",
      answer:
        "Yeni alıcı, tedarikçi ararken önce internetten doğrulama yapıyor. Ürün ailesi, kapasite ve kalite belgeleri kendi adresinizde durduğunda listeye giriyorsunuz. Tek müşteriden ikinciye geçişin ilk adımı genellikle aranabilir olmak.",
    },
    faq2: {
      question:
        "Yeni bir ana yükleniciye tedarikçi olmak için sitede ne bulunmalı?",
      answer:
        "Makine parkı, işlenebilir malzemeler, tolerans aralığı, kalite belgeleri ve teslim süresi. Satın alma birimi ilk elemeyi bu bilgilere bakarak yapıyor ve eksik olan firmayı listeye almıyor. Belgelerin tarihli ve güncel durması da önemli; süresi geçmiş belge güven kaybettiriyor.",
    },
    build:
      "Sakarya'da parça ve ürün ailesi sayfaları, uygunluk tabloları ve teknik resim yüklenebilen teklif formu kuruyoruz; fındık tarafında sertifika ve depolama bilgisi ayrı sayfa oluyor.",
    industries: ["manufacturing"],
    neighbors: ["kocaeli", "duzce", "bilecik", "bolu"],
  },
  {
    slug: "bilecik",
    name: "Bilecik",
    plate: 11,
    region: "marmara",
    tier: 3,
    angle: "sanayi",
    sectors: ["mermer ve doğal taş", "seramik", "cam", "tarım"],
    hubs: ["Bozüyük", "Osmaneli", "Söğüt", "Pazaryeri"],
    economy:
      "Bozüyük seramik ve refrakter üretiminin, il geneli ise mermer ocaklarının merkezi. Üretimin önemli kısmı ihracata çalışıyor.",
    demand:
      "Doğal taş satan firmada alıcının istediği tek şey görsel doğruluk: blok, plaka ve renk varyasyonu fotoğrafla ayırt edilebilmeli. Düşük çözünürlüklü galeri teklif kaybettiriyor.",
    anchor:
      "Bilecik'te mermer alıcısı ürünü adıyla arıyor. Ocak veya renk adı sayfa başlığında geçmeyen firma, o aramanın tamamen dışında kalıyor.",
    faq: {
      question: "Mermer ve doğal taş firması için galeri nasıl kurulmalı?",
      answer:
        "Her taş tipi kendi sayfasında, kendi adıyla ve teknik özellikleriyle durmalı. Tek bir karma galeri arama motoruna hangi taşı sattığınızı söylemiyor. Görseller büyük boy yüklenip sayfa boyutunu şişirmesin diye ölçülü sunulur; mobilde açılmayan galeri ihracat talebini de kaybettiriyor.",
    },
    faq2: {
      question:
        "Mermer görsellerini yüksek çözünürlükte koyunca site yavaşlıyor, ne yapmalı?",
      answer:
        "Görseller ekrandaki kutuya göre ölçülendirilip birden fazla boyutta sunuluyor; telefon küçük olanı, masaüstü büyük olanı indiriyor. Ham dosyayı doğrudan koymak sayfayı mobilde açılmaz hale getiriyor ve ihracat aramalarının önemli kısmı telefondan geliyor. Renk doğruluğu bu işlemde korunuyor.",
    },
    build:
      "Bilecik'te taş tipi başına ayrı sayfa, renk ve damar varyasyonlarının doğru göründüğü galeri ve teknik özellik tablosu kuruyoruz; ihracat varsa İngilizce sürüm aynı yapıda yazılıyor.",
    industries: ["manufacturing"],
    neighbors: ["bursa", "eskisehir", "sakarya", "kutahya"],
  },
  {
    slug: "yalova",
    name: "Yalova",
    plate: 77,
    region: "marmara",
    tier: 3,
    angle: "hizmet",
    sectors: ["süs bitkileri ve fidancılık", "termal turizm", "tersane", "tarım"],
    hubs: ["Çınarcık", "Termal", "Altınova", "Çiftlikköy"],
    economy:
      "Süs bitkisi üretimi ilin kendine özgü işi, termal tesisler ve tersane ise ikinci ekonomiyi kuruyor. İstanbul'a yakınlık talebin çoğunu il dışından getiriyor.",
    demand:
      "Fidancının sitesi sezonluk ürün listesini ve toptan fiyat mantığını taşımak zorunda. Peyzaj firması ve müteahhit alıcı olduğu için talep genellikle listeyle geliyor.",
    anchor:
      "Yalova'da müşteri ilden değil, çoğunlukla İstanbul ve Bursa'dan arıyor. Sayfada teslim ve nakliye bilgisi yoksa mesafe kaygısı satın almayı durduruyor.",
    faq: {
      question: "Fidan ve süs bitkisi satışı için nasıl bir site kurulur?",
      answer:
        "Tür ve boy bazında ürün sayfası, sezon bilgisi ve toptan talep formu kurulur; nakliye koşulu peşinen yazılır. Ürün listesi sık değiştiği için panelden güncellenir. Peyzaj firmalarına satış yapıyorsanız liste halinde teklif isteyebilecekleri bir alan işi hızlandırıyor.",
    },
    faq2: {
      question:
        "Peyzaj firmaları liste halinde fiyat soruyor, bunu siteye taşıyabilir miyiz?",
      answer:
        "Taşınıyor. Toptan talep formuna tür, boy ve adet girilebilen bir alan ekleniyor; müşteri listeyi tek seferde gönderiyor, siz de tek dönüşte fiyatlıyorsunuz. Şu anda birkaç tur süren yazışma tek tura iniyor. Sık çalışılan firmalar için şifreli bir fiyat listesi de açılabiliyor.",
    },
    build:
      "Yalova'da tür ve boy bazında ürün sayfaları, sezon bilgisi, toptan talep formu ve nakliye koşullarını yazan bir yapı kuruyoruz; ürün listesi panelden güncelleniyor.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["istanbul", "kocaeli", "bursa"],
  },
];

const EGE: CityRecord[] = [
  {
    slug: "izmir",
    name: "İzmir",
    plate: 35,
    region: "ege",
    tier: 1,
    angle: "metropol",
    sectors: ["ihracat ve liman", "gıda", "tekstil", "turizm"],
    hubs: ["Alsancak", "Bornova", "Kemalpaşa", "Çiğli AOSB", "Çeşme"],
    economy:
      "Liman, gıda sanayii ve turizm aynı şehirde çalışıyor. İhracatçı firma ile Alaçatı'daki butik otel aynı ilde ama tamamen farklı iki arama davranışının içinde.",
    demand:
      "İzmirli firmalar genellikle tasarım kalitesine duyarlı, buna karşılık sitenin satış işini yapması bekleniyor. Estetik ile teklif yolu birbirini yemeyecek şekilde kurulmalı.",
    anchor:
      "İzmir'de marka görüntüsü satın alma kararını gerçekten etkiliyor. Yine de görselliğe yatırım yapıp iletişim yolunu tek bir e-posta adresine indiren site, gelen ilgiyi kayda çeviremiyor.",
    faq: {
      question: "İzmir'de hem ihracat hem yerel müşteriye çalışan firma için tek site yeter mi?",
      answer:
        "Tek site yeter, ama iki ayrı yol kurulmalı. İhracat tarafı İngilizce sürüm, kapasite ve sertifika bilgisiyle; yerel taraf hizmet sayfaları ve doğrudan iletişimle. İki kitleyi tek ana sayfaya sıkıştırmak ikisinin de sorusunu yarım bırakıyor.",
    },
    faq2: {
      question:
        "Tasarımı güzel bir site istiyoruz ama satış da yapsın, ikisi çelişiyor mu?",
      answer:
        "Çelişmiyor, ama sıralama önemli. Önce ziyaretçinin ne yapması gerektiği belirleniyor, sonra o eylem etrafında tasarım kuruluyor. Ters sırada çalışan projelerde iletişim yolu tek bir e-posta adresine düşüyor ve site güzel görünüp talep toplamıyor. Estetik, eylemi gizlemediği sürece sorun değil.",
    },
    build:
      "İzmir'de ihracat ve yerel müşteriyi iki ayrı yola bölüyoruz: İngilizce sürüm kapasite ve sertifika bilgisiyle, yerel taraf hizmet sayfaları ve doğrudan iletişimle kuruluyor.",
    industries: ["manufacturing", "hospitality", "local-services"],
    neighbors: ["manisa", "aydin", "balikesir", "mugla"],
  },
  {
    slug: "manisa",
    name: "Manisa",
    plate: 45,
    region: "ege",
    tier: 2,
    angle: "sanayi",
    sectors: ["beyaz eşya ve elektronik", "gıda", "üzümcülük", "tarım"],
    hubs: ["Manisa OSB", "Turgutlu", "Salihli", "Akhisar"],
    economy:
      "Manisa OSB elektronik ve beyaz eşya üretiminin merkezi; Akhisar zeytin, Salihli ve Alaşehir üzüm ile tarımsal ihracatı taşıyor.",
    demand:
      "Elektronik yan sanayide alıcı teknik dokümana bakıyor. Kuru üzüm ve zeytin tarafında ise ihracatçı sertifika, parti bilgisi ve depolama koşulu soruyor.",
    anchor:
      "Manisa'da OSB firmaları için site, fuar sonrası doğrulama aracı. Fuarda kart verip sitesinde ürün listesi olmayan firma o teması kaybediyor.",
    faq: {
      question: "Fuar sonrası gelen ziyaretçiyi siteye nasıl bağlarız?",
      answer:
        "Fuarda konuşulan ürün ailesi için site tarafında karşılığı olan bir sayfa bulunmalı ve karta o sayfanın adresi yazılmalı. Genel ana sayfaya düşen ziyaretçi aradığı ürünü bulamadan çıkıyor. Fuar dönemi için ayrı bir talep formu açmak, gelen teması kaynağıyla birlikte kaydediyor.",
    },
    faq2: {
      question:
        "Fuarda dağıttığımız kartta hangi adres yazmalı?",
      answer:
        "Ana sayfa değil, fuarda konuştuğunuz ürün ailesinin sayfası. Genel ana sayfaya düşen ziyaretçi aradığı ürünü bulamadan çıkıyor. Kısa ve okunabilir bir adres kullanılıyor, o sayfaya fuara özel bir talep formu bağlanıyor; böylece gelen temasın hangi fuardan geldiği de kayda giriyor.",
    },
    build:
      "Manisa'da ürün ailesi sayfaları, teknik doküman indirme alanı ve fuar dönemi için kaynağı ayrı kaydedilen bir talep formu kuruyoruz; tarım tarafında sertifika ve parti bilgisi ayrı sayfa oluyor.",
    industries: ["manufacturing"],
    neighbors: ["izmir", "aydin", "denizli", "usak", "balikesir", "kutahya"],
  },
  {
    slug: "aydin",
    name: "Aydın",
    plate: 9,
    region: "ege",
    tier: 2,
    angle: "tarim",
    sectors: ["incir ve zeytin", "jeotermal", "kıyı turizmi", "tarım"],
    hubs: ["Kuşadası", "Didim", "Nazilli", "Söke"],
    economy:
      "Kuru incir ve zeytinyağı ihracatı ile Kuşadası ve Didim turizmi ilin iki ana geliri. Tarım tarafı ihracatçıya, turizm tarafı doğrudan misafire satıyor.",
    demand:
      "İncir ve zeytin ihracatçısının sitesinde sertifika, hasat dönemi ve ambalaj seçenekleri aranıyor. Turizm tarafında ise fiyat ve müsaitliğin görünmesi rezervasyonu belirliyor.",
    anchor:
      "Aydın'da tarım ürünü satan firmaların çoğu aracı üzerinden çalışıyor ve kendi adıyla hiç aranmıyor. Marka adıyla bulunabilir olmak, aracı payını azaltmanın ilk adımı.",
    faq: {
      question: "Kuru incir veya zeytinyağı ihracatı için site nasıl kurulmalı?",
      answer:
        "İngilizce sürüm zorunlu; ürün sayfalarında kalibre, ambalaj, sertifika ve yıllık kapasite yazılı olmalı. İthalatçı önce uygunluğu kontrol ediyor, fiyatı sonra soruyor. Hasat dönemi ve stok durumu panelden güncellenebilir olursa sayfa yıl boyu güncel kalıyor.",
    },
    faq2: {
      question:
        "İhracatçı bize ulaşamıyor, sorun dilde mi?",
      answer:
        "Genellikle dilde ve terimde. İthalatçı ürünü kendi pazarının kullandığı adla arıyor; makine çevirisi o adı yakalamıyor. Ayrıca ürün sayfası yoksa firma tanıtımı tek başına aramaya girmiyor. Kalibre ve ambalaj bilgisi yazılı olduğunda talep numune aşamasından başlıyor, tanışma yazışmasından değil.",
    },
    build:
      "Aydın'da kalibre, ambalaj, sertifika ve yıllık kapasite alanlarını taşıyan ürün sayfaları ile İngilizce sürüm kuruyoruz; turizm tarafında oda sayfaları ve doğrudan talep yolu ayrı çalışıyor.",
    industries: ["manufacturing", "hospitality"],
    neighbors: ["izmir", "manisa", "denizli", "mugla"],
  },
  {
    slug: "denizli",
    name: "Denizli",
    plate: 20,
    region: "ege",
    tier: 1,
    angle: "sanayi",
    sectors: ["ev tekstili", "mermer", "kablo", "jeotermal"],
    hubs: ["Denizli OSB", "Sarayköy", "Çivril", "Pamukkale"],
    economy:
      "Havlu ve bornoz üretimi ili dünya pazarına bağlıyor; mermer ve kablo ikinci ihracat kalemi. Alıcının çoğu yurt dışında ve siteyi İngilizce okuyor.",
    demand:
      "Ev tekstili alıcısı gramaj, kompozisyon, ölçü ve minimum sipariş miktarı arıyor. Bu bilgiler sayfada yoksa numune talebi bile başlamıyor.",
    anchor:
      "Denizli'de ihracatçı firmalar aynı ürünü satıyor, ayrışma teknik ayrıntıda oluyor. Ürün sayfasında gramaj yazan firma, yazmayan firmanın önüne geçiyor.",
    faq: {
      question: "Denizli'deki tekstil firmamız yurt dışı alıcıya nasıl görünür olur?",
      answer:
        "İngilizce sürüm ürün terimleriyle yazılır, satır satır çevrilmez: alıcı havlu için hangi kelimeyi arıyorsa o kelime kullanılır. Ürün ailesi başına sayfa açılır, gramaj ve ölçü tabloya girer, numune talebi ayrı bir form olur. Site hızının mobilde ölçülmesi de gerekiyor; ihracat aramalarının önemli kısmı telefondan geliyor.",
    },
    faq2: {
      question:
        "Rakiplerimizle aynı ürünü satıyoruz, sitede nasıl ayrışırız?",
      answer:
        "Teknik ayrıntıda. Aynı havluyu satan iki firmadan gramajı, kompozisyonu ve minimum siparişi yazan alıcının kısa listesine giriyor. Ayrışma görsel değil bilgi tarafında oluyor, çünkü alıcı numune istemeden önce uygunluğu kontrol ediyor. Bu bilgileri yazmak rakibin kopyalayabileceği bir şey de değil, sizin gerçek üretim aralığınız.",
    },
    build:
      "Denizli'de ürün ailesi başına gramaj ve ölçü tablosu taşıyan sayfalar, ayrı bir numune talep formu ve İngilizce sürüm kuruyoruz; mobil hız teslim öncesi ölçülüyor.",
    industries: ["manufacturing"],
    neighbors: ["aydin", "manisa", "usak", "mugla", "burdur", "afyonkarahisar"],
  },
  {
    slug: "mugla",
    name: "Muğla",
    plate: 48,
    region: "ege",
    tier: 1,
    angle: "turizm",
    sectors: ["turizm ve konaklama", "yatçılık", "çam balı", "mermer"],
    hubs: ["Bodrum", "Marmaris", "Fethiye", "Göcek", "Datça"],
    economy:
      "Bodrum, Marmaris ve Fethiye ilin turizm hacmini taşıyor; yat işletmeciliği ve villa kiralama buna bağlı ikinci bir ekonomi kurmuş durumda.",
    demand:
      "Otel, villa ve tekne işletmesinin en pahalı sorunu platform komisyonu. Doğrudan rezervasyon yolu kurulmadıkça her misafir aracıya pay bırakıyor.",
    anchor:
      "Muğla'da misafirin çoğu yurt dışından ve karar vermeden önce dört beş kez siteye dönüyor. İngilizce ve Almanca sürümü olmayan işletme, o dönüşlerin bir kısmını en baştan kaybediyor.",
    faq: {
      question: "Bodrum veya Fethiye'deki tesisimiz doğrudan rezervasyonu nasıl artırır?",
      answer:
        "Oda ve villa tipleri kendi sayfalarında, gerçek fotoğraf ve net fiyat mantığıyla durmalı; talep formu tarih ve kişi sayısını sorup WhatsApp'a bağlanmalı. Doğrudan gelen misafire platformda olmayan bir sebep verilmeli. Yabancı misafir varsa dil sürümleri ayrı yazılır, çeviri motoruna bırakılmaz.",
    },
    faq2: {
      question:
        "Platformdaki fiyatımızla site fiyatımız aynı olmalı mı?",
      answer:
        "Platform sözleşmeleri genellikle daha düşük fiyat vermenizi kısıtlıyor, o yüzden fark fiyatta değil içerikte kuruluyor: erken giriş, transfer, kahvaltı veya oda yükseltme gibi doğrudan rezervasyona özel bir karşılık. Misafire platformda bulamayacağı bir sebep verildiğinde doğrudan rezervasyon payı artıyor.",
    },
    build:
      "Muğla'da oda ve villa tipleri için ayrı sayfalar, tarih ve kişi sayısı soran talep formu, WhatsApp bağlantısı ve İngilizce ile Almanca sürümler kuruyoruz.",
    industries: ["hospitality", "local-services"],
    neighbors: ["aydin", "denizli", "burdur", "antalya", "izmir"],
  },
  {
    slug: "afyonkarahisar",
    name: "Afyonkarahisar",
    plate: 3,
    region: "ege",
    tier: 2,
    angle: "sanayi",
    sectors: ["mermer", "gıda", "termal turizm", "tarım"],
    hubs: ["İscehisar", "Sandıklı", "Bolvadin", "Afyon OSB"],
    economy:
      "İscehisar mermer ocakları ihracatı, termal tesisler iç turizmi, sucuk ve kaymak ise gıda markalarını taşıyor. Üç iş kolu da il adıyla anılıyor.",
    demand:
      "Mermer firması yurt dışı alıcıya, termal tesis iç pazara, gıda üreticisi ise hem toptancıya hem son tüketiciye satıyor. Site tipini bu üç yoldan hangisinde olduğunuz belirliyor.",
    anchor:
      "Afyonkarahisar'da il adı ürün adıyla birlikte aranıyor. Sayfa başlığında ürünle il adını birlikte taşımayan firma, kendi ilinin marka gücünü kullanmıyor.",
    faq: {
      question: "Termal otelimiz sezon dışında da nasıl talep alır?",
      answer:
        "Sağlık, tedavi ve konaklama süreleri gibi yıl boyu aranan konular için ayrı sayfalar açılır. Yalnızca oda ve fiyat gösteren site, tatil dönemi dışında aranmıyor. Paket içeriği ve tesis olanakları yazılı durduğunda yapay zeka yanıtları da bu sayfayı kaynak alabiliyor.",
    },
    faq2: {
      question:
        "Termal tesisimiz için hangi içerik yıl boyu arama getiriyor?",
      answer:
        "Tedavi ve konaklama süreleri, tesis olanakları, hangi şikayete hangi programın uygun olduğu ve ulaşım. Bu konular tatil dönemine bağlı olmadan aranıyor. Yalnızca oda ve fiyat gösteren sayfa yılın büyük kısmında sessiz kalıyor. Sağlık iddiası içeren ifadelerden kaçınılıyor, bilgi tarif edilerek veriliyor.",
    },
    build:
      "Afyonkarahisar'da mermer tarafında taş tipi sayfaları ve ihracat sürümü, termal tarafında konaklama süresi ve paket içeriği sayfaları kuruyoruz; gıda markası varsa perakende satış ayrı yol oluyor.",
    industries: ["manufacturing", "hospitality"],
    neighbors: ["usak", "kutahya", "denizli", "burdur", "isparta", "konya", "eskisehir"],
  },
  {
    slug: "kutahya",
    name: "Kütahya",
    plate: 43,
    region: "ege",
    tier: 3,
    angle: "sanayi",
    sectors: ["seramik ve çini", "manyezit", "termal turizm", "madencilik"],
    hubs: ["Tavşanlı", "Gediz", "Simav", "Kütahya OSB"],
    economy:
      "Seramik ve çini ile anılan il, aynı zamanda manyezit ve madencilik üretiyor. Çini tarafı el işi ve marka değeriyle, seramik tarafı hacimle satıyor.",
    demand:
      "El yapımı çini satan atölyenin sitesi bir vitrin değil, sipariş defteri. Ürünün üretim süresi, kişiye özel sipariş imkanı ve kargo bilgisi kararı belirliyor.",
    anchor:
      "Kütahya'da çini atölyeleri Instagram üzerinden satıyor ama tek tek fiyat sorusuna cevap yetiştiremiyor. Site, o tekrar eden yazışmayı üstlenen yer.",
    faq: {
      question: "Instagram'dan satış yapan atölyenin siteye geçmesi ne kazandırır?",
      answer:
        "Fiyat, ölçü ve teslim süresi sayfada durduğunda mesajların çoğu hazır cevaplanmış oluyor. Instagram keşfi sağlıyor, site kararı ve ödemeyi taşıyor. Sık gelen sorular için WhatsApp yanıtları da otomatikleştirilebilir, böylece atölye üretime dönüyor.",
    },
    faq2: {
      question:
        "Instagram'dan satıyoruz, siteye geçince takipçiyi kaybeder miyiz?",
      answer:
        "Kaybetmiyorsunuz, Instagram keşif kanalı olarak kalıyor. Değişen şey şu: fiyat, ölçü ve teslim süresi sayfada yazılı durunca mesajların çoğu zaten cevaplanmış oluyor ve siz üretime dönüyorsunuz. Profildeki bağlantı siteye gidiyor, sipariş orada tamamlanıyor ve müşteri kaydı sizde kalıyor.",
    },
    build:
      "Kütahya'da ürün ve desen sayfaları, kişiye özel sipariş yolu, üretim süresi ve kargo bilgisini taşıyan bir yapı kuruyoruz; sık gelen sorular için WhatsApp yanıtları kurulabiliyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["afyonkarahisar", "usak", "manisa", "balikesir", "bilecik", "eskisehir"],
  },
  {
    slug: "usak",
    name: "Uşak",
    plate: 64,
    region: "ege",
    tier: 3,
    angle: "sanayi",
    sectors: ["tekstil", "battaniye ve iplik", "deri", "seramik"],
    hubs: ["Uşak OSB", "Banaz", "Eşme", "Karahallı"],
    economy:
      "Battaniye ve geri dönüşüm ipliği üretiminde ülke ölçeğinde bilinen bir il. Deri işleme ve Eşme kilimi ikinci hattı kuruyor.",
    demand:
      "Toptan tekstil alıcısı desen, gramaj ve stok bilgisi arıyor. Koleksiyon fotoğrafı yeterli olmuyor; ölçü ve minimum sipariş yazılmadıkça talep gelmiyor.",
    anchor:
      "Uşak'ta üreticilerin çoğu aynı ürünü aynı görselle satıyor. Kendi ürün fotoğrafını çekip ölçüsünü yazan firma, katalogdan kopya çekenden ayrışıyor.",
    faq: {
      question: "Toptan tekstil satışında site siparişi nasıl hızlandırır?",
      answer:
        "Ürün grupları kendi sayfalarında, gramaj ve ölçü tablosuyla durur; teklif formu miktar ve teslim tarihini sorar. Alıcı ilk yazışmada eksik bilgi vermek zorunda kalmayınca fiyat aynı gün çıkıyor. Sık çalışılan bayiler için panelden görünen bir stok listesi de eklenebilir.",
    },
    faq2: {
      question:
        "Ürün fotoğraflarını tedarikçi kataloğundan alsak olur mu?",
      answer:
        "Olmuyor. Aynı görsel onlarca sitede duruyor ve arama motoru hangisinin kaynak olduğunu ayırt edemiyor; alıcı da aynı fotoğrafı gördüğü için firmayı ayırt edemiyor. Kendi ürününüzü kendi ışığınızda çekmek pahalı bir iş değil ve ölçü bilgisiyle birleştiğinde ayrışmayı tek başına sağlıyor.",
    },
    build:
      "Uşak'ta ürün grubu sayfaları, gramaj ve ölçü tabloları, miktar ve teslim tarihi soran teklif formu kuruyoruz; düzenli bayiler için panelden görünen stok listesi eklenebiliyor.",
    industries: ["manufacturing"],
    neighbors: ["manisa", "denizli", "afyonkarahisar", "kutahya"],
  },
];

const AKDENIZ: CityRecord[] = [
  {
    slug: "antalya",
    name: "Antalya",
    plate: 7,
    region: "akdeniz",
    tier: 1,
    angle: "turizm",
    sectors: ["turizm ve konaklama", "seracılık", "kesme çiçek", "inşaat"],
    hubs: ["Lara", "Belek", "Side", "Alanya", "Kaş"],
    economy:
      "Konaklama ilin en büyük işi, seracılık ve kesme çiçek ihracatı ikinci sırada. Turizm tarafında rekabet fiyatta değil, misafirin siteyi ne kadar hızlı anladığında yaşanıyor.",
    demand:
      "Otel ve villa işletmesinin ihtiyacı acenteye bağlı kalmadan talep toplamak. Emlak ve inşaat tarafında ise yabancı alıcıya Rusça, Almanca ve İngilizce anlatım gerekiyor.",
    anchor:
      "Antalya'da misafir siteyi çoğunlukla telefondan ve yurt dışı bağlantısıyla açıyor. Ağır açılan galeri, rezervasyonu kaybetmenin en sessiz yolu.",
    faq: {
      question: "Antalya'daki otelimiz acente komisyonunu nasıl azaltır?",
      answer:
        "Doğrudan rezervasyon yolu kurulur: oda tipleri kendi sayfalarında, konsept ve dahil hizmetler yazılı, talep formu tarih ve kişi sayısıyla WhatsApp'a bağlı. Acenteyi bırakmak gerekmiyor, doğrudan gelen misafire fark yaratan bir sebep vermek gerekiyor. Yabancı misafir için dil sürümleri ayrı yazılır.",
    },
    faq2: {
      question:
        "Yabancı misafir için hangi dilden başlamalıyız?",
      answer:
        "Geçen sezon en çok hangi ülkeden misafir geldiyse ondan. Rezervasyon kayıtlarınız bu soruyu zaten cevaplıyor. Tüm dilleri aynı anda açmak yerine tek dille başlayıp o pazarın arattığı terimlerle yazmak daha iyi sonuç veriyor; yarım kalmış üç dil, tamamlanmış bir dilden zayıf.",
    },
    build:
      "Antalya'da oda ve konsept sayfaları, dahil hizmetleri yazan bir yapı, tarih ve kişi sayısı soran talep formu ile Rusça, Almanca ve İngilizce sürümler kuruyoruz.",
    industries: ["hospitality", "local-services"],
    neighbors: ["mugla", "burdur", "isparta", "konya", "mersin", "karaman"],
  },
  {
    slug: "adana",
    name: "Adana",
    plate: 1,
    region: "akdeniz",
    tier: 1,
    angle: "sanayi",
    sectors: ["tarım ve gıda", "tekstil", "lojistik", "makine"],
    hubs: ["Seyhan", "Yüreğir", "Ceyhan", "Adana Hacı Sabancı OSB"],
    economy:
      "Çukurova tarımı, tekstil üretimi ve Ceyhan hattı lojistiği ilin üç kolu. Bölgesel ticaretin merkezi olduğu için çevre illerden de arama alıyor.",
    demand:
      "Adanalı firmanın müşterisi genellikle bölgesel: Mersin, Hatay, Osmaniye. Site, hizmet verilen illeri açıkça yazdığında o çevredeki aramalara da giriyor.",
    anchor:
      "Adana'da işletmeler bölgeye hizmet ettiğini biliyor ama sitesinde yalnızca kendi ilini yazıyor. Çevre illerdeki alıcı bu yüzden başkasını buluyor.",
    faq: {
      question: "Çevre illere de hizmet verdiğimizi siteye nasıl yansıtırız?",
      answer:
        "Hizmet bölgesi sayfada yazılı olmalı ve önemli iller için ayrı içerik açılmalı; bunlar il adı değişmiş kopyalar değil, o ildeki işin gerçek farkını anlatan sayfalar olmalı. Schema tarafında hizmet alanı işaretlenir. Google İşletme Profili'ndeki hizmet bölgesi ayarı da aynı listeyle tutulur.",
    },
    faq2: {
      question:
        "Tekstil ve gıda üretiminde ürün grubu başına sayfa açmak neden gerekli?",
      answer:
        "Alıcı ürün grubunu kendi adıyla arıyor ve tek bir üretim sayfası bu aramaların hiçbirine tam karşılık vermiyor. Grup başına sayfa açıldığında her biri kendi sorgusunda görünüyor. Ayrıca alıcı hangi grupta çalıştığınızı görmeden numune istemiyor; liste halinde sunulan ürünler bu kararı vermiyor.",
    },
    build:
      "Adana'da hizmet sayfaları, hizmet verilen illeri açıkça yazan bir bölge sayfası ve teklif formu kuruyoruz; üretim varsa ürün ailesi sayfaları ve kapasite bilgisi ekleniyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["mersin", "osmaniye", "hatay", "kahramanmaras", "nigde", "kayseri"],
  },
  {
    slug: "mersin",
    name: "Mersin",
    plate: 33,
    region: "akdeniz",
    tier: 1,
    angle: "ticaret",
    sectors: ["liman ve lojistik", "dış ticaret", "narenciye", "turizm"],
    hubs: ["Mersin Limanı", "Tarsus", "Erdemli", "Silifke"],
    economy:
      "Ülkenin en yoğun konteyner limanlarından biri ilin ekonomisini dış ticarete bağlıyor. Nakliye, gümrük müşavirliği ve ihracat firmaları aynı zincirde çalışıyor.",
    demand:
      "Lojistik ve gümrük firmasının sitesi hizmet listesi değil, süreç anlatımı olmak zorunda. Alıcı hangi belgeyi kimin hazırladığını ve süreyi öğrenmek istiyor.",
    anchor:
      "Mersin'de lojistik firmaları birbirine çok benzeyen siteler kullanıyor. Süreci adım adım yazan firma, aynı hizmeti listeleyen on firmadan ayrılıyor.",
    faq: {
      question: "Lojistik veya gümrük müşavirliği firması için nasıl içerik yazılmalı?",
      answer:
        "Hizmet başlıkları yerine süreçler yazılır: ihracat dosyası nasıl açılır, hangi belge ne zaman gerekir, gecikme nerede yaşanır. Bu içerik hem arama sonucunda hem yapay zeka yanıtlarında kaynak olarak alınıyor. Sonunda teklif isteme yolu net durmalı.",
    },
    faq2: {
      question:
        "Rakiplerimizin sitesi bizimkine çok benziyor, ne yapabiliriz?",
      answer:
        "Hepsi aynı hizmet listesini yayınladığı için benziyor. Süreci yazan firma tek başına ayrışıyor: alıcı hizmetin adını değil karşılaştığı sorunu arıyor ve o sorunun yazılı cevabını bulduğu yere yazıyor. Bu içerik yapay zeka yanıtlarında da kaynak olarak alınıyor, hizmet listesi alınmıyor.",
    },
    build:
      "Mersin'de hizmet listesi yerine süreç sayfaları kuruyoruz: ihracat dosyası nasıl açılıyor, hangi belge ne zaman gerekiyor, gecikme nerede yaşanıyor; sonunda teklif yolu duruyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["adana", "antalya", "karaman", "konya", "nigde"],
  },
  {
    slug: "hatay",
    name: "Hatay",
    plate: 31,
    region: "akdeniz",
    tier: 2,
    angle: "sanayi",
    sectors: ["demir-çelik", "gıda ve mutfak", "zeytin ve defne", "tarım"],
    hubs: ["İskenderun", "Antakya", "Dörtyol", "Payas"],
    economy:
      "İskenderun demir-çelik üretiminin merkezi; Antakya mutfağı ve zeytin üretimi ilin gıda tarafını kuruyor. Deprem sonrası yeniden kurulan işletmeler için görünürlük yeniden başlamak anlamına geliyor.",
    demand:
      "Yeniden açılan işletmenin ilk ihtiyacı doğrulanabilir olmak: adres, çalışma saati ve iletişim bilgisinin güncel ve tek yerde durması.",
    anchor:
      "Hatay'da eski adreste bulunan sayfalar hâlâ arama sonuçlarında duruyor. Yeni konumu ve durumu yazmayan işletme, kapalı sanıldığı için aranmıyor.",
    faq: {
      question: "Adres ve iletişim bilgisi değişen işletme arama sonuçlarını nasıl düzeltir?",
      answer:
        "Site üzerindeki bilgi güncellenir, Google İşletme Profili aynı bilgiyle eşitlenir ve eski adresin geçtiği sayfalar yönlendirilir. Ad, adres ve telefonun her yerde aynı yazılması yerel aramada tutarlılık sağlıyor. Eski sayfaları haritasız bırakmak birikmiş görünürlüğü kaybettiriyor.",
    },
    faq2: {
      question:
        "Eski adresimiz hâlâ aramada çıkıyor, nasıl düzeltilir?",
      answer:
        "Site üzerindeki bilgi güncelleniyor, Google İşletme Profili aynı bilgiyle eşitleniyor ve eski adresin geçtiği sayfalar yeni sayfaya yönlendiriliyor. Rehber sitelerdeki kayıtlar da tek tek düzeltiliyor; ad, adres ve telefon her yerde aynı yazılmadığı sürece yerel sıralama toparlanmıyor.",
    },
    build:
      "Hatay'da güncel adres, çalışma saati ve iletişim bilgisini tek yerde toplayan bir yapı kuruyoruz; sanayi tarafında kapasite ve belge sayfaları, gıda tarafında ürün sayfaları ekleniyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["osmaniye", "adana", "gaziantep", "kilis"],
  },
  {
    slug: "isparta",
    name: "Isparta",
    plate: 32,
    region: "akdeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["gül ve gülyağı", "halı", "elma", "orman ürünleri"],
    hubs: ["Keçiborlu", "Eğirdir", "Yalvaç", "Isparta OSB"],
    economy:
      "Gülyağı üretimi ili uluslararası kozmetik tedarik zincirine bağlıyor. Elma ve halı üretimi iç pazara çalışıyor.",
    demand:
      "Gül ürünü satan firmanın alıcısı yurt dışında ve analiz raporu, saflık oranı gibi teknik bilgi arıyor. Kozmetik tarafında ise perakende satış ayrı bir yol.",
    anchor:
      "Isparta'da gül ürünleri il adıyla birlikte aranıyor, ama üreticilerin çoğu kendi sitesi yerine pazaryerinde duruyor. Pazaryerinde marka kurulmuyor.",
    faq: {
      question: "Pazaryerinde satarken kendi sitemize geçmek ne değiştirir?",
      answer:
        "Pazaryeri müşteri listesini ve marka aramasını size bırakmıyor. Kendi sitenizde ürün adınızla indeksleniyorsunuz, müşteri verisi sizde kalıyor ve fiyat baskısı azalıyor. Pazaryerini kapatmak gerekmiyor; ikinci kanal olarak sürdürülüp trafik kendi adresinize yönlendirilebilir.",
    },
    faq2: {
      question:
        "Gülyağı ihracatında alıcı sayfada neye bakıyor?",
      answer:
        "Saflık oranı, analiz raporu, üretim yılı ve yıllık kapasiteye. Kozmetik alıcısı tedarikçiyi formülüne göre seçtiği için bu değerler yazılı olmadan numune aşamasına geçmiyor. Bu bilgiler İngilizce sürümde de aynı biçimde duruyor, çünkü alıcının büyük kısmı yurt dışında.",
    },
    build:
      "Isparta'da ürün sayfaları, analiz ve saflık bilgisi, ihracat için İngilizce sürüm ve perakende tarafında sipariş yolu kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["burdur", "afyonkarahisar", "konya", "antalya"],
  },
  {
    slug: "burdur",
    name: "Burdur",
    plate: 15,
    region: "akdeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["mermer", "süt ve hayvancılık", "tarım", "gıda"],
    hubs: ["Bucak", "Gölhisar", "Ağlasun", "Burdur OSB"],
    economy:
      "Mermer ocakları ihracata, süt üretimi ise ulusal gıda zincirlerine çalışıyor. İki iş kolu da hacimle satıyor, perakende ile ilgisi az.",
    demand:
      "Toptan çalışan üreticinin sitesinden beklenen şey kapasite ve süreklilik kanıtı. Alıcı tek seferlik parti değil, düzenli tedarik arıyor.",
    anchor:
      "Burdur'da üreticiler siteyi gereksiz görüyor çünkü müşteri tanıdıkla geliyor. Tanıdık zinciri bittiğinde aranabilir olmayan firma yeni alıcıya ulaşamıyor.",
    faq: {
      question: "Müşterisi tanıdık üzerinden gelen üretici siteden ne kazanır?",
      answer:
        "Yeni alıcı, referansla adınızı duysa bile internetten doğruluyor. Kapasite, ürün ve iletişim bilgisi kendi adresinizde durduğunda bu doğrulama sizin lehinize sonuçlanıyor. Site ayrıca fiyat sormak için arayanların yarısını peşinen cevaplayarak zaman kazandırıyor.",
    },
    faq2: {
      question:
        "Müşterimiz hep tanıdıktan geliyor, siteye gerek var mı?",
      answer:
        "Tanıdık zinciri bir yerde bitiyor. Referansla adınızı duyan yeni alıcı bile internetten doğruluyor ve karşılığını bulamadığında tereddüt ediyor. Site ayrıca fiyat sormak için arayanların yarısını peşinen cevaplayarak telefon trafiğini azaltıyor; kapasite ve teslim koşulu yazılı olduğunda uygun olmayan talep hiç gelmiyor.",
    },
    build:
      "Burdur'da kapasite, süreklilik ve teslim koşulunu öne alan sayfalar ile toptan talep formu kuruyoruz; ihracat varsa İngilizce sürüm ve analiz bilgisi ekleniyor.",
    industries: ["manufacturing"],
    neighbors: ["isparta", "antalya", "denizli", "afyonkarahisar", "mugla"],
  },
  {
    slug: "kahramanmaras",
    name: "Kahramanmaraş",
    plate: 46,
    region: "akdeniz",
    tier: 2,
    angle: "sanayi",
    sectors: ["tekstil ve iplik", "dondurma ve gıda", "metal", "tarım"],
    hubs: ["Kahramanmaraş OSB", "Elbistan", "Türkoğlu", "Onikişubat"],
    economy:
      "İplik ve tekstil üretimi ilin sanayi hacmini taşıyor; dondurma ise il adıyla anılan bir gıda markası kategorisi kurmuş durumda.",
    demand:
      "İplik üreticisi teknik alıcıya, dondurma ve gıda markası ise bayilik arayan girişimciye satıyor. İki satış yolu tek sitede ayrı sayfalarla kurulmalı.",
    anchor:
      "Kahramanmaraş'ta bayilik aramaları ürün aramalarından fazla. Bayilik koşullarını yazmayan marka, en hazır talebi cevapsız bırakıyor.",
    faq: {
      question: "Bayilik veren markanın sitesinde ne bulunmalı?",
      answer:
        "Bayilik koşulları, yatırım aralığı, verilen destek ve başvuru formu ayrı bir sayfada durmalı. Başvuru formu şehir, deneyim ve bütçe sorunca ilk eleme kendiliğinden oluyor. Mevcut bayi listesi ve bölge doluluk bilgisi de başvurunun kalitesini yükseltiyor.",
    },
    faq2: {
      question:
        "Bayilik başvurularının çoğu uygun değil, bunu nasıl filtreleriz?",
      answer:
        "Başvuru formu şehir, deneyim ve bütçe aralığını sorduğunda ilk eleme kendiliğinden oluyor. Bayilik koşullarının ve yatırım aralığının sayfada açıkça yazması da uygun olmayan başvuruyu daha gelmeden durduruyor. Bölge doluluk bilgisi eklendiğinde aynı şehirden gelen tekrarlı başvurular da azalıyor.",
    },
    build:
      "Kahramanmaraş'ta iplik tarafında teknik ürün sayfaları, gıda tarafında bayilik koşulları, yatırım aralığı ve başvuru formunu içeren ayrı bir sayfa kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["adana", "osmaniye", "gaziantep", "adiyaman", "malatya", "sivas", "kayseri"],
  },
  {
    slug: "osmaniye",
    name: "Osmaniye",
    plate: 80,
    region: "akdeniz",
    tier: 3,
    angle: "sanayi",
    sectors: ["demir-çelik", "yer fıstığı", "tarım", "lojistik"],
    hubs: ["Kadirli", "Düziçi", "Osmaniye OSB", "Bahçe"],
    economy:
      "Demir-çelik ve haddehane üretimi ilin sanayi tarafını, yer fıstığı ise tarımsal kimliğini kuruyor. Konum itibarıyla Adana ve Gaziantep hattının arasında çalışıyor.",
    demand:
      "Hurda, hadde ve profil satan firmada alıcı fiyat ve stok arıyor. Güncel olmayan liste, telefonu meşgul edip satışı yavaşlatıyor.",
    anchor:
      "Osmaniye'de firmalar Adana ve Gaziantep'ten de talep alıyor. Sayfada yalnızca il adı geçtiğinde o bölgesel talebin dışında kalınıyor.",
    faq: {
      question: "Stok ve fiyatı sık değişen firma sitesini nasıl güncel tutar?",
      answer:
        "Fiyat sayfaya sabitlenmez, güncel stok listesi panelden yönetilir ve teklif formuna bağlanır. Alıcıya günlük fiyat vermek yerine talep alıp aynı gün dönmek daha az risk taşıyor. Panel, ürün ve stok alanlarını sizin ekibinizin kullanacağı sadelikte kurulur.",
    },
    faq2: {
      question:
        "Fiyatlarımız günlük değişiyor, siteye fiyat yazmalı mıyız?",
      answer:
        "Yazmamalısınız. Sabit fiyat hem sizi bağlıyor hem de bir gün sonra yanlış oluyor. Bunun yerine güncel stok listesi panelden yönetiliyor ve teklif formuna bağlanıyor; alıcı ürünü ve miktarı seçip talep bırakıyor, siz aynı gün fiyatlıyorsunuz. Böylece telefon da fiyat sorusuyla dolmuyor.",
    },
    build:
      "Osmaniye'de ürün ve profil listesi sayfaları, panelden yönetilen güncel stok ve teklif formu kuruyoruz; hizmet bölgesi Adana ve Gaziantep hattını kapsayacak şekilde yazılıyor.",
    industries: ["manufacturing"],
    neighbors: ["adana", "hatay", "gaziantep", "kahramanmaras"],
  },
];

const IC_ANADOLU: CityRecord[] = [
  {
    slug: "ankara",
    name: "Ankara",
    plate: 6,
    region: "ic-anadolu",
    tier: 1,
    angle: "metropol",
    sectors: ["savunma sanayi", "yazılım", "kamu ihaleleri", "sağlık"],
    hubs: ["Çankaya", "OSTİM", "Sincan", "Teknokent", "Yenimahalle"],
    economy:
      "Kamu kurumları, savunma sanayi ve teknokent ekosistemi ilin ekonomisini kurumsal alıcıya bağlıyor. OSTİM tarafında ise binlerce küçük imalatçı yan yana çalışıyor.",
    demand:
      "Kamu ve savunma tedarik zincirinde çalışan firmanın sitesi bir yeterlilik dosyası gibi okunuyor. Kapasite, belge ve referans yapısı görünür olmalı.",
    anchor:
      "Ankara'da alıcı çoğu zaman kurumsal bir satın alma birimi. Kişisel üsluba dayanan tanıtım metni burada güven kazandırmıyor, doğrulanabilir bilgi kazandırıyor.",
    faq: {
      question: "OSTİM'deki imalatçı firmamız için nasıl bir site doğru?",
      answer:
        "Yaptığınız işi ürün değil yetenek olarak anlatan bir yapı doğru oluyor: hangi tezgahlar, hangi tolerans, hangi malzeme, hangi kapasite. Alıcı parça çizimiyle geliyor ve uygunluğu arıyor. Teklif formuna teknik resim yükleme alanı eklenmesi yazışmayı tek tura indiriyor.",
    },
    faq2: {
      question:
        "OSTİM'de yüzlerce benzer atölye var, aramada nasıl öne çıkarız?",
      answer:
        "Ürün değil yetenek yazarak. Alıcı parça çizimiyle geliyor ve tezgah, tolerans, malzeme uygunluğunu arıyor; genel bir imalat tanıtımı bu aramaların hiçbirine girmiyor. İşleyebildiğiniz malzeme ve tolerans aralığı sayfada yazılı olduğunda dar ama niyeti belli aramalarda karşılığınız oluyor.",
    },
    build:
      "Ankara'da yetenek odaklı sayfalar kuruyoruz: makine parkı, tolerans aralığı, işlenebilir malzemeler, kalite belgeleri ve teknik resim yüklenebilen teklif formu.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["kirikkale", "eskisehir", "konya", "cankiri", "bolu", "kirsehir", "aksaray"],
  },
  {
    slug: "konya",
    name: "Konya",
    plate: 42,
    region: "ic-anadolu",
    tier: 1,
    angle: "sanayi",
    sectors: ["tarım makineleri", "otomotiv yan sanayi", "döküm", "gıda"],
    hubs: ["Konya OSB", "Selçuklu", "Ereğli", "Akşehir"],
    economy:
      "Tarım makineleri üretiminde ülke ölçeğinde belirleyici bir il. Döküm ve otomotiv yan sanayi ihracatı taşıyor, gıda tarafı ise ulusal markalar çıkarıyor.",
    demand:
      "Tarım makinesi alıcısı modeli, kapasiteyi ve yedek parça durumunu arıyor. Bayi ağı olan üreticinin sitesi hem son kullanıcıya hem bayiye aynı anda cevap vermeli.",
    anchor:
      "Konya'da üreticiler ihracata açılıyor ama sitelerinin İngilizce sürümü çoğu zaman makine çevirisi. Yanlış teknik terim, ciddi alıcıyı ilk sayfada kaybettiriyor.",
    faq: {
      question: "Tarım makinesi üreticisi ihracat için siteyi nasıl hazırlar?",
      answer:
        "İngilizce sürüm sektörün kullandığı terimlerle yazılır, makine çevirisiyle değil. Her makine modeli kendi sayfasında teknik tablosuyla durur; yedek parça ve servis bilgisi ayrı bir başlık olur. Video ve ölçü dosyaları sayfayı ağırlaştırmayacak biçimde sunulur.",
    },
    faq2: {
      question:
        "İngilizce sitemiz var ama yurt dışından talep gelmiyor, sebebi ne olabilir?",
      answer:
        "Genellikle çeviri. Makine adları sektörün kullandığı karşılıkla yazılmadığında alıcının araması sayfaya hiç ulaşmıyor. İkinci sebep yapı: tüm makineler tek sayfada duruyorsa arama motoru modelleri ayrı ayrı indeksleyemiyor. Model başına sayfa ve doğru terim, çoğu durumda tek başına fark yaratıyor.",
    },
    build:
      "Konya'da makine modeli başına teknik tablo taşıyan sayfalar, yedek parça ve servis bölümü ile sektör terimleriyle yazılmış İngilizce sürüm kuruyoruz.",
    industries: ["manufacturing"],
    neighbors: ["ankara", "aksaray", "karaman", "isparta", "afyonkarahisar", "nigde", "antalya", "mersin", "eskisehir", "kirsehir"],
  },
  {
    slug: "kayseri",
    name: "Kayseri",
    plate: 38,
    region: "ic-anadolu",
    tier: 1,
    angle: "sanayi",
    sectors: ["mobilya", "çelik kapı", "gıda", "tekstil"],
    hubs: ["Kayseri OSB", "Hacılar", "Melikgazi", "Develi"],
    economy:
      "Mobilya ve çelik kapı üretiminde ülke ölçeğinde önde gelen il. Üretimin büyük kısmı bayi ağıyla, bir kısmı doğrudan ihracatla satılıyor.",
    demand:
      "Mobilya üreticisinin sitesinde koleksiyon, ölçü ve kumaş seçenekleri aranıyor. Bayi tarafında ise fiyat listesine erişim ayrı bir yol olmalı.",
    anchor:
      "Kayseri'de mobilya firmaları ürünü katalogla satıyor ama katalog PDF olarak konulduğunda arama motoru içindeki ürünleri hiç görmüyor.",
    faq: {
      question: "Mobilya kataloğu siteye PDF olarak konabilir mi?",
      answer:
        "PDF ek olarak durabilir ama tek kaynak olmamalı. Her koleksiyon ve ürün kendi sayfasında, ölçü ve seçenekleriyle yayınlanmalı; aksi halde ürünler arama sonuçlarında hiç görünmüyor. Bayiler için şifreli fiyat listesi ayrı bir alan olarak kurulabilir.",
    },
    faq2: {
      question:
        "Kataloğumuz PDF olarak sitede duruyor, bu yeterli değil mi?",
      answer:
        "Değil. PDF içindeki ürünler arama sonuçlarında tek tek görünmüyor, yani ürünleriniz aranıyor ama sayfanız çıkmıyor. Katalog ek olarak kalabilir; asıl yapı her koleksiyonun kendi sayfasında ölçü ve seçenekleriyle yayınlanması. Bu yapı kurulduğunda PDF'i güncellemek de zorunlu olmaktan çıkıyor.",
    },
    build:
      "Kayseri'de koleksiyon ve ürün sayfaları, ölçü ile seçenek tabloları, bayiler için şifreli fiyat alanı ve ekibin ürün ekleyeceği panel kuruyoruz.",
    industries: ["furniture", "manufacturing"],
    neighbors: ["nevsehir", "sivas", "nigde", "adana", "kahramanmaras", "yozgat", "kirsehir"],
  },
  {
    slug: "eskisehir",
    name: "Eskişehir",
    plate: 26,
    region: "ic-anadolu",
    tier: 2,
    angle: "sanayi",
    sectors: ["havacılık", "seramik ve refrakter", "lületaşı", "üniversite ekonomisi"],
    hubs: ["Eskişehir OSB", "Tepebaşı", "Odunpazarı", "Teknopark"],
    economy:
      "Havacılık ve raylı sistem sanayii ile seramik üretimi ilin sanayisini kuruyor. Öğrenci nüfusu ise perakende ve hizmet tarafında ayrı bir pazar yaratıyor.",
    demand:
      "Sanayi firması teknik alıcıya, öğrenciye satan işletme ise mobil ve hızlı bir sayfaya ihtiyaç duyuyor. İki kitlenin site beklentisi neredeyse zıt.",
    anchor:
      "Eskişehir'de öğrenciye satan işletme kararı telefonda veriyor. Menü veya fiyatı görsel olarak koyan sayfa, aramada hiç okunamıyor.",
    faq: {
      question: "Menü ve fiyatı görsel yerine metin olarak koymak neden önemli?",
      answer:
        "Arama motorları ve yapay zeka yanıtları görselin içindeki yazıyı güvenilir biçimde okuyamıyor. Menü metin olarak yazıldığında ürün adlarıyla aranabiliyor ve sesli aramada da karşılık buluyor. Görsel menü ek olarak durabilir, tek kaynak olmamalı.",
    },
    faq2: {
      question:
        "Öğrenciye satan işletmede sitenin en kritik özelliği ne?",
      answer:
        "Mobilde açılma hızı. Karar telefonda ve genellikle yürürken veriliyor; üç saniyede açılmayan sayfa kapatılıyor. İkinci sırada konum ve çalışma saatinin doğruluğu geliyor. Tasarımın etkisi bu ikisinden sonra başlıyor, öncesinde değil.",
    },
    build:
      "Eskişehir'de sanayi tarafında teknik yetenek sayfaları, öğrenciye satan işletmelerde ise metin olarak yazılmış menü, konum ve hızlı açılan mobil bir yapı kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["ankara", "bilecik", "kutahya", "afyonkarahisar", "konya", "cankiri"],
  },
  {
    slug: "sivas",
    name: "Sivas",
    plate: 58,
    region: "ic-anadolu",
    tier: 3,
    angle: "sanayi",
    sectors: ["demir-çelik", "madencilik", "doğal taş", "tarım ve hayvancılık"],
    hubs: ["Sivas OSB", "Şarkışla", "Divriği", "Zara"],
    economy:
      "Demir cevheri ve doğal taş çıkarımı ilin sanayi kimliğini kuruyor; hayvancılık ve tarım geniş kırsalda çalışıyor.",
    demand:
      "Doğal taş ve maden firmasının alıcısı yurt dışında. Ocak bilgisi, analiz raporu ve nakliye koşulu sayfada olmadığında yazışma çok uzuyor.",
    anchor:
      "Sivas'ta firmalar coğrafi uzaklığı dezavantaj sanıyor. Alıcı için asıl belirsizlik mesafe değil, nakliye ve teslim şartının yazılı olmaması.",
    faq: {
      question: "Nakliyesi zor ürün satan firma siteyle ne kazanır?",
      answer:
        "Teslim koşulunu, nakliye sorumluluğunu ve minimum parti büyüklüğünü peşinen yazdığınızda uzaktaki alıcı tereddüdü kalmıyor. Bu bilgi olmayınca alıcı hesap yapmak yerine yakındaki tedarikçiye dönüyor. Yazılı koşul, mesafeyi bir soru olmaktan çıkarıyor.",
    },
    faq2: {
      question:
        "Uzaklığımız alıcıyı caydırıyor mu?",
      answer:
        "Caydıran mesafe değil belirsizlik. Alıcı nakliyenin kime ait olduğunu, minimum parti büyüklüğünü ve teslim süresini bilmediğinde hesap yapmak yerine yakındaki tedarikçiye dönüyor. Bu üç bilgi sayfada yazılı olduğunda mesafe bir soru olmaktan çıkıyor ve teklif karşılaştırması fiyat üzerinden yürüyor.",
    },
    build:
      "Sivas'ta ocak ve ürün bilgisi, analiz raporu, nakliye ile teslim koşulunu yazan sayfalar kuruyoruz; ihracat varsa İngilizce sürüm aynı yapıda çıkıyor.",
    industries: ["manufacturing"],
    neighbors: ["kayseri", "yozgat", "tokat", "erzincan", "malatya", "kahramanmaras", "ordu", "giresun"],
  },
  {
    slug: "yozgat",
    name: "Yozgat",
    plate: 66,
    region: "ic-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["tarım", "hayvancılık", "termal turizm", "gıda"],
    hubs: ["Sorgun", "Boğazlıyan", "Sarıkaya", "Akdağmadeni"],
    economy:
      "Tahıl tarımı ve hayvancılık ilin ana geliri; Sarıkaya ve Sorgun termal tesisleri bölgesel turizm getiriyor.",
    demand:
      "Tarım ve hayvancılıkta çalışan işletmenin sitesi ürün satışından çok tedarikçi doğrulaması için gerekiyor. Kapasite ve iletişim bilgisi güncel durmalı.",
    anchor:
      "Yozgat'ta işletmelerin çoğu bölgesel çalışıyor ve sitesini yıllarca güncellemiyor. Eski telefon numarası duran sayfa, olmayan sayfadan daha zararlı.",
    faq: {
      question: "Yıllardır güncellenmemiş bir site yenilenmeli mi, sıfırdan mı kurulmalı?",
      answer:
        "Eski adreslerin birikmiş görünürlüğü varsa korunur: URL eşlemesi yapılır, yönlendirmeler kurulur, sonra tasarım ve içerik yenilenir. Sıfırdan kurup eski adresleri haritasız bırakmak o birikimi 404 sayfalarına veriyor. Karar, mevcut sayfaların aranıp aranmadığına bakılarak veriliyor.",
    },
    faq2: {
      question:
        "Eski sitemiz duruyor ama çok eski, yenilemeli miyiz yoksa kapatmalı mıyız?",
      answer:
        "Önce hangi sayfalarının hâlâ arandığına bakılıyor. Arama sonuçlarında yer alan sayfalar varsa adresleri korunuyor ve yeni yapıya yönlendiriliyor; yoksa sıfırdan kurmak daha ucuz oluyor. Kapatıp haritasız bırakmak en kötüsü: yıllarca birikmiş görünürlük 404 sayfalarına gidiyor.",
    },
    build:
      "Yozgat'ta hizmet ve kapasite sayfaları ile güncel iletişim bilgisini taşıyan sade bir yapı kuruyoruz; mevcut site varsa önce korunacak adresler çıkarılıyor.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["sivas", "kayseri", "kirsehir", "corum", "tokat", "kirikkale", "nevsehir"],
  },
  {
    slug: "aksaray",
    name: "Aksaray",
    plate: 68,
    region: "ic-anadolu",
    tier: 3,
    angle: "sanayi",
    sectors: ["otomotiv üretimi", "tarım", "hayvancılık", "gıda"],
    hubs: ["Aksaray OSB", "Ortaköy", "Eskil", "Güzelyurt"],
    economy:
      "Ağır ticari araç üretimi ilin sanayi kimliğini kuruyor; çevresinde yan sanayi ve servis ağı gelişmiş durumda. Tarım ve hayvancılık geniş alanda sürüyor.",
    demand:
      "Yan sanayi ve servis firmasının sitesinde marka, model ve parça uyumluluğu aranıyor. Uyumluluk listesi olmayan sayfa aramada hiç karşılık bulmuyor.",
    anchor:
      "Aksaray'da parça ve servis aramaları marka adıyla yapılıyor. Kendi sayfasında yalnızca genel ifadeler kullanan firma, o aramaların hiçbirine girmiyor.",
    faq: {
      question: "Yedek parça satan firma hangi sayfaları açmalı?",
      answer:
        "Marka ve model bazında sayfalar açılmalı, parça uyumluluğu tabloyla verilmeli. Alıcı genel bir parça kategorisi değil, kendi aracının modelini arıyor. Stok sık değiştiği için liste panelden yönetilir ve teklif formuna bağlanır.",
    },
    faq2: {
      question:
        "Parça uyumluluğunu siteye nasıl yazıyorsunuz?",
      answer:
        "Marka ve model bazında tablo olarak. Alıcı genel bir parça kategorisi değil kendi aracının modelini arıyor; uyumluluk yazılı olmadığında telefonla teyit etmek zorunda kalıyor ve çoğu bunu yapmıyor. Tablo panelden güncelleniyor, yeni model çıktığında sayfa yeniden yapılmıyor.",
    },
    build:
      "Aksaray'da marka ve model bazında parça sayfaları, uyumluluk tabloları ve panelden yönetilen stok listesi kuruyoruz; teklif formu araç modeli soruyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["konya", "nigde", "nevsehir", "kirsehir", "ankara"],
  },
  {
    slug: "karaman",
    name: "Karaman",
    plate: 70,
    region: "ic-anadolu",
    tier: 3,
    angle: "sanayi",
    sectors: ["bisküvi ve gıda sanayii", "elma", "tarım", "lojistik"],
    hubs: ["Karaman OSB", "Ermenek", "Ayrancı", "Sarıveliler"],
    economy:
      "Bisküvi ve şekerleme üretiminde ülke ölçeğinde yoğunlaşmış bir il. Elma üretimi ve soğuk hava depoculuğu ikinci hattı kuruyor.",
    demand:
      "Gıda üreticisinin sitesinde helal, ISO ve ihracat belgeleri ile üretim kapasitesi aranıyor. Fason üretim yapıyorsanız bu ayrı bir sayfa olmalı.",
    anchor:
      "Karaman'da fason üretim talebi yurt dışından geliyor ama firmaların çoğu fason kapasitesini sitesinde hiç yazmıyor.",
    faq: {
      question: "Fason üretim yapan gıda firması siteyi nasıl kullanmalı?",
      answer:
        "Fason üretim ayrı bir sayfada anlatılır: hangi ürün grupları, hangi ambalaj tipleri, minimum parti ve sertifikalar. Alıcı marka değil kapasite arıyor. İngilizce sürüm bu sayfa için özellikle gerekiyor, çünkü fason talebinin çoğu yurt dışı kaynaklı.",
    },
    faq2: {
      question:
        "Fason kapasitemizi sitede yazmak rakiplere bilgi vermek olmuyor mu?",
      answer:
        "Rakip zaten sektörü biliyor; bilmeyen taraf alıcı. Kapasitesini yazmayan firma yurt dışından gelen fason talebinin listesine hiç girmiyor, çünkü alıcı marka değil uygunluk arıyor. Yazılan şey müşteri listesi veya fiyat değil, üretebildiğiniz ürün grubu ve parti aralığı; bu bilgi rekabet avantajı değil giriş şartı.",
    },
    build:
      "Karaman'da fason üretim için ayrı bir sayfa kuruyoruz: ürün grupları, ambalaj tipleri, minimum parti ve sertifikalar; İngilizce sürüm bu sayfayla birlikte çıkıyor.",
    industries: ["manufacturing"],
    neighbors: ["konya", "mersin", "antalya"],
  },
  {
    slug: "kirikkale",
    name: "Kırıkkale",
    plate: 71,
    region: "ic-anadolu",
    tier: 3,
    angle: "sanayi",
    sectors: ["savunma sanayi", "petrokimya", "makine", "metal işleme"],
    hubs: ["Kırıkkale OSB", "Yahşihan", "Keskin", "Delice"],
    economy:
      "Savunma sanayi tesisleri ve rafineri ilin sanayi omurgasını kuruyor. Çevresinde makine ve metal işleme atölyeleri yoğunlaşmış durumda.",
    demand:
      "Tedarik zincirinde çalışan atölyenin sitesi bir yeterlilik dosyası gibi okunuyor: tezgah listesi, tolerans, kalite belgesi.",
    anchor:
      "Kırıkkale'de atölyeler işi tanıdıkla alıyor. Yeni bir ana yükleniciye girmek isteyen firma, kapasitesini yazılı gösteremediğinde listeye alınmıyor.",
    faq: {
      question: "Tedarikçi listesine girmek için sitede ne bulunmalı?",
      answer:
        "Makine parkı, işlenebilir malzemeler, tolerans aralığı, kalite belgeleri ve teslim süresi yazılı olmalı. Satın alma birimleri ön elemeyi internetten yapıyor. Belgelerin görünür ve tarihli durması, doğrulama adımını kısaltıyor.",
    },
    faq2: {
      question:
        "Kalite belgelerimizi siteye koymak gerekli mi?",
      answer:
        "Gerekli. Satın alma birimleri ön elemeyi internetten yapıyor ve belge göremediğinde firmayı listeye almıyor. Belgenin görselini koymak yeterli değil; hangi belge, hangi kapsam ve hangi tarihe kadar geçerli bilgisi metin olarak yazılıyor. Süresi geçmiş belge bırakmak güven kaybettirdiği için panelden güncelleniyor.",
    },
    build:
      "Kırıkkale'de makine parkı, tolerans, malzeme ve kalite belgelerini tarihli olarak gösteren sayfalar ile teknik resim yüklenebilen teklif formu kuruyoruz.",
    industries: ["manufacturing"],
    neighbors: ["ankara", "kirsehir", "yozgat", "corum", "cankiri"],
  },
  {
    slug: "kirsehir",
    name: "Kırşehir",
    plate: 40,
    region: "ic-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["tarım", "hayvancılık", "jeotermal", "halıcılık"],
    hubs: ["Kaman", "Mucur", "Çiçekdağı", "Akpınar"],
    economy:
      "Tahıl tarımı ve hayvancılık ilin ana geliri; Kaman cevizi ve jeotermal kaynaklar ayrı birer kalem olarak duruyor.",
    demand:
      "Yerel üreticinin sitesi genellikle tek bir ürünü ulusal pazara açmak için gerekiyor. Kargo, paketleme ve sipariş yolu belirleyici oluyor.",
    anchor:
      "Kırşehir'de coğrafi işaretli ürünler var ama üreticiler bu adı kendi sayfa başlığında kullanmıyor. Ürünün tescilli adı en güçlü arama terimi.",
    faq: {
      question: "Coğrafi işaretli ürün satan üretici bunu siteye nasıl yansıtır?",
      answer:
        "Tescilli ad sayfa başlığında ve ürün adında geçmeli, tescil bilgisi ise ürün sayfasında doğrulanabilir biçimde durmalı. Bu ad genellikle en yüksek arama hacmine sahip terim oluyor. Ürünün üretim yöntemi anlatıldığında yapay zeka yanıtları da sayfayı kaynak alabiliyor.",
    },
    faq2: {
      question:
        "Kaman cevizi gibi bir ürünü kargoyla satmaya başlarken ne gerekiyor?",
      answer:
        "Ürün sayfası, paket seçenekleri, saklama koşulu ve kargo bilgisi. Alıcının tereddüdü genellikle ürünün yolda zarar görmesi oluyor, o yüzden ambalaj yöntemi yazılıyor. Ödeme sistemi ilk sürümde şart değil; sipariş WhatsApp üzerinden de alınabiliyor ve hacim büyüdüğünde sepet ekleniyor.",
    },
    build:
      "Kırşehir'de ürünün tescilli adını başlıkta taşıyan sayfalar, üretim yöntemi anlatımı ve kargo ile sipariş yolu kuruyoruz.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["kirikkale", "yozgat", "nevsehir", "aksaray", "ankara", "kayseri", "konya"],
  },
  {
    slug: "nevsehir",
    name: "Nevşehir",
    plate: 50,
    region: "ic-anadolu",
    tier: 2,
    angle: "turizm",
    sectors: ["turizm ve konaklama", "balon işletmeciliği", "şarapçılık", "patates"],
    hubs: ["Ürgüp", "Göreme", "Avanos", "Uçhisar"],
    economy:
      "Kapadokya bölgesi ili tamamen uluslararası turizme bağlıyor. Mağara otelleri, balon turları ve şaraphaneler aynı misafire satıyor.",
    demand:
      "Mağara otelinin misafiri çoğunlukla yurt dışından ve rezervasyonu aylar önce yapıyor. Site, fotoğrafın ötesinde oda tipi ve manzara farkını anlatmalı.",
    anchor:
      "Nevşehir'de misafir oteli değil deneyimi arıyor: balon manzaralı oda, gün doğumu terası. Bu farkı yazmayan otel, aynı fiyat aralığında ayrışamıyor.",
    faq: {
      question: "Kapadokya'daki otelimiz yabancı misafire nasıl ulaşır?",
      answer:
        "İngilizce başta olmak üzere dil sürümleri ayrı yazılır ve o pazarın arattığı terimler kullanılır. Oda tipleri manzara ve konum farkıyla ayrı sayfalarda durur; balon, tur ve transfer bilgisi ayrı içerik olur. Doğrudan rezervasyon talebi WhatsApp'a bağlanınca platform komisyonu azalıyor.",
    },
    faq2: {
      question:
        "Odalarımız benzer, fiyat farkını misafire nasıl anlatırız?",
      answer:
        "Farkın kaynağını yazarak: hangi odadan balonlar görünüyor, hangisi terasa açılıyor, hangisi kaç katta. Misafir fiyat farkının sebebini göremediğinde en ucuzu seçiyor veya vazgeçiyor. Her oda tipinin kendi sayfası ve kendi fotoğraf setiyle durması, aynı tesiste ortalama rezervasyon tutarını doğrudan etkiliyor.",
    },
    build:
      "Nevşehir'de oda tiplerini manzara ve konum farkıyla ayıran sayfalar, balon ve transfer içerikleri, WhatsApp'a bağlı rezervasyon talebi ve İngilizce sürüm kuruyoruz.",
    industries: ["hospitality", "local-services"],
    neighbors: ["kayseri", "aksaray", "nigde", "kirsehir", "yozgat"],
  },
  {
    slug: "nigde",
    name: "Niğde",
    plate: 51,
    region: "ic-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["patates", "elma", "soğuk hava deposu", "madencilik"],
    hubs: ["Bor", "Çiftlik", "Ulukışla", "Niğde OSB"],
    economy:
      "Patates ve elma üretimi ile soğuk hava depoculuğu ilin tarımsal ekonomisini kuruyor. Depolama kapasitesi bölgesel ticaretin merkezine oturtuyor.",
    demand:
      "Depo ve toptan satış yapan firmanın sitesi kapasite, ürün ve dönem bilgisini taşımalı. Alıcı sezon boyu değişen stoğu görmek istiyor.",
    anchor:
      "Niğde'de alıcı ürünü değil dönemi soruyor: hangi ay hangi kalibre var. Sezon takvimini yazan firma tekrar eden telefonlardan kurtuluyor.",
    faq: {
      question: "Sezona bağlı ürün satan firma sitesini nasıl kurgular?",
      answer:
        "Ürün sayfasında sezon takvimi ve kalibre bilgisi durur, güncel stok panelden yönetilir. Sezon dışında sayfayı kaldırmak yerine bir sonraki dönem bilgisi bırakılır; böylece sayfa indekste kalır. Alıcı, aramayı sezondan önce yapıyor.",
    },
    faq2: {
      question:
        "Sezon bitince ürün sayfalarını kaldırmalı mıyız?",
      answer:
        "Kaldırmamalısınız. Sayfa silindiğinde biriken görünürlük de gidiyor ve gelecek sezon sıfırdan başlıyorsunuz. Sayfa yayında kalıp bir sonraki dönem bilgisi ve ön sipariş yolu ekleniyor. Alıcı zaten aramayı sezondan önce yapıyor; hazır duran sayfa o aramayı karşılıyor.",
    },
    build:
      "Niğde'de sezon takvimi ve kalibre bilgisi taşıyan ürün sayfaları ile panelden yönetilen stok listesi kuruyoruz; toptan talep formu miktar ve teslim bölgesini soruyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["nevsehir", "aksaray", "konya", "adana", "mersin", "kayseri"],
  },
  {
    slug: "cankiri",
    name: "Çankırı",
    plate: 18,
    region: "ic-anadolu",
    tier: 3,
    angle: "hizmet",
    sectors: ["kaya tuzu", "orman ürünleri", "tarım", "madencilik"],
    hubs: ["Çerkeş", "Ilgaz", "Şabanözü", "Korgun"],
    economy:
      "Kaya tuzu madenciliği ilin en bilinen işi; orman ürünleri ve tarım kırsal ekonomiyi taşıyor. Ankara'ya yakınlık hizmet talebini de yönlendiriyor.",
    demand:
      "Küçük ölçekli işletmenin sitesi yerel aramada bulunmak için var. Hizmet, çalışma saati ve iletişim yolu doğru yazıldığında aramanın önemli kısmı karşılanıyor.",
    anchor:
      "Çankırı'da talebin önemli kısmı Ankara'dan geliyor. Hizmet bölgesini yazmayan işletme, bir saat mesafedeki bu alıcıya hiç görünmüyor.",
    faq: {
      question: "Rekabetin az olduğu ilde site kurmak avantaj sağlar mı?",
      answer:
        "Sağlıyor. Aynı hizmeti veren firmaların çoğunun sayfası yoksa, doğru kurulmuş tek bir site aramanın üstünde uzun süre kalıyor. Maliyeti de düşük oluyor çünkü sürekli içerik üretmeye gerek kalmıyor. Hizmet sayfaları ve güncel iletişim bilgisi yeterli olabiliyor.",
    },
    faq2: {
      question:
        "Ankara'dan gelen talebi yakalamak için ne yapılmalı?",
      answer:
        "Hizmet bölgesinin sayfada yazılı olması ve yapılandırılmış veride işaretlenmesi. Ankara'daki alıcı kendi ilinin adıyla tedarikçi arıyor; sizin adınız o aramada geçmediğinde mesafe kısa olsa bile listeye girmiyorsunuz. Teslim süresi ve nakliye koşulunun yazılması da kararı hızlandırıyor.",
    },
    build:
      "Çankırı'da hizmet sayfaları, çalışma bölgesi ve güncel iletişim bilgisini taşıyan sade bir yapı kuruyoruz; Ankara'dan gelen talep varsa bölge bilgisi ayrıca yazılıyor.",
    industries: ["local-services"],
    neighbors: ["ankara", "kirikkale", "corum", "kastamonu", "karabuk", "bolu"],
  },
];

const KARADENIZ: CityRecord[] = [
  {
    slug: "samsun",
    name: "Samsun",
    plate: 55,
    region: "karadeniz",
    tier: 1,
    angle: "ticaret",
    sectors: ["tıbbi cihaz üretimi", "tarım ve gıda", "liman ve lojistik", "bölgesel ticaret"],
    hubs: ["Samsun OSB", "Bafra", "Çarşamba", "Atakum"],
    economy:
      "Tıbbi cihaz üretiminde ülke ölçeğinde bilinen bir yoğunlaşma var; liman ve tarım ise bölgesel ticareti taşıyor. Karadeniz'in ticari merkezi olduğu için çevre illerden talep alıyor.",
    demand:
      "Tıbbi cihaz üreticisinin sitesi belge ve sertifika ağırlıklı okunuyor. Bölgesel ticaret yapan firma ise hizmet verdiği illeri yazmak zorunda.",
    anchor:
      "Samsun'da firmalar Ordu'dan Sinop'a kadar geniş bir alana satıyor ama sitede yalnızca il adı geçiyor. Bölgesel hizmet yazılmadığında çevre illerdeki arama kaçıyor.",
    faq: {
      question: "Tıbbi cihaz veya sağlık ürünü satan firmanın sitesinde nelere dikkat edilir?",
      answer:
        "Ürün sayfalarında belge ve onay bilgisi doğrulanabilir biçimde durmalı, sağlık iddiası içeren metinden kaçınılmalı. Kurumsal alıcı ihale dosyası hazırlarken sitenizi kaynak alıyor. Teknik doküman indirme alanı ve iletişim yolu ayrı ayrı kurulur.",
    },
    faq2: {
      question:
        "İhale dosyası hazırlayan kurumlar sitemize bakıyor, neye dikkat etmeliyiz?",
      answer:
        "Belge ve onay bilgisinin tarihli, kapsamıyla birlikte ve metin olarak durmasına. Görsel içine gömülü belge okunamıyor. Teknik dokümanların indirilebilir olması da dosya hazırlayanın işini kısaltıyor. Sağlık iddiası içeren ifadelerden kaçınılıyor; ürünün ne olduğu tarif ediliyor, ne yaptığı iddia edilmiyor.",
    },
    build:
      "Samsun'da belge ve onay bilgisini doğrulanabilir biçimde gösteren ürün sayfaları, teknik doküman indirme alanı ve hizmet bölgesini yazan bir yapı kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["ordu", "amasya", "corum", "sinop", "tokat"],
  },
  {
    slug: "trabzon",
    name: "Trabzon",
    plate: 61,
    region: "karadeniz",
    tier: 2,
    angle: "ticaret",
    sectors: ["fındık", "liman ve lojistik", "turizm", "balıkçılık"],
    hubs: ["Ortahisar", "Akçaabat", "Of", "Maçka"],
    economy:
      "Fındık ticareti ve liman ilin ekonomisini kuruyor; Uzungöl ve Sümela çevresinde gelişen turizm ise Körfez ülkelerinden misafir çekiyor.",
    demand:
      "Turizm tarafında Arapça talep belirgin. Konaklama ve tur işletmesinin Arapça sürümü yoksa bu talebin çoğu acenteye gidiyor.",
    anchor:
      "Trabzon'da yaz aylarındaki misafir profili Türkiye'nin geri kalanından farklı. Aynı siteyi tüm pazara aynı dille sunan işletme, en yüksek harcayan grubu kaçırıyor.",
    faq: {
      question: "Körfez ülkelerinden gelen misafire ulaşmak için ne gerekiyor?",
      answer:
        "Arapça sürüm ve o pazarın aradığı terimlerle yazılmış içerik gerekiyor; tesis olanakları, mahremiyet ve aile uygunluğu gibi bilgiler açıkça yazılmalı. WhatsApp üzerinden Arapça yanıt verebilen bir yol da talebi doğrudan alıyor. Dil sürümleri arasında hreflang kurulmadığında arama motoru doğru sürümü göstermiyor.",
    },
    faq2: {
      question:
        "Arapça sayfa açtık ama talep gelmedi, eksik ne?",
      answer:
        "Çoğunlukla iki şey. Birincisi çeviri: sayfa Türkçeden birebir çevrildiğinde o pazarın arattığı terimler geçmiyor. İkincisi yanıt: Arapça sayfadan gelen mesaja Türkçe dönülünce yazışma orada bitiyor. Dil sürümü ile o dilde yanıt verebilen bir yol birlikte kurulmadığında sayfa tek başına çalışmıyor.",
    },
    build:
      "Trabzon'da konaklama ve tur sayfalarını Arapça sürümle birlikte kuruyoruz; tesis olanakları ve aile uygunluğu açıkça yazılıyor, talep WhatsApp'a bağlanıyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["rize", "giresun", "gumushane", "bayburt", "artvin"],
  },
  {
    slug: "ordu",
    name: "Ordu",
    plate: 52,
    region: "karadeniz",
    tier: 2,
    angle: "tarim",
    sectors: ["fındık", "balıkçılık", "turizm", "gıda işleme"],
    hubs: ["Altınordu", "Ünye", "Fatsa", "Perşembe"],
    economy:
      "Fındık üretiminde ülkenin en büyük illerinden biri; işleme tesisleri ve ihracatçılar aynı zincirde çalışıyor. Boztepe ve yaylalar iç turizm getiriyor.",
    demand:
      "Fındık ihracatçısının sitesinde kalibre, randıman, aflatoksin analizi ve depolama bilgisi aranıyor. Bu teknik alanlar olmadan yurt dışı talebi başlamıyor.",
    anchor:
      "Ordu'da fındık alıcısı ürünü değil parti bilgisini soruyor. Genel bir tanıtım sayfası bu sorunun hiçbirine cevap vermiyor.",
    faq: {
      question: "Fındık ihracatı yapan firma için site nasıl kurulmalı?",
      answer:
        "İngilizce sürüm zorunlu; ürün sayfalarında kalibre, randıman, işleme tipi ve analiz bilgisi durmalı. Depolama kapasitesi ve yıllık işleme hacmi güven veren iki rakam oluyor. Talep formu miktar ve teslim şeklini sorarsa fiyat aynı gün çıkabiliyor.",
    },
    faq2: {
      question:
        "Fındık alıcısı ilk yazışmada ne soruyor?",
      answer:
        "Fiyatı değil parti bilgisini: kalibre, randıman, işleme tipi, analiz sonucu ve yıllık kapasite. Bu bilgiler sayfada yoksa yazışma tanışmayla başlıyor ve iki hafta uzuyor. Yazılı olduğunda alıcı doğrudan miktar ve teslim soruyor, yani süreç bir aşama ileriden başlıyor.",
    },
    build:
      "Ordu'da kalibre, randıman, işleme tipi ve analiz bilgisini taşıyan ürün sayfaları ile İngilizce sürüm kuruyoruz; depolama kapasitesi ayrı bir sayfa oluyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["giresun", "samsun", "tokat", "sivas"],
  },
  {
    slug: "rize",
    name: "Rize",
    plate: 53,
    region: "karadeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["çay", "balıkçılık", "yayla turizmi", "arıcılık"],
    hubs: ["Çayeli", "Ardeşen", "Pazar", "Ayder"],
    economy:
      "Çay üretimi ilin kimliğini kuruyor; Ayder ve yaylalar ise turizmi taşıyor. İki iş kolu da il adıyla birlikte aranıyor.",
    demand:
      "Butik çay üreticisinin sitesi doğrudan tüketiciye satış için gerekiyor. Hasat, işleme ve harman bilgisi ürünü fiyat rekabetinden çıkarıyor.",
    anchor:
      "Rize'de çay pazaryerlerinde fiyatla yarışıyor. Kendi sitesinde üretim yöntemini anlatan üretici, aynı ürünü daha yüksek fiyattan satabiliyor.",
    faq: {
      question: "Butik çay veya bal üreticisi doğrudan satışa nasıl geçer?",
      answer:
        "Ürün sayfası hasat dönemi, işleme yöntemi ve paket seçeneklerini anlatır; sipariş ve kargo yolu sitede tamamlanır. Üretimin anlatılması ürünü fiyat karşılaştırmasından çıkarıyor. Sezonluk ürünler için stok durumu panelden yönetilir.",
    },
    faq2: {
      question:
        "Çayımız pazaryerinde fiyatla yarışıyor, bundan nasıl çıkarız?",
      answer:
        "Üretimi anlatarak. Pazaryerinde ürün yalnızca gramaj ve fiyatla görünüyor, bu yüzden en ucuz kazanıyor. Kendi sayfanızda hasat dönemi, işleme yöntemi ve harman anlatıldığında ürün karşılaştırılabilir olmaktan çıkıyor. Aynı çay, anlatıldığı yerde daha yüksek fiyattan satılabiliyor.",
    },
    build:
      "Rize'de hasat dönemi, işleme yöntemi ve harman bilgisini anlatan ürün sayfaları ile sipariş ve kargo yolu kuruyoruz; sezonluk stok panelden yönetiliyor.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["trabzon", "artvin", "bayburt", "erzurum"],
  },
  {
    slug: "giresun",
    name: "Giresun",
    plate: 28,
    region: "karadeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["fındık", "balıkçılık", "tarım", "yayla turizmi"],
    hubs: ["Bulancak", "Espiye", "Tirebolu", "Şebinkarahisar"],
    economy:
      "Fındık üretimi ve ticareti ilin ana geliri; Giresun fındığı kendi adıyla bilinen bir kategori. Yaylalar iç turizmi besliyor.",
    demand:
      "Coğrafi işaretli ürünü olan üreticinin sitesi bu adı doğru kullanmak zorunda. Tescil bilgisi ve üretim bölgesi ürünü ayırıyor.",
    anchor:
      "Giresun'da ürünün adı zaten aranıyor. Üreticinin işi yeni bir talep yaratmak değil, o aramada kendi adıyla görünmek.",
    faq: {
      question: "Ürünümüz zaten aranıyor, bizim sitemiz neden görünmüyor?",
      answer:
        "Genellikle sayfa başlığı ve içerik ürünün aranan adını taşımıyor, ya da tüm ürünler tek sayfada duruyor. Her ürün kendi sayfasında, aranan adıyla ve üretim bilgisiyle yayınlandığında karşılık buluyor. Pazaryeri sayfaları da sizin yerinize sıralanabiliyor.",
    },
    faq2: {
      question:
        "Fındık ihracatında İngilizce sürüm ne kadar fark yaratıyor?",
      answer:
        "İthalatçının araması İngilizce yapıldığı için sürüm olmadan o aramaya hiç girilmiyor. Ama çeviri tek başına yetmiyor: kalibre, randıman ve işleme tipi sektörün kullandığı terimlerle yazılmadığında sayfa bulunsa bile alıcı uygunluğu göremiyor. İkisi birlikte kurulduğunda talep numune aşamasından başlıyor.",
    },
    build:
      "Giresun'da ürünün aranan adını başlıkta taşıyan ayrı sayfalar, üretim bölgesi bilgisi ve sipariş yolu kuruyoruz; ihracat varsa İngilizce sürüm ekleniyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["ordu", "trabzon", "gumushane", "sivas", "erzincan"],
  },
  {
    slug: "zonguldak",
    name: "Zonguldak",
    plate: 67,
    region: "karadeniz",
    tier: 3,
    angle: "sanayi",
    sectors: ["taşkömürü madenciliği", "demir-çelik", "liman", "makine"],
    hubs: ["Ereğli", "Çaycuma", "Devrek", "Kilimli"],
    economy:
      "Taşkömürü madenciliği ve Ereğli demir-çelik tesisleri ilin sanayi kimliğini kuruyor. Çevresinde makine ve bakım firmaları yoğunlaşmış durumda.",
    demand:
      "Sanayiye hizmet veren firmanın sitesi referans ve yetkinlik gösteriyor. Hangi tesiste hangi işi yaptığınız yazılı olduğunda benzer talep geliyor.",
    anchor:
      "Zonguldak'ta iş büyük tesislerin tedarik listesinden çıkıyor. O listeye girmenin ilk adımı, yaptığınız işin yazılı ve doğrulanabilir olması.",
    faq: {
      question: "Sanayi tesislerine hizmet veren firma referanslarını nasıl göstermeli?",
      answer:
        "İzin verilen ölçüde iş tipi, kapsam ve süre yazılır; müşteri adı paylaşılamıyorsa sektör ve iş tanımı yeterli oluyor. Genel bir referans logosu duvarı bilgi taşımıyor. Yapılan işin ne olduğu anlatıldığında benzer ihtiyacı olan alıcı sizi buluyor.",
    },
    faq2: {
      question:
        "Müşteri adlarını paylaşamıyoruz, referansı nasıl gösteririz?",
      answer:
        "İş tipiyle. Müşteri adı yerine sektör, işin kapsamı, süresi ve karşılaşılan koşul yazılıyor; bu, logo duvarından daha fazla bilgi taşıyor. Benzer ihtiyacı olan alıcı zaten işin ne olduğunu arıyor, kimin için yapıldığını değil. İzin alınabilen yerlerde ad da eklenebiliyor.",
    },
    build:
      "Zonguldak'ta yapılan iş tipini, kapsamını ve süresini anlatan referans sayfaları ile yetkinlik bilgisi kuruyoruz; teklif formu iş tanımı soruyor.",
    industries: ["manufacturing"],
    neighbors: ["bartin", "karabuk", "duzce", "bolu"],
  },
  {
    slug: "bolu",
    name: "Bolu",
    plate: 14,
    region: "karadeniz",
    tier: 3,
    angle: "turizm",
    sectors: ["tavukçuluk ve gıda", "orman ürünleri", "turizm", "gastronomi"],
    hubs: ["Mengen", "Gerede", "Abant", "Kartalkaya"],
    economy:
      "Tavukçuluk ve gıda üretimi ilin sanayi tarafını kuruyor; Abant, Kartalkaya ve Yedigöller ise hafta sonu turizmini taşıyor. Mengen aşçılığıyla ayrı bir kimlik.",
    demand:
      "Otel ve bungalov işletmesinin misafiri İstanbul ve Ankara'dan geliyor ve kararı iki gün önce veriyor. Müsaitlik ve fiyatın hemen görünmesi gerekiyor.",
    anchor:
      "Bolu'da rezervasyon kısa vadeli. Talebe akşam cevap veren işletme, o misafiri çoktan kaybetmiş oluyor.",
    faq: {
      question: "Hafta sonu talebi gelen tesis yanıt süresini nasıl kısaltır?",
      answer:
        "Sık sorulan bilgiler sayfada yazılı durur, talep formu tarih ve kişi sayısını alır ve WhatsApp'a bağlanır. Yaygın sorular için otomatik yanıt kurulduğunda müsaitlik dışındaki her şey anında karşılanıyor. Personel yalnızca gerçek rezervasyona bakıyor.",
    },
    faq2: {
      question:
        "Talepler akşam geliyor, sabah dönünce müşteri kaçmış oluyor. Çözüm ne?",
      answer:
        "Yanıtın büyük kısmını sayfaya ve otomatik yanıta taşımak. Fiyat aralığı, dahil olanlar, evcil hayvan, ulaşım gibi tekrar eden sorular sayfada yazılı olduğunda mesaj hiç gelmiyor. Gelen mesaja da otomatik ilk yanıt gidiyor ve müsaitlik dışındaki her şey anında karşılanıyor; personel yalnızca gerçek rezervasyona bakıyor.",
    },
    build:
      "Bolu'da müsaitlik ve fiyatı hemen gösteren oda sayfaları, tarih ve kişi sayısı soran talep formu ile sık sorulanlara otomatik yanıt veren WhatsApp kurulumu yapıyoruz.",
    industries: ["hospitality", "local-services"],
    neighbors: ["duzce", "zonguldak", "karabuk", "cankiri", "ankara", "eskisehir", "sakarya"],
  },
  {
    slug: "duzce",
    name: "Düzce",
    plate: 81,
    region: "karadeniz",
    tier: 3,
    angle: "sanayi",
    sectors: ["otomotiv yan sanayi", "fındık", "orman ürünleri", "makine"],
    hubs: ["Düzce OSB", "Akçakoca", "Gümüşova", "Kaynaşlı"],
    economy:
      "Otomotiv yan sanayi ve orman ürünleri üretimi ilin sanayisini kuruyor; Akçakoca kıyısı ise küçük ölçekli turizm getiriyor.",
    demand:
      "Yan sanayi firmasının alıcısı büyük üreticinin satın alma birimi. Ürün değil kapasite ve uygunluk konuşuluyor.",
    anchor:
      "Düzce'de firmalar İstanbul ve Kocaeli'ndeki alıcılara çalışıyor. Sitede yalnızca il adı geçtiğinde o alıcıların yaptığı bölgesel arama karşılıksız kalıyor.",
    faq: {
      question: "Büyük üreticiye tedarik yapan firma sitede neyi öne çıkarmalı?",
      answer:
        "Makine parkı, kapasite, kalite belgeleri ve teslim süresi öne çıkar. Satın alma birimi ön elemeyi internetten yapıyor ve ürün fotoğrafından çok teknik uygunluğa bakıyor. Teklif formuna teknik resim yüklenebilmesi süreci kısaltıyor.",
    },
    faq2: {
      question:
        "Müşterilerimiz başka ilde, sitede kendi ilimizi yazmak zararlı mı?",
      answer:
        "Zararlı değil ama eksik. Kendi iliniz yazılıyor, ek olarak hizmet verdiğiniz iller de yazılıyor ve yapılandırılmış veride işaretleniyor. Alıcı çoğu zaman kendi ilinin adıyla tedarikçi arıyor; sizin adınız o aramada geçmediğinde mesafe otuz kilometre bile olsa listeye girmiyorsunuz.",
    },
    build:
      "Düzce'de makine parkı, kapasite ve kalite belgelerini gösteren sayfalar, teknik resim yüklenebilen teklif formu ve İstanbul ile Kocaeli'ni kapsayan hizmet bölgesi bilgisi kuruyoruz.",
    industries: ["manufacturing"],
    neighbors: ["bolu", "sakarya", "zonguldak", "kocaeli"],
  },
  {
    slug: "amasya",
    name: "Amasya",
    plate: 5,
    region: "karadeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["elma", "tarım", "kültür turizmi", "gıda"],
    hubs: ["Merzifon", "Suluova", "Taşova", "Gümüşhacıköy"],
    economy:
      "Amasya elması ile anılan tarım üretimi ilin ana geliri; Yalıboyu evleri ve tarihi doku ise kültür turizmi getiriyor.",
    demand:
      "Tarım üreticisi toptan alıcıya, konaklama işletmesi ise günübirlik ziyaretçiye satıyor. İki işin site ihtiyacı farklı.",
    anchor:
      "Amasya'da ziyaretçi genellikle yolculuk sırasında arama yapıyor. Konum, çalışma saati ve fotoğrafın hızlı yüklenmesi kararı belirliyor.",
    faq: {
      question: "Kültür turizmine dayalı konaklama nasıl daha fazla görünür olur?",
      answer:
        "Konum, ulaşım, çevredeki gezilecek yerler ve konaklama tipleri ayrı içerikler olarak yazılır. Ziyaretçi çoğu zaman önce şehri, sonra oteli arıyor. Şehri anlatan içerik bu yüzden otel sayfasına da talep getiriyor ve yapay zeka yanıtlarında kaynak olabiliyor.",
    },
    faq2: {
      question:
        "Şehri anlatan içerik yazmak bizim işimiz mi?",
      answer:
        "Ziyaretçinin arama sırası buna zorluyor: önce şehir aranıyor, sonra konaklama. Şehri anlatan içerik ilk temas noktası oluyor ve sonundaki iç bağlantı ziyaretçiyi konaklama sayfanıza taşıyor. Aynı içerik yapay zeka yanıtlarında da kaynak olarak alınıyor, çünkü somut ve doğrulanabilir bilgi taşıyor.",
    },
    build:
      "Amasya'da bölgeyi ve ulaşımı anlatan içerikler ile konaklama sayfalarını birlikte kuruyoruz; tarım tarafında toptan talep formu ve ürün sayfaları ayrı çalışıyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["samsun", "tokat", "corum", "sinop"],
  },
  {
    slug: "tokat",
    name: "Tokat",
    plate: 60,
    region: "karadeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["tarım ve sebzecilik", "gıda işleme", "hayvancılık", "el sanatları"],
    hubs: ["Turhal", "Erbaa", "Niksar", "Zile"],
    economy:
      "Domates, üzüm ve şeker pancarı üretimi ilin tarımsal gelirini kuruyor; Tokat kebabı ve yazmacılık ise yerel kimliği taşıyor.",
    demand:
      "Gıda işleme tesisinin sitesi ulusal zincirlere tedarikçi olmak için gerekiyor. Kapasite, sertifika ve süreklilik bilgisi belirleyici.",
    anchor:
      "Tokat'ta üretim güçlü ama markalaşma zayıf. Ürünü kendi adıyla satmayan üretici, aynı ürünü başkasının markasıyla rafta görüyor.",
    faq: {
      question: "Kendi markamızla satmaya geçmek için siteden nasıl başlanır?",
      answer:
        "Marka adı, ürün hikayesi ve üretim yöntemi kendi adresinizde yazılı durmaya başlar; ürün sayfaları perakende satışa açılır. İlk aşamada büyük bir mağaza kurmak gerekmiyor, ürünün adıyla bulunabilir olmak yetiyor. Toptan tarafı ayrı bir sayfa olarak sürdürülür.",
    },
    faq2: {
      question:
        "Ürünümüz başkasının markasıyla rafta, kendi markamıza geçebilir miyiz?",
      answer:
        "Geçilebiliyor ve toptan satışı bırakmadan yapılıyor. Kendi markanız için ürün sayfaları, üretim anlatımı ve sipariş yolu kuruluyor; toptan taraf mevcut haliyle devam ediyor. İlk aşamada büyük bir mağaza gerekmiyor, ürünün kendi adıyla bulunabilir olması yetiyor. Marka bilinirliği bu adresin üstünde birikiyor.",
    },
    build:
      "Tokat'ta marka adı, ürün anlatımı ve üretim yöntemini taşıyan perakende sayfaları kuruyoruz; toptan taraf ayrı bir sayfa ve teklif formu olarak sürüyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["amasya", "samsun", "ordu", "sivas", "yozgat", "corum"],
  },
  {
    slug: "corum",
    name: "Çorum",
    plate: 19,
    region: "karadeniz",
    tier: 2,
    angle: "sanayi",
    sectors: ["değirmen makineleri", "tuğla ve kiremit", "leblebi ve gıda", "makine imalatı"],
    hubs: ["Çorum OSB", "Sungurlu", "Osmancık", "İskilip"],
    economy:
      "Değirmen makineleri üretiminde ülke ölçeğinde bilinen bir yoğunlaşma var ve üretimin önemli kısmı ihraç ediliyor. Tuğla-kiremit ve leblebi ikinci hattı kuruyor.",
    demand:
      "Değirmen makinesi alıcısı Afrika, Orta Asya ve Ortadoğu'dan geliyor. İngilizce ve Arapça sürüm, teknik çizim ve kapasite tablosu bekliyor.",
    anchor:
      "Çorum'daki makine üreticileri ihracatın büyük kısmını fuarlardan alıyor. Fuar dışı dönemde talep gelmemesinin sebebi genellikle sitenin tek dilde durması.",
    faq: {
      question: "Makine ihracatı için sitede hangi diller olmalı?",
      answer:
        "Hedef pazarınıza göre seçilir. Afrika ve Ortadoğu'ya satan üretici için İngilizce ve Arapça, Orta Asya için Rusça anlamlı oluyor. Her dil ayrı yazılır ve teknik terimler o pazarın karşılığıyla girer; makine çevirisi ciddi alıcıyı ilk sayfada kaybettiriyor.",
    },
    faq2: {
      question:
        "Talebin tamamı fuardan geliyor, fuar dışında nasıl talep alırız?",
      answer:
        "Ürün sayfalarını arama sonuçlarında tek tek görünür hale getirerek. Şu anda büyük ihtimalle makineler tek sayfada duruyor veya yalnızca katalog olarak var; bu durumda firma yalnızca adıyla aranınca bulunuyor. Model başına sayfa ve hedef pazarın dili, fuar dışı talebin geldiği yer oluyor.",
    },
    build:
      "Çorum'da makine modeli başına teknik tablo ve çizim taşıyan sayfalar ile İngilizce ve Arapça sürümler kuruyoruz; talep formu kapasite ve kurulum yeri soruyor.",
    industries: ["manufacturing"],
    neighbors: ["amasya", "samsun", "yozgat", "kirikkale", "cankiri", "kastamonu", "sinop", "tokat"],
  },
  {
    slug: "kastamonu",
    name: "Kastamonu",
    plate: 37,
    region: "karadeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["orman ürünleri", "sarımsak", "tarım", "kültür turizmi"],
    hubs: ["Taşköprü", "Tosya", "İnebolu", "Araç"],
    economy:
      "Orman ürünleri sanayii ilin en büyük iş kolu; Taşköprü sarımsağı ve Tosya pirinci coğrafi işaretli ürünler olarak biliniyor.",
    demand:
      "Coğrafi işaretli ürün satan üreticinin sitesi bu adı doğru kullanmalı. Ürünün tescilli adı, aramanın büyük kısmını taşıyor.",
    anchor:
      "Kastamonu'da ürünlerin adı ilden daha çok aranıyor. Sayfa başlığında ürün adını taşımayan üretici, kendi ürününün aramasına giremiyor.",
    faq: {
      question: "Orman ürünleri üreten firma yurt içi alıcıya nasıl ulaşır?",
      answer:
        "Ürün tipi başına sayfa açılır: ölçü, kalite sınıfı, kurutma ve teslim bilgisiyle. Mobilyacı ve inşaatçı alıcı, ürün adıyla arama yapıyor. Stok ve fiyat sık değiştiği için liste panelden yönetilir, sayfada teklif formu durur.",
    },
    faq2: {
      question:
        "Mobilyacı ve inşaatçı alıcıya nasıl görünürüz?",
      answer:
        "Ürün adıyla. Alıcı kereste veya ürün tipini kendi kullandığı adla arıyor; genel bir orman ürünleri tanıtımı bu aramaya girmiyor. Ürün tipi başına sayfa açılıp ölçü ve kalite sınıfı yazıldığında dar ama niyeti belli aramalarda karşılığınız oluyor. Teslim bölgesi de yazılıyor, çünkü nakliye kararı etkiliyor.",
    },
    build:
      "Kastamonu'da ürün tipi başına ölçü, kalite sınıfı ve kurutma bilgisi taşıyan sayfalar kuruyoruz; stok ve fiyat panelden yönetilip teklif formuna bağlanıyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["sinop", "corum", "cankiri", "karabuk", "bartin"],
  },
  {
    slug: "sinop",
    name: "Sinop",
    plate: 57,
    region: "karadeniz",
    tier: 3,
    angle: "turizm",
    sectors: ["balıkçılık", "turizm", "orman ürünleri", "el sanatları"],
    hubs: ["Gerze", "Ayancık", "Boyabat", "Türkeli"],
    economy:
      "Balıkçılık ve kıyı turizmi ilin ana geliri; ahşap el sanatları ve bıçakçılık yerel üretimi taşıyor.",
    demand:
      "Pansiyon ve butik konaklama işletmesinin talebi yaz aylarında yoğunlaşıyor. Site yıl boyu indekste kalmazsa sezon başında sıfırdan başlıyor.",
    anchor:
      "Sinop'ta işletmeler sezon dışında sayfayı bırakıyor. Terk edilmiş sayfa aramada geriliyor ve sezon geldiğinde yeniden yükselmesi haftalar alıyor.",
    faq: {
      question: "Sezonluk çalışan işletme sitesini kış aylarında ne yapmalı?",
      answer:
        "Kapatmak yerine sezon dışı içerikle güncel tutulur: bölge rehberi, ulaşım, erken rezervasyon bilgisi. Düzenli güncellenen sayfa sezon başında zaten üstte oluyor. Yapay zeka yanıtları da güncelliği olan sayfayı belirgin biçimde daha sık kaynak alıyor.",
    },
    faq2: {
      question:
        "Kışın siteyi kapatsak olur mu?",
      answer:
        "Olmaz. Kapatılan veya güncellenmeyen sayfa aramada geriliyor ve sezon geldiğinde yeniden yükselmesi haftalar alıyor. Kış aylarında bölge rehberi, ulaşım ve erken rezervasyon içeriğiyle sayfa ayakta tutuluyor. Maliyeti düşük, karşılığı ise sezon başında zaten üst sırada olmak.",
    },
    build:
      "Sinop'ta konaklama sayfaları, bölge ve ulaşım rehberi ile erken rezervasyon içeriği kuruyoruz; talep formu WhatsApp'a bağlanıyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["kastamonu", "samsun", "corum", "amasya"],
  },
  {
    slug: "bartin",
    name: "Bartın",
    plate: 74,
    region: "karadeniz",
    tier: 3,
    angle: "hizmet",
    sectors: ["orman ürünleri", "liman", "turizm", "el sanatları"],
    hubs: ["Amasra", "Ulus", "Kurucaşile", "Merkez"],
    economy:
      "Amasra turizmi, orman ürünleri ve tekne yapımcılığı ilin üç iş kolu. Kurucaşile ahşap tekne üretimiyle biliniyor.",
    demand:
      "Amasra'daki işletmenin misafiri günübirlik geliyor ve kararı telefonda veriyor. Menü, konum ve fiyat aralığı hemen görünmeli.",
    anchor:
      "Bartın'da ziyaretçi işletmeyi adıyla değil, yaptığı işle arıyor. Sayfada yalnızca işletme adı geçtiğinde o aramaya hiç girilmiyor.",
    faq: {
      question: "İşletme adımız aranmıyorsa sayfa nasıl bulunur hale gelir?",
      answer:
        "Sayfa başlıkları işletme adıyla değil yapılan işle kurulur: hangi hizmet, hangi yerde. Ziyaretçi çoğunlukla ihtiyacını arıyor, markanızı değil. İşletme adı marka bilinirliği oluştukça ikinci aşamada devreye giriyor.",
    },
    faq2: {
      question:
        "Amasra'da günübirlik gelen ziyaretçiye nasıl ulaşılır?",
      answer:
        "Menü, fiyat aralığı, konum ve kapasitenin metin olarak yazılmasıyla. Ziyaretçi yoldayken telefondan arıyor ve üç saniyede açılmayan sayfayı kapatıyor. Deniz manzarası veya otopark gibi karar veren ayrıntılar da yazılı duruyor; fotoğrafta görünen şey aramada karşılık bulmuyor.",
    },
    build:
      "Bartın'da yapılan işi başlıkta taşıyan hizmet sayfaları, konum ve çalışma saati bilgisiyle sade bir yapı kuruyoruz; Amasra tarafında menü metin olarak yazılıyor.",
    industries: ["local-services", "hospitality"],
    neighbors: ["karabuk", "zonguldak", "kastamonu"],
  },
  {
    slug: "karabuk",
    name: "Karabük",
    plate: 78,
    region: "karadeniz",
    tier: 3,
    angle: "sanayi",
    sectors: ["demir-çelik", "kültür turizmi", "orman ürünleri", "makine"],
    hubs: ["Safranbolu", "Karabük OSB", "Yenice", "Eskipazar"],
    economy:
      "Demir-çelik üretimi ilin sanayi kimliğini kuruyor; Safranbolu ise korunmuş tarihi dokusuyla yıl boyu turizm getiriyor. İki ekonomi birbirinden bağımsız çalışıyor.",
    demand:
      "Safranbolu'daki konak otelin misafiri kültür turisti ve rezervasyonu erken yapıyor. Sanayi tarafında ise alıcı kurumsal ve teknik.",
    anchor:
      "Karabük'te turizm ve sanayi aynı ilde ama aynı arama dünyasında değil. İkisini tek sitede birleştiren firma ikisinde de zayıf kalıyor.",
    faq: {
      question: "Safranbolu'daki konak otelimiz yıl boyu nasıl talep alır?",
      answer:
        "Kültür turizmi mevsimden çok programa bağlı: bölge rehberi, ulaşım, etkinlik ve gastronomi içerikleri yıl boyu aranıyor. Oda tipleri konak yapısının farkını anlatarak ayrı sayfalarda durur. Doğrudan rezervasyon yolu platform komisyonunu azaltıyor.",
    },
    faq2: {
      question:
        "Hem otelimiz hem sanayi işimiz var, tek site olur mu?",
      answer:
        "Olmaması daha iyi. İki iş tamamen farklı kitleye satıyor ve arama davranışları örtüşmüyor; tek sitede birleştirildiğinde her iki tarafın da konusu bulanıklaşıyor ve ikisi birden zayıflıyor. İki ayrı adres kurup her birini kendi kitlesine göre yazmak daha az maliyetli sonuç veriyor.",
    },
    build:
      "Karabük'te turizm ve sanayi taraflarını ayrı yapılar olarak kuruyoruz: konak otelde oda sayfaları ve bölge rehberi, sanayide kapasite ve belge sayfaları.",
    industries: ["hospitality", "manufacturing"],
    neighbors: ["bartin", "zonguldak", "kastamonu", "cankiri", "bolu"],
  },
  {
    slug: "artvin",
    name: "Artvin",
    plate: 8,
    region: "karadeniz",
    tier: 3,
    angle: "turizm",
    sectors: ["yayla ve doğa turizmi", "çay", "arıcılık", "madencilik"],
    hubs: ["Hopa", "Borçka", "Şavşat", "Arhavi"],
    economy:
      "Kaçkar ve Karagöl çevresindeki doğa turizmi ilin en görünür işi; çay üretimi ve Anzer benzeri yüksek rakım arıcılığı ikinci kalem.",
    demand:
      "Bungalov ve dağ evi işletmesinin misafiri uzaktan geliyor ve ulaşım bilgisine ihtiyaç duyuyor. Yol, mesafe ve mevsim koşulu yazılmalı.",
    anchor:
      "Artvin'de misafirin ilk sorusu fiyat değil ulaşım. Yol tarifini ve mevsim koşullarını yazmayan işletme, en çok tekrar eden soruyu her seferinde telefonda cevaplıyor.",
    faq: {
      question: "Ulaşımı zor bölgedeki tesis rezervasyonu nasıl artırır?",
      answer:
        "Ulaşım, mesafe, yol durumu ve mevsim koşulları ayrı bir sayfada anlatılır; harita ve tahmini süre eklenir. Bu bilgi belirsizliği kaldırınca rezervasyon kararı hızlanıyor. Aynı içerik bölgeyi araştıran ziyaretçiyi de siteye getiriyor.",
    },
    faq2: {
      question:
        "Misafirin ilk sorusu hep ulaşım, bunu nasıl azaltırız?",
      answer:
        "Ulaşımı ayrı bir sayfada anlatarak: hangi şehirden kaç saat, yol durumu, hangi ay hangi güzergah kapalı, harita ve tahmini süre. Bu bilgi yazılı olduğunda tekrar eden telefon büyük ölçüde bitiyor. Aynı sayfa bölgeyi araştıran ziyaretçiyi de siteye getirdiği için ikinci bir işe yarıyor.",
    },
    build:
      "Artvin'de ulaşım, mesafe, yol durumu ve mevsim koşullarını anlatan bir sayfa ile konaklama sayfalarını birlikte kuruyoruz; talep WhatsApp'a bağlanıyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["rize", "erzurum", "ardahan", "trabzon"],
  },
  {
    slug: "gumushane",
    name: "Gümüşhane",
    plate: 29,
    region: "karadeniz",
    tier: 3,
    angle: "tarim",
    sectors: ["madencilik", "pestil ve köme", "tarım", "doğa turizmi"],
    hubs: ["Kelkit", "Şiran", "Torul", "Kürtün"],
    economy:
      "Madencilik ilin sanayi tarafını kuruyor; pestil ve köme ise coğrafi işaretli gıda üretimi olarak biliniyor. Karaca Mağarası ve yaylalar turizm getiriyor.",
    demand:
      "Pestil ve köme üreticisinin satışı büyük ölçüde yol üstü ve hediyelik. Kargoyla ulusal satışa geçmek siteyi zorunlu kılıyor.",
    anchor:
      "Gümüşhane'de ürün yolcuya satılıyor, o yüzden üretici hiç aranmıyor. Kargoyla satışa geçmenin ilk şartı ürünün kendi adıyla indekste durması.",
    faq: {
      question: "Yol üstü satıştan kargoyla ulusal satışa nasıl geçilir?",
      answer:
        "Ürün sayfaları, paket seçenekleri ve kargo koşulları sitede kurulur; sipariş yolu ödemeye kadar tamamlanır. Yol üstü müşteri tek seferlik, kargo müşterisi tekrar eden alıcı oluyor. Ürünün üretim yöntemi anlatıldığında fiyat rekabeti de azalıyor.",
    },
    faq2: {
      question:
        "Ürünü yolda satıyoruz, kargoya geçmek neyi değiştirir?",
      answer:
        "Müşteriyi tekrar eden alıcıya çeviriyor. Yol üstü müşteri bir kez alıyor ve adınızı hatırlamıyor; kargo müşterisi ürünü adıyla arayıp tekrar sipariş veriyor. Bunun için ürün sayfası, paket seçenekleri ve kargo koşulu yeterli. Üretim yönteminin anlatılması da ürünü benzerlerinden ayırıyor.",
    },
    build:
      "Gümüşhane'de ürün sayfaları, paket seçenekleri, üretim yöntemi anlatımı ve kargo koşullarını taşıyan bir sipariş yolu kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["trabzon", "bayburt", "giresun", "erzincan"],
  },
  {
    slug: "bayburt",
    name: "Bayburt",
    plate: 69,
    region: "karadeniz",
    tier: 3,
    angle: "hizmet",
    sectors: ["hayvancılık", "tarım", "kültür turizmi", "el sanatları"],
    hubs: ["Demirözü", "Aydıntepe", "Merkez"],
    economy:
      "Hayvancılık ve tahıl tarımı ilin ekonomisini kuruyor; Baksı Müzesi ve Bayburt Kalesi çevresinde gelişen kültür turizmi ikinci hattı oluşturuyor.",
    demand:
      "Küçük işletmenin sitesi yerel aramada ve harita sonuçlarında bulunmak için gerekiyor. Karmaşık yapıya ihtiyaç yok.",
    anchor:
      "Bayburt'ta ziyaretçinin çoğu Erzurum veya Trabzon yolundan geçerken uğruyor. Konum ve çalışma saati doğru yazılmadığında o durak başka işletmeye kalıyor.",
    faq: {
      question: "Küçük bir ilde site kurmak maliyetine değer mi?",
      answer:
        "Rekabet düşük olduğu için değer kazanıyor: az sayıda sayfa ve doğru kurulmuş bir yapı uzun süre üstte kalıyor. Sürekli içerik üretmeye gerek kalmıyor, hizmet sayfaları ve güncel iletişim bilgisi yetiyor. İlk sürüm sade tutulup ihtiyaç geldikçe büyütülebilir.",
    },
    faq2: {
      question:
        "Kültür turizmi için hangi içerik yıl boyu arama getiriyor?",
      answer:
        "Ulaşım, ziyaret süresi, konaklama seçenekleri ve çevredeki alanlar. Baksı Müzesi veya kale için gelen ziyaretçi önce bunları arıyor. Bu içerik mevsime bağlı olmadığı için sayfa yıl boyu ziyaret alıyor ve yapay zeka yanıtlarında da kaynak olabiliyor.",
    },
    build:
      "Bayburt'ta hizmet sayfaları, konum ve güncel iletişim bilgisini taşıyan sade bir yapı kuruyoruz; harita sonuçlarıyla eşitleme teslimin parçası oluyor.",
    industries: ["local-services"],
    neighbors: ["gumushane", "erzurum", "erzincan", "trabzon", "rize"],
  },
];

const DOGU_ANADOLU: CityRecord[] = [
  {
    slug: "erzurum",
    name: "Erzurum",
    plate: 25,
    region: "dogu-anadolu",
    tier: 2,
    angle: "turizm",
    sectors: ["kış turizmi", "hayvancılık", "üniversite ekonomisi", "gıda"],
    hubs: ["Palandöken", "Yakutiye", "Aziziye", "Konaklı"],
    economy:
      "Palandöken kayak merkezi ili kış turizmine bağlıyor; hayvancılık ve üniversite nüfusu yıl boyu çalışan ikinci ekonomiyi kuruyor.",
    demand:
      "Kayak sezonu dört ay sürüyor ve rezervasyonun büyük kısmı sezon öncesi yapılıyor. Site yaz aylarında indekste kalmazsa sezon açılışını kaçırıyor.",
    anchor:
      "Erzurum'da arama hacmi kasımda başlayıp martta bitiyor. Sayfayı yalnızca sezonda güncelleyen otel, aramanın yükseldiği anda hazır olmuyor.",
    faq: {
      question: "Kış turizmi işletmesi sezon öncesi hazırlığını ne zaman yapmalı?",
      answer:
        "Arama hacmi yükselmeden önce, yaz sonunda. Sayfaların indekslenmesi ve sıralanması zaman aldığı için sezon açıldığında yapılan güncelleme geç kalıyor. Paket, pist bilgisi ve ekipman kiralama içerikleri yıl boyu güncel tutulur.",
    },
    faq2: {
      question:
        "Sezon kasımda başlıyor, hazırlığa ne zaman başlamalıyız?",
      answer:
        "Yaz sonunda. Sayfaların indekslenmesi ve sıralamaya girmesi haftalar alıyor, bu yüzden kasımda yapılan güncelleme sezonun ilk yarısını kaçırıyor. Ağustos ve eylülde hazır olan sayfa, arama hacmi yükseldiğinde zaten yerinde oluyor. Yaz aylarında da pist ve ulaşım içeriği yayında kalıyor.",
    },
    build:
      "Erzurum'da pist ve paket bilgisini, ekipman kiralama ile ulaşımı anlatan sayfalar kuruyoruz; oda tipleri ayrı duruyor, talep formu tarih ve kişi sayısı soruyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["erzincan", "bayburt", "artvin", "ardahan", "kars", "agri", "mus", "bingol", "tunceli", "rize"],
  },
  {
    slug: "van",
    name: "Van",
    plate: 65,
    region: "dogu-anadolu",
    tier: 2,
    angle: "ticaret",
    sectors: ["sınır ticareti", "turizm", "kahvaltı ve gastronomi", "hayvancılık"],
    hubs: ["İpekyolu", "Edremit", "Erciş", "Gürpınar"],
    economy:
      "İran sınır ticareti ilin ekonomisini dış hatta bağlıyor; Van Gölü, Akdamar ve kahvaltı kültürü ise iç turizmi taşıyor.",
    demand:
      "İran'dan gelen ziyaretçi belirgin bir pazar. Farsça karşılık veren işletme, aynı hizmeti veren komşusundan ayrışıyor.",
    anchor:
      "Van'da yabancı ziyaretçi kendi dilinde arıyor. Yalnızca Türkçe duran sayfa, sınır ticaretinin getirdiği talebin dışında kalıyor.",
    faq: {
      question: "Sınır ticaretinden gelen müşteriye ulaşmak için ne gerekir?",
      answer:
        "Hedef pazarın dilinde sayfa ve o dilde yanıt verebilen bir iletişim yolu gerekiyor. Farsça veya Arapça sürüm, ürün ve hizmet adlarının o dildeki karşılığıyla yazılır. WhatsApp üzerinden otomatik ilk yanıt, dil farkının yarattığı gecikmeyi kapatıyor.",
    },
    faq2: {
      question:
        "Kahvaltı ve gastronomi işletmesi için sitede ne bulunmalı?",
      answer:
        "Menü metin olarak, kapasite, rezervasyon yolu ve konum. Görsel içine gömülü menü aramada okunmuyor, oysa ziyaretçi ürün adıyla arıyor. Grup rezervasyonu alıyorsanız kişi sayısı soran bir form, telefonla yürüyen yazışmanın büyük kısmını üstleniyor.",
    },
    build:
      "Van'da hizmet ve ürün sayfalarını Farsça sürümle birlikte kuruyoruz; WhatsApp üzerinden o dilde otomatik ilk yanıt kurulumu yapılıyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["bitlis", "agri", "hakkari", "siirt", "mus"],
  },
  {
    slug: "malatya",
    name: "Malatya",
    plate: 44,
    region: "dogu-anadolu",
    tier: 2,
    angle: "tarim",
    sectors: ["kayısı", "tekstil", "gıda işleme", "tarım"],
    hubs: ["Malatya OSB", "Battalgazi", "Yeşilyurt", "Akçadağ"],
    economy:
      "Kuru kayısı üretimi ve ihracatı ilin dünya ölçeğinde tanındığı iş kolu. Tekstil ve gıda işleme sanayi tarafını kuruyor.",
    demand:
      "Kayısı ihracatçısının sitesinde kalibre, kükürtlü veya kükürtsüz ayrımı, sertifika ve yıllık kapasite aranıyor. Bu alanlar teklif sürecini başlatıyor.",
    anchor:
      "Malatya'da kayısı alıcısı dünyanın her yerinden gelebiliyor ama ihracatçıların çoğu tek dilde duruyor. Ürün dünya çapında biliniyor, satıcı bilinmiyor.",
    faq: {
      question: "Kuru kayısı ihracatında site alıcıya nasıl güven verir?",
      answer:
        "Ürün sınıfı, kalibre, işleme yöntemi ve sertifikalar sayfada doğrulanabilir biçimde durur; tesis ve depolama görselleri eklenir. İthalatçı önce uygunluğu doğruluyor. İngilizce sürümün sektör terimleriyle yazılması, makine çevirisine göre belirgin fark yaratıyor.",
    },
    faq2: {
      question:
        "Ürünümüz dünyada biliniyor ama bizi kimse tanımıyor, bu nasıl düzelir?",
      answer:
        "Ürünün adıyla sizin adınızın aynı sayfada buluşmasıyla. Şu anda arama ürünü buluyor ama karşısına aracıları çıkarıyor. Kalibre, işleme yöntemi, sertifika ve kapasite yazılı bir ürün sayfası, ithalatçının doğrulama adımını sizin sayfanızda tamamlamasını sağlıyor. İngilizce sürüm bunun ön şartı.",
    },
    build:
      "Malatya'da kalibre, kükürtlü ve kükürtsüz ayrımı, sertifika ile kapasite bilgisini taşıyan ürün sayfaları ve İngilizce sürüm kuruyoruz; tesis görselleri ayrı bir bölüm oluyor.",
    industries: ["manufacturing"],
    neighbors: ["elazig", "adiyaman", "kahramanmaras", "sivas", "erzincan", "tunceli", "diyarbakir"],
  },
  {
    slug: "elazig",
    name: "Elazığ",
    plate: 23,
    region: "dogu-anadolu",
    tier: 3,
    angle: "ticaret",
    sectors: ["madencilik", "su ürünleri", "bağcılık", "üniversite ekonomisi"],
    hubs: ["Elazığ OSB", "Kovancılar", "Baskil", "Sivrice"],
    economy:
      "Krom madenciliği, Keban Baraj Gölü'nde alabalık üretimi ve Öküzgözü bağcılığı ilin üç ayrı iş kolu. Üniversite nüfusu şehir içi hizmet talebini besliyor.",
    demand:
      "Alabalık üreticisinin alıcısı ulusal zincirler ve ihracatçılar. Kapasite, soğuk zincir ve sertifika bilgisi teklifin ön koşulu.",
    anchor:
      "Elazığ'da su ürünleri üretimi büyük ama üreticiler aracı üzerinden satıyor. Kendi adıyla bulunabilir olmak, aracı payını azaltmanın tek yolu.",
    faq: {
      question: "Su ürünleri üreticisi doğrudan alıcıya nasıl ulaşır?",
      answer:
        "Üretim kapasitesi, tesis bilgisi, soğuk zincir ve sertifikalar sayfada durur; toptan talep formu miktar ve teslim bölgesini sorar. Zincir marketler ve ihracatçılar tedarikçi ararken internetten ön eleme yapıyor. Aracı olmadan görünmek bu listeye girmekle başlıyor.",
    },
    faq2: {
      question:
        "Zincir marketlere tedarikçi olmak istiyoruz, siteden nasıl başlanır?",
      answer:
        "Kapasite, tesis, soğuk zincir ve sertifika bilgisini yazılı ve doğrulanabilir hale getirerek. Zincirlerin tedarikçi araştırması internetten başlıyor ve bu bilgileri göremediği firmayı listeye almıyor. Toptan talep formu miktar ve teslim bölgesini sorduğunda ilk yazışma da hazırlıklı geliyor.",
    },
    build:
      "Elazığ'da üretim kapasitesi, tesis bilgisi, soğuk zincir ve sertifikaları gösteren sayfalar ile toptan talep formu kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["malatya", "tunceli", "bingol", "diyarbakir", "erzincan"],
  },
  {
    slug: "erzincan",
    name: "Erzincan",
    plate: 24,
    region: "dogu-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["tulum peyniri", "bakır madenciliği", "tarım", "doğa turizmi"],
    hubs: ["Üzümlü", "Refahiye", "Tercan", "Kemaliye"],
    economy:
      "Erzincan tulum peyniri coğrafi işaretli ürün olarak ilin adını taşıyor; bakır madenciliği ve tarım diğer iki kalem. Kemaliye doğa turizmi getiriyor.",
    demand:
      "Peynir üreticisinin ulusal satışa geçmesi soğuk zincir kargo ve ürün anlatımı gerektiriyor. Ürünün üretim yöntemi fiyatı belirliyor.",
    anchor:
      "Erzincan'da ürünün adı ilin adını taşıyor ve zaten aranıyor. Üreticinin işi talep yaratmak değil, o aramanın karşısına kendi adıyla çıkmak.",
    faq: {
      question: "Coğrafi işaretli peynir kargoyla nasıl satılır?",
      answer:
        "Ürün sayfasında olgunlaşma süresi, üretim yöntemi ve saklama koşulu yazılır; soğuk zincir kargo koşulu peşinen belirtilir. Alıcının tereddüdü ürünün yolda bozulması oluyor, o soru cevaplandığında sipariş geliyor. Tescil bilgisi de sayfada doğrulanabilir durur.",
    },
    faq2: {
      question:
        "Peynir kargoda bozulur diye müşteri çekiniyor, bunu nasıl aşarız?",
      answer:
        "Soğuk zincir koşulunu ve paketleme yöntemini sayfada açıkça yazarak. Alıcının tereddüdü fiyat değil, ürünün yolda bozulması. Kaç saatte teslim edildiği, hangi ambalajla gönderildiği ve bozulma durumunda ne yapıldığı yazılı olduğunda sipariş geliyor. Bu bilgi tekrar eden telefonu da bitiriyor.",
    },
    build:
      "Erzincan'da olgunlaşma süresi, üretim yöntemi ve saklama koşulunu anlatan ürün sayfaları ile soğuk zincir kargo bilgisini yazan bir sipariş yolu kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["erzurum", "bayburt", "gumushane", "sivas", "tunceli", "bingol", "malatya"],
  },
  {
    slug: "agri",
    name: "Ağrı",
    plate: 4,
    region: "dogu-anadolu",
    tier: 3,
    angle: "hizmet",
    sectors: ["hayvancılık", "sınır ticareti", "turizm", "tarım"],
    hubs: ["Doğubayazıt", "Patnos", "Diyadin", "Eleşkirt"],
    economy:
      "Hayvancılık ilin ana geliri; Ağrı Dağı ve İshak Paşa Sarayı çevresinde gelişen turizm ile Gürbulak sınır kapısı ikinci hattı kuruyor.",
    demand:
      "Doğubayazıt'taki konaklama ve tur işletmesi yabancı ziyaretçiye satıyor. İngilizce ve Farsça karşılık talebi doğrudan alıyor.",
    anchor:
      "Ağrı'da ziyaretçi çoğunlukla dağ tırmanışı veya sınır geçişi için geliyor. İşletmeler kendini şehirle tanıtıyor, oysa aranan şey o özel amaç.",
    faq: {
      question: "Belirli bir amaçla gelen ziyaretçiye nasıl görünürüz?",
      answer:
        "Ziyaretçinin amacına göre içerik yazılır: tırmanış izni, rehberlik, ulaşım, konaklama süresi. Şehri genel olarak tanıtan sayfa bu aramaların hiçbirine girmiyor. Amaç odaklı içerik hem arama sonucunda hem yapay zeka yanıtlarında kaynak oluyor.",
    },
    faq2: {
      question:
        "Doğubayazıt'ta konaklama işletmesi yabancı ziyaretçiye nasıl ulaşır?",
      answer:
        "İngilizce sürüm ve ziyaretçinin planına göre yazılmış içerikle: İshak Paşa Sarayı'na mesafe, ziyaret saatleri, tırmanış için kalınacak gün sayısı. Ziyaretçi oteli değil programı arıyor. WhatsApp üzerinden İngilizce yanıt verebilen bir yol da rezervasyonu doğrudan alıyor.",
    },
    build:
      "Ağrı'da tırmanış izni, rehberlik, ulaşım ve konaklama süresi gibi amaca göre ayrılmış sayfalar kuruyoruz; İngilizce sürüm ve WhatsApp yolu ekleniyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["igdir", "kars", "erzurum", "mus", "bitlis", "van"],
  },
  {
    slug: "kars",
    name: "Kars",
    plate: 36,
    region: "dogu-anadolu",
    tier: 3,
    angle: "turizm",
    sectors: ["kaşar peyniri", "kaz üretimi", "kültür turizmi", "hayvancılık"],
    hubs: ["Sarıkamış", "Selim", "Susuz", "Ani"],
    economy:
      "Kars kaşarı ve kaz eti coğrafi işaretli ürünler olarak ilin adını taşıyor; Ani Ören Yeri ve Sarıkamış kayak merkezi turizmi getiriyor.",
    demand:
      "Kaşar ve kaz üreticisinin ulusal satışı kış aylarında yoğunlaşıyor. Sipariş yolu ve soğuk zincir kargo sitede tamamlanmalı.",
    anchor:
      "Kars'ta ürün adı ile il adı birlikte aranıyor ve talep kasımda sıçrıyor. Sayfa o sıçramadan önce hazır değilse sezon başkasının oluyor.",
    faq: {
      question: "Talebi yılın belli bir dönemine sıkışan üretici ne yapmalı?",
      answer:
        "Sayfa sezon öncesinde hazır ve indekslenmiş olmalı; sıralamaya girmek zaman alıyor. Sezon dışında ürünün üretim ve saklama bilgisi yayında kalır. Ön sipariş yolu açıldığında talebin bir kısmı sezon başlamadan toplanabiliyor.",
    },
    faq2: {
      question:
        "Coğrafi işaretli peyniri kargoyla satarken hangi bilgi soruluyor?",
      answer:
        "Olgunlaşma süresi, saklama koşulu ve soğuk zincirin nasıl sağlandığı. Alıcı ürünün yolda bozulmasından çekiniyor; ambalaj yöntemi ve teslim süresi yazılı olduğunda bu tereddüt kalkıyor. Tescil bilgisinin de doğrulanabilir durması, aynı adı kullanan tescilsiz ürünlerden ayırıyor.",
    },
    build:
      "Kars'ta ürün sayfaları, üretim ve saklama bilgisi ile soğuk zincir kargo yolu kuruyoruz; sezon öncesi ön sipariş alanı ekleniyor.",
    industries: ["local-services", "hospitality"],
    neighbors: ["ardahan", "erzurum", "agri", "igdir"],
  },
  {
    slug: "ardahan",
    name: "Ardahan",
    plate: 75,
    region: "dogu-anadolu",
    tier: 3,
    angle: "hizmet",
    sectors: ["süt ve hayvancılık", "arıcılık", "doğa turizmi", "tarım"],
    hubs: ["Çıldır", "Göle", "Posof", "Hanak"],
    economy:
      "Süt üretimi ve hayvancılık ilin ekonomisini kuruyor; Göle kaşarı ve Çıldır Gölü kış turizmi ikinci hattı oluşturuyor.",
    demand:
      "Küçük üreticinin ulusal satışa geçmesi için ürün sayfası ve kargo yolu yeterli. Karmaşık bir yapıya ihtiyaç yok.",
    anchor:
      "Ardahan'da üretim var, satış kanalı yok. Ürünü kendi adıyla satan üreticiler parmakla sayılacak kadar az.",
    faq: {
      question: "Sıfırdan başlayan küçük üretici için ilk site nasıl olmalı?",
      answer:
        "Beş sayfa yeter: ürünler, üretim, sipariş, hakkımızda, iletişim. Ürün adları aranan biçimiyle yazılır, kargo ve saklama koşulu belirtilir. İş büyüdükçe panel ve ödeme sistemi eklenir; ilk sürümün büyük bir mağaza olması gerekmiyor.",
    },
    faq2: {
      question:
        "Süt ürünü satan üreticide alıcı neye güveniyor?",
      answer:
        "Üretim yerinin ve yönteminin yazılı olmasına. Göle kaşarı gibi bilinen bir ürün satıyorsanız hangi köyde, hangi rakımda ve hangi sürede olgunlaştırıldığı ürünü ayırıyor. Soğuk zincir kargo koşulu da belirtiliyor, çünkü alıcının ilk tereddüdü ürünün yolda bozulması oluyor.",
    },
    build:
      "Ardahan'da ürünler, üretim, sipariş, hakkımızda ve iletişimden oluşan sade bir yapı kuruyoruz; kargo ve saklama koşulu ürün sayfasında yazılı duruyor.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["kars", "artvin", "erzurum"],
  },
  {
    slug: "igdir",
    name: "Iğdır",
    plate: 76,
    region: "dogu-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["meyvecilik", "sınır ticareti", "tarım", "lojistik"],
    hubs: ["Tuzluca", "Aralık", "Karakoyunlu", "Dilucu"],
    economy:
      "Mikroklima sayesinde kayısı ve meyve üretimi ilin tarımsal kimliğini kuruyor; Dilucu sınır kapısı lojistik ve ticaret getiriyor.",
    demand:
      "Meyve üreticisi hal ve toptancıya satıyor. Doğrudan alıcıya ulaşmak için ürün, dönem ve teslim bilgisi yazılı olmalı.",
    anchor:
      "Iğdır'da ürün erken olgunlaşıyor ve bu bir satış avantajı. Sayfada hasat takvimi yazmayan üretici, en güçlü farkını göstermiyor.",
    faq: {
      question: "Erken hasat avantajını siteye nasıl yansıtırız?",
      answer:
        "Hasat takvimi ürün sayfasında yazılı durur ve hangi ay hangi ürünün çıktığı belirtilir. Toptancı sezonu önceden planlıyor, erken tedarikçiyi arıyor. Bu takvim aynı zamanda sayfayı yıl boyu güncel tutan içerik oluyor.",
    },
    faq2: {
      question:
        "Sınır kapısına yakınlık siteye nasıl yansıyor?",
      answer:
        "Lojistik ve ihracat yapan firmalarda avantaj olarak yazılıyor: hangi kapı, ne kadar mesafe, hangi ülkelere geçiş. Alıcı nakliye süresini hesaplarken bu bilgiyi arıyor. Nahçıvan ve İran hattına çalışan firmalarda ikinci dil de talebi doğrudan artırıyor.",
    },
    build:
      "Iğdır'da hasat takvimi ve ürün sayfaları ile toptan talep formu kuruyoruz; erken hasat bilgisi ayrı bir başlık olarak öne çıkarılıyor.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["agri", "kars"],
  },
  {
    slug: "mus",
    name: "Muş",
    plate: 49,
    region: "dogu-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["tarım", "hayvancılık", "arıcılık", "gıda"],
    hubs: ["Bulanık", "Malazgirt", "Varto", "Korkut"],
    economy:
      "Şeker pancarı ve tahıl tarımı ilin ana geliri; hayvancılık ve arıcılık kırsal ekonomiyi tamamlıyor. Malazgirt tarihi kimliğiyle biliniyor.",
    demand:
      "Bal ve tarım ürünü satan üreticinin ulusal satışa geçmesi ürün sayfası ve kargo yolu gerektiriyor.",
    anchor:
      "Muş'ta üretim büyük ölçüde aracıya satılıyor. Kendi sitesi olan üretici sayısı çok az, bu da aramada boş bir alan bırakıyor.",
    faq: {
      question: "Aracıya satan üretici doğrudan satışa nasıl başlar?",
      answer:
        "Önce ürünün kendi adıyla bulunabilir olması gerekiyor: ürün sayfası, üretim anlatımı ve sipariş yolu. Aracıyı hemen bırakmak gerekmiyor, doğrudan satış ikinci kanal olarak başlıyor. Kargo ve paketleme koşulları peşinen yazıldığında ilk siparişler geliyor.",
    },
    faq2: {
      question:
        "Aracıya satıyoruz, doğrudan satışa geçmek riskli mi?",
      answer:
        "Aracıyı bırakmak riskli olurdu, ama gerekmiyor. Doğrudan satış ikinci kanal olarak açılıyor: ürün sayfası, üretim anlatımı ve sipariş yolu. Mevcut hacminiz aracıda kalırken küçük bir kısım kendi adınızla satılıyor. O kısım büyüdükçe fiyat üzerindeki kontrolünüz de artıyor.",
    },
    build:
      "Muş'ta ürün sayfaları, üretim anlatımı ve sipariş yolundan oluşan sade bir yapı kuruyoruz; kargo ve paketleme koşulu peşinen yazılıyor.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["bitlis", "bingol", "erzurum", "agri", "van"],
  },
  {
    slug: "bitlis",
    name: "Bitlis",
    plate: 13,
    region: "dogu-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["tütün", "bal", "doğa turizmi", "tarım"],
    hubs: ["Tatvan", "Ahlat", "Adilcevaz", "Güroymak"],
    economy:
      "Tütün ve bal üretimi ilin tarımsal gelirini kuruyor; Nemrut Krater Gölü ve Ahlat Selçuklu Mezarlığı turizm getiriyor.",
    demand:
      "Turizm işletmesinin ziyaretçisi bölgeyi araştırarak geliyor. Bölge içeriği olmayan işletme, o araştırmanın hiçbir adımında görünmüyor.",
    anchor:
      "Bitlis'te ziyaretçi önce Nemrut Krater Gölü'nü, sonra konaklamayı arıyor. Bu sırayı bilen işletme bölgeyi anlatan içerikle öne çıkıyor.",
    faq: {
      question: "Bölgeyi anlatan içerik işletmeye gerçekten müşteri getirir mi?",
      answer:
        "Getiriyor. Ziyaretçi kararı konaklamadan önce yer üzerinden veriyor, o yüzden bölge içeriği ilk temas noktası oluyor. Aynı içerik yapay zeka yanıtlarında da kaynak olarak kullanılabiliyor. İçeriğin sonunda konaklama sayfasına iç bağlantı verilmesi yeterli.",
    },
    faq2: {
      question:
        "Konaklama sayfamız var ama ziyaretçi bulamıyor, ne eksik?",
      answer:
        "Ziyaretçinin arama sırası. Önce Nemrut Krater Gölü veya Ahlat aranıyor, konaklama sonra geliyor. Bölgeyi anlatan içerik olmadığında o ilk aramada hiç görünmüyorsunuz. Bölge içeriği yazılıp sonunda konaklama sayfasına iç bağlantı verildiğinde araştırma trafiği tesise dönüyor.",
    },
    build:
      "Bitlis'te bölgeyi ve gezilecek alanları anlatan içerikler ile konaklama sayfalarını birlikte kuruyoruz; ürün tarafında bal ve tütün için ayrı sipariş yolu açılıyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["van", "mus", "siirt", "batman", "agri"],
  },
  {
    slug: "bingol",
    name: "Bingöl",
    plate: 12,
    region: "dogu-anadolu",
    tier: 3,
    angle: "hizmet",
    sectors: ["arıcılık", "hayvancılık", "madencilik", "tarım"],
    hubs: ["Genç", "Solhan", "Karlıova", "Adaklı"],
    economy:
      "Bal üretimi ilin en bilinen işi; hayvancılık ve madencilik kırsal ekonomiyi taşıyor. Nüfus küçük, yerel rekabet düşük.",
    demand:
      "Bal üreticisinin ulusal satışı ürünün gerçekliğini kanıtlamasına bağlı. Analiz raporu ve üretim bölgesi bilgisi fark yaratıyor.",
    anchor:
      "Bingöl'de bal fiyatla değil güvenle satılıyor. Analiz ve üretim bilgisini yayınlayan üretici, pazaryerindeki isimsiz ürünlerden ayrışıyor.",
    faq: {
      question: "Bal gibi güven gerektiren üründe site ne fark yaratır?",
      answer:
        "Analiz raporu, üretim bölgesi, hasat dönemi ve kovan bilgisi yayınlandığında ürün doğrulanabilir oluyor. Pazaryerinde bu bilgiler kayboluyor, kendi sayfanızda kalıcı duruyor. Doğrulanabilir ürün fiyat karşılaştırmasının dışına çıkıyor.",
    },
    faq2: {
      question:
        "Bal üreticisi için kaç sayfalık bir site yeterli?",
      answer:
        "Ürünler, üretim, sipariş ve iletişim genellikle yetiyor. Ürün sayfası az olduğu için asıl iş anlatımda: hangi kovan, hangi rakım, hangi hasat dönemi. Kısa ama ayrıntılı kurulmuş dört sayfa, ürünü genel geçer anlatan yirmi sayfadan daha iyi sonuç veriyor.",
    },
    build:
      "Bingöl'de analiz raporu, üretim bölgesi, hasat dönemi ve kovan bilgisini gösteren ürün sayfaları ile sipariş yolu kuruyoruz.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["elazig", "mus", "tunceli", "erzincan", "diyarbakir", "bitlis"],
  },
  {
    slug: "tunceli",
    name: "Tunceli",
    plate: 62,
    region: "dogu-anadolu",
    tier: 3,
    angle: "turizm",
    sectors: ["doğa turizmi", "arıcılık", "hayvancılık", "tarım"],
    hubs: ["Ovacık", "Pülümür", "Çemişgezek", "Munzur"],
    economy:
      "Munzur Vadisi ve doğa turizmi ilin en görünür işi; organik bal ve hayvancılık kırsal geliri kuruyor.",
    demand:
      "Doğa turizmi işletmesinin ziyaretçisi kamp, trekking ve rafting arıyor. İşletme adı değil, faaliyet adı aranıyor.",
    anchor:
      "Tunceli'de ziyaretçi faaliyeti arıyor, işletmeyi değil. Sayfasında yalnızca tesis tanıtımı yapan işletme o aramanın dışında kalıyor.",
    faq: {
      question: "Doğa turizmi işletmesi hangi sayfaları açmalı?",
      answer:
        "Faaliyet başına sayfa açılır: rafting, trekking, kamp, tur programı. Her sayfada süre, zorluk, mevsim ve dahil olanlar yazılır. Ziyaretçi bu ayrıntıları arıyor ve karşılığını bulduğu sayfadan rezervasyon yapıyor.",
    },
    faq2: {
      question:
        "Tesisimizi tanıtıyoruz ama rezervasyon gelmiyor, neden?",
      answer:
        "Ziyaretçi tesis değil faaliyet arıyor: rafting, trekking, kamp. Tesis tanıtımı bu aramaların dışında kalıyor. Faaliyet başına sayfa açılıp süre, zorluk derecesi, mevsim ve dahil olan hizmetler yazıldığında karşılığınız oluyor. Rezervasyon da o sayfadan geliyor, ana sayfadan değil.",
    },
    build:
      "Tunceli'de faaliyet başına sayfa kuruyoruz: rafting, trekking, kamp ve tur programı; her birinde süre, zorluk, mevsim ve dahil olanlar yazılı duruyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["elazig", "erzincan", "bingol", "malatya", "erzurum"],
  },
  {
    slug: "hakkari",
    name: "Hakkâri",
    plate: 30,
    region: "dogu-anadolu",
    tier: 3,
    angle: "hizmet",
    sectors: ["hayvancılık", "sınır ticareti", "dağ turizmi", "el sanatları"],
    hubs: ["Yüksekova", "Şemdinli", "Çukurca", "Cilo"],
    economy:
      "Hayvancılık ve sınır ticareti ilin ekonomisini kuruyor; Cilo ve Sat dağları son yıllarda dağcılık ve doğa turizmi getiriyor.",
    demand:
      "Yeni gelişen dağ turizmi için rehberlik ve konaklama hizmetleri aranıyor. Bu aramaların karşılığında henüz çok az sayfa var.",
    anchor:
      "Hakkâri'de dağ turizmi büyüyor ama internette karşılığı neredeyse yok. Şimdi kurulan bir sayfa, bu talebin oluşma anında hazır oluyor.",
    faq: {
      question: "Yeni gelişen bir talep için siteyi ne zaman kurmalı?",
      answer:
        "Talep büyümeden önce. Sayfanın indekslenmesi ve güven kazanması zaman aldığı için, talep zirveye çıktığında kurulan site geç kalıyor. Erken kurulan sayfa hem aramada hem yapay zeka yanıtlarında bölgenin ilk kaynağı olabiliyor.",
    },
    faq2: {
      question:
        "Dağ turizmi için hangi içerikler yazılmalı?",
      answer:
        "Rota başına ayrı sayfa: zorluk derecesi, süre, hangi mevsimde açık, rehber gerekli mi, izin durumu. Ziyaretçi rotayı adıyla arıyor, bölgeyi genel olarak değil. Ulaşım ve konaklama bilgisi de ayrı duruyor, çünkü plan bu iki soruda tıkanıyor.",
    },
    build:
      "Hakkâri'de dağcılık ve doğa turizmi için rehberlik, ulaşım, mevsim ve konaklama sayfaları kuruyoruz; İngilizce sürüm ve WhatsApp yolu ekleniyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["van", "sirnak", "siirt"],
  },
];

const GUNEYDOGU: CityRecord[] = [
  {
    slug: "gaziantep",
    name: "Gaziantep",
    plate: 27,
    region: "guneydogu-anadolu",
    tier: 1,
    angle: "sanayi",
    sectors: ["makine halısı", "gıda ve baklava", "tekstil", "makine imalatı"],
    hubs: ["1-5. Organize Sanayi Bölgesi", "Şehitkamil", "Şahinbey", "Nizip"],
    economy:
      "Makine halısı üretiminde dünya ölçeğinde bir merkez; gıda, fıstık ve baklava ise ilin markalarını kuruyor. İhracat hacmi ilin ekonomisini belirliyor.",
    demand:
      "Halı ihracatçısının alıcısı koleksiyon, ebat, hav yüksekliği ve minimum sipariş arıyor. Gıda tarafında ise sertifika ve raf ömrü belirleyici.",
    anchor:
      "Gaziantep'te ihracatçıların çoğu aynı fuarlara gidiyor ve aynı ürünü satıyor. Fuar dışında bulunabilir olan firma, yılın kalan on ayında da talep alıyor.",
    faq: {
      question: "Halı veya gıda ihracatı yapan firma yıl boyu nasıl talep alır?",
      answer:
        "Koleksiyon ve ürün grupları kendi sayfalarında, teknik özellikleriyle yayınlanır; İngilizce ve Arapça sürümler ayrı yazılır. Fuar dışı talep buradan geliyor. Ürün sayfaları arama sonucunda tek tek görünmediğinde firma yalnızca fuar dönemlerinde bulunuyor.",
    },
    faq2: {
      question:
        "Talebin tamamı fuardan geliyor, yılın kalanında nasıl bulunuruz?",
      answer:
        "Ürün sayfalarının arama sonuçlarında tek tek görünmesiyle. Firma adıyla arananlar sizi zaten buluyor; bulunamayan taraf ürünü arayan yeni alıcı. Koleksiyon ve ürün grupları kendi sayfalarında teknik özellikleriyle yayınlandığında, İngilizce ve Arapça sürümlerle birlikte fuar dışı talep başlıyor.",
    },
    build:
      "Gaziantep'te koleksiyon ve ürün grubu sayfaları, ebat ile hav yüksekliği gibi teknik tablolar, İngilizce ve Arapça sürümler kuruyoruz; talep formu miktar soruyor.",
    industries: ["manufacturing", "furniture"],
    neighbors: ["kilis", "sanliurfa", "adiyaman", "kahramanmaras", "osmaniye", "hatay"],
  },
  {
    slug: "sanliurfa",
    name: "Şanlıurfa",
    plate: 63,
    region: "guneydogu-anadolu",
    tier: 2,
    angle: "tarim",
    sectors: ["tarım ve pamuk", "gıda", "kültür turizmi", "hayvancılık"],
    hubs: ["Haliliye", "Karaköprü", "Siverek", "Viranşehir"],
    economy:
      "GAP sulaması ile pamuk ve tahıl üretimi ilin ekonomisini kuruyor; Göbeklitepe ise uluslararası kültür turizmi getiriyor.",
    demand:
      "Tarımsal üretim yapan firmanın alıcısı ulusal ve ihracatçı. Turizm tarafında ise ziyaretçi yabancı ve İngilizce arıyor.",
    anchor:
      "Şanlıurfa'da Göbeklitepe dünya çapında aranıyor ama çevresindeki işletmelerin çoğu bu aramanın karşılığında hiç görünmüyor.",
    faq: {
      question: "Göbeklitepe'ye gelen ziyaretçiye nasıl ulaşırız?",
      answer:
        "Ziyaretçinin aradığı konuyu içerik olarak karşılamak gerekiyor: ziyaret süresi, ulaşım, en iyi saatler, çevredeki diğer alanlar. Bu içerik İngilizce de yayınlanır. Konaklama veya restoran sayfasına iç bağlantı verildiğinde araştırma trafiği işletmeye dönüyor.",
    },
    faq2: {
      question:
        "Göbeklitepe'ye gelen ziyaretçiye nasıl ulaşırız?",
      answer:
        "Ziyaretçinin sorduğu şeyi yazarak: ziyaret ne kadar sürüyor, hangi saatte gitmeli, ulaşım nasıl, çevrede başka ne var. Bu içerik İngilizce de yayınlanıyor, çünkü aramanın önemli kısmı yabancı. Sonundaki iç bağlantı konaklama veya restoran sayfanıza gidiyor ve araştırma trafiği işletmeye dönüşüyor.",
    },
    build:
      "Şanlıurfa'da bölgeyi ve ziyaret bilgisini anlatan içerikleri İngilizce sürümle birlikte kuruyoruz; tarım tarafında ürün ve kapasite sayfaları ayrı çalışıyor.",
    industries: ["hospitality", "manufacturing", "local-services"],
    neighbors: ["gaziantep", "diyarbakir", "mardin", "adiyaman", "siirt", "batman"],
  },
  {
    slug: "diyarbakir",
    name: "Diyarbakır",
    plate: 21,
    region: "guneydogu-anadolu",
    tier: 2,
    angle: "ticaret",
    sectors: ["bölgesel ticaret", "tarım", "kültür turizmi", "gıda"],
    hubs: ["Bağlar", "Kayapınar", "Yenişehir", "Sur"],
    economy:
      "Bölgenin ticaret merkezi olduğu için çevre illerden talep çekiyor; surlar ve Hevsel Bahçeleri kültür turizmini taşıyor. Karpuz ve tarım ürünleri il adıyla anılıyor.",
    demand:
      "Bölgesel çalışan firmanın sitesi hizmet verdiği illeri yazmak zorunda. Yalnızca il adı geçen sayfa çevredeki aramanın dışında kalıyor.",
    anchor:
      "Diyarbakır'da firmalar Mardin'den Batman'a kadar geniş bir alana hizmet veriyor. Bu alan sayfada yazılı olmadığında bölgesel arama karşılıksız kalıyor.",
    faq: {
      question: "Bölgesel hizmet veren firma çevre illerde nasıl görünür olur?",
      answer:
        "Hizmet bölgesi sayfada yazılı olur ve önemli iller için ayrı içerik açılır; bu sayfalar il adı değişmiş kopyalar değil, o ildeki işin gerçek farkını anlatan sayfalar olmalı. Schema tarafında hizmet alanı işaretlenir ve Google İşletme Profili aynı listeyle tutulur.",
    },
    faq2: {
      question:
        "Kültür turizmine dayalı işletme aramada nasıl öne çıkar?",
      answer:
        "Ziyaretçinin arama sırasına uyarak. Önce surlar, Hevsel veya şehir aranıyor; konaklama ve restoran sonra geliyor. Bu alanları anlatan içerik ilk temas noktası oluyor ve sonundaki iç bağlantı işletme sayfasına taşıyor. Genel bir şehir tanıtımı değil, ziyaret süresi ve ulaşım gibi somut bilgi işe yarıyor.",
    },
    build:
      "Diyarbakır'da hizmet sayfaları, hizmet verilen illeri yazan bir bölge sayfası ve teklif formu kuruyoruz; turizm tarafında bölge içerikleri ayrı duruyor.",
    industries: ["local-services", "manufacturing", "hospitality"],
    neighbors: ["mardin", "batman", "sanliurfa", "elazig", "malatya", "bingol", "siirt"],
  },
  {
    slug: "mardin",
    name: "Mardin",
    plate: 47,
    region: "guneydogu-anadolu",
    tier: 3,
    angle: "turizm",
    sectors: ["kültür turizmi", "telkari ve el sanatları", "sabun", "tarım"],
    hubs: ["Artuklu", "Midyat", "Kızıltepe", "Nusaybin"],
    economy:
      "Taş mimarisiyle korunmuş eski şehir ve Midyat kültür turizmini taşıyor; telkari gümüş işçiliği ve sabun üretimi il adıyla satılan ürünler.",
    demand:
      "Butik otelin misafiri yurt içinden ve yurt dışından geliyor, konaklamayı manzara ve konuma göre seçiyor. Telkari satan atölye ise ulusal kargo satışına ihtiyaç duyuyor.",
    anchor:
      "Mardin'de misafir odayı değil manzarayı seçiyor. Hangi odadan neyin göründüğünü yazmayan otel, en güçlü satış argümanını kullanmıyor.",
    faq: {
      question: "Butik otelimizde oda farklarını nasıl anlatmalıyız?",
      answer:
        "Her oda tipi kendi sayfasında, manzarası, kat bilgisi ve büyüklüğüyle durmalı. Misafir fiyat farkının sebebini görmek istiyor; göremediğinde en ucuzu seçiyor veya vazgeçiyor. Gerçek fotoğraf ve net anlatım doğrudan rezervasyonu artırıyor.",
    },
    faq2: {
      question:
        "Odalarımızın fiyat farkını misafir anlamıyor, ne yapmalıyız?",
      answer:
        "Farkın kaynağını yazmak gerekiyor: hangi odadan ova görünüyor, hangisi hangi katta, kaç metrekare. Misafir sebebi göremediğinde en ucuzu seçiyor veya hiç seçmiyor. Her oda tipinin kendi sayfası ve kendi fotoğraf seti olduğunda ortalama rezervasyon tutarı doğrudan yükseliyor.",
    },
    build:
      "Mardin'de oda tiplerini manzara, kat ve büyüklük farkıyla ayıran sayfalar kuruyoruz; telkari tarafında ürün sayfaları ve kargo yolu ayrı açılıyor.",
    industries: ["hospitality", "local-services"],
    neighbors: ["diyarbakir", "sanliurfa", "batman", "sirnak", "siirt"],
  },
  {
    slug: "batman",
    name: "Batman",
    plate: 72,
    region: "guneydogu-anadolu",
    tier: 3,
    angle: "ticaret",
    sectors: ["petrol ve rafineri", "ticaret", "tarım", "inşaat"],
    hubs: ["Batman OSB", "Kozluk", "Beşiri", "Gercüş"],
    economy:
      "Petrol üretimi ve rafineri ilin sanayi kimliğini kuruyor; şehir merkezi bölgesel ticaret ve hizmet için toplanma noktası.",
    demand:
      "Petrol sanayine hizmet veren firmanın sitesi yeterlilik göstermeli. Şehirdeki perakende ve hizmet işletmesi ise yerel aramada bulunmalı.",
    anchor:
      "Batman'da nüfus genç ve arama neredeyse tamamen telefondan yapılıyor. Masaüstünde düzgün görünüp mobilde bozulan site, aramanın tamamını kaybediyor.",
    faq: {
      question: "Sitemiz mobilde neden daha önemli?",
      answer:
        "Yerel aramaların çoğu telefondan yapılıyor ve arama motoru sıralamayı mobil sürüme bakarak belirliyor. Mobilde yavaş açılan veya buton kaçıran sayfa, masaüstünde ne kadar düzgün görünürse görünsün geriliyor. Mobil performans teslim öncesi ölçülmesi gereken bir kalem.",
    },
    faq2: {
      question:
        "Petrol sanayine hizmet veren firma sitede neyi öne çıkarmalı?",
      answer:
        "Yetkinlik ve saha deneyimini: hangi iş tipleri, hangi ekipman, hangi güvenlik belgeleri, ortalama müdahale süresi. Kurumsal alıcı tedarikçi listesini bu bilgilere bakarak kuruyor. Müşteri adı paylaşılamıyorsa iş tipi ve kapsam yazılıyor; logo duvarı bu bilgiyi taşımıyor.",
    },
    build:
      "Batman'da mobilde hızlı açılan sade bir yapı kuruyoruz: hizmet sayfaları, konum, çalışma saati ve WhatsApp yolu; sanayi tarafında kapasite bilgisi ekleniyor.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["diyarbakir", "mardin", "siirt", "bitlis"],
  },
  {
    slug: "adiyaman",
    name: "Adıyaman",
    plate: 2,
    region: "guneydogu-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["tekstil", "tütün", "petrol", "kültür turizmi"],
    hubs: ["Kahta", "Besni", "Adıyaman OSB", "Nemrut"],
    economy:
      "Tekstil üretimi ilin sanayi tarafını kuruyor; Nemrut Dağı ise uluslararası kültür turizmi getiriyor. Besni üzümü ve tütün tarımı kırsalda sürüyor.",
    demand:
      "Nemrut çevresindeki konaklama ve tur işletmesi yabancı ziyaretçiye satıyor. İngilizce içerik ve tur programı belirleyici.",
    anchor:
      "Adıyaman'da ziyaretçi gün doğumu saatine göre plan yapıyor. Ulaşım süresi ve saat bilgisini yazan işletme, tur satışında öne geçiyor.",
    faq: {
      question: "Tur ve transfer hizmeti veren işletme nasıl daha çok rezervasyon alır?",
      answer:
        "Tur programı saat saat yazılır: kalkış, süre, dahil olanlar, dönüş. Ziyaretçi programı göremediğinde riski almak yerine acenteye gidiyor. Yabancı ziyaretçi için İngilizce sürüm ve WhatsApp üzerinden hızlı yanıt rezervasyonu doğrudan alıyor.",
    },
    faq2: {
      question:
        "Tur satışında acente bizi geçiyor, nasıl ayrışırız?",
      answer:
        "Programı açık yazarak. Acente güven veriyor çünkü ne olacağını söylüyor; sizin sayfanızda kalkış saati, süre, dahil olanlar ve dönüş yazılı değilse ziyaretçi riski almıyor. Program saat saat yazıldığında ve İngilizce sürüm eklendiğinde doğrudan rezervasyon geliyor.",
    },
    build:
      "Adıyaman'da tur programını saat saat yazan sayfalar, ulaşım ve süre bilgisi ile İngilizce sürüm kuruyoruz; talep WhatsApp'a bağlanıyor.",
    industries: ["hospitality", "manufacturing"],
    neighbors: ["malatya", "kahramanmaras", "gaziantep", "sanliurfa", "diyarbakir"],
  },
  {
    slug: "siirt",
    name: "Siirt",
    plate: 56,
    region: "guneydogu-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["fıstık", "bakır madenciliği", "battaniye", "hayvancılık"],
    hubs: ["Kurtalan", "Pervari", "Eruh", "Şirvan"],
    economy:
      "Siirt fıstığı ve Pervari balı coğrafi işaretli ürünler olarak ilin adını taşıyor; bakır madenciliği sanayi tarafını kuruyor.",
    demand:
      "Coğrafi işaretli ürün satan üreticinin ulusal satışı ürünün gerçekliğini kanıtlamasına bağlı. Tescil ve üretim bilgisi fiyatı belirliyor.",
    anchor:
      "Siirt'te ürünlerin adı ilin adıyla birlikte aranıyor, ama üreticilerin çoğu pazaryerinde isimsiz duruyor. Kendi adıyla satmak fiyat farkı yaratıyor.",
    faq: {
      question: "Coğrafi işaretli ürünü olan üretici pazaryerinden nasıl ayrışır?",
      answer:
        "Tescil bilgisi, üretim bölgesi ve hasat yöntemi kendi sayfanızda doğrulanabilir biçimde durur. Pazaryerinde bu bilgiler kaybolduğu için ürün fiyatla yarışıyor. Kendi sitesinde anlatılan ürün, aynı kategoride daha yüksek fiyattan satılabiliyor.",
    },
    faq2: {
      question:
        "Pazaryerinde ürünümüz ucuz ürünlerle aynı listede, bundan nasıl çıkarız?",
      answer:
        "Tescil ve üretim bilgisini kendi sayfanızda yayınlayarak. Pazaryeri listesinde ürün yalnızca ağırlık ve fiyatla görünüyor, bu yüzden en ucuz kazanıyor. Coğrafi işaret tescili, üretim bölgesi ve hasat yöntemi yazılı olduğunda ürün karşılaştırılabilir olmaktan çıkıyor ve fiyat farkı savunulabilir hale geliyor.",
    },
    build:
      "Siirt'te tescil bilgisi, üretim bölgesi ve hasat yöntemini gösteren ürün sayfaları ile sipariş yolu kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["batman", "sirnak", "bitlis", "van", "mardin", "diyarbakir"],
  },
  {
    slug: "sirnak",
    name: "Şırnak",
    plate: 73,
    region: "guneydogu-anadolu",
    tier: 3,
    angle: "hizmet",
    sectors: ["kömür madenciliği", "sınır ticareti", "hayvancılık", "lojistik"],
    hubs: ["Cizre", "Silopi", "İdil", "Habur"],
    economy:
      "Habur sınır kapısı ile Irak ticareti ilin ekonomisini dış hatta bağlıyor; kömür madenciliği ve hayvancılık iç ekonomiyi taşıyor.",
    demand:
      "Nakliye ve sınır ticareti yapan firmanın sitesi Arapça ve Kürtçe talebi de karşılıyor. Süreç anlatımı hizmet listesinden daha işlevli.",
    anchor:
      "Şırnak'ta ticaretin ritmi sınır kapısına bağlı ve alıcı çoğu zaman yurt dışında. Tek dilde duran site, o alıcının hiç göremediği bir sayfa.",
    faq: {
      question: "Sınır ticareti yapan nakliye firması için hangi içerik gerekli?",
      answer:
        "Süreç anlatımı gerekiyor: hangi belge, hangi sırayla, ne kadar sürede. Hizmet listesi bu soruların hiçbirine cevap vermiyor. Hedef pazarın dilinde sürüm ve o dilde yanıt verebilen bir iletişim yolu talebi doğrudan alıyor.",
    },
    faq2: {
      question:
        "Sınır ticaretinde müşteri yurt dışında, siteyi hangi dilde yapmalıyız?",
      answer:
        "Alıcının dilinde. Türkçe sayfa, Irak tarafındaki müşterinin yaptığı aramaya hiç girmiyor. Arapça sürüm o pazarın kullandığı terimlerle yazılıyor ve WhatsApp üzerinden aynı dilde yanıt verilebiliyor. Süreç anlatımı da hizmet listesinden daha fazla arama karşılıyor, çünkü alıcı sorununu arıyor.",
    },
    build:
      "Şırnak'ta hizmet listesi yerine süreç sayfaları kuruyoruz: hangi belge, hangi sırayla, ne kadar sürede; Arapça sürüm ve o dilde yanıt yolu ekleniyor.",
    industries: ["local-services", "manufacturing"],
    neighbors: ["siirt", "mardin", "hakkari"],
  },
  {
    slug: "kilis",
    name: "Kilis",
    plate: 79,
    region: "guneydogu-anadolu",
    tier: 3,
    angle: "tarim",
    sectors: ["zeytin ve zeytinyağı", "sınır ticareti", "tarım", "gıda"],
    hubs: ["Musabeyli", "Elbeyli", "Polateli", "Merkez"],
    economy:
      "Zeytin ve zeytinyağı üretimi ilin tarımsal kimliğini kuruyor; sınır ticareti ve Gaziantep'e yakınlık ticaret hacmini belirliyor.",
    demand:
      "Küçük ölçekli zeytinyağı üreticisinin ulusal satışa geçmesi ürün sayfası, hasat bilgisi ve kargo yolu gerektiriyor.",
    anchor:
      "Kilis'te üretim küçük ölçekli ve büyük markaların gölgesinde kalıyor. Hasat ve sıkım bilgisi yayınlayan üretici, o gölgeden çıkabiliyor.",
    faq: {
      question: "Küçük üretici büyük markaların yanında nasıl görünür olur?",
      answer:
        "Hacimle yarışmak yerine anlatımla ayrışılıyor: hasat tarihi, sıkım yöntemi, asitlik değeri ve üretim miktarı yazılır. Bu bilgiler büyük markanın veremediği ayrıntı oluyor. Az sayıda ama doğru kurulmuş ürün sayfası, geniş bir kataloğa göre daha iyi sonuç veriyor.",
    },
    faq2: {
      question:
        "Büyük markaların yanında küçük üretici olarak nasıl görünürüz?",
      answer:
        "Onların veremediği ayrıntıyı vererek. Büyük marka hasat tarihini, sıkım yöntemini ve üretim miktarını yazmıyor; yazamıyor da, çünkü hacmi buna uygun değil. Küçük üreticinin avantajı tam burada. Az sayıda ama ayrıntılı kurulmuş ürün sayfası, geniş bir katalogdan daha iyi sonuç veriyor.",
    },
    build:
      "Kilis'te hasat tarihi, sıkım yöntemi ve asitlik değerini yazan ürün sayfaları ile sipariş ve kargo yolu kuruyoruz.",
    industries: ["manufacturing", "local-services"],
    neighbors: ["gaziantep", "hatay"],
  },
];

export const CITIES: CityRecord[] = [
  ...MARMARA,
  ...EGE,
  ...AKDENIZ,
  ...IC_ANADOLU,
  ...KARADENIZ,
  ...DOGU_ANADOLU,
  ...GUNEYDOGU,
];

export const CITY_SLUGS = CITIES.map((city) => city.slug);

const BY_SLUG = new Map(CITIES.map((city) => [city.slug, city]));

export function getCity(slug: string): CityRecord | undefined {
  return BY_SLUG.get(slug);
}

export function isCitySlug(value: string): boolean {
  return BY_SLUG.has(value);
}

export function citiesInRegion(region: CityRegionSlug): CityRecord[] {
  return CITIES.filter((city) => city.region === region).sort((a, b) =>
    a.name.localeCompare(b.name, "tr"),
  );
}

export function isCityRegionSlug(value: string): value is CityRegionSlug {
  return (CITY_REGIONS as readonly string[]).includes(value);
}

/** Komşu iller; kayıtlı komşu yoksa aynı bölgeden en yakın hacimliler. */
export function neighborsOf(city: CityRecord, limit = 5): CityRecord[] {
  const listed = city.neighbors
    .map((slug) => BY_SLUG.get(slug))
    .filter((item): item is CityRecord => Boolean(item));
  if (listed.length >= limit) return listed.slice(0, limit);
  const fill = citiesInRegion(city.region).filter(
    (item) => item.slug !== city.slug && !city.neighbors.includes(item.slug),
  );
  return [...listed, ...fill].slice(0, limit);
}
