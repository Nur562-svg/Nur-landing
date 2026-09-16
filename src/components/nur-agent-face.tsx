"use client";

import { useId, useMemo } from "react";
import type { BotEmotion } from "@/lib/bot-emotion";
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

/**
 * 土星环几何：以球心为原点的椭圆，拆成上下两段弧。
 * 上弧（远端）画在球后，下弧（近端）画在球前 —— 不再用水平 clip 切整环。
 * 左右端点 (cx±rx, cy)；sweep=1 走上半，sweep=0 走下半。
 */
const CX = 32;
const CY = 32;
const RING_RX = 27;
const RING_RY = 9.2;
const RING_TILT = -16;

const ringBackPath = `M ${CX - RING_RX} ${CY} A ${RING_RX} ${RING_RY} 0 0 1 ${CX + RING_RX} ${CY}`;
const ringFrontPath = `M ${CX - RING_RX} ${CY} A ${RING_RX} ${RING_RY} 0 0 0 ${CX + RING_RX} ${CY}`;

export function NurAgentFace({
  emotion,
  lookX = 0,
  lookY = 0,
  size,
  pressed = false,
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

        {/* 远端环：上半弧，在球后 */}
        <g
          className={styles.ringBack}
          transform={`rotate(${RING_TILT} ${CX} ${CY})`}
        >
          <path
            d={ringBackPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        </g>

        {/* 球体；近端环会盖住下缘，形成环绕深度 */}
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

        {/* 近端环：下半弧，在球前，更亮更厚 + 光晕 */}
        <g
          className={styles.ringFront}
          transform={`rotate(${RING_TILT} ${CX} ${CY})`}
          filter={`url(#${ringGlow})`}
        >
          <path
            d={ringFrontPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.55}
            strokeLinecap="round"
          />
        </g>
      </svg>
      <span className={styles.mark} />
    </div>
  );
}

export default NurAgentFace;
