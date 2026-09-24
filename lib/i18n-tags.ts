import { routing } from "@/i18n/routing";

export const LOCALE_TAG: Record<string, string> = {
  en: "en-US",
  tr: "tr-TR",
  es: "es-US",
  de: "de-DE",
};

export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  tr: "tr_TR",
  es: "es_US",
  de: "de_DE",
};

export function localeTag(locale: string): string {
  return LOCALE_TAG[locale] ?? locale;
}

export function ogLocale(locale: string): string {
  return OG_LOCALE[locale] ?? locale;
}

export function ogAlternateLocales(locale: string): string[] {
  return routing.locales
    .filter((item) => item !== locale)
    .map((item) => ogLocale(item));
}
