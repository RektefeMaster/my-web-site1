const localeMap: Record<string, string> = {
  tr: "tr-TR",
  en: "en-US",
  es: "es-US",
  de: "de-DE",
};

export function formatBlogDate(iso: string, locale: string): string {
  const tag = localeMap[locale] ?? "en-GB";
  return new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
