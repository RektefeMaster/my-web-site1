import { loc, gen } from "@/lib/tr-suffix";
import {
  type CityRecord,
  type CityAngle,
  REGION_NAMES,
  neighborsOf,
} from "@/data/turkiye-cities";

/**
 * Şehir sayfası metnini il kaydından besteler.
 *
 * Neden besteleme, neden elle 81 sayfa değil: 81 sayfayı elle yazmak kalite
 * farkını kontrol edilemez hale getiriyor, tek şablona il adı yazmak ise
 * doorway sayfası üretiyor. Aradaki doğru yer burası: benzersizlik il
 * kaydındaki GERÇEK verilerden (economy / demand / anchor / faq / sectors /
 * hubs) geliyor, iskelet ise `angle`'a göre DEĞİŞİYOR.
 *
 * İki kural:
 * 1. Her bölümün ilk cümlesi başlığın sorusunu doğrudan cevaplar. Yapay zeka
 *    yanıtları pasajı ilk 100 kelimeden puanlıyor; giriş cümlesini ısınmaya
 *    harcayan bölüm alıntılanmıyor.
 * 2. Ortak paragraflar havuzdan seçilir ve seçim ilin slug'ından türetilir.
 *    Böylece aynı `angle`'daki iki il aynı cümleyi arka arkaya kullanmıyor,
 *    seçim de build'ler arasında sabit kalıyor.
 */

export type CitySection = { heading: string; paragraphs: string[] };
export type CityFaq = { question: string; answer: string };

export type CityPageCopy = {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroBlurb: string;
  lead: string;
  sections: CitySection[];
  faqs: CityFaq[];
  related: { href: string; label: string }[];
  ctaLabel: string;
  ctaTitle: string;
  ctaBlurb: string;
  ctaButton: string;
};

/** Slug'dan sabit tohum. Aynı il her build'de aynı varyantı alır. */
function seed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick<T>(pool: T[], slug: string, salt: number): T {
  return pool[(seed(slug) + salt * 7919) % pool.length];
}

/** Cümle başına gelen liste için ilk harfi büyütür ("ev tekstili" → "Ev tekstili"). */
function sentenceCase(text: string): string {
  return text.charAt(0).toLocaleUpperCase("tr-TR") + text.slice(1);
}

function listOf(items: string[], max = 3): string {
  const slice = items.slice(0, max);
  if (slice.length <= 1) return slice[0] ?? "";
  return `${slice.slice(0, -1).join(", ")} ve ${slice[slice.length - 1]}`;
}

// ── Meta ──

const TITLE_PATTERNS = [
  (n: string) => `${n} Web Tasarım ve Yazılım | METEK Digital`,
  (n: string) => `${n} Web Sitesi Yaptırma ve SEO | METEK Digital`,
  (n: string) => `${n} Web Tasarım Ajansı | METEK Digital`,
];

function metaTitle(city: CityRecord): string {
  return pick(TITLE_PATTERNS, city.slug, 1)(city.name);
}

/*
  Arama sonucunda açıklama ~160 karakterde kesiliyor. Uzun il ve sektör
  adları (Afyonkarahisar + "termal turizm") havuzdaki cümleyi 186 karaktere
  kadar çıkarıyordu; kesilen cümle yarım bir vaat olarak okunuyor.
*/
const META_DESCRIPTION_MAX = 158;

function metaDescription(city: CityRecord): string {
  const where = loc(city.name);
  const field = listOf(city.sectors, 2);
  const pool = [
    `${where} özel web sitesi tasarımı, yönetim paneli, WhatsApp otomasyonu ve teknik SEO. ${sentenceCase(field)} işletmelerine göre kurulur.`,
    `${where} web sitesi yaptırmak isteyen işletmeler için özel tasarım, panel ve arama görünürlüğü. ${sentenceCase(field)} alanlarına göre kurulur.`,
    `${where} web tasarım, yazılım ve SEO işi tek ekipten. ${sentenceCase(field)} sektörlerinde teklif, randevu ve satış yolunu siteye kuruyoruz.`,
  ];
  const chosen = pick(pool, city.slug, 2);
  if (chosen.length <= META_DESCRIPTION_MAX) return chosen;
  const short = `${where} özel web sitesi, yönetim paneli ve teknik SEO. ${sentenceCase(listOf(city.sectors, 1))} işletmelerine göre kurulur.`;
  return short.length <= META_DESCRIPTION_MAX ? short : short.slice(0, META_DESCRIPTION_MAX);
}

