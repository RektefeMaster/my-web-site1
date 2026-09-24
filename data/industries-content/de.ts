import type { IndustryContent, IndustrySlug } from "../industries";

const content: Record<IndustrySlug, IndustryContent> = {
  manufacturing: {
    metaTitle: "Website für Fertigungsunternehmen | METEK Digital",
    metaDescription:
      "Individuelle Hersteller-Websites: Produktlinien, Datenblätter, Händlerweg und Anfrageformulare, die der Vertrieb öffnen kann. Kein Theme, sondern der Angebotsweg.",
    heroLabel: "Fertigung",
    heroTitle: "Eine Werkseite, die eine ernsthafte Anfrage trägt.",
    heroBlurb:
      "Einkäufer prüfen Linie, Maß und Termin. Wir bauen Fertigungswebsites um diese Bewegung und knüpfen die öffentlichen Seiten an die Listen, die das Büro schon führt.",
    lead: "Eine Herstellerseite nützt wenig, wenn sie wie eine Broschüre für ein Unternehmen wirkt, das per PDF und Telefon anbietet. Die brauchbare Fläche nennt die Produktfamilie, zeigt genug Spezifikation für ein Gespräch und schickt dem Vertrieb eine vollständige Anfrage. METEK Digital plant das vom Verkaufsweg her; das nächste öffentliche Beispiel ist Wholesale Cabinet Creations.",
    hubTitle: "Websites für die Fertigung",
    hubBlurb:
      "Katalog, Spezifikation und Angebotsweg für Werke und Handelsmarken.",
    sections: [
      {
        heading: "Was der Einkäufer beenden will",
        paragraphs: [
          "Händler oder Bauunternehmen kommen nicht, um 'die Marke zu erleben'. Sie prüfen, ob die Linie existiert, ob Maß oder Finish stimmen, ob ein Termin denkbar ist. Liegen diese drei Fakten hinter vier Klicks und einem allgemeinen Kontaktfeld, schreiben sie den Wettbewerber, der sie bereits ausweist.",
          "Schreiben Sie den ersten Bildschirm für diesen Besucher. Firmengeschichte darf tiefer stehen. Zertifikate gehören neben das Produkt, auf das sie zutreffen, nicht auf eine Haufen-Über-uns-Seite.",
        ],
      },
      {
        heading: "Seiten, die zum Verkauf passen",
        paragraphs: [
          "Übliche Karte: Start mit Angebot und Beleg, Produktfamilien, Spezifikation oder Galerie je Linie, Angebots- oder Projektanfrage. Einen Shop erfinden Sie nicht, wenn Aufträge weiter über Menschen laufen.",
          "Aktualisiert das Büro nach dem Launch Lieferzeiten oder Finishes, gehört ein Admin-Panel mit genau diesen Feldern in dieselbe Lieferung. Ein hübscher Katalog, den niemand pflegt, ist nach einer Saison veraltet.",
        ],
      },
      {
        heading: "Suche ist ein Seitenproblem",
        paragraphs: [
          "Google indexiert Adressen. 'Großhandel Küchenmöbel' und 'Einbauschränke nach Maß' teilen sich keine dünne Startseite und ranken dann beide. Jede Familie braucht Gegenstand, Title, H1 und Links von verwandten Seiten.",
          "Technisches SEO heißt hier diese Titles, crawlbares HTML, Canonicals, Sitemap und Weiterleitungen bei Domainwechsel. Platzierungen sind kein ehrlich verkaufbares Paket.",
        ],
      },
      {
        heading: "Felder, die der Vertrieb öffnet",
        paragraphs: [
          "Name, E-Mail und 'Nachricht' erzeugen Ausschuss. Fragen Sie nach Projekttyp, Menge oder Räumen, Lieferregion, Zeitfenster und Dateien, wenn Pläne existieren. Den Datensatz bekommt, wer Posteingang oder CRM schon führt.",
          "Der Beitrag zu B2B-Anfrageformularen listet die Felder, die wir auf Fertigungsformulare setzen. Lesen Sie ihn, bevor Sie einen Verbraucher-Kontaktblock kopieren.",
        ],
      },
      {
        heading: "So beginnt das Projekt",
        paragraphs: [
          "Nennen Sie Familien, Käuferrolle (Händler, Bau, Endkunde), Sprache der Seite und ob es die erste Site oder ein Relaunch ist. Panel oder Migration vermerken.",
          "Wir zeigen die nächste Portfolio-Nähe und sagen, ob die Arbeit Website, Panel oder beides ist.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bauen Sie Shops für Hersteller?",
        answer:
          "Wenn wirklich online mit Preis und Bestand verkauft wird. Viele Werke bieten je Projekt an. Dann liefern wir Katalog und Anfrage, keinen Schein-Warenkorb.",
      },
      {
        question: "Kann das Team Produkte ohne Entwickler pflegen?",
        answer:
          "Ja, wenn ein Panel im Umfang steht. Wir bauen die Felder, die genutzt werden: Linien, Specs, Fotos, Lieferzeiten. Ein generisches CMS auf einem Theme ist ein anderes Produkt.",
      },
      {
        question: "Rankt die Site für jeden Produktnamen?",
        answer:
          "Jede wichtige Familie braucht eine eigene Seite und interne Links. Diese Struktur gehört zur Website-Lieferung. Den ersten Platz für eine Keyword-Liste verspricht niemand seriös.",
      },
      {
        question: "Was schicken wir zum Start?",
        answer:
          "Familien, Käuferrolle, Sprachen, aktuelle URL falls vorhanden, ob Angebote an E-Mail oder CRM gehen. Das reicht für die Passung.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Individuelles Webdesign" },
      {
        href: "/blog/manufacturing-company-website",
        label: "Website für Fertigungsunternehmen",
      },
      {
        href: "/blog/b2b-website-quote-requests",
        label: "B2B-Anfrageformulare",
      },
      { href: "/work/wcc", label: "Wholesale Cabinet Creations" },
    ],
    ctaLabel: "Kontakt",
    ctaTitle: "Nennen Sie Linie und Käufer.",
    ctaBlurb:
      "Produktfamilien, wer die Anfrage stellt, ob eine bestehende Site ersetzt wird. Wir antworten mit den Fragen zum Umfang.",
    ctaButton: "Projekt starten",
  },
  furniture: {
    metaTitle: "Möbel-Website gestalten | METEK Digital",
    metaDescription:
      "Individuelle Möbelwebsites für Showroom und Hersteller: Kollektionen, Materialien und Anfragen, die zum tatsächlichen Verkauf passen.",
    heroLabel: "Möbel",
    heroTitle: "Zeigen Sie die Kollektion so, wie Sie verkaufen.",
    heroBlurb:
      "Möbelseiten bleiben stehen, wenn sie Theme-Galerien mit Telefonnummer sind. Wir bauen Kollektion, Material und Anfrage um den echten Verkaufsweg.",
    lead: "Ein Möbelkäufer vergleicht Silhouette, Material und ob das Stück machbar ist. Die Site muss diesen Vergleich tragen, ohne zum Marktplatz-Raster zu werden. METEK Digital baut Möbelwebsites als redaktionelle Kataloge mit klarem nächsten Schritt. Nacar Mobilya ist das öffentliche Tempo-Beispiel.",
    hubTitle: "Möbel-Websites",
    hubBlurb:
      "Kollektion, Material und Anfrage für Showrooms und Hersteller.",
    sections: [
      {
        heading: "Katalog statt Lager-Theme",
        paragraphs: [
          "Kollektionen brauchen eigene URLs. Eine Sofa-Familie und eine Essgruppe sind verschiedene Suchen und Gespräche. Auf einem Endlos-Scroll verschwinden beide.",
          "Fotografie soll Maßstab und Finish zeigen, nicht nur Lifestyle-Ausschnitt. Kann die Werkstatt Stoff oder Holz ändern, steht das am Stück; die Anfrage fängt die Optionen.",
        ],
      },
      {
        heading: "Wer sitzt hinter dem Formular",
        paragraphs: [
          "Laufkunde, Innenarchitekt und Hotel-Specifier füllen nicht dasselbe Formular. Sind Planer ein echter Kanal, fragen Sie Projekt und Zeit. Schließt der Showroom den Verkauf vor Ort, soll die Site den Besuch legen, keinen Checkout vortäuschen.",
          "Kommen nach dem Launch Kollektionen hinzu, planen Sie ein Panel mit den Feldern aus der Tabelle. Sonst friert die Site auf den Launch-Fotos ein.",
        ],
      },
      {
        heading: "Suche ist Modell und Material",
        paragraphs: [
          "Man tippt Kategorie und oft Material: Esstisch Nussbaum, Sofa nach Maß, Hotel-Casegoods. Diese Phrasen gehören auf die Kollektionsseite in Title und H1, nicht auf die Startseite gestopft.",
          "Ein Relaunch muss alte Kollektions-URLs mappen. Ohne Weiterleitung werfen Sie die einzigen Seiten mit Gegenstand weg.",
        ],
      },
      {
        heading: "Beleg vom Boden, keine Adjektive",
        paragraphs: [
          "Zeigen Sie ein fertiges Interieur, ein Werkstatt-Detail oder eine Hospitality-Installation, wenn Sie sie haben. Beschriften Sie, was zu sehen ist. 'Hochwertige Handarbeit' neben Stockfoto hilft keinem Specifier bei der Bestellung.",
          "Sehen Sie im Portfolio Möbel- und Fertigungsarbeit, bevor Sie briefen. Der Vergleich ist der Verkaufsweg, nicht die Farbpalette.",
        ],
      },
      {
        heading: "So startet eine Möbelseite",
        paragraphs: [
          "Listen Sie Kollektionen, Käufer, Sprachen und ob es Erstsite oder Ersatz ist. Aktuelle URL anhängen, wenn die Suche schon dorthin schickt.",
          "Wir sagen, ob die Arbeit öffentlicher Katalog, Katalog plus Panel oder ein größeres System ist, wenn Aufträge schon in Software leben.",
        ],
      },
    ],
    faqs: [
      {
        question: "Fotografieren Sie die Kollektion?",
        answer:
          "Wir planen Shotlist und Platzierung. Die Produktion der Fotos ist eigener Umfang. Vorhandenes Material reicht für den Start der Oberfläche.",
      },
      {
        question: "Können Kunden Stoff und Finish online wählen?",
        answer:
          "Wenn die Regeln geschrieben sind und jemand sie pflegt. Eine Optionsliste in der Anfrage reicht oft. Ein voller Konfigurator ist Software, kein Theme-Häkchen.",
      },
      {
        question: "Ist das dieselbe Arbeit wie eine Fertigungswebsite?",
        answer:
          "Verwandt, anderer Besucher. Fertigung stützt sich auf Specs und Händleranfrage. Möbel auf Kollektion und Material. Technisches SEO und Panel-Gewohnheit bleiben gleich.",
      },
      {
        question: "WordPress-Theme oder individuell?",
        answer:
          "Individuell. Marktplatz-Möbelthemes werden nicht als Originalarbeit verkauft. Sollen Kollektionen pflegbar sein, bauen wir diese Felder statt eines Shop-Plugins auf gekauftem Layout.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Individuelles Webdesign" },
      { href: "/industries/manufacturing", label: "Fertigungswebsites" },
      { href: "/work/aydnnacar", label: "Nacar Mobilya" },
      {
        href: "/blog/custom-website-vs-template",
        label: "Individuelle Site oder Template",
      },
    ],
    ctaLabel: "Kontakt",
    ctaTitle: "Nennen Sie Kollektionen und Käufer.",
    ctaBlurb:
      "Showroom, Planer oder Projekt-Specifier: wen die Site zuerst tragen soll. Daraus folgt die Seitenkarte.",
    ctaButton: "Projekt starten",
  },
  hospitality: {
    metaTitle: "Hotel-Website gestalten | METEK Digital",
    metaDescription:
      "Individuelle Hotel- und Hospitality-Websites: Zimmertypen, Aufenthaltskontext, direkte Anfrage oder Buchung. Für das Haus, nicht als Skin einer Buchungsmaschine.",
    heroLabel: "Hospitality",
    heroTitle: "Eine Hotel-Website, die zum Haus gehört.",
    heroBlurb:
      "Gäste klären Zimmer, Lage und wie sie schreiben oder buchen. Wir bauen Hospitality-Sites um diese Fakten und um eine indexierbare Struktur, nicht um ein Template von jeder Straße.",
    lead: "Die meisten Hotel-Themes legen dieselben drei Adjektive über einen Slider. Der Gast braucht trotzdem Zimmertypen, wofür der Aufenthalt ist, und einen Weg, der ihn nicht in eine undurchsichtige Engine mit schlechterem Preis kippt. METEK Digital baut Hospitality-Sites als Hausdokumente; Casa Aurelia Roma und Altitude Residences sind die öffentlichen Referenzen für dieses redaktionelle Tempo.",
    hubTitle: "Hotel- und Hospitality-Sites",
    hubBlurb:
      "Zimmer, Lage und Anfrage für Hotels, Residenzen und Aufenthalte.",
    sections: [
      {
        heading: "Was der Gast zuerst lernen muss",
        paragraphs: [
          "Zimmertypen, die Lage in einem Satz, Anfrage oder Buchung. Atmosphäre danach. Ist der erste Screen ein Manifest über 'Zuflucht', hat der Preisvergleicher Booking.com schon offen.",
          "Jeder Zimmertyp braucht eine URL. Suite und Hofzimmer sind verschiedene Suchen und verschiedene Mails an die Rezeption. Beides in einem 'Unterkünfte'-Klumpen zu mischen, verschwendet beide.",
        ],
      },
      {
        heading: "Direktweg und Engine",
        paragraphs: [
          "Nehmen Sie Direktbuchungen an, sammelt die Site Daten, Belegung und Zweck und übergibt sie der Rezeption oder der Engine, die Sie wirklich nutzen. Ein Widget ohne Haus-Text sieht aus wie jedes andere Hotel.",
          "Schließt die Rezeption über WhatsApp oder E-Mail, sagen Sie das und bauen Sie den Weg sauber. Sofort-Checkout vorzutäuschen, während ein Mensch bestätigt, erzeugt Doppelbuchungen.",
        ],
      },
      {
        heading: "Lokale Suche und Sprachen",
        paragraphs: [
          "Viertel und Stadt stehen auf der Lage-Seite, nicht in jeder Überschrift. Ein Boutique-Haus in Rom und ein Residence-Produkt teilen keinen Text, nur weil beide Betten haben.",
          "Ist der Gästemix mehrsprachig, schreiben Sie jedes Locale. Die englische Zimmerseite maschinell zu übersetzen, rankt im zweiten Markt für nichts. Die Studio-Site selbst erscheint in vier Sprachen nach derselben Regel.",
        ],
      },
      {
        heading: "Nach der Anfrage",
        paragraphs: [
          "Anfragen sammeln sich. Braucht das Team eine Liste, Zimmersperren oder Content-Pflege, ist das ein Admin-Panel in derselben Beauftragung, keine spätere Überraschung.",
          "Technisches SEO umfasst Titles, Zimmer-URLs, Canonicals, Sitemap und Weiterleitungen von einer alten Hotel-Domain. Rangversprechen gehören nicht zur Arbeit.",
        ],
      },
      {
        heading: "So startet ein Hospitality-Projekt",
        paragraphs: [
          "Haustyp, Zimmerliste, Stadt, Sprachen, ob Buchung direkt, Engine oder Anfrage ist. Aktuelle URL, wenn der Hotelname schon gefunden wird.",
          "Wir sagen, ob die Arbeit Site, Site plus Panel oder eine Nachrichtenübergabe ist, wenn WhatsApp schon die Rezeption ist.",
        ],
      },
    ],
    faqs: [
      {
        question: "Anbinden Sie Booking.com oder einen Channelmanager?",
        answer:
          "Wenn die Integration im schriftlichen Umfang steht. Die öffentliche Site braucht trotzdem Haus-Text und Zimmer-URLs. Ein Widget allein ist keine Hotel-Website.",
      },
      {
        question: "Können Anfragen bei WhatsApp bleiben?",
        answer:
          "Ja. Die Site kann eine vollständige Anfrage an WhatsApp oder E-Mail schicken. Ein Chatbot ist eine eigene Leistung, wenn das Volumen wiederkehrender Fragen es trägt.",
      },
      {
        question: "Relaunch ohne Verlust bei Google?",
        answer:
          "Wenn alte Zimmer- und Lage-URLs vor dem Launch gemappt und umgeleitet werden. Domain oder Slugs ohne diese Karte zu ändern, wirft die bekannten Seiten weg.",
      },
      {
        question: "Nur für Luxushotels?",
        answer:
          "Nein. Dieselbe Struktur trägt ein kleines Haus und ein Residence-Produkt. Der Umfang folgt Zimmertypen und Buchungsweg, keinem Luxusetikett.",
      },
    ],
    related: [
      { href: "/services/web-design", label: "Individuelles Webdesign" },
      { href: "/blog/hotel-website-design", label: "Hotel-Website gestalten" },
      { href: "/work/casa-aurelia", label: "Casa Aurelia Roma" },
      { href: "/work/altitude-residence", label: "Altitude Residences" },
    ],
    ctaLabel: "Kontakt",
    ctaTitle: "Senden Sie Haus und Zimmerliste.",
    ctaBlurb:
      "Stadt, Sprachen, wie ein Aufenthalt heute bestätigt wird. Daraus folgt Site, Panel oder beides.",
    ctaButton: "Projekt starten",
  },
  "local-services": {
    metaTitle: "Local-SEO-Website für Dienstleister | METEK Digital",
    metaDescription:
      "Websites für lokale Betriebe: Leistungsseiten, Gebietsseiten und technisches SEO zur Suche in der Nähe. Als Seitensatz, nicht als Einseiter-Broschüre.",
    heroLabel: "Lokale Dienste",
    heroTitle: "Leistungs- und Gebietsseiten, keine dünne Startseite.",
    heroBlurb:
      "Gesucht wird die Arbeit plus der Ort. Wir bauen lokale Dienstleister-Sites als Seitensatz mit passenden Titles. Das Google-Unternehmensprofil ist Geschwister, kein Ersatz für die Website.",
    lead: "Klempner, Reinigung oder Polsterei ranken nicht, weil die Startseite 'Qualität in unserer Stadt' behauptet. Suchmaschinen brauchen eine Seite, deren Gegenstand die Leistung ist, oft auch eine Seite für die Leistung in einem genannten Gebiet. MASAL Koltuk ist das öffentliche Beispiel: vor fünfzehn Tagen keine Website, heute setzen Google und KI sie an die Spitze.",
    hubTitle: "Sites für lokale Dienste",
    hubBlurb:
      "Leistung, Gebiet und Anfrage für Betriebe, die in der Nähe gesucht werden.",
    sections: [
      {
        heading: "Eine Aufgabe pro URL",
        paragraphs: [
          "Polsterreinigung, Matratzenreinigung und Büroreinigung sind verschiedene Queries. Sie können ein visuelles System teilen. Sie dürfen nicht in einem Absatz auf der Startseite sitzen. Jede Leistung braucht Title, H1, Beleg, Preisrahmen falls Sie Preise nennen, und ein Formular, das den Job benennt.",
          "Gebietsseiten nur, wo Sie wirklich hinfahren. Denselben Text mit anderem Ortsnamen zu klonen, ist der Weg, ignoriert zu werden. Schreiben Sie Wahres: Anfahrt, Parken, Gebäudetyp, Reaktionszeit.",
        ],
      },
      {
        heading: "Das Unternehmensprofil ist nicht die Website",
        paragraphs: [
          "Das Profil schickt Menschen aus dem Map-Pack. Die Website muss die Leistungsquery beantworten, Arbeit zeigen und die Anfrage annehmen. Kategorien und Fotos im Profil dürfen den Seiten nicht widersprechen.",
          "Wir verkaufen nicht 'wir bringen Sie ins Map-Pack' als Produkt. Wir machen die Site crawlbar und beendbar. Maps-Rang hängt an vielen Signalen, die wir nicht steuern.",
        ],
      },
      {
        heading: "Was technisches SEO hier heißt",
        paragraphs: [
          "Titles, eigener Leistungstext, interne Links zwischen verwandten Jobs, Canonicals, Sitemap, NAP-Gleichheit mit dem Profil. Schema für LocalBusiness und die Leistungen, die Sie wirklich anbieten. Keine erfundenen Bewertungen.",
          "Ein Relaunch muss jede vorhandene Leistungs- und Gebiets-URL umleiten. Lokale Seiten sind oft das einzige, was ein kleiner Betrieb in der Suche besitzt.",
        ],
      },
      {
        heading: "Nach dem Anruf",
        paragraphs: [
          "Laufen Aufträge über WhatsApp, öffnet die Seite eine Nachricht mit Leistung und Gebiet. Braucht das Büro eine Leadliste, gehören Panel oder CRM-Übergabe in den Umfang.",
          "Kleben Sie keinen generischen Chatbot auf eine Einzelseite und nennen Sie das Automatisierung. Zuerst der Seitensatz.",
        ],
      },
      {
        heading: "So startet die lokale Site",
        paragraphs: [
          "Listen Sie verkaufte Jobs, wirklich abgedeckte Gebiete, die aktuelle Domain und ob Preisseiten existieren. Erstsite oder Ersatz einer dünnen Broschüre.",
          "Wir sagen, wie groß der Satz sein sollte. Mehr Orte sind nicht automatisch besser. Ehrliche Abdeckung ist besser.",
        ],
      },
    ],
    faqs: [
      {
        question: "Wie viele Gebietsseiten?",
        answer:
          "So viele, wie Sie bedienen und ehrlich beschreiben können. Zehn kopierte Orte sind schlechter als drei genaue. Den Satz planen wir im Website-Umfang, nicht hinterher.",
      },
      {
        question: "Garantieren Sie Platz eins bei Google Maps?",
        answer:
          "Nein. Wir bauen indexierbare Leistungs- und Gebietsseiten und halten Name, Adresse, Telefon gleich. Map-Pack-Rang ist kein ehrlich garantierbares Deliverable.",
      },
      {
        question: "Gehört WhatsApp-Buchung dazu?",
        answer:
          "Ja. Formular oder Button können den Leistungsnamen an WhatsApp übergeben. Ein voller Chatbot ist eigene Leistung, wenn wiederkehrende Fragen das tragen.",
      },
      {
        question: "Was ist das MASAL-Beispiel?",
        answer:
          "Vor 15 Tagen keine Website. Heute zuerst bei Google und der KI. Nach dem Launch riefen Kunden an. Der Betrieb fand neue Kunden.",
      },
    ],
    related: [
      { href: "/services/seo", label: "Technisches SEO in der Lieferung" },
      {
        href: "/blog/chatgpt-gemini-local-service",
        label: "ChatGPT-Aufnahmen zur lokalen Firma",
      },
      { href: "/work/masal-koltuk", label: "MASAL Koltuk" },
      { href: "/services/web-design", label: "Individuelles Webdesign" },
    ],
    ctaLabel: "Kontakt",
    ctaTitle: "Listen Sie Jobs und Gebiete.",
    ctaBlurb:
      "Aktuelle Domain, ob Preise öffentlich sind. Wir antworten mit einem haltbaren Seitensatz, keinem Ortsnamen-Generator.",
    ctaButton: "Projekt starten",
  },
};

export default content;
