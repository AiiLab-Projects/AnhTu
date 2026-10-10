import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { HomeMissions } from "@/components/HomeMissions";
import { AdventureJourney } from "@/components/AdventureJourney";
import { Icon } from "@/components/Icon";
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

  // Hero và mission-panel đặt ngoài .home-page để chiếm chiều ngang riêng (hero full-width,
  // panel 1240 — rộng hơn page-width 1080) mà không cần dùng 100vw (nguồn scroll ngang).
  return (
    <>
      <Hero />
      <HomeMissions />
      <main className="home-page">
        <AdventureJourney />

        <section className="home-section" aria-labelledby="features-title">
          <h2 className="section-title" id="features-title"><Icon name="sparkles" size={26} /> {features.title}</h2>
          <div className="feature-grid">
            {features.items.map((item) => <FeatureCard key={item.id} {...item} />)}
          </div>
        </section>

        <section className="home-section" aria-labelledby="skills-title">
          <h2 className="section-title" id="skills-title"><Icon name="palette" size={26} /> {skillsCopy.title}</h2>
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
            <h2 id="cta-title"><Icon name="rocket" size={24} /> {cta.title}</h2>
            <p>{cta.description}</p>
          </div>
          <Link className="hero-button hero-button--primary cta-button" href="/kiem-tra">{cta.button} <Icon name="arrow-right" size={18} /></Link>
        </section>
      </main>
    </>
  );
}
