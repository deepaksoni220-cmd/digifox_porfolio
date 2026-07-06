import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ children = "Contact Me", className = "", ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    mobile: '',
    websiteType: 'WordPress',
    service: 'Build Website',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { businessName, mobile, websiteType, service, budget } = formData;
    
    // Format the message
    const message = `Digifox! I'm interested in your digital marketing\n\n*Business Name:* ${businessName}\n*Mobile:* ${mobile}\n*Current Website:* ${websiteType}\n*We want to build:* ${service}\n*Estimated Budget:* ${budget}`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918696755996?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={(e) => {
          setIsOpen(true);
          if (props.onClick) props.onClick(e);
        }}
        {...props}
        className={`
          rounded-full 
          text-white font-medium uppercase tracking-widest
          px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
          text-xs sm:text-sm md:text-base
          transition-transform hover:scale-105 active:scale-95
          ${className}
        `}
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
          outline: '2px solid white',
          outlineOffset: '-3px'
        }}
      >
        {children}
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Start a Project</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 text-left">
                {/* Business Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">Business Name</label>
                  <input
                    required
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="bg-[#0C0C0C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#B600A8] transition-colors"
                    placeholder="Enter your business name"
                  />
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="bg-[#0C0C0C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#B600A8] transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Website Type (Dropdown) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">Website</label>
                  <select
                    value={formData.websiteType}
                    onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                    className="bg-[#0C0C0C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#B600A8] transition-colors appearance-none"
                  >
                    <option value="WordPress">WordPress</option>
                    <option value="Shopify">Shopify</option>
                    <option value="3D Website">3D Website</option>
                    <option value="No Website Yet">No Website Yet</option>
                  </select>
                </div>

                {/* Service Needed (Dropdown) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">We want to build</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="bg-[#0C0C0C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#B600A8] transition-colors appearance-none"
                  >
                    <option value="Build Website">Build Website</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Ad Creatives">Ad Creatives</option>
                    <option value="Full Package">Full Package (All)</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">Budget</label>
                  <input
                    required
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="bg-[#0C0C0C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#B600A8] transition-colors"
                    placeholder="e.g. $1000 - $5000"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 rounded-xl text-white font-bold uppercase tracking-widest px-6 py-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                  }}
                >
                  Send to WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
