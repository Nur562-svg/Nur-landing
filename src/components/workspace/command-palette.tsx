"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  buildCourseSearchEntries,
  buildPageEntries,
  buildShelfChapterEntries,
  flattenSearchGroups,
  searchEntries,
  type CourseSearchSource,
  type SearchEntry,
  type SearchResultGroup,
} from "@/lib/search-index";
import { ACTIVE_COURSE_ENTRIES, PRIMARY_ENTRIES, type ShellTextbook } from "./shell-data";
import styles from "./command-palette.module.css";

type PaletteItem = SearchEntry;

// R4 页面入口：R1 的全部静态条目原样保留，只换分组（主入口 + 官方课程页统一入「页面」）。
const STATIC_ITEMS: readonly SearchEntry[] = buildPageEntries([
  ...PRIMARY_ENTRIES,
  { id: "learn-home", label: "学习主页", href: "/learn" },
  ...ACTIVE_COURSE_ENTRIES,
]);

export type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  /** 面板内跳转后的额外回调（例如收起移动端抽屉）。 */
  onNavigate?: () => void;
  textbooks: readonly ShellTextbook[];
  /**
   * R4 课程检索输入：服务端薄适配层以 CourseSearchSource 字段裁剪投影传入
   * （严禁在客户端顶层 import publishedCourses——会把 9k+ 题库 item 打进 bundle）。
   */
  courseSearchSources: readonly CourseSearchSource[];
};

/** ⌘K 命令面板（R4）：站内内容检索 —— 官方课章节/知识点 + 题库章节 + 书架教材章节 + 页面入口。 */
export function CommandPalette({ open, ...rest }: CommandPaletteProps) {
  if (!open) {
    return null;
  }
  return <CommandPaletteOpen {...rest} />;
}

function CommandPaletteOpen({ onClose, onNavigate, textbooks, courseSearchSources }: Omit<CommandPaletteProps, "open">) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 课程索引：输入是服务端裁剪过的轻量投影，memo 一次构建（不随按键重建）。
  const courseItems = useMemo<readonly PaletteItem[]>(
    () => buildCourseSearchEntries(courseSearchSources),
    [courseSearchSources],
  );

  // 书架教材为登录后客户端拉取的私有内存数据；索引随教材列表增量重建（仅教材变化时）。
  const shelfItems = useMemo<readonly PaletteItem[]>(
    () => buildShelfChapterEntries(textbooks),
    [textbooks],
  );

  const groups = useMemo<readonly SearchResultGroup[]>(() => {
    const all = [...courseItems, ...shelfItems, ...STATIC_ITEMS];
    return searchEntries(all, query);
  }, [query, courseItems, shelfItems]);

  const items = useMemo<readonly PaletteItem[]>(() => flattenSearchGroups(groups), [groups]);

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
            placeholder="搜索课程、章节、知识点、教材…"
            aria-label="搜索跳转目标"
          />
          <span className={styles.kbd}>ESC</span>
        </div>
        {items.length === 0 ? (
          <p className={styles.empty}>没有匹配的内容。</p>
        ) : (
          <ul className={styles.list}>
            {(() => {
              let offset = 0;
              return groups.map((group) => {
                const groupStart = offset;
                offset += group.items.length;
                return (
                  <li key={group.group} role="group" aria-label={group.label}>
                    <p className={styles.group}>{group.label}</p>
                    <ul className={styles.groupList}>
                      {group.items.map((item, itemIndex) => {
                        const index = groupStart + itemIndex;
                        return (
                          <li key={item.id}>
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
                    {group.overflow > 0 ? (
                      <p className={styles.overflow}>还有 {group.overflow} 条，输入更精确的关键词</p>
                    ) : null}
                  </li>
                );
              });
            })()}
          </ul>
        )}
        <p className={styles.foot}>↑↓ 选择 · Enter 跳转 · Esc 关闭</p>
      </div>
    </div>
  );
}
