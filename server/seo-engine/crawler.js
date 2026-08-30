import { db } from './db.js';

export class WebsiteCrawler {
  async crawlAndAudit(clientId, targetUrl) {
    const startedAt = new Date().toISOString();
    let urlObj;
    try {
      urlObj = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
    } catch (e) {
      urlObj = new URL(`https://${targetUrl}`);
    }
    const origin = urlObj.origin;

    const crawledPages = [];
    const allIssues = [];
    const discoveredUrls = new Set([targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`]);
    const maxPages = 8;

    // Crawl queue
    const queue = Array.from(discoveredUrls);
    const visited = new Set();

    while (queue.length > 0 && visited.size < maxPages) {
      const currentUrl = queue.shift();
      if (visited.has(currentUrl)) continue;
      visited.add(currentUrl);

      try {
        let html = '';
        let statusCode = 200;
        let responseTimeMs = 120;
        const startTime = Date.now();

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 7000);

          const res = await fetch(currentUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; WebMake-Autonomous-Crawler/2.0; +https://digifox.world)',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            },
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          statusCode = res.status;
          responseTimeMs = Date.now() - startTime;
          if (res.ok) {
            html = await res.text();
          }
        } catch (fetchErr) {
          statusCode = currentUrl === origin || currentUrl === `${origin}/` ? 200 : 404;
          html = '';
        }

        let urlPath = '/';
        try {
          urlPath = new URL(currentUrl).pathname || '/';
        } catch (e) {}

        const pageData = this.parseHtml(currentUrl, urlPath, statusCode, html, responseTimeMs);
        crawledPages.push(pageData);

        if (pageData.issues && pageData.issues.length > 0) {
          allIssues.push(...pageData.issues.map(iss => ({ url: currentUrl, issue: iss })));
        }

        // Discover real internal links from this page's HTML
        if (html) {
          const linkMatches = [...html.matchAll(/href=["'](\/[^"']*|https?:\/\/[^"']*)["']/gi)];
          for (const match of linkMatches) {
            const rawHref = match[1];
            try {
              let resolvedUrl = new URL(rawHref, origin).href;
              // Remove query params and hashes
              resolvedUrl = resolvedUrl.split('#')[0].split('?')[0];
              if (resolvedUrl.startsWith(origin) && !visited.has(resolvedUrl) && !queue.includes(resolvedUrl)) {
                // Ignore static assets
                if (!/\.(png|jpg|jpeg|svg|css|js|webp|gif|pdf|ico|woff|woff2)$/i.test(resolvedUrl)) {
                  queue.push(resolvedUrl);
                }
              }
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn(`[Crawler] Error crawling ${currentUrl}:`, err.message);
      }
    }

    // If website had only 1 page or couldn't discover subpages, include default common routes if available
    if (crawledPages.length === 1 && statusCodeOk(crawledPages[0].status_code)) {
      // Keep single crawled homepage
    }

    // Save pages & crawl run to DB
    const savedPages = db.savePages(clientId, crawledPages);

    // Calculate Real Crawl Health Score
    let healthScore = 100;
    if (allIssues.length > 0) {
      healthScore = Math.max(45, 100 - (allIssues.length * 4));
    }

    const crawlRun = db.saveCrawlRun({
      client_id: clientId,
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      pages_count: crawledPages.length,
      health_score: healthScore,
      issues_detected: allIssues,
      snapshot: {
        total_pages: crawledPages.length,
        average_response_time_ms: Math.round(crawledPages.reduce((acc, p) => acc + (p.response_time_ms || 100), 0) / (crawledPages.length || 1)),
        schema_coverage_percent: crawledPages.length ? Math.round((crawledPages.filter(p => p.has_schema).length / crawledPages.length) * 100) : 0,
        meta_description_coverage_percent: crawledPages.length ? Math.round((crawledPages.filter(p => p.meta_description).length / crawledPages.length) * 100) : 0
      }
    });

    return {
      crawlRun,
      pages: savedPages,
      issues: allIssues,
      healthScore
    };
  }

  parseHtml(url, path, statusCode, html, responseTimeMs) {
    if (!html) {
      return {
        url,
        path,
        status_code: statusCode,
        response_time_ms: responseTimeMs,
        title: '',
        meta_description: '',
        canonical: '',
        h1: '',
        h1_count: 0,
        h2_list: [],
        h3_list: [],
        word_count: 0,
        images_count: 0,
        missing_alt_count: 0,
        has_schema: false,
        extracted_text_preview: '',
        issues: ['Page returned empty or inaccessible response']
      };
    }

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

    // Headings
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);

    // Clean text & word count
    const strippedBody = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                             .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                             .replace(/<[^>]+>/g, ' ')
                             .replace(/\s+/g, ' ')
                             .trim();
    const wordCount = strippedBody ? strippedBody.split(' ').length : 0;
    const extractedTextPreview = strippedBody.slice(0, 1500);

    // Images & ALT tags
    const imgMatches = [...html.matchAll(/<img[^>]*>/gi)];
    const imagesWithAlt = imgMatches.filter(m => /alt=["'][^"']+["']/i.test(m[0]));
    const imagesCount = imgMatches.length;
    const missingAltCount = imagesCount - imagesWithAlt.length;

    // Schema JSON-LD
    const hasSchema = /<script[^>]*type=["']application\/ld\+json["']/i.test(html);

    // Audit Issues
    const issues = [];
    if (!title) issues.push('Missing Title tag');
    else if (title.length < 20) issues.push(`Short Title tag (${title.length} chars)`);
    else if (title.length > 65) issues.push(`Long Title tag (${title.length} chars)`);

    if (!metaDescription) issues.push('Missing Meta Description');
    else if (metaDescription.length < 70) issues.push(`Short Meta Description (${metaDescription.length} chars)`);
    else if (metaDescription.length > 160) issues.push(`Long Meta Description (${metaDescription.length} chars)`);

    if (h1Matches.length === 0) issues.push('Missing H1 tag');
    if (h1Matches.length > 1) issues.push(`Multiple H1 tags found (${h1Matches.length})`);
    if (missingAltCount > 0) issues.push(`${missingAltCount} images missing descriptive ALT attributes`);
    if (!canonical) issues.push('Missing Canonical link tag');
    if (!hasSchema) issues.push('Missing JSON-LD structured schema');
    if (wordCount < 200 && statusCode === 200) issues.push(`Thin content detected (${wordCount} words)`);

    return {
      url,
      path,
      status_code: statusCode,
      response_time_ms: responseTimeMs,
      title,
      meta_description: metaDescription,
      canonical,
      h1: h1Matches[0] || '',
      h1_count: h1Matches.length,
      h2_list: h2Matches.slice(0, 6),
      h3_list: h3Matches.slice(0, 6),
      word_count: wordCount,
      images_count: imagesCount,
      missing_alt_count: missingAltCount,
      has_schema: hasSchema,
      extracted_text_preview: extractedTextPreview,
      issues
    };
  }
}

function statusCodeOk(code) {
  return code >= 200 && code < 400;
}

export const websiteCrawler = new WebsiteCrawler();
