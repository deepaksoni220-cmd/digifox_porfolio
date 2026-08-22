import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

export const FeaturesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const coreFeatures = [
    {
      icon: "⚡",
      tag: "AI Intelligence",
      title: "Prompt to Your Sales Machine Website",
      desc: "Simply describe your business, niche, or product in plain words. WebMake generates structured sections, headlines, benefit blocks, and call-to-actions instantly.",
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
      title: "Unlimited Customize, Click-to-Edit Studio",
      desc: "Click directly on any text, heading, or image in your live preview. Fine-tune font sizes, letter-spacing, line-heights, animations, and color tones in seconds.",
      gradient: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30"
    },
    {
      icon: "🌐",
      tag: "Hosting & SSL",
      title: "Free Subdomains & Hosting and SSL's",
      desc: "Publish instantly to your free *.digifox.world subdomain or connect your company domain (yourbrand.com) with automatic global SSL certificates.",
      gradient: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30"
    },
    {
      icon: "💬",
      tag: "Lead Capture",
      title: "Instant WhatsApp & Call Integrations",
      desc: "Connect directly with incoming prospects through high-converting floating contact bubbles and fast inquiry capture forms on every page.",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30"
    },
    {
      icon: "🚀",
      tag: "High Performance",
      title: "100/100 Core Web Vitals & SEO , GEO Optimized",
      desc: "Blazing fast global edge CDN distribution with automated caching, responsive image optimization, and semantic SEO tag generation.",
      gradient: "from-fuchsia-500/20 to-rose-500/10",
      border: "border-fuchsia-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="WebMake Studio Features — Autonomous AI, 3D WebGL, & Visual Editor"
        description="Explore the full suite of WebMake capabilities: 3D interactive physics, natural language prompting, click-to-edit canvas, and lightning-fast edge hosting."
      />
      
      <WebMakeNav activePage="features" />

      {/* Hero Header */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#3b82f6]/15 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#60a5fa] mb-6 backdrop-blur-md"
        >
          <span>⚡ Next-Gen AI Website Builder Capabilities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-black uppercase tracking-tight max-w-4xl mx-auto leading-tight"
        >
          Engineered for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a855f7] to-[#ec4899]">
            Speed, Beauty & Conversions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
        >
          WebMake merges autonomous AI generation with high-performance WebGL physics and intuitive visual editing so you can launch high-converting websites in minutes.
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-28">
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

      {/* ================= ANIMATED FAQ SECTION ================= */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden bg-[#07080e]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#60a5fa] text-xs font-bold uppercase tracking-widest mb-4">
              <span>💡</span>
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Everything You <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Need to Know</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-3 max-w-xl mx-auto font-light">
              Got questions about WebMake features? Here are answers to common questions about building, customizing, and publishing your dream site.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What time it takes to design and publish the website?",
                a: "You can generate a fully functional, interactive 3D website in under 60 seconds. Once generated, customize any element live and publish it immediately to a custom .digifox.world subdomain with automated SSL security."
              },
              {
                q: "Can I edit text, images, and brand details directly?",
                a: "Yes! Click directly on any text heading, description, or image in the live preview to edit it inline. You can customize fonts, colors, letter spacing, alignments, and animations with instant real-time feedback."
              },
              {
                q: "Can I connect my WhatsApp number for instant leads?",
                a: "Absolutely. With our built-in WhatsApp integration, you can place a customizable floating chat button on your website. Visitors can message you with one tap, sending pre-filled lead inquiries straight to your phone."
              },
              {
                q: "Are the generated websites mobile-friendly and fast?",
                a: "Every template is 100% responsive and built for ultra-fast performance. Layouts adapt fluidly to desktops, tablets, and phones, complete with high-performance CSS and optimized animations."
              },
              {
                q: "Do I need any coding or design experience?",
                a: "None at all! Simply describe your business or select one of our curated 3D or 2D templates. The AI crafts your layouts, copy, animations, and color schemes automatically."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-[#0c0d1a] border-blue-500/50 shadow-[0_8px_25px_rgba(59,130,246,0.1)]' 
                      : 'bg-[#0c0d1a]/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-white flex items-center gap-3">
                      <span className="text-xs font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                        0{idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`p-1.5 rounded-full flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/60'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
      <WebMakeFooter />
    </div>
  );
};
