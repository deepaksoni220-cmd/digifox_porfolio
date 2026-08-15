export interface TemplateMetadata {
  template_id: string;
  name: string;
  industries: string[];
  styles: string[];
  features: string[];
  sections: string[];
  previewUrl: string;
  thumbnailUrl: string;
}

export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  {
    template_id: "aero",
    name: "Aero 3D Business",
    industries: ["tech", "business", "agency", "creative"],
    styles: ["3d", "minimalist", "dark", "futuristic", "premium"],
    features: ["hero", "about", "services", "contact", "animations"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "/templates/aero/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "bnrmlss2",
    name: "Bnrmlss Streetwear",
    industries: ["ecommerce", "fashion", "streetwear", "clothing"],
    styles: ["moody", "underground", "urban", "modern"],
    features: ["hero", "about", "products", "newsletter"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "https://digifox-storedemo-gqiq.vercel.app/",
    thumbnailUrl: "/templates/bnrmlss2.png"
  },
  {
    template_id: "drinking5d",
    name: "Drinking 5D",
    industries: ["food", "beverage", "restaurant", "hospitality"],
    styles: ["3d", "premium", "immersive", "cinematic"],
    features: ["hero", "about", "menu", "contact"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "https://digifox-onlinestore.vercel.app/",
    thumbnailUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "voya",
    name: "Voya Portfolio",
    industries: ["portfolio", "design", "photography", "art"],
    styles: ["clean", "elegant", "pastel", "minimalist", "soft"],
    features: ["hero", "about", "portfolio", "contact"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "/templates/voya/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "coinSite",
    name: "Coin Site",
    industries: ["crypto", "finance", "web3", "tech"],
    styles: ["cyberpunk", "neon", "modern", "high-performance"],
    features: ["hero", "about", "features", "app-download"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "/templates/coin-site 2/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1621504450181-5d156f0624e5?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "digitalPortfolio2d",
    name: "Digital Portfolio 2D",
    industries: ["developer", "engineer", "designer", "portfolio"],
    styles: ["sleek", "clean", "professional", "modern"],
    features: ["hero", "about", "skills", "contact"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "/templates/2d digital portfolio/dist/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "gsapOne",
    name: "GSAP Bubble Creative",
    industries: ["agency", "creative", "portfolio", "motion"],
    styles: ["interactive", "fluid", "creative", "animated"],
    features: ["hero", "about", "interactive-menu", "contact"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "/templates/gsap one/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    template_id: "portfolio2dDesigng",
    name: "SkyElite Luxury",
    industries: ["luxury", "travel", "aviation", "premium"],
    styles: ["luxury", "premium", "rich", "elegant"],
    features: ["hero", "about", "services", "inquire"],
    sections: ["hero", "about", "items", "contact"],
    previewUrl: "/templates/2d porfolio designg/dist/index.html",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  }
];
