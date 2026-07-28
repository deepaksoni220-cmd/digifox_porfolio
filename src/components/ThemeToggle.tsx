import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setIsLight(true);
      document.documentElement.classList.add('light');
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
      className="p-2 rounded-full bg-[var(--border-subtle)] hover:bg-[var(--border-strong)] text-[var(--text-primary)] transition-colors flex items-center justify-center relative overflow-hidden w-9 h-9 border border-[var(--border-subtle)] ml-2"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isLight ? 0 : 1,
          opacity: isLight ? 0 : 1,
          rotate: isLight ? 90 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {/* Moon icon for Dark Mode */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: isLight ? 1 : 0,
          opacity: isLight ? 1 : 0,
          rotate: isLight ? 0 : -90
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {/* Sun icon for Light Mode */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </motion.div>
    </button>
  );
};
