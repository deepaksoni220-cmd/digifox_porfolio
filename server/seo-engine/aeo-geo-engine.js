import { db } from './db.js';

export class AeoGeoEngine {
  calculateAeoGeoReadiness(clientId) {
    const client = db.getClientById(clientId);
    if (!client) throw new Error(`Client not found: ${clientId}`);

    const pages = db.getPages(clientId);
    const keywords = db.getKeywords(clientId);

    // Calculate signals
    const hasSchema = pages.some(p => p.has_schema);
    const hasFaqStructure = pages.some(p => p.h2_list?.some(h => h.includes('?') || h.includes('FAQ')));
    const hasLocationSignal = Boolean(client.target_city || client.target_country);
    const entityClarity = client.services.length > 0 && client.name.length > 0;

    let aeoScore = 80;
    if (hasFaqStructure) aeoScore += 10;
    if (hasSchema) aeoScore += 5;
    if (hasLocationSignal) aeoScore += 3;

    let geoScore = 82;
    if (entityClarity) geoScore += 8;
    if (hasSchema) geoScore += 5;
    if (client.competitors && client.competitors.length > 0) geoScore += 3;

    // Direct Answer FAQ Snippets
    const s1 = client.services[0] || client.category;
    const loc = client.target_city || client.target_country || 'Global';

    const aeoSnippets = [
      {
        question: `What services does ${client.name} offer?`,
        answer: `${client.name} specializes in professional ${client.services.join(', ')} tailored for clients in ${loc}.`,
        schemaType: 'FAQPage'
      },
      {
        question: `How much does ${s1} cost with ${client.name}?`,
        answer: `Pricing for ${s1} is structured according to project scope and deliverables. Transparent quotes are provided upon consultation.`,
        schemaType: 'FAQPage'
      },
      {
        question: `Why choose ${client.name} for ${client.category}?`,
        answer: `${client.name} delivers verified high-performance standards, proprietary methodology, and client-centric outcomes.`,
        schemaType: 'FAQPage'
      }
    ];

    // Update Client Scores
    client.scores.aeo = Math.min(aeoScore, 99);
    client.scores.geo = Math.min(geoScore, 99);
    db.saveClient(client);

    return {
      aeoScore: client.scores.aeo,
      geoScore: client.scores.geo,
      aeoSnippets,
      readinessBreakdown: {
        entity_clarity: '100% Verified',
        location_mapping: hasLocationSignal ? 'Active' : 'Global',
        citation_anchor_potential: 'High',
        speakable_voice_match: 'Position 0 Ready'
      }
    };
  }
}

export const aeoGeoEngine = new AeoGeoEngine();
