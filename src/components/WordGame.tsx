"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw, SkipForward } from "lucide-react";
import { wordExercises } from "@/content/questions";
import { readProgress, saveProgress } from "@/lib/progress";
import { SpeakButton } from "@/components/SpeakButton";

export function WordGame() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = wordExercises[round];
  const word = selected.map((index) => item.letters[index]).join("");
  const full = selected.length === item.letters.length;
  const correct = full && word === item.answer;
  const wrong = full && !correct;

  function add(index: number) {
    if (selected.includes(index) || correct) return;
    setSelected([...selected, index]);
  }

  function remove(position: number) {
    if (correct) return;
    setSelected(selected.filter((_, index) => index !== position));
  }

  function next() {
    const nextScore = score + (correct ? 1 : 0);
    setScore(nextScore);
    if (round === wordExercises.length - 1) {
      setDone(true);
      saveProgress({ exerciseBest: Math.max(readProgress().exerciseBest, nextScore) });
    } else {
      setRound(round + 1);
      setSelected([]);
    }
  }

  function restart() {
    setRound(0);
    setSelected([]);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <section className="activity-card game-result" aria-live="polite">
        <div className="result-emoji">🏅</div>
        <span className="eyebrow">Hoàn thành bài tập</span>
        <h2>Giỏi lắm, em ơi!</h2>
        <p>Em ghép đúng <strong>{score}/{wordExercises.length}</strong> từ. Mỗi lần luyện là thêm một lần nhớ chữ nhé!</p>
        <div className="result-actions"><button type="button" className="pill-button" onClick={restart}>↻ Chơi lại</button><Link className="pill-button pill-button--light" href="/kiem-tra">Làm kiểm tra →</Link></div>
      </section>
    );
  }

  return (
    <section className="activity-card word-game" aria-labelledby="word-game-title">
      <div className="activity-heading">
        <div className="activity-icon">🔤</div>
        <div><span className="activity-tag">Luyện tập · Từ vựng & chính tả</span><h2 id="word-game-title">Ghép chữ thành từ</h2></div>
      </div>
      <p className="activity-description">Nhìn hình, xếp các chữ cái lộn xộn thành từ đúng nha! Mỗi lượt một từ.</p>
      <div className="game-meta"><span>Từ <strong>{round + 1}/{wordExercises.length}</strong></span><span>⭐ {score}</span></div>
      <div className="game-emoji" aria-label={item.hint}>{item.emoji}</div>
      <p className="game-hint">{item.hint} <SpeakButton text={item.hint} label="🔊" /></p>
      <div className="word-slots" aria-label="Từ đang ghép">
        {Array.from({ length: item.letters.length }).map((_, index) => (
          <button key={index} className={`word-slot ${selected[index] !== undefined ? "word-slot--filled" : ""}`} type="button" onClick={() => remove(index)} aria-label={selected[index] !== undefined ? `Bỏ chữ ${item.letters[selected[index]]}` : `Ô chữ ${index + 1} trống`}>
            {selected[index] !== undefined ? item.letters[selected[index]] : ""}
          </button>
        ))}
      </div>
      <div className="letter-tray" aria-label="Chọn chữ cái">
        {item.letters.map((letter, index) => (
          <button key={index} type="button" disabled={selected.includes(index) || correct} onClick={() => add(index)} aria-label={`Chọn chữ ${letter}`}>{letter}</button>
        ))}
      </div>
      {correct && <div className="feedback feedback--good" role="status"><strong>Đúng rồi! 🎉</strong> Em đã ghép thành từ “{item.answer}”.</div>}
      {wrong && <div className="feedback feedback--retry" role="status"><strong>Chưa đúng rồi.</strong> Em thử xếp lại nhé!</div>}
      <div className="game-actions">
        <button type="button" onClick={() => setSelected([])} disabled={selected.length === 0 || correct}><RotateCcw size={18} /> Xóa hết</button>
        <button type="button" onClick={next} className={correct ? "game-next game-next--ready" : "game-next"}>{correct ? (round === wordExercises.length - 1 ? "Xem kết quả →" : "Từ tiếp theo →") : <><SkipForward size={18} /> Bỏ qua</>}</button>
      </div>
    </section>
  );
}
