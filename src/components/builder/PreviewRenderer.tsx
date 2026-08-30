import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { GeneratedWebsiteData } from '../../services/aiBuilderService';
import { FadeIn } from '../FadeIn';
import { ShoppingCart, LayoutGrid, Home, Settings, User } from 'lucide-react';

const EditableField: React.FC<{
  value: string;
  onChange: (val: string) => void;
  as?: any;
  className?: string;
  multiline?: boolean;
}> = ({ value, onChange, as: Component = 'span', className = '', multiline = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent) => {
    if (toolbarRef.current && toolbarRef.current.contains(e.relatedTarget as Node)) {
       return; 
    }
    setIsFocused(false);
    if (elementRef.current) {
      if (elementRef.current.innerHTML !== value) {
        onChange(elementRef.current.innerHTML);
      }
    }
  };

  const handleCommand = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    if (elementRef.current) {
      elementRef.current.focus();
    }
  };

  return (
    <div className="relative inline-block w-full max-w-full">
      <Component
        ref={elementRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className={`${className} outline-none focus:ring-2 focus:ring-blue-500/50 rounded transition-all cursor-text empty:before:content-['Empty...'] empty:before:text-gray-400`}
        dangerouslySetInnerHTML={{ __html: value }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!multiline && e.key === 'Enter') {
            e.preventDefault();
            elementRef.current?.blur();
          }
        }}
      />
      {isFocused && (
        <div 
          ref={toolbarRef}
          tabIndex={-1}
          className="absolute -top-12 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-1 bg-gray-900 text-white p-1 rounded-lg shadow-xl"
          onMouseDown={(e) => e.preventDefault()}
        >
          <button onMouseDown={(e) => { e.preventDefault(); handleCommand('bold'); }} className="p-2 hover:bg-gray-700 rounded text-sm font-bold w-8 h-8 flex items-center justify-center">B</button>
          <button onMouseDown={(e) => { e.preventDefault(); handleCommand('italic'); }} className="p-2 hover:bg-gray-700 rounded text-sm italic w-8 h-8 flex items-center justify-center">I</button>
          <button onMouseDown={(e) => { e.preventDefault(); handleCommand('underline'); }} className="p-2 hover:bg-gray-700 rounded text-sm underline w-8 h-8 flex items-center justify-center">U</button>
          <div className="w-[1px] h-4 bg-gray-700 mx-1"></div>
          <input 
            type="color" 
            className="w-6 h-6 rounded cursor-pointer border-0 p-0 m-0"
            onChange={(e) => handleCommand('foreColor', e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

interface PreviewRendererProps {
  data: GeneratedWebsiteData;
  fullScreen?: boolean;
  logoUrl?: string;
  onDataChange?: (data: GeneratedWebsiteData) => void;
}

export const PreviewRenderer: React.FC<PreviewRendererProps> = ({ data, fullScreen = false, logoUrl, onDataChange }) => {
  const updateData = (path: string[], value: string) => {
    if (!onDataChange) return;
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onDataChange(newData);
  };

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

        {/* Desktop Top Navigation Bar */}
        <nav className={`hidden sm:flex ${fullScreen ? 'fixed' : 'absolute'} top-4 left-1/2 -translate-x-1/2 items-center justify-between w-max min-w-[320px] gap-6 px-6 sm:px-8 py-3 bg-[var(--bg-base)]/90 backdrop-blur-md border border-[var(--border-strong)] rounded-full z-[100] shadow-xl text-xs sm:text-sm uppercase tracking-wider font-semibold`}>
          {logoUrl && (
            <img src={logoUrl} alt="Logo" className="h-6 sm:h-8 w-auto object-contain border-r border-[var(--border-strong)] pr-4 mr-2" />
          )}
          <div className="flex gap-5 sm:gap-6 items-center">
            <a href="#hero" className="hover:text-[var(--text-strong)] transition-colors">Home</a>
            <a href="#about" className="hover:text-[var(--text-strong)] transition-colors">About</a>
            <a href="#items" className="hover:text-[var(--text-strong)] transition-colors">{isEcommerce ? 'Products' : isPortfolio ? 'Work' : 'Services'}</a>
            <a href="#contact" className="hover:text-[var(--text-strong)] transition-colors">Contact</a>
            {isEcommerce && <ShoppingCart size={18} className="ml-2" />}
          </div>
        </nav>

        {/* Mobile Top Header (Sleek Glass Bar) */}
        <div className={`sm:hidden ${fullScreen ? 'fixed' : 'absolute'} top-0 left-0 right-0 h-14 bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] z-[100] px-4 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-6 w-auto object-contain" />
            ) : (
              <span className="font-bold text-sm text-[var(--text-strong)] tracking-tight truncate max-w-[180px]">
                {data.contactDetails?.brandName || data.hero.title}
              </span>
            )}
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <button
            onClick={() => {
              const waNum = data.contactDetails?.whatsappNumber || '918696755996';
              window.open(`https://wa.me/${waNum.replace(/[^0-9]/g, '')}?text=Hi! I am interested in ${data.contactDetails?.brandName || data.hero.title}`, '_blank');
            }}
            className="px-3 py-1.5 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>💬 Chat</span>
          </button>
        </div>

        {/* Mobile Bottom Thumb Navigation Bar */}
        <div className={`sm:hidden ${fullScreen ? 'fixed' : 'absolute'} bottom-3 left-3 right-3 h-14 bg-[var(--bg-base)]/95 backdrop-blur-xl border border-white/15 rounded-2xl z-[100] shadow-2xl px-3 flex items-center justify-around text-[10px] font-bold uppercase tracking-wider text-white/70`}>
          <a href="#hero" className="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <span className="text-base">🏠</span>
            <span>Home</span>
          </a>
          <a href="#about" className="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <span className="text-base">✨</span>
            <span>About</span>
          </a>
          <a href="#items" className="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <span className="text-base">{isEcommerce ? '🛍️' : isPortfolio ? '🎨' : '⚡'}</span>
            <span>{isEcommerce ? 'Shop' : isPortfolio ? 'Work' : 'Services'}</span>
          </a>
          <a href="#contact" className="flex flex-col items-center gap-0.5 hover:text-white transition-colors">
            <span className="text-base">📞</span>
            <span>Contact</span>
          </a>
        </div>

        {/* Floating WhatsApp Button (Desktop Only) */}
        <button 
          onClick={() => {
            const waNum = data.contactDetails?.whatsappNumber || '918696755996';
            window.open(`https://wa.me/${waNum.replace(/[^0-9]/g, '')}?text=Hi! I am interested in ${data.contactDetails?.brandName || data.hero.title}`, '_blank');
          }}
          className={`hidden sm:flex ${fullScreen ? 'fixed' : 'absolute'} bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </button>

        {/* Scrollable Content Container */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth pt-14 sm:pt-0 pb-20 sm:pb-0">
          
          {/* Hero Section */}
          <section id="hero" className="min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center relative p-4 sm:p-10 text-center overflow-hidden">
            {data.hero.imagePrompt ? (
              <div className="absolute inset-0 z-0 bg-gray-950">
                <img 
                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(data.hero.imagePrompt)}?width=1920&height=1080&nologo=true&model=flux&enhance=true`} 
                  alt="Hero Background" 
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/50 to-transparent backdrop-blur-[1px]"></div>
              </div>
            ) : (
              <div className="absolute inset-0 opacity-15 pointer-events-none ai-theme-bg mix-blend-screen filter blur-[150px]"></div>
            )}
            
            <FadeIn delay={0.2} y={30} className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full px-2 sm:px-0">
              {/* UI/UX Pro Max Pill Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 text-[10px] sm:text-xs uppercase tracking-widest font-bold shadow-xl mb-3 sm:mb-4"
              >
                <span className="w-2 h-2 rounded-full ai-theme-bg animate-ping"></span>
                <span>{data.businessCategory || 'Bespoke Experience'}</span>
              </motion.div>

              <motion.h1 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-2xl leading-[1.1] mb-4 sm:mb-6 mt-1 sm:mt-2"
              >
                <EditableField value={data.hero.title} onChange={(val) => updateData(['hero', 'title'], val)} />
              </motion.h1>
              <p className="text-sm sm:text-lg md:text-2xl text-white/90 font-medium drop-shadow-md mb-8 sm:mb-10 max-w-2xl px-2">
                <EditableField value={data.hero.subtitle} multiline onChange={(val) => updateData(['hero', 'subtitle'], val)} />
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
                <motion.button 
                  whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={() => {
                    const el = document.getElementById('items');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 rounded-full ai-theme-bg text-white font-bold text-base sm:text-lg uppercase tracking-widest shadow-2xl relative z-[999] cursor-pointer"
                >
                  <EditableField value={data.hero.ctaText} onChange={(val) => updateData(['hero', 'ctaText'], val)} />
                </motion.button>
              </div>

              {/* Floating Feature Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                >
                  <span>✨</span>
                  <span>100% Artisanal Quality</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                >
                  <span>🛡️</span>
                  <span>Direct Origin Guarantee</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                >
                  <span>⚡</span>
                  <span>Same-Day Fresh Dispatch</span>
                </motion.div>
              </div>
            </FadeIn>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 sm:py-32 px-4 sm:px-10 bg-[var(--bg-surface)]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left gap-8 sm:gap-16">
              <FadeIn delay={0.1} y={40} className="flex-1">
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs uppercase tracking-widest font-bold ai-theme-primary mb-3">
                  Brand Heritage
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[var(--text-strong)] mb-4 sm:mb-6 leading-tight">
                  <EditableField value={data.about.heading} onChange={(val) => updateData(['about', 'heading'], val)} />
                </h2>
                <p className="text-sm sm:text-lg md:text-xl leading-relaxed font-light text-[var(--text-strong)]/90">
                  <EditableField value={data.about.description} multiline onChange={(val) => updateData(['about', 'description'], val)} />
                </p>
              </FadeIn>
              
              {data.about.imagePrompt && (
                <FadeIn delay={0.3} y={40} className="flex-1 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-video shadow-2xl border border-white/10"
                  >
                    <img 
                      src={`https://image.pollinations.ai/prompt/${encodeURIComponent(data.about.imagePrompt)}?width=800&height=600&nologo=true&model=flux&enhance=true`} 
                      alt="About Us" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </motion.div>
                </FadeIn>
              )}
            </div>
          </section>

          {/* Dynamic Stats Bento Section (UI/UX Pro Max Standard) */}
          {data.stats && data.stats.length > 0 && (
            <section className="py-10 sm:py-16 px-4 sm:px-10 bg-[var(--bg-base)] border-y border-[var(--border-subtle)]">
              <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                {data.stats.map((st, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="p-4 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center shadow-lg"
                  >
                    <div className="text-2xl sm:text-4xl font-black ai-theme-primary mb-1">
                      <EditableField value={st.value} onChange={(val) => updateData(['stats', i.toString(), 'value'], val)} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      <EditableField value={st.label} onChange={(val) => updateData(['stats', i.toString(), 'label'], val)} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* UI/UX Pro Max: Bento Grid Feature Matrix */}
          {data.bentoFeatures && data.bentoFeatures.length > 0 && (
            <section className="py-16 sm:py-24 px-4 sm:px-10 bg-[var(--bg-surface)]">
              <div className="max-w-6xl mx-auto">
                <FadeIn delay={0.1} y={20} className="text-center mb-10 sm:mb-16">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold ai-theme-primary mb-3">
                    Architectural Excellence
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
                    Engineered For Perfection
                  </h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {data.bentoFeatures.map((bento, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-white/20 transition-all flex flex-col justify-between shadow-xl group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
                      <div>
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <span className="text-2xl sm:text-3xl">{bento.icon || "✨"}</span>
                          {bento.tag && (
                            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/5 text-[var(--text-secondary)] border border-white/10">
                              {bento.tag}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-2xl font-bold text-[var(--text-strong)] mb-2 sm:mb-3">
                          <EditableField value={bento.title} onChange={(val) => updateData(['bentoFeatures', i.toString(), 'title'], val)} />
                        </h3>
                        <p className="text-[var(--text-primary)]/80 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                          <EditableField value={bento.description} multiline onChange={(val) => updateData(['bentoFeatures', i.toString(), 'description'], val)} />
                        </p>
                      </div>
                      {bento.metric && (
                        <div className="pt-3 sm:pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] sm:text-xs">
                          <span className="text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Performance Metric</span>
                          <span className="font-bold ai-theme-primary font-mono text-xs sm:text-sm">{bento.metric}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* UI/UX Pro Max: 3-Step Process Workflow Timeline */}
          {data.processSteps && data.processSteps.length > 0 && (
            <section className="py-16 sm:py-24 px-4 sm:px-10 bg-[var(--bg-base)] border-y border-[var(--border-subtle)]">
              <div className="max-w-6xl mx-auto">
                <FadeIn delay={0.1} y={20} className="text-center mb-10 sm:mb-16">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold ai-theme-primary mb-3">
                    Seamless Workflow
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
                    How It Works
                  </h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 relative">
                  {data.processSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      whileHover={{ y: -6 }}
                      className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] relative flex flex-col shadow-xl"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ai-theme-bg text-white font-black text-base sm:text-lg flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                        {step.step || `0${i + 1}`}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--text-strong)] mb-2 sm:mb-3">
                        <EditableField value={step.title} onChange={(val) => updateData(['processSteps', i.toString(), 'title'], val)} />
                      </h3>
                      <p className="text-[var(--text-primary)]/80 text-xs sm:text-sm leading-relaxed flex-1">
                        <EditableField value={step.description} multiline onChange={(val) => updateData(['processSteps', i.toString(), 'description'], val)} />
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Dynamic Items Section (Products / Portfolio / Services) */}
          <section id="items" className="py-16 sm:py-32 px-4 sm:px-10">
            <div className="max-w-6xl mx-auto">
              <FadeIn delay={0.1} y={30} className="text-center mb-16">
                <div className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs uppercase tracking-widest font-bold ai-theme-primary mb-3">
                  Signature Selection
                </div>
                <h2 className={`${isMobileApp ? 'text-3xl' : 'text-5xl'} font-black uppercase tracking-tight text-[var(--text-strong)]`}>
                  {isEcommerce ? 'Curated Harvest & Catalog' : isPortfolio ? 'Selected Works' : 'Our Services'}
                </h2>
                <div className="w-24 h-1 mx-auto mt-6 ai-theme-bg rounded-full"></div>
              </FadeIn>
              
              <div className={`grid ${isMobileApp ? 'grid-cols-1 gap-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
                {itemsArray.map((item: any, i: number) => (
                  <FadeIn key={i} delay={0.2 + (i * 0.1)} y={30} className="h-full">
                    
                    {/* E-Commerce Product Card */}
                    {isEcommerce ? (
                      <motion.div 
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden group flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-white/20 transition-colors"
                      >
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
                          <h3 className="text-xl font-bold text-[var(--text-strong)] mb-2">
                            <EditableField value={item.title} onChange={(val) => updateData(['items', i.toString(), 'title'], val)} />
                          </h3>
                          <p className="text-[var(--text-primary)]/70 text-sm mb-4 flex-1 line-clamp-2">
                            <EditableField value={item.description} multiline onChange={(val) => updateData(['items', i.toString(), 'description'], val)} />
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-subtle)]">
                            <span className="font-black text-xl ai-theme-primary">
                              <EditableField value={item.price || '$99.99'} onChange={(val) => updateData(['items', i.toString(), 'price'], val)} />
                            </span>
                            <motion.button 
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => {
                                const waNum = data.contactDetails?.whatsappNumber || '919876543210';
                                const cleanNum = waNum.replace(/[^0-9]/g, '');
                                window.open(`https://wa.me/${cleanNum}?text=Hello! I want to order: ${item.title} (${item.price || 'Custom Quote'}) from ${data.contactDetails?.brandName || data.hero?.title}`, '_blank');
                              }}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                            >
                              <ShoppingCart size={14} /> Quick Order
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>

                    // Portfolio Gallery Card
                    ) : isPortfolio ? (
                      <motion.div 
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg cursor-pointer h-full border border-white/10"
                      >
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                          <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <EditableField value={item.title} onChange={(val) => updateData(['items', i.toString(), 'title'], val)} />
                          </h3>
                          <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100 line-clamp-3">
                            <EditableField value={item.description} multiline onChange={(val) => updateData(['items', i.toString(), 'description'], val)} />
                          </p>
                        </div>
                      </motion.div>

                    // Standard Service Card
                    ) : (
                      <motion.div 
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--text-strong)]/20 transition-colors h-full flex flex-col items-center text-center group shadow-xl"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.4 }}
                          className="text-5xl mb-6 cursor-default"
                        >
                          {item.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-4">
                          <EditableField value={item.title} onChange={(val) => updateData(['items', i.toString(), 'title'], val)} />
                        </h3>
                        <p className="text-[var(--text-primary)]/70 text-sm leading-relaxed mb-6 flex-1">
                          <EditableField value={item.description} multiline onChange={(val) => updateData(['items', i.toString(), 'description'], val)} />
                        </p>
                        {item.price && (
                          <div className="font-bold text-base ai-theme-primary mb-4">{item.price}</div>
                        )}
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const waNum = data.contactDetails?.whatsappNumber || '919876543210';
                            const cleanNum = waNum.replace(/[^0-9]/g, '');
                            window.open(`https://wa.me/${cleanNum}?text=Hello! I am inquiring about: ${item.title}`, '_blank');
                          }}
                          className="px-5 py-2 rounded-full border border-[var(--border-strong)] hover:border-[#3b82f6] text-xs font-bold uppercase tracking-wider text-[var(--text-strong)] transition-all cursor-pointer"
                        >
                          Inquire Now ➔
                        </motion.button>
                      </motion.div>
                    )}
                    
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Dynamic Testimonials / Social Proof Section (UI/UX Pro Max) */}
          {data.testimonials && data.testimonials.length > 0 && (
            <section className="py-16 sm:py-24 px-4 sm:px-10 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
              <div className="max-w-6xl mx-auto">
                <FadeIn delay={0.1} y={20} className="text-center mb-10 sm:mb-16">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold ai-theme-primary mb-3">
                    Customer Endorsements
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
                    Loved By Connoisseurs
                  </h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                  {data.testimonials.map((t, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      whileHover={{ y: -6 }}
                      className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-base)] border border-[var(--border-subtle)] flex flex-col justify-between shadow-xl"
                    >
                      <div>
                        <div className="flex gap-1 text-yellow-400 mb-3 sm:mb-4 text-xs sm:text-sm">
                          {"★".repeat(t.rating || 5)}
                        </div>
                        <p className="text-[var(--text-primary)]/90 text-xs sm:text-base italic leading-relaxed mb-4 sm:mb-6">
                          "<EditableField value={t.quote} multiline onChange={(val) => updateData(['testimonials', i.toString(), 'quote'], val)} />"
                        </p>
                      </div>
                      <div className="pt-3 sm:pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ai-theme-bg text-white font-black flex items-center justify-center text-xs sm:text-sm shadow-md">
                          {t.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-[var(--text-strong)]">
                            <EditableField value={t.author} onChange={(val) => updateData(['testimonials', i.toString(), 'author'], val)} />
                          </div>
                          <div className="text-[10px] sm:text-xs text-[var(--text-secondary)]">
                            <EditableField value={t.role} onChange={(val) => updateData(['testimonials', i.toString(), 'role'], val)} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Dynamic FAQ Accordion Section (Framer Motion UI/UX Pro Max) */}
          {data.faqs && data.faqs.length > 0 && (
            <section className="py-16 sm:py-24 px-4 sm:px-10 bg-[var(--bg-base)]">
              <div className="max-w-4xl mx-auto">
                <FadeIn delay={0.1} y={20} className="text-center mb-10 sm:mb-16">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold ai-theme-primary mb-3">
                    Common Inquiries
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
                    Frequently Asked Questions
                  </h2>
                </FadeIn>

                <div className="space-y-3 sm:space-y-4">
                  {data.faqs.map((faq, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden shadow-md"
                    >
                      <details className="group p-4 sm:p-6 cursor-pointer list-none">
                        <summary className="flex justify-between items-center font-bold text-sm sm:text-lg text-[var(--text-strong)] outline-none">
                          <span><EditableField value={faq.question} onChange={(val) => updateData(['faqs', i.toString(), 'question'], val)} /></span>
                          <span className="text-sm sm:text-lg transition-transform group-open:rotate-180 text-[#3b82f6]">▼</span>
                        </summary>
                        <p className="mt-3 text-xs sm:text-base text-[var(--text-primary)]/80 leading-relaxed pt-3 border-t border-[var(--border-subtle)]">
                          <EditableField value={faq.answer} multiline onChange={(val) => updateData(['faqs', i.toString(), 'answer'], val)} />
                        </p>
                      </details>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Contact Section / Footer */}
          <section id="contact" className="pt-16 sm:pt-24 pb-24 sm:pb-16 px-4 sm:px-10 bg-[#080808] border-t border-[var(--border-strong)] text-center relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none ai-theme-bg mix-blend-screen filter blur-[100px] top-1/2"></div>
            <FadeIn delay={0.1} y={20} className="relative z-10 max-w-2xl mx-auto mb-10 sm:mb-16 w-full px-2 sm:px-0">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8 leading-tight">
                <EditableField value={data.contact.heading} onChange={(val) => updateData(['contact', 'heading'], val)} />
              </h2>
              <motion.button 
                whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(16,185,129,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const waNum = data.contactDetails?.whatsappNumber || '918696755996';
                  const cleanNum = waNum.replace(/[^0-9]/g, '');
                  window.open(`https://wa.me/${cleanNum}?text=Hi! I want to connect with ${data.contactDetails?.brandName || data.hero?.title}`, '_blank');
                }}
                className="w-full sm:w-auto px-8 py-4 sm:px-12 sm:py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest text-base sm:text-lg shadow-2xl relative z-[999] cursor-pointer"
              >
                <EditableField value={data.contact.buttonText} onChange={(val) => updateData(['contact', 'buttonText'], val)} />
              </motion.button>
            </FadeIn>
            
            <div className="w-full max-w-6xl border-t border-white/10 pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 relative z-10">
              <div className="flex items-center gap-3 justify-center">
                {logoUrl && <img src={logoUrl} alt="Logo" className="h-6 sm:h-10 w-auto object-contain" />}
                <div className="text-white font-bold text-lg sm:text-2xl uppercase tracking-widest">{data.contactDetails?.brandName || data.hero.title}</div>
              </div>
              <div className="hidden sm:flex gap-6 text-white/50 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#items" className="hover:text-white transition-colors">{isEcommerce ? 'Products' : 'Services'}</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
              <div className="text-white/30 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-center">
                © {new Date().getFullYear()} {data.contactDetails?.brandName || 'Crafted with WebMake AI'} · All Rights Reserved
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
