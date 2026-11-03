import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import { Media } from '../components/Media';
import siteData from '../data.json';
import { Award, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const credibilityPillars = [
    {
      icon: <Award className="text-blue-400" size={24} />,
      title: "5+ Years Digital Mastery",
      description: "Delivering bespoke 3D WebGL experiences, Shopify Plus architectures, and full-funnel digital infrastructure."
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
      title: "Verified Delivery & Security",
      description: "100% on-time milestone delivery with enterprise-grade performance, SSL encryption, and high-concurrency uptime."
    },
    {
      icon: <TrendingUp className="text-purple-400" size={24} />,
      title: "Conversion-Engineered",
      description: "We don't build vanity websites. Every visual hierarchy and interaction is measured for lead generation and ROI."
    }
  ];

  const proofHighlights = [
    { stat: "50+", label: "Completed Projects", detail: "Across US, UK, UAE & India" },
    { stat: "3.8x", label: "Avg Conversion Lift", detail: "Post 3D interaction launch" },
    { stat: "99.8%", label: "Client Satisfaction", detail: "Long-term retainer rate" },
    { stat: "<1.2s", label: "Optimized Load Speeds", detail: "Core Web Vitals compliant" }
  ];

  return (
    <section id="about" className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-10 md:px-16 py-24 sm:py-32 bg-[var(--bg-base)] overflow-hidden">
      {/* Decorative 3D Images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 w-fit">
        <Media src={siteData.about.icons.topLeft} alt="Moon icon" className="w-[120px] sm:w-[160px] md:w-[210px] object-contain pointer-events-none opacity-60" />
      </FadeIn>
      
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 w-fit">
        <Media src={siteData.about.icons.bottomLeft} alt="3D Object" className="w-[100px] sm:w-[140px] md:w-[180px] object-contain pointer-events-none opacity-60" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 w-fit">
        <Media src={siteData.about.icons.topRight} alt="Lego icon" className="w-[120px] sm:w-[160px] md:w-[210px] object-contain pointer-events-none opacity-60" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 w-fit">
        <Media src={siteData.about.icons.bottomRight} alt="3D Group" className="w-[130px] sm:w-[170px] md:w-[220px] object-contain pointer-events-none opacity-60" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center max-w-6xl w-full">
        {/* Section Header */}
        <FadeIn delay={0} y={30} className="text-center mb-6">
          <span className="uppercase tracking-[0.25em] text-[var(--text-primary)]/50 text-xs sm:text-sm font-semibold block mb-3">
            Who We Are & What We Stand For
          </span>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(2.8rem,9vw,120px)] mb-6">
            About Us
          </h2>
        </FadeIn>

        {/* Narrative Copy */}
        <div className="mb-14 sm:mb-16 flex flex-col items-center justify-center w-full max-w-3xl text-center">
          <AnimatedText 
            text="Digifox is an elite digital craftsmanship studio. For over five years, we have fused high-end 3D WebGL visuals with performance-driven marketing to turn casual browsers into loyal brand advocates."
            className="text-[var(--text-primary)] font-medium leading-relaxed text-[clamp(1.05rem,2vw,1.35rem)] mb-6"
          />
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl">
            We partner with visionary founders, ecommerce trailblazers, and corporate leaders who refuse to blend in. Whether you need an interactive 3D web platform, custom Shopify Plus ecosystem, or high-ROAS marketing engine, we deliver measurable business assets.
          </p>
        </div>

        {/* Proof of Results Strip */}
        <FadeIn delay={0.2} y={30} className="w-full mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-2xl backdrop-blur-md">
            {proofHighlights.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {item.stat}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-strong)] mt-2">
                  {item.label}
                </span>
                <span className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-light mt-1">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Credibility & Value Pillars */}
        <FadeIn delay={0.3} y={30} className="w-full mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credibilityPillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)]/80 border border-[var(--border-strong)] flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-[var(--text-strong)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[var(--border-strong)]/30 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>Guaranteed Agency SLA</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--border-strong)]/40">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently booking Q4 / Q1 flagship projects</span>
          </div>
          <FadeIn delay={0.2} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
