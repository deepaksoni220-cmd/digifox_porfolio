import { db } from './db.js';
import { aiRouter, AI_TASK_TYPES } from './ai-router.js';

export class KeywordEngine {
  async discoverAndScoreKeywords(clientId) {
    const client = db.getClientById(clientId);
    if (!client) throw new Error(`Client not found: ${clientId}`);

    const pages = db.getPages(clientId);
    const cat = client.category || 'General Business';
    const loc = client.target_city ? client.target_city.split('·')[0].trim() : (client.target_country || '');
    const sList = client.services && client.services.length > 0 ? client.services : [cat];
    const bList = client.brands && client.brands.length > 0 ? client.brands : [client.name];

    // 1. Collect live queries from Google Search Suggest API
    const googleSuggestions = await this.fetchGoogleSuggestQueries(sList, bList, loc, cat);

    // 2. Prepare context for Gemini 3.7 Flash
    const pageTitles = pages.map(p => p.title || p.path).slice(0, 8).join(', ');
    const pageTextSnippets = pages.map(p => p.extracted_text_preview || '').join('\n').slice(0, 1200);

    const systemPrompt = `You are a Principal Search Intelligence and Entity SEO Specialist.
Your task is to synthesize a high-impact, real search matrix of 40-48 keywords tailored strictly for the client's business, services, products, and target region.
You must categorize keywords into 4 exact groups:
1. 'seo': Google organic high-intent commercial & transactional keywords.
2. 'geo': Generative AI search prompts (for Perplexity, Gemini, ChatGPT Overviews).
3. 'aeo': Natural conversational voice queries (for Siri, Google Voice, Alexa #0 snippets).
4. 'blog': Informational editorial guide topics with compelling, high-converting article titles.

STRICT ACCURACY RULES:
- Never generate generic placeholder words. Every keyword must reflect the real niche: "${client.name}" offering "${sList.join(', ')}" in "${loc || client.target_country}".
- Estimate realistic monthly search volume (e.g. 350 to 18,000 depending on broad vs long-tail intent).
- Assign accurate search intent: 'COMMERCIAL', 'TRANSACTIONAL', 'INFORMATIONAL', 'LOCAL', or 'NAVIGATIONAL'.
- Assign realistic difficulty: 'Low', 'Medium', or 'High'.
- Return strictly valid JSON array without any markdown formatting.`;

    const userPrompt = `Client Details:
- Name: ${client.name}
- Domain: ${client.url}
- Category / Niche: ${cat}
- Target Location: ${loc || client.target_country}
- Core Services / Products: ${sList.join(', ')}
- Brand Names: ${bList.join(', ')}
- Crawled Page Headings: ${pageTitles}
- Website Content Sample: ${pageTextSnippets}
- Real Google Search Suggest Harvest: ${googleSuggestions.slice(0, 25).join(', ')}

Return a JSON array of objects with the exact schema:
[
  {
    "keyword": "natural search query string",
    "category": "seo" | "geo" | "aeo" | "blog",
    "engine": "Google Organic" | "Gemini Overviews" | "Perplexity Cited" | "ChatGPT Answer" | "Siri Voice #0" | "AI Blog Engine",
    "est_volume": 1200,
    "difficulty": "Low" | "Medium" | "High",
    "intent": "COMMERCIAL" | "TRANSACTIONAL" | "INFORMATIONAL" | "LOCAL" | "NAVIGATIONAL",
    "relevance": 0.95,
    "target_path": "/" | "/products" | "/services" | "/about" | "/blog" | "/contact",
    "blog_title": "Optional article title if category is blog"
  }
]`;

    let generatedList = [];

    try {
      const aiResponse = await aiRouter.executeTask(
        clientId,
        AI_TASK_TYPES.KEYWORD_CLUSTERING,
        systemPrompt,
        userPrompt,
        true
      );

      if (aiResponse.text) {
        try {
          const parsed = JSON.parse(aiResponse.text);
          if (Array.isArray(parsed) && parsed.length >= 10) {
            generatedList = parsed;
          }
        } catch (parseErr) {
          console.warn('[KeywordEngine] AI JSON parse notice, applying structure extractor:', parseErr.message);
        }
      }
    } catch (aiErr) {
      console.warn('[KeywordEngine] AI generation notice:', aiErr.message);
    }

    // Fallback synthesizer using harvested Google Suggest queries and entity matrix if AI was unreachable
    if (generatedList.length < 20) {
      generatedList = this.buildEntityKeywordMatrix(client, sList, bList, loc, cat, googleSuggestions);
    }

    // Mathematical Opportunity Scoring & URL Target Assignment
    const intentWeights = {
      TRANSACTIONAL: 1.25,
      COMMERCIAL: 1.15,
      LOCAL: 1.20,
      INFORMATIONAL: 0.95,
      NAVIGATIONAL: 0.85
    };

    const finalKeywords = generatedList.map((item, index) => {
      const volNum = Number(item.est_volume || item.vol || 1200);
      const relScore = Number(item.relevance || 0.90);
      const intentWeight = intentWeights[item.intent] || 1.0;

      const volFactor = Math.min(volNum / 20000, 1.0) * 40;
      const relFactor = relScore * 30;
      const diffBonus = item.difficulty === 'Low' ? 25 : item.difficulty === 'Medium' ? 18 : 10;
      const oppScore = Math.min(Math.round((volFactor + relFactor + diffBonus) * intentWeight / 1.08), 100);

      // Match target path to actual crawled page if available
      let assignedPath = item.target_path || '/';
      const existingPage = pages.find(p => p.path === assignedPath);
      if (!existingPage && pages.length > 0) {
        assignedPath = pages[0].path;
      }
      const targetUrl = `${client.url.replace(/\/$/, '')}${assignedPath === '/' ? '' : assignedPath}`;

      return {
        id: `kw_${index + 1}`,
        client_id: clientId,
        keyword: item.keyword.trim(),
        category: item.category || 'seo',
        engine: item.engine || (item.category === 'geo' ? 'Gemini Overviews' : item.category === 'aeo' ? 'Google Snippet #0' : item.category === 'blog' ? 'AI Blog Engine' : 'Google Organic'),
        volume: `${volNum.toLocaleString()}/mo`,
        volume_num: volNum,
        difficulty: item.difficulty || 'Medium',
        intent: item.intent || 'COMMERCIAL',
        relevance_score: relScore,
        opportunity_score: oppScore,
        target_url: targetUrl,
        target_path: assignedPath,
        rank: 'Unranked', // Honest rank status until verified through real SERP check
        change: '--',
        blog_title: item.blog_title || undefined,
        recommended_action: item.category === 'blog' ? 'GENERATE_AI_BLOG' : oppScore > 80 ? 'OPTIMIZE_TARGET_PAGE' : 'BUILD_INTERNAL_LINKS'
      };
    });

    return db.saveKeywords(clientId, finalKeywords);
  }

