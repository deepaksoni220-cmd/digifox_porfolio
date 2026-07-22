import React from 'react';
import { FadeIn } from '../../components/FadeIn';

export const StoryAgitationSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 flex flex-col gap-32">
        
        {/* Section 1 */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8">
              Still Using a Website Built 5 Years Ago?
            </h2>
            <div className="space-y-4 text-[#D7E2EA]/70 text-lg sm:text-xl font-light">
              <p>Your marketing has evolved.</p>
              <p>Your products have improved.</p>
              <p>Your services have grown.</p>
              <p className="text-white font-medium mt-6 mb-8">But your website still looks like it belongs in 2020.</p>
              
              <p>Meanwhile...</p>
              <p>Your competitors are creating premium digital experiences that instantly build trust and make visitors feel confident before they even speak to a salesperson.</p>
              
              <p className="text-[#ef4444] font-medium pt-4">Every outdated website silently loses potential customers.</p>
            </div>
            
            <div className="mt-12 p-8 bg-[#111111] border border-[#D7E2EA]/10 rounded-3xl text-center">
              <h3 className="text-white font-bold text-2xl mb-6">Ready to Modernize Your Online Presence?</h3>
              <a
                href="https://calendly.com/deepak-soni220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-full transition-all duration-300"
              >
                Book Your Free Strategy Call
              </a>
            </div>

            {/* Video Comparison */}
            <div className="mt-24 relative w-screen max-w-7xl left-1/2 -translate-x-1/2 px-6 sm:px-10">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4 justify-center relative">
                
                {/* Basic Website Video */}
                <div className="flex-1 w-full flex flex-col gap-4">
                  <div className="aspect-video bg-[#111111] rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden relative shadow-lg">
                    {/* Placeholder for Basic Website Video */}
                    <span className="text-[#D7E2EA]/40 font-medium text-lg sm:text-xl">Basic Website Video</span>
                  </div>
                  <p className="text-center text-white/50 font-medium text-lg">Basic Website</p>
                </div>

                {/* VS Badge */}
                <div className="z-10 bg-[#0C0C0C] border-2 border-[#111111] rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:mt-[-20px]">
                  <span className="text-white font-black text-xl sm:text-2xl italic tracking-tighter">VS</span>
                </div>

                {/* Animated Website Video */}
                <div className="flex-1 w-full flex flex-col gap-4">
                  <div className="aspect-video bg-[#0C0C0C] rounded-3xl border border-[#3b82f6]/50 flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                    {/* Placeholder for Animated Website Video */}
                    <span className="text-[#3b82f6]/60 font-medium text-lg sm:text-xl">Premium 2D/3D Video</span>
                  </div>
                  <p className="text-center text-[#3b82f6] font-bold text-lg">Exclusive 2D/3D Animated Website</p>
                </div>

              </div>
            </div>
          </FadeIn>
        </div>

        {/* Section 2 */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8">
              Every Click Costs Money.
            </h2>
            <div className="space-y-6 text-[#D7E2EA]/70 text-lg sm:text-xl font-light">
              <p>Let's say...</p>
              <ul className="space-y-3 font-medium text-white/90 bg-[#111111] p-6 rounded-2xl border border-white/5">
                <li className="flex justify-between"><span>Meta Ads</span> <span>$5,000/month</span></li>
                <li className="flex justify-between"><span>Google Ads</span> <span>$3,000/month</span></li>
                <li className="flex justify-between"><span>Email Marketing</span> <span>$1,000/month</span></li>
                <li className="flex justify-between pt-4 border-t border-white/10 text-xl font-bold text-[#3b82f6]">
                  <span>Total</span> <span>$9,000 every month</span>
                </li>
              </ul>
              
              <p className="pt-4">That's over <strong className="text-white">$9,000 every month</strong> bringing people to your website.</p>
              <p className="font-medium text-white pt-4">Now ask yourself...</p>
              <p className="font-bold text-2xl text-white leading-snug">Does your website deserve that investment and giving basic 1% conversions over visitors?</p>
              <p>Or is it reducing the return on everything else you're spending?</p>
            </div>
            
            <div className="mt-10">
              <a
                href="#demo"
                className="inline-block px-8 py-4 border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white font-semibold rounded-full transition-all duration-300"
              >
                See How We Increase Website Performance
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Section 3 */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8">
              First Impressions Are Made in Seconds.
            </h2>
            <div className="space-y-6 text-[#D7E2EA]/70 text-lg sm:text-xl font-light">
              <p>Before visitors</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Read your content...</li>
                <li>Compare your pricing...</li>
                <li>View your portfolio...</li>
              </ul>
              <p className="pt-2 font-medium text-white">They've already formed an opinion about your business.</p>
              
              <p className="pt-6">Your website instantly communicates either:</p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="flex-1 p-6 bg-[#111111] rounded-2xl border border-green-500/20 text-center">
                  <p className="text-green-400 font-bold text-xl">"I'm an industry leader."</p>
                </div>
                <div className="flex items-center justify-center text-white/30 font-bold text-xl">or</div>
                <div className="flex-1 p-6 bg-[#111111] rounded-2xl border border-red-500/20 text-center">
                  <p className="text-red-400 font-bold text-xl">"I'm just another option."</p>
                </div>
              </div>
              
              <p className="pt-8 text-white font-medium text-2xl text-center">
                An exclusive website builds confidence and focus over your products / service instead of its pricing before the sales conversation even begins.
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};
