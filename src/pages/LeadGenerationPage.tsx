import React, { useState } from 'react';
import { 
  processLeadWithGemini, 
  type LeadInput, 
  type QualifiedLead 
} from '../services/leadGenerationService';
import { 
  Bot, 
  Sparkles, 
  Mail, 
  Copy, 
  Check, 
  Eye, 
  Cpu, 
  ExternalLink,
  Target,
  BarChart3,
  History
} from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';

const PRESET_LEADS: LeadInput[] = [
  {
    businessName: "AeroJet Private Charters",
    websiteUrl: "https://aerojet-charters-example.com",
    industryOrNiche: "Private Aviation & Jet Charters",
    location: "Miami / New York, USA",
    notesOrPainPoints: "Website is slow and built on basic template. Competitors have interactive aircraft viewers. Need high-net-worth client booking lift."
  },
  {
    businessName: "Verde Living Bottega",
    websiteUrl: "https://verdeliving-example.com",
    industryOrNiche: "Exotic Indoor Plants & Luxury Planters",
    location: "London, UK",
    notesOrPainPoints: "High shopping cart abandonment on mobile. Checkout takes 4 steps. Low average order value."
  },
  {
    businessName: "Kurogane Precision Apparel",
    websiteUrl: "https://kurogane-streetwear.com",
    industryOrNiche: "Technical Streetwear & Outerwear",
    location: "Tokyo, Japan & Global",
    notesOrPainPoints: "Flat 2D product photos don't justify $400 jacket price tag. Need 3D material inspection experience."
  }
];

