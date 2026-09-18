import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { assertNodeRuntimeDatabaseUrl, isPostgresConnectionString } from "@/lib/database-url";

/**
 * Prisma 单例：避免开发热重载时创建多个连接。
 *
 * - Cloudflare / OpenNext：可用 D1 binding → PrismaD1
 * - DATABASE_URL 为 postgres → PrismaPg（生产 Docker 路径）
 * - 其余本地开发 → better-sqlite3
 * - NODE_ENV=production 且没有 D1 / Postgres → 直接失败，禁止静默落到 sqlite
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
  // 尊重显式配置的 file: DATABASE_URL（测试隔离 / 本地多库）；未配置时用默认开发库。
  const envUrl = process.env.DATABASE_URL?.trim() ?? "";
  const url = envUrl.startsWith("file:")
    ? envUrl
    : `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url }),
  });
}

function createPostgresClient(connectionString: string): PrismaClient {
  return new PrismaClient({
    adapter: new PrismaPg(connectionString),
  });
}

function createPrismaClient(): PrismaClient {
  let d1Available = false;
  try {
    const ctx = getCloudflareContext({ async: false });
    // OpenNext dev may provide a Cloudflare context shell without a real D1 binding.
    // @ts-expect-error Cloudflare D1 binding (DB) via wrangler types / cloudflare-env.d.ts
    const db = ctx?.env?.DB;
    if (isUsableD1(db)) {
      d1Available = true;
      return new PrismaClient({ adapter: new PrismaD1(db as ConstructorParameters<typeof PrismaD1>[0]) });
    }
  } catch {
    // getCloudflareContext throws outside CF / OpenNext-dev bindings — fall through.
  }

  const databaseUrl = process.env.DATABASE_URL?.trim() ?? "";
  assertNodeRuntimeDatabaseUrl({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl,
    d1Available,
  });

  if (isPostgresConnectionString(databaseUrl)) {
    return createPostgresClient(databaseUrl);
  }
  return createLocalSqliteClient();
}

function getOrCreateClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getOrCreateClient();
    const value = (client as unknown as Record<PropertyKey, unknown>)[prop];
    return typeof value === "function" ? (value as CallableFunction).bind(client) : value;
  },
});
