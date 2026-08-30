import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load API key from environment files if not present in process.env
function getApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  if (process.env.VITE_GEMINI_API_KEY) return process.env.VITE_GEMINI_API_KEY;

  try {
    const envLocalPath = path.join(__dirname, '../../.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf-8');
      const match = content.match(/VITE_GEMINI_API_KEY=["']?([^"'\n]+)["']?/);
      if (match && match[1]) return match[1];
    }
  } catch (e) {}

  try {
    const envPath = path.join(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/VITE_GEMINI_API_KEY=["']?([^"'\n]+)["']?/);
      if (match && match[1]) return match[1];
    }
  } catch (e) {}

  return '';
}

export const AI_TASK_TYPES = {
  KEYWORD_CLUSTERING: 'KEYWORD_CLUSTERING',
  ENTITY_ANALYSIS: 'ENTITY_ANALYSIS',
  SERP_SYNTHESIS: 'SERP_SYNTHESIS',
  PAGE_OPTIMIZATION: 'PAGE_OPTIMIZATION',
  AEO_FAQ_GENERATION: 'AEO_FAQ_GENERATION',
  GEO_CITATION_MAPPING: 'GEO_CITATION_MAPPING',
  BLOG_OUTLINE: 'BLOG_OUTLINE',
  BLOG_WRITING: 'BLOG_WRITING'
};

export const AI_MODELS = {
  FLASH_LITE: 'gemini-3.5-flash-lite',
  FLASH: process.env.DEFAULT_GEMINI_MODEL || 'gemini-3.6-flash',
  PRO: 'gemini-3.1-pro-preview'
};

// Fallback model list if primary endpoint encounters rate limits
const FALLBACK_MODELS = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-pro'];

// Cost per 1M tokens (USD estimates)
const MODEL_PRICING = {
  'gemini-3.7-flash': { input: 0.15, output: 0.60 },
  'gemini-2.5-flash': { input: 0.15, output: 0.60 },
  'gemini-2.5-flash-lite': { input: 0.075, output: 0.30 },
  'gemini-1.5-flash': { input: 0.075, output: 0.30 },
  'gemini-3.1-pro': { input: 1.25, output: 5.00 },
  'gemini-2.5-pro': { input: 1.25, output: 5.00 }
};

export class AiModelRouter {
  constructor() {
    this.apiKey = getApiKey();
  }

  selectModelForTask(taskType) {
    switch (taskType) {
      case AI_TASK_TYPES.KEYWORD_CLUSTERING:
      case AI_TASK_TYPES.PAGE_OPTIMIZATION:
      case AI_TASK_TYPES.AEO_FAQ_GENERATION:
      case AI_TASK_TYPES.GEO_CITATION_MAPPING:
        return AI_MODELS.FLASH;
      case AI_TASK_TYPES.SERP_SYNTHESIS:
      case AI_TASK_TYPES.BLOG_WRITING:
      case AI_TASK_TYPES.ENTITY_ANALYSIS:
        return AI_MODELS.FLASH; // Defaulting to 3.7 Flash for agentic speed & capability
      default:
        return AI_MODELS.FLASH;
    }
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

  async executeTask(clientId, taskType, systemPrompt, userPrompt, jsonOutput = true) {
    const client = db.getClientById(clientId);
    if (client) {
      // Check monthly AI budget protection ($50/month)
      const currentSpend = client.current_ai_spend || 0;
      const budget = client.monthly_ai_budget || 50.0;
      if (currentSpend >= budget) {
        throw new Error(`Monthly AI automation budget of $${budget} reached for client ${client.name}. Automation paused.`);
      }
    }

    let modelName = this.selectModelForTask(taskType);
    const apiKey = this.apiKey || getApiKey();

    const estInputTokens = Math.ceil((systemPrompt.length + userPrompt.length) / 4);
    let resultText = '';
    let estOutputTokens = 900;
    let success = false;

    if (apiKey) {
      const candidateModels = [modelName, ...FALLBACK_MODELS];
      
      for (const currentModel of candidateModels) {
        if (success) break;

        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000);

            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`,
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
                    responseMimeType: jsonOutput ? 'application/json' : 'text/plain'
                  }
                })
              }
            );

            clearTimeout(timeoutId);

            if (response.ok) {
              const resJson = await response.json();
              const textPart = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textPart) {
                resultText = this.cleanJsonString(textPart);
                if (resJson.usageMetadata?.candidatesTokenCount) {
                  estOutputTokens = resJson.usageMetadata.candidatesTokenCount;
                }
                modelName = currentModel;
                success = true;
                break;
              }
            } else {
              const errBody = await response.text();
              console.warn(`[AiRouter] ${currentModel} returned ${response.status}: ${errBody.slice(0, 120)}`);
              if (response.status === 404) break; // Model not available, try fallback model
            }
          } catch (err) {
            console.warn(`[AiRouter] Attempt ${attempt} failed for ${currentModel}: ${err.message}`);
            // Wait with exponential backoff before retry
            await new Promise(r => setTimeout(r, attempt * 1200));
          }
        }
      }
    }

    // Calculate AI usage cost
    const pricing = MODEL_PRICING[modelName] || MODEL_PRICING['gemini-3.7-flash'];
    const cost = Number(((estInputTokens / 1_000_000) * pricing.input + (estOutputTokens / 1_000_000) * pricing.output).toFixed(5));

    db.logAiUsage(clientId, taskType, modelName, estInputTokens, estOutputTokens, cost);

    return {
      text: resultText,
      model: modelName,
      cost,
      inputTokens: estInputTokens,
      outputTokens: estOutputTokens,
      success
    };
  }
}

export const aiRouter = new AiModelRouter();
