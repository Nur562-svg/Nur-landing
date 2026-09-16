import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Course entitlement policy", async () => {
  const { isPilotFreeCourse, getCourseEntitlementLimit } = await import("../src/lib/course-entitlement-policy");

  it("试点课对所有人免费且不占名额", () => {
    assert.equal(isPilotFreeCourse("course-tcm-diagnostics"), true);
    assert.equal(isPilotFreeCourse("course-physiology"), true);
    assert.equal(isPilotFreeCourse("course-new-official"), false);
  });

  it("官方课名额按会员档位限制", () => {
    assert.equal(getCourseEntitlementLimit("free"), 2);
    assert.equal(getCourseEntitlementLimit("basic"), 2);
    assert.equal(getCourseEntitlementLimit("pro"), 5);
    assert.equal(getCourseEntitlementLimit("max"), "unlimited");
  });
});
