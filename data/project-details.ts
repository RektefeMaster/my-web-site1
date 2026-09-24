import { getProjectGallery, type ProjectGalleryShot } from "./project-galleries";

export type { ProjectGalleryShot };

export type ProjectProofShot = {
  src: string;
  alt: string;
  source: string;
  caption: string;
  span?: string;
  /** Default cover. Contain keeps full chat UI readable. */
  fit?: "cover" | "contain";
};

export type ProjectProof = {
  kicker: string;
  title: string;
  lead: string;
  note?: string;
  shots: ProjectProofShot[];
};

export type ProjectDetail = {
  /** Kart / detay başlığı; yoksa projects.ts name kullanılır */
  title?: string;
  tag: string;
  summary: string;
  whatTitle: string;
  what: string[];
  howTitle: string;
  how: string[];
  stack: string[];
  result?: string;
  /** Yayın sonrası sohbet motoru / yerel paket kayıtları */
  proof?: ProjectProof;
  /** Detay sayfasında ek ekran görüntüleri; yoksa project-galleries.ts kullanılır. */
  gallery?: ProjectGalleryShot[];
  /** Sayfa sonu CTA bandı */
  ctaLabel?: string;
  ctaTitle?: string;
  ctaBlurb?: string;
  ctaButton?: string;
};

export type ProjectDetailsByLocale = Record<string, Record<string, ProjectDetail>>;

