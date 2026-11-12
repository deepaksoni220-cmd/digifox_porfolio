import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Filter, 
  X, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Trash2, 
  Tag,
  Laptop,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Play,
  Eye
} from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';
import { PageFooter } from '../components/PageFooter';
import { canEmbedInWindow, getEmbedUrl } from '../services/protectedReferenceService';

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
  // ─── DIGIFOX CLIENT & PRODUCTION WEBSITES ─────────────────────────────────
  {
    id: 'digifox-spatial-apparels',
    title: 'Spatial Apparels - 3D Fashion Rail',
    url: '/templates/spatial/index.html',
    category: 'Fashion',
    description: 'Spatial 3D fashion rail and apparel experience featuring interactive wardrobe physics, smooth curve rail navigation, and luxury product storytelling.',
    tags: ['Fashion', 'Apparel', '3D Spatial', 'Interactive WebGL', 'Luxury'],
    previewImage: '/previews/preview-spatial_apparels.png',
    statusBadge: 'Fashion 3D'
  },
  {
    id: 'digifox-aurelle-jewelry',
    title: 'Aurelle Luxury Diamond & Jewelry 3D Store',
    url: '/showcase/ref_aurelle_jewelry',
    category: '3D Animated Websites',
    description: 'Bespoke high-jewelry 3D web platform featuring real-time diamond refraction, luxury dark editorial aesthetic, and interactive product customizer.',
    tags: ['3D WebGL', 'Diamond Jewelry', 'Luxury Store', 'E-Commerce'],
    previewImage: '/previews/preview-ref_aurelle_jewelry.png',
    statusBadge: 'Digifox Production'
  },
  {
    id: 'digifox-samarth-cactus',
    title: 'Samarth Cactus Nursery Official Store',
    url: '/showcase/ref_samarth_cactus',
    category: 'Shopify Websites',
    description: 'High-conversion botanical Shopify e-commerce nursery store with live catalog sync, rare plant listings, and express checkout flow.',
    tags: ['Shopify', 'Botanical Nursery', 'E-Commerce', 'Mobile Optimized'],
    previewImage: '/previews/preview-ref_samarth_cactus.png',
    statusBadge: 'Live Client Site'
  },
  {
    id: 'digifox-lotus-gold',
    title: 'Lotus Gold Makana Brand Portal',
    url: '/showcase/ref_lotus_gold',
    category: 'WordPress Websites',
    description: 'FMCG brand portal with dynamic product presentation, nutrition storytelling, distribution inquiry funnel, and wholesale ordering.',
    tags: ['WordPress', 'FMCG Food', 'Brand Identity', 'Product Grid'],
    previewImage: '/previews/preview-ref_lotus_gold.png',
    statusBadge: 'Live Client Site'
  },
  {
    id: 'digifox-ninety-degree',
    title: 'Ninety Degree Stone & Architecture',
    url: '/showcase/ref_ninety_degree',
    category: 'WordPress Websites',
    description: 'Premium architectural natural stone and granite fabrication portal featuring stone slab gallery, case studies, and quote engine.',
    tags: ['WordPress', 'Architecture', 'Stone & Marble', 'Commercial'],
    previewImage: '/previews/preview-ref_ninety_degree.png',
    statusBadge: 'Live Client Site'
  },
  {
    id: 'digifox-abacus-master',
    title: 'Abacus Master Canada Learning Academy',
    url: '/showcase/ref_abacus_master',
    category: 'WordPress Websites',
    description: 'International mental math education platform with student course enrollment, interactive curriculum breakdown, and inquiry system.',
    tags: ['WordPress', 'Education', 'Academy Portal', 'Global Reach'],
    previewImage: '/previews/preview-ref_abacus_master.png',
    statusBadge: 'Live Client Site'
  },
  {
    id: 'digifox-rukmi-jewellery',
    title: 'Rukmi Silver Jewellery Boutique',
    url: '/showcase/ref_rukmi_jewellery',
    category: 'Shopify Websites',
    description: 'Artisan 925 sterling silver jewelry Shopify storefront featuring gift drawer, multi-currency display, and mobile-first navigation.',
    tags: ['Shopify', 'Silver Jewellery', 'Artisan Store', 'Mobile First'],
    previewImage: '/previews/preview-ref_rukmi_jewellery.png',
    statusBadge: 'Live Client Site'
  },
  {
    id: 'digifox-property-realestate',
    title: 'Digifox Luxury Real Estate & Villa Portal',
    url: '/showcase/ref_property_realestate',
    category: 'WordPress Websites',
    description: 'Elite residential real estate showcase with property portfolio, interactive neighborhood views, and private viewing appointments.',
    tags: ['WordPress', 'Real Estate', 'Villa Showcase', 'Lead Engine'],
    previewImage: '/image-1783079877455-126209707.png',
    statusBadge: 'Digifox Production'
  },
  {
    id: 'digifox-world-agency',
    title: 'Digifox Official Agency Portal & Studio',
    url: '/',
    category: '3D Animated Websites',
    description: 'Flagship 5D digital agency platform highlighting full-stack engineering, performance marketing, 3D WebGL development, and AI design.',
    tags: ['Flagship Agency', '3D WebGL', 'Performance', 'Full Stack'],
    previewImage: '/image-1783079897625-656293953.png',
    statusBadge: 'Flagship Platform'
  },
  {
    id: 'digifox-agency-coaches',
    title: 'Agency & Executive Coaching 3D Platform',
    url: '/showcase/ref_agency_coaches',
    category: '3D Animated Websites',
    description: 'High-impact dark luxury coaching and consulting platform with client testimonials, audio-visual masterclasses, and booking workflow.',
    tags: ['3D Animated', 'Coaching Platform', 'High Ticket', 'Booking System'],
    previewImage: '/image-1783081181632-620110443.png',
    statusBadge: 'Digifox Production'
  },
  {
    id: 'digifox-online-store-3d',
    title: '3D Interactive Product Store',
    url: '/showcase/ref_online_store_3d',
    category: '3D Animated Websites',
    description: 'Futuristic consumer electronic and accessories storefront with 360-degree rotation, exploded part disassembly, and instant cart.',
    tags: ['3D WebGL', 'Product Explosion', 'E-Commerce', 'Dark UI'],
    previewImage: '/image-1783081097015-89310139.png',
    statusBadge: 'Digifox Production'
  },
  {
    id: 'digifox-backend-fullstack',
    title: 'Full-Stack Cloud E-Commerce Storefront',
    url: '/showcase/ref_backend_fullstack',
    category: '3D Animated Websites',
    description: 'Production full-stack e-commerce engine with inventory management, Supabase/Firebase database, stripe checkout, and dynamic stock.',
    tags: ['Full Stack', 'Cloud Database', 'Automated Orders', 'Storefront'],
    previewImage: '/image-1783080979986-78210779.png',
    statusBadge: 'Digifox Production'
  },
  {
    id: 'digifox-3d-portfolio',
    title: 'Digifox 3D Interactive Portfolio',
    url: '/showcase/ref_3d_portfolio',
    category: '3D Animated Websites',
    description: 'Immersive 3D space scene portfolio with interactive gravity particles, floating project pods, and smooth camera waypoints.',
    tags: ['3D WebGL', 'Three.js', 'Particle Physics', 'Portfolio'],
    previewImage: '/image-1783080973853-739149021.png',
    statusBadge: 'Digifox Production'
  },

  // ─── DIGIFOX INTERACTIVE PROTOTYPES & DEMOS ──────────────────────────────
  {
    id: 'demo-blacklane-limo',
    title: 'Blacklane Luxury Chauffeur & Limousine',
    url: '/templates/blacklane/index.html',
    category: '3D Animated Websites',
    description: 'Premier black car and limousine reservation portal featuring vehicle selector, real-time booking form, and dark luxury styling.',
    tags: ['Chauffeur', 'Limousine', 'Fleet Booking', 'Luxury Travel'],
    previewImage: '/previews/preview-blacklane.png',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-intik-burgers',
    title: 'Intik Gourmet Burgers & Dining 3D',
    url: '/templates/intikburgers/index.html',
    category: '3D Animated Websites',
    description: 'Immersive restaurant & cloud kitchen showcase with visual food menu, burger ingredient assembly, and delivery integration.',
    tags: ['Restaurant', 'Gourmet Food', 'Menu System', 'Hospitality'],
    previewImage: '/previews/preview-intikburgers.png',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-gsap-motion',
    title: 'GSAP Kinetic Animation Studio',
    url: '/templates/gsap/index.html',
    category: '3D Animated Websites',
    description: 'High-performance interactive web experience showcasing smooth GSAP scroll animations, parallax layers, and micro-interactions.',
    tags: ['GSAP 3', 'Kinetic Typography', 'Scroll Trigger', 'Animations'],
    previewImage: '/previews/preview-gsap.png',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-biska-fashion',
    title: 'Biska Fashion & Streetwear Studio',
    url: '/templates/biska/index.html',
    category: '3D Animated Websites',
    description: 'Cutting-edge apparel brand storefront with lookbook, responsive product grid, cart drawer, and high-energy motion design.',
    tags: ['Fashion', 'Streetwear', 'Lookbook', 'Apparel Store'],
    previewImage: '/image-1783080085858-787642334.jpg',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-studio-fashion',
    title: 'Studio Fashion & Luxury Editorial',
    url: '/templates/studiofashion/index.html',
    category: '3D Animated Websites',
    description: 'Minimalist luxury beauty and apparel storefront designed for high-conversion storytelling, editorial lookbooks, and checkout.',
    tags: ['Beauty', 'Fashion Store', 'Editorial Lookbook', 'Conversion'],
    previewImage: '/image-1783079742315-345189993.png',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-cars-melbourne',
    title: 'BookCabs Melbourne VIP Fleet',
    url: '/templates/cars/index.html',
    category: '3D Animated Websites',
    description: 'High-end chauffeur and luxury transport platform featuring interactive fleet selector, Lenis smooth scrolling, and booking quotes.',
    tags: ['Melbourne VIP', 'Luxury Fleet', 'Chauffeur Booking', 'Lenis Scroll'],
    previewImage: '/templates/demo-cars-vanta.png',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-motion-sneakers',
    title: 'Adidas Chile20 3D Sneaker Experience',
    url: '/templates/shoes/index.html',
    category: '3D Animated Websites',
    description: 'Interactive 3D product showcase highlighting athletic footwear with customizable angles, colorways, and smooth camera transitions.',
    tags: ['3D Model', 'Footwear', 'Interactive WebGL', 'Product Demo'],
    previewImage: '/image-1783080020266-402606108.png',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-nova-creative',
    title: 'Adam Roberts Interactive Design Portfolio',
    url: '/templates/digpro/index.html',
    category: '3D Animated Websites',
    description: 'Avant-garde digital design agency portfolio with interactive cursor physics, case study reveals, and booking workflow.',
    tags: ['Agency', 'Creative Studio', 'Physics Cursors', 'Portfolio'],
    previewImage: '/image-1783080075680-896100451.png',
    statusBadge: 'Digifox Prototype'
  },
  {
    id: 'demo-lesa-app',
    title: 'Lesa Gifts & Lifestyle Mobile App',
    url: '/templates/lesa/index.html',
    category: 'Shopify Websites',
    description: 'Modern mobile-first e-commerce app prototype for curated gifts, personalized hampers, and express checkout.',
    tags: ['Gifts', 'Lifestyle', 'Mobile App', 'Instant Checkout'],
    previewImage: '/image-1783146270623-638183035.png',
    statusBadge: 'Digifox Prototype'
  }
];

