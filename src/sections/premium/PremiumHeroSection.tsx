import React from 'react';
import { FadeIn } from '../../components/FadeIn';

export const PremiumHeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col relative overflow-x-clip bg-[#0C0C0C]">
      
      {/* Static Aurora Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#e100ff] rounded-full mix-blend-screen filter blur-[150px] opacity-30"></div>
        <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-20 px-6 sm:px-10 py-32 max-w-6xl mx-auto text-center">
        
        <FadeIn delay={0.1} y={20} className="mb-6">
          <h2 className="text-[#3b82f6] font-semibold tracking-widest uppercase text-sm sm:text-base md:text-lg">
            Your Ads Bring Visitors.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="mb-8 w-full">
          <h1 className="font-black tracking-tight leading-[1.1] text-white text-[clamp(2.5rem,6vw,5rem)] max-w-5xl mx-auto">
            Your Website Decides Whether They Become Customers.
          </h1>
        </FadeIn>

        <FadeIn delay={0.3} y={30} className="mb-10 w-full">
          <p className="text-[#D7E2EA] font-light text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            If you're investing <strong className="font-semibold text-white">$2,000–$50,000+ every month</strong> on Meta Ads or Google Ads, don't let an outdated website be the reason potential customers leave.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} y={30} className="mb-12 w-full">
          <p className="text-[#D7E2EA]/70 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We build <strong className="text-white">fully custom 2D & 3D animated websites</strong> that create unforgettable first impressions, build trust in seconds, and help premium businesses convert more visitors into paying customers.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={30} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
          <a
            href="https://calendly.com/deepak-soni220"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Get My Free Website Audit
          </a>
          
          <a
            href="/#portfolio"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/5"
          >
            View Interactive Demo
          </a>
        </FadeIn>
      </div>
    </section>
  );
};
