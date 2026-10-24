import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Dự án Supabase của Cô Tú. Khoá "anon" là khoá công khai (an toàn khi nằm trong trình duyệt);
// quyền thật nằm ở các policy RLS trong supabase/schema.sql. Tuyệt đối không dán khoá service_role vào đây.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://tzvldizjkhuqozodhnpf.supabase.co";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_ZJUz8Zg-3HsSHWqCF5D_xw_ZB3r4Sni";

let client: SupabaseClient | null = null;

/** Trả về null khi chưa cấu hình khoá, để giao diện báo thân thiện thay vì lỗi. */
export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_ANON_KEY) return null;
  client ??= createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}
