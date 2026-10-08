import styles from "./skeleton.module.css";

/**
 * 骨架屏三件套（设计评审 V-1）：异步加载首屏用骨架替代 spinner；
 * 有真实阶段的长任务（讲义/笔记/练习生成）仍用 progressLog（诚实披露阶段）。
 * shimmer 是装饰性动画——reduced-motion 下静置为灰块（CSS 内已降级）。
 */

/** 基础灰块（自定义宽度/高度时直接用）。 */
export function Skeleton({ className }: { className?: string }) {
  return <span className={[styles.block, className].filter(Boolean).join(" ")} aria-hidden="true" />;
}

/** 列表骨架（书架/题库/错题列表等行式内容）。 */
export function SkeletonList({ rows = 3 }: { rows?: number }) {
  return (
    <div className={styles.list} aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className={styles.listRow}>
          <span className={[styles.block, styles.listThumb].join(" ")} />
          <div className={styles.listLines}>
            <span className={[styles.block, styles.line, styles.lineTitle].join(" ")} />
            <span className={[styles.block, styles.line, styles.lineMeta].join(" ")} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** 卡片骨架（统计卡/内容卡）。 */
export function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <span className={[styles.block, styles.cardKicker].join(" ")} />
      <span className={[styles.block, styles.cardNumber].join(" ")} />
      <span className={[styles.block, styles.line, styles.cardMeta].join(" ")} />
    </div>
  );
}

/** 文档段落骨架（讲义/笔记首屏）。 */
export function SkeletonDoc({ paragraphs = 4 }: { paragraphs?: number }) {
  return (
    <div className={styles.doc} aria-hidden="true">
      <span className={[styles.block, styles.docTitle].join(" ")} />
      {Array.from({ length: paragraphs }, (_, index) => (
        <span
          key={index}
          className={[styles.block, styles.docPara, index === paragraphs - 1 ? styles.docParaShort : ""].join(" ")}
        />
      ))}
    </div>
  );
}
