"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookMarked,
  BookOpen,
  CreditCard,
  GraduationCap,
  ListChecks,
  Menu,
  Search,
  Stethoscope,
} from "lucide-react";

import { useSession } from "@/hooks/use-session";
import { getMembershipTierLabel, normalizeMembershipTier } from "@/lib/membership";
import {
  ACTIVE_COURSE_ENTRIES,
  PRIMARY_ENTRIES,
  fetchRecentTextbooks,
  type ShellEntry,
  type ShellTextbook,
} from "./shell-data";
import { CommandPalette } from "./command-palette";
import styles from "./workspace-shell.module.css";

type NavIcon = typeof BookOpen;

const PRIMARY_ICONS: Readonly<Record<string, NavIcon>> = {
  hidoc: BookOpen,
  courses: GraduationCap,
  "question-bank": ListChecks,
  membership: CreditCard,
};

/** 侧栏 active 判定：按段落前缀归组（书架教材页归入 Hi doc）。 */
function resolveActivePrimaryId(pathname: string | null): string | null {
  if (!pathname) return null;
  if (pathname.startsWith("/learn/hi-doc")) return "hidoc";
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
              href={`/learn/hi-doc/t/${book.id}`}
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
              登录并在 Hi doc 上传教材后，这里会显示书架最近教材。
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

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [textbooks, setTextbooks] = useState<readonly ShellTextbook[]>([]);

  // 登录后才拉书架最近教材（未登录请求书架 API 会得到 401，避免产生资源错误）
  useEffect(() => {
    if (!user) {
      return;
    }
    let cancelled = false;
    fetchRecentTextbooks().then((books) => {
      if (!cancelled) setTextbooks(books);
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

  const activeId = resolveActivePrimaryId(pathname);
  const tier = user ? normalizeMembershipTier(user.membershipTier) : null;
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className={styles.app}>
      <aside
        data-shell-drawer={drawerOpen ? "open" : undefined}
        className={[styles.sidebar, drawerOpen ? styles.sidebarOpen : ""].filter(Boolean).join(" ")}
        aria-label="工作台导航"
      >
        <Link className={styles.brand} href="/learn" aria-label="NUR LEARN 学习主页">
          <span className={styles.brandMark} aria-hidden="true">N</span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>NUR LEARN</span>
            <span className={styles.brandSub}>工作台</span>
          </span>
        </Link>
        <SidebarNav activeId={activeId} pathname={pathname} textbooks={textbooks} onNavigate={closeDrawer} />
      </aside>
      {drawerOpen ? <div className={styles.scrim} onClick={() => setDrawerOpen(false)} aria-hidden="true" /> : null}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setDrawerOpen((open) => !open)}
              aria-label={drawerOpen ? "关闭导航" : "打开导航"}
              aria-expanded={drawerOpen}
            >
              <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
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
      />
    </div>
  );
}
