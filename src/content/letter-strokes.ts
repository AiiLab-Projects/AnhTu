// Nét viết của từng chữ (#29), vẽ tay trên khung 120×150, dòng kẻ đáy ở y = 122.
// Mỗi phần tử là MỘT nét, theo thứ tự đưa bút; điểm bắt đầu nét là toạ độ sau chữ M.
// Đây là chữ viết tay tự vẽ cho bài học bổ trợ, không sao chép từ mẫu chữ của sách giáo khoa nào.
export const glyphStrokes: Record<string, string[]> = {
  A: ["M18 122 L60 24 L102 122", "M34 88 H86"],
  a: ["M80 84 C72 64 40 64 38 92 C36 118 66 126 80 106", "M80 66 V112 Q80 120 92 118"],
  B: ["M34 24 V122", "M34 24 H64 C92 24 92 70 64 72 H34", "M64 72 C98 72 98 122 64 122 H34"],
  b: ["M38 20 V122", "M38 94 C44 66 82 66 84 94 C86 122 48 128 38 106"],
  C: ["M98 48 C84 20 34 22 30 72 C28 122 84 128 100 98"],
  c: ["M84 78 C70 60 38 66 38 94 C38 122 72 126 84 112"],
  E: ["M96 24 H38 V122 H96", "M38 72 H86"],
  e: ["M38 96 H84 C86 62 40 56 38 94 C36 124 70 128 84 114"],
  Ê: ["M96 30 H38 V122 H96", "M38 76 H86", "M54 20 L67 8 L80 20"],
  ê: ["M38 96 H84 C86 62 40 56 38 94 C36 124 70 128 84 114", "M50 48 L62 36 L74 48"],
};

// Dấu thanh vẽ trên khung 100×80.
export const markStrokes: Record<"huyen" | "sac", string[]> = {
  huyen: ["M30 14 L68 58"],
  sac: ["M68 14 L30 58"],
};
