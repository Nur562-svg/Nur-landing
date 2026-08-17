import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Prisma 单例：避免开发热重载时创建多个连接。
 *
 * 运行环境自适应（OpenNext 官方推荐方式）：
 * - Cloudflare Workers / 本地 workerd（OpenNext preview）/ next dev（经 initOpenNextCloudflareForDev）：
 *   通过 getCloudflareContext() 拿到 **可用的** D1 binding，使用 PrismaD1 driver adapter。
 * - 纯 Node 环境，或 CF context 存在但 DB binding 未配/无效：回退 better-sqlite3 连接本地 SQLite。
 *
 * 注意：
 * - @prisma/client 保持默认输出（不自定义 output 目录），由 OpenNext 在构建时 patch。
 * - better-sqlite3 配置在 serverExternalPackages 中，Cloudflare bundle 不会打入该原生模块。
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function isUsableD1(db: unknown): db is { prepare: (query: string) => unknown } {
  return (
    typeof db === "object" &&
    db !== null &&
    typeof (db as { prepare?: unknown }).prepare === "function"
  );
}

function createLocalSqliteClient(): PrismaClient {
  // Absolute file URL: relative `file:./prisma/dev.db` breaks when cwd ≠ project root.
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  const url = `file:${dbPath}`;
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url }),
  });
}

function createPrismaClient(): PrismaClient {
  try {
    const ctx = getCloudflareContext({ async: false });
    // OpenNext dev may provide a Cloudflare context shell without a real D1 binding
    // (e.g. missing wrangler.toml d1_databases). Using PrismaD1(undefined) yields:
    //   TypeError: Cannot read properties of undefined (reading 'prepare')
    // @ts-expect-error Cloudflare D1 binding (DB) via wrangler types / cloudflare-env.d.ts
    const db = ctx?.env?.DB;
    if (isUsableD1(db)) {
      // Narrowed only on prepare(); full D1Database surface exists at CF runtime.
      return new PrismaClient({ adapter: new PrismaD1(db as ConstructorParameters<typeof PrismaD1>[0]) });
    }
  } catch {
    // getCloudflareContext throws outside CF / OpenNext-dev bindings — fall through.
  }
  return createLocalSqliteClient();
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
