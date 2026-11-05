/**
 * Digifox Gemini AI Lead Generation Engine Service
 *
 * Exclusively powered by Google Gemini Models:
 * - gemini-3.5-flash-lite: Bulk extraction, classification, fast qualification
 * - gemini-3.8-flash: Main AI operations, audit reasoning, demo matching, personalized outreach
 * - gemini-3.1-pro: Deep strategic research & complex website diagnostics
 */

export interface LeadInput {
  businessName: string;
  websiteUrl?: string;
  industryOrNiche: string;
  location?: string;
  notesOrPainPoints?: string;
}

export interface WebsiteAuditResult {
  currentIssues: string[];
  visualAppealScore: number; // 0-100
  mobileResponsiveness: string;
  conversionBottlenecks: string[];
  lcpEstimate: string;
}

export interface MatchedDemo {
  title: string;
  category: string;
  demoUrl: string;
  previewImage: string;
  whyItFits: string;
}

export interface QualifiedLead {
  id: string;
  createdAt: string;
  businessName: string;
  industry: string;
  location: string;
  websiteUrl: string;
  leadScore: number; // 0 - 100
  priorityTier: 'VIP High Opportunity' | 'Strong Fit' | 'Nurture' | 'Disqualified';
  summary: string;
  painPoints: string[];
  matchedDemo: MatchedDemo;
  audit: WebsiteAuditResult;
  personalizedOutreachEmail: {
    subject: string;
    hook: string;
    body: string;
    callToAction: string;
    proposedAngle: string;
  };
  modelUsed: string;
}

const AVAILABLE_DEMOS = [
  {
    title: "SkyElite Luxury Aviation",
    category: "3D Animated & Booking Experience",
    demoUrl: "/templates/skyelite/index.html",
    previewImage: "/templates/thumbnails/hero-skyelite-preview-DHaZIgUv.gif",
    fitFor: ["Aviation", "Luxury Travel", "Private Jet", "High-End Concierge", "Charter Services"]
  },
  {
    title: "Blacklane Style Chauffeur & Limousine",
    category: "Premium Fleet Booking Portal",
    demoUrl: "/templates/blacklane/index.html",
    previewImage: "/blacklane-cover.jpg",
    fitFor: ["Luxury Transportation", "Car Rental", "Chauffeur", "Limousine", "Automotive", "Concierge"]
  },
  {
    title: "Samarth Cactus & Exotic Plants",
    category: "High-Converting Shopify E-Commerce",
    demoUrl: "https://www.samarthcactusnursery.com/",
    previewImage: "/image-1783146270623-638183035.png",
    fitFor: ["E-Commerce", "Nursery", "Plants", "Retail", "D2C Brands", "Shopify Store"]
  },
  {
    title: "Biska Fashion Studio",
    category: "Modern Apparel & Streetwear Store",
    demoUrl: "/templates/biska/index.html",
    previewImage: "/image-1783080085858-787642334.jpg",
    fitFor: ["Fashion", "Apparel", "Clothing", "Streetwear", "Boutique", "Jewelry"]
  },
  {
    title: "Intik Gourmet Burgers & Dining",
    category: "Interactive Restaurant & Food Ordering",
    demoUrl: "/templates/intikburgers/index.html",
    previewImage: "/image-1783080041291-918187806.png",
    fitFor: ["Restaurant", "Cafe", "Gourmet Food", "Hospitality", "Bar", "Cloud Kitchen"]
  },
  {
    title: "Motion Sneakers 3D Showcase",
    category: "Interactive 3D Product Experience",
    demoUrl: "/templates/shoes/index.html",
    previewImage: "/image-1783080020266-402606108.png",
    fitFor: ["Footwear", "Sports", "Athletic Brands", "Gadgets", "Consumer Tech"]
  },
  {
    title: "Nova Creative Portfolio",
    category: "3D Creative Digital Portfolio",
    demoUrl: "/templates/digpro/index.html",
    previewImage: "/image-1783080075680-896100451.png",
    fitFor: ["Creative Agency", "Designers", "Architects", "Coaches", "Consultants", "Photographers"]
  }
];

