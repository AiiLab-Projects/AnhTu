import type { Metadata } from "next";
import { ContactComposer } from "@/components/ContactComposer";
import { siteContent } from "@/content/site";

export const metadata: Metadata = { title: "Liên hệ | Cô Tú", description: "Liên hệ Cô Nguyễn Anh Tú qua điện thoại, Zalo hoặc Gmail." };

export default function ContactPage() {
  const contact = siteContent.contact;
  const hasContact = Boolean(contact.phone || contact.email || contact.hours);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;
  const zaloUrl = `https://zalo.me/${contact.phone}`;
  return (
    <main className="inner-page">
      <div className="page-container contact-container">
        <div className="page-intro"><span className="page-eyebrow">✉️ Kết nối cùng Cô Tú</span><h1>✉️ Liên hệ với Cô Tú</h1><p>Phụ huynh có thể gọi điện, nhắn Zalo hoặc gửi email cho Cô.</p></div>
        <div className="contact-grid">
          <section className="white-panel contact-info"><h2>📍 Thông tin liên hệ</h2><p>Chọn kênh liên hệ thuận tiện cho bạn.</p>
            {hasContact ? <div className="contact-list">
              <div><span>👩‍🏫 Người liên hệ</span><strong>Cô: {contact.name}</strong></div>
              {contact.phone && <div><span>📞 Điện thoại</span><strong><a href={`tel:${contact.phone}`}>{contact.phone}</a></strong></div>}
              {contact.phone && <div><span>💬 Zalo</span><strong><a href={zaloUrl} target="_blank" rel="noopener noreferrer">Nhắn Zalo: {contact.phone} ↗</a></strong></div>}
              {contact.email && <div><span>✉️ Gmail</span><strong><a href={gmailUrl} target="_blank" rel="noopener noreferrer">{contact.email} ↗</a></strong></div>}
              {contact.hours && <div><span>⏰ Giờ dạy</span><strong>{contact.hours}</strong></div>}
            </div> : <div className="contact-empty"><span>💌</span><strong>Chưa có kênh liên hệ công khai</strong><p>Cô Tú sẽ cập nhật số điện thoại, email hoặc mạng xã hội sau.</p></div>}
          </section>
          <ContactComposer email={contact.email} />
        </div>
      </div>
    </main>
  );
}
