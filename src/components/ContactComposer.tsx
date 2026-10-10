"use client";

import { FormEvent, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { applyRipple } from "./effects";
import { showToast } from "@/lib/toast";

type Errors = { name?: string; phone?: string; message?: string; email?: string };

// Dạng số điện thoại Việt Nam cho phép: 09xx xxx xxx, 0xxx xxx xxx (10-11 số),
// hoặc có mã quốc gia +84... Chấp nhận khoảng trắng, dấu gạch, dấu chấm.
function validatePhone(raw: string): boolean {
  if (!raw.trim()) return true; // optional
  const digits = raw.replace(/[^\d+]/g, "");
  // +84 hoặc 0 ở đầu, tổng số ký tự số 9-12
  return /^(?:\+?84|0)\d{8,11}$/.test(digits);
}

export function ContactComposer({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean; message?: boolean }>({});

  const errors = useMemo<Errors>(() => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Vui lòng cho Cô biết tên nhé.";
    if (!validatePhone(phone)) next.phone = "Số điện thoại chưa đúng — ví dụ 0912 345 678 hoặc +84 912 345 678.";
    if (!message.trim()) next.message = "Em viết vài câu lời nhắn giúp Cô.";
    else if (message.trim().length < 10) next.message = "Lời nhắn hơi ngắn, em viết thêm chút nữa nhé.";
    if (!email) next.email = "Cô Tú chưa cập nhật email nhận lời nhắn.";
    return next;
  }, [name, phone, message, email]);

  const hasErrors = Object.keys(errors).length > 0;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, phone: true, message: true });
    if (hasErrors) {
      if (errors.email) setStatus({ kind: "error", text: errors.email });
      return;
    }
    const body = `Tên: ${name.trim()}\nĐiện thoại/Zalo: ${phone.trim() || "Chưa cung cấp"}\n\nLời nhắn:\n${message.trim()}`;
    // Không claim "đã gửi" — chỉ mở ứng dụng email, user phải tự bấm gửi.
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Lời nhắn gửi Cô Tú")}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "ok", text: "Ứng dụng email đã mở — vui lòng kiểm tra nội dung và bấm Gửi trong ứng dụng email của bạn." });
    showToast({ icon: "mail", title: "Đã mở ứng dụng email", description: "Hãy bấm Gửi trong ứng dụng để hoàn tất.", tone: "info", duration: 3200 });
  }

  return (
    <section className="white-panel contact-form-panel" aria-labelledby="contact-form-title">
      <header className="contact-form-head">
        <span className="contact-form-head-icon"><Icon name="chat" size={22} /></span>
        <div>
          <h2 id="contact-form-title">Soạn lời nhắn</h2>
          <p>{email ? "Điền thông tin và gửi lời nhắn cho Cô qua ứng dụng email." : "Cô Tú chưa cập nhật email nhận lời nhắn. Bạn có thể soạn trước và gửi khi kênh liên hệ sẵn sàng."}</p>
        </div>
      </header>
      <form onSubmit={submit} noValidate>
        <label className="contact-field">
          <span className="contact-field-label">Tên của em / phụ huynh</span>
          <input
            required
            maxLength={80}
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => setTouched((state) => ({ ...state, name: true }))}
            placeholder="Ví dụ: Chị Lan (mẹ bé Na)"
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={touched.name && errors.name ? "err-name" : undefined}
          />
          {touched.name && errors.name && <small id="err-name" className="contact-field-error"><Icon name="warning" size={14} /> {errors.name}</small>}
        </label>

        <label className="contact-field">
          <span className="contact-field-label">Số điện thoại / Zalo <em>(không bắt buộc)</em></span>
          <input
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            onBlur={() => setTouched((state) => ({ ...state, phone: true }))}
            placeholder="0912 345 678"
            aria-invalid={touched.phone && Boolean(errors.phone)}
            aria-describedby={touched.phone && errors.phone ? "err-phone" : undefined}
          />
          {touched.phone && errors.phone && <small id="err-phone" className="contact-field-error"><Icon name="warning" size={14} /> {errors.phone}</small>}
        </label>

        <label className="contact-field">
          <span className="contact-field-label">Lời nhắn</span>
          <textarea
            required
            maxLength={1000}
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onBlur={() => setTouched((state) => ({ ...state, message: true }))}
            placeholder="Ví dụ: Chị muốn hỏi về lộ trình bài học cho bé lớp 2, bé đã học ở nhà được 1 tháng..."
            aria-invalid={touched.message && Boolean(errors.message)}
            aria-describedby={touched.message && errors.message ? "err-message" : undefined}
          />
          {touched.message && errors.message && <small id="err-message" className="contact-field-error"><Icon name="warning" size={14} /> {errors.message}</small>}
        </label>

        <button type="submit" className="pill-button contact-submit" disabled={!email} onPointerDown={applyRipple}>
          <Icon name="mail" size={18} /> Mở ứng dụng email
        </button>
      </form>
      {status && (
        <div className={status.kind === "ok" ? "contact-status" : "contact-status contact-status--error"} role="status">
          <Icon name={status.kind === "ok" ? "info" : "warning"} size={18} />
          <span>{status.text}</span>
        </div>
      )}
    </section>
  );
}
