import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Plus, 
  Globe, 
  Filter, 
  Eye, 
  X, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Trash2, 
  Share2,
  Tag,
  Laptop
} from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';
import { PageFooter } from '../components/PageFooter';

export interface DemoWebsite {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
  previewImage?: string;
  isCustom?: boolean;
  statusBadge?: string;
}

const DEFAULT_DEMO_WEBSITES: DemoWebsite[] = [
  {
    id: 'demo-stone-marble',
    title: 'Apex Architectural Stone & Marble',
    url: '/portfolio',
    category: 'Stone & Architecture',
    description: 'High-end marble and granite catalog showcase with interactive slab gallery, luxury aesthetics, and quote generator.',
    tags: ['Marble', 'Granite', 'Architecture', 'Luxury 3D', 'Slab Gallery'],
    previewImage: '/image-1783080075680-896100451.png',
    statusBadge: 'Interactive Demo'
  },
  {
    id: 'demo-skyelite-aviation',
    title: 'SkyElite Luxury Aviation',
    url: '/templates/skyelite/index.html',
    category: 'Luxury & Automotive',
    description: '3D animated private jet booking portal with fleet viewer, charter quote calculator, and VIP aesthetics.',
    tags: ['Private Jet', 'Aviation', '3D WebGL', 'VIP Concierge'],
    previewImage: '/templates/thumbnails/hero-skyelite-preview-DHaZIgUv.gif',
    statusBadge: 'WebGL Prototype'
  },
  {
    id: 'demo-blacklane-limo',
    title: 'Blacklane Style Chauffeur & Limousine',
    url: '/templates/blacklane/index.html',
    category: 'Luxury & Automotive',
    description: 'Premier black car and limousine reservation portal featuring vehicle selector, real-time booking form, and dark luxury styling.',
    tags: ['Chauffeur', 'Limousine', 'Fleet Booking', 'Luxury Travel'],
    previewImage: '/blacklane-cover.jpg',
    statusBadge: 'Interactive Demo'
  },
  {
    id: 'demo-biska-fashion',
    title: 'Biska Fashion & Streetwear Studio',
    url: '/templates/biska/index.html',
    category: 'Fashion & Retail',
    description: 'Cutting-edge apparel brand storefront with lookbook, responsive product grid, cart drawer, and high-energy motion design.',
    tags: ['Fashion', 'Streetwear', 'Lookbook', 'Apparel Store'],
    previewImage: '/image-1783080085858-787642334.jpg',
    statusBadge: 'Store Prototype'
  },
  {
    id: 'demo-samarth-cactus',
    title: 'Samarth Cactus & Exotic Plants',
    url: 'https://www.samarthcactusnursery.com/',
    category: 'E-Commerce & Retail',
    description: 'Live high-converting Shopify store featuring rare succulents, plant care guides, multi-currency checkout, and direct customer support.',
    tags: ['Shopify', 'Plants & Garden', 'D2C Retail', 'Live Store'],
    previewImage: '/image-1783146270623-638183035.png',
    statusBadge: 'Live Client Site'
  },
  {
    id: 'demo-intik-burgers',
    title: 'Intik Gourmet Burgers & Dining',
    url: '/templates/intikburgers/index.html',
    category: 'Food & Dining',
    description: 'Immersive restaurant & cloud kitchen showcase with visual food menu, table reservations, and delivery integration.',
    tags: ['Restaurant', 'Gourmet Food', 'Menu System', 'Hospitality'],
    previewImage: '/image-1783080041291-918187806.png',
    statusBadge: 'Dining Prototype'
  },
  {
    id: 'demo-motion-sneakers',
    title: 'Motion Sneakers 3D Showcase',
    url: '/templates/shoes/index.html',
    category: '3D & WebGL',
    description: 'Interactive 3D product showcase highlighting athletic footwear with customizable angles, colorways, and smooth camera transitions.',
    tags: ['3D Model', 'Footwear', 'Interactive WebGL', 'Product Demo'],
    previewImage: '/image-1783080020266-402606108.png',
    statusBadge: '3D Showcase'
  },
  {
    id: 'demo-nova-creative',
    title: 'Nova Creative Digital Portfolio',
    url: '/templates/digpro/index.html',
    category: 'Tech & SaaS',
    description: 'Avant-garde digital design agency portfolio with interactive cursor physics, case study reveals, and booking workflow.',
    tags: ['Agency', 'Creative Studio', 'Physics Cursors', 'Portfolio'],
    previewImage: '/image-1783080075680-896100451.png',
    statusBadge: 'Agency Showcase'
  },
  {
    id: 'demo-ai-builder',
    title: 'Digifox AI Website Builder & WebMake Studio',
    url: '/ai-builder',
    category: 'Tech & SaaS',
    description: 'Autonomous AI website generation suite with live interactive visual editor, prompt-to-site architecture, and automated SEO dashboard.',
    tags: ['AI Builder', 'NextGen SaaS', 'Auto SEO', 'Studio'],
    previewImage: '/templates/thumbnails/hero-skyelite-preview-DHaZIgUv.gif',
    statusBadge: 'Live Platform'
  }
];

