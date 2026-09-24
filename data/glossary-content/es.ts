import type { GlossaryPage } from "../glossary";

const content: GlossaryPage = {
  metaTitle: "Glosario de sitios web y SEO | METEK Digital",
  metaDescription:
    "Definiciones claras de URL canónica, hreflang, sitemap, SEO técnico, schema, páginas locales y los términos de una entrega de sitio de empresa.",
  heroLabel: "Glosario",
  heroTitle: "Términos que usamos en un proyecto de sitio.",
  heroBlurb:
    "Definiciones cortas de estructura de búsqueda, sitio a medida, panel y de lo que nos negamos a inventar.",
  lead: "Compradores y crawlers tropiezan con la jerga. Esta página dice cómo METEK Digital usa las palabras en una entrega de sitio. El ranking no se define aquí porque no es un entregable. Si falta una palabra, la página de servicio o el artículo es la explicación larga.",
  terms: [
    {
      id: "canonical",
      term: "URL canónica",
      short:
        "La dirección que declara como la copia verdadera de una página cuando existen duplicados.",
      paragraphs: [
        "El buscador ve el mismo contenido con www y sin, con barra final o en una vista de impresión. rel=canonical apunta a la URL que quiere indexada. Cada locale de este sitio del estudio declara canónica a sí mismo, no al inglés.",
        "Un rediseño que lanza sin decidir canónicas deja que Google elija. Suele elegir la copia más débil.",
      ],
    },
    {
      id: "hreflang",
      term: "Hreflang",
      short:
        "Anotaciones que dicen al buscador el idioma y el mercado de una URL, y cuáles son sus hermanas.",
      paragraphs: [
        "Cada versión de idioma se lista a sí misma y a las demás, más x-default para el respaldo. La señal tiene que ser recíproca. Turco apunta a inglés y el inglés ignora el turco: el apretón queda a medias.",
        "Hreflang no traduce la página. El copy nativo sigue teniendo que responder la consulta que se escribe en ese mercado. Vea el artículo de SEO multilingüe.",
      ],
    },
    {
      id: "xml-sitemap",
      term: "Sitemap XML",
      short:
        "Lista máquina de las URLs canónicas que quiere rastrear, con lastmod y alternativas de idioma si el sitio es multilingüe.",
      paragraphs: [
        "Un sitemap no es un empujón de ranking. Es un mapa. Si lastmod es siempre 'hoy', los crawlers aprenden a ignorarlo. Este sitio escribe fechas reales y alternativas xhtml entre locales.",
        "Enviar el sitemap en Search Console sigue importando. Que el archivo exista en /sitemap.xml no es lo mismo que Google lo baje en un calendario que usted controla.",
      ],
    },
    {
      id: "technical-seo",
      term: "SEO técnico",
      short:
        "La estructura indexable de un sitio público: titles, encabezados, enlaces rastreables, canonicals, hreflang, sitemap, robots, redirecciones.",
      paragraphs: [
        "Lo incluimos en la entrega del sitio. No es la promesa de que una palabra se siente en el puesto uno. Las puertas de calidad miran que las URLs importantes tengan asunto y que, en un rediseño, las direcciones viejas estén mapeadas.",
        "El contenido, los enlaces de otros sitios y la reputación local quedan fuera de esta definición. No los vendemos como paquete de ranking.",
      ],
    },
    {
      id: "custom-website",
      term: "Sitio web a medida",
      short:
        "Una interfaz diseñada y construida para la marca, no un tema de marketplace con colores nuevos.",
      paragraphs: [
        "A medida igual usa plantillas dentro del proyecto: un layout de artículo, un módulo de producto que se repite. La diferencia es de quién son esos patrones y el código en el handoff.",
        "METEK no revende temas listos como trabajo a medida. Si hace falta un panel de contenido, armamos los campos que el equipo va a usar.",
      ],
    },
    {
      id: "admin-panel",
      term: "Panel de administración",
      short:
        "Pantallas internas cuyos objetos coinciden con el negocio: líneas, habitaciones, leads, artículos, no los contactos y tratos de un CRM genérico si ese no es el trabajo.",
      paragraphs: [
        "Un panel es software. El sitio es la cara pública. Pueden salir juntos cuando el equipo tiene que actualizar el sitio o procesar consultas sin un desarrollador.",
        "Un CRM de estantería es la compra correcta cuando sus objetos ya coinciden con el producto. Lo a medida gana cuando el viernes sigue siendo exportar una hoja. El artículo de comparación abre el tenedor.",
      ],
    },
    {
      id: "schema-markup",
      term: "Marcado schema",
      short:
        "Datos estructurados en JSON-LD que nombran la organización, páginas, artículos, FAQ y servicios en un vocabulario que las máquinas comparten.",
      paragraphs: [
        "El schema útil reitera hechos ya visibles en la página. Estrellas falsas, ratings agregados inventados y markup de Organization que afirma oficinas que no existen es cómo se gana una acción manual.",
        "Este sitio marca ProfessionalService, Person, WebSite, FAQPage, Service, BlogPosting, BreadcrumbList y en esta URL un DefinedTermSet. El artículo de schema dice qué va en un sitio de cliente.",
      ],
    },
    {
      id: "redirect-map",
      term: "Mapa de redirecciones",
      short:
        "Lista escrita de URLs viejas a URLs nuevas usada antes de que un rediseño salga en vivo, casi siempre como 301.",
      paragraphs: [
        "Los buscadores ya guardaron sus páginas de servicio, artículos y URLs de producto. Cambiar la ruta sin mapa entrega esa historia a un 404.",
        "El mapa es una línea de entrega en el rediseño, no un favor después del lanzamiento. El artículo de rediseño cubre el resto de la lista.",
      ],
    },
    {
      id: "local-seo",
      term: "SEO local",
      short:
        "Páginas y fichas cuyo asunto es un servicio en un lugar que la gente sí busca, alineadas con el perfil de la empresa.",
      paragraphs: [
        "Una home que dice 'servimos a toda la región' no es SEO local. Las páginas de servicio y las de zona honestas sí. Google Business Profile es una superficie hermana, no un reemplazo de esas URLs.",
        "No garantizamos el pack de mapas. Armamos el set de páginas y alineamos nombre, dirección y teléfono. La página de industria de servicios locales y el artículo describen la arquitectura.",
      ],
    },
    {
      id: "meta-title",
      term: "Title tag y meta description",
      short:
        "El title es el titular clicable en los resultados. La description es la frase de apoyo. Ambos deben coincidir con el asunto de la página.",
      paragraphs: [
        "Un asunto por URL. Meter todos los servicios en un title no le enseña nada al motor. Las descriptions se escriben como frases, no como listas de palabras.",
        "En un sitio multilingüe el title se redacta en el idioma del mercado. Traducir el title inglés palabra por palabra es cómo cuatro locales compiten entre sí.",
      ],
    },
    {
      id: "indexation",
      term: "Indexación",
      short:
        "Si los buscadores guardan una URL y pueden mostrarla. Lo controlan robots, noindex, canonicals, y si la URL está enlazada y listada en el sitemap.",
      paragraphs: [
        "Staging, páginas de gracias y combinaciones de filtro a menudo deben quedarse fuera del índice. Las páginas públicas de servicio, dentro. Mezclar esas banderas es un defecto de lanzamiento que revisamos antes del handoff.",
        "Indexación no es ranking. Una página guardada puede seguir en la página cuatro. El artículo de checklist técnico lista las banderas que miramos.",
      ],
    },
    {
      id: "geo-llms",
      term: "GEO y llms.txt",
      short:
        "Optimización para motores generativos: hacer que el estudio se cite con exactitud en respuestas de IA, empezando por un llms.txt claro en la raíz.",
      paragraphs: [
        "Los crawlers de IA leen el mismo HTML público que Google. También buscan una declaración corta y citables de quién es usted, qué construye y qué no va a afirmar. Este sitio publica /llms.txt y /llms-full.txt con esos límites: nada de premios, rankings o precios fijos inventados.",
        "GEO no reemplaza titles ni páginas. Si el sitio de abajo es un tema delgado, un archivo de texto no salva la cita. Las FAQ y los landers de servicio son las páginas que esperamos que los modelos citen.",
      ],
    },
  ],
  ctaLabel: "Contacto",
  ctaTitle: "Traiga los términos que traban el brief.",
  ctaBlurb:
    "Si el trabajo es un rediseño, un set de idiomas o un mapa de páginas locales, escríbalo. Respondemos con el alcance que esas palabras implican.",
  ctaButton: "Iniciar proyecto",
};

export default content;
