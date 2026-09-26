import { siteContent } from "@/content/site";

export function Stats() {
  return (
    <div className="stats" aria-label="Thống kê học tập">
      {siteContent.stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
