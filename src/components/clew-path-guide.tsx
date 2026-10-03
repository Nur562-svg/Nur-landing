import Link from "next/link";
import type { ClewGuide } from "@/lib/clew/step-guide";
import styles from "./clew.module.css";

/** Renders the shipped eight-step guide: progress, status, and 下一步. */
export function ClewPathGuide({ guide }: { guide: ClewGuide }) {
  return (
    <section className={styles.pathGuide} aria-label="Clew 学习路径">
      <ol className={styles.pathSteps}>
        {guide.steps.map((name, index) => (
          <li
            key={name}
            className={name === guide.currentName ? styles.pathStepCurrent : undefined}
            aria-current={name === guide.currentName ? "step" : undefined}
          >
            <span>{index + 1}</span>
            {name}
          </li>
        ))}
      </ol>
      <div className={styles.pathProgress}>
        <progress value={guide.progressValue} max={guide.progressMax} />
        <span>{guide.progressLabel}</span>
      </div>
      <p className={styles.pathStatus} role="status">{guide.statusHint}</p>
      <p className={styles.pathNext}>{guide.nextAction}</p>
      <Link className={styles.pathNextButton} href={guide.nextHref}>
        {guide.nextControl}
      </Link>
    </section>
  );
}
