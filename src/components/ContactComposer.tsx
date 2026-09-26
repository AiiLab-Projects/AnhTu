"use client";

import { FormEvent, useState } from "react";

export function ContactComposer({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) {
      setStatus("Cô Tú chưa cập nhật email nhận lời nhắn. Vui lòng thử lại sau.");
      return;
    }
    const body = `Tên: ${name.trim()}\nĐiện thoại/Zalo: ${phone.trim() || "Chưa cung cấp"}\n\nLời nhắn:\n${message.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Lời nhắn gửi Cô Tú")}&body=${encodeURIComponent(body)}`;
    setStatus("Ứng dụng email đã được mở. Vui lòng kiểm tra và bấm gửi trong ứng dụng email.");
  }

  return (
    <section className="white-panel contact-form-panel" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">📝 Soạn lời nhắn</h2>
      <p>{email ? "Điền lời nhắn, sau đó gửi qua ứng dụng email của bạn." : "Cô Tú chưa cập nhật email nhận lời nhắn. Bạn có thể soạn trước và gửi khi kênh liên hệ sẵn sàng."}</p>
      <form onSubmit={submit}>
        <label>Tên của em / phụ huynh<input required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="Ví dụ: Chị Lan (mẹ bé Na)" /></label>
        <label>Số điện thoại / Zalo (không bắt buộc)<input inputMode="tel" maxLength={30} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="09xx xxx xxx" /></label>
        <label>Lời nhắn<textarea required maxLength={1000} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Em muốn hỏi về lớp học, thời gian hoặc nội dung bài học..." /></label>
        <button type="submit" className="pill-button" disabled={!email}>Gửi ✉️</button>
      </form>
      {status && <div className="contact-status" role="status">{status}</div>}
    </section>
  );
}

