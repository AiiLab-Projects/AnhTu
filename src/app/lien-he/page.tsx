import type { Metadata } from "next";
import { ContactComposer } from "@/components/ContactComposer";
import { siteContent } from "@/content/site";

export const metadata: Metadata = { title: "Liên hệ | Cô Tú", description: "Chuẩn bị lời nhắn gửi đến Cô Tú." };

export default function ContactPage() {
  const contact = siteContent.contact;
  const hasContact = Boolean(contact.phone || contact.email || contact.facebook || contact.hours);
  return (
    <main className="inner-page">
      <div className="page-container contact-container">
        <div className="page-intro"><span className="page-eyebrow">✉️ Kết nối cùng Cô Tú</span><h1>✉️ Liên hệ với Cô Tú</h1><p>Phụ huynh có thể soạn lời nhắn gửi Cô Tú qua email khi kênh liên hệ được cập nhật.</p></div>
        <div className="contact-grid">
          <section className="white-panel contact-info"><h2>📍 Thông tin liên hệ</h2><p>Thông tin của Cô Tú sẽ được hiển thị tại đây khi có.</p>
            {hasContact ? <div className="contact-list">
              {contact.phone && <div><span>📞 Điện thoại / Zalo</span><strong>{contact.phone}</strong></div>}
              {contact.email && <div><span>✉️ Email</span><strong>{contact.email}</strong></div>}
              {contact.facebook && <div><span>📱 Facebook</span><strong>{contact.facebook}</strong></div>}
              {contact.hours && <div><span>⏰ Giờ dạy</span><strong>{contact.hours}</strong></div>}
            </div> : <div className="contact-empty"><span>💌</span><strong>Chưa có kênh liên hệ công khai</strong><p>Cô Tú sẽ cập nhật số điện thoại, email hoặc mạng xã hội sau.</p></div>}
          </section>
          <ContactComposer email={contact.email} />
        </div>
      </div>
    </main>
  );
}
