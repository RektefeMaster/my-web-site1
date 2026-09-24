import { SITE } from "@/lib/site";
import NotFoundView from "@/components/NotFoundView";
import en from "@/messages/en.json";

/** Locale dışı kök 404 — metin EN (defaultLocale); locale 404 `[locale]/not-found`. */
export default function NotFound() {
  return (
    <NotFoundView
      title={en.notFound.title}
      blurb={en.notFound.blurb.replace("{brand}", SITE.brand)}
      homeLabel={en.notFound.home}
    />
  );
}
