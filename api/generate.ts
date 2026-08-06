import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup for local development testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, chatHistory, websiteType, templateCategory } = req.body;
  const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your Vercel Environment Variables or .env.local file." });
  }

  // --- RATE LIMITING ---
  const adminToken = req.headers['x-admin-token'];
  const isAdmin = adminToken && adminToken === process.env.ADMIN_BYPASS_TOKEN;

  if (!isAdmin && action === 'build') {
    const rawIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    const cleanIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(',')[0].trim();
    
    if (cleanIp !== 'unknown') {
      const today = new Date().toISOString().split('T')[0];
      const kvKey = `buildlimit:${cleanIp}:${today}`;
      
      try {
        const currentUsage = await kv.get<number>(kvKey) || 0;
        if (currentUsage >= 5) {
          return res.status(429).json({ 
            error: "You have reached your daily limit of 5 website builds. Please try again tomorrow." 
          });
        }
        await kv.incr(kvKey);
        await kv.expire(kvKey, 86400); // Expire in 24 hours
      } catch (err) {
        console.warn("KV Rate Limiting failed (is KV provisioned?), proceeding anyway", err);
      }
    }
  }
  // --- END RATE LIMITING ---

  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const contents = chatHistory.map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  let body: any = { contents };

  if (action === 'plan') {
    const PLAN_SYSTEM_PROMPT = `You are an elite, award-winning avant-garde web designer (think Awwwards site of the day). 
Your goal is to help the user plan a highly unique, breathtaking, and non-traditional one-page website layout. 
Break away from boring corporate templates. Suggest striking color palettes, brutalist or glassmorphic elements, and a truly immersive 4-section structure.
Keep your responses very brief, conversational, and encouraging. Never output JSON in this phase, just talk to the user.`;
    
    body.system_instruction = { parts: [{ text: PLAN_SYSTEM_PROMPT }] };
  } else if (action === 'build') {
    let availableTemplates = `'aero' (3D Business), 'drinking5d' (3D Business), 'bnrmlss2' (2D E-commerce), 'voya' (2D Portfolio), 'coinSite' (2D Business)`;
    if (templateCategory === '3d') availableTemplates = `'aero' (3D Business), 'drinking5d' (3D Business)`;
    if (templateCategory === '2d') availableTemplates = `'bnrmlss2' (2D E-commerce), 'voya' (2D Portfolio), 'coinSite' (2D Business)`;

    const BUILD_SYSTEM_PROMPT = `You are a visionary, avant-garde web designer. 
Generate a stunning, boundary-pushing one-page website layout based on the user's planning conversation. 
Do not make it look like a standard generic website. Make it bold, immersive, and striking.
You MUST reply strictly with valid JSON matching this schema, and nothing else. No markdown wrapping, no explanations.

Schema:
{
  "websiteType": "The specific type of website provided in the instructions",
  "businessCategory": "A brief string representing the industry/business category (e.g. 'Aero', 'Jewelry', 'Coffee', 'Fitness') based on the planning conversation",
  "templateStyle": "CRITICAL: YOU MUST SELECT EXACTLY ONE STRING FROM THIS LIST: [${availableTemplates}]. Do not leave this blank.",
  "hero": { "title": "...", "subtitle": "...", "ctaText": "...", "imagePrompt": "A highly detailed, photorealistic image description for an immersive background (e.g. 'A surreal neon cybernetic landscape, 8k, volumetric lighting', or 'Ultra-minimalist brutalist architecture, stark shadows')" },
  "about": { "heading": "...", "description": "...", "imagePrompt": "A highly detailed, editorial-style image description for the about section (e.g. 'A high-fashion cinematic portrait, dramatic lighting, contemporary art style')" },
  "items": [
    { "title": "...", "description": "...", "icon": "emoji", "price": "Optional (e.g. '$49.99')", "imagePrompt": "Optional, high-end editorial image description" }, 
    { "title": "...", "description": "...", "icon": "emoji", "price": "...", "imagePrompt": "..." },
    { "title": "...", "description": "...", "icon": "emoji", "price": "..." }
  ],
  "contact": { "heading": "...", "buttonText": "..." },
  "theme": { "primaryColor": "#hex (Use bold, non-traditional colors)", "secondaryColor": "#hex (Highly contrasting accent color)" }
}`;

    contents.push({
      role: 'user',
      parts: [{ text: `Great, please generate the final JSON layout based on our discussion. The website type is: ${websiteType}. Make sure to set "websiteType" in the JSON to exactly "${websiteType}".` }]
    });

    body.system_instruction = { parts: [{ text: BUILD_SYSTEM_PROMPT }] };
    body.generationConfig = { response_mime_type: "application/json" };
  } else {
    return res.status(400).json({ error: "Invalid action" });
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `API Error: ${errText}` });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error(`Empty response from AI (likely safety filter). Data: ${JSON.stringify(data)}`);
    }

    if (action === 'build') {
      const cleanString = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanString);
      return res.status(200).json(parsed);
    } else {
      return res.status(200).json({ reply: text });
    }
  } catch (err: any) {
    console.error("Backend Error:", err);
    return res.status(500).json({ error: `AI Generation Error: ${err.message}` });
  }
}
