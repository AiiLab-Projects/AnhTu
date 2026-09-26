"use client";

import { useState } from "react";
import { speakVietnamese } from "@/lib/speech";

export function SpeakButton({ text, label }: { text: string; label: string }) {
  const [error, setError] = useState("");
  return <span className="speak-control"><button className="speak-button" type="button" onClick={async () => {
    setError("");
    const result = await speakVietnamese(text, setError);
    if (result) setError(result);
  }}>{label}</button>{error && <span className="speech-error" role="status">{error}</span>}</span>;
}
