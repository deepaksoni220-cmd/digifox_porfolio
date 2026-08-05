export interface GeneratedWebsiteData {
  websiteType: string;
  templateStyle?: 'aero' | 'voya' | 'drinking5d' | 'bnrmlss2' | 'coinSite' | 'default';
  previewUrl?: string;
  customHtml?: string;
  contactDetails?: {
    brandName?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  customImages?: Record<string, string>;
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

const getHeaders = () => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const adminToken = localStorage.getItem('adminBypassToken');
  if (adminToken) {
    headers['x-admin-token'] = adminToken;
  }
  return headers;
};

export const planWebsite = async (chatHistory: ChatMessage[]): Promise<string> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: getHeaders(),
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
    headers: getHeaders(),
    body: JSON.stringify({ action: 'build', chatHistory, websiteType })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `Generation Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data as GeneratedWebsiteData;
};
