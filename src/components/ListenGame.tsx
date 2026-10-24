"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { listenWords } from "@/content/listen-words";
import { hasRecordedClip, speakVietnamese } from "@/lib/speech";
import { celebrate } from "@/lib/confetti";
import { Icon } from "@/components/Icon";
import { RewardModal } from "@/components/RewardModal";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { applyRipple } from "@/components/effects";
import { GameProgress } from "@/components/GameProgress";

const ROUNDS = 10;
const OPTIONS = 4;
type Word = (typeof listenWords)[number];
type Round = { target: Word; options: Word[] };

function shuffle<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Từ được đọc: chỉ những từ đã có ghi âm. Tranh nhiễu: lấy từ cả ngân hàng, không trùng tranh.
function buildRounds(): Round[] {
  const spoken = shuffle(listenWords.filter((item) => hasRecordedClip(item.word))).slice(0, ROUNDS);
  return spoken.map((target) => {
    const others = shuffle(listenWords.filter((item) => item.word !== target.word && item.emoji !== target.emoji)).slice(0, OPTIONS - 1);
    return { target, options: shuffle([target, ...others]) };
  });
}

export function ListenGame() {
  // Xáo trộn sau khi mount để HTML xuất tĩnh và lần render đầu ở trình duyệt khớp nhau.
  const [rounds, setRounds] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<("good" | "skip")[]>([]);
  const [done, setDone] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setRounds(buildRounds()); }, []);

  const current = rounds[round];
  const answered = picked !== null;
  const correct = answered && current?.options[picked].word === current.target.word;
  const score = results.filter((result) => result === "good").length;

  const play = useCallback(() => {
    if (!current) return;
    setPlaying(true);
    void speakVietnamese(current.target.word).finally(() => window.setTimeout(() => setPlaying(false), 900));
  }, [current]);

  // Mỗi câu mới Cô Tú tự đọc một lần (em đã bấm "Chơi ngay"/"Câu tiếp theo" nên trình duyệt cho phát).
  useEffect(() => { if (current && !done) play(); }, [round, rounds, done]); // eslint-disable-line react-hooks/exhaustive-deps

  function choose(index: number) {
    if (answered || !current) return;
    setPicked(index);
    const good = current.options[index].word === current.target.word;
    setResults((prev) => [...prev, good ? "good" : "skip"]);
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

  if (!current) return <section className="word-game word-game--v3 listen-game" aria-busy="true" />;

  if (done) {
    return (
      <>
        <section className="word-game-finish" aria-live="polite">
          <img className="quiz-result-mascot" src="/img/06-star-mascot-v2.webp" alt="" width={160} height={160} decoding="async" />
          <span className="eyebrow">Hoàn thành trò chơi</span>
          <h2>Đôi tai giỏi quá!</h2>
          <p>Em chọn đúng <strong>{score}/{rounds.length}</strong> tranh. Nghe kĩ là đọc giỏi đó em!</p>
          <div className="result-actions">
            <button type="button" className="pill-button" onClick={restart}>Chơi lại</button>
            <Link className="pill-button pill-button--light" href="/bai-hoc">Học bài mới <Icon name="arrow-right" size={16} /></Link>
          </div>
        </section>
        <RewardModal
          open={showFinish}
          onClose={() => setShowFinish(false)}
          variant="complete"
          title={score === rounds.length ? "Xuất sắc!" : score >= 7 ? "Giỏi lắm, em ơi!" : "Em đã hoàn thành rồi!"}
          message={<>Em chọn đúng <strong>{score}/{rounds.length}</strong> tranh.</>}
          stars={{ earned: Math.min(3, Math.max(1, Math.ceil((score / rounds.length) * 3))), max: 3 }}
          primaryAction={{ label: "Chơi lại", onClick: restart }}
          secondaryAction={{ label: "Học bài mới", href: "/bai-hoc" }}
        />
      </>
    );
  }

  return (
    <section className="word-game word-game--v3 listen-game" aria-labelledby="listen-title">
      <GameProgress round={round} total={rounds.length} results={results} title="Nghe và chọn tranh" />

      <div className="listen-stage">
        <button type="button" className={`listen-play${playing ? " listen-play--playing" : ""}`} onClick={play} aria-label="Nghe Cô Tú đọc từ">
          <Icon name="speaker" size={44} />
        </button>
        <div className="listen-stage-text">
          <h2 id="listen-title">Cô đọc từ gì nhỉ?</h2>
          <p>Bấm loa để nghe lại, rồi chọn tranh đúng nhé!</p>
        </div>
      </div>

      <div className="listen-options" role="group" aria-label="Chọn tranh">
        {current.options.map((option, index) => {
          const isTarget = option.word === current.target.word;
          const state = !answered ? "" : isTarget ? " listen-option--correct" : index === picked ? " listen-option--wrong" : " listen-option--dim";
          return (
            <button
              key={option.word}
              type="button"
              className={`listen-option${state}`}
              onClick={() => choose(index)}
              disabled={answered}
              aria-label={answered ? option.word : `Tranh ${index + 1}`}
            >
              <span className="listen-option-emoji" aria-hidden="true">{option.emoji}</span>
              {answered && <span className="listen-option-word">{option.word}</span>}
              {answered && isTarget && <span className="listen-option-badge"><Icon name="check" size={16} /></span>}
            </button>
          );
        })}
      </div>

      <div className="listen-footer" aria-live="polite">
        {answered ? (
          <div className={`quiz-teacher-feedback quiz-teacher-feedback--${correct ? "good" : "retry"}`} role="status">
            <span className="quiz-teacher-avatar"><TeacherAvatar title="Cô Tú" /></span>
            <div className="quiz-teacher-bubble">
              <strong>{correct ? "Đúng rồi! Em nghe giỏi quá." : "Chưa đúng rồi, không sao nhé!"}</strong>
              <span>Cô đọc từ “{current.target.word}”.</span>
            </div>
          </div>
        ) : (
          <p className="listen-hint"><Icon name="lightbulb" size={16} /> Nghe chưa rõ thì em bấm loa thêm lần nữa.</p>
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
