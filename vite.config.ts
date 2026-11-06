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
