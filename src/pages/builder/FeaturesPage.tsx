import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

// Animated SVG Icon Components for Features
const AnimatedAiIcon: React.FC = () => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
    <motion.svg
      viewBox="0 0 48 48"
      className="w-12 h-12 relative z-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Outer rotating dashed ring */}
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        stroke="url(#aiGrad)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      {/* Neural diamond connection */}
      <motion.path
        d="M16 24L24 16L32 24L24 32Z"
        stroke="#93C5FD"
        strokeWidth="1.5"
        fill="rgba(59, 130, 246, 0.18)"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
      {/* Center Spark / Brain Core */}
      <motion.circle
        cx="24"
        cy="24"
        r="4"
        fill="#FFFFFF"
        animate={{ scale: [0.85, 1.3, 0.85], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Orbiting energy spark */}
      <motion.circle
        cx="24"
        cy="8"
        r="2.5"
        fill="#60A5FA"
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "24px 24px" }}
      />
      {/* Satellite nodes */}
      <circle cx="16" cy="24" r="2" fill="#93C5FD" />
      <circle cx="32" cy="24" r="2" fill="#93C5FD" />
      <circle cx="24" cy="16" r="2" fill="#93C5FD" />
      <circle cx="24" cy="32" r="2" fill="#93C5FD" />
    </motion.svg>
  </div>
);

