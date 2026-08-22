import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WebamekNav } from "../../components/builder/WebamekNav";
import { SEOMeta } from "../../components/SEOMeta";
import { PRICING_DATA } from "../../data/pricingPlans";

export const PricingPage: React.FC = () => {
  const [country, setCountry] = useState<"IN" | "GLOBAL">("IN");
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && (tz.includes("Calcutta") || tz.includes("Kolkata") || tz === "Asia/Colombo")) {
        setCountry("IN");
      } else {
        fetch("https://ipapi.co/json/")
          .then((r) => r.json())
          .then((data) => {
            if (data?.country_code === "IN") {
              setCountry("IN");
            } else {
              setCountry("GLOBAL");
            }
          })
          .catch(() => setCountry("IN"));
      }
    } catch {
      setCountry("IN");
    }
  }, []);

  const currentPricing = PRICING_DATA[country];

  const faqs = [
    {
      q: "Can I connect my own custom domain?",
      a: "Yes, all plans allow you to link your custom domain (e.g. www.yourcompany.com) with automatic global SSL certificates, as well as providing a free *.digifox.world subdomain."
    },
    {
      q: "How does the annual discount work?",
      a: "When you choose the annual plan, you save up to 25% on 2D websites and up to 21% on 3D Animated websites, billed once yearly."
    },
    {
      q: "Are there any hidden hosting or bandwidth fees?",
      a: "Zero hidden fees. Global Edge CDN, fast servers, SSL certificates, and unlimited visitor bandwidth are fully included in all plans."
    },
    {
      q: "Can I upgrade from 2D to 3D anytime?",
      a: "Yes, you can upgrade your plan anytime from your dashboard with pro-rated billing."
    },
    {
      q: "What payment methods are supported?",
      a: "In India, we support UPI (Google Pay, PhonePe, Paytm), NetBanking, and all Indian Debit/Credit Cards. Globally, we support all major Credit/Debit cards, Apple Pay, and Google Pay via Stripe."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="Webamek Pricing — Simple, Transparent Plans for 2D & 3D Websites"
        description="Choose between high-speed 2D websites and immersive 3D WebGL animated websites. Save up to 25% on annual plans."
      />
      
      <WebamekNav activePage="pricing" />

      {/* Hero Header */}
      <div className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-[#3b82f6]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#60a5fa] mb-6 backdrop-blur-md">
          <span>💎 Transparent & Affordable Pricing</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight max-w-4xl mx-auto">
          One Simple Price For <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a855f7] to-[#ec4899]">
            Exceptional Websites
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
          Everything you need to launch, customize, and grow your digital presence. No hidden costs.
        </p>

        {/* Currency & Annual Toggle Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          
          {/* Monthly / Annual Toggle */}
          <div className="flex items-center bg-white/[0.04] border border-white/10 p-1.5 rounded-full backdrop-blur-md">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                !isAnnual
                  ? "bg-[#3b82f6] text-white shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                isAnnual
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-extrabold">
                SAVE UP TO 25%
              </span>
            </button>
          </div>

          {/* Region / Currency Switcher */}
          <div className="flex items-center bg-white/[0.04] border border-white/10 p-1 rounded-full text-xs font-bold">
            <button
              onClick={() => setCountry("IN")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                country === "IN" ? "bg-white/20 text-white shadow" : "text-white/50 hover:text-white"
              }`}
            >
              🇮🇳 INR (₹)
            </button>
            <button
              onClick={() => setCountry("GLOBAL")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                country === "GLOBAL" ? "bg-white/20 text-white shadow" : "text-white/50 hover:text-white"
              }`}
            >
              🌐 USD ($)
            </button>
          </div>

        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* 2D Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl bg-[#0c0d1a] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between relative shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#60a5fa]">
                  {currentPricing.twoD.name}
                </span>
                {isAnnual && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {currentPricing.twoD.discountLabel}
                  </span>
                )}
              </div>

              <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
                {currentPricing.twoD.description}
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-6xl font-black text-white">
                  {currentPricing.currencySymbol}
                  {isAnnual ? currentPricing.twoD.annualMonthly : currentPricing.twoD.monthly}
                </span>
                <span className="text-sm text-white/50 font-bold">/ month</span>
              </div>

              {isAnnual && (
                <p className="text-xs text-emerald-400 font-semibold mb-6">
                  Billed annually at {currentPricing.currencySymbol}{currentPricing.twoD.annualTotal}/yr ({currentPricing.twoD.savingsText})
                </p>
              )}

              <div className="w-full h-px bg-white/10 my-6" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4">
                What’s included:
              </h4>

              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-white/80 font-light">
                {currentPricing.twoD.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                to="/ai-builder"
                className="w-full py-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Choose 2D Plan</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>

          {/* 3D Plan Card (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#181a30] via-[#0f1020] to-[#07080e] border-2 border-[#3b82f6] relative flex flex-col justify-between shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:shadow-[0_0_70px_rgba(59,130,246,0.35)] transition-all"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
              ⚡ Most Popular 3D Experience
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#a855f7]">
                  {currentPricing.threeD.name}
                </span>
                {isAnnual && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {currentPricing.threeD.discountLabel}
                  </span>
                )}
              </div>

              <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
                {currentPricing.threeD.description}
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-200">
                  {currentPricing.currencySymbol}
                  {isAnnual ? currentPricing.threeD.annualMonthly : currentPricing.threeD.monthly}
                </span>
                <span className="text-sm text-white/50 font-bold">/ month</span>
              </div>

              {isAnnual && (
                <p className="text-xs text-purple-400 font-semibold mb-6">
                  Billed annually at {currentPricing.currencySymbol}{currentPricing.threeD.annualTotal}/yr ({currentPricing.threeD.savingsText})
                </p>
              )}

              <div className="w-full h-px bg-white/10 my-6" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4">
                Everything in 2D plus:
              </h4>

              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-white/80 font-light">
                {currentPricing.threeD.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="text-[#60a5fa] font-bold">⚡</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                to="/ai-builder"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Launch 3D Web Studio</span>
                <span>🚀</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-center mb-10 text-white">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-2xl bg-[#0c0d1a] border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 text-white hover:text-[#60a5fa] transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-lg text-white/40">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-white/70 font-light leading-relaxed border-t border-white/[0.06] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
