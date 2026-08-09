import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NUR LEARN｜中西医结合学习",
    template: "%s | NUR LEARN",
  },
  description: "面向中西医结合临床医学生的持续学习、辨证推理与考试训练平台。证据先行，保留教师权威边界。",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "NUR LEARN - 证据驱动的中西医临床学习平台",
    description: "从证据开始辨证。支持主观题完整表达、案例推理、题库练习与 Agent 辅助。",
    images: [{ url: "/og.png" }],
  },
  keywords: ["中医诊断学", "中西医结合", "学习平台", "辨证", "主观题训练", "医学生"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
