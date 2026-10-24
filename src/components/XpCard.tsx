"use client";

import { dayKey, EXERCISE_XP, LESSON_MINUTES, LESSON_XP } from "@/lib/xp";
import { useXpStats } from "@/components/XpBadge";
import { Icon } from "@/components/Icon";

const WEEKDAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const XP_PER_LEVEL = 20;
const LEVEL_NAMES = ["Hạt giống", "Mầm non", "Chồi xanh", "Đoá hoa", "Ngôi sao", "Cánh diều", "Anh hùng chữ nghĩa"];

export function XpCard() {
  const { xp, streak, bestStreak, today, days } = useXpStats();
  const done = new Set(days);
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
  const inLevel = xp % XP_PER_LEVEL;
  // 7 ngày gần nhất, hôm nay ở ngoài cùng bên phải.
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return { key: dayKey(date), label: WEEKDAYS[date.getDay()], isToday: index === 6 };
  });

  return (
    <section className="xp-card" aria-labelledby="xp-title">
      <div className="xp-hero">
        <span className="xp-confetti xp-confetti--a" aria-hidden="true" />
        <span className="xp-confetti xp-confetti--b" aria-hidden="true" />
        <span className="xp-confetti xp-confetti--c" aria-hidden="true" />
        <img className="xp-mascot" src="/img/06-star-mascot-v2.webp" alt="" width={120} height={120} decoding="async" />
        <div className="xp-hero-text">
          <span className="xp-level-pill"><Icon name="rocket" size={14} /> Cấp {level} · {levelName}</span>
          <h2 id="xp-title"><strong>{xp}</strong> điểm XP</h2>
          <div className="xp-level-bar" role="progressbar" aria-label={`Còn ${XP_PER_LEVEL - inLevel} XP nữa là lên cấp ${level + 1}`} aria-valuemin={0} aria-valuemax={XP_PER_LEVEL} aria-valuenow={inLevel}>
            <span style={{ width: `${(inLevel / XP_PER_LEVEL) * 100}%` }} />
          </div>
          <p>Còn <strong>{XP_PER_LEVEL - inLevel} XP</strong> nữa là lên cấp {level + 1}!</p>
        </div>
      </div>

      <div className="xp-card-top">
        <div className="xp-stat xp-stat--xp">
          <span className="xp-stat-icon" aria-hidden="true"><Icon name="star" size={26} fill="currentColor" /></span>
          <div><strong>{xp}</strong><span>điểm XP</span></div>
        </div>
        <div className={`xp-stat xp-stat--streak${streak > 0 ? " xp-stat--lit" : ""}`}>
          <span className="xp-stat-icon" aria-hidden="true"><Icon name="flame" size={26} fill="currentColor" /></span>
          <div><strong>{streak}</strong><span>ngày học liên tiếp</span></div>
        </div>
        <div className="xp-stat xp-stat--best">
          <span className="xp-stat-icon" aria-hidden="true"><Icon name="medal" size={26} /></span>
          <div><strong>{bestStreak}</strong><span>chuỗi dài nhất</span></div>
        </div>
      </div>

      <h3 className="xp-week-title"><Icon name="flame" size={18} /> Chuỗi học 7 ngày gần đây</h3>
      <ol className="xp-week">
        {week.map((day, index) => (
          <li key={day.key} className={`xp-day xp-day--${index % 7}${done.has(day.key) ? " xp-day--done" : ""}${day.isToday ? " xp-day--today" : ""}`}>
            <span className="xp-day-dot" aria-hidden="true">{done.has(day.key) ? <Icon name="check" size={18} strokeWidth={3} /> : day.isToday ? <Icon name="sparkles" size={16} /> : ""}</span>
            <span>{day.label}</span>
            <span className="sr-only">{done.has(day.key) ? "đã học" : "chưa học"}</span>
          </li>
        ))}
      </ol>
      <p className={`xp-hint${today ? " xp-hint--good" : ""}`}>
        {today ? "Hôm nay em đã giữ chuỗi rồi. Giỏi lắm!" : streak > 0 ? "Hôm nay em chưa học. Học một chút để giữ chuỗi nhé!" : "Học một bài hoặc làm một lượt bài tập để bắt đầu chuỗi ngày học."}
      </p>

      <ul className="xp-rules">
        <li className="xp-rule xp-rule--lesson"><span className="xp-rule-icon" aria-hidden="true"><Icon name="book" size={18} /></span><span>Học một bài đủ {LESSON_MINUTES} phút</span><strong>+{LESSON_XP} XP</strong></li>
        <li className="xp-rule xp-rule--exercise"><span className="xp-rule-icon" aria-hidden="true"><Icon name="pencil" size={18} /></span><span>Làm xong một lượt bài tập</span><strong>+{EXERCISE_XP} XP</strong></li>
        <li className="xp-rule xp-rule--streak"><span className="xp-rule-icon" aria-hidden="true"><Icon name="flame" size={18} /></span><span>Mỗi ngày có XP là thêm một ngày vào chuỗi</span></li>
      </ul>
    </section>
  );
}
