import type { GlossaryPage } from "../glossary";

const content: GlossaryPage = {
  metaTitle: "Web Sitesi ve SEO Sözlüğü | METEK Digital",
  metaDescription:
    "Kanonik URL, hreflang, site haritası, teknik SEO, şema, yerel sayfalar ve iş sitesi tesliminde kullandığımız terimlerin düz tanımları.",
  heroLabel: "Sözlük",
  heroTitle: "Site projesinde gerçekten kullandığımız terimler.",
  heroBlurb:
    "Kapsamda çıkan kelimeler: arama yapısı, özel site, panel ve uydurmayı reddettiğimiz şeyler. Kısa tanım.",
  lead: "Alıcı da tarayıcı da jargona takılır. Bu sayfa METEK Digital'in web tesliminde bu kelimeleri nasıl kullandığını yazar. Sıralama burada tanımlanmaz çünkü teslim kalemi değildir. Eksik kelime varsa ilgili hizmet sayfası veya yazı uzun açıklamadır.",
  terms: [
    {
      id: "canonical",
      term: "Kanonik URL",
      short:
        "Aynı içeriğin kopyaları varken indekslenmesini istediğiniz tek adresi bildiren etiket.",
      paragraphs: [
        "Arama motoru aynı metni www'li, slash'li veya yazdırma görünümünde görür. rel=canonical hangi URL'nin asıl kopya olduğunu söyler. Bu stüdyo sitesinde her dil kendini kanonik gösterir, İngilizce'yi değil.",
        "Kanonik kararı olmadan yayınlanan yenilemede Google zayıf kopyayı seçebilir.",
      ],
    },
    {
      id: "hreflang",
      term: "Hreflang",
      short:
        "Bir URL'nin dilini ve pazarını, kardeş adreslerini arama motoruna bildiren işaretler.",
      paragraphs: [
        "Her dil sürümü kendini ve diğerlerini listeler; x-default yedek dil içindir. Sinyal karşılıklı olmalı. Türkçe İngilizce'yi gösterip İngilizce Türkçe'yi yok sayarsa el sıkışması yarım kalır.",
        "Hreflang sayfayı çevirmez. O pazarda yazılan sorguyu yine o dildeki metin yanıtlar. Çok dilli SEO yazısına bakın.",
      ],
    },
    {
      id: "xml-sitemap",
      term: "XML site haritası",
      short:
        "Taranmasını istediğiniz kanonik URL'lerin makine listesi; lastmod ve çok dilde xhtml alternatifleri.",
      paragraphs: [
        "Harita sıralama artışı değildir. Lastmod hep 'bugün'se tarayıcı yok saymayı öğrenir. Bu site gerçek tarih ve diller arası alternatif yazar.",
        "Search Console'da göndermek hâlâ işe yarar. Dosyanın /sitemap.xml'de durması, Google'ın sizin takviminizle çekmesi demek değildir.",
      ],
    },
    {
      id: "technical-seo",
      term: "Teknik SEO",
      short:
        "Kamu sitesinin indekslenebilir yapısı: title, başlık, taranabilir bağlantı, canonical, hreflang, harita, robots, yönlendirme.",
      paragraphs: [
        "Web teslimine koyarız. Bir kelimenin birinci sırada oturacağı vaadi değildir. Kalite kapısı önemli URL'nin konusu olduğunu ve yenilemede eski adreslerin eşlendiğini bakar.",
        "İçerik, dış bağlantı ve yerel itibar bu tanımın dışındadır. Onları sıralama paketi diye satmayız.",
      ],
    },
    {
      id: "custom-website",
      term: "Özel web sitesi",
      short:
        "Marka için tasarlanıp kodlanan arayüz. Yeni renkli pazaryeri teması değil.",
      paragraphs: [
        "Özel işte de proje içi şablon vardır: yazı düzeni, tekrarlayan ürün modülü. Fark bu kalıpların ve teslimdeki kodun size ait olmasıdır.",
        "METEK hazır temayı özel diye satmaz. İçerik paneli gerekiyorsa ekibin kullanacağı alanlar kurulur.",
      ],
    },
    {
      id: "admin-panel",
      term: "Yönetim paneli",
      short:
        "Nesneleri işe uyan iç ekranlar: hat, oda, talep, yazı. İş o değilse jenerik CRM'in kişi ve fırsat nesneleri değil.",
      paragraphs: [
        "Panel yazılımdır. Site kamu yüzüdür. Ekip kamu sayfasını veya talebi yazılımcı olmadan işleyecekse birlikte teslim edilebilir.",
        "Nesneleriniz ürüne zaten uyuyorsa hazır CRM doğrudur. Cuma hâlâ tablo dışa aktarmaksa özel kazanır. Karşılaştırma yazısı çatalı açar.",
      ],
    },
    {
      id: "schema-markup",
      term: "Şema işaretlemesi",
      short:
        "JSON-LD ile kuruluş, sayfa, yazı, SSS ve hizmeti makinelerin paylaştığı sözlükte adlandırma.",
      paragraphs: [
        "İşlevli şema sayfada zaten görünen olguyu tekrarlar. Sahte yıldız, uydurma ortalama puan, olmayan ofis iddiası manuel işlem davetidir.",
        "Bu site ProfessionalService, Person, WebSite, FAQPage, Service, BlogPosting, BreadcrumbList ve bu URL'de DefinedTermSet işaretler. Müşteri sitesine ne gireceği şema yazısındadır.",
      ],
    },
    {
      id: "redirect-map",
      term: "Yönlendirme haritası",
      short:
        "Yenileme yayına girmeden önce eski URL'lerin yeni URL'lere yazılı listesi; genelde 301.",
      paragraphs: [
        "Arama motoru hizmet sayfalarınızı, yazıları, ürün adreslerini saklamıştır. Yol haritasız değişirse o birikim 404'e gider.",
        "Harita yenileme teslim kalemidir, yayın sonrası iyilik değil. Yenileme yazısı listenin gerisini anlatır.",
      ],
    },
    {
      id: "local-seo",
      term: "Yerel SEO",
      short:
        "Konusu insanların gerçekten aradığı yerdeki hizmet olan sayfalar ve kayıtlar; işletme profiliyle tutarlı.",
      paragraphs: [
        "'Tüm bölgeye hizmet' diyen ana sayfa yerel SEO değildir. Hizmet sayfaları ve dürüst bölge sayfalarıdır. Google İşletme Profili kardeş yüzeydir, o URL'lerin yerine geçmez.",
        "Harita paketi garantisi yok. Sayfa setini kurar, ad-adres-telefonu hizalarız. Yerel hizmet sektör sayfası ve yazı mimariyi anlatır.",
      ],
    },
    {
      id: "meta-title",
      term: "Title etiketi ve meta açıklama",
      short:
        "Title arama sonucundaki tıklanan başlıktır. Açıklama destek cümlesidir. İkisi de sayfanın konusuna uymalı.",
      paragraphs: [
        "URL başına bir konu. Her hizmeti tek title'a tıkmak motora hiçbir şey öğretmez. Açıklama cümledir, kelime listesi değil.",
        "Çok dilli sitede title pazar dilinde yazılır. İngilizce başlığı kelime kelime çevirmek dört dilin birbirine rakip olmasıdır.",
      ],
    },
    {
      id: "indexation",
      term: "İndeksleme",
      short:
        "Arama motorunun URL'yi saklayıp gösterebilmesi. Robots, noindex, canonical, bağlantı ve haritada listelenme ile yönetilir.",
      paragraphs: [
        "Sahne, teşekkür sayfası ve süzgeç kombinasyonları çoğu zaman indekste durmamalı. Kamu hizmet sayfaları durmalı. Bu bayrakları karıştırmak teslimden önce baktığımız yayın hatasıdır.",
        "İndeksleme sıralama değildir. Saklanan sayfa dördüncü sayfada da oturabilir. Teknik kontrol listesi yazısı baktığımız bayrakları sayar.",
      ],
    },
    {
      id: "geo-llms",
      term: "GEO ve llms.txt",
      short:
        "Üretken motorlarda doğru alıntılanmak: kökte düz llms.txt ile kim olduğunuzu, ne kurduğunuzu ve ne iddia etmeyeceğinizi yazmak.",
      paragraphs: [
        "Yapay zeka tarayıcıları Google ile aynı kamu HTML'ini okur. Ayrıca kısa, alıntılanabilir bir kimlik metni ararlar. Bu site /llms.txt ve /llms-full.txt yayımlar: uydurma ödül, sıra, sabit fiyat yok.",
        "GEO title ve sayfanın yerini tutmaz. Site ince temaysa metin dosyası alıntıyı kurtarmaz. Modelin quotelamasını beklediğimiz yer SSS ve hizmet lander'larıdır.",
      ],
    },
  ],
  ctaLabel: "İletişim",
  ctaTitle: "Brief'i tıkayan terimleri getirin.",
  ctaBlurb:
    "İş yenileme, çok dilli set veya yerel sayfa haritasıysa onu yazın. Bu kelimelerin ima ettiği kapsamla döneriz.",
  ctaButton: "Proje başlat",
};

export default content;
