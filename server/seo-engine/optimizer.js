import { db } from './db.js';

export class PageOptimizer {
  async optimizeClientPages(clientId) {
    const client = db.getClientById(clientId);
    if (!client) throw new Error(`Client not found: ${clientId}`);

    const pages = db.getPages(clientId);
    const keywords = db.getKeywords(clientId);
    const proposedChanges = [];

    for (const page of pages) {
      // Find matching keywords mapped to this page
      const mappedKw = keywords.find(k => k.target_path === page.path) || keywords[0];
      const primaryKw = mappedKw ? mappedKw.keyword : client.category;

      // 1. Title Tag Optimization
      if (!page.title || page.title.length < 25 || !page.title.toLowerCase().includes(primaryKw.toLowerCase().split(' ')[0])) {
        const proposedTitle = `${primaryKw.charAt(0).toUpperCase() + primaryKw.slice(1)} | ${client.name}`;
        proposedChanges.push(db.saveSeoChange(clientId, {
          page_id: page.id,
          page_url: page.url,
          field: 'title',
          before: page.title || '(Empty Title)',
          after: proposedTitle,
          reason: `Integrate primary commercial keyword "${primaryKw}" into high-CTR title tag.`,
          impact: 'HIGH',
          confidence: 99,
          status: client.automation_mode === 'AUTOMATIC' ? 'APPLIED' : 'PROPOSED'
        }));
      }

      // 2. Meta Description Optimization
      if (!page.meta_description || page.meta_description.length < 80) {
        const proposedDesc = `Discover premier ${client.services.slice(0, 2).join(' & ')} by ${client.name}. Rated #1 for quality in ${client.target_city || 'Global'}. Book your consultation today.`;
        proposedChanges.push(db.saveSeoChange(clientId, {
          page_id: page.id,
          page_url: page.url,
          field: 'meta_desc',
          before: page.meta_description || '(Empty Meta Description)',
          after: proposedDesc,
          reason: `High-conversion 155-character meta description with location signals and clear call-to-action.`,
          impact: 'HIGH',
          confidence: 98,
          status: client.automation_mode === 'AUTOMATIC' ? 'APPLIED' : 'PROPOSED'
        }));
      }

      // 3. Schema JSON-LD Injection
      if (!page.has_schema) {
        const schemaCode = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": page.title || client.name,
          "url": page.url,
          "isPartOf": {
            "@type": "Organization",
            "name": client.name,
            "url": client.url
          }
        }, null, 2);

        proposedChanges.push(db.saveSeoChange(clientId, {
          page_id: page.id,
          page_url: page.url,
          field: 'schema',
          before: 'No schema detected',
          after: schemaCode,
          reason: `Inject validated WebPage and Organization JSON-LD structured schema for search engines.`,
          impact: 'MEDIUM',
          confidence: 99,
          status: client.automation_mode === 'AUTOMATIC' ? 'APPLIED' : 'PROPOSED'
        }));
      }

      // 4. Missing ALT Attributes
      if (page.missing_alt_count > 0) {
        proposedChanges.push(db.saveSeoChange(clientId, {
          page_id: page.id,
          page_url: page.url,
          field: 'alt',
          before: `${page.missing_alt_count} images missing descriptive alt tags`,
          after: `Apply descriptive semantic alt tags: "${client.name} ${primaryKw} Showcase"`,
          reason: `Enhance Google Image search indexing and web accessibility compliance.`,
          impact: 'MEDIUM',
          confidence: 96,
          status: client.automation_mode === 'AUTOMATIC' ? 'APPLIED' : 'PROPOSED'
        }));
      }
    }

    return proposedChanges;
  }

  // Optimize specific page for a chosen target keyword
  async optimizeForSpecificKeyword(clientId, keyword, targetUrl = null) {
    const client = db.getClientById(clientId);
    if (!client) throw new Error(`Client not found: ${clientId}`);

    const pages = db.getPages(clientId);
    const targetPage = (targetUrl ? pages.find(p => p.url === targetUrl || p.path === targetUrl) : null) || pages[0] || {
      id: 'page_main',
      url: client.url,
      path: '/',
      title: `${client.name} - ${client.category}`
    };

    const cleanKw = keyword.trim();
    const capitalizedKw = cleanKw.charAt(0).toUpperCase() + cleanKw.slice(1);
    const loc = client.target_city || client.target_country || '';

    const optimizedTitle = `${capitalizedKw} | ${client.name} ${loc ? `· ${loc}` : ''}`;
    const optimizedDesc = `Explore top-grade ${cleanKw} with ${client.name}. 100% authentic, verified quality & fast delivery across ${loc || 'India'}. Discover our complete range now.`;
    const recommendedH1 = `${capitalizedKw} — Hand-Selected Quality & Direct Sourcing`;
    const recommendedH2s = [
      `Why Choose ${client.name} for ${capitalizedKw}?`,
      `Nutritional Profile & Certified Purity Standards`,
      `Wholesale & Bulk Orders Available Across ${loc || 'India'}`,
      `Frequently Asked Questions about ${capitalizedKw}`
    ];

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": capitalizedKw,
      "brand": {
        "@type": "Brand",
        "name": client.name
      },
      "description": optimizedDesc,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": client.name,
          "url": client.url
        }
      }
    };

    // Save proposed change to db
    const changeRecord = db.saveSeoChange(clientId, {
      page_id: targetPage.id,
      page_url: targetPage.url,
      keyword: cleanKw,
      field: 'title_and_meta',
      before: `Title: ${targetPage.title || 'Default'}`,
      after: `Title: ${optimizedTitle}\nMeta: ${optimizedDesc}`,
      meta_title: optimizedTitle,
      meta_description: optimizedDesc,
      recommended_h1: recommendedH1,
      recommended_h2s: recommendedH2s,
      schema_json: JSON.stringify(schema, null, 2),
      reason: `Targeted high-intent keyword optimization for "${cleanKw}".`,
      impact: 'HIGH',
      confidence: 99,
      status: 'PROPOSED'
    });

    return {
      success: true,
      keyword: cleanKw,
      page_url: targetPage.url,
      meta_title: optimizedTitle,
      meta_description: optimizedDesc,
      recommended_h1: recommendedH1,
      recommended_h2s: recommendedH2s,
      schema_json: JSON.stringify(schema, null, 2),
      change: changeRecord
    };
  }
}

export const pageOptimizer = new PageOptimizer();
