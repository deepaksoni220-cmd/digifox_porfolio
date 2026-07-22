import React from 'react';
import { FadeIn } from '../../components/FadeIn';

export const PricingSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#111111] border-t border-[#D7E2EA]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        
        <FadeIn delay={0.1} y={30} className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-6">
            Investment
          </h2>
          <p className="text-[#D7E2EA]/70 text-lg sm:text-xl font-light mb-6">
            Most businesses spend <strong className="text-white font-medium">$2,000–$20,000 every month</strong> bringing visitors to their website.
          </p>
          <p className="text-white text-lg font-medium">
            Investing in a premium website helps ensure those marketing dollars have the best chance to convert into enquiries and customers.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl bg-[#0C0C0C] border border-white/5 hover:border-[#3b82f6]/50 transition-colors flex flex-col">
              <h3 className="text-[#D7E2EA]/70 font-medium uppercase tracking-wider text-sm mb-2">Starting From</h3>
              <h4 className="text-white font-bold text-2xl mb-6">Custom Business Website</h4>
              <div className="text-4xl font-black text-white mb-8">$1,500 <span className="text-lg text-[#D7E2EA]/50 font-medium">USD</span></div>
              <a
                href="https://calendly.com/deepak-soni220"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full py-4 text-center border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white font-semibold rounded-full transition-all duration-300"
              >
                Inquire Now
              </a>
            </div>

            {/* Tier 2 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#1a2333] to-[#0C0C0C] border border-[#3b82f6]/30 hover:border-[#3b82f6] transition-colors flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3b82f6] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                Most Popular
              </div>
              <h3 className="text-[#3b82f6] font-medium uppercase tracking-wider text-sm mb-2">Starting From</h3>
              <h4 className="text-white font-bold text-2xl mb-6">Premium Animated Website</h4>
              <div className="text-5xl font-black text-white mb-8">$2,500 <span className="text-lg text-[#D7E2EA]/50 font-medium">USD</span></div>
              <a
                href="https://calendly.com/deepak-soni220"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full py-4 text-center bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-full transition-all duration-300"
              >
                Book Strategy Call
              </a>
            </div>

            {/* Tier 3 */}
            <div className="p-8 rounded-3xl bg-[#0C0C0C] border border-white/5 hover:border-[#3b82f6]/50 transition-colors flex flex-col">
              <h3 className="text-[#D7E2EA]/70 font-medium uppercase tracking-wider text-sm mb-2">Starting From</h3>
              <h4 className="text-white font-bold text-2xl mb-6">Advanced Full Stack Ecommerce</h4>
              <div className="text-4xl font-black text-white mb-8">$4,000+ <span className="text-lg text-[#D7E2EA]/50 font-medium">USD</span></div>
              <a
                href="https://calendly.com/deepak-soni220"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full py-4 text-center border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white font-semibold rounded-full transition-all duration-300"
              >
                Inquire Now
              </a>
            </div>

          </div>
          
          <div className="mt-12 text-center text-[#D7E2EA]/50">
            Need an Enterprise Solution? <a href="https://calendly.com/" className="text-white underline hover:text-[#3b82f6]">Get a Custom Quote</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
