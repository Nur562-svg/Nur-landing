import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CLEW_SHELF_COMPARISON_ACTIVE_BOOKS,
  CLEW_SHELF_PEER_CARDS_BEFORE,
  LEARN_PEER_CARDS_BEFORE,
  countLearnPeerCards,
  countShelfPeerCards,
} from "@/lib/design-v3-density";
import type { ClewShelf, ClewTextbookView } from "@/types/clew";

register("./helpers/css-module-hooks.mjs", import.meta.url);

const ENTRY_LABELS = ["官方课程学习闭环", "Clew", "传统刷题题库"] as const;

function peerCardTags(html: string): string[] {
  return html.match(/<[^>]*\sdata-peer-card="[^"]+"[^>]*>/g) ?? [];
}

function peerCounts(html: string): { desktop: number; compact: number } {
  const tags = peerCardTags(html);
  const hidden = tags.filter((tag) => tag.includes('data-compact-hide="true"')).length;
  return { desktop: tags.length, compact: tags.length - hidden };
}

function shelfFixture(): ClewShelf {
  const textbooks: ClewTextbookView[] = Array.from(
    { length: CLEW_SHELF_COMPARISON_ACTIVE_BOOKS },
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
    const bookshelf = await import("../src/components/clew-bookshelf");
    const shell = await import("../src/components/workspace/workspace-shell");
    learnHtml = renderToStaticMarkup(React.createElement(dashboard.LearningDashboard, {}));
    shelfHtml = renderToStaticMarkup(
      React.createElement(bookshelf.ClewBookshelf, { initialShelf: shelfFixture(), tier: "max" }),
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
    assert.match(shellHtml, /href="\/learn\/clew"/);
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
    assert.equal(shelf.desktop, countShelfPeerCards(CLEW_SHELF_COMPARISON_ACTIVE_BOOKS, false, "desktop"));
    assert.equal(shelf.compact, countShelfPeerCards(CLEW_SHELF_COMPARISON_ACTIVE_BOOKS, false, "compact"));
    assert.ok(shelf.desktop <= CLEW_SHELF_PEER_CARDS_BEFORE * 0.6);
    assert.ok(shelf.compact <= shelf.desktop * 0.8);
    assert.ok(shelf.compact < shelf.desktop);
  });

  it("ships the v3 type, radius, sidebar, and command-palette rules", () => {
    const globals = readFileSync("src/app/globals.css", "utf8");
    const shell = readFileSync("src/components/workspace/workspace-shell.module.css", "utf8");
    const palette = readFileSync("src/components/workspace/command-palette.module.css", "utf8");
    const card = readFileSync("src/components/ui/v2/card.module.css", "utf8");
    const learn = readFileSync("src/components/learning-dashboard.module.css", "utf8");
    const clew = readFileSync("src/components/clew.module.css", "utf8");

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
    // v4（DESIGN_V4 §四/P1-6）：壳侧栏 280 → 264px，与 Clew 学习页 studyAside 合并为一栏
    assert.match(shellBase, /grid-template-columns:\s*264px/);
    assert.match(shellBase, /width:\s*264px/);
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
    assert.match(clew, /font:\s*400 14px\/1\.5 var\(--v2-font-sans\)/);
    assert.match(clew, /font-size:\s*clamp\(24px, 4vw, 40px\)/);
    assert.match(clew, /border-radius:\s*12px/);
    assert.match(clew, /border:\s*1px solid transparent/);
  });

  it("does not edit course or material truth", () => {
    const files = execFileSync(
      "git",
      ["diff", "--name-only", "--", "src/content/courses", "src/content/materials"],
      { encoding: "utf8" },
    )
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (files.length === 0) return;

    // ZCODE-M1 品牌迁移（NUR LEARN→Ariadne、Hi doc→Clew）有意替换了内容文件中的
    // UI 文案令牌（来源标注、notice 等）。守卫的意图是禁止语义性改动：把每一行
    // diff 做品牌令牌归一化后要求删除/新增行 1:1 相等，任何其他改动仍会失败。
    const canonicalize = (line: string): string =>
      line
        .replace(/NUR LEARN|Nur Learn|Nur learn|HiDoc|HIDOC|hiDoc|hidoc|hi-doc|HI DOC|Hi doc|Hidoc/g, "§")
        .replace(/\bAriadne\b|\bClew\b|\bCLEW\b|\bclew\b/g, "§");

    for (const file of files) {
      const diff = execFileSync("git", ["diff", "-U0", "--", file], { encoding: "utf8" });
      const removed: string[] = [];
      const added: string[] = [];
      for (const line of diff.split("\n")) {
        if (line.startsWith("---") || line.startsWith("+++") || line.startsWith("@@")) continue;
        if (line.startsWith("-")) removed.push(canonicalize(line.slice(1)));
        else if (line.startsWith("+")) added.push(canonicalize(line.slice(1)));
      }
      removed.sort();
      added.sort();
      assert.deepEqual(
        removed,
        added,
        `${file} contains non-brand changes to course/material truth`,
      );
    }
  });
});
