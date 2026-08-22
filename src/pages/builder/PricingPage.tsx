import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";
import { PRICING_DATA } from "../../data/pricingPlans";

export const PricingPage: React.FC = () => {
  const [country, setCountry] = useState<"IN" | "GLOBAL">("IN");
  const [isAnnual, setIsAnnual] = useState(true);
  const [planCategory, setPlanCategory] = useState<"3d" | "2d" | "all">("3d");
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
        title="WebMake Pricing — Simple, Transparent Plans for 2D & 3D Websites"
        description="Choose between high-speed 2D websites and immersive 3D WebGL animated websites. Save up to 25% on annual plans."
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
          Everything you need to launch, customize, and grow your digital presence. No hidden costs.
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
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-white/20 text-white border border-white/30 hidden sm:inline-block">
                Featured
              </span>
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

            <button
              onClick={() => setPlanCategory("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                planCategory === "all"
                  ? "bg-white/20 text-white shadow"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span>Compare Both</span>
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

      {/* Pricing Display Section */}
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
              className="max-w-3xl mx-auto"
            >
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#181a35] via-[#0f1025] to-[#070812] border-2 border-[#3b82f6] relative flex flex-col justify-between shadow-[0_0_60px_rgba(59,130,246,0.25)]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-xl">
                  ⚡ Immersive 3D WebGL Physics Plan
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 mt-2">
                    <span className="text-sm font-black uppercase tracking-widest text-[#a855f7]">
                      {currentPricing.threeD.name}
                    </span>
                    {isAnnual && (
                      <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {currentPricing.threeD.discountLabel}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-white/70 mb-8 font-light leading-relaxed max-w-xl">
                    {currentPricing.threeD.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-200">
                          {currentPricing.currencySymbol}
                          {isAnnual ? currentPricing.threeD.annualMonthly : currentPricing.threeD.monthly}
                        </span>
                        <span className="text-sm text-white/50 font-bold">/ month</span>
                      </div>
                      {isAnnual && (
                        <p className="text-xs text-purple-400 font-semibold mt-1">
                          Billed annually at {currentPricing.currencySymbol}{currentPricing.threeD.annualTotal}/yr ({currentPricing.threeD.savingsText})
                        </p>
                      )}
                    </div>

                    <Link
                      to="/ai-builder"
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-[1.02] cursor-pointer shrink-0"
                    >
                      <span>Launch 3D Web Studio</span>
                      <span>🚀</span>
                    </Link>
                  </div>

                  <div className="w-full h-px bg-white/10 my-8" />

                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-6">
                    What’s included in 3D Animated Plan:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-white/80 font-light">
                    {currentPricing.threeD.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-[#60a5fa] font-bold text-base">⚡</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
                  <span>✓ 30-Day Money Back Guarantee</span>
                  <span>✓ Instant Activation</span>
                  <span>✓ Zero Setup Fees</span>
                </div>
              </div>
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
              className="max-w-3xl mx-auto"
            >
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0d1a] border border-[#ec4899]/40 relative flex flex-col justify-between shadow-[0_0_50px_rgba(236,72,153,0.15)]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ec4899] to-[#f43f5e] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-xl">
                  ⚡ High-Speed 2D Website Plan
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 mt-2">
                    <span className="text-sm font-black uppercase tracking-widest text-[#f472b6]">
                      {currentPricing.twoD.name}
                    </span>
                    {isAnnual && (
                      <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {currentPricing.twoD.discountLabel}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-white/70 mb-8 font-light leading-relaxed max-w-xl">
                    {currentPricing.twoD.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl sm:text-6xl font-black text-white">
                          {currentPricing.currencySymbol}
                          {isAnnual ? currentPricing.twoD.annualMonthly : currentPricing.twoD.monthly}
                        </span>
                        <span className="text-sm text-white/50 font-bold">/ month</span>
                      </div>
                      {isAnnual && (
                        <p className="text-xs text-emerald-400 font-semibold mt-1">
                          Billed annually at {currentPricing.currencySymbol}{currentPricing.twoD.annualTotal}/yr ({currentPricing.twoD.savingsText})
                        </p>
                      )}
                    </div>

                    <Link
                      to="/ai-builder"
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer shrink-0"
                    >
                      <span>Choose 2D Plan</span>
                      <span>→</span>
                    </Link>
                  </div>

                  <div className="w-full h-px bg-white/10 my-8" />

                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-6">
                    What’s included in 2D Plan:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-white/80 font-light">
                    {currentPricing.twoD.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-emerald-400 font-bold text-base">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
                  <span>✓ 30-Day Money Back Guarantee</span>
                  <span>✓ Instant Subdomain & Custom Linking</span>
                  <span>✓ Zero Setup Fees</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= ALL / SIDE-BY-SIDE VIEW ================= */}
          {planCategory === "all" && (
            <motion.div
              key="all-plans-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
            >
              {/* 2D Plan Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0d1a] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between relative shadow-2xl">
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
              </div>

              {/* 3D Plan Card (Featured) */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#181a30] via-[#0f1020] to-[#07080e] border-2 border-[#3b82f6] relative flex flex-col justify-between shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:shadow-[0_0_70px_rgba(59,130,246,0.35)] transition-all">
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
              </div>
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
