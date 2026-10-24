"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

export type Role = "admin" | "student";
export type Profile = { id: string; email: string; full_name: string; role: Role; active: boolean; created_at: string };

type AuthState = {
  /** false khi chưa đặt khoá Supabase. */
  configured: boolean;
  loading: boolean;
  session: Session | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (fullName: string, email: string, password: string) => Promise<{ error: string | null; needsConfirm: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth phải nằm trong AuthProvider");
  return value;
}

const messages: Record<string, string> = {
  "Invalid login credentials": "Email hoặc mật khẩu chưa đúng.",
  "Email not confirmed": "Em chưa xác nhận email. Hãy mở thư Cô Tú gửi và bấm vào đường dẫn xác nhận.",
  "User already registered": "Email này đã có tài khoản. Em hãy đăng nhập nhé.",
};
const friendly = (message: string) => messages[message] ?? (message.includes("Password should be") ? "Mật khẩu cần ít nhất 6 ký tự." : "Có lỗi xảy ra, em thử lại nhé.");

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  const loadProfile = useCallback(async (current: Session | null) => {
    if (!supabase || !current) { setProfile(null); return; }
    const { data } = await supabase.from("profiles").select("*").eq("id", current.user.id).maybeSingle();
    // Tài khoản bị vô hiệu hoá thì đăng xuất ngay.
    if (data && !data.active) { await supabase.auth.signOut(); setSession(null); setProfile(null); return; }
    setProfile((data as Profile | null) ?? null);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!alive) return;
      setSession(data.session);
      await loadProfile(data.session);
      if (alive) setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      // Không gọi Supabase trực tiếp trong callback này (dễ treo), hoãn sang tick sau.
      setTimeout(() => { void loadProfile(next); }, 0);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, [supabase, loadProfile]);

  const value = useMemo<AuthState>(() => ({
    configured: Boolean(supabase),
    loading,
    session,
    profile,
    async signIn(email, password) {
      if (!supabase) return "Trang đăng nhập chưa được cấu hình.";
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? friendly(error.message) : null;
    },
    async signUp(fullName, email, password) {
      if (!supabase) return { error: "Trang đăng ký chưa được cấu hình.", needsConfirm: false };
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName }, emailRedirectTo: typeof window === "undefined" ? undefined : `${window.location.origin}/dang-nhap` },
      });
      if (error) return { error: friendly(error.message), needsConfirm: false };
      // Email đã tồn tại: Supabase trả về user không có identity để tránh lộ thông tin.
      if (data.user && data.user.identities?.length === 0) return { error: friendly("User already registered"), needsConfirm: false };
      return { error: null, needsConfirm: !data.session };
    },
    async signOut() { await supabase?.auth.signOut(); },
  }), [supabase, loading, session, profile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
