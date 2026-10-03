import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Hi doc M1：存储键生成与目录穿越防护（本地磁盘卷与 OSS 共用同一套键）

describe("Hi doc storage keys", async () => {
  const {
    buildHiDocStorageKey,
    isSafeHiDocStorageKey,
    sanitizeHiDocFileName,
    sanitizeHiDocSegment,
  } = await import("../src/lib/hidoc/storage-key");

  it("存储键形如 hidoc/{userId}/{textbookId}/{fileName}", () => {
    const key = buildHiDocStorageKey("user123", "book456", "中医诊断学.pdf");
    assert.equal(key, "hidoc/user123/book456/中医诊断学.pdf");
  });

  it("文件名中的路径成分被剥离（目录穿越防护）", () => {
    assert.equal(sanitizeHiDocFileName("../../etc/passwd.pdf"), "passwd.pdf");
    assert.equal(sanitizeHiDocFileName("/abs/path/教材.pdf"), "教材.pdf");
    assert.equal(sanitizeHiDocFileName("..\\..\\windows\\x.pdf"), "x.pdf");
    assert.equal(sanitizeHiDocFileName("...hidden.pdf"), "hidden.pdf");
  });

  it("空文件名回落到安全默认名", () => {
    assert.equal(sanitizeHiDocFileName(""), "textbook.pdf");
    assert.equal(sanitizeHiDocFileName("..."), "textbook.pdf");
  });

  it("键段只保留字母数字下划线连字符", () => {
    assert.equal(sanitizeHiDocSegment("abc/../def"), "abcdef");
    assert.equal(sanitizeHiDocSegment("user_1-2"), "user_1-2");
  });

  it("生成的键总是安全键", () => {
    assert.equal(isSafeHiDocStorageKey(buildHiDocStorageKey("u1", "t1", "../../x.pdf")), true);
  });

  it("危险键被拒绝：绝对路径、反斜杠、`..` 段、空段、NUL", () => {
    assert.equal(isSafeHiDocStorageKey("/etc/passwd"), false);
    assert.equal(isSafeHiDocStorageKey("hidoc/..\\x"), false);
    assert.equal(isSafeHiDocStorageKey("hidoc/../../etc/passwd"), false);
    assert.equal(isSafeHiDocStorageKey("hidoc//x.pdf"), false);
    assert.equal(isSafeHiDocStorageKey(""), false);
    assert.equal(isSafeHiDocStorageKey("hidoc/u1/x\0.pdf"), false);
    assert.equal(isSafeHiDocStorageKey("hidoc/u1/教材.pdf"), true);
  });
});