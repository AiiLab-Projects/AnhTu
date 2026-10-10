"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { quizQuestions, type QuizQuestion } from "@/content/questions";
import { readProgress, saveProgress } from "@/lib/progress";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { SpeakButton } from "@/components/SpeakButton";
import { Icon, type IconName } from "@/components/Icon";
import { RewardModal } from "@/components/RewardModal";
import { celebrate } from "@/lib/confetti";
import { showToast } from "@/lib/toast";
import { applyRipple } from "@/components/effects";

const QUIZ_LENGTH = 20;
type Level = QuizQuestion["difficulty"];

// LOGIC KIỂM TRA — không thay đổi so với trước:
// - Mỗi lượt 20 câu, bank 60 câu.
// - Chọn ngẫu nhiên câu theo mức sao hiện tại, ưu tiên câu chưa gặp.
// - Trả lời đúng: +1 câu đúng, level +1 (tối đa 3).
// - Trả lời sai: level reset về 1.
// - Khi `next()` ở câu cuối: lưu `quizBest = max(cũ, score)` vào localStorage.
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

type Stat = { icon: IconName; value: string | number; label: string; tone: "purple" | "pink" | "yellow" | "blue" };
const QUIZ_STATS: Stat[] = [
  { icon: "book",    value: QUIZ_LENGTH,          label: "Câu mỗi lượt",      tone: "purple" },
  { icon: "star",    value: 3,                    label: "Mức độ sao",         tone: "yellow" },
  { icon: "target",  value: quizQuestions.length, label: "Câu trong ngân hàng", tone: "pink" },
  { icon: "rocket",  value: "∞",                  label: "Lần thử",            tone: "blue" },
];

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
  const [showComplete, setShowComplete] = useState(false);
  const [streak, setStreak] = useState(0);
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
    setShowComplete(false);
    setStreak(0);
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
      // Streak chip khi đúng liên tiếp từ 3 câu trở lên.
      setStreak((s) => {
        const next = s + 1;
        if (next === 3) showToast({ icon: "flame", title: "Streak 3!", description: "Em đang đúng liên tiếp, giữ nhịp nhé!", tone: "achievement" });
        if (next === 5) showToast({ icon: "flame", title: "Streak 5! Siêu lắm!", tone: "achievement" });
        if (next === 10) showToast({ icon: "trophy", title: "Streak 10 — Cô Tú tự hào!", tone: "achievement" });
        return next;
      });
    } else {
      setLevel(1);
      setStreak(0);
    }
  }

  function next() {
    if (index === QUIZ_LENGTH - 1) {
      saveProgress({ quizBest: Math.max(readProgress().quizBest, score) });
      setDone(true);
      setShowComplete(true);
      // Confetti ăn mừng hoàn thành quiz.
      void celebrate("quiz");
      return;
    }
    setQuestion(chooseQuestion(level, usedQuestions.current));
    setIndex((value) => value + 1);
    setSelected(null);
    setSubmitted(false);
  }

  // Keyboard shortcuts: 1-4 chọn đáp án, Space/Enter kiểm tra hoặc sang câu tiếp, Esc thoát.
  useEffect(() => {
    if (!started || done) return;
    function onKey(event: KeyboardEvent) {
      if (!question) return;
      const target = event.target as HTMLElement | null;
      // Bỏ qua khi đang gõ trong input/textarea (hiện quiz chưa có nhưng cho tương lai).
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (/^[1-4]$/.test(event.key)) {
        if (submitted) return;
        const idx = Number(event.key) - 1;
        if (idx < question.options.length) {
          event.preventDefault();
          setSelected(idx);
        }
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (submitted) next();
        else if (selected !== null) submit();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, done, question, submitted, selected, index, level, score]);

  if (done) {
    const bestEver = Math.max(readProgress().quizBest, score);
    return (
      <>
        <div className="quiz-result-screen" aria-live="polite">
          <img src="/img/06-star-mascot-v2.webp" alt="" width={180} height={180} className="quiz-result-mascot" decoding="async" />
          <span className="eyebrow">Em đã hoàn thành</span>
          <h1>Thật tuyệt vời!</h1>
          <p className="quiz-result-score">Em trả lời đúng <strong>{score}/{QUIZ_LENGTH}</strong> câu hỏi.</p>
          <div className="result-stars" aria-label={`Cấp độ cuối cùng ${level} trên 3 sao`}>
            {[1, 2, 3].map((star) => (
              <span key={star} className={star <= level ? "earned" : ""}>
                <Icon name="star" size={44} fill={star <= level ? "currentColor" : "none"} />
              </span>
            ))}
          </div>
          <p className="result-advice">
            Cấp độ cuối cùng: <strong>{level} sao</strong> · Cao nhất lượt này: <strong>{highestLevel} sao</strong>
          </p>
          <p className="result-best">
            <Icon name="trophy" size={16} /> Kỉ lục trên máy này: <strong>{bestEver}/{QUIZ_LENGTH}</strong>
          </p>
          <div className="result-actions">
            <button type="button" className="pill-button" onClick={start}>
              <Icon name="rocket" size={16} /> Chơi lại
            </button>
            <Link className="pill-button pill-button--light" href="/tien-do">
              Xem tiến độ <Icon name="arrow-right" size={16} />
            </Link>
            <Link className="pill-button pill-button--ghost" href="/">
              Về trang chủ
            </Link>
          </div>
        </div>
        <RewardModal
          open={showComplete}
          onClose={() => setShowComplete(false)}
          variant="complete"
          title={score >= 18 ? "Xuất sắc!" : score >= 12 ? "Giỏi lắm, em ơi!" : "Em đã làm xong rồi!"}
          message={<>Em trả lời đúng <strong>{score}/{QUIZ_LENGTH}</strong> câu. Mỗi lượt thử là một lần Cô Tú thêm tự hào.</>}
          stars={{ earned: level, max: 3 }}
          primaryAction={{ label: "Chơi lại", onClick: () => { setShowComplete(false); start(); } }}
          secondaryAction={{ label: "Xem tiến độ", href: "/tien-do" }}
        />
      </>
    );
  }

  if (!started) {
    return (
      <section className="quiz-intro" aria-labelledby="quiz-intro-title">
        <div className="quiz-intro-card">
          <div className="quiz-intro-copy">
            <span className="page-eyebrow"><Icon name="trophy" size={14} /> Thử thách cùng Cô Tú</span>
            <h1 id="quiz-intro-title">
              Thử tài <span className="text-gradient-soft">tiếng Việt</span>!
            </h1>
            <p>Cùng Cô Tú trả lời những câu hỏi thú vị và chinh phục các ngôi sao nhé!</p>
            <ul className="quiz-intro-rules" aria-label="Luật chơi">
              <li><span><Icon name="check-circle" size={16} /></span> Trả lời đúng để lên sao và gặp câu khó hơn.</li>
              <li><span><Icon name="lightbulb" size={16} /></span> Sai cũng không sao — quay lại 1 sao rồi học tiếp.</li>
              <li><span><Icon name="star" size={16} fill="currentColor" /></span> Kỉ lục cao nhất được lưu trên máy này.</li>
            </ul>
            <button type="button" className="quiz-start-btn" onClick={start} onPointerDown={applyRipple}>
              <Icon name="play" size={20} /> Bắt đầu kiểm tra
            </button>
            <p className="quiz-start-note">Kết quả tốt nhất lưu trên máy này — có thể thử lại không giới hạn.</p>
          </div>
          <div className="quiz-intro-visual" aria-hidden="true">
            <img src="/img/05-reward-island-v2.webp" alt="" width={520} height={520} decoding="async" />
            <span className="quiz-intro-spark quiz-intro-spark--a"><Icon name="star" size={18} fill="currentColor" /></span>
            <span className="quiz-intro-spark quiz-intro-spark--b"><Icon name="sparkles" size={18} /></span>
            <span className="quiz-intro-spark quiz-intro-spark--c"><Icon name="star" size={14} fill="currentColor" /></span>
          </div>
        </div>
        <div className="quiz-stats-grid">
          {QUIZ_STATS.map((stat) => (
            <div key={stat.label} className={`quiz-stat quiz-stat--${stat.tone}`}>
              <span className="quiz-stat-icon"><Icon name={stat.icon} size={22} fill={stat.icon === "star" ? "currentColor" : "none"} /></span>
              <strong>{stat.value}</strong>
              <span className="quiz-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!question) return null;
  const sentenceParts = question.sentence?.split("___");
  const speakText = `${question.question} ${question.sentence?.replace("___", "chỗ trống") ?? ""}`;
  const correct = selected === question.answer;

  return (
    <section className="quiz-play" aria-labelledby="quiz-play-title">
      {streak >= 3 && (
        <div key={streak} className="quiz-streak" role="status" aria-live="polite">
          <Icon name="flame" size={16} /> Streak {streak}!
        </div>
      )}
      <header className="quiz-progress-top">
        <Link className="quiz-exit" href="/bai-hoc" aria-label="Thoát bài kiểm tra" title="Thoát bài kiểm tra">
          <Icon name="x" size={22} />
        </Link>
        <div className="quiz-level-stars" aria-label={`Độ khó hiện tại ${level} sao`}>
          {[1, 2, 3].map((star) => (
            <span key={star} className={star <= level ? "earned" : ""}>
              <Icon name="star" size={22} fill={star <= level ? "currentColor" : "none"} />
            </span>
          ))}
        </div>
        <div
          className="quiz-progress-track"
          role="progressbar"
          aria-label="Tiến độ bài kiểm tra"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={QUIZ_LENGTH}
        >
          <span style={{ width: `${((index + (submitted ? 1 : 0)) / QUIZ_LENGTH) * 100}%` }} />
        </div>
        <strong className="quiz-progress-count">{index + 1}/{QUIZ_LENGTH}</strong>
      </header>

      <article className="quiz-shell quiz-question-card">
        <div className="quiz-question-tags">
          <span className="quiz-skill"><Icon name="target" size={13} /> {question.skill}</span>
          <span className="quiz-difficulty"><Icon name="star" size={13} fill="currentColor" /> Câu {question.difficulty} sao</span>
          <span className="quiz-question-number">Câu {index + 1}</span>
        </div>
        <h1 id="quiz-play-title">{question.question}</h1>
        {question.sentence && (
          <p className="quiz-sentence">
            {sentenceParts?.[0]}
            {sentenceParts?.length === 2 && <span className="quiz-blank" aria-label="chỗ trống">?</span>}
            {sentenceParts?.[1]}
          </p>
        )}
        <SpeakButton text={speakText} label="Nghe câu hỏi" />
        <div className="quiz-options">
          {question.options.map((option, optionIndex) => (
            <button
              type="button"
              key={optionIndex}
              disabled={submitted}
              aria-pressed={selected === optionIndex}
              className={`quiz-option ${selected === optionIndex ? "quiz-option--selected" : ""} ${submitted && optionIndex === question.answer ? "quiz-option--correct" : ""} ${submitted && selected === optionIndex && !correct ? "quiz-option--wrong" : ""}`}
              onClick={() => setSelected(optionIndex)}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              <span className="quiz-option-text">{option}</span>
              {submitted && optionIndex === question.answer && <Icon name="check-circle" size={20} />}
            </button>
          ))}
        </div>
        {submitted && (
          <div className={`quiz-teacher-feedback quiz-teacher-feedback--${correct ? "good" : "retry"}`} role="status">
            <span className="quiz-teacher-avatar"><TeacherAvatar title="Cô Tú" /></span>
            <div className="quiz-teacher-bubble">
              <strong>
                {correct
                  ? (level === 3 ? "Giỏi lắm! Em đã đạt 3 sao." : `Chính xác! Em đã lên ${level} sao.`)
                  : "Không sao, mình cùng thử câu tiếp theo nhé!"}
              </strong>
              <span>{question.explanation}</span>
            </div>
          </div>
        )}
        <div className="quiz-controls">
          <span>{score} câu đúng · {submitted ? "Bấm 'Câu tiếp theo' để qua câu khác." : "Chọn đáp án rồi kiểm tra nhé."}</span>
          {submitted ? (
            <button type="button" className="pill-button" onClick={next} onPointerDown={applyRipple}>
              {index === QUIZ_LENGTH - 1 ? "Xem kết quả" : "Câu tiếp theo"} <Icon name="arrow-right" size={16} />
            </button>
          ) : (
            <button type="button" className="pill-button" disabled={selected === null} onClick={submit} onPointerDown={applyRipple}>
              Kiểm tra đáp án
            </button>
          )}
        </div>
      </article>
    </section>
  );
}
