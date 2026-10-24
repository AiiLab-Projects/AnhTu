// Ngân hàng từ cho trò "Đặt dấu thanh" (/bai-tap?tro=dien-dau-thanh).
// Ghi từ ĐÚNG DẤU; trò tự tách dấu ra (lib/tones.ts) để em chọn lại. Chỉ dùng tiếng một âm tiết,
// tranh rõ nghĩa. Từ đã có ghi âm sẽ được Cô Tú đọc sau khi em chọn; `prepare-voice.mjs` gom các
// từ ở đây để lần sinh giọng sau có đủ.
export const toneWords: { word: string; emoji: string }[] = [
  // Ngang
  { word: "ca", emoji: "🥛" },
  { word: "bê", emoji: "🐄" },
  { word: "na", emoji: "🍈" },
  { word: "cua", emoji: "🦀" },
  { word: "xe", emoji: "🚗" },
  { word: "mưa", emoji: "🌧️" },
  // Huyền
  { word: "bà", emoji: "👵" },
  { word: "cà", emoji: "🍆" },
  { word: "gà", emoji: "🐔" },
  { word: "mèo", emoji: "🐱" },
  { word: "trà", emoji: "🍵" },
  { word: "rùa", emoji: "🐢" },
  // Sắc
  { word: "cá", emoji: "🐟" },
  { word: "bé", emoji: "👶" },
  { word: "chó", emoji: "🐶" },
  { word: "lá", emoji: "🍃" },
  { word: "mía", emoji: "🎋" },
  { word: "cáo", emoji: "🦊" },
  // Hỏi
  { word: "thỏ", emoji: "🐰" },
  { word: "tổ", emoji: "🪺" },
  { word: "khỉ", emoji: "🐵" },
  { word: "cỏ", emoji: "🌿" },
  { word: "vở", emoji: "📒" },
  { word: "hổ", emoji: "🐯" },
  // Ngã
  { word: "mũ", emoji: "🧢" },
  { word: "sữa", emoji: "🍼" },
  { word: "đĩa", emoji: "🍽️" },
  { word: "gỗ", emoji: "🪵" },
  { word: "vẽ", emoji: "🎨" },
  // Nặng
  { word: "mẹ", emoji: "👩" },
  { word: "kẹo", emoji: "🍬" },
  { word: "vịt", emoji: "🦆" },
  { word: "gạo", emoji: "🍚" },
  { word: "ngựa", emoji: "🐴" },
  { word: "lọ", emoji: "🏺" },
];
