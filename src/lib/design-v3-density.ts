/**
 * Design system v3 peer-card presentation.
 * The learn home and Clew shelf render from these caps so desktop and 390px
 * counts stay measurable without a second copy of the card list.
 *
 * Before-counts (pre-v3 source, 2026-09-24):
 * - /learn guest, weekly-plan drawer closed: 3 entry cards + case + 4 reasoning
 *   cards + dual-lens card + 3 progress rows = 12.
 * - Clew shelf with 5 active textbooks: quota panel + upload panel + 5
 *   textbook cards = 7.
 */

export const LEARN_PEER_CARDS_BEFORE = 12;

export const CLEW_SHELF_COMPARISON_ACTIVE_BOOKS = 5;
export const CLEW_SHELF_PEER_CARDS_BEFORE = 2 + CLEW_SHELF_COMPARISON_ACTIVE_BOOKS;

export const LEARN_PEER_CARD_IDS = [
  "case",
  "reasoning",
  "dual-lens",
  "progress-week",
  "progress-review",
] as const;

export type LearnPeerCardId = (typeof LEARN_PEER_CARD_IDS)[number];

const COMPACT_HIDDEN = new Set<LearnPeerCardId>(["dual-lens", "progress-week"]);

/** 390px hides these learn-home cards; desktop renders the full v3 set. */
export function learnPeerCompactHide(id: LearnPeerCardId): boolean {
  return COMPACT_HIDDEN.has(id);
}

export function countLearnPeerCards(viewport: "desktop" | "compact"): number {
  return LEARN_PEER_CARD_IDS.filter((id) => viewport === "desktop" || !learnPeerCompactHide(id)).length;
}

/** Quiet default stack. Expanding shows every textbook the shelf already loaded. */
export const SHELF_DESKTOP_BOOK_CAP = 3;
export const SHELF_COMPACT_BOOK_CAP = 2;

export function presentShelfBooks<T extends { id: string }>(
  books: readonly T[],
  expanded: boolean,
): { visible: { book: T; compactHide: boolean }[]; hiddenCount: number } {
  if (expanded) {
    return {
      visible: books.map((book) => ({ book, compactHide: false })),
      hiddenCount: 0,
    };
  }
  const desktop = books.slice(0, SHELF_DESKTOP_BOOK_CAP);
  return {
    visible: desktop.map((book, index) => ({
      book,
      compactHide: index >= SHELF_COMPACT_BOOK_CAP,
    })),
    hiddenCount: Math.max(0, books.length - desktop.length),
  };
}

/** Upload panel is the one chrome card. Quota is a status line, not a card. */
export function countShelfPeerCards(
  activeBookCount: number,
  expanded: boolean,
  viewport: "desktop" | "compact",
): number {
  const presented = presentShelfBooks(
    Array.from({ length: activeBookCount }, (_, index) => ({ id: String(index) })),
    expanded,
  );
  const books = viewport === "desktop"
    ? presented.visible.length
    : presented.visible.filter((item) => !item.compactHide).length;
  return 1 + books;
}
