export type Lesson = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  icon: string;
  tone: "blue" | "purple" | "pink" | "orange" | "green" | "yellow";
  category: string;
  intro: string;
  points: { title: string; body: string; example: string }[];
  check: { question: string; options: string[]; answer: number; explanation: string };
};

export const lessons: Lesson[] = [
  {
    slug: "nguyen-am-phu-am", number: 1, title: "Nguyên âm và phụ âm là gì?",
    summary: "Làm quen với hai nhóm chữ cái và cách ghép chúng thành tiếng.",
    icon: "📗", tone: "blue", category: "Làm quen chữ cái",
    intro: "Tiếng Việt có 29 chữ cái. Khi học đọc, em sẽ gặp hai nhóm rất quan trọng: nguyên âm và phụ âm.",
    points: [
      { title: "Nguyên âm", body: "Là âm có thể phát ra rõ ràng khi đứng một mình.", example: "a, ă, â, e, ê, i, o, ô, ơ, u, ư, y" },
      { title: "Phụ âm", body: "Thường cần ghép với nguyên âm để tạo thành tiếng.", example: "b + a = ba · m + e = me" },
      { title: "Ghép thành tiếng", body: "Đọc phụ âm trước, nối nhẹ với nguyên âm phía sau.", example: "c + a = ca · b + ô = bô" },
    ],
    check: { question: "Chữ nào dưới đây là nguyên âm?", options: ["B", "A", "M"], answer: 1, explanation: "A là một nguyên âm. B và M là phụ âm." },
  },
  {
    slug: "nhom-a", number: 2, title: "Nhóm A — A, Ă, Â",
    summary: "Phân biệt ba chữ A và luyện đọc những tiếng quen thuộc.",
    icon: "🔤", tone: "purple", category: "Nhóm nguyên âm",
    intro: "A, Ă và Â nhìn gần giống nhau nhưng cách đọc khác nhau. Em hãy quan sát dấu trên đầu chữ.",
    points: [
      { title: "Chữ A", body: "Âm a mở miệng rộng và đọc dài.", example: "ba · ca · lá" },
      { title: "Chữ Ă", body: "Chữ ă có dấu cong nhỏ, âm ngắn hơn a.", example: "ăn · khăn · trăng" },
      { title: "Chữ Â", body: "Chữ â có dấu mũ, đọc ngắn và gọn.", example: "ân · sân · cân" },
    ],
    check: { question: "Tiếng nào có chữ Ă?", options: ["cá", "trăng", "sân"], answer: 1, explanation: "Trong tiếng “trăng” có chữ ă." },
  },
  {
    slug: "nhom-e", number: 3, title: "Nhóm E — E, Ê",
    summary: "Đọc đúng hai âm E, Ê qua ví dụ gần gũi mỗi ngày.",
    icon: "📘", tone: "pink", category: "Nhóm nguyên âm",
    intro: "Chỉ thêm một dấu mũ, chữ e đã thành ê. Cùng nghe và đọc hai âm này nhé!",
    points: [
      { title: "Chữ E", body: "Chữ e không có dấu mũ trên đầu.", example: "em · xe · me" },
      { title: "Chữ Ê", body: "Chữ ê có dấu mũ. Miệng khép hơn khi đọc.", example: "ê · ghế · lê" },
      { title: "Nhìn dấu để nhớ", body: "Quan sát chữ trước khi đọc để không nhầm e với ê.", example: "xe khác xê · me khác mê" },
    ],
    check: { question: "Tiếng nào có chữ Ê?", options: ["xe", "em", "ghế"], answer: 2, explanation: "Tiếng “ghế” có chữ ê mang dấu sắc." },
  },
  {
    slug: "dau-thanh", number: 4, title: "Sáu thanh tiếng Việt",
    summary: "Học thanh ngang, sắc, huyền, hỏi, ngã và nặng.",
    icon: "🎵", tone: "orange", category: "Luyện đọc",
    intro: "Đổi thanh điệu, nghĩa của tiếng cũng có thể thay đổi. Em hãy thử đọc từng tiếng thật rõ.",
    points: [
      { title: "Ba thanh đầu", body: "Thanh ngang không có dấu; thanh sắc có dấu đi lên; thanh huyền có dấu đi xuống.", example: "ma · má · mà" },
      { title: "Thanh hỏi và ngã", body: "Dấu hỏi cong như dấu hỏi nhỏ; dấu ngã lượn sóng.", example: "mả · mã" },
      { title: "Thanh nặng", body: "Dấu nặng là một chấm đặt bên dưới chữ.", example: "mạ" },
    ],
    check: { question: "Tiếng nào mang dấu nặng?", options: ["má", "mạ", "mã"], answer: 1, explanation: "“Mạ” có dấu chấm bên dưới, đó là dấu nặng." },
  },
  {
    slug: "ghep-van", number: 5, title: "Ghép vần đầu tiên",
    summary: "Nối âm đầu với vần để đọc thành tiếng có nghĩa.",
    icon: "🧩", tone: "green", category: "Luyện đọc",
    intro: "Khi đã biết chữ và dấu, em có thể ghép những tiếng ngắn để đọc thành từ.",
    points: [
      { title: "Tìm âm đầu", body: "Âm đầu thường đứng trước vần.", example: "m trong “mèo” · c trong “cam”" },
      { title: "Đọc vần", body: "Đọc phần vần thật rõ rồi nối với âm đầu.", example: "c + am = cam · b + an = ban" },
      { title: "Thêm dấu thanh", body: "Dấu thanh giúp tạo tiếng đúng nghĩa.", example: "b + an + huyền = bàn" },
    ],
    check: { question: "Ghép c + am được tiếng nào?", options: ["cam", "căm", "câm"], answer: 0, explanation: "c + am tạo thành tiếng “cam”." },
  },
  {
    slug: "chinh-ta", number: 6, title: "Viết đúng chính tả",
    summary: "Quan sát, nghe và chọn cách viết đúng của những từ quen thuộc.",
    icon: "✏️", tone: "yellow", category: "Luyện viết",
    intro: "Viết đúng giúp người khác đọc và hiểu điều em muốn nói. Hãy chú ý từng chữ và dấu.",
    points: [
      { title: "Nhìn cả từ", body: "Đọc trọn từ trước khi viết, không đoán theo một chữ.", example: "nghỉ ngơi · chăm chỉ" },
      { title: "Đặt đúng dấu", body: "Dấu thanh đặt trên nguyên âm của tiếng.", example: "sách · bàn · nắng" },
      { title: "Tự kiểm tra", body: "Viết xong, đọc lại một lần để tìm lỗi.", example: "Em thích đọc sách." },
    ],
    check: { question: "Cách viết nào đúng?", options: ["ngỉ ngơi", "nghỉ ngơi", "nghĩ ngơi"], answer: 1, explanation: "Từ đúng là “nghỉ ngơi”." },
  },
];
