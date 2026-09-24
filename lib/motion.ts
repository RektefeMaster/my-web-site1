/** Motion tokens — süreleri bileşenlerde rastgele yazma */
export const motion = {
  fast: 0.22,
  base: 0.36,
  narrative: 0.72,
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
} as const;

/** GSAP string ease (token eğrileri için yaklaşık) */
export const motionEase = {
  out: "power2.out",
  inOut: "power2.inOut",
  narrative: "power3.out",
} as const;
