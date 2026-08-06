import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GeneratedWebsiteData } from '../../services/aiBuilderService';
import { predefinedTemplates } from '../../data/templates';

interface TemplateGalleryProps {
  onSelect: (templateId: string, data: GeneratedWebsiteData) => void;
}

interface TemplateCardProps {
  id: string;
  template: GeneratedWebsiteData;
  index: number;
  onSelect: (id: string, data: GeneratedWebsiteData) => void;
  onPreviewClick: (id: string, data: GeneratedWebsiteData) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  id, 
  template, 
  index, 
  onSelect, 
  onPreviewClick
}) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (hovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [hovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-[#0b0c16] border border-[#1b1d30] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#3b82f6]/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500"
    >
      {/* Decorative corner glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#3b82f6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#8b5cf6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Thumbnail Area */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#121424]">
        {template.previewUrl && hovered ? (
          <div className="w-full h-full relative pointer-events-none select-none overflow-hidden">
            <iframe
              src={template.previewUrl}
              title={`${id} Live Preview`}
              className="absolute top-0 left-0 w-[250%] h-[250%] border-none origin-top-left scale-[0.4] bg-black"
              scrolling="no"
              loading="lazy"
            />
            {/* Safe visual overlay mask to darken slightly */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ) : template.thumbnailUrl ? (
          <img 
            src={template.thumbnailUrl} 
            alt={template.hero?.title || 'Template'} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div 
            className="w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              background: `linear-gradient(135deg, ${template.theme?.primaryColor || '#3b82f6'}33 0%, ${template.theme?.secondaryColor || '#1e3a8a'}99 100%)`
            }}
          />
        )}
        
        {/* Modern Type Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#0b0c16]/95 border border-[#1b1d30] text-[10px] font-extrabold uppercase tracking-widest text-[#3b82f6] px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
            {template.category === '3d' ? 'Business Site' : 'Standard Web'}
          </span>
        </div>

        {/* 3D Animated Indicator */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#0b0c16]/95 border border-[#1b1d30] px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">
            {template.category === '3d' ? '⚡ 3D Animated' : '✨ 2D Standard'}
          </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-[#0b0c16] to-[#07080e]">
        <div className="flex-1">
          <h3 className="text-white font-extrabold text-lg tracking-tight mb-2">
            {template.hero?.title || 'Template Name'}
          </h3>
          <p className="text-[#8e95a5] text-xs leading-relaxed line-clamp-2">
            {template.shortDescription || template.hero?.subtitle || 'A beautiful, modern template designed for high conversions and stunning visuals.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#1b1d30]">
          <button
            onClick={() => onSelect(id, template)}
            className="flex-1 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:opacity-90 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer"
          >
            Customize
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </button>
          {template.previewUrl && (
            <button
              onClick={() => onPreviewClick(id, template)}
              className="flex-1 bg-[#121424] border border-[#262942] hover:bg-[#1b1d30] hover:border-[#3b82f6]/40 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Live Preview
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<'3d' | '2d'>('3d');
  const [activePreview, setActivePreview] = useState<{ id: string, data: GeneratedWebsiteData } | null>(null);

  const templates3D = Object.entries(predefinedTemplates).filter(([_, t]) => t.category === '3d');
  const templates2D = Object.entries(predefinedTemplates).filter(([_, t]) => t.category === '2d' || !t.category);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab Switcher */}
      <div className="flex gap-6 border-b border-[#1b1d30] pb-2 relative">
        <button
          onClick={() => setActiveTab('3d')}
          className="text-sm font-bold uppercase tracking-widest pb-3 relative z-10 transition-colors duration-300 cursor-pointer"
          style={{ color: activeTab === '3d' ? '#3b82f6' : '#8e95a5' }}
        >
          3D Animated
          {activeTab === '3d' && (
            <motion.div 
              layoutId="activeTabUnderline" 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('2d')}
          className="text-sm font-bold uppercase tracking-widest pb-3 relative z-10 transition-colors duration-300 cursor-pointer"
          style={{ color: activeTab === '2d' ? '#ec4899' : '#8e95a5' }}
        >
          2D Standard
          {activeTab === '2d' && (
            <motion.div 
              layoutId="activeTabUnderline" 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ec4899]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Templates Grid with Switch Animations */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {activeTab === '3d' 
            ? templates3D.map(([id, template], i) => (
                <TemplateCard 
                  key={id} 
                  id={id} 
                  template={template} 
                  index={i} 
                  onSelect={onSelect}
                  onPreviewClick={(previewId, previewData) => setActivePreview({ id: previewId, data: previewData })} 
                />
              ))
            : templates2D.map(([id, template], i) => (
                <TemplateCard 
                  key={id} 
                  id={id} 
                  template={template} 
                  index={i} 
                  onSelect={onSelect}
                  onPreviewClick={(previewId, previewData) => setActivePreview({ id: previewId, data: previewData })} 
                />
              ))
          }
        </AnimatePresence>
      </motion.div>

      {/* Modern Pop-up Live Preview Modal */}
      <AnimatePresence>
        {activePreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreview(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full bg-[#0b0c16] overflow-hidden shadow-2xl flex flex-col relative z-10"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#1b1d30] bg-[#0e101f]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-[#8e95a5] font-medium ml-2 font-mono truncate max-w-xs sm:max-w-md">
                    {activePreview.data.previewUrl?.startsWith('/') ? `${window.location.origin}${activePreview.data.previewUrl}` : activePreview.data.previewUrl}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelect(activePreview.id, activePreview.data);
                      setActivePreview(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 border border-blue-500 hover:scale-[1.02] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
                  >
                    Design this template for business
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <button 
                    onClick={() => setActivePreview(null)}
                    className="p-2 hover:bg-[#1b1d30] rounded-full text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              {/* Modal Iframe Content */}
              <div className="flex-1 bg-black relative">
                <iframe 
                  src={activePreview.data.previewUrl}
                  className="w-full h-full border-0"
                  title="Interactive Template Preview"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
