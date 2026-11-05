import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

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

  const { to, subject, body, senderEmail, appPassword, senderName } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, body' });
  }

  // Credential resolution: prioritize environment variables, fallback to client-supplied Workspace credentials
  const user = process.env.GOOGLE_WORKSPACE_EMAIL || senderEmail;
  const pass = process.env.GOOGLE_WORKSPACE_APP_PASSWORD || appPassword;

  if (!user || !pass) {
    return res.status(400).json({
      error: 'Missing Google Workspace credentials. Please set GOOGLE_WORKSPACE_EMAIL and GOOGLE_WORKSPACE_APP_PASSWORD in your environment or enter them in the settings panel.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: user.trim(),
        pass: pass.trim().replace(/\s+/g, '') // remove spaces from 16-character Google App Password
      }
    });

    const displayName = senderName || 'Digifox Agency';
    const info = await transporter.sendMail({
      from: `"${displayName}" <${user}>`,
      to: to.trim(),
      replyTo: user.trim(),
      subject: subject.trim(),
      text: body,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 20px;">
          ${body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 24px 0;" />
          <p style="font-size: 12px; color: #666;">
            Sent by ${displayName} · <a href="https://digifox.world" style="color: #2563eb; text-decoration: none;">digifox.world</a>
          </p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
      sentFrom: user
    });
  } catch (err: any) {
    console.error('Google Workspace SMTP Error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to dispatch email through Google Workspace SMTP'
    });
  }
}
