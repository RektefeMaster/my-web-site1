export type ProjectGalleryShot = {
  src: string;
  alt: string;
  /** Grid span sınıfı; verilmezse ritimden türetilir */
  span?: string;
  /** Arayüz ekranlarını kırpmadan, fotoğraf karelerini taşırarak sun. */
  fit?: "cover" | "contain";
};

/*
  Kutu oranı yakalama oranıyla AYNI (8:5) ve görsel `contain` basılıyor.

  Sebep: buradaki kaynakların tamamı site ekran görüntüsü, fotoğraf değil.
  Eski ritim (`HERO/HALF/MID/WIDE` + `cover`) 1920×1200'lük bir yakalamayı
  190px'lik banda kırpıyordu; sonuç, cümlesi ortadan kesilmiş bir şerit —
  kasıtlı kadraj değil, hata gibi okunuyordu (Casa Aurelia'da ölçüldü:
  "…just stone / from the S" diye kesiliyordu). Fotoğraf karesi eklenirse
  `fit: "cover"` ile kare kare geçilebilir.
*/
const SCREEN_WIDE = "col-span-6 aspect-[8/5]";
const SCREEN_HALF = "col-span-6 aspect-[8/5] md:col-span-3";

/**
 * İlk kare tam genişlik — açılış ekranı vitrinin kendisi.
 * Kalanlar ikişerli; tek sayıda kalırsa sonuncusu da tam genişliğe çıkar,
 * böylece satır sonunda yarım boş kutu kalmıyor.
 */
function rhythmSpans(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    if (i === 0) return SCREEN_WIDE;
    const isLast = i === count - 1;
    const restIsOdd = (count - 1) % 2 === 1;
    return isLast && restIsOdd ? SCREEN_WIDE : SCREEN_HALF;
  });
}

type Locale = "tr" | "en" | "es" | "de";

type GalleryPack = Record<Locale, ProjectGalleryShot[]>;
type GallerySource = Omit<ProjectGalleryShot, "alt"> & {
  alt: Record<Locale, string>;
};

function pack(shots: GallerySource[]): GalleryPack {
  const spans = rhythmSpans(shots.length);
  const localize = (locale: Locale) =>
    shots.map(({ alt, ...shot }, index) => ({
      ...shot,
      span: shot.span ?? spans[index],
      fit: shot.fit ?? ("contain" as const),
      alt: alt[locale],
    }));

  return {
    tr: localize("tr"),
    en: localize("en"),
    es: localize("es"),
    de: localize("de"),
  };
}

const wcc = pack([
  {
    src: "/projects/wcc/featured/02-kitchen.jpg",
    alt: {
      tr: "Wholesale Cabinet Creations mutfak dolabı galeri bölümü",
      en: "Wholesale Cabinet Creations kitchen cabinet gallery section",
      es: "Sección de galería de gabinetes de cocina de Wholesale Cabinet Creations",
      de: "Küchenschrank-Galerieabschnitt von Wholesale Cabinet Creations",
    },
  },
  {
    src: "/projects/wcc/featured/03-projects.jpg",
    alt: {
      tr: "Tamamlanan mutfak ve dolap projelerinin fotoğraf galerisi",
      en: "Photo gallery of completed kitchen and cabinet projects",
      es: "Galería fotográfica de proyectos terminados de cocinas y gabinetes",
      de: "Fotogalerie abgeschlossener Küchen- und Schrankprojekte",
    },
  },
]);

