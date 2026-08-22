export interface PlanPackage {
  id: string;
  name: string;
  badge?: string;
  siteCount: number;
  siteCountLabel: string;
  monthly: number;
  annualMonthly: number;
  annualTotal: number;
  discountLabel: string;
  savingsText: string;
  description: string;
  popular?: boolean;
  features: string[];
}

export interface CategoryPricing {
  single: PlanPackage;
  bundle: PlanPackage;
}

export interface RegionPricingData {
  countryName: string;
  currencySymbol: string;
  currencyCode: string;
  threeD: CategoryPricing;
  twoD: CategoryPricing;
}

export const PRICING_DATA: Record<"IN" | "GLOBAL", RegionPricingData> = {
  IN: {
    countryName: "India",
    currencySymbol: "₹",
    currencyCode: "INR",
    threeD: {
      single: {
        id: "3d-single",
        name: "Business Package",
        siteCount: 1,
        siteCountLabel: "One - 3D Website License",
        monthly: 999,
        annualMonthly: 790,
        annualTotal: 9480,
        discountLabel: "21% OFF",
        savingsText: "Save ₹2,508 / year",
        description: "Immersive 3D physics, interactive WebGL models, and rich animations for standout brands.",
        features: [
          "1 Interactive 3D WebGL Website",
          "Free Unlimited Customizations",
          "Free SSL Certificate",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed CDN Bandwidth / month",
          "Free *.digifox.world Subdomain",
          "Connect 1 Custom Domain (yourbrand.com)",
          "Dynamic Particle & Physics Canvas",
          "Direct Click-to-Edit Visual Studio",
          "Instant Lead Capture & WhatsApp Integration",
          "Ultra-Smooth 60 FPS Performance"
        ]
      },
      bundle: {
        id: "3d-bundle",
        name: "Agency Package",
        badge: "Best Value • Save 33%",
        popular: true,
        siteCount: 3,
        siteCountLabel: "3 - 3D Websites Pack",
        monthly: 2000,
        annualMonthly: 1590,
        annualTotal: 19080,
        discountLabel: "20% OFF",
        savingsText: "Save ₹4,920 / year (Only ₹530/site/mo)",
        description: "Launch 3 separate 3D WebGL websites for multiple brands, clients, or product launches.",
        features: [
          "3 Interactive 3D WebGL Websites",
          "Free Unlimited Customizations on All Sites",
          "Free SSL Certificate for Every Domain",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed Bandwidth per website (60 GB Total)",
          "3 Separate Free *.digifox.world Subdomains",
          "Connect 3 Custom Domains (1 per site)",
          "All 3D WebGL Physics & Particle Features",
          "Independent Visual Studio for each site",
          "Priority VIP Support & Onboarding",
          "Centralized Multi-Site Dashboard"
        ]
      }
    },
    twoD: {
      single: {
        id: "2d-single",
        name: "Business Package",
        siteCount: 1,
        siteCountLabel: "One - 2D Website License",
        monthly: 599,
        annualMonthly: 496,
        annualTotal: 5952,
        discountLabel: "17% OFF",
        savingsText: "Save ₹1,236 / year",
        description: "Perfect for local businesses, portfolios, and fast-converting landing pages.",
        features: [
          "1 High-Speed Responsive 2D Website",
          "Free Unlimited Customizations",
          "Free SSL Certificate",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed CDN Bandwidth / month",
          "Free *.digifox.world Subdomain",
          "Connect 1 Custom Domain (yourbrand.com)",
          "Direct Click-to-Edit Visual Content Editor",
          "Instant Lead Capture & WhatsApp Integration",
          "SEO & Meta Tags Customization",
          "Mobile & Tablet Optimized"
        ]
      },
      bundle: {
        id: "2d-bundle",
        name: "Agency Package",
        badge: "Agency Pack • Save 33%",
        popular: true,
        siteCount: 5,
        siteCountLabel: "5 - 2D Websites Pack",
        monthly: 2000,
        annualMonthly: 1590,
        annualTotal: 19080,
        discountLabel: "20% OFF",
        savingsText: "Save ₹4,920 / year (Only ₹318/site/mo)",
        description: "Deploy 5 independent 2D websites for your agency clients, local stores, or projects.",
        features: [
          "5 High-Speed Responsive 2D Websites",
          "Free Unlimited Customizations on All Sites",
          "Free SSL Certificate for Every Domain",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed Bandwidth per website (100 GB Total)",
          "5 Separate Free *.digifox.world Subdomains",
          "Connect 5 Custom Domains (1 per site)",
          "Independent Visual Editor for each site",
          "Instant WhatsApp & Lead Forms across all sites",
          "Multi-Site Management Dashboard",
          "Priority Customer Support"
        ]
      }
    }
  },
  GLOBAL: {
    countryName: "International",
    currencySymbol: "$",
    currencyCode: "USD",
    threeD: {
      single: {
        id: "3d-single",
        name: "Business Package",
        siteCount: 1,
        siteCountLabel: "One - 3D Website License",
        monthly: 15,
        annualMonthly: 12.5,
        annualTotal: 150,
        discountLabel: "17% OFF",
        savingsText: "Save $30 / year",
        description: "Cutting-edge 3D animated web experience designed to maximize brand authority and engagement.",
        features: [
          "1 Interactive 3D WebGL Website",
          "Free Unlimited Customizations",
          "Free SSL Certificate",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed CDN Bandwidth / month",
          "Free *.digifox.world Subdomain",
          "Connect 1 Custom Domain (yourbrand.com)",
          "Dynamic Particle & Physics Canvas",
          "Direct Click-to-Edit Visual Studio",
          "Instant Lead Capture & WhatsApp Integration",
          "Ultra-Smooth 60 FPS Performance"
        ]
      },
      bundle: {
        id: "3d-bundle",
        name: "Agency Package",
        badge: "Best Value • Save 33%",
        popular: true,
        siteCount: 3,
        siteCountLabel: "3 - 3D Websites Pack",
        monthly: 30,
        annualMonthly: 26.40,
        annualTotal: 316.80,
        discountLabel: "12% OFF",
        savingsText: "Save $43.20 / year (Only $8.80/site/mo)",
        description: "Launch 3 separate 3D WebGL websites for multiple brands, clients, or product launches.",
        features: [
          "3 Interactive 3D WebGL Websites",
          "Free Unlimited Customizations on All Sites",
          "Free SSL Certificate for Every Domain",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed Bandwidth per website (60 GB Total)",
          "3 Separate Free *.digifox.world Subdomains",
          "Connect 3 Custom Domains (1 per site)",
          "All 3D WebGL Physics & Particle Features",
          "Independent Visual Studio for each site",
          "Priority VIP Support & Onboarding",
          "Centralized Multi-Site Dashboard"
        ]
      }
    },
    twoD: {
      single: {
        id: "2d-single",
        name: "Business Package",
        siteCount: 1,
        siteCountLabel: "One - 2D Website License",
        monthly: 9,
        annualMonthly: 6.75,
        annualTotal: 81,
        discountLabel: "25% OFF",
        savingsText: "Save $27 / year",
        description: "Ideal for startups, creators, and modern businesses wanting a high-converting presence.",
        features: [
          "1 High-Speed Responsive 2D Website",
          "Free Unlimited Customizations",
          "Free SSL Certificate",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed CDN Bandwidth / month",
          "Free *.digifox.world Subdomain",
          "Connect 1 Custom Domain (yourbrand.com)",
          "Direct Click-to-Edit Visual Content Editor",
          "Instant Lead Capture & WhatsApp Integration",
          "SEO & Meta Tags Customization",
          "Mobile & Tablet Optimized"
        ]
      },
      bundle: {
        id: "2d-bundle",
        name: "Agency Package",
        badge: "Agency Pack • Save 33%",
        popular: true,
        siteCount: 5,
        siteCountLabel: "5 - 2D Websites Pack",
        monthly: 30,
        annualMonthly: 24,
        annualTotal: 288,
        discountLabel: "20% OFF",
        savingsText: "Save $72 / year (Only $4.80/site/mo)",
        description: "Deploy 5 independent 2D websites for your agency clients, local stores, or projects.",
        features: [
          "5 High-Speed Responsive 2D Websites",
          "Free Unlimited Customizations on All Sites",
          "Free SSL Certificate for Every Domain",
          "Free Global Edge CDN Servers",
          "20 GB High-Speed Bandwidth per website (100 GB Total)",
          "5 Separate Free *.digifox.world Subdomains",
          "Connect 5 Custom Domains (1 per site)",
          "Independent Visual Editor for each site",
          "Instant WhatsApp & Lead Forms across all sites",
          "Multi-Site Management Dashboard",
          "Priority Customer Support"
        ]
      }
    }
  }
};
