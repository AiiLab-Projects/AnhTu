import Link from "next/link";
import { Icon } from "./Icon";

// 3 chặng học nổi bật — mỗi card dẫn tới một bộ lọc hoặc trang liên quan.
const cards = [
  {
    id: "alphabet", image: "/img/03-alphabet-island-v2.png",
    title: "Làm quen chữ cái",
    description: "Học a, b, c và khám phá những âm đầu tiên thật dễ nhớ.",
    cta: "Khám phá", href: "/bai-hoc?nhom=hoc-van-lop-1",
    tone: "blue",
  },
  {
    id: "tone", image: "/img/04-tone-island-v2.png",
    title: "Dấu thanh và vần",
    description: "Luyện đọc, ghép vần và nhận biết dấu thanh qua từng bài.",
    cta: "Vào học", href: "/bai-hoc?nhom=van-chinh-ta",
    tone: "pink",
  },
  {
    id: "reward", image: "/img/05-reward-island-v2.png",
    title: "Ôn tập và thử thách",
    description: "Học xong rồi thì cùng luyện tập và nhận ngôi sao nhé!",
    cta: "Thử ngay", href: "/kiem-tra",
    tone: "yellow",
  },
] as const;

export function LessonFeatured() {
  return (
    <section className="lesson-featured" aria-labelledby="lesson-featured-title">
      <div className="section-head">
        <div>
          <h2 className="section-title" id="lesson-featured-title">
            <Icon name="compass" size={26} /> Chọn hành trình em muốn khám phá
          </h2>
          <p>Cùng Cô Tú bước vào những vùng đất học tập thật vui nhé!</p>
        </div>
      </div>
      <div className="adventure-grid">
        {cards.map((card) => (
          <Link key={card.id} href={card.href} className={`adventure-card adventure-card--${card.tone}`}>
            <div className="adventure-card-image" aria-hidden="true">
              <img src={card.image} alt="" width={420} height={420} loading="lazy" />
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span className="adventure-card-cta" aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
