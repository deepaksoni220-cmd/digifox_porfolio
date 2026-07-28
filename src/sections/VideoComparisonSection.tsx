import React from 'react';
import { FadeIn } from '../components/FadeIn';

export const VideoComparisonSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-base)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <FadeIn delay={0.1} y={30} className="text-center mb-16">
          <h2 className="font-black text-[var(--text-strong)] text-[clamp(2rem,4vw,3.5rem)] leading-tight">
            Basic Website vs <span className="text-[#3b82f6]">Exclusive 2D/3D Website</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4 justify-center relative">
            
            {/* Basic Website Video */}
            <div className="flex-1 w-full flex flex-col gap-4">
              <div className="aspect-video bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden relative shadow-lg">
                <video 
                  src="/basicweb.mp4" 
                  controls 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-[var(--text-strong)]/50 font-medium text-lg">Basic Website</p>
            </div>

            {/* VS Badge */}
            <div className="z-10 bg-[var(--bg-base)] border-2 border-[#111111] rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:mt-[-20px]">
              <span className="text-[var(--text-strong)] font-black text-xl sm:text-2xl italic tracking-tighter">VS</span>
            </div>

            {/* Animated Website Video */}
            <div className="flex-1 w-full flex flex-col gap-4">
              <div className="aspect-video bg-[var(--bg-base)] rounded-3xl border border-[#3b82f6]/50 flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                <video 
                  src="/2dweb.mp4" 
                  controls 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-[#3b82f6] font-bold text-lg">Exclusive 2D/3D Animated Website</p>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};
