import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';
import { TEMPLATE_REGISTRY } from '../src/data/templateRegistry';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, chatHistory, userPrompt, websiteType } = req.body;
  const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing Gemini API Key." });
  }

  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    if (action === 'extract_and_match') {
      // TASK A & B: Extract requirements from user prompt and select best template
      const SYSTEM_PROMPT = `You are an expert AI matching system for a website builder.
Your job is to analyze the user's business description and extract their requirements into a strict JSON format.
Then, you must select the best matching template from the provided registry.

Available Templates:
${JSON.stringify(TEMPLATE_REGISTRY, null, 2)}

Output strictly valid JSON in this format:
{
  "industry": "...",
  "business_type": "...",
  "style": "...",
  "color_preference": "...",
  "features": ["..."],
  "selected_template_id": "Must be exactly one of the template_id values from the registry that best matches the requirements."
}`;

      const contents = [{
        role: 'user',
        parts: [{ text: `User request: ${userPrompt || (chatHistory ? chatHistory[chatHistory.length - 1].text : '')}` }]
      }];

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { response_mime_type: "application/json" }
        })
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanString = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanString);

      return res.status(200).json(parsed);
    } 
    
    else if (action === 'generate_content') {
      // TASK C: Generate structured content schema based on the selected template
      const { templateId, businessDetails } = req.body;
      const selectedTemplate = TEMPLATE_REGISTRY.find(t => t.template_id === templateId);

      const SYSTEM_PROMPT = `You are an expert copywriter.
Generate website content for the given business details tailored to this template: ${selectedTemplate?.name}.
The template has these sections: ${selectedTemplate?.sections.join(', ')}.

Output strictly valid JSON matching this schema:
{
  "websiteType": "${selectedTemplate?.name}",
  "templateStyle": "${templateId}",
  "hero": { "title": "...", "subtitle": "...", "ctaText": "...", "imagePrompt": "..." },
  "about": { "heading": "...", "description": "...", "imagePrompt": "..." },
  "items": [
    { "title": "...", "description": "...", "icon": "emoji", "price": "Optional", "imagePrompt": "Optional" }
  ],
  "contact": { "heading": "...", "buttonText": "..." },
  "theme": { "primaryColor": "#hex", "secondaryColor": "#hex" }
}`;

      const contents = [{
        role: 'user',
        parts: [{ text: `Business Details: ${JSON.stringify(businessDetails)}` }]
      }];

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { response_mime_type: "application/json" }
        })
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanString = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanString);
      
      // Ensure the correct template ID and URL are attached
      parsed.templateStyle = templateId;
      parsed.previewUrl = selectedTemplate?.previewUrl;
      parsed.thumbnailUrl = selectedTemplate?.thumbnailUrl;
      
      return res.status(200).json(parsed);
    }
    
    else if (action === 'patch_edit') {
      // TASK E: Generate a minimal JSON patch based on user edit request
      const { userEditRequest, currentData, templateId } = req.body;
      const selectedTemplate = TEMPLATE_REGISTRY.find(t => t.template_id === templateId);

      const SYSTEM_PROMPT = `You are a precision JSON patcher for a website builder.
The user wants to edit their current website data.
Analyze their request and output ONLY the fields that need to be changed in a strict JSON format.
DO NOT return the entire website data. Only return the fields that are being modified.

Current Data State:
${JSON.stringify(currentData, null, 2)}

User Request: "${userEditRequest}"

Output strictly valid JSON matching this schema:
{
  "themePatch": {
    "primaryColor": "optional new hex",
    "secondaryColor": "optional new hex"
  },
  "contentPatch": {
    "hero": { "title": "optional new title" },
    "about": { "description": "optional new description" }
  }
}
If a section or field is not being changed, omit it completely from the JSON.`;

      const contents = [{
        role: 'user',
        parts: [{ text: `Generate the JSON patch for this edit request: ${userEditRequest}` }]
      }];

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { response_mime_type: "application/json" }
        })
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanString = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanString);
      
      return res.status(200).json(parsed);
    }

    return res.status(400).json({ error: "Invalid action" });

  } catch (err: any) {
    console.error("Backend Error:", err);
    return res.status(500).json({ error: \`AI Error: \${err.message}\` });
  }
}
