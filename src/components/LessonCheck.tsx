"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/content/lessons";
import { readProgress, saveProgress } from "@/lib/progress";
import { Icon } from "./Icon";
import { RewardModal } from "./RewardModal";

type LessonCheckProps = { slug: string; question: string; options: string[]; answer: number; explanation: string };

export function LessonCheck({ slug, question, options, answer, explanation }: LessonCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const correct = selected === answer;

  const current = lessons.find((lesson) => lesson.slug === slug);
  const next = current ? lessons.find((lesson) => lesson.number === current.number + 1) : undefined;

  // Khi trả lời đúng lần đầu, bật popup phần thưởng + lưu tiến độ.
  useEffect(() => {
    if (selected === null) return;
    if (correct) {
      const done = readProgress().lessonsDone;
      if (!done.includes(slug)) saveProgress({ lessonsDone: [...done, slug] });
      setShowReward(true);
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
