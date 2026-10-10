"use client";

import { useEffect, useRef, useState } from "react";

// Con mèo thỉnh thoảng peek ra từ cạnh dưới của viewport.
// Chu kỳ random 30-60s, peek trong 3.5s rồi lủi. Chạm vào thì meo meo (toast).
export function CatPeek() {
  const [visible, setVisible] = useState(false);
  const [side, setSide] = useState<"left" | "right">("right");
  const [reduced, setReduced] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  useEffect(() => {
    if (reduced) return;

    function schedule() {
      // Random 30-60s giữa các lần peek.
      const delay = 30_000 + Math.random() * 30_000;
      const t = window.setTimeout(() => {
        setSide(Math.random() > 0.5 ? "left" : "right");
        setVisible(true);
        // Ẩn sau 3.5s.
        const t2 = window.setTimeout(() => {
          setVisible(false);
          schedule();
        }, 3500);
        timeoutsRef.current.push(t2);
      }, delay);
      timeoutsRef.current.push(t);
    }
    schedule();
    return () => { timeoutsRef.current.forEach((t) => window.clearTimeout(t)); timeoutsRef.current = []; };
  }, [reduced]);

  async function playMeow() {
    const { showToast } = await import("@/lib/toast");
    showToast({ icon: "cat", title: "Meo meo!", description: "Mèo chào em nè.", tone: "achievement", duration: 2200 });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      className={`cat-peek cat-peek--${side}`}
      aria-label="Vuốt ve mèo"
      onClick={playMeow}
    >
      <img src="/img/02-cat-mascot-v2.webp" alt="" width={120} height={120} decoding="async" />
    </button>
  );
}
