import { Icon } from "./Icon";

// Hero nhỏ cho /bai-hoc — card trắng kem, bên trái text, bên phải đảo chữ cái + 2 chip trang trí.
export function LessonHero() {
  return (
    <section className="lesson-hero" aria-labelledby="lesson-hero-title">
      <div className="lesson-hero-copy">
        <span className="page-eyebrow"><Icon name="map" size={14} /> Học từng bước</span>
        <h1 id="lesson-hero-title">Khám phá bài học <span className="text-gradient-soft">tiếng Việt</span></h1>
        <p>36 bài học từ chữ cái đến đọc hiểu, nói và viết. Chọn bài em muốn học nhé!</p>
      </div>
      <div className="lesson-hero-visual" aria-hidden="true">
        <img src="/img/03-alphabet-island-v2.png" alt="" width={520} height={520} />
        <span className="lesson-hero-chip lesson-hero-chip--a"><Icon name="book" size={16} /> A B C</span>
        <span className="lesson-hero-chip lesson-hero-chip--b"><Icon name="music" size={16} /> Dấu thanh</span>
      </div>
    </section>
  );
}
