import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, supabaseAuth } from "../services/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  plan: "free" | "starter" | "pro" | "agency";
  subscription?: {
    plan: string;
    status: string;
    expires_at: string;
  } | null;
  hasActivePlan?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasActivePlan: boolean;
  authModalOpen: boolean;
  authModalMode: "otp" | "login" | "register";
  planModalOpen: boolean;
  sendOtp: (email: string) => Promise<boolean>;
  verifyOtp: (email: string, token: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  subscribePlan: (plan: "starter" | "pro" | "agency") => Promise<boolean>;
  openAuthModal: (mode?: "otp" | "login" | "register") => void;
  closeAuthModal: () => void;
  openPlanModal: () => void;
  closePlanModal: () => void;
  requireAuth: (action: () => void) => boolean;
  requirePlan: (action: () => void) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("digifox_auth_token"));
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("digifox_auth_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"otp" | "login" | "register">("otp");
  const [planModalOpen, setPlanModalOpen] = useState(false);

  // Format Supabase user into UserProfile
  const mapSupabaseUser = (sbUser: SupabaseUser | null, _accessToken?: string): UserProfile | null => {
    if (!sbUser || !sbUser.email) return null;
    const email = sbUser.email.toLowerCase().trim();
    const isAdmin = email === "admin@digifox.world" || sbUser.user_metadata?.role === "admin";
    const plan = isAdmin ? "agency" : (sbUser.user_metadata?.plan || "free");
    const name = sbUser.user_metadata?.name || sbUser.user_metadata?.full_name || email.split("@")[0];

    return {
      id: sbUser.id,
      name,
      email,
      role: isAdmin ? "admin" : "user",
      plan,
      hasActivePlan: isAdmin || plan !== "free",
    };
  };

  // Sync Supabase Auth state changes
  useEffect(() => {
    // 1. Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const mapped = mapSupabaseUser(session.user, session.access_token);
        if (mapped) {
          setUser(mapped);
          setToken(session.access_token);
          localStorage.setItem("digifox_auth_token", session.access_token);
          localStorage.setItem("digifox_auth_user", JSON.stringify(mapped));
        }
      }
    });

    // 2. Listen to real-time auth events (Sign In, OTP verify, Sign Out, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const mapped = mapSupabaseUser(session.user, session.access_token);
        if (mapped) {
          setUser(mapped);
          setToken(session.access_token);
          localStorage.setItem("digifox_auth_token", session.access_token);
          localStorage.setItem("digifox_auth_user", JSON.stringify(mapped));
        }
      } else {
        // Logged out
        setUser(null);
        setToken(null);
        localStorage.removeItem("digifox_auth_token");
        localStorage.removeItem("digifox_auth_user");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Send Email OTP Code
  const sendOtp = async (email: string): Promise<boolean> => {
    await supabaseAuth.sendEmailOtp(email);
    return true;
  };

  // Verify Email OTP Code
  const verifyOtp = async (email: string, otpToken: string): Promise<boolean> => {
    const data = await supabaseAuth.verifyEmailOtp(email, otpToken);
    if (data.session && data.user) {
      const mapped = mapSupabaseUser(data.user, data.session.access_token);
      if (mapped) {
        setUser(mapped);
        setToken(data.session.access_token);
        localStorage.setItem("digifox_auth_token", data.session.access_token);
        localStorage.setItem("digifox_auth_user", JSON.stringify(mapped));
      }
      setAuthModalOpen(false);
      return true;
    }
    return false;
  };

  // Password Login (with auto-provisioning for Admin and backend fallback)
  const login = async (email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.toLowerCase().trim();
    const isAdminAccount = cleanEmail === "admin@digifox.world";

    try {
      // 1. Try Supabase sign in
      const data = await supabaseAuth.signInWithPassword(cleanEmail, password);
      if (data.session && data.user) {
        const mapped = mapSupabaseUser(data.user, data.session.access_token);
        if (mapped) {
          setUser(mapped);
          setToken(data.session.access_token);
          localStorage.setItem("digifox_auth_token", data.session.access_token);
          localStorage.setItem("digifox_auth_user", JSON.stringify(mapped));
        }
        setAuthModalOpen(false);
        return true;
      }
    } catch (sbErr: any) {
      // If Admin doesn't exist in Supabase yet, auto-provision the admin account
      if (isAdminAccount) {
        try {
          const signUpRes = await supabaseAuth.signUp(cleanEmail, password, "Digifox Master Admin");
          if (signUpRes.session && signUpRes.user) {
            const mapped = mapSupabaseUser(signUpRes.user, signUpRes.session.access_token);
            if (mapped) {
              setUser(mapped);
              setToken(signUpRes.session.access_token);
              localStorage.setItem("digifox_auth_token", signUpRes.session.access_token);
              localStorage.setItem("digifox_auth_user", JSON.stringify(mapped));
            }
            setAuthModalOpen(false);
            return true;
          }
        } catch (_) {}
      }

      // 2. Fallback to Express backend auth
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, password })
        });
        const backendData = await res.json();
        if (backendData.success && backendData.user && backendData.token) {
          setUser(backendData.user);
          setToken(backendData.token);
          localStorage.setItem("digifox_auth_token", backendData.token);
          localStorage.setItem("digifox_auth_user", JSON.stringify(backendData.user));
          setAuthModalOpen(false);
          return true;
        }
      } catch (_) {}

      // If master admin and password matches digifox2026, generate instant session
      if (isAdminAccount && password === "digifox2026") {
        const adminUser: UserProfile = {
          id: "admin_master_digifox",
          name: "Digifox Master Admin",
          email: "admin@digifox.world",
          role: "admin",
          plan: "agency",
          hasActivePlan: true
        };
        const mockToken = `admin_session_${Date.now()}`;
        setUser(adminUser);
        setToken(mockToken);
        localStorage.setItem("digifox_auth_token", mockToken);
        localStorage.setItem("digifox_auth_user", JSON.stringify(adminUser));
        setAuthModalOpen(false);
        return true;
      }

      throw new Error(sbErr.message || "Invalid login credentials. Please check your email and password.");
    }
    return false;
  };

  // Password Register
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.toLowerCase().trim();
    try {
      const data = await supabaseAuth.signUp(cleanEmail, password, name);
      if (data.session && data.user) {
        const mapped = mapSupabaseUser(data.user, data.session.access_token);
        if (mapped) {
          setUser(mapped);
          setToken(data.session.access_token);
          localStorage.setItem("digifox_auth_token", data.session.access_token);
          localStorage.setItem("digifox_auth_user", JSON.stringify(mapped));
        }
        setAuthModalOpen(false);
        return true;
      }
    } catch (sbErr: any) {
      // Fallback to Express backend register
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: cleanEmail, password })
      });
      const backendData = await res.json();
      if (backendData.success && backendData.user && backendData.token) {
        setUser(backendData.user);
        setToken(backendData.token);
        localStorage.setItem("digifox_auth_token", backendData.token);
        localStorage.setItem("digifox_auth_user", JSON.stringify(backendData.user));
        setAuthModalOpen(false);
        return true;
      }
      throw new Error(sbErr.message || backendData.error || "Registration failed.");
    }
    return true;
  };

  // Sign Out
  const logout = async () => {
    await supabaseAuth.signOut();
    setUser(null);
    setToken(null);
    localStorage.removeItem("digifox_auth_token");
    localStorage.removeItem("digifox_auth_user");
  };

  // Upgrade Plan (Updates Supabase User Metadata)
  const subscribePlan = async (plan: "starter" | "pro" | "agency"): Promise<boolean> => {
    if (!user) {
      setAuthModalOpen(true);
      return false;
    }
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { plan },
      });
      if (error) throw error;
      if (data.user) {
        const updated = mapSupabaseUser(data.user, token || undefined);
        if (updated) {
          setUser(updated);
          localStorage.setItem("digifox_auth_user", JSON.stringify(updated));
        }
      }
      setPlanModalOpen(false);
      return true;
    } catch (err: any) {
      console.error("Plan upgrade error:", err);
      throw err;
    }
  };

  const openAuthModal = (mode: "otp" | "login" | "register" = "otp") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);
  const openPlanModal = () => setPlanModalOpen(true);
  const closePlanModal = () => setPlanModalOpen(false);

  const isAdmin = user?.role === "admin";
  const hasActivePlan = isAdmin || user?.plan === "starter" || user?.plan === "pro" || user?.plan === "agency" || Boolean(user?.hasActivePlan);

  // Action Guards
  const requireAuth = (action: () => void): boolean => {
    if (!user) {
      openAuthModal("otp");
      return false;
    }
    action();
    return true;
  };

  const requirePlan = (action: () => void): boolean => {
    if (!user) {
      openAuthModal("otp");
      return false;
    }
    if (isAdmin || hasActivePlan) {
      action();
      return true;
    }
    openPlanModal();
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user),
        isAdmin,
        hasActivePlan,
        authModalOpen,
        authModalMode,
        planModalOpen,
        sendOtp,
        verifyOtp,
        login,
        register,
        logout,
        subscribePlan,
        openAuthModal,
        closeAuthModal,
        openPlanModal,
        closePlanModal,
        requireAuth,
        requirePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
