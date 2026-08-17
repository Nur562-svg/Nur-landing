import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Prisma 单例：避免开发热重载时创建多个连接。
 *
 * 运行环境自适应（OpenNext 官方推荐方式）：
 * - Cloudflare Workers / 本地 workerd（OpenNext preview）/ next dev（经 initOpenNextCloudflareForDev）：
 *   通过 getCloudflareContext() 拿到 D1 binding，使用 PrismaD1 driver adapter。
 * - 纯 Node 环境（测试等，无 Cloudflare context）：回退到 better-sqlite3 adapter 连接本地 SQLite 文件。
 *
 * 注意：
 * - @prisma/client 保持默认输出（不自定义 output 目录），由 OpenNext 在构建时 patch，
 *   使其 wasm 引擎以预编译模块方式在 workerd 中加载。
 * - 本地 fallback 用 createRequire 延迟加载 better-sqlite3（原生模块），
 *   并配置在 serverExternalPackages 中，Cloudflare 环境不会执行该分支。
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  try {
    const ctx = getCloudflareContext({ async: false });
    // @ts-expect-error Cloudflare D1 binding (DB) provided via wrangler types / generated cloudflare-env.d.ts (gitignored); available at runtime in CF / OpenNext env
    return new PrismaClient({ adapter: new PrismaD1(ctx.env.DB) });
  } catch {
    // 非 Cloudflare 环境（本地纯 Node / 测试）：better-sqlite3 连接本地 SQLite 文件库
    return new PrismaClient({
      adapter: new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" }),
    });
  }
}

function getOrCreateClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Proxy 惰性代理：首次访问属性/方法时才真正初始化 PrismaClient
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getOrCreateClient();
    const value = (client as unknown as Record<PropertyKey, unknown>)[prop];
    return typeof value === "function" ? (value as CallableFunction).bind(client) : value;
  },
});
