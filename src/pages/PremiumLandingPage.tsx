import React, { useEffect } from 'react';
import { FooterSection } from '../sections/FooterSection';
import { PremiumHeroSection } from '../sections/premium/PremiumHeroSection';
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
      <PremiumHeroSection />
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
