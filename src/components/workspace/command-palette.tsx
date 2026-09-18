"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { ACTIVE_COURSE_ENTRIES, PRIMARY_ENTRIES, type ShellTextbook } from "./shell-data";
import styles from "./command-palette.module.css";

type PaletteItem = {
  id: string;
  label: string;
  hint?: string;
  href: string;
  group: string;
};

const STATIC_ITEMS: readonly PaletteItem[] = [
  ...PRIMARY_ENTRIES.map((entry) => ({ ...entry, group: "主入口" })),
  { id: "learn-home", label: "学习主页", href: "/learn", group: "主入口" },
  ...ACTIVE_COURSE_ENTRIES.map((entry) => ({ ...entry, group: "官方课程" })),
];

const MAX_TEXTBOOK_ITEMS = 6;

export type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  /** 面板内跳转后的额外回调（例如收起移动端抽屉）。 */
  onNavigate?: () => void;
  textbooks: readonly ShellTextbook[];
};

/** ⌘K 命令面板（R1 只做壳）：静态入口聚合 + 书架教材列表，不做全局检索。 */
export function CommandPalette({ open, ...rest }: CommandPaletteProps) {
  if (!open) {
    return null;
  }
  return <CommandPaletteOpen {...rest} />;
}

function CommandPaletteOpen({ onClose, onNavigate, textbooks }: Omit<CommandPaletteProps, "open">) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<readonly PaletteItem[]>(() => {
    const textbookItems: readonly PaletteItem[] = textbooks.slice(0, MAX_TEXTBOOK_ITEMS).map((book) => ({
      id: `textbook-${book.id}`,
      label: book.title,
      hint: book.isFrozen ? "书架教材 · 已冻结" : `书架教材 · ${book.chapterCount} 章`,
      href: `/learn/hi-doc/t/${book.id}`,
      group: "书架教材",
    }));
    const all = [...STATIC_ITEMS, ...textbookItems];
    const keyword = query.trim().toLowerCase();
    if (!keyword) return all;
    return all.filter((item) => item.label.toLowerCase().includes(keyword));
  }, [query, textbooks]);

  // items 收缩时夹住高亮下标（渲染期派生，避免 effect 级联 setState）
  const currentIndex = items.length === 0 ? 0 : Math.min(activeIndex, items.length - 1);

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const go = (item: PaletteItem) => {
    onClose();
    onNavigate?.();
    router.push(item.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(Math.min(currentIndex + 1, items.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(Math.max(currentIndex - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = items[currentIndex];
      if (item) go(item);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.panel}
        data-command-palette=""
        role="dialog"
        aria-label="命令面板"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.inputRow}>
          <Search size={16} strokeWidth={1.6} aria-hidden="true" className={styles.inputIcon} />
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="跳转到课程、教材、题库…"
            aria-label="搜索跳转目标"
          />
          <span className={styles.kbd}>ESC</span>
        </div>
        {items.length === 0 ? (
          <p className={styles.empty}>没有匹配的入口。</p>
        ) : (
          <ul className={styles.list}>
            {items.map((item, index) => {
              const previous = index > 0 ? items[index - 1].group : null;
              return (
                <li key={item.id}>
                  {item.group !== previous ? <p className={styles.group}>{item.group}</p> : null}
                  <button
                    type="button"
                    className={[styles.item, index === currentIndex ? styles.itemActive : ""]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => go(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className={styles.itemLabel}>{item.label}</span>
                    {item.hint ? <span className={styles.itemHint}>{item.hint}</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <p className={styles.foot}>↑↓ 选择 · Enter 跳转 · R1 为壳，暂不做全局内容检索</p>
      </div>
    </div>
  );
}
