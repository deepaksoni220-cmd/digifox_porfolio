import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Wand2, Palette, MessageSquare, Rocket, ArrowRight } from 'lucide-react';

export const StepsProgressBarSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress across the entire 5 steps container from start to finish
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 85%']
  });

  // Master animated progressive beam width (horizontal) & height (vertical)
  const masterProgressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const masterProgressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Step 1 Scroll Transforms (0% -> 20%)
  const step1Y = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const step1Scale = useTransform(scrollYProgress, [0, 0.2], [0.97, 1]);
  const step1Opacity = useTransform(scrollYProgress, [0, 0.15], [0.85, 1]);
  const step1Bar = useTransform(scrollYProgress, [0, 0.2], ['0%', '100%']);
  const step1Glow = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.3, 1, 0.5]);

  // Step 2 Scroll Transforms (20% -> 40%)
  const step2Y = useTransform(scrollYProgress, [0.15, 0.4], [20, 0]);
  const step2Scale = useTransform(scrollYProgress, [0.15, 0.4], [0.97, 1]);
  const step2Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0.85, 1]);
  const step2Bar = useTransform(scrollYProgress, [0.2, 0.4], ['0%', '100%']);
  const step2Glow = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.3, 1, 0.5]);

  // Step 3 Scroll Transforms (40% -> 60%)
  const step3Y = useTransform(scrollYProgress, [0.35, 0.6], [20, 0]);
  const step3Scale = useTransform(scrollYProgress, [0.35, 0.6], [0.97, 1]);
  const step3Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0.85, 1]);
  const step3Bar = useTransform(scrollYProgress, [0.4, 0.6], ['0%', '100%']);
  const step3Glow = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0.3, 1, 0.5]);

  // Step 4 Scroll Transforms (60% -> 80%)
  const step4Y = useTransform(scrollYProgress, [0.55, 0.8], [20, 0]);
  const step4Scale = useTransform(scrollYProgress, [0.55, 0.8], [0.97, 1]);
  const step4Opacity = useTransform(scrollYProgress, [0.55, 0.75], [0.85, 1]);
  const step4Bar = useTransform(scrollYProgress, [0.6, 0.8], ['0%', '100%']);
  const step4Glow = useTransform(scrollYProgress, [0.6, 0.8, 0.95], [0.3, 1, 0.5]);

  // Step 5 Scroll Transforms (80% -> 100% with Zoom-In effect)
  const step5Y = useTransform(scrollYProgress, [0.75, 1], [20, 0]);
  const step5Scale = useTransform(scrollYProgress, [0.75, 1], [0.97, 1.03]);
  const step5Opacity = useTransform(scrollYProgress, [0.75, 0.95], [0.85, 1]);
  const step5Bar = useTransform(scrollYProgress, [0.8, 1], ['0%', '100%']);
  const step5Glow = useTransform(scrollYProgress, [0.8, 1], [0.3, 1]);

  const stepsData = [
    {
      step: '01',
      title: 'Prompt or Pick Design',
      desc: 'Describe your business idea to the AI or select a pre-made 3D/2D interactive template.',
      badge: 'Step 1',
      progressLabel: '20%',
      icon: Sparkles,
      color: '#3b82f6',
      accent: 'from-blue-500 to-cyan-400',
      bgGlow: 'rgba(59,130,246,0.18)',
      y: step1Y,
      scale: step1Scale,
      opacity: step1Opacity,
      barWidth: step1Bar,
      glowOpacity: step1Glow,
      borderActive: 'border-blue-500/60 shadow-[0_4px_20px_rgba(59,130,246,0.15)]'
    },
    {
      step: '02',
      title: 'Instant AI Generation',
      desc: 'In under 60 seconds, AI generates your full website with custom copy, colors, and layout.',
      badge: 'Step 2',
      progressLabel: '40%',
      icon: Wand2,
      color: '#6366f1',
      accent: 'from-indigo-500 to-blue-500',
      bgGlow: 'rgba(99,102,241,0.18)',
      y: step2Y,
      scale: step2Scale,
      opacity: step2Opacity,
      barWidth: step2Bar,
      glowOpacity: step2Glow,
      borderActive: 'border-indigo-500/60 shadow-[0_4px_20px_rgba(99,102,241,0.15)]'
    },
    {
      step: '03',
      title: 'Live Inline Customization',
      desc: 'Click on any heading, text, or image in the live preview to customize fonts, styling, and media.',
      badge: 'Step 3',
      progressLabel: '60%',
      icon: Palette,
      color: '#a855f7',
      accent: 'from-purple-500 to-indigo-500',
      bgGlow: 'rgba(168,85,247,0.18)',
      y: step3Y,
      scale: step3Scale,
      opacity: step3Opacity,
      barWidth: step3Bar,
      glowOpacity: step3Glow,
      borderActive: 'border-purple-500/60 shadow-[0_4px_20px_rgba(168,85,247,0.15)]'
    },
    {
      step: '04',
      title: 'Add WhatsApp & Logo',
      desc: 'Connect your direct WhatsApp lead button and company logo so customer inquiries reach you.',
      badge: 'Step 4',
      progressLabel: '80%',
      icon: MessageSquare,
      color: '#10b981',
      accent: 'from-emerald-500 to-teal-400',
      bgGlow: 'rgba(16,185,129,0.18)',
      y: step4Y,
      scale: step4Scale,
      opacity: step4Opacity,
      barWidth: step4Bar,
      glowOpacity: step4Glow,
      borderActive: 'border-emerald-500/60 shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
    },
    {
      step: '05',
      title: '1-Click Live Publish',
      desc: 'Publish instantly with automated SSL security to a free custom subdomain or custom domain.',
      badge: 'Step 5',
      progressLabel: '100%',
      icon: Rocket,
      color: '#f59e0b',
      accent: 'from-amber-500 to-orange-500',
      bgGlow: 'rgba(245,158,11,0.22)',
      y: step5Y,
      scale: step5Scale,
      opacity: step5Opacity,
      barWidth: step5Bar,
      glowOpacity: step5Glow,
      borderActive: 'border-amber-500/70 shadow-[0_4px_25px_rgba(245,158,11,0.2)]'
    }
  ];

  return (
    <div ref={containerRef} className="mb-24 pt-10 pb-16 border-t border-[var(--border-strong)] relative">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
          <span>⚡</span>
          <span>How It Works</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
          Build & Launch in <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">5 Easy Steps</span>
        </h2>
        <p className="text-xs sm:text-base text-[var(--text-secondary)] mt-3 max-w-xl mx-auto">
          Scroll through to follow the live process from concept prompt to instant deployment.
        </p>
      </div>

      {/* Global Scroll-Driven Master Progressive Track (Desktop Top Banner) */}
      <div className="max-w-5xl mx-auto mb-10 px-2 sm:px-4">
        <div className="relative bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-strong)]">
                Live Build Pipeline
              </span>
            </div>
            
            {/* Right Side Status on Mobile & Desktop */}
            <div className="flex items-center justify-between sm:justify-end gap-2 font-mono text-xs font-bold text-blue-500 dark:text-blue-400">
              <span className="text-[11px] sm:text-xs">Scroll Responsive</span>
              <span className="text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live Active ✓
              </span>
            </div>
          </div>

          {/* Master Progress Bar Track */}
          <div className="relative h-3 w-full bg-slate-200/80 dark:bg-zinc-800 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
            <motion.div 
              style={{ width: masterProgressWidth }}
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 via-emerald-500 to-amber-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
            {/* Animated Traveling Shimmer */}
            <motion.div 
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{ x: ['-100%', '800%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>

          {/* 5 Step Indicator Nodes */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-3.5 sm:mt-4">
            {stepsData.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.06] text-[var(--text-secondary)]"
              >
                <span className="font-mono text-blue-500 dark:text-blue-400 font-extrabold">{s.step}</span>
                <span className="truncate hidden md:inline">{s.title.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Wrapper with Right-Side Sticky Progress Rail on Mobile */}
      <div className="relative flex flex-row items-stretch gap-2.5 sm:gap-5">
        
        {/* 5 Step Cards Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pb-6 [perspective:1200px]">
          {stepsData.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div 
                key={idx} 
                style={{
                  y: item.y,
                  scale: item.scale,
                  opacity: item.opacity,
                  transformStyle: "preserve-3d"
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative flex flex-col group cursor-default will-change-transform"
              >
                <div
                  className={`relative bg-[var(--bg-surface)] border ${item.borderActive} rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[290px] sm:min-h-[320px] transition-all duration-300 shadow-md hover:shadow-xl z-10`}
                >
                  {/* Scroll-Driven Glow Aura */}
                  <motion.div 
                    style={{ opacity: item.glowOpacity }}
                    className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                  >
                    <div 
                      className="w-full h-full"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${item.bgGlow}, transparent 70%)`
                      }}
                    />
                  </motion.div>

                  {/* Card Top & Body */}
                  <div className="relative z-10">
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/[0.08] border border-black/10 dark:border-white/[0.15] text-[var(--text-strong)] shadow-sm group-hover:scale-110 transition-transform"
                        >
                          <Icon size={17} style={{ color: item.color }} />
                        </div>
                        <span className={`text-xl font-black bg-gradient-to-r ${item.accent} bg-clip-text text-transparent font-mono`}>
                          {item.step}
                        </span>
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-[var(--bg-base)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-strong)] leading-snug mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Card Bottom: Animated Scroll-Driven Progress Bar */}
                  <div className="relative z-10 pt-4 mt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-secondary)] mb-2 font-mono">
                      <span className="uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">Scroll Phase</span>
                      <span className="font-extrabold text-[12px]" style={{ color: item.color }}>{item.progressLabel}</span>
                    </div>
                    
                    {/* High contrast track */}
                    <div className="h-2 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-black/10 dark:border-white/10 p-[1px]">
                      <motion.div 
                        style={{ width: item.barWidth }}
                        className={`h-full bg-gradient-to-r ${item.accent} rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]`}
                      />
                    </div>
                  </div>
                </div>

                {/* Connecting Desktop Arrow */}
                {idx < 4 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] items-center justify-center text-[var(--text-secondary)] group-hover:text-blue-400 group-hover:border-blue-500/40 shadow-sm transition-all">
                    <ArrowRight size={12} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right-Side Vertical Progress Rail on Mobile (< sm) - Sticky throughout all 5 cards until completion */}
        <div className="flex sm:hidden w-10 shrink-0 relative">
          <div className="sticky top-28 h-[calc(100vh-180px)] max-h-[520px] min-h-[380px] w-10 py-4 px-1.5 rounded-2xl bg-[var(--bg-surface)]/95 backdrop-blur-md border border-[var(--border-strong)] shadow-2xl flex flex-col items-center justify-between z-30">
            {/* Step 1 Node */}
            <span className="text-[10px] font-black font-mono text-blue-500">01</span>
            <span className="text-[9px] font-bold font-mono text-indigo-400">02</span>
            <span className="text-[9px] font-bold font-mono text-purple-400">03</span>
            <span className="text-[9px] font-bold font-mono text-emerald-400">04</span>
            {/* Step 5 Node */}
            <span className="text-[10px] font-black font-mono text-amber-500">05</span>
            
            {/* Centered Vertical Track overlay */}
            <div className="absolute inset-y-12 w-2 left-1/2 -translate-x-1/2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-black/10 dark:border-white/10 -z-10">
              <motion.div 
                style={{ height: masterProgressHeight }}
                className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 via-purple-500 via-emerald-500 to-amber-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)]"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
