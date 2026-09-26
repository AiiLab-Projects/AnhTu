// Chỉnh nội dung website tại đây. Mỗi mục trong menu trỏ tới một phần của trang.
export const siteContent = {
  brand: {
    name: "Cô Tú",
    subtitle: "Học tiếng Việt vui",
  },
  navigation: [
    { label: "Trang chủ", href: "#trang-chu", icon: "home" },
    { label: "Bài học", href: "#bai-hoc", icon: "book" },
    { label: "Bài tập", href: "#bai-tap", icon: "pencil" },
    { label: "Kiểm tra", href: "#kiem-tra", icon: "trophy" },
    { label: "Liên hệ", href: "#lien-he", icon: "mail" },
    { label: "Lớp học", href: "#lop-hoc", icon: "school" },
  ],
  hero: {
    badge: "Dành cho học sinh tiểu học",
    greeting: "Chào em, Cô là Cô Tú 👋",
    description:
      "Cùng nhau học chữ, luyện đọc, viết đúng chính tả và làm bài kiểm tra thật vui mỗi ngày nhé!",
    primaryButton: "Bắt đầu học",
    secondaryButton: "Làm kiểm tra",
  },
  stats: [
    { value: "29", label: "Chữ cái" },
    { value: "6", label: "Dấu thanh" },
    { value: "20", label: "Bài kiểm tra" },
  ],
  features: {
    title: "Vì sao học cùng Cô Tú?",
    items: [
      {
        id: "bai-hoc",
        icon: "📚",
        title: "Học qua trò chơi",
        description: "Ghép chữ, tìm lỗi sai, kéo thả và trả lời nhanh.",
        color: "purple",
      },
      {
        id: "bai-tap",
        icon: "🎨",
        title: "Hình ảnh Anime",
        description: "Nhân vật đáng yêu giúp bé ghi nhớ lâu hơn.",
        color: "pink",
      },
      {
        id: "kiem-tra",
        icon: "🏅",
        title: "Kiểm tra có huy hiệu",
        description: "Hoàn thành bài học để mở khóa thành tích.",
        color: "orange",
      },
    ],
  },
  footer: {
    note: "Mỗi ngày một chút, tiếng Việt sẽ thật dễ thương!",
    contact: "Liên hệ Cô Tú",
  },
} as const;
