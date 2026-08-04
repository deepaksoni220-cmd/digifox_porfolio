export interface GeneratedWebsiteData {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    imagePrompt: string;
  };
  about: {
    heading: string;
    description: string;
    imagePrompt: string;
  };
  services: {
    title: string;
    description: string;
    icon: string; // Emoji or short text
  }[];
  contact: {
    heading: string;
    buttonText: string;
  };
  theme: {
    primaryColor: string; // hex
    secondaryColor: string; // hex
  };
}

export type AiProvider = 'openai' | 'groq' | 'gemini';

const SYSTEM_PROMPT = `You are an expert web designer. 
Generate a stunning, conversion-optimized one-page website layout based on the user's prompt.
You MUST reply strictly with valid JSON matching this schema, and nothing else. No markdown wrapping, no explanations.

Schema:
{
  "hero": { "title": "...", "subtitle": "...", "ctaText": "...", "imagePrompt": "A highly detailed, photorealistic image description for a hero background (e.g. 'A sleek luxury coffee shop interior at golden hour, cinematic lighting')" },
  "about": { "heading": "...", "description": "...", "imagePrompt": "A highly detailed image description for the about section (e.g. 'A professional team working in a modern glass office, 8k resolution, photorealistic')" },
  "services": [
    { "title": "...", "description": "...", "icon": "emoji" }, // exactly 3 services
    { "title": "...", "description": "...", "icon": "emoji" },
    { "title": "...", "description": "...", "icon": "emoji" }
  ],
  "contact": { "heading": "...", "buttonText": "..." },
  "theme": { "primaryColor": "#hex", "secondaryColor": "#hex" }
}`;

export const generateWebsite = async (
  prompt: string,
  apiKey: string,
  provider: AiProvider
): Promise<GeneratedWebsiteData> => {
  if (!apiKey) throw new Error("API Key is required.");

  let endpoint = "";
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  let body: any = {};

  if (provider === 'openai' || provider === 'groq') {
    endpoint = provider === 'openai' 
      ? "https://api.openai.com/v1/chat/completions"
      : "https://api.groq.com/openai/v1/chat/completions";
      
    headers["Authorization"] = `Bearer ${apiKey}`;
    
    body = {
      model: provider === 'openai' ? "gpt-4o-mini" : "llama3-70b-8192",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Prompt: ${prompt}\n\nGenerate the JSON.` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    };
  } else if (provider === 'gemini') {
    // Gemini API format
    endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [
        { parts: [{ text: prompt }] }
      ],
      generationConfig: {
        response_mime_type: "application/json"
      }
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  let jsonString = "";

  if (provider === 'openai' || provider === 'groq') {
    jsonString = data.choices[0].message.content;
  } else if (provider === 'gemini') {
    jsonString = data.candidates[0].content.parts[0].text;
  }

  try {
    const parsed = JSON.parse(jsonString);
    return parsed as GeneratedWebsiteData;
  } catch (e) {
    throw new Error("Failed to parse JSON response from AI.");
  }
};
