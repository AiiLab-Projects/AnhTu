const VOICE_KEY = "co-tu-voice";

export function getVoicePreference() {
  if (typeof window === "undefined") return "vietnamese";
  return localStorage.getItem(VOICE_KEY) ?? "vietnamese";
}

export function setVoicePreference(value: string) {
  if (typeof window !== "undefined") localStorage.setItem(VOICE_KEY, value);
}

export function speakVietnamese(text: string): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  utterance.rate = 0.86;
  const preference = getVoicePreference();
  const voices = window.speechSynthesis.getVoices();
  const selected = preference === "default"
    ? undefined
    : voices.find((voice) => voice.name === preference)
      ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("vi"));
  if (selected) utterance.voice = selected;
  window.speechSynthesis.speak(utterance);
  return true;
}
