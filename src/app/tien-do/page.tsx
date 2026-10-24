import type { Metadata } from "next";
import { Classroom } from "@/components/Classroom";
import { XpCard } from "@/components/XpCard";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Tiến độ của em | Cô Tú", description: "Xem bài đã học, điểm bài tập và điểm kiểm tra tốt nhất của em." };

export default function ProgressPage() {
  return (
    <main className="inner-page progress-page">
      <div className="page-container progress-page-container">
        <div className="page-intro">
          <span className="page-eyebrow"><Icon name="map" size={14} /> Cô cùng em nhìn lại</span>
          <h1>Tiến độ của em</h1>
          <p>Em đã học được bao nhiêu bài, ghép đúng bao nhiêu từ? Cùng Cô xem nhé!</p>
        </div>
        <XpCard />
        <Classroom />
      </div>
    </main>
  );
}
