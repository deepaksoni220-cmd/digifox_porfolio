import React, { useEffect } from 'react';
import { SEOMeta } from '../components/SEOMeta';
import { FooterSection } from '../sections/FooterSection';
import { PremiumHeroSection } from '../sections/premium/PremiumHeroSection';
import { VideoComparisonSection } from '../sections/VideoComparisonSection';
import { TrustLogosSection } from '../sections/premium/TrustLogosSection';
import { StoryAgitationSection } from '../sections/premium/StoryAgitationSection';
import { ComparisonSection } from '../sections/premium/ComparisonSection';
import { FeaturesGridSection } from '../sections/premium/FeaturesGridSection';
import { PricingSection } from '../sections/premium/PricingSection';
import { PremiumTestimonialsSection } from '../sections/premium/PremiumTestimonialsSection';
import { FinalCtaSection } from '../sections/premium/FinalCtaSection';

export const PremiumLandingPage: React.FC = () => {
  useEffect(() => {
    // Ensure we start at the top of the page when navigating here
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-wrapper relative bg-[var(--bg-base)] text-[var(--text-primary)] font-['Kanit'] min-h-screen">
      <SEOMeta 
        title="Premium 3D & 2D Animated Websites | Digifox"
        description="Stop losing customers to outdated websites. We build fully custom, exclusive 2D and 3D animated websites designed to double your ROAS and boost conversions."
        url="https://digifox.world/basic_vs_exclusive"
      />
      <PremiumHeroSection />
      <VideoComparisonSection />
      <TrustLogosSection />
      <StoryAgitationSection />
      <ComparisonSection />
      <FeaturesGridSection />
      <PricingSection />
      <PremiumTestimonialsSection />
      <FinalCtaSection />
      
      <FooterSection />
    </main>
  );
};
