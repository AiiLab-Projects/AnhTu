import { siteContent } from "@/content/site";
import { Stats } from "./Stats";
import { TeacherAvatar } from "./TeacherAvatar";

export function Hero() {
  const { hero, brand } = siteContent;
  const [greetingHead, ...greetingTail] = hero.greeting.split(brand.name);

  return (
    <section className="hero" id="trang-chu">
      <div className="hero-copy">
        <div className="hero-badge"><span aria-hidden="true">🌟</span> {hero.badge}</div>
        <h1>
          Học <span className="text-gradient">Tiếng Việt</span><br />
          cùng Cô Tú! <span className="balloon" aria-hidden="true">🎈</span>
        </h1>
        <p className="hero-description">
          {greetingHead}{greetingTail.length > 0 && <b>{brand.name}</b>}{greetingTail.join(brand.name)}{" "}
          {hero.description}
        </p>
        <div className="hero-actions">
          <a href="/bai-hoc" className="hero-button hero-button--primary">
            <span className="hero-button-icon" aria-hidden="true">📚</span>
            {hero.primaryButton}
          </a>
          <a href="/kiem-tra" className="hero-button hero-button--secondary">
            <span className="hero-button-icon" aria-hidden="true">🏆</span>
            {hero.secondaryButton}
          </a>
        </div>
        <Stats />
      </div>

      <div className="hero-visual" aria-label="Cô Tú chào đón các em">
        <div className="floating-icon floating-icon--cat" aria-hidden="true">🐱</div>
        <div className="floating-icon floating-icon--music" aria-hidden="true">🎵</div>
        <div className="floating-icon floating-icon--book" aria-hidden="true">📖</div>
        <div className="floating-icon floating-icon--star" aria-hidden="true">⭐</div>
        <div className="avatar-frame">
          <TeacherAvatar className="avatar-large" />
        </div>
        <div className="speech-bubble">Chào các em! <span>👋</span></div>
      </div>
    </section>
  );
}
