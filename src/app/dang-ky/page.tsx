import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Đăng ký học viên | Cô Tú", description: "Đăng ký tài khoản học viên để học cùng Cô Tú." };

export default function RegisterPage() {
  return <main className="inner-page"><div className="page-container auth-container"><AuthForm mode="register" /></div></main>;
}
