import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Calendar, RefreshCw, ArrowUpRight, Clock } from 'lucide-react';

interface ReleaseItem {
  tag: string;
  date: string;
  title: string;
  description: string;
  status: "Live Deployment" | "Production Update" | "Quarterly Release";
  linkText: string;
  linkHref: string;
}

const RELEASES: ReleaseItem[] = [
  {
    tag: "Q4 2026 Release",
    date: "Updated November 2026",
    title: "V2 WebGL Engine & 3D Stacking Architecture",
    description: "Rolled out hardware-accelerated 3D stacking scroll capabilities, instant micro-previews, and sub-1.2s Core Web Vitals optimization across all client staging environments.",
    status: "Live Deployment",
    linkText: "View Live Work",
    linkHref: "/portfolio"
  },
  {
    tag: "Storefront Tech",
    date: "Updated October 2026",
    title: "Shopify Plus Headless & Hydrogen Integrations",
    description: "Integrated zero-latency cart checkouts, localized currency engines, and instant multi-product 3D viewers for luxury ecommerce stores.",
    status: "Production Update",
    linkText: "Explore Demos",
    linkHref: "/portfolio"
  },
  {
    tag: "Performance Marketing",
    date: "Updated September 2026",
    title: "AI Predictive Ad Creatives & Automated Tracking",
    description: "Upgraded CAPI server-side event tracking across Meta and Google Ads, unlocking automated lead attribution and 3.8x average ROAS lift.",
    status: "Quarterly Release",
    linkText: "Book Consultation",
    linkHref: "/contact"
  }
];

export const FreshnessUpdatesSection: React.FC = () => {
  const currentMonthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date());

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-base)] border-t border-[var(--border-strong)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 relative z-10">
        
        {/* Section Header with Live Freshness Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <FadeIn delay={0} y={20}>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                Active Agency Pulse • {currentMonthYear}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)] leading-tight">
              Latest Studio <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Deployments</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-xl">
              Continuous deployment and constant innovation. Here is what we shipped and optimized recently for our clients.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} y={20}>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs text-[var(--text-secondary)]">
              <Clock size={14} className="text-blue-400" />
              <span>Current Sprint: <strong>Q4 2026 Production Cycle</strong></span>
            </div>
          </FadeIn>
        </div>

        {/* Release / Update Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RELEASES.map((item, idx) => (
            <FadeIn key={item.title} delay={0.1 + (idx * 0.1)} y={30}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 shadow-xl group">
                <div>
                  {/* Top Bar with Time Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
                      <Calendar size={12} className="text-purple-400" />
                      <time dateTime="2026-11">{item.date}</time>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[var(--text-strong)] group-hover:text-blue-400 transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-strong)]/30 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                    <RefreshCw size={12} className="animate-spin-slow" />
                    <span>{item.status}</span>
                  </div>
                  <a
                    href={item.linkHref}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--text-strong)] hover:text-blue-400 transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};