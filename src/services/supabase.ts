import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://sfoyjehalzgrcaashuaq.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmb3lqZWhhbHpncmNhYXNodWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MzAxNjEsImV4cCI6MjEwMzQwNjE2MX0.n07Bj8yBXUklT-BFwgN1yHZAK3CtVOuAMbXaymlg4gc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const supabaseAuth = {
  // Send 6-digit OTP code to user's email
  async sendEmailOtp(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) throw error;
    return data;
  },

  // Verify 6-digit OTP code sent to user's email
  async verifyEmailOtp(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: token.trim(),
      type: "email",
    });
    if (error) throw error;
    return data;
  },

  // Password Login
  async signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw error;
    return data;
  },

  // Password Sign Up
  async signUp(email: string, password: string, name?: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          name: name || email.split("@")[0],
          role: email.trim().toLowerCase() === "admin@digifox.world" ? "admin" : "user",
          plan: email.trim().toLowerCase() === "admin@digifox.world" ? "agency" : "free",
        },
      },
    });
    if (error) throw error;
    return data;
  },

  // Sign Out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Supabase signOut error:", error);
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) return null;
    return data.session;
  },

  // Get current user
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  },
};
