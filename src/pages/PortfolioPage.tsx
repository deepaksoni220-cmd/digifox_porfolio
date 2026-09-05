import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Globe, 
  Eye, 
  X, 
  ArrowUpRight,
  Filter,
  Rocket,
  Zap,
  Star,
  MessageSquare,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  DollarSign,
  Clock,
  Briefcase
} from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';
import { PageFooter } from '../components/PageFooter';
import { Media } from '../components/Media';
import siteData from '../data.json';

const CATEGORIES = [
  "All",
  "3D Animated Website",
  "WordPress Website",
  "Shopify Website"
];

const WHATSAPP_NUMBER = "918696755996";

/* ─── 3D Sticky Scroll Capability Card ─────────────────────────────────────── */
interface CapabilityCardProps {
  project: (typeof siteData.projects)[0];
  index: number;
  totalCards: number;
  sectionProgress: MotionValue<number>;
  onInquire: (serviceName: string) => void;
}

const CapabilityStickyCard: React.FC<CapabilityCardProps> = ({
  project,
  index,
  totalCards,
  sectionProgress,
  onInquire
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Card's own scroll progress for subtle image parallax
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.2"],
  });

  const imgScale = useTransform(cardProgress, [0, 1], [1.14, 1]);

  // Section-level 3D stacking scale & Y nudging
  const scaleStart = index / totalCards;
  const scaleEnd = (index + 1) / totalCards;
  const scale = useTransform(sectionProgress, [scaleStart, scaleEnd], [1, 1 - (totalCards - 1 - index) * 0.04]);
  const y = useTransform(sectionProgress, [scaleStart, scaleEnd], [0, -26]);

  const stickyTop = 88 + index * 28;

  return (
    <div
      ref={cardRef}
      className="h-[80vh] sm:h-[85vh] flex items-start justify-center mb-8 sm:mb-16"
      style={{ position: "sticky", top: `${stickyTop}px` }}
    >
      <motion.div
        style={{ scale, y, transformOrigin: "top center" }}
        className="w-full max-w-6xl mx-auto rounded-[32px] md:rounded-[48px] border border-[var(--border-strong)] bg-[var(--bg-surface)] overflow-hidden shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-[var(--border-strong)]/40 gap-4">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[var(--text-primary)]/15 select-none font-mono"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="uppercase tracking-[0.2em] text-[var(--text-primary)]/50 font-medium text-[10px] sm:text-xs">
                {project.category}
              </span>
              <h3
                className="font-black uppercase tracking-tight leading-none text-[var(--text-strong)]"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}
              >
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs uppercase tracking-widest border border-white/10 bg-white/[0.03] text-[var(--text-secondary)] rounded-full px-3 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onInquire(project.name)}
            className="self-end sm:self-center px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all cursor-pointer transform-gpu hover:scale-105"
          >
            <span>Inquire Now</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Image Grid with Parallax */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6 md:p-8">
          {/* Left Column (2 Stacked Images) — 38% */}
          <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-4 w-full sm:w-[38%]">
            <div
              className="overflow-hidden rounded-2xl sm:rounded-3xl w-full bg-black/40"
              style={{ height: "clamp(100px, 13vw, 190px)" }}
            >
              <motion.div style={{ scale: imgScale }} className="w-full h-full">
                <Media
                  src={project.images?.leftTop}
                  alt={`${project.name} image 1`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div
              className="overflow-hidden rounded-2xl sm:rounded-3xl w-full bg-black/40"
              style={{ height: "clamp(120px, 17vw, 260px)" }}
            >
              <motion.div style={{ scale: imgScale }} className="w-full h-full">
                <Media
                  src={project.images?.leftBottom}
                  alt={`${project.name} image 2`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column (Hero Feature Image) — 62% */}
          <div
            className="overflow-hidden rounded-2xl sm:rounded-3xl w-full sm:w-[62%] bg-black/40"
            style={{ height: "clamp(220px, 32vw, 470px)" }}
          >
            <motion.div style={{ scale: imgScale }} className="w-full h-full">
              <Media
                src={project.images?.right}
                alt={`${project.name} main showcase`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Quote & Consultation Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Quote Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: '3D Animated Website',
    budget: '$1,000 - $3,000',
    timeline: 'Standard (3-4 weeks)',
    message: ''
  });

  const capabilitiesSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: capabilitiesScrollProgress } = useScroll({
    target: capabilitiesSectionRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const portfolioItems = useMemo(() => {
    return siteData.portfolioLinks || [];
  }, []);

  const filteredProjects = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [portfolioItems, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: portfolioItems.length };
    portfolioItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [portfolioItems]);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "3D Animated Website":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Shopify Website":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "WordPress Website":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format formatted message for direct WhatsApp fallback
    const formattedMsg = `*Digifox Free Quote & Consultation Request*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Business/Brand:* ${formData.businessName || 'Not specified'}\n` +
      `*Phone/WhatsApp:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Service Required:* ${formData.service}\n` +
      `*Estimated Budget:* ${formData.budget}\n` +
      `*Target Timeline:* ${formData.timeline}\n` +
      `*Project Goals & Notes:* ${formData.message || 'Ready for consultation'}`;

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto open WhatsApp with the client's filled quote info
      const encoded = encodeURIComponent(formattedMsg);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    }, 800);
  };

  const handleQuickWhatsApp = (topic?: string) => {
    const defaultText = topic 
      ? `Hello Digifox Team! I am interested in: *${topic}*. Please share pricing and free consultation details.`
      : `Hello Digifox Team! I reviewed your portfolio on digifox.world and I would like to get a free quote & project consultation.`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultText)}`, '_blank');
    setIsWhatsAppModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-hidden pb-20 pt-20">
      <SEOMeta 
        title="Portfolio & Selected Works | Digifox 5D"
        description="Explore our curated portfolio of immersive 3D websites, custom WordPress solutions, high-converting Shopify stores, and modern digital web applications."
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(225,0,255,0.18)_0%,_transparent_70%)] pointer-events-none z-0 transform-gpu" />
      <div className="absolute top-[25%] right-[-10%] w-[55%] h-[55%] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none z-0 transform-gpu" />
      <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.12)_0%,_transparent_70%)] pointer-events-none z-0 transform-gpu" />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-strong)] shadow-md">
        <div className="flex items-center gap-3">
          <a 
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-[var(--text-strong)] hover:text-[#3b82f6] transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden min-[400px]:inline">Home</span>
          </a>
          <span className="text-[var(--text-secondary)]/40 hidden sm:inline">/</span>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hidden sm:inline">
            Portfolio Showcase
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setIsQuoteModalOpen(true);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Rocket size={13} />
            <span>Get Free Quote</span>
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 pt-8 sm:pt-14 pb-12 relative z-10 text-center flex flex-col items-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-heading font-black uppercase tracking-tight leading-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 max-w-5xl"
        >
          Our <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed font-light mb-10"
        >
          Explore our handpicked collection of high-converting 3D animated websites, bespoke WordPress platforms, luxury Shopify e-commerce stores, and high-performance digital marketing solutions.
        </motion.p>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl p-4 sm:p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl mb-12"
        >
          <div className="flex flex-col items-center justify-center p-3 text-center border-b sm:border-b-0 sm:border-r border-[var(--border-strong)]/40">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-strong)] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              100%
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mt-1">
              Custom Tailored
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 text-center border-b sm:border-b-0 sm:border-r border-[var(--border-strong)]/40">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-strong)] bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              3D & WebGL
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mt-1">
              Interactive Tech
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-strong)] bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Global
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mt-1">
              Worldwide Reach
            </span>
          </div>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {CATEGORIES.map(category => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-[var(--text-strong)] text-[var(--bg-base)] border-[var(--text-strong)] shadow-lg scale-105'
                      : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] hover:border-[var(--text-strong)]/50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search by project name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs sm:text-sm text-[var(--text-strong)] placeholder-[var(--text-secondary)]/50 focus:border-[#3b82f6] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-strong)]"
              >
                <X size={14} />
              </button>
            )}
          </div>

        </div>

      </section>

      {/* Portfolio Grid Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 relative z-10">
        
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={item.url + index}
                className="group relative flex flex-col bg-[var(--bg-surface)] rounded-3xl overflow-hidden border border-[var(--border-strong)] hover:border-blue-500/50 hover:shadow-2xl transition-all duration-500"
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-base)]">
                  <div className="absolute inset-0 bg-[#D9D9D9] group-hover:scale-108 transition-transform duration-700 ease-out">
                    <Media 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Top floating badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] p-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform transform-gpu hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      <span>Live Site</span>
                    </a>
                    <button
                      onClick={() => setSelectedProject(item)}
                      className="px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 backdrop-blur-md border border-white/30 transition-transform transform-gpu hover:scale-105 cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between border-t border-[var(--border-strong)]/40 bg-[var(--bg-surface)]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                        Production Live
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[var(--text-strong)] group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[var(--border-strong)]/30 flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--text-secondary)]/70 truncate max-w-[160px] sm:max-w-[200px]">
                      {item.url.replace(/^https?:\/\//, '')}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[var(--bg-base)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm"
                      title="Visit Website"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center flex flex-col items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl">
            <Filter size={40} className="text-[var(--text-secondary)]/40 mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-strong)] mb-2">No projects found</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mb-6">
              We couldn't find any projects matching "{searchQuery}" in the selected category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-500 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      {/* Featured Studio Pillars / Case Studies Section */}
      <section 
        ref={capabilitiesSectionRef}
        className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 pt-24 sm:pt-32 relative z-10"
      >
        <div className="text-center mb-16 sm:mb-20 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-primary)]/40 font-semibold block mb-3">
            All Agency Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--text-strong)]">
            We Build <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Digital Wins</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mt-4 font-light">
            Every project is engineered with three core competencies to deliver unforgettable user experience and maximize conversion rates.
          </p>
        </div>

        {/* 3D Stacking Cards Scroll Area */}
        <div className="pb-24 sm:pb-36">
          {siteData.projects?.map((project, idx) => (
            <CapabilityStickyCard
              key={project.number || idx}
              project={project}
              index={idx}
              totalCards={siteData.projects.length}
              sectionProgress={capabilitiesScrollProgress}
              onInquire={(serviceName) => {
                setFormData(prev => ({ ...prev, service: serviceName }));
                setIsSubmitted(false);
                setIsQuoteModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 sm:pt-32 relative z-10">
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center relative overflow-hidden shadow-2xl backdrop-blur-md">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Star size={13} />
            <span>Start Your Next Milestone</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)] mb-4 max-w-2xl">
            Want a Custom Website Like These?
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8 font-light">
            Whether you need an interactive 3D WebGL showcase, high-conversion Shopify storefront, or automated AI website, our engineers are ready to build it.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Form Fill Activation Button: Get Free Quote & Consultation */}
            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsQuoteModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(59,130,246,0.35)] flex items-center justify-center gap-2 cursor-pointer transform-gpu hover:scale-105 active:scale-95"
            >
              <Rocket size={16} />
              <span>Get Free Quote & Consultation</span>
            </button>

            {/* WhatsApp Direct Chat Activation Button */}
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all border border-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transform-gpu hover:scale-105 active:scale-95"
            >
              <MessageSquare size={16} className="text-emerald-400" />
              <span>WhatsApp Direct Chat</span>
            </button>
          </div>

        </div>
      </section>

      {/* Quote & Consultation Modal Form */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-strong)] bg-[var(--bg-base)]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Rocket size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black uppercase text-[var(--text-strong)]">
                      Get Free Quote & Consultation
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Receive an expert estimate & timeline within 2 hours
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-strong)] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form or Submitted State */}
              <div className="p-6 sm:p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-2xl font-black uppercase text-[var(--text-strong)]">
                      Quote Request Received!
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] max-w-md">
                      Thank you, <span className="font-bold text-[var(--text-strong)]">{formData.name}</span>. We are opening your WhatsApp chat to connect you immediately with our lead developer & designer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
                      <button
                        onClick={() => {
                          const formattedMsg = `*Digifox Free Quote Request*\n*Name:* ${formData.name}\n*Service:* ${formData.service}\n*Budget:* ${formData.budget}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Notes:* ${formData.message || 'Free consultation'}`;
                          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMsg)}`, '_blank');
                        }}
                        className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <MessageSquare size={16} />
                        <span>Chat on WhatsApp Now</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setIsQuoteModalOpen(false);
                        }}
                        className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-5">
                    
                    {/* Name & Business */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                          <span>Your Name</span> <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Connor"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                          <Briefcase size={12} />
                          <span>Business / Brand</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Apex Studio or Website URL"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                          <Mail size={12} />
                          <span>Email Address</span> <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                          <Phone size={12} />
                          <span>WhatsApp / Phone</span> <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 234 567 8900"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Service & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        >
                          <option value="3D Animated Website">3D Animated & WebGL Website</option>
                          <option value="Shopify Website">Shopify E-Commerce Store</option>
                          <option value="WordPress Website">WordPress / Custom CMS</option>
                          <option value="Full-Stack Web App">Full-Stack Web App & Next.js</option>
                          <option value="SEO & Performance Marketing">SEO & Performance Marketing</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                          <DollarSign size={12} />
                          <span>Estimated Budget</span>
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        >
                          <option value="Under $1,000">Under $1,000 (Starter)</option>
                          <option value="$1,000 - $3,000">$1,000 - $3,000 (Recommended)</option>
                          <option value="$3,000 - $7,500">$3,000 - $7,500 (3D & Interactive)</option>
                          <option value="$7,500+">$7,500+ (Enterprise & Custom)</option>
                        </select>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1">
                        <Clock size={12} />
                        <span>Desired Timeline</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Urgent (1-2 wks)', 'Standard (3-4 wks)', 'Flexible'].map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setFormData({ ...formData, timeline: time })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                              formData.timeline === time 
                                ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                                : 'bg-[var(--bg-base)] border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-strong)]'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Goals / Requirements */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Project Goals & References
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us what you want to achieve, any competitor sites you like, or specific features..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(59,130,246,0.35)] cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Preparing Your Quote...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit & Connect on WhatsApp / Email</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Direct Quick Connect Modal */}
      <AnimatePresence>
        {isWhatsAppModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-surface)] border border-emerald-500/30 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6 sm:p-8 flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase text-[var(--text-strong)]">
                      WhatsApp Direct Chat
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-emerald-400 font-bold">Online & Ready to Chat</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsWhatsAppModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-[var(--text-strong)] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Choose a topic to jump straight into a direct conversation with our creative and technical leads on WhatsApp:
              </p>

              {/* Quick Topics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { label: "🚀 3D Animated Website", desc: "Interactive WebGL & 3D models" },
                  { label: "🛍️ Shopify E-Commerce", desc: "High conversion luxury stores" },
                  { label: "🌐 WordPress Platform", desc: "Custom themes & high speed" },
                  { label: "📈 SEO & Growth Ads", desc: "Meta, Google & Organic scale" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleQuickWhatsApp(item.label)}
                    className="p-3.5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] hover:border-emerald-500/50 hover:bg-emerald-500/5 text-left transition-all cursor-pointer flex flex-col gap-1 group"
                  >
                    <span className="text-xs font-bold text-[var(--text-strong)] group-hover:text-emerald-400 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)]">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => handleQuickWhatsApp()}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                >
                  <MessageSquare size={16} />
                  <span>Start Instant Chat on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setIsWhatsAppModalOpen(false);
                    setIsSubmitted(false);
                    setIsQuoteModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-strong)] transition-all cursor-pointer"
                >
                  Or Fill Complete Detailed Quote Form
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-[var(--border-strong)]">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[var(--text-strong)] truncate max-w-xs sm:max-w-md">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-[var(--text-strong)] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body Preview (Interactive Iframe for templates or high-res Image) */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
                {selectedProject.url?.includes('/templates/') || selectedProject.url?.endsWith('.html') ? (
                  <iframe
                    src={selectedProject.url}
                    title={selectedProject.title}
                    className="w-full h-full border-none"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                  />
                ) : (
                  <Media
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--bg-surface)]">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-[var(--text-secondary)]">Destination Live URL:</p>
                  <p className="text-sm font-bold text-blue-400 font-mono truncate max-w-xs sm:max-w-sm">
                    {selectedProject.url}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Open Live Site</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PageFooter />
    </main>
  );
};