// ── Hero ──

function heroTitle(city: CityRecord): string {
  const pool = [
    `${loc(city.name)} işleyen web sitesi.`,
    `${loc(city.name)} web sitesi ve yazılım.`,
    `${gen(city.name)} işine göre site.`,
  ];
  return pick(pool, city.slug, 3);
}

/*
  Hero blurb'ü `city.demand`'dan besliyorduk, ama aynı iki cümle birinci
  bölümün ilk paragrafında da geçiyordu: sayfada arka arkaya birebir tekrar
  görünüyordu. Blurb artık sektör ve bölgeden besteleniyor, `demand` yalnızca
  gövdede kalıyor.
*/
function heroBlurb(city: CityRecord): string {
  const field = listOf(city.sectors, 2);
  const where = loc(city.name);
  const pool: Record<CityAngle, string> = {
    metropol: `${sentenceCase(field)} alanlarında rekabetin yoğun olduğu ${city.name} için özel site, yönetim paneli ve arama görünürlüğü.`,
    sanayi: `${sentenceCase(field)} üreten ${gen(city.name)} firmalarına göre kurulan site: ürün sayfaları, teknik tablo ve teklif yolu.`,
    turizm: `${where} konaklama ve tur işletmeleri için doğrudan rezervasyon yolu, dil sürümleri ve mobilde hızlı açılan sayfa.`,
    tarim: `${sentenceCase(field)} üreten işletmeler için ürünü kendi adıyla satan site, sipariş yolu ve ürün paneli.`,
    ticaret: `${where} bölgesel çalışan firmalar için hizmet bölgesini gösteren site, süreç içeriği ve teklif yolu.`,
    hizmet: `${where} hizmeti doğru adlandıran sade bir site, güncel iletişim bilgisi ve harita sonuçlarıyla eşitlenmiş bir kayıt.`,
  };
  return pool[city.angle];
}

function lead(city: CityRecord): string {
  const where = loc(city.name);
  const pool = [
    `${city.economy} ${where} kurduğumuz site bu tabloya göre planlanır: sayfalar, meta alanları ve iletişim yolları yayın öncesi tamamlanır.`,
    `${city.economy} Site bu ekonominin içinden çıkan bir işe göre kurulur, hazır temaya marka adı yazılarak değil.`,
    `${city.economy} ${where} yaptığımız iş, bu işletmelerin arama sonucunda bulunması ve gelen talebin eksiksiz ulaşmasıdır.`,
  ];
  return pick(pool, city.slug, 4);
}

// ── Ortak bölümler ──

/*
  ORTAK BÖLÜMLER, SABİT METİN DEĞİL.

  İlk sürümde bu dört bölüm her ilde birebir aynıydı; ölçüm 85 sayfa çiftini
  %55 benzerlik eşiğinin üstünde buldu (en kötüsü %60,1). Gövdenin yaklaşık
  üçte ikisi ortak olduğu için sayfalar birbirinin kopyası görünüyordu, yani
  tam olarak kaçınmak istediğimiz doorway deseni.

  Çözüm süs değil, gerçek fark: rekabet yoğunluğu (tier), satın alma sorunu
  (angle) ve coğrafya (region) illere göre ZATEN farklı. Bölümler artık bu üç
  eksenden besleniyor, dolayısıyla İstanbul'un yerel arama bölümü Bayburt'un
  bölümüyle aynı şeyi söylemiyor. Ölçüm için: npm run content:cities
*/

