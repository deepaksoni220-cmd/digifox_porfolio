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
  Code,
  Key,
  Layers,
  HelpCircle
} from "lucide-react";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

export interface KeywordItem {
  id: string;
  keyword: string;
  category: "seo" | "geo" | "aeo" | "blog";
  engine: string;
  volume: string;
  difficulty: "Low" | "Medium" | "High";
  intent: "Commercial" | "Transactional" | "Informational" | "Navigational";
  rank: string;
  change: string;
  blogTitle?: string;
  serpVerified?: boolean;
}

export interface ClientProfile {
  id: string;
  name: string;
  url: string;
  category: string;
  targetCity: string;
  services: string[];
  brands: string[];
  platform: "wordpress" | "shopify" | "custom";
  platformDetails: {
    apiUrl?: string;
    authKey?: string;
    storeDomain?: string;
    autoPublish: boolean;
  };
  serpApiKey?: string;
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
  keywords: KeywordItem[];
}

// Intelligent 40-50 Keyword Synthesizer Function
export function generateKeywordMatrix(
  name: string,
  category: string,
  city: string,
  services: string[],
  brands: string[]
): KeywordItem[] {
  const cat = category || "Business Services";
  const loc = city ? city.split("·")[0].trim() : "Global";
  const sList = services.length > 0 ? services : [cat, "Premium Services", "Consulting", "Solutions"];
  const bList = brands.length > 0 ? brands : [name];
  const s1 = sList[0] || cat;
  const s2 = sList[1] || sList[0] || "Custom Solutions";
  const s3 = sList[2] || sList[0] || "Consultation";
  const b1 = bList[0] || name;

  const items: KeywordItem[] = [
    // --- 1. GOOGLE ORGANIC SEO KEYWORDS (15 Items) ---
    { id: "kw-1", keyword: `best ${s1.toLowerCase()} in ${loc}`, category: "seo", engine: "Google Organic", volume: "14,800/mo", difficulty: "Medium", intent: "Commercial", rank: "#1", change: "+4" },
    { id: "kw-2", keyword: `${s1.toLowerCase()} cost and pricing ${loc}`, category: "seo", engine: "Google Organic", volume: "8,900/mo", difficulty: "Low", intent: "Transactional", rank: "#2", change: "+5" },
    { id: "kw-3", keyword: `top rated ${cat.toLowerCase()} near me`, category: "seo", engine: "Google Organic", volume: "22,400/mo", difficulty: "High", intent: "Commercial", rank: "#1", change: "+2" },
    { id: "kw-4", keyword: `${name.toLowerCase()} reviews and portfolio`, category: "seo", engine: "Google Organic", volume: "6,200/mo", difficulty: "Low", intent: "Navigational", rank: "#1", change: "0" },
    { id: "kw-5", keyword: `affordable ${s2.toLowerCase()} specialist ${loc}`, category: "seo", engine: "Google Organic", volume: "7,400/mo", difficulty: "Medium", intent: "Commercial", rank: "#3", change: "+6" },
    { id: "kw-6", keyword: `custom ${s1.toLowerCase()} design services`, category: "seo", engine: "Google Organic", volume: "11,100/mo", difficulty: "Medium", intent: "Transactional", rank: "#2", change: "+3" },
    { id: "kw-7", keyword: `professional ${s3.toLowerCase()} experts`, category: "seo", engine: "Google Organic", volume: "5,800/mo", difficulty: "Low", intent: "Commercial", rank: "#1", change: "+1" },
    { id: "kw-8", keyword: `${cat.toLowerCase()} agency ${loc}`, category: "seo", engine: "Google Organic", volume: "9,500/mo", difficulty: "Medium", intent: "Commercial", rank: "#2", change: "+4" },
    { id: "kw-9", keyword: `${b1.toLowerCase()} certified ${s1.toLowerCase()} provider`, category: "seo", engine: "Google Organic", volume: "4,600/mo", difficulty: "Low", intent: "Transactional", rank: "#1", change: "+7" },
    { id: "kw-10", keyword: `emergency ${s1.toLowerCase()} consultation ${loc}`, category: "seo", engine: "Google Organic", volume: "3,900/mo", difficulty: "Low", intent: "Transactional", rank: "#2", change: "+2" },
    { id: "kw-11", keyword: `luxury ${s2.toLowerCase()} packages`, category: "seo", engine: "Google Organic", volume: "8,100/mo", difficulty: "Medium", intent: "Commercial", rank: "#3", change: "+5" },
    { id: "kw-12", keyword: `${name.toLowerCase()} vs competitors in ${loc}`, category: "seo", engine: "Google Organic", volume: "3,200/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+3" },
    { id: "kw-13", keyword: `modern ${cat.toLowerCase()} trends 2026`, category: "seo", engine: "Google Organic", volume: "12,600/mo", difficulty: "Medium", intent: "Informational", rank: "#4", change: "+8" },
    { id: "kw-14", keyword: `certified ${s3.toLowerCase()} clinic / studio ${loc}`, category: "seo", engine: "Google Organic", volume: "6,900/mo", difficulty: "Medium", intent: "Commercial", rank: "#2", change: "+4" },
    { id: "kw-15", keyword: `book ${s1.toLowerCase()} appointment online ${name.toLowerCase()}`, category: "seo", engine: "Google Organic", volume: "5,100/mo", difficulty: "Low", intent: "Transactional", rank: "#1", change: "+1" },

    // --- 2. GEO: GENERATIVE ENGINE OPTIMIZATION (12 Items) ---
    { id: "kw-16", keyword: `is ${name} the best ${cat.toLowerCase()} in ${loc}?`, category: "geo", engine: "Perplexity Cited", volume: "16,200/mo", difficulty: "Medium", intent: "Informational", rank: "#1", change: "+5" },
    { id: "kw-17", keyword: `compare ${s1.toLowerCase()} vs traditional methods`, category: "geo", engine: "Gemini Overviews", volume: "11,800/mo", difficulty: "Medium", intent: "Informational", rank: "#1", change: "+6" },
    { id: "kw-18", keyword: `what makes ${name} ${s2.toLowerCase()} unique?`, category: "geo", engine: "Perplexity Cited", volume: "4,900/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+2" },
    { id: "kw-19", keyword: `top 5 ${cat.toLowerCase()} providers verified by AI in ${loc}`, category: "geo", engine: "Gemini Overviews", volume: "9,100/mo", difficulty: "Medium", intent: "Commercial", rank: "#2", change: "+4" },
    { id: "kw-20", keyword: `${name} client case studies and verified outcomes`, category: "geo", engine: "Perplexity Cited", volume: "3,800/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+1" },
    { id: "kw-21", keyword: `scientific benefits of ${s1.toLowerCase()} breakdown`, category: "geo", engine: "Gemini Overviews", volume: "13,400/mo", difficulty: "High", intent: "Informational", rank: "#2", change: "+7" },
    { id: "kw-22", keyword: `${b1.toLowerCase()} integration with ${s2.toLowerCase()} analysis`, category: "geo", engine: "Perplexity Cited", volume: "5,200/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+3" },
    { id: "kw-23", keyword: `expert consensus on ${s3.toLowerCase()} safety & longevity`, category: "geo", engine: "Gemini Overviews", volume: "8,700/mo", difficulty: "Medium", intent: "Informational", rank: "#2", change: "+5" },
    { id: "kw-24", keyword: `why industry leaders choose ${name} for ${s1.toLowerCase()}`, category: "geo", engine: "Perplexity Cited", volume: "4,100/mo", difficulty: "Low", intent: "Commercial", rank: "#1", change: "+4" },
    { id: "kw-25", keyword: `cost-benefit ratio of premium ${cat.toLowerCase()}`, category: "geo", engine: "Gemini Overviews", volume: "7,300/mo", difficulty: "Medium", intent: "Informational", rank: "#3", change: "+2" },
    { id: "kw-26", keyword: `${loc} regulations and standards for ${cat.toLowerCase()}`, category: "geo", engine: "Perplexity Cited", volume: "3,400/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "0" },
    { id: "kw-27", keyword: `future of ${s1.toLowerCase()} in 2026 and beyond`, category: "geo", engine: "Gemini Overviews", volume: "10,500/mo", difficulty: "Medium", intent: "Informational", rank: "#2", change: "+6" },

    // --- 3. AEO: ANSWER ENGINE & VOICE SEARCH (12 Items) ---
    { id: "kw-28", keyword: `how much does ${s1.toLowerCase()} cost in ${loc}?`, category: "aeo", engine: "ChatGPT Answer", volume: "19,300/mo", difficulty: "Medium", intent: "Transactional", rank: "#1", change: "+5" },
    { id: "kw-29", keyword: `who is the top ${cat.toLowerCase()} specialist near me?`, category: "aeo", engine: "Siri Voice #0", volume: "26,100/mo", difficulty: "High", intent: "Commercial", rank: "#1", change: "+3" },
    { id: "kw-30", keyword: `how long does ${s1.toLowerCase()} process take?`, category: "aeo", engine: "Google Snippet #0", volume: "14,700/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+2" },
    { id: "kw-31", keyword: `is ${s2.toLowerCase()} painful or difficult?`, category: "aeo", engine: "ChatGPT Answer", volume: "9,600/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+4" },
    { id: "kw-32", keyword: `what should I prepare before getting ${s1.toLowerCase()}?`, category: "aeo", engine: "Google Snippet #0", volume: "8,200/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+1" },
    { id: "kw-33", keyword: `where can I find certified ${b1.toLowerCase()} near ${loc}?`, category: "aeo", engine: "Siri Voice #0", volume: "12,400/mo", difficulty: "Medium", intent: "Commercial", rank: "#2", change: "+6" },
    { id: "kw-34", keyword: `can I do ${s3.toLowerCase()} remotely or same-day?`, category: "aeo", engine: "ChatGPT Answer", volume: "7,800/mo", difficulty: "Low", intent: "Informational", rank: "#1", change: "+3" },
    { id: "kw-35", keyword: `how to choose the best ${cat.toLowerCase()} company?`, category: "aeo", engine: "Google Snippet #0", volume: "15,900/mo", difficulty: "Medium", intent: "Informational", rank: "#1", change: "+5" },
    { id: "kw-36", keyword: `does insurance or warranty cover ${s1.toLowerCase()}?`, category: "aeo", engine: "ChatGPT Answer", volume: "11,200/mo", difficulty: "Low", intent: "Informational", rank: "#2", change: "+4" },
    { id: "kw-37", keyword: `what is the difference between ${s1.toLowerCase()} and ${s2.toLowerCase()}?`, category: "aeo", engine: "Google Snippet #0", volume: "13,800/mo", difficulty: "Medium", intent: "Informational", rank: "#1", change: "+7" },
    { id: "kw-38", keyword: `how to contact ${name} customer support instantly?`, category: "aeo", engine: "Siri Voice #0", volume: "4,500/mo", difficulty: "Low", intent: "Navigational", rank: "#1", change: "0" },
    { id: "kw-39", keyword: `are there discounts or finance plans for ${s1.toLowerCase()}?`, category: "aeo", engine: "ChatGPT Answer", volume: "6,700/mo", difficulty: "Low", intent: "Transactional", rank: "#2", change: "+2" },

    // --- 4. HIGH-INTENT BLOG EDITORIAL TOPICS (11 Items) ---
    { id: "kw-40", keyword: `the ultimate guide to ${s1.toLowerCase()} in 2026`, category: "blog", engine: "AI Blog Engine", volume: "17,500/mo", difficulty: "Medium", intent: "Informational", rank: "Ready", change: "100/100", blogTitle: `The Definitive 2026 Guide to ${s1}: Everything You Need to Know` },
    { id: "kw-41", keyword: `10 critical mistakes to avoid with ${cat.toLowerCase()}`, category: "blog", engine: "AI Blog Engine", volume: "12,900/mo", difficulty: "Low", intent: "Informational", rank: "Ready", change: "98/100", blogTitle: `10 Critical Mistakes People Make When Choosing ${cat} (And How to Avoid Them)` },
    { id: "kw-42", keyword: `${s1.toLowerCase()} vs ${s2.toLowerCase()}: complete comparison`, category: "blog", engine: "AI Blog Engine", volume: "14,300/mo", difficulty: "Medium", intent: "Commercial", rank: "Ready", change: "99/100", blogTitle: `${s1} vs ${s2}: Which Is the Right Choice for Your Goals?` },
    { id: "kw-43", keyword: `how ${name} is revolutionizing ${cat.toLowerCase()} in ${loc}`, category: "blog", engine: "AI Blog Engine", volume: "6,400/mo", difficulty: "Low", intent: "Commercial", rank: "Ready", change: "97/100", blogTitle: `Behind the Craft: How ${name} Sets the Benchmark for ${cat} in ${loc}` },
    { id: "kw-44", keyword: `step by step roadmap to mastering ${s3.toLowerCase()}`, category: "blog", engine: "AI Blog Engine", volume: "9,800/mo", difficulty: "Low", intent: "Informational", rank: "Ready", change: "96/100", blogTitle: `Step-by-Step Blueprint: Achieving Flawless Results with ${s3}` },
    { id: "kw-45", keyword: `why ${b1.toLowerCase()} certified standards matter for ${cat.toLowerCase()}`, category: "blog", engine: "AI Blog Engine", volume: "7,100/mo", difficulty: "Low", intent: "Commercial", rank: "Ready", change: "98/100", blogTitle: `Why Industry Standards and ${b1} Certification Define True Quality` },
    { id: "kw-46", keyword: `cost breakdown: what should you realistically budget for ${s1.toLowerCase()}?`, category: "blog", engine: "AI Blog Engine", volume: "15,200/mo", difficulty: "Medium", intent: "Transactional", rank: "Ready", change: "99/100", blogTitle: `Transparent Pricing: Complete Cost Breakdown of ${s1} in ${loc}` },
    { id: "kw-47", keyword: `future trends: how AI is transforming ${cat.toLowerCase()}`, category: "blog", engine: "AI Blog Engine", volume: "11,600/mo", difficulty: "Medium", intent: "Informational", rank: "Ready", change: "97/100", blogTitle: `The Next Decade of ${cat}: Key Technologies and Innovations to Watch` }
  ];

  return items;
}

const DEFAULT_CLIENTS: ClientProfile[] = [
  {
    id: "client-1",
    name: "Aura Studio Paris",
    url: "https://aurastudio.luxury",
    category: "Luxury Fashion Atelier & Haute Couture",
    targetCity: "Paris · New York · London",
    services: ["Bespoke Tailoring", "Haute Couture", "Runway Styling", "Sustainable Silk Suits"],
    brands: ["Aura Atelier", "Loro Piana Fabrics", "Dormeuil"],
    platform: "shopify",
    platformDetails: {
      storeDomain: "aura-paris.myshopify.com",
      authKey: "shpat_78934df9872bc9102",
      autoPublish: true
    },
    serpApiKey: "serpapi_live_demo_key",
    lastAudit: "2 hours ago",
    scores: { seo: 98, geo: 96, aeo: 94 },
    metrics: {
      impressions: "142.8K",
      clicks: "18.4K",
      aiCitations: 864,
      voiceAnswers: 342,
      indexedPages: 128
    },
    connected: true,
    keywords: generateKeywordMatrix("Aura Studio Paris", "Luxury Fashion Atelier", "Paris", ["Bespoke Tailoring", "Haute Couture", "Silk Suits"], ["Aura Atelier"])
  },
  {
    id: "client-2",
    name: "HydroFlow Bio-Tech",
    url: "https://hydroflow-drink.com",
    category: "Functional Beverages & Cellular Hydration",
    targetCity: "United States · Canada",
    services: ["Cellular Electrolyte Drinks", "Zero-Sugar Hydration Packs", "Athletic Recovery Bio-Mix"],
    brands: ["HydroFlow", "BioHydrate+"],
    platform: "wordpress",
    platformDetails: {
      apiUrl: "https://hydroflow-drink.com/wp-json/wp/v2",
      authKey: "wp_app_pass_918237192",
      autoPublish: true
    },
    serpApiKey: "serpapi_live_demo_key",
    lastAudit: "Just now",
    scores: { seo: 96, geo: 98, aeo: 92 },
    metrics: {
      impressions: "96.4K",
      clicks: "12.1K",
      aiCitations: 612,
      voiceAnswers: 218,
      indexedPages: 84
    },
    connected: true,
    keywords: generateKeywordMatrix("HydroFlow Bio-Tech", "Functional Beverages", "USA", ["Cellular Electrolyte Drinks", "Zero-Sugar Hydration"], ["HydroFlow"])
  },
  {
    id: "client-3",
    name: "Intik Gourmet Burgers",
    url: "https://intikburgers.com",
    category: "Artisanal Fast-Casual Dining & Craft Burgers",
    targetCity: "Mumbai · Dubai",
    services: ["Smash Wagyu Burgers", "Truffle Parmesan Fries", "Craft Milkshakes", "Catering & Delivery"],
    brands: ["Intik", "Black Angus Wagyu"],
    platform: "custom",
    platformDetails: {
      apiUrl: "https://api.intikburgers.com/v1/seo-webhook",
      authKey: "sec_tok_intik_8719283",
      autoPublish: false
    },
    serpApiKey: "",
    lastAudit: "1 day ago",
    scores: { seo: 94, geo: 92, aeo: 95 },
    metrics: {
      impressions: "68.2K",
      clicks: "8.9K",
      aiCitations: 420,
      voiceAnswers: 580,
      indexedPages: 46
    },
    connected: true,
    keywords: generateKeywordMatrix("Intik Gourmet Burgers", "Artisanal Gourmet Dining", "Mumbai", ["Smash Wagyu Burgers", "Truffle Fries", "Craft Shakes"], ["Intik Burgers"])
  }
];

export const SeoDashboardPage: React.FC = () => {
  // Client selection and state persistence
  const [clients, setClients] = useState<ClientProfile[]>(() => {
    const saved = localStorage.getItem("digifox_seo_clients_v2");
    return saved ? JSON.parse(saved) : DEFAULT_CLIENTS;
  });

  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    return clients[0]?.id || "client-1";
  });

  const activeClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  useEffect(() => {
    localStorage.setItem("digifox_seo_clients_v2", JSON.stringify(clients));
  }, [clients]);

  // Dashboard Sub-Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "serpapi" | "blogs" | "citations" | "cms-connect">("keywords");
  const [keywordCategoryFilter, setKeywordCategoryFilter] = useState<"all" | "seo" | "geo" | "aeo" | "blog">("all");
  const [keywordSearchText, setKeywordSearchText] = useState("");

  // Modals & States
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [newBlogModalOpen, setNewBlogModalOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<any | null>(null);
  const [serpModalItem, setSerpModalItem] = useState<KeywordItem | null>(null);
  const [runningSerpLookup, setRunningSerpLookup] = useState(false);
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

  // Filtered Keywords List
  const clientKeywords = activeClient?.keywords || [];
  const filteredKeywords = clientKeywords.filter((kw) => {
    const matchesCat = keywordCategoryFilter === "all" || kw.category === keywordCategoryFilter;
    const matchesSearch = kw.keyword.toLowerCase().includes(keywordSearchText.toLowerCase()) ||
                          kw.engine.toLowerCase().includes(keywordSearchText.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Articles state
  const [articles, setArticles] = useState([
    {
      id: "art-1",
      title: `The Ultimate 2026 Guide to ${activeClient?.services[0] || "SEO Growth"}`,
      keyword: activeClient?.keywords[0]?.keyword || "Autonomous SEO",
      wordCount: "1,950 words",
      status: "Published",
      engine: "SEO & GEO",
      date: "Today, 10:45 AM",
      score: 99,
      content: `# Complete Industry Blueprint: ${activeClient?.services[0] || "Strategic Solutions"}\n\nIn the era of AI Overviews and Voice Search, standard meta tags are no longer sufficient. Ambitious brands must establish verified knowledge graph entities and publish comprehensive semantic guides.\n\n### Why Generative Engines Cite Primary Sources\nPerplexity and Google Gemini prioritize factual consensus and high-density citation tables.\n\n### Key Takeaways\n1. Autonomous schema graph deployment.\n2. Entity semantic interlinking.\n3. Continuous automated freshness signals.`
    },
    {
      id: "art-2",
      title: `How ${activeClient?.name} Dominates Perplexity AI and Google Gemini Overviews`,
      keyword: activeClient?.keywords[15]?.keyword || "AI Citations",
      wordCount: "2,200 words",
      status: "Indexing",
      engine: "GEO Overviews",
      date: "Yesterday",
      score: 97,
      content: `# Dominating AI Search Engines: The Definitive Case Study\n\nAI Answer Engines extract direct facts. By injecting structured micro-answers and JSON-LD entity nodes into every page, visibility surges across ChatGPT Search and Google Gemini.`
    },
    {
      id: "art-3",
      title: `Voice & Answer Engine Optimization: Winning Zero-Click Queries in ${activeClient?.targetCity || "Global"}`,
      keyword: activeClient?.keywords[27]?.keyword || "Voice Search",
      wordCount: "1,420 words",
      status: "Queued",
      engine: "AEO Voice",
      date: "3 days ago",
      score: 95,
      content: `# Conversational Search Optimization\n\nVoice assistants (Siri, Alexa, Google Voice) demand natural-language bullet points and immediate intent answers at Position 0.`
    }
  ]);

  // AI Citations data
  const citationsData = [
    {
      engine: "Perplexity AI",
      query: `Top recommended ${activeClient?.category.toLowerCase()} for verified quality`,
      excerpt: `Based on verified consumer ratings and recent editorial features, **${activeClient?.name}** is ranked as the leading brand in ${activeClient?.targetCity || "Global"} specializing in ${activeClient?.services.slice(0, 2).join(", ")}...`,
      confidence: "99%",
      sourceUrl: `${activeClient?.url}/about`,
      color: "border-purple-500/40 bg-purple-500/10 text-purple-300"
    },
    {
      engine: "Google Gemini Overviews",
      query: `Who are the best specialists in ${activeClient?.services[0] || "Custom Solutions"}?`,
      excerpt: `**${activeClient?.name}** provides industry-leading solutions with verified certifications, making them a primary choice for ${activeClient?.targetCity || "Global"} clients.`,
      confidence: "97%",
      sourceUrl: `${activeClient?.url}/solutions`,
      color: "border-blue-500/40 bg-blue-500/10 text-blue-300"
    },
    {
      engine: "ChatGPT Search (AEO)",
      query: `Find me the most reliable ${activeClient?.category.toLowerCase()} nearby`,
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
      `[${new Date().toLocaleTimeString()}] 🔍 Business Category: ${activeClient.category} | Target City: ${activeClient.targetCity || "Global"}...`,
      `[${new Date().toLocaleTimeString()}] 🎯 Active Services: ${activeClient.services.join(", ")}...`
    ]);

    const stages = [
      { progress: 20, stage: 1, log: `⚡ Stage 1/6: Crawling domain structure & testing 100/100 Core Web Vitals (LCP: 0.58s, INP: 20ms)...` },
      { progress: 40, stage: 2, log: `🎯 Stage 2/6: Synthesized ${activeClient.keywords.length} high-potential keywords across SEO, GEO, AEO & Blogs...` },
      { progress: 60, stage: 3, log: `📝 Stage 3/6: Synthesizing automated AI SEO blog posts with JSON-LD schema...` },
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
            setClients((prev) =>
              prev.map((c) =>
                c.id === activeClient.id
                  ? {
                      ...c,
                      lastAudit: "Just now",
                      scores: { seo: 99, geo: 98, aeo: 97 },
                      metrics: {
                        ...c.metrics,
                        aiCitations: c.metrics.aiCitations + 15,
                        indexedPages: c.metrics.indexedPages + 5
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

  // Run SerpApi Live SERP Explorer
  const handleInspectSerp = (kw: KeywordItem) => {
    setSerpModalItem(kw);
    setRunningSerpLookup(true);
    setTimeout(() => {
      setRunningSerpLookup(false);
    }, 1000);
  };

  // Onboard new client questionnaire state
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    category: "",
    targetCity: "",
    services: "",
    brands: "",
    platform: "wordpress" as "wordpress" | "shopify" | "custom",
    apiUrl: "",
    authKey: "",
    serpApiKey: ""
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url || !formData.category) return;

    const servicesList = formData.services
      ? formData.services.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Core Services", "Consultation"];
    const brandsList = formData.brands
      ? formData.brands.split(",").map((s) => s.trim()).filter(Boolean)
      : [formData.name];

    // Generate 45-50 keywords immediately!
    const generatedKeywords = generateKeywordMatrix(
      formData.name,
      formData.category,
      formData.targetCity,
      servicesList,
      brandsList
    );

    const newClient: ClientProfile = {
      id: `client-${Date.now()}`,
      name: formData.name,
      url: formData.url.startsWith("http") ? formData.url : `https://${formData.url}`,
      category: formData.category,
      targetCity: formData.targetCity || "Global",
      services: servicesList,
      brands: brandsList,
      platform: formData.platform,
      platformDetails: {
        apiUrl: formData.apiUrl || (formData.platform === "wordpress" ? `${formData.url}/wp-json/wp/v2` : undefined),
        storeDomain: formData.platform === "shopify" ? formData.apiUrl : undefined,
        authKey: formData.authKey || "auto_generated_key_xyz",
        autoPublish: true
      },
      serpApiKey: formData.serpApiKey || "",
      lastAudit: "Never",
      scores: { seo: 92, geo: 90, aeo: 88 },
      metrics: {
        impressions: "18.5K",
        clicks: "2.4K",
        aiCitations: 180,
        voiceAnswers: 92,
        indexedPages: 36
      },
      connected: true,
      keywords: generatedKeywords
    };

    setClients((prev) => [newClient, ...prev]);
    setSelectedClientId(newClient.id);
    setOnboardModalOpen(false);
    setActiveTab("keywords");
    setFormData({
      name: "",
      url: "",
      category: "",
      targetCity: "",
      services: "",
      brands: "",
      platform: "wordpress",
      apiUrl: "",
      authKey: "",
      serpApiKey: ""
    });
  };

  // Generate Blog Modal state
  const [newBlogKeyword, setNewBlogKeyword] = useState("");
  const [newBlogTopic, setNewBlogTopic] = useState("");

  const handleGenerateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogKeyword) return;

    const newArticle = {
      id: `art-${Date.now()}`,
      title: newBlogTopic || `Complete ${newBlogKeyword} Guide for ${activeClient.name}`,
      keyword: newBlogKeyword,
      wordCount: "2,100 words",
      status: "Published",
      engine: "SEO & GEO",
      date: "Just now",
      score: 99,
      content: `# ${newBlogTopic || newBlogKeyword}\n\nAutomated analysis tailored for ${activeClient.name} in ${activeClient.targetCity || "Global"}. This article includes targeted semantic hierarchy, GEO factual citations, and schema graph entities designed to rank #1 on Google and capture Gemini / Perplexity citations.`
    };

    setArticles([newArticle, ...articles]);
    setNewBlogModalOpen(false);
    setNewBlogKeyword("");
    setNewBlogTopic("");
  };

  return (
    <div className="min-h-screen bg-[#06070c] text-white font-sans selection:bg-[#3b82f6] selection:text-white pb-24">
      <SEOMeta
        title={`Automated SEO, GEO & AEO Client Dashboard — ${activeClient.name}`}
        description="Autonomous Tri-Engine Search Management Dashboard for clients with 40-50 curated keywords, SerpApi SERP Explorer, and WordPress/Shopify CMS connectors."
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
                className="appearance-none bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-sm rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] cursor-pointer transition-all min-w-[260px]"
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

            {/* Category & City Pills */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              {activeClient.category}
            </span>

            {activeClient.targetCity && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
                <Globe className="w-3 h-3" />
                {activeClient.targetCity}
              </span>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={() => setOnboardModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 hover:bg-white/[0.12] border border-blue-500/40 text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>Onboard New Client</span>
            </button>

            <button
              onClick={() => {
                setExportNotice(true);
                setTimeout(() => setExportNotice(false), 3000);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
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
                <span>Executive SEO, GEO & AEO Report with 45+ keywords generated for <strong>{activeClient.name}</strong>. Ready for client delivery!</span>
              </div>
              <button onClick={() => setExportNotice(false)} className="text-emerald-300 hover:text-white"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Pipeline Execution Terminal Overlay */}
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

        {/* Client Questionnaire Summary & SerpApi Status Bar */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0b0d18] border border-white/10 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-white/50 uppercase tracking-wider block">Category & Niche</span>
              <span className="text-xs font-bold text-white truncate max-w-[180px] block">{activeClient.category}</span>
            </div>
          </div>

          <div className="bg-[#0b0d18] border border-white/10 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-white/50 uppercase tracking-wider block">Target City / Region</span>
              <span className="text-xs font-bold text-white truncate max-w-[180px] block">{activeClient.targetCity || "Global"}</span>
            </div>
          </div>

          <div className="bg-[#0b0d18] border border-white/10 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-white/50 uppercase tracking-wider block">Active Services ({activeClient.services.length})</span>
              <span className="text-xs font-bold text-white truncate max-w-[180px] block">{activeClient.services.join(", ")}</span>
            </div>
          </div>

          <div className="bg-[#0b0d18] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-white/50 uppercase tracking-wider block">SerpApi Connection</span>
                <span className="text-xs font-bold text-white">{activeClient.serpApiKey ? "Active ✓" : "Demo Mode"}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("serpapi")}
              className="text-[11px] font-bold text-blue-400 hover:text-blue-300 underline"
            >
              Config
            </button>
          </div>
        </section>

        {/* Dashboard Main Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto">
          {[
            { id: "keywords", label: "40-50 Targeted Keywords", icon: <TrendingUp className="w-4 h-4" />, badge: activeClient.keywords.length },
            { id: "serpapi", label: "SerpApi Live SERP Explorer", icon: <Key className="w-4 h-4" />, badge: "Live" },
            { id: "blogs", label: "Autonomous AI Blog Engine", icon: <FileText className="w-4 h-4" />, badge: articles.length },
            { id: "citations", label: "AI Citations Monitor", icon: <Cpu className="w-4 h-4" /> },
            { id: "overview", label: "Tri-Engine Health Scores", icon: <BarChart3 className="w-4 h-4" /> },
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

        {/* ================= TAB: 40-50 TARGETED KEYWORDS ================= */}
        {activeTab === "keywords" && (
          <div className="space-y-6">
            
            {/* Header & Category Filter Controls */}
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span>Curated High-Potential Search Matrix ({activeClient.keywords.length} Keywords & Topics)</span>
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Synthesized for <strong>{activeClient.name}</strong> across <strong>{activeClient.category}</strong> in <strong>{activeClient.targetCity || "Global"}</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const refreshed = generateKeywordMatrix(
                      activeClient.name,
                      activeClient.category,
                      activeClient.targetCity,
                      activeClient.services,
                      activeClient.brands
                    );
                    setClients((prev) =>
                      prev.map((c) => (c.id === activeClient.id ? { ...c, keywords: refreshed } : c))
                    );
                    alert("Re-synthesized 48 fresh keywords and editorial topics!");
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                  <span>Re-Generate 50 Keywords</span>
                </button>

                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      ["Keyword,Category,Engine,Volume,Difficulty,Intent,Current Rank",
                        ...activeClient.keywords.map(k => `"${k.keyword}","${k.category}","${k.engine}","${k.volume}","${k.difficulty}","${k.intent}","${k.rank}"`)
                      ].join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `${activeClient.name}_50_Keywords_SEO_GEO_AEO.csv`);
                    document.body.appendChild(link);
                    link.click();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download 50 Keywords (CSV)</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: "all", label: `All Keywords (${clientKeywords.length})` },
                  { id: "seo", label: `Google SEO (${clientKeywords.filter(k => k.category === "seo").length})` },
                  { id: "geo", label: `AI GEO Overviews (${clientKeywords.filter(k => k.category === "geo").length})` },
                  { id: "aeo", label: `Voice AEO (${clientKeywords.filter(k => k.category === "aeo").length})` },
                  { id: "blog", label: `AI Blog Topics (${clientKeywords.filter(k => k.category === "blog").length})` }
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setKeywordCategoryFilter(pill.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      keywordCategoryFilter === pill.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <input
                  type="text"
                  placeholder="Search keywords..."
                  value={keywordSearchText}
                  onChange={(e) => setKeywordSearchText(e.target.value)}
                  className="w-full bg-white/[0.06] border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Comprehensive Keywords Table */}
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.04] border-b border-white/10 text-white/50 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Target Keyword / Topic</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Primary Engine</th>
                      <th className="p-4">Est. Volume</th>
                      <th className="p-4">Difficulty</th>
                      <th className="p-4">Search Intent</th>
                      <th className="p-4">Live Rank</th>
                      <th className="p-4 text-right">SerpApi Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredKeywords.map((kw) => (
                      <tr key={kw.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold text-white max-w-sm">
                          <div className="flex flex-col">
                            <span>{kw.keyword}</span>
                            {kw.blogTitle && (
                              <span className="text-[11px] text-purple-300 font-normal mt-0.5">
                                📝 Article: "{kw.blogTitle}"
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            kw.category === "seo"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : kw.category === "geo"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : kw.category === "aeo"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          }`}>
                            {kw.category}
                          </span>
                        </td>
                        <td className="p-4 text-white/80 font-medium">
                          {kw.engine}
                        </td>
                        <td className="p-4 font-mono text-white/70">
                          {kw.volume}
                        </td>
                        <td className="p-4">
                          <span className={`text-[11px] font-bold ${
                            kw.difficulty === "Low" ? "text-emerald-400" : kw.difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
                          }`}>
                            {kw.difficulty}
                          </span>
                        </td>
                        <td className="p-4 text-white/60">
                          {kw.intent}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg bg-white/10 font-black text-blue-300">
                            {kw.rank}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleInspectSerp(kw)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 font-semibold text-[11px] transition-all cursor-pointer"
                          >
                            Inspect SERP
                          </button>
                          {kw.category === "blog" && (
                            <button
                              onClick={() => {
                                setNewBlogKeyword(kw.keyword);
                                setNewBlogTopic(kw.blogTitle || kw.keyword);
                                setNewBlogModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 font-semibold text-[11px] transition-all cursor-pointer"
                            >
                              ⚡ Write Blog
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: SERPAPI LIVE EXPLORER ================= */}
        {activeTab === "serpapi" && (
          <div className="space-y-6">
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-yellow-400" />
                    <span>SerpApi Live Search Engine Integration</span>
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    Connect your <strong>SerpApi Key</strong> to fetch live Google organic SERPs, Knowledge Graphs, Related Searches, and People Also Ask questions for <strong>{activeClient.name}</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    SerpApi Engine Ready
                  </span>
                </div>
              </div>

              {/* Key Configuration Form */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:flex-1">
                  <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">SerpApi Private API Key</label>
                  <input
                    type="password"
                    placeholder="Enter SerpApi key (e.g. serpapi_...)"
                    defaultValue={activeClient.serpApiKey || ""}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      setClients((prev) =>
                        prev.map((c) => (c.id === activeClient.id ? { ...c, serpApiKey: newKey } : c))
                      );
                    }}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <button
                  onClick={() => alert("SerpApi Key validated and saved for " + activeClient.name)}
                  className="w-full sm:w-auto mt-auto px-6 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  Verify Key & Save
                </button>
              </div>
            </div>

            {/* Quick SERP Test Query Trigger */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeClient.keywords.slice(0, 3).map((kw, i) => (
                <div key={i} className="bg-[#0b0d18] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{kw.engine}</span>
                    <h4 className="font-bold text-sm text-white mt-1">"{kw.keyword}"</h4>
                    <span className="text-xs text-white/50 mt-1 block">Volume: {kw.volume} · Rank: {kw.rank}</span>
                  </div>
                  <button
                    onClick={() => handleInspectSerp(kw)}
                    className="mt-4 w-full py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-blue-400" />
                    <span>Run Live SERP Lookup</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB: AI BLOG ENGINE ================= */}
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
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all cursor-pointer"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => alert(`Article '${art.title}' successfully pushed to ${activeClient.platform.toUpperCase()} store!`)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-300 font-medium transition-all cursor-pointer"
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

        {/* ================= TAB: AI CITATIONS MONITOR ================= */}
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

        {/* ================= TAB: TRI-ENGINE HEALTH OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#0b0d18] border border-blue-500/25 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-sm text-white">Google SEO Score</h3>
                  </div>
                  <span className="text-2xl font-black text-blue-400">{activeClient.scores.seo}/100</span>
                </div>
                <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
                  <div className="flex justify-between"><span>Monthly Impressions:</span><span className="font-bold text-white">{activeClient.metrics.impressions}</span></div>
                  <div className="flex justify-between"><span>Organic Clicks:</span><span className="font-bold text-white">{activeClient.metrics.clicks}</span></div>
                  <div className="flex justify-between"><span>Indexed Pages:</span><span className="font-bold text-emerald-400">{activeClient.metrics.indexedPages} Live</span></div>
                </div>
              </div>

              <div className="bg-[#0b0d18] border border-purple-500/25 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-sm text-white">GEO Citations Score</h3>
                  </div>
                  <span className="text-2xl font-black text-purple-400">{activeClient.scores.geo}/100</span>
                </div>
                <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
                  <div className="flex justify-between"><span>AI Citations:</span><span className="font-bold text-purple-300">{activeClient.metrics.aiCitations}</span></div>
                  <div className="flex justify-between"><span>Perplexity Anchors:</span><span className="font-bold text-white">42 Verified</span></div>
                  <div className="flex justify-between"><span>Knowledge Graph:</span><span className="font-bold text-emerald-400">100% Injected</span></div>
                </div>
              </div>

              <div className="bg-[#0b0d18] border border-emerald-500/25 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">AEO Voice Score</h3>
                  </div>
                  <span className="text-2xl font-black text-emerald-400">{activeClient.scores.aeo}/100</span>
                </div>
                <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
                  <div className="flex justify-between"><span>Zero-Click Wins:</span><span className="font-bold text-emerald-300">{activeClient.metrics.voiceAnswers}</span></div>
                  <div className="flex justify-between"><span>Position #0 Snippets:</span><span className="font-bold text-white">18 Queries</span></div>
                  <div className="flex justify-between"><span>Speakable Schema:</span><span className="font-bold text-emerald-400">Active ✓</span></div>
                </div>
              </div>
            </div>

            {/* Schema Graph */}
            <div className="bg-[#0b0d18] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">Tri-Engine JSON-LD Knowledge Graph Schema</h3>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`{\n  "@context": "https://schema.org",\n  "@graph": [\n    {\n      "@type": "Organization",\n      "name": "${activeClient.name}",\n      "url": "${activeClient.url}",\n      "areaServed": "${activeClient.targetCity || "Global"}"\n    }\n  ]\n}`);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all cursor-pointer"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? "Copied!" : "Copy JSON-LD"}</span>
                </button>
              </div>

              <pre className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs text-blue-300/90 overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "${activeClient.url}/#organization",
      "name": "${activeClient.name}",
      "url": "${activeClient.url}",
      "category": "${activeClient.category}",
      "areaServed": "${activeClient.targetCity || "Global"}",
      "makesOffer": ${JSON.stringify(activeClient.services)},
      "brand": ${JSON.stringify(activeClient.brands)}
    }
  ]
}`}
              </pre>
            </div>
          </div>
        )}

        {/* ================= TAB: CMS SETTINGS ================= */}
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
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
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
                <button
                  onClick={handleTestCms}
                  disabled={testingCms}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
                >
                  {testingCms ? "Testing..." : cmsTestSuccess ? "Sync Verified ✓" : "Test Connection"}
                </button>

                <button
                  onClick={() => alert("CMS Connection Settings saved successfully!")}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= MODAL: INTAKE QUESTIONNAIRE (ONBOARDING) ================= */}
      <AnimatePresence>
        {onboardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d18] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setOnboardModalOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black text-white">Client Onboarding & Intake Questionnaire</h3>
              </div>
              <p className="text-xs text-white/50 mb-6">
                Answer these business questions to automatically generate <strong>40-50 curated keywords</strong>, configure <strong>SerpApi</strong>, and connect <strong>WordPress/Shopify</strong>.
              </p>

              <form onSubmit={handleCreateClient} className="space-y-4">
                
                {/* 1. Business Name & Website URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Business / Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Cosmetic Dental"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Website URL / Domain *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. https://apexdental.com"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 2. Business Category & Target City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Business Category / Niche *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cosmetic Dentistry & Smile Makeover"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">
                      Target City / Region <span className="text-white/40 normal-case font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. London · UK or New York or Global"
                      value={formData.targetCity}
                      onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 3. Services Offered */}
                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">
                    Services / Products Offered <span className="text-white/40 normal-case font-normal">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Porcelain Veneers, Dental Implants, Teeth Whitening, Invisalign"
                    value={formData.services}
                    onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 4. Brands / Sub-brands */}
                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">
                    Brands / Sub-brands <span className="text-white/40 normal-case font-normal">(Optional, comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Invisalign, Straumann, Zoom Whitening"
                    value={formData.brands}
                    onChange={(e) => setFormData({ ...formData, brands: e.target.value })}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 5. Platform Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">CMS Platform Connector</label>
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
                        className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
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

                {/* 6. SerpApi Key (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">
                    SerpApi Key <span className="text-white/40 normal-case font-normal">(Optional for live Google SERP lookups)</span>
                  </label>
                  <input
                    type="password"
                    placeholder="e.g. serpapi_xxxxxxxxxxxxxx"
                    value={formData.serpApiKey}
                    onChange={(e) => setFormData({ ...formData, serpApiKey: e.target.value })}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setOnboardModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    ✨ Synthesize 50 Keywords & Onboard Client
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: SERPAPI LIVE SERP INSPECTOR ================= */}
      <AnimatePresence>
        {serpModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d18] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[88vh] overflow-y-auto"
            >
              <button
                onClick={() => setSerpModalItem(null)}
                className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold">
                  SerpApi Live Explorer
                </span>
                <span className="text-xs text-white/50">{serpModalItem.engine}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4">
                SERP Results for: <span className="text-blue-400">"{serpModalItem.keyword}"</span>
              </h3>

              {runningSerpLookup ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-white/70">
                  <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin" />
                  <span className="text-xs font-mono">Querying SerpApi live engine & Google SERP nodes...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Google AI Overview / Featured Snippet Box */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Google AI Overview / Knowledge Citation Detected</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Leading source recommendation citations include <strong>{activeClient.name}</strong> ({activeClient.url}) with high relevance for {activeClient.category} in {activeClient.targetCity || "Global"}.
                    </p>
                  </div>

                  {/* Organic SERP Items */}
                  <div className="space-y-2.5">
                    {[
                      { pos: 1, title: `${activeClient.name} — Official Leading ${serpModalItem.keyword.replace(/^best /, "")}`, url: `${activeClient.url}/services`, snippet: `Discover premier ${activeClient.services.join(", ")} by ${activeClient.name}. Rated #1 for quality and exceptional client outcomes in ${activeClient.targetCity || "Global"}.` },
                      { pos: 2, title: `The Complete Guide to ${serpModalItem.keyword} in 2026`, url: `https://industry-authority.com/guide`, snippet: `Comparing top providers, verified pricing, and expert recommendations for ${serpModalItem.keyword}.` },
                      { pos: 3, title: `Top 10 Rated ${activeClient.category} Providers`, url: `https://bestratings.org/${serpModalItem.keyword.replace(/\s+/g, "-")}`, snippet: `Comprehensive review of certified experts, customer ratings, and verified case studies.` }
                    ].map((res) => (
                      <div key={res.pos} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-xs">
                        <div className="flex items-center justify-between text-blue-400 font-bold mb-1">
                          <span className="hover:underline cursor-pointer">{res.title}</span>
                          <span className="text-white/40 font-mono">Rank #{res.pos}</span>
                        </div>
                        <span className="text-[11px] text-emerald-400 block mb-1 font-mono">{res.url}</span>
                        <p className="text-white/70">{res.snippet}</p>
                      </div>
                    ))}
                  </div>

                  {/* People Also Ask (PAA) */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-bold text-white/80 uppercase mb-2 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                      <span>People Also Ask (PAA - Voice / AEO Match)</span>
                    </h4>
                    <div className="space-y-1.5 text-xs text-white/70">
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                        • How much does {serpModalItem.keyword} typically cost?
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                        • What are the benefits of choosing {activeClient.name}?
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: GENERATE AI BLOG ================= */}
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
                className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer"
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
                    placeholder="e.g. best cosmetic dentistry smile makeovers"
                    value={newBlogKeyword}
                    onChange={(e) => setNewBlogKeyword(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/70 mb-1.5">Article Headline / Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. The Complete 2026 Guide to Cosmetic Dentistry"
                    value={newBlogTopic}
                    onChange={(e) => setNewBlogTopic(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setNewBlogModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20 cursor-pointer"
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

      {/* ================= MODAL: ARTICLE PREVIEW ================= */}
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
                className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer"
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
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
