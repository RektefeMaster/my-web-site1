import type { IndustryContent, IndustrySlug } from "../industries";

const content: Record<IndustrySlug, IndustryContent> = {
  manufacturing: {
    metaTitle: "Üretim Firması Web Sitesi | METEK Digital",
    metaDescription:
      "Üreticiler için özel web sitesi: ürün ailesi, teknik yaprak, bayi veya proje yolu ve satışın açabileceği teklif formu. Tema değil, teklif hareketine göre.",
    heroLabel: "Üretim",
    heroTitle: "Ciddi teklifi alabilen bir üretici sitesi.",
    heroBlurb:
      "Alıcı hat, ölçü ve tarihi sorar. Üretim sitelerini bu harekete göre kuruyoruz; kamu sayfalarını ofisin zaten kullandığı kayda bağlıyoruz.",
    lead: "Üretim sitesi, şirketi PDF ve telefonla satan bir broşür gibi durduğunda işe yaramaz. İşe yarayan yüzey ürün ailesini adlandırır, konuşmayı başlatacak kadar spesifikasyon gösterir ve satışa eksiksiz talep yollar. METEK Digital bu yüzeyi satış yolundan planlar; kamuya açık en yakın örnek Wholesale Cabinet Creations işidir.",
    hubTitle: "Üretim firması siteleri",
    hubBlurb:
      "Katalog, teknik bilgi ve teklif yolu. Fabrika ve ticaret markaları için.",
    sections: [
      {
        heading: "Alıcı sitede ne bitirmeye çalışır",
        paragraphs: [
          "Bayi veya müteahhit 'markayı tanımak' için gelmez. Hat var mı, finish veya ölçü net mi, teslim tarihi konuşulur mu diye bakar. Bu üç bilgi dört tık ve jenerik iletişim kutusuna sıkışırsa, bunları yazmış rakibe gider.",
          "İlk ekranı o ziyaretçiye yazın. Kurum tarihi aşağıda durabilir. Belgeler, uygulandıkları ürünün yanında dursun; Hakkımızda yığınına yığılmasın.",
        ],
      },
      {
        heading: "Satışınıza uyan sayfa haritası",
        paragraphs: [
          "Sık düzen: teklifi ve kanıtı gösteren ana sayfa, ürün aileleri, hat başına teknik veya galeri, teklif veya proje talebi. Sipariş hâlâ insandan geçiyorsa sahte mağaza kurmayın.",
          "Ofis yayın sonrası lead time veya finish güncelleyecekse aynı teslimde o alanlarla panel gerekir. Kimsenin düzenleyemediği güzel katalog bir sezonda eskir.",
        ],
      },
      {
        heading: "Arama bir sayfa sorunudur",
        paragraphs: [
          "Google şirket değil adres indeksler. 'Toptan mutfak dolabı' ile 'özel giydirme dolap' aynı ince ana sayfayı paylaşırsa ikisi de zayıf kalır. Her ailenin konusu, title'ı, H1'i ve iç bağlantısı olmalı.",
          "Bu işte teknik SEO o başlıklar, taranabilir HTML, canonical, site haritası ve eski alan adı değişiyorsa yönlendirmedir. Sıralama paketi diye satılmaz.",
        ],
      },
      {
        heading: "Satışın açacağı teklif alanları",
        paragraphs: [
          "Ad, e-posta ve 'mesaj' çöp üretir. Proje tipi, adet veya oda, sevk bölgesi, zaman ve varsa çizim dosyası sorun. Kaydı zaten inbox veya CRM'i tutan kişiye verin.",
          "B2B teklif formu yazısı üretim formlarına koyduğumuz alanları listeler. Tüketici 'bize yazın' bloğunu kopyalamadan önce onu okuyun.",
        ],
      },
      {
        heading: "Proje nasıl başlar",
        paragraphs: [
          "Ürün ailelerini, kimin aldığını (bayi, müteahhit, son kullanıcı), sayfanın hangi dilde konuşacağını ve bunun ilk site mi yenileme mi olduğunu yazın. Panel veya taşıma varsa ekleyin.",
          "En yakın portföy örneğini ve işin site, panel veya ikisi mi olduğunu söyleriz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Üretici için e-ticaret kuruyor musunuz?",
        answer:
          "Fiyat ve stokla gerçekten online satılıyorsa. Çoğu üretici projeden teklif verir. O durumda sahte sepet değil katalog ve talep formu teslim ederiz.",
      },
      {
        question: "Ekip ürünü yazılımcı olmadan günceller mi?",
        answer:
          "Panel kapsamdaysa evet. Kullanacakları alanları kurarız: hat, teknik, fotoğraf, teslim süresi. Temaya oturtulmuş genel CMS başka üründür.",
      },
      {
        question: "Her ürün adında sıralanır mıyız?",
        answer:
          "Önemli her ailenin kendi sayfası ve iç bağlantısı gerekir. Bu yapıyı site teslimine koyarız. Anahtar kelime listesinde birincilik vaadi yoktur.",
      },
      {
        question: "Başlamak için ne yazmalıyız?",
        answer:
          "Aileler, alıcı tipi, diller, varsa mevcut adres, teklifin e-postaya mı CRM'e mi gittiği. Uyum için yeter.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Özel web tasarımı" },
      {
        href: "/blog/manufacturing-company-website",
        label: "Üretim firması sitesi notları",
      },
      {
        href: "/blog/b2b-website-quote-requests",
        label: "B2B teklif formları",
      },
      { href: "/work/wcc", label: "Wholesale Cabinet Creations" },
    ],
    ctaLabel: "İletişim",
    ctaTitle: "Hattı ve alıcıyı yazın.",
    ctaBlurb:
      "Ürün aileleri, teklifi kimin istediği, mevcut site yenileniyor mu. Kapsamı kuran sorularla döneriz.",
    ctaButton: "Proje başlat",
  },
  furniture: {
    metaTitle: "Mobilya Web Sitesi Tasarımı | METEK Digital",
    metaDescription:
      "Showroom ve üretici için mobilya sitesi: koleksiyon, malzeme ve parçanın gerçekten satıldığı yola uyan talep. Tema galerisi değil.",
    heroLabel: "Mobilya",
    heroTitle: "Koleksiyonu sattığınız gibi gösterin.",
    heroBlurb:
      "Mobilya siteleri telefonlu tema galerisine dönünce durur. Koleksiyon, malzeme ve talebi gerçek satış yoluna göre kuruyoruz.",
    lead: "Mobilya alıcısı siluet, malzeme ve parçanın yapılıp yapılamayacağını karşılaştırır. Site bu karşılaştırmayı pazaryeri ızgarasına düşmeden taşımalı. METEK Digital mobilya sitelerini net sonraki adımlı editoryal katalog olarak kurar. Tempo için kamuya açık örnek Nacar Mobilya.",
    hubTitle: "Mobilya siteleri",
    hubBlurb:
      "Koleksiyon, malzeme ve talep. Showroom ve üretici için.",
    sections: [
      {
        heading: "Katalog, stok tema değil",
        paragraphs: [
          "Koleksiyonların kendi adresi olmalı. Koltuk ailesi ile yemek grubu ayrı arama ve ayrı satış konuşmasıdır. Sonsuz kaydırmada karışırlarsa ikisi de kaybolur.",
          "Fotoğraf ölçek ve finish göstersin, yalnız lifestyle kırpığı değil. Atölye kumaş veya ağaç değiştirebiliyorsa parça yanında söyleyin; seçenekleri kaydeden talebe götürün.",
        ],
      },
      {
        heading: "Formun karşısında kim var",
        paragraphs: [
          "Showroom ziyaretçisi, iç mimar ve otel specifier aynı formu doldurmaz. Tasarımcı gerçek kanalsa proje ve tarih sorun. Satış hâlâ yerinde kapanıyorsa site ziyareti ayarlasın, sahte ödeme uydurmasın.",
          "Yayın sonrası koleksiyon eklenecekse tabloda tutulan alanlarla panel planlayın. Yoksa site açılış fotoğrafında donar.",
        ],
      },
      {
        heading: "Arama model ve malzemedir",
        paragraphs: [
          "Kategori ve bazen malzeme yazılır: ceviz yemek masası, özel kanepe, otel casegoods. Bu ifadeler koleksiyon sayfasının title ve H1'inde durur, ana sayfaya doldurulmaz.",
          "Yenilemede eski koleksiyon URL'leri eşlenmeli. Yönlendirmesiz silmek, konusu olan tek sayfaları atar.",
        ],
      },
      {
        heading: "Kanıt sıfattan değil işten",
        paragraphs: [
          "Bitmiş iç mekân, atölye ayrıntısı veya konaklama uygulaması varsa gösterin. Ziyaretçinin baktığını yazın. Stok fotoğrafın yanında 'kaliteli zanaat' specifier'ın sipariş yazmasına yardım etmez.",
          "Brief'ten önce portföydeki mobilya ve üretim işine bakın. Kıyas satış hareketidir, palet değil.",
        ],
      },
      {
        heading: "Mobilya sitesi nasıl başlar",
        paragraphs: [
          "Koleksiyonları, kimin aldığını, dilleri, ilk site mi yenileme mi yazın. Arama zaten o adrese geliyorsa mevcut URL'yi ekleyin.",
          "İş kamu kataloğu mu, katalog artı panel mi, sipariş zaten yazılımda duruyorsa daha geniş sistem mi, onu söyleriz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Koleksiyonu siz mi çekiyorsunuz?",
        answer:
          "Çekim listesini ve görselin sayfadaki yerini planlarız. Fotoğraf üretimi ayrı kapsamdır. Arayüze başlamak için mevcut malzeme yeter.",
      },
      {
        question: "Kumaş ve finish siteden seçilir mi?",
        answer:
          "Kurallar yazılıysa ve birisi bakacaksa. Talepte basit seçenek listesi çoğu zaman yeter. Tam konfigurator yazılım işidir, tema özelliği değil.",
      },
      {
        question: "Bu üretim sitesiyle aynı mı?",
        answer:
          "Yakın, ziyaretçi farklı. Üretim sayfası teknik ve bayi teklifine yaslanır. Mobilya sayfası koleksiyon ve malzemeye. Teknik SEO ve panel alışkanlığı aynıdır.",
      },
      {
        question: "WordPress teması mı özel mi?",
        answer:
          "Özel. Pazaryeri mobilya teması orijinal iş diye satılmaz. Koleksiyon düzenlenecekse o alanlar kurulur; satın alınmış düzene mağaza eklentisi oturtulmaz.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Özel web tasarımı" },
      { href: "/industries/manufacturing", label: "Üretim siteleri" },
      { href: "/work/aydnnacar", label: "Nacar Mobilya" },
      {
        href: "/blog/custom-website-vs-template",
        label: "Özel site ve hazır tema",
      },
    ],
    ctaLabel: "İletişim",
    ctaTitle: "Koleksiyonu ve alıcıyı adlandırın.",
    ctaBlurb:
      "Showroom, tasarımcı veya proje specifier: sitenin önce kimi taşıyacağını söyleyin. Sayfa haritası oradan çıkar.",
    ctaButton: "Proje başlat",
  },
  hospitality: {
    metaTitle: "Otel Web Sitesi Tasarımı | METEK Digital",
    metaDescription:
      "Otel ve konaklama siteleri: oda tipi, konaklama bağlamı, doğrudan talep veya rezervasyon yolu. Motor kaplaması değil, tesise göre.",
    heroLabel: "Konaklama",
    heroTitle: "Tesisin kendisine ait bir otel sitesi.",
    heroBlurb:
      "Misafir odayı, konumu ve nasıl yazacağını veya rezervasyon yapacağını öğrenir. Konaklama sitelerini bu olgulara ve taranabilir yapıya göre kuruyoruz.",
    lead: "Çoğu otel teması aynı üç sıfatı slaytın üstüne koyar. Misafir hâlâ oda tiplerini, konaklamanın ne için olduğunu ve daha kötü fiyata opaq bir motora düşmeyen bir yol ister. METEK Digital konaklama sitelerini tesis belgesi gibi kurar: Casa Aurelia Roma ve Altitude Residences bu editoryal temponun kamu referansıdır.",
    hubTitle: "Otel ve konaklama siteleri",
    hubBlurb:
      "Oda, konum ve talep. Otel, residence ve konaklama için.",
    sections: [
      {
        heading: "Misafirin önce öğreneceği",
        paragraphs: [
          "Oda tipleri, bir cümlede konum, talep veya rezervasyon yolu. Atmosfer sonra gelir. İlk ekran 'sığınak' manifesto'suysa fiyat bakan zaten Booking'i açmıştır.",
          "Her oda tipinin adresi olsun. Süit ile avlu odası ayrı arama ve resepsiyona ayrı e-postadır. Hepsini tek 'konaklama' yığınına sıkıştırmak ikisini de ziyan eder.",
        ],
      },
      {
        heading: "Doğrudan yol ve motor",
        paragraphs: [
          "Doğrudan rezervasyon alıyorsanız site tarih, kişi ve konaklama amacını toplasın, masaya veya gerçekten kullandığınız motora versin. Tesis metni olmadan üçüncü parti kaplama her otel gibi durur.",
          "Masa hâlâ WhatsApp veya e-postayla kapatıyorsa bunu söyleyin ve o yolu düzgün kurun. İnsan onaylıyorken anında ödeme varmış gibi yapmak çift rezervasyon üretir.",
        ],
      },
      {
        heading: "Yerel arama ve diller",
        paragraphs: [
          "Mahalle ve şehir ifadeleri konum sayfasında dursun, her başlığa doldurulmasın. Roma butiği ile residence ürünü yatak var diye aynı metni paylaşmaz.",
          "Misafir karışımı birden fazla dilse her yerel ayrı yazılır. İngilizce oda sayfasını makineyle çevirmek ikinci pazarda hiçbir şey getirmez. Stüdyo sitesi aynı kuralla dört dilde çıkar.",
        ],
      },
      {
        heading: "Talep geldikten sonra",
        paragraphs: [
          "Talepler birikir. Ekip sorgu listesi, oda bloğu veya içerik güncellemesi istiyorsa bu aynı işte paneldir, sonra sürpriz değil.",
          "Teknik SEO title, oda URL'i, canonical, site haritası ve eski otel alan adından yönlendirmedir. Sıra vaadi işin parçası değildir.",
        ],
      },
      {
        heading: "Konaklama projesi nasıl başlar",
        paragraphs: [
          "Tesis tipini, oda listesini, şehri, dilleri, rezervasyonun doğrudan mı motor mu talep mi olduğunu yazın. Otel adında zaten görünüyorsa mevcut URL'yi ekleyin.",
          "İş site mi, site artı panel mi, masa zaten WhatsApp'sa mesaj devri mi, onu söyleriz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Booking veya channel manager bağlar mısınız?",
        answer:
          "Yazılı kapsamdaysa. Kamu sitesinin yine tesis metni ve oda URL'leri gerekir. Yalnız widget otel sitesi değildir.",
      },
      {
        question: "Talebi WhatsApp'ta tutabilir miyiz?",
        answer:
          "Evet. Site eksiksiz talebi WhatsApp veya e-postaya gönderebilir. Tekrarlayan soru hacmi varken chatbot ayrı hizmettir.",
      },
      {
        question: "Eski otel sitesini Google'dan düşmeden değişir mi?",
        answer:
          "Eski oda ve konum adresleri yayın öncesi eşlenip yönlendirilirse. Alan adı veya slug haritasız değişirse aramanın bildiği sayfalar gider.",
      },
      {
        question: "Bu yalnız lüks otel için mi?",
        answer:
          "Hayır. Aynı yapı küçük tesis ve residence ürününde de durur. Kapsam oda tipi ve rezervasyon yoludur, lüks etiketi değil.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Özel web tasarımı" },
      { href: "/blog/hotel-website-design", label: "Otel sitesi tasarımı" },
      { href: "/work/casa-aurelia", label: "Casa Aurelia Roma" },
      { href: "/work/altitude-residence", label: "Altitude Residences" },
    ],
    ctaLabel: "İletişim",
    ctaTitle: "Tesisi ve oda listesini gönderin.",
    ctaBlurb:
      "Şehir, diller, konaklamanın bugün nasıl onaylandığı. Site mi panel mi ikisi mi, bu olgular karar verir.",
    ctaButton: "Proje başlat",
  },
  "local-services": {
    metaTitle: "Yerel Hizmet Sitesi ve SEO Sayfaları | METEK Digital",
    metaDescription:
      "Yerel hizmet işletmesi sitesi: hizmet sayfaları, bölge sayfaları ve yakındaki aramaya uyan teknik SEO. Tek sayfalık broşür değil, sayfa seti.",
    heroLabel: "Yerel hizmet",
    heroTitle: "Hizmet ve bölge sayfaları, ince ana sayfa değil.",
    heroBlurb:
      "İş plus yer aranır. Yerel hizmet sitelerini eşleşen başlıklı sayfa seti olarak kuruyoruz. Google İşletme Profili kardeş yüzeydir, sitenin yerine geçmez.",
    lead: "Tesisatçı, temizlikçi veya döşeme atölyesi ana sayfada 'şehrimizde kaliteli hizmet' yazdığı için sıralanmaz. Arama motoru konusu o hizmet olan bir sayfa ister; çoğu zaman hizmetin adı geçen bölgede olduğu bir sayfa da. MASAL Koltuk bunun kamu örneği: on beş gün önce sitesi yoktu, bugün Google ve yapay zekada en başta.",
    hubTitle: "Yerel hizmet siteleri",
    hubBlurb:
      "Hizmet, bölge ve talep. Yakında aranan işletmeler için.",
    sections: [
      {
        heading: "Adres başına bir iş",
        paragraphs: [
          "Koltuk yıkama, yatak yıkama ve ofis temizliği ayrı sorgudur. Görsel sistemi paylaşabilirler. Ana sayfada tek paragrafta durmamalı. Her hizmete title, H1, kanıt, fiyatı yayınlıyorsanız bağlam ve o işi adlandıran form verin.",
          "Bölge sayfası ancak o bölgeye gerçekten gidiliyorsa vardır. Aynı metni ilçe adı değiştirerek çoğaltmak yok sayılmanın yoludur. Doğruyu yazın: yol, park, yapı tipi, dönüş süresi.",
        ],
      },
      {
        heading: "İşletme profili site değildir",
        paragraphs: [
          "Profil, harita paketini zaten güvenenleri gönderir. Site hâlâ hizmet sorgusunu yanıtlamalı, iş göstermeli, talebi almalı. Profildeki kategori ve fotoğraf sayfalarla çelişmesin.",
          "'Sizi harita paketine sokarız' diye ürün satmayız. Taranabilir ve bitirilebilir site yaparız. Maps sırası kontrol etmediğimiz birçok sinyale bağlıdır.",
        ],
      },
      {
        heading: "Burada teknik SEO ne demek",
        paragraphs: [
          "Title, özgün hizmet metni, ilgili işler arası iç bağlantı, canonical, site haritası, profille ad-adres-telefon tutarlılığı. Sunduğunuz hizmetler için LocalBusiness şeması. Sahte yorum ve uydurma yıldız yok.",
          "Yenilemede sahip olduğunuz her hizmet ve bölge URL'si yönlendirilmeli. Yerel sayfalar küçük firmanın çoğu zaman tek birikimidir.",
        ],
      },
      {
        heading: "Çağrı geldikten sonra",
        paragraphs: [
          "İş WhatsApp ile alınıyorsa sayfa hizmet ve bölgeyi içeren mesaj açsın. Ofis lead listesi istiyorsa kapsamda panel veya CRM devri vardır.",
          "Tek sayfalık siteye jenerik chatbot bağlayıp otomasyon demeyin. Önce sayfa seti.",
        ],
      },
      {
        heading: "Yerel hizmet sitesi nasıl başlar",
        paragraphs: [
          "Sattığınız işleri, gerçekten kapsadığınız yerleri, mevcut alanı, fiyat sayfası var mı yazın. İlk site mi ince broşür yenilemesi mi söyleyin.",
          "Sayfa setinin büyüklüğünü söyleriz. Daha çok ilçe otomatik daha iyi değildir. Kapsamın dürüstlüğü iyidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kaç bölge sayfası olmalı?",
        answer:
          "Hizmet verdiğiniz ve dürüstçe yazabildiğiniz kadar. On kopya ilçe, üç özgül olandan kötüdür. Seti sonradan değil site kapsamında planlarız.",
      },
      {
        question: "Google Haritalar birinciliği var mı?",
        answer:
          "Yok. İndekslenen hizmet ve bölge sayfası kurar, ad-adres-telefonu tutarlı tutarız. Harita paketi teslim kalemi diye satılmaz.",
      },
      {
        question: "WhatsApp randevu dahil mi?",
        answer:
          "Evet. Form veya düğme hizmet adını WhatsApp'a geçirebilir. Tekrar soru hacmi varken tam chatbot ayrı hizmettir.",
      },
      {
        question: "MASAL örneği nedir?",
        answer:
          "15 gün önce web sitesi yoktu. Bugün Google ve yapay zekada en başta. Site yayına girdikten sonra müşteriler aradı, firma yeni müşteri buldu.",
      },
    ],
    related: [
      { href: "/services/seo", label: "Teslimdeki teknik SEO" },
      {
        href: "/blog/chatgpt-gemini-local-service",
        label: "ChatGPT yerel firma kaydı",
      },
      { href: "/work/masal-koltuk", label: "MASAL Koltuk" },
      { href: "/services/web-design", label: "Özel web tasarımı" },
    ],
    ctaLabel: "İletişim",
    ctaTitle: "İşleri ve kapsadığınız yerleri yazın.",
    ctaBlurb:
      "Mevcut alan adı, fiyat kamuya açık mı. İlçe üreteci değil, duran bir sayfa setiyle döneriz.",
    ctaButton: "Proje başlat",
  },
};

export default content;