const Animated3dIcon: React.FC = () => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
    <motion.svg
      viewBox="0 0 48 48"
      className="w-12 h-12 relative z-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Top Face */}
      <motion.path
        d="M24 7L38 15L24 23L10 15Z"
        fill="rgba(192, 132, 252, 0.28)"
        stroke="url(#cubeGrad)"
        strokeWidth="1.5"
        animate={{ y: [-1.5, 2, -1.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Left Face */}
      <motion.path
        d="M10 15L24 23V39L10 31Z"
        fill="rgba(168, 85, 247, 0.18)"
        stroke="url(#cubeGrad)"
        strokeWidth="1.5"
        animate={{ y: [-1.5, 2, -1.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right Face */}
      <motion.path
        d="M24 23L38 15V31L24 39Z"
        fill="rgba(236, 72, 153, 0.22)"
        stroke="url(#cubeGrad)"
        strokeWidth="1.5"
        animate={{ y: [-1.5, 2, -1.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Floating internal core orb */}
      <motion.circle
        cx="24"
        cy="23"
        r="3"
        fill="#F472B6"
        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Corner Vertices */}
      <circle cx="24" cy="7" r="1.8" fill="#FFFFFF" />
      <circle cx="38" cy="15" r="1.8" fill="#FFFFFF" />
      <circle cx="10" cy="15" r="1.8" fill="#FFFFFF" />
      <circle cx="24" cy="39" r="1.8" fill="#FFFFFF" />
    </motion.svg>
  </div>
);

const AnimatedVisualEditIcon: React.FC = () => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
    <motion.svg
      viewBox="0 0 48 48"
      className="w-12 h-12 relative z-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="editGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
      {/* Bounding box with dashed alignment line */}
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="6"
        stroke="url(#editGrad)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="rgba(16, 185, 129, 0.08)"
      />
      {/* Corner transform handles */}
      <rect x="7" y="7" width="4" height="4" rx="1" fill="#34D399" />
      <rect x="37" y="7" width="4" height="4" rx="1" fill="#34D399" />
      <rect x="7" y="37" width="4" height="4" rx="1" fill="#34D399" />
      <rect x="37" y="37" width="4" height="4" rx="1" fill="#34D399" />
      {/* Animated Pen / Magic Wand Tool moving */}
      <motion.g
        animate={{
          x: [0, 3, -2, 0],
          y: [0, -3, 2, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M20 28L28 20L31 23L23 31L18 32L20 28Z"
          fill="url(#editGrad)"
          stroke="#A7F3D0"
          strokeWidth="1"
        />
        {/* Wand tip sparkle */}
        <motion.circle
          cx="33"
          cy="18"
          r="1.8"
          fill="#FFFFFF"
          animate={{ scale: [0.4, 1.5, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="36"
          cy="22"
          r="1.2"
          fill="#6EE7B7"
          animate={{ scale: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
        />
      </motion.g>
    </motion.svg>
  </div>
);

const AnimatedHostingSslIcon: React.FC = () => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
    <motion.svg
      viewBox="0 0 48 48"
      className="w-12 h-12 relative z-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* Globe Meridian Outer Circle */}
      <circle cx="24" cy="24" r="17" stroke="url(#hostGrad)" strokeWidth="1.4" strokeOpacity="0.4" fill="rgba(245, 158, 11, 0.05)" />
      <ellipse cx="24" cy="24" rx="8" ry="17" stroke="url(#hostGrad)" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="7" y1="24" x2="41" y2="24" stroke="url(#hostGrad)" strokeWidth="1.2" strokeOpacity="0.6" />
      
      {/* Orbiting Satellite / CDN node */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "24px 24px" }}
      >
        <circle cx="24" cy="5" r="2.5" fill="#FDE68A" />
        <circle cx="24" cy="5" r="4.5" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="2 2" />
      </motion.g>

      {/* SSL Lock Shield in the center */}
      <motion.g
        animate={{ y: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="18" y="21" width="12" height="10" rx="2.5" fill="url(#hostGrad)" stroke="#FEF3C7" strokeWidth="1" />
        <path d="M21 21V18C21 16.34 22.34 15 24 15C25.66 15 27 16.34 27 18V21" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="26" r="1.3" fill="#18181B" />
      </motion.g>
    </motion.svg>
  </div>
);

const AnimatedLeadCaptureIcon: React.FC = () => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
    <motion.svg
      viewBox="0 0 48 48"
      className="w-12 h-12 relative z-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* Radiating pulse waves */}
      <motion.path
        d="M33 13C37 17 37 23 33 27"
        stroke="#67E8F9"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M37 9C43 15 43 25 37 31"
        stroke="#22D3EE"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Main Chat Bubble */}
      <motion.path
        d="M10 24C10 16.27 16.27 10 24 10C31.73 10 38 16.27 38 24C38 31.73 31.73 38 24 38C21.2 38 18.6 37.18 16.4 35.77L9 38L10.77 31.2C9.65 29.07 9 26.63 9 24"
        fill="rgba(6, 182, 212, 0.16)"
        stroke="url(#leadGrad)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Typing animation dots */}
      <motion.circle
        cx="18"
        cy="24"
        r="2"
        fill="#A5F3FC"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="2"
        fill="#A5F3FC"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle
        cx="30"
        cy="24"
        r="2"
        fill="#A5F3FC"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
      />
    </motion.svg>
  </div>
);

const AnimatedPerformanceIcon: React.FC = () => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <div className="absolute inset-0 bg-fuchsia-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
    <motion.svg
      viewBox="0 0 48 48"
      className="w-12 h-12 relative z-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="perfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
      </defs>

      {/* Speedometer Arc */}
      <path
        d="M10 32C8 28 8 20 13 14C19 8 29 8 35 14C40 20 40 28 38 32"
        stroke="url(#perfGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
        fill="none"
      />

      {/* Gauge ticks */}
      <circle cx="12" cy="30" r="1.5" fill="#F472B6" />
      <circle cx="16" cy="18" r="1.5" fill="#F472B6" />
      <circle cx="24" cy="12" r="1.8" fill="#F43F5E" />
      <circle cx="32" cy="18" r="1.5" fill="#F472B6" />
      <circle cx="36" cy="30" r="1.5" fill="#F472B6" />

      {/* Rotating Speed Needle */}
      <motion.g
        animate={{ rotate: [-40, 45, 10, 50, -30] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "24px 30px" }}
      >
        <line x1="24" y1="30" x2="31" y2="15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="30" r="3.5" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1.2" />
      </motion.g>

      {/* Score Badge: 100 */}
      <motion.rect
        x="17"
        y="34"
        width="14"
        height="6"
        rx="3"
        fill="#F43F5E"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="24" y="38.5" fontSize="4.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">
        100
      </text>
    </motion.svg>
  </div>
);

export const FeaturesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const coreFeatures: {
    icon: React.ReactNode;
    tag: string;
    title: string;
    desc: string;
    gradient: string;
    border: string;
  }[] = [
    {
      icon: <AnimatedAiIcon />,
      tag: "AI Intelligence",
      title: "Prompt to Your Sales Machine Website",
      desc: "Simply describe your business, niche, or product in plain words. WebMake generates structured sections, headlines, benefit blocks, and call-to-actions instantly.",
      gradient: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30"
    },
    {
      icon: <Animated3dIcon />,
      tag: "3D WebGL Canvas",
      title: "Interactive 3D Animated Physics",
      desc: "Bring your website to life with real-time 3D models, smooth camera scroll-triggers, particle dynamics, and realistic lighting that keeps visitors hooked.",
      gradient: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/30"
    },
    {
      icon: <AnimatedVisualEditIcon />,
      tag: "Visual Customizer",
      title: "Unlimited Customize, Click-to-Edit Studio",
      desc: "Click directly on any text, heading, or image in your live preview. Fine-tune font sizes, letter-spacing, line-heights, animations, and color tones in seconds.",
      gradient: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30"
    },
    {
      icon: <AnimatedHostingSslIcon />,
      tag: "Hosting & SSL",
      title: "Free Subdomains & Hosting and SSL's",
      desc: "Publish instantly to your free *.digifox.world subdomain or connect your company domain (yourbrand.com) with automatic global SSL certificates.",
      gradient: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30"
    },
    {
      icon: <AnimatedLeadCaptureIcon />,
      tag: "Lead Capture",
      title: "Instant WhatsApp & Call Integrations",
      desc: "Connect directly with incoming prospects through high-converting floating contact bubbles and fast inquiry capture forms on every page.",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30"
    },
    {
      icon: <AnimatedPerformanceIcon />,
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
                  <div className="flex items-center justify-center">
                    {feat.icon}
                  </div>
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
