// Toast event bus đơn giản — không cần context, mọi nơi gọi showToast(...).
// ToastHost mount một lần ở layout để nghe và render.

import type { IconName } from "@/components/Icon";

export type ToastEntry = {
  id: number;
  icon?: IconName;
  title: string;
  description?: string;
  tone?: "success" | "info" | "achievement";
  duration?: number;
};

type Listener = (toast: ToastEntry) => void;

const listeners = new Set<Listener>();
let nextId = 1;

export function showToast(toast: Omit<ToastEntry, "id">) {
  const entry: ToastEntry = { id: nextId++, duration: 3200, tone: "info", ...toast };
  listeners.forEach((listener) => listener(entry));
  return entry.id;
}

export function subscribeToast(listener: Listener) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
