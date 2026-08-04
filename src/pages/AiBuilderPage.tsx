import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWebsite, planWebsite, type GeneratedWebsiteData, type ChatMessage } from '../services/aiBuilderService';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { SEOMeta } from '../components/SEOMeta';

export const AiBuilderPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  
  const [isPlanning, setIsPlanning] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState("");
  const [previewData, setPreviewData] = useState<GeneratedWebsiteData | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handlePlan = async () => {
    if (!currentInput.trim()) return;

    setError("");
    const userMsg: ChatMessage = { role: 'user', text: currentInput.trim() };
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
      const result = await generateWebsite(finalHistory);
      setPreviewData(result);
      sessionStorage.setItem("generatedSite", JSON.stringify(result));
    } catch (err: any) {
      setError(err.message || "Failed to generate website layout.");
    } finally {
      setIsBuilding(false);
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

            {/* Chat UI */}
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
            {previewData && !isBuilding && (
              <button 
                onClick={() => window.open('/generated-site', '_blank')}
                className="bg-[var(--text-strong)] text-[var(--bg-base)] px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-xl"
              >
                Open Full Screen ↗
              </button>
            )}
          </div>
          
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
                <PreviewRenderer data={previewData} />
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
