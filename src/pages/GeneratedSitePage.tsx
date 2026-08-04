import React, { useEffect, useState } from 'react';
import { GeneratedWebsiteData } from '../services/aiBuilderService';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';

export const GeneratedSitePage: React.FC = () => {
  const [data, setData] = useState<GeneratedWebsiteData | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("generatedSite");
    if (saved) {
      try {
        setData(JSON.parse(saved));
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
    <main className="w-full min-h-screen">
      <PreviewRenderer data={data} fullScreen={true} />
    </main>
  );
};
