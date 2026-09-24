import type { IndustryContent, IndustrySlug } from "../industries";

const content: Record<IndustrySlug, IndustryContent> = {
  manufacturing: {
    metaTitle: "Sitio web para fabricantes | METEK Digital",
    metaDescription:
      "Sitios a medida para fabricantes: líneas de producto, fichas, canal de distribuidores y formularios de cotización que ventas puede usar. El camino de venta, no un tema.",
    heroLabel: "Manufactura",
    heroTitle: "Un sitio de planta que puede tomar una cotización seria.",
    heroBlurb:
      "El comprador revisa línea, medida y fecha. Diseñamos sitios de manufactura alrededor de ese movimiento y atamos las páginas públicas a lo que ya usa la oficina.",
    lead: "Un sitio de fabricante sirve poco si parece un folleto de una empresa que cotiza por PDF y teléfono. La superficie útil nombra la familia de producto, muestra especificación suficiente para hablar y manda a ventas una solicitud completa. METEK Digital planea eso desde el camino de venta; el ejemplo público más cercano es Wholesale Cabinet Creations.",
    hubTitle: "Sitios para manufactura",
    hubBlurb:
      "Catálogo, ficha y cotización para fábricas y marcas de trade.",
    sections: [
      {
        heading: "Qué intenta terminar el comprador",
        paragraphs: [
          "El distribuidor o el contratista no llega a 'conocer la marca'. Confirma si existe la línea, si el finish o la medida están claros, si se puede hablar de fecha. Si esos tres datos están a cuatro clics y un contacto genérico, escribe al competidor que ya los publicó.",
          "Escriba la primera pantalla para ese visitante. La historia de la empresa puede ir más abajo. Los certificados junto al producto al que aplican, no en un montón de Nosotros.",
        ],
      },
      {
        heading: "Páginas que coinciden con cómo venden",
        paragraphs: [
          "Mapa habitual: inicio con oferta y prueba, familias de producto, ficha o galería por línea, solicitud de cotización o de proyecto. No invente una tienda si el pedido sigue pasando por una persona.",
          "Si la oficina actualizará plazos o finishes después del lanzamiento, el mismo encargo debe incluir un panel con esos campos. Un catálogo bonito que nadie edita envejece en una temporada.",
        ],
      },
      {
        heading: "La búsqueda es un problema de página",
        paragraphs: [
          "Google indexa direcciones. 'Gabinetes al por mayor' y 'closets a medida' no pueden compartir una home delgada y esperar posicionar ambas. Cada familia necesita asunto, title, H1 y enlaces desde páginas relacionadas.",
          "SEO técnico aquí son esos titles, HTML rastreable, canonicals, sitemap y redirecciones si cambia el dominio. Las posiciones no se venden como paquete honesto.",
        ],
      },
      {
        heading: "Campos que ventas sí abre",
        paragraphs: [
          "Nombre, correo y 'mensaje' producen basura. Pida tipo de proyecto, cantidad o habitaciones, zona de envío, timing y archivos si hay planos. El registro va a quien ya tiene el buzón o el CRM.",
          "El artículo de solicitudes B2B lista los campos que ponemos en formularios de manufactura. Léalo antes de copiar un bloque de 'contáctenos' de consumo.",
        ],
      },
      {
        heading: "Cómo empieza el proyecto",
        paragraphs: [
          "Envíe las familias, quién compra (distribuidor, constructor, particular), el idioma de la página y si es primer sitio o rediseño. Anote panel o migración.",
          "Indicamos el caso de portafolio más cercano y si el trabajo es sitio, panel o ambos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Arman ecommerce para fabricantes?",
        answer:
          "Cuando venden en serio en línea con precio y stock. Muchos fabricantes cotizan por proyecto. Entonces entregamos catálogo y solicitud, no un carrito fingido.",
      },
      {
        question: "¿El equipo actualiza productos sin un desarrollador?",
        answer:
          "Sí, si el panel entra en el alcance. Construimos los campos que usarán: líneas, fichas, fotos, plazos. Un CMS genérico sobre un tema es otro producto.",
      },
      {
        question: "¿El sitio posicionará por cada nombre de producto?",
        answer:
          "Cada familia importante necesita su página y enlaces internos. Esa estructura va en la entrega del sitio. Nadie promete con honestidad el primer lugar para una lista de palabras.",
      },
      {
        question: "¿Qué enviamos para empezar?",
        answer:
          "Familias, tipo de comprador, idiomas, URL actual si existe, si las cotizaciones van a correo o a un CRM. Con eso se ve el encaje.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Diseño web a medida" },
      {
        href: "/blog/manufacturing-company-website",
        label: "Sitio web para fabricantes",
      },
      {
        href: "/blog/b2b-website-quote-requests",
        label: "Formularios de cotización B2B",
      },
      { href: "/work/wcc", label: "Wholesale Cabinet Creations" },
    ],
    ctaLabel: "Contacto",
    ctaTitle: "Describa la línea y el comprador.",
    ctaBlurb:
      "Familias de producto, quién pide la cotización, si se reemplaza un sitio. Respondemos con las preguntas que definen el alcance.",
    ctaButton: "Iniciar proyecto",
  },
  furniture: {
    metaTitle: "Diseño web para muebles | METEK Digital",
    metaDescription:
      "Sitios de muebles a medida para showroom y fabricantes: colecciones, materiales y consultas alineadas con cómo se venden las piezas.",
    heroLabel: "Muebles",
    heroTitle: "Muestre la colección como la venden.",
    heroBlurb:
      "Los sitios de muebles se detienen cuando son galerías de tema con un teléfono. Diseñamos colección, material y consulta alrededor del camino de venta real.",
    lead: "Quien compra muebles compara silueta, material y si la pieza se puede hacer. El sitio tiene que sostener esa comparación sin volverse una grilla de marketplace. METEK Digital arma sitios de muebles como catálogos editoriales con un siguiente paso claro. Nacar Mobilya es el ejemplo público de ese ritmo.",
    hubTitle: "Sitios de muebles",
    hubBlurb:
      "Colección, material y consulta para showrooms y talleres.",
    sections: [
      {
        heading: "Catálogo, no un tema de stock",
        paragraphs: [
          "Las colecciones necesitan su propia URL. Una familia de sofás y un comedor son búsquedas y conversaciones distintas. Mezclarlas en un scroll infinito esconde ambas.",
          "La fotografía debe mostrar escala y finish, no solo recorte lifestyle. Si el taller cambia tela o madera, dígalo junto a la pieza y lleve al visitante a una solicitud que capture esas opciones.",
        ],
      },
      {
        heading: "Quién está del otro lado del formulario",
        paragraphs: [
          "El visitante de showroom, el interiorista y el especificador hotelero no llenan el mismo formulario. Si los diseñadores son un canal real, pida proyecto y plazo. Si la venta se cierra en sala, el sitio agenda la visita; no finja un checkout.",
          "Si después del lanzamiento se añaden colecciones, planee un panel con los campos que ya viven en una hoja. Si no, el sitio se congela en las fotos del día uno.",
        ],
      },
      {
        heading: "Se busca modelo y material",
        paragraphs: [
          "Se escribe la categoría y a veces el material: mesa de comedor de nogal, sofá a medida, casegoods de hotel. Esas frases van en title y H1 de la colección, no rellenas en la home.",
          "Un rediseño debe mapear las URLs viejas de colección. Borrarlas sin redirección tira las únicas páginas que ya tenían asunto.",
        ],
      },
      {
        heading: "Prueba del piso, no adjetivos",
        paragraphs: [
          "Muestre un interior terminado, un detalle de taller o una instalación hotelera si la tiene. Titule lo que se ve. 'Artesanía premium' junto a una foto de stock no ayuda a redactar una orden.",
          "Mire en el portafolio el trabajo de muebles y manufactura antes de briefarnos. La comparación útil es el movimiento de venta, no la paleta.",
        ],
      },
      {
        heading: "Cómo arranca un sitio de muebles",
        paragraphs: [
          "Liste colecciones, quién compra, idiomas y si es primer sitio o reemplazo. Adjunte la URL actual si la búsqueda ya manda gente allí.",
          "Diremos si el trabajo es catálogo público, catálogo más panel, o un sistema más amplio si los pedidos ya viven en software.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Fotografían la colección?",
        answer:
          "Planeamos la lista de tomas y cómo se sientan en la página. La producción fotográfica se acota aparte. El material existente alcanza para empezar la interfaz.",
      },
      {
        question: "¿Se puede configurar tela y finish en el sitio?",
        answer:
          "Cuando las reglas están escritas y alguien las mantiene. Una lista simple en la consulta suele bastar. Un configurador completo es software, no un extra de tema.",
      },
      {
        question: "¿Es lo mismo que un sitio de manufactura?",
        answer:
          "Cercano, visitante distinto. Manufactura se apoya en fichas y cotización de distribuidor. Muebles en colección y material. El SEO técnico y el hábito de panel son los mismos.",
      },
      {
        question: "¿Tema de WordPress o a medida?",
        answer:
          "A medida. Los temas de muebles de marketplace no se venden como trabajo original. Si hay que editar colecciones, armamos esos campos; no encajamos un plugin de tienda en un layout comprado.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Diseño web a medida" },
      { href: "/industries/manufacturing", label: "Sitios de manufactura" },
      { href: "/work/aydnnacar", label: "Nacar Mobilya" },
      {
        href: "/blog/custom-website-vs-template",
        label: "Sitio a medida o plantilla",
      },
    ],
    ctaLabel: "Contacto",
    ctaTitle: "Nombre las colecciones y el comprador.",
    ctaBlurb:
      "Showroom, diseñador o especificador de proyecto: a quién debe servir primero el sitio. El mapa de páginas sale de ahí.",
    ctaButton: "Iniciar proyecto",
  },
  hospitality: {
    metaTitle: "Diseño web para hoteles | METEK Digital",
    metaDescription:
      "Sitios de hotel y hospitalidad a medida: tipos de habitación, contexto de la estadía y vía directa de consulta o reserva. Para la propiedad, no la piel de un motor.",
    heroLabel: "Hospitalidad",
    heroTitle: "Un sitio de hotel que pertenece a la propiedad.",
    heroBlurb:
      "El huésped decide habitación, ubicación y cómo escribir o reservar. Diseñamos sitios de hospitalidad alrededor de esos hechos y de una estructura indexable, no de una plantilla de cualquier calle.",
    lead: "La mayoría de los temas de hotel ponen los mismos tres adjetivos sobre un slider. El huésped sigue necesitando tipos de habitación, para qué es la estadía y un camino que no lo tire a un motor opaco con peor tarifa. METEK Digital construye sitios de hospitalidad como documentos de la propiedad; Casa Aurelia Roma y Altitude Residences son las referencias públicas de ese ritmo editorial.",
    hubTitle: "Sitios de hotel y hospitalidad",
    hubBlurb:
      "Habitación, ubicación y consulta para hoteles, residences y estadías.",
    sections: [
      {
        heading: "Qué debe aprender primero el huésped",
        paragraphs: [
          "Tipos de habitación, la ubicación en una frase, cómo pedir o reservar. La atmósfera puede seguir. Si la primera pantalla es un manifiesto de 'santuario', quien compara tarifas ya abrió Booking.",
          "Cada tipo de habitación merece una URL. Un suite y una habitación al patio son búsquedas distintas y correos distintos a recepción. Juntarlos en un bloque de 'alojamiento' desperdicia ambos.",
        ],
      },
      {
        heading: "Camino directo frente al motor",
        paragraphs: [
          "Si toman reservas directas, el sitio recoge fechas, ocupación y el motivo de la estadía y lo pasa a recepción o al motor que sí usan. Vestir un widget de terceros sin copy de la propiedad sigue pareciendo cualquier hotel.",
          "Si el escritorio cierra por WhatsApp o correo, díganlo y armen ese camino bien. Fingir checkout instantáneo mientras una persona confirma produce dobles reservas.",
        ],
      },
      {
        heading: "Búsqueda local e idiomas",
        paragraphs: [
          "Barrio y ciudad van en la página de ubicación, no rellenos en cada titular. Un boutique en Roma y un producto residence no comparten texto solo porque ambos tienen camas.",
          "Si la mezcla de huéspedes es más de un idioma, escriba cada locale. Traducir la página de habitación en inglés con máquina no posiciona en el segundo mercado. El sitio del estudio sale en cuatro idiomas con la misma regla.",
        ],
      },
      {
        heading: "Después de la solicitud de estadía",
        paragraphs: [
          "Las solicitudes se acumulan. Si el equipo necesita una lista, bloques de habitación o actualizar contenido, eso es un panel en el mismo encargo, no una sorpresa posterior.",
          "El SEO técnico cubre titles, URLs de habitación, canonicals, sitemap y redirecciones desde un dominio viejo de hotel. Las promesas de ranking no forman parte del trabajo.",
        ],
      },
      {
        heading: "Cómo empieza un proyecto de hospitalidad",
        paragraphs: [
          "Tipo de propiedad, lista de habitaciones, ciudad, idiomas, si la reserva es directa, motor o consulta. Incluya la URL actual si ya posicionan por el nombre del hotel.",
          "Diremos si el trabajo es sitio, sitio más panel, o un paso a mensajería si WhatsApp ya es el escritorio.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Conectan Booking.com o un channel manager?",
        answer:
          "Cuando esa integración está en el alcance escrito. El sitio público sigue necesitando copy de la propiedad y URLs de habitación. Un widget solo no es un sitio de hotel.",
      },
      {
        question: "¿Podemos seguir tomando solicitudes por WhatsApp?",
        answer:
          "Sí. El sitio puede mandar una solicitud completa a WhatsApp o a correo. Un chatbot es otro servicio cuando el volumen de preguntas repetidas lo justifica.",
      },
      {
        question: "¿Se puede cambiar el sitio actual sin perder Google?",
        answer:
          "Si mapeamos URLs viejas de habitación y ubicación y ponemos redirecciones antes del lanzamiento. Cambiar dominio o slugs sin ese mapa tira las páginas que el buscador ya conoce.",
      },
      {
        question: "¿Esto es solo para hoteles de lujo?",
        answer:
          "No. La misma estructura sirve para una propiedad chica y un producto residence. El alcance sigue tipos de habitación y el camino de reserva, no una etiqueta de lujo.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Diseño web a medida" },
      { href: "/blog/hotel-website-design", label: "Diseño web para hoteles" },
      { href: "/work/casa-aurelia", label: "Casa Aurelia Roma" },
      { href: "/work/altitude-residence", label: "Altitude Residences" },
    ],
    ctaLabel: "Contacto",
    ctaTitle: "Envíe la propiedad y la lista de habitaciones.",
    ctaBlurb:
      "Ciudad, idiomas y cómo se confirma hoy una estadía. Esos hechos deciden si es sitio, panel o ambos.",
    ctaButton: "Iniciar proyecto",
  },
  "local-services": {
    metaTitle: "Sitio y páginas SEO para servicios locales | METEK Digital",
    metaDescription:
      "Sitios para negocios de servicio local: páginas de servicio, de zona y SEO técnico alineado con la búsqueda cercana. Un set de páginas, no un folleto de una sola.",
    heroLabel: "Servicios locales",
    heroTitle: "Páginas de servicio y de zona, no una home delgada.",
    heroBlurb:
      "Se busca el trabajo más el lugar. Armamos sitios de servicio local como un set de páginas con titles que coinciden. Google Business Profile es hermano, no sustituto del sitio.",
    lead: "Un plomero, una limpieza o un taller de tapicería no posiciona porque la home dice 'servicio de calidad en nuestra ciudad'. Los buscadores necesitan una página cuyo asunto es el servicio, y a menudo una cuyo asunto es el servicio en una zona nombrada. MASAL Koltuk es el ejemplo público: hace quince días no tenía web; hoy Google y la IA lo ponen primero.",
    hubTitle: "Sitios de servicio local",
    hubBlurb:
      "Servicio, zona y consulta para negocios que se buscan cerca.",
    sections: [
      {
        heading: "Un trabajo por URL",
        paragraphs: [
          "Limpieza de sofá, de colchón y de oficina son consultas distintas. Pueden compartir sistema visual. No deben compartir un párrafo en Inicio. Cada servicio necesita title, H1, prueba, contexto de precio si lo publican, y un formulario que nombre ese trabajo.",
          "Las páginas de zona solo existen si realmente cubren esa zona. Copiar el mismo texto y cambiar el pueblo es el camino a que las ignoren. Escriban lo cierto: traslado, estacionamiento, tipo de edificio, tiempo de respuesta.",
        ],
      },
      {
        heading: "El perfil de empresa no es el sitio",
        paragraphs: [
          "El perfil manda a quien ya confía en el pack de mapas. El sitio todavía tiene que responder la consulta de servicio, mostrar trabajo y tomar la solicitud. Categorías y fotos del perfil deben coincidir con las páginas, no contradecirlas.",
          "No vendemos 'los metemos en el pack de mapas' como producto. Hacemos un sitio que se puede rastrear y terminar. El ranking en Maps depende de señales que no controlamos.",
        ],
      },
      {
        heading: "Qué significa SEO técnico aquí",
        paragraphs: [
          "Titles, copy propio de cada servicio, enlaces internos entre trabajos relacionados, canonicals, sitemap, consistencia de nombre-dirección-teléfono con el perfil. Schema de LocalBusiness y de los servicios que realmente ofrecen, sin reseñas falsas ni ratings inventados.",
          "Un rediseño debe redirigir cada URL de servicio y de zona que ya tengan. Las páginas locales suelen ser el único capital de búsqueda de un negocio chico.",
        ],
      },
      {
        heading: "Cuando entra la llamada",
        paragraphs: [
          "Si los trabajos se cierran por WhatsApp, la página debe abrir un mensaje que ya lleve servicio y zona. Si la oficina necesita una lista de leads, eso es un panel o un paso a CRM en el alcance.",
          "No peguen un chatbot genérico a un sitio de una página y lo llamen automatización. Primero el set de páginas.",
        ],
      },
      {
        heading: "Cómo empieza un sitio de servicio local",
        paragraphs: [
          "Listen los trabajos que venden, las zonas que cubren de verdad, el dominio actual y si hay páginas de precio. Digan si es primer sitio o el reemplazo de un folleto delgado.",
          "Diremos qué tan grande debe ser el set. Más pueblos no es automáticamente mejor. La honestidad de cobertura sí.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuántas páginas de zona?",
        answer:
          "Tantas como sirvan y puedan escribir con honestidad. Diez pueblos copiados es peor que tres específicos. El set se planea en el alcance del sitio, no después.",
      },
      {
        question: "¿Garantizan el primer lugar en Google Maps?",
        answer:
          "No. Construimos páginas de servicio y zona indexables y mantenemos nombre, dirección y teléfono consistentes. El ranking del pack no es un entregable que alguien pueda garantizar con honestidad.",
      },
      {
        question: "¿Incluye reserva por WhatsApp?",
        answer:
          "Sí. El formulario o el botón pueden pasar el nombre del servicio a WhatsApp. Un chatbot completo es otro servicio cuando las preguntas repetidas lo justifican.",
      },
      {
        question: "¿Qué es el ejemplo MASAL?",
        answer:
          "Hace 15 días no tenía web. Hoy primero en Google y en la IA. Después del lanzamiento, la gente llamó. El negocio encontró clientes nuevos.",
      },
    ],
    related: [
      { href: "/services/seo", label: "SEO técnico en la entrega" },
      {
        href: "/blog/chatgpt-gemini-local-service",
        label: "Capturas de ChatGPT local",
      },
      { href: "/work/masal-koltuk", label: "MASAL Koltuk" },
      { href: "/services/web-design", label: "Diseño web a medida" },
    ],
    ctaLabel: "Contacto",
    ctaTitle: "Liste los trabajos y las zonas que cubren.",
    ctaBlurb:
      "Dominio actual y si los precios son públicos. Respondemos con un set que se sostiene, no con un generador de pueblos.",
    ctaButton: "Iniciar proyecto",
  },
};

export default content;
