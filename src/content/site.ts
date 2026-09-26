// Chỉnh chữ hiển thị trên website tại đây.
export const siteContent = {
  brand: { name: "Cô Tú", subtitle: "Học tiếng Việt vui" },
  navigation: [
    { label: "Trang chủ", href: "/", icon: "home" },
    { label: "Bài học", href: "/bai-hoc", icon: "book" },
    { label: "Bài tập", href: "/bai-tap", icon: "pencil" },
    { label: "Kiểm tra", href: "/kiem-tra", icon: "trophy" },
    { label: "Liên hệ", href: "/lien-he", icon: "mail" },
    { label: "Lớp học", href: "/lop-hoc", icon: "school" },
  ],
  hero: {
    badge: "Dành cho học sinh tiểu học",
    greeting: "Chào em, Cô là Cô Tú 👋",
    description: "Cùng nhau học chữ, luyện đọc, viết đúng chính tả và làm bài kiểm tra thật vui mỗi ngày nhé!",
    primaryButton: "Bắt đầu học",
    secondaryButton: "Làm kiểm tra",
  },
  stats: [
    { value: "29", label: "Chữ cái" },
    { value: "6", label: "Dấu thanh" },
    { value: "20", label: "Câu kiểm tra" },
  ],
  features: {
    title: "Vì sao học cùng Cô Tú?",
    items: [
      { id: "bai-hoc", href: "/bai-hoc", icon: "📚", title: "Học qua trò chơi", description: "Học chữ, ghép vần và khám phá từng bài thật dễ nhớ.", color: "purple" },
      { id: "bai-tap", href: "/bai-tap", icon: "🎨", title: "Luyện tập vui", description: "Ghép chữ thành từ cùng những hình ảnh đáng yêu.", color: "pink" },
      { id: "kiem-tra", href: "/kiem-tra", icon: "🏅", title: "Kiểm tra có huy hiệu", description: "Trả lời câu hỏi và nhận sao sau mỗi lần hoàn thành.", color: "orange" },
    ],
  },
  contact: {
    // Điền thông tin thật của Cô Tú khi có. Để trống nếu chưa muốn công khai.
    phone: "",
    email: "",
    facebook: "",
    hours: "",
  },
  footer: { note: "Mỗi ngày một chút, tiếng Việt sẽ thật dễ thương!" },
} as const;
