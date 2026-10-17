"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/content/lessons";
import { EXERCISE_ROUND_LENGTH } from "@/content/questions";
import { LocalProgress, readProgress } from "@/lib/progress";
import { Icon, type IconName } from "./Icon";

// Phải khớp QUIZ_LENGTH trong QuizExperience.tsx.
const QUIZ_TOTAL = 20;

type BadgeDef = { id: string; label: string; icon: IconName; color: string; soft: string; unlocked: boolean };

export function Classroom() {
  const [progress, setProgress] = useState<LocalProgress>({ exerciseBest: 0, quizBest: 0, lessonsDone: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setProgress(readProgress()); setLoaded(true); }, []);

  const doneCount = lessons.filter((lesson) => progress.lessonsDone.includes(lesson.slug)).length;
  const nextLesson = lessons.find((lesson) => !progress.lessonsDone.includes(lesson.slug));
  const isEmpty = loaded && doneCount === 0 && progress.exerciseBest === 0 && progress.quizBest === 0;

  const stats: Array<{ icon: IconName; tone: "purple" | "pink" | "orange"; value: number; total: number; label: string }> = [
    { icon: "book", tone: "purple", value: doneCount, total: lessons.length, label: "bài em đã học xong" },
    { icon: "pencil", tone: "pink", value: Math.min(progress.exerciseBest, EXERCISE_ROUND_LENGTH), total: EXERCISE_ROUND_LENGTH, label: "từ ghép đúng nhiều nhất" },
    { icon: "trophy", tone: "orange", value: Math.min(progress.quizBest, QUIZ_TOTAL), total: QUIZ_TOTAL, label: "câu kiểm tra đúng nhiều nhất" },
  ];

  const badges: BadgeDef[] = [
    { id: "first-lesson", label: "Bước đầu tiên", icon: "flame", color: "var(--accent-strong)", soft: "var(--accent-soft)", unlocked: doneCount >= 1 },
    { id: "five-lessons", label: "5 bài học", icon: "medal", color: "var(--primary-strong)", soft: "var(--primary-soft)", unlocked: doneCount >= 5 },
    { id: "ten-lessons", label: "10 bài học", icon: "star", color: "var(--secondary-strong)", soft: "var(--secondary-soft)", unlocked: doneCount >= 10 },
    { id: "word-done", label: "Ghép đủ 10 từ", icon: "palette", color: "var(--success-strong)", soft: "var(--success-soft)", unlocked: progress.exerciseBest >= EXERCISE_ROUND_LENGTH },
    { id: "quiz-good", label: "Kiểm tra 18/20", icon: "trophy", color: "var(--secondary-strong)", soft: "var(--secondary-soft)", unlocked: progress.quizBest >= 18 },
    { id: "all-done", label: "Hoàn tất 40 bài", icon: "rocket", color: "var(--primary-strong)", soft: "var(--primary-soft)", unlocked: doneCount >= lessons.length },
  ];

  return (
    <div className="progress-board">
      <p className="progress-device-note">
        <Icon name="info" size={18} />
        <span><strong>Tiến độ chỉ lưu trên thiết bị này.</strong> Nếu em đổi sang máy khác, hoặc xoá dữ liệu trình duyệt, tiến độ sẽ bắt đầu lại từ đầu.</span>
      </p>

      {isEmpty && (
        <div className="progress-empty">
          <span className="progress-empty-icon" aria-hidden="true"><Icon name="sun" size={26} /></span>
          <div><strong>Em chưa có tiến độ nào.</strong><p>Học bài đầu tiên cùng Cô nhé! Trả lời đúng câu hỏi cuối bài là bài đó được đánh dấu đã học.</p></div>
        </div>
      )}

      <div className="progress-stats">
        {stats.map((stat) => (
          <div className={`progress-stat progress-stat--${stat.tone}`} key={stat.label}>
            <span className="progress-stat-icon" aria-hidden="true"><Icon name={stat.icon} size={28} /></span>
            <strong>{stat.value}<small>/{stat.total}</small></strong>
            <span className="progress-stat-label">{stat.label}</span>
            <span className="progress-stat-bar" aria-hidden="true"><span style={{ width: `${(stat.value / stat.total) * 100}%` }} /></span>
          </div>
        ))}
      </div>

      <div className="badge-strip" aria-label="Huy hiệu của em">
        {badges.map((badge) => (
          <span
            key={badge.id}
            className={`badge-chip${badge.unlocked ? "" : " badge-chip--locked"}`}
            style={{ "--badge-color": badge.color, "--badge-soft": badge.soft } as React.CSSProperties}
            title={badge.unlocked ? "Đã mở khoá" : "Chưa mở khoá"}
          >
            <span className="badge-chip-icon"><Icon name={badge.unlocked ? badge.icon : "lock"} size={16} /></span>
            {badge.label}
          </span>
        ))}
      </div>

      <section className="white-panel progress-path">
        <div className="progress-path-head">
          <div><h2>Hành trình học của em</h2><p>Em chọn bài nào cũng được. Trả lời đúng câu hỏi cuối bài để đánh dấu hoàn thành.</p></div>
          {nextLesson
            ? <Link className="pill-button" href={`/bai-hoc/${nextLesson.slug}`}>Học tiếp: Bài {nextLesson.number} <Icon name="arrow-right" size={16} /></Link>
            : <span className="progress-all-done"><Icon name="check-circle" size={16} /> Em đã học xong tất cả!</span>}
        </div>
        <ol className="progress-lesson-list">
          {lessons.map((lesson) => {
            const done = progress.lessonsDone.includes(lesson.slug);
            return (
              <li key={lesson.slug}>
                <Link href={`/bai-hoc/${lesson.slug}`} className={`progress-lesson lesson-card--${lesson.tone}${done ? " progress-lesson--done" : ""}`}>
                  <span className="progress-lesson-icon" aria-hidden="true">{lesson.icon}</span>
                  <span className="progress-lesson-text"><small>Bài {lesson.number}</small><strong>{lesson.title}</strong></span>
                  <em>{done ? <><Icon name="check" size={12} /> Đã học</> : <>Học ngay <Icon name="arrow-right" size={14} /></>}</em>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="progress-parent" aria-labelledby="parent-note-title">
        <div className="progress-parent-head"><Icon name="user" size={16} /> Dành cho phụ huynh</div>
        <h3 id="parent-note-title">Theo dõi tiến độ bên nhà</h3>
        <p>Trang này chỉ hiển thị dữ liệu lưu trong trình duyệt của em. Để con duy trì nhịp học:</p>
        <ul>
          <li>Khuyến khích con làm 1 bài học + 1 lượt bài tập mỗi ngày.</li>
          <li>Sau 5 bài, cho con thử <Link href="/kiem-tra">làm kiểm tra</Link> để tự nhìn lại.</li>
          <li>Nếu con đổi máy, hãy để con học lại một vài bài để Cô Tú biết trình độ hiện tại.</li>
        </ul>
      </section>

      <div className="progress-actions">
        <Link className="pill-button" href="/bai-tap"><Icon name="pencil" size={16} /> Luyện ghép chữ</Link>
        <Link className="pill-button pill-button--light" href="/kiem-tra"><Icon name="trophy" size={16} /> Làm kiểm tra</Link>
      </div>
    </div>
  );
}
