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

  useEffect(() => {
    if (!siteData || !siteData.data) return;
    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data?.type === 'REQUEST_SYNC' && event.source) {
        (event.source as WindowProxy).postMessage({ type: 'SYNC_DATA', data: siteData.data }, '*');
      }
    };
    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, [siteData]);

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

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      // Inject custom keyframes for animations
      const styleId = 'editor-outline-styles';
      if (!doc.getElementById(styleId)) {
        const style = doc.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          /* Animation Preset Keyframes */
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pulseCustom {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.02); }
          }
          @keyframes sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(2deg); }
          }
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 5px rgba(168,85,247,0.2); }
            50% { text-shadow: 0 0 15px rgba(168,85,247,0.6); }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes zoomIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          .animate-float { animation: float 3s ease-in-out infinite !important; }
          .animate-pulse-custom { animation: pulseCustom 2s ease-in-out infinite !important; }
          .animate-sway { animation: sway 4s ease-in-out infinite !important; }
          .animate-glow { animation: glow 2.5s ease-in-out infinite !important; }
          .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards !important; }
          .animate-zoom-in { animation: zoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards !important; }
        `;
        doc.head.appendChild(style);
      }

      // Apply saved custom styles
      const customStyles = siteData.data?.customStyles;
      if (customStyles) {
        Object.keys(customStyles).forEach(selector => {
          const el = doc.querySelector(selector) as HTMLElement;
          if (el) {
            const styles = customStyles[selector];
            if (styles.text !== undefined) el.textContent = styles.text;
            if (styles.fontSize) el.style.fontSize = styles.fontSize;
            if (styles.fontWeight) el.style.fontWeight = styles.fontWeight;
            if (styles.color) el.style.color = styles.color;
            if (styles.fontFamily) el.style.fontFamily = styles.fontFamily;

            // Apply animation classes
            el.classList.remove('animate-float', 'animate-pulse-custom', 'animate-sway', 'animate-glow', 'animate-slide-up', 'animate-zoom-in');
            if (styles.animateIn === 'fade-up') el.classList.add('animate-slide-up');
            if (styles.animateIn === 'zoom-in') el.classList.add('animate-zoom-in');
            if (styles.loop === 'float') el.classList.add('animate-float');
            if (styles.loop === 'pulse') el.classList.add('animate-pulse-custom');
            if (styles.loop === 'sway') el.classList.add('animate-sway');
            if (styles.loop === 'glow') el.classList.add('animate-glow');
          }
        });
      }

    } catch (e) {
      console.warn("Published site same-origin style applier restricted or failed:", e);
    }
  };

  // Handle HTML Templates (Aero, Voya, etc.)
  if (siteData.type === 'html_template' && siteData.templateUrl) {
    return (
      <div className="w-full h-screen overflow-hidden bg-black">
        <iframe 
          src={siteData.templateUrl} 
          onLoad={handleIframeLoad}
          className="w-full h-full border-none"
          title={`${subdomain} Template`}
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
