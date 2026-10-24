"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth, type Profile, type Role } from "@/components/AuthProvider";
import { getSupabase } from "@/lib/supabase";
import { computeStats, type XpEvent } from "@/lib/xp";

const roleLabel: Record<Role, string> = { admin: "Giáo viên (admin)", student: "Học viên" };

export function AdminUsers() {
  const { configured, loading, profile } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState("");
  const [stats, setStats] = useState<Record<string, { xp: number; streak: number }>>({});

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (error) setStatus("Không tải được danh sách. Em kiểm tra lại quyền admin nhé.");
    else setUsers((data ?? []) as Profile[]);
    // Điểm XP và chuỗi của từng học viên (bảng learner_events chưa tạo thì bỏ qua).
    const events = await supabase.from("learner_events").select("user_id, day, xp");
    if (!events.error) {
      const byUser = new Map<string, XpEvent[]>();
      for (const row of events.data ?? []) byUser.set(row.user_id, [...(byUser.get(row.user_id) ?? []), { id: "", kind: "exercise", key: "", day: row.day, xp: row.xp }]);
      setStats(Object.fromEntries([...byUser].map(([id, list]) => { const s = computeStats(list); return [id, { xp: s.xp, streak: s.streak }]; })));
    }
  }, []);

  useEffect(() => { if (profile?.role === "admin") void load(); }, [profile, load]);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? users.filter((user) => `${user.full_name} ${user.email}`.toLowerCase().includes(needle)) : users;
  }, [users, query]);

  async function update(user: Profile, patch: Partial<Pick<Profile, "role" | "active">>) {
    const supabase = getSupabase();
    if (!supabase) return;
    // Admin không tự hạ quyền hoặc khoá chính mình để khỏi mất quyền quản lý.
    if (user.id === profile?.id) { setStatus("Cô không thể đổi vai trò hoặc khoá tài khoản của chính mình."); return; }
    setBusyId(user.id); setStatus("");
    const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
    if (error) setStatus("Chưa lưu được thay đổi. Cô thử lại nhé.");
    else { setUsers((list) => list.map((item) => (item.id === user.id ? { ...item, ...patch } : item))); setStatus("Đã lưu."); }
    setBusyId("");
  }

  async function sendReset(user: Profile) {
    const supabase = getSupabase();
    if (!supabase) return;
    setBusyId(user.id); setStatus("");
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, { redirectTo: `${window.location.origin}/dang-nhap` });
    setStatus(error ? "Chưa gửi được thư đặt lại mật khẩu." : `Đã gửi thư đặt lại mật khẩu tới ${user.email}.`);
    setBusyId("");
  }

  if (!configured) return <p className="auth-error">Tính năng tài khoản chưa được cấu hình (thiếu khoá Supabase).</p>;
  if (loading) return <p className="admin-empty">Đang tải…</p>;
  if (!profile) return <p className="admin-empty">Cô cần <Link href="/dang-nhap">đăng nhập</Link> để quản lý học viên.</p>;
  if (profile.role !== "admin") return <p className="admin-empty">Trang này chỉ dành cho giáo viên (admin).</p>;

  const admins = users.filter((user) => user.role === "admin").length;

  return (
    <section className="admin-users" aria-labelledby="admin-title">
      <header>
        <span className="page-eyebrow">Dành cho giáo viên</span>
        <h1 id="admin-title">Quản lý học viên</h1>
        <p>{users.length} tài khoản · {admins} admin · {users.length - admins} học viên</p>
      </header>
      <div className="admin-toolbar">
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên hoặc email" aria-label="Tìm học viên" />
        <button type="button" className="pill-button" onClick={() => void load()}>Tải lại</button>
      </div>
      <p className="admin-status" role="status">{status}</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Họ tên</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th><th>XP</th><th>Chuỗi</th><th>Ngày đăng ký</th><th /></tr></thead>
          <tbody>
            {shown.map((user) => {
              const self = user.id === profile.id;
              return (
                <tr key={user.id} className={user.active ? "" : "admin-row--off"}>
                  <td data-label="Họ tên">{user.full_name || "(chưa nhập)"}{self && <em> · bạn</em>}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Vai trò">
                    <select value={user.role} disabled={self || busyId === user.id} onChange={(event) => void update(user, { role: event.target.value as Role })} aria-label={`Vai trò của ${user.email}`}>
                      {(Object.keys(roleLabel) as Role[]).map((role) => <option key={role} value={role}>{roleLabel[role]}</option>)}
                    </select>
                  </td>
                  <td data-label="Trạng thái">
                    <button type="button" className={`admin-toggle${user.active ? " admin-toggle--on" : ""}`} disabled={self || busyId === user.id} onClick={() => void update(user, { active: !user.active })}>
                      {user.active ? "Đang hoạt động" : "Đã khoá"}
                    </button>
                  </td>
                  <td data-label="XP">{stats[user.id]?.xp ?? 0}</td>
                  <td data-label="Chuỗi">{stats[user.id]?.streak ?? 0} ngày</td>
                  <td data-label="Ngày đăng ký">{new Date(user.created_at).toLocaleDateString("vi-VN")}</td>
                  <td><button type="button" className="admin-link" disabled={busyId === user.id} onClick={() => void sendReset(user)}>Gửi thư đặt lại mật khẩu</button></td>
                </tr>
              );
            })}
            {shown.length === 0 && <tr><td colSpan={8} className="admin-empty">Chưa có học viên nào.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
