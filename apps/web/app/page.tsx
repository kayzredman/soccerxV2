import { HeroSection } from '@/components/sections/hero';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { CtaBand } from '@/components/sections/cta-band';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <CtaBand />
    </>
  );
}
