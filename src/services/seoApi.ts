export interface KeywordItem {
  id: string;
  client_id?: string;
  keyword: string;
  category: "seo" | "geo" | "aeo" | "blog";
  engine: string;
  volume: string;
  volume_num?: number;
  difficulty: "Low" | "Medium" | "High";
  intent: "Commercial" | "Transactional" | "Informational" | "Navigational" | "COMMERCIAL" | "TRANSACTIONAL" | "INFORMATIONAL" | "NAVIGATIONAL";
  rank: string;
  change: string;
  opportunity_score?: number;
  target_url?: string;
  target_path?: string;
  blog_title?: string;
  recommended_action?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  url: string;
  platform: "wordpress" | "shopify" | "custom";
  category: string;
  target_country: string;
  target_city: string;
  services: string[];
  brands: string[];
  description?: string;
  conversion_goal?: string;
  target_audience?: string;
  competitors?: string[];
  language?: string;
  platformDetails: {
    apiUrl?: string;
    authKey?: string;
    storeDomain?: string;
    autoPublish: boolean;
    username?: string;
    wpUser?: string;
    appPassword?: string;
    shopifyToken?: string;
    shopifyBlogId?: string;
    webhookUrl?: string;
    webhookSecret?: string;
    postStatus?: string;
    seoPlugin?: string;
    [key: string]: any;
  };
  serpApiKey?: string;
  lastAudit?: string;
  scores: {
    seo: number;
    geo: number;
    aeo: number;
  };
  metrics: {
    impressions: string;
    clicks: string;
    aiCitations: number;
    voiceAnswers: number;
    indexedPages: number;
  };
  monthly_ai_budget?: number;
  current_ai_spend?: number;
  automation_mode?: "MANUAL" | "REVIEW_AND_APPROVE" | "AUTOMATIC";
  connected?: boolean;
}

export interface BlogPost {
  id: string;
  client_id: string;
  title: string;
  keyword: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  status: "DRAFT" | "PUBLISHED";
  word_count: string;
  score: number;
  created_at: string;
}

export interface PipelineRun {
  id: string;
  client_id: string;
  status: "RUNNING" | "COMPLETED" | "FAILED";
  stage: number;
  total_stages: number;
  progress: number;
  logs: string[];
  started_at: string;
  completed_at?: string;
}

const API_BASE = "/api/seo";

function getAuthHeaders(extraHeaders: Record<string, string> = {}) {
  const token = localStorage.getItem("digifox_auth_token");
  const headers: Record<string, string> = { ...extraHeaders };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const seoApi = {
  async getClients(): Promise<ClientProfile[]> {
    const res = await fetch(`${API_BASE}/clients`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data.clients || [];
  },

  async getClientById(id: string) {
    const res = await fetch(`${API_BASE}/clients/${id}`, {
      headers: getAuthHeaders()
    });
    return await res.json();
  },

  async onboardClient(clientData: Partial<ClientProfile>): Promise<{ client: ClientProfile; keywords: KeywordItem[] }> {
    const res = await fetch(`${API_BASE}/clients`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(clientData)
    });
    return await res.json();
  },

  async updateClient(id: string, updates: Partial<ClientProfile>): Promise<{ client: ClientProfile }> {
    const res = await fetch(`${API_BASE}/clients/${id}`, {
      method: "PUT",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(updates)
    });
    return await res.json();
  },

  async startPipeline(clientId: string): Promise<{ run: PipelineRun }> {
    const res = await fetch(`${API_BASE}/pipeline/start`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ clientId })
    });
    return await res.json();
  },

  async getPipelineStatus(clientId: string): Promise<PipelineRun[]> {
    const res = await fetch(`${API_BASE}/pipeline/${clientId}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data.runs || [];
  },

  async getKeywords(clientId: string): Promise<KeywordItem[]> {
    const res = await fetch(`${API_BASE}/keywords/${clientId}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data.keywords || [];
  },

  async generateKeywords(clientId: string): Promise<KeywordItem[]> {
    const res = await fetch(`${API_BASE}/keywords/generate`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ clientId })
    });
    const data = await res.json();
    return data.keywords || [];
  },

  async inspectSerp(clientId: string, keyword: string) {
    const res = await fetch(`${API_BASE}/serp/inspect`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ clientId, keyword })
    });
    return await res.json();
  },

  async optimizeAllPages(clientId: string, pushToWordPress: boolean = false): Promise<any> {
    const res = await fetch(`${API_BASE}/optimize-all-pages`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ clientId, pushToWordPress })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async getBlogs(clientId: string): Promise<BlogPost[]> {
    const res = await fetch(`${API_BASE}/blogs/${clientId}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data.blogs || [];
  },

  async generateBlog(clientId: string, keyword: string, topic?: string): Promise<{ blog: BlogPost }> {
    const res = await fetch(`${API_BASE}/blogs/generate`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ clientId, keyword, topic })
    });
    return await res.json();
  },

  async optimizeKeyword(clientId: string, keyword: string, targetUrl?: string) {
    const res = await fetch(`${API_BASE}/optimize/keyword`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ clientId, keyword, targetUrl })
    });
    return await res.json();
  },

  async testCms(clientId: string, platform?: string) {
    const res = await fetch(`${API_BASE}/cms/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, platform })
    });
    return await res.json();
  },

  async getSeoChanges(clientId: string) {
    const res = await fetch(`${API_BASE}/seo-changes/${clientId}`);
    return await res.json();
  },

  async approveSeoChange(changeId: string, status: "APPROVED" | "APPLIED" | "ROLLED_BACK") {
    const res = await fetch(`${API_BASE}/seo-changes/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ changeId, status })
    });
    return await res.json();
  },

  async runAudit(clientId: string) {
    const res = await fetch(`${API_BASE}/audit/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId })
    });
    return await res.json();
  },

  async getAudit(clientId: string) {
    const res = await fetch(`${API_BASE}/audit/${clientId}`);
    return await res.json();
  },

  async autoFixAudit(clientId: string) {
    const res = await fetch(`${API_BASE}/audit/autofix`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId })
    });
    return await res.json();
  },

  async getReport(clientId: string) {
    const res = await fetch(`${API_BASE}/report/${clientId}`);
    return await res.json();
  },

  async getAiJobs(clientId: string) {
    const res = await fetch(`${API_BASE}/ai/jobs/${clientId}`, {
      headers: getAuthHeaders()
    });
    return await res.json();
  },

  async getAiUsage(clientId: string) {
    const res = await fetch(`${API_BASE}/ai/usage/${clientId}`, {
      headers: getAuthHeaders()
    });
    return await res.json();
  },

  async enqueueAiJob(clientId: string, jobType: string, payload: any) {
    const res = await fetch(`${API_BASE}/ai/jobs/enqueue`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ clientId, jobType, payload })
    });
    return await res.json();
  }
};
