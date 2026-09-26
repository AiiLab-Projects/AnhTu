"""Generate the Vbee voices listed in src/lib/voice-catalog.json.

Run prepare-voice.mjs first, then from the repository root:

    python3 scripts/generate-vbee.py                 # every Vbee voice
    python3 scripts/generate-vbee.py hn-ngochuyen    # one voice

Credentials come from VBEE_APP_ID / VBEE_TOKEN, or a JSON file
{"app_id": ..., "token": ...} at VBEE_CONFIG or ~/.vbee/config.json.

Vbee's batch queue handles one request at a time per account (~8 s each), so
clips are requested in groups: the lines of a group are joined with a 3 s
<break/> and the result is cut back apart at those silences. If the number of
silences does not match, that group falls back to one request per line.
Clips that already exist are skipped, so the script can be re-run after a
failure. Every clip is appended to .audio-build/vbee-log.jsonl.
"""

import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock

TTS_URL = "https://api.vbee.vn/v1/tts"
REQUEST_URL = "https://api.vbee.vn/v1/tts/requests/{}"
# The batch API requires a webhook, but this script polls instead.
WEBHOOK = "https://example.com/vbee-callback"

BUILD = Path(".audio-build")
PUBLIC = Path("public")
LOG = BUILD / "vbee-log.jsonl"
WORKERS = int(os.environ.get("VBEE_WORKERS", "6"))
GROUP_SIZE = 24
SPEED = 0.9
BREAK = ' <break time="3s"/> '
PAD = 0.2  # seconds of silence kept around each clip
log_lock = Lock()


def credentials():
    app_id, token = os.environ.get("VBEE_APP_ID"), os.environ.get("VBEE_TOKEN")
    if app_id and token:
        return app_id, token
    for path in (os.environ.get("VBEE_CONFIG"), "~/.vbee/config.json"):
        if path and Path(path).expanduser().exists():
            cfg = json.loads(Path(path).expanduser().read_text(encoding="utf-8"))
            return cfg["app_id"], cfg["token"]
    sys.exit("Thiếu VBEE_APP_ID/VBEE_TOKEN hoặc file VBEE_CONFIG.")


def call(url, headers, body=None):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    request = urllib.request.Request(url, data=data, headers=headers, method="POST" if data else "GET")
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            return response.status, json.loads(response.read())
    except urllib.error.HTTPError as error:
        return error.code, {"error": error.read().decode("utf-8", "replace")[:300]}


def synthesize(text, voice, headers):
    status, submit = call(TTS_URL, headers, {
        "text": text, "voiceCode": voice, "mode": "async", "webhookUrl": WEBHOOK,
        "outputFormat": "mp3", "bitrate": 64, "speed": SPEED,
    })
    if status not in (200, 201) or "requestId" not in submit:
        raise RuntimeError(f"submit HTTP {status}: {submit}")
    deadline = time.time() + 900
    while time.time() < deadline:
        time.sleep(3)
        status, data = call(REQUEST_URL.format(submit["requestId"]), headers)
        state = str(data.get("status", "")).upper()
        if state in ("COMPLETED", "SUCCESS") and data.get("audioLink"):
            with urllib.request.urlopen(data["audioLink"], timeout=120) as response:
                return response.read()
        if state in ("FAILED", "ERROR"):
            raise RuntimeError(f"request {submit['requestId']} {state}: {data}")
    raise RuntimeError(f"request {submit['requestId']} timed out")


def spoken(text):
    return text.replace(" · ", ", ").replace(" — ", ", ")


def write_log(entry):
    entry["at"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    with log_lock, LOG.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(entry, ensure_ascii=False) + "\n")


def silences(path):
    """Return (start, end) of every pause longer than 2 s — only the inserted breaks are that long."""
    result = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path), "-af", "silencedetect=noise=-40dB:d=2", "-f", "null", "-"],
                            capture_output=True, text=True, check=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", result.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", result.stderr)]
    return list(zip(starts, ends))


def encode(source, target, start=None, end=None):
    # Mono 32 kbps keeps a whole voice around 3 MB without audible loss for speech.
    # atrim instead of -ss/-to: libmp3lame rejects some frames cut by output seeking.
    trim = [] if start is None and end is None else ["-af", "atrim=" + ":".join(
        part for part in (f"start={start:.3f}" if start is not None else "", f"end={end:.3f}" if end is not None else "") if part) + ",asetpts=N/SR/TB"]
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(source), *trim, "-ac", "1", "-b:a", "32k", str(target)], check=True)


