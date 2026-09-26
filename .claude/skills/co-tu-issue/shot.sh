#!/bin/sh
# Chụp các trang của bản build tĩnh ở desktop 1440×900 và mobile Pixel 7.
# Dùng: .claude/skills/co-tu-issue/shot.sh <thư-mục-ảnh> [trang ...]
#   ví dụ: shot.sh "$SCRATCH/truoc" "" bai-hoc bai-hoc/nhom-a kiem-tra
# Không truyền trang thì chụp đủ 6 trang chính. Cần `pnpm run build` trước.
# Dùng Playwright + Chrome thật: Chrome headless với --window-size nhỏ vẽ sai bố cục mobile.
set -e
OUT=${1:?thiếu thư mục ảnh}; shift
[ $# -eq 0 ] && set -- "" bai-hoc bai-hoc/nhom-a bai-tap kiem-tra lien-he
mkdir -p "$OUT"
PORT=4173
if ! curl -s -o /dev/null "http://localhost:$PORT/"; then
  npx -y serve out -l $PORT >/dev/null 2>&1 &
  sleep 4
fi
for page in "$@"; do
  name=$(printf 'home%s' "$page" | tr / _)
  npx -y playwright@1.56 screenshot -b chromium --channel chrome --viewport-size=1440,900 --full-page "http://localhost:$PORT/$page" "$OUT/d_$name.png" >/dev/null 2>&1
  npx -y playwright@1.56 screenshot -b chromium --channel chrome --device="Pixel 7" --full-page "http://localhost:$PORT/$page" "$OUT/m_$name.png" >/dev/null 2>&1
  echo "$OUT/d_$name.png  $OUT/m_$name.png"
done
