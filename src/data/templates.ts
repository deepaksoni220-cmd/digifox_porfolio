import type { GeneratedWebsiteData } from '../services/aiBuilderService';

export const predefinedTemplates: Record<string, GeneratedWebsiteData> = {
  blacklaneLuxury: {
    websiteType: "Automotive & Luxury Transport",
    templateStyle: "blacklaneLuxury",
    category: "3d",
    previewUrl: "/templates/blacklane/index.html",
    shortDescription: "Global Executive Chauffeur & Airport Transit 3D App with Audi A7 & Tesla WebGL 3D Models, Flight Telemetry & VIP Booking.",
    thumbnailUrl: "/templates/blacklane-cover.jpg",
    previewVideoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    hero: {
      title: "Blacklane Global Executive Chauffeur",
      subtitle: "First-class global mobility engineered for C-suite leaders. Guaranteed fixed rates, flight radar telemetry, and pristine European luxury fleet in 500+ cities.",
      ctaText: "Reserve First-Class Chauffeur",
      imagePrompt: "Luxury black Mercedes-Benz S-Class sedan parked outside VIP airport terminal under golden hour architectural canopy, suited chauffeur holding luggage, cinematic 8k"
    },
    about: {
      heading: "Unrivalled Global Precision & Discretion",
      description: "Blacklane delivers a seamless global standard of executive transit. From Frankfurt to New York, London, and Tokyo, our licensed chauffeurs ensure absolute punctuality, quiet mobile workspace acoustics, and personalized terminal meet & greet.",
      imagePrompt: "Inside luxury Mercedes Maybach executive cabin, beige quilted leather reclining seats, ambient LED strip lighting, burr walnut trim, 8k editorial"
    },
    bentoFeatures: [
      {
        tag: "Global Telemetry",
        title: "Worldwide Flight Radar Tracking",
        description: "Continuous flight radar monitoring automatically synchronizes driver dispatch with early arrivals or international tarmac delays.",
        metric: "500+ Global Cities",
        icon: "⚡"
      },
      {
        tag: "First-Class Fleet",
        title: "Immaculate European Fleet",
        description: "Late-model Mercedes-Benz S-Class, BMW 7 Series, and Mercedes V-Class people movers sanitized before every journey.",
        metric: "Euro NCAP 5★",
        icon: "🛡️"
      },
      {
        tag: "Financial Certainty",
        title: "All-Inclusive Upfront Fixed Rates",
        description: "Zero dynamic peak-hour surge pricing. All tolls, airport parking fees, and driver gratuities are 100% included in your quote.",
        metric: "0% Surge Multiplier",
        icon: "💎"
      },
      {
        tag: "VIP Protocol",
        title: "Terminal Meet & Greet Escort",
        description: "Professional suited chauffeurs meeting you inside the arrivals hall with personalized digital name tablets.",
        metric: "VIP Baggage Escort",
        icon: "👑"
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Select Global Route & Class",
        description: "Choose your city, airport code, flight number, and select from First Class, Business Class, or Business Van."
      },
      {
        step: "02",
        title: "Live Telemetry & Driver Dispatch",
        description: "Receive your chauffeur details, live GPS coordinates, and vehicle registration 60 minutes before wheels-down."
      },
      {
        step: "03",
        title: "Step Into Quiet Luxury",
        description: "Enjoy chilled mineral water, high-speed mobile Wi-Fi, and a distraction-free mobile boardroom transit."
      }
    ],
    items: [
      {
        title: "First Class Mercedes S-Class",
        description: "The pinnacle of executive luxury. Reclining rear seats, acoustic glass, and ambient climate control.",
        icon: "🚗",
        price: "$195 Fixed"
      },
      {
        title: "Business Class Mercedes E-Class",
        description: "Sophisticated, punctual mobility for executive day commutes, meetings, and airport transfers.",
        icon: "💼",
        price: "$145 Fixed"
      },
      {
        title: "Business Van Mercedes V-Class",
        description: "Spacious luxury people mover seating up to 7 passengers with generous luggage capacity.",
        icon: "🚐",
        price: "$210 Fixed"
      },
      {
        title: "By-the-Hour Private Chauffeur",
        description: "Flexible hourly disposal for multi-stop corporate roadshows, diplomatic visits, and luxury shopping.",
        icon: "⏱️",
        price: "$130 / hr"
      }
    ],
    stats: [
      { value: "500+", label: "Cities Worldwide" },
      { value: "99.9%", label: "Punctuality Rating" },
      { value: "100%", label: "Fixed-Rate Guarantee" },
      { value: "24/7", label: "Global Dispatch Support" }
    ],
    testimonials: [
      {
        quote: "Blacklane is the only service our executive team trusts worldwide. Whether landing in London or Tokyo, the experience is flawlessly consistent.",
        author: "Harrison Miller",
        role: "Chief Operating Officer, Global Ventures",
        rating: 5
      },
      {
        quote: "The live flight tracking is remarkable. Our flight was delayed by 3 hours, and our chauffeur was waiting the moment we exited customs.",
        author: "Victoria Sterling",
        role: "Managing Director, Sterling & Co.",
        rating: 5
      },
      {
        quote: "Pristine vehicles, courteous chauffeurs, and itemized corporate monthly invoicing. An indispensable partner for executive transit.",
        author: "Arthur Pendelton",
        role: "Partner, International Law Chambers",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "How does the airport meet & greet service work?",
        answer: "Your chauffeur tracks your flight in real time and waits inside the terminal arrivals hall holding a personalized digital nameboard, assisting with all luggage directly to your luxury vehicle."
      },
      {
        question: "What happens if my inbound international flight is delayed?",
        answer: "We automatically adjust our dispatch schedule to your actual wheels-down time with zero waiting surcharges or flight delay penalties."
      },
      {
        question: "Do you offer corporate invoicing and monthly billing accounts?",
        answer: "Yes, corporate accounts receive itemized monthly invoicing, consolidated tax receipts, and direct account manager dispatch support."
      }
    ],
    contact: {
      heading: "Elevate Your Executive Journey with Blacklane",
      buttonText: "Reserve Global Chauffeur on WhatsApp"
    },
    theme: {
      primaryColor: "#ca8a04",
      secondaryColor: "#1c1917"
    }
  },
  bookcabsAus: {
    websiteType: "Business Site",
    templateStyle: "bookcabsAus",
    category: "3d",
    previewUrl: "/templates/demo cars vanta/index.html",
    shortDescription: "Melbourne & Victoria Premier Chauffeur 3D Design Kit with Tullamarine T1-T4 Radar Sync, Luxury Mercedes Fleet & Fixed Rates.",
    thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    previewVideoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    hero: {
      title: "Bookcabs Australia Executive Chauffeurs",
      subtitle: "Melbourne's gold standard in airport transfers & corporate roadshows. Fixed upfront rates, live Tullamarine & Avalon telemetry, and accredited luxury European fleet.",
      ctaText: "Book Melbourne Chauffeur",
      imagePrompt: "Black luxury sedan driving smoothly along Melbourne Bolte Bridge and CityLink freeway at sunset, skyline bokeh, cinematic 8k"
    },
    about: {
      heading: "Victoria's Most Trusted Executive Mobility Network",
      description: "Bookcabs Australia provides premier private airport transfers, corporate transit, and private winery charters across Victoria. Every journey is backed by accredited commercial chauffeurs, real-time CityLink toll routing, and 24/7 Melbourne dispatch.",
      imagePrompt: "Professional suited chauffeur in tailored suit standing by open Mercedes door outside Melbourne airport terminal, warm sunset lighting, 8k"
    },
    bentoFeatures: [
      {
        tag: "Terminal Telemetry",
        title: "Tullamarine & Avalon Radar Tracking",
        description: "Automated flight tracking across T1 (Qantas), T2 (International), T3 (Virgin), and T4 (Domestic) terminals with zero delay penalties.",
        metric: "100% Punctual Pickup",
        icon: "✈️"
      },
      {
        tag: "Luxury European Fleet",
        title: "Mercedes E-Class, S-Class & V-Class",
        description: "Pristine sedans, luxury SUVs, and 7-seater people movers detailed, sanitized, and inspected daily.",
        metric: "Accredited CPV Victoria",
        icon: "🛡️"
      },
      {
        tag: "Transparent Pricing",
        title: "Zero Surge Toll-Inclusive Quotes",
        description: "Fixed rates with CityLink & EastLink tolls included. No surge pricing during peak hours, Grand Prix, or Spring Racing.",
        metric: "0% Peak Surcharges",
        icon: "💎"
      },
      {
        tag: "Regional & Event Tours",
        title: "Yarra Valley & Mornington Charters",
        description: "Bespoke winery day tours, wedding guest transfers, and luxury corporate retreats across regional Victoria.",
        metric: "Custom Itineraries",
        icon: "🍷"
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Enter Melbourne Itinerary",
        description: "Provide your pickup suburb or airport terminal, flight number, and passenger count for an instant fixed quote."
      },
      {
        step: "02",
        title: "Automated Radar Dispatch",
        description: "Our system monitors your inbound flight or Melbourne traffic conditions to position your chauffeur perfectly on time."
      },
      {
        step: "03",
        title: "Effortless Executive Commute",
        description: "Meet your driver inside the terminal or at your doorstep for a serene, high-comfort journey across Victoria."
      }
    ],
    items: [
      {
        title: "Melbourne Airport Tullamarine Transfers",
        description: "Direct terminal meet-and-greet with flight radar tracking and luggage escort.",
        icon: "✈️",
        price: "$120 Fixed"
      },
      {
        title: "Corporate Roadshows & Commutes",
        description: "Quiet mobile boardroom with onboard Wi-Fi and direct monthly corporate invoicing.",
        icon: "💼",
        price: "$140 / hr"
      },
      {
        title: "Mercedes V-Class Group Transfers",
        description: "Spacious 7-seater luxury people mover for corporate delegations and families.",
        icon: "🚐",
        price: "$180 Fixed"
      },
      {
        title: "Yarra Valley Private Winery Charters",
        description: "Bespoke day tours to Victoria's finest vineyards with dedicated chauffeur.",
        icon: "🍷",
        price: "$650 Full Day"
      }
    ],
    stats: [
      { value: "15,000+", label: "Melbourne VIP Journeys" },
      { value: "99.9%", label: "Punctuality Rating" },
      { value: "100%", label: "Fixed-Rate Guarantee" },
      { value: "24/7", label: "Live Melbourne Dispatch" }
    ],
    testimonials: [
      {
        quote: "The premier chauffeur service in Melbourne. Always immaculate Mercedes vehicles, professional drivers, and zero surge stress.",
        author: "Marcus Vance",
        role: "Managing Director, APAC Capital",
        rating: 5
      },
      {
        quote: "Bookcabs handles all our corporate airport transfers and Yarra Valley partner retreats. Punctual, courteous, and effortless to book.",
        author: "Elena Rostova",
        role: "Global Events Director",
        rating: 5
      },
      {
        quote: "Fixed pricing with tolls included is a breath of fresh air compared to surge rideshares. Bookcabs is our go-to in Melbourne.",
        author: "David Sterling",
        role: "Senior Partner, Collins St Advisory",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "How does the Melbourne Airport meet & greet work?",
        answer: "Your driver tracks your flight and waits inside the terminal arrivals hall holding a personalized digital nameboard, escorting you and your luggage directly to the vehicle."
      },
      {
        question: "Are CityLink and EastLink tolls included in the quote?",
        answer: "Yes, all Bookcabs quotes are 100% transparent and all-inclusive of road tolls, airport access charges, and taxes with zero surge multipliers."
      },
      {
        question: "Do you offer child seats and booster capsules?",
        answer: "Yes, we provide complimentary rear-facing, forward-facing, and booster seats compliant with Australian safety standards upon request."
      }
    ],
    contact: {
      heading: "Book Your Melbourne Executive Chauffeur Today",
      buttonText: "Instant WhatsApp Booking / Quote"
    },
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#1e3a8a"
    }
  },
  aero: {
    websiteType: "Business Site",
    templateStyle: "aero",
    category: "3d",
    previewUrl: "/templates/gsap one/index.html",
    shortDescription: "3D minimalist dark aesthetic with floating objects and glowing elements.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    previewVideoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
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
    category: "2d",
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
    category: "3d",
    previewUrl: "https://digifox-onlinestore.vercel.app/",
    shortDescription: "Premium beverage brand landing page with immersive 3D bottle physics.",
    thumbnailUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    previewVideoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
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
    category: "2d",
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
    category: "2d",
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
  },
  digitalPortfolio2d: {
    websiteType: "Portfolio",
    category: "2d",
    previewUrl: "/templates/2d digital portfolio/dist/index.html",
    shortDescription: "Sleek 2D digital portfolio layout for creative designers and engineers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    previewVideoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4",
    hero: {
      title: "Digital Portfolio",
      subtitle: "Crafting beautiful code and human-centered design.",
      ctaText: "Explore Projects",
      imagePrompt: "creative developer workspace minimalist aesthetic"
    },
    about: {
      heading: "About My Work",
      description: "I build responsive, high-performance web products with clean interfaces.",
      imagePrompt: "creative minimal layout clean design"
    },
    items: [
      {
        title: "Product Design",
        description: "Bespoke digital product prototyping.",
        icon: "🎨"
      },
      {
        title: "Front-end Dev",
        description: "Modern React & TypeScript engineering.",
        icon: "💻"
      },
      {
        title: "Technical Writing",
        description: "Explaining complex technical systems.",
        icon: "📝"
      }
    ],
    contact: {
      heading: "Let's connect.",
      buttonText: "Send Message"
    },
    theme: {
      primaryColor: "#6366f1",
      secondaryColor: "#312e81"
    }
  },
  gsapOne: {
    websiteType: "Portfolio",
    templateStyle: "gsap_one",
    category: "2d",
    previewUrl: "/templates/gsap one/index.html",
    shortDescription: "Interactive creative layout with smooth GSAP animations and liquid bubble navigation.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    hero: {
      title: "GSAP Bubble Creative",
      subtitle: "Fluid motions and immersive micro-interactions.",
      ctaText: "Explore Work",
      imagePrompt: "creative developer workspace with fluid animations and bubble layouts"
    },
    about: {
      heading: "Our Motion Philosophy",
      description: "We believe in digital interfaces that feel alive, using organic physics and physics-based animations to create deep visual immersion.",
      imagePrompt: "creative abstract layout clean fluid design"
    },
    items: [
      {
        title: "Bubble Menu",
        description: "Interactive gravity-based circular navigation.",
        icon: "🫧"
      },
      {
        title: "GSAP Motion",
        description: "Delightful animations on every click and scroll.",
        icon: "✨"
      },
      {
        title: "Responsive Canvas",
        description: "Perfect scaling across all desktop and mobile displays.",
        icon: "📱"
      }
    ],
    contact: {
      heading: "Ready to animate?",
      buttonText: "Get in Touch"
    },
    theme: {
      primaryColor: "#8b5cf6",
      secondaryColor: "#4c1d95"
    }
  },
  portfolio2dDesigng: {
    websiteType: "Portfolio",
    templateStyle: "portfolio_2d_designg",
    category: "2d",
    previewUrl: "/templates/2d porfolio designg/dist/index.html",
    shortDescription: "Premium luxury layout with rich visual cards and customizable typography.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    hero: {
      title: "SkyElite",
      subtitle: "Experience luxury in flight.",
      ctaText: "Book Charter",
      imagePrompt: "luxury private jet flying high above clouds cinematic"
    },
    about: {
      heading: "Our Vision",
      description: "We deliver bespoke travel experiences tailored for high performance.",
      imagePrompt: "elegant private jet cabin interior luxury modern setup"
    },
    items: [
      {
        title: "Charter Booking",
        description: "Instant flight scheduling and access.",
        icon: "✈️"
      },
      {
        title: "Bespoke Services",
        description: "Curated in-flight dining and accommodation.",
        icon: "🍷"
      },
      {
        title: "Elite Fleet",
        description: "Audited platinum-standard private jets.",
        icon: "🛩️"
      }
    ],
    contact: {
      heading: "Ready to take off?",
      buttonText: "Inquire Now"
    },
    theme: {
      primaryColor: "#da3a16",
      secondaryColor: "#111111"
    }
  },
  demoCarsVanta: {
    websiteType: "Automotive & Luxury Transport",
    templateStyle: "demo_cars_vanta",
    category: "3d",
    previewUrl: "/templates/demo cars vanta/index.html",
    shortDescription: "Ultra-premium automotive and chauffeur template with interactive 3D video reveal, fleet selector and booking widget.",
    thumbnailUrl: "/templates/demo-cars-vanta.png",
    hero: {
      title: "BookCabs.Au",
      subtitle: "Premium chauffeur-driven journeys across Melbourne.",
      ctaText: "Reserve Ride",
      imagePrompt: "matte black luxury chauffeur car in dark studio cinematic lighting"
    },
    about: {
      heading: "Get A Ride Beyond Ordinary",
      description: "From airport transfers to corporate travel, every ride is designed around your time and comfort.",
      imagePrompt: "luxury chauffeur car interior leather seats ambient lighting"
    },
    items: [
      {
        title: "Airport Transfers",
        description: "Reliable, punctual, and stress-free airport transfers.",
        icon: "✈️"
      },
      {
        title: "Corporate Travel",
        description: "Executive luxury chauffeur services tailored for business needs.",
        icon: "💼"
      },
      {
        title: "City Tours & Events",
        description: "Explore the city in absolute comfort with premium rides.",
        icon: "🏙️"
      }
    ],
    contact: {
      heading: "Book A Cab Online",
      buttonText: "Reserve Now"
    },
    theme: {
      primaryColor: "#FF4D14",
      secondaryColor: "#050505"
    }
  },
  intikBurgers: {
    websiteType: "Restaurant & Food",
    templateStyle: "intik_burgers",
    category: "3d",
    previewUrl: "/templates/intik-burgers/index.html",
    shortDescription: "Interactive 3D burger assembly experience with loaded fries, signature menu reveal, and direct ordering.",
    thumbnailUrl: "/templates/intik-burgers/assets/hero-burger.webp",
    hero: {
      title: "INTIK Burgers",
      subtitle: "Born to Burger — Premium gourmet burgers, loaded fries, and signature sauces.",
      ctaText: "Explore Menu",
      imagePrompt: "gourmet double smash cheeseburger floating cinematic studio lighting"
    },
    about: {
      heading: "Made, Not Assembled",
      description: "Fresh crunch, flame-grilled beef, molten cheese and house sauces crafted with zero shortcuts.",
      imagePrompt: "chef preparing artisan smash burger with molten cheese"
    },
    items: [
      {
        title: "Cruncher Burger",
        description: "Crispy golden chicken, melted cheese, and classic house sauce.",
        icon: "🍔",
        price: "400 DZD"
      },
      {
        title: "Cheesy AF",
        description: "Maximum melt with crispy mozzarella patty and rich cheese sauce.",
        icon: "🧀",
        price: "800 DZD"
      },
      {
        title: "Loaded Fries",
        description: "Golden fries topped with smoky pastrami, chorizo sauce, and gratinated cheese.",
        icon: "🍟",
        price: "700 DZD"
      }
    ],
    contact: {
      heading: "Craving a Real Burger?",
      buttonText: "Order Now"
    },
    theme: {
      primaryColor: "#FF7B16",
      secondaryColor: "#0F1115"
    }
  },
  giftsApp: {
    websiteType: "Mobile & Web App",
    templateStyle: "gifts_app",
    category: "3d",
    previewUrl: "/templates/lesaa/www.lesa.app/www.lesa.app/index.html",
    shortDescription: "Playful reading and gaming adventure application with animated characters and rich rewards.",
    thumbnailUrl: "https://framerusercontent.com/images/j7UksNIBHOx3WkHFQfRE3XtU68.png",
    hero: {
      title: "DIGIFOX – The Reading Game",
      subtitle: "The most fun reading and adventure game for kids. Boost skills through interactive play.",
      ctaText: "Play Now",
      imagePrompt: "colorful 3D animated character reading book kids game fantasy magical"
    },
    about: {
      heading: "Why Kids Love DIGIFOX",
      description: "Interactive missions, personalized stories, and exciting rewards that keep learning fun.",
      imagePrompt: "cheerful vibrant fantasy game world for kids"
    },
    items: [
      {
        title: "Interactive Story Missions",
        description: "Engaging reading adventures designed by educators.",
        icon: "📖"
      },
      {
        title: "Collectible Rewards",
        description: "Earn gifts, badges, and unlock custom characters as you read.",
        icon: "🎁"
      },
      {
        title: "Parent Dashboard",
        description: "Track progress and celebrate milestones together.",
        icon: "⭐"
      }
    ],
    contact: {
      heading: "Ready for the Adventure?",
      buttonText: "Get Started"
    },
    theme: {
      primaryColor: "#ED2C95",
      secondaryColor: "#5EEF90"
    }
  },
  riskaLuxury: {
    websiteType: "Portfolio",
    templateStyle: "riskaLuxury",
    category: "2d",
    previewUrl: "/templates/style demo 1/biska_luxury.aura.build/riska-luxury.aura.build/index.html",
    previewVideoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/2e815afb-cac1-4c01-90e1-cf3810246e35/1784904481060-b97cf00c-3e60-47ad-a69b-6a7d1e37987d.mp4",
    shortDescription: "A high-end cinematic luxury clothing website designed for bespoke fashion labels and material studies.",
    thumbnailUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    hero: {
      title: "Biska Luxury Clothing Website",
      subtitle: "Cinematic fashion and luxury material studies.",
      ctaText: "Explore Collection",
      imagePrompt: "cinematic luxury fashion editorial high end minimalist lighting"
    },
    about: {
      heading: "The Atelier",
      description: "Crafting bespoke garments and architectural fashion silhouettes.",
      imagePrompt: "luxury atelier haute couture workshop clean aesthetic"
    },
    items: [
      {
        title: "Haute Couture",
        description: "Handcrafted architectural silhouettes.",
        icon: "👗"
      },
      {
        title: "Material Studies",
        description: "Exploration of tactile fabrics and drape.",
        icon: "✨"
      },
      {
        title: "Runway Archive",
        description: "Seasonal curated showcases.",
        icon: "🏛️"
      }
    ],
    contact: {
      heading: "Inquire for Private Consultation",
      buttonText: "Book Appointment"
    },
    theme: {
      primaryColor: "#c084fc",
      secondaryColor: "#1e1b4b"
    }
  },
  studioFashion: {
    websiteType: "E-Commerce Store",
    templateStyle: "studioFashion",
    category: "2d",
    previewUrl: "/templates/stylg demo 2/studio_fashion.aura.build/studio-fashion.aura.build/index.html",
    previewVideoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/2e815afb-cac1-4c01-90e1-cf3810246e35/1784912221857-e030d797-9716-40fb-bab3-626c8a46fd8b.mp4",
    shortDescription: "A high-end editorial fashion & beauty eCommerce landing page with clean minimalist aesthetic and product showcases.",
    thumbnailUrl: "/templates/stylg demo 2/studio_fashion.aura.build/hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/07b03058-049e-4bf0-be3e-505e30435ece_1600w.png",
    hero: {
      title: "STUDIO Fashion & Beauty",
      subtitle: "Shaping digital experiences for premium fashion and beauty brands.",
      ctaText: "Explore Shop",
      imagePrompt: "minimalist high end fashion and beauty studio clean aesthetic editorial"
    },
    about: {
      heading: "Design Practice",
      description: "We partner with visionary fashion and beauty brands to build immersive eCommerce platforms.",
      imagePrompt: "fashion beauty editorial studio photoshoot neutral tones"
    },
    items: [
      {
        title: "eCommerce Design",
        description: "High-converting digital flagship stores.",
        icon: "✨"
      },
      {
        title: "Art Direction",
        description: "Cinematic campaigns & editorial photography.",
        icon: "🎨"
      },
      {
        title: "Brand Strategy",
        description: "Positioning luxury and lifestyle labels.",
        icon: "💎"
      }
    ],
    contact: {
      heading: "Start a Project with STUDIO",
      buttonText: "Get in Touch"
    },
    theme: {
      primaryColor: "#111111",
      secondaryColor: "#e5e5e0"
    }
  },
  digPortfolio: {
    websiteType: "Portfolio",
    templateStyle: "digPortfolio",
    category: "2d",
    previewUrl: "/templates/dig profolio/dig porfolio/webild-components-version-4.vercel.app/index.html",
    shortDescription: "Interactive Creative Portfolio with Work Scroll Stack, Parallax Testimonials, Bento Services & Split Form.",
    thumbnailUrl: "/templates/dig profolio/dig porfolio/storage.googleapis.com/webild/default/templates/creative-portfolio/screen-1.webp",
    hero: {
      title: "digifox porfolio",
      subtitle: "Design that commands attention. Engineered for performance, not just aesthetics.",
      ctaText: "Book a call with me",
      imagePrompt: "independent creative designer portfolio dark modern aesthetic"
    },
    about: {
      heading: "About digifox porfolio",
      description: "I don't design to decorate — I design to solve. Sharp, intentional work that moves brands forward.",
      imagePrompt: "creative director portrait studio lighting minimal"
    },
    items: [
      {
        title: "HydroFlow Product Launch",
        description: "Beverage brand shoot. Every frame engineered to sell.",
        icon: "📸"
      },
      {
        title: "Webild Athlete Campaign",
        description: "Sports tech shoot. Wearables captured in raw motion.",
        icon: "⚡"
      },
      {
        title: "Maru Residence",
        description: "Architectural interior shoot. Minimal compositions.",
        icon: "🏛️"
      }
    ],
    contact: {
      heading: "Let's Build Something Unforgettable",
      buttonText: "Send Message"
    },
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#8b5cf6"
    }
  }
};



