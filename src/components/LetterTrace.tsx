"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { Lesson } from "@/content/lessons";
import { GLYPH_W, layoutWord, startOf } from "@/lib/glyph-layout";
import { celebrate } from "@/lib/confetti";
import { SpeakButton } from "@/components/SpeakButton";
import { Icon } from "@/components/Icon";

type Letters = NonNullable<Lesson["letterCard"]>["letters"];
type Point = { x: number; y: number };

// Toạ độ đều tính trong khung SVG (cao 150). Một điểm mẫu của nét được coi là "đã tô" khi nét
// của em đi qua trong bán kính COVER_R; một điểm em vẽ được coi là "đúng chỗ" khi cách nét mẫu
// không quá NEAR_R. Nét xong khi tô đủ STROKE_DONE điểm mẫu; cả chữ xong khi mọi nét xong và
// phần lớn nét vẽ nằm trên chữ (để tô bừa kín khung không được tính).
const SAMPLE_STEP = 4;
const COVER_R = 13;
const NEAR_R = 20;
const STROKE_DONE = 0.85;
const MIN_ACCURACY = 0.55;

const dist2 = (a: Point, b: Point) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

export function LetterTrace({ letters }: { letters: Letters }) {
  // Mỗi chữ có hai thẻ để tô: in hoa và viết thường.
  const items = useMemo(() => letters.flatMap((letter) => [
    { word: letter.upper, say: letter.say, label: "in hoa" },
    { word: letter.lower, say: letter.say, label: "viết thường" },
  ]), [letters]);
  const [index, setIndex] = useState(0);
  const item = items[index];
  const { width, parts } = useMemo(() => layoutWord(item.word), [item.word]);
  const guides = useMemo(() => parts.flatMap((part) => part.strokes.map((d) => ({ d, dx: part.dx }))), [parts]);

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const samples = useRef<Point[][]>([]);
  const covered = useRef<boolean[][]>([]);
  const drawing = useRef(false);
  const lastPoint = useRef<Point | undefined>(undefined);
  const counts = useRef({ total: 0, near: 0 });
  const [lines, setLines] = useState<Point[][]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "done" | "messy">("idle");

  // Lấy điểm mẫu dọc từng nét mẫu (cộng độ dời dx của chữ ghép) mỗi khi đổi chữ.
  useEffect(() => {
    samples.current = guides.map(({ dx }, i) => {
      const path = pathRefs.current[i];
      if (!path) return [];
      const length = path.getTotalLength();
      const steps = Math.max(1, Math.ceil(length / SAMPLE_STEP));
      return Array.from({ length: steps + 1 }, (_, k) => {
        const p = path.getPointAtLength((length * k) / steps);
        return { x: p.x + dx, y: p.y };
      });
    });
    covered.current = samples.current.map((list) => list.map(() => false));
    counts.current = { total: 0, near: 0 };
    setLines([]);
    setProgress(guides.map(() => 0));
    setStatus("idle");
  }, [guides]);

  const doneStrokes = progress.filter((value) => value >= STROKE_DONE).length;
  const current = progress.findIndex((value) => value < STROKE_DONE);

  function toSvg(event: PointerEvent<SVGSVGElement>): Point | null {
    const ctm = svgRef.current?.getScreenCTM();
    if (!ctm) return null;
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  // Ghi nhận một đoạn em vừa vẽ: chia nhỏ để vẽ nhanh cũng không bỏ sót điểm mẫu.
  function track(from: Point | undefined, to: Point) {
    const steps = from ? Math.max(1, Math.ceil(Math.sqrt(dist2(from, to)) / 3)) : 1;
    for (let s = 1; s <= steps; s++) {
      const t = from ? s / steps : 1;
      const p = from ? { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t } : to;
      let near = false;
      samples.current.forEach((list, i) => list.forEach((q, j) => {
        const d = dist2(p, q);
        if (d <= NEAR_R ** 2) near = true;
        if (d <= COVER_R ** 2) covered.current[i][j] = true;
      }));
      counts.current.total += 1;
      if (near) counts.current.near += 1;
    }
    setProgress(covered.current.map((list) => (list.length ? list.filter(Boolean).length / list.length : 1)));
  }

  function down(event: PointerEvent<SVGSVGElement>) {
    if (status === "done") return;
    const p = toSvg(event);
    if (!p) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    lastPoint.current = p;
    setStatus("idle");
    setLines((prev) => [...prev, [p]]);
    track(undefined, p);
  }

  function move(event: PointerEvent<SVGSVGElement>) {
    if (!drawing.current) return;
    const p = toSvg(event);
    if (!p) return;
    track(lastPoint.current, p);
    lastPoint.current = p;
    setLines((prev) => [...prev.slice(0, -1), [...prev[prev.length - 1], p]]);
  }

  function up() {
    if (!drawing.current) return;
    drawing.current = false;
    const allDone = covered.current.every((list) => !list.length || list.filter(Boolean).length / list.length >= STROKE_DONE);
    if (!allDone) return;
    const accuracy = counts.current.total ? counts.current.near / counts.current.total : 0;
    if (accuracy >= MIN_ACCURACY) {
      setStatus("done");
      void celebrate("lesson");
    } else {
      setStatus("messy");
    }
  }

  function clear() {
    covered.current = samples.current.map((list) => list.map(() => false));
    counts.current = { total: 0, near: 0 };
    setLines([]);
    setProgress(guides.map(() => 0));
    setStatus("idle");
  }

  const start = current >= 0 ? startOf(guides[current].d) : null;

  return (
    <div className="trace">
      <div className="trace-picker" role="tablist" aria-label="Chọn chữ để tô">
        {items.map((entry, i) => (
          <button
            key={`${entry.word}-${i}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Tô chữ ${entry.word} ${entry.label}`}
            className={`trace-chip${i === index ? " trace-chip--active" : ""}`}
            onClick={() => setIndex(i)}
          >
            {entry.word}
          </button>
        ))}
      </div>

      <div className="trace-stage">
        <svg
          ref={svgRef}
          className="trace-svg"
          viewBox={`0 0 ${width} 150`}
          style={{ "--glyph-w": width / GLYPH_W } as CSSProperties}
          role="img"
          aria-label={`Khung tô chữ ${item.word}. Dùng ngón tay hoặc chuột tô theo nét sáng màu.`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          {guides.map(({ d, dx }, i) => (
            <path
              key={`${item.word}-${i}`}
              ref={(el) => { pathRefs.current[i] = el; }}
              d={d}
              transform={dx ? `translate(${dx} 0)` : undefined}
              className={`trace-guide${progress[i] >= STROKE_DONE ? " trace-guide--done" : i === current ? " trace-guide--current" : ""}`}
            />
          ))}
          {lines.map((line, i) => (
            <path key={i} className="trace-ink" d={line.map((p, k) => `${k ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")} />
          ))}
          {start && status !== "done" && (
            <g className="trace-start" transform={`translate(${start.x + guides[current].dx} ${start.y})`}>
              <circle r="9" />
              <text y="4" textAnchor="middle">{current + 1}</text>
            </g>
          )}
        </svg>
      </div>

      <div className="trace-status" aria-live="polite">
        {status === "done" ? (
          <p className="trace-msg trace-msg--good"><Icon name="check-circle" size={20} /> Giỏi lắm! Em tô xong chữ {item.word} rồi.</p>
        ) : status === "messy" ? (
          <p className="trace-msg trace-msg--retry"><Icon name="lightbulb" size={20} /> Em tô hơi lệch ra ngoài chữ. Bấm Tô lại rồi đi chậm theo nét nhé!</p>
        ) : (
          <p className="trace-msg">
            <Icon name="pencil" size={18} /> Nét {Math.min(doneStrokes + 1, guides.length)}/{guides.length}: đặt tay vào chấm số {current + 1}, tô theo nét sáng màu.
          </p>
        )}
      </div>

      <div className="trace-actions">
        <SpeakButton text={item.say} label="Nghe âm" />
        <button type="button" className="trace-button trace-button--ghost" onClick={clear} disabled={!lines.length}><Icon name="x" size={16} /> Tô lại</button>
        {status === "done" && index < items.length - 1 && (
          <button type="button" className="trace-button" onClick={() => setIndex(index + 1)}>Tô chữ tiếp <Icon name="arrow-right" size={16} /></button>
        )}
      </div>
    </div>
  );
}
