import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { publishedCourses } from "../src/content/courses";
import {
  buildCourseSearchEntries,
  buildPageEntries,
  buildShelfChapterEntries,
  entryMatchesQuery,
  flattenSearchGroups,
  normalizeSearchText,
  searchEntries,
  SEARCH_GROUP_LIMIT,
  type SearchEntry,
} from "../src/lib/search-index";
import { courseHasAuthoredLesson, selectChapterForKnowledgePoint } from "../src/lib/course-selectors";

describe("search-index (R4 ⌘K content search)", () => {
  const courseEntries = buildCourseSearchEntries(publishedCourses);

  it("章节条目覆盖每门已发布课的每章，且题库课走题库章节路由", () => {
    const chapterCount = publishedCourses.reduce((total, course) => total + course.chapters.length, 0);
    const chapterEntries = courseEntries.filter((entry) => entry.id.includes("-chapter-"));
    assert.equal(chapterEntries.length, chapterCount);

    for (const course of publishedCourses) {
      const authored = courseHasAuthoredLesson(course);
      for (const chapter of course.chapters) {
        const entry = chapterEntries.find((item) => item.id.endsWith(`${course.id}-${chapter.id}`));
        assert.ok(entry, `missing chapter entry: ${course.slug}/${chapter.slug}`);
        assert.equal(entry.group, authored ? "course" : "bank");
        assert.equal(
          entry.href,
          authored
            ? `/courses/${course.slug}`
            : `/courses/${course.slug}/question-bank/${chapter.slug}`,
        );
        assert.ok(entry.hint?.includes(course.title));
      }
    }
  });

  it("知识点条目只出自闭环课（lesson 非 null），href 为知识点路由", () => {
    const kpEntries = courseEntries.filter((entry) => entry.id.startsWith("course-kp-"));
    assert.ok(kpEntries.length > 0);

    let expected = 0;
    for (const course of publishedCourses) {
      if (!courseHasAuthoredLesson(course)) continue;
      for (const point of course.knowledgePoints) {
        if (point.lesson === null) continue;
        expected += 1;
        const entry = kpEntries.find((item) => item.id === `course-kp-${course.id}-${point.id}`);
        assert.ok(entry, `missing kp entry: ${course.slug}/${point.slug}`);
        assert.equal(entry.href, `/courses/${course.slug}/knowledge-points/${point.slug}`);
        assert.equal(entry.group, "course");
        // note 参与匹配
        assert.ok(entry.keywords.includes(point.note));
        // hint 带所属章节名
        const chapter = selectChapterForKnowledgePoint(course, point.id);
        if (chapter) assert.ok(entry.hint?.includes(chapter.title));
      }
    }
    assert.equal(kpEntries.length, expected);

    // 题库课（*-qb，lesson 全 null）不出知识点条目
    for (const course of publishedCourses) {
      if (courseHasAuthoredLesson(course)) continue;
      assert.ok(
        kpEntries.every((entry) => !entry.id.startsWith(`course-kp-${course.id}-`)),
        `qb course leaked kp entries: ${course.slug}`,
      );
    }
  });

  it("书架教材章节条目按 chapterCount 展开，跳 /learn/hi-doc/t/{id}/c/{n}", () => {
    const entries = buildShelfChapterEntries([
      { id: "book-a", title: "生物化学（第九版）", chapterCount: 3, isFrozen: false },
      { id: "book-b", title: "生理学讲义", chapterCount: 1, isFrozen: true },
    ]);
    assert.equal(entries.length, 4);
    assert.equal(entries[0].href, "/learn/hi-doc/t/book-a/c/1");
    assert.equal(entries[0].label, "生物化学（第九版） · 第 1 章");
    assert.equal(entries[0].hint, "书架教材");
    assert.equal(entries[0].group, "shelf");
    assert.equal(entries[3].href, "/learn/hi-doc/t/book-b/c/1");
    assert.equal(entries[3].hint, "书架教材 · 已冻结");
    assert.deepEqual(buildShelfChapterEntries([]), []);
  });

  it("页面入口条目保留静态入口并归入页面组", () => {
    const entries = buildPageEntries([
      { id: "hidoc", label: "Hi doc", href: "/learn/hi-doc" },
      { id: "learn-home", label: "学习主页", href: "/learn" },
    ]);
    assert.equal(entries.length, 2);
    assert.equal(entries[0].group, "page");
    assert.equal(entries[0].id, "page-hidoc");
    assert.deepEqual(entries[1].keywords, ["学习主页"]);
  });

  it("normalizeSearchText：大小写不敏感、全半角折叠、空白忽略", () => {
    assert.equal(normalizeSearchText("  Cold  And Heat "), "coldandheat");
    assert.equal(normalizeSearchText("ＡＢＣ１２３"), "abc123");
    assert.equal(normalizeSearchText(""), "");
  });

  it("includes 匹配：按 title/note/归属名命中，大小写不敏感", () => {
    const entry: SearchEntry = {
      id: "x",
      label: "寒热辨证",
      href: "/courses/tcm-diagnostics/knowledge-points/cold-and-heat",
      group: "course",
      keywords: ["寒热辨证", "寒证与热证的辨别", "中医诊断学"],
    };
    assert.ok(entryMatchesQuery(entry, normalizeSearchText("寒证")));
    assert.ok(entryMatchesQuery(entry, normalizeSearchText("中医")));
    assert.ok(!entryMatchesQuery(entry, normalizeSearchText("药理")));
  });

  it("searchEntries：空查询返回全部（按组截断），非空按关键词过滤并分组排序", () => {
    const all: readonly SearchEntry[] = [
      ...courseEntries,
      ...buildPageEntries([{ id: "p1", label: "会员", href: "/account/billing" }]),
    ];

    // 空查询：全量，组顺序固定 course → bank → shelf → page，空组剔除
    const emptyGroups = searchEntries(all, "");
    assert.deepEqual(
      emptyGroups.map((group) => group.group),
      ["course", "bank", "page"],
    );
    assert.ok(emptyGroups.every((group) => group.items.length <= SEARCH_GROUP_LIMIT));

    // 关键词过滤：官方课知识点命中「寒热」
    const coldGroups = searchEntries(all, "寒热");
    const coldCourse = coldGroups.find((group) => group.group === "course");
    assert.ok(coldCourse, "官方课程组应命中");
    assert.ok(
      coldCourse.items.some((entry) => entry.href === "/courses/tcm-diagnostics/knowledge-points/cold-and-heat"),
    );
    assert.ok(coldGroups.every((group) => group.items.length > 0));

    // 无结果
    assert.deepEqual(searchEntries(all, "不存在的东西"), []);
  });

  it("每组截断到 8 条并报告 overflow 余量", () => {
    const many: readonly SearchEntry[] = Array.from({ length: 12 }, (_, index) => ({
      id: `s-${index}`,
      label: `书 · 第 ${index + 1} 章`,
      href: `/learn/hi-doc/t/b/c/${index + 1}`,
      group: "shelf" as const,
      keywords: ["书"],
    }));
    const groups = searchEntries(many, "书");
    assert.equal(groups.length, 1);
    assert.equal(groups[0].items.length, SEARCH_GROUP_LIMIT);
    assert.equal(groups[0].overflow, 12 - SEARCH_GROUP_LIMIT);
    assert.equal(flattenSearchGroups(groups).length, SEARCH_GROUP_LIMIT);
  });

  it("flattenSearchGroups 保持组内顺序，供键盘高亮导航", () => {
    const groups = searchEntries(courseEntries, "");
    const flat = flattenSearchGroups(groups);
    assert.equal(flat.length, groups.reduce((total, group) => total + group.items.length, 0));
    assert.deepEqual(
      flat.map((entry) => entry.id),
      groups.flatMap((group) => group.items.map((entry) => entry.id)),
    );
  });
});
