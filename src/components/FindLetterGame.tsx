"use client";

import { useState } from "react";
import type { Lesson } from "@/content/lessons";
import { speakVietnamese } from "@/lib/speech";

type FindData = NonNullable<Lesson["findLetter"]>;

export function FindLetterGame({ data }: { data: FindData }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const targets = data.words.filter((item) => item.has).map((item) => item.word);
  const missed = targets.filter((word) => !picked.includes(word));
  const wrongPicks = picked.filter((word) => !targets.includes(word));
  const solved = checked && missed.length === 0 && wrongPicks.length === 0;

  function toggle(word: string) {
    if (solved) return;
    void speakVietnamese(word);
    setChecked(false);
    setPicked((list) => (list.includes(word) ? list.filter((item) => item !== word) : [...list, word]));
  }

  return (
    <section className="find-letter" aria-labelledby="find-letter-title">
      <div className="find-letter-head">
        <div>
          <span className="eyebrow">Trò chơi</span>
          <h2 id="find-letter-title">{data.title}</h2>
          <p>{data.note}</p>
        </div>
        {data.image && <img className="find-letter-image" src={data.image} alt={data.imageAlt ?? ""} />}
      </div>
      <ul className="find-letter-eggs">
        {data.words.map((item) => {
          const on = picked.includes(item.word);
          const state = checked ? (on && item.has ? " find-egg--right" : on ? " find-egg--wrong" : item.has ? " find-egg--missed" : "") : "";
          return (
            <li key={item.word}>
              <button type="button" className={`find-egg${on ? " find-egg--on" : ""}${state}`} aria-pressed={on} onClick={() => toggle(item.word)}>
                <span className="find-egg-shell" aria-hidden="true">🥚</span>
                <span className="find-egg-word">{item.word}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="find-letter-actions">
        <button type="button" className="find-letter-check" disabled={picked.length === 0 || solved} onClick={() => setChecked(true)}>Kiểm tra</button>
        <p className="find-letter-feedback" role="status">
          {solved
            ? "Giỏi quá! Em đã tìm đủ các tiếng có chữ a."
            : checked
              ? wrongPicks.length > 0
                ? "Có trứng chưa đúng. Em nghe lại rồi tìm chữ a trong tiếng nhé."
                : "Còn trứng có chữ a em chưa chọn. Em tìm thêm nhé!"
              : "Bấm vào trứng để nghe cô đọc và chọn."}
        </p>
      </div>
    </section>
  );
}
