export interface GeneratedWebsiteData {
  websiteType: string;
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
  items: {
    title: string;
    description: string;
    icon: string;
    price?: string; // For e-commerce
    imagePrompt?: string; // For portfolio/ecommerce
  }[];
  contact: {
    heading: string;
    buttonText: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

// Hardcoded API Key for seamless visitor experience
const GEMINI_API_KEY = "AIzaSyC_VXUooaB-zIGyGuW2KbhzHlbeBAp23sY";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const PLAN_SYSTEM_PROMPT = `You are an expert web design consultant. 
Your goal is to help the user plan a stunning one-page website layout. 
Ask clarifying questions, suggest color themes, and propose a 4-section structure (Hero, About, Services, Contact). 
Keep your responses very brief, conversational, and encouraging. Never output JSON in this phase, just talk to the user.`;

export const planWebsite = async (chatHistory: ChatMessage[]): Promise<string> => {
  // Format history for Gemini API
  const contents = chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const body = {
    system_instruction: {
      parts: [{ text: PLAN_SYSTEM_PROMPT }]
    },
    contents
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Planning Error: ${errText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

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
    { "title": "...", "description": "...", "icon": "emoji", "price": "...", "imagePrompt": "..." }
  ],
  "contact": { "heading": "...", "buttonText": "..." },
  "theme": { "primaryColor": "#hex", "secondaryColor": "#hex" }
}`;

export const generateWebsite = async (chatHistory: ChatMessage[], websiteType: string): Promise<GeneratedWebsiteData> => {
  const contents = chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));
  
  // Append the final instruction to generate the JSON
  contents.push({
    role: 'user',
    parts: [{ text: `Great, please generate the final JSON layout based on our discussion. The website type is: ${websiteType}. Make sure to set "websiteType" in the JSON to exactly "${websiteType}".` }]
  });

  const body = {
    system_instruction: {
      parts: [{ text: BUILD_SYSTEM_PROMPT }]
    },
    contents,
    generationConfig: {
      response_mime_type: "application/json"
    }
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Generation Error: ${errText}`);
  }

  const data = await response.json();
  const jsonString = data.candidates[0].content.parts[0].text;

  try {
    const cleanString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanString);
    return parsed as GeneratedWebsiteData;
  } catch (e) {
    console.error("Raw AI Response:", jsonString);
    throw new Error("Failed to parse JSON response from AI.");
  }
};
