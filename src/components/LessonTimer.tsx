"use client";

import { useEffect } from "react";
import { awardLesson, LESSON_MINUTES, readLessonSeconds, saveLessonSeconds } from "@/lib/xp";

const TARGET_SECONDS = LESSON_MINUTES * 60;
const IDLE_SECONDS = 60;

// Không hiển thị gì. Đếm thời gian em thật sự học bài này: trang đang mở, tab đang hiện
// và em có thao tác (chuột, chạm, phím, cuộn) trong 60 giây gần nhất. Đủ 10 phút thì cộng XP.
export function LessonTimer({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    let seconds = readLessonSeconds(slug);
    let lastActive = Date.now();
    let awarded = false;
    const touch = () => { lastActive = Date.now(); };
    const events = ["pointerdown", "pointermove", "keydown", "scroll", "touchstart"] as const;
    events.forEach((name) => window.addEventListener(name, touch, { passive: true }));

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible" || Date.now() - lastActive > IDLE_SECONDS * 1000) return;
      seconds += 1;
      if (seconds % 5 === 0) saveLessonSeconds(slug, seconds);
      if (!awarded && seconds >= TARGET_SECONDS) {
        awarded = true;
        saveLessonSeconds(slug, seconds);
        awardLesson(slug, title);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
      events.forEach((name) => window.removeEventListener(name, touch));
      saveLessonSeconds(slug, seconds);
    };
  }, [slug, title]);

  return null;
}
