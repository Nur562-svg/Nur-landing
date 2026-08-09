import { describe, it } from "node:test";
import assert from "node:assert";
import type {
  CourseDefinition,
} from "@/types/learning";
import {
  validateCourseDefinition,
  validateCourseRegistry,
  validateLearnerCourseState,
} from "@/lib/course-validation";
import { tcmDiagnosticsCourse } from "@/content/courses/tcm-diagnostics";
import { physiologyCourse } from "@/content/courses/physiology";

/**
 * Minimal valid course fixture for negative tests.
 * Covers the structural skeleton without any deep content.
 */
function createMinimalCourse(overrides: Partial<CourseDefinition> = {}): CourseDefinition {
  return {
    id: "test-course",
    slug: "test-course",
    title: "Test Course",
    catalogLabel: "Test",
    classification: "test",
    description: "A minimal test course",
    ghostWordmark: "TEST",
    curriculumMode: "integrated",
    contentStatus: "demo",
    version: {
      id: "v-test",
      status: "demo",
      textbookEdition: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      school: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      program: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      learnerYear: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      teacher: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      academicYear: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      semester: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
    },
    sources: [],
    examBlueprint: {
      id: "bp-test",
      title: "Test Exam",
      status: "pending",
      missingLabel: "待确认",
      provenance: "user-provided",
      scope: {
        school: "Test",
        program: "Test",
        learnerYear: "1",
        academicYear: "2026",
        semester: "2",
        teacher: null,
      },
      sourceIds: [],
      totalPoints: 0,
      rows: [],
      summaryGroups: [],
      priorityNotice: null,
      integrity: null,
    },
    learningRoutes: [],
    chapters: [],
    knowledgePoints: [],
    learningTasks: [],
    assessmentItems: [],
    assessmentGroups: [],
    cases: [],
    ...overrides,
  };
}