const aydnnacar = pack([
  {
    src: "/projects/aydnnacar/featured/01-hero.jpg",
    alt: {
      tr: "Nacar Mobilya ana sayfa açılışı, koleksiyon vitrini",
      en: "Nacar Mobilya homepage hero showcasing furniture collections",
      es: "Hero de inicio de Nacar Mobilya con vitrina de colecciones",
      de: "Startseiten-Hero von Nacar Mobilya mit Kollektionsvitrine",
    },
  },
  {
    src: "/projects/aydnnacar/featured/02-collections.jpg",
    alt: {
      tr: "Salon, yemek ve yatak odası koleksiyonlarının genel görünümü",
      en: "Overview grid of living, dining, and bedroom collections",
      es: "Vista general de colecciones de salón, comedor y dormitorio",
      de: "Übersicht über Wohn-, Ess- und Schlafzimmerkollektionen",
    },
  },
  {
    src: "/projects/aydnnacar/featured/03-salon.jpg",
    alt: {
      tr: "Nacar Mobilya salon koleksiyonu ürün kartları",
      en: "Nacar Mobilya living room collection product cards",
      es: "Tarjetas de producto de la colección salón de Nacar Mobilya",
      de: "Produktkarten der Wohnkollektion von Nacar Mobilya",
    },
  },
  {
    src: "/projects/aydnnacar/featured/04-yatak.jpg",
    alt: {
      tr: "Nacar Mobilya yatak odası koleksiyonu geniş görünüm",
      en: "Wide view of Nacar Mobilya bedroom collection lineup",
      es: "Vista amplia de la colección dormitorio de Nacar Mobilya",
      de: "Breite Ansicht der Schlafzimmerkollektion von Nacar Mobilya",
    },
  },
]);

const wuffbutik = pack([
  {
    src: "/projects/wuffbutik/featured/01-hero-v3.jpg",
    alt: {
      tr: "Wuuf Butik ana sayfa açılışı, butik vitrin düzeni",
      en: "Wuuf Butik homepage hero with boutique showcase layout",
      es: "Hero de inicio de Wuuf Butik con vitrina boutique",
      de: "Startseiten-Hero von Wuuf Butik mit Boutique-Vitrine",
    },
  },
  {
    src: "/projects/wuffbutik/featured/02-selections.jpg",
    alt: {
      tr: "Mağazadan seçilen ürünler vitrin bölümü",
      en: "In-store selections featured on the showcase page",
      es: "Selecciones de tienda destacadas en la vitrina",
      de: "Aus dem Laden ausgewählte Stücke in der Vitrine",
    },
  },
  {
    src: "/projects/wuffbutik/featured/03-yakin-bak.jpg",
    alt: {
      tr: "Ürün detayına yakın plan görsel bölümü",
      en: "Close-up product detail section on the Wuuf site",
      es: "Sección de detalle de producto en primer plano",
      de: "Nahaufnahme-Abschnitt für Produktdetails bei Wuuf",
    },
  },
  {
    src: "/projects/wuffbutik/featured/04-gunluk.jpg",
    alt: {
      tr: "Wuuf Butik günlük giyim çizgisi vitrin sayfası",
      en: "Wuuf Butik everyday wear line showcase page",
      es: "Página de vitrina de la línea de ropa diaria de Wuuf Butik",
      de: "Vitrinenseite der Alltagslinie von Wuuf Butik",
    },
  },
  {
    src: "/projects/wuffbutik/featured/05-spor.jpg",
    alt: {
      tr: "Wuuf Butik spor giyim çizgisi koleksiyon bölümü",
      en: "Wuuf Butik sportswear line collection section",
      es: "Sección de la línea deportiva de Wuuf Butik",
      de: "Kollektionsbereich der Sportlinie von Wuuf Butik",
    },
  },
  {
    src: "/projects/wuffbutik/featured/06-tesettur.jpg",
    alt: {
      tr: "Wuuf Butik tesettür giyim çizgisi vitrin alanı",
      en: "Wuuf Butik modest wear line showcase area",
      es: "Área de vitrina de la línea de moda modesta de Wuuf Butik",
      de: "Vitrinenbereich der Modest-Fashion-Linie von Wuuf Butik",
    },
  },
]);

