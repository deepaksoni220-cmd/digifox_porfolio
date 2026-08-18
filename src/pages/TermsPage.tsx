import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';
import { PageFooter } from '../components/PageFooter';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-hidden pb-24 pt-20">
      <SEOMeta
        title="Terms & Conditions | Digifox 5D"
        description="Review the terms and conditions governing the use of Digifox website design, AI Builder, and digital agency services."
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.12)_0%,_transparent_70%)] pointer-events-none z-0" />

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
            Legal Terms
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Shield size={14} />
            <span>Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)] mb-4">
            Terms & <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Conditions</span>
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
              <span className="text-[#3b82f6]">1.</span> Acceptance of Terms
            </h2>
            <p>
              Welcome to Digifox 5D (&quot;Digifox&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing our website, utilizing our AI Website Builder (&quot;Webmake&quot;), or hiring us for bespoke web design, 3D development, and digital marketing services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, you must refrain from using our platforms and services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#3b82f6]">2.</span> Services & Webmake AI Builder
            </h2>
            <p>
              Digifox provides cutting-edge digital agency services, including 3D web experiences, bespoke website architecture, UI/UX design, performance marketing, and automated website generation through our AI Builder.
            </p>
            <ul className="space-y-2 pl-4 list-disc marker:text-[#3b82f6]">
              <li><strong>Site Generation:</strong> Sites generated with Webmake are designed to provide rapid prototyping and customizable digital blueprints.</li>
              <li><strong>Subdomain Publishing:</strong> Sites published on <code className="text-[#3b82f6] bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">*.digifox.world</code> remain hosted on our secure cloud infrastructure subject to standard network uptime policies.</li>
              <li><strong>Customization:</strong> Users maintain full rights to edit and tailor generated content for their lawful commercial and personal enterprises.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#3b82f6]">3.</span> Intellectual Property & Ownership
            </h2>
            <p>
              All proprietary technologies, 3D interaction shaders, custom framework libraries, trademarks, brand assets, and creative design systems authored by Digifox remain the exclusive intellectual property of Digifox.
            </p>
            <p>
              Upon full settlement of agreed custom agency project invoices, the client receives non-exclusive or exclusive operational rights (as defined in specific client service agreements) for the finalized digital deliverables.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#3b82f6]">4.</span> User Responsibilities & Acceptable Use
            </h2>
            <p>You agree not to use our websites, tools, or hosting infrastructure to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Publish fraudulent, illegal, or abusive content",
                "Infringe upon third-party copyrights or trademarks",
                "Distribute malware, phishing scripts, or exploits",
                "Attempt unauthorized server or API probing"
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                  <CheckCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs text-[var(--text-strong)] font-medium">{rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#3b82f6]">5.</span> Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Digifox 5D and its founders, developers, and partners shall not be held liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities arising from the use or inability to use our services.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 border-t border-[var(--border-strong)] pt-8">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-strong)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#3b82f6]">6.</span> Contact & Inquiries
            </h2>
            <p>
              For inquiries regarding these Terms and Conditions or our commercial agreements, please contact our legal and support team:
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[var(--text-strong)]">Digifox 5D Legal & Inquiries</p>
                <p className="text-xs text-blue-400 font-mono">digifox5d@icloud.com</p>
              </div>
              <a 
                href="/contact" 
                className="px-4 py-2 bg-[#3b82f6] hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all shrink-0 text-center"
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
