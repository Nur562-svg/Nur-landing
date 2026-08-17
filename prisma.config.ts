import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 配置：连接 URL 从 schema 移到此处（CLI 的 migrate/diff 命令使用）。
 * 运行时连接由 PrismaClient 构造时的 adapter 决定（见 src/lib/prisma.ts）。
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
