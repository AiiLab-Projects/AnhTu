"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { wordExercises } from "@/content/questions";
import { readProgress, saveProgress } from "@/lib/progress";
import { SpeakButton } from "@/components/SpeakButton";
import { Icon } from "@/components/Icon";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { RewardModal } from "@/components/RewardModal";
import { celebrate } from "@/lib/confetti";
import { applyRipple } from "@/components/effects";

const ROUNDS_PER_RUN = 10;

// Chọn ngẫu nhiên N từ không trùng trong bank. Fisher-Yates partial shuffle.
function pickRoundItems(count = ROUNDS_PER_RUN): typeof wordExercises[number][] {
  const pool = [...wordExercises];
  const picked: typeof wordExercises[number][] = [];
  const take = Math.min(count, pool.length);
  for (let i = 0; i < take; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

export function WordGame() {
  // Chọn 10 từ random ngay khi mount, random lại khi restart.
  const [items, setItems] = useState<typeof wordExercises[number][]>(() => pickRoundItems());
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<("good" | "skip")[]>([]);
  const [showFinish, setShowFinish] = useState(false);
  const [shake, setShake] = useState(false);
  const shakeTimer = useRef<number | null>(null);

  const item = items[round];
  const word = selected.map((index) => item.letters[index]).join("");
  const full = selected.length === item.letters.length;
  const correct = full && word === item.answer;
  const wrong = full && !correct;

  // Khi điền đủ ô mà sai → rung ô chữ 1 nhịp (không xoá dữ liệu, giữ logic hiện tại).
  useEffect(() => {
    if (!wrong) return;
    setShake(true);
    if (shakeTimer.current) window.clearTimeout(shakeTimer.current);
    shakeTimer.current = window.setTimeout(() => setShake(false), 420);
    return () => { if (shakeTimer.current) window.clearTimeout(shakeTimer.current); };
  }, [wrong, round]);

  function add(index: number) {
    if (selected.includes(index) || correct) return;
    setSelected([...selected, index]);
  }

  function remove(position: number) {
    if (correct) return;
    setSelected(selected.filter((_, index) => index !== position));
  }

  function clearAll() { if (!correct) setSelected([]); }

  function next() {
    const nextScore = score + (correct ? 1 : 0);
    setScore(nextScore);
    setResults([...results, correct ? "good" : "skip"]);
    if (round === items.length - 1) {
      setDone(true);
      setShowFinish(true);
      saveProgress({ exerciseBest: Math.max(readProgress().exerciseBest, nextScore) });
      void celebrate("exercise");
    } else {
      setRound(round + 1);
      setSelected([]);
    }
  }

  function restart() {
    setItems(pickRoundItems());
    setRound(0);
    setSelected([]);
    setScore(0);
    setResults([]);
    setDone(false);
    setShowFinish(false);
  }

  const progressPercent = Math.round(((round + (done ? 1 : 0)) / items.length) * 100);

  // Màn hình kết quả: nền + mascot + CTA. Modal RewardModal phủ lên, có thể đóng lại.
  if (done) {
    return (
      <>
        <section className="word-game-finish" aria-live="polite">
          <img className="quiz-result-mascot" src="/img/06-star-mascot-v2.webp" alt="" width={160} height={160} decoding="async" />
          <span className="eyebrow">Hoàn thành bài tập</span>
          <h2>Giỏi lắm, em ơi!</h2>
          <p>Em ghép đúng <strong>{score}/{items.length}</strong> từ. Mỗi lần luyện là thêm một lần nhớ chữ nhé!</p>
          <div className="result-actions">
            <button type="button" className="pill-button" onClick={restart}>Chơi lại</button>
            <Link className="pill-button pill-button--light" href="/tien-do">Xem tiến độ <Icon name="arrow-right" size={16} /></Link>
          </div>
        </section>
        <RewardModal
          open={showFinish}
          onClose={() => setShowFinish(false)}
          variant="complete"
          title={score === items.length ? "Xuất sắc!" : score >= 7 ? "Giỏi lắm, em ơi!" : "Em đã hoàn thành rồi!"}
          message={<>Em ghép đúng <strong>{score}/{items.length}</strong> từ.</>}
          stars={{ earned: Math.min(3, Math.max(1, Math.ceil((score / items.length) * 3))), max: 3 }}
          primaryAction={{ label: "Chơi lại", onClick: restart }}
          secondaryAction={{ label: "Xem tiến độ", href: "/tien-do" }}
        />
      </>
    );
  }

  return (
    <section className="word-game word-game--v3" aria-labelledby="word-game-title">
      <header className="word-game-progress">
        <div className="word-game-progress-label">
          <strong>Câu {round + 1}/{items.length}</strong>
          <span>Ghép chữ tiếng Việt</span>
        </div>
        <div
          className="word-game-progress-bar"
          role="progressbar"
          aria-label="Tiến trình 10 câu"
          aria-valuenow={round + 1}
          aria-valuemin={1}
          aria-valuemax={items.length}
        >
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="word-game-progress-score" aria-label={`${score} câu đúng`}>
          <Icon name="star" size={16} fill="currentColor" />
          <strong>{score}</strong>
        </div>
      </header>

      <div className="word-game-board">
        <aside className="word-game-visual" aria-hidden="true">
          <div className="word-game-visual-frame">
            <span className="word-game-visual-emoji">{item.emoji}</span>
            <span className="word-game-visual-spark word-game-visual-spark--a"><Icon name="star" size={16} fill="currentColor" /></span>
            <span className="word-game-visual-spark word-game-visual-spark--b"><Icon name="sparkles" size={14} /></span>
          </div>
          <p className="word-game-hint-text" aria-hidden="true">{item.hint}</p>
          <SpeakButton text={item.hint} label="Nghe gợi ý" />
        </aside>

        <section className="word-game-play" aria-labelledby="word-game-play-title">
          <h2 className="word-game-play-title" id="word-game-play-title">Xếp các chữ thành từ đúng!</h2>
          <p className="word-game-play-hint" id="word-game-title">
            <Icon name="lightbulb" size={16} /> {item.hint}
          </p>
          <div
            className={`word-slots${shake ? " word-slots--shake" : ""}${correct ? " word-slots--correct" : ""}`}
            aria-label="Từ đang ghép"
          >
            {Array.from({ length: item.letters.length }).map((_, index) => {
              const value = selected[index];
              const filled = value !== undefined;
              return (
                <button
                  key={index}
                  className={`word-slot${filled ? " word-slot--filled" : ""}`}
                  type="button"
                  onClick={() => remove(index)}
                  disabled={!filled && correct}
                  aria-label={filled ? `Bỏ chữ ${item.letters[value]}` : `Ô chữ ${index + 1} còn trống`}
                >
                  {filled ? item.letters[value] : ""}
                </button>
              );
            })}
          </div>

          <div className="letter-tray" aria-label="Chọn chữ cái">
            {item.letters.map((letter, index) => (
              <button
                key={index}
                type="button"
                disabled={selected.includes(index) || correct}
                onClick={() => add(index)}
                aria-label={`Chọn chữ ${letter}`}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="word-game-feedback" aria-live="polite">
            {correct && (
              <div className="feedback feedback--good" role="status">
                <Icon name="check-circle" size={20} />
                <span><strong>Giỏi lắm!</strong> Em đã ghép thành từ "{item.answer}".</span>
              </div>
            )}
            {wrong && (
              <div className="feedback feedback--retry" role="status">
                <Icon name="lightbulb" size={20} />
                <span><strong>Chưa đúng rồi.</strong> Em bấm vào ô chữ sai để trả lại, rồi thử lại nhé!</span>
              </div>
            )}
          </div>

          <div className="word-game-actions">
            <button
              type="button"
              className="word-game-action word-game-action--ghost"
              onClick={clearAll}
              onPointerDown={applyRipple}
              disabled={selected.length === 0 || correct}
            >
              <Icon name="x" size={16} /> Xóa hết
            </button>
            <button
              type="button"
              className={`word-game-action${correct ? " word-game-action--primary" : " word-game-action--neutral"}`}
              onClick={next}
              onPointerDown={applyRipple}
            >
              {correct
                ? (round === items.length - 1 ? "Xem kết quả" : "Từ tiếp theo")
                : "Bỏ qua"}
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </section>
      </div>

      <aside className="word-game-tip" aria-label="Mẹo của Cô">
        <span className="word-game-tip-avatar"><TeacherAvatar title="Cô Tú" /></span>
        <div className="word-game-tip-bubble">
          <strong>Mẹo của Cô Tú:</strong> Bấm nút loa để nghe gợi ý. Lỡ chọn nhầm chữ thì em bấm vào ô chữ đó để trả về khay nhé!
        </div>
      </aside>
    </section>
  );
}
