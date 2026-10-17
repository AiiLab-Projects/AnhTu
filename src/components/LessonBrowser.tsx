"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { lessonGrades, lessons, type Lesson } from "@/content/lessons";
import { readProgress } from "@/lib/progress";
import { LessonCard } from "./LessonCard";
import { Icon, type IconName } from "./Icon";

type GradeFilter = "all" | typeof lessonGrades[number];
type CategoryFilter = "all" | string;

// Mỗi "nhóm" là một dải số bài; dùng chung tên này cho cả filter chip và heading.
const GROUPS: Array<{
  id: string; title: string; subtitle: string; icon: IconName;
  from: number; to: number; tone: "blue" | "pink" | "purple" | "yellow" | "green" | "orange";
}> = [
  { id: "hoc-van-lop-1", title: "Học vần lớp 1", subtitle: "Bài 1–9 · a, b, c, e, ê, t, tr, th, ia, ua, ưa", icon: "star",     from: 1,  to: 9,  tone: "blue" },
  { id: "chu-cai",       title: "Làm quen chữ cái", subtitle: "Bài 10–15 · nguyên âm và nhóm chữ",           icon: "book",     from: 10, to: 15, tone: "pink" },
  { id: "phu-am",        title: "Học phụ âm",    subtitle: "Bài 16–21 · chữ đầu và chữ ghép",              icon: "pencil",   from: 16, to: 21, tone: "purple" },
  { id: "van-chinh-ta",  title: "Dấu thanh và vần", subtitle: "Bài 22–26 · đọc đúng, ghép vần, viết đúng", icon: "music",    from: 22, to: 26, tone: "yellow" },
  { id: "doc-tu-vung",   title: "Đọc hiểu và từ vựng", subtitle: "Bài 27–33 · đoạn ngắn, gọi tên thế giới", icon: "compass", from: 27, to: 33, tone: "green" },
  { id: "noi-viet",      title: "Nói và viết",   subtitle: "Bài 34–40 · giao tiếp, đặt câu, viết đoạn",    icon: "chat",     from: 34, to: 40, tone: "orange" },
];

const GRADE_META: Record<string, { label: string; tone: string }> = {
  all: { label: "Tất cả", tone: "purple" },
  "1": { label: "Lớp 1", tone: "blue" },
  "2": { label: "Lớp 2", tone: "pink" },
  "3": { label: "Lớp 3", tone: "orange" },
  "4": { label: "Lớp 4", tone: "green" },
  "5": { label: "Lớp 5", tone: "yellow" },
};

function inGroup(lesson: Lesson, group: typeof GROUPS[number]) {
  return lesson.number >= group.from && lesson.number <= group.to;
}

