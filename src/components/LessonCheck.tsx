"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/content/lessons";
import { readProgress, saveProgress } from "@/lib/progress";
import { Icon } from "./Icon";
import { RewardModal } from "./RewardModal";
import { celebrate } from "@/lib/confetti";
import { showToast } from "@/lib/toast";

type LessonCheckProps = { slug: string; question: string; options: string[]; answer: number; explanation: string };

export function LessonCheck({ slug, question, options, answer, explanation }: LessonCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const correct = selected === answer;

  const current = lessons.find((lesson) => lesson.slug === slug);
  const next = current ? lessons.find((lesson) => lesson.number === current.number + 1) : undefined;

  // Khi trả lời đúng lần đầu, bật popup phần thưởng + lưu tiến độ + confetti.
  // Thêm milestone toast khi tổng số bài đã học qua các mốc 25/50/75/100%.
  useEffect(() => {
    if (selected === null) return;
    if (correct) {
      const prevDone = readProgress().lessonsDone;
      if (!prevDone.includes(slug)) {
        const nextDone = [...prevDone, slug];
        saveProgress({ lessonsDone: nextDone });
        const total = lessons.length;
        const prevPct = Math.floor((prevDone.length / total) * 100);
        const nextPct = Math.floor((nextDone.length / total) * 100);
        const MILESTONES = [25, 50, 75, 100] as const;
        for (const m of MILESTONES) {
          if (prevPct < m && nextPct >= m) {
            showToast({
              icon: m === 100 ? "trophy" : "star",
              title: m === 100 ? "Hoàn tất toàn bộ bài học!" : `Em đã học ${m}% chặng đường!`,
              description: m === 100 ? "Cô Tú rất tự hào về em." : `${nextDone.length}/${total} bài — tiếp tục nhé!`,
              tone: "achievement",
              duration: 3800,
            });
            break;
          }
        }
      }
      setShowReward(true);
      void celebrate("lesson");
    } else {
      setShowRetry(true);
    }
  }, [selected, correct, slug]);

  function choose(index: number) {
    if (selected !== null) return;
    setSelected(index);
  }

  function retry() {
    setSelected(null);
    setShowRetry(false);
  }

  return (
    <section className="lesson-check" aria-labelledby="lesson-check-title">
      <div className="lesson-check-head">
        <span className="lesson-check-head-icon"><Icon name="lightbulb" size={28} /></span>
        <div><span className="eyebrow">Thử tài một chút</span><h2 id="lesson-check-title">{question}</h2></div>
      </div>
      <div className="choice-grid">
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            disabled={selected !== null && correct}
            className={`choice-button ${selected === index ? (correct ? "choice-button--correct" : "choice-button--wrong") : ""}`}
            onClick={() => choose(index)}
          >
            <span className="choice-letter">{String.fromCharCode(65 + index)}</span>{option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className={correct ? "feedback feedback--good" : "feedback feedback--retry"} role="status">
          <Icon name={correct ? "check-circle" : "lightbulb"} size={20} />
          <span>
            <strong>{correct ? "Chính xác!" : "Thử lại nhé!"}</strong> {explanation}
            {correct && <span className="saved-tag"> <Icon name="check" size={12} /> Đã lưu tiến độ</span>}
          </span>
          {!correct && <button type="button" onClick={retry}>Chọn lại</button>}
        </div>
      )}

      <RewardModal
        open={showReward}
        onClose={() => setShowReward(false)}
        variant="correct"
        title="Giỏi lắm!"
        message={<>Em đã trả lời đúng câu hỏi của bài <strong>{current?.title ?? "này"}</strong>. Tiến độ đã được lưu lại.</>}
        primaryAction={next ? { label: "Bài tiếp theo", href: `/bai-hoc/${next.slug}` } : { label: "Về danh sách bài học", href: "/bai-hoc" }}
        secondaryAction={{ label: "Xem tiến độ", href: "/tien-do" }}
      />

      <RewardModal
        open={showRetry}
        onClose={() => setShowRetry(false)}
        variant="wrong"
        title="Thử lại một lần nhé!"
        message={<>Chưa đúng rồi — {explanation}</>}
        primaryAction={{ label: "Thử lại", onClick: retry }}
      />
    </section>
  );
}
