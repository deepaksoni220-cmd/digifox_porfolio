import React from 'react';
import { FadeIn } from '../../components/FadeIn';

const TESTIMONIALS = [
  "The website became our strongest sales tool.",
  "Visitors stayed longer and our enquiries became more qualified.",
  "The new experience finally matched our premium brand."
];

export const PremiumTestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center">
        
        <FadeIn delay={0.1} y={30} className="mb-20">
          <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
            Don't Just Build a Website.
          </h2>
          <p className="text-[#3b82f6] font-bold text-[clamp(1.5rem,3vw,2.5rem)]">
            Build a Business Asset.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((quote, i) => (
            <FadeIn key={i} delay={0.2 + (i * 0.1)} y={30}>
              <div className="p-10 rounded-3xl bg-[#111111] border border-white/5 h-full flex flex-col justify-center relative">
                <div className="absolute top-4 left-6 text-6xl text-[#3b82f6]/20 font-serif">"</div>
                <p className="text-white text-lg sm:text-xl font-medium leading-relaxed italic relative z-10">
                  {quote}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
