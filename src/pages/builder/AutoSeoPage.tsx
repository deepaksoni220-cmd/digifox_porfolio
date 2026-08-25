import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Zap, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Activity, 
  Share2, 
  FileCode2, 
  Bot, 
  Copy, 
  Check,
  ChevronDown
} from "lucide-react";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

export const AutoSeoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"audit" | "schema" | "geo" | "vitals">("audit");
  const [simulatedUrl, setSimulatedUrl] = useState("mybrand.digifox.world");
  const [simulatedKeyword, setSimulatedKeyword] = useState("Handcrafted Luxury Fashion Atelier");
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const seoFeatures = [
    {
      icon: <Bot className="w-6 h-6 text-blue-400" />,
      tag: "Autonomous Intelligence",
      title: "Zero-Click AI Semantic Tagging",
      desc: "WebMake analyzes your generated website content, automatically drafting optimal H1-H6 hierarchy, semantic meta titles, keyword-dense descriptions, and alt tags for every image.",
      badge: "Automated"
    },
    {
      icon: <FileCode2 className="w-6 h-6 text-purple-400" />,
      tag: "JSON-LD Schemas",
      title: "Rich Snippets & Google Schema Markup",
      desc: "Instantly injects structured JSON-LD schemas for Organizations, Products, FAQs, Local Businesses, and Breadcrumbs to dominate Google rich search carousels.",
      badge: "Google Certified"
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      tag: "Local & Global Search",
      title: "GEO-Targeting & Multi-Region SEO",
      desc: "Optimized for Google Local Pack, Apple Maps, and local search queries. Automatically builds hreflang coordinates, region tags, and localized keyword intent.",
      badge: "GEO Engine"
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      tag: "Core Web Vitals",
      title: "100/100 Google Speed & Lighthouse Score",
      desc: "Instant sub-second loading through edge CDN minification, next-gen WebP/AVIF auto-compression, zero CLS shift, and asynchronous font preloading.",
      badge: "100/100 CWV"
    },
    {
      icon: <Share2 className="w-6 h-6 text-pink-400" />,
      tag: "Social Graph",
      title: "High-CTR OpenGraph & Twitter Cards",
      desc: "Generates rich dynamic preview cards for WhatsApp, iMessage, Twitter/X, and LinkedIn so your links stand out with high-resolution imagery and compelling hooks.",
      badge: "Viral CTR"
    },
    {
      icon: <Activity className="w-6 h-6 text-cyan-400" />,
      tag: "Continuous Indexing",
      title: "Auto XML Sitemaps & Search Console Ping",
      desc: "Automatically updates and pings your sitemap.xml and robots.txt to Google Search Console and Bing Webmaster the exact second you publish updates.",
      badge: "Instant Index"
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const sampleSchema = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${simulatedKeyword}",
  "url": "https://${simulatedUrl}",
  "logo": "https://${simulatedUrl}/logo.png",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://${simulatedUrl}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "telephone": "+91-8696755996",
    "areaServed": "Global"
  }
}`;

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="WebMake Auto SEO — Autonomous AI Search Engine & GEO Optimization Engine"
        description="Rank #1 on Google effortlessly with WebMake Auto SEO. Automated JSON-LD schema generation, semantic metadata, GEO local pack targeting, and 100/100 Core Web Vitals."
        url="https://digifox.world/ai-builder/auto-seo"
      />

      <WebMakeNav activePage="auto-seo" />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto text-center overflow-hidden">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#3b82f6]/20 via-[#8b5cf6]/20 to-[#ec4899]/15 rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 text-xs font-bold uppercase tracking-widest text-[#60a5fa] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span>Autonomous AI Search Engine Optimization</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-5xl mx-auto leading-[1.08]"
        >
          Rank #1 On Google <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a855f7] to-[#ec4899]">
            Without Touching A Line Of Code
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-base sm:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed"
        >
          WebMake <strong className="font-semibold text-white">AUTO SEO</strong> continuously scans, writes JSON-LD structured schemas, optimizes GEO keywords, and tunes Core Web Vitals to deliver maximum organic traffic on autopilot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/ai-builder"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] hover:opacity-95 text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Launch Web Studio with Auto SEO</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#live-simulator"
            className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.05] hover:bg-white/10 text-white px-7 py-4 rounded-full text-sm font-bold transition-all backdrop-blur-md"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Try Live SEO Simulator</span>
          </a>
        </motion.div>

        {/* Metric Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { metric: "100 / 100", label: "Core Web Vitals", sub: "Google Lighthouse Speed" },
            { metric: "< 24 Hrs", label: "Google Indexing", sub: "Automated Sitemap Push" },
            { metric: "100%", label: "Rich Snippets", sub: "Valid JSON-LD Schema" },
            { metric: "3.4x", label: "Organic CTR Boost", sub: "Semantic Meta Tags" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {item.metric}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">{item.label}</div>
              <div className="text-[11px] text-white/50">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Auto SEO Simulator */}
      <section id="live-simulator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0f111f] to-[#080911] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60a5fa] mb-2">
                <Search className="w-4 h-4" />
                <span>Interactive Auto SEO Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Live Meta & Schema Generation Preview
              </h2>
            </div>

            {/* Subdomain Input Simulator */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center bg-black/50 border border-white/20 rounded-xl px-3 py-2">
                <span className="text-xs text-white/40 mr-1">https://</span>
                <input
                  type="text"
                  value={simulatedUrl}
                  onChange={(e) => setSimulatedUrl(e.target.value)}
                  placeholder="yourbrand.digifox.world"
                  className="bg-transparent text-xs text-white outline-none w-48 font-mono"
                />
              </div>
              <div className="flex items-center bg-black/50 border border-white/20 rounded-xl px-3 py-2">
                <input
                  type="text"
                  value={simulatedKeyword}
                  onChange={(e) => setSimulatedKeyword(e.target.value)}
                  placeholder="Primary Business Keyword"
                  className="bg-transparent text-xs text-white outline-none w-52"
                />
              </div>
            </div>
          </div>

          {/* Simulator Tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            {[
              { id: "audit", label: "Google SERP Result Preview" },
              { id: "schema", label: "Structured JSON-LD Schema" },
              { id: "geo", label: "GEO & Local Pack Meta" },
              { id: "vitals", label: "Core Web Vitals Audit" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#3b82f6] text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Simulator Content Area */}
          <div className="mt-6 bg-[#07080e] border border-white/10 rounded-2xl p-6 sm:p-8">
            {activeTab === "audit" && (
              <div className="space-y-6">
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                  Google Desktop & Mobile Search Result Snippet:
                </p>
                {/* Google Card Simulator */}
                <div className="bg-[#1f1f1f] p-5 rounded-2xl border border-white/10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-1.5 text-xs text-[#bdc1c6]">
                    <div className="w-4 h-4 rounded-full bg-[#3b82f6] text-[10px] grid place-items-center font-bold text-white">
                      W
                    </div>
                    <span className="font-sans text-[13px] text-[#dadce0]">https://{simulatedUrl}</span>
                    <span className="text-[#9aa0a6]">› official</span>
                  </div>
                  <h3 className="text-[#8ab4f8] text-lg sm:text-xl font-normal hover:underline cursor-pointer leading-snug">
                    {simulatedKeyword} — Official Online Boutique & Studio
                  </h3>
                  <p className="text-[#bdc1c6] text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Explore handcrafted collections from {simulatedKeyword}. Experience interactive 3D WebGL visuals, bespoke tailoring, complimentary insured international courier, and award-winning craftsmanship.
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-[#8ab4f8]">
                    <span className="bg-[#303134] px-2.5 py-1 rounded-md text-white font-medium">★ 4.9 (120+ Reviews)</span>
                    <span className="bg-[#303134] px-2.5 py-1 rounded-md text-white font-medium">Free Worldwide Courier</span>
                    <span className="bg-[#303134] px-2.5 py-1 rounded-md text-white font-medium">2026 Collection</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-white">Title Tag Optimality</h4>
                      <p className="text-[11px] text-white/60">56 Characters · 100% Google Match</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-white">Meta Description</h4>
                      <p className="text-[11px] text-white/60">155 Characters · High-CTR Callout</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-white">Canonical Link</h4>
                      <p className="text-[11px] text-white/60">Auto Self-Referencing Tag Active</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schema" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60 font-mono">Structured Data · type: Organization & LocalBusiness</span>
                  <button
                    onClick={() => handleCopy(sampleSchema)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Copied!" : "Copy JSON-LD"}</span>
                  </button>
                </div>
                <pre className="p-4 bg-[#030408] border border-white/10 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                  {sampleSchema}
                </pre>
              </div>
            )}

            {activeTab === "geo" && (
              <div className="space-y-4">
                <p className="text-xs text-white/70">
                  WebMake automatically injects Geographic coordinates, ISO country/currency tags, and OpenGraph localization so local buyers find your brand on top of search results:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                    <span className="text-xs font-bold uppercase text-[#d58d3f]">Regional Target Headers</span>
                    <ul className="text-xs text-white/80 space-y-1 font-mono">
                      <li>&lt;meta name="geo.region" content="IN-DL" /&gt;</li>
                      <li>&lt;meta name="geo.placename" content="New Delhi" /&gt;</li>
                      <li>&lt;meta name="geo.position" content="28.6139;77.2090" /&gt;</li>
                      <li>&lt;meta name="ICBM" content="28.6139, 77.2090" /&gt;</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                    <span className="text-xs font-bold uppercase text-[#3b82f6]">OpenGraph & Social Currency</span>
                    <ul className="text-xs text-white/80 space-y-1 font-mono">
                      <li>&lt;meta property="og:locale" content="en_IN" /&gt;</li>
                      <li>&lt;meta property="og:type" content="business.business" /&gt;</li>
                      <li>&lt;meta property="og:site_name" content="{simulatedKeyword}" /&gt;</li>
                      <li>&lt;meta name="twitter:card" content="summary_large_image" /&gt;</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vitals" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <span className="text-2xl font-black text-emerald-400">0.32s</span>
                    <p className="text-[11px] font-bold uppercase text-white mt-1">LCP (Largest Paint)</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">Good (&lt; 2.5s)</span>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <span className="text-2xl font-black text-emerald-400">12ms</span>
                    <p className="text-[11px] font-bold uppercase text-white mt-1">FID (Interaction)</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">Good (&lt; 100ms)</span>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <span className="text-2xl font-black text-emerald-400">0.000</span>
                    <p className="text-[11px] font-bold uppercase text-white mt-1">CLS (Layout Shift)</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">Zero Shift</span>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <span className="text-2xl font-black text-emerald-400">100 / 100</span>
                    <p className="text-[11px] font-bold uppercase text-white mt-1">SEO Health Score</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">Flawless</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
            <Layers className="w-4 h-4" />
            <span>Autonomous Engine Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Built-in Organic Growth Superpowers
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 font-light">
            Every website created with WebMake comes pre-configured with industry-leading optimization pipelines that SEO agencies charge thousands of dollars for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seoFeatures.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-8 rounded-3xl bg-[#0c0d1a] border border-white/[0.08] hover:border-[#3b82f6]/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    {feat.badge}
                  </span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#60a5fa] mb-1">
                  {feat.tag}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEO Comparison: Standard vs WebMake Auto SEO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/10 border border-white/15">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">The WebMake Advantage</span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-2">
              Manual SEO vs. WebMake Auto SEO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manual SEO */}
            <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs tracking-wider">
                <span>Traditional Web Builders (Wix / WP)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Requires bulky 3rd party plugins (Yoast/RankMath) that slow down page speeds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Manual Schema creation requiring developer knowledge or paid addons.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Bloated theme scripts failing Google's Core Web Vitals audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>No automated AI keyword regeneration when updating copy.</span>
                </li>
              </ul>
            </div>

            {/* WebMake Auto SEO */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#151c38] to-[#0d1020] border border-blue-500/40 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>WebMake AUTO SEO Engine</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>100% native autonomous engine — zero extra plugins, zero performance penalty.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Automated JSON-LD schemas generated for every product, service, and FAQ block.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>100/100 Lighthouse score with edge caching and sub-second paint times.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Real-time sitemap sync to Google Search Console on publish.</span>
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
            Auto SEO Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does WebMake Auto SEO generate keywords and titles automatically?",
              a: "WebMake uses our trained autonomous AI model to analyze the copy, industry category, and target audience of your website. It extracts high-intent search terms and automatically structures semantic title tags, meta descriptions, and image alt text that match searcher intent."
            },
            {
              q: "Do I need to install any external plugins for Google Schema?",
              a: "No! All JSON-LD structured schemas (Organization, Product, LocalBusiness, FAQ, Breadcrumbs) are generated natively and injected directly into the HTML head upon site generation."
            },
            {
              q: "Does Auto SEO support local GEO businesses and Google Maps ranking?",
              a: "Yes. WebMake includes geographic coordinates, ISO country/currency tags, and OpenGraph localization so local buyers and Google's Local 3-Pack easily index your business location."
            },
            {
              q: "Can I manually customize the meta tags if I have specific keywords?",
              a: "Absolutely. While WebMake auto-generates high-performing defaults, you can click directly on the live visual editor or SEO settings panel to edit titles, descriptions, and OpenGraph social share cards anytime."
            },
            {
              q: "Is Auto SEO included in all WebMake plans?",
              a: "Yes! Every single site built on WebMake (including free subdomains and custom domains) receives full Auto SEO, Core Web Vitals optimization, and XML sitemap generation at no extra charge."
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
        <div className="relative rounded-3xl bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Ready to Drive High-Converting Organic Traffic?
            </h2>
            <p className="mt-4 text-white/90 text-sm sm:text-lg font-light leading-relaxed">
              Launch your autonomous 3D & 2D website with full Auto SEO enabled in less than 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/ai-builder"
                className="bg-white text-[#07080e] hover:bg-white/90 px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Launch Web Studio with Auto SEO 🚀
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
