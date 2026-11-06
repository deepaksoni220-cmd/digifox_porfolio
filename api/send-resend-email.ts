import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { 
    apiKey: clientApiKey, 
    from: clientFrom, 
    to, 
    subject, 
    body, 
    senderName, 
    items 
  } = req.body || {};

  const apiKey = clientApiKey || process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;

  if (!apiKey) {
    return res.status(400).json({
      error: 'Missing Resend API Key. Please provide your Resend API Key (starts with re_) in the settings modal or set RESEND_API_KEY in your environment.'
    });
  }

  const resend = new Resend(apiKey.trim());

  // Default from address (Resend provides onboarding@resend.dev for testing, or custom domain like contact@digifox.world)
  const fromEmail = clientFrom || process.env.RESEND_FROM_EMAIL || 'Digifox <onboarding@resend.dev>';

  try {
    // 1. Bulk / Batch Sending Mode
    if (Array.isArray(items) && items.length > 0) {
      const emailPayloads = items.map((item: any) => {
        const itemDisplayName = item.senderName || senderName || 'Digifox Agency';
        const itemFrom = item.from || fromEmail.includes('<') ? fromEmail : `"${itemDisplayName}" <${fromEmail}>`;
        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 20px;">
            ${(item.body || '').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 24px 0;" />
            <p style="font-size: 12px; color: #666;">
              Sent by ${itemDisplayName} · <a href="https://digifox.world" style="color: #2563eb; text-decoration: none;">digifox.world</a>
            </p>
          </div>
        `;

        return {
          from: itemFrom,
          to: [item.to.trim()],
          subject: item.subject.trim(),
          text: item.body,
          html: htmlContent
        };
      });

      // Send via Resend Batch API
      const batchResult = await resend.batch.send(emailPayloads);

      return res.status(200).json({
        success: true,
        count: emailPayloads.length,
        data: batchResult.data,
        sentFrom: fromEmail
      });
    }

    // 2. Single Email Sending Mode
    if (!to || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, body' });
    }

    const displayName = senderName || 'Digifox Agency';
    const singleFrom = fromEmail.includes('<') ? fromEmail : `"${displayName}" <${fromEmail}>`;
    const singleHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 20px;">
        ${body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 24px 0;" />
        <p style="font-size: 12px; color: #666;">
          Sent by ${displayName} · <a href="https://digifox.world" style="color: #2563eb; text-decoration: none;">digifox.world</a>
        </p>
      </div>
    `;

    const singleResult = await resend.emails.send({
      from: singleFrom,
      to: [to.trim()],
      subject: subject.trim(),
      text: body,
      html: singleHtml
    });

    if (singleResult.error) {
      throw new Error(singleResult.error.message);
    }

    return res.status(200).json({
      success: true,
      messageId: singleResult.data?.id,
      sentFrom: singleFrom
    });

  } catch (err: any) {
    console.error('Resend API Error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to dispatch email via Resend API'
    });
  }
}
