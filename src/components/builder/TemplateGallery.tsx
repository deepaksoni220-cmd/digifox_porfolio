import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { GeneratedWebsiteData } from '../../services/aiBuilderService';
import { predefinedTemplates } from '../../data/templates';

interface TemplateGalleryProps {
  onSelect: (templateId: string, data: GeneratedWebsiteData) => void;
}

const TemplateCard = ({ id, template, index, onSelect }: { id: string, template: GeneratedWebsiteData, index: number, onSelect: (id: string, data: GeneratedWebsiteData) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group relative flex flex-col bg-[#0f111a] border border-[#1f2233] rounded-2xl overflow-hidden shadow-2xl hover:border-[#3b82f6]/50 transition-all duration-300"
  >
    {/* Thumbnail Area */}
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#151822]">
      {template.thumbnailUrl ? (
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
      
      {/* Subtle glass overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>

    {/* Content Area */}
    <div className="flex flex-col p-6 flex-1 justify-between">
      <div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
          {template.hero?.title || 'Template Name'} <span className="text-gray-500 font-normal text-sm">— {template.websiteType}</span>
        </h3>
        <p className="text-[#8e95a5] text-sm leading-relaxed line-clamp-2">
          {template.shortDescription || template.hero?.subtitle || 'A beautiful, modern template designed for high conversions and stunning visuals.'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#1f2233]">
        <button
          onClick={() => onSelect(id, template)}
          className="flex-1 bg-[#4f39f6] hover:bg-[#5b47fc] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          Customize <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </button>
        {template.previewUrl && (
          <button
            onClick={() => window.open(template.previewUrl, '_blank')}
            className="flex-1 bg-transparent border border-[#2f334a] hover:bg-[#1a1d2d] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Preview <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<'3d' | '2d'>('3d');

  const templates3D = Object.entries(predefinedTemplates).filter(([_, t]) => t.category === '3d');
  const templates2D = Object.entries(predefinedTemplates).filter(([_, t]) => t.category === '2d' || !t.category);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab Switcher */}
      <div className="flex gap-4 border-b border-[var(--border-strong)] pb-4">
        <button
          onClick={() => setActiveTab('3d')}
          className={`text-lg font-bold uppercase tracking-wider transition-colors ${
            activeTab === '3d' ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]' : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          3D Animated Templates
        </button>
        <button
          onClick={() => setActiveTab('2d')}
          className={`text-lg font-bold uppercase tracking-wider transition-colors ${
            activeTab === '2d' ? 'text-[#ec4899] border-b-2 border-[#ec4899]' : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          2D Static Templates
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === '3d' 
          ? templates3D.map(([id, template], i) => (
              <TemplateCard key={id} id={id} template={template} index={i} onSelect={onSelect} />
            ))
          : templates2D.map(([id, template], i) => (
              <TemplateCard key={id} id={id} template={template} index={i} onSelect={onSelect} />
            ))
        }
      </div>
    </div>
  );
};
