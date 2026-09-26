import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");

function loadContent(path) {
  const source = readFileSync(path, "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  runInNewContext(code, { exports });
  return exports;
}

const { lessons } = loadContent("src/content/lessons.ts");
const { quizQuestions, wordExercises } = loadContent("src/content/questions.ts");
const texts = new Set(["Chào em, cô là Cô Tú. Chúng mình cùng học tiếng Việt nhé!"]);

for (const lesson of lessons) {
  texts.add(`${lesson.title}. ${lesson.intro}`);
  for (const point of lesson.points) texts.add(point.example);
}
for (const question of quizQuestions) {
  texts.add(`${question.question} ${question.sentence?.replace("___", "chỗ trống") ?? ""}`);
}
for (const item of wordExercises) texts.add(item.hint);

const lines = [...texts].map((text) => ({
  text,
  file: `${createHash("sha256").update(text).digest("hex").slice(0, 16)}.wav`,
}));
mkdirSync(".audio-build", { recursive: true });
writeFileSync(".audio-build/voice-lines.json", JSON.stringify(lines, null, 2) + "\n");
writeFileSync("src/lib/voice-clips.json", JSON.stringify(Object.fromEntries(lines.map(({ text, file }) => [text, `/audio/vi/${file}`])), null, 2) + "\n");
console.log(`Prepared ${lines.length} Vietnamese voice lines.`);
