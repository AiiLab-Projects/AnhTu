"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { configured, loading, profile, signIn, signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const isLogin = mode === "login";

  // Đã đăng nhập thì chuyển về trang phù hợp.
  useEffect(() => {
    if (profile) router.replace(profile.role === "admin" ? "/quan-ly" : "/bai-hoc");
  }, [profile, router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(""); setNotice("");
    if (!isLogin && fullName.trim().length < 2) { setError("Em nhập họ tên của em nhé."); return; }
    if (password.length < 6) { setError("Mật khẩu cần ít nhất 6 ký tự."); return; }
    setBusy(true);
    if (isLogin) {
      const message = await signIn(email.trim(), password);
      if (message) setError(message);
    } else {
      const result = await signUp(fullName.trim(), email.trim(), password);
      if (result.error) setError(result.error);
      else if (result.needsConfirm) setNotice("Cô Tú đã gửi một thư xác nhận tới email của em. Em mở thư và bấm vào đường dẫn để hoàn tất đăng ký nhé!");
    }
    setBusy(false);
  }

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <span className="page-eyebrow">{isLogin ? "Chào mừng em trở lại" : "Học viên mới"}</span>
      <h1 id="auth-title">{isLogin ? "Đăng nhập" : "Đăng ký học viên"}</h1>
      {!configured && !loading && <p className="auth-error" role="alert">Tính năng tài khoản chưa được bật. Cô Tú sẽ sớm hoàn tất!</p>}
      {notice ? <p className="auth-notice" role="status">{notice}</p> : (
        <form onSubmit={submit} noValidate>
          {!isLogin && (
            <label>Họ và tên
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" placeholder="Ví dụ: Nguyễn Bảo An" />
            </label>
          )}
          <label>Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="email của em hoặc ba mẹ" required />
          </label>
          <label>Mật khẩu
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isLogin ? "current-password" : "new-password"} placeholder="ít nhất 6 ký tự" required />
          </label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="pill-button auth-submit" type="submit" disabled={busy || !configured}>{busy ? "Đang xử lý…" : isLogin ? "Đăng nhập" : "Đăng ký"}</button>
        </form>
      )}
      <p className="auth-switch">
        {isLogin ? <>Em chưa có tài khoản? <Link href="/dang-ky">Đăng ký học viên</Link></> : <>Em đã có tài khoản? <Link href="/dang-nhap">Đăng nhập</Link></>}
      </p>
    </section>
  );
}
