import React from 'react';

export const PageFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border-strong)] bg-[var(--bg-surface)] pt-12 pb-8 mt-20 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left mb-8">
        <div>
          <a href="/" className="inline-block">
            <span className="text-2xl font-black tracking-widest uppercase bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
              Digifox 5D <span className="text-xs sm:text-sm font-bold tracking-wider text-[var(--text-primary)]/50">World</span>
            </span>
          </a>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-2 max-w-sm">
            High-converting 3D web design, AI website generator, and digital marketing studio.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-5 sm:gap-7 justify-center items-center">
          <a href="/" className="text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors text-xs font-bold uppercase tracking-wider">
            Home
          </a>
          <a href="/portfolio" className="text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors text-xs font-bold uppercase tracking-wider">
            Portfolio
          </a>
          <a href="/contact" className="text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors text-xs font-bold uppercase tracking-wider">
            Contact Us
          </a>
          <a href="/terms" className="text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors text-xs font-bold uppercase tracking-wider">
            Terms
          </a>
          <a href="/privacy" className="text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors text-xs font-bold uppercase tracking-wider">
            Privacy
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)] pt-6 text-center">
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm font-medium opacity-60">
          &copy; {currentYear} Digifox 5D. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
