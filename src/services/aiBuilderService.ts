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

export const planWebsite = async (chatHistory: ChatMessage[]): Promise<string> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'plan', chatHistory })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `Planning Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.reply;
};

export const generateWebsite = async (chatHistory: ChatMessage[], websiteType: string): Promise<GeneratedWebsiteData> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'build', chatHistory, websiteType })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `Generation Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data as GeneratedWebsiteData;
};
