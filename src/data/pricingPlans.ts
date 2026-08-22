export interface PlanDetails {
  name: string;
  badge?: string;
  monthly: number;
  annualMonthly: number;
  annualTotal: number;
  discountLabel: string;
  savingsText: string;
  description: string;
  popular?: boolean;
  features: string[];
}

export interface RegionPricing {
  countryName: string;
  currencySymbol: string;
  currencyCode: string;
  twoD: PlanDetails;
  threeD: PlanDetails;
}

export const PRICING_DATA: Record<"IN" | "GLOBAL", RegionPricing> = {
  IN: {
    countryName: "India",
    currencySymbol: "₹",
    currencyCode: "INR",
    twoD: {
      name: "2D Animated Website",
      monthly: 599,
      annualMonthly: 496,
      annualTotal: 5952,
      discountLabel: "17% OFF",
      savingsText: "Save ₹1,236 / year",
      description: "Perfect for local businesses, portfolios, and fast converting landing pages.",
      features: [
        "1 High-Speed Responsive 2D Website",
        "Free *.digifox.world Subdomain",
        "Connect Custom Domain (e.g. yourbrand.com)",
        "Direct Click-to-Edit Visual Content Editor",
        "Instant Lead Capture & WhatsApp Integration",
        "Global Edge CDN & Automated SSL",
        "SEO & Meta Tags Customization",
        "Mobile & Tablet Optimized"
      ]
    },
    threeD: {
      name: "3D Animated Website",
      badge: "Most Popular",
      popular: true,
      monthly: 999,
      annualMonthly: 790,
      annualTotal: 9480,
      discountLabel: "21% OFF",
      savingsText: "Save ₹2,508 / year",
      description: "Immersive 3D physics, interactive WebGL models, and rich animations for standout brands.",
      features: [
        "Everything in 2D Plan included",
        "Interactive 3D WebGL & Physics Canvas",
        "Dynamic Particle & Scroll-Driven Effects",
        "3D Product Assembly & Interactive Stage",
        "Ultra-Smooth 60 FPS Performance",
        "Priority Customer Support & Onboarding",
        "Custom Typography & Animation Controls",
        "Unlimited Updates & Publishing"
      ]
    }
  },
  GLOBAL: {
    countryName: "International",
    currencySymbol: "$",
    currencyCode: "USD",
    twoD: {
      name: "2D Animated Website",
      monthly: 9,
      annualMonthly: 6.75,
      annualTotal: 81,
      discountLabel: "25% OFF",
      savingsText: "Save $27 / year",
      description: "Ideal for startups, creators, and modern businesses wanting a high-converting presence.",
      features: [
        "1 High-Speed Responsive 2D Website",
        "Free *.digifox.world Subdomain",
        "Connect Custom Domain (e.g. yourbrand.com)",
        "Direct Click-to-Edit Visual Content Editor",
        "Instant Lead Capture & WhatsApp Integration",
        "Global Edge CDN & Automated SSL",
        "SEO & Meta Tags Customization",
        "Mobile & Tablet Optimized"
      ]
    },
    threeD: {
      name: "3D Animated Website",
      badge: "Most Popular",
      popular: true,
      monthly: 15,
      annualMonthly: 12.50,
      annualTotal: 150,
      discountLabel: "17% OFF",
      savingsText: "Save $30 / year",
      description: "Cutting-edge 3D animated web experience designed to maximize brand authority and engagement.",
      features: [
        "Everything in 2D Plan included",
        "Interactive 3D WebGL & Physics Canvas",
        "Dynamic Particle & Scroll-Driven Effects",
        "3D Product Assembly & Interactive Stage",
        "Ultra-Smooth 60 FPS Performance",
        "Priority Customer Support & Onboarding",
        "Custom Typography & Animation Controls",
        "Unlimited Updates & Publishing"
      ]
    }
  }
};
