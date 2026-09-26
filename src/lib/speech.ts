const VOICE_KEY = "co-tu-voice";
const NO_VIETNAMESE_VOICE = "Thiết bị chưa có giọng đọc tiếng Việt. Hãy bật giọng tiếng Việt trong trình duyệt hoặc hệ điều hành rồi thử lại.";

let speechRequest = 0;

export function getVoicePreference() {
  if (typeof window === "undefined") return "vietnamese";
  const saved = localStorage.getItem(VOICE_KEY);
  return saved && saved !== "default" ? saved : "vietnamese";
}

export function setVoicePreference(value: string) {
  if (typeof window !== "undefined") localStorage.setItem(VOICE_KEY, value);
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

export async function speakVietnamese(text: string, onError?: (message: string) => void): Promise<string | null> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return "Trình duyệt này chưa hỗ trợ đọc văn bản.";
  }

  const synth = window.speechSynthesis;
  const request = ++speechRequest;
  synth.cancel();
  const available = getVietnameseVoices();
  const voices = available.length ? available : await waitForVietnameseVoices(synth);
  if (request !== speechRequest) return null;
  if (!voices.length) return NO_VIETNAMESE_VOICE;

  const preference = getVoicePreference();
  const selected = voices.find((voice) => voice.name === preference) ?? voices[0];
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selected;
  utterance.lang = selected.lang;
  utterance.rate = 0.88;
  utterance.onerror = (event) => {
    if (event.error === "canceled" || event.error === "interrupted") return;
    onError?.(event.error === "language-unavailable" || event.error === "voice-unavailable"
      ? NO_VIETNAMESE_VOICE
      : "Không thể phát giọng đọc lúc này. Vui lòng thử lại.");
  };
  synth.speak(utterance);
  return null;
}
