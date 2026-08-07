import { useEffect } from 'react';
import { applyPresetHashOnLoad } from './utils/presetRouting';
import { HomePage } from './pages/HomePage';
import { DropsSection } from './pages/DropsPage';
import { InnovationSection } from './pages/InnovationPage';
import { CollectionsSection } from './pages/CollectionsPage';
import { CommunitySection } from './pages/CommunityPage';
import { StoresSection } from './pages/StoresPage';
import { ContactSection } from './pages/ContactPage';
import { ArcPaceLogo } from './components/ArcPaceLogo';
import BubbleMenu from './components/BubbleMenu';
import { PILL_MENU_ITEMS } from './routes';
import { BRAND_NAME } from './constants';
import { navigateToRoute } from './utils/presetRouting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    applyPresetHashOnLoad();

    // 1. Fixed header logo fade-in/out on scroll
    gsap.fromTo(
      '.fixed-logo',
      { opacity: 0, pointerEvents: 'none' },
      {
        opacity: 1,
        pointerEvents: 'auto',
        scrollTrigger: {
          trigger: 'body',
          start: 'top -150px',
          end: 'top -300px',
          scrub: true,
        },
      }
    );

    // 2. Hero 1 elements parallax / fade out on scroll
    gsap.to('.hero1-content', {
      yPercent: -30,
      opacity: 0,
      scrollTrigger: {
        trigger: '#home-hero1',
        start: 'bottom 100%',
        end: 'bottom 20%',
        scrub: true,
      },
    });

    // 3. Hero 2 elements reveal on entering
    const hero2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#home-hero2',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    hero2Tl.from('.hero2-box', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' })
           .from('.hero2-text', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
           .from('.hero2-accent', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

    // 4. Drops Section Items Stagger
    gsap.from('.drop-item', {
      x: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#drops',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // 5. Innovation Section Cards Stagger
    gsap.from('.innovation-card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#innovation',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // 6. Collections Section Cards Stagger
    gsap.from('.collection-card', {
      scale: 0.9,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#collections',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // 7. Community Section Stats Stagger
    gsap.from('.community-stat', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#community',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // 8. Stores Rows Stagger
    gsap.from('.store-row', {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#stores',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // 9. Contact Form slide-up
    gsap.from('.contact-form', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Refresh ScrollTrigger after DOM load / hash scrolling
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Unified Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:px-12 pointer-events-none">
        <button
          type="button"
          onClick={() => navigateToRoute('')}
          className="fixed-logo opacity-0 pointer-events-none text-white transition-all duration-300 hover:opacity-80"
          aria-label="ARC PACE home"
        >
          <ArcPaceLogo width={80} />
        </button>
        <div className="pointer-events-auto">
          <BubbleMenu
            items={[...PILL_MENU_ITEMS]}
            menuBg="#ffffff"
            menuContentColor="#111111"
          />
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative w-full">
        <HomePage />
        <DropsSection />
        <InnovationSection />
        <CollectionsSection />
        <CommunitySection />
        <StoresSection />
        <ContactSection />
      </main>

      {/* Unified Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-16 text-center text-xs text-white/40 bg-black">
        <button
          type="button"
          className="underline-offset-4 hover:text-white hover:underline"
          onClick={() => navigateToRoute('contact')}
        >
          Contact ARC PACE
        </button>
        <span className="mx-2">·</span>
        <span>© 2026 {BRAND_NAME}</span>
      </footer>
    </div>
  );
}


