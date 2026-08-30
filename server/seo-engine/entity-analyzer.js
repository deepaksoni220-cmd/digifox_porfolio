import { db } from './db.js';
import { aiRouter, AI_TASK_TYPES } from './ai-router.js';

export class EntityAnalyzer {
  async analyzeBusinessEntities(clientId) {
    const client = db.getClientById(clientId);
    if (!client) throw new Error(`Client not found: ${clientId}`);

    const pages = db.getPages(clientId);
    const contentSnippets = pages.map(p => `${p.path}: ${p.title} - ${p.meta_description} (H1: ${p.h1})`).join('\n');

    const prompt = `You are a Knowledge Graph and Entity SEO specialist.
Analyze the following business to extract verified entities without inventing any fake facts.

Business Name: ${client.name}
Website: ${client.url}
Category: ${client.category}
Target Country/City: ${client.target_country} / ${client.target_city}
Services: ${client.services.join(', ')}
Competitors: ${client.competitors?.join(', ') || 'N/A'}
Language: ${client.language}

Crawl Snippets:
${contentSnippets}

Return JSON with:
{
  "brand_entity": { "name": "${client.name}", "type": "Organization", "sameAs": [] },
  "service_entities": [{"name": "...", "description": "...", "target_intent": "Commercial"}],
  "location_nodes": [{"city": "${client.target_city || 'Global'}", "country": "${client.target_country}"}],
  "topical_clusters": ["...", "..."],
  "factual_claims": ["Verified service offering in ...", "..."]
}`;

    let entityResult = {
      brand_entity: { name: client.name, type: 'Organization', url: client.url },
      service_entities: client.services.map(s => ({ name: s, description: `Professional ${s} by ${client.name}`, target_intent: 'Commercial' })),
      location_nodes: [{ city: client.target_city || 'Global', country: client.target_country || 'Global' }],
      topical_clusters: [client.category, ...client.services],
      factual_claims: [`${client.name} provides ${client.services.join(', ')}.`]
    };

    try {
      const aiResponse = await aiRouter.executeTask(
        clientId,
        AI_TASK_TYPES.ENTITY_ANALYSIS,
        'You are an Entity SEO Knowledge Graph architect. Output valid JSON only.',
        prompt,
        true
      );
      if (aiResponse.text) {
        const parsed = JSON.parse(aiResponse.text);
        if (parsed.brand_entity) entityResult = parsed;
      }
    } catch (e) {
      console.warn('Entity AI parsing fallback active:', e.message);
    }

    return entityResult;
  }
}

export const entityAnalyzer = new EntityAnalyzer();
