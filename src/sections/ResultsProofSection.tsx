import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Star, ShieldCheck, CheckCircle2, TrendingUp, Quote } from 'lucide-react';

interface CaseStudy {
  brand: string;
  category: string;
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
  role: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    brand: "SkyElite Aviation",
    category: "3D Private Charter Experience",
    metric: "+320%",
    metricLabel: "Qualified Inquiries",
    quote: "Digifox completely transformed our digital presence. The 3D aircraft configurator and fluid booking portal elevated our credibility with ultra-high-net-worth clients immediately.",
    author: "Capt. Marcus Vance",
    role: "Managing Director"
  },
  {
    brand: "Samarth Cactus Nursery",
    category: "Shopify E-Commerce Scale",
    metric: "4.2x",
    metricLabel: "Online Revenue Growth",
    quote: "Our previous store had high drop-offs. Digifox rebuilt our catalog with instant search, mobile checkout optimizations, and speed upgrades that doubled our average cart value in 60 days.",
    author: "Samarth K.",
    role: "Founder & CEO"
  },
  {
    brand: "Nova Mira Living",
    category: "Luxury Architectural Showcase",
    metric: "68%",
    metricLabel: "Longer Session Duration",
    quote: "The interactive WebGL walk-through gave our luxury estate developments a global footprint. Foreign investors committed reservations before setting foot in the showroom.",
    author: "Elena Rostova",
    role: "Head of Marketing"
  }
];

const TRUST_BADGES = [
  "Verified Agency SLA",
  "100% Milestone Delivery",
  "Google Core Web Vitals Ready",
  "Full Intellectual Property Rights",
  "Dedicated Post-Launch Support"
];

export const ResultsProofSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-surface)] border-y border-[var(--border-strong)] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)] pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <TrendingUp size={14} />
              <span>Proven Results & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--text-strong)] leading-tight">
              Real Impact. <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Measured in Growth.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
              We judge our work by client balance sheets, conversion spikes, and competitive separation. Here is how our partners win.
            </p>
          </FadeIn>
        </div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {CASE_STUDIES.map((study, idx) => (
            <FadeIn key={study.brand} delay={0.15 + (idx * 0.1)} y={30}>
              <div className="h-full p-8 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-strong)] flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 shadow-xl relative group">
                
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-blue-400">
                      {study.category}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  {/* Impact Metric */}
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-950/30 to-purple-950/20 border border-blue-500/20">
                    <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {study.metric}
                    </div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)] mt-0.5">
                      {study.metricLabel}
                    </div>
                  </div>

                  {/* Brand & Quote */}
                  <h3 className="text-xl font-bold uppercase text-[var(--text-strong)] mb-3">
                    {study.brand}
                  </h3>
                  <div className="relative mb-6">
                    <Quote className="text-white/10 absolute -top-2 -left-2 rotate-180" size={28} />
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic relative z-10 pl-4 font-light">
                      "{study.quote}"
                    </p>
                  </div>
                </div>

                {/* Author Credit */}
                <div className="pt-4 border-t border-[var(--border-strong)]/40 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[var(--text-strong)]">{study.author}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">{study.role}</div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span>Verified Client</span>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

        {/* Agency Credibility Strip */}
        <FadeIn delay={0.3} y={20}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-base)]/60 border border-[var(--border-strong)] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                <ShieldCheck size={16} className="text-blue-400 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
};