const STORAGE_KEY = 'digifox_custom_demo_websites';

export const DemoWebsitesPage: React.FC = () => {
  const [websites, setWebsites] = useState<DemoWebsite[]>(() => {
    if (typeof localStorage === 'undefined') return DEFAULT_DEMO_WEBSITES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_DEMO_WEBSITES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Modal Preview State
  const [previewWebsite, setPreviewWebsite] = useState<DemoWebsite | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Add Demo Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Fashion & Retail');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newPreviewImage, setNewPreviewImage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save to localStorage whenever websites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
    } catch {
      // ignore
    }
  }, [websites]);

  // Categories with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: websites.length };
    websites.forEach((w) => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, [websites]);

  // Filtered websites
  const filteredWebsites = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return websites.filter((site) => {
      const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
      const matchesSearch =
        !q ||
        site.title.toLowerCase().includes(q) ||
        site.url.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [websites, searchQuery, selectedCategory]);

  const handleCopyLink = (url: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleCopyAllLinks = () => {
    const lines = filteredWebsites.map((site) => {
      const fullUrl = site.url.startsWith('http') ? site.url : `${window.location.origin}${site.url}`;
      return `• ${site.title} (${site.category}): ${fullUrl}`;
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let cleanUrl = newUrl.trim();
    if (!cleanUrl.startsWith('http') && !cleanUrl.startsWith('/')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newSite: DemoWebsite = {
      id: `custom-demo-${Date.now()}`,
      title: newTitle.trim(),
      url: cleanUrl,
      category: newCategory,
      description: newDescription.trim() || 'Custom live demo website added by team.',
      tags: tagsArray.length > 0 ? tagsArray : ['Live Demo', newCategory],
      previewImage: newPreviewImage.trim() || undefined,
      isCustom: true,
      statusBadge: 'Custom Added'
    };

    setWebsites((prev) => [newSite, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
    setNewUrl('');
    setNewDescription('');
    setNewTags('');
    setNewPreviewImage('');
  };

  const handleDeleteWebsite = (id: string) => {
    setWebsites((prev) => prev.filter((w) => w.id !== id));
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset demo websites list to original showcase collection?')) {
      setWebsites(DEFAULT_DEMO_WEBSITES);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-hidden pb-24 pt-20">
      <SEOMeta
        title="Demo Websites & Live Interactive Prototypes | Digifox 5D"
        description="Explore our curated collection of interactive demo websites, 3D WebGL prototypes, luxury e-commerce stores, and high-converting client previews."
        url="https://digifox.world/demo-websites"
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-10%] w-[55%] h-[55%] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.12)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-strong)] shadow-md">
        <a 
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-[var(--text-strong)] hover:text-[#3b82f6] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Digifox</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/portfolio"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            Portfolio
          </a>
          <a
            href="/ai-builder"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            AI Builder
          </a>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Demo Showcase
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 sm:pt-10">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles size={14} className="text-yellow-400 animate-pulse" />
            <span>Interactive Prototypes & Live Demos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[var(--text-strong)] mb-4">
            Demo <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Websites</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto">
            Explore our high-converting interactive demo websites, 3D showcases, and client prototypes. Every link is fully live and clickable—open them directly or preview them in real-time.
          </p>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Demo Website URL</span>
            </button>

            <button
              type="button"
              onClick={handleCopyAllLinks}
              className="px-4 py-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] hover:border-emerald-500/40 text-xs font-bold uppercase tracking-wider text-[var(--text-strong)] hover:text-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Copy all currently filtered demo URLs to clipboard"
            >
              {copiedAll ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span>{copiedAll ? 'Links Copied!' : 'Copy All Links'}</span>
            </button>

            {websites.length !== DEFAULT_DEMO_WEBSITES.length && (
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="px-3.5 py-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs text-[var(--text-secondary)] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                title="Reset to default showcase list"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Search & Category Filter Toolbar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search demo websites by name, niche, tag, or URL..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-sm text-[var(--text-strong)] placeholder:text-[var(--text-secondary)]/60 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white p-1"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Stats Pill */}
            <div className="hidden md:flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] shrink-0">
              <Globe size={14} className="text-blue-400" />
              <span>
                Showing <strong className="text-[var(--text-strong)]">{filteredWebsites.length}</strong> of {websites.length} Websites
              </span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] shrink-0 flex items-center gap-1.5 mr-1">
              <Filter size={12} className="text-blue-400" />
              <span>Category:</span>
            </span>
            {Object.entries(categories).map(([cat, count]) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                      : 'bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[var(--bg-base)] text-[var(--text-secondary)]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Websites Cards Grid */}
        {filteredWebsites.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-center space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-strong)]">No Demo Websites Found</h3>
            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
              No demo websites match "{searchQuery}". Try a different keyword, choose another category, or add a new demo website URL below.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold hover:border-blue-500 transition-colors"
              >
                Clear Search & Filters
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
              >
                + Add Demo URL
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWebsites.map((site, index) => {
              const fullUrl = site.url.startsWith('http') ? site.url : `${typeof window !== 'undefined' ? window.location.origin : ''}${site.url}`;
              const isExternal = site.url.startsWith('http');
              const isCopied = copiedUrl === site.url;

              return (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface)] overflow-hidden shadow-xl hover:border-blue-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  {/* Card Visual Header / Thumbnail */}
                  <div className="relative aspect-[16/10] bg-black/40 overflow-hidden border-b border-[var(--border-strong)] flex items-center justify-center">
                    {site.previewImage ? (
                      <img
                        src={site.previewImage}
                        alt={site.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          // fallback if image fails to load
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-[var(--bg-surface)] p-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2">
                          <Globe size={22} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-strong)] line-clamp-1">
                          {site.title}
                        </span>
                        <span className="text-[11px] font-mono text-[var(--text-secondary)] mt-1">
                          {site.category}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-black/30 pointer-events-none" />

                    {/* Category & Status Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center gap-1 shadow-md">
                        <Layers size={10} className="text-blue-400" />
                        <span>{site.category}</span>
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 flex items-center gap-1 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{site.statusBadge || 'Live Demo'}</span>
                      </span>
                    </div>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs p-4">
                      <button
                        type="button"
                        onClick={() => setPreviewWebsite(site)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>Quick Preview</span>
                      </button>

                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 backdrop-blur-md"
                      >
                        <ExternalLink size={14} />
                        <span>Open Tab</span>
                      </a>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[var(--text-strong)] group-hover:text-blue-400 transition-colors leading-snug">
                          {site.title}
                        </h3>
                        {site.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteWebsite(site.id)}
                            className="text-[var(--text-secondary)] hover:text-red-400 p-1 transition-colors"
                            title="Remove custom website"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-4 line-clamp-2">
                        {site.description}
                      </p>

                      {/* Tags */}
                      {site.tags && site.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {site.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-lg bg-[var(--bg-base)] border border-[var(--border-strong)] text-[10px] font-medium text-[var(--text-secondary)] flex items-center gap-1"
                            >
                              <Tag size={9} className="opacity-50" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* URL DISPLAY AS INTERACTIVE LINK BOX */}
                    <div className="mt-2 pt-4 border-t border-[var(--border-strong)]/60">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-secondary)] mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Globe size={11} className="text-blue-400" />
                          <span>Website URL Link:</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-medium">
                          {isExternal ? 'External URL' : 'Internal Route'}
                        </span>
                      </div>

                      {/* Interactive Clickable URL Box with 1-Click Copy */}
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] group/url hover:border-blue-500/50 transition-all">
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 font-mono text-xs text-blue-400 hover:text-blue-300 font-semibold truncate hover:underline flex items-center gap-1.5"
                          title={`Visit ${fullUrl}`}
                        >
                          <span className="truncate">{site.url}</span>
                          <ExternalLink size={12} className="shrink-0 opacity-70 group-hover/url:opacity-100" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyLink(site.url)}
                          className="px-2 py-1 rounded-lg bg-[var(--bg-surface)] hover:bg-emerald-500/20 text-[11px] font-semibold text-[var(--text-secondary)] hover:text-emerald-400 transition-colors flex items-center gap-1 shrink-0 cursor-pointer border border-transparent hover:border-emerald-500/30"
                          title="Copy Link to Clipboard"
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span className="text-[10px] text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Bottom Action CTAs */}
                      <div className="flex items-center gap-2 mt-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setPreviewWebsite(site)}
                          className="flex-1 py-2 px-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-strong)] hover:text-blue-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Eye size={13} />
                          <span>Preview</span>
                        </button>

                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm hover:text-white"
                        >
                          <span>Open Website</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* MODAL 1: LIVE WEBSITE INTERACTIVE PREVIEW */}
      <AnimatePresence>
        {previewWebsite && (
          <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-6xl h-[92vh] bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Browser Bar */}
              <div className="px-4 sm:px-6 py-3 border-b border-[var(--border-strong)] bg-[var(--bg-base)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="hidden sm:block text-xs font-bold text-[var(--text-strong)] truncate max-w-[220px]">
                    {previewWebsite.title}
                  </div>
                </div>

                {/* Simulated Address Bar */}
                <div className="flex-1 max-w-lg mx-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)]">
                  <Globe size={13} className="text-blue-400 shrink-0" />
                  <span className="truncate flex-1 text-[var(--text-strong)]">{previewWebsite.url}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyLink(previewWebsite.url)}
                    className="hover:text-white transition-colors"
                    title="Copy URL"
                  >
                    {copiedUrl === previewWebsite.url ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>

                {/* Device Viewport Toggle & Close */}
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-strong)]">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Desktop Viewport"
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('tablet')}
                      className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'tablet' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Tablet Viewport"
                    >
                      <Laptop size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Mobile Viewport"
                    >
                      <Smartphone size={14} />
                    </button>
                  </div>

                  <a
                    href={previewWebsite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <span>Open Tab</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setPreviewWebsite(null)}
                    className="p-1.5 rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Responsive Iframe Container */}
              <div className="flex-1 bg-black/60 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-strong)] bg-white ${
                    previewDevice === 'mobile'
                      ? 'w-[375px]'
                      : previewDevice === 'tablet'
                      ? 'w-[768px]'
                      : 'w-full'
                  }`}
                >
                  <iframe
                    src={previewWebsite.url}
                    title={previewWebsite.title}
                    className="w-full h-full border-none bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ADD NEW DEMO WEBSITE URL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Plus size={18} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)]">
                  Add Demo Website URL
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-6 font-light">
                Add any live demo website or client prototype to be displayed on this page with direct clickable links.
              </p>

              <form onSubmit={handleAddWebsite} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Website Title *
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Modern Luxe Jewelry Store"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Website URL (Link) *
                  </label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://client-demo.com or /templates/style1"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                    Can be a full external link (https://...) or an internal project template route.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Fashion & Retail">Fashion & Retail</option>
                      <option value="Stone & Architecture">Stone & Architecture</option>
                      <option value="Luxury & Automotive">Luxury & Automotive</option>
                      <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="3D & WebGL">3D & WebGL</option>
                      <option value="Tech & SaaS">Tech & SaaS</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Real Estate & Homes">Real Estate & Homes</option>
                      <option value="Other Demos">Other Demos</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="Shopify, 3D, Luxury"
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Brief highlight of what this demo website showcases..."
                    className="w-full px-4 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm text-[var(--text-strong)] focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Thumbnail Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPreviewImage}
                    onChange={(e) => setNewPreviewImage(e.target.value)}
                    placeholder="https://... or /image-preview.png"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[var(--border-strong)]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    Add Demo Website
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PageFooter />
    </main>
  );
};

export default DemoWebsitesPage;
