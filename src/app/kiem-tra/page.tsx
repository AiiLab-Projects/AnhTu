import type { Metadata } from "next";
import { QuizExperience } from "@/components/QuizExperience";

export const metadata: Metadata = { title: "Kiểm tra | Cô Tú", description: "Thử tài tiếng Việt với 20 câu mỗi lượt, ba mức độ khó và ngân hàng 60 câu hỏi cùng Cô Tú." };

export default function QuizPage() {
  return (
    <main className="inner-page quiz-page">
      <div className="page-container quiz-page-container">
        <QuizExperience />
      </div>
    </main>
  );
}
