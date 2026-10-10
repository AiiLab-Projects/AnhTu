import Link from "next/link";
import { Icon } from "./Icon";

type Island = {
  id: string;
  image: string;
  title: string;
  description: string;
  href: string;
  tone: "blue" | "pink" | "yellow";
};

const islands: Island[] = [
  {
    id: "alphabet",
    image: "/img/03-alphabet-island-v2.png",
    title: "Khám phá chữ cái",
    description: "Học chữ, ghép vần và khám phá từng bài thật dễ nhớ.",
    href: "/bai-hoc?lop=1",
    tone: "blue",
  },
  {
    id: "tone",
    image: "/img/04-tone-island-v2.png",
    title: "Săn tìm dấu thanh",
    description: "Luyện đọc, nghe và nhận biết các dấu thanh.",
    href: "/bai-hoc",
    tone: "pink",
  },
  {
    id: "reward",
    image: "/img/05-reward-island-v2.png",
    title: "Vượt thử thách nhận huy hiệu",
    description: "Làm bài tập, kiểm tra và thu thập huy hiệu.",
    href: "/kiem-tra",
    tone: "yellow",
  },
];

export function AdventureJourney() {
  return (
    <section className="home-section adventure-section" aria-labelledby="adventure-title">
      <div className="section-head">
        <div>
          <h2 className="section-title" id="adventure-title">
            <Icon name="compass" size={26} /> Chuyến phiêu lưu tiếng Việt
          </h2>
          <p>Cùng Cô Tú khám phá những vùng đất tri thức thú vị nào!</p>
        </div>
      </div>
      <div className="adventure-grid">
        {islands.map((island) => (
          <Link key={island.id} href={island.href} className={`adventure-card adventure-card--${island.tone}`}>
            <div className="adventure-card-image" aria-hidden="true">
              <img src={island.image} alt="" width={420} height={420} loading="lazy" />
            </div>
            <h3>{island.title}</h3>
            <p>{island.description}</p>
            <span className="adventure-card-cta" aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
