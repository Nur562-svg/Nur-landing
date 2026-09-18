import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

import styles from "./navigation.module.css";

type NavigationEntry = {
  id: string;
  label: ReactNode;
  disabled?: boolean;
};

type NavigableEntry = NavigationEntry & {
  href: string;
};

type ToggleEntry = NavigationEntry & {
  href?: string;
};

function entryClassName(base: string, activeId: string, entry: NavigationEntry): string {
  const classes = [base];
  if (entry.id === activeId) classes.push(styles.active);
  return classes.join(" ");
}

function renderEntry(entry: ToggleEntry, activeId: string, className: string) {
  const shared = {
    className: entryClassName(className, activeId, entry),
    disabled: entry.disabled,
    "aria-current": entry.id === activeId ? ("page" as const) : undefined,
  };
  if (entry.href) {
    return (
      <Link key={entry.id} href={entry.href} {...shared}>
        {entry.label}
      </Link>
    );
  }
  return (
    <button key={entry.id} type="button" {...shared}>
      {entry.label}
    </button>
  );
}

export type V2TabStripProps = ComponentPropsWithoutRef<"nav"> & {
  items: readonly ToggleEntry[];
  activeId: string;
};

/** v2 页签条。展示层组件，无业务逻辑。 */
export function V2TabStrip({ items, activeId, className, ...rest }: V2TabStripProps) {
  return (
    <nav className={[styles.tabs, className].filter(Boolean).join(" ")} {...rest}>
      {items.map((entry) => renderEntry(entry, activeId, styles.tab))}
    </nav>
  );
}

export type V2SideRailProps = ComponentPropsWithoutRef<"aside"> & {
  brand?: ReactNode;
  items: readonly ToggleEntry[];
  activeId: string;
};

/** v2 侧栏列表。展示层组件，无业务逻辑。 */
export function V2SideRail({ brand, items, activeId, className, ...rest }: V2SideRailProps) {
  return (
    <aside className={[styles.rail, className].filter(Boolean).join(" ")} {...rest}>
      {brand ? <p className={styles.brand}>{brand}</p> : null}
      <div className={styles.stack}>{items.map((entry) => renderEntry(entry, activeId, styles.item))}</div>
    </aside>
  );
}

export type V2BottomNavProps = ComponentPropsWithoutRef<"nav"> & {
  items: readonly ToggleEntry[];
  activeId: string;
};

/** v2 底部导航。展示层组件，无业务逻辑。 */
export function V2BottomNav({ items, activeId, className, ...rest }: V2BottomNavProps) {
  return (
    <nav className={[styles.bottomNav, className].filter(Boolean).join(" ")} {...rest}>
      {items.map((entry) => renderEntry(entry, activeId, styles.navItem))}
    </nav>
  );
}

export type { NavigableEntry };
