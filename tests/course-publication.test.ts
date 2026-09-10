import { describe, it } from "node:test";
import assert from "node:assert";
import { isPublishedCourseSlug, resolvePublishedCourseSlugs } from "@/lib/course-publication";
import { getPublishedCourseBySlug, publishedCourses, registeredCourses } from "@/content/courses";

describe("course publication surface", () => {
  it("defaults to all registered courses so inner-loop practice is not blocked", () => {
    assert.strictEqual(resolvePublishedCourseSlugs(), "all");
    assert.ok(isPublishedCourseSlug("diagnostics-qb"));
    assert.ok(isPublishedCourseSlug("physiology-qb"));
    assert.strictEqual(publishedCourses.length, registeredCourses.length);
    assert.ok(getPublishedCourseBySlug("diagnostics-qb"));
    assert.strictEqual(getPublishedCourseBySlug("infectious-diseases"), undefined);
  });
});
