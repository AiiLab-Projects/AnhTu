// Convert PNG trong public/img/ sang WebP, resize về đúng size hiển thị thực.
// Dùng: node scripts/optimize-images.mjs
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/img";

// maxW là chiều rộng tối đa file WebP được xuất ra. Đã tính theo kích thước
// hiển thị thực × 2 (retina) + chút buffer. Nhỏ hơn → file nhẹ hơn, nhưng pixelated
// khi phóng to. Lớn hơn → nét hơn nhưng tốn băng thông.
const SPECS = [
  { name: "01-hero-background",            maxW: 1920, quality: 80 }, // bg hero full-width, cover 1920
  { name: "01-co-tu-character-v2",         maxW: 720,  quality: 86 }, // hero character max display ~340px
  { name: "02-cat-mascot-v2",              maxW: 340,  quality: 86 }, // hero cat max ~160px
  { name: "03-alphabet-island-v2",         maxW: 840,  quality: 86 }, // adventure card + lesson hero
  { name: "04-tone-island-v2",             maxW: 840,  quality: 86 },
  { name: "05-reward-island-v2",           maxW: 840,  quality: 86 }, // adventure + quiz hero
  { name: "06-star-mascot-v2",             maxW: 400,  quality: 86 }, // quiz result + reward modal max ~180px
  { name: "07-direction-sign-v2",          maxW: 500,  quality: 86 }, // dự phòng
  { name: "08-learning-decorations-v2png", maxW: 600,  quality: 86 }, // dự phòng (sprite)
  { name: "09-co-tu-avatar-v2",            maxW: 300,  quality: 86 }, // avatar lớn nhất ~128px (quiz)
];

let totalBefore = 0;
let totalAfter = 0;

for (const spec of SPECS) {
  const src = path.join(SRC_DIR, `${spec.name}.png`);
  const out = path.join(SRC_DIR, `${spec.name}.webp`);
  try {
    const before = (await fs.stat(src)).size;
    await sharp(src)
      .resize({ width: spec.maxW, withoutEnlargement: true })
      .webp({ quality: spec.quality, effort: 6 })
      .toFile(out);
    const after = (await fs.stat(out)).size;
    totalBefore += before;
    totalAfter += after;
    const pct = Math.round((1 - after / before) * 100);
    console.log(`${spec.name}: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (−${pct}%)`);
  } catch (err) {
    console.warn(`${spec.name}: skip (${err.message})`);
  }
}

console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024/1024).toFixed(2)}MB  (−${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
