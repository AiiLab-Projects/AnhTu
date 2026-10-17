import type { Lesson } from "@/content/lessons";

// Danh mục loại bài tập / trò chơi ở trang /bai-tap. Thêm trò mới: thêm một phần tử ở đây,
// rồi gắn component của trò vào `GAMES` trong `src/components/ExerciseHub.tsx`.
// `image` là hình minh hoạ cho thẻ (đặt ở public/img/bai-tap/); để trống thì thẻ dùng `emoji`.
// `status: "soon"` hiện thẻ "Sắp ra mắt" và không bấm vào được.
export type ExerciseType = {
  id: string;
  title: string;
  description: string;
  skill: string;
  emoji: string;
  image?: string;
  tone: Lesson["tone"];
  status: "ready" | "soon";
};

export const exerciseTypes: ExerciseType[] = [
  {
    id: "ghep-chu", title: "Ghép chữ thành từ", skill: "Đọc · Viết",
    description: "Nhìn hình, nghe gợi ý rồi xếp các chữ cái thành từ đúng.",
    emoji: "🧩", image: "/img/bai-tap/ghep-chu.webp", tone: "purple", status: "ready",
  },
  {
    id: "nghe-chon-tranh", title: "Nghe và chọn tranh", skill: "Nghe",
    description: "Nghe Cô Tú đọc một từ, bấm vào bức tranh đúng.",
    emoji: "🎧", image: "/img/bai-tap/nghe-chon-tranh.webp", tone: "blue", status: "ready",
  },
  {
    id: "dien-dau-thanh", title: "Đặt dấu thanh", skill: "Dấu thanh",
    description: "Chọn dấu huyền, sắc, hỏi, ngã, nặng cho đúng tiếng.",
    emoji: "🎵", image: "/img/bai-tap/dat-dau-thanh.webp", tone: "pink", status: "soon",
  },
  {
    id: "noi-tu-tranh", title: "Nối từ với tranh", skill: "Từ vựng",
    description: "Kéo nối mỗi từ với bức tranh của nó.",
    emoji: "🔗", image: "/img/bai-tap/noi-tu-tranh.webp", tone: "green", status: "soon",
  },
];
