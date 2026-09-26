type FeatureCardProps = {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
};

export function FeatureCard({
  id,
  icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  return (
    <article className={`feature-card feature-card--${color}`} id={id}>
      <div className="feature-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
