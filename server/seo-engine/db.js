import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'seo_engine_database.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initial Database Structure
const INITIAL_DB = {
  version: 1,
  users: [],
  subscriptions: [],
  clients: [],
  websites: [],
  connections: [],
  crawl_runs: [],
  pages: [],
  keywords: [],
  serp_snapshots: [],
  seo_changes: [],
  blog_posts: [],
  internal_links: [],
  pipeline_runs: [],
  ai_jobs: [],
  ai_usage: [],
  audit_logs: []
};

// Database Management Class
class SeoDatabase {
  constructor() {
    this.db = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (!parsed.users) parsed.users = [];
        if (!parsed.subscriptions) parsed.subscriptions = [];
        if (!parsed.clients) parsed.clients = [];
        return parsed;
      }
    } catch (err) {
      console.error('Error loading SEO database, initializing fresh state:', err);
    }
    this.save(INITIAL_DB);
    return JSON.parse(JSON.stringify(INITIAL_DB));
  }

  save(data = this.db) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Failed to write to SEO database:', err);
      return false;
    }
  }

  resetAll() {
    // Preserve admin and user accounts while wiping clients
    const preservedUsers = this.db.users || [];
    const preservedSubs = this.db.subscriptions || [];
    this.db = {
      ...JSON.parse(JSON.stringify(INITIAL_DB)),
      users: preservedUsers,
      subscriptions: preservedSubs
    };
    this.save(this.db);
    return true;
  }

  // --- Users & Auth ---
  getUsers() {
    return this.db.users || [];
  }

  getUserById(id) {
    return (this.db.users || []).find(u => u.id === id) || null;
  }

  getUserByEmail(email) {
    if (!email) return null;
    return (this.db.users || []).find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  }

  saveUser(userData) {
    if (!this.db.users) this.db.users = [];
    const now = new Date().toISOString();
    const existingIdx = this.db.users.findIndex(u => u.id === userData.id);

    if (existingIdx >= 0) {
      this.db.users[existingIdx] = {
        ...this.db.users[existingIdx],
        ...userData,
        updated_at: now
      };
      this.save();
      return this.db.users[existingIdx];
    } else {
      const newUser = {
        id: userData.id || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: userData.name || 'User',
        email: userData.email.toLowerCase().trim(),
        passwordHash: userData.passwordHash,
        role: userData.role || 'user', // 'admin' | 'user'
        plan: userData.plan || 'free', // 'free' | 'starter' | 'pro' | 'agency'
        created_at: now,
        updated_at: now
      };
      this.db.users.unshift(newUser);
      this.save();
      return newUser;
    }
  }

  // --- Subscriptions ---
  getUserSubscription(userId) {
    return (this.db.subscriptions || []).find(s => s.user_id === userId && s.status === 'ACTIVE') || null;
  }

  saveSubscription(subData) {
    if (!this.db.subscriptions) this.db.subscriptions = [];
    const now = new Date().toISOString();
    const existingIdx = this.db.subscriptions.findIndex(s => s.user_id === subData.user_id);

    const subRecord = {
      id: subData.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user_id: subData.user_id,
      plan: subData.plan || 'pro',
      status: subData.status || 'ACTIVE',
      monthly_limit: subData.monthly_limit || 10,
      activated_at: now,
      expires_at: subData.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    if (existingIdx >= 0) {
      this.db.subscriptions[existingIdx] = subRecord;
    } else {
      this.db.subscriptions.unshift(subRecord);
    }

    // Also update user's plan field
    const user = this.getUserById(subData.user_id);
    if (user) {
      user.plan = subData.plan || 'pro';
      this.saveUser(user);
    }

    this.save();
    return subRecord;
  }

  // --- Clients CRUD ---
  getClients(userId = null, isAdmin = false) {
    const all = this.db.clients || [];
    if (isAdmin || !userId) {
      return all;
    }
    // Filter for regular user
    return all.filter(c => !c.user_id || c.user_id === userId);
  }

  getClientById(id) {
    return this.db.clients.find(c => c.id === id) || null;
  }

  saveClient(clientData) {
    const existingIdx = this.db.clients.findIndex(c => c.id === clientData.id);
    const now = new Date().toISOString();
    
    if (existingIdx >= 0) {
      this.db.clients[existingIdx] = {
        ...this.db.clients[existingIdx],
        ...clientData,
        updated_at: now
      };
      this.save();
      return this.db.clients[existingIdx];
    } else {
      const newClient = {
        id: clientData.id || `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: clientData.name,
        url: clientData.url,
        platform: clientData.platform || 'wordpress',
        category: clientData.category || 'General Business',
        target_country: clientData.target_country || 'Global',
        target_city: clientData.target_city || '',
        services: clientData.services || [],
        description: clientData.description || '',
        conversion_goal: clientData.conversion_goal || 'Lead Generation & Sales',
        target_audience: clientData.target_audience || 'Commercial & B2B/B2C Customers',
        competitors: clientData.competitors || [],
        language: clientData.language || 'en',
        status: clientData.status || 'CONNECTED',
        monthly_ai_budget: clientData.monthly_ai_budget || 50.0,
        monthly_serp_budget: clientData.monthly_serp_budget || 20.0,
        monthly_blog_limit: clientData.monthly_blog_limit || 10,
        current_ai_spend: clientData.current_ai_spend || 0.0,
        current_serp_spend: clientData.current_serp_spend || 0.0,
        automation_mode: clientData.automation_mode || 'REVIEW_AND_APPROVE', // 'MANUAL' | 'REVIEW_AND_APPROVE' | 'AUTOMATIC'
        scores: clientData.scores || { seo: 90, geo: 88, aeo: 86 },
        metrics: clientData.metrics || {
          impressions: '14.2K',
          clicks: '1.8K',
          aiCitations: 142,
          voiceAnswers: 68,
          indexedPages: 24
        },
        created_at: now,
        updated_at: now
      };
      this.db.clients.unshift(newClient);
      this.save();
      return newClient;
    }
  }

  // --- Connections ---
  getConnection(clientId) {
    return this.db.connections.find(c => c.client_id === clientId) || null;
  }

  saveConnection(clientId, platform, details) {
    const existingIdx = this.db.connections.findIndex(c => c.client_id === clientId);
    const connectionRecord = {
      client_id: clientId,
      platform,
      details,
      status: 'CONNECTED',
      last_sync: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (existingIdx >= 0) {
      this.db.connections[existingIdx] = connectionRecord;
    } else {
      this.db.connections.push(connectionRecord);
    }
    this.save();
    return connectionRecord;
  }

  // --- Crawl Runs & Pages ---
  saveCrawlRun(crawlData) {
    const run = {
      id: `crawl_${Date.now()}`,
      client_id: crawlData.client_id,
      started_at: crawlData.started_at || new Date().toISOString(),
      completed_at: crawlData.completed_at || new Date().toISOString(),
      pages_count: crawlData.pages_count || 0,
      health_score: crawlData.health_score || 95,
      issues_detected: crawlData.issues_detected || [],
      snapshot: crawlData.snapshot || {}
    };
    this.db.crawl_runs.unshift(run);
    this.save();
    return run;
  }

  getPages(clientId) {
    return this.db.pages.filter(p => p.client_id === clientId);
  }

  savePages(clientId, pagesArray) {
    // Replace pages for this client
    this.db.pages = this.db.pages.filter(p => p.client_id !== clientId);
    const timestamped = pagesArray.map(p => ({
      ...p,
      id: p.id || `page_${Math.random().toString(36).substring(2, 9)}`,
      client_id: clientId,
      created_at: new Date().toISOString()
    }));
    this.db.pages.push(...timestamped);
    this.save();
    return timestamped;
  }

  // --- Keywords ---
  getKeywords(clientId) {
    return this.db.keywords.filter(k => k.client_id === clientId);
  }

  saveKeywords(clientId, keywordsArray) {
    this.db.keywords = this.db.keywords.filter(k => k.client_id !== clientId);
    const formatted = keywordsArray.map(k => ({
      ...k,
      id: k.id || `kw_${Math.random().toString(36).substring(2, 9)}`,
      client_id: clientId,
      created_at: new Date().toISOString()
    }));
    this.db.keywords.push(...formatted);
    this.save();
    return formatted;
  }

  // --- SERP Snapshots ---
  getSerpSnapshots(clientId) {
    return this.db.serp_snapshots.filter(s => s.client_id === clientId);
  }

  saveSerpSnapshot(clientId, keyword, serpData) {
    const snapshot = {
      id: `serp_${Date.now()}`,
      client_id: clientId,
      keyword,
      data: serpData,
      created_at: new Date().toISOString()
    };
    this.db.serp_snapshots.unshift(snapshot);
    this.save();
    return snapshot;
  }

  // --- SEO Changes & Approvals ---
  getSeoChanges(clientId) {
    return this.db.seo_changes.filter(c => c.client_id === clientId);
  }

  saveSeoChange(clientId, changeData) {
    const change = {
      id: changeData.id || `change_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      client_id: clientId,
      page_id: changeData.page_id,
      page_url: changeData.page_url,
      field: changeData.field, // 'title', 'meta_desc', 'h1', 'alt', 'schema'
      before: changeData.before,
      after: changeData.after,
      reason: changeData.reason,
      impact: changeData.impact || 'HIGH',
      confidence: changeData.confidence || 98,
      status: changeData.status || 'PROPOSED', // 'PROPOSED' | 'APPROVED' | 'APPLIED' | 'ROLLED_BACK'
      created_at: new Date().toISOString()
    };
    this.db.seo_changes.unshift(change);
    this.save();
    return change;
  }

  updateSeoChangeStatus(changeId, status) {
    const change = this.db.seo_changes.find(c => c.id === changeId);
    if (change) {
      change.status = status;
      change.updated_at = new Date().toISOString();
      this.save();
    }
    return change;
  }

  // --- Blog Posts ---
  getBlogPosts(clientId) {
    return this.db.blog_posts.filter(b => b.client_id === clientId);
  }

  saveBlogPost(clientId, blogData) {
    const existingIdx = this.db.blog_posts.findIndex(b => b.id === blogData.id);
    const now = new Date().toISOString();
    const blog = {
      id: blogData.id || `blog_${Date.now()}`,
      client_id: clientId,
      title: blogData.title,
      keyword: blogData.keyword,
      slug: blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      content: blogData.content,
      meta_title: blogData.meta_title || blogData.title,
      meta_description: blogData.meta_description || '',
      schema_jsonld: blogData.schema_jsonld || {},
      status: blogData.status || 'DRAFT', // 'DRAFT' | 'PUBLISHED'
      word_count: blogData.word_count || '1,850 words',
      score: blogData.score || 99,
      remote_post_id: blogData.remote_post_id || null,
      created_at: blogData.created_at || now,
      updated_at: now
    };

    if (existingIdx >= 0) {
      this.db.blog_posts[existingIdx] = blog;
    } else {
      this.db.blog_posts.unshift(blog);
    }
    this.save();
    return blog;
  }

  // --- Internal Links ---
  getInternalLinks(clientId) {
    return this.db.internal_links.filter(l => l.client_id === clientId);
  }

  saveInternalLinks(clientId, linksArray) {
    this.db.internal_links = this.db.internal_links.filter(l => l.client_id !== clientId);
    const formatted = linksArray.map(l => ({
      ...l,
      id: l.id || `link_${Math.random().toString(36).substring(2, 9)}`,
      client_id: clientId,
      created_at: new Date().toISOString()
    }));
    this.db.internal_links.push(...formatted);
    this.save();
    return formatted;
  }

  // --- Pipeline Runs ---
  getPipelineRuns(clientId) {
    return this.db.pipeline_runs.filter(r => r.client_id === clientId);
  }

  createPipelineRun(clientId) {
    const run = {
      id: `pipe_${Date.now()}`,
      client_id: clientId,
      status: 'RUNNING',
      stage: 1,
      total_stages: 15,
      progress: 5,
      logs: [`[${new Date().toLocaleTimeString()}] Pipeline started...`],
      started_at: new Date().toISOString(),
      completed_at: null,
      error: null
    };
    this.db.pipeline_runs.unshift(run);
    this.save();
    return run;
  }

  updatePipelineRun(runId, updates) {
    const run = this.db.pipeline_runs.find(r => r.id === runId);
    if (run) {
      Object.assign(run, updates);
      this.save();
    }
    return run;
  }

  // --- AI Jobs System ---
  getAiJobs(clientId) {
    if (!this.db.ai_jobs) this.db.ai_jobs = [];
    return clientId ? this.db.ai_jobs.filter(j => j.client_id === clientId) : this.db.ai_jobs;
  }

  getAiJobById(jobId) {
    if (!this.db.ai_jobs) this.db.ai_jobs = [];
    return this.db.ai_jobs.find(j => j.id === jobId) || null;
  }

  createAiJob(jobData) {
    if (!this.db.ai_jobs) this.db.ai_jobs = [];
    const job = {
      id: jobData.id || `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      client_id: jobData.client_id,
      website_id: jobData.website_id || jobData.client_id,
      page_id: jobData.page_id || null,
      job_type: jobData.job_type, // 'BUSINESS_UNDERSTANDING' | 'KEYWORD_DISCOVERY' | 'SERP_ANALYSIS' | 'CONTENT_GAP' | 'PAGE_OPTIMIZATION' | 'BLOG_GENERATION' | 'AEO_FAQ' | 'SCHEMA_GEN' | 'QUALITY_VALIDATION'
      status: jobData.status || 'QUEUED', // 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
      model: jobData.model || 'gemini-3.7-flash',
      input_tokens: 0,
      output_tokens: 0,
      estimated_cost: 0,
      payload: jobData.payload || {},
      result: null,
      error: null,
      retry_count: 0,
      created_at: new Date().toISOString(),
      started_at: null,
      completed_at: null
    };
    this.db.ai_jobs.unshift(job);
    this.save();
    return job;
  }

  updateAiJob(jobId, updates) {
    if (!this.db.ai_jobs) this.db.ai_jobs = [];
    const job = this.db.ai_jobs.find(j => j.id === jobId);
    if (job) {
      Object.assign(job, updates);
      this.save();
    }
    return job;
  }

  // --- AI Token & Cost Tracking ---
  logAiUsage(clientId, task, model, inputTokens, outputTokens, cost) {
    const record = {
      id: `ai_${Date.now()}`,
      client_id: clientId,
      task,
      model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      estimated_cost: cost,
      created_at: new Date().toISOString()
    };
    this.db.ai_usage.push(record);
    
    // Update client spend
    const client = this.getClientById(clientId);
    if (client) {
      client.current_ai_spend = Number(((client.current_ai_spend || 0) + cost).toFixed(4));
    }
    this.save();
    return record;
  }
}

export const db = new SeoDatabase();
