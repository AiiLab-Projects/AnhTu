"use client";

import { useState } from "react";
import { speakVietnamese } from "@/lib/speech";

export function SpeakButton({ text, label }: { text: string; label: string }) {
  const [unsupported, setUnsupported] = useState(false);
  return <span className="speak-control"><button className="speak-button" type="button" onClick={() => setUnsupported(!speakVietnamese(text))}>{label}</button>{unsupported && <span className="speech-error" role="status">Trình duyệt này chưa hỗ trợ đọc văn bản.</span>}</span>;
}
