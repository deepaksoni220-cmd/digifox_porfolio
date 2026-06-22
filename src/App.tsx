import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { FooterSection } from './sections/FooterSection';

function App() {
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
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <FooterSection />
    </main>
  );
}

export default App;
