import type { GlossaryPage } from "../glossary";

const content: GlossaryPage = {
  metaTitle: "Glossar Website und SEO | METEK Digital",
  metaDescription:
    "Klare Definitionen zu kanonischer URL, hreflang, Sitemap, technischem SEO, Schema, lokalen Seiten und den Begriffen einer Website-Lieferung.",
  heroLabel: "Glossar",
  heroTitle: "Begriffe, die in einem Website-Projekt vorkommen.",
  heroBlurb:
    "Kurze Definitionen zu Suchstruktur, individueller Site, Panel und zu dem, was wir nicht erfinden.",
  lead: "Auftraggeber und Crawler stolpern über Jargon. Diese Seite sagt, wie METEK Digital die Wörter in einer Website-Lieferung verwendet. Rankings stehen hier nicht, weil sie kein Deliverable sind. Fehlt ein Wort, erklärt die passende Leistungsseite oder der Beitrag länger.",
  terms: [
    {
      id: "canonical",
      term: "Kanonische URL",
      short:
        "Die Adresse, die Sie als die eine gültige Kopie einer Seite erklären, wenn Dubletten existieren.",
      paragraphs: [
        "Suchmaschinen sehen denselben Inhalt mit und ohne www, mit Slash oder in einer Druckansicht. rel=canonical zeigt auf die URL, die indexiert werden soll. Jedes Locale dieser Studio-Site kanonisiert auf sich selbst, nicht auf Englisch.",
        "Ein Relaunch ohne diese Entscheidung lässt Google wählen. Oft gewinnt die schwächere Kopie.",
      ],
    },
    {
      id: "hreflang",
      term: "Hreflang",
      short:
        "Hinweise, für welche Sprache und welchen Markt eine URL gilt und welche URLs ihre Geschwister sind.",
      paragraphs: [
        "Jede Sprachfassung listet sich selbst und die anderen, plus x-default für den Fallback. Das Signal muss gegenseitig sein. Türkisch zeigt auf Englisch, Englisch ignoriert Türkisch: unvollständiger Handschlag.",
        "Hreflang übersetzt die Seite nicht. Der Text muss die Query beantworten, die man in diesem Markt tippt. Siehe den Beitrag zu mehrsprachigem SEO.",
      ],
    },
    {
      id: "xml-sitemap",
      term: "XML-Sitemap",
      short:
        "Maschinenliste der kanonischen URLs, die gecrawlt werden sollen, mit lastmod und Sprachalternativen.",
      paragraphs: [
        "Eine Sitemap ist keine Ranking-Spritze. Sie ist eine Karte. Ist lastmod immer 'heute', lernen Crawler sie zu ignorieren. Diese Site schreibt echte Daten und xhtml-Alternativen zwischen Locales.",
        "Die Übermittlung in der Search Console bleibt nötig. Die Datei unter /sitemap.xml ist nicht dasselbe wie ein Abruf nach Ihrem Zeitplan.",
      ],
    },
    {
      id: "technical-seo",
      term: "Technisches SEO",
      short:
        "Die indexierbare Struktur einer öffentlichen Site: Titles, Überschriften, crawlbare Links, Canonicals, hreflang, Sitemap, robots, Redirects.",
      paragraphs: [
        "Das gehört zur Website-Lieferung. Es ist kein Versprechen, dass ein Keyword auf Platz eins sitzt. Quality Gates prüfen, ob wichtige URLs einen Gegenstand haben und alte Adressen beim Relaunch gemappt sind.",
        "Inhalt, Links von außen und lokale Reputation liegen außerhalb dieser Definition. Die verkaufen wir nicht als Ranking-Paket.",
      ],
    },
    {
      id: "custom-website",
      term: "Individuelle Website",
      short:
        "Eine Oberfläche, die für die Marke gestaltet und gebaut wird, kein Marktplatz-Theme mit neuen Farben.",
      paragraphs: [
        "Individuell heißt nicht, dass es im Projekt keine Vorlagen gibt: ein Artikel-Layout, ein wiederholtes Produktmodul. Der Unterschied ist, wem diese Muster und der Code bei der Übergabe gehören.",
        "METEK verkauft fertige Themes nicht als Custom-Arbeit. Braucht das Team ein Content-Panel, bauen wir die Felder, die genutzt werden.",
      ],
    },
    {
      id: "admin-panel",
      term: "Admin-Panel",
      short:
        "Interne Screens, deren Objekte zum Betrieb passen: Linien, Zimmer, Leads, Artikel, nicht die Kontakte und Deals eines generischen CRM, wenn das nicht der Auftrag ist.",
      paragraphs: [
        "Ein Panel ist Software. Die Website ist die öffentliche Fläche. Zusammen liefern, wenn das Team die öffentliche Site pflegen oder Anfragen ohne Entwickler führen muss.",
        "Ein fertiges CRM ist richtig, wenn Ihre Objekte schon zum Produkt passen. Custom gewinnt, wenn Freitag noch ein Tabellenexport ist. Der Vergleichsbeitrag beschreibt die Gabelung.",
      ],
    },
    {
      id: "schema-markup",
      term: "Schema-Markup",
      short:
        "Strukturierte Daten in JSON-LD, die Organisation, Seiten, Artikel, FAQ und Leistungen in einem gemeinsamen Vokabular benennen.",
      paragraphs: [
        "Nützliches Schema wiederholt Fakten, die auf der Seite sichtbar sind. Erfundene Sterne, erfundene Durchschnittsnoten, behauptete Büros, die es nicht gibt: so verdient man eine manuelle Maßnahme.",
        "Diese Site markiert ProfessionalService, Person, WebSite, FAQPage, Service, BlogPosting, BreadcrumbList und auf dieser URL ein DefinedTermSet. Der Schema-Beitrag sagt, was auf eine Mandanten-Site gehört.",
      ],
    },
    {
      id: "redirect-map",
      term: "Weiterleitungskarte",
      short:
        "Schriftliche Liste alter URLs auf neue URLs vor dem Livegang eines Relaunchs, meist als 301.",
      paragraphs: [
        "Suchmaschinen haben Leistungsseiten, Beiträge und Produkt-URLs schon gespeichert. Der Pfad ohne Karte ändert sich, die Geschichte landet auf 404.",
        "Die Karte ist eine Lieferzeile im Relaunch, kein Gefallen danach. Der Relaunch-Beitrag enthält die übrige Liste.",
      ],
    },
    {
      id: "local-seo",
      term: "Local SEO",
      short:
        "Seiten und Einträge, deren Gegenstand eine Leistung an einem Ort ist, den Menschen wirklich suchen, abgestimmt mit dem Unternehmensprofil.",
      paragraphs: [
        "Eine Startseite 'wir sind in der ganzen Region' ist kein Local SEO. Leistungsseiten und ehrliche Gebietsseiten sind es. Das Google-Unternehmensprofil ist Geschwisterfläche, kein Ersatz für diese URLs.",
        "Map-Pack garantieren wir nicht. Wir bauen den Seitensatz und halten Name, Adresse, Telefon gleich. Die Branchenseite und der Beitrag beschreiben die Architektur.",
      ],
    },
    {
      id: "meta-title",
      term: "Title-Tag und Meta-Description",
      short:
        "Der Title ist die klickbare Überschrift in den Ergebnissen. Die Description der stützende Satz. Beide müssen zum Seitengegenstand passen.",
      paragraphs: [
        "Ein Gegenstand pro URL. Alle Leistungen in einen Title zu stopfen, lehrt die Engine nichts. Descriptions sind Sätze, keine Keyword-Listen.",
        "Auf einer mehrsprachigen Site entsteht der Title in der Marktsprache. Den englischen Title Wort für Wort zu übersetzen, lässt vier Locales gegeneinander antreten.",
      ],
    },
    {
      id: "indexation",
      term: "Indexierung",
      short:
        "Ob Suchmaschinen eine URL speichern und zeigen dürfen. Gesteuert über robots, noindex, Canonicals sowie Verlinkung und Sitemap.",
      paragraphs: [
        "Staging, Danke-Seiten und Filterkombinationen gehören oft nicht in den Index. Öffentliche Leistungsseiten schon. Diese Flags zu mischen ist ein Launch-Fehler, den wir vor der Übergabe prüfen.",
        "Indexierung ist kein Ranking. Eine gespeicherte Seite kann auf Seite vier sitzen. Der technische Checklisten-Beitrag listet die Flags.",
      ],
    },
    {
      id: "geo-llms",
      term: "GEO und llms.txt",
      short:
        "Generative Engine Optimization: das Studio in KI-Antworten korrekt zitierbar machen, beginnend mit einer klaren llms.txt an der Wurzel.",
      paragraphs: [
        "KI-Crawler lesen dasselbe öffentliche HTML wie Google. Sie suchen außerdem eine kurze, zitierfähige Aussage, wer Sie sind, was Sie bauen und was Sie nicht behaupten. Diese Site veröffentlicht /llms.txt und /llms-full.txt mit diesen Grenzen: keine erfundenen Awards, Rankings, Festpreise.",
        "GEO ersetzt keine Titles und Seiten. Ist die Site ein dünnes Theme, rettet eine Textdatei das Zitat nicht. FAQ und Leistungslander sind die Seiten, die Modelle zitieren sollen.",
      ],
    },
  ],
  ctaLabel: "Kontakt",
  ctaTitle: "Bringen Sie die Begriffe, die den Brief blockieren.",
  ctaBlurb:
    "Ist die Arbeit ein Relaunch, ein Sprachsatz oder eine lokale Seitenkarte, schreiben Sie das. Wir antworten mit dem Umfang, den diese Wörter meinen.",
  ctaButton: "Projekt starten",
};

export default content;
