"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type FabPosition = {
  /** FAB 左上角 left（px，相对 viewport） */
  x: number;
  /** FAB 左上角 top（px，相对 viewport） */
  y: number;
};

export type UseDraggableFabOptions = {
  /** 视口边缘留白，默认 12 */
  margin?: number;
  /** 位移超过该值才算拖动（区分点击），默认 6 */
  dragThreshold?: number;
  /** localStorage key */
  storageKey?: string;
  /** 默认位置：未持久化时的 bottom-right 偏移 */
  defaultInset?: { right: number; bottom: number };
  /** 元素已挂载后才读/写位置（SSR portal 必须） */
  enabled?: boolean;
};

const DEFAULT_STORAGE_KEY = "nur-learn:agent-fab-pos";

function readStored(key: string): FabPosition | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<FabPosition>;
    if (typeof parsed.x !== "number" || typeof parsed.y !== "number") {
      return null;
    }
    if (!Number.isFinite(parsed.x) || !Number.isFinite(parsed.y)) {
      return null;
    }
    return { x: parsed.x, y: parsed.y };
  } catch {
    return null;
  }
}

function writeStored(key: string, pos: FabPosition): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(pos));
  } catch {
    // 隐私模式等写入失败时忽略
  }
}

function clampPos(
  pos: FabPosition,
  size: { w: number; h: number },
  margin: number,
): FabPosition {
  const maxX = Math.max(margin, window.innerWidth - size.w - margin);
  const maxY = Math.max(margin, window.innerHeight - size.h - margin);
  return {
    x: Math.min(Math.max(pos.x, margin), maxX),
    y: Math.min(Math.max(pos.y, margin), maxY),
  };
}

function defaultPos(
  size: { w: number; h: number },
  inset: { right: number; bottom: number },
  margin: number,
): FabPosition {
  return clampPos(
    {
      x: window.innerWidth - size.w - inset.right,
      y: window.innerHeight - size.h - inset.bottom,
    },
    size,
    margin,
  );
}

/**
 * FAB 拖动：pointer capture + 位移阈值区分点击。
 * 位置写入 localStorage；窗口 resize 时夹回视口。
 */
export function useDraggableFab<T extends HTMLElement>(
  options: UseDraggableFabOptions = {},
): {
  ref: React.RefObject<T | null>;
  pos: FabPosition | null;
  dragging: boolean;
  /** 刚结束一次有效拖动（用于抑制 click） */
  justDragged: boolean;
  onPointerDown: (event: React.PointerEvent<T>) => void;
  style: React.CSSProperties;
} {
  const {
    margin = 12,
    dragThreshold = 6,
    storageKey = DEFAULT_STORAGE_KEY,
    defaultInset = { right: 28, bottom: 28 },
    enabled = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState<FabPosition | null>(null);
  const [dragging, setDragging] = useState(false);
  const [justDragged, setJustDragged] = useState(false);

  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  // FAB 真正挂载后再读位置（portal + mounted 门闩）
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const el = ref.current;
    if (!el) {
      return;
    }
    // rAF：把 setState 移出 effect 同步体（react-hooks/set-state-in-effect），
    // 首帧后定位，视觉时序与原先一致（effect 本就在首次绘制后运行）。
    const frame = window.requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const size = { w: rect.width || 64, h: rect.height || 64 };
      const stored = readStored(storageKey);
      setPos(stored ? clampPos(stored, size, margin) : defaultPos(size, defaultInset, margin));
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [enabled, storageKey, margin, defaultInset.right, defaultInset.bottom]);

  // resize / orientation 后夹回视口
  useEffect(() => {
    const onResize = (): void => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setPos((prev) => {
        if (!prev) {
          return prev;
        }
        const rect = el.getBoundingClientRect();
        // resize 时 rect 可能已跟 pos 对齐，用 CSS 尺寸更稳
        const size = {
          w: rect.width || el.offsetWidth || 64,
          h: rect.height || el.offsetHeight || 64,
        };
        return clampPos(prev, size, margin);
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [margin]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<T>) => {
      if (event.button !== 0 && event.pointerType === "mouse") {
        return;
      }
      const el = ref.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      dragState.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: rect.left,
        originY: rect.top,
        active: false,
      };
      el.setPointerCapture(event.pointerId);

      const onMove = (moveEvent: PointerEvent): void => {
        const state = dragState.current;
        if (!state || moveEvent.pointerId !== state.pointerId) {
          return;
        }
        const dx = moveEvent.clientX - state.startX;
        const dy = moveEvent.clientY - state.startY;
        if (!state.active) {
          if (Math.hypot(dx, dy) < dragThreshold) {
            return;
          }
          state.active = true;
          setDragging(true);
          setJustDragged(false);
        }
        const size = { w: el.offsetWidth || 64, h: el.offsetHeight || 64 };
        setPos(
          clampPos(
            { x: state.originX + dx, y: state.originY + dy },
            size,
            margin,
          ),
        );
      };

      const onUp = (upEvent: PointerEvent): void => {
        const state = dragState.current;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        if (!state || upEvent.pointerId !== state.pointerId) {
          return;
        }
        dragState.current = null;
        if (state.active) {
          setDragging(false);
          setJustDragged(true);
          const elNow = ref.current;
          const size = {
            w: elNow?.offsetWidth || 64,
            h: elNow?.offsetHeight || 64,
          };
          setPos((prev) => {
            if (!prev) {
              return prev;
            }
            const next = clampPos(prev, size, margin);
            writeStored(storageKey, next);
            return next;
          });
          // 下一帧再清，确保 click 先读到 true
          window.setTimeout(() => setJustDragged(false), 0);
        }
        if (el.hasPointerCapture(upEvent.pointerId)) {
          el.releasePointerCapture(upEvent.pointerId);
        }
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [dragThreshold, margin, storageKey],
  );

  const style: React.CSSProperties = pos
    ? {
        left: pos.x,
        top: pos.y,
        right: "auto",
        bottom: "auto",
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none",
      }
    : {
        // 未 hydrate 完成前保持 CSS 默认右下角
        touchAction: "none",
        cursor: "grab",
      };

  return { ref, pos, dragging, justDragged, onPointerDown, style };
}
