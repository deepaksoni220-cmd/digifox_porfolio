import { useState, useEffect, lazy, Suspense } from 'react';
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
import { ResultsProofSection } from './sections/ResultsProofSection';
import { FreshnessUpdatesSection } from './sections/FreshnessUpdatesSection';
import { FaqSection } from './sections/FaqSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { WorldwideGlobeSection } from './sections/WorldwideGlobeSection';
import { FooterSection } from './sections/FooterSection';
import { ContactButton } from './components/ContactButton';
import { ProtectedPage } from './components/ProtectedPage';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { PlanGateModal } from './components/auth/PlanGateModal';
import { ScrollProgress } from './components/magicui/scroll-progress';

// Code-split secondary pages and builder modules to keep root bundle ultra-lean
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const PremiumLandingPage = lazy(() => import('./pages/PremiumLandingPage').then(m => ({ default: m.PremiumLandingPage })));
const AiBuilderPage = lazy(() => import('./pages/AiBuilderPage').then(m => ({ default: m.AiBuilderPage })));
const GeneratedSitePage = lazy(() => import('./pages/GeneratedSitePage').then(m => ({ default: m.GeneratedSitePage })));
const PublishedSite = lazy(() => import('./pages/PublishedSite').then(m => ({ default: m.PublishedSite })));
const PublishedSitePage = lazy(() => import('./pages/PublishedSite').then(m => ({ default: m.PublishedSitePage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage').then(m => ({ default: m.ContactUsPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const FeaturesPage = lazy(() => import('./pages/builder/FeaturesPage').then(m => ({ default: m.FeaturesPage })));
const AutoSeoPage = lazy(() => import('./pages/builder/AutoSeoPage').then(m => ({ default: m.AutoSeoPage })));
const SeoDashboardPage = lazy(() => import('./pages/builder/SeoDashboardPage').then(m => ({ default: m.SeoDashboardPage })));
const DesignKitsPage = lazy(() => import('./pages/builder/DesignKitsPage').then(m => ({ default: m.DesignKitsPage })));
const PricingPage = lazy(() => import('./pages/builder/PricingPage').then(m => ({ default: m.PricingPage })));
const BlogsPage = lazy(() => import('./pages/builder/BlogsPage').then(m => ({ default: m.BlogsPage })));
const AiContactPage = lazy(() => import('./pages/builder/AiContactPage').then(m => ({ default: m.AiContactPage })));
const LeadGenerationPage = lazy(() => import('./pages/LeadGenerationPage').then(m => ({ default: m.LeadGenerationPage })));

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Quick brand preloader (600ms) to unblock LCP rendering almost immediately
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

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
      <ResultsProofSection />
      <FreshnessUpdatesSection />
      <FaqSection />
      <ProjectsSection />
      <WorldwideGlobeSection />
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
    const querySub = params.get('site') || params.get('subdomain');
    if (querySub) {
      setSubdomain(querySub);
      return;
    }

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
        <ScrollProgress className="top-0 z-[9999]" />
        <Suspense fallback={<div className="min-h-screen bg-[var(--bg-base)]" />}>
          <PublishedSite subdomain={subdomain} />
        </Suspense>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ScrollProgress className="top-0 z-[9999]" />
          <AuthModal />
          <PlanGateModal />
          <Suspense fallback={<div className="min-h-screen bg-[var(--bg-base)]" />}>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/site/:subdomain" element={<PublishedSitePage />} />
              <Route path="/s/:subdomain" element={<PublishedSitePage />} />
              <Route path="/published/:subdomain" element={<PublishedSitePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio-page" element={<PortfolioPage />} />
              <Route path="/our-work" element={<PortfolioPage />} />
              <Route path="/projects" element={<PortfolioPage />} />
              <Route path="/works" element={<PortfolioPage />} />
              <Route path="/admin" element={
                <ProtectedPage>
                  <AdminPage />
                </ProtectedPage>
              } />
              <Route path="/lead-generation" element={<LeadGenerationPage />} />
              <Route path="/ai-leads" element={<LeadGenerationPage />} />
              <Route path="/leads" element={<LeadGenerationPage />} />
              <Route path="/admin/leads" element={
                <ProtectedPage>
                  <LeadGenerationPage />
                </ProtectedPage>
              } />
              <Route path="/basic_vs_exclusive" element={<PremiumLandingPage />} />
              <Route path="/ai-builder" element={<AiBuilderPage />} />
              <Route path="/ai-builder/features" element={<FeaturesPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/aibuilder/features" element={<FeaturesPage />} />
              <Route path="/ai-builder/auto-seo" element={<AutoSeoPage />} />
              <Route path="/ai-builder/seo" element={<AutoSeoPage />} />
              <Route path="/auto-seo" element={<AutoSeoPage />} />
              <Route path="/seo" element={<AutoSeoPage />} />
              <Route path="/aibuilder/auto-seo" element={<AutoSeoPage />} />
              <Route path="/admin/seo-dashboard" element={<SeoDashboardPage />} />
              <Route path="/admin/seo" element={<SeoDashboardPage />} />
              <Route path="/admin/dashboard" element={<SeoDashboardPage />} />
              <Route path="/ai-builder/seo-dashboard" element={<SeoDashboardPage />} />
              <Route path="/seo-dashboard" element={<SeoDashboardPage />} />
              <Route path="/dashboard/seo" element={<SeoDashboardPage />} />
              <Route path="/ai-builder/dashboard" element={<SeoDashboardPage />} />
              <Route path="/ai-builder/design-kits" element={<DesignKitsPage />} />
              <Route path="/ai-builder/templates" element={<DesignKitsPage />} />
              <Route path="/design-kits" element={<DesignKitsPage />} />
              <Route path="/templates" element={<DesignKitsPage />} />
              <Route path="/ai-builder/pricing" element={<PricingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/ai-builder/blogs" element={<BlogsPage />} />
              <Route path="/ai-builder/blog" element={<BlogsPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blog" element={<BlogsPage />} />
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
              <Route path="*" element={<Portfolio />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
