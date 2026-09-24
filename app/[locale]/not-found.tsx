import { getLocale, getTranslations } from "next-intl/server";
import { SITE, localePath } from "@/lib/site";
import NotFoundView from "@/components/NotFoundView";

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");
  return (
    <NotFoundView
      title={t("title")}
      blurb={t("blurb", { brand: SITE.brand })}
      homeLabel={t("home")}
      homeHref={localePath(locale, "")}
      embedded
    />
  );
}
