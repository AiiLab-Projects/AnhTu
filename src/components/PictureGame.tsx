"use client";

import { useState } from "react";
import type { Lesson } from "@/content/lessons";
import { speakVietnamese } from "@/lib/speech";

type GameData = NonNullable<Lesson["game"]>;

export function PictureGame({ data }: { data: GameData }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const solved = selected === data.answer;

  function pick(index: number) {
    if (solved) return;
    void speakVietnamese(data.options[index].word);
    setSelected(index);
    if (index !== data.answer) setTried((list) => (list.includes(index) ? list : [...list, index]));
  }

  return (
    <section className="picture-game" aria-labelledby="picture-game-title">
      <span className="eyebrow">Trò chơi nhỏ</span>
      <h2 id="picture-game-title">{data.prompt}</h2>
      <div className="picture-game-grid">
        {data.options.map((option, index) => {
          const wrong = tried.includes(index);
          const right = solved && index === data.answer;
          return (
            <button key={option.word} type="button" disabled={solved || wrong}
              className={`picture-game-option${right ? " picture-game-option--correct" : ""}${wrong ? " picture-game-option--wrong" : ""}`}
              onClick={() => pick(index)}>
              <span className="picture-game-emoji" aria-hidden="true">{option.emoji}</span>
              <span className="picture-game-word">{option.word}</span>
            </button>
          );
        })}
      </div>
      <p className="picture-game-feedback" role="status">
        {solved ? data.explanation : selected !== null ? "Chưa đúng rồi, em thử tranh khác nhé!" : "Nghe cô đọc khi em bấm vào tranh."}
      </p>
    </section>
  );
}
