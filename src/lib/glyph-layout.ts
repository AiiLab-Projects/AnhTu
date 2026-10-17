import { glyphStrokes } from "@/content/letter-strokes";

// Bố cục chữ dùng chung cho thẻ xem nét (LetterCard) và chế độ tô theo (LetterTrace).
export const GLYPH_W = 120;
const GLYPH_GAP = 14;

// Điểm đặt bút = toạ độ sau chữ M đầu tiên của nét.
export function startOf(path: string) {
  const match = /M\s*([\d.]+)\s+([\d.]+)/.exec(path);
  return { x: match ? Number(match[1]) : 0, y: match ? Number(match[2]) : 0 };
}

// Bề ngang thật của một chữ trong khung 120: đọc toạ độ x của mọi điểm trong nét (V không có x).
function xRange(strokes: string[]) {
  let min = Infinity, max = -Infinity;
  for (const d of strokes) {
    for (const [, cmd, args] of d.matchAll(/([MLHVCQ])([^MLHVCQ]*)/g)) {
      if (cmd === "V") continue;
      const nums = args.trim().split(/[\s,]+/).map(Number);
      const xs = cmd === "H" ? nums : nums.filter((_, i) => i % 2 === 0);
      for (const x of xs) { min = Math.min(min, x); max = Math.max(max, x); }
    }
  }
  return { min, max };
}

// Xếp các chữ đơn liền nhau cho chữ ghép (tr, th, ia…); một chữ thì giữ nguyên khung 120×150.
export function layoutWord(word: string) {
  const chars = [...word];
  if (chars.length === 1) return { width: GLYPH_W, parts: [{ dx: 0, strokes: glyphStrokes[word] }] };
  let cursor = 0;
  const parts = chars.map((char) => {
    const strokes = glyphStrokes[char];
    const { min, max } = xRange(strokes);
    const part = { dx: cursor - min, strokes };
    cursor += max - min + GLYPH_GAP;
    return part;
  });
  const inner = cursor - GLYPH_GAP;
  const width = Math.max(GLYPH_W, inner + 60);
  const shift = (width - inner) / 2;
  return { width, parts: parts.map((part) => ({ ...part, dx: part.dx + shift })) };
}
