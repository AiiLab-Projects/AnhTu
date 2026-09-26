import Link from "next/link";

type FeatureCardProps = { id: string; href: string; icon: string; title: string; description: string; color: string };

export function FeatureCard({ id, href, icon, title, description, color }: FeatureCardProps) {
  return (
    <Link className={`feature-card feature-card--${color}`} href={href} id={id}>
      <div className="feature-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="feature-more">Khám phá →</span>
    </Link>
  );
}
