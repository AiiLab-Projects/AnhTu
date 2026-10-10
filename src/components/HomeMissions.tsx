"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/content/lessons";
import { wordExercises } from "@/content/questions";
import { readProgress, type LocalProgress } from "@/lib/progress";
import { Icon, type IconName } from "./Icon";

const QUIZ_LENGTH = 20;

type Mission = {
  key: "lesson" | "exercise" | "quiz";
  href: string; icon: IconName;
  title: string; subtitle: string;
  value: number; total: number; valueLabel: string;
  tone: "purple" | "pink" | "yellow";
};

export function HomeMissions() {
  const [progress, setProgress] = useState<LocalProgress | null>(null);
  useEffect(() => { setProgress(readProgress()); }, []);

  const done = progress?.lessonsDone ?? [];
  const nextLesson = lessons.find((lesson) => !done.includes(lesson.slug)) ?? lessons[0];
  const hasStarted = done.length > 0;
  const quizBest = progress?.quizBest ?? 0;
  const exerciseBest = progress?.exerciseBest ?? 0;

  const missions: Mission[] = [
    {
      key: "lesson", href: `/bai-hoc/${nextLesson.slug}`, icon: "book",
      title: "Học chữ cái", subtitle: "Nghe Cô Tú đọc rồi tập viết từng nét.",
      value: done.length, total: lessons.length, valueLabel: "bài học",
      tone: "purple",
    },
    {
      key: "exercise", href: "/bai-tap", icon: "palette",
      title: "Luyện ghép từ", subtitle: "Nhìn tranh, ghép chữ thành từ đúng.",
      value: exerciseBest, total: wordExercises.length, valueLabel: "từ ghép đúng",
      tone: "pink",
    },
    {
      key: "quiz", href: "/kiem-tra", icon: "trophy",
      title: "Thử tài kiểm tra", subtitle: "20 câu hỏi, mỗi câu lên một sao.",
      value: quizBest, total: QUIZ_LENGTH, valueLabel: "câu đúng",
      tone: "yellow",
    },
  ];

  const resume = {
    lesson: nextLesson,
    hasStarted,
    doneCount: done.length,
    totalCount: lessons.length,
  };

  return (
    <section className="mission-panel" aria-labelledby="mission-title">
      <div className="mission-panel-head">
        <h2 className="section-title" id="mission-title">
          <Icon name="target" size={26} /> Nhiệm vụ hôm nay
        </h2>
        <p>Hoàn thành các hoạt động để nhận thêm sao nhé!</p>
      </div>

      <div className="mission-panel-grid">
        <div className="mission-list">
          {missions.map((mission) => {
            const percent = mission.total ? Math.min(100, Math.round((mission.value / mission.total) * 100)) : 0;
            return (
              <Link key={mission.key} href={mission.href} className={`mission-tile mission-tile--${mission.tone}`}>
                <span className="mission-tile-icon"><Icon name={mission.icon} size={22} /></span>
                <div className="mission-tile-body">
                  <div className="mission-tile-head">
                    <strong>{mission.title}</strong>
                    <span>{mission.value}/{mission.total} {mission.valueLabel}</span>
                  </div>
                  <p>{mission.subtitle}</p>
                  <div className="mission-tile-bar" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div>
                </div>
                <span className="mission-tile-cta" aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
              </Link>
            );
          })}
        </div>

        <aside className="resume-panel" aria-labelledby="resume-title">
          <div className="resume-panel-head">
            <span className="resume-eyebrow"><Icon name="compass" size={14} /> Tiếp tục bài đang học</span>
            <h3 id="resume-title">{resume.lesson.title}</h3>
          </div>
          <div className={`resume-thumb lesson-card--${resume.lesson.tone}`} aria-hidden="true">
            <span>{resume.lesson.icon}</span>
          </div>
          <p className="resume-desc">{resume.lesson.summary}</p>
          <div className="resume-progress">
            <span>Tiến độ chung</span>
            <strong>{resume.doneCount}/{resume.totalCount}</strong>
          </div>
          <div className="resume-bar" aria-hidden="true">
            <span style={{ width: `${(resume.doneCount / resume.totalCount) * 100}%` }} />
          </div>
          <Link href={`/bai-hoc/${resume.lesson.slug}`} className="pill-button resume-cta">
            {resume.hasStarted ? "Học tiếp" : "Bắt đầu học"} <Icon name="arrow-right" size={16} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