export const LeadGenerationPage: React.FC = () => {
  const [formData, setFormData] = useState<LeadInput>({
    businessName: '',
    websiteUrl: '',
    industryOrNiche: '',
    location: '',
    notesOrPainPoints: ''
  });

  const [selectedWorkload, setSelectedWorkload] = useState<'fast' | 'standard' | 'deep'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLead, setCurrentLead] = useState<QualifiedLead | null>(null);
  const [leadHistory, setLeadHistory] = useState<QualifiedLead[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRunAudit = async (leadToProcess?: LeadInput) => {
    const input = leadToProcess || formData;
    if (!input.businessName || !input.industryOrNiche) {
      setErrorMessage("Please provide at least a Business Name and Industry/Niche.");
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const result = await processLeadWithGemini(input, selectedWorkload);
      setCurrentLead(result);
      setLeadHistory(prev => [result, ...prev]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to process lead with Gemini.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyOutreachEmail = () => {
    if (!currentLead) return;
    const { subject, body } = currentLead.personalizedOutreachEmail;
    const fullText = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] pb-24 pt-12 px-4 sm:px-8">
      <SEOMeta 
        title="Digifox AI Lead Generation System | Gemini Engine"
        description="Automated business intelligence, website audit diagnostics, demo matching, and personalized cold outreach powered 100% by Google Gemini models."
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-strong)] mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-1.5">
                <Cpu size={13} />
                <span>Gemini-Only Architecture</span>
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-mono">
                No OpenAI Required
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
              Digifox AI <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Lead Generation System</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-2xl">
              Evaluate prospective client websites, score revenue upside, diagnose conversion bottlenecks, auto-match live Digifox showcases, and generate conversion-engineered outreach.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <a 
              href="/portfolio"
              className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs font-semibold hover:border-blue-400 transition-colors flex items-center gap-1.5"
            >
              <span>Explore Demos</span>
              <ExternalLink size={13} />
            </a>
            <a 
              href="/"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              Home
            </a>
          </div>
        </div>

        {/* Gemini Model Allocation Matrix Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div 
            onClick={() => setSelectedWorkload('fast')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedWorkload === 'fast' 
                ? 'bg-blue-950/20 border-blue-500 shadow-lg' 
                : 'bg-[var(--bg-surface)] border-[var(--border-strong)] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold uppercase tracking-wider text-blue-400">Gemini 3.5 Flash-Lite</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300">Fast & Low Cost</span>
            </div>
            <div className="text-sm font-bold text-[var(--text-strong)]">Bulk Extraction & Classification</div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">
              High-volume triage, fast categorization, and initial lead filtering.
            </p>
          </div>

          <div 
            onClick={() => setSelectedWorkload('standard')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedWorkload === 'standard' 
                ? 'bg-blue-950/20 border-blue-500 shadow-lg' 
                : 'bg-[var(--bg-surface)] border-[var(--border-strong)] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold uppercase tracking-wider text-indigo-400">Gemini 3.8 Flash</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300">Primary Core</span>
            </div>
            <div className="text-sm font-bold text-[var(--text-strong)]">Main AI Operations & Reasoning</div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">
              Audit scoring, bottleneck diagnosis, demo matching, and outreach copy.
            </p>
          </div>

          <div 
            onClick={() => setSelectedWorkload('deep')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedWorkload === 'deep' 
                ? 'bg-blue-950/20 border-blue-500 shadow-lg' 
                : 'bg-[var(--bg-surface)] border-[var(--border-strong)] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold uppercase tracking-wider text-purple-400">Gemini 3.1 Pro</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300">Deep Reasoning</span>
            </div>
            <div className="text-sm font-bold text-[var(--text-strong)]">Advanced Strategic Analysis</div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">
              Multi-tiered enterprise audits, competitive positioning, and high-stakes accounts.
            </p>
          </div>
        </div>

        {/* Input & Form Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Form (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
            <h2 className="text-xl font-bold uppercase tracking-wide text-[var(--text-strong)] mb-4 flex items-center gap-2">
              <Target size={20} className="text-blue-400" />
              <span>Target Lead Details</span>
            </h2>

            {/* Presets */}
            <div className="mb-6">
              <span className="text-xs text-[var(--text-secondary)] font-medium block mb-2">
                Quick Test Preset Leads:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_LEADS.map((preset) => (
                  <button
                    key={preset.businessName}
                    type="button"
                    onClick={() => {
                      setFormData(preset);
                      handleRunAudit(preset);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-strong)] text-[11px] font-medium hover:border-blue-400 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {preset.businessName}
                  </button>
                ))}
              </div>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleRunAudit();
              }} 
              className="flex flex-col gap-4"
            >
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                  Business Name *
                </label>
                <input 
                  type="text" 
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Horizon Private Aviation"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                  Website URL
                </label>
                <input 
                  type="text" 
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://brand.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Industry / Niche *
                  </label>
                  <input 
                    type="text" 
                    value={formData.industryOrNiche}
                    onChange={(e) => setFormData({ ...formData, industryOrNiche: e.target.value })}
                    placeholder="e.g. Luxury Travel"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Location
                  </label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. New York, USA"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                  Client Notes / Known Pain Points
                </label>
                <textarea 
                  rows={3}
                  value={formData.notesOrPainPoints}
                  onChange={(e) => setFormData({ ...formData, notesOrPainPoints: e.target.value })}
                  placeholder="e.g. Outdated design, slow load time, no 3D showcase, high drop-off on mobile..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Bot className="animate-spin" size={16} />
                    <span>Analyzing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Run Gemini Lead Audit</span>
                  </>
                )}
              </button>
            </form>

            {leadHistory.length > 1 && (
              <div className="mt-6 pt-6 border-t border-[var(--border-strong)]">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  <History size={13} />
                  <span>Session History ({leadHistory.length})</span>
                </div>
                <div className="flex flex-col gap-2">
                  {leadHistory.map((h, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentLead(h)}
                      className={`text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentLead?.businessName === h.businessName 
                          ? 'bg-blue-500/10 border-blue-500/40 text-blue-400' 
                          : 'bg-[var(--bg-base)] border-[var(--border-strong)]/40 text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <span className="font-semibold truncate">{h.businessName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40">
                        Score: {h.leadScore}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Results Dashboard (7 Cols) */}
          <div className="lg:col-span-7">
            {isProcessing && (
              <div className="p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 animate-pulse">
                  <Bot size={32} />
                </div>
                <h3 className="text-xl font-bold uppercase text-[var(--text-strong)] mb-2">
                  Gemini Engine at Work
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md font-light">
                  Executing structural audit, computing opportunity scores, matching Digifox showcases, and crafting customized cold outreach copy...
                </p>
              </div>
            )}

            {!isProcessing && !currentLead && (
              <div className="p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex flex-col items-center justify-center text-center">
                <BarChart3 size={36} className="text-[var(--text-secondary)]/40 mb-4" />
                <h3 className="text-lg font-bold text-[var(--text-strong)] mb-1">
                  No Lead Analyzed Yet
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md font-light">
                  Select one of the presets on the left or enter a prospect's name and industry to run the Gemini analysis.
                </p>
              </div>
            )}

            {!isProcessing && currentLead && (
              <div className="flex flex-col gap-6">
                
                {/* Score & Tier Header Card */}
                <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-strong)]/40">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                        Qualified Prospect
                      </span>
                      <h3 className="text-2xl font-black uppercase text-[var(--text-strong)]">
                        {currentLead.businessName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-0.5">
                        <span>{currentLead.industry}</span>
                        <span>•</span>
                        <span>{currentLead.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {currentLead.leadScore}/100
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-[var(--text-secondary)]">
                          Opportunity Score
                        </span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs font-bold uppercase tracking-wider text-blue-300">
                        {currentLead.priorityTier}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                    {currentLead.summary}
                  </p>
                </div>

                {/* Auto-Matched Demo Showcase Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/20 via-[var(--bg-surface)] to-purple-950/20 border border-blue-500/30 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                      Best-Matching Digifox Showcase
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-between">
                    <div>
                      <h4 className="text-lg font-black uppercase text-[var(--text-strong)]">
                        {currentLead.matchedDemo.title}
                      </h4>
                      <span className="text-xs text-[var(--text-secondary)] font-medium block mt-0.5">
                        {currentLead.matchedDemo.category}
                      </span>
                      <p className="text-xs text-[var(--text-secondary)]/90 mt-2 font-light leading-relaxed max-w-lg">
                        {currentLead.matchedDemo.whyItFits}
                      </p>
                    </div>

                    <a
                      href={currentLead.matchedDemo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0 transition-transform hover:scale-105"
                    >
                      <Eye size={14} />
                      <span>Preview Demo</span>
                    </a>
                  </div>
                </div>

                {/* Audit Findings Grid */}
                <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4">
                    Website & Conversion Audit
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)]/40">
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase block">Visual Score</span>
                      <span className="text-lg font-bold text-[var(--text-strong)]">{currentLead.audit.visualAppealScore}/100</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)]/40">
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase block">Mobile Speed</span>
                      <span className="text-lg font-bold text-[var(--text-strong)]">{currentLead.audit.lcpEstimate}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)]/40">
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase block">Responsiveness</span>
                      <span className="text-lg font-bold text-[var(--text-strong)]">{currentLead.audit.mobileResponsiveness}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Detected Bottlenecks:</span>
                    {currentLead.audit.conversionBottlenecks.map((b, i) => (
                      <div key={i} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalized Outreach Email */}
                <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                        Generated Cold Outreach Email
                      </span>
                    </div>
                    <button
                      onClick={copyOutreachEmail}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold hover:border-emerald-400 text-[var(--text-secondary)] hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)]/40 text-xs sm:text-sm font-sans space-y-3 text-[var(--text-secondary)]">
                    <div>
                      <strong className="text-[var(--text-strong)]">Subject: </strong> 
                      <span>{currentLead.personalizedOutreachEmail.subject}</span>
                    </div>
                    <div className="border-t border-[var(--border-strong)]/30 pt-3 leading-relaxed whitespace-pre-line">
                      {currentLead.personalizedOutreachEmail.body}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
export default LeadGenerationPage;
