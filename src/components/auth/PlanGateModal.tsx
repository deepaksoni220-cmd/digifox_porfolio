import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, Zap, Shield, Crown, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const PlanGateModal: React.FC = () => {
  const { planModalOpen, closePlanModal, subscribePlan } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro" | "agency">("pro");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!planModalOpen) return null;

  const plans = [
    {
      id: "starter" as const,
      name: "Starter 2D/3D",
      price: "$29",
      period: "/month",
      desc: "Perfect for personal brands & single site launches",
      features: [
        "1 Live Website Subdomain",
        "Full 2D & 3D Interactive Web Studio",
        "Autonomous SEO Audit & Recrawls",
        "Standard Export & Hosting"
      ],
      icon: Zap,
      accent: "from-blue-500 to-cyan-500"
    },
    {
      id: "pro" as const,
      name: "Pro Growth & SEO",
      price: "$49",
      period: "/month",
      popular: true,
      desc: "High-impact autonomous SEO, GEO & AEO engine",
      features: [
        "5 Live Website Publishing",
        "Autonomous Tri-Engine Pipeline (SEO/GEO/AEO)",
        "10 AI Authority Blog Posts / Mo",
        "WordPress & Shopify Auto-Sync",
        "One-Time Registration Baseline SERP"
      ],
      icon: Crown,
      accent: "from-blue-600 via-violet-600 to-pink-500"
    },
    {
      id: "agency" as const,
      name: "Agency Master",
      price: "$99",
      period: "/month",
      desc: "Unlimited power for marketing teams & multiple clients",
      features: [
        "Unlimited Websites & Subdomains",
        "All Client Management & RBAC",
        "50 AI Blog Articles / Mo",
        "Custom Webhook & GitHub Publishing",
        "Priority Dedicated AI Quota"
      ],
      icon: Shield,
      accent: "from-purple-500 to-indigo-600"
    }
  ];

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await subscribePlan(selectedPlan);
      setSuccessMsg(`Plan activated: ${selectedPlan.toUpperCase()}! You can now publish and run automated SEO pipelines.`);
      setTimeout(() => {
        setSuccessMsg(null);
        closePlanModal();
      }, 1400);
    } catch (err: any) {
      alert(err.message || "Failed to activate plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#0b0d18] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={closePlanModal}
            className="absolute top-5 right-5 text-white/50 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Subscription Required to Publish & Run Auto SEO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Unlock WebMake Publishing & Autonomous SEO
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-lg mx-auto">
              Choose a plan to publish your generated websites to live custom subdomains and activate autonomous SEO, GEO citations & AI blogs.
            </p>
          </div>

          {/* Success toast */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
              {successMsg}
            </div>
          )}

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {plans.map((p) => {
              const isSelected = selectedPlan === p.id;
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white/[0.08] border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-[10px] font-black uppercase text-white shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${p.accent} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-blue-400 bg-blue-500 text-white" : "border-white/30"
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-white">{p.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1 mb-2">
                      <span className="text-2xl font-black text-white">{p.price}</span>
                      <span className="text-[11px] text-white/50">{p.period}</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed mb-4">{p.desc}</p>

                    <ul className="space-y-2 border-t border-white/10 pt-3">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-white/80">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <Link
              to="/ai-builder/pricing"
              onClick={closePlanModal}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              View Full Feature Comparison & Yearly Discounts →
            </Link>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-105 active:scale-95 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Subscribe to {selectedPlan.toUpperCase()} Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
