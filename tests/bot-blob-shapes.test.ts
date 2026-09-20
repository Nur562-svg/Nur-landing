import { describe, it } from "node:test";
import assert from "node:assert";
import { BLOB_PATHS, shapeFromStreak } from "@/components/bot-blob-shapes";

describe("ink blob shapes", () => {
  it("keeps the same path command count so CSS d can morph", () => {
    const counts = Object.values(BLOB_PATHS).map((path) => path.split(" C ").length);
    assert.ok(counts.every((count) => count === counts[0]));
    assert.equal(counts[0], 9);
  });

  it("maps idle and quiz streak onto the poster / polygon set", () => {
    assert.equal(shapeFromStreak("idle", 0), "id");
    assert.equal(shapeFromStreak("thinking", 0), "th");
    assert.equal(shapeFromStreak("sleepy", 0), "bl");
    assert.equal(shapeFromStreak("sad", 0), "sc");
    assert.equal(shapeFromStreak("sad", 1), "tri");
    assert.equal(shapeFromStreak("sad", 2), "square");
    assert.equal(shapeFromStreak("angry", 3), "penta");
    assert.equal(shapeFromStreak("angry", 4), "hex");
    assert.equal(shapeFromStreak("happy", 0), "id");
    assert.equal(shapeFromStreak("idle", 0, 0.5), "ls");
  });
});
