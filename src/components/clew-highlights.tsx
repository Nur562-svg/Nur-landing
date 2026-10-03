"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  CircleAlert,
  Highlighter,
  Loader2,
  LocateFixed,
  PenLine,
  Trash2,
  X,
} from "lucide-react";
import type { HiDocHighlightColor, HiDocHighlightView } from "@/types/hidoc";
import {
  HIDOC_HIGHLIGHT_COLORS,
  HIDOC_HIGHLIGHT_COLOR_LABELS,
  HIDOC_HIGHLIGHT_NOTE_MAX_CHARS,
  HIDOC_HIGHLIGHT_QUOTE_MAX_CHARS,
  isHiDocHighlightStale,
  toHiDocHighlightPaintItems,
} from "@/lib/hidoc/highlight-rules";
import {
  clearHiDocHighlightMarks,
  findHiDocHighlightMark,
  paintHiDocHighlights,
  readHiDocSelection,
} from "@/lib/hidoc/highlight-dom";
import { readHiDocFailure } from "@/lib/hidoc/client-api";
import styles from "./hi-doc.module.css";

/**
 * Hi doc 划重点层（客户端）：在讲义 DOM 内做文本定位并包裹 <mark>（Range/textNode，不用 innerHTML），
 * 提供选中文字后的四色划线气泡、批注编辑与「划重点」面板（含失配的「未定位」列表）。
 * 定位失败的条目如实列入「未定位」，绝不伪造位置。
 */

type HiDocHighlightLayerProps = {
  kpId: string;
  /** 当前讲义版本（ISO）；为 null 表示尚未生成讲义。 */
  lessonGeneratedAt: string | null;
  initialHighlights: HiDocHighlightView[];
  /** 讲义正文容器（由学习页渲染 markdown，本组件只做定位与划线）。 */
  bodyRef: RefObject<HTMLDivElement | null>;
  /** 讲义正在重新生成：期间清除旧划线，避免与新讲义 DOM 冲突。 */
  regenerating: boolean;
};

type BubbleState = {
  mode: "create" | "edit";
  highlightId: string | null;
  quote: string;
  prefix: string;
  suffix: string;
  color: HiDocHighlightColor;
  note: string;
  left: number;
  top: number;
  error: string | null;
};

/** 四色变量类（划线 <mark>、色板与色块共用；CSS Modules 不允许裸属性选择器）。 */
const swatchClasses: Record<HiDocHighlightColor, string> = {
  amber: styles.swatchAmber,
  cinnabar: styles.swatchCinnabar,
  slate: styles.swatchSlate,
  jade: styles.swatchJade,
};

function clampBubblePosition(rect: DOMRect | null): { left: number; top: number } {
  const width = Math.min(360, window.innerWidth - 24);
  const left = rect
    ? Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))
    : Math.max(12, window.innerWidth / 2 - width / 2);
  // 目标（选区或划线）可能在视口外：气泡始终保持在视口内
  const top = rect ? Math.min(Math.max(12, rect.bottom + 10), window.innerHeight - 340) : 120;
  return { left, top: Math.max(12, top) };
}

