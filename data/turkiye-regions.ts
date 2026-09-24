import type { CityRegionSlug } from "./turkiye-cities";

/**
 * Bölge hub'ları: 81 şehir sayfası ile ülke hub'ı arasındaki ara katman.
 *
 * Neden gerekli: tek bir hub 15-25 alt sayfadan sonra bağ değerini
 * dağıtıyor. Yedi bölge hub'ı 81 sayfayı ana sayfadan üç tıklık mesafede
 * tutuyor ve her ilin komşularıyla bağlanmasını sağlıyor.
 */

export type RegionContent = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroBlurb: string;
  /** Ülke hub'ında bölge bloğunun altında görünen özet. */
  hubBlurb: string;
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const REGION_CONTENT: Record<CityRegionSlug, RegionContent> = {
  marmara: {
    metaTitle: "Marmara Bölgesi Web Tasarım ve Yazılım | METEK Digital",
    metaDescription:
      "İstanbul, Bursa, Kocaeli ve Trakya illeri için özel web sitesi tasarımı, yönetim paneli ve teknik SEO. Sanayi, ihracat ve hizmet işletmelerine göre kurulur.",
    heroTitle: "Marmara'da web ve yazılım.",
    heroBlurb:
      "Bölgenin on bir ilinde sanayi, ihracat ve kurumsal hizmet iç içe çalışıyor. Site, hangi alıcıya satış yaptığınıza göre kuruluyor.",
    hubBlurb:
      "Ülkenin sanayi ve ihracat hacminin büyük kısmı bu bölgede. Alıcı çoğu zaman kurumsal bir satın alma birimi ve siteyi doğrulama aracı olarak okuyor.",
    lead: "Marmara'da rekabet yoğun ve alıcı karşılaştırma yapmaya alışkın. İstanbul'da aynı hizmeti veren yüzlerce firma varken, Bursa ve Kocaeli'nde alıcı teknik uygunluğa bakıyor. İkisinde de sitenin işi aynı: ne yaptığınızı ilk ekranda anlatmak ve teklif yolunu aramaya gerek bırakmamak.",
    sections: [
      {
        heading: "Sanayi ile hizmet aynı bölgede, aynı site değil",
        paragraphs: [
          "Sanayi firmasının sitesi ürün ve kapasite üzerinden okunuyor, hizmet firmasının sitesi ise güven ve süreç üzerinden. İkisine aynı şablonu vermek, birinde teknik bilgiyi eksik bırakıyor, diğerinde gereksiz ayrıntıya boğuyor.",
          "Bursa, Kocaeli, Sakarya ve Tekirdağ hattında ürün ailesi başına sayfa, teknik tablo ve teklif formu standart. İstanbul tarafında ise hizmetin adlandırılması ve referansın doğrulanabilir olması öne çıkıyor.",
        ],
      },
      {
        heading: "İhracat yapan firmada dil sürümü",
        paragraphs: [
          "İhracat yapan firmanın dil sürümü satır satır çeviri olamaz; o pazarın kullandığı terimlerle yeniden yazılması gerekiyor. Makine çevirisiyle hazırlanan teknik sayfa ciddi alıcıyı ilk ekranda kaybettiriyor.",
          "Diller arasında hreflang ve canonical kurulmadığında arama motoru sürümleri birbirinin kopyası sayabiliyor. Marmara'daki ihracatçı firmalarda bu teknik kurulum, çevirinin kendisi kadar belirleyici.",
        ],
      },
    ],
    faqs: [
      {
        question: "Marmara'da hangi illerde çalışıyorsunuz?",
        answer:
          "Bölgenin on bir ilinde de proje alıyoruz. Görüşme, tasarım onayı ve teslim uzaktan yürüdüğü için ilin merkeze uzaklığı süreyi veya fiyatı değiştirmiyor. Yerinde çekim gerekiyorsa ayrıca planlanıyor.",
      },
      {
        question: "Sanayi firması için site ile panel aynı anda mı kurulmalı?",
        answer:
          "Ekip yayından sonra ürün, fiyat veya içerik güncelleyecekse aynı teslimde kurulması daha ucuz oluyor. Sonradan eklenen panel, site yapısına uymadığında yeniden çalışma çıkarıyor. Güncelleme ihtiyacı yoksa ilk sürüm panelsiz teslim edilebiliyor.",
      },
    ],
  },
  ege: {
    metaTitle: "Ege Bölgesi Web Tasarım ve Yazılım | METEK Digital",
    metaDescription:
      "İzmir, Denizli, Muğla, Manisa ve Ege illeri için özel web sitesi, ihracat odaklı çok dilli sürüm ve teknik SEO. Tekstil, turizm ve tarım işletmelerine göre kurulur.",
    heroTitle: "Ege'de web ve yazılım.",
    heroBlurb:
      "Sekiz ilde ihracat, turizm ve tarım aynı anda çalışıyor. Üçünün de site ihtiyacı ve alıcı davranışı birbirinden farklı.",
    hubBlurb:
      "Denizli tekstili, Muğla turizmi ve Aydın tarımı aynı bölgede ama tamamen farklı alıcılara satıyor. Site tipi bu farkla belirleniyor.",
    lead: "Ege'de üç ayrı satış yolu var: yurt dışı alıcıya satan üretici, doğrudan misafire satan konaklama işletmesi ve aracıya satan tarım üreticisi. Üçünün de sorunu farklı, o yüzden aynı şablon üçünde de eksik kalıyor.",
    sections: [
      {
        heading: "İhracatçı, otel ve üretici aynı şablonu paylaşmıyor",
        paragraphs: [
          "İhracatçı firmanın sitesinde teknik ayrıntı, otelin sitesinde müsaitlik ve fiyat mantığı, üreticinin sitesinde ürün adı ve sezon bilgisi belirleyici oluyor. Bu üç ihtiyaç aynı sayfa yapısıyla karşılanmıyor.",
          "Denizli'de gramaj, Muğla'da oda tipi farkı, Aydın'da hasat dönemi kararı değiştiriyor. Sayfa yapısı bu belirleyici bilgiyi öne çıkaracak şekilde kuruluyor.",
        ],
      },
      {
        heading: "Turizmde dil sürümü ve mobil hız",
        paragraphs: [
          "Yabancı misafire satan tesiste her dil ayrı yazılmalı, çünkü o pazarın arattığı terimler farklı. Çeviri eklentisine bırakılan sayfa arama sonucunda karşılık bulmuyor.",
          "Rezervasyon aramalarının büyük kısmı telefondan yapılıyor. Ağır yüklenen galeri, misafiri fotoğrafı görmeden kaybettiriyor ve o ziyaret geri gelmiyor.",
        ],
      },
    ],
    faqs: [
      {
        question: "İhracat yapan firmamız için hangi diller gerekli?",
        answer:
          "Hedef pazarınıza göre seçiliyor. Avrupa'ya satan üretici için İngilizce ve Almanca, Ortadoğu'ya satan için Arapça anlamlı oluyor. Her dil ayrı yazılıyor ve teknik terimler o pazarın karşılığıyla giriyor; diller arasında hreflang kuruluyor.",
      },
      {
        question: "Otel sitesinde online ödeme şart mı?",
        answer:
          "Şart değil. Oda sayısı azsa ve müsaitlik telefonla yönetiliyorsa talep formu ile WhatsApp yolu daha az sürtünme yaratıyor. Doluluk yoğunsa takvim ve ödeme sistemi anlamlı oluyor.",
      },
    ],
  },
  akdeniz: {
    metaTitle: "Akdeniz Bölgesi Web Tasarım ve Yazılım | METEK Digital",
    metaDescription:
      "Antalya, Adana, Mersin ve Akdeniz illeri için özel web sitesi, çok dilli rezervasyon yolu ve teknik SEO. Turizm, tarım ve lojistik işletmelerine göre kurulur.",
    heroTitle: "Akdeniz'de web ve yazılım.",
    heroBlurb:
      "Sekiz ilde turizm, tarım ve liman ticareti aynı anda çalışıyor. Talebin çoğu yabancı ziyaretçiden veya bölgesel alıcıdan geliyor.",
    hubBlurb:
      "Antalya turizmi, Mersin limanı ve Çukurova tarımı bölgenin üç ekonomisi. Yabancı alıcı ve ziyaretçi payı yüksek olduğu için dil sürümü öne çıkıyor.",
    lead: "Akdeniz'de ziyaretçinin ve alıcının önemli kısmı yurt dışından geliyor. Turizmde platform komisyonu, ihracatta dil sürümü, bölgesel hizmette ise çevre illerde görünmek belirleyici oluyor.",
    sections: [
      {
        heading: "Turizmde komisyon, ticarette dil",
        paragraphs: [
          "Konaklama işletmesinin en pahalı kalemi platform komisyonu; doğrudan rezervasyon yolu kurulmadıkça her misafir aracıya pay bırakıyor. Oda tipleri kendi sayfalarında durduğunda ve talep formu WhatsApp'a bağlandığında bu pay azalıyor.",
          "Liman ve dış ticaret tarafında ise alıcı yurt dışında. Süreci anlatan ve hedef pazarın dilinde yazılmış sayfa, hizmet listeleyen sayfadan belirgin biçimde daha fazla talep karşılıyor.",
        ],
      },
      {
        heading: "Bölgesel hizmet veren firmanın görünürlüğü",
        paragraphs: [
          "Bölgesel çalışan firma çevre illerden de talep alıyor ama sitesinde yalnızca kendi ilini yazıyor. Hizmet bölgesi sayfada yazılı olmadığında o aramaların dışında kalınıyor.",
          "Hizmet alanı yapılandırılmış veride işaretleniyor ve Google İşletme Profili aynı listeyle tutuluyor. Önemli iller için açılan sayfalar, il adı değişmiş kopyalar değil, o ildeki işin gerçek farkını anlatan içerikler oluyor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Yabancı misafire satan tesiste hangi diller öncelikli?",
        answer:
          "Misafir profiline göre değişiyor. Antalya'da Rusça, Almanca ve İngilizce; Mersin ve Hatay hattında Arapça öne çıkıyor. Her dil ayrı yazılıyor ve o pazarın arattığı terimlerle kuruluyor.",
      },
      {
        question: "Acente ile çalışmayı bırakmamız mı gerekiyor?",
        answer:
          "Gerekmiyor. Doğrudan rezervasyon yolu ikinci kanal olarak kuruluyor ve acente payı zamanla azalıyor. Doğrudan gelen misafire platformda olmayan bir sebep verildiğinde bu geçiş hızlanıyor.",
      },
    ],
  },
  "ic-anadolu": {
    metaTitle: "İç Anadolu Web Tasarım ve Yazılım | METEK Digital",
    metaDescription:
      "Ankara, Konya, Kayseri, Eskişehir ve İç Anadolu illeri için özel web sitesi, yönetim paneli ve teknik SEO. Sanayi, mobilya ve makine üreticilerine göre kurulur.",
    heroTitle: "İç Anadolu'da web ve yazılım.",
    heroBlurb:
      "On üç ilde sanayi üretimi, kamu tedariki ve tarım aynı bölgede çalışıyor. Alıcının çoğu kurumsal ve teknik doğrulama yapıyor.",
    hubBlurb:
      "Konya makinesi, Kayseri mobilyası ve Ankara kamu tedariki bölgenin üç ana hattı. Site çoğu zaman bir yeterlilik dosyası gibi okunuyor.",
    lead: "İç Anadolu'da alıcı genellikle bir satın alma birimi veya bayi. Karar kişisel izlenimle değil, yazılı ve doğrulanabilir bilgiyle veriliyor: kapasite, belge, ürün ailesi ve teslim süresi.",
    sections: [
      {
        heading: "Üretici sitesi yeterlilik dosyası gibi okunuyor",
        paragraphs: [
          "Satın alma birimi ön elemeyi internetten yapıyor ve ürün fotoğrafından çok teknik uygunluğa bakıyor. Makine parkı, işlenebilir malzeme, tolerans aralığı ve kalite belgeleri sayfada yazılı olmadığında firma listeye alınmıyor.",
          "Konya, Kayseri, Eskişehir ve Kırıkkale hattında bu yapı standart teslim kalemi. Teklif formuna teknik resim yükleme alanı eklendiğinde yazışma tek tura iniyor.",
        ],
      },
      {
        heading: "Katalog PDF olarak konduğunda ne oluyor",
        paragraphs: [
          "Tek PDF olarak yüklenen katalog, arama motorunun ürünleri tek tek indekslemesini engelliyor. Ürünler aranıyor ama sayfanız o aramaların hiçbirinde görünmüyor.",
          "Her ürün ailesi kendi sayfasında, ölçü ve seçenekleriyle yayınlanıyor; PDF ek olarak kalıyor. Bayiler için şifreli fiyat listesi ayrı bir alan olarak kurulabiliyor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bayi ağı olan üretici sitede neyi ayırmalı?",
        answer:
          "Son kullanıcı ile bayi ayrı yollara ayrılıyor: son kullanıcı ürün ve servis bilgisi arıyor, bayi fiyat listesi ve stok görmek istiyor. Bayi tarafı şifreli bir alan olarak kuruluyor, böylece fiyat kamuya açık kalmıyor.",
      },
      {
        question: "Kamu ihalesine giren firma için site farklı mı kurulur?",
        answer:
          "Yapı aynı, vurgu farklı oluyor. Belgeler, kapasite ve referans işler doğrulanabilir biçimde ve tarihli duruyor. İhale dosyası hazırlayan kişi siteyi kaynak alıyor, bu yüzden bilgi eskimemiş olmalı.",
      },
    ],
  },
  karadeniz: {
    metaTitle: "Karadeniz Bölgesi Web Tasarım ve Yazılım | METEK Digital",
    metaDescription:
      "Samsun, Trabzon, Ordu, Çorum ve Karadeniz illeri için özel web sitesi, ürün paneli ve teknik SEO. Fındık, gıda ve turizm işletmelerine göre kurulur.",
    heroTitle: "Karadeniz'de web ve yazılım.",
    heroBlurb:
      "On sekiz ilde tarımsal ihracat, gıda üretimi ve doğa turizmi iç içe. Ürünlerin çoğu il adıyla biliniyor ama üreticiler kendi adıyla aranmıyor.",
    hubBlurb:
      "Fındık, çay, bal ve peynir gibi coğrafi işaretli ürünler bölgenin adını taşıyor. Üreticinin sorunu talep yaratmak değil, o talebin karşısına kendi adıyla çıkmak.",
    lead: "Karadeniz'de ürünün adı zaten aranıyor. Üreticinin işi yeni bir talep yaratmak değil, o aramada aracının değil kendi sayfasının görünmesini sağlamak. Turizm tarafında ise ziyaretçi önce bölgeyi, sonra işletmeyi arıyor.",
    sections: [
      {
        heading: "Coğrafi işaretli ürün kendi adıyla satılmalı",
        paragraphs: [
          "Tescilli ürün adı genellikle en yüksek arama hacmine sahip terim oluyor, ama üreticilerin çoğu bu adı sayfa başlığında kullanmıyor. Ürün aranıyor, üretici bulunmuyor.",
          "Her ürün kendi sayfasında, aranan adıyla, üretim yöntemi ve tescil bilgisiyle yayınlanıyor. Bu bilgiler ürünü pazaryerindeki fiyat karşılaştırmasının dışına çıkarıyor.",
        ],
      },
      {
        heading: "Turizmde önce bölge, sonra işletme aranıyor",
        paragraphs: [
          "Ziyaretçi kararı konaklamadan önce yer üzerinden veriyor: yayla, göl, tarihi alan. Bölgeyi anlatan içerik bu yüzden ilk temas noktası oluyor ve yapay zeka yanıtlarında da kaynak olarak kullanılabiliyor.",
          "İçeriğin sonunda konaklama veya tur sayfasına iç bağlantı verildiğinde araştırma trafiği işletmeye dönüyor. Yalnızca tesis tanıtımı yapan sayfa bu akışın dışında kalıyor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sezonluk çalışan işletme sitesini kış aylarında ne yapmalı?",
        answer:
          "Kapatmak yerine sezon dışı içerikle güncel tutuluyor: bölge rehberi, ulaşım, erken rezervasyon bilgisi. Düzenli güncellenen sayfa sezon başında zaten üstte oluyor, sıfırdan yükselmeye çalışmıyor.",
      },
      {
        question: "İhracat yapan gıda firmasında sitede ne bulunmalı?",
        answer:
          "Ürün sınıfı, kalibre, işleme yöntemi, sertifikalar ve yıllık kapasite doğrulanabilir biçimde duruyor. İthalatçı önce uygunluğu kontrol ediyor, fiyatı sonra soruyor. İngilizce sürüm sektör terimleriyle yazılıyor.",
      },
    ],
  },
  "dogu-anadolu": {
    metaTitle: "Doğu Anadolu Web Tasarım ve Yazılım | METEK Digital",
    metaDescription:
      "Erzurum, Van, Malatya, Elazığ ve Doğu Anadolu illeri için özel web sitesi, çok dilli sürüm ve teknik SEO. Turizm, tarım ve sınır ticareti işletmelerine göre kurulur.",
    heroTitle: "Doğu Anadolu'da web ve yazılım.",
    heroBlurb:
      "On dört ilde kış turizmi, tarımsal ihracat ve sınır ticareti çalışıyor. Rekabetin düşük olduğu yerde doğru kurulmuş tek bir sayfa uzun süre üstte kalıyor.",
    hubBlurb:
      "Bölgede çoğu işletmenin sayfası yok veya yıllardır güncellenmiyor. Bu, aramada karşılığı boş duran geniş bir alan bırakıyor.",
    lead: "Doğu Anadolu'da asıl fırsat rekabetin düşük olması. Aynı hizmeti veren firmaların çoğunun sayfası olmadığı için, doğru kurulmuş tek bir site il genelindeki aramanın üstünde uzun süre kalabiliyor.",
    sections: [
      {
        heading: "Rekabetin düşük olduğu yerde maliyet de düşük",
        paragraphs: [
          "Az sayıda sayfa ve doğru kurulmuş bir yapı, sürekli içerik üretmeye gerek kalmadan uzun süre sıralamada kalıyor. İstanbul'da aylarca süren bir çalışma burada birkaç sayfayla karşılanabiliyor.",
          "İlk sürüm beş sayfa olabilir: hizmetler, hakkımızda, sık sorulanlar, iletişim ve ana sayfa. Önemli olan her sayfanın tek bir konusu olması ve iletişim yolunun her yerden ulaşılabilir durması.",
        ],
      },
      {
        heading: "Sınır ticareti ve çok dilli talep",
        paragraphs: [
          "Van, Ağrı, Iğdır ve Hakkâri hattında talebin bir kısmı yurt dışından geliyor ve ziyaretçi kendi dilinde arıyor. Yalnızca Türkçe duran sayfa bu talebin tamamen dışında kalıyor.",
          "Hedef pazarın dilinde sayfa ve o dilde yanıt verebilen bir iletişim yolu kuruluyor. WhatsApp üzerinden otomatik ilk yanıt, dil farkının yarattığı gecikmeyi kapatıyor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Uzaktaki bir ilde proje yürütmek sorun oluyor mu?",
        answer:
          "Olmuyor. Görüşme, tasarım onayı, içerik toplama ve teslim uzaktan ilerliyor ve kayıtlar yazılı tutuluyor. Mesafe süreyi veya fiyatı değiştirmiyor; yerinde çekim gerekiyorsa ayrıca planlanıyor.",
      },
      {
        question: "Kış turizmi işletmesi sezon hazırlığını ne zaman yapmalı?",
        answer:
          "Arama hacmi yükselmeden önce, yaz sonunda. Sayfaların indekslenmesi ve sıralanması zaman aldığı için sezon açıldığında yapılan güncelleme geç kalıyor.",
      },
    ],
  },
  "guneydogu-anadolu": {
    metaTitle: "Güneydoğu Anadolu Web Tasarım ve Yazılım | METEK Digital",
    metaDescription:
      "Gaziantep, Şanlıurfa, Diyarbakır, Mardin ve Güneydoğu illeri için özel web sitesi, ihracat odaklı çok dilli sürüm ve teknik SEO.",
    heroTitle: "Güneydoğu'da web ve yazılım.",
    heroBlurb:
      "Dokuz ilde ihracat sanayii, tarım ve kültür turizmi çalışıyor. Alıcının önemli kısmı yurt dışında ve Arapça veya İngilizce arıyor.",
    hubBlurb:
      "Gaziantep halısı ve gıdası bölgenin ihracat hacmini taşıyor; Mardin ve Şanlıurfa ise uluslararası kültür turizmi çekiyor.",
    lead: "Güneydoğu'da ihracat ve turizm aynı anda yabancı alıcıya bakıyor. Tek dilde duran site, bu talebin hiçbirini karşılamıyor; fuar dışında talep gelmemesinin en yaygın sebebi de bu.",
    sections: [
      {
        heading: "Fuar dışında da bulunabilir olmak",
        paragraphs: [
          "İhracatçı firmaların çoğu talebi fuarlardan alıyor ve yılın kalan aylarında sessiz kalıyor. Ürün sayfaları arama sonucunda tek tek görünmediğinde firma yalnızca fuar dönemlerinde bulunuyor.",
          "Koleksiyon ve ürün grupları kendi sayfalarında teknik özellikleriyle yayınlanıyor, İngilizce ve Arapça sürümler ayrı yazılıyor. Fuar dışı talep buradan geliyor.",
        ],
      },
      {
        heading: "Kültür turizminde araştırma trafiği",
        paragraphs: [
          "Ziyaretçi önce yeri araştırıyor: ziyaret süresi, ulaşım, en iyi saatler, çevredeki diğer alanlar. Bu içerik İngilizce de yayınlandığında uluslararası aramaya giriliyor.",
          "Konaklama veya restoran sayfasına iç bağlantı verildiğinde araştırma trafiği işletmeye dönüşüyor. Aynı içerik yapay zeka yanıtlarında da kaynak olarak alınabiliyor.",
        ],
      },
    ],
    faqs: [
      {
        question: "İhracat için Arapça sürüm gerekli mi?",
        answer:
          "Ortadoğu ve Kuzey Afrika pazarına satıyorsanız gerekli. Ürün ve hizmet adları o dildeki karşılığıyla yazılıyor, makine çevirisi kullanılmıyor. WhatsApp üzerinden o dilde yanıt verebilen bir yol talebi doğrudan alıyor.",
      },
      {
        question: "Butik otelde oda farkları nasıl anlatılmalı?",
        answer:
          "Her oda tipi kendi sayfasında manzarası, kat bilgisi ve büyüklüğüyle duruyor. Misafir fiyat farkının sebebini göremediğinde en ucuzu seçiyor veya vazgeçiyor. Gerçek fotoğraf ve net anlatım doğrudan rezervasyonu artırıyor.",
      },
    ],
  },
};
