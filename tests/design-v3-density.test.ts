import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  HIDOC_SHELF_COMPARISON_ACTIVE_BOOKS,
  HIDOC_SHELF_PEER_CARDS_BEFORE,
  LEARN_PEER_CARDS_BEFORE,
  countLearnPeerCards,
  countShelfPeerCards,
} from "@/lib/design-v3-density";
import type { HiDocShelf, HiDocTextbookView } from "@/types/hidoc";

register("./helpers/css-module-hooks.mjs", import.meta.url);

const ENTRY_LABELS = ["官方课程学习闭环", "Hi doc", "传统刷题题库"] as const;

function peerCardTags(html: string): string[] {
  return html.match(/<[^>]*\sdata-peer-card="[^"]+"[^>]*>/g) ?? [];
}

function peerCounts(html: string): { desktop: number; compact: number } {
  const tags = peerCardTags(html);
  const hidden = tags.filter((tag) => tag.includes('data-compact-hide="true"')).length;
  return { desktop: tags.length, compact: tags.length - hidden };
}

function shelfFixture(): HiDocShelf {
  const textbooks: HiDocTextbookView[] = Array.from(
    { length: HIDOC_SHELF_COMPARISON_ACTIVE_BOOKS },
    (_, index) => ({
      id: `book-${index + 1}`,
      title: `教材 ${index + 1}`,
      fileName: `book-${index + 1}.pdf`,
      sizeBytes: 12000,
      pageCount: 12,
      hasTextLayer: true,
      status: "uploaded",
      activeMonth: "2026-09",
      isFrozen: false,
      chapterCount: 0,
      recognition: null,
      createdAt: "2026-09-01T00:00:00.000Z",
    }),
  );
  return {
    textbooks,
    quota: { month: "2026-09", used: textbooks.length, limit: 10, remaining: 5 },
  };
}

describe("design system v3 density and shell", () => {
  let learnHtml = "";
  let shelfHtml = "";
  let shellHtml = "";

  before(async () => {
    await import("./helpers/css-module-stub.mjs");
    const dashboard = await import("../src/components/learning-dashboard");
    const bookshelf = await import("../src/components/hi-doc-bookshelf");
    const shell = await import("../src/components/workspace/workspace-shell");
    learnHtml = renderToStaticMarkup(React.createElement(dashboard.LearningDashboard, {}));
    shelfHtml = renderToStaticMarkup(
      React.createElement(bookshelf.HiDocBookshelf, { initialShelf: shelfFixture(), tier: "max" }),
    );
    shellHtml = renderToStaticMarkup(
      // React 19 types place function-component children on the props object.
      // eslint-disable-next-line react/no-children-prop
      React.createElement(shell.WorkspaceShell, { courseSearchSources: [], children: "画布" }),
    );
  });

  it("removes the three learn-home entry cards and keeps shell destinations", () => {
    for (const label of ENTRY_LABELS) {
      assert.equal(learnHtml.includes(label), false, label);
    }
    assert.match(shellHtml, /href="\/courses"/);
    assert.match(shellHtml, /href="\/learn\/hi-doc"/);
    assert.match(shellHtml, /href="\/question-bank"/);
    assert.match(shellHtml, /data-workspace-canvas/);
  });

  it("cuts learn and shelf peer cards by at least 40%, and another 20% at 390px", () => {
    const learn = peerCounts(learnHtml);
    const shelf = peerCounts(shelfHtml);
    assert.equal(learn.desktop, countLearnPeerCards("desktop"));
    assert.equal(learn.compact, countLearnPeerCards("compact"));
    assert.ok(learn.desktop <= LEARN_PEER_CARDS_BEFORE * 0.6);
    assert.ok(learn.compact <= learn.desktop * 0.8);
    assert.ok(learn.compact < learn.desktop);
    assert.equal(shelf.desktop, countShelfPeerCards(HIDOC_SHELF_COMPARISON_ACTIVE_BOOKS, false, "desktop"));
    assert.equal(shelf.compact, countShelfPeerCards(HIDOC_SHELF_COMPARISON_ACTIVE_BOOKS, false, "compact"));
    assert.ok(shelf.desktop <= HIDOC_SHELF_PEER_CARDS_BEFORE * 0.6);
    assert.ok(shelf.compact <= shelf.desktop * 0.8);
    assert.ok(shelf.compact < shelf.desktop);
  });

  it("ships the v3 type, radius, sidebar, and command-palette rules", () => {
    const globals = readFileSync("src/app/globals.css", "utf8");
    const shell = readFileSync("src/components/workspace/workspace-shell.module.css", "utf8");
    const palette = readFileSync("src/components/workspace/command-palette.module.css", "utf8");
    const card = readFileSync("src/components/ui/v2/card.module.css", "utf8");
    const learn = readFileSync("src/components/learning-dashboard.module.css", "utf8");
    const hiDoc = readFileSync("src/components/hi-doc.module.css", "utf8");

    assert.match(globals, /--v2-font-display:\s*"Songti SC"/);
    assert.match(globals, /--v3-title-size:\s*24px/);
    assert.match(globals, /--v3-body-size:\s*14px/);
    assert.match(globals, /--v3-body-leading:\s*1\.5/);
    assert.match(globals, /--v3-card-radius:\s*12px/);
    assert.match(globals, /--v3-card-border:\s*transparent/);
    assert.match(globals, /--v3-card-shadow:\s*0 1px 3px 0px rgba\(0, 0, 0, 0\.05\)/);
    assert.match(globals, /--v3-cinnabar:/);
    assert.match(globals, /--v3-slate-blue:\s*#17659a/);
    assert.match(globals, /\[data-peer-card\]\[data-compact-hide="true"\]\s*\{\s*display:\s*none;/);

    const shellBase = shell.split("@media")[0] ?? "";
    assert.match(shellBase, /grid-template-columns:\s*280px/);
    assert.match(shellBase, /width:\s*280px/);
    assert.match(shellBase, /font:\s*400 var\(--v3-body-size\)\/var\(--v3-body-leading\)/);

    const paletteBase = palette.split("@media")[0] ?? "";
    const panelStart = paletteBase.indexOf(".panel {");
    const panelEnd = paletteBase.indexOf("}", panelStart);
    const panelBlock = paletteBase.slice(panelStart, panelEnd);
    assert.match(panelBlock, /position:\s*fixed/);
    assert.match(panelBlock, /bottom:\s*0/);
    assert.match(panelBlock, /width:\s*100%/);
    assert.equal(paletteBase.includes("560px"), false);

    assert.match(card, /border:\s*1px solid var\(--v3-card-border\)/);
    assert.match(card, /border-radius:\s*var\(--v3-card-radius\)/);
    assert.match(card, /box-shadow:\s*var\(--v3-card-shadow\)/);
    assert.match(card, /font:\s*700 var\(--v3-title-size\)\/1\.2 var\(--v2-font-display\)/);
    assert.match(learn, /font-family:\s*var\(--v2-font-display\)/);
    assert.match(learn, /clamp\(var\(--v3-title-size\)/);
    assert.match(hiDoc, /font:\s*400 14px\/1\.5 var\(--v2-font-sans\)/);
    assert.match(hiDoc, /font-size:\s*clamp\(24px, 4vw, 40px\)/);
    assert.match(hiDoc, /border-radius:\s*12px/);
    assert.match(hiDoc, /border:\s*1px solid transparent/);
  });

  it("does not edit course or material truth", () => {
    const diff = execFileSync(
      "git",
      ["diff", "--name-only", "--", "src/content/courses", "src/content/materials"],
      { encoding: "utf8" },
    );
    assert.equal(diff.trim(), "");
  });
});
