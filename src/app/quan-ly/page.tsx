import type { Metadata } from "next";
import { AdminUsers } from "@/components/AdminUsers";

export const metadata: Metadata = { title: "Quản lý học viên | Cô Tú", robots: { index: false } };

export default function AdminPage() {
  return <main className="inner-page"><div className="page-container admin-container"><AdminUsers /></div></main>;
}