const altitude = pack([
  {
    src: "/projects/altitude-residence/featured/01-hero.jpg",
    alt: {
      tr: "Altitude Private Residences sinematik açılış, şehir manzarası",
      en: "Altitude Private Residences cinematic hero with city skyline",
      es: "Hero cinematográfico de Altitude Private Residences con skyline urbano",
      de: "Filmischer Hero von Altitude Private Residences mit Stadtsilhouette",
    },
  },
  {
    src: "/projects/altitude-residence/featured/02-residence.jpg",
    alt: {
      tr: "Rezidans tipleri ve yaşam alanları tanıtım bölümü",
      en: "Residence types and living spaces introduction section",
      es: "Sección introductoria de tipos de residencia y espacios de vida",
      de: "Einführungsbereich zu Residenztypen und Wohnräumen",
    },
  },
  {
    src: "/projects/altitude-residence/featured/03-city.jpg",
    alt: {
      tr: "Panoramik şehir manzarası ve konum avantajları bölümü",
      en: "Panoramic city view and location advantages section",
      es: "Sección de vista panorámica de la ciudad y ventajas de ubicación",
      de: "Abschnitt mit Panoramablick und Standortvorteilen",
    },
  },
  {
    src: "/projects/altitude-residence/featured/04-wellness.jpg",
    alt: {
      tr: "Spa ve wellness kulübü olanakları tanıtımı",
      en: "Spa and wellness club amenities overview",
      es: "Resumen de amenidades del club spa y wellness",
      de: "Überblick über Spa- und Wellness-Club-Ausstattung",
    },
  },
  {
    src: "/projects/altitude-residence/featured/05-hours.jpg",
    alt: {
      tr: "Rezidans sakinlerine özel zaman ve ritim anlatım bölümü",
      en: "Editorial section on private hours and daily rhythm for residents",
      es: "Sección editorial sobre horas privadas y ritmo diario de residentes",
      de: "Editorialer Abschnitt zu privaten Stunden und Tagesrhythmus",
    },
  },
  {
    src: "/projects/altitude-residence/featured/06-club.jpg",
    alt: {
      tr: "Sosyal kulüp alanları ve ortak yaşam programı bölümü",
      en: "Social club spaces and shared lifestyle program section",
      es: "Sección de espacios de club social y programa de vida compartida",
      de: "Bereich mit Clubräumen und gemeinschaftlichem Lifestyle-Programm",
    },
  },
]);

const casa = pack([
  {
    src: "/projects/casa-aurelia/featured/01-hero.jpg",
    alt: {
      tr: "Casa Aurelia Roma sinematik açılış, butik otel hero",
      en: "Casa Aurelia Roma cinematic homepage hero for the boutique hotel",
      es: "Hero cinematográfico de inicio del hotel boutique Casa Aurelia Roma",
      de: "Filmischer Startseiten-Hero des Boutique-Hotels Casa Aurelia Roma",
    },
  },
  {
    src: "/projects/casa-aurelia/featured/02-intro.jpg",
    alt: {
      tr: "Otel hikâyesi ve marka giriş metni bölümü",
      en: "Hotel story and brand introduction text section",
      es: "Sección de historia del hotel y texto introductorio de marca",
      de: "Abschnitt mit Hotelgeschichte und Markeneinführung",
    },
  },
  {
    src: "/projects/casa-aurelia/featured/03-rome.jpg",
    alt: {
      tr: "Roma konumu ve çevre hikâyesi harita destekli bölüm",
      en: "Map-supported section telling the Rome location and surroundings",
      es: "Sección con mapa sobre la ubicación en Roma y alrededores",
      de: "Kartenbasierter Abschnitt zur Lage in Rom und Umgebung",
    },
  },
  {
    src: "/projects/casa-aurelia/featured/04-rooms.jpg",
    alt: {
      tr: "Oda tipleri ve süit seçenekleri tanıtım grid'i",
      en: "Room types and suite options showcase grid",
      es: "Grid de presentación de tipos de habitación y suites",
      de: "Showcase-Grid mit Zimmertypen und Suite-Optionen",
    },
  },
  {
    src: "/projects/casa-aurelia/featured/05-gastronomy.jpg",
    alt: {
      tr: "Restoran ve gastronomi deneyimi tanıtım bölümü",
      en: "Restaurant and gastronomy experience section",
      es: "Sección de experiencia gastronómica y restaurante",
      de: "Abschnitt zum Restaurant- und Gastronomieerlebnis",
    },
  },
  {
    src: "/projects/casa-aurelia/featured/06-musica.jpg",
    alt: {
      tr: "Sala della Musica etkinlik ve müzik salonu bölümü",
      en: "Sala della Musica event and music hall section",
      es: "Sección del salón de música y eventos Sala della Musica",
      de: "Abschnitt zum Musik- und Veranstaltungssaal Sala della Musica",
    },
  },
]);

