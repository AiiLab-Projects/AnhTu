// Điểm XP và chuỗi ngày học. Lưu theo sự kiện trong localStorage (khoá co-tu-xp);
// khi em đăng nhập, XpSync gộp với bảng learner_events trên Supabase (mỗi sự kiện có id cố định nên không tính trùng).
import { showToast } from "@/lib/toast";

export type XpEvent = { id: string; kind: "lesson" | "exercise"; key: string; day: string; xp: number };
export type XpStats = { xp: number; streak: number; bestStreak: number; today: boolean; days: string[] };

export const LESSON_MINUTES = 10;
export const LESSON_XP = 5;
export const EXERCISE_XP = 1;

const KEY = "co-tu-xp";
const TIME_KEY = "co-tu-lesson-time";
const listeners = new Set<() => void>();

export const dayKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

function parse(raw: string | null): XpEvent[] {
  try {
    const value = JSON.parse(raw ?? "[]");
    return Array.isArray(value)
      ? value.filter((item): item is XpEvent => item && typeof item.id === "string" && typeof item.day === "string" && Number.isFinite(item.xp))
      : [];
  } catch { return []; }
}

export function readEvents(): XpEvent[] {
  if (typeof window === "undefined") return [];
  try { return parse(localStorage.getItem(KEY)); } catch { return []; }
}

function writeEvents(events: XpEvent[]) {
  try { localStorage.setItem(KEY, JSON.stringify(events)); } catch { /* bộ nhớ đầy hoặc bị chặn: bỏ qua */ }
  listeners.forEach((listener) => listener());
}

export function subscribeXp(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => { if (event.key === KEY) listener(); };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}

/** Gộp sự kiện từ máy chủ vào máy này; trả về các sự kiện chỉ có ở máy này (cần đẩy lên). */
export function mergeEvents(remote: XpEvent[]): XpEvent[] {
  const local = readEvents();
  const known = new Set(local.map((event) => event.id));
  const added = remote.filter((event) => !known.has(event.id));
  if (added.length) writeEvents([...local, ...added]);
  const remoteIds = new Set(remote.map((event) => event.id));
  return local.filter((event) => !remoteIds.has(event.id));
}

export function computeStats(events: XpEvent[], now = new Date()): XpStats {
  const days = [...new Set(events.map((event) => event.day))].sort();
  const set = new Set(days);
  const today = set.has(dayKey(now));
  // Chuỗi đang chạy: tính lùi từ hôm nay, hoặc từ hôm qua nếu hôm nay em chưa học (chuỗi chưa đứt).
  const cursor = new Date(now);
  if (!today) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(dayKey(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  let best = 0, run = 0, previous: Date | null = null;
  for (const day of days) {
    const [y, m, d] = day.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    run = previous && Math.round((date.getTime() - previous.getTime()) / 86400000) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = date;
  }
  return { xp: events.reduce((sum, event) => sum + event.xp, 0), streak, bestStreak: best, today, days };
}

/** Ghi một sự kiện nếu chưa có (theo id). Trả về true khi vừa cộng điểm. */
function award(event: XpEvent, title: string): boolean {
  const events = readEvents();
  if (events.some((item) => item.id === event.id)) return false;
  const before = computeStats(events);
  writeEvents([...events, event]);
  const after = computeStats([...events, event]);
  showToast({ icon: "star", tone: "achievement", title: `+${event.xp} XP`, description: title });
  if (after.streak > before.streak) {
    showToast({ icon: "flame", tone: "achievement", title: `Chuỗi ${after.streak} ngày học liên tiếp!`, description: "Mai em nhớ học tiếp để giữ chuỗi nhé." });
  }
  return true;
}

/** Học một bài đủ 10 phút: +5 XP, mỗi bài một lần mỗi ngày. */
export function awardLesson(slug: string, title: string) {
  const day = dayKey();
  return award({ id: `lesson:${slug}:${day}`, kind: "lesson", key: slug, day, xp: LESSON_XP }, `Em đã học "${title}" đủ ${LESSON_MINUTES} phút`);
}

/** Làm xong một lượt bài tập: +1 XP mỗi lượt. */
export function awardExercise(game: string) {
  const day = dayKey();
  const nonce = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return award({ id: `exercise:${game}:${nonce}`, kind: "exercise", key: game, day, xp: EXERCISE_XP }, "Em đã hoàn thành một lượt bài tập");
}

/** Số giây đã học bài này hôm nay (lưu để em rời trang rồi quay lại vẫn cộng dồn). */
export function readLessonSeconds(slug: string): number {
  try {
    const value = JSON.parse(localStorage.getItem(TIME_KEY) ?? "null");
    return value && value.day === dayKey() ? Number(value.seconds?.[slug]) || 0 : 0;
  } catch { return 0; }
}

export function saveLessonSeconds(slug: string, seconds: number) {
  try {
    const value = JSON.parse(localStorage.getItem(TIME_KEY) ?? "null");
    const today = dayKey();
    const base = value && value.day === today ? value : { day: today, seconds: {} };
    base.seconds[slug] = seconds;
    localStorage.setItem(TIME_KEY, JSON.stringify(base));
  } catch { /* bỏ qua */ }
}
