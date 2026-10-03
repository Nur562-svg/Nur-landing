import { register } from "node:module";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * ZCODE-M3 验收回归：ClewCompileCache.contentFingerprint 写入。
 * 背景：验收发现 upsertCompileCache 的 update 分支忽略 contentFingerprint——
 * 首编译建行（空串）后指纹永远写不进去，「内容变化 → 强制全量编译」成为死功能。
 * 本测试锁定：create 写指纹 / update 更新指纹 / update 不带指纹时不覆盖。
 *
 * 隔离 SQLite（payment-service.test.ts 模式：mkdtemp + DATABASE_URL + prisma db push），不碰 prisma/dev.db。
 * server-only 由 tests/helpers/css-module-hooks.mjs 的加载钩子映射为空模块。
 */

// —— 必须在 import 服务模块之前：隔离数据库 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-compile-cache-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;

register("./helpers/css-module-hooks.mjs", import.meta.url);

// 建表（显式 env 优先于 .env 中的 DATABASE_URL；stdio pipe 静音输出）
execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

describe("ClewCompileCache 指纹写入（ZCODE-M3 验收回归）", async () => {
  const { upsertCompileCache, loadClewCompileCache } = await import("@/lib/clew/compiler-server");

  it("首编译建行写入指纹（create 路径）", async () => {
    await upsertCompileCache("t-1", { state: "extracting", contentFingerprint: "fp-first" });
    const row = await loadClewCompileCache("t-1");
    assert.equal(row?.state, "extracting");
    assert.equal(row?.contentFingerprint, "fp-first");
  });

  it("回归：update 路径同样更新指纹（此前被忽略的 bug）", async () => {
    await upsertCompileCache("t-1", { state: "ready", contentFingerprint: "fp-second" });
    const row = await loadClewCompileCache("t-1");
    assert.equal(row?.state, "ready");
    assert.equal(row?.contentFingerprint, "fp-second");
  });

  it("update 不携带指纹时不覆盖既有值", async () => {
    await upsertCompileCache("t-1", { state: "failed" });
    const row = await loadClewCompileCache("t-1");
    assert.equal(row?.state, "failed");
    assert.equal(row?.contentFingerprint, "fp-second");
  });
});
