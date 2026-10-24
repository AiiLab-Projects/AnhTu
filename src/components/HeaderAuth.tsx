"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Icon } from "@/components/Icon";

/** Chữ cái đầu của tên (từ cuối, theo cách gọi tên của người Việt), dùng làm ảnh đại diện. */
function initialOf(fullName: string, email: string) {
  const word = fullName.trim().split(/\s+/).slice(-1)[0] || email;
  return (word[0] ?? "?").toUpperCase();
}

export function HeaderAuth() {
  const { configured, loading, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [open]);

  if (!configured || loading) return null;

  if (!profile) {
    return (
      <Link className="account-login" href="/dang-nhap" aria-label="Đăng nhập">
        <span className="account-login-icon" aria-hidden="true"><Icon name="user" size={20} /></span>
        <span className="account-login-text">Đăng nhập</span>
      </Link>
    );
  }

  const isAdmin = profile.role === "admin";
  const name = profile.full_name.trim() || "Bạn";
  const initial = initialOf(profile.full_name, profile.email);

  return (
    <div className="account" ref={rootRef}>
      <button
        type="button"
        className={`account-avatar${isAdmin ? " account-avatar--admin" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Tài khoản của ${name}`}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{initial}</span>
        {isAdmin && <span className="account-badge" aria-hidden="true"><Icon name="star" size={11} strokeWidth={3} /></span>}
      </button>
      {open && (
        <div className="account-menu" role="menu">
          <div className="account-menu-head">
            <span className={`account-avatar account-avatar--large${isAdmin ? " account-avatar--admin" : ""}`} aria-hidden="true">{initial}</span>
            <div>
              <strong>{name}</strong>
              <small>{profile.email}</small>
              <span className={`account-role${isAdmin ? " account-role--admin" : ""}`}>{isAdmin ? "Giáo viên" : "Học viên"}</span>
            </div>
          </div>
          {isAdmin && (
            <Link role="menuitem" className="account-item" href="/quan-ly" onClick={() => setOpen(false)}>
              <Icon name="backpack" size={18} /> Quản lý học viên
            </Link>
          )}
          <Link role="menuitem" className="account-item" href="/tien-do" onClick={() => setOpen(false)}>
            <Icon name="star" size={18} /> Tiến độ của em
          </Link>
          <button role="menuitem" type="button" className="account-item account-item--out" onClick={() => { setOpen(false); void signOut(); }}>
            <Icon name="arrow-left" size={18} /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
