import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Media } from '../components/Media';
import siteData from '../data.json';

const CATEGORIES = [
  "WordPress Website",
  "Shopify Website",
  "3D Animated Website"
];

export const PortfolioLinksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("WordPress Website");

  const filteredLinks = siteData.portfolioLinks.filter(
    link => activeCategory === "All" || link.category === activeCategory
  );

  return (
    <section id="portfolio" className="py-20 px-5 sm:px-10 md:px-16 bg-[var(--bg-base)] text-[var(--text-strong)] border-y border-[var(--border-strong)]/30">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h2>
          <p className="text-[var(--text-primary)]/70 max-w-2xl mx-auto">
            Explore our diverse range of digital experiences, from e-commerce stores to fully animated 3D web applications.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category 
                  ? 'bg-[var(--text-strong)] text-[var(--bg-base)] border-[var(--text-strong)] shadow-lg' 
                  : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-surface-elevated)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Animated Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          <AnimatePresence>
            {filteredLinks.map((item, index) => (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.url + index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors duration-300 block"
              >
                <div className="relative aspect-video overflow-hidden bg-[var(--bg-base)]">
                  <div className="absolute inset-0 bg-[#D9D9D9] group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Media 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Overlay icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-strong)] group-hover:opacity-80 transition-opacity">
                    {item.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredLinks.length === 0 && (
          <div className="text-[var(--text-primary)]/70 mt-10">
            No projects found in this category.
          </div>
        )}

        {/* Explore Full Portfolio Page Button */}
        <div className="mt-14 flex justify-center w-full">
          <a
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] hover:border-[#3b82f6] text-[var(--text-strong)] text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>View Full Portfolio Gallery</span>
            <span className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
              ↗
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};
