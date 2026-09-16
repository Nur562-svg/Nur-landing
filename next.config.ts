import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  // Docker 部署使用 standalone 产物（.next/standalone/server.js），须显式开启
  output: "standalone",
  // Hi doc 服务端 PDF 文字层检测：pdfjs 本体被打包，但 fake worker 需在运行时按真实路径加载
  // node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs，因此显式纳入 standalone 产物。
  outputFileTracingIncludes: {
    "/api/hidoc/textbooks": ["./node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"],
  },
  // Prisma client 需要被 OpenNext patch 才能在 workerd 运行时工作（含 wasm 预编译加载）；
  // 本地 fallback 的原生模块（better-sqlite3）不进入 Cloudflare bundle
  serverExternalPackages: [
    "@prisma/client",
    ".prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
    "pg",
    "@prisma/adapter-pg",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

// 让本地 next dev 也能通过 getCloudflareContext() 访问 Cloudflare bindings（D1 等）
initOpenNextCloudflareForDev();

export default nextConfig;
