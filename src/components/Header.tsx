"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Volume2, X } from "lucide-react";
import { siteContent } from "@/content/site";
import { getVietnameseVoices, getVoicePreference, setVoicePreference, speakVietnamese } from "@/lib/speech";
import { TeacherAvatar } from "./TeacherAvatar";

const icons = { home: "🏠", book: "📚", pencil: "✏️", trophy: "🏆", mail: "💌" };

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceChoice, setVoiceChoice] = useState("vietnamese");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceError, setVoiceError] = useState("");

  useEffect(() => {
    setVoiceChoice(getVoicePreference());
    if (!window.speechSynthesis) return;
    const update = () => setVoices(getVietnameseVoices());
    update();
    window.speechSynthesis.addEventListener("voiceschanged", update);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", update);
  }, []);

  useEffect(() => {
    if (!voiceOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setVoiceOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [voiceOpen]);

  function chooseVoice(value: string) {
    setVoiceChoice(value);
    setVoicePreference(value);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Cô Tú - về trang chủ">
          <span className="brand-avatar"><TeacherAvatar title="Cô Tú" /></span>
          <span className="brand-text"><strong>{siteContent.brand.name}</strong><small>{siteContent.brand.subtitle}</small></span>
        </Link>

        <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`} aria-label="Điều hướng chính">
          {siteContent.navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link className={active ? "nav-link nav-link--active" : "nav-link"} href={item.href} key={item.label} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                <span className="nav-icon" aria-hidden="true">{icons[item.icon]}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="header-tools">
          <button className="tool-button" type="button" onClick={() => setVoiceOpen(true)} aria-label="Cài đặt giọng đọc" title="Cài đặt giọng đọc"><Volume2 size={24} /></button>
          <button className="tool-button menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Đóng menu" : "Mở menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>
      {voiceOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setVoiceOpen(false); }}>
          <div className="voice-modal" role="dialog" aria-modal="true" aria-labelledby="voice-title">
            <div className="voice-modal-head">
              <div className="voice-modal-icon"><Volume2 size={27} /></div>
              <div><h2 id="voice-title">Cài đặt giọng đọc</h2><p>Chọn giọng để nghe bài học và câu hỏi.</p></div>
              <button className="modal-close" type="button" onClick={() => setVoiceOpen(false)} aria-label="Đóng"><X size={22} /></button>
            </div>
            <div className="voice-modal-body">
              <label className="voice-option">
                <input type="radio" name="voice" checked={voiceChoice === "vietnamese"} onChange={() => chooseVoice("vietnamese")} />
                <span><strong>🎙️ Giọng nữ tiếng Việt</strong><small>Bản ghi âm có sẵn trên web, nghe được dù thiết bị chưa có giọng tiếng Việt.</small></span>
              </label>
              {voices.map((voice) => (
                <label className="voice-option" key={voice.name}>
                  <input type="radio" name="voice" checked={voiceChoice === voice.name} onChange={() => chooseVoice(voice.name)} />
                  <span><strong>🔊 {voice.name}</strong><small>{voice.lang} · giọng có sẵn trên thiết bị</small></span>
                </label>
              ))}
              <button className="pill-button voice-test" type="button" onClick={async () => {
                setVoiceError("");
                const result = await speakVietnamese("Chào em, cô là Cô Tú. Chúng mình cùng học tiếng Việt nhé!", setVoiceError);
                if (result) setVoiceError(result);
              }}>🔊 Nghe thử</button>
              <p className="voice-note" role="status">{voiceError || (voices.length ? "Em có thể chọn bản ghi âm hoặc giọng tiếng Việt có sẵn trên thiết bị." : "Bản ghi âm tiếng Việt đã có sẵn cho bài học, bài tập và câu hỏi.")}</p>
              <p className="voice-credit"><a href="/audio/vi/CREDITS.txt" target="_blank" rel="noreferrer">Nguồn giọng đọc</a></p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
