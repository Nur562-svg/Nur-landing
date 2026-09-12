"use client";

/**
 * NUR Agent 煤球精灵。
 *
 * SVG 圆角多边形身体（统一 8 点三次样条，d 可平滑过渡）
 * + 对称白眼（随指针 / 随形状偏重心）+ idle 呼吸眨眼 + 开心墨点 + 按压果冻。
 */

import { useMemo } from "react";
import type { BotEmotion } from "@/lib/bot-emotion";
import {
  BLOB_PATHS,
  EYE_OFFSETS,
  shapeFromStreak,
} from "./bot-blob-shapes";
import styles from "./nur-agent-face.module.css";

export type NurAgentFaceProps = {
  emotion: BotEmotion;
  wrongStreak?: number;
  lookX?: number;
  lookY?: number;
  size?: number | undefined;
  pressed?: boolean;
  className?: string;
};

export function NurAgentFace({
  emotion,
  wrongStreak = 0,
  lookX = 0,
  lookY = 0,
  size,
  pressed = false,
  className,
}: NurAgentFaceProps) {
  const shape = shapeFromStreak(emotion, wrongStreak);
  const path = BLOB_PATHS[shape];
  const eyeOff = EYE_OFFSETS[shape];

  const eyeX = lookX * 10 + eyeOff.x;
  const eyeY = lookY * 8 + eyeOff.y;
  const tilt = lookX * 7;

  const rootClass = useMemo(() => {
    const parts = [styles.orb];
    if (className) {
      parts.push(className);
    }
    return parts.join(" ");
  }, [className]);

  return (
    <div
      className={rootClass}
      data-emotion={emotion}
      data-shape={shape}
      data-press={pressed ? "true" : "false"}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <div className={styles.tilt} style={{ transform: `rotate(${tilt}deg)` }}>
        <div className={styles.stage}>
          <svg className={styles.svg} viewBox="0 0 100 100" focusable="false">
            {/* d 走 CSS 属性才能 transition 插值 */}
            <path
              className={styles.body}
              d={path}
              style={{ d: `path("${path}")` } as React.CSSProperties}
            />
          </svg>

          <div
            className={styles.eyes}
            style={{
              transform: `translate(calc(-50% + ${eyeX}%), calc(-50% + ${eyeY}%))`,
            }}
          >
            <span className={styles.eye} />
            <span className={styles.eye} />
          </div>

          <span className={[styles.ink, styles.inkA].join(" ")} />
          <span className={[styles.ink, styles.inkB].join(" ")} />
          <span className={[styles.ink, styles.inkC].join(" ")} />
        </div>
      </div>
    </div>
  );
}

export default NurAgentFace;
