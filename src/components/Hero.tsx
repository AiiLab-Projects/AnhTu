import { siteContent } from "@/content/site";
import { Stats } from "./Stats";
import { Icon } from "./Icon";

// Hero v2 — các lớp từ dưới lên:
//   1. hero-bg (ảnh landscape, cover)
//   2. hero-overlay (gradient sáng nhẹ bên trái để chữ dễ đọc, không phủ trắng toàn hero)
//   3. hero-grid (HTML thật) — cột trái copy, cột phải nhân vật + mèo + floating labels
export function Hero() {
  const { hero, brand } = siteContent;
  const strippedGreeting = hero.greeting.replace(/\s*👋\s*$/u, "");
  const [greetingHead, ...greetingTail] = strippedGreeting.split(brand.name);

  return (
    <section className="hero hero--landscape" id="trang-chu" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge"><Icon name="sparkles" size={16} /> {hero.badge}</div>
          <h1 id="hero-title">
            Học <span className="text-gradient">Tiếng Việt</span><br />
            cùng Cô Tú!
          </h1>
          <p className="hero-description">
            {greetingHead}
            {greetingTail.length > 0 && <b>{brand.name}</b>}
            {greetingTail.join(brand.name)}
            {" "}
            {hero.description}
          </p>
          <div className="hero-actions">
            <a href="/bai-hoc" className="hero-button hero-button--primary">
              <Icon name="book" size={20} />
              {hero.primaryButton}
            </a>
            <a href="/kiem-tra" className="hero-button hero-button--secondary">
              <Icon name="trophy" size={20} />
              {hero.secondaryButton}
            </a>
          </div>
          <Stats />
        </div>

        <div className="hero-stage" aria-hidden="true">
          <div className="hero-character">
            <img src="/img/01-co-tu-character-v2.webp" alt="" width={520} height={693} loading="eager" decoding="async" fetchPriority="high" />
          </div>
          <div className="hero-cat">
            <img src="/img/02-cat-mascot-v2.webp" alt="" width={260} height={260} loading="eager" decoding="async" />
          </div>
          <div className="hero-sparkle hero-sparkle--a"><Icon name="star" size={18} fill="currentColor" /></div>
          <div className="hero-sparkle hero-sparkle--b"><Icon name="sparkles" size={18} /></div>
        </div>
      </div>
    </section>
  );
}
