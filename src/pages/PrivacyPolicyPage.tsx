import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Clock, Eye, Server, ShieldCheck } from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';
import { PageFooter } from '../components/PageFooter';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-hidden pb-24 pt-20">
      <SEOMeta
        title="Privacy Policy | Digifox 5D"
        description="Learn how Digifox 5D collects, protects, and handles your personal and business data across our website and AI tools."
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[25%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12)_0%,_transparent_70%)] pointer-events-none z-0" />

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
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Privacy Policy
          </span>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 pt-6">
        
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Lock size={14} />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)] mb-4">
            Privacy <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto flex items-center justify-center gap-2">
            <Clock size={14} /> Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]"
        >
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <Eye size={18} className="text-emerald-400" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              At Digifox 5D, we prioritize the confidentiality and protection of your personal and business information. We collect information only when strictly necessary to deliver, enhance, and optimize our services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: "Direct Inquiries", desc: "Name, email address, phone number, WhatsApp, and project briefs submitted via our contact forms." },
                { title: "AI Builder Inputs", desc: "Brand names, business descriptions, design preferences, and assets uploaded for website creation." },
                { title: "Usage & Analytics", desc: "Anonymized page views, browser specs, session events, and technical logs to improve performance." },
                { title: "Published Sites", desc: "Subdomain records, customized layout tokens, and associated static content hosted on our CDN." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.05] p-3.5 rounded-2xl">
                  <p className="font-bold text-[var(--text-strong)] mb-1">{item.title}</p>
                  <p className="text-[11px] sm:text-xs text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <Server size={18} className="text-emerald-400" />
              <span>2. How We Use Your Data</span>
            </h2>
            <p>We utilize the collected information strictly for legitimate operational purposes:</p>
            <ul className="space-y-2 pl-4 list-disc marker:text-emerald-400">
              <li>To build, host, and deliver bespoke digital websites and Webmake templates.</li>
              <li>To provide customer support, project consultations, and updates.</li>
              <li>To protect against fraudulent, unauthorized, or illegal activities.</li>
              <li>To continuously benchmark and improve server performance, CDN delivery, and AI generation quality.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>3. Data Security & Storage</span>
            </h2>
            <p>
              We implement industry-standard SSL/TLS cryptographic encryption in transit and secure database storage at rest. Your custom uploaded assets and confidential business strategies are never sold, rented, or distributed to third-party data brokers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-emerald-400 font-bold">4.</span> Your Data Rights
            </h2>
            <p>
              Depending on your jurisdiction (such as GDPR, CCPA, or local data privacy laws), you have the right to access, rectify, download, or request the deletion of your personal information stored with Digifox.
            </p>
            <p>
              To exercise any of these rights, reach out to our privacy officer at <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">digifox5d@icloud.com</code>.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-emerald-400 font-bold">5.</span> Privacy Inquiries
            </h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please get in touch with us directly:</p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[var(--text-strong)]">Digifox 5D Privacy Team</p>
                <p className="text-xs text-emerald-400 font-mono">digifox5d@icloud.com</p>
              </div>
              <a 
                href="/contact" 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all shrink-0 text-center"
              >
                Contact Us
              </a>
            </div>
          </section>
        </motion.div>

      </div>

      <PageFooter />
    </main>
  );
};
