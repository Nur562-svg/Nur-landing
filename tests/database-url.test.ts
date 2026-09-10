import { describe, it } from "node:test";
import assert from "node:assert";
import { assertNodeRuntimeDatabaseUrl, isPostgresConnectionString } from "@/lib/database-url";

describe("production database URL guard", () => {
  it("accepts postgres URLs", () => {
    assert.equal(isPostgresConnectionString("postgresql://nur:x@db:5432/nur_learn"), true);
    assert.equal(isPostgresConnectionString("postgres://nur:x@localhost/nur"), true);
    assert.equal(isPostgresConnectionString("file:./prisma/dev.db"), false);
  });

  it("allows sqlite outside production", () => {
    assert.doesNotThrow(() => assertNodeRuntimeDatabaseUrl({
      nodeEnv: "development",
      databaseUrl: "file:./prisma/dev.db",
      d1Available: false,
    }));
  });

  it("allows D1 even in production", () => {
    assert.doesNotThrow(() => assertNodeRuntimeDatabaseUrl({
      nodeEnv: "production",
      databaseUrl: undefined,
      d1Available: true,
    }));
  });

  it("rejects sqlite in production without D1", () => {
    assert.throws(
      () => assertNodeRuntimeDatabaseUrl({
        nodeEnv: "production",
        databaseUrl: "file:./prisma/dev.db",
        d1Available: false,
      }),
      /禁止 sqlite/,
    );
    assert.throws(
      () => assertNodeRuntimeDatabaseUrl({
        nodeEnv: "production",
        databaseUrl: undefined,
        d1Available: false,
      }),
      /禁止 sqlite/,
    );
  });
});
