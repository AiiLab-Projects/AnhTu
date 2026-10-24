"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { computeStats, readEvents, subscribeXp, type XpStats } from "@/lib/xp";
import { Icon } from "@/components/Icon";

const empty: XpStats = { xp: 0, streak: 0, bestStreak: 0, today: false, days: [] };

export function useXpStats() {
  const [stats, setStats] = useState<XpStats>(empty);
  useEffect(() => {
    const update = () => setStats(computeStats(readEvents()));
    update();
    return subscribeXp(update);
  }, []);
  return stats;
}

/** Hai chip nhỏ trên thanh trên cùng: XP và chuỗi ngày học, bấm để xem tiến độ. */
export function XpBadge() {
  const { xp, streak, today } = useXpStats();
  return (
    <Link className="xp-badge" href="/tien-do" aria-label={`${xp} điểm XP, chuỗi ${streak} ngày học`} title="Xem tiến độ của em">
      <span className="xp-chip xp-chip--xp"><Icon name="star" size={15} fill="currentColor" /> {xp}</span>
      <span className={`xp-chip xp-chip--streak${streak > 0 && today ? " xp-chip--lit" : ""}`}><Icon name="flame" size={15} fill="currentColor" /> {streak}</span>
    </Link>
  );
}
