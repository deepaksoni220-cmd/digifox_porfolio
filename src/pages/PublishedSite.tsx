import React, { useEffect, useState } from 'react';
import { getPublishedWebsite } from '../services/firebase';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { SEOMeta } from '../components/SEOMeta';

export const PublishedSite: React.FC<{ subdomain: string }> = ({ subdomain }) => {
  const [data, setData] = useState<any>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const siteData = await getPublishedWebsite(subdomain);
        if (siteData) {
          setData(siteData.data);
          if (siteData.logoUrl) {
            setLogoUrl(siteData.logoUrl);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSite();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest">404 - Not Found</h1>
        <p className="text-white/50">This website does not exist or has been removed.</p>
        <a href="https://digifox.world" className="mt-8 text-[#3b82f6] hover:underline">Build your own website at Digifox.world</a>
      </div>
    );
  }

  return (
    <>
      <SEOMeta 
        title={data.hero.title}
        description={data.hero.subtitle}
      />
      <main className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-black overflow-hidden">
        <PreviewRenderer data={data} fullScreen={true} logoUrl={logoUrl} />
      </main>
    </>
  );
};
