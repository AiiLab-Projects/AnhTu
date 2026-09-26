import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { lessons } from "@/content/lessons";
import { siteContent } from "@/content/site";

// Mỗi kỹ năng là một nhóm `category` trong lộ trình; thẻ dẫn tới bài đầu tiên của nhóm đó.
const skills = lessons.reduce<{ category: string; icon: string; slug: string; count: number }[]>((list, lesson) => {
  const found = list.find((skill) => skill.category === lesson.category);
  if (found) found.count += 1;
  else list.push({ category: lesson.category, icon: lesson.icon, slug: lesson.slug, count: 1 });
  return list;
}, []);

export default function HomePage() {
  const { features, skills: skillsCopy, cta } = siteContent;

  return (
    <main className="home-page">
      <Hero />

      <section className="home-section" aria-labelledby="features-title">
        <h2 className="section-title" id="features-title"><span aria-hidden="true">✨</span> {features.title}</h2>
        <div className="feature-grid">
          {features.items.map((item) => <FeatureCard key={item.id} {...item} />)}
        </div>
      </section>

      <section className="home-section" aria-labelledby="skills-title">
        <h2 className="section-title" id="skills-title"><span aria-hidden="true">🎯</span> {skillsCopy.title}</h2>
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <Link className={`skill-card skill-card--${index % 13}`} href={`/bai-hoc/${skill.slug}`} key={skill.category}>
              <span className="skill-icon" aria-hidden="true">{skill.icon}</span>
              <span className="skill-name">{skill.category}</span>
              <span className="skill-count">{skill.count} bài</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-banner" aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">{cta.title} <span aria-hidden="true">🚀</span></h2>
          <p>{cta.description}</p>
        </div>
        <Link className="hero-button hero-button--primary cta-button" href="/kiem-tra">{cta.button} →</Link>
      </section>
    </main>
  );
}