/** Hizmet sırası ile örneği ilin satın alma sorununa göre değişiyor. */
function servicesSection(city: CityRecord): CitySection {
  const where = loc(city.name);
  const field = listOf(city.sectors, 2);

  const lead: Record<CityAngle, string> = {
    metropol: `${where} dört işi de aynı teslimde kuruyoruz: siteyi, onu yöneten paneli, gelen talebi karşılayan otomasyonu ve arama görünürlüğünü. Rekabetin yoğun olduğu yerde bunları ayrı tedarikçilere bölmek, düzeltme talebinin kimseye ulaşmadığı bir zincir çıkarıyor.`,
    sanayi: `${gen(city.name)} üreticisi için sıralama şu: önce ürün sayfaları ve teklif yolu, sonra ekibin ürün ekleyeceği panel, sonra arama görünürlüğü. Otomasyon burada en sonda kalıyor, çünkü teknik alıcı yazışmayı sohbet penceresinden değil formdan yürütüyor.`,
    turizm: `${where} sıralama tersine dönüyor: önce doğrudan rezervasyon yolu ve WhatsApp otomasyonu, sonra site yapısı, sonra arama. Misafir cevabı dakikalar içinde bekliyor ve gece yarısı gelen soruya sabah dönen işletme rezervasyonu kaybediyor.`,
    tarim: `${sentenceCase(field)} üreten işletmede önce ürün sayfaları ve sipariş yolu kuruluyor, hemen ardından stok ve sezon bilgisini ekibin güncelleyeceği panel. Ürün listesi yılda birkaç kez değiştiği için paneli sonraya bırakmak sayfayı altı ayda eskitiyor.`,
    ticaret: `Bölgesel çalışan firmada önce hizmet bölgesini ve süreci anlatan sayfa yapısı kuruluyor, sonra teklif ve müşteri kaydını tutan panel. ${where} tek bir iletişim formu, farklı illerden gelen talebi ayırt edemediği için takip zorlaşıyor.`,
    hizmet: `${where} genellikle tek bir şey yetiyor: hizmeti doğru adlandıran sade bir site ve WhatsApp üzerinden ulaşılabilir bir yol. Panel ve otomasyon, talep hacmi personeli aşmaya başladığında ekleniyor, ilk teslimde değil.`,
  };

  return {
    heading: "Site, panel, otomasyon ve arama",
    paragraphs: [
      `${city.build} ${lead[city.angle]}`,
      `Kapsam ${gen(city.name)} işine göre daralıyor veya genişliyor; ihtiyaç duyulmayan kalem teklife girmiyor.`,
    ],
  };
}

/**
 * Yerel arama bölümü rekabet yoğunluğuna göre yazılıyor.
 *
 * İstanbul'da sıralama aylarla ölçülüyor, Bayburt'ta birkaç sayfa yetiyor.
 * İkisine aynı metni vermek ikisine de yanlış beklenti kuruyor.
 */
function localSearchSection(city: CityRecord): CitySection {
  const where = loc(city.name);
  const zones = listOf(city.hubs, 2);
  const field = listOf(city.sectors, 2);

  const tierParagraph: Record<1 | 2 | 3, string[]> = {
    1: [
      `${where} aynı sorguya giren firma sayısı yüksek, bu yüzden sıralama haftalarla değil aylarla ölçülüyor. Hızlı sonuç sözü veren teklif genellikle riskli yöntem kullanıyor; ölçülebilir olan şey teknik durum, indekslenen sayfa sayısı ve gelen talebin niteliği.`,
      `Rekabetin bu kadar yoğun olduğu bir ilde genel sorgular pahalı. ${sentenceCase(field)} gibi dar ve niyeti belli aramalar, ${zones} çevresindeki işletmeler için çok daha erken sonuç veriyor.`,
    ],
    2: [
      `${where} rekabet var ama doygun değil: hizmetini doğru adlandıran ve sayfa başına tek konu tutan site, birkaç ay içinde üst sıralara girebiliyor. Belirleyici olan sayfa sayısı değil, her sayfanın hangi soruyu karşıladığının belli olması.`,
      `${sentenceCase(zones)} çevresindeki işletmelerin çoğu tek bir sayfada tüm hizmetleri anlatıyor. Hizmet başına ayrı sayfa açmak, aynı içerikle daha fazla arama karşılamanın en ucuz yolu.`,
    ],
    3: [
      `${where} rekabet düşük, bu yüzden doğru kurulmuş tek bir site uzun süre üstte kalabiliyor. Sürekli içerik üretmeye gerek kalmıyor: hizmet sayfaları ve güncel iletişim bilgisi çoğu durumda yeterli oluyor.`,
      `Asıl fırsat, aynı işi yapan firmaların çoğunun hiç sayfası olmaması. ${sentenceCase(field)} aramalarında ${zones} çevresinden çıkan sonuç sayısı az; o boşluğu ilk dolduran uzun süre orada kalıyor.`,
    ],
  };

  return {
    heading: `${city.name} aramalarında görünmek`,
    paragraphs: [
      tierParagraph[city.tier][0],
      tierParagraph[city.tier][1],
      `Teknik kalemler teslimin içinde: başlık alanları, tek H1, canonical, site haritası ve Google İşletme Profili ile ad-adres-telefon eşitliği.`,
    ],
  };
}

