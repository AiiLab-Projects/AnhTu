# CLAUDE.md — Cô Tú (Anime Kids)

Website học tiếng Việt cho học sinh tiểu học, của cô Nguyễn Anh Tú. Next.js 15 (App Router) + React 19
+ TypeScript + Tailwind 3, **xuất tĩnh** (`output: "export"` → thư mục `out/`). Không có backend,
không có đăng nhập, không có database. Toàn bộ chữ trên giao diện là tiếng Việt.

Quy trình git / đưa code lên xem `@AGENTS.md` (dùng chung với Codex). Xử lý GitHub issue từ đầu tới
merge: skill `co-tu-issue` (`.claude/skills/co-tu-issue/`, có `shot.sh` chụp desktop + mobile).

## Lệnh

```bash
pnpm install
pnpm dev                    # http://localhost:3000
COTU_DEV=1 pnpm dev         # dev vào .next-local, không đè .next của lần build
pnpm run build              # BẮT BUỘC chạy trước khi push — đây là bước kiểm duy nhất
```

Không có test, không có lint script. `pnpm run build` vừa type-check vừa prerender 31 trang bài học,
nên lỗi TypeScript hay lỗi dữ liệu nội dung đều lộ ra ở đây.

Hosting: `.openai/hosting.json` phục vụ thư mục `out/` (tĩnh). Remote: `AiiLab-Projects/AnhTu`.

## Cấu trúc

| Đường | Vai trò |
|---|---|
| `src/content/site.ts` | Tên, menu, chữ trang chủ, thông tin liên hệ |
| `src/content/lessons.ts` | 31 bài học (`Lesson`: slug, points, check…) |
| `src/content/questions.ts` | `quizQuestions` (60 câu, 20/mức sao) + `wordExercises` (10 từ ghép chữ) |
| `src/app/*` | Trang: `/`, `/bai-hoc`, `/bai-hoc/[slug]`, `/bai-tap`, `/kiem-tra`, `/lien-he` |
| `src/components/` | UI; các component tương tác là `"use client"` |
| `src/lib/progress.ts` | Tiến độ lưu `localStorage` khoá `co-tu-progress` |
| `src/lib/speech.ts` | Phát giọng đọc (ghi âm → dự phòng giọng mặc định → Web Speech API) + nhật ký `co-tu-voice-log` |
| `src/lib/voice-catalog.json` | Danh mục giọng ghi âm; phần tử **đầu tiên là giọng mặc định** |
| `src/lib/voice-clips.json` | **Sinh tự động** — map chữ → mã băm; file là `<dir>/<hash>.<ext>` của từng giọng |
| `public/audio/vi/` | Piper vais1000: WAV ở gốc (~18 MB). Vbee: `<id>/*.mp3` mono 32 kbps. Giữ `CREDITS.txt` |
| `src/app/globals.css` | Gần như toàn bộ style (class tự đặt, Tailwind chỉ phụ) |

`src/components/Classroom.tsx` (trang Lớp học cho giáo viên) hiện **chưa gắn vào route nào** — chờ có
đăng nhập/phân quyền. Đừng xoá.

## Nội dung — những ràng buộc dễ vỡ

- **Sửa chữ = có thể mất giọng đọc.** `speakVietnamese(text)` tra file ghi âm theo **đúng nguyên văn**
  chuỗi. Các chuỗi được đọc: `${lesson.title}. ${lesson.intro}`, từng `point.example`,
  `question + sentence` (thay `___` bằng "chỗ trống"), `wordExercises[].hint`, và câu chào trong
  `Header.tsx`. Đổi một ký tự ở các chỗ này thì chuỗi đó rơi về giọng trình duyệt (có thể không có
  giọng tiếng Việt). Sau khi sửa, sinh lại âm thanh (xem dưới) hoặc báo cho Thanh.
- Thêm bài học: thêm phần tử vào `lessons` với `slug` duy nhất và `number` liên tiếp — nút "Bài tiếp
  theo" tìm `number + 1`. `check.answer` là **chỉ số** trong `options` (0-based).
