import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // path can be passed via query string (?path=spatial-rail/...) or via path parameter
    let rawPath = '';
    if (typeof req.query.path === 'string') {
      rawPath = req.query.path;
    } else if (Array.isArray(req.query.path)) {
      rawPath = req.query.path.join('/');
    } else if (req.url) {
      const parsed = new URL(req.url, 'http://localhost');
      rawPath = parsed.searchParams.get('path') || parsed.pathname.replace(/^\/api\/proxy-site\/?/, '');
    }

    if (!rawPath) {
      return res.status(400).send('Missing path');
    }

    const targetUrl = `https://spatialsites.co/_sites/${rawPath}`;

    let kit = 'spatial-rail';
    if (rawPath.startsWith('teasel/')) {
      kit = 'teasel';
    } else if (rawPath.startsWith('spool/')) {
      kit = 'spool';
    } else if (rawPath.startsWith('the-descent/')) {
      kit = 'the-descent';
    } else if (rawPath.startsWith('thumbstop/')) {
      kit = 'thumbstop';
    } else if (rawPath.startsWith('flight/')) {
      kit = 'flight';
    } else if (rawPath.startsWith('spatial-sip/')) {
      kit = 'spatial-sip';
    } else if (rawPath.startsWith('long-way-round/')) {
      kit = 'long-way-round';
    }

    let dest = 'empty';
    let mode = 'no-cors';
    if (rawPath.endsWith('.js') || rawPath.endsWith('.mjs')) {
      dest = 'script';
      mode = 'cors';
    } else if (rawPath.endsWith('.css')) {
      dest = 'style';
      mode = 'no-cors';
    } else if (rawPath.endsWith('.woff2') || rawPath.endsWith('.woff') || rawPath.endsWith('.ttf')) {
      dest = 'font';
      mode = 'cors';
    } else if (rawPath.endsWith('.webp') || rawPath.endsWith('.png') || rawPath.endsWith('.jpg') || rawPath.endsWith('.svg')) {
      dest = 'image';
      mode = 'no-cors';
    }

    const aResp = await fetch(targetUrl, {
      headers: {
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': mode,
        'Sec-Fetch-Dest': dest,
        'Referer': `https://spatialsites.co/_sites/${kit}/index.html`,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const contentType = aResp.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);
    
    // Add aggressive caching for immutable static assets
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800');

    const arrayBuf = await aResp.arrayBuffer();
    return res.status(aResp.status).send(Buffer.from(arrayBuf));
  } catch (err: any) {
    return res.status(502).send(`Asset proxy error: ${err.message}`);
  }
}
