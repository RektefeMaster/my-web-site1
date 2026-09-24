import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "es", "de"],
  defaultLocale: "en",
  /** Ana dil EN — kök URL (`/`) İngilizce; diğerleri `/tr`, `/es`, `/de` */
  localePrefix: "as-needed",
});