const STORAGE_KEY = 'digifox_demo_websites_v9';

export const DemoWebsitesPage: React.FC = () => {
  const [websites, setWebsites] = useState<DemoWebsite[]>(() => {
    if (typeof localStorage === 'undefined') return DEFAULT_DEMO_WEBSITES;
    try {
      // Clear legacy broken entries from previous versions
      localStorage.removeItem('digifox_custom_demo_websites');
      localStorage.removeItem('digifox_demo_websites_v2');
      localStorage.removeItem('digifox_demo_websites_v3');
      localStorage.removeItem('digifox_demo_websites_v4');
      localStorage.removeItem('digifox_demo_websites_v5');
      localStorage.removeItem('digifox_demo_websites_v6');
      localStorage.removeItem('digifox_demo_websites_v7');
      localStorage.removeItem('digifox_demo_websites_v8');

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out broken URLs that pointed to /portfolio or old broken paths
          const valid = parsed.filter(
            (w: any) =>
              w.id !== 'demo-ai-builder' &&
              w.url !== '/portfolio' &&
              !w.title?.toLowerCase().includes('ai builder') &&
              !w.url?.includes('/ai-builder') &&
              !w.url?.includes('skyelite')
          );
          if (valid.length > 0) return valid;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_DEMO_WEBSITES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // View Mode: 'grid' (Cards Showcase) by default, or 'stage'
  const [viewMode, setViewMode] = useState<'stage' | 'grid'>('grid');

  // Active in-window site (for stage view and popup modal)
  const [activeWebsite, setActiveWebsite] = useState<DemoWebsite>(() => websites[0] || DEFAULT_DEMO_WEBSITES[0]);

  // Modal in-window viewer state
  const [showInWindowModal, setShowInWindowModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'live' | 'static'>('live');
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = () => {
    setIframeKey((k) => k + 1);
  };

  // Add Demo Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('3D Animated Websites');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newPreviewImage, setNewPreviewImage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save to localStorage whenever websites change (always excluding AI Builder)
  useEffect(() => {
    try {
      const cleanList = websites.filter(
        (w) =>
          w.id !== 'demo-ai-builder' &&
          !w.title.toLowerCase().includes('ai builder') &&
          !w.url.includes('/ai-builder')
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanList));
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
        site.description.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [websites, searchQuery, selectedCategory]);

  const handleOpenInWindow = (site: DemoWebsite, asModal: boolean = true) => {
    setActiveWebsite(site);
    setDisplayMode('live');
    setIframeKey((k) => k + 1);
    if (asModal) {
      setShowInWindowModal(true);
    } else {
      const stageEl = document.getElementById('in-window-stage');
      if (stageEl) {
        stageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setShowInWindowModal(true);
      }
    }
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
    setActiveWebsite(newSite);
    setShowAddModal(false);
    setNewTitle('');
    setNewUrl('');
    setNewDescription('');
    setNewTags('');
    setNewPreviewImage('');
  };

  const handleDeleteWebsite = (id: string) => {
    setWebsites((prev) => {
      const updated = prev.filter((w) => w.id !== id);
      if (activeWebsite.id === id && updated.length > 0) {
        setActiveWebsite(updated[0]);
      }
      return updated;
    });
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset demo websites list to default showcase collection?')) {
      setWebsites(DEFAULT_DEMO_WEBSITES);
      setActiveWebsite(DEFAULT_DEMO_WEBSITES[0]);
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('digifox_custom_demo_websites');
        localStorage.removeItem('digifox_demo_websites_v2');
        localStorage.removeItem('digifox_demo_websites_v3');
        localStorage.removeItem('digifox_demo_websites_v4');
      localStorage.removeItem('digifox_demo_websites_v5');
      localStorage.removeItem('digifox_demo_websites_v6');
      localStorage.removeItem('digifox_demo_websites_v7');
      localStorage.removeItem('digifox_demo_websites_v8');
      } catch {
        // ignore
      }
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-x-hidden pb-24 pt-16 sm:pt-20">
      <SEOMeta
        title="Digifox Websites & In-Window Demo Showcase | Digifox 5D"
        description="Explore Digifox production client websites and interactive prototypes directly in-window. Test responsive desktop, tablet, and mobile static previews without opening external windows."
        url="https://digifox.world/demo-websites"
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-10%] w-[55%] h-[55%] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.12)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-8 py-2.5 sm:py-3.5 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-strong)] shadow-md">
        <a 
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-[var(--text-strong)] hover:text-[#3b82f6] transition-colors"
        >
          <ArrowLeft size={15} />
          <span>Back to Digifox</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/portfolio"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            Portfolio
          </a>
          <span className="hidden xs:inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Digifox Websites Showcase
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 pt-4 sm:pt-10">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 shadow-sm">
            <Sparkles size={13} className="text-yellow-400 animate-pulse" />
            <span>Digifox Production Websites & In-Window Demos</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[var(--text-strong)] mb-2.5 sm:mb-4">
            Digifox <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Websites</span>
          </h1>

          <p className="text-xs sm:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto px-2">
            Explore authentic Digifox client websites, 3D animated platforms, and Shopify stores directly in this window. High-resolution static captures allow seamless inspection across Desktop, Tablet, and Mobile devices without external redirects.
          </p>

          {/* Action Bar & View Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Demo Website</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex p-0.5 sm:p-1 rounded-xl sm:rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <LayoutGrid size={13} />
                <span>Cards Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('stage')}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'stage'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <Monitor size={13} />
                <span>Interactive Stage</span>
              </button>
            </div>

            {websites.length !== DEFAULT_DEMO_WEBSITES.length && (
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[11px] sm:text-xs text-[var(--text-secondary)] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                title="Reset to default showcase list"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* ─── IN-WINDOW LIVE STAGE (DISPLAY SITES DIRECTLY IN WINDOW) ───────── */}
        {viewMode === 'stage' && (
          <div id="in-window-stage" className="mb-10 sm:mb-14 scroll-mt-20 sm:scroll-mt-24">
            
            {/* Quick Website Switcher Ribbon */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5 shrink-0">
                  <Play size={11} className="text-blue-400 fill-blue-400" />
                  <span className="hidden xs:inline">Now In Window:</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-400 truncate">
                  {activeWebsite.title}
                </span>
              </div>

              <div className="hidden sm:block text-xs font-mono text-[var(--text-secondary)]">
                Click any site below to display instantly in this frame
              </div>
            </div>

            {/* Horizontal Website Selector Strip */}
            <div className="-mx-3 px-3 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none snap-x">
              {websites.map((site) => {
                const isActive = activeWebsite.id === site.id;
                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => {
                      setActiveWebsite(site);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs text-left transition-all shrink-0 cursor-pointer snap-start ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/25 font-bold'
                        : 'bg-[var(--bg-surface)] border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="truncate max-w-[140px] sm:max-w-[170px]">{site.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider ${isActive ? 'bg-white/20 text-white' : 'bg-[var(--bg-base)] text-[var(--text-secondary)]'}`}>
                      {site.category.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* In-Window Simulated Browser Frame */}
            <div className="w-full rounded-2xl sm:rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface)] overflow-hidden shadow-2xl flex flex-col">
              
              {/* Browser Navigation Toolbar */}
              <div className="px-2.5 sm:px-6 py-2.5 sm:py-3 border-b border-[var(--border-strong)] bg-[var(--bg-base)] flex items-center justify-between gap-1.5 sm:gap-4">
                {/* Window Dots & Title */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                  <div className="hidden md:block text-xs font-bold text-[var(--text-strong)] truncate max-w-[180px] ml-1.5">
                    {activeWebsite.title}
                  </div>
                </div>

                {/* Clean In-Window Stage Address Bar (No technical URL displayed) */}
                <div className="flex-1 min-w-0 max-w-xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[11px] sm:text-xs text-[var(--text-secondary)] shadow-inner">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  <span className="truncate text-[var(--text-strong)] font-semibold">
                    {displayMode === 'live' && canEmbedInWindow(activeWebsite.url) ? '⚡ Live Running' : '🔒 Verified Snapshot'} · {activeWebsite.title}
                  </span>
                  {canEmbedInWindow(activeWebsite.url) ? (
                    <span className="hidden lg:inline-block text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10">
                      Live Running
                    </span>
                  ) : (
                    <span className="hidden lg:inline-block text-[10px] uppercase font-bold text-blue-400 px-2 py-0.5 rounded-full bg-blue-500/10">
                      Client Site
                    </span>
                  )}
                </div>

                {/* Viewport Device Controls & Fullscreen */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="hidden sm:flex bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-strong)]">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Desktop View (100%)"
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('tablet')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${previewDevice === 'tablet' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Tablet View (768px)"
                    >
                      <Laptop size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Mobile View (375px)"
                    >
                      <Smartphone size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReload}
                    className="p-1.5 sm:p-2 rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                    title="Reload Live Demo"
                  >
                    <RotateCcw size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowInWindowModal(true)}
                    className="p-1.5 sm:p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1"
                    title="Expand Full In-Window Stage"
                  >
                    <Maximize2 size={13} className="sm:w-3.5 sm:h-3.5" />
                    <span className="hidden xs:inline text-[11px] font-semibold">Expand</span>
                  </button>
                </div>
              </div>

              {/* Responsive Live Running Viewport Stage */}
              <div className="w-full h-[65vh] sm:h-[72vh] min-h-[440px] sm:min-h-[520px] max-h-[820px] bg-[#07080e] flex items-center justify-center p-0 sm:p-4 overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-300 overflow-hidden shadow-2xl bg-[#0a0a0c] flex flex-col relative ${
                    previewDevice === 'mobile'
                      ? 'w-full max-w-[390px] sm:max-w-[375px] sm:rounded-[36px] sm:border-[6px] sm:border-zinc-800'
                      : previewDevice === 'tablet'
                      ? 'w-full max-w-[768px] sm:rounded-2xl sm:border border-[var(--border-strong)]'
                      : 'w-full sm:rounded-2xl sm:border border-[var(--border-strong)]'
                  }`}
                >
                  {/* Subtle top indicator inside viewport */}
                  <div className="px-4 py-2 border-b border-[var(--border-strong)]/60 bg-[#0d0e14] flex items-center justify-between text-xs shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold text-zinc-300 text-[11px]">
                        {displayMode === 'live' && canEmbedInWindow(activeWebsite.url)
                          ? `⚡ Live Running Website · ${previewDevice.toUpperCase()}`
                          : `🔒 Verified Client Snapshot · ${previewDevice.toUpperCase()}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {canEmbedInWindow(activeWebsite.url) && (
                        <div className="flex p-0.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-strong)]">
                          <button
                            type="button"
                            onClick={() => setDisplayMode('live')}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                              displayMode === 'live' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                            }`}
                          >
                            <Play size={10} className="fill-current" />
                            <span>Live</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDisplayMode('static')}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                              displayMode === 'static' ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                            }`}
                          >
                            <Eye size={10} />
                            <span>Static</span>
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setShowInWindowModal(true)}
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <Maximize2 size={11} />
                        <span>Full Modal</span>
                      </button>
                    </div>
                  </div>

                  {/* Viewport Content: Live Running iframe or static capture */}
                  {displayMode === 'live' && canEmbedInWindow(activeWebsite.url) ? (
                    <iframe
                      key={activeWebsite.id + iframeKey + previewDevice}
                      src={getEmbedUrl(activeWebsite.url)}
                      title={activeWebsite.title}
                      className="w-full h-full border-none bg-[#0a0a0c] block"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                    />
                  ) : (
                    <div className="w-full flex-1 overflow-y-auto overflow-x-hidden bg-[#050608] scrollbar-thin scrollbar-thumb-zinc-700 relative">
                      <img
                        src={activeWebsite.previewImage || '/previews/preview-blacklane.png'}
                        alt={activeWebsite.title}
                        className="w-full h-auto object-top block select-none pointer-events-auto"
                        loading="eager"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Active Website Detail Strip */}
              <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-t border-[var(--border-strong)] bg-[var(--bg-base)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-strong)]">{activeWebsite.title}</span>
                  <span className="text-[var(--text-secondary)]">·</span>
                  <span className="text-[var(--text-secondary)]">{activeWebsite.category}</span>
                </div>
                <div className="text-[var(--text-secondary)] font-light text-[11px] line-clamp-1 sm:line-clamp-none">
                  {activeWebsite.description}
                </div>
              </div>

            </div>
          </div>
        )}

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
                placeholder="Search demo websites by name, niche, or category..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-sm text-[var(--text-strong)] placeholder:text-[var(--text-secondary)]/60 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white p-1 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Stats Pill */}
            <div className="hidden md:flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] shrink-0">
              <span>
                Showing <strong className="text-[var(--text-strong)]">{filteredWebsites.length}</strong> of {websites.length} Websites
              </span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="-mx-3 px-3 sm:mx-0 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] shrink-0 flex items-center gap-1.5 mr-1">
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
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 snap-start shrink-0 ${
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
              No demo websites match "{searchQuery}". Try a different keyword, choose another category, or add a new demo website below.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold hover:border-blue-500 transition-colors cursor-pointer"
              >
                Clear Search & Filters
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
              >
                + Add Demo Website
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWebsites.map((site, index) => {
              const isCurrentlyActive = activeWebsite.id === site.id;

              return (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onClick={() => handleOpenInWindow(site, true)}
                  className={`rounded-3xl border bg-[var(--bg-surface)] overflow-hidden shadow-xl transition-all duration-300 flex flex-col group cursor-pointer ${
                    isCurrentlyActive
                      ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-2xl'
                      : 'border-[var(--border-strong)] hover:border-blue-500/50 hover:shadow-2xl'
                  }`}
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
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-[var(--bg-surface)] p-6 text-center">
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

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Card Content (Zero Technical URLs displayed) */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[var(--text-strong)] group-hover:text-blue-400 transition-colors leading-snug">
                          {site.title}
                        </h3>
                        {site.isCustom && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteWebsite(site.id);
                            }}
                            className="text-[var(--text-secondary)] hover:text-red-400 p-1 transition-colors cursor-pointer"
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
                        <div className="flex flex-wrap gap-1.5 mb-2">
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

                    {/* Clean Action: Display in Window (Zero raw URLs displayed) */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-strong)]/60">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenInWindow(site, true);
                        }}
                        className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/25 cursor-pointer"
                      >
                        <Monitor size={14} />
                        <span>Display in Window</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* ─── MODAL: FULL IN-WINDOW LIVE VIEWER (ALL SITES DISPLAYED HERE) ─── */}
      <AnimatePresence>
        {showInWindowModal && activeWebsite && (
          <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`bg-[var(--bg-surface)] border-0 sm:border border-[var(--border-strong)] rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
                isFullscreen 
                  ? 'w-full h-full sm:w-[98vw] sm:h-[96vh]' 
                  : 'w-full h-full sm:max-w-6xl sm:h-[92vh]'
              }`}
            >
              {/* Browser Bar */}
              <div className="px-2.5 sm:px-6 py-2.5 sm:py-3 border-b border-[var(--border-strong)] bg-[var(--bg-base)] flex items-center justify-between gap-1.5 sm:gap-4">
                {/* Window Dots & Quick Site Picker */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Dropdown to switch site in-window without leaving */}
                  <select
                    value={activeWebsite.id}
                    onChange={(e) => {
                      const found = websites.find((w) => w.id === e.target.value);
                      if (found) {
                        setActiveWebsite(found);
                      }
                    }}
                    className="hidden sm:block text-xs font-bold text-[var(--text-strong)] bg-[var(--bg-surface)] border border-[var(--border-strong)] px-2.5 py-1.5 rounded-xl cursor-pointer focus:outline-none"
                  >
                    {websites.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.title} ({w.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clean Simulated Address Bar: Live Running or Static */}
                <div className="flex-1 min-w-0 max-w-lg mx-auto flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[11px] sm:text-xs text-[var(--text-secondary)] shadow-inner">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  <span className="truncate text-[var(--text-strong)] font-semibold">
                    {displayMode === 'live' && canEmbedInWindow(activeWebsite.url) ? '⚡ Live Running' : '🔒 Verified Snapshot'} · {activeWebsite.title}
                  </span>
                  {canEmbedInWindow(activeWebsite.url) ? (
                    <span className="hidden xs:inline px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                      Interactive 3D
                    </span>
                  ) : (
                    <span className="hidden xs:inline px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                      Client Site
                    </span>
                  )}
                </div>

                {/* Viewport Device Controls, Fullscreen & Close */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="hidden md:flex bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-strong)]">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Desktop Viewport"
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('tablet')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${previewDevice === 'tablet' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Tablet Viewport"
                    >
                      <Laptop size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
                      title="Mobile Viewport"
                    >
                      <Smartphone size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReload}
                    className="p-1.5 sm:p-2 rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                    title="Reload Live Demo"
                  >
                    <RotateCcw size={13} className="sm:w-3.5 sm:h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1.5 sm:p-2 rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen In-Window'}
                  >
                    {isFullscreen ? <Minimize2 size={13} className="sm:w-3.5 sm:h-3.5" /> : <Maximize2 size={13} className="sm:w-3.5 sm:h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowInWindowModal(false)}
                    className="p-1.5 sm:p-2 rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                    title="Close Window"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Responsive Live Running Viewport Container */}
              <div className="flex-1 bg-[#07080e] flex items-center justify-center p-0 sm:p-4 overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-300 overflow-hidden shadow-2xl bg-[#0a0a0c] flex flex-col relative ${
                    previewDevice === 'mobile'
                      ? 'w-full max-w-[390px] sm:max-w-[375px] sm:rounded-[36px] sm:border-[6px] sm:border-zinc-800'
                      : previewDevice === 'tablet'
                      ? 'w-full max-w-[768px] sm:rounded-2xl sm:border border-[var(--border-strong)]'
                      : 'w-full sm:rounded-2xl sm:border border-[var(--border-strong)]'
                  }`}
                >
                  {/* Subtle top indicator inside viewport */}
                  <div className="px-4 py-2 bg-[#0e0f17] border-b border-[var(--border-strong)]/50 flex items-center justify-between text-[11px] shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-zinc-300 font-semibold text-[11px]">
                        {displayMode === 'live' && canEmbedInWindow(activeWebsite.url)
                          ? `⚡ Live Running Website · ${previewDevice.toUpperCase()} View`
                          : `🔒 Verified Client Snapshot · ${previewDevice.toUpperCase()} View`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {canEmbedInWindow(activeWebsite.url) && (
                        <div className="flex p-0.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-strong)]">
                          <button
                            type="button"
                            onClick={() => setDisplayMode('live')}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                              displayMode === 'live' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                            }`}
                          >
                            <Play size={10} className="fill-current" />
                            <span>Live</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDisplayMode('static')}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                              displayMode === 'static' ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                            }`}
                          >
                            <Eye size={10} />
                            <span>Static</span>
                          </button>
                        </div>
                      )}

                      <span className="hidden sm:inline text-[10px] text-zinc-500 font-sans">
                        {displayMode === 'live' && canEmbedInWindow(activeWebsite.url) ? 'Interactive 3D Simulation' : 'Scroll to inspect'}
                      </span>
                    </div>
                  </div>

                  {/* Viewport Content: Live iframe for local templates or high-res static capture */}
                  {displayMode === 'live' && canEmbedInWindow(activeWebsite.url) ? (
                    <iframe
                      key={activeWebsite.id + iframeKey + previewDevice}
                      src={getEmbedUrl(activeWebsite.url)}
                      title={activeWebsite.title}
                      className="w-full h-full border-none bg-[#0a0a0c] block"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                    />
                  ) : (
                    <div className="w-full flex-1 overflow-y-auto overflow-x-hidden bg-[#050608] scrollbar-thin scrollbar-thumb-zinc-700 relative">
                      <img
                        src={activeWebsite.previewImage || '/previews/preview-blacklane.png'}
                        alt={activeWebsite.title}
                        className="w-full h-auto object-top block select-none pointer-events-auto"
                        loading="eager"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom In-Window Strip with Quick Switcher */}
              <div className="px-3 sm:px-5 py-2 sm:py-3 border-t border-[var(--border-strong)] bg-[var(--bg-base)] flex items-center justify-between gap-2 text-xs overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-[var(--text-strong)] truncate max-w-[140px] sm:max-w-[200px]">{activeWebsite.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                    {activeWebsite.category.split(' ')[0]}
                  </span>
                </div>

                {/* Quick Next / Switch Demo buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="hidden xs:inline text-[11px] text-[var(--text-secondary)] mr-1">Switch:</span>
                  {websites.slice(0, 5).map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => {
                        setActiveWebsite(w);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                        activeWebsite.id === w.id
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-white'
                      }`}
                    >
                      {w.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL: ADD NEW DEMO WEBSITE ─────────────────────────────────────── */}
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
                className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Plus size={18} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)]">
                  Add Demo Website
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-6 font-light">
                Add any live demo website or client prototype to be displayed directly in the in-window showcase.
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
                    Target Site Embed Route / Link *
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
                    Used internally by the in-window frame to display the live site.
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
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm text-[var(--text-strong)] focus:border-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="3D Animated Websites">3D Animated Websites</option>
                      <option value="Shopify Websites">Shopify Websites</option>
                      <option value="WordPress Websites">WordPress Websites</option>
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