/**
 * GEO bölümü: yapay zeka yanıtlarına hangi soruyla girildiği ile göre
 * değiştiği için örnek soru da `angle`'dan geliyor.
 */
function geoSection(city: CityRecord): CitySection {
  const example: Record<CityAngle, string> = {
    metropol: `"${loc(city.name)} kurumsal web sitesi kim yapıyor" gibi bir soruda model, hizmeti adlandıran ve fiyat mantığını açıklayan sayfayı alıntılıyor; slogan yazan sayfayı atlıyor.`,
    sanayi: `"${city.name} ${city.sectors[0]} üreticisi" gibi bir soruda model, kapasite ve ürün bilgisini yazılı veren sayfaları topluyor. Bilgisi yalnızca PDF katalogda duran firma bu derlemeye hiç girmiyor.`,
    turizm: `"${loc(city.name)} nerede kalınır" gibi bir soruda model, oda tipini, konumu ve dahil olan hizmetleri yazan sayfaları kaynak alıyor. Yalnızca fotoğraf galerisi olan tesis metin üretmediği için alıntılanamıyor.`,
    tarim: `"${city.name} ${city.sectors[0]} nereden alınır" gibi bir soruda model, üretim yöntemini ve sipariş yolunu yazan üretici sayfalarını kaynak gösteriyor. Pazaryerindeki isimsiz ürün listesi bu cevaba üretici adı taşımıyor.`,
    ticaret: `"${loc(city.name)} hangi firmalar hizmet veriyor" gibi bir soruda model, hizmet bölgesini ve süreci yazılı anlatan sayfaları derliyor. Yalnızca hizmet adı listeleyen sayfa ayırt edici bilgi vermiyor.`,
    hizmet: `"${loc(city.name)} web sitesi kim yapıyor" gibi bir soruda model, o ilde karşılığı olan az sayıdaki sayfadan derleme yapıyor. Kaynak azlığı, sayfası olan işletme için doğrudan avantaj.`,
  };

  return {
    heading: "Yapay zeka yanıtlarında kaynak olmak",
    paragraphs: [
      `Yapay zeka arama araçları bir sayfayı kaynak gösterirken cevabı doğrudan veren pasajları arıyor: bölüm başlığının sorusunu ilk cümlede yanıtlayan, kendi içinde tam ve doğrulanabilir bir paragraf alıntılanıyor. ${example[city.angle]}`,
      `Sayfalar buna göre yazılıyor: bölüm bir soruyu adlandırıyor, ilk cümle kapatıyor. Hizmet ve sık sorulanlar yapılandırılmış veriyle işaretlenip tarihli tutuluyor.`,
    ],
  };
}

