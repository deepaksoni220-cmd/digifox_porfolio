import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Globe } from '../components/magicui/globe';
import { Globe2, MapPin, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { ContactButton } from '../components/ContactButton';

const LOCATIONS = [
  { city: "New York", region: "United States", timeZone: "EST (UTC-5)", active: true },
  { city: "London", region: "United Kingdom", timeZone: "GMT (UTC+0)", active: true },
  { city: "Dubai", region: "United Arab Emirates", timeZone: "GST (UTC+4)", active: true },
  { city: "Mumbai / Delhi", region: "India (HQ)", timeZone: "IST (UTC+5:30)", active: true },
  { city: "Tokyo", region: "Japan", timeZone: "JST (UTC+9)", active: true },
  { city: "Sydney", region: "Australia", timeZone: "AEST (UTC+10)", active: true },
];

export const WorldwideGlobeSection: React.FC = () => {
  return (
    <section 
      id="worldwide" 
      className="relative py-24 sm:py-32 bg-[var(--bg-base)] border-t border-[var(--border-strong)] overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12)_0%,_transparent_70%)] pointer-events-none transform-gpu" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Globe2 size={14} className="animate-pulse" />
              <span>Global Client Footprint</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--text-strong)] leading-tight">
              We Work <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Worldwide</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
              Based in India, partnering with ambitious brands and forward-thinking founders across every continent. Seamless remote sprints, real-time collaboration, and global-grade delivery.
            </p>
          </FadeIn>
        </div>

        {/* Main Grid: Interactive 3D Globe + Key Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive 3D Globe Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <FadeIn delay={0.15} y={30} className="w-full flex justify-center">
              <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center rounded-full bg-gradient-to-b from-blue-950/20 to-transparent p-2">
                
                {/* Globe Canvas */}
                <Globe className="w-full h-full max-w-none" />

                {/* Floating Live Badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-surface)]/90 border border-[var(--border-strong)] backdrop-blur-md shadow-xl text-xs text-[var(--text-primary)]">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold">Drag & rotate globe</span>
                  <span className="text-[var(--text-secondary)]">• 6 Active Hubs</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Global Coverage Details & Active Hubs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FadeIn delay={0.2} y={20}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold uppercase text-[var(--text-strong)]">
                      24/7 Timezone Alignment
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] font-light">
                      Async updates + real-time overlapping syncs
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {LOCATIONS.map((loc) => (
                    <div 
                      key={loc.city}
                      className="p-3 rounded-2xl bg-[var(--bg-base)]/70 border border-[var(--border-strong)]/40 hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-strong)]">
                        <MapPin size={12} className="text-blue-400 shrink-0" />
                        <span className="truncate">{loc.city}</span>
                      </div>
                      <div className="text-[10px] text-[var(--text-secondary)] mt-0.5 truncate font-light">
                        {loc.region}
                      </div>
                      <div className="text-[9px] font-mono text-emerald-400 mt-1">
                        {loc.timeZone}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--border-strong)]/40 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-light">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>Cross-border contracts & USD / EUR / GBP / INR invoicing</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quick Action Box */}
            <FadeIn delay={0.3} y={20}>
              <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold uppercase text-[var(--text-strong)] flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    <span>Have an international project?</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] font-light mt-0.5">
                    Book a free discovery call in your local time zone.
                  </p>
                </div>
                <ContactButton className="!px-5 !py-2.5 !text-xs whitespace-nowrap">
                  Let's Connect
                </ContactButton>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
};
