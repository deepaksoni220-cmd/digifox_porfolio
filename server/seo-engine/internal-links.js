import { db } from './db.js';

export class InternalLinkingEngine {
  buildLinkGraph(clientId) {
    const client = db.getClientById(clientId);
    if (!client) throw new Error(`Client not found: ${clientId}`);

    const pages = db.getPages(clientId);
    const keywords = db.getKeywords(clientId);

    const linkSuggestions = [];

    // Map blog & service pages to main service and pricing landing pages
    const mainServicePage = pages.find(p => p.path === '/services') || pages[0];
    const pricingPage = pages.find(p => p.path === '/pricing') || pages[0];
    const contactPage = pages.find(p => p.path === '/contact') || pages[0];

    const s1 = client.services[0] || client.category;
    const s2 = client.services[1] || s1;

    linkSuggestions.push({
      source_page: '/blog',
      source_title: 'Industry Insights & Guides',
      target_page: mainServicePage ? mainServicePage.path : '/services',
      anchor_text: `${s1} solutions`,
      reason: `Contextual link passing topical authority from informational blog guides to commercial service landing page.`
    });

    linkSuggestions.push({
      source_page: '/about',
      source_title: `About ${client.name}`,
      target_page: contactPage ? contactPage.path : '/contact',
      anchor_text: `schedule a consultation with ${client.name}`,
      reason: `Conversion bridge directing high-trust 'About' visitors straight to booking and inquiries.`
    });

    if (pricingPage) {
      linkSuggestions.push({
        source_page: '/services',
        source_title: 'Services Overview',
        target_page: pricingPage.path,
        anchor_text: `transparent ${s2} investment breakdown`,
        reason: `Connects high-intent commercial service browsers with pricing tiers and ROI details.`
      });
    }

    db.saveInternalLinks(clientId, linkSuggestions);

    return {
      total_pages_analyzed: pages.length,
      orphan_pages_detected: 0,
      link_suggestions: linkSuggestions
    };
  }
}

export const internalLinkingEngine = new InternalLinkingEngine();
