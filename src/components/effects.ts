"use client";

import { useEffect, useRef } from "react";

// Tilt 3D nhẹ theo vị trí chuột — gắn vào ref của card.
// Tôn trọng prefers-reduced-motion (bỏ qua, không set transform).
export function useTilt<T extends HTMLElement>(options: { max?: number; scale?: number } = {}) {
  const ref = useRef<T>(null);
  const { max = 6, scale = 1.02 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    function onMove(event: MouseEvent) {
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el!.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        el!.style.setProperty("--tilt-x", `${(-y * max).toFixed(2)}deg`);
        el!.style.setProperty("--tilt-y", `${(x * max).toFixed(2)}deg`);
        el!.style.setProperty("--tilt-scale", String(scale));
      });
    }
    function reset() {
      if (!el) return;
      cancelAnimationFrame(raf);
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--tilt-scale", "1");
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [max, scale]);

  return ref;
}

// Ripple hiệu ứng click: set CSS vars --ripple-x/--ripple-y + toggle class
// kích hoạt pseudo ::after animation. CSS định nghĩa trong globals.css.
export function applyRipple(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  el.style.setProperty("--ripple-x", `${x}px`);
  el.style.setProperty("--ripple-y", `${y}px`);
  el.classList.remove("is-rippling");
  // Force reflow để restart animation.
  void el.offsetWidth;
  el.classList.add("is-rippling");
}
