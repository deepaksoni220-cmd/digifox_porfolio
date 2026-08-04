import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup for local development testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, chatHistory, websiteType } = req.body;
  const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your Vercel Environment Variables or .env.local file." });
  }

  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const contents = chatHistory.map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  let body: any = { contents };

  if (action === 'plan') {
    const PLAN_SYSTEM_PROMPT = `You are an expert web design consultant. 
Your goal is to help the user plan a stunning one-page website layout. 
Ask clarifying questions, suggest color themes, and propose a 4-section structure (Hero, About, Services, Contact). 
Keep your responses very brief, conversational, and encouraging. Never output JSON in this phase, just talk to the user.`;
    
    body.system_instruction = { parts: [{ text: PLAN_SYSTEM_PROMPT }] };
  } else if (action === 'build') {
    const BUILD_SYSTEM_PROMPT = `You are an expert web designer. 
Generate a stunning, conversion-optimized one-page website layout based on the user's planning conversation.
You MUST reply strictly with valid JSON matching this schema, and nothing else. No markdown wrapping, no explanations.

Schema:
{
  "websiteType": "The specific type of website provided in the instructions",
  "hero": { "title": "...", "subtitle": "...", "ctaText": "...", "imagePrompt": "A highly detailed, photorealistic image description for a hero background (e.g. 'A sleek luxury coffee shop interior at golden hour, cinematic lighting')" },
  "about": { "heading": "...", "description": "...", "imagePrompt": "A highly detailed image description for the about section (e.g. 'A professional team working in a modern glass office, 8k resolution, photorealistic')" },
  "items": [
    { "title": "...", "description": "...", "icon": "emoji", "price": "Optional, for e-commerce (e.g. '$49.99')", "imagePrompt": "Optional, for portfolios or products" }, 
    { "title": "...", "description": "...", "icon": "emoji", "price": "...", "imagePrompt": "..." },
    { "title": "...", "description": "...", "icon": "emoji", "price": "..." }
  ],
  "contact": { "heading": "...", "buttonText": "..." },
  "theme": { "primaryColor": "#hex", "secondaryColor": "#hex" }
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
    const text = data.candidates[0].content.parts[0].text;

    if (action === 'build') {
      const cleanString = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanString);
      return res.status(200).json(parsed);
    } else {
      return res.status(200).json({ reply: text });
    }
  } catch (err: any) {
    console.error("Backend Error:", err);
    return res.status(500).json({ error: "Failed to communicate with AI API or parse JSON." });
  }
}
