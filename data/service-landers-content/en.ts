import type { ServiceLanderSlug, ServiceLanderContent } from "../service-landers";

const content: Record<ServiceLanderSlug, ServiceLanderContent> = {
  "web-design": {
    metaTitle: "Custom Website Design Agency | METEK Digital",
    metaDescription:
      "Custom website design and development for manufacturers, retailers, hospitality brands, and service businesses. Built around the offer, not a marketplace theme.",
    heroLabel: "Web design",
    heroTitle: "Custom websites built around the way you sell.",
    heroBlurb:
      "A business website has to explain the offer, show proof, and make the next step obvious. We design and develop that surface for the audience who will actually use it.",
    lead: "Most companies do not need another template with new colors. They need a site that names the service, answers the questions a buyer already has, and sends a complete inquiry to the right person. METEK Digital plans custom websites around that job, then builds the pages, metadata, and contact paths before launch.",
    sections: [
      {
        heading: "When a custom site is the right spend",
        paragraphs: [
          "A custom website is the better choice when the offer is specific, the sales path is not generic, or the current site is losing inquiries to friction. Manufacturers quoting from project galleries, hotels taking direct bookings, and service firms collecting qualified leads all need pages that match those motions.",
          "If the business can live on a short brochure with a phone number, a smaller first site can still be custom without becoming a large platform. Scope follows the action the visitor must complete, not a page-count fashion.",
        ],
      },
      {
        heading: "What we design and ship",
        paragraphs: [
          "The engagement covers information architecture, interface design, responsive development, and the technical SEO fields a public site needs: titles, headings, crawlable links, canonicals, and a sitemap. Copy is written for the market the page must rank and convert in.",
          "When the team will update services, projects, or articles after launch, we add an admin panel with the fields they will actually use. A storefront, quote form, or booking path can sit in the same delivery when it is part of the first release.",
        ],
      },
      {
        heading: "Portfolio context, not a moodboard",
        paragraphs: [
          "Selected work includes manufacturing and cabinetry sites built for quote requests, boutique retail and hospitality sites, and service businesses that need local search pages. Those projects show how the public site and the operating tools can share one delivery.",
          "Review the portfolio for the problem being solved. A kitchen gallery that leads to a quote form is a different product from a hotel site with room types and inquiry. We will point you to the closest match once we know your offer.",
        ],
      },
      {
        heading: "Search is part of the build",
        paragraphs: [
          "Search engines index pages, not companies. Each important URL needs a clear subject, a matching title and H1, and internal links from related pages. A homepage that tries to rank for every service usually ranks for none of them well.",
          "If you are replacing an existing site, redirects and URL mapping belong in scope. Dropping old addresses without a plan hands the equity of those pages to a 404. We treat that mapping as delivery work, not a later favor.",
        ],
      },
      {
        heading: "How a website project starts",
        paragraphs: [
          "Send the business, the audience, the action the site must support, and any deadline. Note which languages matter and whether an admin panel, chatbot, or migration is required. That is enough to see whether the work fits and which package it resembles.",
          "Design and development begin after those decisions are written down. If you are comparing agencies, ask each one who owns titles, redirects, and content updates after launch. The answers separate a website project from a visual refresh.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a custom website cost?",
        answer:
          "Price follows scope: page types, custom design, content ownership, technical SEO, integrations, and support. A five-page service site and a multilingual corporate site with a panel are different products. Our article on website pricing explains what to compare before you read the number.",
      },
      {
        question: "Do you use WordPress themes or marketplace templates?",
        answer:
          "No. Interfaces are designed and built for the brand. Ready-made marketplace themes are not resold as custom work. If a project needs a content panel, we build the fields the team will use rather than dropping a generic CMS on a purchased layout.",
      },
      {
        question: "Can you redesign a site without losing search visibility?",
        answer:
          "Yes, when redirects, canonicals, and important URLs are mapped before launch. A redesign that changes addresses without that map wastes existing pages. We include that technical work in the rebuild scope.",
      },
      {
        question: "Which languages can the website ship in?",
        answer:
          "The studio site itself ships in English, Turkish, Spanish, and German. Client projects can be one language or several. When several markets are in scope, copy is written for each locale rather than translated line by line.",
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Describe the website you need.",
    ctaBlurb:
      "Tell us the business, the visitor action, and whether this is a first site or a rebuild. We will reply with the questions that define scope.",
    ctaButton: "Start a project",
  },
  software: {
    metaTitle: "Custom Admin Panel & CRM Development | METEK Digital",
    metaDescription:
      "Custom admin panels, CRM interfaces, and operational software for teams that manage content, leads, bookings, or daily records in a browser.",
    heroLabel: "Software",
    heroTitle: "Admin panels shaped around daily work.",
    heroBlurb:
      "Off-the-shelf tools help until the records, roles, or actions no longer match the product. We build the interface the team will open every day.",
    lead: "An admin panel is software for operators, not a second marketing site. It has to list the right records, enforce the right actions, and stay maintainable after launch. METEK Digital builds those interfaces when a generic CRM or page builder leaves the team exporting spreadsheets and retyping the same data.",
    sections: [
      {
        heading: "When a custom panel beats a generic CRM",
        paragraphs: [
          "A ready-made CRM is enough when the pipeline is standard and the team will actually fill its fields. It becomes expensive when staff invent workarounds: notes in WhatsApp, availability in a separate calendar, or content edits that require a developer.",
          "Custom work is justified when the objects are specific to the business: cabinetry lines and quote packets, appointment slots with staff rules, or content fields that must match public pages. The panel then reflects those objects instead of forcing them into generic contacts and deals.",
        ],
      },
      {
        heading: "What we build",
        paragraphs: [
          "Typical deliveries include content administration for a public website, lead and quote inboxes, booking calendars, and role-based access. A mobile app or CSS design system can join the same project when the workflow needs a phone surface or a shared visual language with the public site.",
          "We start from the records and actions, then design screens around them. Integrations (forms, WhatsApp, email, calendars, existing databases) are listed in scope so the panel is not an island.",
        ],
      },
      {
        heading: "The website and the panel belong in one plan",
        paragraphs: [
          "A public site that collects inquiries and a back office that cannot see them is a broken path. When both surfaces are in the engagement, we design the fields together: the quote form writes the record the sales team opens.",
          "Portfolio work includes a cabinetry manufacturer's content panel beside the corporate site, and appointment tools connected to messaging flows. Those projects are useful references when you need both a storefront and an operating interface.",
        ],
      },
      {
        heading: "What we need to scope the work",
        paragraphs: [
          "List the jobs people do today, the systems they already log into, and the fields they cannot afford to lose. Note who may view, edit, or approve. A screenshot of the current spreadsheet or CRM view is more useful than a feature wishlist.",
          "Also name what is out of scope. Replacing accounting software or rebuilding a warehouse system in the same sprint usually delays the panel that would have helped this quarter. We would rather ship the operator path that is blocking you.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you connect a new panel to our current website?",
        answer:
          "Often yes, if the site can expose or receive the needed data. Sometimes the cleaner path is to rebuild the public pages and the panel together so fields stay aligned. We decide that after seeing the current stack.",
      },
      {
        question: "Do you build mobile apps as well as browser panels?",
        answer:
          "Yes, when the workflow needs a phone surface. Many teams are better served by a responsive admin panel first. A native or hybrid app is added when staff truly work away from a desk.",
      },
      {
        question: "Who maintains the panel after launch?",
        answer:
          "We structure the project so routine content and record updates sit with your team. New features and integrations remain development work. Support coverage is written into the scope rather than implied.",
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Describe the system the team needs.",
    ctaBlurb:
      "Share the records, the daily actions, and the tools already in use. That list is the start of a workable scope.",
    ctaButton: "Start a project",
  },
  automation: {
    metaTitle: "WhatsApp Chatbot & Business Automation | METEK Digital",
    metaDescription:
      "WhatsApp and Instagram chatbots for common questions, appointments, and staff handoff, connected to the booking or CRM panel your team already needs.",
    heroLabel: "Automation",
    heroTitle: "Messaging tools that finish a defined task.",
    heroBlurb:
      "A useful chatbot answers repeatable questions, collects a booking or lead, and hands the rest to a person. We configure that flow around your services and rules.",
    lead: "WhatsApp is already where many customers ask about hours, prices, and availability. Automation helps when those questions follow stable rules and the answer can be stored as a record. It fails when the bot is asked to negotiate, apologize, or invent policy. METEK Digital scopes chatbots around the first of those jobs.",
    sections: [
      {
        heading: "Start from the conversations you already have",
        paragraphs: [
          "The useful brief is a set of real threads, not a brochure. Group them into information, booking, changes, sales, and complaints. Only the rule-based groups belong in the first release.",
          "Staff must agree on the answers before software repeats them. If deposits and cancellation windows differ by person, the bot will simply scale the confusion. Policy first, flow second.",
        ],
      },
      {
        heading: "Handoff is a product decision",
        paragraphs: [
          "The assistant should know when to stop. Unusual requests, complaints, and quotes that need judgment move to the team with a short summary: name, service, time, unanswered question. Asking the customer to repeat the whole chat wastes the automation.",
          "Staff also need a way to pause the bot in an active thread. Two voices in one conversation is worse than no bot at all.",
        ],
      },
      {
        heading: "Bookings need one calendar",
        paragraphs: [
          "Appointment automation only works when WhatsApp, the front desk, and Instagram (if used) read the same availability. Hours, duration, buffers, holidays, and cancellation rules all belong in that source.",
          "A polished chat that writes into a separate spreadsheet will double-book. We connect the conversation to the panel or calendar the team already trusts, or we build that panel in the same project.",
        ],
      },
      {
        heading: "Where this sits among our services",
        paragraphs: [
          "Chatbot work is often paired with a website inquiry path and a CRM or booking screen. Ahi AI in the portfolio is a public example of an appointment assistant. The public site still has to explain the offer; the bot should not be the only place a service exists.",
          "If you only need a simple WhatsApp link from the website, that is a contact path, not a chatbot project. Say so in the inquiry. We will not sell you a flow you will not maintain.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you set up WhatsApp Business API chatbots?",
        answer:
          "We configure WhatsApp and Instagram assistants around your services, hours, and handoff rules. The exact provider and API path is chosen during scope, based on volume, the country you serve, and whether a booking panel is included.",
      },
      {
        question: "Will the bot replace our staff?",
        answer:
          "No. It takes the repetitive questions and structured bookings. Staff keep the conversations that need judgment. A project that promises full replacement is usually underspecifying the exceptions.",
      },
      {
        question: "Can the chatbot create records in a CRM?",
        answer:
          "Yes, when the CRM or custom panel is part of scope and the fields are defined. A bot that only lives in the chat thread leaves the team searching for names and times later.",
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Show us the messages you want handled.",
    ctaBlurb:
      "A handful of anonymized conversations plus your hours and booking rules is enough to see whether automation fits.",
    ctaButton: "Start a project",
  },
  seo: {
    metaTitle: "Technical SEO for Business Websites | METEK Digital",
    metaDescription:
      "Technical SEO as part of website delivery: crawlable structure, titles, canonicals, hreflang, sitemaps, and index rules. No ranking guarantees.",
    heroLabel: "Technical SEO",
    heroTitle: "Search-ready websites, built in the same delivery.",
    heroBlurb:
      "SEO is not a package we bolt on after launch. Titles, structure, language versions, and the sitemap are decided while the site is still being built.",
    lead: "Search engines have to find a page, understand its subject, and compare it with other pages on that query. METEK Digital treats the technical half of that work as part of website delivery: crawlable links, consistent canonicals, accurate hreflang, a valid XML sitemap, and titles that match the H1. We do not sell first-place rankings.",
    sections: [
      {
        heading: "What technical SEO means here",
        paragraphs: [
          "Each public page gets a subject, a title tag, an H1 that continues the same promise, and at least one ordinary HTML link from a related page. Staging leftovers, noindex flags, and conflicting canonicals are checked before the domain goes live.",
          "Multilingual sites need hreflang that points each language at itself and at its siblings, with x-default on the default locale. Our own studio site is the working example: English, Turkish, Spanish, and German, each as a canonical page.",
        ],
      },
      {
        heading: "Rebuilds need a URL map",
        paragraphs: [
          "If you already rank for useful queries, a new design that changes slugs without redirects discards that work. The rebuild scope should list old URLs, new URLs, and the 301s between them, then update internal links so they point at the final address.",
          "We would rather ship fewer new templates and a complete redirect table than a beautiful site that 404s the pages Google already knows.",
        ],
      },
      {
        heading: "Content still has to answer the query",
        paragraphs: [
          "Technical access does not rank a thin page. A service URL should explain one service. A location page needs information that is actually about that market. An article should finish a question, not repeat the homepage.",
          "We write or review copy for search intent when it is in scope. Native queries stay native: US pages use US terms, Turkish pages use Turkish terms. Translating a keyword list is not SEO.",
        ],
      },
      {
        heading: "What we will not promise",
        paragraphs: [
          "No agency controls another site's content, Google's ranking systems, or a competitor's budget. Fixed claims of page-one in a set number of days are not part of our proposals.",
          "What we will put in writing is the technical work: which pages are indexable, how titles are owned, how the sitemap is generated, and who updates content after launch. Those are the questions to ask any provider selling SEO inside a website quote.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is SEO included with a METEK website?",
        answer:
          "Core technical SEO is part of website delivery: titles, headings, crawlable structure, canonicals, sitemap, and index rules. Content strategy for competitive local or national queries can be scoped as additional writing. Rankings are not guaranteed.",
      },
      {
        question: "Do you offer monthly SEO retainers?",
        answer:
          "Our primary offer is the website (and panel) built so search engines can use it. Ongoing content and measurement can be discussed after launch. We do not sell link packages.",
      },
      {
        question: "Can you help with a site that already exists?",
        answer:
          "Yes, as a rebuild or a technical review tied to a defined set of pages. A useful starting point is the current sitemap, the queries you care about, and whether URLs may change.",
      },
    ],
    ctaLabel: "Contact",
    ctaTitle: "Put search in the website scope.",
    ctaBlurb:
      "Share the site you have, the queries that matter, and whether this is a launch or a rebuild. We will tell you which technical work belongs in the project.",
    ctaButton: "Start a project",
  },
};

export default content;
