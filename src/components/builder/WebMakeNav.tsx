import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../ThemeToggle";

interface WebMakeNavProps {
  activePage?: "studio" | "features" | "design-kits" | "pricing" | "blogs" | "contact";
}

export const WebMakeNav: React.FC<WebMakeNavProps> = ({ activePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { label: "Web Studio", path: "/ai-builder", key: "studio", badge: "AI" },
    { label: "Features", path: "/ai-builder/features", key: "features" },
    { label: "Design Kits", path: "/ai-builder/design-kits", key: "design-kits", badge: "3D" },
    { label: "Pricing", path: "/ai-builder/pricing", key: "pricing" },
    { label: "Blogs", path: "/ai-builder/blogs", key: "blogs" },
    { label: "Contact Us", path: "/ai-builder/contact", key: "contact" }
  ];

  const isLinkActive = (path: string, key: string) => {
    if (activePage) return activePage === key;
    if (path === "/ai-builder") {
      return currentPath === "/ai-builder" || currentPath === "/ai-builder/";
    }
    return currentPath.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07080e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40 text-white transition-all duration-300">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link 
            to="/ai-builder" 
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#ec4899] p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.35)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#07080e] rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#60a5fa] to-[#f472b6] font-black text-lg tracking-tighter">
                  W
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-[Kanit] font-black text-xl tracking-tight text-white group-hover:text-[#60a5fa] transition-colors">
                WebMake
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30">
                AI
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((item) => {
            const active = isLinkActive(item.path, item.key);
            return (
              <Link
                key={item.key}
                to={item.path}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  active
                    ? "text-white bg-white/10 shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                    item.badge === "3D"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  }`}>
                    {item.badge}
                  </span>
                )}
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link
            to="/ai-builder"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] hover:opacity-95 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Launch Studio</span>
            <span className="text-sm">🚀</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0a0b15]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-6 flex flex-col gap-3 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((item) => {
                const active = isLinkActive(item.path, item.key);
                return (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                      active
                        ? "bg-[#3b82f6] text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase bg-white/20 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                to="/ai-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg"
              >
                Launch Web Studio 🚀
              </Link>
              <div className="flex items-center justify-center text-xs text-white/50 px-2">
                <Link to="/ai-builder/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Support & FAQs</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
