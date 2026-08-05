import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWebsite, planWebsite, type GeneratedWebsiteData, type ChatMessage } from '../services/aiBuilderService';
import { publishWebsite } from '../services/firebase';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { SEOMeta } from '../components/SEOMeta';

export const AiBuilderPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  
  const [websiteType, setWebsiteType] = useState("Local Business");
  const [logoUrl, setLogoUrl] = useState("");

  const [buildMode, setBuildMode] = useState("ai"); // 'ai', 'aero', 'voya', 'drinking 5d', 'bnrmlss 2', 'coin-site 2'

  // Custom Data for Readymade Templates
  const [customBrandName, setCustomBrandName] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [customContact, setCustomContact] = useState("");

  const [isPlanning, setIsPlanning] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState("");
  const [previewData, setPreviewData] = useState<GeneratedWebsiteData | null>(null);
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");

  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlan = async () => {
    if (!currentInput.trim()) return;

    setError("");
    
    // Add website type context if this is the first message
    let messageText = currentInput.trim();
    if (chatHistory.length === 0) {
      messageText = `I want to build a ${websiteType} website. ${messageText}`;
    }

    const userMsg: ChatMessage = { role: 'user', text: messageText };
    const updatedHistory = [...chatHistory, userMsg];
    
    setChatHistory(updatedHistory);
    setCurrentInput("");
    setIsPlanning(true);

    try {
      const aiReply = await planWebsite(updatedHistory);
      setChatHistory([...updatedHistory, { role: 'ai', text: aiReply }]);
    } catch (err: any) {
      setError(err.message || "Failed to contact AI consultant.");
    } finally {
      setIsPlanning(false);
    }
  };

  const handleBuild = async () => {
    if (chatHistory.length === 0 && !currentInput.trim()) {
      setError("Please discuss your website with the AI before building.");
      return;
    }

    setError("");
    setIsBuilding(true);
    setPreviewData(null);

    // If there's text in the input but they clicked build, include it in the history
    let finalHistory = [...chatHistory];
    if (currentInput.trim()) {
      finalHistory.push({ role: 'user', text: currentInput.trim() });
      setChatHistory(finalHistory);
      setCurrentInput("");
    }

    try {
      const result = await generateWebsite(finalHistory, websiteType);
      setPreviewData(result);
      sessionStorage.setItem("generatedSite", JSON.stringify(result));
      if (logoUrl) {
        sessionStorage.setItem("generatedLogo", logoUrl);
      } else {
        sessionStorage.removeItem("generatedLogo");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate website layout.");
    } finally {
      setIsBuilding(false);
    }
  };

  const handlePublish = async () => {
    // If in AI mode, we need previewData. If in template mode, we don't.
    if (buildMode === "ai" && !previewData) return;

    const subdomain = prompt("Enter a unique brand name for your subdomain (e.g. 'mybrand'):");
    if (!subdomain) return;
    
    // clean subdomain
    const cleanSubdomain = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanSubdomain) {
      alert("Invalid subdomain name. Only letters, numbers, and hyphens are allowed.");
      return;
    }

    setIsPublishing(true);
    try {
      if (buildMode === "ai") {
        await publishWebsite(cleanSubdomain, previewData!, logoUrl);
      } else {
        const queryParams = new URLSearchParams({
          brand: customBrandName,
          address: customAddress,
          contact: customContact
        }).toString();
        
        // Map templates to their live Vercel deployments
        const liveTemplateUrls: Record<string, string> = {
          'aero': 'https://digifox5donline.vercel.app',
          'voya': 'https://voya-YOUR-LINK.vercel.app',
          'drinking 5d': 'https://digifox-onlinestore.vercel.app',
          'bnrmlss 2': 'https://digifox-storedemo-gqiq.vercel.app',
          'coin-site 2': 'https://coin-YOUR-LINK.vercel.app'
        };
        
        const baseUrl = liveTemplateUrls[buildMode] || '';
        const templateUrl = `${baseUrl}?${queryParams}`;
        await publishWebsite(cleanSubdomain, null, logoUrl, templateUrl);
      }
      
      const url = `https://${cleanSubdomain}.digifox.world`;
      setPublishedUrl(url);
      alert(`Website published successfully at: ${url}`);
    } catch (err: any) {
      alert(err.message || "Failed to publish website");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] font-['Kanit'] py-20 px-6 sm:px-10">
      <SEOMeta 
        title="AI Website Builder | Digifox"
        description="Chat with our AI consultant to plan and instantly generate a stunning, fully-animated static one-page website."
      />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header & Chat Section */}
        <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
          
          <div className="flex-1 w-full flex flex-col gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                AI <span className="text-[#3b82f6]">Consultant</span> & Builder
              </h1>
              <p className="text-[var(--text-primary)]/70 text-lg max-w-2xl">
                Discuss your vision with our AI architect. Once you're happy with the plan, click Build to instantly generate a beautifully animated one-page website.
              </p>
            </div>

            {/* Build Mode Selector */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { id: 'ai', label: '🤖 Custom AI Builder' },
                { id: 'aero', label: '🧊 Aero (3D)' },
                { id: 'voya', label: '🧊 Voya (Premium)' },
                { id: 'drinking 5d', label: '🍹 Drinking 5D' },
                { id: 'bnrmlss 2', label: '🚀 Bnrmlss 2' },
                { id: 'coin-site 2', label: '💰 Coin Site' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setBuildMode(mode.id);
                    setPreviewData(null); // Clear preview when switching modes
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all border ${
                    buildMode === mode.id 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                      : 'bg-[var(--bg-surface)] border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Configuration Row (Only for AI) */}
            {buildMode === "ai" && (
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Website Type</label>
                <select 
                  value={websiteType}
                  onChange={(e) => setWebsiteType(e.target.value)}
                  disabled={chatHistory.length > 0}
                  className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none disabled:opacity-50"
                >
                  <option value="Local Business">Local Business</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Factory / Manufacturing">Factory / Manufacturing</option>
                  <option value="E-Commerce Store">E-Commerce Store</option>
                  <option value="Mobile Web App">Mobile Web App</option>
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Company Logo (Optional)</label>
                <div className="relative flex items-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-secondary)] flex justify-between items-center hover:border-[#3b82f6] transition-colors">
                    <span className="truncate">{logoUrl ? "Logo Uploaded!" : "Choose an image file..."}</span>
                    {logoUrl && <img src={logoUrl} alt="Logo" className="h-6 w-auto object-contain rounded" />}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Chat UI or Template Preview */}
            {buildMode === "ai" ? (
            <div className="flex flex-col bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] shadow-xl w-full h-[500px] overflow-hidden">
              
              {/* Chat History */}
              <div 
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto p-6 flex flex-col gap-4"
              >
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[var(--text-primary)]/40 text-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
                    <p className="font-light tracking-wide max-w-sm">
                      Tell the AI what kind of website you want to build. It will ask questions and help structure your ideas.
                    </p>
                  </div>
                ) : (
                  chatHistory.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-[#3b82f6] text-white self-end rounded-br-sm' 
                          : 'bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-primary)] self-start rounded-bl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  ))
                )}
                
                {isPlanning && (
                  <div className="bg-[var(--bg-base)] border border-[var(--border-strong)] p-4 rounded-2xl self-start rounded-bl-sm flex gap-2 items-center">
                    <div className="w-2 h-2 bg-[var(--text-primary)]/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[var(--text-primary)]/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[var(--text-primary)]/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[var(--border-strong)] bg-[var(--bg-base)] flex flex-col gap-3">
                <textarea 
                  rows={2}
                  placeholder="E.g. I need a luxury watch landing page..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handlePlan();
                    }
                  }}
                  className="w-full bg-transparent text-[var(--text-strong)] placeholder:text-[var(--text-secondary)] outline-none resize-none px-2"
                />
                
                <div className="flex justify-between items-center px-2">
                  <div className="flex gap-3 w-full justify-end">
                    <button 
                      onClick={handlePlan}
                      disabled={isPlanning || isBuilding || !currentInput.trim()}
                      className="text-[var(--text-strong)] border border-[var(--border-strong)] hover:border-[#3b82f6] hover:text-[#3b82f6] px-6 py-2 rounded-full font-bold uppercase tracking-wider text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPlanning ? "Planning..." : "Plan with AI"}
                    </button>
                    
                    <button 
                      onClick={handleBuild}
                      disabled={isBuilding || (chatHistory.length === 0 && !currentInput.trim())}
                      className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-8 py-2 rounded-full font-bold uppercase tracking-wider text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                      {isBuilding ? "Building..." : "Build Website"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              <div className="flex flex-col bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] shadow-xl w-full h-[500px] overflow-hidden">
                <div className="flex-1 overflow-y-auto p-10 flex flex-col items-center justify-start text-center gap-6">
                  <div className="text-6xl mb-2">🧊</div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-[var(--text-strong)]">
                    {buildMode.toUpperCase()} Template Selected
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm max-w-md">
                    Enter your details below to customize this premium template. These details will instantly populate the template when published!
                  </p>
                  
                  <div className="w-full max-w-sm flex flex-col gap-4 text-left mt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Brand Name</label>
                      <input 
                        type="text" 
                        value={customBrandName}
                        onChange={(e) => setCustomBrandName(e.target.value)}
                        placeholder="e.g. Digifox" 
                        className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Business Address</label>
                      <input 
                        type="text" 
                        value={customAddress}
                        onChange={(e) => setCustomAddress(e.target.value)}
                        placeholder="e.g. 123 Main St, NY" 
                        className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">WhatsApp / Contact Number</label>
                      <input 
                        type="text" 
                        value={customContact}
                        onChange={(e) => setCustomContact(e.target.value)}
                        placeholder="e.g. +1 555-1234" 
                        className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <a 
                    href={
                      {
                        'aero': 'https://digifox5donline.vercel.app',
                        'voya': 'https://voya-YOUR-LINK.vercel.app',
                        'drinking 5d': 'https://digifox-onlinestore.vercel.app',
                        'bnrmlss 2': 'https://digifox-storedemo-gqiq.vercel.app',
                        'coin-site 2': 'https://coin-YOUR-LINK.vercel.app'
                      }[buildMode] || '#'
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[var(--bg-base)] border border-[var(--border-strong)] hover:border-[#3b82f6] text-[var(--text-strong)] px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-lg"
                  >
                    Preview Template ↗
                  </a>
                    <button 
                      onClick={handlePublish}
                      disabled={isPublishing || !customBrandName}
                      className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
                    >
                      {isPublishing ? "Publishing..." : "Publish Custom Site 🚀"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-500/10 p-4 rounded-xl border border-red-500/20 w-full">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-[var(--border-strong)] pb-4 gap-4">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              Live Preview
            </h2>
            {(previewData || buildMode !== 'ai') && !isBuilding && (
              <div className="flex gap-4">
                <button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
                >
                  {isPublishing ? "Publishing..." : "Publish to Web 🚀"}
                </button>
                {buildMode === 'ai' && (
                <button 
                  onClick={() => window.open('/generated-site', '_blank')}
                  className="bg-[var(--text-strong)] text-[var(--bg-base)] px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-xl"
                >
                  Open Full Screen ↗
                </button>
                )}
              </div>
            )}
          </div>
          
          {publishedUrl && (
            <div className="mb-6 bg-blue-500/10 border border-blue-500/30 text-blue-400 p-4 rounded-xl flex items-center justify-between">
              <span className="font-medium">Your website is live!</span>
              <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-300">
                {publishedUrl}
              </a>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {isBuilding ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[600px] rounded-3xl border-2 border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center gap-6"
              >
                <div className="w-16 h-16 border-4 border-[#8b5cf6] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[var(--text-primary)] font-medium text-lg animate-pulse uppercase tracking-widest">
                  AI is designing and assembling your layout...
                </p>
              </motion.div>
            ) : previewData ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <PreviewRenderer data={previewData} logoUrl={logoUrl} />
              </motion.div>
            ) : buildMode !== 'ai' ? (
              <motion.div 
                key="template-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-[600px] rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
              >
                <iframe src={`/templates/${buildMode}/index.html`} className="w-full h-full border-none" title="Template Preview" />
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-[400px] rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] font-medium text-lg uppercase tracking-widest text-center px-4"
              >
                Plan your website above, then click Build to see it here.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
};
