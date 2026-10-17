import type { Metadata } from "next";
import { LessonHero } from "@/components/LessonHero";
import { LessonFeatured } from "@/components/LessonFeatured";
import { LessonBrowser } from "@/components/LessonBrowser";

export const metadata: Metadata = {
  title: "Bài học | Cô Tú",
  description: "40 bài học tiếng Việt: chữ cái, vần, đọc hiểu, từ vựng, nói và viết.",
};

export default function LessonsPage() {
  return (
    <main className="inner-page lesson-hub">
      <div className="page-container lesson-hub-container">
        <LessonHero />
        <LessonFeatured />
        <LessonBrowser />
      </div>
    </main>
  );
}
