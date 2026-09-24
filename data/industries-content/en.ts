import type { IndustryContent, IndustrySlug } from "../industries";

const content: Record<IndustrySlug, IndustryContent> = {
  manufacturing: {
    metaTitle: "Manufacturing Company Website Design | METEK Digital",
    metaDescription:
      "Custom websites for manufacturers: product lines, specs, dealer or trade paths, and quote requests sales can actually use. Built around the offer, not a theme.",
    heroLabel: "Manufacturing",
    heroTitle: "A factory site that can take a serious quote.",
    heroBlurb:
      "Trade buyers need lines, finishes, constraints, and a form that captures the job. We design manufacturing websites around that motion, then wire the public pages to the tools the office already uses.",
    lead: "A manufacturing website fails when it looks like a brochure for a company that quotes from PDFs and phone calls. The useful site names the product family, shows enough specification to start a conversation, and sends a complete request to sales. METEK Digital plans that surface from the sales path, using work such as the Wholesale Cabinet Creations site as the nearest public example.",
    hubTitle: "Manufacturing websites",
    hubBlurb:
      "Catalogue, specification, and quote paths for factories and trade brands.",
    sections: [
      {
        heading: "What a buyer is trying to do",
        paragraphs: [
          "A dealer or contractor rarely arrives to 'learn about the brand.' They arrive to confirm a line exists, see a finish or dimension, and ask whether you can hit a date. If those three facts take four clicks and a generic contact box, they email a competitor who already listed them.",
          "Write the first screen for that visitor. Company history can sit lower. Certifications belong next to the product they apply to, not in a dump on About.",
        ],
      },
      {
        heading: "Pages that match how you sell",
        paragraphs: [
          "Typical map: home with the offer and proof, product families, a spec or gallery page per line, a quote or project request, and a dealer or trade login only if that channel is real. Do not invent a shop if orders still go through a human.",
          "If the office updates lead times or finishes after launch, the same delivery should include an admin panel with those fields. A pretty catalogue that nobody can edit becomes stale in a season.",
        ],
      },
      {
        heading: "Search is a page problem",
        paragraphs: [
          "Google indexes URLs. 'Kitchen cabinets wholesale' and 'custom closet systems' cannot share one thin homepage and expect both to rank. Each family needs a subject, a title, an H1, and links from related pages.",
          "Technical SEO in this work means those titles, crawlable HTML, canonicals, a sitemap, and redirects if you are replacing an old domain. Rankings are not a package anyone can honestly guarantee.",
        ],
      },
      {
        heading: "Quote fields sales will open",
        paragraphs: [
          "Name, email, and 'message' produce junk. Ask for project type, quantity or rooms, ship-to region, timing, and files if drawings exist. Pass the record to whoever already owns the inbox or CRM.",
          "The article on B2B quote requests lists the fields we actually put on manufacturing forms. Read that before you copy a consumer 'get in touch' block.",
        ],
      },
      {
        heading: "How this project starts",
        paragraphs: [
          "Send the product families, who buys (dealer, builder, homeowner), which language the page must speak, and whether this is a first site or a rebuild. Note any panel or migration.",
          "We will point you at the closest portfolio match and say which service the job resembles: website, panel, or both.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build ecommerce for manufacturers?",
        answer:
          "When the business actually sells online with prices and stock. Many manufacturers quote per project. In that case we ship a catalogue and a request form, not a fake cart.",
      },
      {
        question: "Can the team update products without a developer?",
        answer:
          "Yes, when an admin panel is in scope. We build the fields they will use: lines, specs, photos, lead times. A generic CMS dumped on a theme is a different product.",
      },
      {
        question: "Will the site rank for every product name?",
        answer:
          "Each important product family needs its own page and internal links. We include that structure in the website delivery. Nobody can honestly promise first place for a list of keywords.",
      },
      {
        question: "What should we send to start?",
        answer:
          "Families, buyer type, languages, current URL if any, and whether quotes go to email or a CRM. That is enough to see fit.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Custom website design" },
      {
        href: "/blog/manufacturing-company-website",
        label: "Manufacturing company website notes",
      },
      {
        href: "/blog/b2b-website-quote-requests",
        label: "B2B quote request forms",
      },
      { href: "/work/wcc", label: "Wholesale Cabinet Creations" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Describe the line and the buyer.",
    ctaBlurb:
      "Name the product families, who requests the quote, and whether this replaces an existing site. We reply with the questions that set scope.",
    ctaButton: "Start a project",
  },
  furniture: {
    metaTitle: "Furniture Website Design | METEK Digital",
    metaDescription:
      "Custom furniture websites for showrooms and manufacturers: collections, materials, and inquiry paths that match how pieces are actually sold.",
    heroLabel: "Furniture",
    heroTitle: "Show the collection the way you sell it.",
    heroBlurb:
      "Furniture sites stall when they are theme galleries with a phone number. We design collection pages, material stories, and inquiries around the actual sales path, from showroom visit to project quote.",
    lead: "A furniture buyer compares silhouette, material, and whether you can make the piece. The site has to carry that comparison without turning into a marketplace grid. METEK Digital builds furniture websites as editorial catalogues with a clear next step. Public work such as Nacar Mobilya is the closest example of that pacing.",
    hubTitle: "Furniture websites",
    hubBlurb:
      "Collection, material, and inquiry pages for showrooms and makers.",
    sections: [
      {
        heading: "Catalogue, not a stock theme",
        paragraphs: [
          "Collections need their own URLs. A sofa family and a dining line are different searches and different sales conversations. Mixing them on one infinite scroll hides both.",
          "Photography should show scale and finish, not only lifestyle crop. If the workshop can change fabric or wood, say so next to the piece, then send the visitor to a request that captures those options.",
        ],
      },
      {
        heading: "Who is on the other side of the form",
        paragraphs: [
          "Retail walk-in, interior designer, and hospitality specifier do not fill the same form. If designers are a real channel, give them a path that asks for project and timeline. If the showroom still closes the sale in person, the site should book the visit, not pretend checkout exists.",
          "When staff will add collections after launch, plan an admin panel with the fields they already keep in a spreadsheet. Otherwise the site freezes on launch day photography.",
        ],
      },
      {
        heading: "Search terms are model names and materials",
        paragraphs: [
          "People type the product category and sometimes a material: walnut dining table, custom sofa, hotel casegoods. Those phrases belong on collection pages, in titles and H1s, not stuffed into the homepage.",
          "A rebuild must map old collection URLs. Dropping them without redirects throws away the only pages that already had a subject.",
        ],
      },
      {
        heading: "Proof from the floor, not adjectives",
        paragraphs: [
          "Show a finished interior, a workshop detail, or a hospitality install if you have it. Caption what the visitor is looking at. 'Premium craftsmanship' next to a stock photo does not help a specifier write a PO.",
          "Look at the portfolio for furniture and manufacturing work before you brief us. The useful comparison is sales motion, not color palette.",
        ],
      },
      {
        heading: "Starting a furniture site",
        paragraphs: [
          "List collections, who buys, languages, and whether this is a first site or a replacement. Attach the current URL if search already sends people there.",
          "We will say whether the job is a public catalogue, a catalogue plus panel, or a larger system if orders already live in software.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you photograph the collection?",
        answer:
          "We can plan the shot list and how images sit on the page. Photography itself is scoped separately if you need it produced. Existing assets are enough to start the interface.",
      },
      {
        question: "Can customers configure fabric and finish online?",
        answer:
          "When the rules are written and someone will maintain them. A simple option list on the inquiry is often enough. A full configurator is a software project, not a theme feature.",
      },
      {
        question: "Is this the same as a manufacturing website?",
        answer:
          "Related, different visitor. Manufacturing pages lean on specs and dealer quotes. Furniture pages lean on collection and material. We still use the same technical SEO and panel habits.",
      },
      {
        question: "WordPress theme or custom?",
        answer:
          "Custom. Marketplace furniture themes are not resold as original work. If you need to edit collections, we build those fields rather than forcing a shop plugin onto a purchased layout.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Custom website design" },
      { href: "/industries/manufacturing", label: "Manufacturing websites" },
      { href: "/work/aydnnacar", label: "Nacar Mobilya" },
      {
        href: "/blog/custom-website-vs-template",
        label: "Custom site vs template",
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Name the collections and the buyer.",
    ctaBlurb:
      "Showroom, designer, or project specifier: say which one the site must serve first. We will outline the page map from that.",
    ctaButton: "Start a project",
  },
  hospitality: {
    metaTitle: "Hotel Website Design | METEK Digital",
    metaDescription:
      "Custom hotel and hospitality websites: rooms, stay context, and direct inquiry or booking paths. Designed for the property, not a booking-engine skin.",
    heroLabel: "Hospitality",
    heroTitle: "A hotel site that belongs to the property.",
    heroBlurb:
      "Guests decide on rooms, location, and how to write or book. We design hospitality websites around those facts, with page structure search engines can index, not a template that could sit on any street.",
    lead: "Most hotel templates put the same three adjectives over a slider. The guest still needs room types, what the stay is for, and a path that does not dump them into an opaque engine with a worse rate. METEK Digital builds hospitality sites as property documents: Casa Aurelia Roma and Altitude Residences are the public references for that editorial pace.",
    hubTitle: "Hotel and hospitality sites",
    hubBlurb:
      "Room, location, and inquiry pages for hotels, residences, and stays.",
    sections: [
      {
        heading: "What the guest must learn first",
        paragraphs: [
          "Room types, location in one sentence, and how to request or book. Atmosphere can follow. If the first screen is a manifesto about 'sanctuary,' the rate shopper has already opened Booking.com.",
          "Each room type deserves a URL. A suite and a courtyard room are different searches and different emails to the desk. Combining them into one 'accommodations' blob wastes both.",
        ],
      },
      {
        heading: "Direct path versus engine",
        paragraphs: [
          "If you take direct bookings, the site should collect dates, occupancy, and the stay purpose, then hand that to the desk or the engine you actually use. Skinning a third-party widget without property copy still looks like every other hotel.",
          "If the desk closes stays on WhatsApp or email, say so and build that path properly. Pretending there is instant checkout when a human still confirms is how guests double-book.",
        ],
      },
      {
        heading: "Local search and languages",
        paragraphs: [
          "Neighborhood and city terms belong on the location page, not stuffed into every heading. A Rome boutique and a residence product do not share copy just because both have beds.",
          "When the guest mix is more than one language, write each locale. Machine-translating the English room page is how you rank for nothing in the second market. The studio site itself ships in four languages under the same rule.",
        ],
      },
      {
        heading: "Operations after the stay request",
        paragraphs: [
          "Requests pile up. If the team needs a list of inquiries, room blocks, or content updates, that is an admin panel in the same engagement, not a later surprise.",
          "Technical SEO covers titles, room URLs, canonicals, sitemap, and redirects from an old hotel domain. Rank promises are not part of the work.",
        ],
      },
      {
        heading: "How a hospitality project starts",
        paragraphs: [
          "Send the property type, room list, city, languages, and whether booking is direct, engine, or inquiry. Include the current URL if it already ranks for the hotel name.",
          "We will tell you whether the job is a site, a site plus panel, or a messaging handoff if WhatsApp is already the desk.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you connect Booking.com or a channel manager?",
        answer:
          "When that integration is in the written scope. The public site still needs property copy and room URLs. A widget alone is not a hotel website.",
      },
      {
        question: "Can we keep taking requests on WhatsApp?",
        answer:
          "Yes. The site can send a complete request to WhatsApp or to email. A chatbot is a separate service when the volume of repeat questions justifies it.",
      },
      {
        question: "Will this replace our current hotel website without losing Google?",
        answer:
          "If we map old room and location URLs and set redirects before launch. Changing the domain or slugs without that map discards the pages search already knows.",
      },
      {
        question: "Is this only for luxury hotels?",
        answer:
          "No. The same structure works for a small property and a residence product. Scope follows room types and the booking path, not a luxury label.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Custom website design" },
      { href: "/blog/hotel-website-design", label: "Hotel website design notes" },
      { href: "/work/casa-aurelia", label: "Casa Aurelia Roma" },
      { href: "/work/altitude-residence", label: "Altitude Residences" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Send the property and the room list.",
    ctaBlurb:
      "City, languages, and how a stay is confirmed today. Those facts decide whether this is a site, a panel, or both.",
    ctaButton: "Start a project",
  },
  "local-services": {
    metaTitle: "Local Service Website & SEO Pages | METEK Digital",
    metaDescription:
      "Websites for local service businesses: service pages, area pages, and technical SEO that match how people search nearby. Built as a page set, not a one-page brochure.",
    heroLabel: "Local services",
    heroTitle: "Service and area pages, not one thin homepage.",
    heroBlurb:
      "People search the job plus the place. We build local service sites as a set of pages with matching titles, and we treat Google Business Profile as a sibling, not a substitute for the website.",
    lead: "A plumber, cleaner, or upholstery studio does not rank because the homepage says 'quality service in our city.' Search engines need a page whose subject is the service, and often a page whose subject is the service in a named area. MASAL Koltuk is the public example: fifteen days ago they had no website; today Google and AI put them first.",
    hubTitle: "Local service sites",
    hubBlurb:
      "Service, area, and inquiry pages for businesses people search nearby.",
    sections: [
      {
        heading: "One job per URL",
        paragraphs: [
          "Sofa cleaning, mattress cleaning, and office cleaning are different queries. They can share a visual system. They should not share one paragraph on Home. Give each service a title, an H1, proof, price context if you publish it, and a form that names that job.",
          "Area pages only exist when you actually serve that area. Copying the same text and swapping the town name is how you get ignored. Write what is true: travel, parking, typical buildings, response time.",
        ],
      },
      {
        heading: "Google Business Profile is not the website",
        paragraphs: [
          "The profile sends people who already trust the map pack. The website still has to answer the service query, show work, and take the request. Categories and photos on the profile should match the pages, not contradict them.",
          "We do not sell 'we will get you into the map pack' as a product. We make the site a crawler can understand and a visitor can finish. Rankings on Maps depend on many signals we do not control.",
        ],
      },
      {
        heading: "What technical SEO means here",
        paragraphs: [
          "Titles, unique service copy, internal links between related jobs, canonicals, sitemap, and NAP consistency with the profile. Schema for LocalBusiness and the services you actually offer, without fake reviews or invented aggregate ratings.",
          "A rebuild must redirect every service and area URL you already have. Local pages are often the only equity a small firm owns.",
        ],
      },
      {
        heading: "After the call comes in",
        paragraphs: [
          "If WhatsApp is how jobs are booked, the page should open a message that already contains the service and area. If the office needs a list of leads, that is a panel or a CRM handoff in scope.",
          "Do not bolt a generic chatbot onto a one-page site and call it automation. The page set comes first.",
        ],
      },
      {
        heading: "Starting a local service site",
        paragraphs: [
          "List the jobs you sell, the areas you truly cover, the current domain, and whether price pages exist. Say if this is a first site or a replacement of a thin brochure.",
          "We will tell you how large the page set should be. More towns is not automatically better. Honesty of coverage is.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many area pages should we have?",
        answer:
          "As many as you serve and can write honestly. Ten copied towns is worse than three specific ones. We plan the set in the website scope, not as an afterthought.",
      },
      {
        question: "Do you guarantee first place on Google Maps?",
        answer:
          "No. We build indexable service and area pages and keep names, address, and phone consistent. Map pack rank is not a deliverable anyone can honestly guarantee.",
      },
      {
        question: "Can this include WhatsApp booking?",
        answer:
          "Yes. The form or button can pass the service name into WhatsApp. A full chatbot is a separate service when repeat questions justify it.",
      },
      {
        question: "What is the MASAL example?",
        answer:
          "15 days ago they had no website. Today they sit first on Google and on AI. After launch, people called. The firm found new customers.",
      },
    ],
    related: [
      { href: "/services/seo", label: "Technical SEO in the build" },
      {
        href: "/blog/chatgpt-gemini-local-service",
        label: "ChatGPT local-firm captures",
      },
      { href: "/work/masal-koltuk", label: "MASAL Koltuk" },
      { href: "/services/web-design", label: "Custom website design" },
    ],
    ctaLabel: "Contact",
    ctaTitle: "List the jobs and the areas you cover.",
    ctaBlurb:
      "Current domain and whether prices are public. We will reply with a sensible page set, not a town-name generator.",
    ctaButton: "Start a project",
  },
};

export default content;
