import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Đăng nhập | Cô Tú", description: "Đăng nhập để học cùng Cô Tú." };

export default function LoginPage() {
  return <main className="inner-page"><div className="page-container auth-container"><AuthForm mode="login" /></div></main>;
}