/** Başlangıç bölümü bölgeye göre değişiyor: ihtiyaç listesi her yerde aynı değil. */
function startSection(city: CityRecord): CitySection {
  const ask: Record<string, string[]> = {
    marmara: [
      `İşletmeyi, kitleyi ve sitenin desteklemesi gereken eylemi yazın. İhracat varsa hangi pazarlara satıldığını ekleyin: dil sürümü kararı ve kapsam büyük ölçüde bundan çıkıyor.`,
      `Bize üç şey yazın: ne ürettiğinizi veya sattığınızı, alıcının kim olduğunu ve sitede tamamlaması gereken eylemi. Yurt dışı satış varsa hangi ülkeler olduğunu ekleyin.`,
    ],
    ege: [
      `İşletmeyi, hedef kitleyi ve sitenin yapması gereken işi yazın. Yurt dışı alıcı veya misafir varsa hangi ülkelerden geldiğini belirtin; dil sürümleri buna göre planlanıyor.`,
      `Ne sattığınızı, kime sattığınızı ve ziyaretçinin sitede ne yapması gerektiğini yazın. Alıcı veya misafir yurt dışındansa hangi dillerde talep aldığınızı ekleyin.`,
    ],
    akdeniz: [
      `İşletmeyi ve ziyaretçinin sitede tamamlaması gereken eylemi yazın. Rezervasyon veya teklif toplanacaksa bunu şu an nasıl yürüttüğünüzü ekleyin, çünkü mevcut alışkanlık kurulacak yolu belirliyor.`,
      `İşletmeyi ve sitenin taşıması gereken işi yazın. Talep şu anda telefondan mı, Instagram'dan mı, acenteden mi geliyor; bunu belirtin, kurulacak yol buna göre değişiyor.`,
    ],
    "ic-anadolu": [
      `İşletmeyi, alıcı tipini ve sitenin desteklemesi gereken eylemi yazın. Bayi ağı veya kurumsal satın alma varsa belirtin: şifreli fiyat alanı ve teklif formu buna göre kuruluyor.`,
      `Ne ürettiğinizi, alıcının son kullanıcı mı bayi mi kurumsal satın alma mı olduğunu ve sitenin yapması gereken işi yazın. Fiyatın kamuya açık olup olmayacağı bu cevaptan çıkıyor.`,
    ],
    karadeniz: [
      `İşletmeyi, ürünü ve sitenin yapması gereken işi yazın. Ürün sezona bağlıysa hasat ve satış dönemini ekleyin; sayfanın hangi ay hazır olması gerektiği bundan çıkıyor.`,
      `Ürünü, alıcıyı ve sitede tamamlanması gereken eylemi yazın. Satış yılın belli aylarında yoğunlaşıyorsa o dönemi belirtin, çünkü sayfanın önceden indekslenmiş olması gerekiyor.`,
    ],
    "dogu-anadolu": [
      `İşletmeyi, kitleyi ve bunun ilk site mi yenileme mi olduğunu yazın. Talep yılın belli bir dönemine sıkışıyorsa o dönemi belirtin, çünkü sayfanın önceden hazır olması gerekiyor.`,
      `Ne yaptığınızı, müşterinin nereden geldiğini ve sitenin taşıması gereken işi yazın. Mevcut bir site varsa adresini ekleyin; korunacak sayfalar oradan çıkarılıyor.`,
    ],
    "guneydogu-anadolu": [
      `İşletmeyi, alıcının nereden geldiğini ve sitenin desteklemesi gereken eylemi yazın. İhracat veya yabancı ziyaretçi varsa hangi dillerde talep aldığınızı ekleyin.`,
      `Ne ürettiğinizi veya hangi hizmeti verdiğinizi, alıcının yurt içinde mi dışında mı olduğunu ve sitede tamamlanması gereken eylemi yazın. Fuar dışı talep hedefleniyorsa bunu belirtin.`,
    ],
  };

  const neighbors = neighborsOf(city, 2)
    .map((item) => item.name)
    .join(", ");

  return {
    heading: "Projeye nasıl başlanır",
    paragraphs: [
      pick(ask[city.region], city.slug, 22),
      `Tasarım ve yazılım bu kararlar yazıldıktan sonra başlıyor. ${loc(city.name)}, ${neighbors} ve çevre illerde proje uzaktan yürüyor; yerinde toplantı gerekmiyor.`,
    ],
  };
}

// ── Açıya özel bölümler ──

