import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { SEOMeta } from './components/SEOMeta';
import { Preloader } from './components/Preloader';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { PortfolioLinksSection } from './sections/PortfolioLinksSection';
import { VideoComparisonSection } from './sections/VideoComparisonSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { FooterSection } from './sections/FooterSection';
import { ContactButton } from './components/ContactButton';
import { AdminPage } from './pages/AdminPage';
import { PremiumLandingPage } from './pages/PremiumLandingPage';
import { AiBuilderPage } from './pages/AiBuilderPage';
import { GeneratedSitePage } from './pages/GeneratedSitePage';
import { PublishedSite } from './pages/PublishedSite';
import { ProtectedPage } from './components/ProtectedPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FeaturesPage } from './pages/builder/FeaturesPage';
import { AutoSeoPage } from './pages/builder/AutoSeoPage';
import { SeoDashboardPage } from './pages/builder/SeoDashboardPage';
import { DesignKitsPage } from './pages/builder/DesignKitsPage';
import { PricingPage } from './pages/builder/PricingPage';
import { BlogsPage } from './pages/builder/BlogsPage';
import { AiContactPage } from './pages/builder/AiContactPage';

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <main className="main-wrapper relative">
      <SEOMeta 
        title="Digifox | Best Digital Marketing & Web Design Agency"
        description="Digifox builds stunning 3D websites, Shopify stores, SEO, and performance marketing solutions that help businesses grow faster."
        url="https://digifox.world/"
      />
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <PortfolioLinksSection />
      <VideoComparisonSection />
      <ServicesSection />
      <ProjectsSection />
      <FooterSection />
      
      {/* Floating Let's Connect Button */}
      <ContactButton 
        className="!fixed bottom-6 right-6 z-[100] !px-6 !py-4 shadow-2xl animate-bounce-slow"
      >
        Let's Connect
      </ContactButton>
    </main>
  );
}

function App() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    // Check for admin bypass token
    const params = new URLSearchParams(window.location.search);
    const adminToken = params.get('admin');
    if (adminToken) {
      localStorage.setItem('adminBypassToken', adminToken);
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const hostname = window.location.hostname;
    // Check if it's a subdomain (e.g., brandname.digifox.world or brandname.localhost)
    // Exclude www, localhost (root), and digifox.world (root)
    const isLocalSubdomain = hostname.endsWith('.localhost') && hostname !== 'localhost';
    const isProdSubdomain = hostname.endsWith('.digifox.world') && hostname !== 'www.digifox.world' && hostname !== 'digifox.world';
    
    if (isLocalSubdomain || isProdSubdomain) {
      let extractedSubdomain = '';
      if (isLocalSubdomain) {
        extractedSubdomain = hostname.replace('.localhost', '');
      } else if (isProdSubdomain) {
        extractedSubdomain = hostname.replace('.digifox.world', '');
      }
      setSubdomain(extractedSubdomain);
    }
  }, []);

  if (subdomain && subdomain !== 'www') {
    return (
      <HelmetProvider>
        <PublishedSite subdomain={subdomain} />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/basic_vs_exclusive" element={<PremiumLandingPage />} />
          <Route path="/ai-builder" element={
            <ProtectedPage>
              <AiBuilderPage />
            </ProtectedPage>
          } />
          <Route path="/ai-builder/features" element={<FeaturesPage />} />
          <Route path="/ai-builder/auto-seo" element={<AutoSeoPage />} />
          <Route path="/ai-builder/seo" element={<AutoSeoPage />} />
          <Route path="/auto-seo" element={<AutoSeoPage />} />
          <Route path="/seo" element={<AutoSeoPage />} />
          <Route path="/aibuilder/auto-seo" element={<AutoSeoPage />} />
          <Route path="/ai-builder/seo-dashboard" element={<SeoDashboardPage />} />
          <Route path="/seo-dashboard" element={<SeoDashboardPage />} />
          <Route path="/dashboard/seo" element={<SeoDashboardPage />} />
          <Route path="/ai-builder/dashboard" element={<SeoDashboardPage />} />
          <Route path="/ai-builder/design-kits" element={<DesignKitsPage />} />
          <Route path="/ai-builder/templates" element={<DesignKitsPage />} />
          <Route path="/ai-builder/pricing" element={<PricingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/ai-builder/blogs" element={<BlogsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/ai-builder/contact" element={<AiContactPage />} />
          <Route path="/ai-builder/contact-us" element={<AiContactPage />} />

          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          {/* AI Builder sub-routes */}
          <Route path="/ai-builder/terms" element={<TermsPage />} />
          <Route path="/ai-builder/terms-and-conditions" element={<TermsPage />} />
          <Route path="/ai-builder/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/ai-builder/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/aibuilder/terms" element={<TermsPage />} />
          <Route path="/aibuilder/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/aibuilder/contact" element={<AiContactPage />} />
          <Route path="/aibuilder/contact-us" element={<AiContactPage />} />

          <Route path="/generated-site" element={<GeneratedSitePage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
