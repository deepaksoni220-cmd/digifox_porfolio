import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to light mode if no preference is saved
    if (savedTheme === 'light' || !savedTheme) {
      setIsLight(true);
      document.documentElement.classList.add('light');
    } else {
      setIsLight(false);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center w-[58px] h-[32px] rounded-full p-[2px] transition-colors duration-500 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0 bg-gradient-to-b from-[#a4abb7] to-[#8c94a2] dark:from-[#252a35] dark:to-[#171b22] border border-white/25 dark:border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-1px_2px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.15)]"
      aria-label="Toggle light/dark theme"
    >
      {/* Sliding Frosted Glass Knob */}
      <motion.div
        animate={{
          x: isLight ? 0 : 24,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
        }}
        className="relative flex items-center justify-center w-[28px] h-[28px] rounded-full backdrop-blur-lg bg-white/40 dark:bg-white/15 border border-white/80 dark:border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)]"
      >
        {/* Soft Outer Halo Glow */}
        <div className="absolute -inset-1 rounded-full bg-white/20 dark:bg-white/5 blur-[2px] pointer-events-none" />

        {/* Sun Icon for Light Mode */}
        <motion.div
          animate={{
            scale: isLight ? 1 : 0,
            opacity: isLight ? 1 : 0,
            rotate: isLight ? 0 : -90,
          }}
          transition={{ duration: 0.25 }}
          className="absolute flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
            <line x1="12" y1="2" x2="12" y2="4.5" />
            <line x1="12" y1="19.5" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
            <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="4.5" y2="12" />
            <line x1="19.5" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
            <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
          </svg>
        </motion.div>

        {/* Moon Icon for Dark Mode */}
        <motion.div
          animate={{
            scale: isLight ? 0 : 1,
            opacity: isLight ? 0 : 1,
            rotate: isLight ? 90 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="absolute flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </motion.div>
      </motion.div>
    </button>
  );
};

