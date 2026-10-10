"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type LessonGradeTab = {
  /** "tat-ca" hoặc số lớp dạng chuỗi ("1".."5") — cũng là giá trị của query `?lop=`. */
  id: string;
  label: string;
  /** Chấp nhận tên Icon mới hoặc emoji cũ cho các tab chưa cập nhật. */
  icon: IconName | string;
  tone: "blue" | "purple" | "pink" | "orange" | "green" | "yellow";
  count: number;
  /** null = lớp chưa có bài, hiện lời nhắn của Cô. */
  content: ReactNode | null;
};

const ALL = "tat-ca";

// Site xuất tĩnh nên không đọc searchParams phía server: tab lấy từ `?lop=` ở trình duyệt.
function readTabFromUrl(ids: string[]) {
  if (typeof window === "undefined") return ALL;
  const lop = new URLSearchParams(window.location.search).get("lop");
  return lop && ids.includes(lop) ? lop : ALL;
}

export function LessonGradeTabs({ tabs }: { tabs: LessonGradeTab[] }) {
  const ids = tabs.map((tab) => tab.id);
  const [active, setActive] = useState(ALL);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const sync = () => setActive(readTabFromUrl(ids));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join()]);

  function select(id: string, focus = false) {
    setActive(id);
    const url = new URL(window.location.href);
    if (id === ALL) url.searchParams.delete("lop");
    else url.searchParams.set("lop", id);
    url.hash = "";
    window.history.replaceState(null, "", url);
    if (focus) tabRefs.current[ids.indexOf(id)]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    const target = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(ids[target], true);
  }

  return (
    <div className="grade-tabs">
      <div className="grade-tab-list" role="tablist" aria-label="Chọn lớp">
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`grade-tab-${tab.id}`}
              aria-controls={`grade-panel-${tab.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={`grade-tab lesson-card--${tab.tone}${selected ? " grade-tab--active" : ""}`}
              onClick={() => select(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span aria-hidden="true"><Icon name={tab.icon as IconName} size={16} /></span>
              {tab.label}
              <span className="grade-tab-count" aria-label={`${tab.count} bài`}>{tab.count}</span>
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`grade-panel-${tab.id}`}
          aria-labelledby={`grade-tab-${tab.id}`}
          className="grade-panel"
          hidden={tab.id !== active}
          tabIndex={0}
        >
          {tab.content ?? (
            <div className={`grade-empty lesson-card--${tab.tone}`}>
              <span className="grade-empty-icon" aria-hidden="true"><Icon name="pencil" size={34} /></span>
              <h2>Cô Tú đang soạn bài cho {tab.label}, em quay lại sau nhé!</h2>
              <p>Trong lúc chờ, em cùng Cô ôn lại các bài ở mục Tất cả nha.</p>
              <button type="button" className="pill-button" onClick={() => select(ALL, true)}><Icon name="book" size={16} /> Xem tất cả bài học</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