const seraphine = pack([
  {
    src: "/projects/seraphine-atelier/featured/01-hero.jpg",
    alt: {
      tr: "Séraphine Atelier sisli sinematik açılış filmi",
      en: "Séraphine Atelier misty cinematic opening film hero",
      es: "Hero de apertura cinematográfica con niebla de Séraphine Atelier",
      de: "Nebeliger filmischer Eröffnungs-Hero von Séraphine Atelier",
    },
  },
  {
    src: "/projects/seraphine-atelier/featured/02-lookbook.jpg",
    alt: {
      tr: "SS26 kadın koleksiyonu lookbook grid düzeni",
      en: "SS26 women's collection lookbook grid layout",
      es: "Grid de lookbook de la colección mujer SS26",
      de: "Lookbook-Grid der Damenkollektion SS26",
    },
  },
  {
    src: "/projects/seraphine-atelier/featured/03-women.jpg",
    alt: {
      tr: "Kadın koleksiyonu parça kartları, isim ve fiyat hiyerarşisi",
      en: "Women's collection piece cards with name and price hierarchy",
      es: "Tarjetas de piezas mujer con jerarquía de nombre y precio",
      de: "Damensstück-Karten mit Name- und Preishierarchie",
    },
  },
  {
    src: "/projects/seraphine-atelier/featured/04-maison.jpg",
    alt: {
      tr: "Butik zemin hikâyesi ve mağaza atmosferi fotoğrafları",
      en: "Maison floor story with boutique atmosphere photography",
      es: "Historia del suelo maison con fotos de atmósfera boutique",
      de: "Atelierboden-Geschichte mit Boutique-Atmosphäre-Fotos",
    },
  },
  {
    src: "/projects/seraphine-atelier/featured/05-men.jpg",
    alt: {
      tr: "Erkek koleksiyonu karanlık podyum grid düzeni",
      en: "Men's collection in a dark runway-style grid",
      es: "Colección hombre en grid estilo pasarela oscura",
      de: "Herrenkollektion in dunklem Runway-Grid",
    },
  },
  {
    src: "/projects/seraphine-atelier/featured/06-appointment.jpg",
    alt: {
      tr: "Özel prova randevusu talep bölümü ve çağrı",
      en: "Private fitting appointment request section and call to action",
      es: "Sección y llamado a la acción para solicitar cita de fitting privado",
      de: "Bereich und Handlungsaufforderung zur Anfrage eines privaten Fittings",
    },
  },
]);

