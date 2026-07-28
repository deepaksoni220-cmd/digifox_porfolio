import React from 'react';
import { FadeIn } from '../../components/FadeIn';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-surface)] border-t border-[var(--border-strong)] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3b82f6]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center relative z-10">
        
        <FadeIn delay={0.1} y={30}>
          <h2 className="font-black text-[var(--text-strong)] text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-8">
            Your Competitors Are Improving Every Month.
          </h2>
          <p className="text-[var(--text-primary)]/70 text-2xl font-light mb-8">
            The only question is... <br/>
            <span className="text-[var(--text-strong)] font-medium">Will your website keep up?</span>
          </p>
          <p className="text-[#ef4444] text-xl font-bold mb-16">
            Don't let an outdated website cost you another customer.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="bg-[var(--bg-base)] p-8 sm:p-12 rounded-3xl border border-[var(--border-strong)] shadow-2xl">
          <a
            href="https://calendly.com/deepak-soni220"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto px-10 py-5 bg-[#3b82f6] hover:bg-[#2563eb] text-[var(--text-strong)] font-bold text-xl rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-105 mb-10"
          >
            Book Your Free Website Strategy Call
          </a>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-3 text-[var(--text-strong)] font-medium">
              <span className="text-[#3b82f6] text-xl">✔</span> Free Website Audit
            </div>
            <div className="flex items-center gap-3 text-[var(--text-strong)] font-medium">
              <span className="text-[#3b82f6] text-xl">✔</span> Conversion Analysis
            </div>
            <div className="flex items-center gap-3 text-[var(--text-strong)] font-medium">
              <span className="text-[#3b82f6] text-xl">✔</span> Growth Recommendations
            </div>
            <div className="flex items-center gap-3 text-[var(--text-strong)] font-medium">
              <span className="text-[#3b82f6] text-xl">✔</span> No Obligation
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={30} className="mt-20 pt-10 border-t border-[var(--border-strong)]">
          <p className="text-[var(--text-primary)]/50 font-medium uppercase tracking-widest text-sm mb-4">
            Our Mission
          </p>
          <p className="text-[var(--text-strong)] text-xl sm:text-2xl font-light max-w-3xl mx-auto italic">
            "We Help Businesses Get More From Every Advertising Dollar Through Premium Custom Websites."
          </p>
        </FadeIn>

      </div>
    </section>
  );
};
