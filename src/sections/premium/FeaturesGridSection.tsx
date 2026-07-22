import React from 'react';
import { FadeIn } from '../../components/FadeIn';

const UPGRADE_REASONS = [
  "Build trust faster",
  "Increase enquiry quality",
  "Improve user engagement",
  "Position yourself as a premium brand",
  "Justify higher pricing",
  "Stand out from competitors",
  "Strengthen your online reputation",
  "Support future business growth"
];

const PREMIUM_FEATURES = [
  {
    category: "Design",
    items: ["Fully Custom UI/UX", "Luxury Layouts", "Interactive Storytelling", "Conversion-Driven Structure"]
  },
  {
    category: "Animations",
    items: ["2D Motion Graphics", "3D Elements", "Smooth Scrolling", "Page Transitions", "GSAP Animations", "Micro Interactions"]
  },
  {
    category: "Performance",
    items: ["Mobile Optimized", "SEO Ready", "Lightning Fast", "Secure", "Scalable", "Analytics Integration", "Custom CMS", "Future Ready"]
  }
];

export const FeaturesGridSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0C0C0C]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col gap-32">
        
        {/* Section 5: Why Businesses Upgrade */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-6">
              Why Businesses Upgrade to Custom Websites
            </h2>
            <p className="text-[#D7E2EA] font-light text-xl mb-12">
              A premium website doesn't just look beautiful. It works harder. It helps you:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UPGRADE_REASONS.map((reason, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                    <span className="text-[#3b82f6] font-bold">✓</span>
                  </div>
                  <span className="text-white font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Section 8: Premium Features */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-12 text-center">
              Premium Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PREMIUM_FEATURES.map((group, i) => (
                <div key={i} className="p-8 rounded-3xl bg-[#111111] border border-white/10 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                    {group.category}
                  </h3>
                  <ul className="space-y-4 flex-1">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-[#3b82f6] mt-1">✔</span>
                        <span className="text-[#D7E2EA]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <a
                href="https://wa.me/yourwhatsappnumber" // Ensure user updates this
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                Request a Custom Proposal
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Section 9: Think Beyond */}
        <div>
          <FadeIn delay={0.1} y={30} className="text-center max-w-4xl mx-auto p-12 sm:p-20 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#0C0C0C] border border-white/10">
            <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8">
              Think Beyond a Website.
            </h2>
            <p className="text-[#D7E2EA]/70 text-xl font-light mb-8">
              Imagine having...
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-2xl sm:text-3xl font-bold text-white mb-12">
              <span>A digital showroom.</span>
              <span className="text-[#3b82f6]">•</span>
              <span>A sales presentation.</span>
              <span className="text-[#3b82f6]">•</span>
              <span>A trust-building machine.</span>
              <span className="text-[#3b82f6]">•</span>
              <span>A brand's experience.</span>
            </div>
            <p className="text-white text-xl font-medium">
              Working for your business all day.<br/>
              <span className="text-[#3b82f6]">That's what a premium website should be.</span>
            </p>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};
