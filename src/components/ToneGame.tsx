"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toneWords } from "@/content/tone-words";
import { TONES, splitTone, withTone, addTone, type ToneId } from "@/lib/tones";
import { hasRecordedClip, speakVietnamese } from "@/lib/speech";
import { celebrate } from "@/lib/confetti";
import { Icon } from "@/components/Icon";
import { RewardModal } from "@/components/RewardModal";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { GameProgress } from "@/components/GameProgress";
import { applyRipple } from "@/components/effects";

const ROUNDS = 10;
type Word = (typeof toneWords)[number];

function shuffle<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Lấy lần lượt từng dấu thanh để một lượt có đủ các dấu, rồi xáo thứ tự câu.
function buildRounds(): Word[] {
  const groups = TONES.map((tone) => shuffle(toneWords.filter((item) => splitTone(item.word).tone === tone.id)));
  const picked: Word[] = [];
  for (let i = 0; picked.length < ROUNDS && groups.some((group) => group.length > i); i++) {
    for (const group of shuffle(groups)) if (group[i] && picked.length < ROUNDS) picked.push(group[i]);
  }
  return shuffle(picked);
}

const toneName = (id: ToneId) => TONES.find((tone) => tone.id === id)?.name ?? "";

export function ToneGame() {
  // Xáo trộn sau khi mount để HTML xuất tĩnh và lần render đầu ở trình duyệt khớp nhau.
  const [rounds, setRounds] = useState<Word[]>([]);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<ToneId | null>(null);
  const [results, setResults] = useState<("good" | "skip")[]>([]);
  const [done, setDone] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => { setRounds(buildRounds()); }, []);

  const item = rounds[round];
  if (!item) return <section className="word-game word-game--v3 tone-game" aria-busy="true" />;

  const { base, at, tone } = splitTone(item.word);
  const answered = picked !== null;
  const correct = picked === tone;
  const score = results.filter((result) => result === "good").length;
  const recorded = hasRecordedClip(item.word);

  function choose(id: ToneId) {
    if (answered) return;
    setPicked(id);
    setResults((prev) => [...prev, id === tone ? "good" : "skip"]);
    if (recorded) void speakVietnamese(item.word);
  }

  function next() {
    if (round === rounds.length - 1) {
      setDone(true);
      setShowFinish(true);
      void celebrate("exercise");
      return;
    }
    setRound(round + 1);
    setPicked(null);
  }

  function restart() {
    setRounds(buildRounds());
    setRound(0);
    setPicked(null);
    setResults([]);
    setDone(false);
    setShowFinish(false);
  }

  if (done) {
    return (
      <>
        <section className="word-game-finish" aria-live="polite">
          <img className="quiz-result-mascot" src="/img/06-star-mascot-v2.webp" alt="" width={160} height={160} decoding="async" />
          <span className="eyebrow">Hoàn thành trò chơi</span>
          <h2>Em đặt dấu giỏi quá!</h2>
          <p>Em đặt đúng <strong>{score}/{rounds.length}</strong> dấu thanh. Nhìn dấu là đọc đúng tiếng đó em!</p>
          <div className="result-actions">
            <button type="button" className="pill-button" onClick={restart}>Chơi lại</button>
            <Link className="pill-button pill-button--light" href="/bai-hoc/sau-dau-thanh">Ôn 6 dấu thanh <Icon name="arrow-right" size={16} /></Link>
          </div>
        </section>
        <RewardModal
          open={showFinish}
          onClose={() => setShowFinish(false)}
          variant="complete"
          title={score === rounds.length ? "Xuất sắc!" : score >= 7 ? "Giỏi lắm, em ơi!" : "Em đã hoàn thành rồi!"}
          message={<>Em đặt đúng <strong>{score}/{rounds.length}</strong> dấu thanh.</>}
          stars={{ earned: Math.min(3, Math.max(1, Math.ceil((score / rounds.length) * 3))), max: 3 }}
          primaryAction={{ label: "Chơi lại", onClick: restart }}
          secondaryAction={{ label: "Ôn 6 dấu thanh", href: "/bai-hoc/sau-dau-thanh" }}
        />
      </>
    );
  }

  // Trước khi chọn: tiếng không dấu, ô "?" trên chữ cần đặt dấu. Sau khi chọn: tiếng đúng dấu.
  const shown = answered ? [...item.word.normalize("NFC")] : base;

  return (
    <section className="word-game word-game--v3 tone-game" aria-labelledby="tone-title">
      <GameProgress round={round} total={rounds.length} results={results} title="Đặt dấu thanh" />

      <div className="tone-stage">
        <div className="tone-picture" aria-hidden="true">{item.emoji}</div>
        <div className="tone-word-wrap">
          <h2 id="tone-title" className="tone-question">Tiếng này cần dấu gì?</h2>
          <p className={`tone-word${answered ? (correct ? " tone-word--good" : " tone-word--retry") : ""}`} aria-label={answered ? item.word : `${base.join("")}, chưa có dấu`}>
            {shown.map((char, i) => (
              <span key={i} className={i === at ? "tone-word-slot" : undefined}>
                {char}
                {i === at && !answered && <span className="tone-word-q" aria-hidden="true">?</span>}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="tone-options" role="group" aria-label="Chọn dấu thanh">
        {TONES.map((option) => {
          const state = !answered ? "" : option.id === tone ? " tone-option--correct" : option.id === picked ? " tone-option--wrong" : " tone-option--dim";
          return (
            <button key={option.id} type="button" className={`tone-option${state}`} onClick={() => choose(option.id)} disabled={answered} aria-label={`Dấu ${option.name}`}>
              <span className="tone-option-mark" aria-hidden="true">{addTone("a", option.id)}</span>
              <span className="tone-option-name">{option.name}</span>
            </button>
          );
        })}
      </div>

      <div className="listen-footer" aria-live="polite">
        {answered ? (
          <div className={`quiz-teacher-feedback quiz-teacher-feedback--${correct ? "good" : "retry"}`} role="status">
            <span className="quiz-teacher-avatar"><TeacherAvatar title="Cô Tú" /></span>
            <div className="quiz-teacher-bubble">
              <strong>{correct ? "Đúng rồi! Em đặt dấu giỏi quá." : picked ? `Chưa đúng rồi, em chọn dấu ${toneName(picked).toLowerCase()} thành “${withTone(item.word, picked)}”.` : ""}</strong>
              <span>“{item.word}” {tone === "ngang" ? "không có dấu (thanh ngang)." : `có dấu ${toneName(tone).toLowerCase()}.`}</span>
            </div>
          </div>
        ) : (
          <p className="listen-hint"><Icon name="lightbulb" size={16} /> Nhìn tranh, đọc thầm tiếng rồi chọn dấu thanh nhé.</p>
        )}
        {answered && (
          <button type="button" className="word-game-action word-game-action--primary" onClick={next} onPointerDown={applyRipple}>
            {round === rounds.length - 1 ? "Xem kết quả" : "Câu tiếp theo"} <Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    </section>
  );
}
