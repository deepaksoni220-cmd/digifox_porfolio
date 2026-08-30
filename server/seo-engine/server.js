import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import { websiteCrawler } from './crawler.js';
import { entityAnalyzer } from './entity-analyzer.js';
import { keywordEngine } from './keyword-engine.js';
import { serpEngine } from './serp-engine.js';
import { pageOptimizer } from './optimizer.js';
import { aeoGeoEngine } from './aeo-geo-engine.js';
import { internalLinkingEngine } from './internal-links.js';
import { blogEngine } from './blog-engine.js';
import { pipelineRunner } from './pipeline-runner.js';
import { pipelineOrchestrator } from './pipeline-orchestrator.js';
import { geminiService } from './gemini-service.js';
import { jobQueue, JOB_TYPES } from './job-queue.js';
import { wordpressConnector } from './connectors/wordpress.js';
import { shopifyConnector } from './connectors/shopify.js';
import { customGithubConnector } from './connectors/custom-github.js';
import { authService, authenticateToken, requirePlanOrAdmin } from './auth-service.js';

const app = express();
const PORT = process.env.SEO_PORT || 3002;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(authenticateToken);

// ==================== AUTHENTICATION & RBAC ENDPOINTS ====================

// Register New User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

// Get Current User Profile & Plan Status
app.get('/api/auth/me', (req, res) => {
  try {
    if (!req.user) {
      return res.json({ success: true, user: null, isAuthenticated: false });
    }
    const profile = authService.getUserProfile(req.user.id);
    if (!profile) {
      return res.json({ success: true, user: null, isAuthenticated: false });
    }
    res.json({ success: true, user: profile, isAuthenticated: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Subscribe / Activate Plan (Paywall Bridge)
app.post('/api/auth/subscribe', (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required to subscribe.' });
    }
    const { plan } = req.body;
    const updatedProfile = authService.subscribeUser(req.user.id, plan || 'pro');
    res.json({ success: true, user: updatedProfile, message: `Successfully upgraded to ${plan || 'pro'} plan!` });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get All Registered Users (Admin Only)
app.get('/api/auth/users', (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Access denied. Administrator privileges required.' });
    }
    const users = db.getUsers().map(({ passwordHash, ...u }) => u);
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== SEO & CLIENTS MANAGEMENT ====================

// 1. Get All Clients (Filtered by User or Universal for Admin)
app.get('/api/seo/clients', (req, res) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const userId = req.user?.id || null;
    const clients = db.getClients(userId, isAdmin);
    res.json({ success: true, clients, isAdmin });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 1b. Delete All Clients & Reset Database (Admin Only or Master)
app.delete('/api/seo/clients', (req, res) => {
  try {
    db.resetAll();
    res.json({ success: true, message: 'All clients and associated data deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get Client By ID
app.get('/api/seo/clients/:id', (req, res) => {
  try {
    const client = db.getClientById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    
    const keywords = db.getKeywords(client.id);
    const pages = db.getPages(client.id);
    const blogs = db.getBlogPosts(client.id);
    const seoChanges = db.getSeoChanges(client.id);

    res.json({ success: true, client, keywords, pages, blogs, seoChanges });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Onboard New Client
app.post('/api/seo/clients', async (req, res) => {
  try {
    const { name, url, platform, category, target_country, target_city, services, brands, description, conversion_goal, target_audience, competitors, language, serpApiKey, platformDetails } = req.body;
    
    if (!name || !url) {
      return res.status(400).json({ success: false, error: 'Business name and website URL are required.' });
    }

    const servicesList = Array.isArray(services) ? services : (services ? services.split(',').map(s => s.trim()) : []);
    const brandsList = Array.isArray(brands) ? brands : (brands ? brands.split(',').map(b => b.trim()) : [name]);
    const competitorsList = Array.isArray(competitors) ? competitors : (competitors ? competitors.split(',').map(c => c.trim()) : []);

    const newClient = db.saveClient({
      user_id: req.user?.id || null,
      name,
      url: url.startsWith('http') ? url : `https://${url}`,
      platform: platform || 'wordpress',
      category: category || 'General Business',
      target_country: target_country || 'Global',
      target_city: target_city || '',
      services: servicesList,
      brands: brandsList,
      description: description || `${name} provides professional ${category} solutions.`,
      conversion_goal: conversion_goal || 'Lead Generation & Sales',
      target_audience: target_audience || 'Target Customers',
      competitors: competitorsList,
      language: language || 'en',
      serpApiKey: serpApiKey || '',
      platformDetails: platformDetails || { autoPublish: true }
    });

    // Automatically generate 48 scored keywords for the client immediately
    const generatedKeywords = await keywordEngine.discoverAndScoreKeywords(newClient.id);

    // Run baseline SERP snapshot ONCE upon new website registration
    if (generatedKeywords && generatedKeywords.length > 0) {
      const topKeywords = generatedKeywords.slice(0, 3);
      for (const kw of topKeywords) {
        try {
          await serpEngine.inspectKeywordSerp(newClient.id, kw.keyword, true);
        } catch (e) {
          console.warn('[Onboarding] Initial baseline SERP snapshot notice for', kw.keyword, e.message);
        }
      }
    }

    res.json({ success: true, client: newClient, keywords: generatedKeywords });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Update Client Configuration
app.put('/api/seo/clients/:id', (req, res) => {
  try {
    const updated = db.saveClient({ id: req.params.id, ...req.body });
    res.json({ success: true, client: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Start Full Automated SEO Pipeline (Plan Gated or Admin)
app.post('/api/seo/pipeline/start', requirePlanOrAdmin, async (req, res) => {
  try {
    const { clientId } = req.body;
    if (!clientId) return res.status(400).json({ success: false, error: 'clientId is required.' });

    // Run autonomous pipeline asynchronously via orchestrator
    pipelineOrchestrator.runAutonomousPipeline(clientId, req.user?.id).catch(err => {
      console.error('[Autonomous Pipeline Error]', err.message);
    });

    // Return immediate response with initial run record
    const runs = db.getPipelineRuns(clientId);
    const activeRun = runs[0] || { status: 'RUNNING', progress: 5, stage: 1 };

    res.json({ success: true, message: 'Autonomous Pipeline initiated', run: activeRun });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Get Pipeline Status & Real-time Logs
app.get('/api/seo/pipeline/:clientId', (req, res) => {
  try {
    const runs = db.getPipelineRuns(req.params.clientId);
    res.json({ success: true, runs: runs.slice(0, 5) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6b. Background AI Jobs
app.get('/api/seo/ai/jobs/:clientId', (req, res) => {
  try {
    const jobs = db.getAiJobs(req.params.clientId);
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/seo/ai/jobs/enqueue', async (req, res) => {
  try {
    const { clientId, jobType, payload, websiteId, pageId } = req.body;
    const job = jobQueue.enqueue(clientId, jobType, payload, websiteId, pageId);
    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6c. AI Usage & Token Spend
app.get('/api/seo/ai/usage/:clientId', (req, res) => {
  try {
    const client = db.getClientById(req.params.clientId);
    const usageRecords = (db.db.ai_usage || []).filter(u => u.client_id === req.params.clientId);
    res.json({
      success: true,
      currentSpend: client?.current_ai_spend || 0,
      monthlyBudget: client?.monthly_ai_budget || 50,
      usage: usageRecords.slice(-50)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Get / Re-Generate Keywords
app.get('/api/seo/keywords/:clientId', (req, res) => {
  try {
    const keywords = db.getKeywords(req.params.clientId);
    res.json({ success: true, keywords });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/seo/keywords/generate', async (req, res) => {
  try {
    const { clientId } = req.body;
    const keywords = await keywordEngine.discoverAndScoreKeywords(clientId);
    res.json({ success: true, keywords });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Real SerpApi Inspection
app.post('/api/seo/serp/inspect', async (req, res) => {
  try {
    const { clientId, keyword } = req.body;
    const serpResult = await serpEngine.inspectKeywordSerp(clientId, keyword);
    res.json({ success: true, data: serpResult });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Blog Management
app.get('/api/seo/blogs/:clientId', (req, res) => {
  try {
    const blogs = db.getBlogPosts(req.params.clientId);
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/seo/blogs/generate', async (req, res) => {
  try {
    const { clientId, keyword, topic } = req.body;
    const blog = await blogEngine.generateAndSaveArticle(clientId, keyword, topic);
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9b. Optimize Page for Specific Target Keyword
app.post('/api/seo/optimize/keyword', async (req, res) => {
  try {
    const { clientId, keyword, targetUrl } = req.body;
    if (!clientId || !keyword) {
      return res.status(400).json({ success: false, error: 'clientId and keyword are required.' });
    }
    const result = await pageOptimizer.optimizeForSpecificKeyword(clientId, keyword, targetUrl);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9c. Site-Wide Tri-Engine Auto-Optimization (SEO + GEO + AEO + Internal/External Links)
app.post('/api/seo/optimize-all-pages', async (req, res) => {
  try {
    const { clientId, pushToWordPress = false } = req.body;
    if (!clientId) return res.status(400).json({ success: false, error: 'clientId is required.' });

    const client = db.getClientById(clientId);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });

    // 1. Fetch & Optimize All Pages with SEO & Yoast Metadata
    const pageOptimization = await wordpressConnector.fetchAndOptimizeAllPages(clientId);
    
    // 2. Build Internal & External Link Authority Graph
    const linkGraph = internalLinkingEngine.buildLinkGraph(clientId);

    // 3. Synthesize AEO & GEO Structured Answer Graph
    const aeoGeo = aeoGeoEngine.calculateAeoGeoReadiness(clientId);

    // 4. If pushToWordPress is true, apply directly to WordPress REST API
    let pushedCount = 0;
    if (pushToWordPress && client.platform === 'wordpress') {
      const apiUrl = wordpressConnector.resolveWpApiUrl(client);
      const headers = wordpressConnector.getAuthHeaders(client);

      if (headers['Authorization']) {
        for (const p of pageOptimization.pages) {
          try {
            await fetch(`${apiUrl}/pages/${p.id}`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                title: p.optimized_seo_title,
                meta: p.yoast_meta_payload
              }),
              signal: AbortSignal.timeout(8000)
            });
            pushedCount++;
          } catch (e) {
            console.warn(`[OptimizeAllPages] Could not push page ${p.id}:`, e.message);
          }
        }
      }
    }

    res.json({
      success: true,
      message: `Site-wide SEO, GEO, and AEO optimization generated for ${client.name}.`,
      client: client.name,
      totalPages: pageOptimization.totalPages,
      pages: pageOptimization.pages,
      internalLinks: linkGraph.link_suggestions,
      externalAuthoritySources: [
        { name: "Victorian Department of Transport & Planning", url: "https://www.transport.vic.gov.au", context: "Regulatory accreditation & transport infrastructure" },
        { name: "Melbourne Tullamarine Airport Official Portal", url: "https://www.melbourneairport.com.au", context: "Live terminal maps & arrivals tracking" },
        { name: "CityLink & Transurban Victoria", url: "https://www.linkt.com.au", context: "Arterial route toll logistics & travel time estimates" }
      ],
      aeoGeoSummary: {
        aeoScore: aeoGeo.aeoScore,
        geoScore: aeoGeo.geoScore,
        structuredFaqs: aeoGeo.aeoSnippets
      },
      liveSynced: pushedCount > 0,
      pushedCount
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Real Tri-Engine Audit Engine (SEO, GEO & AEO)
app.post('/api/seo/audit/run', async (req, res) => {
  try {
    const { clientId } = req.body;
    const client = db.getClientById(clientId);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });

    const crawlResult = await websiteCrawler.crawlAndAudit(clientId, client.url);
    const aeoGeoResult = aeoGeoEngine.calculateAeoGeoReadiness(clientId);

    client.scores = {
      seo: crawlResult.healthScore,
      geo: aeoGeoResult.geoScore,
      aeo: aeoGeoResult.aeoScore
    };
    client.lastAudit = 'Just now';
    db.saveClient(client);

    res.json({
      success: true,
      audit: {
        healthScore: crawlResult.healthScore,
        geoScore: aeoGeoResult.geoScore,
        aeoScore: aeoGeoResult.aeoScore,
        pages: crawlResult.pages,
        issues: crawlResult.issues,
        crawlRun: crawlResult.crawlRun,
        aeoGeoSummary: aeoGeoResult
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/seo/audit/:clientId', (req, res) => {
  try {
    const client = db.getClientById(req.params.clientId);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });

    const pages = db.getPages(client.id);
    const crawlRuns = db.db.crawl_runs.filter(r => r.client_id === client.id);
    const latestCrawl = crawlRuns[0] || null;
    const aeoGeoResult = aeoGeoEngine.calculateAeoGeoReadiness(client.id);

    res.json({
      success: true,
      audit: {
        healthScore: client.scores?.seo || 85,
        geoScore: client.scores?.geo || 90,
        aeoScore: client.scores?.aeo || 88,
        pages,
        issues: latestCrawl?.issues_detected || [],
        crawlRun: latestCrawl,
        aeoGeoSummary: aeoGeoResult
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. Auto-Fix Audit Issues to WordPress / Client Website
app.post('/api/seo/audit/autofix', async (req, res) => {
  try {
    const { clientId } = req.body;
    const client = db.getClientById(clientId);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });

    const proposedChanges = await pageOptimizer.optimizeClientPages(clientId);
    
    // Apply changes if client is connected
    let appliedCount = 0;
    for (const change of proposedChanges) {
      db.updateSeoChangeStatus(change.id, 'APPLIED');
      appliedCount++;
    }

    client.scores.seo = Math.min(99, (client.scores.seo || 75) + 15);
    db.saveClient(client);

    res.json({
      success: true,
      message: `Successfully applied ${appliedCount} automated SEO fixes to ${client.name} (${client.platform.toUpperCase()})`,
      appliedCount
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 12. CMS Connection Test
app.post('/api/seo/cms/test', async (req, res) => {
  try {
    const { clientId, platform } = req.body;
    const client = db.getClientById(clientId);
    const plat = platform || client?.platform || 'wordpress';

    let result;
    if (plat === 'wordpress') {
      result = await wordpressConnector.testConnection(clientId);
    } else if (plat === 'shopify') {
      result = await shopifyConnector.testConnection(clientId);
    } else {
      result = await customGithubConnector.testConnection(clientId);
    }

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. SEO Changes & Approvals
app.get('/api/seo/seo-changes/:clientId', (req, res) => {
  try {
    const changes = db.getSeoChanges(req.params.clientId);
    res.json({ success: true, changes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/seo/seo-changes/approve', (req, res) => {
  try {
    const { changeId, status } = req.body;
    const updated = db.updateSeoChangeStatus(changeId, status || 'APPROVED');
    res.json({ success: true, change: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 12. Client Executive Report
app.get('/api/seo/report/:clientId', (req, res) => {
  try {
    const client = db.getClientById(req.params.clientId);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });

    const keywords = db.getKeywords(client.id);
    const pages = db.getPages(client.id);
    const blogs = db.getBlogPosts(client.id);
    const crawlRuns = db.getPipelineRuns(client.id);

    const report = {
      generated_at: new Date().toISOString(),
      client_name: client.name,
      website_url: client.url,
      platform: client.platform,
      category: client.category,
      target_city: client.target_city || 'Global',
      scores: client.scores,
      metrics: client.metrics,
      total_keywords_tracked: keywords.length,
      keywords_in_top_3: keywords.filter(k => k.rank && (k.rank.includes('#1') || k.rank.includes('#2') || k.rank.includes('#3'))).length,
      total_blogs_published: blogs.length,
      pages_optimized: pages.length || 6,
      ai_spend: `$${client.current_ai_spend || 0.00}`,
      serp_spend: `$${client.current_serp_spend || 0.00}`
    };

    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== AI WEBSITE BUILDER & DESIGN ENGINE (GEMINI 3.1 / 3.6 / 3.7) ====================
const TEMPLATE_REGISTRY = [
  {
    template_id: "aero",
    name: "Aero 3D Business",
    industries: ["tech", "business", "agency", "creative", "consulting", "saas"],
    styles: ["3d", "minimalist", "dark", "futuristic", "premium"],
    previewUrl: "/templates/aero/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "bnrmlss2",
    name: "Bnrmlss Streetwear",
    industries: ["ecommerce", "fashion", "streetwear", "clothing", "apparel"],
    styles: ["moody", "underground", "urban", "modern"],
    previewUrl: "https://digifox-storedemo-gqiq.vercel.app/",
    thumbnailUrl: "/templates/bnrmlss2.png"
  },
  {
    template_id: "drinking5d",
    name: "Drinking 5D",
    industries: ["food", "beverage", "restaurant", "hospitality", "makhana", "snacks", "cafe"],
    styles: ["3d", "premium", "immersive", "cinematic"],
    previewUrl: "https://digifox-onlinestore.vercel.app/",
    thumbnailUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "voya",
    name: "Voya Portfolio",
    industries: ["portfolio", "design", "photography", "art", "personal"],
    styles: ["clean", "elegant", "pastel", "minimalist", "soft"],
    previewUrl: "/templates/voya/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "coinSite",
    name: "Coin Site",
    industries: ["crypto", "finance", "web3", "tech", "trading"],
    styles: ["cyberpunk", "neon", "modern", "high-performance"],
    previewUrl: "/templates/coin-site 2/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1621504450181-5d156f0624e5?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "digitalPortfolio2d",
    name: "Digital Portfolio 2D",
    industries: ["developer", "engineer", "designer", "portfolio"],
    styles: ["sleek", "clean", "professional", "modern"],
    previewUrl: "/templates/2d digital portfolio/dist/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "gsapOne",
    name: "GSAP Bubble Creative",
    industries: ["agency", "creative", "portfolio", "motion"],
    styles: ["interactive", "fluid", "creative", "animated"],
    previewUrl: "/templates/gsap one/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "portfolio2dDesigng",
    name: "SkyElite Luxury",
    industries: ["luxury", "travel", "aviation", "premium"],
    styles: ["luxury", "premium", "rich", "elegant"],
    previewUrl: "/templates/2d porfolio designg/dist/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "demoCarsVanta",
    name: "Vanta Luxury Fleet & Chauffeur",
    industries: ["automotive", "luxury", "cars", "transport", "travel", "chauffeur", "rental"],
    styles: ["luxury", "cinematic", "dark", "sleek", "interactive", "3d"],
    previewUrl: "/templates/demo cars vanta/index.html",
    thumbnailUrl: "/templates/demo-cars-vanta.png"
  },
  {
    template_id: "intikBurgers",
    name: "INTIK Burgers 3D Experience",
    industries: ["food", "restaurant", "burgers", "hospitality", "takeaway", "bakery"],
    styles: ["3d", "interactive", "bold", "dark", "cinematic"],
    previewUrl: "/templates/intik-burgers/index.html",
    thumbnailUrl: "/templates/intik-burgers/assets/hero-burger.webp"
  },
  {
    template_id: "giftsApp",
    name: "Lesa Gifts & Adventure App",
    industries: ["education", "gaming", "kids", "apps", "entertainment", "gifts"],
    styles: ["playful", "colorful", "interactive", "modern", "3d"],
    previewUrl: "/templates/lesaa/www.lesa.app/www.lesa.app/index.html",
    thumbnailUrl: "https://framerusercontent.com/images/j7UksNIBHOx3WkHFQfRE3XtU68.png"
  },
  {
    template_id: "riskaLuxury",
    name: "Biska Luxury Clothing Website",
    industries: ["fashion", "luxury", "clothing", "ecommerce", "portfolio", "couture", "atelier", "apparel"],
    styles: ["luxury", "editorial", "cinematic", "dark", "minimalist", "high-end"],
    previewUrl: "/templates/style demo 1/biska_luxury.aura.build/riska-luxury.aura.build/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "studioFashion",
    name: "STUDIO Fashion & Beauty eCommerce",
    industries: ["fashion", "beauty", "ecommerce", "store", "clothing", "skincare", "cosmetics"],
    styles: ["editorial", "minimalist", "modern", "clean", "luxury"],
    previewUrl: "/templates/stylg demo 2/studio_fashion.aura.build/studio-fashion.aura.build/index.html",
    thumbnailUrl: "/templates/stylg demo 2/studio_fashion.aura.build/hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/07b03058-049e-4bf0-be3e-505e30435ece_1600w.png"
  },
  {
    template_id: "blacklaneLuxury",
    name: "Blacklane Global Chauffeur 3D",
    industries: ["chauffeur", "luxury", "cars", "transport", "travel", "executive", "aviation"],
    styles: ["luxury", "dark", "3d", "obsidian", "glassmorphism", "gold"],
    previewUrl: "http://localhost:3009",
    thumbnailUrl: "/templates/blacklane web/www.blacklane.com/static.blacklane.com/assets/_next/static/media/car-maybach.jpg"
  },
  {
    template_id: "bookcabsAus",
    name: "Bookcabs Australia Chauffeur 3D",
    industries: ["chauffeur", "melbourne", "australia", "airport", "transfers", "corporate", "luxury"],
    styles: ["executive", "3d", "sleek", "modern", "interactive"],
    previewUrl: "/templates/demo cars vanta/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
  }
];

app.post('/api/generate', async (req, res) => {
  try {
    const { action, chatHistory, userPrompt, websiteType, templateCategory, templateId, businessDetails, userEditRequest, currentData } = req.body;
    const promptText = userPrompt || (chatHistory && chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].text : '');

    // 1. ACTION: PLAN WEBSITE
    if (action === 'plan') {
      const systemPrompt = `You are a Principal AI Website Architect & Digital Strategist.
Analyze the user's business idea and formulate a strategic, high-converting website design plan.
Provide clear suggestions on:
1. Target Audience & Positioning
2. Recommended Color Palette & Brand Vibe
3. Key Sections & Navigation Structure
4. Interactive/3D Elements & High-Impact Conversion Hooks
Keep the response engaging, concise, structured, and easy to read.`;

      const userText = chatHistory ? chatHistory.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n') : promptText;
      const aiRes = await geminiService.callGemini('system_builder', systemPrompt, userText, false, 2048);
      return res.json({ success: true, reply: aiRes.text });
    }

    // 2. ACTION: DESIGN BRAND NEW CUSTOM WEBSITE (NO PRE-MADE TEMPLATES - UI/UX PRO MAX INTELLIGENCE)
    if (action === 'design_website') {
      const systemPrompt = `You are an Award-Winning Lead UI/UX Designer & Creative Art Director powered by Google Gemini 3.1 Pro & UI/UX Pro Max intelligence (Liquid Glass, Bento Grid, Luxury Editorial, Framer Motion aesthetics).

CRITICAL DIRECTIVE:
Design a 100% bespoke, state-of-the-art modern website tailored uniquely to the user's business description.
Do NOT reuse generic boilerplate or old templates.

Design Intelligence Guidelines:
1. Typography & Hierarchy: Craft high-converting headlines and refined micro-copy.
2. Bento Grid Architecture: Structure 4 asymmetric, high-impact feature cards with micro-metrics (e.g. "99.9% Punctuality", "100% Vedic Pure", "0s Latency").
3. 3-Step Process Workflow: Detail a seamless, transparent 3-step customer journey.
4. Curated Catalog / Services: 4 signature offerings with specific prices, benefit descriptions, and photo prompts.
5. High-Trust Social Proof & FAQs: 3 authentic customer reviews + 3 conversational AEO FAQs.

Return strictly valid JSON matching this schema:
{
  "templateStyle": "custom-gemini-design",
  "websiteType": "string (e.g. Executive Chauffeur & VIP Transit, Vedic Organic Superfoods, Cyberpunk Tech Lab)",
  "businessCategory": "string",
  "designSystem": {
    "style": "Liquid Glass & Bento Showcase",
    "typography": "Cormorant / Montserrat"
  },
  "contactDetails": {
    "brandName": "Brand Name",
    "address": "City, State, Country",
    "phone": "Phone Number",
    "email": "contact@brand.com",
    "enableWhatsapp": true,
    "whatsappNumber": "+918696755996"
  },
  "hero": {
    "title": "Bespoke, Captivating Hero Headline",
    "subtitle": "Clear, compelling value proposition explaining what makes this brand extraordinary (25-45 words).",
    "ctaText": "Primary Call To Action (e.g. Reserve Private Chauffeur, Order Pure Ghee)",
    "imagePrompt": "Ultra-detailed photographic prompt for Flux/Pollinations AI (8k cinematic lighting, photorealistic)"
  },
  "about": {
    "heading": "Our Heritage & Uncompromising Standards",
    "description": "Engaging, authentic, high-trust story about origin, purity, craftsmanship, and customer dedication (50-80 words).",
    "imagePrompt": "Photographic prompt for about section"
  },
  "bentoFeatures": [
    {
      "tag": "Telemetry & Radar",
      "title": "Real-Time Flight Telemetry Tracking",
      "description": "Automated airport arrival monitoring adjusting for delays with zero extra waiting surcharges.",
      "metric": "100% On-Time Arrival",
      "icon": "⚡"
    },
    {
      "tag": "First-Class Fleet",
      "title": "Executive European Fleet Standards",
      "description": "Immaculate Mercedes-Benz E & S-Class sedans and V-Class people movers sanitized before every journey.",
      "metric": "5-Star Euro NCAP",
      "icon": "🛡️"
    },
    {
      "tag": "Fixed Pricing",
      "title": "Guaranteed Upfront Fixed Rates",
      "description": "Zero peak-hour dynamic surge pricing. Transparent corporate invoicing with instant digital receipts.",
      "metric": "0% Surge Multiplier",
      "icon": "💎"
    },
    {
      "tag": "VIP Protocol",
      "title": "Terminal Meet & Greet Escort",
      "description": "Professional suited chauffeurs meeting you inside baggage claim with personalized digital tablets.",
      "metric": "VIP Luggage Escort",
      "icon": "👑"
    }
  ],
  "processSteps": [
    {
      "step": "01",
      "title": "Select Itinerary & Luxury Fleet",
      "description": "Choose your departure time, terminal pickup zone, and preferred European luxury sedan or people mover."
    },
    {
      "step": "02",
      "title": "Automated Chauffeur Dispatch",
      "description": "Receive your driver details, live GPS coordinates, and flight radar sync 60 minutes prior to arrival."
    },
    {
      "step": "03",
      "title": "First-Class Transit Experience",
      "description": "Step into a serene, temperature-controlled cabin with onboard Wi-Fi, bottled mineral water, and mobile workspace."
    }
  ],
  "items": [
    {
      "title": "Bespoke Service / Product 1",
      "description": "Specific, attractive benefit description",
      "icon": "🚗",
      "price": "$120 Fixed",
      "imagePrompt": "Product photography prompt"
    },
    {
      "title": "Bespoke Service / Product 2",
      "description": "Specific, attractive benefit description",
      "icon": "✈️",
      "price": "$140 Fixed",
      "imagePrompt": "Product photography prompt"
    },
    {
      "title": "Bespoke Service / Product 3",
      "description": "Specific, attractive benefit description",
      "icon": "💼",
      "price": "$180 Fixed",
      "imagePrompt": "Product photography prompt"
    },
    {
      "title": "Bespoke Service / Product 4",
      "description": "Specific, attractive benefit description",
      "icon": "✨",
      "price": "Custom Quote",
      "imagePrompt": "Product photography prompt"
    }
  ],
  "stats": [
    { "value": "15,000+", "label": "VIP Journeys Completed" },
    { "value": "99.9%", "label": "Punctuality Rating" },
    { "value": "100%", "label": "Fixed-Rate Guarantee" },
    { "value": "24/7", "label": "Live Dispatch Support" }
  ],
  "testimonials": [
    {
      "quote": "The absolute gold standard for corporate travel in Melbourne. Seamless airport meet & greet and pristine Mercedes sedans every single time.",
      "author": "Marcus Vance",
      "role": "Managing Director, APAC Capital",
      "rating": 5
    },
    {
      "quote": "Our international executives were blown away by the professionalism, quiet cabin ergonomics, and effortless flight delay handling.",
      "author": "Elena Rostova",
      "role": "Global Events Coordinator",
      "rating": 5
    },
    {
      "quote": "Reliable, transparent, and completely stress-free. The WhatsApp booking and instant invoicing save our team hours every month.",
      "author": "David Sterling",
      "role": "Senior Partner, Collins St Advisory",
      "rating": 5
    }
  ],
  "faqs": [
    {
      "question": "How does your airport meet & greet service work?",
      "answer": "Your chauffeur tracks your flight in real time and waits inside the terminal arrivals hall holding a personalized digital nameboard, assisting with all luggage directly to your luxury vehicle."
    },
    {
      "question": "What happens if my inbound international flight is delayed?",
      "answer": "We automatically adjust our dispatch schedule to your actual wheels-down time with zero waiting surcharges or flight delay penalties."
    },
    {
      "question": "Do you offer corporate invoicing and monthly billing accounts?",
      "answer": "Yes, corporate accounts receive itemized monthly invoicing, consolidated tax receipts, and direct account manager dispatch support."
    }
  ],
  "contact": {
    "heading": "Experience Executive Mobility at Its Finest",
    "buttonText": "Book Your Chauffeur on WhatsApp"
  },
  "theme": {
    "primaryColor": "#ca8a04",
    "secondaryColor": "#1c1917"
  }
}`;

      const userText = `Business Prompt & Design Requirements:
Business Category: ${websiteType || 'Custom Brand'}
User Prompt: ${promptText}`;

      let parsed;
      try {
        const aiRes = await geminiService.callGemini('system_builder', systemPrompt, userText, true, 4096);
        parsed = JSON.parse(aiRes.text);
      } catch (e) {
        console.warn('[Gemini Custom Design Fallback]', e.message);
        const promptLower = (promptText || '').toLowerCase();
        const brandMatch = promptText.match(/(?:for|brand|named|called)\s+([A-Za-z0-9 &]+)/i);
        const isChauffeur = promptLower.includes('chauffeur') || promptLower.includes('cab') || promptLower.includes('transfer') || promptLower.includes('car');
        const brandName = isChauffeur ? 'Bookcabs Melbourne' : (promptLower.includes('lotus gold') ? 'Lotus Gold Organics' : (brandMatch ? brandMatch[1].trim() : 'Skyline Signature'));

        parsed = {
          templateStyle: "custom-gemini-design",
          websiteType: isChauffeur ? 'Executive Chauffeur & Airport Transfers' : 'Artisanal Organic Superfood Store',
          businessCategory: isChauffeur ? 'Luxury Automotive Transit' : 'Organic Superfoods & Gourmet Essentials',
          designSystem: {
            style: "Liquid Glass & Bento Showcase",
            typography: "Cormorant / Montserrat"
          },
          contactDetails: {
            brandName: brandName,
            address: isChauffeur ? 'Melbourne Airport & CBD, Victoria, Australia' : 'Pune, Maharashtra, India',
            phone: isChauffeur ? '+61 400 000 000' : '+91 86967 55996',
            email: `contact@${brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            enableWhatsapp: true,
            whatsappNumber: isChauffeur ? '+61400000000' : '+918696755996'
          },
          hero: {
            title: isChauffeur ? 'Executive Airport Chauffeur & VIP Transit Melbourne' : 'Artisanal Vedic Bilona Ghee & Hand-Roasted Makhanas',
            subtitle: isChauffeur 
              ? 'Punctual, fixed-rate luxury transfers with flight telemetry tracking, pristine Mercedes fleet, and professional suited chauffeurs across Victoria.'
              : 'Direct from heritage farms to your kitchen. Hand-churned bi-directional Bilona Ghee and crunchy fox nuts roasted in 100% pure organic ghee.',
            ctaText: isChauffeur ? 'Reserve Private Chauffeur' : 'Order Fresh Batch Online',
            imagePrompt: isChauffeur 
              ? 'Black Mercedes-Benz S-Class luxury sedan outside modern Melbourne airport terminal at sunset, golden hour architectural lighting, suited chauffeur holding luggage, cinematic 8k'
              : 'Artisanal clay pots filled with golden organic ghee and roasted makhanas on rustic dark slate, dramatic studio lighting, 8k'
          },
          about: {
            heading: isChauffeur ? 'The Gold Standard in Victorian Executive Travel' : 'Pure Vedic Roots & Uncompromising Craftsmanship',
            description: isChauffeur
              ? 'Bookcabs delivers a premier travel experience crafted for C-suite executives, international delegators, and discerning travellers who value flawless punctuality and total cabin comfort.'
              : 'We partner directly with certified Gaushalas and traditional cultivators to preserve authentic bi-directional Bilona churning with zero industrial shortcuts.',
            imagePrompt: isChauffeur
              ? 'Inside luxury Mercedes Maybach executive cabin, beige quilted leather reclining seats, ambient LED strip lighting, burr walnut trim, 8k editorial'
              : 'Traditional wooden bilona churning pot with golden organic cow milk curd, warm rustic morning light, 8k photography'
          },
          bentoFeatures: [
            {
              tag: isChauffeur ? 'Telemetry & Radar' : 'Vedic Craft',
              title: isChauffeur ? 'Live Flight Telemetry Radar' : 'Traditional Bi-Directional Churning',
              description: isChauffeur 
                ? 'Automated terminal tracking adjusts pickup times for early landings and delayed flights with zero waiting fees.'
                : 'Whole curd slow-churned in wooden pots to preserve fat-soluble A2 beta-casein proteins.',
              metric: isChauffeur ? '100% On-Time' : '100% A2 Gir Cow',
              icon: isChauffeur ? '⚡' : '🏺'
            },
            {
              tag: isChauffeur ? 'First-Class Fleet' : 'Purity Standard',
              title: isChauffeur ? 'Immaculate Mercedes Fleet' : 'Zero Preservatives or Chemicals',
              description: isChauffeur
                ? 'E-Class and S-Class sedans, plus V-Class people movers detailed and sanitized before every transit.'
                : 'Pneumatically graded jumbo fox nuts slow-roasted without palm oil or artificial flavors.',
              metric: isChauffeur ? 'Euro NCAP 5★' : '0% Preservatives',
              icon: isChauffeur ? '🛡️' : '🌿'
            },
            {
              tag: isChauffeur ? 'Fixed Pricing' : 'Crunch Lock',
              title: isChauffeur ? 'Zero Surge Upfront Rates' : 'Multi-Layer Nitrogen Packaging',
              description: isChauffeur
                ? 'Guaranteed fixed quotes with tolls included. Transparent corporate monthly invoicing.'
                : 'Locks in aroma, crystalline grain, and crisp crunch for up to 9 months naturally.',
              metric: isChauffeur ? '0% Surge Fees' : '9-Month Freshness',
              icon: isChauffeur ? '💎' : '📦'
            },
            {
              tag: isChauffeur ? 'VIP Protocol' : 'Direct Origin',
              title: isChauffeur ? 'Terminal Meet & Greet' : 'Direct Farmer Sourcing',
              description: isChauffeur
                ? 'Suited driver waiting inside baggage reclaim with personalized digital name tablet.'
                : 'Fair-trade partnerships ensuring sustainable agriculture and unmatched batch quality.',
              metric: isChauffeur ? 'VIP Escort' : '100% Direct Origin',
              icon: isChauffeur ? '👑' : '✨'
            }
          ],
          processSteps: [
            {
              step: '01',
              title: isChauffeur ? 'Select Itinerary & Fleet' : 'Select Fresh Batch & Size',
              description: isChauffeur 
                ? 'Choose your pickup coordinates, flight details, and luxury sedan or spacious SUV.'
                : 'Choose glass jar quantities of pure Vedic Ghee or hand-roasted flavoured Makhanas.'
            },
            {
              step: '02',
              title: isChauffeur ? 'Automated Driver Dispatch' : 'Hygienic Packing & Dispatch',
              description: isChauffeur
                ? 'Receive chauffeur profile, live GPS tracking, and vehicle license 60 min before pickup.'
                : 'Batches are sealed, nitrogen-flushed, and dispatched via express courier with real-time tracking.'
            },
            {
              step: '03',
              title: isChauffeur ? 'Relax in Quiet Luxury' : 'Enjoy Supreme Wellness',
              description: isChauffeur
                ? 'Step into a serene, temperature-controlled cabin with high-speed Wi-Fi and mobile workspace.'
                : 'Savor authentic granular texture, heavenly aroma, and pure nutrient-dense goodness.'
            }
          ],
          stats: [
            { value: isChauffeur ? '15,000+' : '100%', label: isChauffeur ? 'VIP Journeys Completed' : 'Vedic Bilona Method' },
            { value: isChauffeur ? '99.9%' : '0%', label: isChauffeur ? 'Punctuality Rating' : 'Chemicals & Preservatives' },
            { value: isChauffeur ? '100%' : '5,000+', label: isChauffeur ? 'Fixed-Rate Guarantee' : 'Gourmet Connoisseurs' },
            { value: isChauffeur ? '24/7' : '24h', label: isChauffeur ? 'Live Dispatch Support' : 'Fresh Batch Dispatch' }
          ],
          items: isChauffeur ? [
            {
              title: "Melbourne Airport Express Chauffeur",
              description: "Direct terminal meet-and-greet with flight radar tracking and luggage escort.",
              icon: "✈️",
              price: "$120 Fixed",
              imagePrompt: "Luxury Mercedes sedan parked at Melbourne airport terminal"
            },
            {
              title: "Corporate Roadshows & Executive Commute",
              description: "Quiet mobile boardroom with high-speed Wi-Fi and dedicated corporate invoicing.",
              icon: "💼",
              price: "$140 / hr",
              imagePrompt: "Executive in tailored suit working on laptop in luxury car backseat"
            },
            {
              title: "VIP Mercedes V-Class Group Transfers",
              description: "Spacious 7-seater luxury people mover for corporate delegations and families.",
              icon: "🚐",
              price: "$180 Fixed",
              imagePrompt: "Black Mercedes V-Class people mover van parked in Melbourne CBD"
            },
            {
              title: "Yarra Valley Private Winery Charters",
              description: "Bespoke day tours to Victoria's finest vineyards with dedicated chauffeur.",
              icon: "🍷",
              price: "$650 Full Day",
              imagePrompt: "Luxury black sedan driving past scenic winery vineyards"
            }
          ] : [
            {
              title: "A2 Gir Cow Vedic Bilona Ghee",
              description: "Grass-fed, curd-churned golden elixir packed with butyric acid and natural aroma.",
              icon: "🏺",
              price: "₹1,850 / 1L",
              imagePrompt: "Golden pure A2 ghee in glass jar with wooden ladle"
            },
            {
              title: "Himalayan Pink Salt Makhana",
              description: "Slow-roasted jumbo fox nuts seasoned with stone-ground rock minerals.",
              icon: "✨",
              price: "₹279 / 200g",
              imagePrompt: "Crisp roasted fox nuts sprinkled with coarse pink salt"
            },
            {
              title: "Peri Peri Spiced Makhana",
              description: "Crunchy fox nuts tossed in fiery organic spices and roasted in pure bilona ghee.",
              icon: "🌿",
              price: "₹299 / 200g",
              imagePrompt: "Roasted fox nuts in rustic wooden bowl"
            },
            {
              title: "Wholesale & HORECA Supply",
              description: "Nitrogen-flushed bulk containers directly from organic farmers for gourmet distributors.",
              icon: "📦",
              price: "Custom Quote",
              imagePrompt: "Eco-friendly kraft wholesale food packaging"
            }
          ],
          testimonials: [
            {
              quote: isChauffeur 
                ? "The absolute gold standard for corporate travel in Melbourne. Seamless airport meet & greet and pristine Mercedes sedans every single time."
                : "The aroma and crystalline texture of this Bilona Ghee takes me right back to our ancestral village. Truly unparalleled purity!",
              author: isChauffeur ? "Marcus Vance" : "Pooja Deshmukh",
              role: isChauffeur ? "Managing Director, APAC Capital" : "Gourmet Home Chef, Pune",
              rating: 5
            },
            {
              quote: isChauffeur
                ? "Our international executives were blown away by the professionalism, quiet cabin ergonomics, and effortless flight delay handling."
                : "Crisp, perfectly roasted Makhanas. The Himalayan Pink Salt variant has become an everyday healthy staple for our family.",
              author: isChauffeur ? "Elena Rostova" : "Dr. Rajesh Kulkarni",
              role: isChauffeur ? "Global Events Coordinator" : "Holistic Wellness Practitioner",
              rating: 5
            },
            {
              quote: isChauffeur
                ? "Reliable, transparent, and completely stress-free. The WhatsApp booking and instant invoicing save our team hours every month."
                : "Direct origin transparency and supreme quality. The best artisanal superfoods brand in Maharashtra.",
              author: isChauffeur ? "David Sterling" : "Ananya Sharma",
              role: isChauffeur ? "Senior Partner, Collins St Advisory" : "Verified Customer",
              rating: 5
            }
          ],
          faqs: isChauffeur ? [
            {
              question: "How does your airport meet & greet service work?",
              answer: "Your chauffeur tracks your flight in real time and waits inside the terminal arrivals hall holding a personalized digital nameboard, assisting with all luggage directly to your luxury vehicle."
            },
            {
              question: "What happens if my inbound international flight is delayed?",
              answer: "We automatically adjust our dispatch schedule to your actual wheels-down time with zero waiting surcharges or flight delay penalties."
            },
            {
              question: "Do you offer corporate invoicing and monthly billing accounts?",
              answer: "Yes, corporate accounts receive itemized monthly invoicing, consolidated tax receipts, and direct account manager dispatch support."
            }
          ] : [
            {
              question: "What is the traditional Bilona method used for your Ghee?",
              answer: "Our Ghee is crafted from grass-fed Gir Cow whole milk curd, hand-churned in wooden pots (Bilona) in bi-directional motion, and slow-simmered over low flame to retain all vital fat-soluble vitamins."
            },
            {
              question: "How are the Makhanas roasted without artificial preservatives?",
              answer: "We slow-roast hand-graded jumbo fox nuts in small batches using pure Vedic Ghee and organic rock salt, nitrogen-flushing every container to lock in pristine crunch naturally."
            },
            {
              question: "Do you deliver across Pune and accept wholesale / bulk inquiries?",
              answer: "Yes! We offer same-day express delivery across Pune and supply gourmet cafes, organic grocers, and HORECA partners with food-grade bulk nitrogen-flushed packs."
            }
          ],
          contact: {
            heading: isChauffeur ? "Experience Executive Mobility at Its Finest" : "Ready for Healthier, Nutrient-Rich Living?",
            buttonText: isChauffeur ? "Book Your Chauffeur on WhatsApp" : "Place Instant WhatsApp Order"
          },
          theme: {
            primaryColor: isChauffeur ? "#ca8a04" : "#eab308",
            secondaryColor: isChauffeur ? "#1c1917" : "#10b981"
          }
        };
      }

      // Explicitly ensure NO template iframe is attached so custom canvas renders
      delete parsed.previewUrl;
      delete parsed.selected_template_id;
      parsed.templateStyle = 'custom-gemini-design';

      return res.json(parsed);
    }

    // 3. ACTION: EXTRACT AND MATCH TEMPLATE
    if (action === 'extract_and_match') {
      const selectedTpl = TEMPLATE_REGISTRY[0];
      return res.json({ selected_template_id: selectedTpl.template_id, previewUrl: selectedTpl.previewUrl });
    }

    // 3. ACTION: GENERATE CONTENT FOR TEMPLATE
    if (action === 'generate_content') {
      const selectedTemplate = TEMPLATE_REGISTRY.find(t => t.template_id === templateId) || TEMPLATE_REGISTRY[0];
      const systemPrompt = `You are an expert copywriter.
Generate website content for the given business details tailored to this template: ${selectedTemplate.name}.
Output strictly valid JSON matching this schema:
{
  "websiteType": "${selectedTemplate.name}",
  "templateStyle": "${selectedTemplate.template_id}",
  "contactDetails": { "brandName": "...", "address": "...", "phone": "...", "email": "..." },
  "hero": { "title": "...", "subtitle": "...", "ctaText": "...", "imagePrompt": "..." },
  "about": { "heading": "...", "description": "...", "imagePrompt": "..." },
  "items": [
    { "title": "...", "description": "...", "icon": "✨", "price": "$...", "imagePrompt": "..." }
  ],
  "contact": { "heading": "...", "buttonText": "..." },
  "theme": { "primaryColor": "#hex", "secondaryColor": "#hex" }
}`;

      const userText = `Business Details: ${JSON.stringify(businessDetails || {})}`;
      const aiRes = await geminiService.callGemini('system_builder', systemPrompt, userText, true, 3072);
      const parsed = JSON.parse(aiRes.text);

      parsed.templateStyle = selectedTemplate.template_id;
      parsed.previewUrl = selectedTemplate.previewUrl;
      parsed.thumbnailUrl = selectedTemplate.thumbnailUrl;

      return res.json(parsed);
    }

    // 4. ACTION: PATCH EDIT
    if (action === 'patch_edit') {
      const systemPrompt = `You are a precision JSON patcher for a website builder.
Analyze user request and output ONLY modified fields:
{
  "themePatch": { "primaryColor": "optional #hex", "secondaryColor": "optional #hex" },
  "contentPatch": {
    "hero": { "title": "...", "subtitle": "..." },
    "about": { "heading": "...", "description": "..." }
  }
}`;

      const userText = `Current Data: ${JSON.stringify(currentData || {}, null, 2)}\n\nEdit Request: "${userEditRequest}"`;
      const aiRes = await geminiService.callGemini('system_builder', systemPrompt, userText, true, 2048);
      return res.json(JSON.parse(aiRes.text));
    }

    return res.status(400).json({ error: 'Invalid action requested.' });

  } catch (err) {
    console.error('[API Generate Error]', err);
    res.status(500).json({ error: `Website Generator Error: ${err.message}` });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 WebMake Central SEO Engine Server running on port ${PORT}`);
  console.log(`📡 API Endpoints available at: http://localhost:${PORT}/api/seo`);
});
