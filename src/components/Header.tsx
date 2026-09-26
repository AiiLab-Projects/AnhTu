"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, Home, LogOut, Mail, Menu, Pencil, Trophy, UserRound, Volume2, VolumeX, X } from "lucide-react";
import { siteContent } from "@/content/site";
import { TeacherAvatar } from "./TeacherAvatar";

const icons = {
  home: Home,
  book: BookOpen,
  pencil: Pencil,
  trophy: Trophy,
  mail: Mail,
  school: GraduationCap,
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [notice, setNotice] = useState("");

  function toggleSound() {
    setSoundOn((value) => !value);
  }

  function showAccountNotice() {
    setNotice("Trang giới thiệu chưa có tài khoản để đăng xuất.");
    window.setTimeout(() => setNotice(""), 4000);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#trang-chu" aria-label="Cô Tú - về đầu trang">
          <span className="brand-avatar"><TeacherAvatar title="Cô Tú" /></span>
          <span className="brand-text"><strong>{siteContent.brand.name}</strong><small>{siteContent.brand.subtitle}</small></span>
        </a>

        <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`} aria-label="Điều hướng chính">
          {siteContent.navigation.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <a
                className={index === 0 ? "nav-link nav-link--active" : "nav-link"}
                href={item.href}
                key={item.label}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={19} strokeWidth={2.5} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="header-tools">
          <button className="tool-button" type="button" onClick={toggleSound} aria-label={soundOn ? "Tắt âm thanh" : "Bật âm thanh"} aria-pressed={soundOn} title={soundOn ? "Tắt âm thanh" : "Bật âm thanh"}>
            {soundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
          <a className="tool-button" href="#lop-hoc" aria-label="Xem Cô Tú" title="Xem Cô Tú"><UserRound size={24} /></a>
          <button className="tool-button" type="button" onClick={showAccountNotice} aria-label="Đăng xuất" title="Đăng xuất"><LogOut size={23} /></button>
          <button className="tool-button menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Đóng menu" : "Mở menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>
      {notice && <div className="notice" role="status">{notice}</div>}
    </header>
  );
}
