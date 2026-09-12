"use client";

import { useEffect, useRef, useState } from "react";

export type NearPointer = {
  /** -1 左 / 1 右 */
  x: number;
  /** -1 上 / 1 下 */
  y: number;
  /** 是否在感应半径内 */
  near: boolean;
  /** 是否悬停在元素上 */
  over: boolean;
};

export type NearPointerOptions = {
  /** 感应半径 px，默认 280 */
  radius?: number;
  /** 达到满幅跟随的距离 px，默认 140 */
  fullAt?: number;
  /** 数值变化死区，避免抖动，默认 0.03 */
  epsilon?: number;
};

const IDLE: NearPointer = { x: 0, y: 0, near: false, over: false };

/**
 * 指针相对元素中心的方向。rAF 节流 + 死区，
 * 组件侧用 CSS transition 插值，避免每帧整树重渲染。
 */
export function useNearPointer<T extends HTMLElement>(
  options: NearPointerOptions = {},
): [React.RefObject<T | null>, NearPointer] {
  const { radius = 280, fullAt = 140, epsilon = 0.03 } = options;
  const ref = useRef<T | null>(null);
  const [dir, setDir] = useState<NearPointer>(IDLE);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<NearPointer>(IDLE);

  useEffect(() => {
    const clamp = (value: number): number => Math.max(-1, Math.min(1, value));

    const onMove = (event: PointerEvent): void => {
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const el = ref.current;
        if (!el) {
          return;
        }
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const near = dist <= radius;
        const over =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        const next: NearPointer = near
          ? {
              x: clamp(dx / fullAt),
              y: clamp(dy / fullAt),
              near,
              over,
            }
          : { x: 0, y: 0, near: false, over };

        const prev = lastRef.current;
        if (
          Math.abs(prev.x - next.x) > epsilon ||
          Math.abs(prev.y - next.y) > epsilon ||
          prev.near !== next.near ||
          prev.over !== next.over
        ) {
          lastRef.current = next;
          setDir(next);
        }
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [radius, fullAt, epsilon]);

  return [ref, dir];
}
