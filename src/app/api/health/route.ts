import { NextResponse } from "next/server";

/**
 * 进程探活。不查数据库、不读课程注册表——失败只表示 Node/Next 未起来。
 * Docker / Caddy / 负载均衡应打此路径，不要用 GET /（首页 HTML + 字体）。
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      status: "ok",
      service: "nur-learn",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