export const projectDetails: ProjectDetailsByLocale = {
  tr: {
    "elif-seren": {
      tag: "Kurumsal web",
      summary: "Uzm. Klinik Psikolog Elif Seren için güven veren dijital alan. EMDR ve psikoterapi hizmetleri, kurumsal kimlikle randevuya yönlendirir.",
      whatTitle: "Ne yaptık?",
      what: [
        "Güven ve dinginlik veren tipografi ve renk paleti.",
        "EMDR, Psikodinamik ve Somatik Deneyimleme gibi uzmanlık alanlarının sunumu.",
        "Klinik ortamını ve akademik yetkinliği öne çıkaran içerik mimarisi.",
        "Randevu ve iletişim için net bir akış.",
        "Mobilde pürüzsüz çalışan tek sayfalık hissiyat.",
      ],
      howTitle: "Nasıl çalışıyor?",
      how: [
        "Ziyaretçi terapi yaklaşımlarını ve uzmanlıkları inceler.",
        "Kliniğin fiziksel konumu ve atmosferi hakkında bilgi alır.",
        "Randevu oluşturma adımlarına kolayca geçer.",
        "Yüksek performanslı altyapı ile sayfa anında yüklenir.",
      ],
      stack: ["Next.js", "React", "Tailwind CSS"],
      result: "Canlı site: güven uyandıran, randevu odaklı ve mobil uyumlu kurumsal klinik sitesi.",
      ctaLabel: "Sıradaki proje",
      ctaTitle: "Kliniğiniz için dijital bir alan mı istiyorsunuz?",
      ctaBlurb: "Uzmanlığınızı yansıtan ve danışanlarınıza güven veren bir web sitesi kuralım. Kısa özetten sonra kapsamı netleştiririm.",
      ctaButton: "Projemi başlat",
    },
    "masal-koltuk": {
      tag: "Yerel arama",
      summary:
        "Web sitesi ihtiyacı için Türkiye'de Malatya'da faaliyet gösteren MASAL Koltuk Yıkama firması için SEO ve GEO öncelikli, son teknolojiler ile özenle hazırlanmış web sitesini baştan sona tasarladık. 15 gün önce web sitesi olmayan bu işletme bugün hem Google aramalarında hem de tüm yapay zeka platformlarında aynı niyetli bütün sorgularda en başta öneriliyor. Site yayına girdikten sonra müşteriler aramaya başladı, firma yeni müşteri buldu.",
      whatTitle: "Ne yaptık",
      what: [
        "Web sitesi ihtiyacı için Türkiye'de Malatya'da faaliyet gösteren MASAL Koltuk Yıkama firması için SEO ve GEO öncelikli, son teknolojiler ile özenle hazırlanmış web sitesini baştan sona tasarladık.",
        "Google İşletme Profili ve Search Console profilini açıp yönetmeye devam ettik.",
      ],
      howTitle: "Ne oldu",
      how: [
        "15 gün önce web sitesi olmayan bu işletme bugün hem Google aramalarında hem de tüm yapay zeka platformlarında aynı niyetli bütün sorgularda en başta öneriliyor.",
        "Site yayına girdikten sonra müşteriler aramaya başladı. İnsanlar Google'dan ve yapay zekadan MASAL'ı bulup aradı. Müşteri geldi, iş geldi.",
        "MASAL Koltuk Yıkama web sitesi maliyetini çoktan çıkardı.",
      ],
      stack: ["HTML", "CSS", "JavaScript", "JSON-LD"],
      result:
        "Bize güvenen müşterimize güveninin karşılığını en iyi şekilde verdik ve vermeye devam edeceğiz. Yalnız görünmek değil, iş getirmek. Bunu yaptık.",
      proof: {
        kicker: "Kanıt",
        title: "Kayıtlar duruyor",
        lead: "Artık insanlar Google aramalarından daha çok yapay zeka aramalarına yöneliyor, biz de bunun bilincindeyiz! Teknolojik altyapımızı dönemin şartlarına ve gelişmelerine uygun olarak güncelliyor, geliştiriyor ve takibini sürdürüyoruz. Aşağıdaki kayıtlar yayından sonraki gerçek sonuç: ChatGPT, Gemini, Google AI ve Google aynı niyetli sorgularda MASAL'ı en başta öneriyor.",
        note: "Sizin de işletmeniz veya bireysel işleriniz yapay zekalar ve Google aramaları tarafından görünüp potansiyel müşterilerinizin karşısına çıkmasını istiyorsanız bize ulaşın! Maliyet değil, yatırım yapın!",
        shots: [
          {
            src: "/projects/masal-koltuk/proof/gemini-sofa.webp",
            alt: "Gemini, Malatya koltuk yıkama sorusunda MASAL'ı en başta öneriyor",
            source: "Gemini",
            caption: "Malatya'da koltuk yıkama. MASAL en başta.",
            span: "col-span-6 md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[560px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-steam.webp",
            alt: "ChatGPT buharlı temizlik sorusunda MASAL'ı ilk öneriyor",
            source: "ChatGPT",
            caption: "Buharlı temizlik. İlk öneri MASAL.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-ai.webp",
            alt: "Google AI, MASAL'ı en başta öneriyor",
            source: "Google AI",
            caption: "Google AI. Yine MASAL en başta.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-local.webp",
            alt: "Google aramasında MASAL en üstte",
            source: "Google",
            caption: "Google araması. En üstte MASAL.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-car.webp",
            alt: "ChatGPT araç koltuğu sorusunda MASAL'ı ilk öneriyor",
            source: "ChatGPT",
            caption: "Araç koltuğu. Yine MASAL.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/gemini-car.webp",
            alt: "Gemini araç içi temizlik sorusunda MASAL'ı en başta öneriyor",
            source: "Gemini",
            caption: "Araç içi temizlik. Yine en başta.",
            span: "col-span-6 md:col-span-4 min-h-[220px] md:min-h-[320px]",
            fit: "contain",
          },
        ],
      },
      ctaLabel: "Sıradaki iş",
      ctaTitle: "Maliyet değil, yatırım yapın!",
      ctaBlurb:
        "Sizin de işletmeniz veya bireysel işleriniz yapay zekalar ve Google aramaları tarafından görünüp potansiyel müşterilerinizin karşısına çıkmasını istiyorsanız bize ulaşın!",
      ctaButton: "Bize ulaşın",
    },
    wcc: {
      tag: "Kurumsal web",
      summary:
        "ABD merkezli dolap üreticisi Wholesale Cabinet Creations için ürün hatlarını, tamamlanmış mutfak projelerini ve doğrudan teklif altyapısını bir araya getiren kurumsal web platformu.",
      whatTitle: "Mühendislik ve arayüz kapsamı",
      what: [
        "Mutfak, banyo ve özel üretim dolap serilerini ayıran kurumsal bilgi mimarisi.",
        "Mobil ekranlarda teknik detayları ve yüksek çözünürlüklü fotoğrafları rahatça inceleme imkânı.",
        "Üretim kapasitesi, fabrika standartları ve proje referansları için bağımsız güven alanları.",
        "İncelenen ürün grubundan doğrudan tetiklenen dinamik teklif talep formu.",
        "Ekibin yeni görseller ve metinler eklemesini sağlayan pratik içerik yönetim bağlantısı.",
      ],
      howTitle: "Kullanıcı deneyimi ve dönüşüm yolu",
      how: [
        "Ziyaretçi ürün kategorilerini ve tamamlanmış referans mutfakları inceler.",
        "İhtiyaç duyduğu model ve ölçü detaylarını belirledikten sonra tek tıkla teklif formuna geçer.",
        "İşletme ekibi gelen talepleri panelden yönetirken siteye yeni projeleri kolayca ekler.",
      ],
      stack: ["React", "Vite", "TypeScript"],
      result:
        "Platform, ürün keşfi ile ticari teklif talebi arasındaki tüm sürtünmeyi ortadan kaldırırken firmanın üretim gücünü dijitalde eksiksiz temsil ediyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Üretici firmanız için teklif odaklı kurumsal web sitesi",
      ctaBlurb:
        "Ürün hatlarınız ve teklif alma adımlarınız netleştiğinde sayfa mimarisini ve içerik altyapısını birlikte planlayabiliriz.",
      ctaButton: "Projemi başlat",
    },
    aydnnacar: {
      tag: "Marka ve katalog",
      summary:
        "Nacar Mobilya'nın salon, yemek ve yatak odası koleksiyonlarını malzeme, kumaş ve ölçü detaylarıyla satış ekibine bağlayan dijital katalog mimarisi.",
      whatTitle: "Katalog mimarisi ve görsel kurgu",
      what: [
        "Mobilya işçiliğini ve kumaş dokularını öne çıkaran editoryal tipografi.",
        "Oda ve koleksiyon bazlı gezinme sunan esnek filtreleme altyapısı.",
        "Model sayfalarında net teknik ölçüler, ahşap türleri ve modül seçenekleri.",
        "Küçük ekranlarda hızlı ve akıcı ürün tarama performansı.",
        "İncelenen ürünün model kodu korunarak başlatılan satış ve fiyat görüşmesi.",
      ],
      howTitle: "Koleksiyon keşfinden satış masasına",
      how: [
        "Müşteri oda konseptini seçerek koleksiyondaki uyumlu parçaları karşılaştırır.",
        "Modelin ölçü, kumaş ve renk alternatiflerini inceledikten sonra doğrudan bilgi talep eder.",
        "Yeni tasarımlar ve sezonluk seriler mevcut katalog yapısına hızla dahil edilir.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "Fiziksel showroom deneyimini dijital ortama taşıyan katalog, müşterinin doğru ürünü bulup doğrudan satış yetkilisiyle temas kurmasını sağlıyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Koleksiyonunuzu dijital bir ürün kataloğuna dönüştürün",
      ctaBlurb:
        "Koleksiyon hacminiz ve müşterilerin talep ettiği teknik bilgiler doğrultusunda en uygun katalog kurgusunu hazırlayalım.",
      ctaButton: "Projemi başlat",
    },
    wuffbutik: {
      tag: "Butik web",
      summary:
        "Wuuf Butik için sezonluk koleksiyonları, mağaza atmosferini ve doğrudan stil danışmanlığına açılan WhatsApp iletişimini buluşturan butik web vitrini.",
      whatTitle: "Butik kimliği ve ürün sunumu",
      what: [
        "Markanın çağdaş görsel diline ve ürün tarzına özel tipografik hiyerarşi.",
        "Öne çıkan parçaları ve koleksiyonları kategorilere ayıran ferah vitrin.",
        "Fiziksel mağaza konumu, çalışma saatleri ve yol tarifi entegrasyonu.",
        "Beğenilen ürün üzerinden doğrudan başlatılan bire bir WhatsApp görüşmesi.",
        "Mobil cihazlarda anında yüklenen yüksek performanslı görsel altyapı.",
      ],
      howTitle: "Vitrin gezintisinden anlık iletişime",
      how: [
        "Ziyaretçi güncel parçaları inceler ve mağaza detaylarına göz atar.",
        "Beden, stok veya kombin önerisi için tek dokunuşla WhatsApp sohbeti başlatır.",
        "Yeni gelen parçalar mevcut vitrin düzenine zahmetsizce eklenir.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "Butiğin özgün ruhunu yansıtan platform, sosyal medya trafiğini doğrudan mağaza ziyaretine ve WhatsApp siparişine dönüştürüyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Butiğiniz için şık ve fonksiyonel bir dijital vitrin",
      ctaBlurb:
        "Koleksiyonlarınızın yapısını ve satış akışınızı paylaşın, mağazanızı en doğru arayüzle dijitale taşıyalım.",
      ctaButton: "Projemi başlat",
    },
    "altitude-residence": {
      tag: "Lüks gayrimenkul",
      summary:
        "Altitude Private Residences için mimari vizyonu, kat planlarını ve panoramik yaşam alanlarını özel randevu talebine bağlayan satış platformu.",
      whatTitle: "Proje sunumu ve satış kurgusu",
      what: [
        "Mimari renderları ve yaşam atmosferini sergileyen sinematik açılış sekansı.",
        "Daire tiplerini, kat planlarını ve metrekare dağılımlarını karşılaştıran interaktif modül.",
        "Lokasyon avantajları, sosyal alanlar ve teknik donanım için bağımsız anlatı blokları.",
        "Sayfanın her noktasından kolayca erişilen özel sunum ve randevu formu.",
        "Farklı ekran genişliklerine göre özel optimize edilmiş kompozisyon dengesi.",
      ],
      howTitle: "Mimari keşiften özel sunum randevusuna",
      how: [
        "Yatırımcı projenin genel konseptini inceleyip bağımsız rezidans tiplerine odaklanır.",
        "Kat planı ve lokasyon verilerini değerlendirdikten sonra satış ofisinden randevu ister.",
        "Proje aşamaları ve güncellemeler tasarım bütünlüğü bozulmadan sisteme eklenir.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Projenin prestijini yüksek editoryal standartlarla yansıtan web sitesi, nitelikli yatırımcı adaylarını doğrudan satış ofisiyle buluşturuyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Gayrimenkul projeniz için özel tanıtım ve satış sitesi",
      ctaBlurb:
        "Daire tipleri ve mevcut satış materyalleri netleştiğinde projenize özel arayüz kurgusunu birlikte oluşturalım.",
      ctaButton: "Projemi başlat",
    },
    "casa-aurelia": {
      tag: "Butik otel",
      summary:
        "Casa Aurelia Roma'nın tarihi atmosferini, oda süitlerini ve kişiye özel konaklama deneyimini iki dilde sunan rezervasyon vitrini.",
      whatTitle: "Çok dilli otel deneyimi",
      what: [
        "Mekânın tarihi dokusunu yansıtan geniş kadrajlı fotoğraf dili ve zarif tipografi.",
        "Süit seçenekleri, oda olanakları ve hizmet detayları için net sayfa blokları.",
        "İtalyanca ve İngilizce tam senkronize çalışan çok dilli içerik mimarisi.",
        "Roma merkezindeki lokasyonu çevre rehberiyle harmanlayan etkileşimli alan.",
        "Her oda detayından doğrudan başlatılan doğrudan rezervasyon ve bilgi talebi.",
      ],
      howTitle: "Oda seçiminden rezervasyon teyidine",
      how: [
        "Konuk kendi dilinde süitlerin özelliklerini ve otelin sunduğu ayrıcalıkları inceler.",
        "Konum ve transfer detaylarını kontrol ettikten sonra tercih ettiği oda için talep bırakır.",
        "Dil geçişi kullanıcıyı sayfadan koparmadan ilgili içeriğe anında yönlendirir.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "İki dilli platform, Roma'daki butik konaklama ruhunu korurken doğrudan rezervasyon temaslarını belirgin şekilde artırıyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Oteliniz için çok dilli tanıtım ve rezervasyon altyapısı",
      ctaBlurb:
        "Oda tiplerinizi ve hedeflediğiniz yabancı dilleri paylaşın, otelinizin prestijine uygun web yapısını kuralım.",
      ctaButton: "Projemi başlat",
    },
    "seraphine-atelier": {
      tag: "Moda vitrini",
      summary:
        "Séraphine Atelier'nin kadın ve erkek haute couture koleksiyonlarını editoryal bir akışla özel prova randevusuna bağlayan dijital moda evi.",
      whatTitle: "Lookbook ve atölye anlatısı",
      what: [
        "Özel dikim sanatını yansıtan karanlık tonlar, rafine serif tipografi ve dingin hareketler.",
        "Kumaş cinsi, dikiş detayları ve kalıp bilgisini içeren sezonluk kadın lookbook'u.",
        "Erkek özel dikim koleksiyonunu bağımsız bir görsel dille sergileyen katalog.",
        "Atölye felsefesini ve zanaat sürecini anlatan editoryal marka sayfası.",
        "Koleksiyon sayfalarından kişisel stil danışmanlığı ve prova talebine geçiş.",
      ],
      howTitle: "Koleksiyon ilhamından özel provaya",
      how: [
        "Ziyaretçi sezon koleksiyonunu inceleyerek parçaların kesim ve kumaş detaylarını görür.",
        "Atölye bölümünde özel dikim sürecinin felsefesini ve randevu aşamalarını okur.",
        "Beğendiği parçalar için atölyeden kişiye özel prova saati talep eder.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Moda evinin seçkin vizyonunu dijital dünyaya aktaran site, koleksiyon incelemesini doğrudan özel prova randevularına dönüştürüyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Moda markanız için editoryal lookbook ve randevu sitesi",
      ctaBlurb:
        "Koleksiyon yapınızı ve randevu alma adımlarınızı aktarın, markanıza yakışan dijital deneyimi tasarlayalım.",
      ctaButton: "Projemi başlat",
    },
    "havva-baklava": {
      tag: "Butik web",
      summary:
        "HAVVA Baklava'nın Gaziantep'ten Köln'e uzanan zanaat hikâyesini, güncel ürün fiyatlarını ve anlık WhatsApp siparişini buluşturan butik web platformu.",
      whatTitle: "Lezzet menüsü ve sipariş kurgusu",
      what: [
        "Ürün tazeliğini ve el işçiliğini vurgulayan zengin fotoğraf kompozisyonları.",
        "Geleneksel üretim aşamalarını anlatan akıcı hikâye kurgusu.",
        "Tepsi ve porsiyon seçeneklerini güncel fiyatlarla gösteren şeffaf menü.",
        "Ürün çeşidi, kilogram ve teslimat saati bilgisiyle önceden doldurulan WhatsApp sipariş mesajı.",
        "Köln atölye adresi, yol tarifi ve çalışma saatleri entegrasyonu.",
      ],
      howTitle: "Taze menüden anlık WhatsApp siparişine",
      how: [
        "Müşteri baklava çeşitlerini ve güncel fiyat listesini inceler.",
        "Seçimini tamamladıktan sonra sipariş detaylarını içeren WhatsApp görüşmesini başlatır.",
        "Teslimat veya gel-al organizasyonu atölye ekibiyle saniyeler içinde tamamlanır.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Web sitesi, zanaat hikâyesini güncel fiyat şeffaflığıyla sunarak atölyenin sipariş operasyonunu hızlandırıyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Zanaat işletmeniz için menü ve hızlı sipariş sitesi",
      ctaBlurb:
        "Ürün çeşitlerinizi ve sipariş alma yönteminizi paylaşın, müşterilerinizin kolayca sipariş vereceği bir yapı kuralım.",
      ctaButton: "Projemi başlat",
    },
    "sahra-butik": {
      tag: "Butik web",
      summary:
        "Sahra Butik'in günlük, spor ve özel koleksiyonlarını ürün bazlı beden ve stok sorgulamasıyla WhatsApp'a taşıyan modern katalog sitesi.",
      whatTitle: "Koleksiyon filtreleme ve ürün detayları",
      what: [
        "Kumaş kalitesini ve dikiş detaylarını gösteren yüksek çözünürlüklü görsel ızgara.",
        "Koleksiyonları kullanım alanına göre ayıran sezgisel gezinme menüsü.",
        "Ürün kartlarında beden skalası, boy ölçüleri ve kumaş içerik açıklamaları.",
        "Fiziksel mağaza konumu ve çalışma saatlerini içeren lokasyon bölümü.",
        "Seçilen ürünün kodu ve fotoğrafıyla birlikte doğrudan WhatsApp'a giden stok butonu.",
      ],
      howTitle: "Katalogdan hızlı stok ve beden kontrolüne",
      how: [
        "Müşteri ilgilendiği koleksiyonu seçip modellerin kalıp ve kumaş bilgilerini inceler.",
        "Beğendiği parçanın stok durumunu saniyeler içinde WhatsApp üzerinden mağazaya iletir.",
        "Mağaza ekibi gelen ürün mesajına anında yanıt vererek satışı tamamlar.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Katalog, sosyal medyadan gelen takipçilere aradıkları ürünü saniyeler içinde bulma ve anında sipariş verme konforu sunuyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Giyim markanız için ürün kataloğu ve WhatsApp satış altyapısı",
      ctaBlurb:
        "Koleksiyon hacminizi ve satış süreçlerinizi paylaşın, takipçilerinizi doğrudan müşteriye dönüştürecek arayüzü hazırlayalım.",
      ctaButton: "Projemi başlat",
    },
    "vela-skin-atelier": {
      tag: "Cilt atölyesi",
      summary:
        "VELA Skin Atelier SoHo için cilt bakım protokollerini, kişiye özel seans sürelerini ve konsültasyon randevusunu organize eden randevu platformu.",
      whatTitle: "Bakım protokolleri ve randevu kurgusu",
      what: [
        "Kişiselleştirilmiş cilt bakımını yansıtan sıcak toprak tonları ve rafine tipografi.",
        "Reset, Sculpt, Renew ve Restore protokolleri için hazırlanan ayrıntılı seans kartları.",
        "Her bakımın etki mekanizmasını ve seans süresini açıklayan şeffaf içerik blokları.",
        "SoHo stüdyosunun randevu öncesi hazırlık kurallarını içeren bilgilendirme alanı.",
        "İlk seans öncesi cilt analizi ve konsültasyon talebini toplayan randevu akışı.",
      ],
      howTitle: "Protokol seçiminden stüdyo randevusuna",
      how: [
        "Danışan stüdyonun bakım felsefesini okuyup ihtiyacına uygun protokolü seçer.",
        "Seans süresi ve aşamaları hakkında bilgi aldıktan sonra konsültasyon talebi bırakır.",
        "Stüdyo ekibi talebi takvimle eşleştirerek randevuyu onaylar.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "VELA'nın dijital platformu, bakım menüsünü net bir uzmanlık diliyle sunarak seans öncesi tüm soru işaretlerini ortadan kaldırıyor.",
      ctaLabel: "Benzer proje",
      ctaTitle: "Güzellik ve bakım stüdyonuz için randevu odaklı web sitesi",
      ctaBlurb:
        "Bakım protokollerinizi ve randevu alma kurallarınızı paylaşın, stüdyonuza özel web altyapısını kuralım.",
      ctaButton: "Projemi başlat",
    },
    aiahi: {
      title: "Ahi AI",
      tag: "WhatsApp + CRM",
      summary:
        "Ahi AI, WhatsApp üzerinden gelen randevu taleplerini canlı takvim kurallarıyla yöneten yapay zekâ asistanı ve ekibin kullandığı operasyonel CRM paneli.",
      whatTitle: "Akıllı asistan ve CRM mimarisi",
      what: [
        "Resmi WhatsApp Cloud API altyapısıyla çalışan dinamik konuşma motoru.",
        "Çalışma saatleri, mola aralıkları ve personel uzmanlıklarına göre boşluk bulan takvim entegrasyonu.",
        "Müşteri kartları, randevu geçmişi, etiketler ve ekip notlarını barındıran merkezi CRM.",
        "Kuaför, klinik, oto servis ve danışmanlık gibi farklı sektörlere uyarlanabilen yanıt modelleri.",
        "Karmaşık durumlarda konuşmayı bağlamıyla birlikte yetkili personele devreden akıllı aktarım.",
        "Sistemin özelliklerini tanıtan kurumsal aiahi.net web sitesi.",
      ],
      howTitle: "WhatsApp mesajından merkezi müşteri kaydına",
      how: [
        "Müşteri işletmenin WhatsApp hattına yazarak randevu veya bilgi talep eder.",
        "Asistan güncel takvimi kontrol ederek en uygun boş saatleri önerir ve seçimi onaylar.",
        "Randevu kaydı anında takvime ve CRM paneline müşteri kartı olarak düşer.",
        "Operasyon ekibi günün tüm randevularını ve müşteri geçmişini tek ekrandan yönetir.",
      ],
      stack: ["Next.js", "TypeScript", "WhatsApp Cloud API", "PostgreSQL"],
      result:
        "Ahi AI, işletmelerin mesajlaşma trafiğindeki tüm manuel veri girişini sıfırlayarak randevu kaçırma riskini ortadan kaldırıyor.",
      ctaLabel: "Benzer sistem",
      ctaTitle: "İşletmenizin WhatsApp hattını CRM paneliyle otomatikleştirin",
      ctaBlurb:
        "Çalışma saatlerinizi, randevu kurallarınızı ve operasyonel ihtiyaçlarınızı konuşalım; asistanınızı hızla kuralım.",
      ctaButton: "Projemi başlat",
    },
    "whatsapp-bot": {
      title: "WhatsApp Sohbet Asistanı",
      tag: "Otomasyon",
      summary:
        "İşletmenin hizmet, fiyat ve çalışma saati sorularını onaylı verilerle yanıtlayan; takvimden boş saatleri bulup randevu oluşturan konuşma asistanı.",
      whatTitle: "Konuşma kurgusu ve takvim senkronizasyonu",
      what: [
        "Şirketin onaylı hizmet ve fiyat veritabanından beslenen güvenilir yanıt motoru.",
        "Google Calendar veya özel veritabanlarıyla çift yönlü konuşan randevu modülü.",
        "İptal edilen veya ötelenen randevuları anında takvime yansıtan dinamik kural seti.",
        "Randevu saatinden önce müşteriye giden otomatik onay ve hatırlatma mesajları.",
        "Pazarlık veya teknik destek gibi konularda konuşmayı personele aktaran devir mekanizması.",
      ],
      howTitle: "Soru sormaktan takvim onayına",
      how: [
        "Müşteri fiyat veya hizmet hakkında soru sorduğunda asistan anında net bilgi verir.",
        "Randevu talebi geldiğinde takvimdeki gerçek boş saatler listelenir ve seçim onaylanır.",
        "Görüşme kaydı ve seçilen saat ilgili personele bildirim olarak iletilir.",
      ],
      stack: ["WhatsApp Cloud API", "n8n", "Python", "PostgreSQL"],
      result:
        "Asistan, müşteri temsilcilerinin her gün harcadığı saatleri geri kazandırarak 7/24 kesintisiz randevu kabulü sağlıyor.",
      ctaLabel: "Benzer sistem",
      ctaTitle: "WhatsApp hattınızı akıllı bir randevu asistanına dönüştürün",
      ctaBlurb:
        "En sık gelen müşteri sorularınızı ve takvim işleyişinizi iletin, asistanınızın kapsamını birlikte belirleyelim.",
      ctaButton: "Projemi başlat",
    },
    "instagram-bot": {
      title: "Instagram Mesaj Asistanı",
      tag: "Otomasyon",
      summary:
        "Instagram Direkt Mesaj üzerinden gelen fiyat, ürün ve randevu sorularını ortak takvim ve CRM veri tabanıyla senkronize yöneten akıllı asistan.",
      whatTitle: "Instagram DM otomasyonu ve entegrasyon",
      what: [
        "Instagram DM trafiğini karşılayan onaylı bilgi ve fiyatlandırma yanıtları.",
        "WhatsApp asistanıyla aynı merkezi takvim ve veritabanına bağlı çalışma yapısı.",
        "Müsait saatleri anında sunan ve randevuyu takvime işleyen rezervasyon motoru.",
        "Önceden tanımlanmış hatırlatma ve yetkili personele canlı konuşma devri kuralları.",
      ],
      howTitle: "Direkt mesajdan ortak randevu takvimine",
      how: [
        "Takipçi Instagram üzerinden hizmet veya fiyat detaylarını sorar.",
        "Asistan soruyu yanıtlayıp takvimdeki uygun saatleri önererek randevuyu oluşturur.",
        "Kayıt merkezi CRM sistemine aktarılır, ekip tüm kanalları tek noktadan izler.",
      ],
      stack: ["Instagram Graph API", "n8n", "Python", "Supabase"],
      result:
        "Sosyal medya mesajlarını operasyonel bir kanala dönüştüren asistan, Instagram üzerindeki müşteri kayıplarını sıfıra indiriyor.",
      ctaLabel: "Benzer sistem",
      ctaTitle: "Instagram mesajlarınızı merkezi takviminize bağlayın",
      ctaBlurb:
        "Instagram üzerinden gelen mesaj yoğunluğunuzu ve takvim yapınızı paylaşın, entegrasyonu hemen kuralım.",
      ctaButton: "Projemi başlat",
    },
    crm: {
      title: "Satış ve Randevu Paneli",
      tag: "Yazılım",
      summary:
        "WhatsApp ve Instagram kanallarından gelen tüm randevuları, müşteri geçmişini ve ekip notlarını tek bir arayüzde birleştiren operasyonel yönetim paneli.",
      whatTitle: "Müşteri hafızası ve operasyon masası",
      what: [
        "Oluşturulan her yeni randevuyla birlikte otomatik açılan zengin müşteri kartı.",
        "İletişim kanalı, görüşme özeti, işlem geçmişi ve personele özel dahili notlar.",
        "Günün tüm randevularını ve salon/uzman doluluklarını gösteren canlı operasyon ekranı.",
        "İptal, erteleme ve durum değişikliklerinin tüm kanallara anında yansıması.",
      ],
      howTitle: "Gelen mesajdan ekip koordinasyonuna",
      how: [
        "Asistanların oluşturduğu randevular panelde anlık müşteri kaydı olarak listelenir.",
        "Ekip üyesi görüşme notlarını ekler, hizmet durumunu günceller ve randevuyu tamamlar.",
        "Müşterinin geçmişteki tüm temasları gelecekteki görüşmeler için hazır tutulur.",
      ],
      stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      result:
        "Panel, farklı mesajlaşma platformlarından gelen dağınık talepleri düzenli ve izlenebilir bir şirket hafızasına dönüştürüyor.",
      ctaLabel: "Benzer sistem",
      ctaTitle: "Tüm müşteri temaslarını tek bir panelde birleştirin",
      ctaBlurb:
        "İletişim kanallarınızı ve operasyonel ihtiyaçlarınızı konuşalım, ekibinize özel CRM panelini tasarlayalım.",
      ctaButton: "Projemi başlat",
    },
    "css-system": {
      tag: "Tasarım sistemi",
      summary:
        "Web sitesi ve yönetim panellerindeki renk, tipografi, boşluk ve bileşen standartlarını ortak tasarım token'larında birleştiren modüler CSS tasarım sistemi.",
      whatTitle: "Token mimarisi ve arayüz kütüphanesi",
      what: [
        "Renk rolleri, tipografi ölçekleri, kenar yuvarlama ve boşluk değişkenleri.",
        "Butonlar, form alanları, modallar ve gezinme öğelerini içeren temel bileşen seti.",
        "Açık ve koyu tema için semantik olarak kurgulanmış renk token katmanı.",
        "Geliştirici ekibin kuralları inceleyebileceği canlı dokümantasyon yüzeyi.",
        "Gelecekteki yeni ekranların mevcut kurallarla tutarlı üretilmesini sağlayan mimari.",
      ],
      howTitle: "Tasarım değişkenlerinden canlı koda",
      how: [
        "Bir renk veya tipografi kuralı merkezi token dosyasında güncellenir.",
        "Sisteme bağlı tüm web siteleri ve yönetim panelleri değişikliği otomatik olarak uygular.",
        "Yeni bir arayüz geliştirilirken sıfırdan CSS yazmak yerine hazır bileşenler birleştirilir.",
      ],
      stack: ["CSS Custom Properties", "Design Tokens"],
      result:
        "Tasarım sistemi, yazılım geliştirme sürecindeki mükerrer kodları ortadan kaldırarak tüm dijital temas noktalarında kusursuz bir marka tutarlılığı kuruyor.",
      ctaLabel: "Benzer sistem",
      ctaTitle: "Dijital ürünleriniz için merkezi CSS tasarım sistemi",
      ctaBlurb:
        "Mevcut arayüzlerinizi ve ürün çeşitliliğinizi inceleyelim, şirketinize özel tasarım sistemi mimarisini hazırlayalım.",
      ctaButton: "Projemi başlat",
    },
  },
  en: {
    "elif-seren": {
      tag: "Corporate web",
      summary: "A reassuring digital space for Clinical Psychologist Elif Seren. Showcases EMDR and psychotherapy services, routing to appointments.",
      whatTitle: "What we built",
      what: [
        "Typography and color palette conveying trust and calm.",
        "Presentation of specialties like EMDR, Psychodynamic, and Somatic Experiencing.",
        "Content architecture highlighting clinical environment and academic expertise.",
        "Clear path to appointments and contact.",
        "Smooth mobile experience with a clear flow.",
      ],
      howTitle: "How it works",
      how: [
        "Visitors explore therapy approaches and expertise.",
        "Learn about the clinic's physical location and atmosphere.",
        "Easily transition to appointment booking steps.",
        "Fast-loading infrastructure ensures instant page delivery.",
      ],
      stack: ["Next.js", "React", "Tailwind CSS"],
      result: "Live site: a trustworthy, appointment-driven, and mobile-ready corporate clinic site.",
      ctaLabel: "Up next",
      ctaTitle: "Need a digital space for your clinic?",
      ctaBlurb: "Let's build a website that reflects your expertise and builds trust with your clients. Send a short note and I will outline the build.",
      ctaButton: "Start my project",
    },
    "masal-koltuk": {
      tag: "Local search",
      summary:
        "They needed a website. MASAL Koltuk Yıkama works in Malatya, Turkey. We designed the whole site from start to finish, SEO and GEO first, carefully, with the latest tech. 15 days ago this business had no website. Today it gets recommended first on Google search and on every AI platform, on every query with the same intent. After launch, people called. The firm found new customers.",
      whatTitle: "What we did",
      what: [
        "They needed a website. We designed the whole site from start to finish for MASAL Koltuk Yıkama in Malatya, Turkey, SEO and GEO first, carefully, with the latest tech.",
        "We opened the Google Business Profile and the Search Console profile and we still run them.",
      ],
      howTitle: "What happened",
      how: [
        "15 days ago this business had no website. Today it gets recommended first on Google search and on every AI platform, on every query with the same intent.",
        "After launch, people called. They found MASAL on Google and on AI, then they picked up the phone. New customers came in. Work came in.",
        "The MASAL Koltuk Yıkama website has already paid for itself.",
      ],
      stack: ["HTML", "CSS", "JavaScript", "JSON-LD"],
      result:
        "The client who trusted us got that trust back the best way we can, and we will keep giving it back. Not just visibility. Work. That's what we did.",
      proof: {
        kicker: "The proof",
        title: "The captures are still here",
        lead: "People are turning to AI search more than Google now, and we know it! We keep updating, developing, and following our tech so it matches the times. These captures are the real result after launch: ChatGPT, Gemini, Google AI, and Google put MASAL first on the same kind of questions.",
        note: "If you want your business or your own work to show up in the AIs and in Google search, in front of people who could become your customers, get in touch! Don't treat it as a cost. Invest!",
        shots: [
          {
            src: "/projects/masal-koltuk/proof/gemini-sofa.webp",
            alt: "Gemini puts MASAL first for sofa cleaning in Malatya",
            source: "Gemini",
            caption: "Sofa cleaning in Malatya. MASAL first.",
            span: "col-span-6 md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[560px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-steam.webp",
            alt: "ChatGPT puts MASAL first for steam cleaning",
            source: "ChatGPT",
            caption: "Steam cleaning. First suggestion: MASAL.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-ai.webp",
            alt: "Google AI puts MASAL first",
            source: "Google AI",
            caption: "Google AI. MASAL first again.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-local.webp",
            alt: "MASAL at the top of Google search",
            source: "Google",
            caption: "Google search. MASAL at the top.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-car.webp",
            alt: "ChatGPT puts MASAL first for car seats",
            source: "ChatGPT",
            caption: "Car seats. MASAL again.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/gemini-car.webp",
            alt: "Gemini puts MASAL first for car interior cleaning",
            source: "Gemini",
            caption: "Car interior. First again.",
            span: "col-span-6 md:col-span-4 min-h-[220px] md:min-h-[320px]",
            fit: "contain",
          },
        ],
      },
      ctaLabel: "Your turn",
      ctaTitle: "Don't treat it as a cost. Invest!",
      ctaBlurb:
        "If you want your business or your own work to show up in the AIs and in Google search, in front of people who could become your customers, get in touch!",
      ctaButton: "Get in touch",
    },
    wcc: {
      tag: "Corporate web",
      summary:
        "A focused corporate web platform for Wholesale Cabinet Creations that organizes product collections, completed kitchen installations, and direct quote requests for US trade buyers.",
      whatTitle: "Architecture and deliverables",
      what: [
        "Corporate information architecture dividing cabinet series, custom millwork, and completed projects.",
        "Responsive interfaces ensuring technical specifications and high-resolution galleries render cleanly on mobile.",
        "Dedicated proof sections for manufacturing capacity, materials, and trade credentials.",
        "Direct quote request workflows integrated alongside product exploration.",
        "Content management connections allowing the internal team to update photography and specifications.",
      ],
      howTitle: "Buyer journey and conversion flow",
      how: [
        "Trade buyers review cabinet lines, finishes, and verified project case studies.",
        "Users transition directly from product specifications into the detailed quote inquiry form.",
        "The internal sales team receives structured leads while updating project archives independently.",
      ],
      stack: ["React", "Vite", "TypeScript"],
      result:
        "The platform eliminates friction between product exploration and commercial quote inquiries, presenting manufacturing capabilities with clarity and technical precision.",
      ctaLabel: "Similar project",
      ctaTitle: "A quote-focused web platform for your manufacturing business",
      ctaBlurb:
        "Share your product lines, trade requirements, and quote workflows to outline the site architecture and content system.",
      ctaButton: "Start a project",
    },
    aydnnacar: {
      tag: "Brand + catalog",
      summary:
        "A digital furniture catalog for Nacar Mobilya connecting living, dining, and bedroom collections with precise dimensions, materials, and direct sales inquiries.",
      whatTitle: "Catalog system and visual layout",
      what: [
        "Editorial typography and layout highlighting artisanal wood craftsmanship and textures.",
        "Room-based navigation and intuitive collection filters.",
        "Comprehensive model pages detailing dimensions, wood finishes, and upholstery options.",
        "Fast, lightweight mobile performance for fluid catalog browsing.",
        "Direct inquiry actions preserving selected model codes for sales representatives.",
      ],
      howTitle: "From collection discovery to sales consultation",
      how: [
        "Clients explore unified room concepts and compare compatible furniture pieces.",
        "Users review exact measurements and material swatches before initiating an inquiry.",
        "New seasonal designs are integrated into the existing catalog structure without layout disruption.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "The catalog bridges physical showroom curation with digital convenience, enabling buyers to evaluate specifications and connect directly with sales staff.",
      ctaLabel: "Similar project",
      ctaTitle: "Turn your furniture collections into a digital catalog",
      ctaBlurb:
        "Tell us about your product range and technical specifications to plan an intuitive, high-performance catalog structure.",
      ctaButton: "Start a project",
    },
    wuffbutik: {
      tag: "Boutique web",
      summary:
        "A boutique web storefront for Wuuf Butik bringing seasonal pet collections, physical store details, and direct WhatsApp styling assistance into a compact experience.",
      whatTitle: "Boutique identity and storefront design",
      what: [
        "Custom typographic hierarchy aligned with the boutique's contemporary aesthetic.",
        "Curated visual showcase categorizing seasonal pet wear and accessories.",
        "Physical store location, business hours, and interactive directions.",
        "Single-tap WhatsApp consultation linked directly from viewed products.",
        "High-performance asset loading optimized for instant mobile browsing.",
      ],
      howTitle: "From storefront browsing to instant consultation",
      how: [
        "Visitors browse seasonal arrivals and check physical store details.",
        "Customers initiate a WhatsApp chat with prefilled product context for sizing advice.",
        "New stock and collections are updated directly within the layout.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "The site channels social media interest into physical store visits and direct WhatsApp orders with zero friction.",
      ctaLabel: "Similar project",
      ctaTitle: "An elegant digital storefront for your boutique brand",
      ctaBlurb:
        "Share your collection scope and sales channels to build an authentic digital storefront tailored to your customers.",
      ctaButton: "Start a project",
    },
    "altitude-residence": {
      tag: "Luxury real estate",
      summary:
        "A luxury property platform for Altitude Private Residences connecting architectural design, floor plans, and panoramic views to private viewing requests.",
      whatTitle: "Property showcase and sales flow",
      what: [
        "Cinematic opening sequence framing architectural renders and living spaces.",
        "Interactive unit comparator detailing residence types, square footage, and floor plans.",
        "Dedicated narrative blocks for neighborhood amenities, skyline views, and building specifications.",
        "Prominent private viewing inquiry triggers accessible across all viewports.",
        "Carefully tuned responsive art direction for desktop and mobile screens.",
      ],
      howTitle: "From architectural exploration to private consultation",
      how: [
        "Prospective buyers explore the development's architectural vision and select unit types.",
        "Users evaluate floor plans and location details before submitting a viewing request.",
        "Project updates and sales availability are managed without breaking the design system.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "The platform presents the development's luxury positioning with editorial poise, generating qualified inquiries for the sales gallery.",
      ctaLabel: "Similar project",
      ctaTitle: "A presentation and sales website for your development",
      ctaBlurb:
        "Provide your unit inventory, architectural assets, and sales timeline to structure your custom real estate platform.",
      ctaButton: "Start a project",
    },
    "casa-aurelia": {
      tag: "Boutique hotel",
      summary:
        "A bilingual hospitality showcase for Casa Aurelia Rome presenting historic suites, concierge services, and central Rome location in Italian and English.",
      whatTitle: "Bilingual guest experience",
      what: [
        "Full-bleed photography and classical typography capturing the historic Roman residence.",
        "Structured suite pages detailing amenities, room dimensions, and concierge services.",
        "Fully synchronized Italian and English multilingual architecture.",
        "Interactive neighborhood guide pairing the property location with curated local destinations.",
        "Direct booking inquiries accessible from each suite detail.",
      ],
      howTitle: "From suite exploration to reservation inquiry",
      how: [
        "Guests review suites and boutique amenities in their preferred language.",
        "Travelers evaluate the central Rome location and submit a direct reservation request.",
        "Language switching instantly maintains the exact corresponding room context.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "The bilingual platform preserves the intimate character of the boutique residence while driving direct guest inquiries.",
      ctaLabel: "Similar project",
      ctaTitle: "A bilingual showcase and booking platform for your hotel",
      ctaBlurb:
        "Share your room inventory, target international markets, and booking preferences to craft a bespoke hospitality experience.",
      ctaButton: "Start a project",
    },
    "seraphine-atelier": {
      tag: "Fashion showcase",
      summary:
        "An editorial digital fashion house for Séraphine Atelier leading seasonal women's and men's lookbooks into private bespoke fitting appointments.",
      whatTitle: "Lookbook architecture and atelier narrative",
      what: [
        "Understated color palette, bespoke serif typography, and deliberate page cadence.",
        "Seasonal lookbook cataloging garment cuts, textile selections, and silhouettes.",
        "Dedicated bespoke tailoring section articulating atelier philosophy and fitting rituals.",
        "Fittings and consultation inquiry paths integrated directly into collection pages.",
        "Mobile-first editorial layouts preserving garment detail on handheld devices.",
      ],
      howTitle: "From collection inspiration to private fitting",
      how: [
        "Clients explore seasonal lookbooks and inspect fabric textures and tailoring cuts.",
        "Visitors review bespoke commission guidelines and atelier appointment protocols.",
        "Clients request a private fitting session directly from their selected collection.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "The platform conveys the atelier's haute couture identity with digital restraint, turning collection interest into confirmed private fittings.",
      ctaLabel: "Similar project",
      ctaTitle: "An editorial lookbook and appointment site for your brand",
      ctaBlurb:
        "Share your collection structure and fitting workflow to create a tailored digital showcase for your fashion house.",
      ctaButton: "Start a project",
    },
    "havva-baklava": {
      tag: "Artisan food",
      summary:
        "An artisan web storefront for HAVVA Baklava combining traditional Gaziantep confectionery heritage, daily pricing, and instant WhatsApp ordering in Cologne.",
      whatTitle: "Artisan menu and ordering system",
      what: [
        "Rich product photography highlighting pastry textures and artisanal baking methods.",
        "Engaging heritage narrative charting the workshop journey from Gaziantep to Cologne.",
        "Transparent menu board listing tray sizes, portion counts, and current prices.",
        "Pre-formatted WhatsApp order triggers populated with selected items and quantities.",
        "Cologne workshop address, store hours, and pickup directions.",
      ],
      howTitle: "From fresh menu review to WhatsApp order",
      how: [
        "Customers inspect pastry varieties and current price specifications.",
        "Buyers initiate an instant WhatsApp order prefilled with their selected items.",
        "The workshop team confirms pickup or delivery details within seconds.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "The platform blends traditional culinary storytelling with modern ordering convenience, driving direct daily sales for the Cologne workshop.",
      ctaLabel: "Similar project",
      ctaTitle: "A menu and rapid ordering site for your culinary business",
      ctaBlurb:
        "Provide your product menu, pricing model, and order fulfillment routine to build a focused sales platform.",
      ctaButton: "Start a project",
    },
    "sahra-butik": {
      tag: "Boutique web",
      summary:
        "A modern catalog website for Sahra Butik connecting casual, sportswear, and modest fashion collections with instant item-specific WhatsApp stock inquiries.",
      whatTitle: "Collection catalog and inquiry flow",
      what: [
        "High-density visual grid displaying fabric drape, sizing, and styling details.",
        "Category navigation organizing collections by occasion and seasonal lines.",
        "Detailed product cards featuring material composition, fit notes, and size charts.",
        "Physical retail store location, operating hours, and customer service details.",
        "Direct WhatsApp inquiry action prefilled with the exact item code and selected size.",
      ],
      howTitle: "From catalog browsing to instant stock confirmation",
      how: [
        "Shoppers browse collections and inspect specific sizing and material attributes.",
        "Customers click the WhatsApp button to verify immediate stock availability with the store team.",
        "Boutique staff confirm availability and complete the sale directly in chat.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "The catalog converts social media followers into direct buyers by making product discovery and stock verification instant.",
      ctaLabel: "Similar project",
      ctaTitle: "A collection catalog and WhatsApp sales system for your apparel brand",
      ctaBlurb:
        "Provide your collection inventory and sales workflow to create an interactive catalog that drives direct customer inquiries.",
      ctaButton: "Start a project",
    },
    "vela-skin-atelier": {
      tag: "Skin atelier",
      summary:
        "A bespoke booking and treatment platform for VELA Skin Atelier SoHo organizing clinical skincare protocols, session durations, and consultation appointments.",
      whatTitle: "Skincare protocols and consultation booking",
      what: [
        "Warm earth tones and refined serif typography reflecting bespoke facial diagnostics.",
        "Structured service cards for Reset, Sculpt, Renew, and Restore treatment protocols.",
        "Transparent breakdowns of session runtimes, active ingredients, and suitability criteria.",
        "Pre-treatment preparation guidelines and SoHo studio etiquette.",
        "Direct intake and consultation booking workflow for new and returning clients.",
      ],
      howTitle: "From protocol selection to studio consultation",
      how: [
        "Clients review the atelier's diagnostic philosophy and choose appropriate skincare protocols.",
        "Visitors verify treatment durations and expectations before requesting a consultation slot.",
        "Studio coordinators confirm appointments and sync them directly with the staff calendar.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "The platform articulates advanced skincare protocols with clinical transparency, preparing clients thoroughly before their studio visit.",
      ctaLabel: "Similar project",
      ctaTitle: "An appointment-focused web platform for your aesthetic studio",
      ctaBlurb:
        "Share your treatment menu, appointment guidelines, and booking channels to design an elevated digital studio presence.",
      ctaButton: "Start a project",
    },
    aiahi: {
      title: "Ahi AI",
      tag: "WhatsApp + CRM",
      summary:
        "An AI conversational booking system and operations CRM that handles appointment scheduling on WhatsApp using dynamic calendar rules.",
      whatTitle: "Intelligent assistant and CRM architecture",
      what: [
        "Conversational booking engine powered by the official WhatsApp Cloud API.",
        "Live calendar integration verifying operating hours, buffer times, and staff availability.",
        "Centralized CRM managing customer ledgers, appointment statuses, tags, and internal notes.",
        "Customizable dialogue flows tailored for salons, clinics, auto services, and consultancies.",
        "Context-preserving handover mechanism routing complex inquiries to human staff.",
        "Corporate product website at aiahi.net presenting software features and demo booking.",
      ],
      howTitle: "From WhatsApp message to unified customer ledger",
      how: [
        "A client messages the business WhatsApp number to request an appointment or service details.",
        "The assistant queries real-time calendar availability and confirms the selected slot.",
        "The booking is instantly created in the calendar and logged inside the central CRM.",
        "Staff manage all daily appointments, customer history, and notes from one dashboard.",
      ],
      stack: ["Next.js", "TypeScript", "WhatsApp Cloud API", "PostgreSQL"],
      result:
        "Ahi AI eliminates manual scheduling friction across WhatsApp, providing businesses with an automated booking workflow and organized customer records.",
      ctaLabel: "Similar system",
      ctaTitle: "Automate your business WhatsApp with a dedicated CRM dashboard",
      ctaBlurb:
        "Share your business hours, service menu, and scheduling rules to deploy your automated booking assistant.",
      ctaButton: "Start a project",
    },
    "whatsapp-bot": {
      title: "WhatsApp Chat Assistant",
      tag: "Automation",
      summary:
        "An automated WhatsApp assistant that answers service and pricing questions using verified business data, checks calendar openings, and logs bookings.",
      whatTitle: "Dialogue logic and calendar synchronization",
      what: [
        "Knowledge retrieval engine grounded strictly in verified business services and prices.",
        "Two-way calendar synchronization checking real-time staff and room availability.",
        "Automated booking confirmations, cancellations, and schedule adjustments.",
        "Configurable appointment reminder notifications sent prior to bookings.",
        "Smart escalation triggers routing exceptions or custom inquiries to human operators.",
      ],
      howTitle: "From initial question to calendar confirmation",
      how: [
        "Customers ask about pricing, availability, or services, receiving instant verified responses.",
        "When an appointment is requested, the bot presents available openings and confirms the booking.",
        "The appointment updates the calendar instantly and sends notifications to the team.",
      ],
      stack: ["WhatsApp Cloud API", "n8n", "Python", "PostgreSQL"],
      result:
        "The assistant recovers hours of repetitive staff messaging every week, delivering 24/7 appointment scheduling without double bookings.",
      ctaLabel: "Similar system",
      ctaTitle: "Turn your WhatsApp line into an automated booking assistant",
      ctaBlurb:
        "Provide your common customer inquiries and scheduling requirements to design an automated WhatsApp workflow.",
      ctaButton: "Start a project",
    },
    "instagram-bot": {
      title: "Instagram Direct Assistant",
      tag: "Automation",
      summary:
        "An automated Instagram Direct Message assistant that responds to pricing and service questions while syncing bookings with a shared calendar and CRM.",
      whatTitle: "Instagram DM automation and calendar integration",
      what: [
        "Verified automated responses handling high-volume Instagram DM pricing and service questions.",
        "Unified calendar connection shared with existing WhatsApp and web channels.",
        "Real-time slot checking and instant reservation booking within Instagram Direct.",
        "Automated appointment reminders and direct staff handover rules.",
      ],
      howTitle: "From direct message to shared appointment calendar",
      how: [
        "Followers message the Instagram account inquiring about service details or availability.",
        "The assistant answers verified questions and guides the user to select an open time slot.",
        "The appointment is synced directly into the central CRM and shared calendar.",
      ],
      stack: ["Instagram Graph API", "n8n", "Python", "Supabase"],
      result:
        "The assistant turns social media engagement into organized appointments, preventing lost inquiries during non-business hours.",
      ctaLabel: "Similar system",
      ctaTitle: "Connect your Instagram Direct Messages to a shared booking calendar",
      ctaBlurb:
        "Tell us about your message volume and service workflows to build an automated Instagram assistant.",
      ctaButton: "Start a project",
    },
    crm: {
      title: "Sales & Appointment Panel",
      tag: "Software",
      summary:
        "A centralized operations dashboard unifying WhatsApp and Instagram appointments, customer communication histories, and team notes in one interface.",
      whatTitle: "Customer ledger and operations console",
      what: [
        "Rich customer profiles generated automatically from incoming messaging appointments.",
        "Multi-channel history tracking conversation context, booking records, and internal notes.",
        "Live daily schedule view organizing appointments, staff assignments, and room capacities.",
        "Instant schedule updates and cancellation synchronization across all connected channels.",
      ],
      howTitle: "From incoming message to team coordination",
      how: [
        "Appointments booked via messaging assistants populate the dashboard in real time.",
        "Staff members update service statuses, add private client notes, and adjust schedules.",
        "Customer histories remain accessible to ensure continuity across future appointments.",
      ],
      stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      result:
        "The panel consolidates fragmented chat inquiries into a single, reliable operational hub for the entire team.",
      ctaLabel: "Similar system",
      ctaTitle: "Unify your customer appointments in a dedicated operations dashboard",
      ctaBlurb:
        "List your communication channels and staff workflows to design a tailored operations and booking panel.",
      ctaButton: "Start a project",
    },
    "css-system": {
      tag: "Design system",
      summary:
        "A modular, token-based CSS design system unifying colors, typography, spacing, and component behaviors across public web applications and internal software panels.",
      whatTitle: "Token architecture and component library",
      what: [
        "Design token foundations for color palettes, typographic scales, border radii, and spacing.",
        "Reusable UI component kit including buttons, form inputs, modals, and navigation bars.",
        "Semantic color layers supporting accessible light and dark themes consistently.",
        "Living documentation showcase for developer reference and design governance.",
        "Scalable structure ensuring future web surfaces inherit established brand rules.",
      ],
      howTitle: "From design tokens to production code",
      how: [
        "Design adjustments are made once within the central token specification.",
        "Connected web applications and internal panels receive updates simultaneously.",
        "New interface views are built rapidly using pre-tested, accessible components.",
      ],
      stack: ["CSS Custom Properties", "Design Tokens"],
      result:
        "The design system eliminates redundant styling code and guarantees cohesive brand quality across all digital touchpoints.",
      ctaLabel: "Similar system",
      ctaTitle: "A centralized CSS design system for your digital products",
      ctaBlurb:
        "Share your current frontend stack and digital products to architect a unified, tokenized design system.",
      ctaButton: "Start a project",
    },
  },
  es: {
    "elif-seren": {
      tag: "Web corporativa",
      summary: "Un espacio digital tranquilizador para la Psicóloga Clínica Elif Seren. Muestra servicios de EMDR y psicoterapia, guiando a citas.",
      whatTitle: "Lo que construimos",
      what: [
        "Tipografía y paleta de colores que transmiten confianza y calma.",
        "Presentación de especialidades como EMDR, Psicodinámica y Experiencia Somática.",
        "Arquitectura de contenido destacando el entorno clínico y experiencia académica.",
        "Camino claro hacia citas y contacto.",
        "Experiencia móvil fluida.",
      ],
      howTitle: "Cómo funciona",
      how: [
        "Los visitantes exploran los enfoques de terapia y experiencia.",
        "Conocen la ubicación física y atmósfera de la clínica.",
        "Transición fácil hacia los pasos de reserva de citas.",
        "La infraestructura de carga rápida garantiza una entrega instantánea.",
      ],
      stack: ["Next.js", "React", "Tailwind CSS"],
      result: "Sitio en vivo: un sitio clínico corporativo confiable, enfocado en citas y listo para móviles.",
      ctaLabel: "Siguiente paso",
      ctaTitle: "¿Necesita un espacio digital para su clínica?",
      ctaBlurb: "Construyamos un sitio web que refleje su experiencia y genere confianza. Envíe una nota breve y describiré el proyecto.",
      ctaButton: "Iniciar mi proyecto",
    },
    "masal-koltuk": {
      tag: "Búsqueda local",
      summary:
        "Necesitaban un sitio. MASAL Koltuk Yıkama trabaja en Malatya, Turquía. Diseñamos el sitio de punta a punta, SEO y GEO primero, con la última técnica y con cuidado. Hace 15 días este negocio no tenía web. Hoy se recomienda primero en Google y en todas las plataformas de IA, en todas las consultas con la misma intención. Después del lanzamiento, la gente llamó. El negocio encontró clientes nuevos.",
      whatTitle: "Qué hicimos",
      what: [
        "Necesitaban un sitio. Diseñamos de punta a punta el de MASAL Koltuk Yıkama en Malatya, Turquía: SEO y GEO primero, con la última técnica y con cuidado.",
        "Abrimos la ficha de Google y el perfil de Search Console y las seguimos llevando.",
      ],
      howTitle: "Qué pasó",
      how: [
        "Hace 15 días este negocio no tenía web. Hoy se recomienda primero en Google y en todas las plataformas de IA, en todas las consultas con la misma intención.",
        "Después del lanzamiento, la gente llamó. Encontraron a MASAL en Google y en la IA y marcaron. Llegaron clientes. Llegó trabajo.",
        "El sitio de MASAL Koltuk Yıkama ya cubrió su costo.",
      ],
      stack: ["HTML", "CSS", "JavaScript", "JSON-LD"],
      result:
        "Quien nos confió el trabajo recibió esa confianza de la mejor manera, y vamos a seguir dándola. No solo verse. Traer trabajo. Eso hicimos.",
      proof: {
        kicker: "La prueba",
        title: "Las capturas siguen ahí",
        lead: "La gente se está yendo más a las búsquedas de IA que a Google, ¡y lo tenemos claro! Actualizamos, desarrollamos y seguimos nuestra base técnica según los tiempos. Estas capturas son el resultado real después del lanzamiento: ChatGPT, Gemini, Google AI y Google ponen a MASAL primero en las mismas consultas.",
        note: "Si quiere que su negocio o su trabajo propio salga en las IAs y en Google, delante de quien puede ser su cliente, ¡escríbanos! No es un gasto. ¡Es una inversión!",
        shots: [
          {
            src: "/projects/masal-koltuk/proof/gemini-sofa.webp",
            alt: "Gemini pone a MASAL primero para limpieza de sofás en Malatya",
            source: "Gemini",
            caption: "Limpieza de sofás en Malatya. MASAL primero.",
            span: "col-span-6 md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[560px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-steam.webp",
            alt: "ChatGPT pone a MASAL primero para limpieza a vapor",
            source: "ChatGPT",
            caption: "Limpieza a vapor. Primera sugerencia: MASAL.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-ai.webp",
            alt: "Google AI pone a MASAL primero",
            source: "Google AI",
            caption: "Google AI. MASAL primero otra vez.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-local.webp",
            alt: "MASAL arriba en Google",
            source: "Google",
            caption: "Búsqueda de Google. MASAL arriba.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-car.webp",
            alt: "ChatGPT pone a MASAL primero para asientos de auto",
            source: "ChatGPT",
            caption: "Asientos de auto. MASAL otra vez.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/gemini-car.webp",
            alt: "Gemini pone a MASAL primero para limpieza interior",
            source: "Gemini",
            caption: "Interior del auto. Primero otra vez.",
            span: "col-span-6 md:col-span-4 min-h-[220px] md:min-h-[320px]",
            fit: "contain",
          },
        ],
      },
      ctaLabel: "Siguiente",
      ctaTitle: "No es un gasto. ¡Es una inversión!",
      ctaBlurb:
        "Si quiere que su negocio o su trabajo propio salga en las IAs y en Google, delante de quien puede ser su cliente, ¡escríbanos!",
      ctaButton: "Escríbanos",
    },
    wcc: {
      tag: "Web corporativa",
      summary:
        "Plataforma web para el fabricante Wholesale Cabinet Creations que organiza líneas de gabinetes, proyectos terminados y solicitudes de cotización comercial.",
      whatTitle: "Alcance y entregables",
      what: [
        "Arquitectura de información para líneas de gabinetes, carpintería a medida y proyectos terminados.",
        "Diseño adaptable que presenta detalles técnicos y fotografía en dispositivos móviles.",
        "Espacios dedicados para capacidad de producción, certificaciones y referencias comerciales.",
        "Ruta directa de cotización integrada junto a la información de productos.",
        "Conexión con panel de contenidos para actualizar proyectos e imágenes.",
      ],
      howTitle: "Flujo de usuario y conversión",
      how: [
        "Los compradores exploran colecciones de gabinetes y proyectos de referencia.",
        "Pasan de la ficha técnica al formulario de cotización comercial en un solo paso.",
        "El equipo interno gestiona las solicitudes y actualiza el catálogo fácilmente.",
      ],
      stack: ["React", "Vite", "TypeScript"],
      result:
        "La plataforma elimina la fricción entre la exploración de productos y la solicitud de cotización, proyectando la capacidad técnica del fabricante.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Una plataforma web orientada a cotizaciones para su empresa",
      ctaBlurb:
        "Comparta sus líneas de producto y necesidades comerciales para definir la estructura del sitio y el panel de gestión.",
      ctaButton: "Iniciar proyecto",
    },
    aydnnacar: {
      tag: "Marca y catálogo",
      summary:
        "Catálogo digital para Nacar Mobilya que organiza colecciones de mobiliario con medidas, materiales y contacto directo con el equipo de ventas.",
      whatTitle: "Sistema de catálogo y diseño visual",
      what: [
        "Tipografía y maquetación editorial que resaltan la artesanía y acabados de la madera.",
        "Navegación intuitiva por ambientes y colecciones con filtros claros.",
        "Fichas de producto con dimensiones exactas, maderas y opciones de tapicería.",
        "Carga rápida y fluida optimizada para navegación en teléfonos móviles.",
        "Acción de consulta directa que conserva el código del modelo para el asesor comercial.",
      ],
      howTitle: "Del descubrimiento de colección a la consulta comercial",
      how: [
        "Los clientes comparan piezas del mismo ambiente y estilo.",
        "Revisan medidas exactas y materiales antes de solicitar información.",
        "Los nuevos lanzamientos se incorporan al catálogo sin alterar el diseño.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "El catálogo traslada la calidad del showroom a la experiencia digital, facilitando la consulta directa con ventas.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Convierta sus colecciones en un catálogo digital interactivo",
      ctaBlurb:
        "Indique el volumen de productos y especificaciones técnicas para diseñar una estructura de catálogo a su medida.",
      ctaButton: "Iniciar proyecto",
    },
    wuffbutik: {
      tag: "Web boutique",
      summary:
        "Escaparate digital para Wuuf Butik que reúne colecciones de moda canina, ubicación de tienda y asesoría personalizada por WhatsApp.",
      whatTitle: "Identidad boutique y presentación de producto",
      what: [
        "Jerarquía tipográfica moderna alineada con la estética de la boutique.",
        "Escaparate visual que clasifica prendas y accesorios de temporada.",
        "Ubicación de la tienda física, horarios y mapa interactivo.",
        "Consulta directa por WhatsApp vinculada al producto seleccionado.",
        "Rendimiento optimizado para carga instantánea en teléfonos móviles.",
      ],
      howTitle: "Del escaparate a la consulta instantánea",
      how: [
        "Los visitantes exploran novedades y consultan datos de la tienda física.",
        "Inician una conversación de WhatsApp con el producto ya seleccionado para consultar tallas.",
        "Las nuevas prendas se añaden al catálogo con total sencillez.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "El sitio convierte el interés de redes sociales en visitas a tienda y pedidos directos por WhatsApp con total fluidez.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Un escaparate digital elegante para su marca boutique",
      ctaBlurb:
        "Comparta sus colecciones y canales de venta para crear un escaparate digital adaptado a su público.",
      ctaButton: "Iniciar proyecto",
    },
    "altitude-residence": {
      tag: "Inmobiliaria de lujo",
      summary:
        "Sitio web para Altitude Private Residences que conecta diseño arquitectónico, planos y vistas panorámicas con solicitudes de visita privada.",
      whatTitle: "Presentación del proyecto y conversión",
      what: [
        "Secuencia inicial cinematográfica que destaca la arquitectura y espacios comunes.",
        "Módulo interactivo para comparar tipos de residencia, superficies y planos.",
        "Bloques dedicados para amenidades, entorno urbano y especificaciones de lujo.",
        "Formulario accesible para solicitar presentaciones y citas privadas.",
        "Dirección de arte responsiva cuidada para pantallas de escritorio y móviles.",
      ],
      howTitle: "De la exploración arquitectónica a la visita privada",
      how: [
        "Los inversores examinan el concepto del desarrollo y seleccionan tipologías.",
        "Evalúan planos y ubicación antes de solicitar una cita con la sala de ventas.",
        "Las actualizaciones del proyecto se integran respetando el sistema de diseño.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "La web comunica el prestigio del desarrollo con rigor editorial, atrayendo compradores cualificados hacia la sala de ventas.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Un sitio web de presentación y ventas para su proyecto inmobiliario",
      ctaBlurb:
        "Facilite los tipos de unidades y materiales de venta para estructurar su plataforma inmobiliaria a medida.",
      ctaButton: "Iniciar proyecto",
    },
    "casa-aurelia": {
      tag: "Hotel boutique",
      summary:
        "Escaparate bilingüe para Casa Aurelia Roma que presenta suites históricas, servicios de conserjería y ubicación en italiano e inglés.",
      whatTitle: "Experiencia bilingüe para huéspedes",
      what: [
        "Fotografía a pantalla completa y tipografía clásica que capturan la residencia romana.",
        "Páginas de suites con detalles de comodidades, dimensiones y servicios.",
        "Arquitectura multilingüe sincronizada en italiano e inglés.",
        "Guía interactiva del vecindario con destinos locales seleccionados.",
        "Solicitud de reserva directa disponible desde cada suite.",
      ],
      howTitle: "De la elección de suite a la solicitud de reserva",
      how: [
        "El huésped consulta habitaciones y servicios en su idioma preferido.",
        "Revisa la ubicación en Roma y envía una solicitud de reserva directa.",
        "El cambio de idioma mantiene exactamente la habitación seleccionada.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "La plataforma bilingüe preserva la esencia del hotel boutique e impulsa las reservas directas sin intermediarios.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Un sitio web bilingüe y reservas directas para su hotel",
      ctaBlurb:
        "Indique su número de habitaciones y mercados objetivo para crear una presencia digital hotelera a su medida.",
      ctaButton: "Iniciar proyecto",
    },
    "seraphine-atelier": {
      tag: "Moda editorial",
      summary:
        "Casa de moda digital para Séraphine Atelier que guía los lookbooks de mujer y hombre hacia citas privadas de prueba a medida.",
      whatTitle: "Arquitectura de lookbook y narrativa de taller",
      what: [
        "Paleta cromática sobria, tipografía serif refinada y transiciones pausadas.",
        "Lookbook de temporada con detalles de cortes, tejidos y siluetas.",
        "Sección dedicada a la sastrería a medida y filosofía artesanal.",
        "Puntos de contacto para solicitar pruebas privadas integrados en las colecciones.",
        "Maquetación editorial optimizada para teléfonos móviles.",
      ],
      howTitle: "De la inspiración de colección a la prueba privada",
      how: [
        "El cliente examina los lookbooks y analiza tejidos y cortes de sastrería.",
        "Conoce las directrices de confección a medida y protocolos de cita.",
        "Solicita una prueba privada directamente desde la prenda deseada.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "El sitio transmite la identidad de alta costura de la firma, convirtiendo el interés visual en citas de prueba confirmadas.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Un lookbook editorial y sitio de citas para su firma de moda",
      ctaBlurb:
        "Comparta la estructura de sus colecciones y dinámica de pruebas para diseñar su escaparate digital exclusivo.",
      ctaButton: "Iniciar proyecto",
    },
    "havva-baklava": {
      tag: "Alimentación artesanal",
      summary:
        "Escaparate artesanal para HAVVA Baklava que une tradición repostera de Gaziantep, precios actualizados y pedidos por WhatsApp en Colonia.",
      whatTitle: "Menú artesano y sistema de pedidos",
      what: [
        "Fotografía gastronómica que resalta texturas y métodos tradicionales.",
        "Relato sobre el trayecto del taller desde Gaziantep hasta Colonia.",
        "Carta transparente con tamaños de bandeja, porciones y precios vigentes.",
        "Mensaje de WhatsApp con formato previo que incluye productos y cantidades.",
        "Dirección del taller en Colonia, horarios y cómo llegar.",
      ],
      howTitle: "Del menú recién hecho al pedido por WhatsApp",
      how: [
        "El cliente revisa las variedades de baklava y la lista de precios.",
        "Inicia el pedido por WhatsApp con las selecciones ya completadas.",
        "El equipo del taller confirma la entrega o recogida en pocos segundos.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "El sitio combina la historia culinaria con la comodidad del pedido digital, acelerando las ventas diarias del taller.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Una carta digital y pedidos rápidos para su negocio gastronómico",
      ctaBlurb:
        "Facilite su carta, precios y método de entrega para crear una plataforma de pedidos clara y directa.",
      ctaButton: "Iniciar proyecto",
    },
    "sahra-butik": {
      tag: "Web boutique",
      summary:
        "Catálogo digital para Sahra Butik que vincula colecciones de moda con verificación inmediata de tallas y existencias a través de WhatsApp.",
      whatTitle: "Catálogo de colecciones y consultas",
      what: [
        "Galería visual detallada con caídas de tejido, tallas y cortes.",
        "Menú intuitivo que organiza las colecciones según ocasión y temporada.",
        "Fichas con composición de materiales, guía de tallas y cuidados.",
        "Ubicación de la tienda física, horarios y atención al cliente.",
        "Botón de WhatsApp con el código del producto y talla seleccionada.",
      ],
      howTitle: "Del catálogo a la confirmación de existencias",
      how: [
        "El cliente explora prendas y comprueba detalles de confección.",
        "Pregunta por WhatsApp sobre disponibilidad de talla en segundos.",
        "El equipo de tienda responde al instante y completa la venta.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "El catálogo convierte a los seguidores de redes sociales en compradores directos al agilizar la consulta de existencias.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Catálogo de producto y ventas por WhatsApp para su marca de moda",
      ctaBlurb:
        "Indique el volumen de prendas y dinámicas de venta para crear un catálogo que impulse compras directas.",
      ctaButton: "Iniciar proyecto",
    },
    "vela-skin-atelier": {
      tag: "Estudio facial",
      summary:
        "Plataforma de tratamientos y citas para VELA Skin Atelier SoHo que estructura protocolos de cuidado facial, tiempos de sesión y consultas.",
      whatTitle: "Protocolos faciales y reservas de consulta",
      what: [
        "Tonos tierra cálidos y tipografía serif acordes con el cuidado de la piel a medida.",
        "Tarjetas descriptivas para los protocolos Reset, Sculpt, Renew y Restore.",
        "Desglose transparente de duración de sesión, activos y tipo de piel indicado.",
        "Recomendaciones previas y normas del estudio en SoHo.",
        "Flujo de reserva para diagnóstico facial y primera consulta.",
      ],
      howTitle: "De la elección de protocolo a la cita en el estudio",
      how: [
        "El cliente lee el enfoque del estudio y elige el protocolo adecuado.",
        "Verifica duración y expectativas antes de pedir cita.",
        "La recepción confirma la hora y la sincroniza con el calendario.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "La plataforma presenta los tratamientos con claridad profesional, resolviendo dudas antes de la visita al estudio.",
      ctaLabel: "Proyecto similar",
      ctaTitle: "Un sitio web orientado a citas para su estudio estético",
      ctaBlurb:
        "Comparta su carta de tratamientos y reglas de reserva para diseñar una presencia digital cuidada.",
      ctaButton: "Iniciar proyecto",
    },
    aiahi: {
      title: "Ahi AI",
      tag: "WhatsApp + CRM",
      summary:
        "Sistema de reservas inteligente y CRM operativo que gestiona citas en WhatsApp según las reglas de calendario de la empresa.",
      whatTitle: "Asistente inteligente y arquitectura CRM",
      what: [
        "Motor de conversación conectado a la API oficial de WhatsApp Cloud.",
        "Sincronización en tiempo real con horarios, descansos y disponibilidad de personal.",
        "CRM central que organiza fichas de clientes, estados de cita, etiquetas y notas.",
        "Modelos de diálogo adaptables a salones, clínicas, talleres y consultorías.",
        "Transferencia inteligente a operadores humanos conservando el contexto de la charla.",
        "Sitio web corporativo aiahi.net con demostración de funciones.",
      ],
      howTitle: "Del mensaje de WhatsApp al registro central de clientes",
      how: [
        "El cliente escribe al WhatsApp del negocio para pedir cita o información.",
        "El asistente consulta el calendario y confirma el horario seleccionado.",
        "La cita se anota en el calendario y se registra en el CRM.",
        "El equipo gestiona citas, notas e historial desde un único panel.",
      ],
      stack: ["Next.js", "TypeScript", "WhatsApp Cloud API", "PostgreSQL"],
      result:
        "Ahi AI automatiza la gestión de citas en WhatsApp, evitando errores manuales y organizando la información de los clientes.",
      ctaLabel: "Sistema similar",
      ctaTitle: "Automatice su canal de WhatsApp con un panel CRM dedicado",
      ctaBlurb:
        "Indique sus horarios, servicios y reglas de reserva para configurar su asistente de citas automatizado.",
      ctaButton: "Iniciar proyecto",
    },
    "whatsapp-bot": {
      title: "Asistente de WhatsApp",
      tag: "Automatización",
      summary:
        "Asistente automatizado de WhatsApp que responde consultas de servicios y precios con datos verificados y agenda citas en el calendario.",
      whatTitle: "Lógica de conversación y sincronización de calendario",
      what: [
        "Motor de respuestas basado exclusivamente en los servicios y precios de la empresa.",
        "Sincronización bidireccional que comprueba disponibilidad en tiempo real.",
        "Confirmación automática de citas, cancelaciones y cambios de hora.",
        "Recordatorios programados antes de cada cita.",
        "Desvío a operadores humanos para consultas complejas o especiales.",
      ],
      howTitle: "De la consulta inicial a la confirmación de cita",
      how: [
        "El cliente pregunta por tarifas o servicios y recibe respuesta inmediata.",
        "Al solicitar cita, el bot ofrece los huecos libres y confirma la reserva.",
        "La cita actualiza el calendario y notifica al equipo de trabajo.",
      ],
      stack: ["WhatsApp Cloud API", "n8n", "Python", "PostgreSQL"],
      result:
        "El asistente ahorra horas de atención repetitiva cada semana, atendiendo reservas las 24 horas sin solapamientos.",
      ctaLabel: "Sistema similar",
      ctaTitle: "Convierta su línea de WhatsApp en un asistente de citas 24/7",
      ctaBlurb:
        "Indique las dudas frecuentes de sus clientes y su dinámica de agenda para diseñar su flujo de WhatsApp.",
      ctaButton: "Iniciar proyecto",
    },
    "instagram-bot": {
      title: "Asistente de Instagram",
      tag: "Automatización",
      summary:
        "Asistente para mensajes directos de Instagram que responde precios y servicios sincronizando citas con un calendario y CRM compartidos.",
      whatTitle: "Automatización de mensajes directos e integración",
      what: [
        "Respuestas automatizadas para consultas recurrentes de tarifas y servicios en Instagram.",
        "Conexión con el mismo calendario compartido de WhatsApp y la web.",
        "Consulta de horarios y reserva directa dentro de los mensajes de Instagram.",
        "Recordatorios automáticos y reglas para transferir la conversación a personas.",
      ],
      howTitle: "Del mensaje directo al calendario común de citas",
      how: [
        "Los seguidores escriben por Instagram consultando disponibilidad o precios.",
        "El asistente responde con datos verificados y permite elegir horario.",
        "La cita se sincroniza en el CRM central y el calendario del equipo.",
      ],
      stack: ["Instagram Graph API", "n8n", "Python", "Supabase"],
      result:
        "El asistente convierte los mensajes de redes sociales en citas organizadas, evitando pérdidas de clientes fuera del horario comercial.",
      ctaLabel: "Sistema similar",
      ctaTitle: "Conecte sus mensajes de Instagram a su calendario de citas",
      ctaBlurb:
        "Comparta el volumen de mensajes y servicios habituales para crear su asistente automatizado en Instagram.",
      ctaButton: "Iniciar proyecto",
    },
    crm: {
      title: "Panel de Ventas y Citas",
      tag: "Software",
      summary:
        "Panel operativo centralizado que unifica citas de WhatsApp e Instagram, historial de clientes y notas internas en una sola interfaz.",
      whatTitle: "Registro de clientes y consola de operaciones",
      what: [
        "Ficha de cliente generada automáticamente con cada nueva cita recibida.",
        "Historial multicanal con contexto de conversación, citas y notas internas.",
        "Vista diaria interactiva que organiza turnos, personal asignado y capacidad.",
        "Actualización simultánea de cancelaciones y cambios en todos los canales.",
      ],
      howTitle: "Del mensaje recibido a la coordinación del equipo",
      how: [
        "Las citas agendadas por los asistentes aparecen en el panel al instante.",
        "El personal actualiza estados, añade notas internas y gestiona la atención.",
        "El historial del cliente queda guardado para consultas futuras.",
      ],
      stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      result:
        "El panel reúne solicitudes dispersas de diferentes aplicaciones en un centro operativo fiable para todo el equipo.",
      ctaLabel: "Sistema similar",
      ctaTitle: "Centralice sus citas de clientes en un panel operativo propio",
      ctaBlurb:
        "Detalle sus canales de contacto y métodos de trabajo para diseñar un panel de gestión a su medida.",
      ctaButton: "Iniciar proyecto",
    },
    "css-system": {
      tag: "Sistema de diseño",
      summary:
        "Sistema de diseño modular basado en tokens CSS que unifica colores, tipografía, espaciados y componentes en webs y paneles internos.",
      whatTitle: "Arquitectura de tokens y librería de componentes",
      what: [
        "Definición de tokens para paletas de color, escalas tipográficas y márgenes.",
        "Conjunto de componentes reutilizables como botones, formularios, modales y barras de navegación.",
        "Capas semánticas compatibles con modo claro y oscuro accesible.",
        "Documentación viva para consulta del equipo de desarrollo.",
        "Estructura escalable que garantiza coherencia visual en nuevas pantallas.",
      ],
      howTitle: "De los tokens de diseño al código de producción",
      how: [
        "Los ajustes visuales se realizan una sola vez en el archivo central de tokens.",
        "Las aplicaciones web y paneles conectados aplican los cambios al instante.",
        "Las nuevas vistas se construyen con rapidez usando componentes ya probados.",
      ],
      stack: ["CSS Custom Properties", "Design Tokens"],
      result:
        "El sistema de diseño elimina código duplicado y garantiza una calidad visual homogénea en todos los productos digitales.",
      ctaLabel: "Sistema similar",
      ctaTitle: "Un sistema de diseño CSS centralizado para sus productos digitales",
      ctaBlurb:
        "Comparta su arquitectura frontend y productos actuales para estructurar un sistema de diseño tokenizado y coherente.",
      ctaButton: "Iniciar proyecto",
    },
  },
  de: {
    "elif-seren": {
      tag: "Corporate web",
      summary: "Ein beruhigender digitaler Raum für die klinische Psychologin Elif Seren. Zeigt EMDR- und Psychotherapie-Dienste und leitet zu Terminen.",
      whatTitle: "Was wir gebaut haben",
      what: [
        "Typografie und Farbpalette, die Vertrauen und Ruhe vermitteln.",
        "Präsentation von Fachgebieten wie EMDR, Psychodynamik und Somatic Experiencing.",
        "Inhaltsarchitektur, die das klinische Umfeld und akademische Expertise hervorhebt.",
        "Klarer Weg zu Terminen und Kontakt.",
        "Reibungsloses mobiles Erlebnis.",
      ],
      howTitle: "Wie es funktioniert",
      how: [
        "Besucher erkunden Therapieansätze und Expertise.",
        "Erfahren Sie mehr über den physischen Standort und die Atmosphäre der Klinik.",
        "Einfacher Übergang zu den Schritten der Terminbuchung.",
        "Schnell ladende Infrastruktur sorgt für sofortige Bereitstellung.",
      ],
      stack: ["Next.js", "React", "Tailwind CSS"],
      result: "Live-Website: eine vertrauenswürdige, terminorientierte und mobilgerätefähige Klinik-Website.",
      ctaLabel: "Als Nächstes",
      ctaTitle: "Benötigen Sie einen digitalen Raum für Ihre Klinik?",
      ctaBlurb: "Lassen Sie uns eine Website erstellen, die Ihre Expertise widerspiegelt und Vertrauen aufbaut. Senden Sie eine kurze Nachricht.",
      ctaButton: "Mein Projekt starten",
    },
    "masal-koltuk": {
      tag: "Lokale Suche",
      summary:
        "Sie brauchten eine Website. MASAL Koltuk Yıkama arbeitet in Malatya, Türkei. Wir haben die ganze Website von vorn bis hinten gestaltet, SEO und GEO zuerst, mit der neuesten Technik, mit Sorgfalt. Vor 15 Tagen hatte dieser Betrieb keine Website. Heute wird er bei Google und auf allen KI-Plattformen bei denselben Anfragen zuerst empfohlen. Nach dem Launch riefen Kunden an. Der Betrieb fand neue Kunden.",
      whatTitle: "Was wir gemacht haben",
      what: [
        "Sie brauchten eine Website. Für MASAL Koltuk Yıkama in Malatya, Türkei, haben wir die ganze Website von vorn bis hinten gestaltet, SEO und GEO zuerst, mit der neuesten Technik, mit Sorgfalt.",
        "Das Google-Unternehmensprofil und das Search-Console-Profil haben wir eingerichtet und führen beides weiter.",
      ],
      howTitle: "Was passiert ist",
      how: [
        "Vor 15 Tagen hatte dieser Betrieb keine Website. Heute wird er bei Google und auf allen KI-Plattformen bei denselben Anfragen zuerst empfohlen.",
        "Nach dem Launch riefen Kunden an. Die Leute fanden MASAL bei Google und in der KI und griffen zum Telefon. Neue Kunden kamen. Arbeit kam rein.",
        "Die MASAL-Website hat sich schon bezahlt gemacht.",
      ],
      stack: ["HTML", "CSS", "JavaScript", "JSON-LD"],
      result:
        "Wer uns vertraut hat, hat das Vertrauen auf die beste Weise zurückbekommen, und das bleibt so. Nicht nur sichtbar sein. Arbeit bringen. Das haben wir gemacht.",
      proof: {
        kicker: "Der Beweis",
        title: "Die Aufnahmen sind da",
        lead: "Die Leute gehen inzwischen mehr zur KI-Suche als zu Google, und uns ist das klar! Wir aktualisieren, entwickeln und verfolgen unsere Technik, passend zu den Bedingungen der Zeit. Die Aufnahmen unten sind das echte Ergebnis nach dem Launch: ChatGPT, Gemini, Google AI und Google setzen MASAL bei denselben Anfragen an die Spitze.",
        note: "Wenn Ihr Betrieb oder Ihre eigene Arbeit in den KIs und bei Google vor möglichen Kunden auftauchen soll, schreiben Sie uns! Keine Kosten. Eine Investition!",
        shots: [
          {
            src: "/projects/masal-koltuk/proof/gemini-sofa.webp",
            alt: "Gemini setzt MASAL bei Polsterreinigung in Malatya an die Spitze",
            source: "Gemini",
            caption: "Polsterreinigung in Malatya. MASAL vorn.",
            span: "col-span-6 md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[560px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-steam.webp",
            alt: "ChatGPT setzt MASAL bei Dampfreinigung an die Spitze",
            source: "ChatGPT",
            caption: "Dampfreinigung. Erster Vorschlag: MASAL.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-ai.webp",
            alt: "Google AI setzt MASAL an die Spitze",
            source: "Google AI",
            caption: "Google AI. Wieder MASAL vorn.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[272px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/google-local.webp",
            alt: "MASAL oben in der Google-Suche",
            source: "Google",
            caption: "Google-Suche. MASAL oben.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/chatgpt-car.webp",
            alt: "ChatGPT setzt MASAL bei Autositzen an die Spitze",
            source: "ChatGPT",
            caption: "Autositze. Wieder MASAL.",
            span: "col-span-3 md:col-span-2 min-h-[240px] md:min-h-[300px]",
            fit: "contain",
          },
          {
            src: "/projects/masal-koltuk/proof/gemini-car.webp",
            alt: "Gemini setzt MASAL bei Innenreinigung an die Spitze",
            source: "Gemini",
            caption: "Innenreinigung. Wieder vorn.",
            span: "col-span-6 md:col-span-4 min-h-[220px] md:min-h-[320px]",
            fit: "contain",
          },
        ],
      },
      ctaLabel: "Als Nächstes",
      ctaTitle: "Keine Kosten. Eine Investition!",
      ctaBlurb:
        "Wenn Ihr Betrieb oder Ihre eigene Arbeit in den KIs und bei Google vor möglichen Kunden auftauchen soll, schreiben Sie uns!",
      ctaButton: "Schreiben Sie uns",
    },
    wcc: {
      tag: "Unternehmens-Web",
      summary:
        "Eine zielgerichtete Webplattform für Wholesale Cabinet Creations, die Schranklinien, Referenzprojekte und direkte Angebotsanfragen für US-Gewerbekunden bündelt.",
      whatTitle: "Architektur und Leistungsumfang",
      what: [
        "Informationsarchitektur für Schrankserien, Maßanfertigungen und fertige Projekte.",
        "Responsives Layout für technische Maße und hochauflösende Fotogalerien auf Mobilgeräten.",
        "Eigene Bereiche für Produktionskapazitäten, Zertifikate und Kundenreferenzen.",
        "Direkter Anfragepfad neben den Produktübersichten.",
        "CMS-Anbindung für eigenständige Text- und Bildaktualisierungen durch das Team.",
      ],
      howTitle: "Nutzerführung und Anfrageprozess",
      how: [
        "Gewerbekunden prüfen Schrankmodelle und durchgeführte Küchenprojekte.",
        "Interessenten wechseln direkt von den Produktdetails in das Angebotsformular.",
        "Das Vertriebsteam erhält strukturierte Anfragen und pflegt neue Referenzen ein.",
      ],
      stack: ["React", "Vite", "TypeScript"],
      result:
        "Die Plattform verbindet Produktübersicht und Angebotsanfrage ohne Reibungsverluste und stellt die Fertigungskompetenz des Herstellers klar dar.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Eine anfrageorientierte Webplattform für Ihr Unternehmen",
      ctaBlurb:
        "Nennen Sie Ihre Produktlinien und Vertriebsanforderungen, um Seitenstruktur und Verwaltungssystem zu planen.",
      ctaButton: "Projekt starten",
    },
    aydnnacar: {
      tag: "Marke & Katalog",
      summary:
        "Digitaler Möbelkatalog für Nacar Mobilya, der Wohn-, Ess- und Schlafzimmerkollektionen mit Maßen, Materialien und direktem Vertriebskontakt verknüpft.",
      whatTitle: "Katalogschnittstelle und Gestaltung",
      what: [
        "Editorische Typografie und Bildsprache für hochwertige Holzverarbeitung und Texturen.",
        "Raumbasierte Navigation mit klaren Kollektionsfiltern.",
        "Detaillierte Modellseiten mit Abmessungen, Holzarten und Polsteroptionen.",
        "Schnelle Ladezeiten für flüssiges Durchsuchen auf Smartphones.",
        "Direkte Anfragefunktion unter Beibehaltung der gewählten Modellnummer.",
      ],
      howTitle: "Von der Kollektionsauswahl zum Fachgespräch",
      how: [
        "Kunden vergleichen harmonische Möbelkombinationen nach Raumkategorien.",
        "Maße und Materialoptionen werden vor der Kontaktaufnahme genau geprüft.",
        "Neue Entwürfe werden nahtlos in die bestehende Struktur integriert.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "Der Katalog überträgt das Showroom-Erlebnis in den digitalen Raum und verbindet Produktdetails direkt mit dem Verkaufsteam.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Verwandeln Sie Ihre Kollektionen in einen digitalen Katalog",
      ctaBlurb:
        "Teilen Sie uns Ihren Produktumfang und Spezifikationen mit, um die passende Katalogstruktur aufzusetzen.",
      ctaButton: "Projekt starten",
    },
    wuffbutik: {
      tag: "Boutique-Web",
      summary:
        "Digitales Schaufenster für Wuuf Butik, das Saisonkollektionen für Hunde, Geschäftszeiten und persönliche WhatsApp-Beratung vereint.",
      whatTitle: "Boutique-Identität und Produktpräsentation",
      what: [
        "Typografische Hierarchie passend zum modernen Stil der Boutique.",
        "Übersichtliches Schaufenster für saisonale Kollektionen und Accessoires.",
        "Standortangaben, Öffnungszeiten und Wegbeschreibung zum Ladengeschäft.",
        "WhatsApp-Beratung mit direktem Bezug zum ausgewählten Artikel.",
        "Optimierte Ladezeiten für verzögerungsfreies Stöbern auf Mobilgeräten.",
      ],
      howTitle: "Vom Schaufenster zum direkten Kundendialog",
      how: [
        "Besucher entdecken neue Kollektionen und Ladeninformationen.",
        "Mit einem Klick startet ein WhatsApp-Chat zur Größen- oder Lagerberatung.",
        "Neue Produkte werden unkompliziert in die bestehende Übersicht eingefügt.",
      ],
      stack: ["Next.js", "React", "TypeScript"],
      result:
        "Die Website führt Besucher aus sozialen Medien direkt zu Ladenbesuchen und WhatsApp-Bestellungen.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Ein stilvolles digitales Schaufenster für Ihre Boutique",
      ctaBlurb:
        "Geben Sie Kollektionsumfang und Verkaufskanäle an, um Ihr Geschäft online passend darzustellen.",
      ctaButton: "Projekt starten",
    },
    "altitude-residence": {
      tag: "Luxus-Immobilien",
      summary:
        "Immobilienplattform für Altitude Private Residences, die Architektur, Grundrisse und Stadtpanoramen mit privaten Besichtigungsterminen verknüpft.",
      whatTitle: "Projektpräsentation und Vertriebsführung",
      what: [
        "Filmische Eröffnungssequenz zur Vermittlung von Architektur und Raumgefühl.",
        "Interaktiver Grundriss- und Einheitenauswahlbereich.",
        "Fokussierte Abschnitte für Lage, Ausstattung und Ausblick.",
        "Präsent gestaltetes Formular für private Besichtigungsanfragen.",
        "Abgestimmte Darstellung für Desktop- und Smartphone-Bildschirme.",
      ],
      howTitle: "Vom architektonischen Überblick zur Besichtigung",
      how: [
        "Interessenten verschaffen sich einen Überblick über Wohnungsgrößen und Raumkonzepte.",
        "Grundrisse und Lagevorteile werden vor der Terminanfrage im Detail verglichen.",
        "Projektaktualisierungen lassen sich ohne Designbrüche einpflegen.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Die Webpräsenz transportiert die Hochwertigkeit des Bauprojekts und generiert qualifizierte Anfragen für das Verkaufsteam.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Eine Vertriebs- und Präsentationswebsite für Ihr Immobilienprojekt",
      ctaBlurb:
        "Nennen Sie Wohnungsanzahl und Verkaufsunterlagen, um Ihre maßgeschneiderte Plattform zu realisieren.",
      ctaButton: "Projekt starten",
    },
    "casa-aurelia": {
      tag: "Boutique-Hotel",
      summary:
        "Zweisprachige Hotelpräsenz für Casa Aurelia Roma, die historische Suiten, Concierge-Leistungen und die Lage in Rom auf Italienisch und Englisch darstellt.",
      whatTitle: "Zweisprachiges Gästeerlebnis",
      what: [
        "Großformatige Fotografie und klassische Typografie passend zum historischen Ambiente.",
        "Strukturierte Suitenseiten mit Ausstattungsmerkmalen und Concierge-Hinweisen.",
        "Synchronisierte italienische und englische Inhaltsarchitektur.",
        "Interaktive Umgebungskarte mit ausgewählten Zielen im Zentrum Roms.",
        "Direkte Buchungs- und Terminanfrage auf jeder Zimmerdetailseite.",
      ],
      howTitle: "Von der Zimmerwahl zur Reservierungsanfrage",
      how: [
        "Gäste vergleichen Suiten und Serviceangebote in ihrer Sprache.",
        "Nach Prüfung der Lage wird direkt eine Buchungsanfrage gestellt.",
        "Der Sprachwechsel behält die ausgewählte Suite exakt bei.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Die zweisprachige Plattform bewahrt den intimen Charakter des Hauses und steigert Direktbuchungen spürbar.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Eine zweisprachige Webpräsenz für Ihr Hotel",
      ctaBlurb:
        "Teilen Sie Zimmerarten und Zielmärkte mit, um Ihren passenden Hotelauftritt zu planen.",
      ctaButton: "Projekt starten",
    },
    "seraphine-atelier": {
      tag: "Modenschau & Atelier",
      summary:
        "Digitale Couture-Präsenz für Séraphine Atelier, die Damen- und Herren-Lookbooks direkt mit privaten Anprobeterminen verbindet.",
      whatTitle: "Lookbook-System und Atelierphilosophie",
      what: [
        "Reduzierte Farbwelt, markante Serifenschriften und ruhige Seitenbewegungen.",
        "Saisonale Lookbooks mit Angaben zu Schnitten, Stoffen und Silhouetten.",
        "Eigener Bereich für Maßschneiderei und traditionelle Handwerkskunst.",
        "Direkte Terminanfragen für private Anproben in den Kollektionen.",
        "Optimierte Layouts für mobile Bildschirme.",
      ],
      howTitle: "Von der Kollektionsinspiration zur privaten Anprobe",
      how: [
        "Kunden entdecken die aktuellen Entwürfe und prüfen Schnittdetails.",
        "Sie informieren sich über den Ablauf der individuellen Maßanfertigung.",
        "Über die Kollektionsseite wird ein Termin für eine persönliche Anprobe angefragt.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Die Website vermittelt den exklusiven Anspruch des Modehauses und führt Interessenten direkt zu persönlichen Terminen.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Ein Lookbook und Terminsystem für Ihr Modelabel",
      ctaBlurb:
        "Geben Sie Ihre Kollektionsstruktur und Terminabläufe an, um Ihre digitale Modepräsenz zu gestalten.",
      ctaButton: "Projekt starten",
    },
    "havva-baklava": {
      tag: "Handwerk & Manufaktur",
      summary:
        "Manufaktur-Website für HAVVA Baklava, die traditionelle Gaziantep-Backkunst, Tagespreise und WhatsApp-Bestellungen in Köln zusammenführt.",
      whatTitle: "Sortiment und Bestellablauf",
      what: [
        "Detailreiche Produktfotos zur Betonung von Frische und Handarbeit.",
        "Geschichte der Manufaktur von Gaziantep bis nach Köln.",
        "Klare Speisekarte mit Blechgrößen, Stückzahlen und aktuellen Preisen.",
        "Vorausgefüllte WhatsApp-Bestellnachricht mit Artikeln und Mengen.",
        "Backstubenadresse in Köln, Abholzeiten und Anfahrtsbeschreibung.",
      ],
      howTitle: "Von der Sortimentsübersicht zur WhatsApp-Bestellung",
      how: [
        "Kunden prüfen die Baklava-Sorten und aktuellen Preise.",
        "Mit einem Klick öffnet sich die vorausgefüllte WhatsApp-Bestellung.",
        "Das Team bestätigt Abholung oder Lieferung in kürzester Zeit.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Die Seite verbindet traditionelles Handwerk mit schnellen Bestellwegen und unterstützt den täglichen Verkauf in Köln.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Sortimentsübersicht und Schnellbestellung für Ihren Betrieb",
      ctaBlurb:
        "Nennen Sie Produkte, Preise und Lieferoptionen für eine direkte Verkaufsplattform.",
      ctaButton: "Projekt starten",
    },
    "sahra-butik": {
      tag: "Boutique-Web",
      summary:
        "Moderner Webkatalog für Sahra Butik, der Modekollektionen mit sofortiger Größen- und Bestandsabfrage über WhatsApp verbindet.",
      whatTitle: "Kollektionskatalog und Kundenkontakt",
      what: [
        "Bildraster zur Darstellung von Schnitten, Stoffqualitäten und Passformen.",
        "Klare Menüführung nach Anlässen und Kollektionen.",
        "Detailkarten mit Materialzusammensetzung und Größenangaben.",
        "Standortangaben und Öffnungszeiten des Ladengeschäfts.",
        "WhatsApp-Schaltfläche mit automatischer Übergabe von Artikelcode und Größe.",
      ],
      howTitle: "Vom Katalog zur schnellen Bestandsprüfung",
      how: [
        "Kunden durchstöbern Kollektionen und prüfen Details.",
        "Über WhatsApp wird die Verfügbarkeit der gewünschten Größe direkt angefragt.",
        "Das Verkaufsteam antwortet unmittelbar und wickelt den Kauf ab.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Der Katalog wandelt Social-Media-Reichweite in direkte Verkäufe um, indem Bestandsfragen sofort geklärt werden.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Produktkatalog und WhatsApp-Vertrieb für Ihr Modelabel",
      ctaBlurb:
        "Nennen Sie Kollektionsumfang und Verkaufsprozesse für einen interaktiven Kundenkatalog.",
      ctaButton: "Projekt starten",
    },
    "vela-skin-atelier": {
      tag: "Hautpflege-Studio",
      summary:
        "Behandlungs- und Terminplattform für VELA Skin Atelier SoHo, die Hautpflegeprotokolle, Behandlungszeiten und Beratungstermine strukturiert.",
      whatTitle: "Pflegeprotokolle und Terminvereinbarung",
      what: [
        "Warme Erdtöne und Serifenschriften passend zur individuellen Hautpflege.",
        "Detaillierte Übersichtskarten für Reset-, Sculpt-, Renew- und Restore-Protokolle.",
        "Transparente Angaben zu Behandlungsdauer, Wirkstoffen und Hautbedürfnissen.",
        "Hinweise zur Vorbereitung auf den Besuch im SoHo-Studio.",
        "Direkte Terminanfrage für Neukunden und Folgeberatungen.",
      ],
      howTitle: "Von der Protokollauswahl zum Studiotermin",
      how: [
        "Kunden informieren sich über Pflegeschwerpunkte und wählen passende Behandlungen.",
        "Dauer und Ablauf werden vor der Terminanfrage transparent eingesehen.",
        "Das Studiotam bestätigt den Termin und gleicht den Kalender ab.",
      ],
      stack: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      result:
        "Die Plattform stellt Behandlungen mit fachlicher Klarheit dar und bereitet Kunden optimal auf den Studiobesuch vor.",
      ctaLabel: "Ähnliches Projekt",
      ctaTitle: "Eine terminorientierte Webplattform für Ihr Kosmetikstudio",
      ctaBlurb:
        "Teilen Sie Behandlungsangebot und Terminregeln mit, um Ihren Studioauftritt zu realisieren.",
      ctaButton: "Projekt starten",
    },
    aiahi: {
      title: "Ahi AI",
      tag: "WhatsApp + CRM",
      summary:
        "Intelligentes Buchungssystem und Betriebs-CRM, das Terminanfragen auf WhatsApp anhand dynamischer Kalenderregeln automatisch abwickelt.",
      whatTitle: "Assistent und CRM-Architektur",
      what: [
        "Dialogsystem auf Basis der offiziellen WhatsApp Cloud API.",
        "Kalendersynchronisation unter Berücksichtigung von Öffnungszeiten und Mitarbeiterpausen.",
        "Zentrales CRM zur Verwaltung von Kundenkarten, Terminstatus und internen Notizen.",
        "Anpassbare Dialogabläufe für Salons, Praxen, Werkstätten und Beratungsteams.",
        "Nahtlose Übergabe an Mitarbeiter bei individuellen Kundenwünschen.",
        "Produktwebsite aiahi.net mit Funktionsübersicht.",
      ],
      howTitle: "Von der WhatsApp-Nachricht zur Kundendatenbank",
      how: [
        "Kunden schreiben per WhatsApp, um Termine oder Infos anzufragen.",
        "Der Assistent ermittelt freie Zeitfenster und bucht den Wunschtermin verbindlich ein.",
        "Der Eintrag wird sofort im Kalender und im CRM angelegt.",
        "Das Team verwaltet alle Tagestermine und Kundennotizen in einer Übersicht.",
      ],
      stack: ["Next.js", "TypeScript", "WhatsApp Cloud API", "PostgreSQL"],
      result:
        "Ahi AI vermeidet manuelle Erfassungsfehler auf WhatsApp und schafft geordnete Abläufe für wachsende Unternehmen.",
      ctaLabel: "Ähnliches System",
      ctaTitle: "Automatisieren Sie Ihren WhatsApp-Kanal mit eigenem CRM",
      ctaBlurb:
        "Geben Sie Öffnungszeiten und Buchungsregeln an, um Ihren individuellen Buchungsassistenten einzurichten.",
      ctaButton: "Projekt starten",
    },
    "whatsapp-bot": {
      title: "WhatsApp-Chat-Assistent",
      tag: "Automatisierung",
      summary:
        "Automatisierter WhatsApp-Assistent, der Fragen zu Leistungen und Preisen mit geprüften Unternehmensdaten beantwortet und Termine bucht.",
      whatTitle: "Dialoglogik und Kalenderabgleich",
      what: [
        "Antwortlogik auf Basis freigegebener Unternehmens- und Preisdaten.",
        "Direkte Kalenderanbindung zur Prüfung freier Mitarbeiter- und Raumkapazitäten.",
        "Automatische Terminbestätigungen, Verschiebungen und Stornierungen.",
        "Automatische Erinnerungsnachrichten vor anstehenden Terminen.",
        "Gezielte Weiterleitung an das Personal bei Sonderfragen.",
      ],
      howTitle: "Von der ersten Kundenfrage zur Terminbestätigung",
      how: [
        "Kunden erhalten sofort verlässliche Antworten zu Preisen und Angeboten.",
        "Bei Terminanfragen schlägt der Assistent freie Zeiten vor und bestätigt die Buchung.",
        "Der Kalender wird aktualisiert und das Team automatisch benachrichtigt.",
      ],
      stack: ["WhatsApp Cloud API", "n8n", "Python", "PostgreSQL"],
      result:
        "Der Assistent spart wöchentlich viele Stunden wiederkehrender Chat-Arbeit und ermöglicht eine 24/7-Terminannahme.",
      ctaLabel: "Ähnliches System",
      ctaTitle: "Machen Sie Ihre WhatsApp-Nummer zum automatischen Terminassistenten",
      ctaBlurb:
        "Nennen Sie häufige Kundenanfragen und Terminregeln für Ihren individuellen WhatsApp-Ablauf.",
      ctaButton: "Projekt starten",
    },
    "instagram-bot": {
      title: "Instagram-Assistent",
      tag: "Automatisierung",
      summary:
        "Assistent für Instagram-Direktnachrichten, der Preis- und Leistungsfragen beantwortet und Termine im gemeinsamen Kalender einträgt.",
      whatTitle: "Nachrichten-Automatisierung und Systemintegration",
      what: [
        "Automatisierte Antworten auf häufige Preisanfragen in Instagram-DMs.",
        "Gemeinsame Kalenderanbindung synchron mit WhatsApp und Webanfragen.",
        "Echtzeit-Verfügbarkeitsprüfung und direkte Buchung im Chatverlauf.",
        "Automatische Terminerinnerungen und Weiterleitung an Teammitglieder.",
      ],
      howTitle: "Von der Direktnachricht in den gemeinsamen Terminkalender",
      how: [
        "Follower fragen per Instagram nach Leistungen oder freien Zeiten.",
        "Der Assistent antwortet mit verifizierten Daten und führt zur Terminauswahl.",
        "Der Termin wird zentral im CRM und im Teamkalender gespeichert.",
      ],
      stack: ["Instagram Graph API", "n8n", "Python", "Supabase"],
      result:
        "Der Assistent wandelt Social-Media-Interaktionen in geplante Termine um und verhindert Kundenverluste außerhalb der Arbeitszeiten.",
      ctaLabel: "Ähnliches System",
      ctaTitle: "Verbinden Sie Ihre Instagram-Nachrichten mit Ihrem Kalender",
      ctaBlurb:
        "Teilen Sie Nachrichtenaufkommen und Leistungsangebote mit, um Ihren Instagram-Assistenten einzurichten.",
      ctaButton: "Projekt starten",
    },
    crm: {
      title: "Vertriebs- & Termin-Dashboard",
      tag: "Software",
      summary:
        "Zentrales Betriebs-Dashboard, das Termine aus WhatsApp und Instagram, Kundenhistorien und Teamnotizen auf einer Oberfläche bündelt.",
      whatTitle: "Kundenkartei und Arbeitsübersicht",
      what: [
        "Automatisch erstellte Kundenkarten bei jedem neuen Termineingang.",
        "Kanalübergreifender Verlauf mit Chatkontext, Buchungen und Teamnotizen.",
        "Tagesübersicht zur Koordination von Terminen, Mitarbeitern und Auslastung.",
        "Sofortige Synchronisation von Verschiebungen und Stornierungen über alle Kanäle.",
      ],
      howTitle: "Von der eingehenden Nachricht zur Teamkoordination",
      how: [
        "Eingehende Buchungen der Assistenten erscheinen sofort im Dashboard.",
        "Mitarbeiter ergänzen Notizen, ändern Status und verwalten den Ablauf.",
        "Die Kundenhistorie bleibt für künftige Termine jederzeit abrufbar.",
      ],
      stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      result:
        "Das Dashboard führt verstreute Chatnachrichten in einem verlässlichen System für das gesamte Team zusammen.",
      ctaLabel: "Ähnliches System",
      ctaTitle: "Bündeln Sie Ihre Kundentermine in einem eigenen Dashboard",
      ctaBlurb:
        "Beschreiben Sie Ihre Kommunikationskanäle und Arbeitsabläufe für ein passendes Verwaltungs-Dashboard.",
      ctaButton: "Projekt starten",
    },
    "css-system": {
      tag: "Designsystem",
      summary:
        "Modulares, tokenbasiertes CSS-Designsystem, das Farben, Typografie, Abstände und Komponenten für Websites und interne Softwarepanels standardisiert.",
      whatTitle: "Token-Architektur und Komponentenbibliothek",
      what: [
        "Design-Token für Farbpaletten, Schriftgrößen, Radien und Abstände.",
        "Wiederverwendbare UI-Elemente wie Buttons, Formularfelder, Modalfenster und Navigation.",
        "Semantische Sprachebenen für barrierefreie Hell- und Dunkel-Modi.",
        "Lebendige Dokumentation zur Referenz für Entwickler und Designer.",
        "Skalierbare Struktur zur Wahrung der Markenkonsistenz bei neuen Projekten.",
      ],
      howTitle: "Von den Design-Tokens zum Produktivcode",
      how: [
        "Gestaltungsparameter werden einmalig in der zentralen Token-Datei gepflegt.",
        "Verknüpfte Websites und Panels übernehmen die Änderungen automatisch.",
        "Neue Oberflächen entstehen schnell aus geprüften Standardkomponenten.",
      ],
      stack: ["CSS Custom Properties", "Design Tokens"],
      result:
        "Das Designsystem verhindert doppelten CSS-Code und sichert ein einheitliches Erscheinungsbild über alle digitalen Kontaktpunkte hinweg.",
      ctaLabel: "Ähnliches System",
      ctaTitle: "Ein zentrales CSS-Designsystem für Ihre digitalen Produkte",
      ctaBlurb:
        "Teilen Sie Ihre Frontend-Struktur mit, um ein einheitliches Designsystem für Ihre Systeme aufzusetzen.",
      ctaButton: "Projekt starten",
    },
  },
};

export function getProjectDetail(
  locale: string,
  id: string
): ProjectDetail | undefined {
  const byLocale = projectDetails[locale] ?? projectDetails.en;
  const detail = byLocale[id] ?? projectDetails.en?.[id] ?? projectDetails.tr?.[id];
  if (!detail) return undefined;

  /*
    `gallery` alanı hiçbir projede elle doldurulmuyor; kareler
    project-galleries.ts'te yaşıyor. Tip yorumu bu geri düşüşü ("yoksa
    project-galleries.ts kullanılır") baştan vaat ediyordu ama bağlanmamıştı —
    16 projenin galerisi de yazılı olduğu hâlde hiç basılmıyordu.

    Modül seviyesindeki nesneyi MUTASYONA UĞRATMA: projectDetails süreç
    boyunca paylaşılıyor, alan ataması istekler arasında sızar. Kopya döndür.
  */
  if (detail.gallery) return detail;
  const gallery = getProjectGallery(locale, id);
  return gallery?.length ? { ...detail, gallery } : detail;
}
