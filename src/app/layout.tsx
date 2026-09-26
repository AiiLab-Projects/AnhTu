import type { Metadata } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const baloo = Baloo_2({ subsets: ["latin", "vietnamese"], variable: "--font-baloo", display: "swap" });
const beVietnam = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Cô Tú | Học tiếng Việt vui",
  description: "Cùng Cô Tú học tiếng Việt thật vui qua bài học, trò chơi ghép chữ và câu hỏi kiểm tra.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${baloo.variable} ${beVietnam.variable}`}><Header />{children}<SiteFooter /></body></html>;
}
