import { PrismaClient } from "@prisma/client";

/**
 * Prisma 单例：避免开发热重载时创建多个连接。
 * 生产环境切换 Postgres 时只需修改 prisma/schema.prisma 的 provider 与 DATABASE_URL。
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
