import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lessonIntroSpeech, lessons, type Lesson } from "@/content/lessons";
import { LessonCheck } from "@/components/LessonCheck";
import { SpeakButton } from "@/components/SpeakButton";
import { LetterCard } from "@/components/LetterCard";
import { PictureWords } from "@/components/PictureWords";
import { StoryBoard } from "@/components/StoryBoard";
import { PictureGame } from "@/components/PictureGame";
import { FindLetterGame } from "@/components/FindLetterGame";
import { WritingGuide } from "@/components/WritingGuide";
import { OpenOnHash } from "@/components/OpenOnHash";
import { Icon } from "@/components/Icon";

// Mỗi thẻ ý chính lấy một màu, bắt đầu từ màu của bài rồi xoay vòng bảng tone.
const tones: Lesson["tone"][] = ["blue", "purple", "pink", "orange", "green", "yellow"];
const pointTone = (tone: Lesson["tone"], index: number) => tones[(tones.indexOf(tone) + index) % tones.length];

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
  const prev = lessons.find((item) => item.number === lesson.number - 1);
  // Lộ trình của bài: chỉ liệt kê các phần bài này thật sự có, bấm để cuộn tới phần đó.
  const steps = [
    lesson.letterCard && { id: "tap-viet", icon: "✏️", label: "Tập viết" },
    lesson.pictureWords && { id: "the-tranh", icon: "🖼️", label: "Thẻ tranh" },
    { id: "y-chinh", icon: "💡", label: "Ý chính" },
    (lesson.story || lesson.moreStories) && { id: "truyen-tranh", icon: "📖", label: "Truyện tranh" },
    lesson.writing && { id: "viet-vo", icon: "📝", label: "Viết vở" },
    (lesson.game || lesson.findLetter) && { id: "tro-choi", icon: "🎮", label: "Trò chơi" },
    { id: "thu-tai", icon: "⭐", label: "Thử tài" },
  ].filter((step): step is { id: string; icon: string; label: string } => Boolean(step));

  return (
    <main className="inner-page">
      <OpenOnHash />
      <div className="page-container lesson-detail-container">
        <nav className="breadcrumb" aria-label="Đường dẫn">
          <Link href="/bai-hoc"><Icon name="arrow-left" size={14} /> Tất cả bài học</Link>
          <span>/</span>
          <span>Bài {lesson.number}</span>
        </nav>
        <article className={`lesson-detail-card lesson-detail-card--vivid lesson-card--${lesson.tone}`}>
          <header className="lesson-hero-panel">
            <span className="lesson-hero-num" aria-hidden="true">{lesson.number}</span>
            <div className="lesson-detail-head">
              <span className={`lesson-card-icon lesson-card--${lesson.tone}`} aria-hidden="true">{lesson.icon}</span>
              <div><span className="page-eyebrow">Bài {lesson.number} · {lesson.category}</span><h1>{lesson.title}</h1><p>{lesson.intro}</p></div>
            </div>
            <div className="lesson-listen-main"><SpeakButton text={lessonIntroSpeech(lesson)} label="Nghe Cô Tú đọc" /></div>
            <nav className="lesson-steps" aria-label="Các phần của bài">
              {steps.map((step, index) => (
                <a key={step.id} href={`#${step.id}`} className="lesson-step">
                  <span className="lesson-step-index">{index + 1}</span>
                  <span aria-hidden="true">{step.icon}</span> {step.label}
                </a>
              ))}
            </nav>
          </header>
          {lesson.letterCard && <div id="tap-viet"><LetterCard data={lesson.letterCard} /></div>}
          {lesson.pictureWords && <div id="the-tranh"><PictureWords data={lesson.pictureWords} /></div>}
          <div className="lesson-section-head" id="y-chinh">
            <span className="eyebrow">Ý chính</span>
            <h2>Em cần nhớ gì trong bài?</h2>
          </div>
          <div className="lesson-point-grid">
            {lesson.points.map((point, index) => (
              <section className={`lesson-point lesson-card--${pointTone(lesson.tone, index)}`} key={point.title}>
                <span className="lesson-point-number">0{index + 1}</span>
                <h2>{point.title}</h2>
                <p>{point.body}</p>
                <div className="lesson-example"><span className="lesson-example-label">Ví dụ</span>{point.example}</div>
                <SpeakButton text={point.example} label="Nghe ví dụ" />
              </section>
            ))}
          </div>
          {lesson.story && <div id="truyen-tranh"><StoryBoard data={lesson.story} /></div>}
          {lesson.moreStories?.map((story, index) => (
            <details className="lesson-fold" key={story.title}>
              <summary><span aria-hidden="true">📖</span> Truyện thứ hai: {story.title}</summary>
              <StoryBoard data={story} idSuffix={`-more-${index}`} />
            </details>
          ))}
          {lesson.writing && (
            <details className="lesson-fold" id="viet-vo">
              <summary><span aria-hidden="true">📝</span> {lesson.writing.title}</summary>
              <WritingGuide data={lesson.writing} />
            </details>
          )}
          {(lesson.game || lesson.findLetter) && (
            <div id="tro-choi">
              {lesson.game && <PictureGame data={lesson.game} />}
              {lesson.findLetter && <FindLetterGame data={lesson.findLetter} />}
            </div>
          )}
        </article>
        <div id="thu-tai" className={`lesson-card--${lesson.tone}`}><LessonCheck slug={lesson.slug} {...lesson.check} /></div>
        <nav className="lesson-nav lesson-nav--cards" aria-label="Chuyển bài">
          {prev
            ? <Link className={`lesson-nav-card lesson-card--${prev.tone}`} href={`/bai-hoc/${prev.slug}`}><span className="lesson-nav-icon" aria-hidden="true">{prev.icon}</span><span className="lesson-nav-text"><small><Icon name="arrow-left" size={14} /> Bài trước</small><strong>{prev.title}</strong></span></Link>
            : <Link className="lesson-nav-card lesson-card--purple" href="/bai-hoc"><span className="lesson-nav-icon" aria-hidden="true">📚</span><span className="lesson-nav-text"><small><Icon name="arrow-left" size={14} /> Quay lại</small><strong>Danh sách bài học</strong></span></Link>}
          {next
            ? <Link className={`lesson-nav-card lesson-nav-card--next lesson-card--${next.tone}`} href={`/bai-hoc/${next.slug}`}><span className="lesson-nav-text"><small>Bài tiếp theo <Icon name="arrow-right" size={14} /></small><strong>Bài {next.number} · {next.title}</strong></span><span className="lesson-nav-icon" aria-hidden="true">{next.icon}</span></Link>
            : <Link className="lesson-nav-card lesson-nav-card--next lesson-card--orange" href="/bai-tap"><span className="lesson-nav-text"><small>Học xong rồi <Icon name="arrow-right" size={14} /></small><strong>Đến bài tập</strong></span><span className="lesson-nav-icon" aria-hidden="true">🧩</span></Link>}
        </nav>
      </div>
    </main>
  );
}
