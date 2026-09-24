import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/** Home'daki stray lockfile Next'in kökü ~ olarak seçmesine yol açıyor. */
const projectRoot = path.resolve(process.cwd());

const withNextIntl = createNextIntlPlugin();

const STATIC_CACHE =
  "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  // R3F's renderer disposal clashes with StrictMode's double-invoked effects
  // (the WebGL context is force-lost on the first cleanup and never restored)
  reactStrictMode: false,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // a stray lockfile in the home directory makes Next guess the wrong root
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Bileşenlerde kullanılan tüm quality değerleri — whitelist dışı
    // istekler 75'e düşüp kalite kaybına yol açıyordu
    qualities: [55, 65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: [
      "gsap",
      "@react-three/drei",
      "three",
      "@react-three/fiber",
      "ogl",
    ],
  },
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/projects/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/blog/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/devices/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/lanyard/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
