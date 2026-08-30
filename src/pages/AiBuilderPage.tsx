import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { generateWebsite, planWebsite, patchWebsite, designWebsite, type GeneratedWebsiteData, type ChatMessage } from '../services/aiBuilderService';
import { publishWebsite, getPublishedWebsite } from '../services/firebase';
import { PreviewRenderer } from '../components/builder/PreviewRenderer';
import { TemplateGallery } from '../components/builder/TemplateGallery';
import { SEOMeta } from '../components/SEOMeta';
import { Globe, Monitor, Tablet, Smartphone, Sparkles, Settings2, Paintbrush, X, CheckCircle, ExternalLink, ChevronDown } from 'lucide-react';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';
import CursorGrid from '../components/ui/CursorGrid';
import { StepsProgressBarSection } from '../components/builder/StepsProgressBarSection';
import { WebMakeNav } from '../components/builder/WebMakeNav';
import { WebMakeFooter } from '../components/builder/WebMakeFooter';
import { useAuth } from '../context/AuthContext';

interface DominateStickyCardProps {
  index: number;
  total: number;
  scrollYProgress: any;
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  iconBg: string;
  iconSvg: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  extraContent?: React.ReactNode;
}

const DominateStickyCard: React.FC<DominateStickyCardProps> = ({
  index,
  total,
  scrollYProgress,
  tag,
  tagColor,
  title,
  desc,
  iconBg,
  iconSvg,
  bgGradient,
  borderColor,
  extraContent
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  // 3D progressive stack scaling & rotation as user scrolls past
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 1 - (total - index) * 0.04]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.12), start],
    [12, 0]
  );

  const topOffset = 76 + index * 22;

  return (
    <div
      style={{
        position: 'sticky',
        top: `${topOffset}px`,
        marginBottom: index === total - 1 ? '40px' : '28px',
        perspective: '1200px',
        zIndex: 10 + index,
      }}
      className="w-full"
    >
      <motion.div
        style={{
          scale: index === total - 1 ? 1 : scale,
          rotateX: rotateX,
          transformStyle: 'preserve-3d',
        }}
        className={`w-full ${bgGradient} border ${borderColor} rounded-[26px] p-6 sm:p-7 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85),_0_0_1px_rgba(255,255,255,0.2)_inset] flex flex-col justify-between transition-all duration-300`}
      >
        <div className="relative z-10 [transform:translateZ(20px)]">
          {/* Card Icon Header */}
          <div className="relative w-12 h-12 flex items-center justify-center mb-5">
            <div className={`absolute inset-0 ${iconBg} rounded-2xl blur-md`} />
            {iconSvg}
          </div>

          <div className={`text-[10px] font-bold uppercase tracking-widest ${tagColor} mb-1 font-mono`}>
            {tag}
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-xs text-gray-300 font-normal leading-relaxed">
            {desc}
          </p>

          {extraContent && (
            <div className="mt-4 pt-4 border-t border-white/[0.08]">
              {extraContent}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const AiBuilderPage: React.FC = () => {
  const { requireAuth, requirePlan, isAuthenticated } = useAuth();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  
  const [aiEditPrompt, setAiEditPrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  const [websiteType, setWebsiteType] = useState("Local Business");
  const [templateCategory, setTemplateCategory] = useState("auto");
  const [logoUrl, setLogoUrl] = useState("");

  const [isPlanning, setIsPlanning] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isDesigning, setIsDesigning] = useState(false);
  const [error, setError] = useState("");
  const [previewData, setPreviewData] = useState<GeneratedWebsiteData | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dominateMobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: dominateScrollYProgress } = useScroll({
    target: dominateMobileRef,
    offset: ['start 85%', 'end 20%']
  });
  
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
  const [publishSuccessUrl, setPublishSuccessUrl] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subdomainInput, setSubdomainInput] = useState("");

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
    href?: string;
    tagName: string;
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
  const [sidebarEnableWhatsapp, setSidebarEnableWhatsapp] = useState(false);
  const [sidebarWhatsappNumber, setSidebarWhatsappNumber] = useState("");
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
      setSidebarEnableWhatsapp(previewData.contactDetails?.enableWhatsapp || false);
      setSidebarWhatsappNumber(previewData.contactDetails?.whatsappNumber || "");
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
          animateIn: msg.animateIn,
          animateOut: msg.animateOut,
          loop: msg.loop,
          href: msg.href,
          tagName: msg.tagName
        });
        setSidebarTab('design');
        setFsTab('design'); // auto-switch Draftly sidebar to Design tab
      }
      if (msg && msg.type === 'ELEMENT_TEXT_UPDATED') {
        setSelectedElement(prev => prev ? { ...prev, text: msg.text } : null);
        setPreviewData(prev => {
          if (!prev) return prev;
          const selector = msg.selector;
          if (!selector) return prev;
          return {
            ...prev,
            customStyles: {
              ...(prev.customStyles || {}),
              [selector]: {
                ...(prev.customStyles?.[selector] || {}),
                html: msg.text
              }
            }
          };
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update specific fields nested in previewData from iframe input edits
  // @ts-ignore
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
  // @ts-ignore
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

      // 1. Inject visual feedback and animation preset keyframe styles (ONLY active in modify mode)
      const styleId = 'editor-outline-styles';
      if (!doc.getElementById(styleId)) {
        const style = doc.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          body[data-edit-mode="true"] [contenteditable="true"]:hover { outline: 2px dashed #3b82f6 !important; outline-offset:4px; cursor:text !important; }
          body[data-edit-mode="true"] [contenteditable="true"]:focus { outline: 2px solid #3b82f6 !important; outline-offset:4px; }
          body[data-edit-mode="true"] .customizer-selected-element { outline: 2px solid #a855f7 !important; outline-offset:4px; }
          body[data-edit-mode="true"] img:hover { outline: 2px dashed #10b981 !important; outline-offset: 2px; cursor: pointer !important; }
          body[data-edit-mode="true"] video:hover { outline: 2px dashed #a855f7 !important; outline-offset: 2px; cursor: pointer !important; }
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

      // Pre-load all editor fonts into the iframe so they render correctly
      const allEditorFonts = [
        'Inter','Outfit','Space+Grotesk','Instrument+Serif','Playfair+Display',
        'Raleway','Sora','DM+Sans','Lato','Poppins','Montserrat','Nunito',
        'Source+Code+Pro','Merriweather','Josefin+Sans','Work+Sans',
        'Plus+Jakarta+Sans','Libre+Baskerville'
      ];
      const fontPreloadId = 'editor-font-preload';
      if (!doc.getElementById(fontPreloadId)) {
        const fontLink = doc.createElement('link');
        fontLink.id = fontPreloadId;
        fontLink.rel = 'stylesheet';
        fontLink.href = `https://fonts.googleapis.com/css2?${allEditorFonts.map(f => `family=${f}:wght@300;400;500;600;700;800;900`).join('&')}&display=swap`;
        doc.head.appendChild(fontLink);
      }

      // @ts-ignore
      const escapeCSS = (str: string) =>
        str.replace(/([:\[\]!#().,"'<>*+~=|^${}])/g, '\\$1');

      const getUniqueSelector = (el: HTMLElement) => {
        if (el.getAttribute('data-editorid')) {
          return `[data-editorid="${el.getAttribute('data-editorid')}"]`;
        }
        // Generate a stable CSS path if no editorid exists
        let path = [];
        let current: HTMLElement | null = el;
        while (current && current !== doc.documentElement) {
          let selector = current.tagName.toLowerCase();
          if (current.id) {
            selector += '#' + current.id;
            path.unshift(selector);
            break; // IDs are unique enough
          } else {
            let index = 1;
            let sibling = current.previousElementSibling;
            while (sibling) {
              if (sibling.tagName === current.tagName) index++;
              sibling = sibling.previousElementSibling;
            }
            if (index > 1 || (current.nextElementSibling && current.nextElementSibling.tagName === current.tagName)) {
              selector += `:nth-of-type(${index})`;
            }
          }
          path.unshift(selector);
          current = current.parentElement;
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
        const aTag = el.closest('a');
        if (aTag) return aTag;
        const tags = ['H1','H2','H3','H4','H5','H6','P','SPAN','A','BUTTON','LI','LABEL','SVG','IMG'];
        if (tags.includes(el.tagName)) return el;
        if (el.children.length === 0 && el.textContent && el.textContent.trim().length > 0) return el;
        return findTextEl(el.parentElement);
      };

      // Initialize edit mode state on body
      doc.body.setAttribute('data-edit-mode', isModifyMode ? 'true' : 'false');

      doc.addEventListener('click', (e) => {
        // When not in modify mode, allow free navigation / link clicks / button browsing
        if (doc.body.getAttribute('data-edit-mode') !== 'true') {
          return;
        }

        const htmlEl = findTextEl(e.target as HTMLElement);
        if (htmlEl && htmlEl.getAttribute('contenteditable') !== 'false') {
          e.preventDefault();
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
            href: htmlEl.getAttribute('href') || undefined,
            tagName: htmlEl.tagName,
            toolbarX:Math.round(rect.left+rect.width/2), toolbarY:Math.round(rect.top)
          },'*');
        }
      }, true);

      doc.addEventListener('input', (e) => {
        const t = e.target as HTMLElement;
        if (t.classList.contains('customizer-selected-element')) window.parent.postMessage({ type:'ELEMENT_TEXT_UPDATED', selector: getUniqueSelector(t), text:t.innerHTML||'' },'*');
      });

      // ── INJECT MESSAGE HANDLER SCRIPT DIRECTLY INTO IFRAME ──
      // This is the ONLY reliable way: run the handler inside the iframe's own JS context
      // so font-family changes, querySelector, and Google Fonts injection all work natively.
      const scriptId = 'editor-message-handler';
      if (!doc.getElementById(scriptId)) {
        const script = doc.createElement('script');
        script.id = scriptId;
        script.textContent = `
(function() {
  var inMap  = {'fade-up':'animate-fade-up','slide-in-left':'animate-slide-in-left','fade-in':'animate-fade-in','zoom-in':'animate-zoom-in','bounce-in':'animate-bounce-in','flip-x':'animate-flip-x','blur-in':'animate-blur-in','slide-up':'animate-slide-up','slide-in-right':'animate-slide-in-right','rotate-in':'animate-rotate-in','scale-up':'animate-scale-up'};
  var outMap = {'fade-out':'animate-fade-out','slide-out-right':'animate-slide-out-right','zoom-out':'animate-zoom-out','slide-down':'animate-slide-down','blur-out':'animate-blur-out','slice-out-left':'animate-slice-out-left','rotate-out':'animate-rotate-out','bounce-out':'animate-bounce-out'};
  var loopMap= {'pulse':'animate-pulse-custom','shimmer':'animate-shimmer','float-bounce':'animate-float','spin-loop':'animate-spin-loop','wiggle':'animate-wiggle','flash-link':'animate-flash-link','heartbeat':'animate-heartbeat','sway':'animate-sway','slow-pulse':'animate-slow-pulse','soft-bounce':'animate-soft-bounce','glow':'animate-glow'};
  var allIn  = Object.values(inMap);
  var allOut = Object.values(outMap);
  var allLoop= Object.values(loopMap);

  function loadFont(name) {
    var key = name.replace(/ /g, '+');
    var id  = 'gf-' + key;
    if (!document.getElementById(id)) {
      var lnk = document.createElement('link');
      lnk.id  = id;
      lnk.rel = 'stylesheet';
      lnk.href= 'https://fonts.googleapis.com/css2?family=' + key + ':ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap';
      document.head.appendChild(lnk);
    }
  }

  function getEl(selector) {
    var el = selector ? document.querySelector(selector) : null;
    return el || document.querySelector('.customizer-selected-element');
  }

  window.addEventListener('message', function(e) {
    var msg = e.data;
    if (!msg) return;

    if (msg.type === 'SET_EDIT_MODE') {
      document.body.setAttribute('data-edit-mode', msg.enabled ? 'true' : 'false');
      if (!msg.enabled) {
        document.querySelectorAll('.customizer-selected-element').forEach(function(s){ s.classList.remove('customizer-selected-element'); });
      }
    }

    if (msg.type === 'UPDATE_ELEMENT_STYLE') {
      var el = getEl(msg.selector);
      if (!el) return;
      if (msg.html !== undefined) el.innerHTML = msg.html;
      if (msg.fontSize)    el.style.setProperty('font-size',       msg.fontSize,    'important');
      if (msg.fontWeight)  el.style.setProperty('font-weight',     msg.fontWeight,  'important');
      if (msg.fontStyle   !== undefined) el.style.setProperty('font-style',      msg.fontStyle,   'important');
      if (msg.textDecoration !== undefined) el.style.setProperty('text-decoration', msg.textDecoration, 'important');
      if (msg.color)       el.style.setProperty('color',           msg.color,       'important');
      if (msg.fontFamily) {
        loadFont(msg.fontFamily);
        el.style.setProperty('font-family', "'" + msg.fontFamily + "', sans-serif", 'important');
      }
      if (msg.letterSpacing !== undefined) el.style.setProperty('letter-spacing', msg.letterSpacing, 'important');
      if (msg.lineHeight    !== undefined) el.style.setProperty('line-height',    msg.lineHeight,    'important');
      if (msg.textAlign     !== undefined) el.style.setProperty('text-align',     msg.textAlign,     'important');
      if (msg.href          !== undefined) {
        if (el.tagName !== 'A') {
          el.setAttribute('onclick', "window.open('" + msg.href + "', '_blank')");
          el.style.setProperty('cursor', 'pointer', 'important');
        } else {
          el.setAttribute('href', msg.href);
        }
      }
      // Animate In
      el.classList.remove.apply(el.classList, allIn);
      if (msg.animateIn  && msg.animateIn  !== 'none' && inMap[msg.animateIn])   el.classList.add(inMap[msg.animateIn]);
      // Animate Out
      el.classList.remove.apply(el.classList, allOut);
      if (msg.animateOut && msg.animateOut !== 'none' && outMap[msg.animateOut]) el.classList.add(outMap[msg.animateOut]);
      // Loop
      el.classList.remove.apply(el.classList, allLoop);
      if (msg.loop && msg.loop !== 'none' && loopMap[msg.loop]) el.classList.add(loopMap[msg.loop]);
    }

    if (msg.type === 'INLINE_FORMAT') {
      document.execCommand(msg.command, false, msg.value || undefined);
    }

    if (msg.type === 'REMOVE_ELEMENT') {
      var el = getEl(msg.selector);
      if (el) el.remove();
      window.parent.postMessage({ type: 'ELEMENT_DESELECTED' }, '*');
    }

    if (msg.type === 'RESET_ELEMENT_FONT') {
      var el = getEl(msg.selector);
      if (el) {
        ['font-family','font-size','font-weight','font-style','text-decoration','color','letter-spacing','line-height'].forEach(function(p){ el.style.removeProperty(p); });
      }
    }

    if (msg.type === 'UPDATE_FIELD') {
      // Update brand name / contact fields / logos in template
      document.querySelectorAll('[data-field="' + msg.field + '"]').forEach(function(el){ 
        if (el.tagName === 'IMG') {
          el.src = msg.value;
        } else {
          el.textContent = msg.value;
        }
      });
    }

    if (msg.type === 'SYNC_DATA') {
      var cd = msg.data.contactDetails;
      if (cd && cd.enableWhatsapp && cd.whatsappNumber) {
        var waBtn = document.getElementById('custom-whatsapp-btn');
        if (!waBtn) {
          waBtn = document.createElement('a');
          waBtn.id = 'custom-whatsapp-btn';
          waBtn.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; background-color: #3b82f6; color: white; padding: 14px; border-radius: 50%; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); transition: transform 0.2s; display: flex; align-items: center; justify-content: center; cursor: pointer;';
          waBtn.setAttribute('target', '_blank');
          waBtn.setAttribute('rel', 'noopener noreferrer');
          waBtn.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
          waBtn.onmouseenter = function() { waBtn.style.transform = 'scale(1.1)'; };
          waBtn.onmouseleave = function() { waBtn.style.transform = 'scale(1)'; };
          document.body.appendChild(waBtn);
        }
        var num = cd.whatsappNumber.replace(/[^0-9]/g, '');
        waBtn.setAttribute('href', 'https://wa.me/' + num);
      } else {
        var waBtn = document.getElementById('custom-whatsapp-btn');
        if (waBtn) waBtn.remove();
      }
    }
  });
})();
        `;
        doc.head.appendChild(script);
      }


      // Bind click-to-edit for images inside the template iframe (only in modify mode)
      const images = doc.querySelectorAll('img');
      images.forEach(img => {
        img.addEventListener('click', (e) => {
          if (doc.body.getAttribute('data-edit-mode') !== 'true') return;
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

      // Bind click-to-edit for videos inside the template iframe (only in modify mode)
      const videos = doc.querySelectorAll('video');
      videos.forEach(video => {
        video.addEventListener('click', (e) => {
          if (doc.body.getAttribute('data-edit-mode') !== 'true') return;
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
      // Removed the buggy brandName -> hero.title link
      
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

      return newData; // ← this was missing, causing previewData to become undefined and crashing to main page
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
        loop: nextElement.loop,
        href: nextElement.href
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
            fontStyle: nextElement.fontStyle,
            textDecoration: nextElement.textDecoration,
            letterSpacing: updatedFields.letterSpacing !== undefined ? updatedFields.letterSpacing : prev.customStyles?.[selectedElement.selector]?.letterSpacing,
            lineHeight: updatedFields.lineHeight !== undefined ? updatedFields.lineHeight : prev.customStyles?.[selectedElement.selector]?.lineHeight,
            color: nextElement.color,
            fontFamily: nextElement.fontFamily,
            textAlign: updatedFields.textAlign !== undefined ? updatedFields.textAlign : prev.customStyles?.[selectedElement.selector]?.textAlign,
            animateIn: nextElement.animateIn,
            animateOut: nextElement.animateOut,
            loop: nextElement.loop,
            href: nextElement.href
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

  const handleDesignWebsite = async () => {
    if (!isAuthenticated) {
      requireAuth(() => {});
      return;
    }
    if (chatHistory.length === 0 && !currentInput.trim()) {
      setError("Please describe your business idea or website vision before designing.");
      return;
    }

    setError("");
    setIsDesigning(true);
    setPreviewData(null);

    try {
      let finalHistory = [...chatHistory];
      if (currentInput.trim()) {
        finalHistory.push({ role: 'user', text: currentInput });
        setChatHistory(finalHistory);
        setCurrentInput("");
      }

      const result = await designWebsite(finalHistory, websiteType, templateCategory, currentInput);
      setPreviewData(result);
      
      // Auto scroll to preview area smoothly
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);

    } catch (err: any) {
      setError(err.message || "Failed to design website with Gemini 3.1.");
    } finally {
      setIsDesigning(false);
    }
  };

  const handleBuild = async () => {
    if (!isAuthenticated) {
      requireAuth(() => {});
      return;
    }
    if (chatHistory.length === 0 && !currentInput.trim()) {
      setError("Please discuss your website with the AI before building.");
      return;
    }

    setError("");
    setIsBuilding(true);
    setPreviewData(null);

    setError("");
    try {
      let finalHistory = [...chatHistory];
      // If there's text in the input but they clicked build, include it in the history
      if (currentInput.trim()) {
        finalHistory.push({ role: 'user', text: currentInput });
        setChatHistory(finalHistory);
        setCurrentInput("");
      }

      const result = await generateWebsite(finalHistory, websiteType, templateCategory);
      setPreviewData(result);
      
      // Auto scroll to preview area smoothly
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);

    } catch (err: any) {
      setError(err.message || "Failed to generate website layout.");
    } finally {
      setIsBuilding(false);
    }
  };

  const handleAiEdit = async () => {
    if (!aiEditPrompt.trim() || !previewData || !previewData.templateStyle) return;
    setIsEditing(true);
    setError("");
    try {
      const patch = await patchWebsite(aiEditPrompt, previewData, previewData.templateStyle);
      
      // Deep merge the patch into previewData
      setPreviewData(prev => {
        if (!prev) return prev;
        const newData = { ...prev };
        
        if (patch.themePatch) {
          newData.theme = { ...newData.theme, ...patch.themePatch };
        }
        if (patch.contentPatch) {
          // Simple top-level merge for content
          Object.keys(patch.contentPatch).forEach(key => {
            if (typeof patch.contentPatch[key] === 'object' && !Array.isArray(patch.contentPatch[key])) {
              (newData as any)[key] = {
                ...((newData as any)[key] || {}),
                ...patch.contentPatch[key]
              };
            } else {
              (newData as any)[key] = patch.contentPatch[key];
            }
          });
        }
        return newData;
      });
      
      setAiEditPrompt("");
    } catch (err: any) {
      setError(err.message || "Failed to apply AI edit.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleAiEditFromFs = async () => {
    if (!aiEditPrompt.trim() || !previewData || !previewData.templateStyle) return;
    const editText = aiEditPrompt;
    await handleAiEdit();
    setAiEditLog(prev => [...prev, editText].slice(-10));
  };

  const handlePublishClick = () => {
    if (!previewData) return;
    requirePlan(() => {
      setSubdomainInput("");
      setShowPublishModal(true);
    });
  };

  const confirmPublish = async () => {
    if (!previewData || !subdomainInput) return;
    
    setShowPublishModal(false);
    
    // clean subdomain
    const cleanSubdomain = subdomainInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanSubdomain) {
      alert("Invalid subdomain name. Only letters, numbers, and hyphens are allowed.");
      return;
    }

    setIsPublishing(true);
    try {
      // Normalize template URL for production publishing
      let finalTemplateUrl = previewData?.previewUrl;
      if (previewData?.templateStyle === 'blacklaneLuxury' || finalTemplateUrl?.includes('blacklane')) {
        finalTemplateUrl = '/templates/blacklane/index.html';
      } else if (finalTemplateUrl?.startsWith('http://localhost:') || finalTemplateUrl?.startsWith('http://127.0.0.1:')) {
        try {
          const parsed = new URL(finalTemplateUrl);
          finalTemplateUrl = parsed.pathname;
        } catch {
          // keep as is
        }
      }

      await publishWebsite(
        cleanSubdomain, 
        previewData, 
        logoUrl, 
        finalTemplateUrl,
        templateCategory,
        websiteType,
        previewData?.businessCategory
      );
      
      const url = `https://${cleanSubdomain}.digifox.world`;
      setPublishedUrl(url);
      setPublishSuccessUrl(url);
    } catch (err: any) {
      alert(err.message || "Failed to publish website");
    } finally {
      setIsPublishing(false);
    }
  };

  // Viewport & Mode state for the Draftly-style editor
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [fsTab, setFsTab] = useState<'customize' | 'design' | 'ai'>('customize');
  const [aiEditLog, setAiEditLog] = useState<string[]>([]);
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);

  const setModifyModeState = (enabled: boolean) => {
    setIsModifyMode(enabled);
    try {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.contentWindow?.postMessage({ type: 'SET_EDIT_MODE', enabled }, '*');
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.body.setAttribute('data-edit-mode', enabled ? 'true' : 'false');
          if (!enabled) {
            doc.querySelectorAll('.customizer-selected-element').forEach(s => s.classList.remove('customizer-selected-element'));
          }
        }
      }
    } catch {
      // Cross origin
    }
  };

  // Pick up any template chosen from DesignKitsPage or external link
  useEffect(() => {
    const stored = sessionStorage.getItem("selectedTemplateData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        sessionStorage.removeItem("selectedTemplateData");
        setPreviewData(parsed);
        setIsModifyMode(true);
      } catch (e) {
        console.error("Failed to load selected template from sessionStorage", e);
      }
    }
  }, []);

  const viewportWidth = { desktop: '100%', tablet: '768px', mobile: '390px' };

  if (previewData && !isBuilding) {
    return (
      <>
        {/* SUBDOMAIN PROMPT MODAL */}
        <AnimatePresence>
          {showPublishModal && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowPublishModal(false)}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-[#0f111a] border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col"
              >
                <h2 className="text-xl font-bold text-white mb-2">Publish Website</h2>
                <p className="text-white/60 mb-6 text-sm">
                  Enter a unique brand name for your subdomain.
                </p>
                
                <div className="flex items-center bg-black/40 border border-white/10 rounded-xl overflow-hidden mb-8 focus-within:border-[#3b82f6] focus-within:ring-1 focus-within:ring-[#3b82f6] transition-all">
                  <input
                    type="text"
                    value={subdomainInput}
                    onChange={(e) => setSubdomainInput(e.target.value)}
                    placeholder="mybrand"
                    className="flex-1 bg-transparent border-none text-white px-4 py-3 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') confirmPublish();
                    }}
                    autoFocus
                  />
                  <div className="px-4 py-3 text-white/40 bg-white/5 border-l border-white/10 select-none">
                    .digifox.world
                  </div>
                </div>
                
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => setShowPublishModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmPublish}
                    className="flex-1 py-3 rounded-xl bg-[#3b82f6] hover:bg-blue-500 text-white font-bold transition-all"
                  >
                    Publish
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SUCCESS MODAL */}
        <AnimatePresence>
          {publishSuccessUrl && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setPublishSuccessUrl(null)}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-[#0f111a] border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center"
              >
                <button 
                  onClick={() => setPublishSuccessUrl(null)}
                  className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={18} />
                </button>
                
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <CheckCircle className="text-green-500 w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">Website Published!</h2>
                <p className="text-white/60 mb-8">
                  Your customizations have been saved and your site is now live at the URL below.
                </p>
                
                <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 flex items-center justify-between mb-8 group">
                  <span className="text-blue-400 font-mono text-sm truncate pr-4">{publishSuccessUrl}</span>
                  <a 
                    href={publishSuccessUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all shrink-0"
                  >
                    Visit <ExternalLink size={14} />
                  </a>
                </div>
                
                <button 
                  onClick={() => setPublishSuccessUrl(null)}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                >
                  Continue Editing
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="fixed inset-0 z-50 bg-[#07080e] text-white flex flex-col h-screen overflow-hidden font-sans">

        {/* ── TOP BAR ── */}
        <header className="flex justify-between items-center px-5 py-3 border-b border-white/[0.06] bg-[#0a0b15] shrink-0 gap-4">

          {/* Left: back + site name */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setPreviewData(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-[11px] font-semibold text-white/60 hover:text-white transition-all shrink-0"
            >
              ← Back
            </button>
            <div className="w-px h-4 bg-white/10 shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/20 shrink-0">
              {previewData.websiteType}
            </span>
            <span className="text-[11px] text-white/35 truncate hidden sm:block">— WebMake Editor</span>
          </div>

          {/* Center: Viewport switcher */}
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 shrink-0">
            {([
              { v: 'desktop', icon: <Monitor size={15} />, label: 'Desktop' },
              { v: 'tablet',  icon: <Tablet  size={15} />, label: 'Tablet'  },
              { v: 'mobile',  icon: <Smartphone size={14} />, label: 'Mobile'  },
            ] as const).map(({ v, icon, label }) => (
              <button key={v} onClick={() => setViewport(v as any)}
                title={label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  viewport === v ? 'bg-[#3b82f6] text-white shadow-md' : 'text-white/35 hover:text-white/70'
                }`}>
                {icon}
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Browse vs Modify Active/Inactive Switcher */}
            <div className="flex items-center bg-white/[0.06] border border-white/[0.1] rounded-xl p-1 shrink-0">
              <button
                onClick={() => setModifyModeState(false)}
                title="Browse & interact with template navigation"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  !isModifyMode
                    ? 'bg-[#3b82f6] text-white shadow-md'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                <span>👁️ Browse</span>
                {!isModifyMode && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
              <button
                onClick={() => setModifyModeState(true)}
                title="Modify & customize template text, colors, images"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isModifyMode
                    ? 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-md shadow-blue-500/20'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                <span>✏️ Modify</span>
                {isModifyMode && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            </div>

            {publishedUrl && (
              <a href={publishedUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-[11px] font-bold uppercase tracking-wider hover:bg-green-500/20 transition-all">
                🌐 Live
              </a>
            )}
            {previewData.previewUrl && (
              <button onClick={() => window.open(previewData.previewUrl, '_blank')}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all">
                Open ↗
              </button>
            )}
            <button onClick={handlePublishClick} disabled={isPublishing}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:opacity-90 disabled:opacity-40 text-white text-[11px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
              {isPublishing ? 'Publishing...' : '🚀 Publish'}
            </button>
          </div>
        </header>

        {/* ── WORKSPACE ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* ── LEFT SIDEBAR ── */}
          <div className="w-[260px] shrink-0 bg-[#0a0b15] border-r border-white/[0.06] flex flex-col overflow-hidden">

            {/* Sidebar tabs */}
            <div className="flex border-b border-white/[0.06] shrink-0">
              {([
                { t: 'customize', icon: <Settings2 size={13} />, label: 'Customize' },
                { t: 'design',    icon: <Paintbrush size={13} />, label: 'Design'    },
                { t: 'ai',        icon: <Sparkles   size={13} />, label: 'AI Edit'   },
              ] as const).map(({ t, icon, label }) => (
                <button key={t} onClick={() => setFsTab(t as any)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all border-b-2 ${
                    fsTab === t
                      ? 'border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/5'
                      : 'border-transparent text-white/30 hover:text-white/60'
                  }`}>
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" style={{scrollbarWidth:'thin', scrollbarColor:'#1b1d30 transparent'}}>

              {/* ── TAB: CUSTOMIZE ── */}
              {fsTab === 'customize' && (
                <>
                  <p className="text-[9px] uppercase tracking-widest text-white/25 font-bold">Brand — Logo & Details</p>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Brand Name</label>
                    <input type="text" value={sidebarBrandName} placeholder="e.g. Acme Corp"
                      onChange={(e) => { setSidebarBrandName(e.target.value); updateIframeField('brandName', e.target.value); }}
                      className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white focus:border-blue-500/60 outline-none text-xs" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Logo</label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleSidebarLogo}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="w-full bg-white/[0.04] border border-white/[0.08] border-dashed rounded-lg px-3 py-3 text-white/40 flex justify-between items-center hover:border-blue-500/40 transition-colors text-xs cursor-pointer">
                        <span>{sidebarLogo ? '✅ Logo uploaded' : '📁 Upload logo...'}</span>
                        {sidebarLogo && <img src={sidebarLogo} alt="Logo" className="h-5 w-auto object-contain rounded" />}
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Connection */}
                  <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/5">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-8 h-4 rounded-full transition-colors relative ${sidebarEnableWhatsapp ? 'bg-green-500' : 'bg-white/10'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${sidebarEnableWhatsapp ? 'translate-x-4' : ''}`} />
                      </div>
                      <input type="checkbox" checked={sidebarEnableWhatsapp} className="hidden"
                        onChange={(e) => { setSidebarEnableWhatsapp(e.target.checked); updateIframeField('enableWhatsapp', e.target.checked as any); }} />
                      <span className="text-xs text-white/70 group-hover:text-white transition-colors">add message us button on website</span>
                    </label>
                    {sidebarEnableWhatsapp && (
                      <div className="flex flex-col gap-1.5 mt-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">enter watsapp numb</label>
                        <input type="text" value={sidebarWhatsappNumber} placeholder="e.g. 1234567890"
                          onChange={(e) => { setSidebarWhatsappNumber(e.target.value); updateIframeField('whatsappNumber', e.target.value); }}
                          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white focus:border-green-500/60 outline-none text-xs" />
                      </div>
                    )}
                  </div>

                  <div className="w-full h-px bg-white/[0.05]" />
                  <p className="text-[9px] uppercase tracking-widest text-white/25 font-bold">Contact Info</p>

                  {[
                    { label: 'Address', field: 'address', val: sidebarAddress, set: setSidebarAddress, ph: '123 Main St', type: 'text' },
                    { label: 'Phone', field: 'phone', val: sidebarPhone, set: setSidebarPhone, ph: '+1 234 567 890', type: 'tel' },
                    { label: 'Email', field: 'email', val: sidebarEmail, set: setSidebarEmail, ph: 'contact@brand.com', type: 'email' },
                  ].map(({ label, field, val, set, ph, type }) => (
                    <div key={field} className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{label}</label>
                      <input type={type} value={val} placeholder={ph}
                        onChange={(e) => { (set as any)(e.target.value); updateIframeField(field, e.target.value); }}
                        className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white focus:border-blue-500/60 outline-none text-xs" />
                    </div>
                  ))}
                </>
              )}

              {/* ── TAB: DESIGN ── */}
              {fsTab === 'design' && (
                <>
                  {!selectedElement ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12 gap-3">
                      <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-2xl">✦</div>
                      <p className="text-xs font-semibold text-white/50">No element selected</p>
                      <p className="text-[10px] text-white/25 max-w-[160px] leading-relaxed">Click any text or image in the preview to select and style it</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="text-[9px] text-white/20 font-mono truncate" title={selectedElement.selector}>{selectedElement.selector}</div>

                      {/* Inline toolbar */}
                      <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-2.5 py-2 flex-wrap">
                        {[['B','bold','font-bold'],['I','italic','italic'],['U','underline','underline']].map(([l,cmd,cls]) => (
                          <button key={cmd} onClick={() => iframeRef.current?.contentWindow?.postMessage({type:'INLINE_FORMAT',command:cmd},'*')}
                            className={`px-2 py-1 rounded-md text-xs ${cls} hover:bg-blue-500/20 hover:text-blue-300 transition-all text-white/70`}>{l}</button>
                        ))}
                        <div className="flex-1" />
                        <button onClick={() => { iframeRef.current?.contentWindow?.postMessage({type:'REMOVE_ELEMENT',selector:selectedElement.selector},'*'); setSelectedElement(null); }}
                          className="px-2 py-1 rounded-md text-xs text-red-400 hover:bg-red-500/20 transition-all">✕</button>
                        <button onClick={() => iframeRef.current?.contentWindow?.postMessage({type:'RESET_ELEMENT_FONT',selector:selectedElement.selector},'*')}
                          className="px-2 py-1 rounded-md text-xs text-white/40 hover:bg-white/10 transition-all">↺</button>
                        <button onClick={() => setSelectedElement(null)}
                          className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500 text-white hover:bg-blue-400 transition-all">Done</button>
                      </div>

                      {/* Link URL */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Button link :</label>
                        <input 
                          type="text" 
                          placeholder="- enter url address" 
                          value={selectedElement.href || ''} 
                          onChange={(e) => updateSelectedElementStyle({ href: e.target.value })}
                          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white focus:border-blue-500/60 outline-none text-xs"
                        />
                      </div>

                      {/* Font */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Font</label>
                        <select value={selectedElement.fontFamily.split(',')[0].trim().replace(/['"]/g,'')}
                          onChange={(e) => updateSelectedElementStyle({fontFamily: e.target.value})}
                          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white focus:border-blue-500/60 outline-none text-xs">
                          {['System UI','Inter','Outfit','Space Grotesk','Instrument Serif','Playfair Display','Raleway','Sora','DM Sans','Lato','Poppins','Montserrat','Nunito','Source Code Pro','Merriweather','Josefin Sans','Work Sans','Plus Jakarta Sans','Libre Baskerville'].map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>

                      {/* Size + Weight */}
                      <div className="flex gap-2">
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Size px</label>
                          <input type="number" min="8" max="200" value={parseInt(selectedElement.fontSize)||16}
                            onChange={(e) => updateSelectedElementStyle({fontSize: e.target.value+'px'})}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2 text-white focus:border-blue-500/60 outline-none text-xs text-center" />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Weight</label>
                          <select value={selectedElement.fontWeight} onChange={(e) => updateSelectedElementStyle({fontWeight: e.target.value})}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2 text-white focus:border-blue-500/60 outline-none text-xs">
                            {[['300','Light'],['400','Regular'],['500','Medium'],['600','Semi-Bold'],['700','Bold'],['800','Extra Bold'],['900','Black']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Color */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Color</label>
                        <div className="flex gap-2 items-center">
                          <input type="color" value={selectedElement.color.startsWith('#') ? selectedElement.color : '#ffffff'}
                            onChange={(e) => updateSelectedElementStyle({color: e.target.value})}
                            className="w-9 h-9 cursor-pointer rounded-lg border border-white/[0.08] p-0.5 bg-transparent" />
                          <input type="text" value={selectedElement.color} onChange={(e) => updateSelectedElementStyle({color: e.target.value})}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2 text-white focus:border-blue-500/60 outline-none flex-1 text-xs font-mono text-center" />
                        </div>
                        <div className="flex gap-1.5 mt-0.5">
                          {['#ffffff','#000000','#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981','#ef4444'].map(c => (
                            <button key={c} onClick={() => updateSelectedElementStyle({color: c})}
                              className="w-5 h-5 rounded-full border border-white/20 hover:scale-125 transition-transform" style={{backgroundColor:c}} />
                          ))}
                        </div>
                      </div>

                      {/* Spacing + Line Height */}
                      <div className="flex gap-2">
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Spacing</label>
                          <select onChange={(e) => updateSelectedElementStyle({letterSpacing: e.target.value})}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2 text-white focus:border-blue-500/60 outline-none text-xs">
                            <option value="normal">Normal</option><option value="-0.05em">Tight</option><option value="0.05em">Wide</option><option value="0.1em">Wider</option><option value="0.2em">Widest</option>
                          </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Line H.</label>
                          <select onChange={(e) => updateSelectedElementStyle({lineHeight: e.target.value})}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2 text-white focus:border-blue-500/60 outline-none text-xs">
                            {['1','1.25','1.5','1.75','2'].map(v => <option key={v} value={v}>{v}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Align */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Align</label>
                        <div className="flex gap-1">
                          {[['left','←'],['center','↔'],['right','→'],['justify','⇔']].map(([v,ic]) => (
                            <button key={v} onClick={() => updateSelectedElementStyle({textAlign: v})}
                              className="flex-1 py-2 rounded-lg border border-white/[0.08] text-xs hover:border-blue-500/60 hover:text-blue-300 transition-all text-white/60">{ic}</button>
                          ))}
                        </div>
                      </div>

                      {/* Animate In */}
                      <div className="flex flex-col gap-1.5 border-t border-white/[0.06] pt-3">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Animate In</label>
                        <div className="flex flex-wrap gap-1">
                          {[{v:'none',l:'None'},{v:'fade-up',l:'↑Fade'},{v:'slide-in-left',l:'←Slide'},{v:'fade-in',l:'Fade'},{v:'zoom-in',l:'Zoom'},{v:'bounce-in',l:'Bounce'},{v:'flip-x',l:'Flip'},{v:'blur-in',l:'Blur'},{v:'slide-up',l:'↑Slide'},{v:'slide-in-right',l:'→Slide'},{v:'rotate-in',l:'Rotate'},{v:'scale-up',l:'Scale'}].map(p => (
                            <button key={p.v} onClick={() => updateSelectedElementStyle({animateIn: p.v})}
                              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all border ${selectedElement.animateIn===p.v ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/[0.08] text-white/50 hover:border-blue-500/50 hover:text-blue-300'}`}>{p.l}</button>
                          ))}
                        </div>
                      </div>

                      {/* Animate Out */}
                      <div className="flex flex-col gap-1.5 border-t border-white/[0.06] pt-3">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Animate Out</label>
                        <div className="flex flex-wrap gap-1">
                          {[{v:'none',l:'None'},{v:'fade-out',l:'Fade'},{v:'slide-out-right',l:'→Slide'},{v:'zoom-out',l:'Zoom'},{v:'slide-down',l:'↓Slide'},{v:'blur-out',l:'Blur'},{v:'slice-out-left',l:'Slice'},{v:'rotate-out',l:'Rotate'},{v:'bounce-out',l:'Bounce'}].map(p => (
                            <button key={p.v} onClick={() => updateSelectedElementStyle({animateOut: p.v})}
                              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all border ${selectedElement.animateOut===p.v ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/[0.08] text-white/50 hover:border-purple-500/50 hover:text-purple-300'}`}>{p.l}</button>
                          ))}
                        </div>
                      </div>

                      {/* Loop */}
                      <div className="flex flex-col gap-1.5 border-t border-white/[0.06] pt-3">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Loop</label>
                        <div className="flex flex-wrap gap-1">
                          {[{v:'none',l:'None'},{v:'pulse',l:'Pulse'},{v:'shimmer',l:'Shimmer'},{v:'float-bounce',l:'Float'},{v:'spin-loop',l:'Spin'},{v:'wiggle',l:'Wiggle'},{v:'flash-link',l:'Flash'},{v:'heartbeat',l:'Heart'},{v:'sway',l:'Sway'},{v:'slow-pulse',l:'SlowPulse'},{v:'soft-bounce',l:'Bounce'},{v:'glow',l:'Glow'}].map(p => (
                            <button key={p.v} onClick={() => updateSelectedElementStyle({loop: p.v})}
                              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all border ${selectedElement.loop===p.v ? 'bg-pink-500 border-pink-500 text-white' : 'border-white/[0.08] text-white/50 hover:border-pink-500/50 hover:text-pink-300'}`}>{p.l}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ── TAB: AI EDIT ── */}
              {fsTab === 'ai' && (
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <p className="text-[10px] text-blue-300/80 leading-relaxed">✨ Describe any change and AI will apply it instantly to your site content and theme.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <textarea
                      rows={3}
                      value={aiEditPrompt}
                      onChange={(e) => setAiEditPrompt(e.target.value)}
                      placeholder="e.g. 'Make the hero title bolder', 'Change primary color to deep purple', 'Add urgency to the CTA button text'..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-3 text-white focus:border-blue-500/60 outline-none text-xs resize-none placeholder:text-white/25"
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAiEditFromFs(); }}}
                    />
                    <button
                      onClick={handleAiEditFromFs}
                      disabled={isEditing || !aiEditPrompt.trim()}
                      className="w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 disabled:opacity-40 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                      {isEditing ? '⏳ Applying...' : '✨ Apply with AI'}
                    </button>
                  </div>

                  {error && (
                    <div className="text-red-400 text-[10px] bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{error}</div>
                  )}

                  {aiEditLog.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/25 font-bold">Recent Edits</label>
                      {aiEditLog.slice().reverse().map((log, i) => (
                        <div key={i} className="text-[10px] text-white/40 bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-2 truncate">
                          ✓ {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar bottom: Publish CTA */}
            <div className="p-4 border-t border-white/[0.06] shrink-0">
              <button onClick={handlePublishClick} disabled={isPublishing}
                className="w-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:opacity-90 disabled:opacity-40 text-white py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all">
                {isPublishing ? 'Publishing...' : '🚀 Publish to Web'}
              </button>
            </div>
          </div>

          {/* ── PREVIEW CANVAS ── */}
          <div className="flex-1 bg-[#04040a] flex flex-col items-center justify-start overflow-auto p-6 gap-4">

            {/* Browser chrome bar */}
            <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-2.5 bg-[#0d0e1c] border border-white/[0.07] rounded-t-2xl"
              style={{ width: viewportWidth[viewport], maxWidth: '100%', transition: 'width 0.3s ease' }}>
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isModifyMode
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {isModifyMode ? '✏️ Customizer Mode (Click element to edit)' : '🟢 Interactive Navigation Active (Click nav to browse)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/[0.06] border border-white/[0.1] rounded-lg p-0.5 shrink-0">
                  <button
                    onClick={() => setModifyModeState(false)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      !isModifyMode
                        ? 'bg-[#3b82f6] text-white shadow-sm'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    👁️ Browse
                  </button>
                  <button
                    onClick={() => setModifyModeState(true)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isModifyMode
                        ? 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-sm'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    ✏️ Modify
                  </button>
                </div>
                <div className="bg-white/[0.05] rounded-lg px-2.5 py-1 text-[10px] text-white/40 font-mono truncate max-w-[200px] hidden sm:block">
                  {previewData.previewUrl || 'webmake — live preview'}
                </div>
              </div>
            </div>

            {/* Iframe or renderer */}
            <div
              className="relative shrink-0 bg-white shadow-2xl shadow-black/60 rounded-b-2xl overflow-hidden border border-white/[0.07] border-t-0"
              style={{ width: viewportWidth[viewport], maxWidth: '100%', height: 'calc(100vh - 180px)', transition: 'width 0.3s ease' }}>
              {previewData.previewUrl ? (
                <iframe
                  ref={iframeRef}
                  src={previewData.previewUrl}
                  onLoad={handleIframeLoad}
                  className="w-full h-full border-none"
                  title="Live Preview"
                />
              ) : (
                <div className="w-full h-full overflow-y-auto">
                  <PreviewRenderer 
                    data={previewData} 
                    logoUrl={logoUrl} 
                    onDataChange={(newData) => setPreviewData(newData)}
                  />
                </div>
              )}
            </div>

            {publishedUrl && (
              <div className="mt-2 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-3 rounded-xl flex items-center gap-3 text-xs font-semibold">
                <span>🌐 Live at:</span>
                <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">{publishedUrl}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[var(--bg-base)] text-[var(--text-strong)] relative overflow-hidden pb-20 pt-16 sm:pt-20">
      <SEOMeta 
        title="AI Website Builder | Digifox"
        description="Instantly generate and customize your website using our advanced AI consultant."
      />

      {/* Floating WebMake Top Navigation Bar */}
      <WebMakeNav activePage="studio" />
      
      {/* 1st Section Atmospheric Background Video */}
      <div className="absolute top-0 left-0 right-0 h-[850px] overflow-hidden pointer-events-none z-0 select-none bg-[#060709]">
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4" 
          className="w-full h-full object-cover opacity-100 dark:opacity-60" 
          autoPlay 
          muted 
          loop 
          playsInline 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">
        
        {/* Header & Chat Section */}
        <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="w-full flex flex-col items-center text-center justify-center mb-6 relative">
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Build Your <span className="text-[#60a5fa] drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">Dream Website</span> by WebMake
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Describe your business and let AI create a beautiful Animated, Good converting and performance website with responsive design, SEO optimization, GEO readiness, AEO best practices, and lightning-fast performance.
              </p>
            </div>

            {/* Custom AI Builder Section */}
            <div className="mb-12 max-w-4xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/20 pb-3 mb-4 gap-3">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-[#60a5fa] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {builderMode === 'new' ? "Generate with Our AI Designing" : "Edit Existing Brand Site"}
                </h2>
                <div className="flex bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg">
                  <button 
                    onClick={() => setBuilderMode('new')}
                    className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${builderMode === 'new' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-white/70 hover:text-white'}`}
                  >
                    Create New
                  </button>
                  <button 
                    onClick={() => setBuilderMode('edit')}
                    className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${builderMode === 'edit' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-white/70 hover:text-white'}`}
                  >
                    Edit Brand Site
                  </button>
                </div>
              </div>

              {builderMode === 'edit' ? (
                <div className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl flex flex-col gap-4 max-w-xl mx-auto text-center items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center text-[#60a5fa]">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-1 text-white">Load Your Brand Website</h3>
                    <p className="text-xs text-white/70 max-w-md mx-auto">
                      Enter the subdomain of the brand website you previously published to load and edit its content.
                    </p>
                  </div>
                  <div className="flex w-full gap-3 max-w-md mt-1">
                    <div className="flex-1 relative flex items-center">
                      <input 
                        type="text" 
                        value={editSubdomain}
                        onChange={(e) => setEditSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        placeholder="e.g. mybrand"
                        className="w-full bg-black/50 border border-white/20 rounded-full px-5 py-2.5 pr-28 text-white focus:border-[#3b82f6] outline-none font-semibold text-sm"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLoadBrandSite(); }}
                      />
                      <span className="absolute right-5 text-xs text-white/70 font-bold">.digifox.world</span>
                    </div>
                  </div>
                  {loadError && (
                    <p className="text-red-400 text-xs font-medium">{loadError}</p>
                  )}
                  <button
                    onClick={handleLoadBrandSite}
                    disabled={isLoadingBrandSite || !editSubdomain.trim()}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
                  >
                    {isLoadingBrandSite ? "Loading Site..." : "Load & Edit Website"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Website Type</label>
                      <select 
                        value={websiteType}
                        onChange={(e) => setWebsiteType(e.target.value)}
                        disabled={chatHistory.length > 0}
                        className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--text-strong)] focus:border-[#3b82f6] outline-none disabled:opacity-50 font-medium shadow-md"
                      >
                        <option value="Local Business">Local Business</option>
                        <option value="Restaurant & Food">Restaurant & Food</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Factory / Manufacturing">Factory / Manufacturing</option>
                        <option value="E-Commerce Store">E-Commerce Store</option>
                        <option value="Mobile Web App">Mobile Web App</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Design Category</label>
                      <select 
                        value={templateCategory}
                        onChange={(e) => setTemplateCategory(e.target.value)}
                        disabled={chatHistory.length > 0}
                        className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--text-strong)] focus:border-[#3b82f6] outline-none disabled:opacity-50 font-medium shadow-md"
                      >
                        <option value="auto">Auto Select</option>
                        <option value="3d">3D Animated</option>
                        <option value="2d">2D Static</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Company Logo (Optional)</label>
                      <div className="relative flex items-center">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--text-secondary)] flex justify-between items-center hover:border-[#3b82f6] transition-colors font-medium shadow-md">
                          <span className="truncate">{logoUrl ? "Logo Uploaded!" : "Upload image..."}</span>
                          {logoUrl && <img src={logoUrl} alt="Logo" className="h-5 w-auto object-contain rounded" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col bg-[var(--bg-surface)]/90 backdrop-blur-md rounded-2xl border border-[var(--border-subtle)] shadow-xl w-full overflow-hidden transition-all duration-300">
                    {/* Chat History if present */}
                    {chatHistory.length > 0 && (
                      <div 
                        ref={chatScrollRef}
                        className="max-h-[220px] overflow-y-auto p-4 flex flex-col gap-3 border-b border-[var(--border-subtle)]"
                      >
                        {chatHistory.map((msg, i) => (
                          <div 
                            key={i} 
                            className={`max-w-[85%] p-3 rounded-xl ${
                              msg.role === 'user' 
                                ? 'bg-[#3b82f6] text-white self-end rounded-br-sm' 
                                : 'bg-[var(--bg-base)] border border-[var(--border-strong)] text-[var(--text-primary)] self-start rounded-bl-sm'
                            }`}
                          >
                            <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
                              {msg.text}
                            </p>
                          </div>
                        ))}
                        
                        {isPlanning && (
                          <div className="bg-[var(--bg-base)] border border-[var(--border-strong)] p-3 rounded-xl self-start rounded-bl-sm flex gap-1.5 items-center">
                            <div className="w-1.5 h-1.5 bg-[var(--text-primary)]/50 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-[var(--text-primary)]/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 bg-[var(--text-primary)]/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Input Area */}
                    <div className="p-3 sm:p-4 bg-[var(--bg-base)]/50 flex flex-col gap-3">
                      <textarea 
                        rows={chatHistory.length === 0 ? 2 : 2}
                        placeholder="Describe your business or website idea (e.g. 'A sleek modern cafe in Sydney with menu, reviews, and table booking')..."
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handlePlan();
                          }
                        }}
                        className="w-full bg-transparent text-[var(--text-strong)] placeholder:text-[var(--text-secondary)] text-sm outline-none resize-none px-1"
                      />
                      
                      <div className="flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-[var(--border-subtle)]/50">
                        <span className="text-[11px] text-[var(--text-secondary)] hidden sm:inline-block">
                          Press <kbd className="px-1.5 py-0.5 rounded bg-black/20 border border-white/10 font-mono text-[10px]">Enter ↵</kbd> to plan
                        </span>

                        <div className="flex flex-wrap gap-2.5 ml-auto items-center">
                          <button 
                            onClick={handlePlan}
                            disabled={isPlanning || isBuilding || isDesigning || !currentInput.trim()}
                            className="text-[var(--text-strong)] border border-[var(--border-strong)] hover:border-[#3b82f6] hover:text-[#3b82f6] px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {isPlanning ? "Planning..." : "Plan with AI"}
                          </button>

                          <button 
                            onClick={handleDesignWebsite}
                            disabled={isDesigning || isBuilding || isPlanning || (chatHistory.length === 0 && !currentInput.trim())}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-1.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <Sparkles size={14} className={isDesigning ? "animate-spin" : ""} />
                            <span>{isDesigning ? "Designing..." : "Design Website"}</span>
                          </button>
                          
                          <button 
                            onClick={handleBuild}
                            disabled={isBuilding || isDesigning || isPlanning || (chatHistory.length === 0 && !currentInput.trim())}
                            className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-5 py-1.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(59,130,246,0.25)] cursor-pointer"
                          >
                            {isBuilding ? "Building..." : "Build Website"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Trust Badge below AI Builder Box */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-6 pb-2 text-center">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-strong)] shadow-lg hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[var(--bg-surface)] object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop" alt="User" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[var(--bg-surface)] object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="User" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[var(--bg-surface)] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="User" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[var(--bg-surface)] object-cover" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop" alt="User" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--text-strong)]">
                    <span className="text-yellow-400">★★★★★</span>
                    <span>Got trusted by <strong className="text-[#3b82f6]">700+ users</strong> worldwide..</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Gallery Section */}
            <div className="mb-16">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-[var(--border-strong)] pb-4 gap-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-white [.light_&]:text-[#2563eb] dark:text-white">
                    Or Start From a Premium Design
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-primary)]/60 mt-1 font-light">
                    Pick an interactive 3D or 2D design kit and customize it directly in Web Studio.
                  </p>
                </div>
                <Link
                  to="/ai-builder/design-kits"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 hover:from-[#3b82f6]/30 hover:to-[#8b5cf6]/30 border border-[#3b82f6]/40 text-white text-xs font-black uppercase tracking-wider transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0 cursor-pointer"
                >
                  <span>Explore All Design Kits</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              <TemplateGallery 
                onSelect={(_, data) => {
                  requireAuth(() => {
                    setPreviewData(data);
                    // Scroll down to preview area smoothly
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  });
                }} 
              />
            </div>

            {/* 5 Easy Steps Process Section with Progressive Bar Animations */}
            <StepsProgressBarSection />

            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-500/10 p-4 rounded-xl border border-red-500/20 w-full">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        {(previewData || isBuilding) && (
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
                  onClick={handlePublishClick}
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
          
          {/* AI Magic Edit Box */}
          {previewData && !isBuilding && (
            <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-4 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">✨</div>
              <h3 className="text-sm font-bold text-[var(--text-strong)] mb-3 flex items-center gap-2">
                <span className="text-[#3b82f6]">✨</span> AI Magic Edit
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiEditPrompt}
                  onChange={(e) => setAiEditPrompt(e.target.value)}
                  placeholder="Tell us what you want to change (e.g. 'Make the hero title bolder and background darker')"
                  className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAiEdit();
                  }}
                />
                <button
                  onClick={handleAiEdit}
                  disabled={isEditing || !aiEditPrompt.trim()}
                  className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-8 py-2 rounded-xl font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
                >
                  {isEditing ? "Applying..." : "Apply"}
                </button>
              </div>
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

                        {/* WhatsApp Connection */}
                        <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-[var(--border-subtle)]">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-10 h-5 rounded-full transition-colors relative shadow-inner ${sidebarEnableWhatsapp ? 'bg-green-500' : 'bg-[var(--border-strong)]'}`}>
                              <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform shadow-sm ${sidebarEnableWhatsapp ? 'translate-x-5' : ''}`} />
                            </div>
                            <input type="checkbox" checked={sidebarEnableWhatsapp} className="hidden"
                              onChange={(e) => { setSidebarEnableWhatsapp(e.target.checked); updateIframeField('enableWhatsapp', e.target.checked as any); }} />
                            <span className="text-sm text-[var(--text-strong)] font-medium">add message us button on website</span>
                          </label>
                          {sidebarEnableWhatsapp && (
                            <div className="flex flex-col gap-2 mt-1">
                              <label className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">enter watsapp numb</label>
                              <input type="text" value={sidebarWhatsappNumber} placeholder="e.g. 1234567890"
                                onChange={(e) => { setSidebarWhatsappNumber(e.target.value); updateIframeField('whatsappNumber', e.target.value); }}
                                className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-strong)] focus:border-green-500/60 outline-none" />
                            </div>
                          )}
                        </div>

                        <div className="h-px w-full bg-[var(--border-subtle)] my-2" />
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
                              <div className="flex-1" />
                              <button title="Remove" onClick={() => { iframeRef.current?.contentWindow?.postMessage({ type:'REMOVE_ELEMENT', selector:selectedElement.selector },'*'); setSelectedElement(null); }} className="px-2 py-1 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all">✕</button>
                              <button title="Reset styles" onClick={() => iframeRef.current?.contentWindow?.postMessage({ type:'RESET_ELEMENT_FONT', selector:selectedElement.selector },'*')} className="px-2 py-1 rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--border-strong)] transition-all">↺</button>
                              <button title="Done" onClick={() => setSelectedElement(null)} className="px-3 py-1 rounded-lg text-xs font-bold bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all">Done</button>
                            </div>

                            {/* Link URL */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">Button link :</label>
                              <input 
                                type="text" 
                                placeholder="- enter url address" 
                                value={selectedElement.href || ''} 
                                onChange={(e) => updateSelectedElementStyle({ href: e.target.value })}
                                className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded-xl px-3 py-2.5 text-[var(--text-strong)] focus:border-[#3b82f6] outline-none text-sm"
                              />
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
                      <button onClick={handlePublishClick} disabled={isPublishing}
                        className="w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50">
                        {isPublishing ? "Publishing..." : "Publish to Web 🚀"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          </div>
        )}

      </div>
      
      {/* Global Client Reviews Section */}
      <section className="mt-8 pt-10 pb-8 border-t border-[var(--border-strong)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none -z-10" />
        
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="text-yellow-400">★★★★★</span>
              <span>Global Client Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
              Well Trusted by Creators in <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">USA, Australia, India and All Over the World</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 leading-relaxed">
              Real feedback from entrepreneurs, agency founders, and developers across the world building high-impact digital experiences with WebMake AI.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mt-8 pt-6 border-t border-[var(--border-subtle)] text-xs uppercase tracking-widest font-bold text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[var(--text-strong)]">4.9/5</span>
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="opacity-70">(380+ Reviews)</span>
              </div>
              <div className="hidden sm:block text-[var(--border-strong)]">•</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[var(--text-strong)]">700+</span>
                <span className="opacity-70">Sites Launched</span>
              </div>
            </div>
          </div>

          {/* 3D Animated Testimonials Component */}
          <AnimatedTestimonials 
            autoplay={true}
            testimonials={[
              {
                country: 'United States',
                flag: '🇺🇸',
                tag: 'Portfolio & Agency Website',
                quote: 'WebMake turned our agency branding into an ultra-smooth, 3D interactive web showcase in under 15 minutes. The inline text styling and live animations saved our team weeks of development work. Incredible platform.',
                name: 'Marcus Vance',
                designation: 'Founder, NexaStudio • Austin, Texas, USA',
                src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'United States',
                flag: '🇺🇸',
                tag: 'E-Commerce & Retail Store',
                quote: 'We launched our entire summer collection website with WebMake. The layout adapts smoothly to all screens, and our conversion rate jumped 35% thanks to the snappy load speeds and clean UX.',
                name: 'Sarah Jenkins',
                designation: 'E-Commerce Director, Aura Luxe • New York, USA',
                src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'United States',
                flag: '🇺🇸',
                tag: 'SaaS & Tech Landing Page',
                quote: 'The AI prompt generation matched our niche branding instantly. Being able to live-edit every heading, button, and image without touching code is a superpower for fast product launches.',
                name: 'David Miller',
                designation: 'Co-Founder, CloudPulse Tech • San Francisco, USA',
                src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'Australia',
                flag: '🇦🇺',
                tag: 'Creative Studio & Portfolio',
                quote: 'The responsiveness and visual polish of the generated sites are world-class. Our Australian clients loved how easy it was to connect the live WhatsApp button and customize branding details on the fly.',
                name: 'Chloe Henderson',
                designation: 'Creative Director, Veloce Media • Sydney, Australia',
                src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'Australia',
                flag: '🇦🇺',
                tag: 'Corporate & Business Portal',
                quote: 'We have built 8 client sites with WebMake in the last month. The domain publishing is instant, SSL is automatic, and the client customization portal is intuitive for non-technical stakeholders.',
                name: 'Liam O’Connor',
                designation: 'Operations Lead, Bondi Digital • Melbourne, Australia',
                src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'Australia',
                flag: '🇦🇺',
                tag: 'Fashion Brand Storefront',
                quote: 'From brand logo upload to floating contact buttons, everything worked right out of the box. Super clean aesthetic that our customers in Australia and New Zealand rave about.',
                name: 'Jessica Taylor',
                designation: 'Founder, Outback Apparel Co. • Brisbane, Australia',
                src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'India',
                flag: '🇮🇳',
                tag: 'Enterprise Tech Platform',
                quote: 'WebMake AI is an absolute game-changer for rapid client delivery. We built and published 5 full-fledged business sites for clients in Bangalore and Mumbai in a single afternoon. Clean code, fast hosting, and zero friction.',
                name: 'Aarav Sharma',
                designation: 'Tech Lead, InfiniByte • Bengaluru, India',
                src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'India',
                flag: '🇮🇳',
                tag: 'Design Agency Portfolio',
                quote: 'The typography controls, letter-spacing, and smooth reveal animations give every site an ultra-luxurious feel. Our clients think we spent $10k+ on custom design. Simply unmatched.',
                name: 'Pooja Patel',
                designation: 'Brand Strategist, SparkDesign • Mumbai, India',
                src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop'
              },
              {
                country: 'India',
                flag: '🇮🇳',
                tag: 'Supply Chain & B2B Portal',
                quote: 'Connecting our business WhatsApp directly to the floating corner button boosted our inbound lead inquiries by 60%. Publishing took under 60 seconds with custom subdomain!',
                name: 'Rohan Verma',
                designation: 'Founder, Zenith Logistics • New Delhi, India',
                src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop'
              }
            ]}
          />
        </div>
      </section>
      
      {/* Bento Grid Features Section with Interactive CursorGrid Background */}
      <section className="py-28 border-t border-white/[0.08] relative overflow-hidden bg-[#060709]">
        {/* Interactive CursorGrid Background */}
        <div className="absolute inset-0 pointer-events-auto">
          <CursorGrid 
            cellSize={65}
            color="#3B82F6"
            radius={160}
            falloff="smooth"
            holdTime={400}
            fadeDuration={800}
            lineWidth={1.2}
            maxOpacity={0.9}
            fillOpacity={0.06}
            gridOpacity={0.04}
            cellRadius={4}
            clickPulse={true}
            pulseSpeed={600}
          />
        </div>

        {/* Ambient Overlay Vignettes */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060709] via-[#060709]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060709] via-[#060709]/70 to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Features & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
              Everything You Need To <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Dominate Online</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto font-normal">
              Built for speed, conversion, and stunning visual impact. Explore the core pillars behind the WebMake AI architecture.
            </p>
          </div>

          {/* ── MOBILE VIEW (< md): 3D STICKY SCROLLING STACK OF CARDS ──────── */}
          <div ref={dominateMobileRef} className="block md:hidden relative pb-8">
            <DominateStickyCard
              index={0}
              total={5}
              scrollYProgress={dominateScrollYProgress}
              tag="01 — 2D MOTION"
              tagColor="text-blue-400"
              title="Animated Websites"
              desc="Smooth scroll effects, transitions and interactions built into every experience. First frame of each picks up perfectly from the last."
              iconBg="bg-blue-500/20"
              bgGradient="bg-[#0e121a]"
              borderColor="border-blue-500/30"
              iconSvg={
                <motion.svg viewBox="0 0 40 40" className="w-9 h-9 relative z-10" fill="none">
                  <defs>
                    <linearGradient id="mBentoMotionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <path d="M6 26L20 33L34 26" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 20L20 27L34 20" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 7L34 14L20 21L6 14Z" fill="rgba(59, 130, 246, 0.25)" stroke="url(#mBentoMotionGrad)" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="20" cy="14" r="2" fill="#FFFFFF" />
                </motion.svg>
              }
            />

            <DominateStickyCard
              index={1}
              total={5}
              scrollYProgress={dominateScrollYProgress}
              tag="02 — 3D INTERACTIVE"
              tagColor="text-indigo-400"
              title="3D Immersive Websites"
              desc="Bring your brand to life with interactive 3D scenes, objects and visual experiences."
              iconBg="bg-indigo-500/20"
              bgGradient="bg-[#0e121a]"
              borderColor="border-indigo-500/30"
              iconSvg={
                <motion.svg viewBox="0 0 40 40" className="w-9 h-9 relative z-10" fill="none">
                  <defs>
                    <linearGradient id="mBento3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="20" cy="20" rx="14" ry="5.5" stroke="url(#mBento3dGrad)" strokeWidth="1.6" strokeDasharray="3 3" />
                  <circle cx="20" cy="20" r="4.5" fill="url(#mBento3dGrad)" stroke="#FFFFFF" strokeWidth="1" />
                </motion.svg>
              }
            />

            <DominateStickyCard
              index={2}
              total={5}
              scrollYProgress={dominateScrollYProgress}
              tag="03 — FULL CUSTOMIZE - AI EDITING"
              tagColor="text-purple-400"
              title="Update - Change Anything"
              desc="Tell us what you want changed. Update content, colors, images and sections instantly."
              iconBg="bg-purple-500/20"
              bgGradient="bg-[#0e121a]"
              borderColor="border-purple-500/30"
              iconSvg={
                <motion.svg viewBox="0 0 40 40" className="w-9 h-9 relative z-10" fill="none">
                  <defs>
                    <linearGradient id="mBentoWandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C084FC" />
                      <stop offset="100%" stopColor="#9333EA" />
                    </linearGradient>
                  </defs>
                  <path d="M10 30L25 15" stroke="url(#mBentoWandGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M28 8L30 12L34 14L30 16L28 20L26 16L22 14L26 12Z" fill="#F3E8FF" stroke="#A855F7" strokeWidth="0.8" />
                  <circle cx="16" cy="9" r="1.5" fill="#E9D5FF" />
                </motion.svg>
              }
            />

            <DominateStickyCard
              index={3}
              total={5}
              scrollYProgress={dominateScrollYProgress}
              tag="04 — EVERYTHING INCLUDED"
              tagColor="text-cyan-400"
              title="Free Domain, Hosting + SSL"
              desc="Get the infrastructure you need to launch, host and secure your website in one place with global CDN and automated SSL certificates."
              iconBg="bg-cyan-500/20"
              bgGradient="bg-[#0e121a]"
              borderColor="border-cyan-500/30"
              iconSvg={
                <motion.svg viewBox="0 0 40 40" className="w-9 h-9 relative z-10" fill="none">
                  <defs>
                    <linearGradient id="mBentoHostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#0891B2" />
                    </linearGradient>
                  </defs>
                  <circle cx="20" cy="20" r="14" stroke="url(#mBentoHostGrad)" strokeWidth="1.8" fill="rgba(6, 182, 212, 0.08)" />
                  <ellipse cx="20" cy="20" rx="7" ry="14" stroke="url(#mBentoHostGrad)" strokeWidth="1.2" strokeOpacity="0.7" />
                  <line x1="6" y1="20" x2="34" y2="20" stroke="url(#mBentoHostGrad)" strokeWidth="1.2" strokeOpacity="0.7" />
                </motion.svg>
              }
            />

            <DominateStickyCard
              index={4}
              total={5}
              scrollYProgress={dominateScrollYProgress}
              tag="05 — SAVE THOUSANDS OF DOLLARS"
              tagColor="text-blue-400"
              title="Save $5,000–$10,000+ On Agency Builds"
              desc="Create a high-converting, animated professional website without traditional agency costs. Full ownership with zero lock-in."
              iconBg="bg-blue-500/20"
              bgGradient="bg-[#0e121a]"
              borderColor="border-blue-500/40"
              extraContent={
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-300">Generate & Preview</span>
                  <span className="text-2xl font-black text-blue-400">$0 Free</span>
                </div>
              }
              iconSvg={
                <motion.svg viewBox="0 0 40 40" className="w-9 h-9 relative z-10" fill="none">
                  <defs>
                    <linearGradient id="mBentoCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="23" cy="17" rx="10" ry="6" fill="rgba(59, 130, 246, 0.2)" stroke="#93C5FD" strokeWidth="1.4" />
                  <ellipse cx="17" cy="22" rx="10" ry="6" fill="url(#mBentoCoinGrad)" stroke="#DBEAFE" strokeWidth="1.5" />
                  <path d="M7 22V27C7 30.3 11.5 33 17 33C22.5 33 27 30.3 27 27V22" fill="url(#mBentoCoinGrad)" stroke="#DBEAFE" strokeWidth="1.5" />
                  <text x="17" y="24" fontSize="6" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">$</text>
                </motion.svg>
              }
            />
          </div>

          {/* ── DESKTOP & TABLET VIEW (>= md): BENTO GRID WITH 3D HOVER TILT ── */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 [perspective:1200px]">
            
            {/* Card 1: 01 — 2D MOTION (Span 2 on lg with Blue Mist) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3, z: 25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative lg:col-span-2 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.14),_#0d0f12_70%)] border border-white/[0.08] rounded-[28px] p-7 sm:p-9 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] cursor-default"
            >
              <div className="relative z-10 [transform:translateZ(25px)]">
                <div className="relative w-14 h-14 flex items-center justify-center mb-8 sm:mb-12">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
                  <motion.svg viewBox="0 0 40 40" className="w-10 h-10 relative z-10" fill="none">
                    <defs>
                      <linearGradient id="bentoMotionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M6 26L20 33L34 26"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ y: [0, 1.5, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M6 20L20 27L34 20"
                      stroke="#60A5FA"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ y: [0, -1.5, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M20 7L34 14L20 21L6 14Z"
                      fill="rgba(59, 130, 246, 0.25)"
                      stroke="url(#bentoMotionGrad)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      animate={{ y: [-2, 1.5, -2] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="20"
                      cy="14"
                      r="2"
                      fill="#FFFFFF"
                      animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  </motion.svg>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-blue-400/90 mb-1">
                  01 — 2D MOTION
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  Animated Websites
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-xl">
                  Smooth scroll effects, transitions and interactions built into every experience. First frame of each picks up perfectly from the last.
                </p>
              </div>
            </motion.div>

            {/* Card 2: 02 — 3D INTERACTIVE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, rotateX: 3, rotateY: 3, z: 25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative bg-[#0d0f12] border border-white/[0.08] rounded-[28px] p-7 sm:p-9 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] cursor-default"
            >
              <div className="relative z-10 [transform:translateZ(25px)]">
                <div className="relative w-14 h-14 flex items-center justify-center mb-8 sm:mb-12">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
                  <motion.svg viewBox="0 0 40 40" className="w-10 h-10 relative z-10" fill="none">
                    <defs>
                      <linearGradient id="bento3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </linearGradient>
                    </defs>
                    <motion.ellipse
                      cx="20"
                      cy="20"
                      rx="14"
                      ry="5.5"
                      stroke="url(#bento3dGrad)"
                      strokeWidth="1.6"
                      strokeDasharray="3 3"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "20px 20px" }}
                    />
                    <motion.ellipse
                      cx="20"
                      cy="20"
                      rx="14"
                      ry="5.5"
                      stroke="#C7D2FE"
                      strokeWidth="1.2"
                      strokeOpacity="0.6"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "20px 20px" }}
                    />
                    <motion.circle
                      cx="20"
                      cy="20"
                      r="4.5"
                      fill="url(#bento3dGrad)"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      animate={{ scale: [0.9, 1.15, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.svg>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-400/90 mb-1">
                  02 — 3D INTERACTIVE
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  3D Immersive Websites
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed">
                  Bring your brand to life with interactive 3D scenes, objects and visual experiences.
                </p>
              </div>
            </motion.div>

            {/* Card 3: 03 — FULL CUSTOMIZE - AI EDITING */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ scale: 1.02, rotateX: -3, rotateY: -3, z: 25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative bg-[#0d0f12] border border-white/[0.08] rounded-[28px] p-7 sm:p-9 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] cursor-default"
            >
              <div className="relative z-10 [transform:translateZ(25px)]">
                <div className="relative w-14 h-14 flex items-center justify-center mb-8 sm:mb-12">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
                  <motion.svg viewBox="0 0 40 40" className="w-10 h-10 relative z-10" fill="none">
                    <defs>
                      <linearGradient id="bentoWandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C084FC" />
                        <stop offset="100%" stopColor="#9333EA" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M10 30L25 15"
                      stroke="url(#bentoWandGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{ rotate: [0, 8, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: "10px 30px" }}
                    />
                    <motion.path
                      d="M28 8L30 12L34 14L30 16L28 20L26 16L22 14L26 12Z"
                      fill="#F3E8FF"
                      stroke="#A855F7"
                      strokeWidth="0.8"
                      animate={{ scale: [0.7, 1.25, 0.7], rotate: [0, 45, 90, 180] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: "28px 14px" }}
                    />
                    <motion.circle
                      cx="16"
                      cy="9"
                      r="1.5"
                      fill="#E9D5FF"
                      animate={{ scale: [0.5, 1.4, 0.5], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </motion.svg>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-purple-400/90 mb-1">
                  03 — FULL CUSTOMIZE - AI EDITING
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  Update - Change Anything
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed">
                  Tell us what you want changed. Update content, colors, images and sections instantly.
                </p>
              </div>
            </motion.div>

            {/* Card 4: 04 — EVERYTHING INCLUDED (Span 2 on lg) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, rotateX: -3, rotateY: 3, z: 25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative lg:col-span-2 bg-[#0d0f12] border border-white/[0.08] rounded-[28px] p-7 sm:p-9 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] cursor-default"
            >
              <div className="relative z-10 [transform:translateZ(25px)]">
                <div className="relative w-14 h-14 flex items-center justify-center mb-8 sm:mb-12">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
                  <motion.svg viewBox="0 0 40 40" className="w-10 h-10 relative z-10" fill="none">
                    <defs>
                      <linearGradient id="bentoHostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#0891B2" />
                      </linearGradient>
                    </defs>
                    <circle cx="20" cy="20" r="14" stroke="url(#bentoHostGrad)" strokeWidth="1.8" fill="rgba(6, 182, 212, 0.08)" />
                    <ellipse cx="20" cy="20" rx="7" ry="14" stroke="url(#bentoHostGrad)" strokeWidth="1.2" strokeOpacity="0.7" />
                    <line x1="6" y1="20" x2="34" y2="20" stroke="url(#bentoHostGrad)" strokeWidth="1.2" strokeOpacity="0.7" />
                    <motion.circle
                      cx="20"
                      cy="6"
                      r="2.2"
                      fill="#A5F3FC"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "20px 20px" }}
                    />
                  </motion.svg>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-400/90 mb-1">
                  04 — EVERYTHING INCLUDED
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  Free Domain , Hosting + SSL
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-xl">
                  Get the infrastructure you need to launch, host and secure your website in one place with global CDN and automated SSL certificates.
                </p>
              </div>
            </motion.div>

            {/* Card 5: 05 — SAVE THOUSANDS OF DOLLARS (Span 3 / Full Width on lg with Vibrant Blue Palette) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ scale: 1.015, rotateX: 2, z: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative lg:col-span-3 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.14),_#0d0f12_60%)] border border-white/[0.08] rounded-[28px] p-7 sm:p-9 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)] cursor-default"
            >
              <div className="relative z-10 max-w-2xl [transform:translateZ(25px)]">
                <div className="relative w-14 h-14 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
                  <motion.svg viewBox="0 0 40 40" className="w-10 h-10 relative z-10" fill="none">
                    <defs>
                      <linearGradient id="bentoCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                    </defs>
                    <motion.ellipse
                      cx="23"
                      cy="17"
                      rx="10"
                      ry="6"
                      fill="rgba(59, 130, 246, 0.2)"
                      stroke="#93C5FD"
                      strokeWidth="1.4"
                      animate={{ y: [0, -1.5, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.g
                      animate={{ y: [-1, 1.5, -1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ellipse cx="17" cy="22" rx="10" ry="6" fill="url(#bentoCoinGrad)" stroke="#DBEAFE" strokeWidth="1.5" />
                      <path d="M7 22V27C7 30.3 11.5 33 17 33C22.5 33 27 30.3 27 27V22" fill="url(#bentoCoinGrad)" stroke="#DBEAFE" strokeWidth="1.5" />
                      <text x="17" y="24" fontSize="6" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">$</text>
                    </motion.g>
                  </motion.svg>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-blue-400 font-mono mb-1">
                  05 — SAVE THOUSANDS OF DOLLARS
                </div>
                <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  Save $5,000–$10,000+ On Agency Builds
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed">
                  Create a high-converting, animated professional website without the traditional agency design and development cost. Full ownership with zero lock-in.
                </p>
              </div>

              <div className="relative z-10 shrink-0 flex flex-col sm:items-end gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/[0.08] [transform:translateZ(25px)]">
                <span className="text-3xl sm:text-4xl font-black text-blue-400 tracking-tight">$0 Fee</span>
                <span className="text-xs font-semibold text-gray-400">Generate & Preview Free</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* Animated FAQ Section */}
      <section className="mt-10 py-16 border-t border-[var(--border-strong)] relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span>💡</span>
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--text-strong)]">
              Everything You <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Need to Know</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3 max-w-xl mx-auto">
              Got questions about WebMake AI? Here are answers to common questions about building, customizing, and publishing your dream site.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What time it takes to design and publish the website?",
                a: "You can generate a fully functional, interactive 3D website in under 60 seconds. Once generated, customize any element live and publish it immediately to a custom .digifox.world subdomain with automated SSL security."
              },
              {
                q: "Can I edit text, images, and brand details directly?",
                a: "Yes! Click directly on any text heading, description, or image in the live preview to edit it inline. You can customize fonts, colors, letter spacing, alignments, and animations with instant real-time feedback."
              },
              {
                q: "Can I connect my WhatsApp number for instant leads?",
                a: "Absolutely. With our built-in WhatsApp integration, you can place a customizable floating chat button on your website. Visitors can message you with one tap, sending pre-filled lead inquiries straight to your phone."
              },
              {
                q: "Are the generated websites mobile-friendly and fast?",
                a: "Every template is 100% responsive and built for ultra-fast performance. Layouts adapt fluidly to desktops, tablets, and phones, complete with high-performance CSS and optimized animations."
              },
              {
                q: "Do I need any coding or design experience?",
                a: "None at all! Simply describe your business or select one of our curated 3D or 2D templates. The AI crafts your layouts, copy, animations, and color schemes automatically."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-[var(--bg-surface)] border-blue-500/50 shadow-[0_8px_25px_rgba(59,130,246,0.1)]' 
                      : 'bg-[var(--bg-surface)]/60 border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-[var(--text-strong)] flex items-center gap-3">
                      <span className="text-xs font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                        0{idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`p-1.5 rounded-full flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-[var(--text-secondary)]'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <WebMakeFooter />
    </main>
  );
};
