import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWebsite, planWebsite, type GeneratedWebsiteData, type ChatMessage } from '../services/aiBuilderService';
import { publishWebsite } from '../services/firebase';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { TemplateGallery } from '../components/builder/TemplateGallery';
import { SEOMeta } from '../components/SEOMeta';
import { ThemeToggle } from '../components/ThemeToggle';

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

      // Inject visual feedback styles for contenteditable elements
      const styleId = 'editor-outline-styles';
      if (!doc.getElementById(styleId)) {
        const style = doc.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          [contenteditable="true"]:hover {
            outline: 2px dashed #3b82f6 !important;
            outline-offset: 4px;
            cursor: text !important;
          }
          [contenteditable="true"]:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 4px;
          }
        `;
        doc.head.appendChild(style);
      }

      // Map iframe selectors to state path paths
      const selectorMapping = [
        { selector: '.brand-logo-text', path: 'contactDetails.brandName' },
        { selector: '.logo-text', path: 'contactDetails.brandName' },
        { selector: 'nav span', path: 'contactDetails.brandName' },
        { selector: '.hero-title', path: 'hero.title' },
        { selector: '.hero h1', path: 'hero.title' },
        { selector: 'h1', path: 'hero.title' },
        { selector: '.hero-subtitle', path: 'hero.subtitle' },
        { selector: '.hero p', path: 'hero.subtitle' },
        { selector: '.hero-cta', path: 'hero.ctaText' },
        { selector: '.hero button', path: 'hero.ctaText' },
        { selector: '.about-heading', path: 'about.heading' },
        { selector: '.about h2', path: 'about.heading' },
        { selector: '.about-description', path: 'about.description' },
        { selector: '.about p', path: 'about.description' },
        { selector: '.footer-address', path: 'contactDetails.address' },
        { selector: '.footer-phone', path: 'contactDetails.phone' },
        { selector: '.footer-email', path: 'contactDetails.email' },
        // New selectors for full navigation & philosophy block edits
        { selector: '.nav-link-1', path: 'navigation.link1' },
        { selector: '.nav-link-2', path: 'navigation.link2' },
        { selector: '.nav-btn-1', path: 'navigation.btn1' },
        { selector: '.nav-btn-2', path: 'navigation.btn2' },
        { selector: '.philosophy-title-1', path: 'philosophy.title1' },
        { selector: '.philosophy-title-2', path: 'philosophy.title2' },
        { selector: '.philosophy-block-1-label', path: 'philosophy.block1Label' },
        { selector: '.philosophy-block-1-text', path: 'philosophy.block1Text' },
        { selector: '.philosophy-block-2-label', path: 'philosophy.block2Label' },
        { selector: '.philosophy-block-2-text', path: 'philosophy.block2Text' },
        { selector: '.services-heading-title', path: 'servicesHeader.title' },
        { selector: '.services-heading-subtitle', path: 'servicesHeader.subtitle' }
      ];

      selectorMapping.forEach(({ selector, path }) => {
        const elements = doc.querySelectorAll(selector);
        elements.forEach(el => {
          el.setAttribute('contenteditable', 'true');
          el.setAttribute('suppressContentEditableWarning', 'true');
          el.addEventListener('input', () => {
            updatePreviewDataFromIframe(path, el.textContent || '');
          });
        });
      });

      // Bind edit capabilities to service items
      const serviceCards = doc.querySelectorAll('.service-card, .item-card');
      serviceCards.forEach((card, cardIdx) => {
        const titleEl = card.querySelector('.service-title, h3, h4');
        if (titleEl) {
          titleEl.setAttribute('contenteditable', 'true');
          titleEl.setAttribute('suppressContentEditableWarning', 'true');
          titleEl.addEventListener('input', () => {
            updatePreviewItem(cardIdx, 'title', titleEl.textContent || '');
          });
        }
        const descEl = card.querySelector('.service-desc, p');
        if (descEl) {
          descEl.setAttribute('contenteditable', 'true');
          descEl.setAttribute('suppressContentEditableWarning', 'true');
          descEl.addEventListener('input', () => {
            updatePreviewItem(cardIdx, 'description', descEl.textContent || '');
          });
        }
      });

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

      return newData;
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
                Describe your business and let AI create a beautiful, high-performance website with responsive design, SEO optimization, GEO readiness, AEO best practices, and lightning-fast performance.
              </p>
            </div>

            {/* Custom AI Builder Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-[var(--border-strong)] pb-4 text-[#3b82f6]">
                Generate with Our AI Designing
              </h2>
              
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
                  
                  {/* Site Details Sidebar on Right */}
                  <div className="w-full xl:w-[380px] bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 flex flex-col gap-6 h-fit xl:sticky xl:top-6 shadow-xl">
                    <h3 className="text-xl font-bold uppercase tracking-widest border-b border-[var(--border-subtle)] pb-4">
                      Site Details
                    </h3>
                    
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
