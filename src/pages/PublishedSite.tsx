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
          @keyframes zoomIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          /* Added standard utility animations */
          .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          
          .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
          
          .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          
          .animate-zoom-in { animation: zoomIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          .animate-bounce-in { animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          @keyframes bounceIn { 
            0% { opacity: 0; transform: scale(0.3); } 
            50% { opacity: 1; transform: scale(1.05); } 
            70% { transform: scale(0.9); } 
            100% { transform: scale(1); } 
          }
          .animate-float { animation: float 3s ease-in-out infinite !important; }
          .animate-pulse { animation: pulseCustom 2s ease-in-out infinite !important; }
          .animate-sway { animation: sway 4s ease-in-out infinite !important; }
          .animate-glow { animation: glow 2.5s ease-in-out infinite !important; }
        `;
        doc.head.appendChild(style);
      }

      // Apply saved custom styles robustly using MutationObserver
      const customStyles = siteData.data?.customStyles;
      if (customStyles) {
        const applyStyles = () => {
          Object.keys(customStyles).forEach(selector => {
            const el = doc.querySelector(selector) as HTMLElement;
            if (el && !el.dataset.styled) {
              const rules = customStyles[selector];
              if (rules.html !== undefined) el.innerHTML = rules.html;
              if (rules.fontSize) el.style.setProperty('font-size', rules.fontSize, 'important');
              if (rules.fontWeight) el.style.setProperty('font-weight', rules.fontWeight, 'important');
              if (rules.color) el.style.setProperty('color', rules.color, 'important');
              if (rules.fontFamily) el.style.setProperty('font-family', `"${rules.fontFamily}", sans-serif`, 'important');
              
              if (rules.animateIn && rules.animateIn !== 'none') el.classList.add(`animate-${rules.animateIn}`);
              if (rules.animateOut && rules.animateOut !== 'none') el.classList.add(`animate-${rules.animateOut}`);
              if (rules.loop && rules.loop !== 'none') el.classList.add(`animate-${rules.loop}`);
              
              // Mark as styled so we don't re-apply indefinitely
              el.dataset.styled = "true";
            }
          });
        };
        
        applyStyles(); // Initial attempt
        
        // Wait for React to mount and elements to appear
        const observer = new MutationObserver(() => {
          applyStyles();
        });
        observer.observe(doc.body, { childList: true, subtree: true });
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
