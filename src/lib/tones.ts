// Tách / ghép dấu thanh tiếng Việt bằng Unicode: ở dạng NFD, dấu thanh là một ký tự kết hợp
// (combining mark) đi sau nguyên âm; dấu mũ, dấu trăng, dấu móc là các ký tự kết hợp KHÁC nên
// không bị đụng tới. Dùng cho trò "Đặt dấu thanh".
export const TONES = [
  { id: "ngang", name: "Ngang", mark: "" },
  { id: "huyen", name: "Huyền", mark: "\u0300" },
  { id: "sac", name: "Sắc", mark: "\u0301" },
  { id: "hoi", name: "Hỏi", mark: "\u0309" },
  { id: "nga", name: "Ngã", mark: "\u0303" },
  { id: "nang", name: "Nặng", mark: "\u0323" },
] as const;
export type ToneId = (typeof TONES)[number]["id"];

const TONE_MARKS: string[] = TONES.map((tone) => tone.mark).filter(Boolean);
const VOWELS = "aăâeêioôơuưy";
const HAT_VOWELS = "ăâêôơư";

/** Bỏ dấu thanh khỏi một ký tự (giữ dấu mũ, trăng, móc). */
function stripTone(char: string) {
  return [...char.normalize("NFD")].filter((c) => !TONE_MARKS.includes(c)).join("").normalize("NFC");
}

/** Thêm dấu thanh vào một ký tự (đã bỏ dấu thanh). */
export function addTone(char: string, tone: ToneId) {
  const mark = TONES.find((item) => item.id === tone)?.mark ?? "";
  return (char.normalize("NFD") + mark).normalize("NFC");
}

/** Vị trí đặt dấu khi tiếng chưa có dấu (đủ cho các tiếng đơn giản trong ngân hàng từ):
 *  ưu tiên nguyên âm có mũ/trăng/móc; "ua", "ia", "ưa" ở cuối thì đặt ở nguyên âm đầu; còn lại đặt ở nguyên âm cuối. */
function tonePosition(chars: string[]) {
  const vowelAt = chars.map((c, i) => (VOWELS.includes(c.toLowerCase()) ? i : -1)).filter((i) => i >= 0);
  if (!vowelAt.length) return 0;
  const hat = vowelAt.filter((i) => HAT_VOWELS.includes(chars[i].toLowerCase()));
  if (hat.length) return hat[hat.length - 1];
  const tail = chars.slice(-2).join("").toLowerCase();
  if (vowelAt.length >= 2 && ["ua", "ia"].includes(tail) && !chars.join("").toLowerCase().startsWith("qu")) return chars.length - 2;
  return vowelAt[vowelAt.length - 1];
}

/** Tách một tiếng thành: các ký tự không dấu thanh, vị trí mang dấu, và dấu thanh của tiếng. */
export function splitTone(word: string) {
  const chars = [...word.normalize("NFC")];
  let at = -1;
  let tone: ToneId = "ngang";
  chars.forEach((char, i) => {
    const found = TONES.find((item) => item.mark && char.normalize("NFD").includes(item.mark));
    if (found) { at = i; tone = found.id; }
  });
  const base = chars.map(stripTone);
  return { base, at: at >= 0 ? at : tonePosition(base), tone };
}

/** Ghép lại tiếng với một dấu thanh bất kỳ (để hiện tiếng em vừa chọn). */
export function withTone(word: string, tone: ToneId) {
  const { base, at } = splitTone(word);
  return base.map((char, i) => (i === at ? addTone(char, tone) : char)).join("");
}
