import React from 'react';
import { motion } from 'framer-motion';
import type { GeneratedWebsiteData } from '../../services/aiBuilderService';
import { FadeIn } from '../FadeIn';
import { ShoppingCart, LayoutGrid, Home, Settings, User } from 'lucide-react';

interface PreviewRendererProps {
  data: GeneratedWebsiteData;
  fullScreen?: boolean;
  logoUrl?: string;
}

export const PreviewRenderer: React.FC<PreviewRendererProps> = ({ data, fullScreen = false, logoUrl }) => {
  const isMobileApp = data.websiteType === "Mobile Web App";
  const isEcommerce = data.websiteType === "E-Commerce Store";
  const isPortfolio = data.websiteType === "Portfolio";

  // Determine wrapper classes
  let wrapperClasses = `w-full ${fullScreen ? 'bg-transparent' : 'bg-[var(--bg-base)]'} text-[var(--text-primary)] font-['Kanit'] relative overflow-hidden `;
  if (isMobileApp) {
    if (fullScreen) {
       wrapperClasses = `w-full min-h-screen bg-transparent flex items-center justify-center font-['Kanit'] relative`;
    } else {
       wrapperClasses = `w-full h-[800px] bg-[var(--bg-surface)] flex items-center justify-center font-['Kanit'] relative rounded-3xl`;
    }
  } else {
    wrapperClasses += fullScreen ? 'min-h-screen' : 'h-[800px] border-4 border-gray-800 rounded-3xl shadow-2xl shadow-black/50';
  }

  const mobileFrameClasses = isMobileApp 
    ? "w-full max-w-[400px] h-[800px] bg-[var(--bg-base)] border-[14px] border-black rounded-[3rem] shadow-2xl relative overflow-hidden"
    : "w-full h-full relative";

  // Fallback for older generations that might still have 'services' instead of 'items'
  const itemsArray = data.items || (data as any).services || [];

  return (
    <div className={wrapperClasses}>
      
      {/* Dynamic Theme Styles */}
      <style>{`
        .ai-theme-primary { color: ${data.theme.primaryColor}; }
        .ai-theme-bg { background-color: ${data.theme.primaryColor}; }
        .ai-theme-border { border-color: ${data.theme.primaryColor}; }
      `}</style>

      {/* Main Container */}
      <div className={mobileFrameClasses}>

        {/* Navigation - Top Bar (Desktop/Tablet) or Top Header (Mobile) */}
        {!isMobileApp ? (
          <nav className={`${fullScreen ? 'fixed' : 'absolute'} top-4 left-1/2 -translate-x-1/2 flex items-center justify-between w-max min-w-[300px] gap-6 px-6 sm:px-8 py-3 bg-[var(--bg-base)]/90 backdrop-blur-md border border-[var(--border-strong)] rounded-full z-[100] shadow-lg text-xs sm:text-sm uppercase tracking-wider font-semibold`}>
            {logoUrl && (
              <img src={logoUrl} alt="Logo" className="h-6 sm:h-8 w-auto object-contain border-r border-[var(--border-strong)] pr-4 mr-2" />
            )}
            <div className="flex gap-4 sm:gap-6 items-center">
              <a href="#hero" className="hover:text-[var(--text-strong)] transition-colors">Home</a>
              <a href="#about" className="hover:text-[var(--text-strong)] transition-colors">About</a>
              <a href="#items" className="hover:text-[var(--text-strong)] transition-colors">{isEcommerce ? 'Products' : isPortfolio ? 'Work' : 'Services'}</a>
              <a href="#contact" className="hover:text-[var(--text-strong)] transition-colors">Contact</a>
              {isEcommerce && <ShoppingCart size={18} className="ml-2" />}
            </div>
          </nav>
        ) : (
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 to-transparent z-[100] flex justify-center items-start pt-6 pointer-events-none">
            {logoUrl ? <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain drop-shadow-md" /> : <span className="text-white font-bold tracking-widest drop-shadow-md">{data.hero.title}</span>}
          </div>
        )}

        {/* Floating WhatsApp Button (Hidden on Mobile App layout to save space) */}
        {!isMobileApp && (
          <button 
            onClick={() => window.open(`https://wa.me/918696755996?text=Hi, I'm interested in the ${data.hero.title} website!`, '_blank')}
            className={`${fullScreen ? 'fixed' : 'absolute'} bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>
        )}

        {/* Scrollable Content Container */}
        <div className={`w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth ${isMobileApp ? 'pb-24' : 'pb-0'}`}>
          
          {/* Hero Section */}
          <section id="hero" className="min-h-[90vh] flex items-center justify-center relative p-6 sm:p-10 text-center overflow-hidden">
            {data.hero.imagePrompt ? (
              <div className="absolute inset-0 z-0 bg-gray-900">
                <img 
                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(data.hero.imagePrompt)}?width=1920&height=1080&nologo=true&model=flux&enhance=true`} 
                  alt="Hero Background" 
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent backdrop-blur-[2px]"></div>
              </div>
            ) : (
              <div className="absolute inset-0 opacity-10 pointer-events-none ai-theme-bg mix-blend-screen filter blur-[150px]"></div>
            )}
            
            <FadeIn delay={0.2} y={30} className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <motion.h1 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${isMobileApp ? 'text-4xl' : 'text-5xl sm:text-7xl'} font-black uppercase tracking-tighter text-white drop-shadow-2xl leading-none mb-6 mt-10`}
              >
                {data.hero.title}
              </motion.h1>
              <p className={`${isMobileApp ? 'text-lg' : 'text-xl sm:text-2xl'} text-white/90 font-medium drop-shadow-md mb-10 max-w-2xl`}>
                {data.hero.subtitle}
              </p>
              <button className={`${isMobileApp ? 'px-8 py-3 w-full max-w-[250px]' : 'px-10 py-4'} rounded-full ai-theme-bg text-white font-bold text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>
                {data.hero.ctaText}
              </button>
            </FadeIn>
          </section>

          {/* About Section */}
          <section id="about" className={`${isMobileApp ? 'py-20 px-6' : 'py-32 px-10'} bg-[var(--bg-surface)]`}>
            <div className={`max-w-6xl mx-auto flex ${isMobileApp ? 'flex-col text-center' : 'flex-col md:flex-row items-center text-left'} gap-10 sm:gap-16`}>
              <FadeIn delay={0.1} y={40} className="flex-1">
                <h2 className={`${isMobileApp ? 'text-3xl' : 'text-4xl'} font-bold uppercase tracking-widest ai-theme-primary mb-6`}>{data.about.heading}</h2>
                <p className={`${isMobileApp ? 'text-lg' : 'text-xl sm:text-2xl'} leading-relaxed font-light text-[var(--text-strong)]/90`}>
                  {data.about.description}
                </p>
              </FadeIn>
              
              {data.about.imagePrompt && (
                <FadeIn delay={0.3} y={40} className="flex-1 w-full">
                  <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl">
                    <img 
                      src={`https://image.pollinations.ai/prompt/${encodeURIComponent(data.about.imagePrompt)}?width=800&height=600&nologo=true&model=flux&enhance=true`} 
                      alt="About Us" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </FadeIn>
              )}
            </div>
          </section>

          {/* Dynamic Items Section (Products / Portfolio / Services) */}
          <section id="items" className={`${isMobileApp ? 'py-20 px-6' : 'py-32 px-10'}`}>
            <div className="max-w-6xl mx-auto">
              <FadeIn delay={0.1} y={30} className="text-center mb-16">
                <h2 className={`${isMobileApp ? 'text-3xl' : 'text-5xl'} font-black uppercase tracking-tight text-[var(--text-strong)]`}>
                  {isEcommerce ? 'Featured Products' : isPortfolio ? 'Selected Works' : 'Our Services'}
                </h2>
                <div className="w-24 h-1 mx-auto mt-6 ai-theme-bg rounded-full"></div>
              </FadeIn>
              
              <div className={`grid ${isMobileApp ? 'grid-cols-1 gap-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
                {itemsArray.map((item: any, i: number) => (
                  <FadeIn key={i} delay={0.2 + (i * 0.1)} y={30} className="h-full">
                    
                    {/* E-Commerce Product Card */}
                    {isEcommerce ? (
                      <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden group flex flex-col h-full shadow-lg hover:shadow-2xl transition-all">
                        <div className="aspect-square bg-[var(--bg-base)] relative overflow-hidden">
                          {item.imagePrompt ? (
                            <img 
                              src={`https://image.pollinations.ai/prompt/${encodeURIComponent(item.imagePrompt)}?width=400&height=400&nologo=true&model=flux&enhance=true`} 
                              alt={item.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-7xl bg-[var(--border-subtle)]/30">{item.icon}</div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold text-[var(--text-strong)] mb-2">{item.title}</h3>
                          <p className="text-[var(--text-primary)]/70 text-sm mb-4 flex-1 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-subtle)]">
                            <span className="font-black text-xl ai-theme-primary">{item.price || '$99.99'}</span>
                            <button className="bg-[var(--text-strong)] text-[var(--bg-base)] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-80 transition-opacity">
                              <ShoppingCart size={14} /> Add
                            </button>
                          </div>
                        </div>
                      </div>

                    // Portfolio Gallery Card
                    ) : isPortfolio ? (
                      <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg cursor-pointer h-full">
                        {item.imagePrompt ? (
                          <img 
                            src={`https://image.pollinations.ai/prompt/${encodeURIComponent(item.imagePrompt)}?width=600&height=800&nologo=true&model=flux&enhance=true`} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--bg-surface)] flex items-center justify-center text-8xl">{item.icon}</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                          <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">{item.title}</h3>
                          <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100 line-clamp-3">{item.description}</p>
                        </div>
                      </div>

                    // Standard Service Card
                    ) : (
                      <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--text-strong)]/20 transition-all hover:-translate-y-2 h-full flex flex-col items-center text-center group">
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-4">{item.title}</h3>
                        <p className="text-[var(--text-primary)]/70">{item.description}</p>
                      </div>
                    )}
                    
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section / Footer */}
          <section id="contact" className={`pt-24 ${isMobileApp ? 'pb-24 px-6' : 'pb-16 px-10'} bg-[#080808] border-t border-[var(--border-strong)] text-center relative overflow-hidden flex flex-col items-center`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none ai-theme-bg mix-blend-screen filter blur-[100px] top-1/2"></div>
            <FadeIn delay={0.1} y={20} className="relative z-10 max-w-2xl mx-auto mb-20">
              <h2 className={`${isMobileApp ? 'text-3xl mb-8' : 'text-4xl sm:text-5xl mb-10'} font-black text-white`}>{data.contact.heading}</h2>
              <button className={`${isMobileApp ? 'px-8 py-4 w-full' : 'px-12 py-5'} rounded-full bg-white text-black font-black uppercase tracking-widest text-lg hover:scale-105 transition-transform`}>
                {data.contact.buttonText}
              </button>
            </FadeIn>
            
            <div className={`w-full max-w-6xl border-t border-white/10 pt-10 flex ${isMobileApp ? 'flex-col gap-6' : 'flex-col md:flex-row justify-between items-center gap-6'} relative z-10`}>
              <div className="flex items-center gap-4 justify-center">
                {logoUrl && <img src={logoUrl} alt="Logo" className="h-8 sm:h-10 w-auto object-contain" />}
                <div className="text-white font-bold text-xl sm:text-2xl uppercase tracking-widest">{data.hero.title}</div>
              </div>
              {!isMobileApp && (
                <div className="flex gap-6 text-white/50 text-sm font-semibold uppercase tracking-wider">
                  <a href="#hero" className="hover:text-white transition-colors">Home</a>
                  <a href="#about" className="hover:text-white transition-colors">About</a>
                  <a href="#items" className="hover:text-white transition-colors">{isEcommerce ? 'Products' : 'Services'}</a>
                </div>
              )}
              <div className="text-white/30 text-xs font-medium uppercase tracking-widest text-center">
                © {new Date().getFullYear()} Generated by AI Website Builder
              </div>
            </div>
          </section>

        </div>

        {/* Mobile Tab Bar (Only renders for Mobile Web App) */}
        {isMobileApp && (
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-surface)]/95 backdrop-blur-lg border-t border-[var(--border-strong)] flex items-center justify-around py-4 pb-6 z-[100] shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
            <a href="#hero" className="flex flex-col items-center gap-1 text-[var(--text-primary)] hover:text-[#3b82f6] transition-colors">
              <Home size={22} />
              <span className="text-[10px] uppercase font-bold tracking-wider">Home</span>
            </a>
            <a href="#about" className="flex flex-col items-center gap-1 text-[var(--text-primary)] hover:text-[#3b82f6] transition-colors">
              <User size={22} />
              <span className="text-[10px] uppercase font-bold tracking-wider">About</span>
            </a>
            <a href="#items" className="flex flex-col items-center gap-1 text-[var(--text-primary)] hover:text-[#3b82f6] transition-colors">
              <LayoutGrid size={22} />
              <span className="text-[10px] uppercase font-bold tracking-wider">{isEcommerce ? 'Store' : 'Grid'}</span>
            </a>
            <a href="#contact" className="flex flex-col items-center gap-1 text-[var(--text-primary)] hover:text-[#3b82f6] transition-colors">
              <Settings size={22} />
              <span className="text-[10px] uppercase font-bold tracking-wider">Contact</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
