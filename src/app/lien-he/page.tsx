import type { Metadata } from "next";
import { ContactComposer } from "@/components/ContactComposer";
import { ContactChannelList } from "@/components/ContactChannelList";
import { Icon, type IconName } from "@/components/Icon";
import { siteContent } from "@/content/site";

export const metadata: Metadata = { title: "Liên hệ | Cô Tú", description: "Liên hệ Cô Nguyễn Anh Tú qua điện thoại, Zalo hoặc Gmail." };

type SupportTopic = { id: string; icon: IconName; title: string; description: string; tone: "purple" | "pink" | "mint" };

const SUPPORT_TOPICS: SupportTopic[] = [
  { id: "lesson",    icon: "book",      title: "Tư vấn bài học",             description: "Chọn lộ trình phù hợp với con, giải thích thêm về bài khó.", tone: "purple" },
  { id: "home",      icon: "lightbulb", title: "Hướng dẫn luyện tập tại nhà", description: "Gợi ý cách tổ chức giờ học mỗi ngày và kết hợp bài tập.",     tone: "mint" },
  { id: "qa",        icon: "chat",      title: "Giải đáp thắc mắc",           description: "Chia sẻ chi tiết về nội dung bài học, bài tập và kiểm tra.",   tone: "pink" },
];

export default function ContactPage() {
  const contact = siteContent.contact;
  const hasContact = Boolean(contact.phone || contact.email);

  return (
    <main className="inner-page contact-page">
      <div className="page-container contact-container">
        {/* Compact hero 2-col */}
        <section className="contact-hero" aria-labelledby="contact-hero-title">
          <div className="contact-hero-copy">
            <span className="page-eyebrow"><Icon name="mail" size={14} /> Kết nối cùng Cô Tú</span>
            <h1 id="contact-hero-title">Liên hệ với <span className="text-gradient-soft">Cô Tú</span></h1>
            <p>Ba mẹ có câu hỏi về bài học hoặc muốn trao đổi cùng Cô? Hãy chọn cách liên hệ thuận tiện nhất nhé!</p>
            <p className="contact-hero-note"><Icon name="heart" size={14} /> Cô luôn vui khi được lắng nghe ba mẹ và các em.</p>
          </div>
          <div className="contact-hero-visual" aria-hidden="true">
            <div className="contact-hero-bubble">Chào ba mẹ! Nhắn cho Cô nhé.</div>
            <img src="/img/09-co-tu-avatar-v2.webp" alt="" width={280} height={280} decoding="async" loading="eager" />
            <span className="contact-hero-spark contact-hero-spark--a"><Icon name="star" size={16} fill="currentColor" /></span>
            <span className="contact-hero-spark contact-hero-spark--b"><Icon name="sparkles" size={16} /></span>
          </div>
        </section>

        {/* 2-col: info card + form */}
        <div className="contact-grid">
          {hasContact ? (
            <ContactChannelList name={contact.name} phone={contact.phone} email={contact.email} />
          ) : (
            <section className="white-panel contact-info-card">
              <div className="contact-empty">
                <Icon name="mail" size={44} />
                <strong>Chưa có kênh liên hệ công khai</strong>
                <p>Cô Tú sẽ cập nhật số điện thoại, email hoặc mạng xã hội sau.</p>
              </div>
            </section>
          )}
          <ContactComposer email={contact.email} />
        </div>

        {/* Support topics */}
        <section className="contact-support" aria-labelledby="contact-support-title">
          <header className="contact-support-head">
            <h2 className="section-title" id="contact-support-title">
              <Icon name="lightbulb" size={24} /> Cô Tú có thể hỗ trợ gì?
            </h2>
            <p>Ba mẹ có thể nhắn cho Cô Tú về các chủ đề thường gặp dưới đây.</p>
          </header>
          <div className="contact-support-grid">
            {SUPPORT_TOPICS.map((topic) => (
              <article key={topic.id} className={`contact-support-card contact-support-card--${topic.tone}`}>
                <span className="contact-support-icon"><Icon name={topic.icon} size={22} /></span>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
