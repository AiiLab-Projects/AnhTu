import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({ subsets: ["latin", "vietnamese"], variable: "--font-baloo", display: "swap" });
const nunito = Nunito({ subsets: ["latin", "vietnamese"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "Cô Tú | Học tiếng Việt vui",
  description: "Cùng Cô Tú học tiếng Việt thật vui qua trò chơi, hình ảnh anime và những thử thách đáng yêu.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${baloo.variable} ${nunito.variable}`}>{children}</body></html>;
}