export function HiDocHighlightLayer({
  kpId,
  lessonGeneratedAt,
  initialHighlights,
  bodyRef,
  regenerating,
}: HiDocHighlightLayerProps) {
  const [highlights, setHighlights] = useState<HiDocHighlightView[]>(initialHighlights);
  const [paint, setPaint] = useState<{ locatedIds: string[]; missingIds: string[] }>({
    locatedIds: [],
    missingIds: [],
  });
  const [bubble, setBubble] = useState<BubbleState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);

  // 讲义 DOM 会在「旧讲义 → 流式草稿 → 新讲义」间整体重挂载；bodyVersion 变化时重新挂监听与重画
  const bodyVersion = regenerating ? "draft" : lessonGeneratedAt ?? "empty";
  const actionsRef = useRef<{
    onSelection: () => void;
    onBodyClick: (event: MouseEvent) => void;
  }>({ onSelection: () => {}, onBodyClick: () => {} });

  useEffect(() => {
    actionsRef.current = {
      onSelection: () => {
        if (!lessonGeneratedAt || regenerating) {
          return;
        }
        const selection = readHiDocSelection(bodyRef.current);
        if (!selection) {
          return;
        }
        const domSelection = window.getSelection();
        const rect =
          domSelection && domSelection.rangeCount > 0
            ? domSelection.getRangeAt(0).getBoundingClientRect()
            : null;
        const position = clampBubblePosition(rect);
        const tooLong = selection.quote.length > HIDOC_HIGHLIGHT_QUOTE_MAX_CHARS;
        setBubble({
          mode: "create",
          highlightId: null,
          quote: selection.quote,
          prefix: selection.prefix,
          suffix: selection.suffix,
          color: "amber",
          note: "",
          left: position.left,
          top: position.top,
          error: tooLong
            ? `选中的文字过长（${selection.quote.length} 字），请控制在 ${HIDOC_HIGHLIGHT_QUOTE_MAX_CHARS} 字以内。`
            : null,
        });
      },
      onBodyClick: (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        const mark = target?.closest("mark[data-hidoc-highlight-id]");
        if (!mark || window.getSelection()?.toString().trim()) {
          return;
        }
        const id = mark.getAttribute("data-hidoc-highlight-id");
        const item = id ? highlights.find((entry) => entry.id === id) : undefined;
        if (!item) {
          return;
        }
        const position = clampBubblePosition(mark.getBoundingClientRect());
        setBubble({
          mode: "edit",
          highlightId: item.id,
          quote: item.quote,
          prefix: item.prefix,
          suffix: item.suffix,
          color: item.color,
          note: item.note ?? "",
          left: position.left,
          top: position.top,
          error: null,
        });
      },
    };
  });

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) {
      return;
    }
    const handleMouseUp = () => actionsRef.current.onSelection();
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift" || event.key.startsWith("Arrow")) {
        actionsRef.current.onSelection();
      }
    };
    const handleClick = (event: MouseEvent) => actionsRef.current.onBodyClick(event);
    body.addEventListener("mouseup", handleMouseUp);
    body.addEventListener("keyup", handleKeyUp);
    body.addEventListener("click", handleClick);
    return () => {
      body.removeEventListener("mouseup", handleMouseUp);
      body.removeEventListener("keyup", handleKeyUp);
      body.removeEventListener("click", handleClick);
    };
  }, [bodyRef, bodyVersion]);

  // 定位 + 划线：清除旧标记后在讲义 DOM 内重新包裹（禁用 innerHTML）
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) {
      return;
    }
    clearHiDocHighlightMarks(body);
    if (!lessonGeneratedAt || regenerating) {
      setPaint({ locatedIds: [], missingIds: [] });
      return;
    }
    const items = toHiDocHighlightPaintItems(
      highlights.filter((item) => !isHiDocHighlightStale(item, lessonGeneratedAt)),
    );
    if (items.length === 0) {
      setPaint({ locatedIds: [], missingIds: [] });
      return;
    }
    const result = paintHiDocHighlights(body, items, (color) => swatchClasses[color]);
    setPaint({ locatedIds: result.locatedIds, missingIds: result.missingIds });
  }, [bodyRef, bodyVersion, highlights, lessonGeneratedAt, regenerating]);

  const staleIds = new Set(
    highlights
      .filter((item) => isHiDocHighlightStale(item, lessonGeneratedAt))
      .map((item) => item.id),
  );
  const unlocatedIds = new Set([...staleIds, ...paint.missingIds]);
  const located = highlights.filter((item) => !unlocatedIds.has(item.id));
  const unlocated = highlights.filter((item) => unlocatedIds.has(item.id));

  async function onSaveBubble() {
    if (!bubble || saving) {
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (bubble.mode === "create") {
        const response = await fetch("/api/hidoc/highlights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kpId,
            quote: bubble.quote,
            prefix: bubble.prefix,
            suffix: bubble.suffix,
            color: bubble.color,
            note: bubble.note,
          }),
        });
        const payload: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          setBubble((current) => (current ? { ...current, error: readHiDocFailure(payload) } : current));
          return;
        }
        const created = (payload as { highlight?: HiDocHighlightView }).highlight;
        if (created) {
          setHighlights((current) => [...current, created]);
        }
        window.getSelection()?.removeAllRanges();
      } else if (bubble.highlightId) {
        const response = await fetch(`/api/hidoc/highlights/${bubble.highlightId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ color: bubble.color, note: bubble.note }),
        });
        const payload: unknown = await response.json().catch(() => null);
        if (!response.ok) {
          setBubble((current) => (current ? { ...current, error: readHiDocFailure(payload) } : current));
          return;
        }
        const updated = (payload as { highlight?: HiDocHighlightView }).highlight;
        if (updated) {
          setHighlights((current) => current.map((item) => (item.id === updated.id ? updated : item)));
        }
      }
      setBubble(null);
    } catch {
      setBubble((current) =>
        current ? { ...current, error: "网络或服务暂时不可用，请稍后重试。" } : current,
      );
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteHighlight(highlightId: string) {
    if (saving) {
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/hidoc/highlights/${highlightId}`, { method: "DELETE" });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        setError(readHiDocFailure(payload));
        return;
      }
      setHighlights((current) => current.filter((item) => item.id !== highlightId));
      setBubble((current) => (current?.highlightId === highlightId ? null : current));
    } catch {
      setError("网络或服务暂时不可用，请稍后重试。");
    } finally {
      setSaving(false);
    }
  }

  function onLocate(highlightId: string) {
    const mark = bodyRef.current ? findHiDocHighlightMark(bodyRef.current, highlightId) : null;
    if (!mark) {
      return;
    }
    mark.scrollIntoView({ block: "center", behavior: "smooth" });
    setFocusId(highlightId);
    window.setTimeout(
      () => setFocusId((current) => (current === highlightId ? null : current)),
      1600,
    );
  }

  return (
    <>
      {bubble ? (
        <div
          className={styles.selectionBubble}
          style={{ left: `${bubble.left}px`, top: `${bubble.top}px` }}
          role="dialog"
          aria-label={bubble.mode === "create" ? "保存划重点" : "编辑划重点"}
        >
          <div className={styles.bubbleHead}>
            <p>{bubble.mode === "create" ? "划重点" : "编辑划重点"}</p>
            <button
              type="button"
              className={styles.bubbleClose}
              aria-label="关闭"
              onClick={() => setBubble(null)}
            >
              <X aria-hidden="true" size={15} strokeWidth={1.8} />
            </button>
          </div>
          <p className={styles.bubbleQuote}>「{bubble.quote}」</p>
          <div className={styles.colorSwatchRow} role="radiogroup" aria-label="划线颜色">
            {HIDOC_HIGHLIGHT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                role="radio"
                aria-checked={bubble.color === color}
                aria-label={`${HIDOC_HIGHLIGHT_COLOR_LABELS[color]}划线`}
                className={`${
                  bubble.color === color ? styles.colorSwatchActive : styles.colorSwatch
                } ${swatchClasses[color]}`}
                data-hidoc-swatch={color}
                onClick={() => setBubble((current) => (current ? { ...current, color } : current))}
              >
                <span aria-hidden="true" />
                {HIDOC_HIGHLIGHT_COLOR_LABELS[color]}
              </button>
            ))}
          </div>
          <label className={styles.bubbleField}>
            <span>批注（可选，{HIDOC_HIGHLIGHT_NOTE_MAX_CHARS} 字以内）</span>
            <textarea
              className={styles.bubbleTextarea}
              value={bubble.note}
              maxLength={HIDOC_HIGHLIGHT_NOTE_MAX_CHARS}
              rows={3}
              placeholder="为什么重要？容易错在哪？"
              onChange={(event) =>
                setBubble((current) => (current ? { ...current, note: event.target.value } : current))
              }
            />
          </label>
          {bubble.error ? (
            <p className={styles.bubbleError} role="alert">
              <CircleAlert aria-hidden="true" size={14} strokeWidth={1.8} />
              <span>{bubble.error}</span>
            </p>
          ) : null}
          <div className={styles.bubbleActions}>
            <button
              type="button"
              className={styles.primaryButton}
              disabled={saving || bubble.error !== null}
              onClick={() => void onSaveBubble()}
            >
              {saving ? (
                <Loader2 className={styles.spin} aria-hidden="true" size={15} strokeWidth={1.8} />
              ) : (
                <PenLine aria-hidden="true" size={15} strokeWidth={1.6} />
              )}
              {bubble.mode === "create" ? "保存划重点" : "保存修改"}
            </button>
            {bubble.mode === "edit" && bubble.highlightId ? (
              <button
                type="button"
                className={styles.dangerButton}
                disabled={saving}
                onClick={() => {
                  const id = bubble.highlightId;
                  if (id) {
                    void onDeleteHighlight(id);
                  }
                }}
              >
                <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
                删除
              </button>
            ) : null}
            <button type="button" className={styles.ghostButton} onClick={() => setBubble(null)}>
              取消
            </button>
          </div>
        </div>
      ) : null}

      <section className={styles.highlightPanel} aria-labelledby="hidoc-highlight-title">
        <div className={styles.panelHead}>
          <h2 id="hidoc-highlight-title">
            <Highlighter aria-hidden="true" size={17} strokeWidth={1.6} /> 划重点
          </h2>
          <p>
            {highlights.length} 条 · 已定位 {located.length} · 未定位 {unlocated.length}
          </p>
        </div>
        <p className={styles.highlightHint}>
          在讲义正文中选中文字即可划四色线并写批注；点划线本身可换色或改批注，也可在下方列表里编辑。
        </p>

        {error ? (
          <p className={styles.errorBox} role="alert">
            <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
            <span>{error}</span>
          </p>
        ) : null}

        {highlights.length === 0 ? (
          <p className={styles.highlightEmpty}>
            {lessonGeneratedAt
              ? "还没有划重点：先在上方讲义里选中一句话试试。"
              : "先生成讲义，之后即可在讲义中划重点并写批注。"}
          </p>
        ) : (
          <>
            {located.length > 0 ? (
              <ul className={styles.highlightList} aria-label="已定位的划重点">
                {located.map((item) => (
                  <li
                    key={item.id}
                    className={focusId === item.id ? styles.highlightItemFocus : styles.highlightItem}
                  >
                    <span
                      className={`${styles.highlightColorChip} ${swatchClasses[item.color]}`}
                      aria-hidden="true"
                    />
                    <div className={styles.highlightMain}>
                      <p className={styles.highlightQuote}>「{item.quote}」</p>
                      {item.note ? <p className={styles.highlightNote}>{item.note}</p> : null}
                      <p className={styles.highlightMeta}>
                        {HIDOC_HIGHLIGHT_COLOR_LABELS[item.color]} ·{" "}
                        {new Date(item.createdAt).toLocaleString("zh-CN", {
                          hour12: false,
                          timeZone: "Asia/Shanghai",
                        })}
                      </p>
                    </div>
                    <div className={styles.highlightActions}>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label="定位到讲义中的划线"
                        onClick={() => onLocate(item.id)}
                      >
                        <LocateFixed aria-hidden="true" size={15} strokeWidth={1.6} />
                      </button>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label="编辑颜色或批注"
                        onClick={() => {
                          const mark = bodyRef.current
                            ? findHiDocHighlightMark(bodyRef.current, item.id)
                            : null;
                          const position = clampBubblePosition(
                            mark ? mark.getBoundingClientRect() : null,
                          );
                          setBubble({
                            mode: "edit",
                            highlightId: item.id,
                            quote: item.quote,
                            prefix: item.prefix,
                            suffix: item.suffix,
                            color: item.color,
                            note: item.note ?? "",
                            left: position.left,
                            top: position.top,
                            error: null,
                          });
                        }}
                      >
                        <PenLine aria-hidden="true" size={15} strokeWidth={1.6} />
                      </button>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label="删除这条划重点"
                        disabled={saving}
                        onClick={() => void onDeleteHighlight(item.id)}
                      >
                        <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {unlocated.length > 0 ? (
              <div className={styles.unlocatedBlock}>
                <p className={styles.unlocatedHead}>未定位 {unlocated.length} 条 · 讲义已更新，暂无法定位</p>
                <p className={styles.unlocatedHint}>
                  以下划线是按旧版讲义保存的：不会伪造位置，可删除后在新讲义上重新划线。
                </p>
                <ul className={styles.highlightList} aria-label="未定位的划重点">
                  {unlocated.map((item) => (
                    <li key={item.id} className={styles.highlightItem}>
                      <span
                        className={`${styles.highlightColorChip} ${swatchClasses[item.color]}`}
                        aria-hidden="true"
                      />
                      <div className={styles.highlightMain}>
                        <p className={styles.highlightQuote}>「{item.quote}」</p>
                        {item.note ? <p className={styles.highlightNote}>{item.note}</p> : null}
                        <p className={styles.highlightMeta}>
                          {HIDOC_HIGHLIGHT_COLOR_LABELS[item.color]} · 旧版讲义（
                          {item.anchorLessonUpdatedAt
                            ? new Date(item.anchorLessonUpdatedAt).toLocaleString("zh-CN", {
                                hour12: false,
                                timeZone: "Asia/Shanghai",
                              })
                            : "未生成讲义时划线"}
                          ）
                        </p>
                      </div>
                      <div className={styles.highlightActions}>
                        <button
                          type="button"
                          className={styles.iconButton}
                          aria-label="删除这条划重点"
                          disabled={saving}
                          onClick={() => void onDeleteHighlight(item.id)}
                        >
                          <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}