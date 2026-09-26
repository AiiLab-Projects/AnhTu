---
name: co-tu-issue
description: Xử lý GitHub issue của website Cô Tú (repo AiiLab-Projects/AnhTu) từ đầu tới cuối — đọc issue, cắt nhánh, sửa, nghiệm thu bằng build + ảnh chụp desktop/mobile (và giọng đọc khi đụng nội dung), mở PR, tự review, squash-merge về main, đóng issue kèm bằng chứng. Dùng khi nói "xử lý issue", "làm issue #n", "fix các open issue", "review PR rồi merge", "còn issue nào", hoặc khi có issue mới trên repo này. Với issue mơ hồ (chỉ có tiêu đề) thì rà giao diện bằng ảnh chụp để biến nó thành việc cụ thể.
---

# Xử lý issue — Cô Tú

Repo: `AiiLab-Projects/AnhTu` (private). Site tĩnh Next.js xuất ra `out/`. Đọc `CLAUDE.md` trước:
các ràng buộc về nội dung và giọng đọc nằm ở đó.

## 0. Lấy hàng đợi

```sh
gh issue list --state open --json number,title,body,labels,createdAt
gh pr list --state open
```

Issue ở repo này thường **rất ngắn** (một dòng, đôi khi chỉ có tiêu đề). Đọc cả comment:
`gh issue view <n> --comments`. Chạy lại `gh issue list` sau mỗi PR vì issue mới hay xuất hiện
giữa chừng.

Phân loại trước khi làm:

| Loại | Ví dụ | Cách làm |
|---|---|---|
| Cụ thể | "sửa padding `.hero-inner` thành `0 0 82px`" | làm đúng chữ, không suy diễn thêm |
| Mơ hồ | "Đề xuất cải tiến giao diện" | chụp 6 trang (bước 2), sửa các lỗi **nhìn thấy được** và rủi ro thấp, rồi comment danh sách đề xuất lớn hơn vào issue để duyệt |
| Có quyết định của người dùng | chọn nguồn giọng, chi phí, giấy phép, đổi nội dung bài | hỏi trước (AskUserQuestion), kèm mẫu nếu được |

### Nhiều issue cùng lúc

Khi có ≥2 issue độc lập và người dùng muốn chạy song song: mỗi issue một `Agent` với
`isolation: "worktree"`, prompt tự đứng được (nguyên văn issue, file được/không được đụng, lệnh
nghiệm thu, trailer commit), và dặn **dừng sau khi mở PR** — người điều phối review, xem ảnh, merge.
Các issue cùng sửa `globals.css` thì dặn mỗi agent gom CSS vào một khối có comment `(#n)` ở cuối file;
mỗi lần merge xong một PR, `SendMessage` cho agent còn lại để `git rebase origin/main` trước khi push.
Cổng 4173 lúc đó thường bị chiếm, nên agent tự serve `out/` ở cổng khác.

## 1. Nhánh

```sh
git fetch -q origin && git switch -c issue/<n>-<slug> origin/main
```

Một issue một nhánh một PR. Hai issue cùng sửa `globals.css` thì làm tuần tự: merge cái trước,
`git switch main && git pull --ff-only`, rồi mới cắt nhánh sau.

## 2. Nghiệm thu — build rồi nhìn

```sh
pnpm run build                                        # bắt buộc, là bước kiểm duy nhất
.claude/skills/co-tu-issue/shot.sh "$SCRATCH/sau" "" lien-he   # ảnh desktop + mobile
```

Mở ảnh bằng Read và **nhìn thật**. Với sửa CSS, chụp cả trước (trên `main`) và sau.
Kiểm ít nhất: không tràn ngang ở mobile, không chữ bị đè, header không che nội dung.

Bẫy đã gặp: Chrome headless với `--window-size=390,...` vẽ trang như rộng ~500px và cắt mép phải,
trông như lỗi tràn ngang mà thật ra không có. Luôn dùng `shot.sh` (Playwright, `--device="Pixel 7"`).

Khi đụng chữ trong `src/content/*` hay nơi gọi `SpeakButton`/`speakVietnamese`:

```sh
node scripts/prepare-voice.mjs && node scripts/check-voice.mjs   # mọi giọng phải ✓ đủ câu
```

Thiếu câu thì sinh giọng lại (xem `CLAUDE.md` › Sinh lại giọng đọc) hoặc ghi rõ trong PR là
câu đó sẽ rơi về giọng thiết bị.

## 3. Commit, PR

```sh
git add -- <đúng file của issue>                       # không `git add -A`
git commit -F - <<'MSG'
<tiêu đề tiếng Anh ngắn> (#<n>)

<vì sao>

Closes #<n>
MSG
git push -u origin HEAD
git rev-parse HEAD && git ls-remote origin refs/heads/<nhánh>   # sha phải khớp rồi mới merge
gh pr create --base main --title "<tiêu đề tiếng Việt> (#<n>)" --body-file - <<'EOF'
## Thay đổi
## Nghiệm thu
Closes #<n>
EOF
```

Luôn dùng heredoc nháy đơn: backtick trong `-m`/`--body` bị shell chạy như lệnh.

Muốn PR **không** đóng issue (ví dụ sửa một phần) thì bỏ `Closes #n` khỏi **cả commit message** lẫn PR
body: squash-merge dùng message của commit, nên sửa riêng PR body thành `Refs #n` vẫn đóng issue (#14).

## 4. Review rồi merge

Tự review bằng `gh pr diff <pr>` trước khi merge, theo danh sách:

- Diff chỉ gồm đúng phạm vi issue; không lẫn `CLAUDE.md`, `.audio-build/`, `out/`.
- CSS mới có nhánh cho `@media (max-width: 760px)` nếu ảnh hưởng mobile; chuyển động có nhánh
  `prefers-reduced-motion`.
- Không thêm thứ cần server (API route, server action) — site là `output: "export"`.
- `localStorage` chỉ dùng trong client component, bọc try/catch hoặc guard `typeof window`.
- Chữ trên giao diện xưng "Cô" – "em", đúng chính tả, đúng dấu.

PR có hơn 300 file (ví dụ thêm cả bộ mp3) thì `gh pr diff` báo HTTP 406: review bằng
`git diff origin/main -- <file code>` ở máy.

Rebase hai PR cùng thêm khối vào cuối `globals.css`: sau khi giải xung đột, **đếm `{` và `}`** và
chạy `pnpm run build` rồi mới `git add` + `rebase --continue` + push — git hay coi dấu `}` cuối là phần
chung và để một khối hở (đã làm `main` build hỏng ở #26, sửa ở #27).

Ghi kết quả review thành comment (`gh pr comment`). Tài khoản mở PR cũng là tài khoản merge, nên
GitHub không cho `--approve`. Sau đó:

```sh
gh pr merge <pr> --squash --delete-branch
git switch main && git pull --ff-only
gh issue view <n> --json state      # Closes #n phải đã tự đóng
```

**Check Netlify `deploy-preview` đang đỏ ở mọi PR**: Netlify không chạy build (hỏng vài giây sau
push), site không thuộc tài khoản Netlify `tanthanhkid` trên máy — xem issue #14. Đừng chặn merge vì nó, nhưng
ghi một dòng trong comment review. Nếu build local cũng hỏng thì mới là lỗi thật.

## 5. Báo cáo

Trả lời Thanh: issue nào đã đóng (kèm PR), issue nào còn mở và vì sao, đề xuất nào đang chờ duyệt.
