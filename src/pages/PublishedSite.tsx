import React, { useEffect, useState } from 'react';

import { getPublishedWebsite } from '../services/firebase';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { SEOMeta } from '../components/SEOMeta';

export const PublishedSite: React.FC<{ subdomain: string }> = ({ subdomain }) => {
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subdomain) return;
    const fetchSite = async () => {
      try {
        const result = await getPublishedWebsite(subdomain);
        if (result) {
          setSiteData(result);
        } else {
          setError("Website not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load website");
      } finally {
        setLoading(false);
      }
    };
    fetchSite();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-['Kanit'] uppercase tracking-widest animate-pulse">Loading {subdomain}.digifox.world...</p>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-['Kanit'] p-4 text-center">
        <div className="text-6xl mb-6">🦊</div>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Site Not Found</h1>
        <p className="text-gray-400 max-w-md">{error || "This Digifox website doesn't exist yet."}</p>
        <a href="https://digifox.world" className="mt-8 text-[#3b82f6] hover:underline">Build your own at digifox.world</a>
      </div>
    );
  }

  // Handle HTML Templates (Aero, Voya, etc.)
  if (siteData.type === 'html_template' && siteData.templateUrl) {
    return (
      <div className="w-full h-screen overflow-hidden bg-black">
        <iframe 
          src={siteData.templateUrl} 
          className="w-full h-full border-none"
          title={`${subdomain} Template`}
          ref={(iframe) => {
            if (iframe && siteData.data) {
              const handleIframeMessage = (event: MessageEvent) => {
                if (event.data?.type === 'READY_FOR_INJECTION' && iframe.contentWindow) {
                  if (siteData.data.customHtml) {
                    iframe.contentWindow.postMessage({ 
                      type: 'INJECT_HTML', 
                      html: siteData.data.customHtml 
                    }, '*');
                  }
                }
                
                if (event.data?.type === 'REQUEST_SYNC' && event.source) {
                  (event.source as WindowProxy).postMessage({ type: 'SYNC_DATA', data: siteData.data }, '*');
                }
              };
              window.addEventListener('message', handleIframeMessage);
              
              // Cleanup (Note: in a real app you'd want to handle cleanup better, 
              // but since this is a top-level render it's okay for now)
            }
          }}
        />
      </div>
    );
  }

  // Handle AI Generated Sites
  return (
    <>
      <SEOMeta 
        title={siteData.data?.hero?.title || "Digifox Site"}
        description={siteData.data?.hero?.subtitle || ""}
      />
      <div className="min-h-screen bg-black">
        <PreviewRenderer data={siteData.data} logoUrl={siteData.logoUrl} />
      </div>
    </>
  );
};
