import type { Metadata } from "next";
import { TeacherAvatar } from "@/components/TeacherAvatar";
import { WordGame } from "@/components/WordGame";

export const metadata: Metadata = { title: "Bài tập | Cô Tú", description: "Luyện ghép chữ thành từ qua 10 hình ảnh đáng yêu." };

export default function ExercisePage() {
  return (
    <main className="inner-page exercise-page">
      <div className="page-container exercise-page-container">
        <div className="page-intro"><span className="page-eyebrow">✏️ Vừa học vừa chơi</span><h1>✏️ Bài tập</h1><p>Luyện tập nhẹ nhàng — sai lại làm tiếp, càng chơi càng nhớ!</p></div>
        <WordGame />
        <aside className="exercise-tip" aria-label="Mẹo của Cô">
          <span className="exercise-tip-avatar"><TeacherAvatar title="Cô Tú" /></span>
          <p><strong>Mẹo của Cô:</strong> Bấm 🔊 để nghe gợi ý. Lỡ chọn nhầm chữ thì em bấm vào ô chữ đó để bỏ ra nhé!</p>
        </aside>
      </div>
    </main>
  );
}
