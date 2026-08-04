import React, { useEffect, useState } from 'react';
import type { GeneratedWebsiteData } from '../services/aiBuilderService';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';

export const GeneratedSitePage: React.FC = () => {
  const [data, setData] = useState<GeneratedWebsiteData | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const saved = sessionStorage.getItem("generatedSite");
    const savedLogo = sessionStorage.getItem("generatedLogo");
    if (saved) {
      try {
        setData(JSON.parse(saved));
        if (savedLogo) setLogoUrl(savedLogo);
      } catch (e) {
        console.error("Failed to parse saved site data");
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] text-[var(--text-strong)] uppercase tracking-widest font-bold">
        No generated site found. Please generate one first.
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-black">
      <PreviewRenderer data={data} fullScreen={true} logoUrl={logoUrl} />
    </main>
  );
};
