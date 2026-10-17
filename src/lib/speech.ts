import voiceClips from "./voice-clips.json";
import voiceCatalog from "./voice-catalog.json";

export type RecordedVoice = (typeof voiceCatalog)[number];
export type VoiceLogEntry = { at: number; text: string; source: string; ok: boolean; note?: string };

export const recordedVoices: RecordedVoice[] = voiceCatalog;
const DEFAULT_VOICE = recordedVoices[0];
const clips = voiceClips as Record<string, string>;

const VOICE_KEY = "co-tu-voice";
const MUTE_KEY = "co-tu-voice-muted";
const LOG_KEY = "co-tu-voice-log";
const LOG_LIMIT = 40;

const muteListeners = new Set<() => void>();

/** Trạng thái tắt tiếng — lưu trong localStorage; không tự động mở lại sau khi tắt. */
export function isVoiceMuted() {
  if (typeof window === "undefined") return false;
  return safeGet(MUTE_KEY) === "1";
}
export function setVoiceMuted(muted: boolean) {
  safeSet(MUTE_KEY, muted ? "1" : null);
  muteListeners.forEach((listener) => listener());
}
export function subscribeVoiceMuted(listener: () => void) {
  muteListeners.add(listener);
  return () => { muteListeners.delete(listener); };
}
const NO_VIETNAMESE_VOICE = "Nội dung này chưa có bản ghi âm và thiết bị chưa có giọng tiếng Việt.";

let speechRequest = 0;
let activeAudio: HTMLAudioElement | null = null;
let logCache: VoiceLogEntry[] | null = null;
const logListeners = new Set<() => void>();

// Giá trị lưu: mã giọng ghi âm (voice-catalog.json) hoặc tên giọng của thiết bị.
// "vietnamese" là giá trị cũ trước khi có nhiều giọng, nay trỏ về giọng mặc định.
export function getVoicePreference() {
  if (typeof window === "undefined") return DEFAULT_VOICE.id;
  const saved = safeGet(VOICE_KEY);
  return !saved || saved === "default" || saved === "vietnamese" ? DEFAULT_VOICE.id : saved;
}

export function setVoicePreference(value: string) {
  if (typeof window !== "undefined") safeSet(VOICE_KEY, value);
}

function safeGet(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function safeSet(key: string, value: string | null) {
  try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch { /* chế độ riêng tư */ }
}

export function getVoiceLog(): VoiceLogEntry[] {
  if (logCache) return logCache;
  try { logCache = JSON.parse(safeGet(LOG_KEY) ?? "[]"); } catch { logCache = []; }
  if (!Array.isArray(logCache)) logCache = [];
  return logCache;
}

export function clearVoiceLog() {
  logCache = [];
  safeSet(LOG_KEY, null);
  logListeners.forEach((listener) => listener());
}

export function subscribeVoiceLog(listener: () => void) {
  logListeners.add(listener);
  return () => { logListeners.delete(listener); };
}

function log(entry: Omit<VoiceLogEntry, "at">) {
  const full = { at: Date.now(), ...entry };
  logCache = [full, ...getVoiceLog()].slice(0, LOG_LIMIT);
  safeSet(LOG_KEY, JSON.stringify(logCache));
  (full.ok ? console.info : console.warn)("[Cô Tú · giọng đọc]", full.source, full.ok ? "OK" : "LỖI", full.note ?? "", "·", full.text);
  logListeners.forEach((listener) => listener());
}

/** Bản nhật ký dạng chữ để phụ huynh sao chép gửi cho người sửa lỗi. */
export function formatVoiceLog() {
  const device = getVietnameseVoices().map((voice) => `${voice.name} (${voice.lang})`).join(", ") || "không có";
  const head = [
    `Trình duyệt: ${navigator.userAgent}`,
    `Giọng đang chọn: ${getVoicePreference()}`,
    `Giọng tiếng Việt trên thiết bị: ${device}`,
    "",
  ];
  const rows = getVoiceLog().map((entry) =>
    `${new Date(entry.at).toLocaleString("vi-VN")} · ${entry.ok ? "OK" : "LỖI"} · ${entry.source}${entry.note ? ` · ${entry.note}` : ""} · ${entry.text}`);
  return [...head, ...rows].join("\n");
}

function isVietnameseVoice(voice: SpeechSynthesisVoice) {
  return /^vi(?:[-_]|$)/i.test(voice.lang);
}

function voicePriority(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  if (name.includes("google")) return 3;
  if (/hoai.?my|female|giọng nữ/.test(name)) return 2;
  if (/nam.?minh|male/.test(name)) return 0;
  return 1;
}

export function getVietnameseVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices().filter(isVietnameseVoice)
    .sort((a, b) => voicePriority(b) - voicePriority(a));
}

