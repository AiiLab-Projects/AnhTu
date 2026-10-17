"use client";

import { useState, type CSSProperties } from "react";
import { markStrokes } from "@/content/letter-strokes";
import { GLYPH_W, layoutWord, startOf } from "@/lib/glyph-layout";
import type { Lesson } from "@/content/lessons";
import { SpeakButton } from "@/components/SpeakButton";
import { Icon } from "@/components/Icon";
import { LetterTrace } from "@/components/LetterTrace";

type LetterCardData = NonNullable<Lesson["letterCard"]>;

const STROKE_GAP = 1.1;

function Strokes({ strokes, run, viewBox, label, className }: { strokes: string[]; run: number; viewBox: string; label: string; className: string }) {
  return (
    <svg className={className} viewBox={viewBox} role="img" aria-label={label}>
      <StrokeGroup strokes={strokes} run={run} first={0} />
    </svg>
  );
}

function StrokeGroup({ strokes, run, first, dx = 0 }: { strokes: string[]; run: number; first: number; dx?: number }) {
  return (
    <g transform={dx ? `translate(${dx} 0)` : undefined}>
      {strokes.map((d, index) => <path key={`guide-${index}`} d={d} className="glyph-guide" />)}
      {strokes.map((d, index) => <path key={`ink-${run}-${index}`} d={d} pathLength={1} className="glyph-ink" style={{ animationDelay: `${(first + index) * STROKE_GAP}s` }} />)}
      {strokes.map((d, index) => {
        const start = startOf(d);
        const x = Math.max(11, start.x - 11);
        const y = Math.max(11, start.y - 11);
        return (
          <g key={`badge-${run}-${index}`} className="glyph-badge" style={{ animationDelay: `${(first + index) * STROKE_GAP}s` }}>
            <circle cx={x} cy={y} r="10" />
            <text x={x} y={y + 4.5} textAnchor="middle">{first + index + 1}</text>
          </g>
        );
      })}
    </g>
  );
}

// --glyph-w = bề ngang so với một chữ đơn; CSS dùng để chữ ghép rộng ra mà vẫn cao bằng chữ đơn.
function WordGlyph({ word, run, label }: { word: string; run: number; label: string }) {
  const { width, parts } = layoutWord(word);
  let first = 0;
  return (
    <figure style={{ "--glyph-w": width / GLYPH_W } as CSSProperties}>
    <svg className="letter-svg" viewBox={`0 0 ${width} 150`} role="img" aria-label={label}>
      {parts.map((part, index) => {
        const group = <StrokeGroup key={index} strokes={part.strokes} run={run} first={first} dx={part.dx} />;
        first += part.strokes.length;
        return group;
      })}
    </svg>
    <figcaption>{word}</figcaption>
    </figure>
  );
}

export function LetterCard({ data }: { data: LetterCardData }) {
  const [run, setRun] = useState(0);
  const [mode, setMode] = useState<"watch" | "trace">("watch");
  const compact = data.letters.length > 2;
  return (
    <section className="letter-card" aria-labelledby="letter-card-title">
      <div className="letter-card-head">
        <div>
          <span className="eyebrow">Tập viết</span>
          <h2 id="letter-card-title">{mode === "watch" ? "Xem chữ được viết từng nét" : "Em tô theo chữ mẫu"}</h2>
          <p>{mode === "watch" ? data.tip : "Đặt ngón tay vào chấm số 1 rồi tô theo nét sáng màu. Tô xong một nét thì nét tiếp theo sẽ sáng lên."}</p>
        </div>
        {mode === "watch" && <button className="letter-replay" type="button" onClick={() => setRun((value) => value + 1)}><Icon name="play" size={16} /> Viết lại</button>}
      </div>
      <div className="letter-mode" role="tablist" aria-label="Cách tập viết">
        <button type="button" role="tab" aria-selected={mode === "watch"} className={`letter-mode-tab${mode === "watch" ? " letter-mode-tab--active" : ""}`} onClick={() => setMode("watch")}><Icon name="play" size={16} /> Xem cô viết</button>
        <button type="button" role="tab" aria-selected={mode === "trace"} className={`letter-mode-tab${mode === "trace" ? " letter-mode-tab--active" : ""}`} onClick={() => setMode("trace")}><Icon name="pencil" size={16} /> Em tô theo</button>
      </div>
      {mode === "trace" ? <LetterTrace letters={data.letters} /> : <>
      <div className={`letter-pairs${compact ? " letter-pairs--compact" : ""}`}>
        {data.letters.map((letter) => (
          <div className="letter-pair" key={letter.lower}>
            <div className="letter-pair-glyphs">
              <WordGlyph word={letter.upper} run={run} label={`Chữ ${letter.upper} in hoa`} />
              <WordGlyph word={letter.lower} run={run} label={`Chữ ${letter.lower} viết thường`} />
            </div>
            <SpeakButton text={letter.say} label="Nghe âm" />
          </div>
        ))}
      </div>
      {data.toneMarks && (
        <div className="tone-marks">
          {data.toneMarks.map((tone) => (
            <div className="tone-mark" key={tone.mark}>
              <Strokes className="tone-svg" strokes={markStrokes[tone.mark]} run={run} viewBox="0 0 100 80" label={tone.name} />
              <div className="tone-mark-text">
                <strong>{tone.name}</strong>
                <span>{tone.tip}</span>
                <span className="tone-mark-word">{tone.example}</span>
                <SpeakButton text={tone.example} label="Nghe tiếng" />
              </div>
            </div>
          ))}
        </div>
      )}
      </>}
    </section>
  );
}
