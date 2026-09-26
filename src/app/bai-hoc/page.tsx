import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "@/content/lessons";

export const metadata: Metadata = { title: "Bài học | Cô Tú", description: "Sáu bài học tiếng Việt đầu tiên cùng Cô Tú." };

export default function LessonsPage() {
  return (
    <main className="inner-page">
      <div className="page-container">
        <div className="page-intro">
          <span className="page-eyebrow">📚 Học từng bước</span>
          <h1>📚 Bài học</h1>
          <p>Chọn một chủ đề để bắt đầu — bấm vào thẻ để xem nội dung nha!</p>
        </div>
        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <Link href={`/bai-hoc/${lesson.slug}`} key={lesson.slug} className={`lesson-card lesson-card--${lesson.tone}`}>
              <span className="lesson-card-icon" aria-hidden="true">{lesson.icon}</span>
              <span className="lesson-card-category">Bài {lesson.number} · {lesson.category}</span>
              <h2>{lesson.title}</h2>
              <p>{lesson.summary}</p>
              <span className="pill-button lesson-card-link">Xem bài học <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <div className="next-step"><span>✏️</span><p>Học xong rồi? Thử ghép chữ thành từ nào!</p><Link href="/bai-tap">Đến bài tập →</Link></div>
      </div>
    </main>
  );
}
