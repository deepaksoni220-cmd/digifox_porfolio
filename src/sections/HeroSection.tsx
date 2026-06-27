import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';

export const HeroSection: React.FC = () => {
  return (
    <section className="h-screen flex flex-col relative overflow-x-clip">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full flex justify-center z-50">
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 sm:gap-8 md:gap-12 px-6 py-3 sm:px-12 sm:py-4 md:px-16 md:py-5 bg-[#0C0C0C]/65 backdrop-blur-md border border-[#D7E2EA]/15 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] z-50 whitespace-nowrap">
          {[
            { name: "About", href: "#about" },
            { name: "Our Studio", href: "#services" },
            { name: "Projects", href: "#projects" },
            { name: "Contact", href: "#contact" }
          ].map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-[#D7E2EA]/85 font-semibold uppercase tracking-widest text-[11px] sm:text-sm md:text-base hover:text-white transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Main Content Flex Container */}
      <div 
        className="flex-1 flex flex-col justify-between w-full relative z-20"
        style={{ paddingTop: 'clamp(120px, 15vw, 200px)' }}
      >
        
        {/* Heading */}
        <div className="overflow-hidden w-full px-6 sm:px-0">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-normal sm:whitespace-nowrap w-full text-center text-[8vw] sm:text-[5.5vw] md:text-[6vw] lg:text-[7vw]">
              Hi, we are digifox 5d
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0 px-5 sm:px-10 md:px-16 pb-7 sm:pb-8 md:pb-10 w-full max-w-7xl mx-auto relative z-30 text-center sm:text-left">
          <FadeIn delay={0.35} y={20} className="!w-auto">
            <p className="ml-10 sm:ml-20 text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.85rem,1.4vw,1.5rem)] max-w-xs sm:max-w-[220px] md:max-w-[260px] text-left sm:text-left">
              a 3d studio driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20} className="!w-auto">
            <ContactButton />
          </FadeIn>
        </div>
      </div>

      {/* Centered Portrait with Magnet effect */}
      <FadeIn 
        delay={0.6} 
        y={30} 
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <Magnet padding={150} strength={3}>
          <img 
            src="/banner.png" 
            alt="Digifox 5D 3D Portrait" 
            className="w-full h-auto object-contain pointer-events-none"
            style={{ aspectRatio: '1450/1570' }}
          />
        </Magnet>
      </FadeIn>
    </section>
  );
};