describe("validateCourseDefinition — unique ID constraints", () => {
  it("rejects duplicate chapter IDs", () => {
    const course = createMinimalCourse({
      chapters: [
        { id: "ch-1", slug: "ch-1", order: 1, indexLabel: "1", title: "A", focus: "A", knowledgePointIds: [] },
        { id: "ch-1", slug: "ch-2", order: 2, indexLabel: "2", title: "B", focus: "B", knowledgePointIds: [] },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "chapters.id" && i.message.includes("duplicate")));
  });

  it("rejects duplicate knowledge point IDs", () => {
    const course = createMinimalCourse({
      knowledgePoints: [
        { id: "kp-1", slug: "kp-1", order: 1, title: "A", note: "A", emphasis: "基础", contentStatus: "demo", evidenceFramework: [], lenses: [], relationships: [], learningMemoryCriteria: [], sourceIds: [], learningTaskIds: [], assessmentItemIds: [], caseIds: [], lesson: null },
        { id: "kp-1", slug: "kp-2", order: 2, title: "B", note: "B", emphasis: "基础", contentStatus: "demo", evidenceFramework: [], lenses: [], relationships: [], learningMemoryCriteria: [], sourceIds: [], learningTaskIds: [], assessmentItemIds: [], caseIds: [], lesson: null },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "knowledgePoints.id" && i.message.includes("duplicate")));
  });

  it("rejects duplicate chapter slugs", () => {
    const course = createMinimalCourse({
      chapters: [
        { id: "ch-1", slug: "same-slug", order: 1, indexLabel: "1", title: "A", focus: "A", knowledgePointIds: [] },
        { id: "ch-2", slug: "same-slug", order: 2, indexLabel: "2", title: "B", focus: "B", knowledgePointIds: [] },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "chapters.slug" && i.message.includes("duplicate")));
  });

  it("rejects duplicate source IDs", () => {
    const course = createMinimalCourse({
      sources: [
        { id: "src-1", order: 1, role: "course-material", type: "textbook", authority: "publisher", scope: "current-offering", displayLabel: "A", status: "available", citation: { label: "A", edition: null, page: null, slide: null, academicYear: null, url: null }, missingLabel: null, verifiedAt: null },
        { id: "src-1", order: 2, role: "course-evidence", type: "editorial", authority: "nur-editorial", scope: "general-reference", displayLabel: "B", status: "available", citation: { label: "B", edition: null, page: null, slide: null, academicYear: null, url: null }, missingLabel: null, verifiedAt: null },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "sources.id" && i.message.includes("duplicate")));
  });
});

describe("validateCourseDefinition — ordering constraints", () => {
  it("rejects non-ascending chapter order", () => {
    const course = createMinimalCourse({
      chapters: [
        { id: "ch-1", slug: "ch-1", order: 2, indexLabel: "1", title: "A", focus: "A", knowledgePointIds: [] },
        { id: "ch-2", slug: "ch-2", order: 1, indexLabel: "2", title: "B", focus: "B", knowledgePointIds: [] },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("ascending")));
  });

  it("rejects non-positive order values", () => {
    const course = createMinimalCourse({
      chapters: [
        { id: "ch-1", slug: "ch-1", order: 0, indexLabel: "1", title: "A", focus: "A", knowledgePointIds: [] },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("positive integer")));
  });
});

describe("validateCourseDefinition — cross-reference constraints", () => {
  it("rejects chapter referencing unknown knowledge point", () => {
    const course = createMinimalCourse({
      chapters: [
        { id: "ch-1", slug: "ch-1", order: 1, indexLabel: "1", title: "A", focus: "A", knowledgePointIds: ["kp-nonexistent"] },
      ],
      knowledgePoints: [],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    // The chapter references a KP that doesn't exist; ordered validation will flag missing KP
    assert.ok(result.issues.length > 0);
  });

  it("rejects knowledge point referenced by multiple chapters", () => {
    const course = createMinimalCourse({
      chapters: [
        { id: "ch-1", slug: "ch-1", order: 1, indexLabel: "1", title: "A", focus: "A", knowledgePointIds: ["kp-1"] },
        { id: "ch-2", slug: "ch-2", order: 2, indexLabel: "2", title: "B", focus: "B", knowledgePointIds: ["kp-1"] },
      ],
      knowledgePoints: [
        { id: "kp-1", slug: "kp-1", order: 1, title: "A", note: "A", emphasis: "基础", contentStatus: "demo", evidenceFramework: [], lenses: [], relationships: [], learningMemoryCriteria: [], sourceIds: [], learningTaskIds: [], assessmentItemIds: [], caseIds: [], lesson: null },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "chapters.knowledgePointIds" && i.message.includes("duplicate")));
  });

  it("rejects assessment item referencing unknown source", () => {
    const course = createMinimalCourse({
      assessmentItems: [
        {
          id: "a-1",
          order: 1,
          knowledgePointId: "kp-1",
          questionKind: "a1-single",
          status: "demo",
          prompt: "Test?",
          answer: { status: "missing", authority: null, confidence: "missing", content: null, notice: "待确认", sourceIds: [] as const },
          promptSource: { locator: "p.1", note: "test", sourceIds: ["src-unknown"], wording: "nur-adapted", authority: "nur-editorial" },
          scoring: null,
          sourceIds: [],
        },
      ],
      knowledgePoints: [
        { id: "kp-1", slug: "kp-1", order: 1, title: "A", note: "A", emphasis: "基础", contentStatus: "demo", evidenceFramework: [], lenses: [], relationships: [], learningMemoryCriteria: [], sourceIds: [], learningTaskIds: [], assessmentItemIds: ["a-1"], caseIds: [], lesson: null },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("unknown source")));
  });
});

describe("validateCourseDefinition — version dimension constraints", () => {
  it("rejects pending dimension with a value", () => {
    // Use 'as unknown as' to bypass TypeScript compile-time constraint and test runtime validation
    const course = createMinimalCourse({
      version: {
        id: "v-test",
        status: "demo",
        textbookEdition: { status: "pending", value: "3", missingLabel: "待确认", verifiedAt: null } as unknown as CourseDefinition["version"]["textbookEdition"],
        school: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        program: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        learnerYear: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        teacher: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        academicYear: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        semester: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      },
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path.includes("textbookEdition") && i.message.includes("pending")));
  });

  it("rejects verified dimension with empty verifiedAt", () => {
    const course = createMinimalCourse({
      version: {
        id: "v-test",
        status: "demo",
        textbookEdition: { status: "verified", value: "3", missingLabel: null, verifiedAt: "" },
        school: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        program: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        learnerYear: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        teacher: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        academicYear: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
        semester: { status: "pending", value: null, missingLabel: "待确认", verifiedAt: null },
      },
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path.includes("textbookEdition")));
  });
});

describe("validateCourseDefinition — exam blueprint constraints", () => {
  it("rejects pending blueprint with declared totals", () => {
    const course = createMinimalCourse({
      examBlueprint: {
        id: "bp-test",
        title: "Test Exam",
        status: "pending",
        missingLabel: "待确认",
        provenance: "user-provided",
        scope: { school: "Test", program: "Test", learnerYear: "1", academicYear: "2026", semester: "2", teacher: null },
        sourceIds: [],
        totalPoints: 100,
        rows: [],
        summaryGroups: [],
        priorityNotice: null,
        integrity: null,
      },
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("pending blueprints cannot declare")));
  });

  it("rejects resolved blueprint with zero totalPoints", () => {
    const course = createMinimalCourse({
      examBlueprint: {
        id: "bp-test",
        title: "Test Exam",
        status: "available",
        missingLabel: null,
        provenance: "user-provided",
        scope: { school: "Test", program: "Test", learnerYear: "1", academicYear: "2026", semester: "2", teacher: null },
        sourceIds: [],
        totalPoints: 0,
        rows: [{ id: "row-1", order: 1, kind: "a1-single", label: "单选", totalPoints: 0, count: 0, pointsEach: 0 }],
        summaryGroups: [{ id: "sg-1", order: 1, label: "客观题", questionKinds: ["a1-single"] }],
        priorityNotice: null,
        integrity: null,
      },
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("greater than zero")));
  });
});

describe("validateCourseDefinition — slug format", () => {
  it("rejects non-URL-safe course slug", () => {
    const course = createMinimalCourse({ slug: "Invalid Slug!" });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "slug" && i.message.includes("URL-safe")));
  });

  it("accepts valid URL-safe slug", () => {
    const course = createMinimalCourse({ slug: "valid-slug-123" });
    const result = validateCourseDefinition(course);
    assert.ok(!result.issues.some((i) => i.path === "slug"));
  });
});

describe("validateCourseDefinition — relationship label constraints", () => {
  it("rejects unsupported relationship label", () => {
    const course = createMinimalCourse({
      knowledgePoints: [
        {
          id: "kp-1", slug: "kp-1", order: 1, title: "A", note: "A", emphasis: "基础", contentStatus: "demo",
          evidenceFramework: [], 
          lenses: [
            { id: "lens-tcm", perspective: "tcm", title: "TCM", sourceIds: [], status: "available", explanation: "TCM", clinicalObservations: [], missingLabel: null },
            { id: "lens-western", perspective: "modern-medicine", title: "Western", sourceIds: [], status: "available", explanation: "Western", clinicalObservations: [], missingLabel: null },
          ],
          relationships: [
            { id: "rel-1", label: "equivalent" as "related", fromLensId: "lens-tcm", toLensId: "lens-western", status: "demo", note: "test", sourceIds: [] },
          ],
          learningMemoryCriteria: [], sourceIds: [], learningTaskIds: [], assessmentItemIds: [], caseIds: [], lesson: null,
        },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("unsupported relationship label")));
  });

  it("rejects self-referencing relationship", () => {
    const course = createMinimalCourse({
      knowledgePoints: [
        {
          id: "kp-1", slug: "kp-1", order: 1, title: "A", note: "A", emphasis: "基础", contentStatus: "demo",
          evidenceFramework: [],
          lenses: [
            { id: "lens-tcm", perspective: "tcm", title: "TCM", sourceIds: [], status: "available", explanation: "TCM", clinicalObservations: [], missingLabel: null },
            { id: "lens-western", perspective: "modern-medicine", title: "Western", sourceIds: [], status: "available", explanation: "Western", clinicalObservations: [], missingLabel: null },
          ],
          relationships: [
            { id: "rel-1", label: "related", fromLensId: "lens-tcm", toLensId: "lens-tcm", status: "demo", note: "test", sourceIds: [] },
          ],
          learningMemoryCriteria: [], sourceIds: [], learningTaskIds: [], assessmentItemIds: [], caseIds: [], lesson: null,
        },
      ],
    });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("cannot relate a lens to itself")));
  });
});

describe("validateCourseRegistry", () => {
  it("rejects registry with duplicate course slugs", () => {
    const course1 = createMinimalCourse({ id: "c-1", slug: "same" });
    const course2 = createMinimalCourse({ id: "c-2", slug: "same" });
    const result = validateCourseRegistry([course1, course2]);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "registry.slug" && i.message.includes("duplicate")));
  });

  it("rejects registry with duplicate course IDs", () => {
    const course1 = createMinimalCourse({ id: "same-id", slug: "c-1" });
    const course2 = createMinimalCourse({ id: "same-id", slug: "c-2" });
    const result = validateCourseRegistry([course1, course2]);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "registry.id" && i.message.includes("duplicate")));
  });
});

describe("validateLearnerCourseState", () => {
  const baseCourse = createMinimalCourse({
    id: "test-course",
    chapters: [
      { id: "ch-1", slug: "ch-1", order: 1, indexLabel: "1", title: "A", focus: "A", knowledgePointIds: ["kp-1"] },
    ],
    knowledgePoints: [
      { id: "kp-1", slug: "kp-1", order: 1, title: "A", note: "A", emphasis: "基础", contentStatus: "demo", evidenceFramework: [], lenses: [], relationships: [], learningMemoryCriteria: [], sourceIds: [], learningTaskIds: [], assessmentItemIds: [], caseIds: [], lesson: null },
    ],
    learningRoutes: [
      { id: "understand", order: 1, indexLabel: "1", title: "R", detail: "R", guidance: "R" },
    ],
  });

  it("rejects non-demo dataMode", () => {
    const state = {
      id: "state-1",
      courseId: "test-course",
      dataMode: "production" as "demo",
      demoLabel: "Demo",
      profile: { displayName: "Test", major: "Test", avatarLabel: "T" },
      overallProgress: 50,
      learnedUnits: 1,
      totalUnits: 2,
      currentStage: { id: "s-1", label: "S", chapterIds: ["ch-1"], assessmentLabel: "A" },
      currentChapterId: "ch-1",
      currentKnowledgePointId: "kp-1",
      defaultRouteId: "understand" as const,
      chapterProgress: [{ chapterId: "ch-1", progress: 50, learnedUnits: 1, totalUnits: 2, completedKnowledgePointIds: [] }],
      sessionDurationMinutes: 30,
      sessionSteps: [{ id: "step-1", order: 1, routeId: "understand" as const, minutes: 30, title: "T", detail: "T", drawerTitle: "T" }],
    };
    const result = validateLearnerCourseState(baseCourse, state);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "dataMode" && i.message.includes("demo")));
  });

  it("rejects progress out of bounds", () => {
    const state = {
      id: "state-1",
      courseId: "test-course",
      dataMode: "demo" as const,
      demoLabel: "Demo",
      profile: { displayName: "Test", major: "Test", avatarLabel: "T" },
      overallProgress: 150,
      learnedUnits: 1,
      totalUnits: 2,
      currentStage: { id: "s-1", label: "S", chapterIds: ["ch-1"], assessmentLabel: "A" },
      currentChapterId: "ch-1",
      currentKnowledgePointId: "kp-1",
      defaultRouteId: "understand" as const,
      chapterProgress: [{ chapterId: "ch-1", progress: 50, learnedUnits: 1, totalUnits: 2, completedKnowledgePointIds: [] }],
      sessionDurationMinutes: 30,
      sessionSteps: [{ id: "step-1", order: 1, routeId: "understand" as const, minutes: 30, title: "T", detail: "T", drawerTitle: "T" }],
    };
    const result = validateLearnerCourseState(baseCourse, state);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "overallProgress" && i.message.includes("between 0 and 100")));
  });

  it("rejects mismatched courseId", () => {
    const state = {
      id: "state-1",
      courseId: "wrong-course",
      dataMode: "demo" as const,
      demoLabel: "Demo",
      profile: { displayName: "Test", major: "Test", avatarLabel: "T" },
      overallProgress: 50,
      learnedUnits: 1,
      totalUnits: 2,
      currentStage: { id: "s-1", label: "S", chapterIds: ["ch-1"], assessmentLabel: "A" },
      currentChapterId: "ch-1",
      currentKnowledgePointId: "kp-1",
      defaultRouteId: "understand" as const,
      chapterProgress: [{ chapterId: "ch-1", progress: 50, learnedUnits: 1, totalUnits: 2, completedKnowledgePointIds: [] }],
      sessionDurationMinutes: 30,
      sessionSteps: [{ id: "step-1", order: 1, routeId: "understand" as const, minutes: 30, title: "T", detail: "T", drawerTitle: "T" }],
    };
    const result = validateLearnerCourseState(baseCourse, state);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "courseId"));
  });

  it("rejects progress not matching learnedUnits/totalUnits", () => {
    const state = {
      id: "state-1",
      courseId: "test-course",
      dataMode: "demo" as const,
      demoLabel: "Demo",
      profile: { displayName: "Test", major: "Test", avatarLabel: "T" },
      overallProgress: 30,
      learnedUnits: 1,
      totalUnits: 2,
      currentStage: { id: "s-1", label: "S", chapterIds: ["ch-1"], assessmentLabel: "A" },
      currentChapterId: "ch-1",
      currentKnowledgePointId: "kp-1",
      defaultRouteId: "understand" as const,
      chapterProgress: [{ chapterId: "ch-1", progress: 50, learnedUnits: 1, totalUnits: 2, completedKnowledgePointIds: [] }],
      sessionDurationMinutes: 30,
      sessionSteps: [{ id: "step-1", order: 1, routeId: "understand" as const, minutes: 30, title: "T", detail: "T", drawerTitle: "T" }],
    };
    const result = validateLearnerCourseState(baseCourse, state);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "overallProgress" && i.message.includes("must match")));
  });
});

