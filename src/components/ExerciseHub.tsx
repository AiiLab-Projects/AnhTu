"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { exerciseTypes, type ExerciseType } from "@/content/exercise-types";
import { WordGame } from "@/components/WordGame";
import { Icon } from "@/components/Icon";

// Component của từng trò, theo `id` trong exercise-types.ts.
const GAMES: Record<string, ComponentType> = {
  "ghep-chu": WordGame,
};

const readyTypes = exerciseTypes.filter((type) => type.status === "ready" && GAMES[type.id]);

function ExerciseArt({ type }: { type: ExerciseType }) {
  return (
    <span className="exercise-art" aria-hidden="true">
      {type.image ? <img src={type.image} alt="" width={320} height={240} decoding="async" /> : <span className="exercise-art-emoji">{type.emoji}</span>}
    </span>
  );
}

function ExerciseTile({ type, onPick }: { type: ExerciseType; onPick: (id: string) => void }) {
  const ready = type.status === "ready" && Boolean(GAMES[type.id]);
  return (
    <button
      type="button"
      className={`exercise-tile lesson-card--${type.tone}${ready ? "" : " exercise-tile--soon"}`}
      onClick={() => ready && onPick(type.id)}
      aria-disabled={!ready}
    >
      <ExerciseArt type={type} />
      <span className="exercise-tile-body">
        <span className="exercise-tile-skill">{type.skill}</span>
        <strong>{type.title}</strong>
        <span className="exercise-tile-desc">{type.description}</span>
        {ready
          ? <span className="exercise-tile-cta">Chơi ngay <Icon name="arrow-right" size={14} /></span>
          : <span className="exercise-tile-soon"><Icon name="clock" size={14} /> Sắp ra mắt</span>}
      </span>
    </button>
  );
}

function ExercisePicker({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (id: string) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>(".exercise-tile:not([aria-disabled='true'])")?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialog) return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>("button"));
      const at = focusables.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && at <= 0) { event.preventDefault(); focusables[focusables.length - 1].focus(); }
      else if (!event.shiftKey && at === focusables.length - 1) { event.preventDefault(); focusables[0].focus(); }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop exercise-picker-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="exercise-picker" role="dialog" aria-modal="true" aria-labelledby="exercise-picker-title">
        <button className="modal-close exercise-picker-close" type="button" onClick={onClose} aria-label="Đóng">
          <Icon name="x" size={22} />
        </button>
        <header className="exercise-picker-head">
          <img src="/img/02-cat-mascot-v2.webp" alt="" width={84} height={84} decoding="async" />
          <div>
            <span className="eyebrow">Phòng trò chơi</span>
            <h2 id="exercise-picker-title">Em muốn chơi trò gì?</h2>
            <p>Chọn một trò để luyện tiếng Việt cùng Cô Tú nhé!</p>
          </div>
        </header>
        <div className="exercise-grid">
          {exerciseTypes.map((type) => <ExerciseTile key={type.id} type={type} onPick={onPick} />)}
        </div>
      </div>
    </div>
  );
}

export function ExerciseHub() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  // ?tro=<id> mở thẳng trò đó; không có thì mở popup chọn trò.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("tro");
    if (id && readyTypes.some((type) => type.id === id)) setGameId(id);
    else setPickerOpen(true);
  }, []);

  function pick(id: string) {
    setGameId(id);
    setPickerOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("tro", id);
    window.history.replaceState(null, "", url);
  }

  const current = exerciseTypes.find((type) => type.id === gameId);
  const Game = gameId ? GAMES[gameId] : null;

  return (
    <>
      {current && Game ? (
        <>
          <div className={`exercise-current lesson-card--${current.tone}`}>
            <span className="exercise-current-icon" aria-hidden="true">{current.image ? <img src={current.image} alt="" width={46} height={46} decoding="async" /> : current.emoji}</span>
            <div className="exercise-current-text">
              <span>Đang chơi</span>
              <strong>{current.title}</strong>
            </div>
            <button type="button" className="exercise-switch" onClick={() => setPickerOpen(true)}>
              <Icon name="sparkles" size={16} /> Đổi trò chơi
            </button>
          </div>
          <Game key={gameId} />
        </>
      ) : (
        // Đóng popup mà chưa chọn: hiện luôn danh sách trò ngay trên trang.
        <section className="exercise-catalog" aria-label="Các trò chơi">
          <div className="exercise-grid">
            {exerciseTypes.map((type) => <ExerciseTile key={type.id} type={type} onPick={pick} />)}
          </div>
        </section>
      )}
      <ExercisePicker open={pickerOpen} onClose={() => setPickerOpen(false)} onPick={pick} />
    </>
  );
}
