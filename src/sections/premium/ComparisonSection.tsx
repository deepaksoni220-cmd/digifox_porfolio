import React from 'react';
import { FadeIn } from '../../components/FadeIn';

const COMPARISON_DATA = [
  { traditional: "Generic Template", premium: "Fully Custom Experience" },
  { traditional: "Basic Layout", premium: "Interactive Storytelling" },
  { traditional: "Static Images", premium: "Cinematic Animations" },
  { traditional: "Average Branding", premium: "Premium Brand Identity" },
  { traditional: "Low Engagement", premium: "Visitors Stay Longer" },
  { traditional: "Poor User Journey", premium: "Conversion-Focused Design" },
  { traditional: "Looks Like Everyone Else", premium: "Memorable Digital Experience" },
  { traditional: "Competes on Price", premium: "Supports Premium Pricing" },
];

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#111111]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <FadeIn delay={0.1} y={30} className="text-center mb-16">
          <h2 className="font-black text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight">
            Traditional Website vs DigiFox Experience
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 text-lg sm:text-xl font-bold text-[#D7E2EA]/70 border-b border-white/10 w-1/2">
                    Traditional Website
                  </th>
                  <th className="p-6 text-lg sm:text-xl font-bold text-[#3b82f6] border-b border-white/10 w-1/2 bg-[#3b82f6]/5 rounded-t-xl">
                    DigiFox Premium Website
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={i} className="group">
                    <td className="p-6 text-[#D7E2EA]/50 font-light border-b border-white/5 group-hover:bg-white/[0.02] transition-colors">
                      <span className="inline-block mr-3 text-red-500/50">✕</span>
                      {row.traditional}
                    </td>
                    <td className="p-6 text-white font-medium border-b border-white/5 bg-[#3b82f6]/5 group-hover:bg-[#3b82f6]/10 transition-colors">
                      <span className="inline-block mr-3 text-[#3b82f6]">✓</span>
                      {row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-16 text-center">
            <a
              href="/#portfolio"
              className="inline-block px-8 py-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Explore Our Interactive Demo
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