const havva = pack([
  {
    src: "/projects/havva-baklava/featured/01-hero.jpg",
    alt: {
      tr: "HAVVA Baklava elde açılan katmanlı baklava hero görseli",
      en: "HAVVA Baklava hero showing hand-layered pastry",
      es: "Hero de HAVVA Baklava con capas hechas a mano",
      de: "HAVVA-Baklava-Hero mit handgeschichtetem Gebäck",
    },
  },
  {
    src: "/projects/havva-baklava/featured/02-gaziantep.jpg",
    alt: {
      tr: "Gaziantep'ten Köln Ehrenfeld'e uzanan ustalık hikâyesi panelleri",
      en: "Craft story panels from Gaziantep to Köln Ehrenfeld",
      es: "Paneles de historia artesanal de Gaziantep a Ehrenfeld, Colonia",
      de: "Handwerksgeschichte-Panels von Gaziantep nach Köln-Ehrenfeld",
    },
  },
  {
    src: "/projects/havva-baklava/featured/03-pistazie.jpg",
    alt: {
      tr: "Katmanlar arasında Antep fıstığı detay görseli",
      en: "Close detail of Antep pistachio between pastry layers",
      es: "Detalle de pistacho Antep entre capas de masa",
      de: "Detailaufnahme von Antep-Pistazien zwischen Teigschichten",
    },
  },
  {
    src: "/projects/havva-baklava/featured/04-tepsi.jpg",
    alt: {
      tr: "Taze baklava tepsisi açılış fotoğrafı",
      en: "Hero photograph of a fresh tray of baklava",
      es: "Fotografía principal de bandeja de baklava recién hecha",
      de: "Hero-Foto einer frischen Baklava-Platte",
    },
  },
  {
    src: "/projects/havva-baklava/featured/05-werkstatt.jpg",
    alt: {
      tr: "Ehrenfeld atölyesi el işçiliği ve üretim hikâyesi bölümü",
      en: "Ehrenfeld workshop handcraft and production story section",
      es: "Sección de taller en Ehrenfeld sobre elaboración manual",
      de: "Werkstattabschnitt Ehrenfeld zu Handarbeit und Produktion",
    },
  },
  {
    src: "/projects/havva-baklava/featured/06-whatsapp.jpg",
    alt: {
      tr: "WhatsApp üzerinden sipariş çağrısı bölümü",
      en: "Order via WhatsApp call-to-action section",
      es: "Sección de llamada a la acción para pedir por WhatsApp",
      de: "Handlungsaufforderung für Bestellung per WhatsApp",
    },
  },
]);

const vela = pack([
  {
    src: "/projects/vela-skin-atelier/featured/01-hero.jpg",
    alt: {
      tr: "VELA Skin Atelier SoHo açılış, krem zemin ve terracotta vurgu",
      en: "VELA Skin Atelier SoHo hero with cream ground and terracotta accent",
      es: "Hero de VELA Skin Atelier SoHo con fondo crema y acento terracotta",
      de: "VELA Skin Atelier SoHo-Hero mit Cream-Grund und Terracotta-Akzent",
    },
  },
  {
    src: "/projects/vela-skin-atelier/featured/02-philosophy.jpg",
    alt: {
      tr: "Önce gözlem yaklaşımını anlatan felsefe bölümü",
      en: "Philosophy section explaining the observation-first approach",
      es: "Sección de filosofía sobre el enfoque de observar primero",
      de: "Philosophie-Abschnitt zum Beobachtung-zuerst-Ansatz",
    },
  },
  {
    src: "/projects/vela-skin-atelier/featured/03-index.jpg",
    alt: {
      tr: "Reset, Sculpt, Renew protokolleri tedavi listesi",
      en: "Skin Index listing Reset, Sculpt, Renew, and other protocols",
      es: "Skin Index con protocolos Reset, Sculpt, Renew y otros",
      de: "Skin Index mit Reset-, Sculpt-, Renew-Protokollen und weiteren",
    },
  },
  {
    src: "/projects/vela-skin-atelier/featured/04-reset.jpg",
    alt: {
      tr: "VELA Reset öne çıkan ritüel tanıtım bölümü",
      en: "Featured VELA Reset ritual introduction section",
      es: "Sección destacada del ritual VELA Reset",
      de: "Hervorgehobener Einführungsbereich zum VELA-Reset-Ritual",
    },
  },
  {
    src: "/projects/vela-skin-atelier/featured/05-studio.jpg",
    alt: {
      tr: "Tek danışanlı stüdyo mekânı ve seans ritmi",
      en: "One-client studio space and session rhythm",
      es: "Espacio de estudio de un solo cliente y ritmo de sesión",
      de: "Ein-Gast-Studio-Raum und Sitzungsrhythmus",
    },
  },
  {
    src: "/projects/vela-skin-atelier/featured/06-book.jpg",
    alt: {
      tr: "Danışmanlık ve randevu rezervasyon çağrısı bölümü",
      en: "Consultation and appointment booking call-to-action section",
      es: "Sección de llamado a la acción para consultation y reserva de cita",
      de: "Handlungsaufforderung für Consultation und Terminbuchung",
    },
  },
]);

