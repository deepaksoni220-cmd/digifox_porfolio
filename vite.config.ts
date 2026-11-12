import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function localDevApiPlugin() {
  return {
    name: 'local-dev-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/send-resend-email' && req.method === 'POST') {
          let rawBody = '';
          req.on('data', (chunk: any) => { rawBody += chunk; });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(rawBody || '{}');
              const { Resend } = await import('resend');
              const apiKey = parsed.apiKey || process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
              if (!apiKey) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Missing Resend API Key. Please provide your API key (re_...) in Settings.' }));
              }

              const resend = new Resend(apiKey.trim());
              const fromEmail = parsed.from || process.env.RESEND_FROM_EMAIL || 'Digifox <onboarding@resend.dev>';

              // Bulk batch mode
              if (Array.isArray(parsed.items) && parsed.items.length > 0) {
                const payloads = parsed.items.map((item: any) => {
                  const itemDisplayName = item.senderName || parsed.senderName || 'Digifox Agency';
                  const itemFrom = item.from || (fromEmail.includes('<') ? fromEmail : `"${itemDisplayName}" <${fromEmail}>`);
                  return {
                    from: itemFrom,
                    to: [item.to.trim()],
                    subject: item.subject.trim(),
                    text: item.body,
                    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 20px;">${(item.body || '').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</div>`
                  };
                });

                const batchResult = await resend.batch.send(payloads);
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  success: true,
                  count: payloads.length,
                  data: batchResult.data,
                  sentFrom: fromEmail
                }));
              }

              // Single email mode
              if (!parsed.to || !parsed.subject || !parsed.body) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Missing required fields: to, subject, body' }));
              }

              const displayName = parsed.senderName || 'Digifox Agency';
              const singleFrom = fromEmail.includes('<') ? fromEmail : `"${displayName}" <${fromEmail}>`;
              const singleResult = await resend.emails.send({
                from: singleFrom,
                to: [parsed.to.trim()],
                subject: parsed.subject.trim(),
                text: parsed.body,
                html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 20px;">${(parsed.body || '').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</div>`
              });

              if (singleResult.error) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: singleResult.error.message }));
              }

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({
                success: true,
                messageId: singleResult.data?.id,
                sentFrom: singleFrom
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: err.message || 'Resend API Error' }));
            }
          });
          return;
        }

        if (req.url?.startsWith('/api/embed-frame')) {
          try {
            const urlObj = new URL(req.url, 'http://localhost');
            const token = urlObj.searchParams.get('token');
            const CIPHER_SALT = 'DF_REF_SEC_V5_SALT_98472';
            const PROTECTED_REGISTRY: Record<string, string> = {
              ref_spatial_apparels: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCA1Iis_VDN-My09MxZRWlNXPGg3Jigq',
              ref_teasel_spatial: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCcgIiwzWXA6LygxJxdQQFpe',
              ref_spool_agency: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCA1LDA6GjY9JSkscVFMWVs',
              ref_the_descent: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCctJnIyUCwwJCIgcFBWUFJKai4rPyk',
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

            const cipher = token ? PROTECTED_REGISTRY[token] : null;
            if (!cipher) {
              res.statusCode = 404;
              return res.end('Reference not found');
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

            // ─── Neutralize Next.js / Nuxt / framework client JS that causes hydration
            //     errors when running inside an iframe with a foreign <base>.
            //     We keep all the server-rendered HTML (SSR) intact — it already contains
            //     the fully-rendered visible page content.  Only the hydration bootstrap
            //     scripts are removed so the page displays as a rich static snapshot. ────
            const isSpatialSite = token === 'ref_spatial_apparels' || token === 'ref_teasel_spatial' || token === 'ref_spool_agency' || token === 'ref_the_descent';
            const isNextJs = html.includes('__next') || html.includes('_next/') || html.includes('__NEXT_DATA__');
            if (isNextJs && !isSpatialSite) {
              // Remove <script> tags that bootstrap Next.js client router / RSC
              html = html.replace(/<script[^>]*src=["'][^"']*\/_next\/[^"']*["'][^>]*><\/script>/gi, '');
              html = html.replace(/<script[^>]*>self\.__next_f\.push\([\s\S]*?<\/script>/gi, '');
              html = html.replace(/<script[^>]*>\(self\.__next.*?<\/script>/gi, '');
              // Remove inline <script> that calls __next hydration
              html = html.replace(/<script[^>]*id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/gi, '');
              // Inject a tiny style fix: make Next.js hidden SSR content visible
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
            res.removeHeader('X-Frame-Options');
            res.removeHeader('Content-Security-Policy');
            return res.end(html);
          } catch (err: any) {
            res.statusCode = 502;
            return res.end(`Failed to proxy frame: ${err.message}`);
          }
        }

        if (req.url?.startsWith('/api/proxy-site/')) {
          try {
            const rawPath = req.url.replace('/api/proxy-site/', '');
            const targetUrl = `https://spatialsites.co/_sites/${rawPath}`;
            
            let kit = 'spatial-rail';
            if (rawPath.startsWith('teasel/')) {
              kit = 'teasel';
            } else if (rawPath.startsWith('spool/')) {
              kit = 'spool';
            } else if (rawPath.startsWith('the-descent/')) {
              kit = 'the-descent';
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
            res.statusCode = aResp.status;
            const contentType = aResp.headers.get('content-type');
            if (contentType) res.setHeader('Content-Type', contentType);
            const arrayBuf = await aResp.arrayBuffer();
            return res.end(Buffer.from(arrayBuf));
          } catch (err: any) {
            res.statusCode = 502;
            return res.end(`Asset proxy error: ${err.message}`);
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localDevApiPlugin()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/ogl')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    watch: {
      ignored: ['**/data/**', '**/server/**', '**/dist/**', '**/blacklane-nextjs/**', '**/.next/**', '**/.git/**', '**/public/templates/**'],
    },
    proxy: {
      '/api': {
        target: 'https://digifox.world',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
