
export interface GeneratedWebsiteData {
  websiteType: string;
  businessCategory?: string;
  templateStyle?: string;
  previewUrl?: string;
  category?: '3d' | '2d';
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  shortDescription?: string;
  customHtml?: string;
  customStyles?: any;
  contactDetails?: {
    brandName?: string;
    logo?: string;
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

export const generateWebsite = async (chatHistory: ChatMessage[], websiteType: string, _templateCategory: string = 'auto'): Promise<GeneratedWebsiteData> => {
  // Step 1: Extract requirements and match template (Task A & B)
  const extractResponse = await fetch('/api/generate', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ 
      action: 'extract_and_match', 
      chatHistory,
      websiteType 
    })
  });

  if (!extractResponse.ok) {
    const errorData = await extractResponse.json().catch(() => null);
    throw new Error(errorData?.error || `Matching Error: ${extractResponse.statusText}`);
  }

  const matchData = await extractResponse.json();
  
  if (!matchData.selected_template_id) {
    throw new Error("AI failed to select a valid template.");
  }

  // Step 2: Generate Content & Theme mapped to that template (Task C)
  const generateResponse = await fetch('/api/generate', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ 
      action: 'generate_content', 
      templateId: matchData.selected_template_id,
      businessDetails: matchData
    })
  });

  if (!generateResponse.ok) {
    const errorData = await generateResponse.json().catch(() => null);
    throw new Error(errorData?.error || `Generation Error: ${generateResponse.statusText}`);
  }

  const data = await generateResponse.json() as GeneratedWebsiteData;
  return data;
};

export const patchWebsite = async (userEditRequest: string, currentData: GeneratedWebsiteData, templateId: string): Promise<any> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ 
      action: 'patch_edit', 
      userEditRequest,
      currentData,
      templateId
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `Patching Error: ${response.statusText}`);
  }

  return await response.json();
};