const sahra = pack([
  {
    src: "/projects/sahra-butik/featured/01-hero.jpg",
    alt: {
      tr: "Sahra Butik kadın giyim ana sayfa açılışı",
      en: "Sahra Butik women's wear homepage hero",
      es: "Hero de inicio de moda mujer Sahra Butik",
      de: "Startseiten-Hero von Sahra Butik Damenmode",
    },
  },
  {
    src: "/projects/sahra-butik/featured/02-lookbook.jpg",
    alt: {
      tr: "Güncel modeller lookbook grid düzeni",
      en: "Current models lookbook grid layout",
      es: "Grid de lookbook con modelos actuales",
      de: "Lookbook-Grid mit aktuellen Modellen",
    },
  },
  {
    src: "/projects/sahra-butik/featured/03-moods.jpg",
    alt: {
      tr: "Günlük, spor ve tesettür giyim bölümleri yan yana",
      en: "Everyday, sportswear, and modest-wear sections side by side",
      es: "Secciones de moda casual, deportiva y modesta en paralelo",
      de: "Alltagsmode, Sportmode und Modest Fashion nebeneinander",
    },
  },
  {
    src: "/projects/sahra-butik/featured/04-boutique.jpg",
    alt: {
      tr: "Fiziksel butik mağaza atmosferi ve stil fotoğrafları",
      en: "Physical boutique store atmosphere and style photography",
      es: "Fotografía de atmósfera y estilo de la boutique física",
      de: "Atmosphäre und Stilfotos der physischen Boutique",
    },
  },
  {
    src: "/projects/sahra-butik/featured/05-whisper.jpg",
    alt: {
      tr: "Stok ve beden sorusu için iletişim bandı",
      en: "Contact band for stock and size questions",
      es: "Banda de contacto para consultas de stock y talla",
      de: "Kontaktband für Bestands- und Größenfragen",
    },
  },
  {
    src: "/projects/sahra-butik/featured/06-garden.jpg",
    alt: {
      tr: "Kaydırmalı keşif bölümü, pin scroll düzeni",
      en: "Scroll discovery section with pin scroll layout",
      es: "Sección de descubrimiento con scroll y diseño pin",
      de: "Scroll-Entdeckungsbereich mit Pin-Scroll-Layout",
    },
  },
]);

function devicePack(
  id: string,
  name: Record<Locale, string>
): GalleryPack {
  return pack([
    {
      src: `/projects/${id}/desktop.jpg`,
      alt: {
        tr: `${name.tr} masaüstü panel arayüzü ekran görüntüsü`,
        en: `${name.en} desktop panel interface screenshot`,
        es: `${name.es} captura de interfaz de panel en escritorio`,
        de: `${name.de} Desktop-Panel-Oberfläche Screenshot`,
      },
    },
    {
      src: `/projects/${id}/mobile.jpg`,
      alt: {
        tr: `${name.tr} mobil panel arayüzü ekran görüntüsü`,
        en: `${name.en} mobile panel interface screenshot`,
        es: `${name.es} captura de interfaz móvil del panel`,
        de: `${name.de} Mobile-Panel-Oberfläche Screenshot`,
      },
    },
  ]);
}

