"""Generate the finite Vietnamese audio library using Piper's vais1000 voice.

Run prepare-voice.mjs first, then set PYTHONPATH to a Piper installation and run
this script from the repository root. The downloaded ONNX model belongs in
.audio-build and is not shipped with the site.
"""

import json
import wave
from pathlib import Path

from piper import PiperVoice


BUILD = Path(".audio-build")
OUTPUT = Path("public/audio/vi")
MODEL = BUILD / "vi_VN-vais1000-medium.onnx"


def main() -> None:
    lines = json.loads((BUILD / "voice-lines.json").read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    voice = PiperVoice.load(MODEL)
    for index, line in enumerate(lines, start=1):
        target = OUTPUT / line["file"]
        if target.exists() and target.stat().st_size > 44:
            continue
        spoken = line["text"].replace(" · ", ", ").replace(" — ", ", ")
        with wave.open(str(target), "wb") as wav:
            voice.synthesize_wav(spoken, wav)
        if index % 20 == 0:
            print(f"Generated {index}/{len(lines)}", flush=True)
    print(f"Ready: {len(lines)} clips", flush=True)


if __name__ == "__main__":
    main()