def target_of(voice, line):
    return PUBLIC / voice["dir"].lstrip("/") / f"{line['id']}.mp3"


def make_single(voice, line, headers, note):
    started = time.time()
    raw = BUILD / "vbee" / voice["id"] / f"{line['id']}.mp3"
    raw.parent.mkdir(parents=True, exist_ok=True)
    try:
        if not raw.exists():
            raw.write_bytes(synthesize(spoken(line["text"]), voice["model"], headers))
        encode(raw, target_of(voice, line))
        write_log({"voice": voice["id"], "id": line["id"], "ok": True, "mode": note,
                   "seconds": round(time.time() - started, 1), "text": line["text"]})
        return 1, 0
    except Exception as error:  # noqa: BLE001 - log every failure and keep going
        write_log({"voice": voice["id"], "id": line["id"], "ok": False, "mode": note, "error": str(error), "text": line["text"]})
        return 0, 1


def make_group(voice, group, index, headers):
    """Synthesize a group in one request and split it; returns (ok, fail)."""
    if len(group) == 1:
        return make_single(voice, group[0], headers, "single")
    started = time.time()
    raw = BUILD / "vbee" / voice["id"] / f"group-{index:02d}-{group[0]['id']}.mp3"
    raw.parent.mkdir(parents=True, exist_ok=True)
    try:
        if not raw.exists():
            raw.write_bytes(synthesize(BREAK.join(spoken(line["text"]) for line in group), voice["model"], headers))
        gaps = silences(raw)
    except Exception as error:  # noqa: BLE001
        write_log({"voice": voice["id"], "group": index, "ok": False, "error": f"group request: {error}"})
        gaps = None
    if gaps is None or len(gaps) != len(group) - 1:
        if gaps is not None:
            write_log({"voice": voice["id"], "group": index, "ok": False,
                       "error": f"found {len(gaps)} breaks for {len(group)} lines, falling back to one request per line"})
        results = [make_single(voice, line, headers, "fallback") for line in group]
        return sum(r[0] for r in results), sum(r[1] for r in results)
    bounds = [None] + gaps + [None]
    ok = fail = 0
    for position, line in enumerate(group):
        start = bounds[position][1] - PAD if bounds[position] else None
        end = bounds[position + 1][0] + PAD if bounds[position + 1] else None
        try:
            encode(raw, target_of(voice, line), start, end)
            write_log({"voice": voice["id"], "id": line["id"], "ok": True, "mode": f"group {index}",
                       "seconds": round(time.time() - started, 1), "text": line["text"]})
            ok += 1
        except subprocess.CalledProcessError as error:
            write_log({"voice": voice["id"], "id": line["id"], "ok": False, "mode": f"group {index}", "error": f"cut: {error}", "text": line["text"]})
            good, bad = make_single(voice, line, headers, "fallback")
            ok, fail = ok + good, fail + bad
    return ok, fail


def main():
    app_id, token = credentials()
    headers = {"Authorization": f"Bearer {token}", "App-Id": app_id, "Content-Type": "application/json"}
    lines = json.loads((BUILD / "voice-lines.json").read_text(encoding="utf-8"))
    catalog = json.loads(Path("src/lib/voice-catalog.json").read_text(encoding="utf-8"))
    wanted = set(sys.argv[1:])
    voices = [v for v in catalog if v["engine"] == "vbee" and (not wanted or v["id"] in wanted)]
    jobs, skipped = [], 0
    for voice in voices:
        (PUBLIC / voice["dir"].lstrip("/")).mkdir(parents=True, exist_ok=True)
        todo = [line for line in lines if not (target_of(voice, line).exists() and target_of(voice, line).stat().st_size > 1000)]
        skipped += len(lines) - len(todo)
        jobs += [(voice, todo[i:i + GROUP_SIZE], i // GROUP_SIZE) for i in range(0, len(todo), GROUP_SIZE)]
    print(f"{len(jobs)} requests, {skipped} clips already present", flush=True)
    ok = fail = 0
    with ThreadPoolExecutor(WORKERS) as pool:
        futures = {pool.submit(make_group, voice, group, index, headers): voice["id"] for voice, group, index in jobs}
        for done, future in enumerate(as_completed(futures), start=1):
            good, bad = future.result()
            ok, fail = ok + good, fail + bad
            print(f"{done}/{len(jobs)} requests · {ok} clips ok · {fail} failed ({futures[future]})", flush=True)
    print(f"Log: {LOG}")
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    main()
