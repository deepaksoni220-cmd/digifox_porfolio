import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWebsite, planWebsite, type GeneratedWebsiteData, type ChatMessage } from '../services/aiBuilderService';
import { publishWebsite, getPublishedWebsite } from '../services/firebase';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { TemplateGallery } from '../components/builder/TemplateGallery';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';
import { Globe } from 'lucide-react';

export const AiBuilderPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  
  const [websiteType, setWebsiteType] = useState("Local Business");
  const [templateCategory, setTemplateCategory] = useState("auto");
  const [logoUrl, setLogoUrl] = useState("");

  const [isPlanning, setIsPlanning] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState("");
  const [previewData, setPreviewData] = useState<GeneratedWebsiteData | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Sync previewData to sessionStorage so Full Screen Preview always works
  useEffect(() => {
    if (previewData) {
      sessionStorage.setItem("generatedSite", JSON.stringify(previewData));
    } else {
      sessionStorage.removeItem("generatedSite");
    }
  }, [previewData]);

  // Sync logoUrl to sessionStorage
  useEffect(() => {
    if (logoUrl) {
      sessionStorage.setItem("generatedLogo", logoUrl);
    } else {
      sessionStorage.removeItem("generatedLogo");
    }
  }, [logoUrl]);
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");

  // Text Inspector States
  const [selectedElement, setSelectedElement] = useState<{
    selector: string;
    text: string;
    fontSize: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    color: string;
    fontFamily: string;
    animateIn: string;
    animateOut: string;
    loop: string;
  } | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'details' | 'design'>('details');

  // Edit Existing Brand Site States
  const [builderMode, setBuilderMode] = useState<'new' | 'edit'>('new');
  const [editSubdomain, setEditSubdomain] = useState('');
  const [isLoadingBrandSite, setIsLoadingBrandSite] = useState(false);
  const [loadError, setLoadError] = useState('');

  const handleLoadBrandSite = async () => {
    if (!editSubdomain.trim()) return;
    setIsLoadingBrandSite(true);
    setLoadError('');
    try {
      const site = await getPublishedWebsite(editSubdomain.trim());
      if (site) {
        const siteData = site.data;
        if (siteData) {
          if (site.logoUrl) {
            setLogoUrl(site.logoUrl);
            setSidebarLogo(site.logoUrl);
          }
          setWebsiteType(site.websiteType || 'Portfolio');
          setTemplateCategory(site.templateCategory || '2d');
          setPreviewData({
            ...siteData,
            previewUrl: site.templateUrl || siteData.previewUrl
          });
          
          setSidebarBrandName(siteData.contactDetails?.brandName || siteData.hero?.title || '');
          setSidebarAddress(siteData.contactDetails?.address || '');
          setSidebarPhone(siteData.contactDetails?.phone || '');
          setSidebarEmail(siteData.contactDetails?.email || '');
          
          alert("Website loaded successfully! You can now edit and republish it.");
        } else {
          setLoadError("Website configuration data not found.");
        }
      } else {
        setLoadError("Brand subdomain not found. Please double check the spelling.");
      }
    } catch (err: any) {
      setLoadError(err.message || "Failed to load website");
    } finally {
      setIsLoadingBrandSite(false);
    }
  };

  // Sidebar Form State
  const [sidebarBrandName, setSidebarBrandName] = useState("");
  const [sidebarLogo, setSidebarLogo] = useState("");
  const [sidebarAddress, setSidebarAddress] = useState("");
  const [sidebarPhone, setSidebarPhone] = useState("");
  const [sidebarEmail, setSidebarEmail] = useState("");

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync previewData to sidebar inputs
  useEffect(() => {
    if (previewData) {
      setSidebarBrandName(previewData.contactDetails?.brandName || previewData.hero?.title || "");
      setSidebarLogo(previewData.contactDetails?.logo || logoUrl || "");
      setSidebarAddress(previewData.contactDetails?.address || "");
      setSidebarPhone(previewData.contactDetails?.phone || "");
      setSidebarEmail(previewData.contactDetails?.email || "");
    }
  }, [previewData, logoUrl]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data;
      if (msg && msg.type === 'ELEMENT_SELECTED') {
        setSelectedElement({
          selector: msg.selector,
          text: msg.text,
          fontSize: msg.fontSize,
          fontWeight: msg.fontWeight,
          fontStyle: msg.fontStyle || 'normal',
          textDecoration: msg.textDecoration || 'none',
          color: msg.color,
          fontFamily: msg.fontFamily,
          animateIn: msg.animateIn || 'none',
          animateOut: msg.animateOut || 'none',
          loop: msg.loop || 'none',
        });
        setSidebarTab('design');
      }
      if (msg && msg.type === 'ELEMENT_TEXT_UPDATED') {
        setSelectedElement(prev => prev ? { ...prev, text: msg.text } : null);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update specific fields nested in previewData from iframe input edits
  const updatePreviewDataFromIframe = (pathStr: string, value: string) => {
    setPreviewData(prev => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev));
      const path = pathStr.split('.');
      let current = next;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;

      if (pathStr === 'contactDetails.brandName' && next.hero) {
        next.hero.title = value;
      }
      return next;
    });
  };

  // Update specific service item field nested in previewData from iframe edits
  const updatePreviewItem = (index: number, field: string, value: string) => {
    setPreviewData(prev => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.items) next.items = [];
      if (next.items[index]) {
        next.items[index][field] = value;
      }
      return next;
    });
  };

  // Inject contenteditable and edit-listeners inside the iframe on load (same-origin)
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      // 1. Inject visual feedback and animation preset keyframe styles
      const styleId = 'editor-outline-styles';
      if (!doc.getElementById(styleId)) {
        const style = doc.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          [contenteditable="true"]:hover { outline: 2px dashed #3b82f6 !important; outline-offset:4px; cursor:text !important; }
          [contenteditable="true"]:focus { outline: 2px solid #3b82f6 !important; outline-offset:4px; }
          .customizer-selected-element { outline: 2px solid #a855f7 !important; outline-offset:4px; }
          h1,h2,h3,h4,h5,h6,p,span,a,button,[contenteditable="true"] { pointer-events:auto !important; position:relative; z-index:9999 !important; }
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

      const getUniqueSelector = (el: HTMLElement) => {
        if (el.id) return '#' + el.id;
        if (el.className) {
          const classes = Array.from(el.classList).filter(c => !c.startsWith('customizer-selected-element')).join('.');
          if (classes) return el.tagName.toLowerCase() + '.' + classes.split(' ').join('.');
        }
        let current: HTMLElement | null = el;
        const path: string[] = [];
        while (current && current.nodeType === Node.ELEMENT_NODE) {
          let selector = current.nodeName.toLowerCase();
          if (current.id) { selector += '#' + current.id; path.unshift(selector); break; }
          else {
            let sib: Element | null = current; let sibIndex = 1;
            while (sib = sib.previousElementSibling) { if (sib.nodeName.toLowerCase() === current.nodeName.toLowerCase()) sibIndex++; }
            if (sibIndex > 1) selector += `:nth-of-type(${sibIndex})`;
          }
          path.unshift(selector); current = current.parentElement;
        }
        return path.join(' > ');
      };

      const rgbToHex = (rgb: string) => {
        const m = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!m) return rgb;
        return '#' + ('0'+parseInt(m[1]).toString(16)).slice(-2) + ('0'+parseInt(m[2]).toString(16)).slice(-2) + ('0'+parseInt(m[3]).toString(16)).slice(-2);
      };

      const findTextEl = (el: HTMLElement | null): HTMLElement | null => {
        if (!el || el === doc.body || el === doc.documentElement) return null;
        const tags = ['H1','H2','H3','H4','H5','H6','P','SPAN','A','BUTTON','LI','LABEL'];
        if (tags.includes(el.tagName)) return el;
        if (el.children.length === 0 && el.textContent && el.textContent.trim().length > 0) return el;
        return findTextEl(el.parentElement);
      };

      doc.addEventListener('click', (e) => {
        const htmlEl = findTextEl(e.target as HTMLElement);
        if (htmlEl && htmlEl.getAttribute('contenteditable') !== 'false') {
          e.stopPropagation();
          if (!htmlEl.hasAttribute('contenteditable')) { htmlEl.setAttribute('contenteditable','true'); }
          doc.querySelectorAll('.customizer-selected-element').forEach(s => s.classList.remove('customizer-selected-element'));
          htmlEl.classList.add('customizer-selected-element');
          const cs = window.getComputedStyle(htmlEl);
          const animInMap: Record<string,string> = {'animate-fade-up':'fade-up','animate-slide-in-left':'slide-in-left','animate-fade-in':'fade-in','animate-zoom-in':'zoom-in','animate-bounce-in':'bounce-in','animate-flip-x':'flip-x','animate-blur-in':'blur-in','animate-slide-up':'slide-up','animate-slide-in-right':'slide-in-right','animate-rotate-in':'rotate-in','animate-scale-up':'scale-up'};
          const animOutMap: Record<string,string> = {'animate-fade-out':'fade-out','animate-slide-out-right':'slide-out-right','animate-zoom-out':'zoom-out','animate-slide-down':'slide-down','animate-blur-out':'blur-out','animate-slice-out-left':'slice-out-left','animate-rotate-out':'rotate-out','animate-bounce-out':'bounce-out'};
          const loopMap: Record<string,string> = {'animate-pulse-custom':'pulse','animate-shimmer':'shimmer','animate-float':'float-bounce','animate-spin-loop':'spin-loop','animate-wiggle':'wiggle','animate-flash-link':'flash-link','animate-heartbeat':'heartbeat','animate-sway':'sway','animate-slow-pulse':'slow-pulse','animate-soft-bounce':'soft-bounce','animate-glow':'glow'};
          let animIn='none', animOut='none', loop='none';
          for (const [cls,val] of Object.entries(animInMap)) if (htmlEl.classList.contains(cls)) { animIn=val; break; }
          for (const [cls,val] of Object.entries(animOutMap)) if (htmlEl.classList.contains(cls)) { animOut=val; break; }
          for (const [cls,val] of Object.entries(loopMap)) if (htmlEl.classList.contains(cls)) { loop=val; break; }
          const rect = htmlEl.getBoundingClientRect();
          window.parent.postMessage({
            type:'ELEMENT_SELECTED', selector:getUniqueSelector(htmlEl), text:htmlEl.innerHTML||'',
            fontSize:cs.fontSize, fontWeight:cs.fontWeight, fontStyle:cs.fontStyle, textDecoration:cs.textDecoration,
            color:rgbToHex(cs.color), fontFamily:cs.fontFamily.replace(/['"]/g,''),
            animateIn:animIn, animateOut:animOut, loop:loop,
            toolbarX:Math.round(rect.left+rect.width/2), toolbarY:Math.round(rect.top)
          },'*');
        }
      }, true);

      doc.addEventListener('input', (e) => {
        const t = e.target as HTMLElement;
        if (t.classList.contains('customizer-selected-element')) window.parent.postMessage({ type:'ELEMENT_TEXT_UPDATED', text:t.textContent||'' },'*');
      });

      const handleCustomizerMessage = (event: MessageEvent) => {
        const msg = event.data;
        if (msg && msg.type === 'UPDATE_ELEMENT_STYLE') {
          const el = doc.querySelector(msg.selector) as HTMLElement;
          if (el) {
            if (msg.html !== undefined) el.innerHTML = msg.html;
            if (msg.fontSize) el.style.fontSize = msg.fontSize;
            if (msg.fontWeight) el.style.fontWeight = msg.fontWeight;
            if (msg.fontStyle !== undefined) el.style.fontStyle = msg.fontStyle;
            if (msg.textDecoration !== undefined) el.style.textDecoration = msg.textDecoration;
            if (msg.color) el.style.color = msg.color;
            if (msg.fontFamily) el.style.fontFamily = msg.fontFamily;
            if (msg.letterSpacing !== undefined) el.style.letterSpacing = msg.letterSpacing;
            if (msg.lineHeight !== undefined) el.style.lineHeight = msg.lineHeight;
            if (msg.textAlign !== undefined) el.style.textAlign = msg.textAlign;
            const allIn=['animate-fade-up','animate-slide-in-left','animate-fade-in','animate-zoom-in','animate-bounce-in','animate-flip-x','animate-blur-in','animate-slide-up','animate-slide-in-right','animate-rotate-in','animate-scale-up'];
            const inMap: Record<string,string>={'fade-up':'animate-fade-up','slide-in-left':'animate-slide-in-left','fade-in':'animate-fade-in','zoom-in':'animate-zoom-in','bounce-in':'animate-bounce-in','flip-x':'animate-flip-x','blur-in':'animate-blur-in','slide-up':'animate-slide-up','slide-in-right':'animate-slide-in-right','rotate-in':'animate-rotate-in','scale-up':'animate-scale-up'};
            el.classList.remove(...allIn); if (msg.animateIn && msg.animateIn!=='none') el.classList.add(inMap[msg.animateIn]);
            const allOut=['animate-fade-out','animate-slide-out-right','animate-zoom-out','animate-slide-down','animate-blur-out','animate-slice-out-left','animate-rotate-out','animate-bounce-out'];
            const outMap: Record<string,string>={'fade-out':'animate-fade-out','slide-out-right':'animate-slide-out-right','zoom-out':'animate-zoom-out','slide-down':'animate-slide-down','blur-out':'animate-blur-out','slice-out-left':'animate-slice-out-left','rotate-out':'animate-rotate-out','bounce-out':'animate-bounce-out'};
            el.classList.remove(...allOut); if (msg.animateOut && msg.animateOut!=='none') el.classList.add(outMap[msg.animateOut]);
            const allLoop=['animate-pulse-custom','animate-shimmer','animate-float','animate-spin-loop','animate-wiggle','animate-flash-link','animate-heartbeat','animate-sway','animate-slow-pulse','animate-soft-bounce','animate-glow'];
            const loopMap2: Record<string,string>={'pulse':'animate-pulse-custom','shimmer':'animate-shimmer','float-bounce':'animate-float','spin-loop':'animate-spin-loop','wiggle':'animate-wiggle','flash-link':'animate-flash-link','heartbeat':'animate-heartbeat','sway':'animate-sway','slow-pulse':'animate-slow-pulse','soft-bounce':'animate-soft-bounce','glow':'animate-glow'};
            el.classList.remove(...allLoop); if (msg.loop && msg.loop!=='none') el.classList.add(loopMap2[msg.loop]);
          }
        }
        if (msg && msg.type === 'INLINE_FORMAT') doc.execCommand(msg.command, false, msg.value||undefined);
        if (msg && msg.type === 'REMOVE_ELEMENT') { const el=doc.querySelector(msg.selector) as HTMLElement; if(el) el.remove(); window.parent.postMessage({type:'ELEMENT_DESELECTED'},'*'); }
        if (msg && msg.type === 'RESET_ELEMENT_FONT') { const el=doc.querySelector(msg.selector) as HTMLElement; if(el){el.style.fontFamily='';el.style.fontSize='';el.style.fontWeight='';el.style.fontStyle='';el.style.textDecoration='';el.style.color='';el.style.letterSpacing='';el.style.lineHeight='';} }
      };

      iframe.contentWindow?.addEventListener('message', handleCustomizerMessage);

      // Bind click-to-edit for images inside the template iframe
      const images = doc.querySelectorAll('img');
      images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('mouseenter', () => {
          img.style.outline = '2px dashed #10b981';
          img.style.outlineOffset = '2px';
        });
        img.addEventListener('mouseleave', () => {
          img.style.outline = '';
        });

        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.onchange = (uploadEvent: any) => {
            const file = uploadEvent.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const base64 = reader.result as string;
                img.setAttribute('src', base64);
                
                const originalSrc = img.getAttribute('data-original-src') || img.src;
                if (!img.getAttribute('data-original-src')) {
                  img.setAttribute('data-original-src', originalSrc);
                }
                
                setPreviewData(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    customImages: {
                      ...(prev.customImages || {}),
                      [originalSrc]: base64
                    }
                  };
                });
              };
              reader.readAsDataURL(file);
            }
          };
          fileInput.click();
        });
      });

      // Bind click-to-edit for videos inside the template iframe
      const videos = doc.querySelectorAll('video');
      videos.forEach(video => {
        video.style.cursor = 'pointer';
        video.addEventListener('mouseenter', () => {
          video.style.outline = '2px dashed #a855f7';
          video.style.outlineOffset = '2px';
        });
        video.addEventListener('mouseleave', () => {
          video.style.outline = '';
        });

        video.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'video/*';
          fileInput.onchange = (uploadEvent: any) => {
            const file = uploadEvent.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const base64 = reader.result as string;
                video.setAttribute('src', base64);
                video.load();
                video.play();
                
                const originalSrc = video.getAttribute('data-original-src') || video.src;
                if (!video.getAttribute('data-original-src')) {
                  video.setAttribute('data-original-src', originalSrc);
                }
                
                setPreviewData(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    customImages: {
                      ...(prev.customImages || {}),
                      [originalSrc]: base64
                    }
                  };
                });
              };
              reader.readAsDataURL(file);
            }
          };
          fileInput.click();
        });
      });

    } catch (e) {
      console.warn("Iframe same-origin edit binding failed or restricted:", e);
    }
  };

  const updateIframeField = (field: string, value: string) => {
    setPreviewData(prev => {
      if (!prev) return prev;
      
      const newHero = { ...prev.hero };
      if (field === 'brandName') {
        newHero.title = value;
      }
      
      const newData = {
        ...prev,
        hero: newHero,
        contactDetails: {
          ...(prev.contactDetails || {}),
          [field]: value
        }
      };

      if (iframeRef.current?.contentWindow) {
        // Send both for backward compatibility with older templates if any
        iframeRef.current.contentWindow.postMessage({
          type: 'UPDATE_FIELD',
          field,
          value
        }, '*');
        
        iframeRef.current.contentWindow.postMessage({
          type: 'SYNC_DATA',
          data: newData
        }, '*');
      }

    });
  };
  const updateSelectedElementStyle = (updatedFields: Record<string, any>) => {
    if (!selectedElement) return;
    const nextElement = { ...selectedElement, ...updatedFields };
    setSelectedElement(nextElement as any);
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'UPDATE_ELEMENT_STYLE',
        selector: selectedElement.selector,
        html: nextElement.text,
        fontSize: nextElement.fontSize,
        fontWeight: nextElement.fontWeight,
        fontStyle: nextElement.fontStyle,
        textDecoration: nextElement.textDecoration,
        color: nextElement.color,
        fontFamily: nextElement.fontFamily,
        letterSpacing: updatedFields.letterSpacing,
        lineHeight: updatedFields.lineHeight,
        textAlign: updatedFields.textAlign,
        animateIn: nextElement.animateIn,
        animateOut: nextElement.animateOut,
        loop: nextElement.loop
      }, '*');
    }
    setPreviewData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        customStyles: {
          ...(prev.customStyles || {}),
          [selectedElement.selector]: {
            html: nextElement.text,
            fontSize: nextElement.fontSize,
            fontWeight: nextElement.fontWeight,
            color: nextElement.color,
            fontFamily: nextElement.fontFamily,
            animateIn: nextElement.animateIn,
            animateOut: nextElement.animateOut,
            loop: nextElement.loop
          }
        }
      };
    });
  };

  const handleSidebarLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 400; // Logos don't need to be huge
          const MAX_HEIGHT = 400;
          
          if (width > height && width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          } else if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/webp', 0.8);
          setSidebarLogo(compressedBase64);
          updateIframeField('logo', compressedBase64);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'EDITOR_UPDATE' && event.data.data) {
        setPreviewData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            customHtml: event.data.data.html
          };
        });
      }
      
      if (event.data?.type === 'REQUEST_SYNC' && event.source) {
        // Send the latest previewData (including customHtml and contactDetails) back to the iframe
        setPreviewData(prev => {
          if (prev) {
            (event.source as WindowProxy).postMessage({ type: 'SYNC_DATA', data: prev }, '*');
          }
          return prev;
        });
      }

      if (event.data?.type === 'IMAGE_UPDATE' && event.data.originalSrc && event.data.newSrc) {
        setPreviewData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            customImages: {
              ...(prev.customImages || {}),
              [event.data.originalSrc]: event.data.newSrc
            }
          };
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          
          if (width > height && width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          } else if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0, width, height);
          
          setLogoUrl(canvas.toDataURL('image/webp', 0.8));
        };
        img.src = reader.result as string;
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

    // Scroll to preview area immediately so user sees the loading state
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // If there's text in the input but they clicked build, include it in the history
    let finalHistory = [...chatHistory];
    if (currentInput.trim()) {
      finalHistory.push({ role: 'user', text: currentInput.trim() });
      setChatHistory(finalHistory);
      setCurrentInput("");
    }

    try {
      const result = await generateWebsite(finalHistory, websiteType, templateCategory);
      setPreviewData(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate website layout.");
    } finally {
      setIsBuilding(false);
    }
  };

  const handlePublish = async () => {
    if (!previewData) return;

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
      // Pass previewData.previewUrl so PublishedSite knows it's an iframe template, alongside category, websiteType and businessCategory
      await publishWebsite(
        cleanSubdomain, 
        previewData, 
        logoUrl, 
        previewData?.previewUrl,
        templateCategory,
        websiteType,
        previewData?.businessCategory
      );
      
      const url = `https://${cleanSubdomain}.digifox.world`;
      setPublishedUrl(url);
      alert(`Website published successfully at: ${url}`);
    } catch (err: any) {
      alert(err.message || "Failed to publish website");
    } finally {
      setIsPublishing(false);
    }
  };

  if (previewData && !isBuilding) {
    return (
      <div className="fixed inset-0 z-50 bg-[#07080e] text-white flex flex-col h-screen overflow-hidden">
        {/* Fullscreen Editor Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-[#1b1d30] bg-[#0c0d1b] shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setPreviewData(null)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold text-white/80 hover:text-white transition-all cursor-pointer"
            >
              ← Back to Gallery
            </button>
            <div className="w-px h-5 bg-white/15" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20">
                {previewData.websiteType}
              </span>
              <span className="text-xs text-white/60">
                Editing Custom Template
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold uppercase tracking-wider text-xs transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
            >
              {isPublishing ? "Publishing..." : "Publish to Web 🚀"}
            </button>
            {previewData.previewUrl && (
              <button 
                onClick={() => window.open(previewData.previewUrl, '_blank')}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-2 rounded-full font-bold uppercase tracking-wider text-xs transition-transform hover:scale-105 cursor-pointer"
              >
                Open Live Site ↗
              </button>
            )}
          </div>
        </header>

        {/* Fullscreen Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Iframe Editor */}
          <div className="flex-1 p-6 bg-[#040408] relative overflow-hidden flex flex-col justify-center items-center">
            {publishedUrl && (
              <div className="absolute top-6 left-6 right-6 z-20 bg-blue-500/10 border border-blue-500/30 text-blue-400 p-4 rounded-2xl flex items-center justify-between shadow-2xl">
                <span className="font-semibold text-sm">Your website is live!</span>
                <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-300 text-sm">
                  {publishedUrl}
                </a>
              </div>
            )}
            
            <div className="w-full h-full relative flex flex-col">
              <div className="flex justify-between items-center mb-2 px-2 text-white/40 text-[10px] uppercase tracking-wider font-bold">
                <span>Viewport Preview</span>
                <span className="text-[#3b82f6] text-[11px] normal-case tracking-normal">
                  👉 Click directly on any text in the preview to edit it. Also you can use the "Site Details" panel on the right to update your logo and business details of website as required by you
                </span>
              </div>
              {previewData.previewUrl ? (
                <iframe 
                  ref={iframeRef}
                  src={`${previewData.previewUrl}?editor=true`} 
                  onLoad={handleIframeLoad}
                  className="w-full h-full flex-1 border border-[#1b1d30] rounded-2xl shadow-2xl bg-white"
                  title="Live Preview"
                />
              ) : (
                <div className="w-full h-full flex-1 overflow-y-auto border border-[#1b1d30] rounded-2xl shadow-2xl bg-[#0b0c16]">
                  <PreviewRenderer data={previewData} logoUrl={logoUrl} onDataChange={setPreviewData} />
                </div>
              )}
            </div>
          </div>

          {/* Details Editor Sidebar */}
          <div className="w-[380px] bg-[#0c0d1b] border-l border-[#1b1d30] p-6 flex flex-col gap-6 overflow-y-auto shrink-0">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-4 text-white/90">
              Site Details
            </h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Brand Name</label>
              <input 
                type="text"
                value={sidebarBrandName}
                placeholder="e.g. Acme Corp"
                onChange={(e) => {
                  setSidebarBrandName(e.target.value);
                  updateIframeField('brandName', e.target.value);
                }}
                className="bg-[#121424] border border-[#262942] rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Logo</label>
              <div className="relative flex items-center">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleSidebarLogo}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full bg-[#121424] border border-[#262942] rounded-xl px-4 py-3 text-white/60 flex justify-between items-center hover:border-blue-500 transition-colors text-sm cursor-pointer">
                  <span className="truncate">{sidebarLogo ? "Updated" : "Choose logo..."}</span>
                  {sidebarLogo && <img src={sidebarLogo} alt="Logo" className="h-6 w-auto object-contain rounded" />}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Business Address</label>
              <input 
                type="text"
                value={sidebarAddress}
                placeholder="e.g. 123 Main St"
                onChange={(e) => {
                  setSidebarAddress(e.target.value);
                  updateIframeField('address', e.target.value);
                }}
                className="bg-[#121424] border border-[#262942] rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Contact Number</label>
              <input 
                type="text"
                value={sidebarPhone}
                placeholder="e.g. +1 234 567 890"
                onChange={(e) => {
                  setSidebarPhone(e.target.value);
                  updateIframeField('phone', e.target.value);
                }}
                className="bg-[#121424] border border-[#262942] rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
              <input 
                type="email"
                value={sidebarEmail}
                placeholder="e.g. contact@mybrand.com"
                onChange={(e) => {
                  setSidebarEmail(e.target.value);
                  updateIframeField('email', e.target.value);
                }}
                className="bg-[#121424] border border-[#262942] rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="mt-4 pt-6 border-t border-white/10">
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
              >
                {isPublishing ? "Publishing..." : "Publish to Web 🚀"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-hidden pb-20">
      <SEOMeta 
        title="AI Website Builder | Digifox"
        description="Instantly generate and customize your website using our advanced AI consultant."
      />
      
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header & Chat Section */}
        <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
          
          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="w-full flex flex-col items-center text-center justify-center mb-6 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block">
                <ThemeToggle />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                Build Your <span className="text-[#3b82f6]">Dream Website</span> by webmake
              </h1>
              <p className="text-[var(--text-primary)]/70 text-lg max-w-2xl mx-auto">
                Describe your business and let AI create a beautiful Animated, Good converting and performance website with responsive design, SEO optimization, GEO readiness, AEO best practices, and lightning-fast performance.
              </p>
            </div>

            {/* Custom AI Builder Section */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--border-strong)] pb-4 mb-6 gap-4">
                <h2 className="text-2xl font-black uppercase tracking-widest text-[#3b82f6]">
                  {builderMode === 'new' ? "Generate with Our AI Designing" : "Edit Existing Brand Site"}
                </h2>
                <div className="flex bg-[var(--bg-surface)] p-1 rounded-full border border-[var(--border-strong)]">
                  <button 
                    onClick={() => setBuilderMode('new')}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${builderMode === 'new' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-strong)]'}`}
                  >
                    Create New
                  </button>
                  <button 
                    onClick={() => setBuilderMode('edit')}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${builderMode === 'edit' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-strong)]'}`}
                  >
                    Edit Brand Site
                  </button>
                </div>
              </div>

              {builderMode === 'edit' ? (
                <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-subtle)] shadow-xl flex flex-col gap-6 max-w-2xl mx-auto text-center items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6]">
                    <Globe size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Load Your Brand Website</h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                      Enter the subdomain of the brand website you previously published to load and edit its content, images, and details.
                    </p>
                  </div>
                  <div className="flex w-full gap-3 max-w-md mt-2">
                    <div className="flex-1 relative flex items-center">
                      <input 
                        type="text"
                        value={editSubdomain}
                        onChange={(e) => setEditSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        placeholder="e.g. mybrand"
                        className="w-full bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-full px-6 py-3.5 pr-28 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none font-semibold text-lg"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLoadBrandSite(); }}
                      />
                      <span className="absolute right-6 text-sm text-[var(--text-secondary)] font-bold">.digifox.world</span>
                    </div>
                  </div>
                  {loadError && (
                    <p className="text-red-500 text-sm font-medium">{loadError}</p>
                  )}
                  <button
                    onClick={handleLoadBrandSite}
                    disabled={isLoadingBrandSite || !editSubdomain.trim()}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
                  >
                    {isLoadingBrandSite ? "Loading Site..." : "Load & Edit Website"}
                  </button>
                </div>
              ) : (
                <>
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
                      <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Design Category</label>
                      <select 
                        value={templateCategory}
                        onChange={(e) => setTemplateCategory(e.target.value)}
                        disabled={chatHistory.length > 0}
                        className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none disabled:opacity-50"
                      >
                        <option value="auto">Auto Select</option>
                        <option value="3d">3D Animated</option>
                        <option value="2d">2D Static</option>
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

                  <div className="flex flex-col bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] shadow-xl w-full h-[400px] overflow-hidden">
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
                </>
              )}
            </div>

            {/* Template Gallery Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-[var(--border-strong)] pb-4">
                Or Start From a Premium Design
              </h2>
              <TemplateGallery 
                onSelect={(_, data) => {
                  setPreviewData(data);
                  // Scroll down to preview area smoothly
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }} 
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-500/10 p-4 rounded-xl border border-red-500/20 w-full">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div ref={previewRef} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-[var(--border-strong)] pb-4 gap-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-widest">
                Get A Live Preview
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-primary)]/60 mt-1">
                👉 Click directly on any text or image in the preview to edit or replace it. Also you can use the "Site Details" panel on the right to update your logo and business details of website as required by you
              </p>
            </div>
            {previewData && !isBuilding && (
              <div className="flex gap-4">
                <button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
                >
                  {isPublishing ? "Publishing..." : "Publish to Web 🚀"}
                </button>
                <button 
                  onClick={() => window.open('/generated-site', '_blank')}
                  className="bg-[var(--text-strong)] text-[var(--bg-base)] px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-xl"
                >
                  Open Full Screen ↗
                </button>
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
                className="w-full relative"
              >
                <div className="flex flex-col xl:flex-row gap-6">
                  {/* Live Preview (Iframe for static/3D templates, Custom renderer for JSON) */}
                  <div className="flex-1 min-w-0">
                    {previewData.previewUrl ? (
                      <iframe 
                        ref={iframeRef}
                        src={`${previewData.previewUrl}?editor=true`} 
                        onLoad={handleIframeLoad}
                        className="w-full h-[650px] border-4 border-[var(--border-strong)] rounded-3xl shadow-2xl shadow-black/50 bg-white"
                        title="Live Preview"
                      />
                    ) : (
                      <div className="w-full h-[650px] overflow-y-auto border-4 border-[var(--border-strong)] rounded-3xl shadow-2xl shadow-black/50 bg-[var(--bg-surface)]">
                        <PreviewRenderer data={previewData} logoUrl={logoUrl} onDataChange={setPreviewData} />
                      </div>
                    )}
                  </div>
                  
                  {/* Customizer Sidebar on Right */}
                  <div className="w-full xl:w-[380px] bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 flex flex-col gap-5 h-fit xl:sticky xl:top-6 shadow-xl">

                    {/* Tab Navigation */}
                    <div className="flex border-b border-[var(--border-subtle)] pb-2 gap-4">
                      <button onClick={() => setSidebarTab('details')}
                        className={`text-sm uppercase tracking-widest font-black pb-2 transition-all ${sidebarTab === 'details' ? 'border-b-2 border-[#3b82f6] text-[#3b82f6]' : 'text-[var(--text-secondary)] hover:text-[var(--text-strong)]'}`}>
                        Site Details
                      </button>
                      <button onClick={() => setSidebarTab('design')}
                        className={`text-sm uppercase tracking-widest font-black pb-2 transition-all ${sidebarTab === 'design' ? 'border-b-2 border-[#3b82f6] text-[#3b82f6]' : 'text-[var(--text-secondary)] hover:text-[var(--text-strong)]'}`}>
                        Design
                      </button>
                    </div>

                    {sidebarTab === 'details' ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Brand Name</label>
                          <input type="text" value={sidebarBrandName} placeholder="e.g. Acme Corp"
                            onChange={(e) => { setSidebarBrandName(e.target.value); updateIframeField('brandName', e.target.value); }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Logo</label>
                          <div className="relative flex items-center">
                            <input type="file" accept="image/*" onChange={handleSidebarLogo}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="w-full bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-secondary)] flex justify-between items-center hover:border-[#3b82f6] transition-colors">
                              <span className="truncate">{sidebarLogo ? "Updated" : "Choose logo..."}</span>
                              {sidebarLogo && <img src={sidebarLogo} alt="Logo" className="h-6 w-auto object-contain rounded" />}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Business Address</label>
                          <input type="text" value={sidebarAddress} placeholder="e.g. 123 Main St"
                            onChange={(e) => { setSidebarAddress(e.target.value); updateIframeField('address', e.target.value); }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Contact Number</label>
                          <input type="text" value={sidebarPhone} placeholder="e.g. +1 234 567 890"
                            onChange={(e) => { setSidebarPhone(e.target.value); updateIframeField('phone', e.target.value); }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Email Address</label>
                          <input type="email" value={sidebarEmail} placeholder="e.g. contact@mybrand.com"
                            onChange={(e) => { setSidebarEmail(e.target.value); updateIframeField('email', e.target.value); }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-4 overflow-y-auto" style={{maxHeight:'calc(100vh - 280px)', scrollbarWidth:'thin'}}>
                        {!selectedElement ? (
                          <div className="text-center py-10 text-[var(--text-secondary)]">
                            <div className="text-4xl mb-3">✦</div>
                            <p className="text-sm font-semibold mb-2">No element selected</p>
                            <p className="text-xs max-w-[210px] mx-auto opacity-70 leading-relaxed">Click any text or image on the preview to select and style or replace it</p>
                          </div>
                        ) : (
                          <>
                            <div className="text-[10px] text-[var(--text-secondary)] font-mono truncate opacity-60" title={selectedElement.selector}>{selectedElement.selector}</div>

                            {/* Inline Toolbar */}
                            <div className="flex items-center gap-1 bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2 flex-wrap">
                              <button title="Bold" onClick={() => iframeRef.current?.contentWindow?.postMessage({ type:'INLINE_FORMAT', command:'bold' },'*')} className="px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6] transition-all">B</button>
                              <button title="Italic" onClick={() => iframeRef.current?.contentWindow?.postMessage({ type:'INLINE_FORMAT', command:'italic' },'*')} className="px-2.5 py-1 rounded-lg text-xs italic font-bold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6] transition-all">I</button>
                              <button title="Underline" onClick={() => iframeRef.current?.contentWindow?.postMessage({ type:'INLINE_FORMAT', command:'underline' },'*')} className="px-2.5 py-1 rounded-lg text-xs underline font-bold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6] transition-all">U</button>
                              <div className="w-px h-5 bg-[var(--border-strong)] mx-1" />
                              <button title="Link" onClick={() => { const url=prompt('Enter URL'); if(url) iframeRef.current?.contentWindow?.postMessage({ type:'INLINE_FORMAT', command:'createLink', value:url },'*'); }} className="px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6] transition-all">🔗</button>
                              <div className="flex-1" />
                              <button title="Remove" onClick={() => { iframeRef.current?.contentWindow?.postMessage({ type:'REMOVE_ELEMENT', selector:selectedElement.selector },'*'); setSelectedElement(null); }} className="px-2 py-1 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all">✕</button>
                              <button title="Reset styles" onClick={() => iframeRef.current?.contentWindow?.postMessage({ type:'RESET_ELEMENT_FONT', selector:selectedElement.selector },'*')} className="px-2 py-1 rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--border-strong)] transition-all">↺</button>
                              <button title="Done" onClick={() => setSelectedElement(null)} className="px-3 py-1 rounded-lg text-xs font-bold bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all">Done</button>
                            </div>

                            {/* Font */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Font</label>
                              <select value={selectedElement.fontFamily.split(',')[0].trim().replace(/['"]/g,'')} onChange={(e) => updateSelectedElementStyle({ fontFamily: e.target.value })}
                                className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-sm">
                                {['System UI','Inter','Outfit','Space Grotesk','Instrument Serif','Playfair Display','Raleway','Sora','DM Sans','Lato','Poppins','Montserrat','Nunito','Source Code Pro','Merriweather','Josefin Sans','Work Sans','Plus Jakarta Sans','Libre Baskerville'].map(f => <option key={f} value={f}>{f}</option>)}
                              </select>
                            </div>

                            {/* Size + Weight */}
                            <div className="flex gap-3">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Size (px)</label>
                                <input type="number" min="8" max="200" value={parseInt(selectedElement.fontSize)||16}
                                  onChange={(e) => updateSelectedElementStyle({ fontSize: e.target.value+'px' })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-center text-sm" />
                              </div>
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Weight</label>
                                <select value={selectedElement.fontWeight} onChange={(e) => updateSelectedElementStyle({ fontWeight: e.target.value })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-sm">
                                  <option value="300">Light</option><option value="400">Regular</option><option value="500">Medium</option>
                                  <option value="600">Semi-Bold</option><option value="700">Bold</option><option value="800">Extra Bold</option><option value="900">Black</option>
                                </select>
                              </div>
                            </div>

                            {/* Color */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Color</label>
                              <div className="flex gap-2 items-center">
                                <input type="color" value={selectedElement.color.startsWith('#') ? selectedElement.color : '#ffffff'}
                                  onChange={(e) => updateSelectedElementStyle({ color: e.target.value })}
                                  className="w-11 h-10 cursor-pointer rounded-lg border border-[var(--border-strong)] p-0.5 bg-transparent" />
                                <input type="text" value={selectedElement.color} onChange={(e) => updateSelectedElementStyle({ color: e.target.value })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none flex-1 text-sm font-mono text-center" />
                              </div>
                              <div className="flex gap-2 mt-1">
                                {['#ffffff','#000000','#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981','#ef4444'].map(c => (
                                  <button key={c} onClick={() => updateSelectedElementStyle({ color: c })}
                                    className="w-6 h-6 rounded-full border-2 border-[var(--border-strong)] hover:scale-125 transition-transform" style={{backgroundColor:c}} />
                                ))}
                              </div>
                            </div>

                            {/* Letter Spacing + Line Height */}
                            <div className="flex gap-3">
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Spacing</label>
                                <select onChange={(e) => updateSelectedElementStyle({ letterSpacing: e.target.value })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-sm">
                                  <option value="normal">Normal</option><option value="-0.05em">Tight</option><option value="0.05em">Wide</option><option value="0.1em">Wider</option><option value="0.2em">Widest</option>
                                </select>
                              </div>
                              <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Line Height</label>
                                <select onChange={(e) => updateSelectedElementStyle({ lineHeight: e.target.value })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-sm">
                                  <option value="1">1</option><option value="1.25">1.25</option><option value="1.5">1.5</option><option value="1.75">1.75</option><option value="2">2</option>
                                </select>
                              </div>
                            </div>

                            {/* Text Align */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Align</label>
                              <div className="flex gap-2">
                                {[['left','←'],['center','↔'],['right','→'],['justify','⇔']].map(([v,ic]) => (
                                  <button key={v} onClick={() => updateSelectedElementStyle({ textAlign: v })}
                                    className="flex-1 py-2 rounded-xl border border-[var(--border-strong)] text-sm hover:border-[#3b82f6] hover:text-[#3b82f6] transition-all">{ic}</button>
                                ))}
                              </div>
                            </div>

                            {/* Animate In */}
                            <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-3">
                              <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Animate In</label>
                              <div className="flex flex-wrap gap-1.5">
                                {[{v:'none',l:'None'},{v:'fade-up',l:'Fade up'},{v:'slide-in-left',l:'←Slide'},{v:'fade-in',l:'Fade'},{v:'zoom-in',l:'Zoom'},{v:'bounce-in',l:'Bounce'},{v:'flip-x',l:'Flip X'},{v:'blur-in',l:'Blur'},{v:'slide-up',l:'↑Slide'},{v:'slide-in-right',l:'→Slide'},{v:'rotate-in',l:'Rotate'},{v:'scale-up',l:'Scale'}].map(p => (
                                  <button key={p.v} onClick={() => updateSelectedElementStyle({ animateIn: p.v })}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${selectedElement.animateIn===p.v ? 'bg-[#3b82f6] border-[#3b82f6] text-white' : 'border-[var(--border-strong)] text-[var(--text-primary)]/80 hover:border-[#3b82f6] hover:text-[#3b82f6]'}`}>{p.l}</button>
                                ))}
                              </div>
                            </div>

                            {/* Animate Out */}
                            <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-3">
                              <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Animate Out</label>
                              <div className="flex flex-wrap gap-1.5">
                                {[{v:'none',l:'None'},{v:'fade-out',l:'Fade'},{v:'slide-out-right',l:'→Slide'},{v:'zoom-out',l:'Zoom'},{v:'slide-down',l:'↓Slide'},{v:'blur-out',l:'Blur'},{v:'slice-out-left',l:'Slice'},{v:'rotate-out',l:'Rotate'},{v:'bounce-out',l:'Bounce'}].map(p => (
                                  <button key={p.v} onClick={() => updateSelectedElementStyle({ animateOut: p.v })}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${selectedElement.animateOut===p.v ? 'bg-[#8b5cf6] border-[#8b5cf6] text-white' : 'border-[var(--border-strong)] text-[var(--text-primary)]/80 hover:border-[#8b5cf6] hover:text-[#8b5cf6]'}`}>{p.l}</button>
                                ))}
                              </div>
                            </div>

                            {/* Loop */}
                            <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-3">
                              <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Loop</label>
                              <div className="flex flex-wrap gap-1.5">
                                {[{v:'none',l:'None'},{v:'pulse',l:'Pulse'},{v:'shimmer',l:'Shimmer'},{v:'float-bounce',l:'Float'},{v:'spin-loop',l:'Spin'},{v:'wiggle',l:'Wiggle'},{v:'flash-link',l:'Flash'},{v:'heartbeat',l:'Heart'},{v:'sway',l:'Sway'},{v:'slow-pulse',l:'SlowPulse'},{v:'soft-bounce',l:'Bounce'},{v:'glow',l:'Glow'}].map(p => (
                                  <button key={p.v} onClick={() => updateSelectedElementStyle({ loop: p.v })}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${selectedElement.loop===p.v ? 'bg-[#ec4899] border-[#ec4899] text-white' : 'border-[var(--border-strong)] text-[var(--text-primary)]/80 hover:border-[#ec4899] hover:text-[#ec4899]'}`}>{p.l}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div className="pt-4 border-t border-[var(--border-subtle)]">
                      <button onClick={handlePublish} disabled={isPublishing}
                        className="w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50">
                        {isPublishing ? "Publishing..." : "Publish to Web 🚀"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-[400px] rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] font-medium text-lg uppercase tracking-widest text-center px-4"
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
};