export function LessonBrowser() {
  const [grade, setGrade] = useState<GradeFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [doneSlugs, setDoneSlugs] = useState<Set<string>>(() => new Set());

  // Đọc lại trạng thái từ URL khi mount hoặc khi back/forward.
  useEffect(() => {
    const sync = () => {
      const sp = new URLSearchParams(window.location.search);
      const lop = sp.get("lop");
      const nhom = sp.get("nhom");
      setGrade(lop && /^[1-5]$/.test(lop) ? (Number(lop) as GradeFilter) : "all");
      setCategory(nhom && GROUPS.some((g) => g.id === nhom) ? nhom : "all");
    };
    sync();
    setDoneSlugs(new Set(readProgress().lessonsDone));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  function updateUrl(nextGrade: GradeFilter, nextCategory: CategoryFilter) {
    const url = new URL(window.location.href);
    if (nextGrade === "all") url.searchParams.delete("lop"); else url.searchParams.set("lop", String(nextGrade));
    if (nextCategory === "all") url.searchParams.delete("nhom"); else url.searchParams.set("nhom", nextCategory);
    url.hash = "";
    window.history.replaceState(null, "", url);
  }

  function selectGrade(value: GradeFilter) { setGrade(value); updateUrl(value, category); }
  function selectCategory(value: CategoryFilter) { setCategory(value); updateUrl(grade, value); }

  const visibleLessons = useMemo(() => (
    lessons.filter((lesson) =>
      (grade === "all" || lesson.grade === grade)
      && (category === "all" || inGroup(lesson, GROUPS.find((g) => g.id === category)!))
    )
  ), [grade, category]);

  const groupedView = useMemo(() => (
    GROUPS
      .map((group) => ({ ...group, items: visibleLessons.filter((lesson) => inGroup(lesson, group)) }))
      .filter((group) => group.items.length > 0)
  ), [visibleLessons]);

  const totalShown = visibleLessons.length;
  const activeGradeMeta = GRADE_META[String(grade)];
  const activeCategoryMeta = category === "all" ? null : GROUPS.find((g) => g.id === category);

  return (
    <section className="lesson-browser" aria-label="Bộ lọc và danh sách bài học">
      <div className="lesson-filter-bar">
        <div className="lesson-filter-row" role="radiogroup" aria-label="Chọn lớp">
          <span className="lesson-filter-label">Lớp</span>
          {(["all", 1, 2, 3, 4, 5] as GradeFilter[]).map((g) => {
            const key = String(g);
            const meta = GRADE_META[key];
            const active = grade === g;
            const count = g === "all" ? lessons.length : lessons.filter((l) => l.grade === g).length;
            return (
              <button
                key={key} type="button" role="radio" aria-checked={active}
                className={`lesson-filter-pill lesson-filter-pill--${meta.tone}${active ? " is-active" : ""}`}
                onClick={() => selectGrade(g)}
              >
                {meta.label}
                <span className="lesson-filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="lesson-filter-row" role="radiogroup" aria-label="Chọn chủ đề">
          <span className="lesson-filter-label">Chủ đề</span>
          <button
            type="button" role="radio" aria-checked={category === "all"}
            className={`lesson-filter-chip${category === "all" ? " is-active" : ""}`}
            onClick={() => selectCategory("all")}
          >
            <Icon name="sparkles" size={14} /> Tất cả chủ đề
          </button>
          {GROUPS.map((group) => {
            const active = category === group.id;
            return (
              <button
                key={group.id} type="button" role="radio" aria-checked={active}
                className={`lesson-filter-chip lesson-filter-chip--${group.tone}${active ? " is-active" : ""}`}
                onClick={() => selectCategory(group.id)}
              >
                <Icon name={group.icon} size={14} /> {group.title}
              </button>
            );
          })}
        </div>

        <div className="lesson-filter-summary" aria-live="polite">
          <strong>{totalShown}</strong> bài phù hợp
          {grade !== "all" && <> · {activeGradeMeta.label}</>}
          {activeCategoryMeta && <> · {activeCategoryMeta.title}</>}
          {(grade !== "all" || category !== "all") && (
            <button type="button" className="lesson-filter-reset" onClick={() => { setGrade("all"); setCategory("all"); updateUrl("all", "all"); }}>
              <Icon name="x" size={14} /> Xoá bộ lọc
            </button>
          )}
        </div>
      </div>

      {groupedView.length === 0 ? (
        <div className="lesson-empty">
          <Icon name="pencil" size={34} />
          <h3>Chưa có bài phù hợp</h3>
          <p>Cô Tú đang soạn thêm bài cho bộ lọc này. Em thử chọn lớp hoặc chủ đề khác nhé.</p>
          <button type="button" className="pill-button" onClick={() => { setGrade("all"); setCategory("all"); updateUrl("all", "all"); }}>Xem tất cả bài học</button>
        </div>
      ) : (
        groupedView.map((group) => {
          const groupDone = group.items.filter((l) => doneSlugs.has(l.slug)).length;
          return (
            <section key={group.id} className={`lesson-browser-group lesson-browser-group--${group.tone}`}>
              <header className="lesson-browser-group-head">
                <span className="lesson-browser-group-icon"><Icon name={group.icon} size={22} /></span>
                <div>
                  <h2>{group.title}</h2>
                  <p>{group.subtitle}</p>
                </div>
                <div className="lesson-browser-group-meta">
                  <span className="lesson-browser-group-count">
                    <Icon name="book" size={12} /> {group.items.length} bài
                  </span>
                  {groupDone > 0 && (
                    <span className="lesson-browser-group-progress" title={`${groupDone}/${group.items.length} đã học`}>
                      <Icon name="check" size={12} /> {groupDone}/{group.items.length}
                    </span>
                  )}
                </div>
              </header>
              <div className="lesson-grid">
                {group.items.map((lesson) => <LessonCard key={lesson.slug} lesson={lesson} />)}
              </div>
            </section>
          );
        })
      )}

      <div className="next-step lesson-browser-footer">
        <span className="next-step-icon"><Icon name="pencil" size={22} /></span>
        <p>Học xong rồi? Thử ghép chữ thành từ nào!</p>
        <Link href="/bai-tap">Đến bài tập <Icon name="arrow-right" size={14} /></Link>
      </div>
    </section>
  );
}
