import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";
import { predefinedTemplates } from "../../data/templates";

export const DesignKitsPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "3d" | "2d">("all");
  const [activePreview, setActivePreview] = useState<{ id: string; url: string; title: string } | null>(null);
  const navigate = useNavigate();

  const allTemplates = Object.entries(predefinedTemplates);
  const filtered = allTemplates.filter(([_, t]) => {
    if (filter === "3d") return t.category === "3d";
    if (filter === "2d") return t.category === "2d" || !t.category;
    return true;
  });

  const handleOpenStudio = (templateData: any) => {
    sessionStorage.setItem("selectedTemplateData", JSON.stringify(templateData));
    navigate("/ai-builder");
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="WebMake Design Kits & 3D Templates — Web Studio"
        description="Browse pre-built 3D WebGL and 2D animated design kits for restaurants, e-commerce, portfolios, and tech businesses."
      />
      
      <WebMakeNav activePage="design-kits" />

      {/* Hero Header */}
      <div className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#a855f7]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#c084fc] mb-6 backdrop-blur-md">
          <span>✨ Curated 3D & 2D Design Kits</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight max-w-4xl mx-auto">
          Explore Production-Ready <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#60a5fa]">
            Design Kits & Templates
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
          Each design kit is built with smooth scroll interactions, responsive mobile rails, and full click-to-edit customizability.
        </p>

        {/* Filter Switcher */}
        <div className="mt-10 inline-flex items-center bg-white/[0.04] border border-white/10 p-1.5 rounded-full backdrop-blur-md">
          {[
            { id: "all", label: "All Design Kits" },
            { id: "3d", label: "⚡ 3D Animated (WebGL)" },
            { id: "2d", label: "✨ 2D Animated" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === tab.id
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-lg shadow-blue-500/25"
                  : "text-white/60 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Design Kits */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(([id, template], i) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group flex flex-col bg-[#0c0d1a] border border-white/[0.08] hover:border-[#3b82f6]/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-300"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#151728]">
                  {template.previewVideoUrl ? (
                    <video
                      src={template.previewVideoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : template.thumbnailUrl ? (
                    <img
                      src={template.thumbnailUrl}
                      alt={template.hero?.title || id}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
                  )}

                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-black/80 backdrop-blur-md border border-white/15 text-[#60a5fa]">
                      {template.category === "3d" ? "3D Experience" : "2D Interactive"}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md border border-white/15 text-white/80">
                      {template.websiteType}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#0c0d1a] to-[#080912]">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight mb-2">
                      {template.hero?.title || id}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2 mb-6">
                      {template.shortDescription || template.hero?.subtitle || "High-converting animated design kit ready for instant customization."}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                    <button
                      onClick={() => handleOpenStudio(template)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:opacity-90 text-white font-black text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      Open in Studio ⚡
                    </button>
                    {template.previewUrl && (
                      <button
                        onClick={() => setActivePreview({ id, url: template.previewUrl!, title: template.hero?.title || id })}
                        className="px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        title="Live Preview"
                      >
                        Preview ↗
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {activePreview && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl h-[85vh] bg-[#0c0d1a] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080912]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="font-bold text-sm text-white">{activePreview.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const found = allTemplates.find(([id]) => id === activePreview.id)?.[1];
                      if (found) handleOpenStudio(found);
                    }}
                    className="px-4 py-1.5 rounded-full bg-[#3b82f6] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors"
                  >
                    Customize in Studio 🚀
                  </button>
                  <button
                    onClick={() => setActivePreview(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black">
                <iframe
                  src={activePreview.url}
                  title="Template Live Preview"
                  className="w-full h-full border-none"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <WebMakeFooter />
</div>
  );
};
