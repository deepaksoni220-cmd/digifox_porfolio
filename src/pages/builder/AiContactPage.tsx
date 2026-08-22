import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

export const AiContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Website Customization Support", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="Contact WebMake — Support, Custom Design, & Enterprise"
        description="Have questions about the AI Website Builder, custom 3D design, or enterprise plans? Get in touch with our team."
      />
      
      <WebMakeNav activePage="contact" />

      {/* Hero Header */}
      <div className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#3b82f6]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#60a5fa] mb-6 backdrop-blur-md">
          <span>💬 We’re Here To Help</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight max-w-4xl mx-auto">
          Get In Touch With <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a855f7] to-[#ec4899]">
            The WebMake Team
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
          Have a question about AI design kits, custom domains, or need a bespoke 3D build? Reach out anytime.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="p-8 rounded-3xl bg-[#0c0d1a] border border-white/10 shadow-2xl flex flex-col gap-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-xl font-bold text-white">Instant WhatsApp Support</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Connect directly with our engineering & design team on WhatsApp for quick questions and priority onboarding.
              </p>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <span>Chat on WhatsApp</span>
                <span>💬</span>
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-[#0c0d1a] border border-white/10 shadow-2xl flex flex-col gap-4">
              <span className="text-3xl">📧</span>
              <h3 className="text-xl font-bold text-white">Email Inquiries</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Send us your design ideas, custom domain requests, or feedback directly.
              </p>
              <a
                href="mailto:contact@digifox.world"
                className="text-xs font-bold text-[#60a5fa] hover:underline"
              >
                contact@digifox.world
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-[#0c0d1a] border border-white/10 shadow-2xl flex flex-col gap-4">
              <span className="text-3xl">🌐</span>
              <h3 className="text-xl font-bold text-white">Main Company Portfolio</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Looking for our full-service bespoke agency and case studies?
              </p>
              <Link
                to="/"
                className="text-xs font-bold text-[#a855f7] hover:underline"
              >
                Visit Digifox Agency Portfolio →
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 p-8 sm:p-12 rounded-3xl bg-[#0c0d1a] border border-white/10 shadow-2xl flex flex-col justify-between">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl border border-emerald-500/30">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">Message Sent Successfully</h3>
                <p className="text-sm text-white/60 max-w-md">
                  Thank you for reaching out! Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
                    Send Us A Message
                  </h3>
                  <p className="text-xs text-white/60 font-light">
                    Fill out the form below and we will respond promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/80">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#3b82f6] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/80">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#3b82f6] outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/80">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#3b82f6] outline-none"
                  >
                    <option value="Website Customization Support">Website Customization Support</option>
                    <option value="Custom Domain Setup">Custom Domain Setup</option>
                    <option value="Billing & Pricing Inquiry">Billing & Pricing Inquiry</option>
                    <option value="Custom 3D Development">Custom 3D Development</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/80">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you would like to build or how we can assist you..."
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#3b82f6] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
      <WebMakeFooter />
</div>
  );
};
