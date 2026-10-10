"use client";

import { useRef, useState } from "react";
import { siteContent } from "@/content/site";
import { Stats } from "./Stats";
import { Icon } from "./Icon";
import { applyRipple } from "./effects";
import { showToast } from "@/lib/toast";

// Hero v2 — các lớp từ dưới lên:
//   1. hero-bg (ảnh landscape, cover)
//   2. hero-overlay (gradient sáng nhẹ bên trái để chữ dễ đọc, không phủ trắng toàn hero)
//   3. hero-stars (5 sao mờ bay nhẹ, CSS-only)
//   4. hero-grid (HTML thật) — cột trái copy, cột phải nhân vật + mèo + easter egg
export function Hero() {
  const { hero, brand } = siteContent;
  const strippedGreeting = hero.greeting.replace(/\s*👋\s*$/u, "");
  const [greetingHead, ...greetingTail] = strippedGreeting.split(brand.name);

  const clicksRef = useRef(0);
  const resetRef = useRef<number | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  // Easter egg: click Cô Tú 5 lần trong 2s → burst + toast.
  function onCharacterClick() {
    if (resetRef.current) window.clearTimeout(resetRef.current);
    clicksRef.current += 1;
    resetRef.current = window.setTimeout(() => { clicksRef.current = 0; }, 2000);
    if (clicksRef.current >= 5) {
      clicksRef.current = 0;
      setBurstKey((k) => k + 1);
      showToast({
        icon: "sparkles",
        title: "Em tinh ý quá!",
        description: "Cô Tú gửi em một chùm sao nè.",
        tone: "achievement",
        duration: 2800,
      });
    }
  }

  return (
    <section className="hero hero--landscape" id="trang-chu" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true">
        <span className="hero-star hero-star--1" />
        <span className="hero-star hero-star--2" />
        <span className="hero-star hero-star--3" />
        <span className="hero-star hero-star--4" />
        <span className="hero-star hero-star--5" />
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge"><Icon name="sparkles" size={16} /> {hero.badge}</div>
          <h1 id="hero-title">
            Học <span className="text-gradient">Tiếng Việt</span><br />
            cùng Cô Tú!
          </h1>
          <p className="hero-description">
            {greetingHead}
            {greetingTail.length > 0 && <b>{brand.name}</b>}
            {greetingTail.join(brand.name)}
            {" "}
            {hero.description}
          </p>
          <div className="hero-actions">
            <a href="/bai-hoc" className="hero-button hero-button--primary" onPointerDown={applyRipple}>
              <Icon name="book" size={20} />
              {hero.primaryButton}
            </a>
            <a href="/kiem-tra" className="hero-button hero-button--secondary" onPointerDown={applyRipple}>
              <Icon name="trophy" size={20} />
              {hero.secondaryButton}
            </a>
          </div>
          <Stats />
        </div>

        <div className="hero-stage">
          <button
            type="button"
            className="hero-character"
            onClick={onCharacterClick}
            aria-label="Vẫy chào Cô Tú (bí mật: bấm 5 lần nhanh)"
            style={{ border: 0, background: "transparent", padding: 0, cursor: "pointer" }}
          >
            <img src="/img/01-co-tu-character-v2.webp" alt="" width={520} height={693} loading="eager" decoding="async" fetchPriority="high" />
          </button>
          {burstKey > 0 && (
            <div key={burstKey} className="easter-burst" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
          )}
          <div className="hero-cat" aria-hidden="true">
            <img src="/img/02-cat-mascot-v2.webp" alt="" width={260} height={260} loading="eager" decoding="async" />
          </div>
          <div className="hero-sparkle hero-sparkle--a" aria-hidden="true"><Icon name="star" size={18} fill="currentColor" /></div>
          <div className="hero-sparkle hero-sparkle--b" aria-hidden="true"><Icon name="sparkles" size={18} /></div>
        </div>
      </div>
    </section>
  );
}
