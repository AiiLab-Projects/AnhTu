import type { Metadata } from "next";
import Link from "next/link";
import { lessonGrades, lessons, type Lesson } from "@/content/lessons";
import { LessonGradeTabs, type LessonGradeTab } from "@/components/LessonGradeTabs";

export const metadata: Metadata = { title: "Bài học | Cô Tú", description: "36 bài học tiếng Việt: chữ cái, vần, đọc hiểu, từ vựng, nói và viết." };

const lessonGroups = [
  { id: "hoc-van-lop-1", title: "🌟 Học vần lớp 1", subtitle: "Bài 1–5 · Chữ a, b, c, e, ê, dấu huyền, dấu sắc và truyện tranh", from: 1, to: 5 },
  { id: "chu-cai", title: "🔤 Làm quen chữ cái", subtitle: "Bài 6–11 · Nhận biết nguyên âm và các nhóm chữ", from: 6, to: 11 },
  { id: "phu-am", title: "🔡 Học phụ âm", subtitle: "Bài 12–17 · Đọc chữ đầu và nhóm chữ ghép", from: 12, to: 17 },
  { id: "van-chinh-ta", title: "🎵 Dấu thanh và vần", subtitle: "Bài 18–22 · Đọc đúng, ghép vần, viết đúng", from: 18, to: 22 },
  { id: "doc-tu-vung", title: "📖 Đọc hiểu và từ vựng", subtitle: "Bài 23–29 · Đọc đoạn ngắn, gọi tên thế giới quanh em", from: 23, to: 29 },
  { id: "noi-viet", title: "💬 Nói và viết", subtitle: "Bài 30–36 · Giao tiếp, đặt câu và viết đoạn", from: 30, to: 36 },
];

const gradeTones: LessonGradeTab["tone"][] = ["blue", "pink", "orange", "green", "yellow"];

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link href={`/bai-hoc/${lesson.slug}`} className={`lesson-card lesson-card--${lesson.tone}`}>
      <span className="lesson-card-icon" aria-hidden="true">{lesson.icon}</span>
      <span className="lesson-card-category">Bài {lesson.number} · {lesson.category}</span>
      <h3>{lesson.title}</h3>
      <p>{lesson.summary}</p>
      <span className="pill-button lesson-card-link">Xem bài học <span aria-hidden="true">→</span></span>
    </Link>
  );
}

export default function LessonsPage() {
  // Tab "Tất cả" giữ nguyên cách nhóm theo chủ đề; tab Lớp chỉ hiện bài có `grade` tương ứng.
  const allLessons = <>
    <nav className="lesson-group-nav" aria-label="Chọn nhóm bài học">
      {lessonGroups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}
    </nav>
    {lessonGroups.map((group) => <section className="lesson-group" id={group.id} key={group.id}>
      <div className="lesson-group-heading"><h2>{group.title}</h2><p>{group.subtitle}</p></div>
      <div className="lesson-grid">
        {lessons.filter((lesson) => lesson.number >= group.from && lesson.number <= group.to).map((lesson) => <LessonCard lesson={lesson} key={lesson.slug} />)}
      </div>
    </section>)}
  </>;
  const tabs: LessonGradeTab[] = [
    { id: "tat-ca", label: "Tất cả", icon: "🌈", tone: "purple", count: lessons.length, content: allLessons },
    ...lessonGrades.map((grade, index) => {
      const gradeLessons = lessons.filter((lesson) => lesson.grade === grade);
      return {
        id: String(grade), label: `Lớp ${grade}`, icon: "🎒", tone: gradeTones[index], count: gradeLessons.length,
        content: gradeLessons.length ? <div className="lesson-grid">{gradeLessons.map((lesson) => <LessonCard lesson={lesson} key={lesson.slug} />)}</div> : null,
      };
    }),
  ];

  return (
    <main className="inner-page">
      <div className="page-container">
        <div className="page-intro">
          <span className="page-eyebrow">📚 Học từng bước</span>
          <h1>📚 Bài học</h1>
          <p>36 bài học từ chữ cái đến đọc hiểu, nói và viết. Chọn bài em muốn học nhé!</p>
        </div>
        <p className="lesson-curriculum-note">Lộ trình bổ trợ các kĩ năng đọc, viết, nói và nghe của môn Tiếng Việt tiểu học. Mỗi bài có ví dụ nghe được và câu hỏi tự kiểm tra.</p>
        <LessonGradeTabs tabs={tabs} />
        <div className="next-step"><span>✏️</span><p>Học xong rồi? Thử ghép chữ thành từ nào!</p><Link href="/bai-tap">Đến bài tập →</Link></div>
      </div>
    </main>
  );
}
