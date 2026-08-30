import React from "react";
import { Link } from "react-router-dom";

export const WebMakeFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05060b] text-white pt-16 pb-12 mt-20 relative z-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Col 1 & 2: Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/ai-builder" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#ec4899] p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.35)]">
                <div className="w-full h-full bg-[#07080e] rounded-[10px] flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#60a5fa] to-[#f472b6] font-black text-lg">
                    W
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-[Kanit] font-black text-xl tracking-tight text-white group-hover:text-[#60a5fa] transition-colors">
                  WebMake
                </span>
                <span className="text-[10px] text-white/40 tracking-wider -mt-1 font-medium">
                  by digifox.world
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-sm">
              The autonomous AI website builder & 3D WebGL design studio. Generate, visually customize, and launch high-converting websites in minutes.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Col 3: Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/90 mb-1">Product</h4>
            <Link to="/ai-builder" className="text-xs text-white/60 hover:text-white transition-colors">Web Studio</Link>
            <Link to="/ai-builder/features" className="text-xs text-white/60 hover:text-white transition-colors">Features</Link>
            <Link to="/ai-builder/auto-seo" className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
              <span>WebMake Auto SEO, GEO & AEO</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">AI</span>
            </Link>
            <Link to="/ai-builder/design-kits" className="text-xs text-white/60 hover:text-white transition-colors">3D & 2D Design Kits</Link>
            <Link to="/ai-builder/pricing" className="text-xs text-white/60 hover:text-white transition-colors">Pricing & Plans</Link>
          </div>

          {/* Col 4: Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/90 mb-1">Resources</h4>
            <Link to="/ai-builder/blogs" className="text-xs text-white/60 hover:text-white transition-colors">Blogs & Journal</Link>
            <Link to="/ai-builder/contact" className="text-xs text-white/60 hover:text-white transition-colors">Contact Support</Link>
          </div>

          {/* Col 5: Support & Ecosystem */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/90 mb-1">Direct Support</h4>
            <a href="https://wa.me/918696755996" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5">
              <span>WhatsApp Chat</span>
              <span>💬</span>
            </a>
            <a href="mailto:sales@webmake.in" className="text-xs text-[#60a5fa] hover:text-[#93c5fd] transition-colors font-medium">
              sales@webmake.in
            </a>
            <a href="mailto:digifox5d@icloud.com" className="text-xs text-white/70 hover:text-white transition-colors">
              digifox5d@icloud.com
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} WebMake by digifox.world. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/ai-builder/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/ai-builder/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/ai-builder/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
