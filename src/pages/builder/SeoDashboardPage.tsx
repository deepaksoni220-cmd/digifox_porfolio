import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Globe,
  Cpu,
  Mic,
  CheckCircle2,
  Play,
  RotateCw,
  Plus,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  Download,
  Copy,
  Check,
  Settings,
  BarChart3,
  TrendingUp,
  FileText,
  RefreshCw,
  X,
  Code
} from "lucide-react";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

export interface ClientProfile {
  id: string;
  name: string;
  url: string;
  platform: "wordpress" | "shopify" | "custom";
  platformDetails: {
    apiUrl?: string;
    authKey?: string;
    storeDomain?: string;
    autoPublish: boolean;
  };
  industry: string;
  targetRegion: string;
  seedKeywords: string[];
  lastAudit: string;
  scores: {
    seo: number;
    geo: number;
    aeo: number;
  };
  metrics: {
    impressions: string;
    clicks: string;
    aiCitations: number;
    voiceAnswers: number;
    indexedPages: number;
  };
  connected: boolean;
}

const DEFAULT_CLIENTS: ClientProfile[] = [
  {
    id: "client-1",
    name: "Aura Studio Paris",
    url: "https://aurastudio.luxury",
    platform: "shopify",
    platformDetails: {
      storeDomain: "aura-paris.myshopify.com",
      authKey: "shpat_78934df9872bc9102",
      autoPublish: true
    },
    industry: "Luxury Fashion & Atelier",
    targetRegion: "Paris · New York · London",
    seedKeywords: ["luxury bespoke atelier", "handcrafted couture paris", "sustainable runway tailoring"],
    lastAudit: "2 hours ago",
    scores: { seo: 98, geo: 96, aeo: 94 },
    metrics: {
      impressions: "142.8K",
      clicks: "18.4K",
      aiCitations: 864,
      voiceAnswers: 342,
      indexedPages: 128
    },
    connected: true
  },
  {
    id: "client-2",
    name: "HydroFlow Bio-Tech",
    url: "https://hydroflow-drink.com",
    platform: "wordpress",
    platformDetails: {
      apiUrl: "https://hydroflow-drink.com/wp-json/wp/v2",
      authKey: "wp_app_pass_918237192",
      autoPublish: true
    },
    industry: "Smart Hydration & Functional Beverages",
    targetRegion: "United States · Canada",
    seedKeywords: ["electrolyte smart hydration", "cellular hydration drink", "bio-available zero sugar electrolytes"],
    lastAudit: "Just now",
    scores: { seo: 96, geo: 98, aeo: 92 },
    metrics: {
      impressions: "96.4K",
      clicks: "12.1K",
      aiCitations: 612,
      voiceAnswers: 218,
      indexedPages: 84
    },
    connected: true
  },
  {
    id: "client-3",
    name: "Intik Gourmet Burgers",
    url: "https://intikburgers.com",
    platform: "custom",
    platformDetails: {
      apiUrl: "https://api.intikburgers.com/v1/seo-webhook",
      authKey: "sec_tok_intik_8719283",
      autoPublish: false
    },
    industry: "Artisanal Fast-Casual Dining",
    targetRegion: "Mumbai · Dubai",
    seedKeywords: ["smash burgers near me", "best gourmet burger delivery", "wagyu beef craft burger"],
    lastAudit: "1 day ago",
    scores: { seo: 94, geo: 92, aeo: 95 },
    metrics: {
      impressions: "68.2K",
      clicks: "8.9K",
      aiCitations: 420,
      voiceAnswers: 580,
      indexedPages: 46
    },
    connected: true
  }
];

