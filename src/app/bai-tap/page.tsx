import type { Metadata } from "next";
import { ExerciseHub } from "@/components/ExerciseHub";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Bài tập | Cô Tú", description: "Phòng trò chơi luyện tiếng Việt: ghép chữ thành từ và nhiều trò vui khác cùng Cô Tú." };

export default function ExercisePage() {
  return (
    <main className="inner-page exercise-page">
      <div className="page-container exercise-page-container">
        <header className="exercise-mini-hero">
          <span className="page-eyebrow"><Icon name="palette" size={14} /> Vừa học vừa chơi</span>
          <h1>Phòng trò chơi</h1>
          <p>Chọn một trò, vừa chơi vừa luyện tiếng Việt nhé!</p>
        </header>
        <ExerciseHub />
      </div>
    </main>
  );
}
