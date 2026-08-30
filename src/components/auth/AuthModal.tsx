import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Loader2, Sparkles, KeyRound, CheckCircle2, RotateCw } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalMode, closeAuthModal, sendOtp, verifyOtp, login, register } = useAuth();
  
  const [tab, setTab] = useState<"otp" | "password">("otp");
  const [isRegister, setIsRegister] = useState(false);
  
  // OTP State
  const [otpStep, setOtpStep] = useState<"email" | "verify">("email");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSentNotice, setOtpSentNotice] = useState(false);
  
  // Password State
  const [name, setName] = useState("");
  const [passwordEmail, setPasswordEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync mode
  useEffect(() => {
    if (authModalMode === "register") {
      setTab("password");
      setIsRegister(true);
    } else if (authModalMode === "login") {
      setTab("password");
      setIsRegister(false);
    } else {
      setTab("otp");
      setOtpStep("email");
    }
    setError(null);
  }, [authModalMode, authModalOpen]);

  if (!authModalOpen) return null;

  // Handle Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpEmail.trim()) return;
    setError(null);
    setLoading(true);
    try {
      await sendOtp(otpEmail);
      setOtpSentNotice(true);
      setOtpStep("verify");
    } catch (err: any) {
      setError(err.message || "Failed to send verification code. Please verify the email address.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const ok = await verifyOtp(otpEmail, otpCode);
      if (!ok) {
        throw new Error("Invalid or expired 6-digit OTP code. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, passwordEmail, password);
      } else {
        await login(passwordEmail, password);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Quick Admin Login
  const handleQuickAdminLogin = async () => {
    setTab("password");
    setIsRegister(false);
    setPasswordEmail("admin@digifox.world");
    setPassword("digifox2026");
    setError(null);
    setLoading(true);
    try {
      await login("admin@digifox.world", "digifox2026");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#0b0d18] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mx-auto mb-3">
              {tab === "otp" ? <KeyRound className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {tab === "otp"
                ? (otpStep === "email" ? "Email OTP Verification" : "Enter Verification Code")
                : (isRegister ? "Create Your Account" : "Sign In to WebMake")}
            </h2>
            <p className="text-xs text-white/50 mt-1">
              {tab === "otp"
                ? (otpStep === "email" ? "Sign in securely with a one-time code sent to your email" : `Code sent to ${otpEmail}`)
                : (isRegister ? "Sign up to unlock the Studio, generate 3D sites & manage SEO" : "Sign in to access your websites & autonomous SEO")}
            </p>
          </div>

          {/* Main Auth Tabs: Email OTP vs Password */}
          <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/10 mb-5">
            <button
              type="button"
              onClick={() => { setTab("otp"); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === "otp" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Email OTP</span>
            </button>
            <button
              type="button"
              onClick={() => { setTab("password"); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === "password" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          {/* ================= 1. EMAIL OTP TAB ================= */}
          {tab === "otp" && (
            <div>
              {otpStep === "email" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-white/70 uppercase mb-1.5">Your Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-white/[0.05] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send 6-Digit OTP Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {otpSentNotice && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>Verification code has been dispatched to your email.</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-white/70 uppercase mb-1.5">Enter 6-Digit Code</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        maxLength={8}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        className="w-full bg-white/[0.05] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-center tracking-widest font-mono text-base text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Verify & Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => setOtpStep("email")}
                      className="text-white/50 hover:text-white cursor-pointer"
                    >
                      ← Change Email
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Resend Code</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ================= 2. PASSWORD TAB ================= */}
          {tab === "password" && (
            <div>
              {/* Sign In vs Sign Up toggle */}
              <div className="flex justify-center gap-4 text-xs font-semibold mb-4 border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={() => { setIsRegister(false); setError(null); }}
                  className={`pb-1 cursor-pointer transition-colors ${
                    !isRegister ? "text-blue-400 border-b-2 border-blue-400 font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setError(null); }}
                  className={`pb-1 cursor-pointer transition-colors ${
                    isRegister ? "text-blue-400 border-b-2 border-blue-400 font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                {isRegister && (
                  <div>
                    <label className="block text-[11px] font-bold text-white/70 uppercase mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-white/[0.05] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-white/70 uppercase mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={passwordEmail}
                      onChange={(e) => setPasswordEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/70 uppercase mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{isRegister ? "Create Account & Continue" : "Sign In to Studio"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Quick Admin Demo Login Bridge */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="text-[11px] text-yellow-400/90 hover:text-yellow-300 font-semibold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>1-Click Master Admin (admin@digifox.world)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
