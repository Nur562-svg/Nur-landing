import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { courseHasAuthoredLesson, flattenCourseAssessmentItems } from "@/lib/course-selectors";
import type { CourseDefinition } from "@/types/learning";
import styles from "./course-catalog.module.css";

type CourseCatalogProps = {
  courses: readonly CourseDefinition[];
};

function CourseCard({ course }: { course: CourseDefinition }) {
  const loop = courseHasAuthoredLesson(course);
  const itemCount = flattenCourseAssessmentItems(course).length;
  const href = loop ? `/courses/${course.slug}` : `/courses/${course.slug}/question-bank`;
  const meta = loop
    ? `${course.classification} · ${itemCount} 题 · 含课时闭环`
    : `${course.classification} · ${itemCount} 题 · 仅刷题`;

  return (
    <article className={styles.card}>
      <Link className={styles.cardMain} href={href}>
        <span className={loop ? styles.cardKicker : styles.drillOnlyBadge}>{loop ? "学习闭环" : "仅刷题"}</span>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        <p className={styles.cardMeta}>{meta}</p>
        <span className={styles.cardAction}>
          {loop ? "进入工作台" : "进入刷题"}
          <ArrowRight size={16} />
        </span>
      </Link>
      <div className={styles.cardLinks}>
        <Link href={`/courses/${course.slug}/question-bank`}>刷题</Link>
        <Link href={`/courses/${course.slug}/mock-exam`}>模考</Link>
      </div>
    </article>
  );
}

export function CourseCatalog({ courses }: CourseCatalogProps) {
  const loopCourses = courses.filter((course) => courseHasAuthoredLesson(course));
  const bankCourses = courses.filter((course) => !courseHasAuthoredLesson(course));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/learn">
          <ArrowLeft size={16} /> 返回学习首页
        </Link>
        <p className={styles.kicker}>课程目录</p>
        <h1 className={styles.title}>选择一门课</h1>
        <p className={styles.subtitle}>
          闭环课走理解—写作—案例—错题回流；「仅刷题」课只有章节练习与模考，不是完整学习闭环。作答进度保存在此浏览器。
        </p>
      </header>

      {loopCourses.length > 0 ? (
        <section className={styles.section} id="learning-loops">
          <h2 className={styles.sectionTitle}>学习闭环</h2>
          <div className={styles.grid}>
            {loopCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      ) : null}

      {bankCourses.length > 0 ? (
        <section className={styles.section} id="question-banks">
          <h2 className={styles.sectionTitle}>仅刷题课程</h2>
          <p className={styles.sectionHint}>这些课没有知识点课时，不构成「学习闭环」；适合按章节刷题与模考。</p>
          <div className={styles.grid}>
            {bankCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
