import type { GlossaryPage } from "../glossary";

const content: GlossaryPage = {
  metaTitle: "Website & SEO Glossary | METEK Digital",
  metaDescription:
    "Plain definitions of canonical URLs, hreflang, sitemaps, technical SEO, schema, local pages, and related terms used when we build a business website.",
  heroLabel: "Glossary",
  heroTitle: "Terms we actually use on a website project.",
  heroBlurb:
    "Short definitions for the words that show up in a scope: search structure, custom sites, panels, and what we refuse to fake.",
  lead: "Buyers and crawlers both trip on jargon. This page states how METEK Digital uses the terms in a website delivery. Rankings are not defined here because they are not a deliverable. If a word is missing, the matching service page or article is the longer explanation.",
  terms: [
    {
      id: "canonical",
      term: "Canonical URL",
      short:
        "The address you declare as the one true copy of a page when duplicates exist.",
      paragraphs: [
        "Search engines often see the same content at www and non-www, with and without a trailing slash, or on a print view. A rel=canonical tag points them at the URL you want indexed. Each locale on this studio site canonicalizes to itself, not to English.",
        "A rebuild that launches without deciding canonicals lets Google pick. It often picks the weaker copy.",
      ],
    },
    {
      id: "hreflang",
      term: "Hreflang",
      short:
        "Annotations that tell search engines which language and market a URL is for, and which URLs are its siblings.",
      paragraphs: [
        "Every language version should list itself and the others, plus x-default for the fallback. The signal has to be reciprocal. Turkish pointing at English while English ignores Turkish is an incomplete handshake.",
        "Hreflang does not translate the page. Native copy still has to answer the query people type in that market. See the multilingual SEO article.",
      ],
    },
    {
      id: "xml-sitemap",
      term: "XML sitemap",
      short:
        "A machine list of canonical URLs you want crawled, with last-modified dates and language alternates when the site is multilingual.",
      paragraphs: [
        "A sitemap is not a ranking boost. It is a map. If lastmod is always 'today,' crawlers learn to ignore it. This site writes real dates and xhtml alternates between locales.",
        "Submitting the sitemap in Search Console still matters. The file existing in /sitemap.xml is not the same as Google fetching it on a schedule you control.",
      ],
    },
    {
      id: "technical-seo",
      term: "Technical SEO",
      short:
        "The indexable structure of a public site: titles, headings, crawlable links, canonicals, hreflang, sitemap, robots, redirects.",
      paragraphs: [
        "We include this in website delivery. It is not a promise that a keyword will sit in position one. Quality gates check that important URLs have a subject and that old addresses are mapped on a rebuild.",
        "Content, links from other sites, and local reputation sit outside this definition. Those are not 'technical' and we do not sell them as a ranking package.",
      ],
    },
    {
      id: "custom-website",
      term: "Custom website",
      short:
        "An interface designed and built for the brand, not a marketplace theme with new colors.",
      paragraphs: [
        "Custom still uses templates inside the project: a shared article layout, a repeated product module. The difference is ownership of those patterns and of the code at handoff.",
        "METEK does not resell ready-made themes as custom work. If you need a content panel, we build the fields the team will use.",
      ],
    },
    {
      id: "admin-panel",
      term: "Admin panel",
      short:
        "Internal screens whose objects match the business: lines, rooms, leads, articles, not a generic CRM's contacts and deals unless that is the job.",
      paragraphs: [
        "A panel is software. A website is the public face. They can ship together when the team must update the public site or process inquiries without a developer.",
        "Off-the-shelf CRM is the right buy when your objects already match the product. Custom wins when Friday still means exporting a spreadsheet. The comparison article spells out the fork.",
      ],
    },
    {
      id: "schema-markup",
      term: "Schema markup",
      short:
        "Structured data in JSON-LD that names the organization, pages, articles, FAQs, and services in a vocabulary machines share.",
      paragraphs: [
        "Useful schema restates facts already visible on the page. Fake review stars, invented aggregate ratings, and Organization markup that claims offices you do not have are how you earn a manual action.",
        "This site marks ProfessionalService, Person, WebSite, FAQPage, Service, BlogPosting, BreadcrumbList, and on this URL a DefinedTermSet. See the schema article for what belongs on a client site.",
      ],
    },
    {
      id: "redirect-map",
      term: "Redirect map",
      short:
        "A written list of old URLs to new URLs used before a rebuild goes live, usually as 301 redirects.",
      paragraphs: [
        "Search engines have already stored your service pages, blog posts, and product URLs. Changing the path without a map hands that history to a 404.",
        "The map is a delivery line on a redesign, not a favor after launch. The redesign article covers the rest of the checklist.",
      ],
    },
    {
      id: "local-seo",
      term: "Local SEO",
      short:
        "Pages and listings whose subject is a service in a place people actually search, kept consistent with the business profile.",
      paragraphs: [
        "A homepage that says 'we serve the whole region' is not local SEO. Service pages and honest area pages are. Google Business Profile is a sibling surface, not a replacement for those URLs.",
        "We do not guarantee Map Pack rank. We build the page set and keep name, address, and phone aligned. The local services industry page and article describe the architecture.",
      ],
    },
    {
      id: "meta-title",
      term: "Title tag and meta description",
      short:
        "The title is the clickable headline in search results. The description is the supporting sentence. Both should match the page subject.",
      paragraphs: [
        "One subject per URL. Stuffing every service into one title teaches the engine nothing. Descriptions are written as sentences, not keyword lists.",
        "On a multilingual site the title is drafted in the market language. Translating the English title word for word is how four locales compete with each other.",
      ],
    },
    {
      id: "indexation",
      term: "Indexation",
      short:
        "Whether search engines store a URL and may show it. Controlled by robots, noindex, canonicals, and whether the URL is linked and listed in the sitemap.",
      paragraphs: [
        "Staging sites, thank-you pages, and filter combinations often should stay out of the index. Public service pages should be in. Mixing those flags is a common launch defect we check before handoff.",
        "Indexation is not ranking. A stored page can still sit on page four. The technical checklist article lists the flags we review.",
      ],
    },
    {
      id: "geo-llms",
      term: "GEO and llms.txt",
      short:
        "Generative engine optimization: making the studio easy to cite accurately in AI answers, starting with a plain llms.txt at the site root.",
      paragraphs: [
        "AI crawlers read the same public HTML as Google. They also look for a short, quotable statement of who you are, what you build, and what you will not claim. This site publishes /llms.txt and /llms-full.txt with those limits: no invented awards, rankings, or fixed prices.",
        "GEO does not replace titles and pages. If the underlying site is a thin theme, a text file will not save the citation. The FAQ and service landers are the pages we expect models to quote.",
      ],
    },
  ],
  ctaLabel: "Contact",
  ctaTitle: "Bring the terms that are blocking the brief.",
  ctaBlurb:
    "If a rebuild, a multilingual set, or a local page map is the actual job, write that. We will answer with the scope those words imply.",
  ctaButton: "Start a project",
};

export default content;
