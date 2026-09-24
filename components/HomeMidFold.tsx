import SelectedWork from "@/components/SelectedWork";
import FeaturedCase from "@/components/FeaturedCase";
import Capabilities from "@/components/Capabilities";
import StudioFrames from "@/components/StudioFrames";
import ManifestoScene from "@/components/ManifestoScene";
import ApproachTeaser from "@/components/ApproachTeaser";

/**
 * Mid-fold (Atelier Signal): void kanıt → paper omurga
 * Selected Work → Featured Case → Capabilities → Studio Frames → Manifesto
 * → Approach
 * Notes (BlogTeaser) page.tsx’te Approach’tan sonra gelir.
 *
 * Ana omurga statik render edilir. Bu rota gövdesi placeholder ile
 * değiştirilmez: doğrudan girişte ve hızlı kaydırmada editorial akışın
 * binlerce piksel boş kalmasını önler. Görseller yine next/image ile lazy,
 * ağır mockup şeritleri ise kendi pointer kapılarıyla ertelenir.
 */
export default function HomeMidFold() {
  return (
    <>
      <div id="work" className="scroll-mt-[var(--nav-offset)]">
        <SelectedWork />
      </div>
      <div id="featured" className="scroll-mt-[var(--nav-offset)]">
        <FeaturedCase />
      </div>
      <Capabilities />
      <StudioFrames />
      <ManifestoScene />
      <ApproachTeaser />
    </>
  );
}