function anglePrimary(city: CityRecord): CitySection {
  const where = loc(city.name);
  const field = listOf(city.sectors, 3);
  const zones = listOf(city.hubs, 3);

  switch (city.angle) {
    case "metropol":
      return {
        heading: "Rekabetin yoğun olduğu yerde ayrışma",
        paragraphs: [
          `${pick([`${where} aynı hizmeti veren firma sayısı yüksek olduğu için arama sonucunda üstte çıkmak tek başına iş getirmiyor.`, `${sentenceCase(where)} üstte çıkmak yetmiyor: ziyaretçi aynı anda üç dört sekme açıyor ve karar sıralamada değil ilk ekranda veriliyor.`], city.slug, 21)} ${city.anchor}`,
          `${zones} çevresinde çalışan işletmelerin ortak sorunu benzer görünmek. ${field} alanlarında ayrışma, tasarım süsünden değil, ne yaptığınızın ilk ekranda anlaşılmasından geliyor.`,
        ],
      };
    case "sanayi":
      return {
        heading: `${gen(city.name)} sanayisi siteden ne istiyor`,
        paragraphs: [
          `${pick([`${where} sanayi firmasının sitesinden beklenen şey vitrin değil doğrulama: alıcı ürünün teknik uygunluğunu ve firmanın kapasitesini kontrol ediyor.`, `${sentenceCase(where)} site çoğu zaman ilk temas değil ikinci kontrol noktası: adınızı fuardan veya referanstan duyan alıcı sizi doğrulamak için giriyor.`], city.slug, 21)} ${city.demand}`,
          `${zones} çevresinde ${field} alanlarında çalışan firmalar için ürün ailesi başına ayrı sayfa, teknik tablo ve teklif formu standart teslim kalemi. ${city.anchor}`,
        ],
      };
    case "turizm":
      return {
        heading: "Misafir kararı nerede veriliyor",
        paragraphs: [
          `${pick([`Misafir kararı çoğunlukla sitenin ilk ekranında veriliyor: fiyat mantığı, konum ve müsaitlik hemen görünmüyorsa ziyaretçi platforma dönüyor.`, `${sentenceCase(where)} misafir siteye tek seferde değil birkaç kez dönüyor ve her dönüşte aynı soruyu soruyor: fiyat neye göre değişiyor, tarih boş mu.`], city.slug, 21)} ${city.demand}`,
          `${zones} çevresindeki işletmeler için asıl maliyet kalemi platform komisyonu. ${city.anchor}`,
        ],
      };
    case "tarim":
      return {
        heading: `${gen(city.name)} üretimi nerede satılıyor`,
        paragraphs: [
          `${pick([`Üretimin büyük kısmı aracı üzerinden satıldığı için üretici kendi adıyla neredeyse hiç aranmıyor.`, `${sentenceCase(where)} ürün biliniyor ama üretici bilinmiyor: satış aracıdan geçtiği için isim alıcıya hiç ulaşmıyor.`], city.slug, 21)} ${city.demand}`,
          `${sentenceCase(field)} alanlarında çalışan üreticiler için ürünün kendi adıyla indekste durması, aracı payını azaltmanın ilk adımı. ${city.anchor}`,
        ],
      };
    case "ticaret":
      return {
        heading: "Bölgesel çalışan firmanın görünürlük sorunu",
        paragraphs: [
          `${pick([`Bölgesel çalışan firma çoğu zaman kendi ilinin dışından da talep alıyor ama sitesinde yalnızca kendi ilini yazıyor.`, `${sentenceCase(where)} müşteri çevresi il sınırından geniş, sayfa ise dar: hizmet bölgesi yazılmadığı için komşu ildeki arama başkasına gidiyor.`], city.slug, 21)} ${city.demand}`,
          `${zones} çevresinde ${field} alanlarında çalışan işletmeler için hizmet bölgesinin sayfada yazılı olması, çevre illerdeki aramaya girmenin şartı. ${city.anchor}`,
        ],
      };
    case "hizmet":
    default:
      return {
        heading: `${where} işletme siteden ne bekliyor`,
        paragraphs: [
          `${pick([`Beklenti karmaşık bir yapı değil, bulunabilir olmak: ziyaretçi hizmeti arıyor ve karşısında güncel bir sayfa görmek istiyor.`, `${sentenceCase(where)} ihtiyaç sade: hizmetin adı, çalışma bölgesi ve ulaşılabilir bir iletişim yolu.`], city.slug, 21)} ${city.demand}`,
          `${sentenceCase(field)} alanlarında çalışan işletmelerin çoğunun sayfası yok veya yıllardır güncellenmiyor. ${city.anchor}`,
        ],
      };
  }
}

