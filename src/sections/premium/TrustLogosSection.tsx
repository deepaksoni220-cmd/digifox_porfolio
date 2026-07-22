import React from 'react';
import { FadeIn } from '../../components/FadeIn';
import { ShoppingCart, GraduationCap, Stethoscope, Paintbrush, BarChart3, Building2, Wrench, Gem } from 'lucide-react';

const TRUSTED_INDUSTRIES = [
  { name: "Ecommerce Brands", icon: <ShoppingCart size={18} /> },
  { name: "Coaches & Consultants", icon: <GraduationCap size={18} /> },
  { name: "Dentists & Clinics", icon: <Stethoscope size={18} /> },
  { name: "Interior Designers", icon: <Paintbrush size={18} /> },
  { name: "Marketing Agencies", icon: <BarChart3 size={18} /> },
  { name: "Real Estate", icon: <Building2 size={18} /> },
  { name: "Home Services", icon: <Wrench size={18} /> },
  { name: "Luxury Brands", icon: <Gem size={18} /> }
];

export const TrustLogosSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#111111] border-y border-[#D7E2EA]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <FadeIn delay={0.1} y={20} className="text-center mb-12">
          <h3 className="text-[#D7E2EA]/50 font-medium uppercase tracking-[0.2em] text-sm">
            Trusted by Growing Businesses
          </h3>
          <p className="mt-2 text-white font-semibold text-lg">
            Perfect for
          </p>
        </FadeIn>

        {/* Marquee/Grid of Industries */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-5xl mx-auto">
          {TRUSTED_INDUSTRIES.map((industry, i) => (
            <FadeIn key={industry.name} delay={0.1 + (i * 0.05)} y={20}>
              <div className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#D7E2EA]/15 bg-[#0C0C0C]/50 text-[#D7E2EA]/80 font-medium whitespace-nowrap hover:border-[#3b82f6]/50 hover:text-white hover:bg-[#3b82f6]/5 transition-all duration-300">
                <span className="text-[#3b82f6]">{industry.icon}</span>
                {industry.name}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
