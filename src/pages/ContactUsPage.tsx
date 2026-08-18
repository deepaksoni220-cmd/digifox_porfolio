import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft, MessageSquare, Sparkles, Copy, Check, Globe } from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';

export const ContactUsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '3D Website & Animation',
    budget: '$1,000 - $3,000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = "digifox5d@icloud.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission / send via WhatsApp or mailto
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Digifox Team! My name is ${formData.name || 'a client'}. I am interested in ${formData.projectType}. Message: ${formData.message || 'Let us discuss a new project.'}`
    );
    window.open(`https://wa.me/918696755996?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-hidden pb-24 pt-20">
      <SEOMeta
        title="Contact Us | Digifox 5D"
        description="Get in touch with Digifox 5D for high-converting 3D websites, AI solutions, web apps, and performance marketing."
      />

      {/* Atmospheric Ambient Shaders */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.18)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[55%] h-[55%] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-strong)] shadow-md">
        <a 
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-[var(--text-strong)] hover:text-[#3b82f6] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Digifox</span>
        </a>
        <div className="flex items-center gap-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Let's Talk
          </span>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 pt-6">
        
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Start Your Next Level Project</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[var(--text-strong)] mb-4">
            Let's Build Something <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Extraordinary</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have a project in mind, need a 3D animated web experience, or want to discuss custom agency services? We typically reply within 2 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Info Column — 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Quick Contact Card */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-[var(--text-strong)] border-b border-[var(--border-strong)] pb-4">
                Direct Channels
              </h2>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-1">
                  <Mail size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Email Us</p>
                  <p className="text-sm font-bold text-[var(--text-strong)] truncate font-mono mt-0.5">{emailAddress}</p>
                  <button 
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold mt-1 transition-colors"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied to clipboard!' : 'Copy email address'}</span>
                  </button>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                  <Phone size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">WhatsApp / Direct</p>
                  <p className="text-sm font-bold text-[var(--text-strong)] font-mono mt-0.5">+91-8696755996</p>
                  <button 
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mt-1 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={12} />
                    <span>Open Instant WhatsApp Chat ↗</span>
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-1">
                  <MapPin size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Location & Reach</p>
                  <p className="text-sm font-bold text-[var(--text-strong)] mt-0.5">Based in India, serving global clients</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 flex items-center gap-1">
                    <Globe size={12} /> US, UK, EU, UAE, India & Worldwide
                  </p>
                </div>
              </div>

              {/* Live Availability Badge */}
              <div className="pt-4 border-t border-[var(--border-strong)] flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Available for new projects & retainers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Form Column — 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-[var(--text-strong)]">Message Received!</h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-md">
                      Thank you for reaching out, <span className="font-bold text-[var(--text-strong)]">{formData.name}</span>. Our lead creative team will review your project requirements and get back to you within 2 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
                      <button
                        onClick={handleWhatsAppDirect}
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <MessageSquare size={16} />
                        <span>Chat on WhatsApp Now</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', projectType: '3D Website & Animation', budget: '$1,000 - $3,000', message: '' });
                        }}
                        className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h2 className="text-xl font-black uppercase tracking-wider text-[var(--text-strong)] border-b border-[var(--border-strong)] pb-4">
                      Send Us a Message
                    </h2>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Your Name <span className="text-[#3b82f6]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Johnson"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Email Address <span className="text-[#3b82f6]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Project Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Service Needed
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                        >
                          <option value="3D Website & Animation">3D Website & Interactive Animation</option>
                          <option value="AI Website Builder Customization">AI Website Builder Customization</option>
                          <option value="Custom Web App Development">Custom Web App & Next.js Development</option>
                          <option value="Shopify & E-Commerce Store">Shopify & Luxury E-Commerce</option>
                          <option value="SEO & Performance Marketing">SEO & Growth Performance</option>
                          <option value="Full Brand & UI/UX Redesign">Full Brand & UI/UX Redesign</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-xs sm:text-sm transition-all"
                      >
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000 (Recommended)</option>
                        <option value="$3,000 - $7,500">$3,000 - $7,500 (Full 3D Experience)</option>
                        <option value="$7,500+">$7,500+ (Enterprise & Bespoke)</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Project Details <span className="text-[#3b82f6]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your brand, goals, target launch date, and any reference sites you love..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-[var(--border-strong)] text-[var(--text-strong)] placeholder-[var(--text-secondary)]/40 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none text-xs sm:text-sm transition-all resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:opacity-90 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(59,130,246,0.35)] cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message / Inquire Now</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </main>
  );
};