describe("validateCourseDefinition — empty field constraints", () => {
  it("rejects empty course title", () => {
    const course = createMinimalCourse({ title: "   " });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "title" && i.message.includes("empty")));
  });

  it("rejects empty course id", () => {
    const course = createMinimalCourse({ id: "" });
    const result = validateCourseDefinition(course);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "id" && i.message.includes("empty")));
  });
});

describe("Actual registered courses pass validation", () => {
  it("TCM Diagnostics course passes validation", () => {
    const result = validateCourseDefinition(tcmDiagnosticsCourse);
    assert.strictEqual(result.valid, true, `TCM course has validation issues: ${result.issues.map((i) => `${i.path}: ${i.message}`).join(", ")}`);
  });

  it("Physiology course passes validation", () => {
    const result = validateCourseDefinition(physiologyCourse);
    assert.strictEqual(result.valid, true, `Physiology course has validation issues: ${result.issues.map((i) => `${i.path}: ${i.message}`).join(", ")}`);
  });

  it("Course registry passes validation (unique IDs, no duplicates)", () => {
    const result = validateCourseRegistry([tcmDiagnosticsCourse, physiologyCourse]);
    assert.strictEqual(result.valid, true, `Registry has validation issues: ${result.issues.map((i) => `${i.path}: ${i.message}`).join(", ")}`);
  });

  it("All chapters have unique IDs across courses", () => {
    const allChapterIds = [
      ...tcmDiagnosticsCourse.chapters.map((c) => c.id),
      ...physiologyCourse.chapters.map((c) => c.id),
    ];
    assert.strictEqual(new Set(allChapterIds).size, allChapterIds.length, "Duplicate chapter IDs found across courses");
  });

  it("All knowledge points have unique IDs across courses", () => {
    const allKpIds = [
      ...tcmDiagnosticsCourse.knowledgePoints.map((kp) => kp.id),
      ...physiologyCourse.knowledgePoints.map((kp) => kp.id),
    ];
    assert.strictEqual(new Set(allKpIds).size, allKpIds.length, "Duplicate knowledge point IDs found across courses");
  });

  it("All courses have valid curriculum mode", () => {
    const validModes = ["tcm-primary", "western-primary", "integrated"];
    assert.ok(validModes.includes(tcmDiagnosticsCourse.curriculumMode));
    assert.ok(validModes.includes(physiologyCourse.curriculumMode));
  });

  it("Version dimensions are preserved for all courses", () => {
    for (const course of [tcmDiagnosticsCourse, physiologyCourse]) {
      const dims = course.version;
      assert.ok(dims.textbookEdition, `${course.slug} missing textbookEdition dimension`);
      assert.ok(dims.school, `${course.slug} missing school dimension`);
      assert.ok(dims.program, `${course.slug} missing program dimension`);
      assert.ok(dims.learnerYear, `${course.slug} missing learnerYear dimension`);
      assert.ok(dims.teacher, `${course.slug} missing teacher dimension`);
      assert.ok(dims.academicYear, `${course.slug} missing academicYear dimension`);
      assert.ok(dims.semester, `${course.slug} missing semester dimension`);
    }
  });

  it("Chapter knowledge point references are valid within each course", () => {
    for (const course of [tcmDiagnosticsCourse, physiologyCourse]) {
      const kpIds = new Set(course.knowledgePoints.map((kp) => kp.id));
      for (const chapter of course.chapters) {
        for (const kpId of chapter.knowledgePointIds) {
          assert.ok(kpIds.has(kpId), `${course.slug}: chapter ${chapter.id} references unknown KP ${kpId}`);
        }
      }
    }
  });

  it("Source references in assessment items are valid", () => {
    for (const course of [tcmDiagnosticsCourse, physiologyCourse]) {
      const sourceIds = new Set(course.sources.map((s) => s.id));
      for (const item of course.assessmentItems) {
        for (const srcId of item.promptSource.sourceIds) {
          assert.ok(sourceIds.has(srcId), `${course.slug}: assessment ${item.id} references unknown source ${srcId}`);
        }
      }
    }
  });

  it("Exam blueprint totals are consistent when available", () => {
    for (const course of [tcmDiagnosticsCourse, physiologyCourse]) {
      const bp = course.examBlueprint;
      if (bp.status !== "pending" && bp.integrity) {
        assert.strictEqual(
          bp.integrity.expectedTotalPoints,
          bp.totalPoints,
          `${course.slug}: integrity total mismatch`,
        );
      }
    }
  });
});
