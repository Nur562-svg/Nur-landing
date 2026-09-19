import type { Metadata } from "next";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import { NurAgentDockHost } from "@/components/nur-agent-dock-host";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}｜中西医结合学习`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: SITE_NAME,
    title: `${SITE_NAME}｜从证据开始辨证`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME}｜从证据开始辨证`,
    description: SITE_DESCRIPTION,
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
      className="h-full antialiased"
      /* 防闪烁脚本会在 hydration 前按 localStorage 给 <html> 加 .dark，属预期的属性不一致 */
      suppressHydrationWarning
    >
      <head>
        {/* R2-2 暗色防闪烁：hydration 前按 localStorage(nur-theme) 挂 .dark；与壳顶栏明暗切换共用该键（默认 light） */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage["nur-theme"]==="dark")document.documentElement.classList.add("dark")}catch(e){}',
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {/* NUR Agent Dock 壳级单实例（R1 收敛：原先 9 处各自挂载） */}
        <NurAgentDockHost />
      </body>
    </html>
  );
}