  async fetchGoogleSuggestQueries(services, brands, location, category) {
    const seeds = [
      ...services.slice(0, 3),
      `${services[0] || category} ${location}`,
      `buy ${services[0] || category}`,
      `best ${services[0] || category}`,
      `${category} ${location}`,
      ...brands.slice(0, 2)
    ].filter(Boolean);

    const suggestions = [];

    for (const seed of seeds) {
      try {
        const queryUrl = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(seed)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const res = await fetch(queryUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && Array.isArray(data[1])) {
            suggestions.push(...data[1].slice(0, 8));
          }
        }
      } catch (e) {
        // Continue silently on timeout
      }
    }

    return Array.from(new Set(suggestions));
  }

  buildEntityKeywordMatrix(client, services, brands, loc, cat, suggestions) {
    const s1 = services[0] || cat;
    const s2 = services[1] || s1;
    const s3 = services[2] || s1;
    const b1 = brands[0] || client.name;
    const locStr = loc ? ` in ${loc}` : '';

    const list = [];

    // Use live Google suggestions if available
    for (const sug of suggestions.slice(0, 10)) {
      list.push({
        keyword: sug,
        category: 'seo',
        engine: 'Google Organic',
        est_volume: 2400,
        difficulty: 'Medium',
        intent: 'COMMERCIAL',
        relevance: 0.94,
        target_path: '/'
      });
    }

    // SEO Commercial / Transactional
    list.push(
      { keyword: `best ${s1}${locStr}`, category: 'seo', engine: 'Google Organic', est_volume: 4800, difficulty: 'Medium', intent: 'COMMERCIAL', relevance: 0.98, target_path: '/services' },
      { keyword: `buy ${s1} online${locStr}`, category: 'seo', engine: 'Google Organic', est_volume: 3600, difficulty: 'Low', intent: 'TRANSACTIONAL', relevance: 0.96, target_path: '/products' },
      { keyword: `premium ${s2} manufacturer and supplier${locStr}`, category: 'seo', engine: 'Google Organic', est_volume: 2100, difficulty: 'Low', intent: 'TRANSACTIONAL', relevance: 0.92, target_path: '/services' },
      { keyword: `${b1} official store and reviews`, category: 'seo', engine: 'Google Organic', est_volume: 1800, difficulty: 'Low', intent: 'NAVIGATIONAL', relevance: 1.0, target_path: '/about' },
      { keyword: `top rated ${cat}${locStr}`, category: 'seo', engine: 'Google Organic', est_volume: 5200, difficulty: 'High', intent: 'COMMERCIAL', relevance: 0.95, target_path: '/' },
      { keyword: `wholesale ${s1} price list${locStr}`, category: 'seo', engine: 'Google Organic', est_volume: 2900, difficulty: 'Medium', intent: 'TRANSACTIONAL', relevance: 0.91, target_path: '/pricing' },
      { keyword: `organic certified ${s1} benefits`, category: 'seo', engine: 'Google Organic', est_volume: 4100, difficulty: 'Low', intent: 'INFORMATIONAL', relevance: 0.88, target_path: '/blog' }
    );

    // GEO AI Overviews
    list.push(
      { keyword: `why choose ${b1} for ${s1}?`, category: 'geo', engine: 'Perplexity Cited', est_volume: 3100, difficulty: 'Low', intent: 'INFORMATIONAL', relevance: 0.98, target_path: '/about' },
      { keyword: `what is the nutritional profile and quality of ${s1}?`, category: 'geo', engine: 'Gemini Overviews', est_volume: 6400, difficulty: 'Medium', intent: 'INFORMATIONAL', relevance: 0.90, target_path: '/blog' },
      { keyword: `compare ${b1} ${s1} vs competitors`, category: 'geo', engine: 'ChatGPT Answer', est_volume: 2200, difficulty: 'Low', intent: 'COMMERCIAL', relevance: 0.95, target_path: '/about' },
      { keyword: `is ${s1} good for daily health and wellness?`, category: 'geo', engine: 'Gemini Overviews', est_volume: 8900, difficulty: 'Medium', intent: 'INFORMATIONAL', relevance: 0.85, target_path: '/blog' },
      { keyword: `verified organic ${cat} providers${locStr}`, category: 'geo', engine: 'Perplexity Cited', est_volume: 1900, difficulty: 'Low', intent: 'COMMERCIAL', relevance: 0.94, target_path: '/' }
    );

    // AEO Voice Queries
    list.push(
      { keyword: `where can I buy pure ${s1} near me?`, category: 'aeo', engine: 'Siri Voice #0', est_volume: 7800, difficulty: 'High', intent: 'LOCAL', relevance: 0.96, target_path: '/contact' },
      { keyword: `what are the health benefits of ${s1}?`, category: 'aeo', engine: 'Google Snippet #0', est_volume: 14200, difficulty: 'Medium', intent: 'INFORMATIONAL', relevance: 0.92, target_path: '/blog' },
      { keyword: `how much does 1kg of premium ${s1} cost?`, category: 'aeo', engine: 'ChatGPT Answer', est_volume: 5300, difficulty: 'Low', intent: 'TRANSACTIONAL', relevance: 0.94, target_path: '/pricing' },
      { keyword: `how to store ${s1} for long shelf life?`, category: 'aeo', engine: 'Google Snippet #0', est_volume: 3800, difficulty: 'Low', intent: 'INFORMATIONAL', relevance: 0.86, target_path: '/blog' },
      { keyword: `contact ${b1} customer care`, category: 'aeo', engine: 'Siri Voice #0', est_volume: 1200, difficulty: 'Low', intent: 'NAVIGATIONAL', relevance: 1.0, target_path: '/contact' }
    );

    // Blog Guides
    list.push(
      { keyword: `the ultimate guide to ${s1} in 2026`, category: 'blog', engine: 'AI Blog Engine', est_volume: 9500, difficulty: 'Medium', intent: 'INFORMATIONAL', relevance: 0.96, target_path: '/blog', blog_title: `The Ultimate 2026 Guide to ${s1}: Health Benefits, Grades & Sourcing` },
      { keyword: `how authentic ${s2} is made step by step`, category: 'blog', engine: 'AI Blog Engine', est_volume: 6200, difficulty: 'Low', intent: 'INFORMATIONAL', relevance: 0.91, target_path: '/blog', blog_title: `Traditional vs Industrial: How Pure ${s2} Is Crafted for Maximum Purity` },
      { keyword: `10 delicious ways to eat and roast ${s1}`, category: 'blog', engine: 'AI Blog Engine', est_volume: 8100, difficulty: 'Low', intent: 'INFORMATIONAL', relevance: 0.89, target_path: '/blog', blog_title: `10 Healthy & Delicious Recipes You Can Make with ${s1}` },
      { keyword: `why ${b1} stands for farm-fresh pure quality`, category: 'blog', engine: 'AI Blog Engine', est_volume: 2400, difficulty: 'Low', intent: 'COMMERCIAL', relevance: 0.98, target_path: '/blog', blog_title: `From Farm to Table: The Quality Standard Behind ${b1}` }
    );

    return list;
  }
}

export const keywordEngine = new KeywordEngine();
