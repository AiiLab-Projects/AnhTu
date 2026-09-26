"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/content/lessons";
import { LocalProgress, readProgress } from "@/lib/progress";

export function Classroom() {
  const [progress, setProgress] = useState<LocalProgress>({ exerciseBest: 0, quizBest: 0, lessonsDone: [] });
  useEffect(() => setProgress(readProgress()), []);

  return (
    <div className="classroom">
      <div className="classroom-summary">
        <div><span>📚</span><strong>{progress.lessonsDone.length}/{lessons.length}</strong><small>bài đã hoàn thành</small></div>
        <div><span>✏️</span><strong>{progress.exerciseBest}/10</strong><small>từ ghép đúng nhất</small></div>
        <div><span>🏆</span><strong>{progress.quizBest}/20</strong><small>điểm kiểm tra tốt nhất</small></div>
      </div>
      <section className="white-panel class-path">
        <div className="class-path-title"><h2>Hành trình học của em</h2><p>Chọn bài bất kỳ để học. Trả lời đúng câu hỏi cuối bài để đánh dấu hoàn thành.</p></div>
        <div className="class-lesson-list">
          {lessons.map((lesson) => {
            const done = progress.lessonsDone.includes(lesson.slug);
            return <Link href={`/bai-hoc/${lesson.slug}`} key={lesson.slug} className="class-lesson">
              <span className={`class-lesson-icon lesson-card--${lesson.tone}`}>{lesson.icon}</span>
              <span><small>Bài {lesson.number}</small><strong>{lesson.title}</strong></span>
              <em className={done ? "class-done" : ""}>{done ? "✓ Đã học" : "Học ngay →"}</em>
            </Link>;
          })}
        </div>
      </section>
      <div className="classroom-actions"><Link href="/bai-tap">✏️ Luyện ghép chữ</Link><Link href="/kiem-tra">🏆 Làm kiểm tra</Link></div>
      <p className="local-progress-note">Tiến độ chỉ lưu trong trình duyệt trên thiết bị này.</p>
    </div>
  );
}
