// Ngân hàng từ cho trò "Nghe và chọn tranh" (/bai-tap?tro=nghe-chon-tranh).
// Cô Tú chỉ đọc những từ ĐÃ CÓ ghi âm (xem `hasRecordedClip` trong lib/speech.ts), để trò vẫn
// nghe được trên máy không có giọng tiếng Việt. Từ chưa có ghi âm vẫn làm tranh gây nhiễu, và tự
// được đọc khi sinh giọng lại (`scripts/prepare-voice.mjs` đã gom các từ ở đây).
// Mỗi tranh (emoji) chỉ dùng cho một từ để không có hai đáp án giống nhau.
export const listenWords: { word: string; emoji: string }[] = [
  // Từ ở bài 1–5 (đã có ghi âm)
  { word: "ba", emoji: "👨" },
  { word: "bà", emoji: "👵" },
  { word: "bé", emoji: "👶" },
  { word: "ba ba", emoji: "🐢" },
  { word: "cá", emoji: "🐟" },
  { word: "cà", emoji: "🍆" },
  { word: "ca", emoji: "🥛" },
  { word: "na", emoji: "🍈" },
  { word: "bê", emoji: "🐄" },
  { word: "bè", emoji: "🛶" },
  // Từ ở bài 6–9 và từ quen thuộc khác
  { word: "cua", emoji: "🦀" },
  { word: "dưa", emoji: "🍉" },
  { word: "mưa", emoji: "🌧️" },
  { word: "thỏ", emoji: "🐰" },
  { word: "tre", emoji: "🎋" },
  { word: "trà", emoji: "🍵" },
  { word: "tổ", emoji: "🪺" },
  { word: "tô", emoji: "🥣" },
  { word: "thư", emoji: "✉️" },
  { word: "xe", emoji: "🚗" },
  { word: "gà", emoji: "🐔" },
  { word: "mèo", emoji: "🐱" },
  { word: "chó", emoji: "🐶" },
  { word: "hoa", emoji: "🌸" },
  { word: "cờ", emoji: "🚩" },
];
