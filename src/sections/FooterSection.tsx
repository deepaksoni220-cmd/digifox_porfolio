import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ArrowUp, Copy, Check, Globe } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@digifox5d.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  // Custom SVGs for brand icons since they are removed in newer lucide-react versions
  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "https://twitter.com",
      label: "Twitter"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      url: "https://instagram.com",
      label: "Instagram"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      url: "https://linkedin.com",
      label: "LinkedIn"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      url: "https://github.com",
      label: "GitHub"
    }
  ];

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Our Studio", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer id="contact" className="relative z-20 bg-[#0C0C0C] text-[#D7E2EA] border-t border-[#D7E2EA]/10 pt-24 pb-12 overflow-hidden flex flex-col items-center">
      
      {/* Decorative Radial glow in background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#B600A8]/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="w-full max-w-6xl px-5 sm:px-10 md:px-16 relative z-10 flex flex-col">
        
        {/* Large Premium CTA */}
        <div className="mb-20 text-center w-full flex flex-col items-center">
          <FadeIn delay={0} y={40} className="w-full flex flex-col items-center">
            <span className="uppercase tracking-[0.25em] text-[#D7E2EA]/40 text-xs sm:text-sm font-medium block mb-4 text-center">
              Have an idea?
            </span>
          </FadeIn>
          <FadeIn delay={0.15} y={50} className="w-full flex flex-col items-center">
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center w-full text-[clamp(2.2rem,8vw,6.5rem)]">
              Let&apos;s build it.
            </h2>
          </FadeIn>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-[#D7E2EA]/10">
          
          {/* Brand Info — Column 5 */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left justify-between gap-6 md:gap-0">
            <div>
              <h3 className="font-black uppercase tracking-wider text-xl sm:text-2xl mb-4">
                Digifox 5D
              </h3>
              <p className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-sm mb-6 text-sm sm:text-base mx-auto md:mx-0">
                A 3D studio and visual design agency driven by crafting striking, interactive, and unforgettable digital experiences.
              </p>
            </div>
            
            {/* Social Icons Row with Spring Hover Effect */}
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA]/70 hover:text-white hover:border-white transition-colors duration-300"
                  whileHover={{ scale: 1.12, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links — Column 3 */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="uppercase tracking-widest text-[#D7E2EA]/40 text-xs font-semibold mb-6">
              Navigation
            </h4>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-light text-[#D7E2EA]/70 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 6 }}
                  >
                    <span className="text-[#D7E2EA]/30">/</span> {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details — Column 3 */}
          <div className="md:col-span-3 md:col-start-10 flex flex-col items-center md:items-start gap-6">
            <div className="w-full flex flex-col items-center md:items-start">
              <h4 className="uppercase tracking-widest text-[#D7E2EA]/40 text-xs font-semibold mb-4 text-center md:text-left">
                Get in Touch
              </h4>
              
              {/* Interactive Email Box */}
              <div className="w-full max-w-sm group relative flex items-center justify-between gap-3 bg-[#111111] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 hover:border-[#D7E2EA]/30 transition-colors duration-300">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail size={16} className="text-[#D7E2EA]/50 group-hover:text-white transition-colors duration-300 shrink-0" />
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm font-light tracking-wide text-[#D7E2EA]/80 group-hover:text-white transition-colors duration-300 truncate">
                    {email}
                  </a>
                </div>
                
                {/* Copy Button */}
                <button 
                  onClick={handleCopy}
                  className="shrink-0 text-[#D7E2EA]/45 hover:text-white transition-colors duration-200 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check size={14} className="text-emerald-400" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        whileHover={{ scale: 1.15 }}
                      >
                        <Copy size={14} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin size={16} className="text-[#D7E2EA]/40 shrink-0" />
              <span className="text-xs sm:text-sm font-light text-[#D7E2EA]/70">
                Based in India
              </span>
            </div>

            {/* Pulse Live Status indicator */}
            <div className="flex items-center gap-3 bg-[#111111]/40 border border-[#D7E2EA]/5 rounded-xl px-4 py-3 self-center md:self-start">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-light text-emerald-400 tracking-wide">
                Available for freelance projects
              </span>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-6 relative z-10">
          
          {/* Copyright text */}
          <div className="text-xs sm:text-sm font-light text-[#D7E2EA]/40 text-center sm:text-left order-2 sm:order-1">
            <p>© {currentYear} Digifox 5D. All rights reserved.</p>
            <p className="mt-1 flex items-center justify-center sm:justify-start gap-1 text-[10px] text-[#D7E2EA]/30">
              <Globe size={10} /> Crafted with React, Tailwind & Framer Motion
            </p>
          </div>

          {/* Scroll to Top with Magnet button */}
          <div className="order-1 sm:order-2 shrink-0">
            <Magnet padding={50} strength={2}>
              <motion.button
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-[#111111] border border-[#D7E2EA]/15 text-[#D7E2EA] flex items-center justify-center hover:border-white transition-colors duration-300 cursor-pointer shadow-lg"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                title="Scroll back to top"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} className="animate-bounce" style={{ animationDuration: '2s' }} />
              </motion.button>
            </Magnet>
          </div>

        </div>

      </div>
    </footer>
  );
};
