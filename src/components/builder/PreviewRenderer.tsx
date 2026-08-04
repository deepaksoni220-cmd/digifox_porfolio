import React from 'react';
import { motion } from 'framer-motion';
import type { GeneratedWebsiteData } from '../../services/aiBuilderService';
import { FadeIn } from '../FadeIn';

interface PreviewRendererProps {
  data: GeneratedWebsiteData;
}

export const PreviewRenderer: React.FC<PreviewRendererProps> = ({ data }) => {
  return (
    <div className="w-full bg-[var(--bg-base)] text-[var(--text-primary)] font-['Kanit'] relative h-[800px] border-4 border-gray-800 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
      
      {/* Dynamic Theme Styles */}
      <style>{`
        .ai-theme-primary { color: ${data.theme.primaryColor}; }
        .ai-theme-bg { background-color: ${data.theme.primaryColor}; }
        .ai-theme-border { border-color: ${data.theme.primaryColor}; }
      `}</style>

      {/* Simulated Navbar (Fixed to top of preview) */}
      <nav className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 sm:gap-6 px-6 sm:px-8 py-3 bg-[var(--bg-base)]/90 backdrop-blur-md border border-[var(--border-strong)] rounded-full z-[100] shadow-lg text-xs sm:text-sm uppercase tracking-wider font-semibold">
        <a href="#hero" className="hover:text-[var(--text-strong)] transition-colors">Home</a>
        <a href="#about" className="hover:text-[var(--text-strong)] transition-colors">About</a>
        <a href="#services" className="hover:text-[var(--text-strong)] transition-colors">Services</a>
        <a href="#contact" className="hover:text-[var(--text-strong)] transition-colors">Contact</a>
      </nav>

      {/* Floating WhatsApp Button (Fixed to bottom right of preview) */}
      <button 
        onClick={() => window.open(`https://wa.me/918696755996?text=Hi, I'm interested in the ${data.hero.title} website!`, '_blank')}
        className="absolute bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </button>

      {/* Scrollable Content Container */}
      <div className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth pb-20">
        
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative p-10 text-center overflow-hidden">
          {data.hero.imagePrompt ? (
            <div className="absolute inset-0 z-0 bg-gray-900">
              <img 
                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(data.hero.imagePrompt)}?width=1920&height=1080&nologo=true`} 
                alt="Hero Background" 
                className="w-full h-full object-cover opacity-50"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-black/50"></div>
            </div>
          ) : (
            <div className="absolute inset-0 opacity-10 pointer-events-none ai-theme-bg mix-blend-screen filter blur-[150px]"></div>
          )}
          
          <FadeIn delay={0.2} y={30} className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl leading-none mb-6"
            >
              {data.hero.title}
            </motion.h1>
            <p className="text-xl sm:text-2xl text-white/90 font-medium drop-shadow-md mb-10 max-w-2xl">
              {data.hero.subtitle}
            </p>
            <button className="px-10 py-4 rounded-full ai-theme-bg text-white font-bold text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {data.hero.ctaText}
            </button>
          </FadeIn>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-10 bg-[var(--bg-surface)]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <FadeIn delay={0.1} y={40} className="flex-1">
              <h2 className="text-4xl font-bold uppercase tracking-widest ai-theme-primary mb-8">{data.about.heading}</h2>
              <p className="text-xl sm:text-2xl leading-relaxed font-light text-[var(--text-strong)]/90">
                {data.about.description}
              </p>
            </FadeIn>
            
            {data.about.imagePrompt && (
              <FadeIn delay={0.3} y={40} className="flex-1 w-full">
                <div className="relative rounded-3xl overflow-hidden aspect-video sm:aspect-square md:aspect-[4/3] shadow-2xl">
                  <img 
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(data.about.imagePrompt)}?width=800&height=600&nologo=true`} 
                    alt="About Us" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 px-10">
          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0.1} y={30} className="text-center mb-20">
              <h2 className="text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">Our Services</h2>
              <div className="w-24 h-1 mx-auto mt-6 ai-theme-bg rounded-full"></div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.services.map((service, i) => (
                <FadeIn key={i} delay={0.2 + (i * 0.1)} y={30}>
                  <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--text-strong)]/20 transition-all hover:-translate-y-2 h-full flex flex-col items-center text-center group">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-4">{service.title}</h3>
                    <p className="text-[var(--text-primary)]/70">{service.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section / Footer */}
        <section id="contact" className="pt-32 pb-16 px-10 bg-[#080808] border-t border-[var(--border-strong)] text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none ai-theme-bg mix-blend-screen filter blur-[100px] top-1/2"></div>
          <FadeIn delay={0.1} y={20} className="relative z-10 max-w-2xl mx-auto mb-32">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-10">{data.contact.heading}</h2>
            <button className="px-12 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-lg hover:scale-105 transition-transform">
              {data.contact.buttonText}
            </button>
          </FadeIn>
          
          <div className="w-full max-w-6xl border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="text-white font-bold text-2xl uppercase tracking-widest">{data.hero.title}</div>
            <div className="flex gap-6 text-white/50 text-sm font-semibold uppercase tracking-wider">
              <a href="#hero" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
            </div>
            <div className="text-white/30 text-xs font-medium uppercase tracking-widest">
              © {new Date().getFullYear()} Generated by AI Website Builder
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
