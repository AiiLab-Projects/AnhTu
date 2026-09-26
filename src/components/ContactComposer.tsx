"use client";

import { FormEvent, useState } from "react";

export function ContactComposer({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = `Tên: ${name.trim()}\nĐiện thoại/Zalo: ${phone.trim() || "Chưa cung cấp"}\n\nLời nhắn:\n${message.trim()}`;
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Lời nhắn gửi Cô Tú")}&body=${encodeURIComponent(body)}`;
      setStatus("Ứng dụng email đã được mở. Vui lòng kiểm tra và bấm gửi trong ứng dụng email.");
      return;
    }
    try {
      await navigator.clipboard.writeText(body);
      setStatus("Đã sao chép lời nhắn. Em có thể dán vào kênh liên hệ khi Cô Tú cập nhật.");
    } catch {
      setStatus("Không sao chép tự động được. Hãy chọn và sao chép nội dung bên dưới.");
    }
  }

  return (
    <section className="white-panel contact-form-panel" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">📝 Soạn lời nhắn</h2>
      <p>{email ? "Điền lời nhắn, sau đó mở ứng dụng email để gửi." : "Trang hiện chưa có kênh nhận tin. Lời nhắn sẽ được sao chép để bạn lưu lại."}</p>
      <form onSubmit={submit}>
        <label>Tên của em / phụ huynh<input required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="Ví dụ: Chị Lan (mẹ bé Na)" /></label>
        <label>Số điện thoại / Zalo (không bắt buộc)<input inputMode="tel" maxLength={30} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="09xx xxx xxx" /></label>
        <label>Lời nhắn<textarea required maxLength={1000} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Em muốn hỏi về lớp học, thời gian hoặc nội dung bài học..." /></label>
        <button type="submit" className="pill-button">{email ? "Mở email để gửi ✉️" : "Sao chép lời nhắn 📋"}</button>
      </form>
      {status && <div className="contact-status" role="status">{status}</div>}
      {status.startsWith("Không sao chép") && <pre className="message-preview">{`Tên: ${name}\nĐiện thoại/Zalo: ${phone || "Chưa cung cấp"}\n\nLời nhắn:\n${message}`}</pre>}
    </section>
  );
}

