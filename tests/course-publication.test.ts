import { describe, it } from "node:test";
import assert from "node:assert";
import {
  DEFAULT_PUBLISHED_COURSE_SLUGS,
  isPublishedCourseSlug,
  resolvePublishedCourseSlugs,
} from "@/lib/course-publication";
import { publishedCourses, registeredCourses } from "@/content/courses";

describe("course publication surface", () => {
  it("defaults to the launch whitelist", () => {
    const resolved = resolvePublishedCourseSlugs();
    assert.notStrictEqual(resolved, "all");
    assert.deepStrictEqual([...resolved], [...DEFAULT_PUBLISHED_COURSE_SLUGS]);
    assert.ok(isPublishedCourseSlug("tcm-diagnostics"));
    assert.ok(isPublishedCourseSlug("physiology"));
    assert.ok(isPublishedCourseSlug("physiology-qb"));
    assert.strictEqual(isPublishedCourseSlug("diagnostics-qb"), false);
    assert.strictEqual(isPublishedCourseSlug("infectious-diseases"), false);
  });

  it("keeps the full registry larger than the public surface", () => {
    assert.ok(registeredCourses.length >= 15);
    assert.strictEqual(publishedCourses.length, 3);
    assert.deepStrictEqual(
      publishedCourses.map((course) => course.slug).sort(),
      ["physiology", "physiology-qb", "tcm-diagnostics"],
    );
  });
});