export async function processLeadWithGemini(
  lead: LeadInput,
  workload: 'fast' | 'standard' | 'deep' = 'standard'
): Promise<QualifiedLead> {
  const GEMINI_API_KEY =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
    (typeof globalThis !== 'undefined' && (globalThis as any).process?.env?.VITE_GEMINI_API_KEY) ||
    (typeof globalThis !== 'undefined' && (globalThis as any).process?.env?.GEMINI_API_KEY) ||
    '';

  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API Key. Please verify VITE_GEMINI_API_KEY in your environment.");
  }

  // Workload Model Mapping strictly using the user-approved Gemini-only architecture
  let modelName = 'gemini-3.8-flash';
  if (workload === 'fast') {
    modelName = 'gemini-3.5-flash-lite';
  } else if (workload === 'deep') {
    modelName = 'gemini-3.1-pro';
  }

  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

  const SYSTEM_INSTRUCTION = `You are the Digifox AI Lead Qualification & Growth Engine.
Digifox (https://digifox.world) is an elite agency specializing in:
1. 3D WebGL / Three.js websites that increase visitor time-on-page by 68%.
2. High-converting Shopify Plus stores scaling D2C sales by 3.8x - 4.2x.
3. Custom WordPress & web apps with sub-1.2s Core Web Vitals.
4. Server-Side CAPI performance marketing for Meta/Google Ads.

Your job is to analyze prospective client leads, score their revenue opportunity, diagnose their current web/marketing gaps, select the best matching Digifox demo showcase, and draft an ultra-compelling personalized outreach email that cites specific ROI angles.

Available Digifox Demo Showcases:
${JSON.stringify(AVAILABLE_DEMOS, null, 2)}

Respond with STRICT JSON adhering to this schema:
{
  "leadScore": <number between 0 and 100>,
  "priorityTier": "VIP High Opportunity" | "Strong Fit" | "Nurture" | "Disqualified",
  "summary": "<2-3 sentence executive assessment of the lead>",
  "painPoints": ["<pain point 1>", "<pain point 2>", "<pain point 3>"],
  "matchedDemo": {
    "title": "<exact title from registry>",
    "category": "<category from registry>",
    "demoUrl": "<demoUrl from registry>",
    "previewImage": "<previewImage from registry>",
    "whyItFits": "<1-2 sentences on why this exact demo makes the prospect say 'I want my website to look like this'>"
  },
  "audit": {
    "currentIssues": ["<issue 1>", "<issue 2>"],
    "visualAppealScore": <number 0-100>,
    "mobileResponsiveness": "<Assessment e.g. Good, Poor, Critical>",
    "conversionBottlenecks": ["<bottleneck 1>", "<bottleneck 2>"],
    "lcpEstimate": "<estimated load speed e.g. 3.8s or Unknown>"
  },
  "personalizedOutreachEmail": {
    "subject": "<punchy subject line with high open-rate>",
    "hook": "<custom 1-sentence observation about their current setup>",
    "body": "<concise 3-4 sentence pitch emphasizing 3D/conversion lift, referencing the matched demo URL>",
    "callToAction": "<low-friction CTA e.g. free 10-minute 3D concept preview>",
    "proposedAngle": "<core selling thesis>"
  }
}`;

  const userPrompt = `Analyze this prospective lead:
Business Name: ${lead.businessName}
Website URL: ${lead.websiteUrl || 'Not provided'}
Industry / Niche: ${lead.industryOrNiche}
Location / Region: ${lead.location || 'Not specified'}
Client Notes / Identified Issues: ${lead.notesOrPainPoints || 'Looking to scale revenue and upgrade brand image'}`;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      generationConfig: {
        response_mime_type: "application/json",
        temperature: 0.3
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Fallback to gemini-2.5-flash / gemini-1.5-flash if preview model ID fails
    if (response.status === 404 || errorText.includes("not found")) {
      const FALLBACK_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const fallbackRes = await fetch(FALLBACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { response_mime_type: "application/json" }
        })
      });
      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        const rawText = fbData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const parsed = JSON.parse(rawText.replace(/```json/gi, '').replace(/```/g, '').trim());
        return {
          id: `lead_${Date.now()}`,
          createdAt: new Date().toISOString(),
          businessName: lead.businessName,
          industry: lead.industryOrNiche,
          location: lead.location || 'Global',
          websiteUrl: lead.websiteUrl || '',
          ...parsed,
          modelUsed: 'gemini-2.5-flash (fallback)'
        };
      }
    }
    throw new Error(`Gemini Lead Engine Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);

  return {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    businessName: lead.businessName,
    industry: lead.industryOrNiche,
    location: lead.location || 'Global',
    websiteUrl: lead.websiteUrl || '',
    ...parsed,
    modelUsed: modelName
  };
}
