"use client";

import { useState } from "react";
import { speakVietnamese } from "@/lib/speech";
import { Icon } from "./Icon";

export function SpeakButton({ text, label }: { text: string; label: string }) {
  const [error, setError] = useState("");
  // Giữ nguyên nhãn callers truyền vào, nhưng bỏ các ký hiệu loa cũ để icon SVG thay thế.
  const cleanLabel = label.replace(/^(🔊|▶|🎧)\s*/u, "").trim();
  return (
    <span className="speak-control">
      <button
        className="speak-button"
        type="button"
        onClick={async () => {
          setError("");
          const result = await speakVietnamese(text, setError);
          if (result) setError(result);
        }}
      >
        <Icon name="speaker" size={16} />
        {cleanLabel && <span>{cleanLabel}</span>}
      </button>
      {error && <span className="speech-error" role="status">{error}</span>}
    </span>
  );
}
