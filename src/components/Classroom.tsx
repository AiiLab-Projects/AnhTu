"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/content/lessons";
import { wordExercises } from "@/content/questions";
import { LocalProgress, readProgress } from "@/lib/progress";

// Phải khớp QUIZ_LENGTH trong QuizExperience.tsx.
const QUIZ_TOTAL = 20;

export function Classroom() {
  const [progress, setProgress] = useState<LocalProgress>({ exerciseBest: 0, quizBest: 0, lessonsDone: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setProgress(readProgress()); setLoaded(true); }, []);

  const doneCount = lessons.filter((lesson) => progress.lessonsDone.includes(lesson.slug)).length;
  const nextLesson = lessons.find((lesson) => !progress.lessonsDone.includes(lesson.slug));
  const isEmpty = loaded && doneCount === 0 && progress.exerciseBest === 0 && progress.quizBest === 0;
  const stats = [
    { icon: "📚", tone: "purple", value: doneCount, total: lessons.length, label: "bài em đã học xong" },
    { icon: "✏️", tone: "pink", value: Math.min(progress.exerciseBest, wordExercises.length), total: wordExercises.length, label: "từ ghép đúng nhiều nhất" },
    { icon: "🏆", tone: "orange", value: Math.min(progress.quizBest, QUIZ_TOTAL), total: QUIZ_TOTAL, label: "câu kiểm tra đúng nhiều nhất" },
  ];

  return (
    <div className="progress-board">
      <p className="progress-device-note"><span aria-hidden="true">📱</span><span><strong>Tiến độ chỉ lưu trên thiết bị này.</strong> Nếu em đổi sang máy khác, hoặc xoá dữ liệu trình duyệt, tiến độ sẽ bắt đầu lại từ đầu.</span></p>

      {isEmpty && (
        <div className="progress-empty">
          <span aria-hidden="true">🌱</span>
          <div><strong>Em chưa có tiến độ nào.</strong><p>Học bài đầu tiên cùng Cô nhé! Trả lời đúng câu hỏi cuối bài là bài đó được đánh dấu đã học.</p></div>
        </div>
      )}

      <div className="progress-stats">
        {stats.map((stat) => (
          <div className={`progress-stat progress-stat--${stat.tone}`} key={stat.label}>
            <span className="progress-stat-icon" aria-hidden="true">{stat.icon}</span>
            <strong>{stat.value}<small>/{stat.total}</small></strong>
            <span className="progress-stat-label">{stat.label}</span>
            <span className="progress-stat-bar" aria-hidden="true"><span style={{ width: `${(stat.value / stat.total) * 100}%` }} /></span>
          </div>
        ))}
      </div>

      <section className="white-panel progress-path">
        <div className="progress-path-head">
          <div><h2>🗺️ Hành trình học của em</h2><p>Em chọn bài nào cũng được. Trả lời đúng câu hỏi cuối bài để đánh dấu hoàn thành.</p></div>
          {nextLesson
            ? <Link className="pill-button" href={`/bai-hoc/${nextLesson.slug}`}>Học tiếp: Bài {nextLesson.number} →</Link>
            : <span className="progress-all-done">🎉 Em đã học xong tất cả!</span>}
        </div>
        <ol className="progress-lesson-list">
          {lessons.map((lesson) => {
            const done = progress.lessonsDone.includes(lesson.slug);
            return (
              <li key={lesson.slug}>
                <Link href={`/bai-hoc/${lesson.slug}`} className={`progress-lesson lesson-card--${lesson.tone}${done ? " progress-lesson--done" : ""}`}>
                  <span className="progress-lesson-icon" aria-hidden="true">{lesson.icon}</span>
                  <span className="progress-lesson-text"><small>Bài {lesson.number}</small><strong>{lesson.title}</strong></span>
                  <em>{done ? "✓ Đã học" : <><span className="progress-lesson-cta">Học ngay </span>→</>}</em>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="progress-actions">
        <Link className="pill-button" href="/bai-tap">✏️ Luyện ghép chữ</Link>
        <Link className="pill-button pill-button--light" href="/kiem-tra">🏆 Làm kiểm tra</Link>
      </div>
    </div>
  );
}
