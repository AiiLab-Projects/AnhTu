"use client";

import { useState } from "react";
import { readProgress, saveProgress } from "@/lib/progress";

type LessonCheckProps = { slug: string; question: string; options: string[]; answer: number; explanation: string };

export function LessonCheck({ slug, question, options, answer, explanation }: LessonCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = selected === answer;

  function choose(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === answer) {
      const done = readProgress().lessonsDone;
      if (!done.includes(slug)) saveProgress({ lessonsDone: [...done, slug] });
    }
  }

  return (
    <section className="lesson-check" aria-labelledby="lesson-check-title">
      <div className="lesson-check-head"><span>🧠</span><div><span className="eyebrow">Thử tài một chút</span><h2 id="lesson-check-title">{question}</h2></div></div>
      <div className="choice-grid">
        {options.map((option, index) => (
          <button key={option} type="button" disabled={selected !== null} className={`choice-button ${selected === index ? (correct ? "choice-button--correct" : "choice-button--wrong") : ""}`} onClick={() => choose(index)}>
            <span className="choice-letter">{String.fromCharCode(65 + index)}</span>{option}
          </button>
        ))}
      </div>
      {selected !== null && <div className={correct ? "feedback feedback--good" : "feedback feedback--retry"} role="status">
        <strong>{correct ? "Chính xác! 🎉" : "Thử lại nhé! 💪"}</strong> {explanation}
        {!correct && <button type="button" onClick={() => setSelected(null)}>Chọn lại</button>}
        {correct && <span className="saved-tag">Đã lưu tiến độ ✓</span>}
      </div>}
    </section>
  );
}
