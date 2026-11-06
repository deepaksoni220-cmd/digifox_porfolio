import React, { useState, useEffect } from 'react';
import { 
  processLeadWithGemini, 
  scanGoogleBusinessProfiles,
  sendWorkspaceEmail,
  sendResendEmail,
  parseScraperData,
  generateEmailSuggestions,
  runApifyGooglePlacesScan,
  AVAILABLE_DEMOS,
  type LeadInput, 
  type QualifiedLead,
  type DiscoveredBusinessLead,
  type GoogleBusinessScanParams
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
  History,
  MapPin,
  Building2,
  Globe2,
  Phone,
  Star,
  CheckCircle2,
  ArrowRight,
  Filter,
  Send,
  Plus,
  RotateCcw,
  X,
  Settings,
  Key,
  ShieldCheck,
  Search,
  Upload,
  FileSpreadsheet,
  FileText,
  AlertCircle,
  Zap,
  CheckSquare,
  Square,
  Loader2
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

const SCANNER_PRESETS = [
  { country: "USA", city: "New York", industry: "Marble & Granite" },
  { country: "UK", city: "London", industry: "Boutique Interior Architecture" },
  { country: "USA", city: "Miami", industry: "Exotic & Marine Detailing" },
  { country: "UAE", city: "Dubai", industry: "Luxury Kitchen & Joinery" },
  { country: "USA", city: "Dallas", industry: "Commercial Roofing & Solar" }
];

export const LeadGenerationPage: React.FC = () => {
  // Navigation tab: Google Business Scanner vs Single Lead Audit
  const [activeTab, setActiveTab] = useState<'scanner' | 'single'>('scanner');

  // Scanner State
  const [scanParams, setScanParams] = useState<GoogleBusinessScanParams>({
    country: "USA",
    city: "New York",
    industry: "Marble & Granite",
    targetNoWebsiteOnly: true
  });
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredLeads, setDiscoveredLeads] = useState<DiscoveredBusinessLead[]>([]);
  const [selectedDiscoveredLead, setSelectedDiscoveredLead] = useState<DiscoveredBusinessLead | null>(null);
  const [emailTab, setEmailTab] = useState<'initial' | 'followup'>('initial');
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Manual Customization States (User can edit email, demo link, and email copy before sending)
  const [manualEmail, setManualEmail] = useState('');
  const [manualDemoUrl, setManualDemoUrl] = useState('');
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(0);
  const [manualSubject, setManualSubject] = useState('');
  const [manualBody, setManualBody] = useState('');
  const [manualFollowUpSubject, setManualFollowUpSubject] = useState('');
  const [manualFollowUpBody, setManualFollowUpBody] = useState('');
  const [isCustomUrlMode, setIsCustomUrlMode] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // Google Places API & Google Workspace Credentials
  const [googlePlacesApiKey, setGooglePlacesApiKey] = useState(() => 
    typeof localStorage !== 'undefined' ? localStorage.getItem('digifox_google_places_api_key') || '' : ''
  );
  const [workspaceEmail, setWorkspaceEmail] = useState(() => 
    typeof localStorage !== 'undefined' ? localStorage.getItem('digifox_workspace_sender_email') || '' : ''
  );
  const [workspaceAppPassword, setWorkspaceAppPassword] = useState(() => 
    typeof localStorage !== 'undefined' ? localStorage.getItem('digifox_workspace_app_password') || '' : ''
  );
  const [apifyToken, setApifyToken] = useState(() => 
    typeof localStorage !== 'undefined' 
      ? localStorage.getItem('digifox_apify_token') || (import.meta as any).env?.VITE_APIFY_TOKEN || '' 
      : (import.meta as any).env?.VITE_APIFY_TOKEN || ''
  );
  const [resendApiKey, setResendApiKey] = useState(() => 
    typeof localStorage !== 'undefined' 
      ? localStorage.getItem('digifox_resend_api_key') || (import.meta as any).env?.VITE_RESEND_API_KEY || '' 
      : (import.meta as any).env?.VITE_RESEND_API_KEY || ''
  );
  const [resendFromEmail, setResendFromEmail] = useState(() => 
    typeof localStorage !== 'undefined' 
      ? localStorage.getItem('digifox_resend_from_email') || 'Digifox <onboarding@resend.dev>' 
      : 'Digifox <onboarding@resend.dev>'
  );

  // Email Provider Selection ('resend' | 'workspace')
  const [emailProvider, setEmailProvider] = useState<'resend' | 'workspace'>('resend');

  // Bulk Selection & Batch Dispatch State
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [isBulkSending, setIsBulkSending] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{
    current: number;
    total: number;
    successCount: number;
    failCount: number;
    logs: Array<{ name: string; email: string; status: 'pending' | 'success' | 'error'; message?: string }>;
  }>({
    current: 0,
    total: 0,
    successCount: 0,
    failCount: 0,
    logs: []
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
  const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);

  // New manual lead form state
  const [newManualLead, setNewManualLead] = useState({
    businessName: '',
    city: 'New York',
    country: 'USA',
    industry: 'Marble & Granite',
    address: '',
    phone: '',
    contactEmail: '',
    demoUrl: '/portfolio',
    rating: 4.9,
    reviewCount: 24
  });

  // Scraper File & Data Import State
  const [showJsonImportModal, setShowJsonImportModal] = useState(false);
  const [importTab, setImportTab] = useState<'upload' | 'paste' | 'apify'>('upload');
  const [rawScraperInput, setRawScraperInput] = useState('');
  const [importedFileName, setImportedFileName] = useState<string | null>(null);
  const [onlyNoWebsiteImport, setOnlyNoWebsiteImport] = useState(true);
  const [jsonImportError, setJsonImportError] = useState<string | null>(null);
  const [parsedPreviewStats, setParsedPreviewStats] = useState<{ total: number; noWebsite: number; withWebsite: number; hasEmail: number } | null>(null);
  const [parsedPreviewLeads, setParsedPreviewLeads] = useState<DiscoveredBusinessLead[]>([]);
  const [isAiEnrichingEmail, setIsAiEnrichingEmail] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [isApifyRunning, setIsApifyRunning] = useState(false);
  const [apifyError, setApifyError] = useState<string | null>(null);

  // Single Audit State
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

  // Synchronize manual fields whenever the selected prospect changes
  useEffect(() => {
    if (selectedDiscoveredLead) {
      setManualEmail(selectedDiscoveredLead.contactEmail || '');
      
      const initialDemoLink = selectedDiscoveredLead.personalizedDemoUrl?.startsWith('http')
        ? selectedDiscoveredLead.personalizedDemoUrl
        : `${window.location.origin}${selectedDiscoveredLead.personalizedDemoUrl || '/portfolio'}`;
      
      setManualDemoUrl(initialDemoLink);
      setIsCustomUrlMode(false);

      // Match demo index if present
      const matchedIdx = AVAILABLE_DEMOS.findIndex(
        d => d.title === selectedDiscoveredLead.matchedDemo?.title
      );
      setSelectedDemoIndex(matchedIdx >= 0 ? matchedIdx : 0);

      const p = selectedDiscoveredLead.personalizedPitch;
      setManualSubject(p?.subject || '');
      setManualBody(p?.body ? p.body.replace('[DEMO_LINK]', initialDemoLink) : '');
      setManualFollowUpSubject(p?.followUpSubject || '');
      setManualFollowUpBody(p?.followUpBody ? p.followUpBody.replace('[DEMO_LINK]', initialDemoLink) : '');
    }
  }, [selectedDiscoveredLead]);

  // Auto-run initial New York Marble & Granite scan so user sees results immediately
  useEffect(() => {
    handleRunGoogleScan({
      country: "USA",
      city: "New York",
      industry: "Marble & Granite",
      targetNoWebsiteOnly: true
    });
  }, []);

  const enrichWithStoredSentStatus = (leads: DiscoveredBusinessLead[]): DiscoveredBusinessLead[] => {
    try {
      const stored = JSON.parse(localStorage.getItem('digifox_sent_leads_records') || '{}');
      return leads.map(l => {
        if (stored[l.id]) {
          return {
            ...l,
            sentCount: stored[l.id].sentCount,
            lastSentAt: stored[l.id].lastSentAt,
            lastSentRecipient: stored[l.id].lastSentRecipient
          };
        }
        return l;
      });
    } catch {
      return leads;
    }
  };

  const handleRunGoogleScan = async (overrideParams?: GoogleBusinessScanParams) => {
    const params = overrideParams || scanParams;
    setIsScanning(true);
    setErrorMessage(null);
    try {
      const results = await scanGoogleBusinessProfiles({
        ...params,
        googlePlacesApiKey: googlePlacesApiKey || undefined,
        apifyToken: apifyToken || undefined
      }, selectedWorkload);
      const enriched = enrichWithStoredSentStatus(results);
      setDiscoveredLeads(enriched);
      if (enriched.length > 0) {
        setSelectedDiscoveredLead(enriched[0]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to scan Google Business Profiles.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleDemoSelectionChange = (idx: number) => {
    setSelectedDemoIndex(idx);
    if (idx === -1) {
      setIsCustomUrlMode(true);
      return;
    }
    setIsCustomUrlMode(false);
    const selectedDemo = AVAILABLE_DEMOS[idx];
    if (!selectedDemo) return;

    const newUrl = selectedDemo.demoUrl.startsWith('http')
      ? selectedDemo.demoUrl
      : `${window.location.origin}${selectedDemo.demoUrl}`;

    const oldUrl = manualDemoUrl;
    setManualDemoUrl(newUrl);

    if (oldUrl && manualBody.includes(oldUrl)) {
      setManualBody(manualBody.replaceAll(oldUrl, newUrl));
    }
    if (oldUrl && manualFollowUpBody.includes(oldUrl)) {
      setManualFollowUpBody(manualFollowUpBody.replaceAll(oldUrl, newUrl));
    }
  };

  const handleManualDemoUrlChange = (newUrl: string) => {
    const oldUrl = manualDemoUrl;
    setManualDemoUrl(newUrl);
    if (oldUrl && manualBody.includes(oldUrl)) {
      setManualBody(manualBody.replaceAll(oldUrl, newUrl));
    }
    if (oldUrl && manualFollowUpBody.includes(oldUrl)) {
      setManualFollowUpBody(manualFollowUpBody.replaceAll(oldUrl, newUrl));
    }
  };

  const handleResetEmailToAi = () => {
    if (!selectedDiscoveredLead) return;
    const p = selectedDiscoveredLead.personalizedPitch;
    const demoLink = manualDemoUrl || `${window.location.origin}${selectedDiscoveredLead.personalizedDemoUrl}`;
    setManualSubject(p.subject);
    setManualBody(p.body.replace('[DEMO_LINK]', demoLink));
    setManualFollowUpSubject(p.followUpSubject);
    setManualFollowUpBody(p.followUpBody.replace('[DEMO_LINK]', demoLink));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('digifox_google_places_api_key', googlePlacesApiKey);
    localStorage.setItem('digifox_apify_token', apifyToken);
    localStorage.setItem('digifox_workspace_sender_email', workspaceEmail);
    localStorage.setItem('digifox_workspace_app_password', workspaceAppPassword);
    localStorage.setItem('digifox_resend_api_key', resendApiKey);
    localStorage.setItem('digifox_resend_from_email', resendFromEmail);
    setShowSettingsModal(false);
  };

  const handleRunApifyCrawler = async () => {
    if (!apifyToken.trim()) {
      setApifyError("Please provide your Apify API Token.");
      return;
    }

    setIsApifyRunning(true);
    setApifyError(null);
    try {
      localStorage.setItem('digifox_apify_token', apifyToken.trim());
      const results = await runApifyGooglePlacesScan({
        country: scanParams.country,
        city: scanParams.city,
        industry: scanParams.industry,
        apifyToken: apifyToken.trim(),
        maxResults: 20,
        targetNoWebsiteOnly: onlyNoWebsiteImport
      });

      if (results.length === 0) {
        setApifyError("No leads found matching your criteria from Apify. Try unchecking 'Only No Website' or broadening search terms.");
        return;
      }

      const enriched = enrichWithStoredSentStatus(results);
      setDiscoveredLeads(enriched);
      setSelectedDiscoveredLead(enriched[0]);
      setShowJsonImportModal(false);
    } catch (err: any) {
      console.error(err);
      setApifyError(err.message || "Failed to execute Apify compass/crawler-google-places Actor.");
    } finally {
      setIsApifyRunning(false);
    }
  };

  const handleSendEmail = async () => {
    if (!manualEmail) {
      setSendErrorMessage("Please provide a recipient email address.");
      return;
    }

    const subject = emailTab === 'initial' ? manualSubject : manualFollowUpSubject;
    const body = emailTab === 'initial' ? manualBody : manualFollowUpBody;

    setIsSendingEmail(true);
    setSendErrorMessage(null);
    setSendSuccessMessage(null);

    try {
      let sentFromDisplay = '';

      if (emailProvider === 'resend') {
        if (!resendApiKey.trim()) {
          setShowSettingsModal(true);
          throw new Error('Please enter your Resend API Key in Settings first.');
        }
        const res = await sendResendEmail({
          apiKey: resendApiKey.trim(),
          from: resendFromEmail.trim(),
          to: manualEmail.trim(),
          subject: subject.trim(),
          body: body.trim(),
          senderName: 'Digifox'
        });
        sentFromDisplay = `Resend (${res.sentFrom || resendFromEmail})`;
      } else {
        const res = await sendWorkspaceEmail({
          to: manualEmail,
          subject,
          body,
          senderEmail: workspaceEmail || undefined,
          appPassword: workspaceAppPassword || undefined,
          senderName: 'Digifox'
        });
        sentFromDisplay = `Google Workspace (${res.sentFrom || 'Workspace SMTP'})`;
      }

      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const recordItem = {
        type: emailTab,
        recipient: manualEmail,
        sentAt: new Date().toISOString(),
        subject
      };

      if (selectedDiscoveredLead) {
        const nextSentCount = (selectedDiscoveredLead.sentCount || 0) + 1;
        const updatedLead: DiscoveredBusinessLead = {
          ...selectedDiscoveredLead,
          contactEmail: manualEmail,
          contactEmailStatus: 'Public Email Found',
          sentCount: nextSentCount,
          lastSentAt: nowStr,
          lastSentRecipient: manualEmail,
          sentHistory: [...(selectedDiscoveredLead.sentHistory || []), recordItem]
        };

        setSelectedDiscoveredLead(updatedLead);
        setDiscoveredLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));

        try {
          const storedRecords = JSON.parse(localStorage.getItem('digifox_sent_leads_records') || '{}');
          storedRecords[selectedDiscoveredLead.id] = {
            sentCount: nextSentCount,
            lastSentAt: nowStr,
            lastSentRecipient: manualEmail
          };
          localStorage.setItem('digifox_sent_leads_records', JSON.stringify(storedRecords));
        } catch {
          // ignore
        }
      }

      setSendSuccessMessage(`Email sent successfully via ${sentFromDisplay}! Send counter logged.`);
      setTimeout(() => setSendSuccessMessage(null), 7000);
    } catch (err: any) {
      console.error(err);
      setSendErrorMessage(err.message || 'Failed to dispatch email. Please check your settings.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Bulk Selection Helpers
  const toggleLeadSelection = (id: string) => {
    setSelectedLeadIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllLeads = () => {
    if (selectedLeadIds.length === discoveredLeads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(discoveredLeads.map(l => l.id));
    }
  };

  const handleSelectNoWebsiteLeads = () => {
    const ids = discoveredLeads
      .filter(l => l.websiteStatus === 'No Website Detected')
      .map(l => l.id);
    setSelectedLeadIds(ids);
  };

  const handleSelectWithEmailLeads = () => {
    const ids = discoveredLeads
      .filter(l => l.contactEmail && l.contactEmail.includes('@'))
      .map(l => l.id);
    setSelectedLeadIds(ids);
  };

  const handleClearLeadSelection = () => {
    setSelectedLeadIds([]);
  };

  // Bulk Resend Dispatch Execution
  const handleRunBulkResend = async () => {
    const leadsToSend = discoveredLeads.filter(l => selectedLeadIds.includes(l.id));
    if (leadsToSend.length === 0) return;

    if (!resendApiKey.trim()) {
      setShowSettingsModal(true);
      setSendErrorMessage('Please enter your Resend API Key in Settings first.');
      return;
    }

    setIsBulkSending(true);
    setBulkProgress({
      current: 0,
      total: leadsToSend.length,
      successCount: 0,
      failCount: 0,
      logs: leadsToSend.map(l => ({
        name: l.businessName,
        email: l.contactEmail || `contact@${l.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        status: 'pending'
      }))
    });

    let successCount = 0;
    let failCount = 0;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const storedRecords = JSON.parse(localStorage.getItem('digifox_sent_leads_records') || '{}');

    for (let i = 0; i < leadsToSend.length; i++) {
      const lead = leadsToSend[i];
      const targetEmail = lead.contactEmail || `contact@${lead.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      const demoLink = lead.personalizedDemoUrl?.startsWith('http') 
        ? lead.personalizedDemoUrl 
        : `${window.location.origin}${lead.personalizedDemoUrl || '/portfolio'}`;
      
      const subject = lead.personalizedPitch?.subject || `Website inquiry for ${lead.businessName}`;
      const body = (lead.personalizedPitch?.body || `Hello ${lead.businessName} team,\n\nWe prepared a custom modern prototype for you: [DEMO_LINK]\n\nBest,\nDigifox Team`).replaceAll('[DEMO_LINK]', demoLink);

      try {
        await sendResendEmail({
          apiKey: resendApiKey.trim(),
          from: resendFromEmail.trim(),
          to: targetEmail.trim(),
          subject: subject.trim(),
          body: body.trim(),
          senderName: 'Digifox'
        });

        successCount++;
        const nextSentCount = (lead.sentCount || 0) + 1;
        storedRecords[lead.id] = {
          sentCount: nextSentCount,
          lastSentAt: nowStr,
          lastSentRecipient: targetEmail
        };

        setBulkProgress(prev => ({
          ...prev,
          current: i + 1,
          successCount,
          logs: prev.logs.map((item, idx) => 
            idx === i ? { ...item, status: 'success', message: 'Delivered via Resend' } : item
          )
        }));

        setDiscoveredLeads(prev => prev.map(l => {
          if (l.id === lead.id) {
            return {
              ...l,
              contactEmail: targetEmail,
              sentCount: nextSentCount,
              lastSentAt: nowStr,
              lastSentRecipient: targetEmail,
              sentHistory: [
                ...(l.sentHistory || []),
                {
                  type: 'initial',
                  recipient: targetEmail,
                  sentAt: new Date().toISOString(),
                  subject
                }
              ]
            };
          }
          return l;
        }));

      } catch (err: any) {
        failCount++;
        setBulkProgress(prev => ({
          ...prev,
          current: i + 1,
          failCount,
          logs: prev.logs.map((item, idx) => 
            idx === i ? { ...item, status: 'error', message: err.message || 'Send failed' } : item
          )
        }));
      }

      // 500ms pacing delay between sends
      if (i < leadsToSend.length - 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    try {
      localStorage.setItem('digifox_sent_leads_records', JSON.stringify(storedRecords));
    } catch {
      // ignore
    }

    setIsBulkSending(false);
  };

  const handleMarkAsSent = () => {
    if (!selectedDiscoveredLead) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetAddr = manualEmail || selectedDiscoveredLead.contactEmail || 'Workspace Mail';
    const nextSentCount = (selectedDiscoveredLead.sentCount || 0) + 1;
    const recordItem = {
      type: emailTab,
      recipient: targetAddr,
      sentAt: new Date().toISOString(),
      subject: emailTab === 'initial' ? manualSubject : manualFollowUpSubject
    };

    const updatedLead: DiscoveredBusinessLead = {
      ...selectedDiscoveredLead,
      contactEmail: targetAddr,
      sentCount: nextSentCount,
      lastSentAt: nowStr,
      lastSentRecipient: targetAddr,
      sentHistory: [...(selectedDiscoveredLead.sentHistory || []), recordItem]
    };

    setSelectedDiscoveredLead(updatedLead);
    setDiscoveredLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));

    try {
      const storedRecords = JSON.parse(localStorage.getItem('digifox_sent_leads_records') || '{}');
      storedRecords[selectedDiscoveredLead.id] = {
        sentCount: nextSentCount,
        lastSentAt: nowStr,
        lastSentRecipient: targetAddr
      };
      localStorage.setItem('digifox_sent_leads_records', JSON.stringify(storedRecords));
    } catch {
      // ignore
    }

    setSendSuccessMessage(`Marked as sent to ${targetAddr}! Send count updated (${nextSentCount}x).`);
    setTimeout(() => setSendSuccessMessage(null), 5000);
  };

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManualLead.businessName) return;

    const matchedDemo = AVAILABLE_DEMOS[selectedDemoIndex] || AVAILABLE_DEMOS[0];
    const demoLink = newManualLead.demoUrl || `/portfolio?client=${encodeURIComponent(newManualLead.businessName)}`;
    const fullDemoUrl = demoLink.startsWith('http') ? demoLink : `${window.location.origin}${demoLink}`;

    const lead: DiscoveredBusinessLead = {
      id: `manual_${Date.now()}`,
      businessName: newManualLead.businessName,
      city: newManualLead.city || 'Local',
      country: newManualLead.country || 'Global',
      industry: newManualLead.industry || 'General',
      address: newManualLead.address || `${newManualLead.city}, ${newManualLead.country}`,
      phone: newManualLead.phone || '+1 (555) 010-0000',
      rating: Number(newManualLead.rating) || 5.0,
      reviewCount: Number(newManualLead.reviewCount) || 15,
      websiteStatus: 'No Website Detected',
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newManualLead.businessName + ' ' + (newManualLead.address || newManualLead.city || ''))}`,
      opportunityScore: 96,
      aiRecommendation: `Manually added prospect in ${newManualLead.city}. Prime candidate for modern showcase portfolio & online booking inquiries.`,
      matchedDemo: {
        ...matchedDemo,
        whyItFits: `Custom matched showcase for ${newManualLead.businessName}.`
      },
      personalizedDemoUrl: demoLink,
      contactEmailStatus: 'Public Email Found',
      contactEmail: newManualLead.contactEmail || `contact@${newManualLead.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      outreachAngle: 'Direct Manual Pitch & Custom Prototype',
      personalizedPitch: {
        subject: `Interactive prototype concept for ${newManualLead.businessName}`,
        hook: `I came across ${newManualLead.businessName} and noticed your strong reputation in ${newManualLead.city}.`,
        body: `Hi team,\n\nI was looking into top ${newManualLead.industry} companies in ${newManualLead.city} and came across ${newManualLead.businessName}.\n\nI noticed that potential clients currently have no website to view your completed projects, services, or request an instant quote online.\n\nOur team at Digifox put together a live interactive prototype specifically tailored for your brand:\n${fullDemoUrl}\n\nWould you be open to a 5-minute walkthrough this week?`,
        demoCta: `View ${newManualLead.businessName} Prototype`,
        followUpSubject: `Re: Interactive prototype concept for ${newManualLead.businessName}`,
        followUpBody: `Hi there,\n\nFollowing up on the prototype link we prepared for ${newManualLead.businessName}.\n\nOver 65% of high-ticket clients research on mobile before calling—having this live showcase turns searchers into confirmed quotes:\n${fullDemoUrl}\n\nLet me know if you would like us to customize the photos and branding for you at zero risk.`
      }
    };

    setDiscoveredLeads(prev => [lead, ...prev]);
    setSelectedDiscoveredLead(lead);
    setShowAddLeadModal(false);

    // Reset form
    setNewManualLead({
      businessName: '',
      city: scanParams.city,
      country: scanParams.country,
      industry: scanParams.industry,
      address: '',
      phone: '',
      contactEmail: '',
      demoUrl: '/portfolio',
      rating: 4.9,
      reviewCount: 24
    });
  };

  const handleProcessScraperText = (text: string, filename?: string) => {
    setJsonImportError(null);
    if (!text.trim()) {
      setParsedPreviewStats(null);
      setParsedPreviewLeads([]);
      return;
    }

    try {
      const result = parseScraperData(text, {
        onlyNoWebsite: onlyNoWebsiteImport,
        defaultCity: scanParams.city,
        defaultCountry: scanParams.country,
        defaultIndustry: scanParams.industry
      });

      if (result.stats.total === 0) {
        setJsonImportError('Could not detect any valid business records in file. Make sure headers (name, website, etc.) or valid JSON is present.');
        setParsedPreviewStats(null);
        setParsedPreviewLeads([]);
        return;
      }

      setParsedPreviewStats(result.stats);
      setParsedPreviewLeads(result.leads);
      if (filename) setImportedFileName(filename);
    } catch (err: any) {
      setJsonImportError(`Error processing scraper data: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      setRawScraperInput(content);
      handleProcessScraperText(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setImportedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      setRawScraperInput(content,);
      handleProcessScraperText(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleCommitScraperImport = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setJsonImportError(null);

    const textToProcess = rawScraperInput.trim();
    if (!textToProcess) {
      setJsonImportError('Please upload a scraper CSV/JSON file or paste raw text first.');
      return;
    }

    try {
      const result = parseScraperData(textToProcess, {
        onlyNoWebsite: onlyNoWebsiteImport,
        defaultCity: scanParams.city,
        defaultCountry: scanParams.country,
        defaultIndustry: scanParams.industry
      });

      if (result.leads.length === 0) {
        setJsonImportError(
          onlyNoWebsiteImport
            ? 'All detected businesses in this file already have websites. Uncheck "Only import businesses without a website" to import all.'
            : 'No valid businesses found in the input data.'
        );
        return;
      }

      const enriched = enrichWithStoredSentStatus(result.leads);
      setDiscoveredLeads(enriched);
      setSelectedDiscoveredLead(enriched[0]);
      setShowJsonImportModal(false);
    } catch (err: any) {
      setJsonImportError(`Failed to import leads: ${err.message}`);
    }
  };

  const handleTriggerAiEmailEnrich = () => {
    if (!selectedDiscoveredLead) return;
    setIsAiEnrichingEmail(true);
    try {
      const suggestions = generateEmailSuggestions(
        selectedDiscoveredLead.businessName,
        selectedDiscoveredLead.city,
        selectedDiscoveredLead.industry,
        selectedDiscoveredLead.websiteUrl
      );
      setEmailSuggestions(suggestions);
      if (!manualEmail && suggestions.length > 0) {
        setManualEmail(suggestions[0]);
      }
    } finally {
      setTimeout(() => setIsAiEnrichingEmail(false), 400);
    }
  };

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

  const copyDiscoveredPitch = () => {
    const subject = emailTab === 'initial' ? manualSubject : manualFollowUpSubject;
    const body = emailTab === 'initial' ? manualBody : manualFollowUpBody;
    const textToCopy = `To: ${manualEmail}\nSubject: ${subject}\n\n${body}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const currentSubject = emailTab === 'initial' ? manualSubject : manualFollowUpSubject;
  const currentBody = emailTab === 'initial' ? manualBody : manualFollowUpBody;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] pb-24 pt-12 px-4 sm:px-8">
      <SEOMeta 
        title="Digifox AI Lead Generation Engine | Google Business Scanner"
        description="Scan Google Business Profiles in any city, detect businesses without websites, manually customize demo prototypes and emails, and dispatch via Google Workspace."
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-strong)] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-1.5">
                <Cpu size={13} />
                <span>Google Business API & Workspace Enabled</span>
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-mono">
                Gemini Multi-Agent Engine
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
              Digifox AI <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Lead Generation Engine</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-3xl">
              Discover high-ticket businesses without websites using Google Business Profiles, attach personalized demo prototypes, and dispatch direct sales outreach via your Google Workspace account.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 text-emerald-300 hover:text-white hover:border-emerald-400 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Settings size={13} />
              <span>API & Workspace Settings</span>
            </button>
            <a 
              href="/portfolio"
              className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-xs font-semibold hover:border-blue-400 transition-colors flex items-center gap-1.5"
            >
              <span>Demo Library</span>
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

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20'
                : 'bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <MapPin size={16} />
            <span>Google Business Profile Scanner (City & Niche)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('single')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'single'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/20'
                : 'bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <BarChart3 size={16} />
            <span>Single Website Audit & Lead Scorer</span>
          </button>
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
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300">Fast & Scalable</span>
            </div>
            <div className="text-sm font-bold text-[var(--text-strong)]">Bulk Business Discovery & Triage</div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">
              High-volume profile extraction, website presence checks, and fast qualification.
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
            <div className="text-sm font-bold text-[var(--text-strong)]">Scoring, Demo Matcher & Copywriting</div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">
              Calculates revenue opportunity (0–100), selects demo showcase, and writes tailored cold emails.
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
            <div className="text-sm font-bold text-[var(--text-strong)]">Deep Market & B2B Competitive Strategy</div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">
              Advanced competitor teardown and multi-stakeholder enterprise pitch angles.
            </p>
          </div>
        </div>

        {/* TAB 1: GOOGLE BUSINESS SCANNER */}
        {activeTab === 'scanner' && (
          <div className="space-y-8">
            
            {/* Search Filter Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)] flex items-center gap-2">
                    <Building2 className="text-blue-400" size={20} />
                    <span>Target Local Market Parameters</span>
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] font-light mt-1">
                    Select any country, city, and industry to scan Google Business Profiles for high-potential businesses without websites.
                  </p>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)] flex items-center gap-1">
                    <Filter size={12} />
                    <span>Presets:</span>
                  </span>
                  {SCANNER_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const newParams = { ...p, targetNoWebsiteOnly: true };
                        setScanParams(newParams);
                        handleRunGoogleScan(newParams);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-strong)] text-[11px] font-medium hover:border-blue-400 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {p.city} · {p.industry}
                    </button>
                  ))}
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunGoogleScan();
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Country
                  </label>
                  <input
                    type="text"
                    value={scanParams.country}
                    onChange={(e) => setScanParams({ ...scanParams, country: e.target.value })}
                    placeholder="e.g. USA, UK, UAE"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    City
                  </label>
                  <input
                    type="text"
                    value={scanParams.city}
                    onChange={(e) => setScanParams({ ...scanParams, city: e.target.value })}
                    placeholder="e.g. New York, London, Miami"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Industry / Niche
                  </label>
                  <input
                    type="text"
                    value={scanParams.industry}
                    onChange={(e) => setScanParams({ ...scanParams, industry: e.target.value })}
                    placeholder="e.g. Marble & Granite, Roofing"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--text-secondary)] select-none">
                    <input
                      type="checkbox"
                      checked={scanParams.targetNoWebsiteOnly}
                      onChange={(e) => setScanParams({ ...scanParams, targetNoWebsiteOnly: e.target.checked })}
                      className="rounded accent-blue-600 w-4 h-4"
                    />
                    <span className="font-semibold text-emerald-400">Target: No Website Detected</span>
                  </label>

                  <button
                    type="submit"
                    disabled={isScanning}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isScanning ? (
                      <>
                        <Bot size={15} className="animate-spin" />
                        <span>Scanning Google...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} />
                        <span>Scan Google Business</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-4 border-t border-[var(--border-strong)]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">Search Database:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${googlePlacesApiKey ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-300'}`}>
                    {googlePlacesApiKey ? 'Official Google Places API' : 'Live Geographic Business Directory'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Key size={11} />
                  <span>{googlePlacesApiKey ? 'Configured Google Places Key' : 'Add Google Places Key'}</span>
                </button>
              </div>
            </div>

            {/* Results Grid (Discovered Leads vs Selected Dossier) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Discovered Leads List (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-strong)]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-strong)] flex items-center gap-2">
                    <Globe2 size={16} className="text-blue-400" />
                    <span>Discovered Prospects ({discoveredLeads.length})</span>
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowJsonImportModal(true)}
                      className="px-2.5 py-1 rounded-lg bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-purple-300 transition-all cursor-pointer shadow-sm"
                      title="Upload or paste CSV/JSON from Google Maps Scraper, Outscraper, or Apify"
                    >
                      <Upload size={12} className="text-purple-400" />
                      <span>Upload Scraper (CSV/JSON)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAddLeadModal(true)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-md"
                    >
                      <Plus size={12} />
                      <span>Add Lead</span>
                    </button>
                  </div>
                </div>

                {/* Bulk Selection and Action Toolbar */}
                {discoveredLeads.length > 0 && (
                  <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-md">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSelectAllLeads}
                        className="flex items-center gap-1.5 font-bold text-[var(--text-strong)] hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {selectedLeadIds.length === discoveredLeads.length && discoveredLeads.length > 0 ? (
                          <CheckSquare size={15} className="text-purple-400" />
                        ) : (
                          <Square size={15} className="text-[var(--text-secondary)]" />
                        )}
                        <span>{selectedLeadIds.length === discoveredLeads.length ? 'Deselect All' : 'Select All'}</span>
                      </button>
                      
                      <span className="text-[var(--border-strong)]">|</span>
                      
                      <button
                        type="button"
                        onClick={handleSelectNoWebsiteLeads}
                        className="text-[11px] font-medium text-[var(--text-secondary)] hover:text-emerald-400 transition-colors cursor-pointer"
                        title="Select only leads without website"
                      >
                        No Website
                      </button>
                      <button
                        type="button"
                        onClick={handleSelectWithEmailLeads}
                        className="text-[11px] font-medium text-[var(--text-secondary)] hover:text-blue-400 transition-colors cursor-pointer"
                        title="Select only leads with email identified"
                      >
                        With Email
                      </button>

                      {selectedLeadIds.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearLeadSelection}
                          className="text-[11px] font-medium text-red-400 hover:underline transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-purple-300 font-bold">
                        {selectedLeadIds.length} Selected
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowBulkModal(true)}
                        disabled={selectedLeadIds.length === 0}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Zap size={13} className="text-yellow-300" />
                        <span>Bulk Send ({selectedLeadIds.length})</span>
                      </button>
                    </div>
                  </div>
                )}

                {isScanning ? (
                  <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto animate-pulse">
                      <Bot size={24} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-strong)]">
                      Scanning Google Business Profiles
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] font-light">
                      Extracting public business data, checking websites, matching demo prototypes & computing opportunity scores...
                    </p>
                  </div>
                ) : discoveredLeads.length === 0 ? (
                  <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-center space-y-3">
                    <div className="w-10 h-10 mx-auto rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Search size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-[var(--text-strong)]">No Verified Leads Found for "{scanParams.city}"</h4>
                    <p className="text-xs text-[var(--text-secondary)] font-light max-w-sm mx-auto">
                      We never generate fake or simulated businesses. To scan live Google Maps listings for any city worldwide, add your <strong>Google Places API Key</strong> in settings or click <strong>+ Add Lead</strong> to enter a prospect manually.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowJsonImportModal(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-200 text-xs font-semibold hover:bg-purple-600/40 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Upload size={12} className="text-purple-400" />
                        <span>Upload Scraper CSV / JSON</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSettingsModal(true)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-semibold hover:bg-blue-600/30 transition-colors cursor-pointer"
                      >
                        Add Google Places Key
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddLeadModal(true)}
                        className="px-3 py-1.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold hover:border-emerald-400 text-[var(--text-strong)] transition-colors cursor-pointer"
                      >
                        + Add Lead Manually
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {discoveredLeads.map((lead) => {
                      const isSelected = selectedDiscoveredLead?.id === lead.id;
                      const isChecked = selectedLeadIds.includes(lead.id);
                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedDiscoveredLead(lead)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                            isSelected
                              ? 'bg-blue-950/20 border-blue-500 shadow-xl'
                              : 'bg-[var(--bg-surface)] border-[var(--border-strong)] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-start gap-2.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLeadSelection(lead.id);
                                }}
                                className="mt-0.5 text-[var(--text-secondary)] hover:text-purple-400 transition-colors cursor-pointer"
                                title="Select for Bulk Resend"
                              >
                                {isChecked ? (
                                  <CheckSquare size={16} className="text-purple-400" />
                                ) : (
                                  <Square size={16} />
                                )}
                              </button>
                              <div>
                                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 inline-block">
                                    {lead.websiteStatus}
                                  </span>
                                  {lead.sentCount && lead.sentCount > 0 ? (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 inline-flex items-center gap-1 shadow-sm">
                                      <CheckCircle2 size={10} className="text-purple-400" />
                                      <span>Sent ({lead.sentCount}x)</span>
                                    </span>
                                  ) : null}
                                </div>
                                <h4 className="text-base font-bold text-[var(--text-strong)] leading-snug">
                                  {lead.businessName}
                                </h4>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-mono font-bold text-blue-400 block">
                                {lead.opportunityScore}/100
                              </span>
                              <span className="text-[10px] uppercase text-[var(--text-secondary)]">Score</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)] font-light mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="text-blue-400" />
                              <span className="truncate max-w-[180px]">{lead.address}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Star size={12} className="text-amber-400 fill-amber-400" />
                              <span>{lead.rating} ({lead.reviewCount} reviews)</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--border-strong)]/30">
                            <a
                              href={lead.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lead.businessName}, ${lead.city}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              <MapPin size={11} />
                              <span>Google Maps Profile</span>
                              <ExternalLink size={10} />
                            </a>
                            <span className="text-blue-400 font-semibold flex items-center gap-1">
                              <span>{lead.sentCount && lead.sentCount > 0 ? 'Review & Re-Send' : 'Configure & Send'}</span>
                              <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Selected Prospect Dossier & Outreach Generator (7 cols) */}
              <div className="lg:col-span-7">
                {selectedDiscoveredLead ? (
                  <div className="space-y-6">
                    
                    {/* Top Qualification Card */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-strong)]">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={11} />
                              <span>High Sales Potential</span>
                            </span>
                            <span className="text-xs text-[var(--text-secondary)] font-mono">
                              {selectedDiscoveredLead.city}, {selectedDiscoveredLead.country}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-[var(--text-strong)]">
                            {selectedDiscoveredLead.businessName}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                              <Phone size={12} className="text-blue-400" />
                              <span>{selectedDiscoveredLead.phone}</span>
                            </span>
                            <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                              <Star size={12} className="text-amber-400 fill-amber-400" />
                              <span>{selectedDiscoveredLead.rating} Google Rating ({selectedDiscoveredLead.reviewCount} verified reviews)</span>
                            </span>
                            <a
                              href={selectedDiscoveredLead.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedDiscoveredLead.businessName}, ${selectedDiscoveredLead.city}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
                            >
                              <MapPin size={12} />
                              <span>Open Google Maps Profile ↗</span>
                            </a>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-center min-w-[120px]">
                          <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] block">
                            Opportunity
                          </span>
                          <span className="text-3xl font-black text-blue-400">
                            {selectedDiscoveredLead.opportunityScore}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                            Priority Alpha
                          </span>
                        </div>
                      </div>

                      {/* AI Opportunity Analysis */}
                      <div className="py-5 border-b border-[var(--border-strong)]">
                        <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)] block mb-1">
                          AI Business Analysis & Strategic Gap:
                        </span>
                        <p className="text-sm text-[var(--text-strong)] font-light leading-relaxed">
                          {selectedDiscoveredLead.aiRecommendation}
                        </p>
                      </div>

                      {/* MANUAL DEMO WEBSITE CONFIGURATION */}
                      <div className="pt-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                            <Sparkles size={14} className="text-amber-400" />
                            <span>1. Select or Manually Edit Website Demo Link</span>
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400">
                            Updates in email automatically
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                              Choose Digifox Demo Preset
                            </label>
                            <select
                              value={isCustomUrlMode ? -1 : selectedDemoIndex}
                              onChange={(e) => handleDemoSelectionChange(Number(e.target.value))}
                              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                            >
                              {AVAILABLE_DEMOS.map((demo, idx) => (
                                <option key={idx} value={idx}>
                                  {demo.title} ({demo.category})
                                </option>
                              ))}
                              <option value={-1}>Custom URL (Figma / Staging / Subdomain)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                              Active Demo Preview URL
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={manualDemoUrl}
                                onChange={(e) => handleManualDemoUrlChange(e.target.value)}
                                placeholder="https://example.com/demo"
                                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                              />
                              <a
                                href={manualDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0 transition-colors shadow-md flex items-center gap-1 text-xs font-semibold"
                                title="Test link in new tab"
                              >
                                <Eye size={13} />
                                <span className="hidden sm:inline">Test</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Visual Demo Card */}
                        <div className="p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] flex flex-col sm:flex-row items-center gap-4">
                          <img
                            src={
                              !isCustomUrlMode && AVAILABLE_DEMOS[selectedDemoIndex]?.previewImage
                                ? AVAILABLE_DEMOS[selectedDemoIndex].previewImage
                                : '/image-1783080075680-896100451.png'
                            }
                            alt="Demo Preview"
                            className="w-full sm:w-28 h-20 object-cover rounded-xl border border-[var(--border-strong)]"
                          />
                          <div className="flex-1 text-center sm:text-left">
                            <h4 className="text-sm font-bold text-[var(--text-strong)]">
                              {!isCustomUrlMode && AVAILABLE_DEMOS[selectedDemoIndex]?.title 
                                ? AVAILABLE_DEMOS[selectedDemoIndex].title 
                                : 'Custom Prototype Link'}
                            </h4>
                            <span className="text-xs text-blue-400 block font-mono">
                              {!isCustomUrlMode && AVAILABLE_DEMOS[selectedDemoIndex]?.category 
                                ? AVAILABLE_DEMOS[selectedDemoIndex].category 
                                : 'External / Custom Staging URL'}
                            </span>
                            <p className="text-xs text-[var(--text-secondary)] mt-1 font-light truncate max-w-md">
                              Link delivered to client: {manualDemoUrl}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* MANUAL TARGET RECIPIENT EMAIL */}
                      <div className="pt-5 border-t border-[var(--border-strong)] mt-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                            <Mail size={14} className="text-emerald-400" />
                            <span>2. Target Recipient Email Address</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                              manualEmail
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            }`}>
                              {manualEmail ? 'Ready to Send' : 'Action Required: Add Email'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            type="email"
                            value={manualEmail}
                            onChange={(e) => setManualEmail(e.target.value)}
                            placeholder="Enter recipient email (e.g. owner@gmail.com, info@...)"
                            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-strong)] focus:border-emerald-500 focus:outline-none"
                          />
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={handleTriggerAiEmailEnrich}
                              disabled={isAiEnrichingEmail}
                              className="px-3.5 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-xs font-bold text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                              title="Generate high-probability email variations based on business name & contractor patterns"
                            >
                              <Sparkles size={12} className={isAiEnrichingEmail ? "animate-spin text-purple-300" : "text-purple-400"} />
                              <span>{isAiEnrichingEmail ? 'Enriching...' : 'AI Enrich'}</span>
                            </button>
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(`"${selectedDiscoveredLead.businessName}" "${selectedDiscoveredLead.city}" email OR contact OR gmail`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] hover:border-emerald-400 text-xs font-bold text-[var(--text-strong)] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                              title="Search web & social directories for this business's email"
                            >
                              <Search size={12} />
                              <span>Find on Google</span>
                            </a>
                          </div>
                        </div>

                        {/* AI Inferred Email Pills */}
                        {emailSuggestions.length > 0 && (
                          <div className="mt-2.5 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1.5 flex items-center gap-1.5">
                              <Bot size={12} />
                              <span>AI Inferred Email Patterns (Click to apply):</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {emailSuggestions.map((sug) => (
                                <button
                                  key={sug}
                                  type="button"
                                  onClick={() => setManualEmail(sug)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                                    manualEmail === sug
                                      ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-sm'
                                      : 'bg-[var(--bg-base)] border-[var(--border-strong)] text-[var(--text-strong)] hover:border-purple-400'
                                  }`}
                                >
                                  {sug}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="text-[11px] text-[var(--text-secondary)] mt-1.5 font-light">
                          💡 Businesses without websites typically use Gmail or trade listings. Click <strong>AI Enrich</strong> to generate likely inboxes or <strong>Find on Google</strong> to verify their directory email.
                        </p>
                      </div>

                    </div>

                    {/* COLD OUTREACH EMAIL SEQUENCE & LIVE EDITOR */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-strong)]">
                        <div>
                          <h4 className="text-base font-bold uppercase tracking-tight text-[var(--text-strong)] flex items-center gap-2">
                            <Mail size={16} className="text-indigo-400" />
                            <span>3. Edit Outreach Copy & Dispatch</span>
                          </h4>
                          <span className="text-xs text-[var(--text-secondary)] font-light">
                            Directly edit the subject line or email body below. All changes are preserved.
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Engine Provider Toggle */}
                          <div className="flex bg-[var(--bg-base)] p-1 rounded-xl border border-[var(--border-strong)]">
                            <button
                              type="button"
                              onClick={() => setEmailProvider('resend')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                emailProvider === 'resend' ? 'bg-purple-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                              }`}
                              title="Send via Resend.com API (High deliverability & Bulk support)"
                            >
                              <Zap size={11} className={emailProvider === 'resend' ? 'text-yellow-300' : ''} />
                              <span>Resend API</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEmailProvider('workspace')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                emailProvider === 'workspace' ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                              }`}
                              title="Send via your authenticated Google Workspace SMTP"
                            >
                              <Mail size={11} />
                              <span>Workspace</span>
                            </button>
                          </div>

                          <div className="flex bg-[var(--bg-base)] p-1 rounded-xl border border-[var(--border-strong)]">
                            <button
                              type="button"
                              onClick={() => setEmailTab('initial')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                emailTab === 'initial' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)]'
                              }`}
                            >
                              Step 1: Pitch
                            </button>
                            <button
                              type="button"
                              onClick={() => setEmailTab('followup')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                emailTab === 'followup' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)]'
                              }`}
                            >
                              Step 2: Follow-up
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handleResetEmailToAi}
                            title="Reset to AI copy"
                            className="p-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                          >
                            <RotateCcw size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={copyDiscoveredPitch}
                            className="px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-bold text-[var(--text-strong)] hover:border-emerald-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            {copiedPitch ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                            <span>{copiedPitch ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Sent Tracking Banner if already dispatched */}
                      {(selectedDiscoveredLead.sentCount || 0) > 0 && (
                        <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 text-emerald-300">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>
                              <strong>Previously Dispatched ({selectedDiscoveredLead.sentCount}x):</strong> Last sent to{' '}
                              <span className="font-semibold underline">{selectedDiscoveredLead.lastSentRecipient || manualEmail}</span>
                              {selectedDiscoveredLead.lastSentAt ? ` at ${selectedDiscoveredLead.lastSentAt}` : ''}.
                              You can freely edit the email below and click <strong>Re-Send</strong>.
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider shrink-0">
                            Sent Logged
                          </span>
                        </div>
                      )}

                      {/* Rendered & Editable Email Form */}
                      <div className="space-y-4">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                            Email Subject Line (Editable)
                          </label>
                          <input
                            type="text"
                            value={currentSubject}
                            onChange={(e) => {
                              if (emailTab === 'initial') {
                                setManualSubject(e.target.value);
                              } else {
                                setManualFollowUpSubject(e.target.value);
                              }
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                            Email Body (Editable)
                          </label>
                          <textarea
                            rows={10}
                            value={currentBody}
                            onChange={(e) => {
                              if (emailTab === 'initial') {
                                setManualBody(e.target.value);
                              } else {
                                setManualFollowUpBody(e.target.value);
                              }
                            }}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-sans text-[var(--text-strong)] leading-relaxed focus:border-blue-500 focus:outline-none resize-y"
                          />
                        </div>

                        {/* Status Feedback Messages */}
                        {sendSuccessMessage && (
                          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 shadow-lg">
                            <CheckCircle2 size={16} className="shrink-0" />
                            <span>{sendSuccessMessage}</span>
                          </div>
                        )}

                        {sendErrorMessage && (
                          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between gap-2 shadow-lg">
                            <span>{sendErrorMessage}</span>
                            <button
                              type="button"
                              onClick={() => setShowSettingsModal(true)}
                              className="underline font-bold hover:text-white shrink-0 cursor-pointer"
                            >
                              Check Settings
                            </button>
                          </div>
                        )}

                        {/* Bottom Action Bar */}
                        <div className="pt-4 border-t border-[var(--border-strong)]/40 flex flex-col lg:flex-row items-center justify-between gap-4">
                          <div className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>
                              Target: <strong className="text-[var(--text-strong)]">{manualEmail || 'No email specified'}</strong>
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                            {/* Copy Full Email */}
                            <button
                              type="button"
                              onClick={copyDiscoveredPitch}
                              className="flex-1 lg:flex-none px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-bold hover:border-emerald-400 text-[var(--text-strong)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Copy size={13} />
                              <span>Copy Email</span>
                            </button>

                            {/* 1-Click Launch In Google Workspace (Gmail Web) */}
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(manualEmail)}&su=${encodeURIComponent(currentSubject)}&body=${encodeURIComponent(currentBody)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all whitespace-nowrap"
                            >
                              <Mail size={13} />
                              <span>Open in Workspace</span>
                            </a>

                            {/* Mark Sent Manually (for Gmail Web sends) */}
                            <button
                              type="button"
                              onClick={handleMarkAsSent}
                              title="Mark as sent if you dispatched via external Gmail"
                              className="flex-1 lg:flex-none px-3.5 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-secondary)] hover:text-emerald-400 hover:border-emerald-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 size={13} />
                              <span>Mark Sent</span>
                            </button>

                            {/* Automated Background Dispatch / Re-Send */}
                            <button
                              type="button"
                              onClick={handleSendEmail}
                              disabled={isSendingEmail}
                              className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap ${
                                emailProvider === 'resend'
                                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95'
                                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95'
                              }`}
                            >
                              {isSendingEmail ? (
                                <>
                                  <Bot size={13} className="animate-spin" />
                                  <span>Sending via {emailProvider === 'resend' ? 'Resend' : 'Workspace'}...</span>
                                </>
                              ) : (
                                <>
                                  {emailProvider === 'resend' ? <Zap size={13} className="text-yellow-300" /> : <Send size={13} />}
                                  <span>
                                    {(selectedDiscoveredLead.sentCount || 0) > 0
                                      ? `🔁 Re-Send via ${emailProvider === 'resend' ? 'Resend' : 'Workspace'} (${selectedDiscoveredLead.sentCount} sent)`
                                      : `Send via ${emailProvider === 'resend' ? 'Resend API' : 'Workspace API'}`}
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] text-center text-xs text-[var(--text-secondary)]">
                    Select a prospect from the left list to review and manually customize their demo link and email outreach.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SINGLE LEAD AUDIT & QUALIFICATION */}
        {activeTab === 'single' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)] mb-2 flex items-center gap-2">
                <Target className="text-purple-400" size={20} />
                <span>Single Prospect Audit</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-light mb-6">
                Enter an existing company name, website, or industry to run deep conversion analysis.
              </p>

              {/* Quick Presets */}
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2 block">
                  Quick Load Demo Lead:
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
                      className="px-2.5 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-strong)] text-[11px] font-medium hover:border-purple-400 hover:text-purple-400 transition-colors cursor-pointer"
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
                    placeholder="e.g. Apex Private Jet Charter"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Website URL (Leave blank if prospect has no website)
                  </label>
                  <input 
                    type="text" 
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      Industry / Niche *
                    </label>
                    <input 
                      type="text" 
                      value={formData.industryOrNiche}
                      onChange={(e) => setFormData({ ...formData, industryOrNiche: e.target.value })}
                      placeholder="e.g. Luxury Aviation"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      Target Location
                    </label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. New York, USA"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-purple-500 focus:outline-none"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-purple-500 focus:outline-none resize-none"
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
                  className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Bot size={16} className="animate-spin" />
                      <span>Auditing with Gemini...</span>
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
                            ? 'bg-purple-500/10 border-purple-500/40 text-purple-400' 
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
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 animate-pulse">
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
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-secondary)] mb-4">
                    <Target size={28} />
                  </div>
                  <h3 className="text-lg font-bold uppercase text-[var(--text-strong)] mb-1">
                    No Single Prospect Evaluated Yet
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-sm font-light">
                    Select one of the demo presets on the left or enter a prospect to generate real-time AI scoring and cold outreach copy.
                  </p>
                </div>
              )}

              {!isProcessing && currentLead && (
                <div className="space-y-6">
                  
                  {/* Lead Score Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-strong)]">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            currentLead.priorityTier.includes('VIP') 
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                              : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                          }`}>
                            {currentLead.priorityTier}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)] font-mono">
                            {currentLead.modelUsed}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--text-strong)]">
                          {currentLead.businessName}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                          {currentLead.industry} · {currentLead.location}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-center min-w-[120px]">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] block">
                          Opportunity Score
                        </span>
                        <span className="text-4xl font-black text-purple-400">
                          {currentLead.leadScore}
                        </span>
                        <span className="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-mono">
                          / 100 Points
                        </span>
                      </div>
                    </div>

                    <div className="py-5 border-b border-[var(--border-strong)]">
                      <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)] block mb-1">
                        Executive Summary:
                      </span>
                      <p className="text-sm text-[var(--text-strong)] font-light leading-relaxed">
                        {currentLead.summary}
                      </p>
                    </div>

                    <div className="pt-5">
                      <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)] block mb-2">
                        Key Conversion Pain Points:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentLead.painPoints.map((point, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)]/40 text-xs text-[var(--text-secondary)] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Matched Demo Showcase */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                          Digifox Showcase Match
                        </span>
                        <h4 className="text-lg font-bold text-[var(--text-strong)]">
                          {currentLead.matchedDemo.title}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300">
                        {currentLead.matchedDemo.category}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)]/40 mb-4">
                      <img 
                        src={currentLead.matchedDemo.previewImage} 
                        alt={currentLead.matchedDemo.title} 
                        className="w-full sm:w-36 h-24 object-cover rounded-xl border border-[var(--border-strong)]"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <span className="text-[10px] font-bold uppercase text-[var(--text-secondary)] block mb-1">
                          Why This Demo Closes The Deal:
                        </span>
                        <p className="text-xs text-[var(--text-strong)] font-light leading-relaxed">
                          {currentLead.matchedDemo.whyItFits}
                        </p>
                      </div>
                      <a 
                        href={currentLead.matchedDemo.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg whitespace-nowrap cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>Preview Live</span>
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
        )}

        {/* MODAL: GOOGLE PLACES API & GOOGLE WORKSPACE CREDENTIALS */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)] mb-1 flex items-center gap-2">
                <Settings size={18} className="text-emerald-400" />
                <span>Google API & Workspace Settings</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-6 font-light">
                Configure your Google Business / Places API key for live Google Maps scans, and your Google Workspace email credentials for automated sending.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                    <Key size={13} className="text-blue-400" />
                    <span>Google Business / Places API Key</span>
                  </label>
                  <input
                    type="password"
                    value={googlePlacesApiKey}
                    onChange={(e) => setGooglePlacesApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                    Enables live queries against Google's Places & Business API database. If left blank, Gemini intelligence handles the discovery.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-purple-400" />
                      <span>Apify API Token (compass/crawler-google-places)</span>
                    </span>
                    <a
                      href="https://mcp.apify.com/?tools=actors,docs,compass/crawler-google-places"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-purple-400 hover:text-purple-300 underline lowercase"
                    >
                      apify mcp server
                    </a>
                  </label>
                  <input
                    type="password"
                    value={apifyToken}
                    onChange={(e) => setApifyToken(e.target.value)}
                    placeholder="apify_api_..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono focus:border-purple-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                    Powers live scraping via the official <strong>compass/crawler-google-places</strong> Apify Actor and Apify MCP integration.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Zap size={13} className="text-purple-400" />
                      <span>Resend API Key (re_...)</span>
                    </span>
                    <a
                      href="https://resend.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-purple-400 hover:text-purple-300 underline lowercase"
                    >
                      resend.com/api-keys
                    </a>
                  </label>
                  <input
                    type="password"
                    value={resendApiKey}
                    onChange={(e) => setResendApiKey(e.target.value)}
                    placeholder="re_xxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono focus:border-purple-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                    Powers transactional delivery & bulk email dispatching via Resend.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-purple-400" />
                    <span>Resend From / Sender Address</span>
                  </label>
                  <input
                    type="text"
                    value={resendFromEmail}
                    onChange={(e) => setResendFromEmail(e.target.value)}
                    placeholder="Digifox Agency <onboarding@resend.dev>"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono focus:border-purple-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                    Use <code>Digifox &lt;onboarding@resend.dev&gt;</code> for testing, or your verified domain e.g. <code>team@yourdomain.com</code>.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-emerald-400" />
                    <span>Google Workspace Sender Email</span>
                  </label>
                  <input
                    type="email"
                    value={workspaceEmail}
                    onChange={(e) => setWorkspaceEmail(e.target.value)}
                    placeholder="you@digifox.world"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                    Your authenticated Google Workspace domain email address.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-indigo-400" />
                    <span>Google Workspace App Password</span>
                  </label>
                  <input
                    type="password"
                    value={workspaceAppPassword}
                    onChange={(e) => setWorkspaceAppPassword(e.target.value)}
                    placeholder="xxxx xxxx xxxx xxxx"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                    Generate this at <strong>myaccount.google.com/apppasswords</strong> (Select 'Mail' and 'Other'). Allows sending emails via Google Workspace SMTP securely without exposing your main password.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    Save Credentials
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-4 border-t border-[var(--border-strong)]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">Search Database:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${googlePlacesApiKey ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-300'}`}>
                    {googlePlacesApiKey ? 'Official Google Places API' : 'Live Geographic Business Directory'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Key size={11} />
                  <span>{googlePlacesApiKey ? 'Configured Google Places Key' : 'Add Google Places Key'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD CUSTOM LEAD MANUALLY */}
        {showAddLeadModal && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setShowAddLeadModal(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)] mb-1 flex items-center gap-2">
                <Plus size={18} className="text-blue-400" />
                <span>Add Prospect Manually</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-6 font-light">
                Add an independent local business you found on Google Maps or Instagram to configure demo links and outreach copy.
              </p>

              <form onSubmit={handleAddManualLead} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={newManualLead.businessName}
                    onChange={(e) => setNewManualLead({ ...newManualLead, businessName: e.target.value })}
                    placeholder="e.g. Paramount Marble & Tile"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      City
                    </label>
                    <input
                      type="text"
                      value={newManualLead.city}
                      onChange={(e) => setNewManualLead({ ...newManualLead, city: e.target.value })}
                      placeholder="e.g. New York"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={newManualLead.industry}
                      onChange={(e) => setNewManualLead({ ...newManualLead, industry: e.target.value })}
                      placeholder="e.g. Marble & Granite"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={newManualLead.contactEmail}
                      onChange={(e) => setNewManualLead({ ...newManualLead, contactEmail: e.target.value })}
                      placeholder="owner@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={newManualLead.phone}
                      onChange={(e) => setNewManualLead({ ...newManualLead, phone: e.target.value })}
                      placeholder="+1 (212) 555-0199"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 block">
                    Choose Demo Showcase Preset
                  </label>
                  <select
                    value={selectedDemoIndex}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setSelectedDemoIndex(idx);
                      const demo = AVAILABLE_DEMOS[idx];
                      if (demo) {
                        setNewManualLead({ ...newManualLead, demoUrl: demo.demoUrl });
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs text-[var(--text-strong)] focus:border-blue-500 focus:outline-none"
                  >
                    {AVAILABLE_DEMOS.map((demo, idx) => (
                      <option key={idx} value={idx}>
                        {demo.title} ({demo.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddLeadModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    Add to Pipeline
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-4 border-t border-[var(--border-strong)]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">Search Database:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${googlePlacesApiKey ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-300'}`}>
                    {googlePlacesApiKey ? 'Official Google Places API' : 'Live Geographic Business Directory'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Key size={11} />
                  <span>{googlePlacesApiKey ? 'Configured Google Places Key' : 'Add Google Places Key'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: GOOGLE MAPS SCRAPER INGESTION STUDIO */}
        {showJsonImportModal && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
              <button
                type="button"
                onClick={() => setShowJsonImportModal(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="mb-6">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-300 inline-flex items-center gap-1 mb-2">
                  <Sparkles size={10} />
                  <span>Google Maps Data Scraper Engine</span>
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)] flex items-center gap-2">
                  <FileSpreadsheet size={20} className="text-purple-400" />
                  <span>Import Scraper Leads & Filter No-Website Prospects</span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-light mt-1">
                  Upload or paste data exported from <strong>Instant Data Scraper</strong>, <strong>Outscraper</strong>, <strong>Apify</strong>, or <strong>Octoparse</strong>. The engine automatically isolates businesses without websites, extracts verified emails, and generates tailored cold outreach sequences.
                </p>
              </div>

              {/* Mode Selector Tabs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] mb-6">
                <button
                  type="button"
                  onClick={() => setImportTab('upload')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    importTab === 'upload'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  <Upload size={13} />
                  <span>Upload File (CSV/JSON)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImportTab('paste')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    importTab === 'paste'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  <FileText size={13} />
                  <span>Paste Scraper Text</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImportTab('apify')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    importTab === 'apify'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  <Sparkles size={13} className="text-purple-400" />
                  <span>Apify Live Crawler</span>
                </button>
              </div>

              {/* TAB 1: FILE UPLOAD DROPZONE */}
              {importTab === 'upload' && (
                <div className="space-y-4">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    className="border-2 border-dashed border-[var(--border-strong)] hover:border-purple-500 rounded-3xl p-8 text-center bg-[var(--bg-base)]/50 transition-all cursor-pointer group"
                    onClick={() => document.getElementById('scraper-file-picker')?.click()}
                  >
                    <input
                      id="scraper-file-picker"
                      type="file"
                      accept=".csv,.json,.tsv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-bold text-[var(--text-strong)]">
                      {importedFileName ? `Selected: ${importedFileName}` : 'Drag & drop your Scraper CSV or JSON file here'}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] font-light mt-1">
                      Supports Outscraper, Apify, Instant Data Scraper, Google Places JSON exports (.csv, .json, .tsv)
                    </p>
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider hover:bg-purple-600/30 transition-colors pointer-events-none"
                    >
                      Browse Device Files
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: RAW TEXT / JSON PASTE */}
              {importTab === 'paste' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Paste Scraper Content (CSV or JSON)
                    </label>
                    <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                      Auto-detects format
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={rawScraperInput}
                    onChange={(e) => {
                      setRawScraperInput(e.target.value);
                      handleProcessScraperText(e.target.value);
                    }}
                    placeholder={`Paste CSV headers & rows:\nname,website,phone,address,city,rating,reviews,email\n"State Marble NYC",,"+1 347-528-5355","85 Meadow St","Brooklyn",5,28,"info@..."\n\nOR paste JSON:\n{\n  "status": "Success",\n  "data": [[ { "name": "State Marble NYC", "website": null, ... } ]]\n}`}
                    className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-strong)] focus:border-purple-500 focus:outline-none resize-y"
                  />
                </div>
              )}

              {/* TAB 3: APIFY LIVE CRAWLER */}
              {importTab === 'apify' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Apify Actor: compass/crawler-google-places
                        </span>
                      </div>
                      <a
                        href="https://mcp.apify.com/?tools=actors,docs,compass/crawler-google-places"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-purple-300 hover:text-white flex items-center gap-1 underline"
                        title="View Apify MCP Server"
                      >
                        <span>Apify MCP Server</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-light">
                      Crawl Google Maps live via Apify's official <strong>compass/crawler-google-places</strong> Actor. We automatically isolate businesses without websites, assign high-ticket pipeline scores, and generate customized cold outreach.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1 flex items-center justify-between">
                      <span>Apify API Token</span>
                      <a
                        href="https://console.apify.com/account/integrations"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        <span>Get Apify Token</span>
                        <ExternalLink size={10} />
                      </a>
                    </label>
                    <input
                      type="password"
                      value={apifyToken}
                      onChange={(e) => {
                        setApifyToken(e.target.value);
                        localStorage.setItem('digifox_apify_token', e.target.value);
                      }}
                      placeholder="apify_api_..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-sm font-mono text-[var(--text-strong)] focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        Industry / Niche
                      </label>
                      <input
                        type="text"
                        value={scanParams.industry}
                        onChange={(e) => setScanParams(p => ({ ...p, industry: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs text-[var(--text-strong)] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={scanParams.city}
                        onChange={(e) => setScanParams(p => ({ ...p, city: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs text-[var(--text-strong)] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={scanParams.country}
                        onChange={(e) => setScanParams(p => ({ ...p, country: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs text-[var(--text-strong)] font-semibold"
                      />
                    </div>
                  </div>

                  {apifyError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{apifyError}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isApifyRunning}
                      onClick={handleRunApifyCrawler}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {isApifyRunning ? (
                        <>
                          <Bot size={15} className="animate-spin text-purple-200" />
                          <span>Crawling Google Maps with Apify compass/crawler-google-places...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>Run Live Apify Crawler & Ingest No-Website Leads</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR ALERT */}
              {jsonImportError && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{jsonImportError}</span>
                </div>
              )}

              {/* LIVE STATS & CONFIGURATION BAR */}
              {parsedPreviewStats && (
                <div className="mt-5 p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-strong)]/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span>Data Ingestion Diagnostics</span>
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/10 border border-blue-500/30 text-blue-300">
                        Total: <strong>{parsedPreviewStats.total}</strong>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                        🚫 No Website: <strong>{parsedPreviewStats.noWebsite}</strong>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300">
                        🌐 Active Sites: <strong>{parsedPreviewStats.withWebsite}</strong>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                        ✉️ Emails Found: <strong>{parsedPreviewStats.hasEmail}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Filter Toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={onlyNoWebsiteImport}
                        onChange={(e) => {
                          const nextVal = e.target.checked;
                          setOnlyNoWebsiteImport(nextVal);
                          if (rawScraperInput.trim()) {
                            const res = parseScraperData(rawScraperInput, {
                              onlyNoWebsite: nextVal,
                              defaultCity: scanParams.city,
                              defaultCountry: scanParams.country,
                              defaultIndustry: scanParams.industry
                            });
                            setParsedPreviewLeads(res.leads);
                          }
                        }}
                        className="w-4 h-4 rounded text-purple-600 bg-[var(--bg-surface)] border-[var(--border-strong)] focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-[var(--text-strong)]">
                        Only import businesses <strong>WITHOUT a website</strong> (Recommended: High-ticket website pitch candidates)
                      </span>
                    </label>
                    <span className="text-[11px] text-purple-400 font-mono">
                      {onlyNoWebsiteImport ? `${parsedPreviewStats.noWebsite} will be imported` : `${parsedPreviewStats.total} will be imported`}
                    </span>
                  </div>

                  {/* Sample Records Table */}
                  {parsedPreviewLeads.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--text-secondary)] mb-1.5">
                        Previewing Top {Math.min(3, parsedPreviewLeads.length)} of {parsedPreviewLeads.length} leads:
                      </div>
                      <div className="space-y-1.5 overflow-x-auto">
                        {parsedPreviewLeads.slice(0, 3).map((lead) => (
                          <div
                            key={lead.id}
                            className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0">
                              <p className="font-bold text-[var(--text-strong)] truncate">{lead.businessName}</p>
                              <p className="text-[11px] text-[var(--text-secondary)] truncate">
                                {lead.city} • {lead.rating}★ ({lead.reviewCount} reviews) • {lead.phone || 'No phone'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lead.websiteStatus === 'No Website Detected'
                                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                  : 'bg-blue-500/10 border border-blue-500/30 text-blue-300'
                              }`}>
                                {lead.websiteStatus}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                lead.contactEmail
                                  ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300'
                                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                              }`}>
                                {lead.contactEmail ? lead.contactEmail : 'Email: Needs Verification'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* FOOTER ACTIONS */}
              <div className="mt-6 pt-4 border-t border-[var(--border-strong)] flex items-center justify-between gap-4">
                <span className="text-[11px] text-[var(--text-secondary)] font-light hidden sm:inline">
                  ⚡ Once imported, the AI engine links each business to a live interactive demo and prepares cold email outreach.
                </span>
                <div className="flex items-center gap-2.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setShowJsonImportModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-bold text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCommitScraperImport()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload size={13} />
                    <span>
                      {parsedPreviewStats
                        ? `Import ${onlyNoWebsiteImport ? parsedPreviewStats.noWebsite : parsedPreviewStats.total} Leads`
                        : 'Import Scraper Leads'}
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODAL: BULK EMAIL DISPATCH (RESEND) */}
        {showBulkModal && (
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
              <button
                type="button"
                onClick={() => !isBulkSending && setShowBulkModal(false)}
                disabled={isBulkSending}
                className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer disabled:opacity-40"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-strong)]">
                    Bulk Outreach Dispatcher (Resend API)
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-light">
                    Send personalized cold emails in bulk with tailored interactive demos to all selected prospects.
                  </p>
                </div>
              </div>

              {/* Progress Summary Stats */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-center">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] block">Target Leads</span>
                  <span className="text-xl font-black text-purple-400">{selectedLeadIds.length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-center">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] block">Delivered</span>
                  <span className="text-xl font-black text-emerald-400">{bulkProgress.successCount}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-center">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] block">Failed / Skipped</span>
                  <span className="text-xl font-black text-red-400">{bulkProgress.failCount}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {isBulkSending && (
                <div className="mb-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
                    <span>Sending {bulkProgress.current} of {bulkProgress.total}...</span>
                    <span>{Math.round((bulkProgress.current / (bulkProgress.total || 1)) * 100)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--bg-base)] rounded-full overflow-hidden border border-[var(--border-strong)]">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${Math.round((bulkProgress.current / (bulkProgress.total || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Lead Queue Preview / Live Logs */}
              <div className="flex-1 overflow-y-auto space-y-2 border border-[var(--border-strong)]/60 rounded-2xl p-3 bg-[var(--bg-base)] my-2 min-h-[160px] max-h-[280px]">
                {discoveredLeads.filter(l => selectedLeadIds.includes(l.id)).map((lead, idx) => {
                  const logItem = bulkProgress.logs[idx];
                  return (
                    <div 
                      key={lead.id} 
                      className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)]/40 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="truncate flex-1">
                        <span className="font-bold text-[var(--text-strong)] block truncate">{lead.businessName}</span>
                        <span className="text-[11px] text-[var(--text-secondary)] font-mono truncate block">
                          {lead.contactEmail || `contact@${lead.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
                        </span>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5">
                        {logItem?.status === 'success' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 size={11} /> Sent
                          </span>
                        ) : logItem?.status === 'error' ? (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <AlertCircle size={11} /> Error
                          </span>
                        ) : isBulkSending && bulkProgress.current === idx ? (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
                            <Loader2 size={11} className="animate-spin" /> Sending...
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-[var(--bg-base)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-wider">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--border-strong)]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-[var(--text-secondary)] font-light truncate">
                  Sender: <strong className="text-[var(--text-strong)] font-mono">{resendFromEmail}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBulkModal(false)}
                    disabled={isBulkSending}
                    className="px-4 py-2 rounded-xl bg-[var(--bg-base)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer disabled:opacity-40"
                  >
                    {bulkProgress.current > 0 && !isBulkSending ? 'Close' : 'Cancel'}
                  </button>

                  <button
                    type="button"
                    onClick={handleRunBulkResend}
                    disabled={isBulkSending || selectedLeadIds.length === 0}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isBulkSending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Sending {bulkProgress.current}/{bulkProgress.total}...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={14} className="text-yellow-300" />
                        <span>Start Bulk Dispatch ({selectedLeadIds.length})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LeadGenerationPage;