export type QuizQuestion = {
  question: string;
  options: [string, string, string];
  answer: number;
  skill: "Chữ cái" | "Dấu thanh" | "Từ vựng" | "Chính tả";
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  { question: "Chữ nào là nguyên âm?", options: ["B", "A", "D"], answer: 1, skill: "Chữ cái", explanation: "A là nguyên âm." },
  { question: "Bảng chữ cái tiếng Việt có bao nhiêu chữ?", options: ["26", "28", "29"], answer: 2, skill: "Chữ cái", explanation: "Bảng chữ cái tiếng Việt có 29 chữ." },
  { question: "Chữ nào có dấu mũ?", options: ["Ă", "Â", "A"], answer: 1, skill: "Chữ cái", explanation: "Â có dấu mũ ở phía trên." },
  { question: "Chữ nào thuộc nhóm E?", options: ["Ê", "Ô", "Ư"], answer: 0, skill: "Chữ cái", explanation: "E và Ê cùng nhóm." },
  { question: "Chữ nào là phụ âm?", options: ["O", "E", "M"], answer: 2, skill: "Chữ cái", explanation: "M là phụ âm." },
  { question: "Tiếng nào mang dấu sắc?", options: ["ma", "má", "mà"], answer: 1, skill: "Dấu thanh", explanation: "Má mang dấu sắc." },
  { question: "Tiếng nào mang dấu huyền?", options: ["bà", "bá", "bạ"], answer: 0, skill: "Dấu thanh", explanation: "Bà mang dấu huyền." },
  { question: "Dấu nặng nằm ở đâu?", options: ["Trên chữ", "Dưới chữ", "Bên cạnh chữ"], answer: 1, skill: "Dấu thanh", explanation: "Dấu nặng là chấm nhỏ bên dưới chữ." },
  { question: "Tiếng nào mang dấu hỏi?", options: ["mã", "mả", "mạ"], answer: 1, skill: "Dấu thanh", explanation: "Mả có dấu hỏi." },
  { question: "Tiếng nào không có dấu thanh?", options: ["cá", "ca", "cà"], answer: 1, skill: "Dấu thanh", explanation: "Ca là thanh ngang, không ghi dấu." },
  { question: "Con vật nào kêu “meo meo”?", options: ["Con mèo", "Con chó", "Con cá"], answer: 0, skill: "Từ vựng", explanation: "Con mèo kêu meo meo." },
  { question: "Từ nào chỉ một loại quả?", options: ["Bàn", "Cam", "Sách"], answer: 1, skill: "Từ vựng", explanation: "Cam là một loại quả." },
  { question: "Từ nào chỉ đồ dùng để đọc?", options: ["Sách", "Bóng", "Bút"], answer: 0, skill: "Từ vựng", explanation: "Sách dùng để đọc." },
  { question: "Từ nào chỉ thời tiết?", options: ["Nắng", "Ghế", "Áo"], answer: 0, skill: "Từ vựng", explanation: "Nắng chỉ trạng thái thời tiết." },
  { question: "Từ nào trái nghĩa với “cao”?", options: ["Dài", "Thấp", "Rộng"], answer: 1, skill: "Từ vựng", explanation: "Cao và thấp là hai từ trái nghĩa." },
  { question: "Cách viết nào đúng?", options: ["ngỉ ngơi", "nghỉ ngơi", "nghĩ ngơi"], answer: 1, skill: "Chính tả", explanation: "Viết đúng là “nghỉ ngơi”." },
  { question: "Câu nào viết đúng dấu cuối câu?", options: ["Em tên là Tú.", "Em tên là Tú?", "Em tên là Tú!?"], answer: 0, skill: "Chính tả", explanation: "Câu kể thường kết thúc bằng dấu chấm." },
  { question: "Từ nào chỉ quyển sách?", options: ["sách", "sác", "xách"], answer: 0, skill: "Chính tả", explanation: "Quyển sách được viết là “sách”." },
  { question: "Tiếng “bàn” mang dấu nào?", options: ["Sắc", "Huyền", "Hỏi"], answer: 1, skill: "Chính tả", explanation: "Bàn mang dấu huyền." },
  { question: "Câu nào có chữ đầu viết hoa đúng?", options: ["em đi học.", "Em đi học.", "EM đi học."], answer: 1, skill: "Chính tả", explanation: "Đầu câu viết hoa chữ cái đầu tiên." },
];

export const wordExercises = [
  { emoji: "🐶", hint: "Con vật giữ nhà", answer: "chó", letters: ["ó", "c", "h"] },
  { emoji: "🐱", hint: "Con vật kêu meo meo", answer: "mèo", letters: ["o", "m", "è"] },
  { emoji: "🐟", hint: "Con vật sống dưới nước", answer: "cá", letters: ["á", "c"] },
  { emoji: "🍊", hint: "Loại quả màu cam", answer: "cam", letters: ["m", "c", "a"] },
  { emoji: "🌸", hint: "Bông hoa xinh", answer: "hoa", letters: ["a", "h", "o"] },
  { emoji: "🪑", hint: "Đồ dùng để học và viết", answer: "bàn", letters: ["n", "b", "à"] },
  { emoji: "📚", hint: "Đồ dùng để đọc", answer: "sách", letters: ["h", "á", "s", "c"] },
  { emoji: "☀️", hint: "Ánh sáng của mặt trời", answer: "nắng", letters: ["g", "n", "ắ", "n"] },
  { emoji: "🌙", hint: "Tỏa sáng vào ban đêm", answer: "trăng", letters: ["g", "t", "n", "r", "ă"] },
  { emoji: "🍌", hint: "Loại quả màu vàng", answer: "chuối", letters: ["i", "c", "ố", "h", "u"] },
] as const;
