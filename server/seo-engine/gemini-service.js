import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load Gemini API key securely from server environment
function getGeminiApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  if (process.env.VITE_GEMINI_API_KEY) return process.env.VITE_GEMINI_API_KEY;

  try {
    const envLocalPath = path.join(__dirname, '../../.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf-8');
      const match = content.match(/GEMINI_API_KEY=["']?([^"'\n]+)["']?/);
      if (match && match[1]) return match[1];
    }
  } catch (e) {}

  try {
    const envPath = path.join(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/GEMINI_API_KEY=["']?([^"'\n]+)["']?/);
      if (match && match[1]) return match[1];
    }
  } catch (e) {}

  return '';
}

// Token pricing for cost tracking
const MODEL_PRICING = {
  'gemini-3.7-flash': { input: 0.15, output: 0.60 },
  'gemini-2.5-flash': { input: 0.15, output: 0.60 },
  'gemini-2.0-flash': { input: 0.10, output: 0.40 },
  'gemini-1.5-flash': { input: 0.075, output: 0.30 }
};

export class GeminiService {
  constructor() {
    this.primaryModel = 'gemini-3.6-flash';
    this.fallbackModels = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-pro'];
  }

  getApiKey() {
    return getGeminiApiKey();
  }

  cleanJsonString(raw) {
    if (!raw) return '';
    let cleaned = raw.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return cleaned.trim();
  }

