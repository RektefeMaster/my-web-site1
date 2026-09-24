import { notFound } from "next/navigation";

/** Bilinmeyen locale yolu → `[locale]/not-found` (kök EN 404’e düşmesin). */
export default function LocaleCatchAll() {
  notFound();
}
