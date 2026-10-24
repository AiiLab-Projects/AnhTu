"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getSupabase } from "@/lib/supabase";
import { mergeEvents, readEvents, subscribeXp, type XpEvent } from "@/lib/xp";

const toRow = (userId: string, event: XpEvent) => ({ user_id: userId, id: event.id, kind: event.kind, key: event.key, day: event.day, xp: event.xp });

// Không hiển thị gì. Khi em đăng nhập: kéo điểm đã có trên máy chủ về máy này, đẩy điểm chỉ có ở máy này lên,
// rồi cứ có điểm mới thì đẩy tiếp. Bảng learner_events chưa tạo thì bỏ qua êm, điểm vẫn lưu trên máy.
export function XpSync() {
  const { session } = useAuth();
  const userId = session?.user.id;

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !userId) return;
    let alive = true;
    const pushed = new Set<string>();

    async function push(events: XpEvent[]) {
      const fresh = events.filter((event) => !pushed.has(event.id));
      if (!fresh.length || !supabase) return;
      const { error } = await supabase.from("learner_events").upsert(fresh.map((event) => toRow(userId!, event)), { onConflict: "user_id,id", ignoreDuplicates: true });
      if (!error) fresh.forEach((event) => pushed.add(event.id));
    }

    (async () => {
      const { data, error } = await supabase.from("learner_events").select("id, kind, key, day, xp").eq("user_id", userId);
      if (!alive || error) return;
      const remote = (data ?? []) as XpEvent[];
      remote.forEach((event) => pushed.add(event.id));
      await push(mergeEvents(remote));
    })();

    const unsubscribe = subscribeXp(() => { void push(readEvents()); });
    return () => { alive = false; unsubscribe(); };
  }, [userId]);

  return null;
}