function angleSecondary(city: CityRecord): CitySection | null {
  const where = loc(city.name);

  switch (city.angle) {
    case "metropol":
      return {
        heading: "Kurumsal alıcı sayfayı nasıl okuyor",
        paragraphs: [
          `Kurumsal alıcı sayfayı baştan sona okumuyor, aradığı bilgiyi tarıyor: ne yapıyorsunuz, kime yaptınız, nasıl teklif alınır. Bu üçü ayrı ayrı bulunabilir değilse ziyaretçi ikinci sekmeye geçiyor.`,
          `${where} çalışan işletmede karar genellikle birden fazla kişiden geçiyor. Sayfanın paylaşılabilir, adresi anlamlı ve mobilde okunabilir olması bu iç dolaşımı doğrudan etkiliyor.`,
        ],
      };
    case "sanayi":
      return {
        heading: "İhracat ve çok dilli sürüm",
        paragraphs: [
          `İhracat yapan firmada dil sürümü satır satır çeviri değil, o pazarın kullandığı terimlerle yeniden yazılan metin olmalı. Makine çevirisiyle hazırlanan teknik sayfa ciddi alıcıyı ilk ekranda kaybettiriyor.`,
          `Diller arasında hreflang ve canonical kurulmazsa arama motoru sürümleri birbirinin kopyası sayabiliyor. ${where} ihracata çalışan firmalarda bu teknik kurulum, çevirinin kendisi kadar belirleyici.`,
        ],
      };
    case "turizm":
      return {
        heading: "Dil sürümleri ve mobil hız",
        paragraphs: [
          `Yabancı misafire satan tesiste dil sürümü zorunlu ve her dil ayrı yazılmalı: o pazarın arattığı terimler farklı oluyor. Çeviri eklentisine bırakılan sayfa arama sonucunda karşılık bulmuyor.`,
          `Rezervasyon aramalarının büyük kısmı telefondan yapılıyor. Ağır yüklenen galeri ${where} en pahalı hata: misafir fotoğrafı görmeden çıkıyor ve o ziyaret geri gelmiyor.`,
        ],
      };
    case "tarim":
      return {
        heading: "Toptan ve perakende iki ayrı yol",
        paragraphs: [
          `Toptan ve perakende aynı sayfada birleştirilemiyor: biri hacim, ambalaj ve teslim koşulu soruyor, diğeri tek paket fiyatı arıyor. İkisini tek sayfaya sıkıştırmak ikisini de zayıflatıyor.`,
          `Sezona bağlı üretimde stok ve hasat takvimi panelden yönetilir, sayfaya sabitlenmez. ${where} yıl boyu güncel kalan ürün sayfası, sezon başladığında zaten aramanın üstünde oluyor.`,
        ],
      };
    case "ticaret":
      return {
        heading: "Süreç anlatımı hizmet listesinden neden iyi",
        paragraphs: [
          `Süreç anlatan sayfa, hizmet listeleyen sayfadan daha fazla arama karşılıyor: alıcı hizmetin adını değil, karşılaştığı sorunu arıyor. Hangi belge, hangi sırayla, ne kadar sürede sorularının yazılı cevabı doğrudan talep getiriyor.`,
          `Aynı içerik yapay zeka yanıtlarında da kaynak olarak alınıyor. ${where} benzer hizmeti veren firmaların çoğu aynı listeyi yayınladığı için, süreci yazan firma tek başına ayrışıyor.`,
        ],
      };
    case "hizmet":
    default:
      return null;
  }
}

// ── SSS ──

