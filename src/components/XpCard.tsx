"use client";

import { dayKey, EXERCISE_XP, LESSON_MINUTES, LESSON_XP } from "@/lib/xp";
import { useXpStats } from "@/components/XpBadge";
import { Icon } from "@/components/Icon";

const WEEKDAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export function XpCard() {
  const { xp, streak, bestStreak, today, days } = useXpStats();
  const done = new Set(days);
  // 7 ngày gần nhất, hôm nay ở ngoài cùng bên phải.
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return { key: dayKey(date), label: WEEKDAYS[date.getDay()], isToday: index === 6 };
  });

  return (
    <section className="xp-card" aria-labelledby="xp-title">
      <div className="xp-card-top">
        <div className="xp-stat">
          <span className="xp-stat-icon xp-stat-icon--xp" aria-hidden="true"><Icon name="star" size={26} fill="currentColor" /></span>
          <div><strong>{xp}</strong><span>điểm XP</span></div>
        </div>
        <div className="xp-stat">
          <span className={`xp-stat-icon xp-stat-icon--streak${streak > 0 ? " xp-stat-icon--lit" : ""}`} aria-hidden="true"><Icon name="flame" size={26} fill="currentColor" /></span>
          <div><strong>{streak}</strong><span>ngày học liên tiếp</span></div>
        </div>
        <div className="xp-stat">
          <span className="xp-stat-icon xp-stat-icon--best" aria-hidden="true"><Icon name="medal" size={26} /></span>
          <div><strong>{bestStreak}</strong><span>chuỗi dài nhất</span></div>
        </div>
      </div>
      <h2 id="xp-title">Chuỗi học 7 ngày gần đây</h2>
      <ol className="xp-week">
        {week.map((day) => (
          <li key={day.key} className={`xp-day${done.has(day.key) ? " xp-day--done" : ""}${day.isToday ? " xp-day--today" : ""}`}>
            <span className="xp-day-dot" aria-hidden="true">{done.has(day.key) ? <Icon name="check" size={16} strokeWidth={3} /> : ""}</span>
            <span>{day.label}</span>
            <span className="sr-only">{done.has(day.key) ? "đã học" : "chưa học"}</span>
          </li>
        ))}
      </ol>
      <p className="xp-hint">
        {today ? "Hôm nay em đã giữ chuỗi rồi. Giỏi lắm!" : streak > 0 ? "Hôm nay em chưa học. Học một chút để giữ chuỗi nhé!" : "Học một bài hoặc làm một lượt bài tập để bắt đầu chuỗi ngày học."}
      </p>
      <ul className="xp-rules">
        <li><Icon name="book" size={16} /> Học một bài đủ {LESSON_MINUTES} phút: <strong>+{LESSON_XP} XP</strong></li>
        <li><Icon name="pencil" size={16} /> Làm xong một lượt bài tập: <strong>+{EXERCISE_XP} XP</strong></li>
        <li><Icon name="flame" size={16} /> Mỗi ngày có điểm XP là thêm một ngày vào chuỗi</li>
      </ul>
    </section>
  );
}
