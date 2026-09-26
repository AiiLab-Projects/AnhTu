"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { quizQuestions, type QuizQuestion } from "@/content/questions";
import { readProgress, saveProgress } from "@/lib/progress";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { SpeakButton } from "@/components/SpeakButton";

const QUIZ_LENGTH = 20;
type Level = QuizQuestion["difficulty"];

function chooseQuestion(level: Level, used: Set<number>): QuizQuestion {
  const available = quizQuestions
    .map((question, index) => ({ question, index }))
    .filter(({ question, index }) => question.difficulty === level && !used.has(index));
  const pool = available.length ? available : quizQuestions
    .map((question, index) => ({ question, index }))
    .filter(({ question }) => question.difficulty === level);
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  used.add(chosen.index);
  return chosen.question;
}

export function QuizExperience() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<Level>(1);
  const [highestLevel, setHighestLevel] = useState<Level>(1);
  const [done, setDone] = useState(false);
  const usedQuestions = useRef(new Set<number>());

  function start() {
    usedQuestions.current = new Set<number>();
    setQuestion(chooseQuestion(1, usedQuestions.current));
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setLevel(1);
    setHighestLevel(1);
    setDone(false);
    setStarted(true);
  }

  function submit() {
    if (!question || selected === null || submitted) return;
    const correct = selected === question.answer;
    setSubmitted(true);
    if (correct) {
      const nextLevel = Math.min(3, level + 1) as Level;
      setScore((value) => value + 1);
      setLevel(nextLevel);
      setHighestLevel((value) => Math.max(value, nextLevel) as Level);
    } else {
      setLevel(1);
    }
  }

  function next() {
    if (index === QUIZ_LENGTH - 1) {
      saveProgress({ quizBest: Math.max(readProgress().quizBest, score) });
      setDone(true);
      return;
    }
    setQuestion(chooseQuestion(level, usedQuestions.current));
    setIndex((value) => value + 1);
    setSelected(null);
    setSubmitted(false);
  }

  if (done) {
    return (
      <div className="quiz-shell quiz-result" aria-live="polite">
        <div className="result-emoji">🏆</div>
        <span className="eyebrow">Em đã hoàn thành</span>
        <h1>Thật tuyệt vời!</h1>
        <p>Em trả lời đúng <strong>{score}/{QUIZ_LENGTH}</strong> câu hỏi.</p>
        <div className="result-stars" aria-label={`Cấp độ cuối cùng ${level} trên 3 sao`}>
          {[1, 2, 3].map((star) => <span key={star} className={star <= level ? "earned" : ""}>★</span>)}
        </div>
        <p className="result-advice">Cấp độ cuối cùng: <strong>{level} sao</strong> · Cao nhất: <strong>{highestLevel} sao</strong></p>
        <div className="result-actions"><button type="button" className="pill-button" onClick={start}>↻ Làm lại</button><Link className="pill-button pill-button--light" href="/bai-hoc">Ôn bài học →</Link></div>
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
          <p>Trả lời đúng để lên sao và gặp câu khó hơn. Sai thì quay lại 1 sao nhé!</p>
        </div>
        <div className="quiz-facts">
          <div><strong>{QUIZ_LENGTH}</strong><span>câu mỗi lượt</span></div>
          <div><strong>3 ⭐</strong><span>mức độ khó</span></div>
          <div><strong>{quizQuestions.length}</strong><span>câu trong ngân hàng</span></div>
          <div><strong>∞</strong><span>lần thử</span></div>
        </div>
        <div className="quiz-start"><button type="button" className="pill-button" onClick={start}>Bắt đầu kiểm tra →</button><p>Kết quả tốt nhất lưu trên máy này.</p></div>
      </div>
    );
  }

  if (!question) return null;
  const sentenceParts = question.sentence?.split("___");
  const speakText = `${question.question} ${question.sentence?.replace("___", "chỗ trống") ?? ""}`;
  const correct = selected === question.answer;

  return (
    <div className="quiz-play">
      <div className="quiz-progress-top">
        <Link className="quiz-exit" href="/bai-hoc" aria-label="Thoát bài kiểm tra" title="Thoát bài kiểm tra"><X size={27} /></Link>
        <div className="quiz-level-stars" aria-label={`Độ khó hiện tại ${level} sao`}>
          {[1, 2, 3].map((star) => <span key={star} className={star <= level ? "earned" : ""}>★</span>)}
        </div>
        <div className="quiz-progress-track" role="progressbar" aria-label="Tiến độ bài kiểm tra" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={QUIZ_LENGTH}>
          <span style={{ width: `${(index / QUIZ_LENGTH) * 100}%` }} />
        </div>
        <strong className="quiz-progress-count">{index + 1}/{QUIZ_LENGTH}</strong>
      </div>

      <div className="quiz-shell quiz-question-card">
        <div className="quiz-question-tags">
          <span className="quiz-skill">📝 {question.skill}</span>
          <span className="quiz-difficulty">☆ Câu {question.difficulty} sao</span>
        </div>
        <h1><span aria-hidden="true">📝</span> {question.question}</h1>
        {question.sentence && (
          <p className="quiz-sentence">
            {sentenceParts?.[0]}
            {sentenceParts?.length === 2 && <span className="quiz-blank" aria-label="chỗ trống">?</span>}
            {sentenceParts?.[1]}
          </p>
        )}
        <SpeakButton text={speakText} label="🔊 Nghe câu hỏi" />
        <div className="quiz-options">
          {question.options.map((option, optionIndex) => (
            <button
              type="button"
              key={optionIndex}
              disabled={submitted}
              aria-pressed={selected === optionIndex}
              className={`quiz-option ${selected === optionIndex ? "quiz-option--selected" : ""} ${submitted && optionIndex === question.answer ? "quiz-option--correct" : ""} ${submitted && selected === optionIndex && !correct ? "quiz-option--wrong" : ""}`}
              onClick={() => setSelected(optionIndex)}
            ><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>
          ))}
        </div>
        {submitted && <div className={correct ? "feedback feedback--good" : "feedback feedback--retry"} role="status"><strong>{correct ? `Chính xác! Lên ${level} sao 🌟` : "Chưa đúng, quay về 1 sao 💪"}</strong> {question.explanation}</div>}
        <div className="quiz-controls">
          <span>{score} câu đúng · Chọn đáp án rồi kiểm tra nhé.</span>
          {submitted ? <button type="button" className="pill-button" onClick={next}>{index === QUIZ_LENGTH - 1 ? "Xem kết quả →" : "Câu tiếp theo →"}</button> : <button type="button" className="pill-button" disabled={selected === null} onClick={submit}>Kiểm tra đáp án</button>}
        </div>
      </div>
    </div>
  );
}
