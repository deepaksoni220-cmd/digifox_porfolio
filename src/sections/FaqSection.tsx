import React, { useState } from 'react';
import { FadeIn } from '../components/FadeIn';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: "Specialization",
    question: "What makes Digifox 3D WebGL websites different from typical templates?",
    answer: "Digifox builds bespoke interactive 3D WebGL experiences powered by Three.js and GSAP without sacrificing speed. While traditional agencies rely on slow, heavy CMS templates, our sites are custom engineered to maintain a Google Core Web Vitals Largest Contentful Paint (LCP) under 1.2 seconds, boosting visitor engagement by an average of 68%."
  },
  {
    category: "Ecommerce",
    question: "How does Digifox scale Shopify and Shopify Plus stores?",
    answer: "We engineer high-converting headless storefronts with instant 3D product visualizers, sub-second checkout funnels, and optimized mobile interfaces. Our clients experience an average revenue expansion of 3.8x to 4.2x within 60 to 90 days after deployment."
  },
  {
    category: "Marketing",
    question: "What performance marketing and tracking architecture do you deploy?",
    answer: "We set up full-funnel Meta and Google Ads campaigns powered by server-side Conversions API (CAPI) and Google Tag Manager. This eliminates tracking signal loss caused by browser blockers and iOS updates, delivering accurate attribution and superior Return on Ad Spend (ROAS)."
  },
  {
    category: "Timeline & Pricing",
    question: "What is your typical project timeline and SLA guarantee?",
    answer: "Standard flagship web platforms are delivered within 3 to 4 weeks with weekly sprint demos. All projects include guaranteed SLA milestones, complete intellectual property ownership transfer, and 30 days of complimentary post-launch optimization."
  },
  {
    category: "Global Work",
    question: "Where is Digifox located and do you work with international clients?",
    answer: "Digifox is headquartered in India and actively serves high-growth brands across the United States, United Kingdom, United Arab Emirates, Europe, and Asia-Pacific. We offer seamless remote collaboration across all time zones with 24/7 dedicated support."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[var(--bg-surface)] border-t border-[var(--border-strong)] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-10 md:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle size={14} />
              <span>Direct Answers • GEO Knowledge Base</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)] leading-tight">
              Frequently Asked <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
              Clear, definitive answers about our engineering process, pricing models, technologies, and delivery guarantees.
            </p>
          </FadeIn>
        </div>

        {/* Q&A Accordion */}
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn key={idx} delay={0.05 + idx * 0.05} y={15}>
                <div 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-[var(--bg-base)] border-blue-500/50 shadow-xl' 
                      : 'bg-[var(--bg-base)]/60 border-[var(--border-strong)] hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-blue-400 shrink-0">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-strong)]">
                        {item.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-500/20 text-blue-400' : 'text-[var(--text-secondary)]'}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-[var(--border-strong)]/30 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <FadeIn delay={0.3} y={20} className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] flex items-center justify-center gap-2">
            <MessageSquare size={14} className="text-emerald-400" />
            <span>Have a custom requirement or question? <a href="/contact" className="text-blue-400 font-bold hover:underline">Chat directly with our architects</a>.</span>
          </p>
        </FadeIn>

      </div>
    </section>
  );
};