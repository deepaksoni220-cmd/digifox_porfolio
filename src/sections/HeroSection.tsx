import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';
import { Media } from '../components/Media';
import { ThemeToggle } from '../components/ThemeToggle';
import siteData from '../data.json';

export const HeroSection: React.FC = () => {
  return (
    <section className="h-screen flex flex-col relative overflow-x-clip bg-[var(--bg-base)]">
      
      {/* Static Aurora Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(225,0,255,0.3)_0%,_transparent_70%)] transform-gpu"></div>
        <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.2)_0%,_transparent_70%)] transform-gpu"></div>
      </div>

      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full flex justify-center z-50">
        <nav className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 flex items-center justify-between sm:justify-center gap-2 sm:gap-6 md:gap-10 px-3 py-2 sm:px-10 sm:py-3.5 md:px-12 md:py-4 bg-[var(--bg-base)]/85 backdrop-blur-md border border-[var(--border-strong)] rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] z-50 w-[96%] sm:w-auto max-w-fit overflow-visible transform-gpu">
          <div className="flex items-center gap-1.5 min-[375px]:gap-2.5 sm:gap-6 md:gap-10 overflow-x-auto no-scrollbar py-0.5">
            {[
              { name: "About", href: "/#about" },
              { name: "Portfolio", href: "/#portfolio" },
              { name: "AI Builder", href: "/ai-builder" },
              { name: "Contact Us", href: "/contact" },
              { name: "Terms", href: "/terms" },
              { name: "Privacy", href: "/privacy" }
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="text-[var(--text-secondary)] font-semibold uppercase tracking-widest text-[8px] min-[375px]:text-[9px] sm:text-[12px] md:text-sm hover:text-[var(--text-strong)] transition-colors duration-200 shrink-0"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="shrink-0 flex items-center pl-1 border-l border-white/10 sm:border-transparent">
            <ThemeToggle />
          </div>
        </nav>
      </FadeIn>

      {/* Main Content Flex Container */}
      <div 
        className="flex-1 flex flex-col justify-between w-full relative z-20"
        style={{ paddingTop: 'clamp(120px, 15vw, 200px)' }}
      >
        
        {/* Heading */}
        <div className="w-full px-6 sm:px-0 relative z-30">
          <div className="w-full animate-lcp-fast">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-normal sm:whitespace-nowrap w-full text-center text-5xl sm:text-[5.5vw] md:text-[6vw] lg:text-[7vw] mt-10 sm:mt-0">
              Digifox
            </h1>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0 px-5 sm:px-10 md:px-16 pb-7 sm:pb-8 md:pb-10 w-full max-w-7xl mx-auto relative z-30 text-center sm:text-left">
          <FadeIn delay={0.35} y={20} className="!w-auto">
            <p className="ml-10 sm:ml-20 text-[var(--text-primary)] font-light uppercase tracking-wide leading-snug text-[clamp(0.85rem,1.4vw,1.5rem)] max-w-xs sm:max-w-[220px] md:max-w-[260px] text-left sm:text-left">
              a 3d studio driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20} className="!w-auto">
            <ContactButton />
          </FadeIn>
        </div>
      </div>

      {/* Centered Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[300px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-[48%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto animate-lcp-fast">
        <Magnet padding={150} strength={3}>
          <Media 
            src={siteData.hero.banner} 
            alt="Digifox 5D 3D Portrait" 
            className="w-full h-auto object-contain pointer-events-none"
            style={{ aspectRatio: '1450/1570' }}
          />
        </Magnet>
      </div>
    </section>
  );
};
