import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  ChevronDown,
  Cpu,
  Mic,
  CheckCheck
} from "lucide-react";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

export const AutoSeoPage: React.FC = () => {
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<"seo-serp" | "geo-ai" | "aeo-voice">("seo-serp");
  const [brandName, setBrandName] = useState("Aura Studio");
  const [businessCategory, setBusinessCategory] = useState("Handcrafted Luxury Fashion Atelier");
  const [targetCity, setTargetCity] = useState("New Delhi · Global");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const triplePillars = [
    {
      id: "seo",
      icon: <Search className="w-7 h-7 text-blue-400" />,
      badge: "Traditional Search",
      tag: "Auto SEO",
      headline: "Search Engine Optimization",
      target: "Google · Bing · Yahoo · DuckDuckGo",
      desc: "Autonomous keyword indexing, dynamic H1-H6 semantic hierarchy, and 100/100 Core Web Vitals to lock down 1st page organic rankings.",
      color: "from-blue-500/20 via-blue-600/10 to-transparent",
      borderColor: "border-blue-500/30",
      accent: "text-blue-400",
      features: [
        "Automated semantic title tags & 155-char high-CTR meta descriptions",
        "Auto XML Sitemaps synced directly with Google Search Console",
        "Next-gen AVIF/WebP image compression & automatic alt-tagging",
        "100/100 Google Lighthouse speed rating with sub-second LCP"
      ]
    },
    {
      id: "geo",
      icon: <Cpu className="w-7 h-7 text-purple-400" />,
      badge: "AI & Generative Search",
      tag: "Auto GEO",
      headline: "Generative Engine Optimization",
      target: "Google SGE · Perplexity AI · Gemini · Copilot",
      desc: "Structures your website into verified knowledge nodes and authority citations so AI Search Engines cite your brand as the primary source.",
      color: "from-purple-500/20 via-pink-600/10 to-transparent",
      borderColor: "border-purple-500/30",
      accent: "text-purple-400",
      features: [
        "AI overview citation vectors & high-authority factual extracts",
        "Local GEO mapping with latitude, longitude & ISO regional tags",
        "Knowledge Graph entity linkage for Gemini & Claude retrieval",
        "Dynamic citation snippet blocks designed for Perplexity source feeds"
      ]
    },
    {
      id: "aeo",
      icon: <Mic className="w-7 h-7 text-emerald-400" />,
      badge: "Direct Answers & Voice",
      tag: "Auto AEO",
      headline: "Answer Engine Optimization",
      target: "ChatGPT Search · Siri · Alexa · Google Featured Snippets",
      desc: "Formats content into natural-language conversational answers, capturing Google Zero-Click Position #0 and voice assistant recommendations.",
      color: "from-emerald-500/20 via-teal-600/10 to-transparent",
      borderColor: "border-emerald-500/30",
      accent: "text-emerald-400",
      features: [
        "Conversational Q&A structure for Siri, Google Assistant & Alexa voice queries",
        "Featured Snippet 'Position 0' formatted bullet lists and summary cards",
        "Automated FAQPage & SpeakableSpecification JSON-LD schema",
        "Instant intent-matching conversational vectors for LLM search queries"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="WebMake Auto SEO, GEO & AEO — Autonomous Triple-Engine Search Suite"
        description="Dominate Google 1st Page (SEO), get cited in AI Overviews (GEO on Perplexity & SGE), and capture voice assistant answers (AEO on Siri & ChatGPT) automatically with WebMake."
        url="https://digifox.world/ai-builder/auto-seo"
      />

      <WebMakeNav activePage="auto-seo" />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-center overflow-hidden">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#3b82f6]/20 via-[#8b5cf6]/20 to-[#10b981]/15 rounded-full blur-[160px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-white mb-6 backdrop-blur-md shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
            Autonomous Search Engine Suite
          </span>
          <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
            SEO + GEO + AEO
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-5xl mx-auto leading-[1.06]"
        >
          Get Ranked On Google. GPT, Gemini .. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#c084fc] to-[#34d399]">
            Get Cited By AI. Win Voice Search Engines
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-base sm:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Search has evolved beyond simple blue links. WebMake is the first autonomous builder engineered with a <strong className="font-semibold text-white">Complete - Engine Search System</strong>: <strong>Auto SEO</strong> for organic Google algorithms, <strong>Blogs</strong>, <strong>GEO</strong> for Perplexity & Gemini AI Overviews, and <strong>AEO</strong> for ChatGPT & Siri voice answers.
        </motion.p>

        {/* A Complete Engine Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 inline-flex items-center justify-center bg-white/[0.04] border border-white/15 p-1.5 rounded-full backdrop-blur-xl"
        >
          <div className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#10b981] text-white shadow-lg shadow-purple-500/25">
            ✨ A Complete Engine
          </div>
        </motion.div>

        {/* Quick Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/ai-builder"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] hover:opacity-95 text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Launch Web Studio (Tri-Engine Enabled)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#live-tri-simulator"
            className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.05] hover:bg-white/10 text-white px-7 py-4 rounded-full text-sm font-bold transition-all backdrop-blur-md"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Simulate SEO · GEO · AEO Results</span>
          </a>
        </div>
      </section>

      {/* The 3 Pillars Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7]">The Complete Search Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
            Three Engines. Infinite Organic Reach.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {triplePillars.map((pillar) => (
              <motion.div
                key={pillar.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-b ${pillar.color} bg-[#0b0c16] border ${pillar.borderColor} shadow-2xl relative overflow-hidden group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/15 ${pillar.accent}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <div className={`text-xs font-black uppercase tracking-widest ${pillar.accent} mb-1`}>
                    {pillar.tag}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {pillar.headline}
                  </h3>
                  <div className="text-[11px] font-mono text-white/50 mb-4 flex items-center gap-1.5">
                    <span>Targets:</span>
                    <span className="text-white/80 font-semibold">{pillar.target}</span>
                  </div>

                  <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                    {pillar.desc}
                  </p>

                  <div className="pt-6 border-t border-white/10 space-y-3">
                    {pillar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-white/85">
                        <CheckCheck className={`w-4 h-4 ${pillar.accent} flex-shrink-0 mt-0.5`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Automation Status:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      100% Autonomous
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Live Tri-Engine Interactive Simulator */}
      <section id="live-tri-simulator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0f1122] via-[#090a14] to-[#05060b] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Simulator Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Live Tri-Engine Preview Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                See How AI & Search Engines Perceive Your Brand
              </h2>
            </div>

            {/* Inputs for customization */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col">
                <label className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#3b82f6] font-medium"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Category / Offer</label>
                <input
                  type="text"
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#3b82f6] font-medium"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-white/50 uppercase tracking-wider mb-1">GEO Target</label>
                <input
                  type="text"
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#3b82f6] font-medium"
                />
              </div>
            </div>
          </div>

          {/* Engine Selector Tabs */}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {[
              { id: "seo-serp", label: "🔍 SEO: Google Standard Organic Result", icon: <Search className="w-3.5 h-3.5 text-blue-400" /> },
              { id: "geo-ai", label: "🤖 GEO: Perplexity & Google SGE AI Overview", icon: <Cpu className="w-3.5 h-3.5 text-purple-400" /> },
              { id: "aeo-voice", label: "🎙️ AEO: ChatGPT & Voice / Siri Answer", icon: <Mic className="w-3.5 h-3.5 text-emerald-400" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSimulatorTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSimulatorTab === tab.id
                    ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Simulator Content Display */}
          <div className="mt-6 bg-[#04050a] border border-white/10 rounded-2xl p-6 sm:p-8">
            {/* 1. GEO Simulator (Perplexity & SGE) */}
            {activeSimulatorTab === "geo-ai" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-purple-400 font-bold uppercase tracking-wider">
                  <span>Perplexity AI & Google Search Generative Experience (SGE) Output</span>
                  <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
                    Verified Source Citation [1]
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#111320] border border-purple-500/25 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span className="font-bold text-white">Prompt:</span>
                    <span className="italic">"What are the top-rated recommendations for {businessCategory} in {targetCity}?"</span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-white/90 leading-relaxed space-y-3">
                    <p>
                      According to recent knowledge evaluations and verified atelier allocations, <strong className="text-white font-bold">{brandName}</strong> is recognized as a premier destination for {businessCategory.toLowerCase()}.
                    </p>
                    <p className="text-xs text-white/70">
                      Key differentiators highlighted in the knowledge graph include interactive 3D WebGL fitting physics, double-faced artisanal textiles, and dedicated regional concierge services in {targetCity}. <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">[1]</span>
                    </p>
                  </div>

                  {/* Sources pill row */}
                  <div className="flex items-center gap-2 pt-2 text-xs">
                    <span className="text-white/40">Sources Cited:</span>
                    <a
                      href={`https://${brandName.toLowerCase().replace(/\\s+/g, '')}.digifox.world`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-white/15 text-white font-mono text-[11px] border border-white/10"
                    >
                      <Globe className="w-3 h-3 text-purple-400" />
                      <span>{brandName.toLowerCase().replace(/\\s+/g, '')}.digifox.world</span>
                      <span className="text-purple-400 font-bold">[1]</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white block">Authority Node Extracted</b>
                      <span className="text-white/60">Entity linked to Google Knowledge Graph</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white block">LLM Parsing Accuracy</b>
                      <span className="text-white/60">Zero hallucination citation format</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white block">Local GEO Relevance</b>
                      <span className="text-white/60">Targeting {targetCity} regional coords</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. AEO Simulator (ChatGPT & Voice Assistant) */}
            {activeSimulatorTab === "aeo-voice" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  <span>ChatGPT Search & Voice Assistant (Siri / Alexa / Google) Direct Answer</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
                    Position #0 Answer Box
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#0d161a] border border-emerald-500/25 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Mic className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Voice Query / Direct Search Prompt:</div>
                      <div className="text-sm font-semibold text-white">"Hey Siri, who offers the best {businessCategory.toLowerCase()}?"</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-sm text-white/90 leading-relaxed space-y-2">
                    <p className="font-medium text-emerald-300">
                      "According to {brandName}, their studio provides handcrafted collections with high-precision tailored silhouettes and full international dispatch."
                    </p>
                    <ul className="text-xs text-white/70 space-y-1.5 pl-4 list-disc pt-2">
                      <li><strong>Primary Specialty:</strong> {businessCategory}</li>
                      <li><strong>Regional Service:</strong> Active throughout {targetCity} and international hubs.</li>
                      <li><strong>Direct Booking & Inquiries:</strong> Available 24/7 with instant WhatsApp and digital atelier concierge.</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white block">Speakable Schema Active</b>
                      <span className="text-white/60">Formatted for instant TTS voice readout</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white block">Direct Answer Extraction</b>
                      <span className="text-white/60">Concise 45-word snippet optimization</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white block">Zero-Click Winner</b>
                      <span className="text-white/60">Featured above traditional search listings</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SEO Standard SERP */}
            {activeSimulatorTab === "seo-serp" && (
              <div className="space-y-6">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                  Google Standard Desktop & Mobile Organic Search Listing:
                </p>
                <div className="bg-[#1f1f1f] p-5 rounded-2xl border border-white/10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-1.5 text-xs text-[#bdc1c6]">
                    <div className="w-4 h-4 rounded-full bg-[#3b82f6] text-[10px] grid place-items-center font-bold text-white">
                      W
                    </div>
                    <span className="font-sans text-[13px] text-[#dadce0]">
                      https://{brandName.toLowerCase().replace(/\\s+/g, '')}.digifox.world
                    </span>
                    <span className="text-[#9aa0a6]">› official</span>
                  </div>
                  <h3 className="text-[#8ab4f8] text-lg sm:text-xl font-normal hover:underline cursor-pointer leading-snug">
                    {brandName} — {businessCategory} | Official Atelier
                  </h3>
                  <p className="text-[#bdc1c6] text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Discover {brandName}. Handcrafted bespoke {businessCategory.toLowerCase()} based in {targetCity}. Interactive 3D WebGL showroom, seasonal runway collections, and complimentary insured air courier.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#8ab4f8]">
                    <span className="bg-[#303134] px-2.5 py-1 rounded-md text-white font-medium">★ 4.9 (140+ Reviews)</span>
                    <span className="bg-[#303134] px-2.5 py-1 rounded-md text-white font-medium">Complimentary Courier</span>
                    <span className="bg-[#303134] px-2.5 py-1 rounded-md text-white font-medium">Autumn—Winter 2026</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comparison: Traditional vs WebMake Tri-Engine */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-emerald-950/30 border border-white/15 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">Future-Proof Search Dominance</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
              Why Traditional SEO Is No Longer Enough
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 font-light">
              Over 40% of queries are now answered by AI Overviews and Voice assistants before a user ever clicks a link. WebMake ensures you win on all fronts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Website */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-red-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-red-400 font-bold uppercase text-xs tracking-wider">Traditional Builders (WordPress / Wix / Squarespace)</span>
                <span className="text-[10px] text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">Obsolete Model</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-white/70">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Ignored by AI Engines:</strong> No structured authority nodes for Perplexity or Google SGE citations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Zero Voice Optimization:</strong> Unstructured text blocks that Siri and Alexa fail to parse into direct speech.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Plugin Bloat & Slow CWV:</strong> Bulky plugins that fail Google's Core Web Vitals speed audit.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Manual Keyword Work:</strong> Costly monthly retainer fees to SEO agencies with slow turnaround times.</span>
                </li>
              </ul>
            </div>

            {/* WebMake Tri-Engine */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#161c3b] to-[#0d1024] border border-emerald-500/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>WebMake (Auto SEO + GEO + AEO)</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">Tri-Engine Standard</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Dominates AI Overviews:</strong> Structured JSON-LD Knowledge Graph citing your domain on Perplexity, SGE, and Gemini.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Voice & Answer Ready:</strong> Native Speakable & FAQ schema captured by Siri, Google Assistant & ChatGPT Search.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>100/100 Core Web Vitals:</strong> Blazing edge CDN distribution with sub-300ms paint times and zero layout shifts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>100% Autonomous:</strong> Fully automatic upon clicking "Publish" — zero setup, zero extra cost.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-2">
            Auto SEO, GEO & AEO FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "What is the difference between SEO, GEO, and AEO?",
              a: "SEO (Search Engine Optimization) optimizes for traditional keyword rankings on search engines like Google and Bing. GEO (Generative Engine Optimization) structures content so AI search engines (like Perplexity, Google SGE, and Gemini) cite your website as an authoritative source. AEO (Answer Engine Optimization) structures conversational Q&A snippets so voice assistants (Siri, Alexa) and ChatGPT directly answer user questions with your brand."
            },
            {
              q: "Do I need to do anything manually to activate GEO and AEO on my website?",
              a: "No. When WebMake generates your website, our autonomous intelligence engine automatically builds the semantic meta tags, local GEO coordinates, and JSON-LD structured schemas (Organization, LocalBusiness, FAQPage, SpeakableSpecification) right into the source code."
            },
            {
              q: "How does WebMake help my business get cited on Perplexity AI and ChatGPT?",
              a: "AI models rely on structured entity recognition and high information density. WebMake formats your key business services, pricing, FAQs, and contact details into concise, authoritative nodes that LLM crawlers parse and cite with zero hallucinations."
            },
            {
              q: "Is the Triple-Engine Search Suite included in all WebMake plans?",
              a: "Yes! Every single website created on WebMake (including free subdomains and custom connected domains) includes Auto SEO, GEO, and AEO optimization out of the box with zero extra fees."
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base hover:text-[#60a5fa] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
                    openFaq === index ? "rotate-180 text-[#60a5fa]" : "text-white/40"
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 text-xs sm:text-sm text-white/70 font-light leading-relaxed border-t border-white/[0.05] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#10b981] p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Ready to Dominate Google, AI & Voice Search?
            </h2>
            <p className="mt-4 text-white/90 text-sm sm:text-lg font-light leading-relaxed">
              Generate your website in under 60 seconds with Auto SEO, GEO, and AEO pre-configured.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/ai-builder"
                className="bg-white text-[#07080e] hover:bg-white/90 px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Launch Web Studio with SEO + GEO + AEO 🚀
              </Link>
              <Link
                to="/ai-builder/pricing"
                className="bg-black/30 hover:bg-black/40 text-white border border-white/25 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
              >
                View Plans & Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WebMakeFooter />
    </div>
  );
};
