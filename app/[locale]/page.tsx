import { setRequestLocale } from "next-intl/server";
import BlogTeaser from "@/components/BlogTeaser";
import HomeMidFold from "@/components/HomeMidFold";
import HomeTailFold from "@/components/HomeTailFold";

/** Ana sayfa = kontrollü editorial hikâye. Hero layout'ta keep-alive. */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeMidFold />
      <div id="insights" className="scroll-mt-[var(--nav-offset)]">
        <BlogTeaser locale={locale} />
      </div>
      <HomeTailFold />
    </>
  );
}
