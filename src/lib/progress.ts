export type LocalProgress = { exerciseBest: number; quizBest: number; lessonsDone: string[] };
const KEY = "co-tu-progress";

export function readProgress(): LocalProgress {
  const empty: LocalProgress = { exerciseBest: 0, quizBest: 0, lessonsDone: [] };
  if (typeof window === "undefined") return empty;
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!value || typeof value !== "object") return empty;
    return {
      exerciseBest: Number(value.exerciseBest) || 0,
      quizBest: Number(value.quizBest) || 0,
      lessonsDone: Array.isArray(value.lessonsDone) ? value.lessonsDone.filter((item: unknown) => typeof item === "string") : [],
    };
  } catch { return empty; }
}

export function saveProgress(patch: Partial<LocalProgress>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ ...readProgress(), ...patch }));
}

export function clearProgress() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
