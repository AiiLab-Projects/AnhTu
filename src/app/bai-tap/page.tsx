import type { Metadata } from "next";
import { WordGame } from "@/components/WordGame";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Bài tập | Cô Tú", description: "Luyện ghép chữ thành từ qua 10 hình ảnh đáng yêu." };

export default function ExercisePage() {
  return (
    <main className="inner-page exercise-page">
      <div className="page-container exercise-page-container">
        <header className="exercise-mini-hero">
          <span className="page-eyebrow"><Icon name="palette" size={14} /> Vừa học vừa chơi</span>
          <h1>Ghép chữ thành từ</h1>
          <p>Nhìn hình, chọn chữ và khám phá từ đúng nhé!</p>
        </header>
        <WordGame />
      </div>
    </main>
  );
}
