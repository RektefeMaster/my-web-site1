import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

/** Marka ikonu — carbon kare, "M" + Petrol nokta. Favicon + JSON-LD logo. */
export default async function Icon() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/SpaceGrotesk-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d11",
          color: "#eef1f4",
          fontFamily: "Space Grotesk",
          fontSize: 176,
          letterSpacing: -6,
        }}
      >
        M<span style={{ color: "#3dcdc4" }}>.</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: font, style: "normal", weight: 700 },
      ],
    }
  );
}
