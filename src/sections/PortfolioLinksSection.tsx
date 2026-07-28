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
    <section id="portfolio" className="py-20 px-5 sm:px-10 md:px-16 bg-[#080808] text-[var(--text-strong)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our diverse range of digital experiences, from e-commerce stores to fully animated 3D web applications.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-[var(--bg-surface-elevated)] text-gray-400 hover:text-[var(--text-strong)] hover:bg-[#2A2A2A]'
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
                className="group relative flex flex-col bg-[#111] rounded-2xl overflow-hidden border border-[#222] hover:border-gray-500 transition-colors duration-300 block"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <div className="absolute inset-0 bg-[#D9D9D9] group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Media 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Overlay icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-strong)] group-hover:text-gray-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredLinks.length === 0 && (
          <div className="text-gray-500 mt-10">
            No projects found in this category.
          </div>
        )}

      </div>
    </section>
  );
};
