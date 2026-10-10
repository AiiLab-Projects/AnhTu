import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { ToastHost } from "@/components/ToastHost";
import { CatPeek } from "@/components/CatPeek";
import "./globals.css";

const baloo = Baloo_2({ subsets: ["latin", "vietnamese"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const nunito = Nunito({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Cô Tú | Học tiếng Việt vui",
  description: "Cùng Cô Tú học tiếng Việt thật vui qua bài học, trò chơi ghép chữ và câu hỏi kiểm tra.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        {/* Preload ảnh nền hero để render first-paint nhanh hơn trên trang chủ. */}
        <link rel="preload" as="image" href="/img/01-hero-background.webp" type="image/webp" fetchPriority="high" />
      </head>
      <body className={`${baloo.variable} ${nunito.variable}`}>
        <Header />
        {children}
        <SiteFooter />
        <ToastHost />
        <CatPeek />
      </body>
    </html>
  );
}