export const SeoDashboardPage: React.FC = () => {
  // Client selection and state persistence
  const [clients, setClients] = useState<ClientProfile[]>(() => {
    const saved = localStorage.getItem("digifox_seo_clients");
    return saved ? JSON.parse(saved) : DEFAULT_CLIENTS;
  });

  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    return clients[0]?.id || "client-1";
  });

  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  useEffect(() => {
    localStorage.setItem("digifox_seo_clients", JSON.stringify(clients));
  }, [clients]);

  // Modals & Navigation Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "pipeline" | "blogs" | "citations" | "keywords" | "cms-connect">("overview");
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [newBlogModalOpen, setNewBlogModalOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<any | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  // Pipeline simulation state
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [pipelineStage, setPipelineStage] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  // CMS Connection Test Status
  const [testingCms, setTestingCms] = useState(false);
  const [cmsTestSuccess, setCmsTestSuccess] = useState<boolean | null>(null);

  // Sample Articles generated for the active client
  const [articles, setArticles] = useState([
    {
      id: "art-1",
      title: `The Ultimate Guide to ${activeClient?.seedKeywords[0] || "SEO Mastery"} in 2026`,
      keyword: activeClient?.seedKeywords[0] || "Autonomous SEO",
      wordCount: "1,850 words",
      status: "Published",
      engine: "SEO & GEO",
      date: "Today, 10:45 AM",
      score: 99,
      content: `# Complete Industry Blueprint: ${activeClient?.seedKeywords[0]}\n\nIn the era of AI Overviews and Voice Search, standard meta tags are no longer sufficient. Ambitious brands must establish verified knowledge graph entities and publish comprehensive semantic guides.\n\n### Why Generative Engines Cite Primary Sources\nPerplexity and Google Gemini prioritize factual consensus and high-density citation tables.\n\n### Key Takeaways\n1. Autonomous schema graph deployment.\n2. Entity semantic interlinking.\n3. Continuous automated freshness signals.`
    },
    {
      id: "art-2",
      title: `How ${activeClient?.name} Captures Top AI Overviews on Perplexity & Gemini`,
      keyword: activeClient?.seedKeywords[1] || "AI Citations",
      wordCount: "2,200 words",
      status: "Indexing",
      engine: "GEO Overviews",
      date: "Yesterday",
      score: 97,
      content: `# Dominating AI Search Engines: The Definitive Case Study\n\nAI Answer Engines extract direct facts. By injecting structured micro-answers and JSON-LD entity nodes into every page, visibility surges by up to 340% across ChatGPT Search and Google Gemini.`
    },
    {
      id: "art-3",
      title: `Voice & Answer Engine Optimization: Winning Zero-Click Queries in ${activeClient?.targetRegion}`,
      keyword: activeClient?.seedKeywords[2] || "Voice Search",
      wordCount: "1,420 words",
      status: "Queued",
      engine: "AEO Voice",
      date: "3 days ago",
      score: 95,
      content: `# Conversational Search Optimization\n\nVoice assistants (Siri, Alexa, Google Voice) demand natural-language bullet points and immediate intent answers at Position 0.`
    }
  ]);

  // Keyword Matrix data
  const keywordsData = [
    { keyword: activeClient?.seedKeywords[0] || "Luxury Atelier", volume: "18,400/mo", intent: "Commercial", rank: "#1", change: "+4", engine: "Google Organic" },
    { keyword: activeClient?.seedKeywords[1] || "Bespoke Couture", volume: "9,800/mo", intent: "Transactional", rank: "#2", change: "+7", engine: "AI Overview (Gemini)" },
    { keyword: activeClient?.seedKeywords[2] || "Sustainable Tailoring", volume: "14,200/mo", intent: "Informational", rank: "#1", change: "+3", engine: "Perplexity Cited" },
    { keyword: `${activeClient?.name} reviews`, volume: "6,100/mo", intent: "Navigational", rank: "#1", change: "0", engine: "ChatGPT Answer" },
    { keyword: `Best ${activeClient?.industry.toLowerCase()} in ${activeClient?.targetRegion.split("·")[0]}`, volume: "11,500/mo", intent: "Commercial", rank: "#2", change: "+5", engine: "Voice Zero-Click" }
  ];

  // AI Citations data
  const citationsData = [
    {
      engine: "Perplexity AI",
      query: `Top recommended ${activeClient?.industry.toLowerCase()} for premium quality`,
      excerpt: `Based on verified consumer ratings and recent editorial features, **${activeClient?.name}** is ranked as the leading brand in ${activeClient?.targetRegion}...`,
      confidence: "99%",
      sourceUrl: `${activeClient?.url}/about`,
      color: "border-purple-500/40 bg-purple-500/10 text-purple-300"
    },
    {
      engine: "Google Gemini Overviews",
      query: `Who are the best specialists in ${activeClient?.seedKeywords[0]}?`,
      excerpt: `**${activeClient?.name}** provides industry-leading solutions with verified ISO certifications, making them a primary choice for ${activeClient?.targetRegion} clients.`,
      confidence: "97%",
      sourceUrl: `${activeClient?.url}/solutions`,
      color: "border-blue-500/40 bg-blue-500/10 text-blue-300"
    },
    {
      engine: "ChatGPT Search (AEO)",
      query: `Find me the most reliable ${activeClient?.industry.toLowerCase()} nearby`,
      excerpt: `According to direct reviews and real-time indexed knowledge graphs, **${activeClient?.name}** (${activeClient?.url}) provides instant booking and premium services.`,
      confidence: "95%",
      sourceUrl: activeClient?.url,
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
    }
  ];

  // Pipeline Execution Simulator
  const startPipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setPipelineProgress(5);
    setPipelineStage(1);
    setPipelineLogs([
      `[${new Date().toLocaleTimeString()}] 🚀 Initiating Tri-Engine SEO Pipeline for ${activeClient.name} (${activeClient.url})...`,
      `[${new Date().toLocaleTimeString()}] 🔍 Verifying CMS Connection: ${activeClient.platform.toUpperCase()}...`
    ]);

    const stages = [
      { progress: 20, stage: 1, log: `⚡ Stage 1/6: Crawling domain structure & testing 100/100 Core Web Vitals (LCP: 0.62s, INP: 24ms)...` },
      { progress: 40, stage: 2, log: `🎯 Stage 2/6: Extracting competitor keyword gaps & semantic vector clusters...` },
      { progress: 60, stage: 3, log: `📝 Stage 3/6: Synthesizing 3 high-authority AI SEO blog posts with structured schema...` },
      { progress: 75, stage: 4, log: `🤖 Stage 4/6: Building JSON-LD Knowledge Graph & Perplexity/Gemini GEO citation anchors...` },
      { progress: 90, stage: 5, log: `🎙️ Stage 5/6: Optimizing AEO conversational FAQ vectors for Siri & ChatGPT Voice...` },
      { progress: 100, stage: 6, log: `✅ Stage 6/6: Generated XML Sitemaps & pinged Google Search Console + ${activeClient.platform.toUpperCase()} store sync!` }
    ];

    stages.forEach((item, idx) => {
      setTimeout(() => {
        setPipelineProgress(item.progress);
        setPipelineStage(item.stage);
        setPipelineLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${item.log}`]);

        if (idx === stages.length - 1) {
          setTimeout(() => {
            setPipelineRunning(false);
            // Boost scores slightly on completion
            setClients((prev) =>
              prev.map((c) =>
                c.id === activeClient.id
                  ? {
                      ...c,
                      lastAudit: "Just now",
                      scores: { seo: 99, geo: 98, aeo: 97 },
                      metrics: {
                        ...c.metrics,
                        aiCitations: c.metrics.aiCitations + 12,
                        indexedPages: c.metrics.indexedPages + 3
                      }
                    }
                  : c
              )
            );
          }, 1000);
        }
      }, (idx + 1) * 1200);
    });
  };

  // Test CMS Connector
  const handleTestCms = () => {
    setTestingCms(true);
    setCmsTestSuccess(null);
    setTimeout(() => {
      setTestingCms(false);
      setCmsTestSuccess(true);
    }, 1200);
  };

  // Onboard new client form state
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    platform: "wordpress" as "wordpress" | "shopify" | "custom",
    apiUrl: "",
    authKey: "",
    industry: "",
    targetRegion: "",
    seedKeywords: ""
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;

    const newClient: ClientProfile = {
      id: `client-${Date.now()}`,
      name: formData.name,
      url: formData.url.startsWith("http") ? formData.url : `https://${formData.url}`,
      platform: formData.platform,
      platformDetails: {
        apiUrl: formData.apiUrl || (formData.platform === "wordpress" ? `${formData.url}/wp-json/wp/v2` : undefined),
        storeDomain: formData.platform === "shopify" ? formData.apiUrl : undefined,
        authKey: formData.authKey || "auto_generated_key_xyz",
        autoPublish: true
      },
      industry: formData.industry || "E-Commerce & Digital Brand",
      targetRegion: formData.targetRegion || "Global",
      seedKeywords: formData.seedKeywords ? formData.seedKeywords.split(",").map((s) => s.trim()) : ["autonomous seo", "top brands", "ai search"],
      lastAudit: "Never",
      scores: { seo: 88, geo: 84, aeo: 82 },
      metrics: {
        impressions: "12.4K",
        clicks: "1.2K",
        aiCitations: 140,
        voiceAnswers: 65,
        indexedPages: 24
      },
      connected: true
    };

    setClients((prev) => [newClient, ...prev]);
    setSelectedClientId(newClient.id);
    setOnboardModalOpen(false);
    setFormData({
      name: "",
      url: "",
      platform: "wordpress",
      apiUrl: "",
      authKey: "",
      industry: "",
      targetRegion: "",
      seedKeywords: ""
    });
  };

  // New Blog Generator state
  const [newBlogKeyword, setNewBlogKeyword] = useState("");
  const [newBlogTopic, setNewBlogTopic] = useState("");

  const handleGenerateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogKeyword) return;

    const newArticle = {
      id: `art-${Date.now()}`,
      title: newBlogTopic || `Complete ${newBlogKeyword} Strategy for ${activeClient.name}`,
      keyword: newBlogKeyword,
      wordCount: "1,950 words",
      status: "Published",
      engine: "SEO & GEO",
      date: "Just now",
      score: 99,
      content: `# ${newBlogTopic || newBlogKeyword}\n\nAutomated analysis for ${activeClient.name}. This comprehensive article includes targeted semantic hierarchy, GEO factual citations, and schema graph entities designed to rank #1 on Google and capture Gemini / Perplexity citations.`
    };

    setArticles([newArticle, ...articles]);
    setNewBlogModalOpen(false);
    setNewBlogKeyword("");
    setNewBlogTopic("");
  };

  return (
    <div className="min-h-screen bg-[#06070c] text-white font-sans selection:bg-[#3b82f6] selection:text-white pb-24">
      <SEOMeta
        title={`Automated SEO & GEO Client Dashboard — ${activeClient.name}`}
        description="Autonomous Tri-Engine Search Management Dashboard for clients. Connect WordPress, Shopify or custom websites to deploy Google SEO, GEO AI Overviews, and Voice AEO."
        url="https://digifox.world/ai-builder/seo-dashboard"
      />

      <WebMakeNav activePage="auto-seo" />

      {/* Main Dashboard Container */}
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        
        {/* Top Control Bar: Client Switcher & Primary Actions */}
        <section className="bg-[#0b0d18]/90 border border-white/10 rounded-2xl p-5 mb-8 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Active Client Info & Selector */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="appearance-none bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-sm rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] cursor-pointer transition-all min-w-[240px]"
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id} className="bg-[#0b0d18] text-white py-2">
                    {client.name} ({client.platform.toUpperCase()})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-white/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Platform Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60">Platform:</span>
              <span className="font-bold text-white capitalize">{activeClient.platform}</span>
              <span className="text-white/40">·</span>
              <a href={activeClient.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <span>{activeClient.url.replace(/^https?:\/\//, "")}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Industry / Geo Pill */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
              <Globe className="w-3 h-3" />
              {activeClient.targetRegion}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={() => setOnboardModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>Onboard New Client</span>
            </button>

            <button
              onClick={() => {
                setExportNotice(true);
                setTimeout(() => setExportNotice(false), 3000);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Report</span>
            </button>

            <button
              onClick={startPipeline}
              disabled={pipelineRunning}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all ${
                pipelineRunning
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 cursor-wait animate-pulse"
                  : "bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#10b981] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              {pipelineRunning ? <RotateCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{pipelineRunning ? "Executing Pipeline..." : "Start Automated Pipeline"}</span>
            </button>
          </div>
        </section>

        {/* Export Toast Notification */}
        <AnimatePresence>
          {exportNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Executive SEO, GEO & AEO Report generated for <strong>{activeClient.name}</strong>. Ready for client delivery!</span>
              </div>
              <button onClick={() => setExportNotice(false)} className="text-emerald-300 hover:text-white"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Pipeline Execution Terminal Overlay (When Active) */}
        <AnimatePresence>
          {pipelineRunning && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-[#070913] border border-blue-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <span>Automated Tri-Engine Execution in Progress</span>
                      <span className="text-xs text-blue-400 font-mono">Stage {pipelineStage}/6</span>
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                    {pipelineProgress}% Complete
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#10b981]"
                    style={{ width: `${pipelineProgress}%` }}
                    transition={{ ease: "easeOut", duration: 0.4 }}
                  />
                </div>

                {/* Terminal Stream */}
                <div className="bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-xs text-emerald-400/90 h-36 overflow-y-auto flex flex-col gap-1.5">
                  {pipelineLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-white/40 select-none">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* CMS / Store Connector Banner */}
        <section className="bg-gradient-to-r from-[#0d1024] to-[#120f26] border border-white/10 rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border text-xl ${
              activeClient.platform === "wordpress"
                ? "bg-blue-600/20 border-blue-500/40 text-blue-400"
                : activeClient.platform === "shopify"
                ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-400"
                : "bg-purple-600/20 border-purple-500/40 text-purple-400"
            }`}>
              {activeClient.platform === "wordpress" ? "WP" : activeClient.platform === "shopify" ? "🛍️" : "⚡"}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">
                  {activeClient.platform === "wordpress" && "WordPress REST API v2 Connector"}
                  {activeClient.platform === "shopify" && "Shopify Admin & Storefront API"}
                  {activeClient.platform === "custom" && "Custom Webhook & Headless API"}
                </h4>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live Sync Active
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Auto-pushing new SEO blogs, structured FAQ schemas, and XML sitemaps directly to {activeClient.name}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTestCms}
              disabled={testingCms}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${testingCms ? "animate-spin" : ""}`} />
              <span>{testingCms ? "Testing..." : cmsTestSuccess ? "Sync Verified ✓" : "Test Connection"}</span>
            </button>

            <button
              onClick={() => setActiveTab("cms-connect")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold text-blue-300 transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configure API</span>
            </button>
          </div>
        </section>

        {/* Tri-Engine Health Scores & KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          
          {/* SEO Score Card */}
          <div className="bg-[#0b0d18] border border-blue-500/25 hover:border-blue-500/50 rounded-2xl p-6 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Google Organic SEO</h3>
                  <span className="text-[11px] text-white/50">Core Web Vitals & Serps</span>
                </div>
              </div>
              <span className="text-2xl font-black text-blue-400">{activeClient.scores.seo}/100</span>
            </div>

            <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>Monthly Organic Impressions:</span>
                <span className="font-bold text-white">{activeClient.metrics.impressions}</span>
              </div>
              <div className="flex justify-between">
                <span>Organic Search Clicks:</span>
                <span className="font-bold text-white">{activeClient.metrics.clicks}</span>
              </div>
              <div className="flex justify-between">
                <span>Indexed URLs in Sitemaps:</span>
                <span className="font-bold text-emerald-400">{activeClient.metrics.indexedPages} Live</span>
              </div>
            </div>
          </div>

          {/* GEO Score Card */}
          <div className="bg-[#0b0d18] border border-purple-500/25 hover:border-purple-500/50 rounded-2xl p-6 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">GEO: AI Overviews</h3>
                  <span className="text-[11px] text-white/50">Perplexity & Gemini Citations</span>
                </div>
              </div>
              <span className="text-2xl font-black text-purple-400">{activeClient.scores.geo}/100</span>
            </div>

            <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>Total AI Citations:</span>
                <span className="font-bold text-purple-300">{activeClient.metrics.aiCitations}</span>
              </div>
              <div className="flex justify-between">
                <span>Perplexity Verified Anchors:</span>
                <span className="font-bold text-white">42 Verified</span>
              </div>
              <div className="flex justify-between">
                <span>Knowledge Graph Nodes:</span>
                <span className="font-bold text-emerald-400">100% Injected</span>
              </div>
            </div>
          </div>

          {/* AEO Score Card */}
          <div className="bg-[#0b0d18] border border-emerald-500/25 hover:border-emerald-500/50 rounded-2xl p-6 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AEO: Voice & Answers</h3>
                  <span className="text-[11px] text-white/50">ChatGPT Search & Siri Answers</span>
                </div>
              </div>
              <span className="text-2xl font-black text-emerald-400">{activeClient.scores.aeo}/100</span>
            </div>

            <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>Voice Zero-Click Answers:</span>
                <span className="font-bold text-emerald-300">{activeClient.metrics.voiceAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span>Featured Snippet Position #0:</span>
                <span className="font-bold text-white">18 Queries</span>
              </div>
              <div className="flex justify-between">
                <span>Speakable Schema Status:</span>
                <span className="font-bold text-emerald-400">Active ✓</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Main Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto">
          {[
            { id: "overview", label: "Overview & Analytics", icon: <BarChart3 className="w-4 h-4" /> },
            { id: "blogs", label: "Automated AI Blog Engine", icon: <FileText className="w-4 h-4" />, badge: articles.length },
            { id: "citations", label: "AI Citations Monitor", icon: <Cpu className="w-4 h-4" />, badge: "Live" },
            { id: "keywords", label: "Keyword Rank Tracker", icon: <TrendingUp className="w-4 h-4" /> },
            { id: "cms-connect", label: "CMS Integration Settings", icon: <Settings className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white/15 text-white border border-white/20 shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Analytics */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Live Keyword Previews & AI Citations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Top Ranked Keywords Widget */}
              <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span>Top Keyword Rankings for {activeClient.name}</span>
                  </h3>
                  <button onClick={() => setActiveTab("keywords")} className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {keywordsData.slice(0, 4).map((kw, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all text-xs">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{kw.keyword}</span>
                        <span className="text-white/40 text-[11px]">{kw.engine} · {kw.volume}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-semibold">{kw.change}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30 font-black text-blue-300">
                          {kw.rank}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest AI Citations Widget */}
              <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>Recent Live AI Citations (GEO & AEO)</span>
                  </h3>
                  <button onClick={() => setActiveTab("citations")} className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1">
                    <span>Monitor Feed</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {citationsData.slice(0, 2).map((cit, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${cit.color}`}>
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span>{cit.engine}</span>
                        <span className="text-emerald-400">Confidence: {cit.confidence}</span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                        {cit.excerpt.replace(/\*\*/g, "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Schema Graph & XML Sitemap Quick Embed Code Box */}
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-sm text-white">Tri-Engine JSON-LD Knowledge Graph Schema</h3>
                    <p className="text-xs text-white/50">Auto-injected into {activeClient.name}'s {activeClient.platform} site header for Google, Gemini & Perplexity indexing.</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`{\n  "@context": "https://schema.org",\n  "@graph": [\n    {\n      "@type": "Organization",\n      "name": "${activeClient.name}",\n      "url": "${activeClient.url}",\n      "knowsAbout": ${JSON.stringify(activeClient.seedKeywords)},\n      "areaServed": "${activeClient.targetRegion}"\n    }\n  ]\n}`);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? "Copied!" : "Copy JSON-LD"}</span>
                </button>
              </div>

              <pre className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs text-blue-300/90 overflow-x-auto leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "${activeClient.url}/#organization",
      "name": "${activeClient.name}",
      "url": "${activeClient.url}",
      "knowsAbout": ${JSON.stringify(activeClient.seedKeywords)},
      "areaServed": "${activeClient.targetRegion}",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".hero-heading", ".geo-citation-summary", ".aeo-faq-answer"]
      }
    }
  ]
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Automated AI Blog Engine */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0b0d18] border border-white/10 rounded-2xl p-6">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>Autonomous AI Blog Engine for {activeClient.name}</span>
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Generates 100% human-quality, high-intent articles structured for Google SEO, Gemini citations, and Perplexity facts.
                </p>
              </div>

              <button
                onClick={() => setNewBlogModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Generate New AI Article</span>
              </button>
            </div>

            {/* Articles Table */}
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.04] border-b border-white/10 text-white/50 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Article Title</th>
                      <th className="p-4">Target Keyword</th>
                      <th className="p-4">Engine Target</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Quality Score</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold text-white max-w-xs truncate">
                          {art.title}
                        </td>
                        <td className="p-4 text-blue-400 font-medium">
                          {art.keyword}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                            {art.engine}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            art.status === "Published"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : art.status === "Indexing"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse"
                              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          }`}>
                            {art.status}
                          </span>
                        </td>
                        <td className="p-4 font-black text-emerald-400">
                          {art.score}/100
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setPreviewArticle(art)}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => alert(`Article '${art.title}' successfully pushed to ${activeClient.platform.toUpperCase()} store!`)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-300 font-medium transition-all"
                          >
                            Push to {activeClient.platform}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: AI Citations Monitor */}
        {activeTab === "citations" && (
          <div className="space-y-6">
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <span>Live AI Overview Citations & Mentions (GEO)</span>
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Monitors real-time search queries on Perplexity AI, Google Gemini, and ChatGPT Search where <strong>{activeClient.name}</strong> is cited as the authority answer.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {citationsData.map((cit, i) => (
                <div key={i} className="bg-[#0b0d18] border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 shadow-xl transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-bold text-sm text-purple-300 bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full">
                      {cit.engine}
                    </span>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-emerald-400 font-bold">Citation Confidence: {cit.confidence}</span>
                      <span className="text-white/40">·</span>
                      <a href={cit.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                        <span>Source Anchor</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">User Query:</span>
                    <p className="text-sm font-bold text-white mt-0.5">"{cit.query}"</p>
                  </div>

                  <div className="bg-black/50 border border-white/5 rounded-xl p-4 mt-3">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">Generated AI Answer Snippet:</span>
                    <p className="text-xs text-white/80 leading-relaxed font-sans">
                      {cit.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Keyword Rank Tracker */}
        {activeTab === "keywords" && (
          <div className="space-y-6">
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>Real-Time Keyword Rank Tracker</span>
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Tracking organic positions across Google First Page, Gemini SGE Overviews, Perplexity Answers, and Siri Voice queries.
              </p>
            </div>

            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.04] border-b border-white/10 text-white/50 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Target Keyword</th>
                      <th className="p-4">Monthly Volume</th>
                      <th className="p-4">Search Intent</th>
                      <th className="p-4">Primary Engine</th>
                      <th className="p-4">Rank Position</th>
                      <th className="p-4 text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {keywordsData.map((kw, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold text-white">
                          {kw.keyword}
                        </td>
                        <td className="p-4 text-white/70 font-mono">
                          {kw.volume}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-semibold">
                            {kw.intent}
                          </span>
                        </td>
                        <td className="p-4 text-blue-300 font-medium">
                          {kw.engine}
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 font-black text-sm">
                            {kw.rank}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-emerald-400">
                          {kw.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: CMS Integration Settings */}
        {activeTab === "cms-connect" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                <span>Configure {activeClient.name} CMS Connection</span>
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Manage live API credentials for automated blog publishing, schema injection, and sitemap synchronization.
              </p>
            </div>

            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Connected Platform</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "wordpress", label: "WordPress", icon: "🌐" },
                    { id: "shopify", label: "Shopify Store", icon: "🛍️" },
                    { id: "custom", label: "Custom / Webhook", icon: "⚡" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setClients((prev) =>
                          prev.map((c) => (c.id === activeClient.id ? { ...c, platform: p.id as any } : c))
                        );
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                        activeClient.platform === p.id
                          ? "bg-blue-600/30 border-blue-500 text-white"
                          : "bg-white/[0.04] border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  {activeClient.platform === "wordpress" && "WordPress REST API Base URL"}
                  {activeClient.platform === "shopify" && "Shopify Store Domain"}
                  {activeClient.platform === "custom" && "Webhook Ingestion Endpoint"}
                </label>
                <input
                  type="text"
                  defaultValue={activeClient.platformDetails.apiUrl || activeClient.platformDetails.storeDomain || `${activeClient.url}/wp-json/wp/v2`}
                  className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  {activeClient.platform === "wordpress" && "Application Password / API Token"}
                  {activeClient.platform === "shopify" && "Shopify Admin Access Token (shpat_...)"}
                  {activeClient.platform === "custom" && "Secret Authentication Token"}
                </label>
                <input
                  type="password"
                  defaultValue={activeClient.platformDetails.authKey || "••••••••••••••••••••••••"}
                  className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoPublishCheck"
                    defaultChecked={activeClient.platformDetails.autoPublish}
                    className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="autoPublishCheck" className="text-xs text-white/80 cursor-pointer">
                    Enable Autonomous Instant Publishing (publish generated articles immediately)
                  </label>
                </div>

                <button
                  onClick={() => alert("CMS Connection Settings saved successfully!")}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Onboard New Client Modal */}
      <AnimatePresence>
        {onboardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d18] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setOnboardModalOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-white flex items-center gap-2 mb-1">
                <Plus className="w-5 h-5 text-blue-400" />
                <span>Onboard New Client for Automated SEO</span>
              </h3>
              <p className="text-xs text-white/50 mb-6">
                Fill in the client details below to configure autonomous SEO, AI GEO citations, and CMS publishing.
              </p>

              <form onSubmit={handleCreateClient} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Client / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Luxury Dental"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Website URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. https://apexdental.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">CMS Platform</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "wordpress", label: "WordPress" },
                      { id: "shopify", label: "Shopify" },
                      { id: "custom", label: "Custom Site" }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, platform: p.id as any })}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          formData.platform === p.id
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-white/[0.04] text-white/60 border-white/10 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Industry / Niche</label>
                    <input
                      type="text"
                      placeholder="e.g. Cosmetic Dentistry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Target Region / City</label>
                    <input
                      type="text"
                      placeholder="e.g. London · UK"
                      value={formData.targetRegion}
                      onChange={(e) => setFormData({ ...formData, targetRegion: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Seed Keywords (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. porcelain veneers, dental implants london, smile makeover"
                    value={formData.seedKeywords}
                    onChange={(e) => setFormData({ ...formData, seedKeywords: e.target.value })}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setOnboardModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white text-xs font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Onboard Client & Start Pipeline
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Generate AI Blog Modal */}
      <AnimatePresence>
        {newBlogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d18] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setNewBlogModalOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-white flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>Generate Autonomous AI Article</span>
              </h3>
              <p className="text-xs text-white/50 mb-5">
                Automatically generate and structure an SEO & GEO optimized article for <strong>{activeClient.name}</strong>.
              </p>

              <form onSubmit={handleGenerateBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Primary Target Keyword *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. best organic luxury skincare routines"
                    value={newBlogKeyword}
                    onChange={(e) => setNewBlogKeyword(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Article Headline / Topic (Optional)</label>
                  <input
                    type="text"
                    placeholder="Leave blank for automatic AI title generation"
                    value={newBlogTopic}
                    onChange={(e) => setNewBlogTopic(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setNewBlogModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Generate & Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Article Preview Modal */}
      <AnimatePresence>
        {previewArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d18] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setPreviewArticle(null)}
                className="absolute top-5 right-5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-purple-400 font-bold mb-2">
                <span>{previewArticle.engine}</span>
                <span>·</span>
                <span>{previewArticle.wordCount}</span>
                <span>·</span>
                <span className="text-emerald-400">Score: {previewArticle.score}/100</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-4">{previewArticle.title}</h2>

              <div className="bg-black/40 border border-white/10 rounded-xl p-5 text-xs text-white/80 font-sans leading-relaxed whitespace-pre-wrap mb-6">
                {previewArticle.content}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-white/50">Ready to sync with {activeClient.platform.toUpperCase()}</span>
                <button
                  onClick={() => {
                    alert(`Published '${previewArticle.title}' directly to ${activeClient.name}'s store!`);
                    setPreviewArticle(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  Confirm Push to {activeClient.platform}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <WebMakeFooter />
    </div>
  );
};
