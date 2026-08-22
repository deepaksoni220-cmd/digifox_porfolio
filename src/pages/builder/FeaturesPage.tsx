import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WebamekNav } from "../../components/builder/WebamekNav";
import { WebamekFooter } from "../../components/builder/WebamekFooter";
import { SEOMeta } from "../../components/SEOMeta";

export const FeaturesPage: React.FC = () => {
  const coreFeatures = [
    {
      icon: "⚡",
      tag: "AI Intelligence",
      title: "Prompt to Your Sales Machine Website",
      desc: "Simply describe your business, niche, or product in plain words. Webamek generates structured sections, headlines, benefit blocks, and call-to-actions instantly.",
      gradient: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30"
    },
    {
      icon: "🎮",
      tag: "3D WebGL Canvas",
      title: "Interactive 3D Animated Physics",
      desc: "Bring your website to life with real-time 3D models, smooth camera scroll-triggers, particle dynamics, and realistic lighting that keeps visitors hooked.",
      gradient: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/30"
    },
    {
      icon: "✏️",
      tag: "Visual Customizer",
      title: "Direct Click-to-Edit Studio",
      desc: "Click directly on any text, heading, or image in your live preview. Fine-tune font sizes, letter-spacing, line-heights, animations, and color tones in seconds.",
      gradient: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30"
    },
    {
      icon: "🌐",
      tag: "Custom Domains",
      title: "Free Subdomains & Custom Domain Linking",
      desc: "Publish instantly to your free *.digifox.world subdomain or connect your company domain (yourbrand.com) with automatic global SSL certificates.",
      gradient: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30"
    },
    {
      icon: "💬",
      tag: "Lead Capture",
      title: "Instant WhatsApp & Call Integrations",
      desc: "Turn passive website visitors into paying customers with floating direct WhatsApp chat bubbles, click-to-call triggers, and custom contact forms.",
      gradient: "from-rose-500/20 to-red-500/10",
      border: "border-rose-500/30"
    },
    {
      icon: "🚀",
      tag: "Ultra-Fast Edge",
      title: "100/100 Core Web Vitals & Global CDN",
      desc: "Optimized for lightning-fast speeds, SEO ranking, and GEO readiness across Google, Bing, and AI search engines like ChatGPT and Perplexity.",
      gradient: "from-cyan-500/20 to-sky-500/10",
      border: "border-cyan-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="Webamek Features — AI & 3D Website Builder"
        description="Explore next-generation AI web creation, 3D WebGL animations, visual click-to-edit studio, and custom domain publishing."
      />
      
      <WebamekNav activePage="features" />

      {/* Atmospheric Hero */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#3b82f6]/15 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#60a5fa] mb-6 backdrop-blur-md"
        >
          <span>⚡ Next-Generation Web Architecture</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-5xl mx-auto leading-[1.05]"
        >
          Everything You Need To Build <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a855f7] to-[#ec4899]">
            A 3D Animated Masterpiece
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Webamek merges autonomous AI generation with high-performance WebGL physics and intuitive visual editing so you can launch high-converting websites in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/ai-builder"
            className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-95 text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-xs sm:text-sm shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>Start Building with AI</span>
            <span>🚀</span>
          </Link>
          <Link
            to="/ai-builder/design-kits"
            className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all"
          >
            Explore Design Kits →
          </Link>
        </motion.div>
      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl bg-gradient-to-b ${feat.gradient} border ${feat.border} backdrop-blur-xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-2xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl">{feat.icon}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 text-white/95 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#60a5fa]">
                <span>Included in all plans</span>
                <span>✓</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-[#1e293b] via-[#0f172a] to-[#020617] border border-[#3b82f6]/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b82f6]/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4 relative z-10">
            Ready To Create Your Brand Website?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-sm sm:text-base relative z-10">
            Generate and customize your 3D or 2D animated site in seconds. No coding required.
          </p>
          <Link
            to="/ai-builder"
            className="inline-flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:scale-105 transition-all relative z-10"
          >
            <span>Launch Web Studio Free</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
      <WebamekFooter />
</div>
  );
};
