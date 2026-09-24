/** Kart metinleri; tam project-details dosyası istemci paketine girmesin. */
export type ProjectCardCopy = {
  title?: string;
  tag: string;
  summary: string;
};

/*
  Ritim notu: bu dosyadaki 15 özet daha önce tek bir kalıptaydı:
  "[Yer]'deki [Marka] için [tür] sitesi. [detay]; [detay]." Aynı uzunluk,
  aynı noktalı virgül, 60 kayıtta 60 kez. Somut detaylar iyiydi, kalıp
  değildi: yapı tekdüzeliği metni makine işi gösteriyor.

  Artık cümle uzunluğu ve açılışlar bilerek değişiyor. Her özet 120 karakter
  bütçesinin içinde; kimi markayla, kimi işle, kimi kullanım adımıyla başlıyor.
  Yeni kart eklerken kalıbı kopyalama, komşularından farklı bir şekil seç.
*/

const projectCardCopy: Record<string, Record<string, ProjectCardCopy>> = {
  tr: {
    "elif-seren": {
      tag: "Kurumsal web",
      summary: "Uzm. Klinik Psikolog Elif Seren için güven veren dijital alan. EMDR ve psikoterapi hizmetleri, kurumsal kimlikle randevuya yönlendirir.",
    },
    "masal-koltuk": {
      tag: "Yerel arama",
      summary:
        "Malatya'da MASAL Koltuk. Site yayına girdi, müşteri aradı. Google ve yapay zekada en başta.",
    },
    wcc: {
      tag: "Kurumsal web",
      summary:
        "WCC'nin ürünlerini, tamamlanan mutfaklarını ve teklif talebini mobil öncelikli bir kurumsal sitede topladık.",
    },
    aydnnacar: {
      tag: "Marka ve katalog",
      summary:
        "Nacar Mobilya kataloğu koleksiyonları odaya göre ayırıyor; her model ölçü bilgisine ve satış görüşmesine bağlanıyor.",
    },
    wuffbutik: {
      tag: "Butik web",
      summary:
        "Wuuf'un koleksiyonları, mağaza bilgileri ve WhatsApp görüşmesi telefonda rahat gezilen tek vitrinde.",
    },
    "altitude-residence": {
      tag: "Lüks gayrimenkul",
      summary:
        "Altitude için rezidans tiplerinden konuma ve görüntüleme talebine ilerleyen bir satış sitesi.",
    },
    "casa-aurelia": {
      tag: "Butik otel",
      summary:
        "Casa Aurelia'nın odaları ve Roma konumu İngilizce ile İtalyanca sunuluyor; rezervasyon iki dilde de erişilebilir.",
    },
    "seraphine-atelier": {
      tag: "Moda vitrini",
      summary:
        "Séraphine Atelier'nin kadın ve erkek lookbook'ları, koleksiyon incelemesini özel prova talebine bağlıyor.",
    },
    "havva-baklava": {
      tag: "Butik web",
      summary:
        "HAVVA'nın atölye hikâyesi, günlük ürün fiyatları ve WhatsApp siparişi aynı sayfada buluşuyor.",
    },
    "sahra-butik": {
      tag: "Butik web",
      summary:
        "Sahra Butik kataloğu koleksiyonları ayırıyor; beden ve stok soruları seçilen ürünle WhatsApp'a gidiyor.",
    },
    "vela-skin-atelier": {
      tag: "Cilt atölyesi",
      summary:
        "VELA Skin Atelier'nin bakım protokolleri, stüdyo yaklaşımı ve danışmanlık adımı için hazırlanan SoHo randevu sitesi.",
    },
    aiahi: {
      tag: "WhatsApp + CRM",
      summary:
        "Mevcut WhatsApp hattına bağlı asistan ve panel; uygun saat, müşteri kaydı ve ekip notu birlikte tutuluyor.",
    },
    "whatsapp-bot": {
      title: "WhatsApp Sohbet Asistanı",
      tag: "Otomasyon",
      summary:
        "İşletmenin bilgileriyle yanıt veren WhatsApp asistanı; uygun saati öneriyor, kaydediyor ve hatırlatıyor.",
    },
    "instagram-bot": {
      title: "Instagram Mesaj Asistanı",
      tag: "Otomasyon",
      summary:
        "Instagram'daki fiyat ve randevu sorularını ortak takvimle yöneten, gerektiğinde ekibe devreden asistan.",
    },
    crm: {
      title: "Satış ve Randevu Paneli",
      tag: "Yazılım",
      summary:
        "WhatsApp ve Instagram randevuları; kanal geçmişi, müşteri bilgisi ve ekip notlarıyla tek panelde.",
    },
    "css-system": {
      tag: "Tasarım sistemi",
      summary:
        "Renk, tipografi, boşluk ve bileşenleri ortak token'larla yöneten; site ile paneli birlikte güncelleyen CSS sistemi.",
    },
  },
  en: {
    "elif-seren": {
      tag: "Corporate web",
      summary: "A reassuring digital space for Clinical Psychologist Elif Seren. Showcases EMDR and psychotherapy services, routing to appointments.",
    },
    "masal-koltuk": {
      tag: "Local search",
      summary:
        "On-site cleaning in Malatya. Site went live, customers called. First on Google and AI.",
    },
    wcc: {
      tag: "Corporate web",
      summary:
        "A mobile-first corporate site that brings WCC's cabinet lines, completed kitchens, and quote requests together.",
    },
    aydnnacar: {
      tag: "Brand + catalog",
      summary:
        "Nacar Mobilya's catalog sorts furniture by room; each model leads to dimensions, materials, and sales contact.",
    },
    wuffbutik: {
      tag: "Boutique web",
      summary:
        "Wuuf's collections, store details, and WhatsApp contact share a compact, phone-friendly storefront.",
    },
    "altitude-residence": {
      tag: "Luxury real estate",
      summary:
        "Altitude's residence types, location, and amenities lead to one practical next step: request a viewing.",
    },
    "casa-aurelia": {
      tag: "Boutique hotel",
      summary:
        "Casa Aurelia presents its rooms and Rome location in English and Italian, with booking available in both.",
    },
    "seraphine-atelier": {
      tag: "Fashion showcase",
      summary:
        "Séraphine Atelier's women's and men's lookbooks lead from collection browsing to a private fitting request.",
    },
    "havva-baklava": {
      tag: "Artisan food",
      summary:
        "HAVVA pairs its Gaziantep-to-Cologne workshop story with current prices and WhatsApp ordering.",
    },
    "sahra-butik": {
      tag: "Boutique web",
      summary:
        "Sahra Butik separates its collections in a catalog and carries size or stock questions into WhatsApp.",
    },
    "vela-skin-atelier": {
      tag: "Skin atelier",
      summary:
        "VELA Skin Atelier presents its protocols, consultation approach, and SoHo appointment route.",
    },
    aiahi: {
      tag: "WhatsApp + CRM",
      summary:
        "A booking assistant on the existing WhatsApp line, paired with a panel for openings, customer records, and notes.",
    },
    "whatsapp-bot": {
      title: "WhatsApp Conversation Assistant",
      tag: "Automation",
      summary:
        "A WhatsApp assistant that answers from business data, offers open times, records bookings, and sends reminders.",
    },
    "instagram-bot": {
      title: "Instagram DM Assistant",
      tag: "Automation",
      summary:
        "An Instagram assistant for price and booking questions, connected to the shared calendar and staff handoff.",
    },
    crm: {
      title: "CRM Sales Panel",
      tag: "Software",
      summary:
        "WhatsApp and Instagram bookings share one panel with channel history, customer details, and staff notes.",
    },
    "css-system": {
      tag: "Design system",
      summary:
        "A token-based CSS system that updates color, type, spacing, and components across the site and admin interface.",
    },
  },
  es: {
    "elif-seren": {
      tag: "Web corporativa",
      summary: "Un espacio digital tranquilizador para la Psicóloga Clínica Elif Seren. Muestra servicios de EMDR y psicoterapia, guiando a citas.",
    },
    "masal-koltuk": {
      tag: "Búsqueda local",
      summary:
        "Limpieza en Malatya. Salió el sitio, llamaron clientes. Primero en Google y en la IA.",
    },
    wcc: {
      tag: "Sitio corporativo",
      summary:
        "WCC reúne líneas de gabinetes, proyectos terminados y cotización en un sitio corporativo cómodo para celular.",
    },
    aydnnacar: {
      tag: "Catálogo de muebles",
      summary:
        "Nacar Mobilya ordena sus colecciones por ambiente y conserva el modelo elegido al abrir el contacto comercial.",
    },
    wuffbutik: {
      tag: "Sitio de boutique",
      summary:
        "Wuuf reúne colecciones, datos de tienda y consultas de talla o existencia por WhatsApp.",
    },
    "altitude-residence": {
      tag: "Bienes raíces",
      summary:
        "Altitude permite comparar residencias y planos antes de solicitar una visita.",
    },
    "casa-aurelia": {
      tag: "Hotel boutique",
      summary:
        "Casa Aurelia presenta habitaciones y ubicación en Roma en inglés e italiano, con reserva en ambos idiomas.",
    },
    "seraphine-atelier": {
      tag: "Moda y confección",
      summary:
        "Los lookbooks de Séraphine Atelier conectan cada colección con una solicitud de cita privada.",
    },
    "havva-baklava": {
      tag: "Alimentos artesanales",
      summary:
        "HAVVA combina su historia de taller con precios vigentes y pedidos por WhatsApp.",
    },
    "sahra-butik": {
      tag: "Catálogo de moda",
      summary:
        "Sahra organiza sus colecciones y abre preguntas de talla o existencia por WhatsApp desde cada modelo.",
    },
    "vela-skin-atelier": {
      tag: "Cuidado facial",
      summary:
        "VELA Skin Atelier explica sus protocolos y el proceso de consulta antes de solicitar una cita.",
    },
    aiahi: {
      tag: "WhatsApp + CRM",
      summary:
        "Ahi AI conecta el WhatsApp del negocio con el calendario, las fichas de clientes y las notas del equipo.",
    },
    "whatsapp-bot": {
      title: "Asistente de WhatsApp",
      tag: "Automatización",
      summary:
        "El asistente responde con información aprobada, ofrece horarios y registra citas en WhatsApp.",
    },
    "instagram-bot": {
      title: "Asistente de Instagram",
      tag: "Automatización",
      summary:
        "Atiende precios y citas en Instagram con el calendario compartido y transferencia al equipo.",
    },
    crm: {
      title: "Panel de ventas y citas",
      tag: "Software",
      summary:
        "Las citas de WhatsApp e Instagram comparten panel, ficha de cliente, estado y notas internas.",
    },
    "css-system": {
      tag: "Sistema de diseño",
      summary:
        "Un sistema CSS centraliza tokens de color, tipografía, espacios y componentes para el sitio y el panel.",
    },
  },
  de: {
    "elif-seren": {
      tag: "Corporate web",
      summary: "Ein beruhigender digitaler Raum für die klinische Psychologin Elif Seren. Zeigt EMDR- und Psychotherapie-Dienste und leitet zu Terminen.",
    },
    "masal-koltuk": {
      tag: "Lokale Suche",
      summary:
        "Polsterreinigung in Malatya. Website live, Kunden am Telefon. Zuerst bei Google und der KI.",
    },
    wcc: {
      tag: "Unternehmenswebsite",
      summary:
        "WCC bündelt Schranklinien, Referenzprojekte und Angebotsanfrage in einer mobil gut nutzbaren Unternehmenswebsite.",
    },
    aydnnacar: {
      tag: "Möbelkatalog",
      summary:
        "Nacar Mobilya ordnet Kollektionen nach Räumen und behält das gewählte Modell beim Vertriebskontakt bei.",
    },
    wuffbutik: {
      tag: "Boutique-Website",
      summary:
        "Wuuf zeigt Kollektionen und Ladenangaben mit direkter WhatsApp-Anfrage zu Größe oder Bestand.",
    },
    "altitude-residence": {
      tag: "Wohnimmobilien",
      summary:
        "Altitude lässt Wohnungstypen und Grundrisse vor der Besichtigungsanfrage vergleichen.",
    },
    "casa-aurelia": {
      tag: "Boutique-Hotel",
      summary:
        "Casa Aurelia zeigt Zimmer und Lage in Rom auf Englisch und Italienisch, mit Reservierung in beiden Sprachen.",
    },
    "seraphine-atelier": {
      tag: "Modeatelier",
      summary:
        "Die Damen- und Herren-Lookbooks von Séraphine Atelier führen aus jeder Kollektion zur privaten Anprobe.",
    },
    "havva-baklava": {
      tag: "Lebensmittelhandwerk",
      summary:
        "HAVVA verbindet seine Werkstattgeschichte mit aktuellen Preisen und Bestellung per WhatsApp.",
    },
    "sahra-butik": {
      tag: "Modekatalog",
      summary:
        "Sahra ordnet Kollektionen und öffnet Größen- oder Bestandsfragen direkt am Modell über WhatsApp.",
    },
    "vela-skin-atelier": {
      tag: "Hautpflege-Studio",
      summary:
        "VELA Skin Atelier erklärt Protokolle und Beratungsablauf vor einer Terminanfrage im SoHo-Studio.",
    },
    aiahi: {
      tag: "WhatsApp + CRM",
      summary:
        "Ahi AI verbindet die WhatsApp-Nummer des Betriebs mit Kalender, Kundendaten und Teamnotizen.",
    },
    "whatsapp-bot": {
      title: "WhatsApp-Assistent",
      tag: "Automatisierung",
      summary:
        "Der Assistent antwortet mit freigegebenen Angaben, bietet Zeiten an und speichert Termine in WhatsApp.",
    },
    "instagram-bot": {
      title: "Instagram-Assistent",
      tag: "Automatisierung",
      summary:
        "Er bearbeitet Preis- und Terminfragen auf Instagram mit gemeinsamem Kalender und Teamübergabe.",
    },
    crm: {
      title: "Vertriebs- und Terminpanel",
      tag: "Software",
      summary:
        "WhatsApp- und Instagram-Termine teilen sich Panel, Kundeneintrag, Status und interne Notizen.",
    },
    "css-system": {
      tag: "Designsystem",
      summary:
        "Ein CSS-System verwaltet gemeinsame Tokens für Farbe, Typografie, Abstände und Komponenten in Website und Panel.",
    },
  },
};

export function getProjectCardCopy(
  locale: string,
  id: string
): ProjectCardCopy | undefined {
  const pack = projectCardCopy[locale] ?? projectCardCopy.en;
  return pack[id] ?? projectCardCopy.en?.[id] ?? projectCardCopy.tr?.[id];
}