/** İl tipine özgü soru: hash değil, `angle` seçiyor. */
function angleFaq(city: CityRecord): CityFaq {
  switch (city.angle) {
    case "metropol":
      return {
        question: `${loc(city.name)} SEO çalışması ne kadar sürede sonuç verir?`,
        answer: `Teknik düzeltmelerin etkisi haftalar içinde görülebiliyor, rekabetli sorgularda sıralama ise aylarla ölçülüyor. Rekabetin bu kadar yoğun olduğu bir ilde hızlı sonuç sözü veren teklif genellikle riskli yöntem kullanıyor. Ölçülebilir olan şey teknik durum, indekslenen sayfa sayısı ve gelen talebin niteliği.`,
      };
    case "sanayi":
      return {
        question: "Ürün kataloğumuzu siteye taşımak ne kadar sürer?",
        answer: `Süre ürün sayısına ve mevcut verinin düzenine bağlı. Ürünler tabloda düzenli duruyorsa toplu aktarım yapılıyor; dağınık dosyalardan geliyorsa önce yapı kuruluyor. Ürün ailesi başına sayfa açılıyor ve ekibin sonradan ürün ekleyebilmesi için panel aynı teslimde kuruluyor.`,
      };
    case "turizm":
      return {
        question: "Rezervasyon sistemi mi kuruyorsunuz, talep formu mu?",
        answer: `İkisi de kurulabiliyor. Oda sayısı azsa ve müsaitlik telefonla yönetiliyorsa talep formu ile WhatsApp yolu daha az sürtünme yaratıyor. Doluluk yoğunsa takvim ve online ödeme anlamlı oluyor. Karar, işletmenin günlük çalışma biçimine göre veriliyor.`,
      };
    case "tarim":
      return {
        question: "Online satış mı kurulmalı, yoksa sipariş formu mu yeterli?",
        answer: `Ürün sayısı az ve sipariş telefonla alınıyorsa form ile WhatsApp yeterli oluyor. Düzenli perakende satış hedefleniyorsa sepet ve ödeme sistemi anlamlı. Toptan tarafta ise fiyat sayfaya sabitlenmiyor, teklif formu miktar ve teslim bölgesini soruyor.`,
      };
    case "ticaret":
      return {
        question: "Hizmet verdiğimiz illeri siteye nasıl ekliyorsunuz?",
        answer: `Hizmet bölgesi kurumsal bilgide ve yapılandırılmış veride işaretleniyor, önemli iller için ayrı içerik açılıyor. Bu sayfalar il adı değiştirilmiş kopyalar olmuyor; o ildeki işin gerçek farkını anlatmadıkları sürece arama motoru ikisini de zayıflatıyor.`,
      };
    case "hizmet":
    default:
      return {
        question: "Küçük bir işletme için kaç sayfalık site yeterli?",
        answer: `Çoğu durumda beş sayfa yetiyor: ana sayfa, hizmetler, hakkımızda, sık sorulanlar ve iletişim. Önemli olan sayfa sayısı değil, her sayfanın tek bir konusu olması ve iletişim yolunun her yerden ulaşılabilir durması. İhtiyaç büyüdükçe sayfa eklemek sonradan kolay.`,
      };
  }
}

// ── Birleştirme ──

export function buildCityCopy(city: CityRecord): CityPageCopy {
  const secondary = angleSecondary(city);
  const sections: CitySection[] = [
    anglePrimary(city),
    ...(secondary ? [secondary] : []),
    servicesSection(city),
    localSearchSection(city),
    geoSection(city),
    startSection(city),
  ];

  /*
    Sayfada YALNIZCA yerel sorular duruyor. Fiyat, uzaktan çalışma, hazır tema
    ve yönlendirme gibi genel sorular /faq ile hizmet sayfalarında; onları 81
    kez tekrarlamak sayfanın özgün oranını düşürüyor ve aynı cevabı beş ayrı
    yerde güncellemek gerekiyordu. İlgili bağlantılar oraya yönlendiriyor.
  */
  const faqs: CityFaq[] = [city.faq, angleFaq(city), city.faq2];

  const related = [
    {
      href: `/sehirler/bolge/${city.region}`,
      label: `${REGION_NAMES[city.region]} genelinde web tasarım`,
    },
    ...neighborsOf(city, 4).map((neighbor) => ({
      href: `/sehirler/${neighbor.slug}`,
      label: `${neighbor.name} web tasarım ve yazılım`,
    })),
    { href: "/services/web-design", label: "Özel web tasarım hizmeti" },
    { href: "/services/seo", label: "Teknik SEO ve arama görünürlüğü" },
    { href: "/services/software", label: "Yönetim paneli ve CRM yazılımı" },
    { href: "/services/automation", label: "WhatsApp ve Instagram otomasyonu" },
    { href: "/faq", label: "Fiyat, süre ve çalışma biçimi hakkında sorular" },
  ];

  return {
    metaTitle: metaTitle(city),
    metaDescription: metaDescription(city),
    heroLabel: `${city.name} · ${REGION_NAMES[city.region]}`,
    heroTitle: heroTitle(city),
    heroBlurb: heroBlurb(city),
    lead: lead(city),
    sections,
    faqs,
    related,
    ctaLabel: "İletişim",
    ctaTitle: `${loc(city.name)} ne kurulacak?`,
    ctaBlurb: `İşletmeyi, ziyaretçinin sitede yapması gereken eylemi ve bunun ilk site mi yenileme mi olduğunu yazın. Kapsamı kuran sorularla döneriz.`,
    ctaButton: "Proje başlat",
  };
}

/** Sayfaların "hangi ilde ne yapılıyor" özeti; hub ve GEO dosyaları kullanıyor. */
export function cityHubBlurb(city: CityRecord): string {
  return `${listOf(city.sectors, 2)} ağırlıklı ${city.name}. ${city.demand}`;
}
