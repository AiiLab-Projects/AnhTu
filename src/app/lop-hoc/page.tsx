import type { Metadata } from "next";
import { Classroom } from "@/components/Classroom";

export const metadata: Metadata = { title: "Lớp học | Cô Tú", description: "Theo dõi các bài học và kết quả luyện tập trên thiết bị của em." };

export default function ClassroomPage() {
  return <main className="inner-page"><div className="page-container"><div className="page-intro"><span className="page-eyebrow">📖 Góc học tập của em</span><h1>📖 Lớp học</h1><p>Học theo nhịp của mình và xem em đã tiến bộ như thế nào nhé!</p></div><Classroom /></div></main>;
}
