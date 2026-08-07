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
    color: string;
    fontFamily: string;
    animateIn: string;
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

  // Listen for text elements clicked/selected inside the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data;
      if (msg && msg.type === 'ELEMENT_SELECTED') {
        setSelectedElement({
          selector: msg.selector,
          text: msg.text,
          fontSize: msg.fontSize,
          fontWeight: msg.fontWeight,
          color: msg.color,
          fontFamily: msg.fontFamily,
          animateIn: msg.animateIn || 'none',
          loop: msg.loop || 'none'
        });
        setSidebarTab('design'); // Switch to design tab
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
          /* Visual highlights */
          [contenteditable="true"]:hover {
            outline: 2px dashed #3b82f6 !important;
            outline-offset: 4px;
            cursor: text !important;
          }
          [contenteditable="true"]:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 4px;
          }
          .customizer-selected-element {
            outline: 2px solid #a855f7 !important;
            outline-offset: 4px;
          }
          
          /* Prevent overlays from blocking clicks on text */
          h1, h2, h3, h4, h5, h6, p, span, a, button, [contenteditable="true"] {
            pointer-events: auto !important;
            position: relative;
            z-index: 9999 !important;
          }
          
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

      // Helper to generate a unique CSS selector for any element
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
          if (current.id) {
            selector += '#' + current.id;
            path.unshift(selector);
            break;
          } else {
            let sib: Element | null = current;
            let sibIndex = 1;
            while (sib = sib.previousElementSibling) {
              if (sib.nodeName.toLowerCase() === current.nodeName.toLowerCase()) sibIndex++;
            }
            if (sibIndex > 1) selector += `:nth-of-type(${sibIndex})`;
          }
          path.unshift(selector);
          current = current.parentElement;
        }
        return path.join(" > ");
      };

      const rgbToHex = (rgb: string) => {
        const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!match) return rgb;
        return "#" + ("0" + parseInt(match[1], 10).toString(16)).slice(-2) +
                     ("0" + parseInt(match[2], 10).toString(16)).slice(-2) +
                     ("0" + parseInt(match[3], 10).toString(16)).slice(-2);
      };

      // Helper to find the closest text element or leaf containing text
      const findTextElement = (el: HTMLElement | null): HTMLElement | null => {
        if (!el || el === doc.body || el === doc.documentElement) return null;
        
        // Known semantic text tags
        const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI', 'LABEL'];
        if (textTags.includes(el.tagName)) return el;
        
        // Leaf divs containing text directly
        if (el.children.length === 0 && el.textContent && el.textContent.trim().length > 0) {
          return el;
        }
        
        return findTextElement(el.parentElement);
      };

      // 2. Select and bind editing & selection triggers to all text elements using root document delegation
      doc.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const htmlEl = findTextElement(target);
        if (htmlEl && htmlEl.getAttribute('contenteditable') !== 'false') {
          e.stopPropagation();
          
          if (!htmlEl.hasAttribute('contenteditable')) {
            htmlEl.setAttribute('contenteditable', 'true');
            htmlEl.setAttribute('suppressContentEditableWarning', 'true');
          }

          // Remove selected outline class from all other elements
          doc.querySelectorAll('.customizer-selected-element').forEach(s => {
            s.classList.remove('customizer-selected-element');
          });
          htmlEl.classList.add('customizer-selected-element');

          const computedStyle = window.getComputedStyle(htmlEl);
          
          let currentAnimateIn = 'none';
          if (htmlEl.classList.contains('animate-slide-up')) currentAnimateIn = 'fade-up';
          if (htmlEl.classList.contains('animate-zoom-in')) currentAnimateIn = 'zoom-in';

          let currentLoop = 'none';
          if (htmlEl.classList.contains('animate-float')) currentLoop = 'float';
          if (htmlEl.classList.contains('animate-pulse-custom')) currentLoop = 'pulse';
          if (htmlEl.classList.contains('animate-sway')) currentLoop = 'sway';
          if (htmlEl.classList.contains('animate-glow')) currentLoop = 'glow';

          window.parent.postMessage({
            type: 'ELEMENT_SELECTED',
            selector: getUniqueSelector(htmlEl),
            text: htmlEl.textContent || '',
            fontSize: computedStyle.fontSize,
            fontWeight: computedStyle.fontWeight,
            color: rgbToHex(computedStyle.color),
            fontFamily: computedStyle.fontFamily.replace(/['"]/g, ''),
            animateIn: currentAnimateIn,
            loop: currentLoop
          }, '*');
        }
      }, true); // Use capture phase to intercept actions reliably

      doc.addEventListener('input', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('customizer-selected-element')) {
          window.parent.postMessage({
            type: 'ELEMENT_TEXT_UPDATED',
            text: target.textContent || ''
          }, '*');
        }
      });

      // 3. Listen for postMessages from customizer parent window to update styles/text
      const handleCustomizerMessage = (event: MessageEvent) => {
        const msg = event.data;
        if (msg && msg.type === 'UPDATE_ELEMENT_STYLE') {
          const el = doc.querySelector(msg.selector) as HTMLElement;
          if (el) {
            if (msg.text !== undefined) el.textContent = msg.text;
            if (msg.fontSize) el.style.fontSize = msg.fontSize;
            if (msg.fontWeight) el.style.fontWeight = msg.fontWeight;
            if (msg.color) el.style.color = msg.color;
            if (msg.fontFamily) el.style.fontFamily = msg.fontFamily;

            // Update Animations
            el.classList.remove('animate-float', 'animate-pulse-custom', 'animate-sway', 'animate-glow', 'animate-slide-up', 'animate-zoom-in');
            if (msg.animateIn === 'fade-up') el.classList.add('animate-slide-up');
            if (msg.animateIn === 'zoom-in') el.classList.add('animate-zoom-in');
            if (msg.loop === 'float') el.classList.add('animate-float');
            if (msg.loop === 'pulse') el.classList.add('animate-pulse-custom');
            if (msg.loop === 'sway') el.classList.add('animate-sway');
            if (msg.loop === 'glow') el.classList.add('animate-glow');
          }
        }
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
  const updateSelectedElementStyle = (updatedFields: Partial<NonNullable<typeof selectedElement>>) => {
    if (!selectedElement) return;
    const nextElement = { ...selectedElement, ...updatedFields } as NonNullable<typeof selectedElement>;
    setSelectedElement(nextElement);
    
    // Post message to iframe to apply style changes live
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'UPDATE_ELEMENT_STYLE',
        selector: selectedElement.selector,
        text: nextElement.text,
        fontSize: nextElement.fontSize,
        fontWeight: nextElement.fontWeight,
        color: nextElement.color,
        fontFamily: nextElement.fontFamily,
        animateIn: nextElement.animateIn,
        loop: nextElement.loop
      }, '*');
    }

    // Also update previewData custom styles registry so they persist
    setPreviewData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        customStyles: {
          ...(prev.customStyles || {}),
          [selectedElement.selector]: {
            text: nextElement.text,
            fontSize: nextElement.fontSize,
            fontWeight: nextElement.fontWeight,
            color: nextElement.color,
            fontFamily: nextElement.fontFamily,
            animateIn: nextElement.animateIn,
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
                Build Your Dream Website <span className="text-[#3b82f6]">with AI</span> by webmake
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
                👉 Click directly on any text in the preview to edit it. Also you can use the "Site Details" panel on the right to update your logo and business details of website as required by you
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
                  <div className="w-full xl:w-[380px] bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 flex flex-col gap-6 h-fit xl:sticky xl:top-6 shadow-xl">
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b border-[var(--border-subtle)] pb-2 gap-4">
                      <button
                        onClick={() => setSidebarTab('details')}
                        className={`text-sm uppercase tracking-widest font-black pb-2 transition-all ${sidebarTab === 'details' ? 'border-b-2 border-[#3b82f6] text-[#3b82f6]' : 'text-[var(--text-secondary)] hover:text-[var(--text-strong)]'}`}
                      >
                        Site Details
                      </button>
                      <button
                        onClick={() => setSidebarTab('design')}
                        className={`text-sm uppercase tracking-widest font-black pb-2 transition-all ${sidebarTab === 'design' ? 'border-b-2 border-[#3b82f6] text-[#3b82f6]' : 'text-[var(--text-secondary)] hover:text-[var(--text-strong)]'}`}
                      >
                        Text Inspector
                      </button>
                    </div>

                    {sidebarTab === 'details' ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Brand Name</label>
                          <input 
                            type="text"
                            value={sidebarBrandName}
                            placeholder="e.g. Acme Corp"
                            onChange={(e) => {
                              setSidebarBrandName(e.target.value);
                              updateIframeField('brandName', e.target.value);
                            }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Logo</label>
                          <div className="relative flex items-center">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleSidebarLogo}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-full bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-secondary)] flex justify-between items-center hover:border-[#3b82f6] transition-colors">
                              <span className="truncate">{sidebarLogo ? "Updated" : "Choose logo..."}</span>
                              {sidebarLogo && <img src={sidebarLogo} alt="Logo" className="h-6 w-auto object-contain rounded" />}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Business Address</label>
                          <input 
                            type="text"
                            value={sidebarAddress}
                            placeholder="e.g. 123 Main St"
                            onChange={(e) => {
                              setSidebarAddress(e.target.value);
                              updateIframeField('address', e.target.value);
                            }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Contact Number</label>
                          <input 
                            type="text"
                            value={sidebarPhone}
                            placeholder="e.g. +1 234 567 890"
                            onChange={(e) => {
                              setSidebarPhone(e.target.value);
                              updateIframeField('phone', e.target.value);
                            }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Email Address</label>
                          <input 
                            type="email"
                            value={sidebarEmail}
                            placeholder="e.g. contact@mybrand.com"
                            onChange={(e) => {
                              setSidebarEmail(e.target.value);
                              updateIframeField('email', e.target.value);
                            }}
                            className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-5">
                        {!selectedElement ? (
                          <div className="text-center py-8 text-[var(--text-secondary)]">
                            <p className="text-sm font-semibold mb-2">No element selected</p>
                            <p className="text-xs max-w-[240px] mx-auto opacity-75">
                              👉 Click directly on any text inside the live preview iframe to adjust its styles and animations!
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col gap-2">
                              <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Text Content</label>
                              <textarea
                                value={selectedElement.text}
                                rows={2}
                                onChange={(e) => updateSelectedElementStyle({ text: e.target.value })}
                                className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none resize-none text-sm"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Font Family</label>
                              <select
                                value={selectedElement.fontFamily}
                                onChange={(e) => updateSelectedElementStyle({ fontFamily: e.target.value })}
                                className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                              >
                                <option value="System UI">System UI</option>
                                <option value="Inter">Inter</option>
                                <option value="Outfit">Outfit</option>
                                <option value="Instrument Serif">Instrument Serif</option>
                                <option value="Space Grotesk">Space Grotesk</option>
                                <option value="Playfair Display">Playfair Display</option>
                              </select>
                            </div>

                            <div className="flex gap-4">
                              <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Size (px)</label>
                                <input
                                  type="text"
                                  value={selectedElement.fontSize.replace('px', '')}
                                  onChange={(e) => updateSelectedElementStyle({ fontSize: e.target.value + 'px' })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-center"
                                />
                              </div>
                              <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Weight</label>
                                <select
                                  value={selectedElement.fontWeight}
                                  onChange={(e) => updateSelectedElementStyle({ fontWeight: e.target.value })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                                >
                                  <option value="300">Light</option>
                                  <option value="400">Regular</option>
                                  <option value="500">Medium</option>
                                  <option value="600">Semi-Bold</option>
                                  <option value="700">Bold</option>
                                  <option value="900">Black</option>
                                </select>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Text Color</label>
                              <div className="flex gap-3 items-center">
                                <input
                                  type="color"
                                  value={selectedElement.color.startsWith('#') ? selectedElement.color : '#ffffff'}
                                  onChange={(e) => updateSelectedElementStyle({ color: e.target.value })}
                                  className="bg-transparent border-0 w-10 h-10 cursor-pointer rounded"
                                />
                                <input
                                  type="text"
                                  value={selectedElement.color}
                                  onChange={(e) => updateSelectedElementStyle({ color: e.target.value })}
                                  className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none flex-1 text-sm text-center font-mono"
                                />
                              </div>
                            </div>

                            {/* Animate In Presets */}
                            <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-4">
                              <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Animate In</label>
                              <div className="flex flex-wrap gap-2">
                                {['none', 'fade-up', 'zoom-in'].map((p) => (
                                  <button
                                    key={p}
                                    onClick={() => updateSelectedElementStyle({ animateIn: p })}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${selectedElement.animateIn === p ? 'bg-[#3b82f6] border-[#3b82f6] text-white' : 'border-[var(--border-strong)] text-[var(--text-primary)]/80 hover:border-[#3b82f6]'}`}
                                  >
                                    {p === 'none' ? 'None' : p === 'fade-up' ? 'Fade Up' : 'Zoom In'}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Loop Presets */}
                            <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-4">
                              <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Loop Effects</label>
                              <div className="flex flex-wrap gap-2">
                                {['none', 'float', 'pulse', 'sway', 'glow'].map((p) => (
                                  <button
                                    key={p}
                                    onClick={() => updateSelectedElementStyle({ loop: p })}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${selectedElement.loop === p ? 'bg-[#3b82f6] border-[#3b82f6] text-white' : 'border-[var(--border-strong)] text-[var(--text-primary)]/80 hover:border-[#3b82f6]'}`}
                                  >
                                    {p === 'none' ? 'None' : p === 'float' ? 'Float Bounce' : p === 'pulse' ? 'Pulse' : p === 'sway' ? 'Sway' : 'Glow Pulse'}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-6 border-t border-[var(--border-subtle)]">
                      <button 
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
                      >
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
