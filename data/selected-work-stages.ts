/**
 * Ana sayfa Selected Work — tek okunaklı kare.
 * peepOnly: ürün UI’larında hafif telefon; web hero’larda peep yok (çift yazı karmaşası).
 */

export type WorkStage = {
  hero: string;
  objectPosition?: string;
  mobile?: string;
  /** true → md+ hafif telefon peep (CRM / WhatsApp) */
  peep?: boolean;
};

export const selectedWorkStages: Record<string, WorkStage> = {
  aiahi: {
    hero: "/projects/aiahi/featured/01-hero.jpg",
    objectPosition: "50% 0%",
    mobile: "/projects/aiahi/mobile.jpg",
    peep: false,
  },
  aydnnacar: {
    /* desktop üst kırpım — featured hero’daki dev tipografi kartı boğmasın */
    hero: "/projects/aydnnacar/desktop.jpg",
    objectPosition: "50% 0%",
    mobile: "/projects/aydnnacar/mobile.jpg",
    peep: false,
  },
  "casa-aurelia": {
    hero: "/projects/casa-aurelia/desktop.jpg",
    objectPosition: "50% 0%",
    mobile: "/projects/casa-aurelia/mobile.jpg",
    peep: false,
  },
  crm: {
    hero: "/projects/crm/desktop.jpg",
    objectPosition: "8% 0%",
    mobile: "/projects/crm/mobile.jpg",
    peep: true,
  },
};

export function getSelectedWorkStage(projectId: string): WorkStage | null {
  return selectedWorkStages[projectId] ?? null;
}
