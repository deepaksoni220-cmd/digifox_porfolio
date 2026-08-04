import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWebsite, type GeneratedWebsiteData, type AiProvider } from '../services/aiBuilderService';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { SEOMeta } from '../components/SEOMeta';

export const AiBuilderPage: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [provider, setProvider] = useState<AiProvider>("openai");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewData, setPreviewData] = useState<GeneratedWebsiteData | null>(null);

  const handleBuild = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt describing your website.");
      return;
    }
    if (!apiKey.trim()) {
      setError("Please enter your API Key to generate.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await generateWebsite(prompt, apiKey, provider);
      setPreviewData(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate website. Check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] font-['Kanit'] py-20 px-6 sm:px-10">
      <SEOMeta 
        title="AI Website Builder | Digifox"
        description="Type a prompt and instantly generate a stunning, fully-animated static one-page website using AI."
      />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              AI Website <span className="text-[#3b82f6]">Builder</span>
            </h1>
            <p className="text-[var(--text-primary)]/70 text-lg mb-8 max-w-xl">
              Type your vision below. We'll use your AI API key to instantly generate a fully structured, beautifully animated one-page website.
            </p>

            <div className="flex flex-col gap-5 bg-[var(--bg-surface)] p-6 rounded-3xl border border-[var(--border-subtle)] shadow-xl w-full max-w-2xl">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">AI Provider</label>
                  <select 
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as AiProvider)}
                    className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                  >
                    <option value="openai">OpenAI (GPT-4o / GPT-3.5)</option>
                    <option value="gemini">Google Gemini</option>
                    <option value="groq">Groq (Llama 3)</option>
                  </select>
                </div>
                
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">API Key</label>
                  <input 
                    type="password"
                    placeholder="Enter your API Key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Your Prompt</label>
                <div className="relative">
                  <textarea 
                    rows={4}
                    placeholder="E.g. A sleek, luxury coffee shop in London named 'Noir'. Use gold and dark brown colors. Highlight 3 services: Espresso Bar, Pastries, and Roasting."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl p-4 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none resize-none"
                  />
                  <button 
                    onClick={handleBuild}
                    disabled={isLoading}
                    className="absolute bottom-4 right-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  >
                    {isLoading ? "Generating..." : "Plan and Build"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium mt-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="w-full">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-[var(--border-strong)] pb-4">
            Live Preview
          </h2>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[600px] rounded-3xl border-2 border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center gap-6"
              >
                <div className="w-16 h-16 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[var(--text-primary)] font-medium text-lg animate-pulse uppercase tracking-widest">
                  AI is designing your layout...
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
                className="w-full h-[400px] rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] font-medium text-lg uppercase tracking-widest"
              >
                Enter a prompt to start building
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
};
