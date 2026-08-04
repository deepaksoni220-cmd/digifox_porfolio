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
import BasicVsExclusivePage from './pages/BasicVsExclusivePage';
import AiBuilderPage from './pages/AiBuilderPage';
import { GeneratedSitePage } from './pages/GeneratedSitePage';

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
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/basic_vs_exclusive" element={<BasicVsExclusivePage />} />
          <Route path="/ai-builder" element={<AiBuilderPage />} />
          <Route path="/generated-site" element={<GeneratedSitePage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
