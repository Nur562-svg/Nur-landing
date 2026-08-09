"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CircleX,
  Bookmark,
  StickyNote,
  MessageCircle,
  CalendarCheck,
  ChartBar,
  Trophy,
  ListPlus,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";
import type { CourseDefinition } from "@/types/learning";
import { getQBAttempts } from "@/lib/question-bank-store";
import { flattenCourseAssessmentItems } from "@/lib/course-selectors";
import styles from "./question-bank-global.module.css";

/* ── Filter type definitions ── */
type LeftFilter = "wrong" | "favorite" | "notes" | "comments";
type RightFilter = "freshman" | "sophomore" | "junior" | "senior" | "custom";
type SecondaryFilter = "choice" | "subjective" | "must-memorize";

/* ── Filter config data ── */
const LEFT_FILTERS: {
  id: LeftFilter;
  label: string;
  icon: typeof CircleX;
}[] = [
  { id: "wrong", label: "错题", icon: CircleX },
  { id: "favorite", label: "收藏", icon: Bookmark },
  { id: "notes", label: "笔记", icon: StickyNote },
  { id: "comments", label: "评论", icon: MessageCircle },
];

const RIGHT_FILTERS: { id: RightFilter; label: string }[] = [
  { id: "freshman", label: "大一" },
  { id: "sophomore", label: "大二" },
  { id: "junior", label: "大三" },
  { id: "senior", label: "大四" },
  { id: "custom", label: "自定义组题" },
];

const SECONDARY_FILTERS: { id: SecondaryFilter; label: string }[] = [
  { id: "choice", label: "选择题" },
  { id: "subjective", label: "主观题" },
  { id: "must-memorize", label: "必背考点" },
];

const TOOLS: { label: string; icon: typeof CalendarCheck }[] = [
  { label: "每日一练", icon: CalendarCheck },
  { label: "刷题统计", icon: ChartBar },
  { label: "排行榜", icon: Trophy },
  { label: "自定义组题", icon: ListPlus },
];

type QuestionBankGlobalProps = {
  courses: readonly CourseDefinition[];
};

