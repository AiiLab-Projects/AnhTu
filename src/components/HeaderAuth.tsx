"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export function HeaderAuth() {
  const { configured, loading, profile, signOut } = useAuth();
  if (!configured || loading) return null;
  if (!profile) return <Link className="auth-chip" href="/dang-nhap">Đăng nhập</Link>;
  const firstName = profile.full_name.trim().split(/\s+/).slice(-1)[0] || "bạn";
  return (
    <span className="auth-user">
      {profile.role === "admin" && <Link className="auth-chip auth-chip--admin" href="/quan-ly">Quản lý</Link>}
      <span className="auth-hello" title={profile.email}>Chào {firstName}</span>
      <button className="auth-chip" type="button" onClick={() => void signOut()}>Đăng xuất</button>
    </span>
  );
}