function waitForVietnameseVoices(synth: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> {
  const available = getVietnameseVoices();
  if (available.length) return Promise.resolve(available);

  return new Promise((resolve) => {
    const finish = () => {
      synth.removeEventListener("voiceschanged", onChange);
      clearTimeout(timer);
      resolve(getVietnameseVoices());
    };
    const onChange = () => {
      if (getVietnameseVoices().length) finish();
    };
    synth.addEventListener("voiceschanged", onChange);
    const timer = window.setTimeout(finish, 1800);
    onChange();
  });
}

/** Câu này đã có trong danh mục ghi âm chưa (voice-clips.json sinh cùng lúc với file âm thanh). */
export function hasRecordedClip(text: string) {
  return Boolean(clips[text]);
}

function clipUrl(voice: RecordedVoice, text: string) {
  const id = clips[text];
  return id ? `${voice.dir}/${id}.${voice.ext}` : null;
}

/** Phát bản ghi âm của một giọng: "played", "missing" (câu chưa có mã) hoặc "failed" (tải/phát hỏng). */
async function playRecorded(text: string, voice: RecordedVoice) {
  const url = clipUrl(voice, text);
  if (!url) return "missing";
  const source = `ghi âm: ${voice.id}`;
  const audio = new Audio(url);
  activeAudio = audio;
  audio.onended = () => { if (activeAudio === audio) activeAudio = null; };
  try {
    await audio.play();
    log({ text, source, ok: true });
    return "played";
  } catch (error) {
    if (activeAudio === audio) activeAudio = null;
    const reason = audio.error ? `không tải được ${url}` : `không phát được: ${error instanceof Error ? error.name : String(error)}`;
    log({ text, source, ok: false, note: reason });
    return "failed";
  }
}

/** Thử giọng đã chọn, hỏng thì thử giọng mặc định. Trả về null khi đã phát, "none" khi không có bản ghi nào. */
async function playWithFallback(text: string, voice: RecordedVoice, request: number) {
  let result = await playRecorded(text, voice);
  if (result !== "played" && voice !== DEFAULT_VOICE && request === speechRequest) {
    log({ text, source: `ghi âm: ${voice.id}`, ok: false, note: "chuyển sang giọng mặc định" });
    result = await playRecorded(text, DEFAULT_VOICE);
  }
  if (result === "played" || request !== speechRequest) return null;
  return result === "failed" ? "Không phát được bản ghi âm. Vui lòng thử lại." : "none";
}

export async function speakVietnamese(text: string, onError?: (message: string) => void): Promise<string | null> {
  if (typeof window === "undefined") return null;
  // Nếu người dùng tắt tiếng ở nút trên header, bỏ qua mọi yêu cầu phát.
  if (isVoiceMuted()) return null;

  const synth = window.speechSynthesis;
  const request = ++speechRequest;
  synth?.cancel();
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  const preference = getVoicePreference();
  const recorded = recordedVoices.find((voice) => voice.id === preference);
  if (recorded || !synth) {
    const result = await playWithFallback(text, recorded ?? DEFAULT_VOICE, request);
    if (result !== "none") return result;
    if (!synth) {
      log({ text, source: "không có", ok: false, note: "chưa có bản ghi, trình duyệt không hỗ trợ đọc" });
      return NO_VIETNAMESE_VOICE;
    }
  }

  const available = getVietnameseVoices();
  const voices = available.length ? available : await waitForVietnameseVoices(synth);
  if (request !== speechRequest) return null;
  if (!voices.length) {
    const fallback = await playWithFallback(text, DEFAULT_VOICE, request);
    if (fallback !== "none") return fallback;
    log({ text, source: "không có", ok: false, note: "chưa có bản ghi, thiết bị không có giọng tiếng Việt" });
    return NO_VIETNAMESE_VOICE;
  }

  const selected = voices.find((voice) => voice.name === preference) ?? voices[0];
  const source = `thiết bị: ${selected.name}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selected;
  utterance.lang = selected.lang;
  utterance.rate = 0.88;
  utterance.onstart = () => log({ text, source, ok: true });
  utterance.onerror = (event) => {
    if (event.error === "canceled" || event.error === "interrupted") return;
    log({ text, source, ok: false, note: event.error });
    onError?.(event.error === "language-unavailable" || event.error === "voice-unavailable"
      ? NO_VIETNAMESE_VOICE
      : "Không thể phát giọng đọc lúc này. Vui lòng thử lại.");
  };
  synth.speak(utterance);
  return null;
}
