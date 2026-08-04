import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100 over 2 seconds
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeOutQuart = 1 - Math.pow(1 - currentStep / steps, 4);
      const currentProgress = Math.min(Math.round(easeOutQuart * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-base)] text-[var(--text-primary)] overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Animated Text Reveal */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-black uppercase tracking-widest text-[clamp(2rem,6vw,4rem)] leading-none text-center"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            Digifox 5D
          </motion.h1>
        </div>

        {/* Loading Progress */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-sm font-light tracking-[0.2em] uppercase text-[var(--text-primary)]/50">
            Loading
          </div>
          <div className="font-black text-[clamp(3rem,8vw,5rem)] leading-none">
            {progress}%
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(182,0,168,0.2)_0%,_transparent_70%)] rounded-full pointer-events-none z-0 transform-gpu"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </motion.div>
  );
};
