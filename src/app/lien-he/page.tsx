import type { Metadata } from "next";
import { ContactComposer } from "@/components/ContactComposer";
import { Icon } from "@/components/Icon";
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
        <div className="page-intro">
          <span className="page-eyebrow"><Icon name="mail" size={14} /> Kết nối cùng Cô Tú</span>
          <h1>Liên hệ với Cô Tú</h1>
          <p>Phụ huynh có thể gọi điện, nhắn Zalo hoặc gửi email cho Cô.</p>
        </div>
        <div className="contact-grid">
          <section className="white-panel contact-info">
            <h2><Icon name="pin" size={22} /> Thông tin liên hệ</h2>
            <p>Chọn kênh liên hệ thuận tiện cho bạn.</p>
            {hasContact ? (
              <div className="contact-list">
                <div>
                  <span className="contact-list-icon"><Icon name="user" size={20} /></span>
                  <span className="contact-list-text"><span>Người liên hệ</span><strong>Cô: {contact.name}</strong></span>
                </div>
                {contact.phone && (
                  <div>
                    <span className="contact-list-icon"><Icon name="phone" size={20} /></span>
                    <span className="contact-list-text"><span>Điện thoại</span><strong><a href={`tel:${contact.phone}`}>{contact.phone}</a></strong></span>
                  </div>
                )}
                {contact.phone && (
                  <div>
                    <span className="contact-list-icon"><Icon name="chat" size={20} /></span>
                    <span className="contact-list-text"><span>Zalo</span><strong><a href={zaloUrl} target="_blank" rel="noopener noreferrer">Nhắn Zalo: {contact.phone}</a></strong></span>
                  </div>
                )}
                {contact.email && (
                  <div>
                    <span className="contact-list-icon"><Icon name="mail" size={20} /></span>
                    <span className="contact-list-text"><span>Gmail</span><strong><a href={gmailUrl} target="_blank" rel="noopener noreferrer">{contact.email}</a></strong></span>
                  </div>
                )}
                {contact.hours && (
                  <div>
                    <span className="contact-list-icon"><Icon name="clock" size={20} /></span>
                    <span className="contact-list-text"><span>Giờ dạy</span><strong>{contact.hours}</strong></span>
                  </div>
                )}
              </div>
            ) : (
              <div className="contact-empty">
                <Icon name="mail" size={44} />
                <strong>Chưa có kênh liên hệ công khai</strong>
                <p>Cô Tú sẽ cập nhật số điện thoại, email hoặc mạng xã hội sau.</p>
              </div>
            )}
          </section>
          <ContactComposer email={contact.email} />
        </div>
      </div>
    </main>
  );
}
