import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Clew M1：存储键生成与目录穿越防护（本地磁盘卷与 OSS 共用同一套键）

describe("Clew storage keys", async () => {
  const {
    buildClewStorageKey,
    isSafeClewStorageKey,
    sanitizeClewFileName,
    sanitizeClewSegment,
  } = await import("../src/lib/clew/storage-key");

  it("存储键形如 clew/{userId}/{textbookId}/{fileName}", () => {
    const key = buildClewStorageKey("user123", "book456", "中医诊断学.pdf");
    assert.equal(key, "clew/user123/book456/中医诊断学.pdf");
  });

  it("文件名中的路径成分被剥离（目录穿越防护）", () => {
    assert.equal(sanitizeClewFileName("../../etc/passwd.pdf"), "passwd.pdf");
    assert.equal(sanitizeClewFileName("/abs/path/教材.pdf"), "教材.pdf");
    assert.equal(sanitizeClewFileName("..\\..\\windows\\x.pdf"), "x.pdf");
    assert.equal(sanitizeClewFileName("...hidden.pdf"), "hidden.pdf");
  });

  it("空文件名回落到安全默认名", () => {
    assert.equal(sanitizeClewFileName(""), "textbook.pdf");
    assert.equal(sanitizeClewFileName("..."), "textbook.pdf");
  });

  it("键段只保留字母数字下划线连字符", () => {
    assert.equal(sanitizeClewSegment("abc/../def"), "abcdef");
    assert.equal(sanitizeClewSegment("user_1-2"), "user_1-2");
  });

  it("生成的键总是安全键", () => {
    assert.equal(isSafeClewStorageKey(buildClewStorageKey("u1", "t1", "../../x.pdf")), true);
  });

  it("危险键被拒绝：绝对路径、反斜杠、`..` 段、空段、NUL", () => {
    assert.equal(isSafeClewStorageKey("/etc/passwd"), false);
    assert.equal(isSafeClewStorageKey("clew/..\\x"), false);
    assert.equal(isSafeClewStorageKey("clew/../../etc/passwd"), false);
    assert.equal(isSafeClewStorageKey("clew//x.pdf"), false);
    assert.equal(isSafeClewStorageKey(""), false);
    assert.equal(isSafeClewStorageKey("clew/u1/x\0.pdf"), false);
    assert.equal(isSafeClewStorageKey("clew/u1/教材.pdf"), true);
  });
});