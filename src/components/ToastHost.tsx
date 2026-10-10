"use client";

import { useEffect, useState } from "react";
import { subscribeToast, type ToastEntry } from "@/lib/toast";
import { Icon } from "./Icon";

// Mount 1 lần ở layout. Nghe showToast events, render stack ở góc dưới phải.
export function ToastHost() {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  useEffect(() => subscribeToast((toast) => {
    setToasts((list) => [...list, toast]);
    const duration = toast.duration ?? 3200;
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== toast.id));
    }, duration);
  }), []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-host" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.tone ?? "info"}`} role="status">
          {toast.icon && <span className="toast-icon"><Icon name={toast.icon} size={18} /></span>}
          <div className="toast-body">
            <strong>{toast.title}</strong>
            {toast.description && <span>{toast.description}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
