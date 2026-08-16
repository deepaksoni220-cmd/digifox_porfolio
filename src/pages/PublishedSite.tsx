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
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_50%)] animate-pulse"></div>
        <div className="relative flex flex-col items-center gap-8 z-10">
          <div className="relative">
            <div className="w-24 h-24 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.2)]">
              <span className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>🦊</span>
            </div>
            <div className="absolute -inset-4 bg-[#3b82f6] opacity-20 blur-2xl rounded-full animate-pulse z-[-1]"></div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-white font-['Kanit'] text-2xl uppercase tracking-[0.2em] font-light">
              Digifox
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <p className="text-gray-400 font-['Kanit'] text-xs uppercase tracking-widest">
                Building <span className="text-white font-medium">{subdomain}</span>...
              </p>
            </div>
          </div>
        </div>
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
          @keyframes kFadeUp{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}
          @keyframes kSlideInLeft{from{transform:translateX(-40px);opacity:0}to{transform:none;opacity:1}}
          @keyframes kFadeIn{from{opacity:0}to{opacity:1}}
          @keyframes kZoomIn{from{transform:scale(0.8);opacity:0}to{transform:scale(1);opacity:1}}
          @keyframes kBounceIn{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08);opacity:1}80%{transform:scale(.97)}100%{transform:scale(1)}}
          @keyframes kFlipX{from{transform:rotateX(80deg);opacity:0}to{transform:rotateX(0);opacity:1}}
          @keyframes kBlurIn{from{filter:blur(16px);opacity:0}to{filter:blur(0);opacity:1}}
          @keyframes kSlideUp{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
          @keyframes kSlideInRight{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}
          @keyframes kRotateIn{from{transform:rotate(-15deg) scale(.8);opacity:0}to{transform:none;opacity:1}}
          @keyframes kScaleUp{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}
          .animate-fade-up{animation:kFadeUp .7s cubic-bezier(.16,1,.3,1) forwards !important}
          .animate-slide-in-left{animation:kSlideInLeft .7s cubic-bezier(.16,1,.3,1) forwards !important}
          .animate-fade-in{animation:kFadeIn .7s ease forwards !important}
          .animate-zoom-in{animation:kZoomIn .7s cubic-bezier(.16,1,.3,1) forwards !important}
          .animate-bounce-in{animation:kBounceIn .8s ease forwards !important}
          .animate-flip-x{animation:kFlipX .7s ease forwards !important}
          .animate-blur-in{animation:kBlurIn .7s ease forwards !important}
          .animate-slide-up{animation:kSlideUp .7s cubic-bezier(.16,1,.3,1) forwards !important}
          .animate-slide-in-right{animation:kSlideInRight .7s cubic-bezier(.16,1,.3,1) forwards !important}
          .animate-rotate-in{animation:kRotateIn .7s ease forwards !important}
          .animate-scale-up{animation:kScaleUp .7s cubic-bezier(.16,1,.3,1) forwards !important}
          @keyframes kFadeOut{from{opacity:1}to{opacity:0}}
          @keyframes kSlideOutRight{from{transform:none;opacity:1}to{transform:translateX(40px);opacity:0}}
          @keyframes kZoomOut{from{transform:scale(1);opacity:1}to{transform:scale(.5);opacity:0}}
          @keyframes kSlideDown{from{transform:none;opacity:1}to{transform:translateY(30px);opacity:0}}
          @keyframes kBlurOut{from{filter:blur(0);opacity:1}to{filter:blur(16px);opacity:0}}
          @keyframes kSliceOut{from{clip-path:inset(0 0 0 0);opacity:1}to{clip-path:inset(0 100% 0 0);opacity:0}}
          @keyframes kRotateOut{from{transform:none;opacity:1}to{transform:rotate(15deg) scale(.8);opacity:0}}
          @keyframes kBounceOut{from{transform:scale(1);opacity:1}to{transform:scale(.6);opacity:0}}
          .animate-fade-out{animation:kFadeOut .7s ease forwards !important}
          .animate-slide-out-right{animation:kSlideOutRight .7s ease forwards !important}
          .animate-zoom-out{animation:kZoomOut .7s ease forwards !important}
          .animate-slide-down{animation:kSlideDown .7s ease forwards !important}
          .animate-blur-out{animation:kBlurOut .7s ease forwards !important}
          .animate-slice-out-left{animation:kSliceOut .7s ease forwards !important}
          .animate-rotate-out{animation:kRotateOut .7s ease forwards !important}
          .animate-bounce-out{animation:kBounceOut .7s ease forwards !important}
          @keyframes kPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.8;transform:scale(1.03)}}
          @keyframes kShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
          @keyframes kFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
          @keyframes kSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
          @keyframes kWiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
          @keyframes kFlash{0%,100%{opacity:1}50%{opacity:.4}}
          @keyframes kHeart{0%,100%{transform:scale(1)}14%{transform:scale(1.08)}28%{transform:scale(1)}42%{transform:scale(1.08)}70%{transform:scale(1)}}
          @keyframes kSway{0%,100%{transform:rotate(0)}50%{transform:rotate(3deg)}}
          @keyframes kSlowPulse{0%,100%{opacity:1}50%{opacity:.6}}
          @keyframes kSoftBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
          @keyframes kGlow{0%,100%{text-shadow:0 0 5px rgba(168,85,247,.2)}50%{text-shadow:0 0 20px rgba(168,85,247,.7)}}
          .animate-pulse-custom{animation:kPulse 2s ease-in-out infinite !important}
          .animate-shimmer{background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent) !important;background-size:200% auto !important;animation:kShimmer 2s linear infinite !important}
          .animate-float{animation:kFloat 3s ease-in-out infinite !important}
          .animate-spin-loop{animation:kSpin 3s linear infinite !important;display:inline-block}
          .animate-wiggle{animation:kWiggle 1s ease-in-out infinite !important;display:inline-block}
          .animate-flash-link{animation:kFlash 1.5s ease-in-out infinite !important}
          .animate-heartbeat{animation:kHeart 1.5s ease-in-out infinite !important;display:inline-block}
          .animate-sway{animation:kSway 4s ease-in-out infinite !important;display:inline-block}
          .animate-slow-pulse{animation:kSlowPulse 4s ease-in-out infinite !important}
          .animate-soft-bounce{animation:kSoftBounce 2s ease-in-out infinite !important;display:inline-block}
          .animate-glow{animation:kGlow 2.5s ease-in-out infinite !important}
        `;
        doc.head.appendChild(style);
      }

      // Apply saved custom styles robustly using MutationObserver
      const customStyles = siteData.data?.customStyles;
      if (customStyles) {
        const inMap: Record<string, string>  = {'fade-up':'animate-fade-up','slide-in-left':'animate-slide-in-left','fade-in':'animate-fade-in','zoom-in':'animate-zoom-in','bounce-in':'animate-bounce-in','flip-x':'animate-flip-x','blur-in':'animate-blur-in','slide-up':'animate-slide-up','slide-in-right':'animate-slide-in-right','rotate-in':'animate-rotate-in','scale-up':'animate-scale-up'};
        const outMap: Record<string, string> = {'fade-out':'animate-fade-out','slide-out-right':'animate-slide-out-right','zoom-out':'animate-zoom-out','slide-down':'animate-slide-down','blur-out':'animate-blur-out','slice-out-left':'animate-slice-out-left','rotate-out':'animate-rotate-out','bounce-out':'animate-bounce-out'};
        const loopMap: Record<string, string>= {'pulse':'animate-pulse-custom','shimmer':'animate-shimmer','float-bounce':'animate-float','spin-loop':'animate-spin-loop','wiggle':'animate-wiggle','flash-link':'animate-flash-link','heartbeat':'animate-heartbeat','sway':'animate-sway','slow-pulse':'animate-slow-pulse','soft-bounce':'animate-soft-bounce','glow':'animate-glow'};
        
        const applyStyles = () => {
          let hasChanges = false;
          // Create a temp div for HTML normalization to prevent infinite innerHTML loops
          const tempDiv = doc.createElement('div');

          Object.keys(customStyles).forEach(selector => {
            const el = doc.querySelector(selector) as HTMLElement;
            if (el) {
              const rules = customStyles[selector];
              let needsUpdate = false;
              
              // 1. Check for text/HTML drift
              if (rules.html !== undefined) {
                tempDiv.innerHTML = rules.html;
                if (el.innerHTML !== tempDiv.innerHTML) {
                  needsUpdate = true;
                }
              }
              
              // 2. Check for animation classes drift
              if (rules.animateIn && rules.animateIn !== 'none' && inMap[rules.animateIn] && !el.classList.contains(inMap[rules.animateIn])) {
                needsUpdate = true;
              }
              if (rules.animateOut && rules.animateOut !== 'none' && outMap[rules.animateOut] && !el.classList.contains(outMap[rules.animateOut])) {
                needsUpdate = true;
              }
              if (rules.loop && rules.loop !== 'none' && loopMap[rules.loop] && !el.classList.contains(loopMap[rules.loop])) {
                needsUpdate = true;
              }
              
              // 3. Check for inline style drift
              if (rules.fontSize && el.style.fontSize !== rules.fontSize) needsUpdate = true;
              if (rules.color && el.style.color !== rules.color) needsUpdate = true;
              if (rules.fontFamily && el.style.fontFamily !== `"${rules.fontFamily}", sans-serif`) needsUpdate = true;
              if (rules.fontWeight && el.style.fontWeight !== rules.fontWeight) needsUpdate = true;
              if (rules.fontStyle && el.style.fontStyle !== rules.fontStyle) needsUpdate = true;
              if (rules.textDecoration && el.style.textDecoration !== rules.textDecoration) needsUpdate = true;
              if (rules.letterSpacing !== undefined && el.style.letterSpacing !== rules.letterSpacing) needsUpdate = true;
              if (rules.lineHeight !== undefined && el.style.lineHeight !== rules.lineHeight) needsUpdate = true;
              if (rules.href !== undefined && el.getAttribute('href') !== rules.href) needsUpdate = true;
              
              if (needsUpdate || !el.dataset.styled) {
                if (rules.html !== undefined) el.innerHTML = tempDiv.innerHTML;
                if (rules.fontSize) el.style.setProperty('font-size', rules.fontSize, 'important');
                if (rules.fontWeight) el.style.setProperty('font-weight', rules.fontWeight, 'important');
                if (rules.fontStyle) el.style.setProperty('font-style', rules.fontStyle, 'important');
                if (rules.textDecoration) el.style.setProperty('text-decoration', rules.textDecoration, 'important');
                if (rules.letterSpacing !== undefined) el.style.setProperty('letter-spacing', rules.letterSpacing, 'important');
                if (rules.lineHeight !== undefined) el.style.setProperty('line-height', rules.lineHeight, 'important');
                if (rules.color) el.style.setProperty('color', rules.color, 'important');
                if (rules.fontFamily) el.style.setProperty('font-family', `"${rules.fontFamily}", sans-serif`, 'important');
                if (rules.href !== undefined) {
                  if (el.tagName !== 'A') {
                    el.setAttribute('onclick', `window.open('${rules.href}', '_blank')`);
                    el.style.setProperty('cursor', 'pointer', 'important');
                  } else {
                    el.setAttribute('href', rules.href);
                  }
                }
                
                if (rules.animateIn && rules.animateIn !== 'none' && inMap[rules.animateIn]) el.classList.add(inMap[rules.animateIn]);
                if (rules.animateOut && rules.animateOut !== 'none' && outMap[rules.animateOut]) el.classList.add(outMap[rules.animateOut]);
                if (rules.loop && rules.loop !== 'none' && loopMap[rules.loop]) el.classList.add(loopMap[rules.loop]);
                
                el.dataset.styled = "true";
                hasChanges = true;
              }
            }
          });
          return hasChanges;
        };
        
        applyStyles(); // Initial attempt
        
        // Aggressive observer: Re-apply if React blows away the styles/classes
        const observer = new MutationObserver(() => {
          // Temporarily disconnect to avoid infinite loop when we change the DOM
          observer.disconnect();
          applyStyles();
          observer.observe(doc.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style'] });
        });
        observer.observe(doc.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style'] });
      }

      // Inject WhatsApp Button
      if (siteData.data?.contactDetails?.enableWhatsapp && siteData.data?.contactDetails?.whatsappNumber) {
        let waBtn = doc.getElementById('custom-whatsapp-btn');
        if (!waBtn) {
          waBtn = doc.createElement('a');
          waBtn.id = 'custom-whatsapp-btn';
          waBtn.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; background-color: #3b82f6; color: white; padding: 14px; border-radius: 50%; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); transition: transform 0.2s; display: flex; align-items: center; justify-content: center; cursor: pointer;';
          waBtn.setAttribute('target', '_blank');
          waBtn.setAttribute('rel', 'noopener noreferrer');
          waBtn.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
          // Add hover effect
          waBtn.onmouseenter = () => waBtn!.style.transform = 'scale(1.1)';
          waBtn.onmouseleave = () => waBtn!.style.transform = 'scale(1)';
          doc.body.appendChild(waBtn);
        }
        const number = siteData.data.contactDetails.whatsappNumber.replace(/[^0-9]/g, '');
        waBtn!.setAttribute('href', `https://wa.me/${number}`);
      } else {
        const waBtn = doc.getElementById('custom-whatsapp-btn');
        if (waBtn) waBtn.remove();
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
