"use client";

import { useState } from "react";
import { glyphStrokes, markStrokes } from "@/content/letter-strokes";
import type { Lesson } from "@/content/lessons";
import { SpeakButton } from "@/components/SpeakButton";

type LetterCardData = NonNullable<Lesson["letterCard"]>;

// Điểm đặt bút = toạ độ sau chữ M đầu tiên của nét.
function startOf(path: string) {
  const match = /M\s*([\d.]+)\s+([\d.]+)/.exec(path);
  return { x: match ? Number(match[1]) : 0, y: match ? Number(match[2]) : 0 };
}

const STROKE_GAP = 1.1;

function Strokes({ strokes, run, viewBox, label, className }: { strokes: string[]; run: number; viewBox: string; label: string; className: string }) {
  return (
    <svg className={className} viewBox={viewBox} role="img" aria-label={label}>
      {strokes.map((d, index) => <path key={`guide-${index}`} d={d} className="glyph-guide" />)}
      {strokes.map((d, index) => <path key={`ink-${run}-${index}`} d={d} pathLength={1} className="glyph-ink" style={{ animationDelay: `${index * STROKE_GAP}s` }} />)}
      {strokes.map((d, index) => {
        const start = startOf(d);
        const x = Math.max(11, start.x - 11);
        const y = Math.max(11, start.y - 11);
        return (
          <g key={`badge-${run}-${index}`} className="glyph-badge" style={{ animationDelay: `${index * STROKE_GAP}s` }}>
            <circle cx={x} cy={y} r="10" />
            <text x={x} y={y + 4.5} textAnchor="middle">{index + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function LetterCard({ data }: { data: LetterCardData }) {
  const [run, setRun] = useState(0);
  const compact = data.letters.length > 2;
  return (
    <section className="letter-card" aria-labelledby="letter-card-title">
      <div className="letter-card-head">
        <div>
          <span className="eyebrow">✏️ Tập viết</span>
          <h2 id="letter-card-title">Xem chữ được viết từng nét</h2>
          <p>{data.tip}</p>
        </div>
        <button className="letter-replay" type="button" onClick={() => setRun((value) => value + 1)}>🔁 Viết lại</button>
      </div>
      <div className={`letter-pairs${compact ? " letter-pairs--compact" : ""}`}>
        {data.letters.map((letter) => (
          <div className="letter-pair" key={letter.lower}>
            <div className="letter-pair-glyphs">
              <figure><Strokes className="letter-svg" strokes={glyphStrokes[letter.upper]} run={run} viewBox="0 0 120 150" label={`Chữ ${letter.upper} in hoa`} /><figcaption>{letter.upper}</figcaption></figure>
              <figure><Strokes className="letter-svg" strokes={glyphStrokes[letter.lower]} run={run} viewBox="0 0 120 150" label={`Chữ ${letter.lower} viết thường`} /><figcaption>{letter.lower}</figcaption></figure>
            </div>
            <SpeakButton text={letter.say} label="🔊 Nghe âm" />
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
                <SpeakButton text={tone.example} label="🔊 Nghe tiếng" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
