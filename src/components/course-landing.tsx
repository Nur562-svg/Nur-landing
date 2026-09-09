import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, FileQuestion, GraduationCap } from "lucide-react";
import {
  flattenCourseAssessmentItems,
  selectAssessmentItemsForChapter,
  selectQuestionBankChapterViews,
} from "@/lib/course-selectors";
import type { CourseDefinition, CurriculumMode } from "@/types/learning";
import styles from "./course-landing.module.css";

const CURRICULUM_MODE_LABELS: Record<CurriculumMode, string> = {
  "tcm-primary": "中医主导",
  "western-primary": "西医主导",
  integrated: "中西医结合",
};

type CourseLandingProps = {
  course: CourseDefinition;
};

/** 通用课程落地页：题库课程（无学习路径）与仅有少量学习内容的课程共用。 */
export function CourseLanding({ course }: CourseLandingProps) {
  const chapters = selectQuestionBankChapterViews(course);
  const chapterData = chapters.map((chapter) => ({
    chapter,
    count: selectAssessmentItemsForChapter(course, chapter.id).length,
  }));
  const totalItems = flattenCourseAssessmentItems(course).length;
  const hasLearningContent =
    course.learningRoutes.length > 0
    || course.knowledgePoints.some((point) => point.lesson !== null)
    || course.cases.length > 0;
  const hasBlueprint = course.examBlueprint.rows.length > 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/learn">
          <ArrowLeft size={16} /> 返回学习首页
        </Link>
        <p className={styles.kicker}>
          {course.curriculumMode
            ? CURRICULUM_MODE_LABELS[course.curriculumMode]
            : ""}
          {course.classification ? ` · ${course.classification}` : ""}
        </p>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.subtitle}>{course.description}</p>
      </header>

      {hasLearningContent ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>学习内容</h2>
          <div className={styles.learningList}>
            {course.knowledgePoints.map((point) => (
              <Link
                key={point.id}
                className={styles.learningRow}
                href={`/courses/${course.slug}/knowledge-points/${point.slug}`}
              >
                <GraduationCap size={16} aria-hidden />
                <span className={styles.learningName}>{point.title}</span>
                <ArrowRight size={16} className={styles.rowArrow} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>章节题库</h2>
          <Link className={styles.primaryAction} href={`/courses/${course.slug}/question-bank`}>
            <BookOpen size={16} /> 进入题库
          </Link>
        </div>
        <p className={styles.sectionMeta}>
          共 <strong>{totalItems}</strong> 道可答题 · 按章节浏览与练习，作答进度保存在此浏览器
        </p>
        <div className={styles.chapterGrid}>
          {chapterData.map(({ chapter, count }) => (
            <Link
              key={chapter.id}
              className={styles.chapterCard}
              href={`/courses/${course.slug}/question-bank/${chapter.slug}`}
            >
              <span className={styles.chapterIndex}>CHAPTER {chapter.indexLabel}</span>
              <h3 className={styles.chapterName}>{chapter.title}</h3>
              <span className={styles.chapterCount}>{count} 题</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>模拟考试</h2>
          <Link className={styles.primaryAction} href={`/courses/${course.slug}/mock-exam`}>
            <FileQuestion size={16} /> 进入模考
          </Link>
        </div>
        <div className={styles.blueprintCard}>
          <p className={styles.blueprintTitle}>
            {hasBlueprint ? course.examBlueprint.title : "正式考纲待导入"}
          </p>
          {hasBlueprint ? (
            <p className={styles.blueprintMeta}>
              {course.examBlueprint.scope.school} · {course.examBlueprint.scope.program} ·{" "}
              {course.examBlueprint.scope.learnerYear} · {course.examBlueprint.scope.semester} ·{" "}
              {course.examBlueprint.totalPoints} 分
            </p>
          ) : (
            <p className={styles.blueprintNotice}>
              {course.examBlueprint.missingLabel ?? "本课程正式考纲/试卷结构尚未导入。"}
              导入前提供<strong>题库随机练习卷</strong>（每题 1 分，非官方卷面结构）；导入后按蓝图组卷。
            </p>
          )}
        </div>
      </section>

      {course.sources.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>材料来源</h2>
          <ul className={styles.sourceList}>
            {course.sources.map((source) => (
              <li key={source.id} className={styles.sourceRow}>
                <span className={styles.sourceName}>{source.displayLabel}</span>
                {source.citation?.edition ? (
                  <span className={styles.sourceMeta}>{source.citation.edition}</span>
                ) : null}
                {source.citation ? (
                  <span className={styles.sourceMeta}>{source.citation.label}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
