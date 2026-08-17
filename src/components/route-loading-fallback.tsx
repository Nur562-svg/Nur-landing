import styles from "./system-fallback.module.css";

export type RouteLoadingFallbackProps = {
  label?: string;
};

export function RouteLoadingFallback({
  label = "正在准备…",
}: RouteLoadingFallbackProps) {
  return (
    <div className={styles.loadingRoot} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.loadingRule} aria-hidden="true" />
      <p className={styles.loadingLabel}>{label}</p>
    </div>
  );
}
