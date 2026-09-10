#!/usr/bin/env node
/**
 * 部署时切换 Prisma datasource provider（不改业务代码）。
 *
 *   node scripts/set-prisma-provider.mjs postgresql
 *   node scripts/set-prisma-provider.mjs sqlite
 *
 * 生产 Docker 构建前执行 postgresql；仓库内默认保持 sqlite 以便本地开发。
 * 本脚本只改 datasource db { provider }，不动 model。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const allowed = new Set(["sqlite", "postgresql"]);
const provider = process.argv[2];

if (!provider || !allowed.has(provider)) {
  console.error("用法: node scripts/set-prisma-provider.mjs sqlite|postgresql");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = join(root, "prisma", "schema.prisma");
const source = readFileSync(schemaPath, "utf8");

if (!/datasource db \{[\s\S]*?provider\s*=\s*"(sqlite|postgresql)"/.test(source)) {
  console.error("未找到 datasource db { provider = \"sqlite|postgresql\" }");
  process.exit(1);
}

const next = source.replace(
  /(datasource db \{[\s\S]*?provider\s*=\s*")(sqlite|postgresql)(")/,
  `$1${provider}$3`,
);

if (next === source) {
  console.log(`prisma provider 已是 ${provider}，无需改动`);
  process.exit(0);
}

writeFileSync(schemaPath, next);
console.log(`prisma datasource provider → ${provider}`);
console.log("下一步: npx prisma generate && npx prisma migrate deploy");
