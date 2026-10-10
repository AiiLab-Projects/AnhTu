"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icon";
import { showToast } from "@/lib/toast";

type Channel = {
  key: string;
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  copy?: string; // text để copy — nếu khác value (ví dụ value có "Nhắn Zalo:...", copy chỉ số).
};

type Props = {
  name: string;
  phone?: string;
  email?: string;
};

async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) return false;
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
}

export function ContactChannelList({ name, phone, email }: Props) {
  const zaloUrl = phone ? `https://zalo.me/${phone}` : undefined;
  const gmailUrl = email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}` : undefined;

  const channels: Channel[] = [
    { key: "name", icon: "user", label: "Người liên hệ", value: `Cô: ${name}` },
    ...(phone ? [
      { key: "phone", icon: "phone" as IconName, label: "Điện thoại", value: phone, href: `tel:${phone}`, copy: phone },
      { key: "zalo", icon: "chat" as IconName, label: "Zalo", value: `Nhắn Zalo: ${phone}`, href: zaloUrl!, external: true, copy: phone },
    ] : []),
    ...(email ? [
      { key: "email", icon: "mail" as IconName, label: "Gmail", value: email, href: gmailUrl!, external: true, copy: email },
    ] : []),
  ];

  return (
    <section className="white-panel contact-info-card" aria-labelledby="contact-info-title">
      <header className="contact-info-head">
        <span className="contact-info-head-icon"><Icon name="pin" size={22} /></span>
        <div>
          <h2 id="contact-info-title">Thông tin liên hệ</h2>
          <p>Chọn kênh liên hệ thuận tiện cho bạn.</p>
        </div>
      </header>

      <ul className="contact-channel-list">
        {channels.map((channel) => (
          <ContactChannelRow key={channel.key} channel={channel} />
        ))}
      </ul>
    </section>
  );
}

function ContactChannelRow({ channel }: { channel: Channel }) {
  const [copied, setCopied] = useState(false);
  const canCopy = Boolean(channel.copy);

  async function onCopy(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!channel.copy) return;
    const ok = await copyToClipboard(channel.copy);
    if (ok) {
      setCopied(true);
      showToast({ icon: "check-circle", title: "Đã sao chép", description: channel.copy, tone: "success", duration: 1800 });
      window.setTimeout(() => setCopied(false), 1600);
    } else {
      showToast({ icon: "warning", title: "Không sao chép được", description: "Trình duyệt chặn clipboard. Em copy tay nhé.", tone: "info", duration: 2600 });
    }
  }

  const Inner = (
    <>
      <span className="contact-channel-icon" aria-hidden="true"><Icon name={channel.icon} size={20} /></span>
      <span className="contact-channel-text">
        <small>{channel.label}</small>
        <strong>{channel.value}{channel.external && " ↗"}</strong>
      </span>
      {canCopy && (
        <button
          type="button"
          className={`contact-channel-copy${copied ? " is-copied" : ""}`}
          onClick={onCopy}
          aria-label={`Sao chép ${channel.label}`}
          title={copied ? "Đã sao chép" : "Sao chép"}
        >
          <Icon name={copied ? "check" : "chat"} size={14} />
          {copied ? "Đã chép" : "Sao chép"}
        </button>
      )}
    </>
  );

  if (channel.href) {
    return (
      <li className="contact-channel-row">
        <a href={channel.href} className="contact-channel-link" {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {Inner}
        </a>
      </li>
    );
  }
  return <li className="contact-channel-row contact-channel-row--static">{Inner}</li>;
}
