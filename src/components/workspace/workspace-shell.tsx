"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookMarked,
  BookOpen,
  Home,
  CreditCard,
  GraduationCap,
  ListChecks,
  Menu,
  Moon,
  Search,
  Stethoscope,
  Sun,
} from "lucide-react";

import { useSession } from "@/hooks/use-session";
import { getMembershipTierLabel, normalizeMembershipTier } from "@/lib/membership";
import type { CourseSearchSource } from "@/lib/search-index";
import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  ACTIVE_COURSE_ENTRIES,
  PRIMARY_ENTRIES,
  fetchShelfSummary,
  type ShellEntry,
  type ShellQuota,
  type ShellTextbook,
} from "./shell-data";
import { CommandPalette } from "./command-palette";
import styles from "./workspace-shell.module.css";

type NavIcon = typeof BookOpen;

/** 桌面侧栏折叠状态持久化键（交互批；nur-learn: 前缀规则不变）。 */
const SHELL_RAIL_STORAGE_KEY = "nur-learn:shell-rail";

const PRIMARY_ICONS: Readonly<Record<string, NavIcon>> = {
  learn: Home,
  clew: BookOpen,
  courses: GraduationCap,
  "question-bank": ListChecks,
  membership: CreditCard,
};

/** 侧栏 active 判定：按段落前缀归组（书架教材页归入 Clew）。 */
function resolveActivePrimaryId(pathname: string | null): string | null {
  if (!pathname) return null;
  if (pathname.startsWith("/learn/clew")) return "clew";
  if (pathname === "/learn" || pathname.startsWith("/learn/")) return "learn";
  if (pathname.startsWith("/courses")) return "courses";
  if (pathname.startsWith("/question-bank")) return "question-bank";
  if (pathname.startsWith("/account")) return "membership";
  return null;
}

