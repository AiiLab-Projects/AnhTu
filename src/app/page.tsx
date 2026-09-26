import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { siteContent } from "@/content/site";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="features-section" aria-labelledby="features-title">
        <div className="section-heading">
          <span className="section-kicker">Cùng học thật vui</span>
          <h2 id="features-title"><span aria-hidden="true">✨</span> {siteContent.features.title}</h2>
          <p>Mỗi bài học là một cuộc phiêu lưu nhỏ đầy màu sắc.</p>
        </div>
        <div className="feature-grid">
          {siteContent.features.items.map((item) => <FeatureCard key={item.id} {...item} />)}
        </div>
      </section>
    </main>
  );
}
