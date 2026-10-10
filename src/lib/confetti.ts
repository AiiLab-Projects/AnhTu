// Lazy-load canvas-confetti chỉ khi cần (giảm initial JS bundle).
// Dùng: celebrate("quiz") hoặc celebrate("exercise") hoặc celebrate("lesson").

type Variant = "quiz" | "exercise" | "lesson";

const COLORS = ["#7C5CFA", "#FFCB57", "#FF8E9E", "#62CFA8", "#45B5FF"];

export async function celebrate(variant: Variant = "quiz") {
  if (typeof window === "undefined") return;
  // Tôn trọng prefers-reduced-motion.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const confetti = (await import("canvas-confetti")).default;

  const base = { colors: COLORS, scalar: 0.9, ticks: 180 };

  if (variant === "quiz") {
    // Bắn 2 phát từ 2 bên viewport cho kết quả cuối quiz.
    confetti({ ...base, particleCount: 90, angle: 60, spread: 55, origin: { x: 0, y: 0.9 } });
    confetti({ ...base, particleCount: 90, angle: 120, spread: 55, origin: { x: 1, y: 0.9 } });
  } else if (variant === "exercise") {
    confetti({ ...base, particleCount: 110, spread: 90, startVelocity: 42, origin: { y: 0.75 } });
  } else {
    // lesson check — nhẹ, 1 nhịp.
    confetti({ ...base, particleCount: 60, spread: 70, origin: { y: 0.7 } });
  }
}