  // Core execution engine with retry and fallback
  async callGemini(clientId, systemPrompt, userPrompt, jsonOutput = true, maxTokens = 4096) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Gemini API key is not configured on the server.');
    }

    // Budget guard
    const client = db.getClientById(clientId);
    if (client) {
      const currentSpend = client.current_ai_spend || 0;
      const budget = client.monthly_ai_budget || 50.0;
      if (currentSpend >= budget) {
        throw new Error(`Monthly AI automation budget of $${budget} reached for client ${client.name}.`);
      }
    }

    const estInputTokens = Math.ceil((systemPrompt.length + userPrompt.length) / 4);
    const candidateModels = [this.primaryModel, ...this.fallbackModels];

    for (const model of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 45000);

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal,
              body: JSON.stringify({
                contents: [
                  {
                    role: 'user',
                    parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
                  }
                ],
                generationConfig: {
                  temperature: 0.2,
                  maxOutputTokens: maxTokens,
                  responseMimeType: jsonOutput ? 'application/json' : 'text/plain'
                }
              })
            }
          );

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const outTokens = data.usageMetadata?.candidatesTokenCount || Math.ceil(rawText.length / 4);
            const inTokens = data.usageMetadata?.promptTokenCount || estInputTokens;

            const pricing = MODEL_PRICING[model] || MODEL_PRICING['gemini-3.7-flash'];
            const cost = Number(((inTokens / 1_000_000) * pricing.input + (outTokens / 1_000_000) * pricing.output).toFixed(5));

            db.logAiUsage(clientId, 'GEMINI_CALL', model, inTokens, outTokens, cost);

            return {
              text: jsonOutput ? this.cleanJsonString(rawText) : rawText,
              model,
              inputTokens: inTokens,
              outputTokens: outTokens,
              cost
            };
          } else {
            const errText = await response.text().catch(() => '');
            console.warn(`[GeminiService] ${model} attempt ${attempt} returned HTTP ${response.status}: ${errText.slice(0, 100)}`);
            if (response.status >= 400 && response.status < 500) break; // Switch candidate model or fallback immediately
            if (attempt === 1) await new Promise(r => setTimeout(r, 500));
          }
        } catch (err) {
          console.warn(`[GeminiService] ${model} error on attempt ${attempt}:`, err.message);
          if (attempt === 1) await new Promise(r => setTimeout(r, 500));
        }
      }
    }

    throw new Error('All Gemini model candidates encountered rate limits or connection errors.');
  }

  // 1. BUSINESS UNDERSTANDING
  async understandBusiness(clientId, websiteContent, clientInfo) {
    const systemPrompt = `You are a Principal Search Entity & Knowledge Graph Specialist.
Your task is to analyze real website content and business parameters to construct an accurate semantic entity profile.
STRICT ACCURACY RULES:
- Never invent facts, certifications, awards, or fake locations.
- If information is not explicitly present or strongly evidenced in the content, mark it as "unknown".
- Return valid JSON matching the exact schema below without markdown formatting.`;

    const userPrompt = `Website Content & Metadata:
- Client Name: ${clientInfo.name}
- Domain: ${clientInfo.url}
- Category: ${clientInfo.category || 'General'}
- Target Country: ${clientInfo.target_country || 'Global'}
- Target City: ${clientInfo.target_city || 'Not specified'}
- Declared Services: ${(clientInfo.services || []).join(', ')}
- Crawled Text Preview:
${websiteContent.slice(0, 3000)}

Return JSON schema:
{
  "business_name": "string",
  "industry": "string",
  "services": ["service1", "service2"],
  "products": ["product1", "product2"],
  "locations": ["city1", "region1"],
  "target_audience": "string",
  "business_entities": ["entity1", "entity2"],
  "service_entities": ["entity1", "entity2"],
  "product_entities": ["entity1", "entity2"],
  "local_entities": ["entity1", "entity2"],
  "brand_terms": ["term1", "term2"]
}`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, true);
    return JSON.parse(res.text);
  }

  // 2. KEYWORD DISCOVERY & CLUSTERING
  async discoverAndScoreKeywords(clientId, businessProfile, googleSuggestions, serpResults) {
    const systemPrompt = `You are an Elite Search Strategist & Keyword Intelligence Engine.
Synthesize 15-20 high-impact, real search opportunities clustered across 5 search intents:
'INFORMATIONAL', 'COMMERCIAL', 'TRANSACTIONAL', 'NAVIGATIONAL', and 'LOCAL'.
Evaluate difficulty ('Low', 'Medium', 'High'), realistic search volume, and compute an opportunity score (1-100).
Categorize into: 'seo' (Google Organic), 'geo' (AI Search Overviews), 'aeo' (Voice & Direct Snippets), or 'blog' (Editorial topics).
Return strictly valid JSON array.`;

    const userPrompt = `Business Entity Profile:
${JSON.stringify(businessProfile, null, 2)}

Live Google Suggest Queries:
${googleSuggestions.slice(0, 20).join(', ')}

Live SERP Market Landscape:
${JSON.stringify((serpResults || []).slice(0, 5), null, 2)}

Return JSON array with objects matching:
[
  {
    "keyword": "string",
    "intent": "INFORMATIONAL" | "COMMERCIAL" | "TRANSACTIONAL" | "NAVIGATIONAL" | "LOCAL",
    "topic": "string",
    "cluster": "string",
    "category": "seo" | "geo" | "aeo" | "blog",
    "engine": "Google Organic" | "Gemini Overviews" | "Perplexity Cited" | "ChatGPT Answer" | "Google Snippet #0" | "AI Blog Engine",
    "location": "string",
    "relevance_score": 0.95,
    "commercial_value": 0.90,
    "difficulty": "Low" | "Medium" | "High",
    "search_volume": 3200,
    "serp_opportunity": "High",
    "opportunity_score": 88,
    "recommended_action": "OPTIMIZE_EXISTING_PAGE" | "CREATE_NEW_PAGE" | "CREATE_BLOG" | "MONITOR_ONLY",
    "target_path": "/" | "/products" | "/services" | "/about" | "/blog" | "/contact",
    "blog_title": "Optional descriptive article title"
  }
]`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, true);
    return JSON.parse(res.text);
  }

  // 3. KEYWORD SELECTION & ANTI-CANNIBALIZATION
  async selectAndMapKeywords(clientId, keywords, pages) {
    const systemPrompt = `You are a Principal Information Architect.
Evaluate keyword opportunities, select the top 10-15 most valuable keywords, and map each to the single most relevant page.
STRICT ANTI-CANNIBALIZATION: Never assign the same primary keyword to multiple pages. Each page must own a distinct search intent.
Return strictly valid JSON array.`;

    const userPrompt = `Available Pages:
${pages.map(p => `- ${p.path} (Title: ${p.title || 'Untitled'})`).join('\n')}

Candidate Keywords:
${JSON.stringify(keywords.slice(0, 25), null, 2)}

Return JSON:
[
  {
    "keyword": "string",
    "target_page_path": "string",
    "action": "OPTIMIZE_EXISTING_PAGE" | "CREATE_NEW_PAGE" | "CREATE_BLOG" | "MONITOR_ONLY",
    "justification": "string"
  }
]`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, true);
    return JSON.parse(res.text);
  }

  // 4. SERP & COMPETITOR ANALYSIS
  async analyzeSerpCompetitors(clientId, keyword, serpData) {
    const systemPrompt = `You are a Principal Technical SERP & Competitive Intelligence Analyst.
Analyze live Google organic results. Extract top-ranking topics, headings, search intent, People Also Ask questions, competitor strengths, and content gaps.
Never fabricate SERP results. If data is missing, note it explicitly.
Return valid JSON.`;

    const userPrompt = `Target Keyword: "${keyword}"
Live SerpApi Organic Results:
${JSON.stringify(serpData.organic_results || [], null, 2)}

People Also Ask / Questions:
${JSON.stringify(serpData.people_also_ask || [], null, 2)}

Return JSON schema:
{
  "search_intent": "string",
  "top_competitors": [
    { "domain": "string", "title": "string", "strengths": "string" }
  ],
  "common_topics_covered": ["topic1", "topic2"],
  "content_gaps": ["gap1", "gap2"],
  "paa_questions": ["question1", "question2"],
  "serp_features_present": ["Featured Snippet", "Local Pack", "People Also Ask"]
}`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, true);
    return JSON.parse(res.text);
  }

  // 5. EXISTING PAGE OPTIMIZATION (BEFORE / AFTER DIFFS)
  async generatePageOptimization(clientId, pageData, targetKeyword, serpAnalysis, businessProfile) {
    const systemPrompt = `You are a Senior Technical & On-Page SEO Architect.
Analyze the target page and generate targeted, high-impact improvements.
Prefer surgical, high-confidence changes (Title, Meta Description, H1/H2, Image Alt, Schema JSON-LD, Internal Links).
Do NOT rewrite the entire page content unless completely necessary.
Provide realistic confidence (80-99%) and clear reasons.
Return strictly valid JSON.`;

    const userPrompt = `Page Details:
- URL: ${pageData.url}
- Current Title: ${pageData.title || '(Empty)'}
- Current Meta Description: ${pageData.meta_description || '(Empty)'}
- Current H1: ${pageData.h1 || '(None)'}
- Extracted Content Preview: ${pageData.extracted_text_preview || 'None'}
- Images Missing Alt: ${pageData.missing_alt_count || 0}

Target Keyword: "${targetKeyword}"
SERP Insights & Gaps:
${JSON.stringify(serpAnalysis || {}, null, 2)}

Business Profile:
${JSON.stringify(businessProfile || {}, null, 2)}

Return JSON schema:
{
  "optimized_title": "Unique, high-CTR Title Tag (50-60 chars) | Brand",
  "optimized_meta_description": "150-160 char compelling meta description with value proposition and CTA",
  "recommended_h1": "Single clear semantic H1 containing target keyword naturally",
  "recommended_h2s": ["H2 section 1", "H2 section 2", "H2 FAQ section"],
  "image_alt_recommendations": [
    { "context": "Hero/Product image", "recommended_alt": "Descriptive, natural ALT text without keyword stuffing" }
  ],
  "schema_jsonld": {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${businessProfile.business_name || 'Business'}"
  },
  "internal_link_recommendations": [
    { "target_url": "/", "anchor_text": "Explore our complete range", "reason": "Anchor authority distribution" }
  ],
  "changes": [
    {
      "field": "title",
      "before": "${pageData.title || ''}",
      "after": "Optimized Title Example",
      "reason": "Integrate primary commercial keyword",
      "confidence": 98,
      "priority": "HIGH"
    }
  ]
}`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, true);
    return JSON.parse(res.text);
  }

  // 6. MULTI-STAGE BLOG GENERATION
  async generateComprehensiveBlog(clientId, keyword, topic, businessProfile, serpGaps) {
    const systemPrompt = `You are a Principal Search Intelligence & Entity SEO Copywriter, Generative Engine Optimization (GEO) Strategist, and Answer Engine (AEO) Specialist.
Your mission is to write an original, deeply informative, 1,800 to 2,400-word authoritative guide in clean Markdown.

STRICT EDITORIAL MANDATES:
1. NO GENERIC JARGON: Zero corporate filler (e.g. NEVER use "in today's fast-paced world", "vital differentiator", or "synergistic methodologies"). Ground every paragraph in the client's actual niche, ingredients, farming methods, standards, or technical facts.
2. SEO & ENTITY MAPPING: Natural 1.5-2% keyword density for "${keyword}". Seamlessly integrate related products (${(businessProfile.products || businessProfile.services || []).join(', ')}).
3. GEO (AI OVERVIEWS): Include a comparative structured markdown table and clear factual metrics that ChatGPT, Perplexity, and Gemini will cite.
4. AEO (VOICE & FEATURED SNIPPETS): Include 4-5 high-intent FAQ questions at the end. For each question, provide an immediate 35-45 word direct answer first, followed by supporting bullet points.
5. FORMATTING: H1 title, clean H2/H3 hierarchy, bullet points, recipe/usage or execution steps, and natural link invitation to ${businessProfile.business_name}.`;

    const userPrompt = `Client Entity Context:
- Brand Name: ${businessProfile.business_name}
- Industry/Niche: ${businessProfile.industry}
- Services/Products: ${(businessProfile.services || []).join(', ')}
- Target Location: ${(businessProfile.locations || []).join(', ') || 'India'}
- Target Keyword: ${keyword}
- Proposed Title: ${topic || `The Complete 2026 Guide to ${keyword}`}
- Competitor Content Gaps to address: ${(serpGaps || []).join(', ')}

Write the full Markdown article now:`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, false, 8192);
    return res.text;
  }

  // 7. FACT-CHECKING VALIDATOR
  async factCheckArticle(clientId, articleContent, businessProfile) {
    const systemPrompt = `You are a Senior Fact-Checking & Trust Verification Auditor.
Review the article and classify factual claims into:
- VERIFIED_FROM_WEBSITE: Claims directly supported by business facts.
- VERIFIED_FROM_RESEARCH: Verified industry, nutritional, or standard factual knowledge.
- NEEDS_SOURCE: Claims that require reference or verification.
- UNSUPPORTED: Fabricated or unverifiable claims.
Return valid JSON.`;

    const userPrompt = `Business Facts:
${JSON.stringify(businessProfile, null, 2)}

Article Content:
${articleContent.slice(0, 4000)}

Return JSON:
{
  "total_claims_checked": 12,
  "verified_count": 12,
  "unsupported_count": 0,
  "claims": [
    { "claim": "string", "classification": "VERIFIED_FROM_WEBSITE", "note": "string" }
  ],
  "passed": true
}`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, true);
    return JSON.parse(res.text);
  }

  // 8. QUALITY & READINESS VALIDATOR
  async validateContentQuality(clientId, articleContent, keyword) {
    const systemPrompt = `You are an Independent Quality & Search Intelligence Auditor.
Evaluate the content across SEO, GEO, AEO, readability, factual consistency, and heading structure.
Compute strict scores (1-100) and return an overall status: 'PASS', 'WARNING', or 'FAIL'.
Return valid JSON.`;

    const userPrompt = `Target Keyword: "${keyword}"
Article Content:
${articleContent.slice(0, 4000)}

Return JSON:
{
  "seo_score": 96,
  "aeo_score": 94,
  "geo_score": 92,
  "content_quality_score": 95,
  "status": "PASS",
  "word_count": 1950,
  "strengths": ["Clear heading hierarchy", "Direct snippet answers in FAQ", "Accurate entity matrix"],
  "improvements": ["Optional additional internal link"]
}`;

    const res = await this.callGemini(clientId, systemPrompt, userPrompt, true);
    return JSON.parse(res.text);
  }
}

export const geminiService = new GeminiService();
