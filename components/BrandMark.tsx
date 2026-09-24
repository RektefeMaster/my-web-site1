import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

type BrandMarkProps = {
  className?: string;
  /** false: yalnızca SVG (Intro vb.) */
  linked?: boolean;
  size?: "sm" | "md" | "lg";
};

const BOX = {
  sm: "h-7 w-8",
  md: "h-8 w-9 md:h-9 md:w-10",
  lg: "h-11 w-12",
} as const;

/**
 * Vektör M. — font raster / subpixel bulanıklığı yok.
 * Geometrik path; crispEdges + geometricPrecision.
 */
export default function BrandMark({
  className = "",
  linked = true,
  size = "md",
}: BrandMarkProps) {
  const svg = (
    <svg
      viewBox="0 0 40 36"
      width={size === "sm" ? 28 : size === "lg" ? 44 : 36}
      height={size === "sm" ? 25 : size === "lg" ? 40 : 32}
      className={`${BOX[size]} overflow-visible ${className}`}
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <path
        d="M3.2 32V5.2h5.1L14.8 22.4 21.2 5.2h5.1V32h-4.6V14.8L16.9 32h-4.1L8 14.8V32H3.2Z"
        fill="currentColor"
      />
      <circle cx="34.2" cy="28.4" r="3.15" fill="currentColor" />
    </svg>
  );

  if (!linked) return svg;

  return (
    <Link
      href="/"
      scroll={false}
      aria-label={SITE.brand}
      className="brand-mark inline-flex min-h-11 min-w-10 shrink-0 items-center justify-center text-foreground md:min-h-0 md:min-w-0"
    >
      {svg}
    </Link>
  );
}
