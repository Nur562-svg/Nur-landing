"use client";

import { useId, useMemo } from "react";
import type { CSSProperties } from "react";
import type { BotEmotion } from "@/lib/bot-emotion";
import styles from "./nur-agent-face.module.css";

export type NurAgentFaceProps = {
  /** 仅 idle；保留字段以兼容既有调用 */
  emotion?: BotEmotion;
  wrongStreak?: number;
  lookX?: number;
  lookY?: number;
  size?: number | undefined;
  pressed?: boolean;
  /** 拖动中：闭眼，松手前保持 */
  dragging?: boolean;
  className?: string;
};

/**
 * 土星环几何：以球心为原点的椭圆，拆成上下两段弧。
 * 上弧（远端）画在球后，下弧（近端）画在球前 —— 不再用水平 clip 切整环。
 * 左右端点 (cx±rx, cy)；sweep=1 走上半，sweep=0 走下半。
 */
const CX = 32;
const CY = 32;
const RING_RX = 27;
const RING_RY = 9.2;

const ringBackPath = `M ${CX - RING_RX} ${CY} A ${RING_RX} ${RING_RY} 0 0 1 ${CX + RING_RX} ${CY}`;
const ringFrontPath = `M ${CX - RING_RX} ${CY} A ${RING_RX} ${RING_RY} 0 0 0 ${CX + RING_RX} ${CY}`;
/** 亮弧下一段：近端下半椭圆，顺时针方向（右→左），接在远端上弧之后 */
const ringSparkFrontPath = `M ${CX + RING_RX} ${CY} A ${RING_RX} ${RING_RY} 0 0 1 ${CX - RING_RX} ${CY}`;

/**
 * 彗尾分层（6 层）：顺时针前方更淡更细，后方更亮更粗。
 * from 越负越靠顺时针前方（头）；from 接近 0 为尾（亮）。
 */
const SPARK_STEPS = [
  { o: 0.06, from: -14, dash: 2.0, w: 1.25 },
  { o: 0.1, from: -11.5, dash: 2.4, w: 1.35 },
  { o: 0.16, from: -9, dash: 2.9, w: 1.45 },
  { o: 0.24, from: -6.5, dash: 3.4, w: 1.55 },
  { o: 0.34, from: -4, dash: 3.9, w: 1.7 },
  { o: 0.48, from: -1.5, dash: 4.4, w: 1.85 },
] as const;

function SparkTrail({
  d,
  half,
}: {
  d: string;
  half: "back" | "front";
}) {
  return (
    <>
      {SPARK_STEPS.map((step) => (
        <path
          key={step.from}
          className={half === "back" ? styles.ringSparkBack : styles.ringSparkFront}
          d={d}
          pathLength={50}
          fill="none"
          strokeLinecap="round"
          strokeWidth={step.w}
          style={
            {
              "--spark-o": step.o,
              "--spark-from": step.from,
              "--spark-dash": step.dash,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

export function NurAgentFace({
  emotion = "idle",
  lookX = 0,
  lookY = 0,
  size,
  pressed = false,
  dragging = false,
  className,
}: NurAgentFaceProps) {
  const rawId = useId().replace(/:/g, "");
  const sphereGrad = `nur-orb-${rawId}`;
  const ringGlow = `nur-ring-glow-${rawId}`;
  const eyeX = lookX * 3.2;
  const eyeY = lookY * 2.4;

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
      data-press={pressed ? "true" : "false"}
      data-dragging={dragging ? "true" : "false"}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <svg className={styles.svg} viewBox="0 0 64 64" focusable="false">
        <defs>
          <radialGradient id={sphereGrad} cx="34%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="48%" stopColor="#f7f3eb" />
            <stop offset="82%" stopColor="#ddd6c8" />
            <stop offset="100%" stopColor="#c4bdb0" />
          </radialGradient>
          <filter
            id={ringGlow}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 远端环：上半弧，在球后；亮弧后半程画这里，被球遮挡 */}
        <g className={styles.ringBack}>
          <path
            d={ringBackPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
          />
          <SparkTrail d={ringBackPath} half="back" />
        </g>

        {/* 头部整体：球 + 高光 + 眼，不透明，挡住背后的环/亮弧 */}
        <g className={styles.head}>
          <circle
            className={styles.sphere}
            cx={CX}
            cy={CY}
            r={17.4}
            fill={`url(#${sphereGrad})`}
          />
          <ellipse className={styles.highlight} cx={26} cy={25} rx={5.8} ry={3.4} />

          <g
            className={styles.eyes}
            style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}
          >
            <rect className={styles.eye} x={24.4} y={26} width={4.2} height={9.4} rx={2.1} />
            <rect className={styles.eye} x={35.4} y={26} width={4.2} height={9.4} rx={2.1} />
          </g>
        </g>

        {/* 近端环：下半弧在球前；亮弧前半程画这里 */}
        <g className={styles.ringFront} filter={`url(#${ringGlow})`}>
          <path
            d={ringFrontPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.55}
            strokeLinecap="round"
          />
          <SparkTrail d={ringSparkFrontPath} half="front" />
        </g>
      </svg>
    </div>
  );
}

export default NurAgentFace;