- Câu kiểm tra: `options` đúng 4 phần tử, `answer` 0-based, `difficulty` 1|2|3. Giữ cân bằng số câu
  mỗi mức (logic chọn câu theo mức sao nằm ở `QuizExperience.tsx`: đúng +1 sao tối đa 3, sai về 1,
  không lặp trong lượt; hết câu ở mức thì cho lặp). `QUIZ_LENGTH = 20`.
- `wordExercises[].letters` phải ghép lại (theo thứ tự nào đó) đúng `answer`, kể cả dấu.
- Nếu đổi số bài/số câu, cập nhật chữ hiển thị tương ứng: `siteContent.stats`, README, `Classroom`.
- Lộ trình là tài liệu **bổ trợ** GDPT 2018, không phải thứ tự sách giáo khoa — giữ cách nói này.

## Sinh lại giọng đọc

```bash
node scripts/prepare-voice.mjs        # gom mọi chuỗi cần đọc → .audio-build/voice-lines.json + voice-clips.json
node scripts/check-voice.mjs          # mỗi giọng đủ bao nhiêu câu, câu nào thiếu, file nào thừa
VBEE_CONFIG=~/.claude/skills/vbee-tts/config.json python3 scripts/generate-vbee.py [id-giọng]
                                      # sinh các giọng Vbee còn thiếu, log từng câu vào .audio-build/vbee-log.jsonl
# Piper (giọng gốc): cần piper-tts + vi_VN-vais1000-medium.onnx trong .audio-build/ (không commit)
PYTHONPATH=<piper> python3 scripts/generate-voice.py
```

- Vbee tốn credit theo ký tự (~8.600 ký tự/giọng) và mất ~30 giây/câu; chạy song song bằng
  `VBEE_WORKERS=16`. Chạy lại an toàn: file đã có thì bỏ qua.
- Piper 1.8 trên macOS: espeak-ng không đọc được đường dẫn dữ liệu dài quá ~160 ký tự, nên cài
  venv ở đường ngắn hoặc trỏ `espeak_data_dir` qua symlink ngắn.
- Tên file là 16 ký tự đầu SHA-256 của chuỗi, nên sửa chữ sẽ để lại file mồ côi; `check-voice.mjs`
  liệt kê file thừa để xoá. Nếu thêm chỗ nào mới gọi `SpeakButton`/`speakVietnamese`, nhớ thêm chuỗi
  đó vào `prepare-voice.mjs`.
- Thêm giọng: thêm một phần tử vào `voice-catalog.json` (`engine: "vbee"`, `model` = mã giọng Vbee),
  chạy `generate-vbee.py <id>`, rồi ghi nguồn vào `public/audio/vi/CREDITS.txt`.
- Khi phụ huynh báo "không nghe được": hộp thoại 🔊 › "Nhật ký giọng đọc" › "Sao chép nhật ký" cho
  biết trình duyệt, giọng đang chọn, và từng lượt đọc thành công/lỗi. Nhật ký cũng in ra console
  với tiền tố `[Cô Tú · giọng đọc]`.

## Quy ước code

- Import qua alias `@/…` (= `src/…`).
- Style: viết class ngữ nghĩa trong `globals.css` theo kiểu đang có (`lesson-card--${tone}`,
  `page-container`, `inner-page`…); màu thương hiệu có trong `tailwind.config.ts`
  (`purple`, `pink`, `orange`, `yellow`, `cyan`, `lime`, `ink`) và biến CSS trên `:root` của
  `globals.css` (`--page-gradient`, `--shadow-card`, `--page-width`…). Font: Baloo 2 (tiêu đề) +
  Be Vietnam Pro (chữ thường).
- Hiệu ứng chuyển động phải có nhánh `prefers-reduced-motion` (đã có sẵn khối trong `globals.css`).
- Xuất tĩnh: không dùng API route, server action, `next/image` tối ưu, hay thứ gì cần server.
  Trang động phải có `generateStaticParams`.
- Truy cập `window`/`localStorage` chỉ trong client component, có guard `typeof window` như `lib/`.
- Giọng văn giao diện: xưng "Cô" – "em", câu ngắn, thân thiện với trẻ nhỏ.

## Lưu ý

- README nhắc `C:\anhTu\Mo-website-Co-Tu.cmd` — đó là máy Windows của cô Tú, không có trong repo.
- Thông tin liên hệ trong `site.ts` là thật; không thay bằng dữ liệu giả.
