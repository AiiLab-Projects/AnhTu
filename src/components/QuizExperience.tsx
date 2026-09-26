"use client";

import { useState } from "react";
import Link from "next/link";
import { quizQuestions } from "@/content/questions";
import { readProgress, saveProgress } from "@/lib/progress";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { SpeakButton } from "@/components/SpeakButton";

export function QuizExperience() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const question = quizQuestions[index];
  const stars = score >= 18 ? 3 : score >= 13 ? 2 : score >= 8 ? 1 : 0;

  function submit() {
    if (selected === null || submitted) return;
    setSubmitted(true);
    if (selected === question.answer) setScore(score + 1);
  }

  function next() {
    if (index === quizQuestions.length - 1) {
      setDone(true);
      saveProgress({ quizBest: Math.max(readProgress().quizBest, score) });
    } else {
      setIndex(index + 1);
      setSelected(null);
      setSubmitted(false);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setDone(false);
    setStarted(true);
  }

  if (done) {
    return (
      <div className="quiz-shell quiz-result" aria-live="polite">
        <div className="result-emoji">🏆</div>
        <span className="eyebrow">Em đã hoàn thành</span>
        <h1>Thật tuyệt vời!</h1>
        <p>Em trả lời đúng <strong>{score}/{quizQuestions.length}</strong> câu hỏi.</p>
        <div className="result-stars" aria-label={`${stars} trên 3 sao`}>{[0, 1, 2].map((value) => <span key={value} className={value < stars ? "earned" : ""}>⭐</span>)}</div>
        <p className="result-advice">{stars === 3 ? "Em đã nắm bài rất chắc!" : "Ôn lại bài học rồi thử thêm lần nữa nhé!"}</p>
        <div className="result-actions"><button type="button" className="pill-button" onClick={restart}>↻ Làm lại</button><Link className="pill-button pill-button--light" href="/bai-hoc">Ôn bài học →</Link></div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="quiz-shell quiz-intro">
        <div className="quiz-intro-gradient">
          <span className="quiz-spark quiz-spark--left">⭐</span><span className="quiz-spark quiz-spark--right">✨</span>
          <div className="quiz-avatar"><TeacherAvatar /></div>
          <span className="quiz-badge">🏆 Bài kiểm tra trình độ</span>
          <h1>Thử tài tiếng Việt<br /><em>cùng Cô Tú!</em></h1>
          <p>Trả lời đúng để leo lên 3 sao ⭐ — càng đúng, càng giỏi nha! 🚀</p>
        </div>
        <div className="quiz-facts">
          <div><strong>20</strong><span>câu hỏi</span></div>
          <div><strong>3 ⭐</strong><span>tối đa</span></div>
          <div><strong>4</strong><span>kỹ năng</span></div>
          <div><strong>∞</strong><span>lần thử</span></div>
        </div>
        <div className="quiz-start"><button type="button" className="pill-button" onClick={() => setStarted(true)}>Bắt đầu kiểm tra →</button><p>Không cần đăng nhập. Kết quả tốt nhất lưu trên máy này.</p></div>
      </div>
    );
  }

  return (
    <div className="quiz-shell quiz-play">
      <div className="quiz-progress-top"><span>🏆 Câu {index + 1}/{quizQuestions.length}</span><span>⭐ {score} điểm</span></div>
      <div className="quiz-progress-track"><span style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }} /></div>
      <span className="quiz-skill">{question.skill}</span>
      <h1>{question.question}</h1>
      <SpeakButton text={question.question} label="🔊 Nghe câu hỏi" />
      <div className="quiz-options">
        {question.options.map((option, optionIndex) => (
          <button
            type="button"
            key={optionIndex}
            disabled={submitted}
            className={`quiz-option ${selected === optionIndex ? "quiz-option--selected" : ""} ${submitted && optionIndex === question.answer ? "quiz-option--correct" : ""} ${submitted && selected === optionIndex && selected !== question.answer ? "quiz-option--wrong" : ""}`}
            onClick={() => setSelected(optionIndex)}
          ><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>
        ))}
      </div>
      {submitted && <div className={selected === question.answer ? "feedback feedback--good" : "feedback feedback--retry"} role="status"><strong>{selected === question.answer ? "Chính xác! 🎉" : "Chưa đúng rồi 💪"}</strong> {question.explanation}</div>}
      <div className="quiz-controls">
        <span>Em có thể chọn lại trước khi kiểm tra đáp án.</span>
        {submitted ? <button type="button" className="pill-button" onClick={next}>{index === quizQuestions.length - 1 ? "Xem kết quả →" : "Câu tiếp theo →"}</button> : <button type="button" className="pill-button" disabled={selected === null} onClick={submit}>Kiểm tra đáp án</button>}
      </div>
    </div>
  );
}