function SidebarNav({
  activeId,
  pathname,
  textbooks,
  onNavigate,
}: {
  activeId: string | null;
  pathname: string | null;
  textbooks: readonly ShellTextbook[];
  onNavigate: () => void;
}) {
  return (
    <>
      <nav className={styles.navGroup} aria-label="主入口">
        <p className={styles.navLabel}>主入口</p>
        {PRIMARY_ENTRIES.map((entry: ShellEntry) => {
          const Icon = PRIMARY_ICONS[entry.id] ?? BookOpen;
          return (
            <Link
              key={entry.id}
              href={entry.href}
              onClick={onNavigate}
              title={entry.label}
              className={[
                styles.navLink,
                activeId === entry.id ? styles.navLinkActive : "",
              ].filter(Boolean).join(" ")}
              aria-current={activeId === entry.id ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
              <span className={styles.navLinkText}>{entry.label}</span>
            </Link>
          );
        })}
      </nav>
      <nav className={styles.navGroup} aria-label="最近学习">
        <p className={styles.navLabel}>最近学习</p>
        {textbooks.length > 0
          ? textbooks.map((book) => (
            <Link
              key={book.id}
              href={`/learn/clew/t/${book.id}`}
              onClick={onNavigate}
              className={styles.navLink}
              title={book.title}
            >
              <BookMarked size={18} strokeWidth={1.6} aria-hidden="true" />
              <span className={styles.navLinkText}>{book.title}</span>
              <span className={styles.navLinkMeta}>{book.isFrozen ? "已冻结" : `${book.chapterCount} 章`}</span>
            </Link>
          ))
          : (
            <p className={styles.sidebarEmpty}>
              登录并在 Clew 上传教材后，这里会显示书架最近教材。
            </p>
          )}
        {ACTIVE_COURSE_ENTRIES.map((entry) => {
          const courseActive = pathname !== null && (pathname === entry.href || pathname.startsWith(`${entry.href}/`));
          return (
            <Link
              key={entry.id}
              href={entry.href}
              onClick={onNavigate}
              className={[styles.navLink, courseActive ? styles.navLinkActive : ""].filter(Boolean).join(" ")}
              aria-current={courseActive ? "page" : undefined}
            >
              <Stethoscope size={18} strokeWidth={1.6} aria-hidden="true" />
              <span className={styles.navLinkText}>{entry.label}</span>
            </Link>
          );
        })}
      </nav>
      <p className={styles.sidebarFoot}>
        试点课（中医诊断学、生理学）对所有人免费，不占教材名额。
      </p>
    </>
  );
}

export function WorkspaceShell({
  children,
  courseSearchSources,
}: {
  children: React.ReactNode;
  courseSearchSources: readonly CourseSearchSource[];
}) {
  const pathname = usePathname();
  const { user } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [textbooks, setTextbooks] = useState<readonly ShellTextbook[]>([]);
  const [quota, setQuota] = useState<ShellQuota | null>(null);
  const [clewModelCalls, setClewModelCalls] = useState<number | null>(null);
  const [dark, setDark] = useState(false);
  /** 桌面侧栏折叠为 56px 图标轨（交互批；⌘B / 顶栏按钮切换，本机持久化；≤900px 抽屉态不受影响）。 */
  const [railCollapsed, setRailCollapsed] = useState(false);

  // R2-2 明暗切换：挂载后读当前主题（根 layout 的防闪烁脚本可能已在 hydration 前挂上 .dark）。
  // rAF 包裹避免 set-state-in-effect 级联渲染（仓库既有惯例，见 use-draggable-fab.ts）。
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setDark(document.documentElement.classList.contains("dark"));
      try {
        setRailCollapsed(window.localStorage.getItem(SHELL_RAIL_STORAGE_KEY) === "collapsed");
      } catch {
        // localStorage 不可用时保持展开
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggleRail = () => {
    setRailCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(SHELL_RAIL_STORAGE_KEY, next ? "collapsed" : "expanded");
      } catch {
        // 持久化失败不影响本次切换
      }
      return next;
    });
  };

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      window.localStorage.setItem("nur-theme", next ? "dark" : "light");
    } catch {
      // localStorage 不可用（隐私模式等）：仅当前会话生效
    }
  };

  // 登录后才拉书架最近教材与配额（未登录请求书架 API 会得到 401，避免产生资源错误）
  useEffect(() => {
    if (!user) {
      return;
    }
    let cancelled = false;
    fetchShelfSummary().then(({ textbooks: books, quota: nextQuota }) => {
      if (cancelled) return;
      setTextbooks(books);
      setQuota(nextQuota);
    });
    // 本月 Clew 模型调用合计（真实用量，来自配额 API；替代无出处的 token 估算）
    fetch("/api/auth/quotas", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { quotas?: { quotas?: Record<string, { used?: number }> } } | null) => {
        const items = payload?.quotas?.quotas;
        if (cancelled || !items) return;
        let total = 0;
        let seen = false;
        for (const [key, item] of Object.entries(items)) {
          if (key.startsWith("clew") && typeof item?.used === "number") {
            total += item.used;
            seen = true;
          }
        }
        if (seen) setClewModelCalls(total);
      })
      .catch(() => {
        // 配额接口不可用时 chip 静默缺省
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      // 交互批：⌘B 折叠/展开侧栏（桌面图标轨）
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleRail();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [drawerOpen]);

  // R4-2 抽屉交互补完：打开时 body 滚锁（documentElement overflow hidden，关闭时还原）
  // + 焦点进入抽屉第一个条目，关闭时还给汉堡按钮。
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!drawerOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a[href], button");
    const focusTimer = window.setTimeout(() => firstLink?.focus(), 60);
    const hamburger = hamburgerRef.current;
    return () => {
      root.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      hamburger?.focus();
    };
  }, [drawerOpen]);

  const activeId = resolveActivePrimaryId(pathname);
  const tier = user ? normalizeMembershipTier(user.membershipTier) : null;
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div
      className={[styles.app, railCollapsed ? styles.appRail : ""].filter(Boolean).join(" ")}
    >
      <aside
        ref={drawerRef}
        data-shell-drawer={drawerOpen ? "open" : undefined}
        aria-label="工作台导航"
        className={[
          styles.sidebar,
          railCollapsed ? styles.sidebarRail : "",
          drawerOpen ? styles.sidebarOpen : "",
        ].filter(Boolean).join(" ")}
      >
        <Link className={styles.brand} href="/learn" aria-label="Ariadne 学习主页">
          <span className={styles.brandMark} aria-hidden="true">
            <span>知</span>
            <span>径</span>
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Ariadne</span>
            <span className={styles.brandSub}>
              <span className={styles.brandKai}>知径</span> · 工作台
            </span>
          </span>
        </Link>
        <SidebarNav activeId={activeId} pathname={pathname} textbooks={textbooks} onNavigate={closeDrawer} />
        {/* v4 侧栏上下文 slot：Clew 学习页经 portal 注入「本章知识点列表」（DESIGN_V4 §四） */}
        <div className={styles.sidebarContext} data-sidebar-context-slot="" />
        {user ? (
          <div className={styles.quotaChip} aria-label="本月用量">
            {quota ? (
              <span>
                本月教材名额 {quota.used}/{quota.limit} 本
              </span>
            ) : null}
            {clewModelCalls !== null ? <span>本月模型调用 {clewModelCalls} 次</span> : null}
          </div>
        ) : null}
      </aside>
      {drawerOpen ? <div className={styles.scrim} onClick={() => setDrawerOpen(false)} aria-hidden="true" /> : null}
      <div className={styles.main} data-workspace-canvas="">
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              ref={hamburgerRef}
              type="button"
              className={styles.hamburger}
              onClick={() => setDrawerOpen((open) => !open)}
              aria-label={drawerOpen ? "关闭导航" : "打开导航"}
              aria-expanded={drawerOpen}
            >
              <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
            </button>
            {/* 交互批：桌面侧栏折叠切换（≤900px 抽屉态隐藏） */}
            <button
              type="button"
              className={styles.railToggle}
              onClick={toggleRail}
              aria-label={railCollapsed ? "展开侧栏（⌘B）" : "折叠侧栏（⌘B）"}
              aria-pressed={railCollapsed}
              title={railCollapsed ? "展开侧栏（⌘B）" : "折叠侧栏（⌘B）"}
            >
              {railCollapsed ? (
                <PanelLeftOpen size={18} strokeWidth={1.6} aria-hidden="true" />
              ) : (
                <PanelLeftClose size={18} strokeWidth={1.6} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className={styles.searchTrigger}
              onClick={() => setPaletteOpen(true)}
              aria-label="打开命令面板（⌘K）"
            >
              <Search size={16} strokeWidth={1.6} aria-hidden="true" />
              <span className={styles.searchTriggerText}>搜索课程、教材、题库…</span>
              <span className={styles.kbd}>⌘K</span>
            </button>
          </div>
          <div className={styles.topbarRight}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={dark ? "切换亮色" : "切换暗色"}
              aria-pressed={dark}
            >
              {dark ? (
                <Sun size={16} strokeWidth={1.6} aria-hidden="true" />
              ) : (
                <Moon size={16} strokeWidth={1.6} aria-hidden="true" />
              )}
            </button>
            {user && tier ? (
              <Link className={styles.userChip} href="/account/billing" data-user-chip="">
                <span className={styles.userName}>{user.displayName}</span>
                <span className={styles.tierBadge}>{getMembershipTierLabel(tier)}</span>
              </Link>
            ) : (
              <Link className={styles.loginLink} href="/login?next=/learn">
                登录
              </Link>
            )}
          </div>
        </header>
        <div className={styles.content} id="workspace-content">
          {children}
        </div>
      </div>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={closeDrawer}
        textbooks={textbooks}
        courseSearchSources={courseSearchSources}
      />
    </div>
  );
}