/* ── Component ── */
export function QuestionBankGlobal({ courses }: QuestionBankGlobalProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [leftFilter, setLeftFilter] = useState<LeftFilter | null>(null);
  const [rightFilter, setRightFilter] = useState<RightFilter>("freshman");
  const [secondary, setSecondary] = useState<SecondaryFilter | null>(null);
  const [toolNotice, setToolNotice] = useState<string | null>(null);

  function toggleLeft(id: LeftFilter) {
    setLeftFilter((prev) => (prev === id ? null : id));
  }

  function toggleSecondary(id: SecondaryFilter) {
    setSecondary((prev) => (prev === id ? null : id));
  }

  function showToolNotice(label: string) {
    setToolNotice(`${label}功能即将上线`);
    setTimeout(() => setToolNotice(null), 2200);
  }

  /* Filter courses by search text */
  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q)
        || c.classification.toLowerCase().includes(q),
    );
  }, [courses, search]);

  /* Compute real today stats from question-bank attempts */
  const todayStats = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    let totalAttempts = 0;
    let correctAttempts = 0;
    for (const course of courses) {
      for (const item of flattenCourseAssessmentItems(course)) {
        const attempts = getQBAttempts(item.id);
        for (const a of attempts) {
          if (a.attemptedAt.slice(0, 10) === todayStr) {
            totalAttempts++;
            if (a.isCorrect) correctAttempts++;
          }
        }
      }
    }
    const accuracy = totalAttempts > 0
      ? Math.round((correctAttempts / totalAttempts) * 100)
      : 0;
    return { totalAttempts, correctAttempts, accuracy };
  }, [courses]);

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        {/* 1. Top title bar */}
        <div className={styles.titleBar}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>期末考试 (中西医结合临床)</h1>
            <p className={styles.titleSub}>跨课程题目聚合浏览与训练</p>
          </div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => router.push("/learn/course-builder")}
          >
            <Plus size={16} />
            添加题库
          </button>
        </div>

        {/* 2. Search bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="搜索题目"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              aria-label="搜索题目"
            />
          </div>
        </div>

        {/* 3. Main content — two columns */}
        <div className={styles.mainContent}>
          {/* Left: ad area */}
          <div className={styles.adArea}>Nur Learn 的广告区域</div>

          {/* Right: sidebar */}
          <div className={styles.sidebar}>
            {/* Today's stats card */}
            <div className={styles.statsCard}>
              <div className={styles.statsHeader}>
                <h2 className={styles.statsTitle}>今日统计</h2>
                <p className={styles.statsHint}>
                  数据来自此浏览器
                  <br />
                  做题记录实时统计
                </p>
              </div>
              <div className={styles.statsRow}>
                <div className={styles.statsItem}>
                  <div className={styles.statsValue}>{todayStats.totalAttempts}</div>
                  <div className={styles.statsLabel}>做题数</div>
                </div>
                <div className={styles.statsItem}>
                  <div className={styles.statsValue}>{todayStats.correctAttempts}</div>
                  <div className={styles.statsLabel}>答对数</div>
                </div>
                <div className={styles.statsItem}>
                  <div className={styles.statsValue}>
                    {todayStats.totalAttempts > 0 ? `${todayStats.accuracy}%` : "—"}
                  </div>
                  <div className={styles.statsLabel}>正确率</div>
                </div>
              </div>
            </div>

            {/* Tools card */}
            <div className={styles.toolsCard}>
              <div className={styles.toolsHeader}>
                <h2 className={styles.toolsTitle}>工具</h2>
              </div>
              <div className={styles.toolsGrid}>
                {TOOLS.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className={styles.toolItem}
                    onClick={() => showToolNotice(label)}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                    {label}
                  </button>
                ))}
              </div>
              {toolNotice ? (
                <p className={styles.toolsNotice} role="status">{toolNotice}</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* 4. Filter section */}
        <div className={styles.filterSection}>
          {/* Primary filter */}
          <div className={styles.primaryFilter}>
            <div className={styles.filterGroup}>
              {LEFT_FILTERS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`${styles.filterBtn} ${
                    leftFilter === id ? styles.filterActive : ""
                  }`}
                  aria-pressed={leftFilter === id}
                  onClick={() => toggleLeft(id)}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </button>
              ))}
            </div>
            <div className={styles.filterDivider} />
            <div className={styles.filterGroup}>
              {RIGHT_FILTERS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`${styles.filterBtn} ${
                    rightFilter === id ? styles.filterActive : ""
                  }`}
                  aria-pressed={rightFilter === id}
                  onClick={() => setRightFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary filter */}
          <div className={styles.secondaryFilter}>
            {SECONDARY_FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`${styles.secondaryBtn} ${
                  secondary === id ? styles.secondaryActive : ""
                }`}
                aria-pressed={secondary === id}
                onClick={() => toggleSecondary(id)}
              >
                {label}
              </button>
            ))}
          </div>
          {(leftFilter || secondary) ? (
            <p className={styles.filterNotice} role="status">
              {leftFilter
                ? `${LEFT_FILTERS.find((f) => f.id === leftFilter)?.label ?? ""}筛选将在进入具体课程题库后生效`
                : ""}
              {leftFilter && secondary ? " · " : ""}
              {secondary
                ? `${SECONDARY_FILTERS.find((f) => f.id === secondary)?.label ?? ""}筛选将在进入具体课程题库后生效`
                : ""}
            </p>
          ) : null}
        </div>

        {/* 5. Course list */}
        <div className={styles.courseList}>
          {filteredCourses.length > 0 ? filteredCourses.map((course) => {
            const kpCount = course.knowledgePoints.length;
            const qCount = flattenCourseAssessmentItems(course).length;
            const meta = qCount > 0
              ? `${kpCount} 知识点 · ${qCount} 题`
              : `${kpCount} 知识点`;
            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}/question-bank`}
                className={styles.courseItem}
              >
                <span>{course.title}</span>
                <span className={styles.courseMeta}>{meta}</span>
                <ChevronRight size={18} className={styles.courseArrow} />
              </Link>
            );
          }) : (
            <div className={styles.emptyState}>
              <strong>当前搜索范围内暂无课程</strong>
              <small>调整关键词或清除搜索条件。</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
