"use client";

import { FormEvent, useMemo, useState } from "react";
import { Icon } from "./Icon";

type Errors = { name?: string; message?: string; email?: string };

export function ContactComposer({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [touched, setTouched] = useState<{ name?: boolean; message?: boolean }>({});

  const errors = useMemo<Errors>(() => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Vui lòng cho Cô biết tên nhé.";
    if (!message.trim()) next.message = "Em viết vài câu lời nhắn giúp Cô.";
    else if (message.trim().length < 10) next.message = "Lời nhắn ngắn quá, em viết thêm chút nữa nhé.";
    if (!email) next.email = "Cô Tú chưa cập nhật email nhận lời nhắn.";
    return next;
  }, [name, message, email]);

  const hasErrors = Object.keys(errors).length > 0;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, message: true });
    if (hasErrors) {
      if (errors.email) setStatus({ kind: "error", text: errors.email });
      return;
    }
    const body = `Tên: ${name.trim()}\nĐiện thoại/Zalo: ${phone.trim() || "Chưa cung cấp"}\n\nLời nhắn:\n${message.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Lời nhắn gửi Cô Tú")}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "ok", text: "Ứng dụng email đã được mở. Vui lòng kiểm tra và bấm gửi trong ứng dụng email." });
  }

  return (
    <section className="white-panel contact-form-panel" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title"><Icon name="chat" size={22} /> Soạn lời nhắn</h2>
      <p>{email ? "Điền lời nhắn, sau đó gửi qua ứng dụng email của bạn." : "Cô Tú chưa cập nhật email nhận lời nhắn. Bạn có thể soạn trước và gửi khi kênh liên hệ sẵn sàng."}</p>
      <form onSubmit={submit} noValidate>
        <label>
          Tên của em / phụ huynh
          <input
            required
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => setTouched((state) => ({ ...state, name: true }))}
            placeholder="Ví dụ: Chị Lan (mẹ bé Na)"
            aria-invalid={touched.name && Boolean(errors.name)}
          />
          {touched.name && errors.name && <small style={{ color: "var(--accent-strong)", fontWeight: 700 }}>{errors.name}</small>}
        </label>
        <label>
          Số điện thoại / Zalo (không bắt buộc)
          <input
            inputMode="tel"
            maxLength={30}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="09xx xxx xxx"
          />
        </label>
        <label>
          Lời nhắn
          <textarea
            required
            maxLength={1000}
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onBlur={() => setTouched((state) => ({ ...state, message: true }))}
            placeholder="Em muốn hỏi về lớp học, thời gian hoặc nội dung bài học..."
            aria-invalid={touched.message && Boolean(errors.message)}
          />
          {touched.message && errors.message && <small style={{ color: "var(--accent-strong)", fontWeight: 700 }}>{errors.message}</small>}
        </label>
        <button type="submit" className="pill-button" disabled={!email}><Icon name="mail" size={16} /> Gửi lời nhắn</button>
      </form>
      {status && (
        <div className={status.kind === "ok" ? "contact-status" : "contact-status contact-status--error"} role="status">
          <Icon name={status.kind === "ok" ? "check-circle" : "warning"} size={18} />
          <span>{status.text}</span>
        </div>
      )}
    </section>
  );
}
