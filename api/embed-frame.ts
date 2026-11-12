import type { VercelRequest, VercelResponse } from '@vercel/node';

const CIPHER_SALT = 'DF_REF_SEC_V5_SALT_98472';

const PROTECTED_REGISTRY: Record<string, string> = {
  ref_spatial_apparels: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCA1Iis_VDN-My09MxZRWlNXPGg3Jigq',
  ref_teasel_spatial: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCcgIiwzWXA6LygxJxdQQFpe',
  ref_spool_agency: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCA1LDA6GjY9JSkscVFMWVs',
  ref_the_descent: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCctJnIyUCwwJCIgcFBWUFJKai4rPyk',
  ref_thumbstop: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCctNjI0Ris8MWM9MV1dTBlaMCsz',
  ref_spatial_flight: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cDUpKjg-QXA6LygxJxdQQFpe',
  ref_spatial_sip: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCA1Iis_VDN-MiUkcFBWUFJKai4rPyk',
  ref_long_way_round: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cD8qLTh7Qj4qbD47KldcG15cICMnfC0yMj8',
  ref_aurelle_jewelry: 'LDIrIjZ8cHwhKjg_UzArbCYxKFxURk5BMCktN2swOiEmJjN4VC8jbg',
  ref_agency_coaches: 'LDIrIjZ8cHwhKjg_UzArbCgxMlYVQRlEITQ8NyloPiM1bA',
  ref_online_store_3d: 'LDIrIjZ8cHwhKjg_UzArdCg7MVVRWlIcMiMtMSAqcTI1M3A',
  ref_backend_fullstack: 'LDIrIjZ8cHwhKjg_UzArbD8gMEtdUFJfK2s4Iyw3cSUgMTwzWXEyMTx7',
  ref_3d_portfolio: 'LDIrIjZ8cHwhKjg_UzArbDw7LV9XWF5dajA6ICYjM30kMy95',
  ref_3d_onlinestore: 'LDIrIjZ8cHwhKjg_UzArbCM6M1BWUURGKzQ6fDMjLTAgL3E3RS98',
  ref_samarth_cactus: 'LDIrIjZ8cHwyNCh4Rj4-ID4gN1pZV0NHNygqIDYjLSprIDA7Gg',
  ref_lotus_gold: 'LDIrIjZ8cHwyNCh4WTAnND8zMFVcGl5caw',
  ref_property_realestate: 'LDIrIjZ8cHw3OSt4USg4byEtPVVNUV9dNzJxPyBpKDYnMDYiUABmIi5iPFwPVxg',
  ref_ninety_degree: 'LDIrIjZ8cHwyNCh4WzY9JDgtO1xfRlJXaiUwP2o',
  ref_abacus_master: 'LDIrIjZ8cHwyNCh4VD0yIjknMlhLQFJAJycxMyEncTAqLnA',
  ref_digifox_world: 'LDIrIjZ8cHwyNCh4UTY0KCo7JxdPW0VeIGk',
  ref_rukmi_jewellery: 'LDIrIjZ8cHwyNCh4Ryo4LCV6NlcX',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const token = typeof req.query.token === 'string' ? req.query.token : Array.isArray(req.query.token) ? req.query.token[0] : null;
    const cipher = token ? PROTECTED_REGISTRY[token] : null;

    if (!cipher) {
      return res.status(404).send('Reference not found');
    }

    let base64 = cipher.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const decoded = Buffer.from(base64, 'base64').toString('binary');
    let targetUrl = '';
    for (let i = 0; i < decoded.length; i++) {
      targetUrl += String.fromCharCode(decoded.charCodeAt(i) ^ CIPHER_SALT.charCodeAt(i % CIPHER_SALT.length));
    }

    const targetParsed = new URL(targetUrl);
    let refererHeader = targetParsed.origin;
    if (token === 'ref_spatial_apparels') {
      refererHeader = 'https://spatialsites.co/kits/spatial-rail/demo';
    } else if (token === 'ref_teasel_spatial') {
      refererHeader = 'https://spatialsites.co/kits/teasel/demo';
    } else if (token === 'ref_spool_agency') {
      refererHeader = 'https://spatialsites.co/kits/spool/demo';
    } else if (token === 'ref_the_descent') {
      refererHeader = 'https://spatialsites.co/kits/the-descent/demo';
    } else if (token === 'ref_thumbstop') {
      refererHeader = 'https://spatialsites.co/kits/thumbstop/demo';
    } else if (token === 'ref_spatial_flight') {
      refererHeader = 'https://spatialsites.co/kits/flight/demo';
    } else if (token === 'ref_spatial_sip') {
      refererHeader = 'https://spatialsites.co/kits/spatial-sip/demo';
    } else if (token === 'ref_long_way_round') {
      refererHeader = 'https://spatialsites.co/kits/long-way-round/demo';
    }

    const targetResp = await fetch(targetUrl, {
      headers: {
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Dest': 'iframe',
        'Referer': refererHeader,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      redirect: 'follow'
    });

    let html = await targetResp.text();
    const respParsed = new URL(targetResp.url || targetUrl);
    let baseHref = '';
    if (token === 'ref_spatial_apparels') {
      baseHref = '/api/proxy-site/spatial-rail/';
    } else if (token === 'ref_teasel_spatial') {
      baseHref = '/api/proxy-site/teasel/';
    } else if (token === 'ref_spool_agency') {
      baseHref = '/api/proxy-site/spool/';
    } else if (token === 'ref_the_descent') {
      baseHref = '/api/proxy-site/the-descent/';
    } else if (token === 'ref_thumbstop') {
      baseHref = '/api/proxy-site/thumbstop/';
    } else if (token === 'ref_spatial_flight') {
      baseHref = '/api/proxy-site/flight/';
    } else if (token === 'ref_spatial_sip') {
      baseHref = '/api/proxy-site/spatial-sip/';
    } else if (token === 'ref_long_way_round') {
      baseHref = '/api/proxy-site/long-way-round/';
    } else {
      baseHref = `${respParsed.origin}${respParsed.pathname.endsWith('/') ? respParsed.pathname : respParsed.pathname + '/'}`;
    }
    const baseTag = `<base href="${baseHref}">`;

    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>\n  ${baseTag}`);
    } else if (html.includes('<head ')) {
      html = html.replace(/<head[^>]*>/, `$& \n  ${baseTag}`);
    } else {
      html = `${baseTag}\n${html}`;
    }

    html = html.replace(/<meta[^>]*http-equiv=["']?(?:content-security-policy|x-frame-options)["']?[^>]*>/gi, '');
    html = html.replace(/window\.top\s*===\s*window/g, 'false');

    const isSpatialSite = token === 'ref_spatial_apparels' || token === 'ref_teasel_spatial' || token === 'ref_spool_agency' || token === 'ref_the_descent' || token === 'ref_thumbstop' || token === 'ref_spatial_flight' || token === 'ref_spatial_sip' || token === 'ref_long_way_round';
    const isNextJs = html.includes('__next') || html.includes('_next/') || html.includes('__NEXT_DATA__');
    if (isNextJs && !isSpatialSite) {
      html = html.replace(/<script[^>]*src=["'][^"']*\/_next\/[^"']*["'][^>]*><\/script>/gi, '');
      html = html.replace(/<script[^>]*>self\.__next_f\.push\([\s\S]*?<\/script>/gi, '');
      html = html.replace(/<script[^>]*>\(self\.__next.*?<\/script>/gi, '');
      html = html.replace(/<script[^>]*id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/gi, '');
      html = html.replace('</head>', `<style>
        body { overflow: auto !important; }
        [hidden] { display: none !important; }
        a[href] { pointer-events: auto; cursor: pointer; }
      </style>\n</head>`);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.status(200).send(html);
  } catch (err: any) {
    return res.status(502).send(`Failed to proxy frame: ${err.message}`);
  }
}
