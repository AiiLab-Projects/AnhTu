"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

type Action = { label: string; href?: string; onClick?: () => void; variant?: "primary" | "secondary" };

type RewardModalProps = {
  open: boolean;
  onClose: () => void;
  variant: "correct" | "wrong" | "complete";
  title: string;
  message?: ReactNode;
  stars?: { earned: number; max: number };
  primaryAction?: Action;
  secondaryAction?: Action;
};

const MASCOT_SRC = "/img/06-star-mascot-v2.webp";

export function RewardModal({ open, onClose, variant, title, message, stars, primaryAction, secondaryAction }: RewardModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    const dialog = dialogRef.current;
    const first = dialog?.querySelector<HTMLElement>("button, a, [tabindex]:not([tabindex=\"-1\"])");
    first?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialog) return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>("button, a, [tabindex]:not([tabindex=\"-1\"])"));
      if (!focusables.length) return;
      const activeIndex = focusables.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && activeIndex <= 0) { event.preventDefault(); focusables[focusables.length - 1].focus(); }
      else if (!event.shiftKey && activeIndex === focusables.length - 1) { event.preventDefault(); focusables[0].focus(); }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const showMascot = variant === "correct" || variant === "complete";
  const sizeClass = variant === "complete" ? "reward-modal reward-modal--complete" : variant === "wrong" ? "reward-modal reward-modal--wrong" : "reward-modal reward-modal--correct";

  function renderAction(action: Action, kind: "primary" | "secondary") {
    const cls = kind === "primary" ? "pill-button reward-action-primary" : "pill-button pill-button--light reward-action-secondary";
    if (action.href) return <Link className={cls} href={action.href} onClick={() => { action.onClick?.(); onClose(); }}>{action.label}</Link>;
    return <button type="button" className={cls} onClick={() => { action.onClick?.(); onClose(); }}>{action.label}</button>;
  }

  return (
    <div className="modal-backdrop reward-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className={sizeClass} role="dialog" aria-modal="true" aria-labelledby="reward-title">
        <button className="modal-close reward-close" type="button" onClick={onClose} aria-label="Đóng">
          <Icon name="x" size={22} />
        </button>
        <div className="reward-top">
          {showMascot ? (
            <img className="reward-mascot" src={MASCOT_SRC} alt="" width={180} height={180} decoding="async" loading="lazy" />
          ) : (
            <div className="reward-icon reward-icon--wrong"><Icon name="lightbulb" size={44} /></div>
          )}
        </div>
        <h2 id="reward-title">{title}</h2>
        {message && <div className="reward-message">{message}</div>}
        {stars && (
          <div className="reward-stars" aria-label={`Đạt ${stars.earned} trên ${stars.max} sao`}>
            {Array.from({ length: stars.max }, (_, i) => (
              <span key={i} className={i < stars.earned ? "earned" : ""}>
                <Icon name="star" size={30} fill={i < stars.earned ? "currentColor" : "none"} />
              </span>
            ))}
          </div>
        )}
        <div className="reward-actions">
          {primaryAction && renderAction(primaryAction, "primary")}
          {secondaryAction && renderAction(secondaryAction, "secondary")}
        </div>
      </div>
    </div>
  );
}
