import type { GeneratedWebsiteData } from '../services/aiBuilderService';

export const predefinedTemplates: Record<string, GeneratedWebsiteData> = {
  aero: {
    websiteType: "Business Site",
    templateStyle: "aero",
    previewUrl: "http://localhost:1002",
    shortDescription: "3D minimalist dark aesthetic with floating objects and glowing elements.",
    thumbnailUrl: "/templates/aero.png",
    hero: {
      title: "Aero",
      subtitle: "Experience the next generation of digital aesthetics.",
      ctaText: "Discover More",
      imagePrompt: "minimalist dark aesthetic floating objects 3d abstract blue glowing"
    },
    about: {
      heading: "Our Vision",
      description: "We craft immersive digital experiences that push the boundaries of what is possible on the web.",
      imagePrompt: "dark elegant modern office setup with glowing blue lighting"
    },
    items: [
      {
        title: "Digital Design",
        description: "Cutting edge interfaces.",
        icon: "✨"
      },
      {
        title: "Web 3D",
        description: "Immersive experiences.",
        icon: "🧊"
      },
      {
        title: "Brand Identity",
        description: "Memorable modern branding.",
        icon: "💎"
      }
    ],
    contact: {
      heading: "Ready to take off?",
      buttonText: "Contact Us"
    },
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#1e3a8a"
    }
  },
  bnrmlss2: {
    websiteType: "E-Commerce Store",
    templateStyle: "bnrmlss2",
    previewUrl: "https://digifox-storedemo-gqiq.vercel.app/",
    shortDescription: "Urban streetwear fashion e-commerce with moody underground aesthetic.",
    thumbnailUrl: "/templates/bnrmlss2.png",
    hero: {
      title: "Bnrmlss 2",
      subtitle: "Streetwear that defines the culture.",
      ctaText: "Shop Collection",
      imagePrompt: "urban streetwear fashion photography moody lighting underground"
    },
    about: {
      heading: "The Brand",
      description: "Born in the streets, made for the world. We redefine modern urban wear.",
      imagePrompt: "urban fashion model in neon lit street at night"
    },
    items: [
      {
        title: "Oversized Hoodie",
        description: "Heavyweight cotton with signature print.",
        icon: "🧥",
        price: "$89"
      },
      {
        title: "Cargo Pants",
        description: "Utility meets style.",
        icon: "👖",
        price: "$120"
      },
      {
        title: "Graphic Tee",
        description: "Limited edition drop.",
        icon: "👕",
        price: "$45"
      }
    ],
    contact: {
      heading: "Join the movement.",
      buttonText: "Subscribe"
    },
    theme: {
      primaryColor: "#ef4444",
      secondaryColor: "#7f1d1d"
    }
  },
  drinking5d: {
    websiteType: "Business Site",
    templateStyle: "drinking5d",
    previewUrl: "https://digifox-onlinestore.vercel.app/",
    shortDescription: "Premium beverage brand landing page with immersive 3D bottle physics.",
    thumbnailUrl: "/templates/drinking5d.png",
    hero: {
      title: "Drinking 5D",
      subtitle: "Elevate your beverage experience.",
      ctaText: "Explore Flavors",
      imagePrompt: "premium cocktail splash cinematic lighting dark background"
    },
    about: {
      heading: "Our Process",
      description: "We source the finest ingredients to craft beverages that awaken the senses.",
      imagePrompt: "crystal glass with premium liquid pouring cinematic"
    },
    items: [
      {
        title: "Signature Blend",
        description: "Our award-winning recipe.",
        icon: "🍹"
      },
      {
        title: "Limited Reserve",
        description: "Aged to perfection.",
        icon: "🍾"
      },
      {
        title: "Mixology Kit",
        description: "Craft your own at home.",
        icon: "🧊"
      }
    ],
    contact: {
      heading: "Thirsty for more?",
      buttonText: "Order Now"
    },
    theme: {
      primaryColor: "#f59e0b",
      secondaryColor: "#78350f"
    }
  },
  voya: {
    websiteType: "Portfolio",
    templateStyle: "voya",
    shortDescription: "Clean, elegant portfolio for digital artists featuring soft pastels and typography.",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    hero: {
      title: "Voya",
      subtitle: "Creative direction and visual storytelling.",
      ctaText: "View Work",
      imagePrompt: "abstract soft pastel colors smooth 3d shapes minimalist art"
    },
    about: {
      heading: "About Me",
      description: "A digital artist focused on creating serene, beautiful, and functional visual experiences.",
      imagePrompt: "minimalist clean studio workspace with plants and soft lighting"
    },
    items: [
      {
        title: "Brand Campaign",
        description: "Global rollout for leading fashion brand.",
        icon: "📸"
      },
      {
        title: "Editorial Design",
        description: "Award-winning magazine layout.",
        icon: "📖"
      },
      {
        title: "Motion Graphics",
        description: "Fluid animations for tech product launch.",
        icon: "🎬"
      }
    ],
    contact: {
      heading: "Let's create together.",
      buttonText: "Get in Touch"
    },
    theme: {
      primaryColor: "#ec4899",
      secondaryColor: "#831843"
    }
  },
  coinSite: {
    websiteType: "Business Site",
    templateStyle: "coinSite",
    shortDescription: "High-performance decentralized finance landing page with neon cyberpunk elements.",
    thumbnailUrl: "https://images.unsplash.com/photo-1621504450181-5d156f0624e5?q=80&w=800&auto=format&fit=crop",
    hero: {
      title: "Coin Site 2",
      subtitle: "The future of decentralized finance.",
      ctaText: "Start Trading",
      imagePrompt: "futuristic digital currency hologram glowing cryptocurrency trading"
    },
    about: {
      heading: "Our Mission",
      description: "Democratizing access to financial tools with secure, lightning-fast infrastructure.",
      imagePrompt: "abstract network nodes glowing connecting blue and purple"
    },
    items: [
      {
        title: "Secure Wallet",
        description: "Military-grade encryption.",
        icon: "🔒"
      },
      {
        title: "Fast Swaps",
        description: "Instant liquidity across chains.",
        icon: "⚡"
      },
      {
        title: "Staking",
        description: "Earn passive yield safely.",
        icon: "📈"
      }
    ],
    contact: {
      heading: "Join the revolution.",
      buttonText: "Open App"
    },
    theme: {
      primaryColor: "#10b981",
      secondaryColor: "#064e3b"
    }
  }
};
