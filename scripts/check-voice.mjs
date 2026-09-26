// Kiểm tra mỗi giọng trong voice-catalog.json có đủ bản ghi cho mọi câu trong voice-clips.json.
// Chạy: node scripts/check-voice.mjs   (thoát mã 1 nếu còn thiếu)
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const clips = JSON.parse(readFileSync("src/lib/voice-clips.json", "utf8"));
const catalog = JSON.parse(readFileSync("src/lib/voice-catalog.json", "utf8"));
const ids = new Set(Object.values(clips));
let missingTotal = 0;

for (const voice of catalog) {
  const dir = join("public", voice.dir);
  const files = existsSync(dir) ? readdirSync(dir).filter((name) => name.endsWith(`.${voice.ext}`)) : [];
  const present = new Set(files.map((name) => name.slice(0, -voice.ext.length - 1)));
  const missing = Object.entries(clips).filter(([, id]) => !present.has(id));
  const orphans = [...present].filter((id) => !ids.has(id));
  const bytes = files.reduce((sum, name) => sum + statSync(join(dir, name)).size, 0);
  missingTotal += missing.length;
  console.log(`${missing.length ? "✗" : "✓"} ${voice.id.padEnd(16)} ${ids.size - missing.length}/${ids.size} câu · ${(bytes / 1e6).toFixed(1)} MB${orphans.length ? ` · ${orphans.length} file thừa` : ""}`);
  for (const [text] of missing.slice(0, 5)) console.log(`    thiếu: ${text}`);
  if (missing.length > 5) console.log(`    … và ${missing.length - 5} câu nữa`);
  for (const id of orphans.slice(0, 5)) console.log(`    thừa: ${join(dir, `${id}.${voice.ext}`)}`);
}

const log = ".audio-build/vbee-log.jsonl";
if (existsSync(log)) {
  const failures = readFileSync(log, "utf8").trim().split("\n").filter(Boolean).map((line) => JSON.parse(line)).filter((entry) => !entry.ok);
  if (failures.length) console.log(`\nNhật ký Vbee có ${failures.length} lượt lỗi, gần nhất: ${failures.at(-1).voice} · ${failures.at(-1).error}`);
}

process.exit(missingTotal ? 1 : 0);
