import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type FeatureCardProps = { id: string; href: string; icon: string; title: string; description: string; color: string };

// Ánh xạ emoji (vẫn giữ ở site.ts làm nhãn) sang icon SVG hiển thị trên card.
const emojiToIcon: Record<string, IconName> = {
  "📚": "book",
  "🎨": "palette",
  "🏅": "medal",
  "🏆": "trophy",
  "✨": "sparkles",
  "🚀": "rocket",
  "🎯": "target",
};

function resolveIcon(icon: string): IconName {
  return emojiToIcon[icon] ?? "sparkles";
}

export function FeatureCard({ id, href, icon, title, description, color }: FeatureCardProps) {
  return (
    <Link className={`feature-card feature-card--${color}`} href={href} id={id}>
      <div className="feature-icon" aria-hidden="true"><Icon name={resolveIcon(icon)} size={28} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="feature-more">Khám phá <Icon name="arrow-right" size={14} /></span>
    </Link>
  );
}
