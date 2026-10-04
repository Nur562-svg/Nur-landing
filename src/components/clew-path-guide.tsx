import Link from "next/link";
import type { ClewGuide } from "@/lib/clew/step-guide";
import styles from "./clew.module.css";

/**
 * Renders the shipped eight-step guide as the v4 quiet progress line
 * (docs/DESIGN_V4.md §四 / P0-1 裁决): a 2px line + one small status line,
 * with the light 「下一步」 link kept at the line tail — it remains the only
 * navigation for advancing the eight-step textbook pipeline. Wording uses
 * 「教材路径」 to stay distinct from the Loop Profile stage count (3–6).
 */
export function ClewPathGuide({ guide }: { guide: ClewGuide }) {
  const percent = guide.progressMax > 0
    ? Math.round((guide.progressValue / guide.progressMax) * 100)
    : 0;
  return (
    <section className={styles.pathGuide} aria-label="Clew 教材路径">
      <div
        className={styles.pathProgress}
        role="progressbar"
        aria-label="教材路径进度"
        aria-valuemin={0}
        aria-valuemax={guide.progressMax}
        aria-valuenow={guide.progressValue}
      >
        <span className={styles.pathBar} aria-hidden="true">
          <i className={styles.pathBarFill} style={{ width: `${percent}%` }} />
        </span>
      </div>
      <p className={styles.pathStatus} role="status">
        <span>教材路径 {guide.progressLabel} · {guide.statusHint}</span>
        <Link
          className={styles.pathNextLink}
          href={guide.nextHref}
          title={guide.nextAction}
        >
          {guide.nextControl}：{guide.nextAction}
        </Link>
      </p>
    </section>
  );
}
