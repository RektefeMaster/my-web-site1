import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import tr from "@/messages/tr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import de from "@/messages/de.json";

const MESSAGES = { tr, en, es, de } as const;

export const alt = "METEK Digital — Nurullah Aydın";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Marka paylaşım kartı — koyu stüdyo, cam "M" hissi, accent aksan. */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = MESSAGES[locale as keyof typeof MESSAGES] ?? tr;

  const headline = `${m.hero.line1} ${m.hero.line2} ${m.hero.line3}`;
  const services = m.marquee.items.slice(0, 4).join("  ·  ");
  const founder = `${m.about.name} · ${m.about.role}`;

  const font = await readFile(
    join(process.cwd(), "public/fonts/SpaceGrotesk-Bold.ttf")
  );

  const INK = "#0a0d11";
  const PAPER = "#eef1f4";
  const ACCENT = "#3dcdc4";
  const MUTE = "rgba(238,241,244,0.55)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "76px 84px",
          background: INK,
          color: PAPER,
          fontFamily: "Space Grotesk",
          overflow: "hidden",
        }}
      >
        {/* atmosfer — accent ışıltı */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(61,205,196,0.22) 0%, rgba(61,205,196,0) 62%)",
          }}
        />
        {/* dev "M" filigran */}
        <div
          style={{
            position: "absolute",
            right: -70,
            bottom: -190,
            fontSize: 620,
            lineHeight: 1,
            color: "rgba(244,242,236,0.05)",
            fontFamily: "Space Grotesk",
          }}
        >
          M
        </div>

        {/* üst — künye */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: 999,
              background: ACCENT,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: MUTE,
              textTransform: "uppercase",
            }}
          >
            METEK Digital
          </div>
        </div>

        {/* orta — marka cümlesi */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 940,
              color: PAPER,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 34,
            }}
          >
            <div style={{ width: 46, height: 4, background: ACCENT }} />
            <div style={{ fontSize: 30, color: ACCENT }}>{services}</div>
          </div>
        </div>

        {/* alt — imza */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 27, color: MUTE }}>{founder}</div>
          <div style={{ fontSize: 27, color: PAPER }}>
            {SITE.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
