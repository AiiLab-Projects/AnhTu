import { BookOpen, Trophy, Sparkles } from "lucide-react";
import { siteContent } from "@/content/site";
import { Stats } from "./Stats";
import { TeacherAvatar } from "./TeacherAvatar";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section className="hero" id="trang-chu">
      <div className="hero-spark hero-spark--one" aria-hidden="true">✦</div>
      <div className="hero-spark hero-spark--two" aria-hidden="true">✦</div>
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-badge"><Sparkles size={19} strokeWidth={2.8} /> {hero.badge}</div>
          <div className="heading-wrap">
            <span className="balloon" aria-hidden="true">🎈</span>
            <h1>Học <span>Tiếng Việt</span><br />vui như đi chơi!</h1>
          </div>
          <p className="hero-description">
            <strong>{hero.greeting}</strong><br />
            {hero.description}
          </p>
          <div className="hero-actions">
            <a href="#bai-hoc" className="hero-button hero-button--primary">
              <BookOpen aria-hidden="true" size={29} strokeWidth={2.6} />
              {hero.primaryButton}
            </a>
            <a href="#kiem-tra" className="hero-button hero-button--secondary">
              <Trophy aria-hidden="true" size={29} strokeWidth={2.6} />
              {hero.secondaryButton}
            </a>
          </div>
          <Stats />
        </div>

        <div className="hero-visual" id="lop-hoc" aria-label="Cô Tú chào đón các em">
          <div className="visual-halo visual-halo--one" />
          <div className="visual-halo visual-halo--two" />
          <div className="avatar-frame">
            <TeacherAvatar className="avatar-large" />
          </div>
          <div className="floating-icon floating-icon--cat" aria-hidden="true">🐱</div>
          <div className="floating-icon floating-icon--music" aria-hidden="true">🎵</div>
          <div className="floating-icon floating-icon--book" aria-hidden="true">📖</div>
          <div className="floating-icon floating-icon--star" aria-hidden="true">⭐</div>
          <div className="speech-bubble">Chào các em! <span>👋</span></div>
          <span className="visual-dot visual-dot--one" aria-hidden="true" />
          <span className="visual-dot visual-dot--two" aria-hidden="true" />
        </div>
      </div>
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 48C250 135 495 87 726 77c281-12 494-48 714-13v56H0z" fill="#FCF8FF" /></svg>
      </div>
    </section>
  );
}
