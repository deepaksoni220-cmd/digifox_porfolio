import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";
import { PRICING_DATA, type PlanPackage } from "../../data/pricingPlans";

export const PricingPage: React.FC = () => {
  const [country, setCountry] = useState<"IN" | "GLOBAL">("IN");
  const [isAnnual, setIsAnnual] = useState(true);
  const [planCategory, setPlanCategory] = useState<"3d" | "2d">("3d");
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
      q: "How much bandwidth is included with each website?",
      a: "Every single website license includes 20 GB of blazing-fast Global Edge CDN bandwidth each month. Multi-site packs provide 20 GB for every individual site (60 GB total for 3 3D sites, and 100 GB total for 5 2D sites)."
    },
    {
      q: "Can I connect my own custom domains to each website in a pack?",
      a: "Yes! Each website in a 3-pack or 5-pack gets its own separate custom domain linking (e.g. site1.com, clientbrand.in) with automated global SSL certificates and distinct branding."
    },
    {
      q: "How does the annual discount work?",
      a: "When you choose annual billing, you save up to 25% on 2D websites and up to 21% on 3D Animated websites, billed once yearly."
    },
    {
      q: "Can I upgrade from 1 website to a multi-site pack anytime?",
      a: "Yes, you can upgrade your plan anytime from your dashboard with seamless pro-rated billing."
    },
    {
      q: "What payment methods are supported?",
      a: "In India, we support UPI (Google Pay, PhonePe, Paytm), NetBanking, and all Indian Debit/Credit Cards. Globally, we support all major Credit/Debit cards, Apple Pay, and Google Pay via Stripe."
    }
  ];

  const renderCard = (pkg: PlanPackage, is3D: boolean) => {
    const isPopular = pkg.popular;
    return (
      <div
        key={pkg.id}
        className={`p-8 sm:p-10 rounded-3xl relative flex flex-col justify-between transition-all duration-300 ${
          isPopular
            ? is3D
              ? "bg-gradient-to-b from-[#1c1e38] via-[#101226] to-[#080913] border-2 border-[#3b82f6] shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:shadow-[0_0_70px_rgba(59,130,246,0.45)]"
              : "bg-gradient-to-b from-[#241320] via-[#150a14] to-[#080913] border-2 border-[#ec4899] shadow-[0_0_50px_rgba(236,72,153,0.3)] hover:shadow-[0_0_70px_rgba(236,72,153,0.45)]"
            : "bg-[#0c0d1a] border border-white/10 hover:border-white/20 shadow-2xl"
        }`}
      >
        {pkg.badge && (
          <div
            className={`absolute -top-4 left-1/2 -translate-x-1/2 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg ${
              is3D
                ? "bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]"
                : "bg-gradient-to-r from-[#ec4899] to-[#f43f5e]"
            }`}
          >
            {pkg.badge}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3 mt-1">
            <span
              className={`text-xs font-black uppercase tracking-widest ${
                is3D ? "text-[#60a5fa]" : "text-[#f472b6]"
              }`}
            >
              {pkg.name}
            </span>
            {isAnnual && (
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {pkg.discountLabel}
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-bold text-white/90 mb-4">
            <span>🚀 {pkg.siteCountLabel}</span>
            <span>•</span>
            <span className="text-emerald-400 font-extrabold">20 GB Bandwidth/site</span>
          </div>

          <p className="text-xs text-white/60 mb-6 font-light leading-relaxed min-h-[36px]">
            {pkg.description}
          </p>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl sm:text-6xl font-black text-white">
              {currentPricing.currencySymbol}
              {isAnnual ? pkg.annualMonthly : pkg.monthly}
            </span>
            <span className="text-sm text-white/50 font-bold">/ month</span>
          </div>

          {isAnnual && (
            <p className="text-xs text-emerald-400 font-semibold mb-6">
              Billed annually at {currentPricing.currencySymbol}{pkg.annualTotal}/yr ({pkg.savingsText})
            </p>
          )}

          <div className="w-full h-px bg-white/10 my-6" />

          <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4">
            Included in this plan:
          </h4>

          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-white/80 font-light">
            {pkg.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <span className={is3D ? "text-[#60a5fa] font-bold" : "text-emerald-400 font-bold"}>
                  {is3D ? "⚡" : "✓"}
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            to="/ai-builder"
            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              isPopular
                ? is3D
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-95 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
                  : "bg-gradient-to-r from-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-[1.02]"
                : "bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white"
            }`}
          >
            <span>{is3D ? "Launch 3D Web Studio" : "Choose 2D Plan"}</span>
            <span>{is3D ? "🚀" : "→"}</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="WebMake Pricing — Simple, Transparent Plans for 2D & 3D Websites"
        description="Choose between 1-site licenses and multi-site packages for 2D and 3D WebGL websites with 20GB bandwidth included."
      />
      
      <WebMakeNav activePage="pricing" />

      {/* Hero Header */}
      <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center relative">
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
          Choose single website licenses or high-value multi-site packages. 20 GB CDN bandwidth included on all plans.
        </p>

        {/* 1. Plan Type Buttons (3D vs 2D vs Compare) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="flex flex-wrap items-center justify-center bg-white/[0.04] border border-white/15 p-1.5 rounded-2xl sm:rounded-full backdrop-blur-md gap-1 shadow-2xl">
            <button
              onClick={() => setPlanCategory("3d")}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                planCategory === "3d"
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-[1.02]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <span>🎮 3D Animated Websites</span>
            </button>

            <button
              onClick={() => setPlanCategory("2d")}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                planCategory === "2d"
                  ? "bg-gradient-to-r from-[#ec4899] to-[#f43f5e] text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] scale-[1.02]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <span>⚡ 2D Animated Websites</span>
            </button>
          </div>
        </div>

        {/* 2. Billing Duration & Currency Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          
          {/* Monthly / Annual Toggle */}
          <div className="flex items-center bg-white/[0.04] border border-white/10 p-1.5 rounded-full backdrop-blur-md">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                !isAnnual
                  ? "bg-[#3b82f6] text-white shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
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
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                country === "IN" ? "bg-white/20 text-white shadow font-black" : "text-white/50 hover:text-white"
              }`}
            >
              🇮🇳 INR (₹)
            </button>
            <button
              onClick={() => setCountry("GLOBAL")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                country === "GLOBAL" ? "bg-white/20 text-white shadow font-black" : "text-white/50 hover:text-white"
              }`}
            >
              🌐 USD ($)
            </button>
          </div>

        </div>
      </div>

      {/* Pricing Cards Grid Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">
          
          {/* ================= 3D SPECIFIC VIEW ================= */}
          {planCategory === "3d" && (
            <motion.div
              key="3d-plan-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
            >
              {renderCard(currentPricing.threeD.single, true)}
              {renderCard(currentPricing.threeD.bundle, true)}
            </motion.div>
          )}

          {/* ================= 2D SPECIFIC VIEW ================= */}
          {planCategory === "2d" && (
            <motion.div
              key="2d-plan-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
            >
              {renderCard(currentPricing.twoD.single, false)}
              {renderCard(currentPricing.twoD.bundle, false)}
            </motion.div>
          )}

        </AnimatePresence>
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
                className="w-full p-6 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 text-white hover:text-[#60a5fa] transition-colors cursor-pointer"
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

      <WebMakeFooter />
    </div>
  );
};
