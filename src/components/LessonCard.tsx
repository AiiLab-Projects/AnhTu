"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readProgress } from "@/lib/progress";
import { Icon, type IconName } from "./Icon";
import type { Lesson } from "@/content/lessons";

type Status = "todo" | "doing" | "done";

const STATUS_META: Record<Status, { label: string; icon: IconName }> = {
  todo:  { label: "Chưa học",   icon: "sparkles" },
  doing: { label: "Đang học",   icon: "flame" },
  done:  { label: "Hoàn thành", icon: "check" },
};

export function LessonCard({ lesson, lessonsBefore }: { lesson: Lesson; lessonsBefore: string[] }) {
  const [status, setStatus] = useState<Status>("todo");
  useEffect(() => {
    const done = new Set(readProgress().lessonsDone);
    if (done.has(lesson.slug)) setStatus("done");
    else if (lessonsBefore.some((slug) => done.has(slug))) setStatus("doing");
    else setStatus("todo");
  }, [lesson.slug, lessonsBefore]);

  const meta = STATUS_META[status];

  return (
    <Link href={`/bai-hoc/${lesson.slug}`} className={`lesson-card lesson-card--${lesson.tone}`}>
      <div className="lesson-card-top">
        <span className="lesson-card-icon" aria-hidden="true">{lesson.icon}</span>
        <span className={`lesson-card-status lesson-card-status--${status}`}>
          <Icon name={meta.icon} size={12} /> {meta.label}
        </span>
      </div>
      <span className="lesson-card-category">Bài {lesson.number} · {lesson.category}</span>
      <h3>{lesson.title}</h3>
      <p>{lesson.summary}</p>
      <span className="lesson-card-cta">
        {status === "done" ? "Ôn lại bài" : status === "doing" ? "Học tiếp" : "Vào học"}
        <Icon name="arrow-right" size={14} />
      </span>
    </Link>
  );
}
