/**
 * Marka yükleme işareti — Intro’nun küçük kardeşi.
 * Server + Client uyumlu (hook yok); ink / paper / accent sabit.
 */
export default function MetekLoader({
  className = "",
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <div
      className={`metek-loader ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="metek-loader__mark" aria-hidden>
        <span className="metek-loader__m">M</span>
        <span className="metek-loader__dot">.</span>
      </div>
      <div className="metek-loader__hair" aria-hidden />
      <span className="sr-only">{label}</span>
    </div>
  );
}