const aiahi = pack([
  {
    src: "/projects/aiahi/featured/01-hero.jpg",
    alt: {
      tr: "Ahi AI ana sayfa: WhatsApp sohbeti ve günlük randevu paneli",
      en: "Ahi AI homepage with WhatsApp chat and daily booking panel",
      es: "Inicio de Ahi AI con chat de WhatsApp y panel de citas del día",
      de: "Ahi-AI-Startseite mit WhatsApp-Chat und Tages-Terminpanel",
    },
  },
  {
    src: "/projects/aiahi/featured/02-sectors.jpg",
    alt: {
      tr: "Kuaför, klinik ve servis gibi randevu yoğun sektörler bölümü",
      en: "Section for appointment-heavy trades such as salons, clinics, and repair services",
      es: "Sección para oficios con muchas citas: salones, clínicas y talleres",
      de: "Abschnitt für terminstarke Betriebe wie Salons, Kliniken und Werkstätten",
    },
  },
  {
    src: "/projects/aiahi/featured/03-panel.jpg",
    alt: {
      tr: "Müşteri kaydı, ziyaret geçmişi ve ekip notları paneli",
      en: "Customer record panel with visit history and team notes",
      es: "Panel de ficha de cliente con historial de visitas y notas del equipo",
      de: "Kundenakte mit Besuchshistorie und Teamnotizen",
    },
  },
  {
    src: "/projects/aiahi/featured/04-how.jpg",
    alt: {
      tr: "Müşteri yazar, kurallar yanıtlar, randevu kayda düşer adımları",
      en: "Steps from customer message to rule-based reply and booked record",
      es: "Pasos del mensaje del cliente a la respuesta por reglas y la cita registrada",
      de: "Schritte von der Kundennachricht zur regelbasierten Antwort und Terminakte",
    },
  },
  {
    src: "/projects/aiahi/featured/05-cta.jpg",
    alt: {
      tr: "Ahi AI iletişim ve panel inceleme çağrısı",
      en: "Ahi AI contact and panel preview call to action",
      es: "Llamada a contacto y vista del panel de Ahi AI",
      de: "Kontakt- und Panelansicht-Aufruf von Ahi AI",
    },
  },
  {
    src: "/projects/aiahi/mobile.jpg",
    alt: {
      tr: "Ahi AI mobil ana sayfa ekran görüntüsü",
      en: "Ahi AI mobile homepage screenshot",
      es: "Captura móvil de la página de inicio de Ahi AI",
      de: "Mobiler Screenshot der Ahi-AI-Startseite",
    },
  },
]);

const masal = pack([
  {
    src: "/projects/masal-koltuk/featured/01-hizmetler.jpg",
    alt: {
      tr: "MASAL hizmetler sayfası: yerinde koltuk yıkama ve döşeme temizliği başlığı",
      en: "MASAL services page: on-site upholstery and furniture cleaning",
      es: "Página de servicios de MASAL: limpieza de tapicería a domicilio",
      de: "MASAL-Leistungsseite: Polster- und Möbelreinigung vor Ort",
    },
  },
  {
    src: "/projects/masal-koltuk/featured/02-fiyatlar.jpg",
    alt: {
      tr: "2026 fiyat listesi: koltuk takımı, köşe takım ve yatak için açık fiyatlar",
      en: "2026 price list with open rates for sofa sets, corner units, and beds",
      es: "Lista de precios 2026 con tarifas abiertas para sofás, rinconeras y camas",
      de: "Preisliste 2026 mit offenen Sätzen für Sofas, Ecksofas und Betten",
    },
  },
  {
    src: "/projects/masal-koltuk/featured/03-isler.jpg",
    alt: {
      tr: "Araç koltuğu temizliği iş kaydı: önce ve sonra karşılaştırma sürgüsü",
      en: "Car seat cleaning job record with a before and after comparison slider",
      es: "Registro de limpieza de asiento con deslizador de antes y después",
      de: "Auftragsbericht zur Autositzreinigung mit Vorher-Nachher-Schieber",
    },
  },
  {
    src: "/projects/masal-koltuk/featured/04-bolgeler.jpg",
    alt: {
      tr: "Battalgazi ve Yeşilyurt hizmet bölgeleri sayfası",
      en: "Service area page for the Battalgazi and Yeşilyurt districts",
      es: "Página de zonas de servicio para los distritos de Battalgazi y Yeşilyurt",
      de: "Einsatzgebietsseite für die Stadtteile Battalgazi und Yeşilyurt",
    },
  },
  {
    src: "/projects/masal-koltuk/featured/05-rehber.jpg",
    alt: {
      tr: "Rehber bölümü: kuruma, leke ve kumaş sorularını yanıtlayan yazılar",
      en: "Guide section answering drying, stain, and fabric questions",
      es: "Sección de guías sobre secado, manchas y tipos de tejido",
      de: "Ratgeberbereich zu Trocknung, Flecken und Gewebearten",
    },
  },
]);

