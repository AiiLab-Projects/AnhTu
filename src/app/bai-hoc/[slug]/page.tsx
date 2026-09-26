import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lessons } from "@/content/lessons";
import { LessonCheck } from "@/components/LessonCheck";
import { SpeakButton } from "@/components/SpeakButton";

export function generateStaticParams() { return lessons.map((lesson) => ({ slug: lesson.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessons.find((item) => item.slug === slug);
  return { title: lesson ? `${lesson.title} | Cô Tú` : "Bài học | Cô Tú", description: lesson?.summary };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((item) => item.slug === slug);
  if (!lesson) notFound();
  const next = lessons.find((item) => item.number === lesson.number + 1);

  return (
    <main className="inner-page">
      <div className="page-container lesson-detail-container">
        <nav className="breadcrumb" aria-label="Đường dẫn"><Link href="/bai-hoc">← Tất cả bài học</Link><span>/</span><span>Bài {lesson.number}</span></nav>
        <article className="lesson-detail-card">
          <div className="lesson-detail-head">
            <span className={`lesson-card-icon lesson-card--${lesson.tone}`} aria-hidden="true">{lesson.icon}</span>
            <div><span className="page-eyebrow">Bài {lesson.number} · {lesson.category}</span><h1>{lesson.title}</h1><p>{lesson.intro}</p></div>
          </div>
          <SpeakButton text={`${lesson.title}. ${lesson.intro}`} label="🔊 Nghe Cô Tú đọc" />
          <div className="lesson-point-grid">
            {lesson.points.map((point, index) => (
              <section className="lesson-point" key={point.title}>
                <span className="lesson-point-number">0{index + 1}</span>
                <h2>{point.title}</h2>
                <p>{point.body}</p>
                <div className="lesson-example">{point.example}</div>
                <SpeakButton text={point.example} label="🔊 Nghe ví dụ" />
              </section>
            ))}
          </div>
        </article>
        <LessonCheck slug={lesson.slug} {...lesson.check} />
        <div className="lesson-nav"><Link href="/bai-hoc">← Danh sách bài học</Link>{next ? <Link href={`/bai-hoc/${next.slug}`}>Bài tiếp theo →</Link> : <Link href="/bai-tap">Đến bài tập →</Link>}</div>
      </div>
    </main>
  );
}