const whatsapp = devicePack("whatsapp-bot", {
  tr: "WhatsApp Asistanı",
  en: "WhatsApp Assistant",
  es: "Asistente WhatsApp",
  de: "WhatsApp-Assistent",
});

const instagram = devicePack("instagram-bot", {
  tr: "Instagram Mesaj Asistanı",
  en: "Instagram DM Assistant",
  es: "Asistente Instagram DM",
  de: "Instagram-DM-Assistent",
});

const crm = devicePack("crm", {
  tr: "Satış ve Randevu Paneli",
  en: "CRM Sales Panel",
  es: "Panel CRM",
  de: "CRM-Verkaufspanel",
});

const elifSeren = pack([
  {
    src: "/projects/elif-seren/featured/01-hero-v2.jpg",
    alt: {
      tr: "Elif Seren ana sayfa açılışı",
      en: "Elif Seren homepage hero",
      es: "Inicio de Elif Seren",
      de: "Elif Seren Startseite",
    },
  },
  {
    src: "/projects/elif-seren/featured/02-menu-v2.jpg",
    alt: {
      tr: "Tam ekran menü tasarımı",
      en: "Full screen menu design",
      es: "Diseño de menú a pantalla completa",
      de: "Vollbild-Menü-Design",
    },
  },
  {
    src: "/projects/elif-seren/featured/03-about-v2.jpg",
    alt: {
      tr: "Hakkımda ve uzmanlık alanı bölümü",
      en: "About and expertise section",
      es: "Sección de sobre mí y experiencia",
      de: "Über mich und Expertise-Bereich",
    },
  },
  {
    src: "/projects/elif-seren/featured/04-blog-v2.jpg",
    alt: {
      tr: "İçgörüler ve makaleler giriş sayfası",
      en: "Insights and articles landing page",
      es: "Página de inicio de perspectivas y artículos",
      de: "Landingpage für Einblicke und Artikel",
    },
  },
  {
    src: "/projects/elif-seren/featured/05-blog-grid-v2.jpg",
    alt: {
      tr: "Klinik psikoloji makaleleri grid görünümü",
      en: "Clinical psychology articles grid view",
      es: "Vista de cuadrícula de artículos de psicología clínica",
      de: "Rasteransicht für Artikel zur klinischen Psychologie",
    },
  },
  {
    src: "/projects/elif-seren/featured/06-clinic-1-v2.jpg",
    alt: {
      tr: "Klinik deneyimi ve iç mekan",
      en: "Clinic experience and interior",
      es: "Experiencia de la clínica e interior",
      de: "Klinikerfahrung und Interieur",
    },
  },
  {
    src: "/projects/elif-seren/featured/07-clinic-2-v2.jpg",
    alt: {
      tr: "Klinik lokasyonu ve mekanın iyileştirici gücü",
      en: "Clinic location and healing space",
      es: "Ubicación de la clínica y espacio curativo",
      de: "Klinikstandort und Heilungsraum",
    },
  }
]);

const cssSystem = devicePack("css-system", {
  tr: "Tasarım Sistemi",
  en: "CSS Design System",
  es: "Sistema de diseño CSS",
  de: "CSS-Designsystem",
});

export const projectGalleries: Record<string, GalleryPack> = {
  "masal-koltuk": masal,
  wcc,
  aydnnacar,
  wuffbutik,
  "altitude-residence": altitude,
  "casa-aurelia": casa,
  "seraphine-atelier": seraphine,
  "havva-baklava": havva,
  "sahra-butik": sahra,
  "vela-skin-atelier": vela,
  aiahi,
  "whatsapp-bot": whatsapp,
  "instagram-bot": instagram,
  crm,
  "elif-seren": elifSeren,
  "css-system": cssSystem,
};

export function getProjectGallery(
  locale: string,
  id: string
): ProjectGalleryShot[] | undefined {
  const packForId = projectGalleries[id];
  if (!packForId) return undefined;
  if (locale === "tr" || locale === "en" || locale === "es" || locale === "de") {
    return packForId[locale];
  }
  return packForId.en;
}
