/**
 * P1-A token 归一 codemod（设计评审批；映射口径 = docs/DESIGN_V4.md §十二续，2026-10-07 批准）。
 *
 * 范围：18 个「R3 局部桥接」module.css——桥接别名把纸墨代指向新代，本脚本把使用点直接
 * 替换为新代并删除桥接层（替换值 = 各面桥接现值，渲染逐值相等）。
 * - ⚠️ --muted：仅在桥接面内替换（桥接证明语义 = 次级文字 → --text-500）。
 *   shadcn --muted（近白背景）与未桥接残面（auth-form / docx-parsing / material-admission /
 *   material-intake，解析到 :root 静态值）一律不动 → P2 逐使用点定夺。
 * - private-practice-room / private-materials-studio 的 --line 桥为 38% 强线 → --v4-line-strong。
 * - ui/v2/skeleton：v2 组件违反「新 UI 禁用纸墨代」，var(--ink) → var(--text-900)（color-mix 基色）。
 * - :root 的 --ink/--paper/--paper-light 定义保留（残面仍消费，P2 退役）。
 *
 * 幂等性：替换后文件不再含纸墨代引用，重复运行 = 零替换 + 桥接行已删（跳过）。
 */
import { readFileSync, writeFileSync } from "node:fs";

const COMMON = [
  ["var(--paper-bright)", "var(--bg-100)"],
  ["var(--paper)", "var(--bg-200)"],
  ["var(--ink)", "var(--text-900)"],
  ["var(--line-soft)", "var(--v4-line-soft)"],
  ["var(--line)", "var(--v4-line)"],
  ["var(--red)", "var(--error-600)"],
  ["var(--blue)", "var(--v2-ring)"],
  ["var(--slate)", "var(--v3-slate-blue)"],
  ["var(--muted)", "var(--text-500)"],
];

const BRIDGED = [
  "src/components/clew.module.css",
  "src/components/learning-dashboard.module.css",
  "src/components/knowledge-point-lesson.module.css",
  "src/components/course-workspace.module.css",
  "src/components/case-reasoning-room.module.css",
  "src/components/subjective-writing-room.module.css",
  "src/components/question-bank-global.module.css",
  "src/components/mock-exam-room.module.css",
  "src/components/question-bank-practice.module.css",
  "src/components/question-bank-home.module.css",
  "src/components/question-bank-chapter.module.css",
  "src/components/wrong-question-center.module.css",
  "src/components/billing-panel.module.css",
  "src/components/course-landing.module.css",
  "src/components/course-catalog.module.css",
  "src/components/private-practice-room.module.css",
  "src/components/private-materials-studio.module.css",
  "src/app/(workspace)/learn/course-builder/page.module.css",
];

/** 38% 强线桥（--line → --v4-line-strong 而非 12% 档） */
const STRONG_LINE = new Set([
  "src/components/private-practice-room.module.css",
  "src/components/private-materials-studio.module.css",
]);

/** 桥接别名定义行（替换完成后删除；含 --paper-light 仅 material-intake 有——不在本批） */
const ALIAS_LINE =
  /^\s*--(ink|paper|paper-bright|paper-light|muted|line|line-soft|red|blue|slate): (var\(--(text|bg|error|v2|v3)|color-mix\(in srgb, var\(--text-900\))/;

let total = 0;
for (const file of BRIDGED) {
  let src = readFileSync(file, "utf8");
  const counts = [];
  const map = STRONG_LINE.has(file)
    ? COMMON.map(([a, b]) => (a === "var(--line)" ? [a, "var(--v4-line-strong)"] : [a, b]))
    : COMMON;
  for (const [from, to] of map) {
    const n = src.split(from).length - 1;
    if (n > 0) {
      src = src.split(from).join(to);
      counts.push(`${from}→${to} ×${n}`);
      total += n;
    }
  }
  // 删桥接别名行（此时使用点已全部替换，别名成为死代码）
  const lines = src.split("\n");
  const kept = lines.filter((l) => !ALIAS_LINE.test(l));
  const removed = lines.length - kept.length;
  if (removed > 0) counts.push(`别名行删除 ×${removed}`);
  writeFileSync(file, kept.join("\n"));
  console.log(`▸ ${file}${counts.length ? "\n    " + counts.join("\n    ") : "（无替换）"}`);
}

// ui/v2/skeleton：新 UI 禁用纸墨代（color-mix 基色随 --text-900 明暗翻转）
{
  const file = "src/components/ui/v2/skeleton.module.css";
  let src = readFileSync(file, "utf8");
  const n = src.split("var(--ink)").length - 1;
  if (n > 0) {
    src = src.split("var(--ink)").join("var(--text-900)");
    writeFileSync(file, src);
    console.log(`▸ ${file}\n    var(--ink)→var(--text-900) ×${n}`);
    total += n;
  }
}

/**
 * 宾客面：material-intake-review / docx-parsing-review 渲染在 private-materials-studio
 * 的 .container 内，此前的 token 语义由宿主桥接提供（text-900/bg-200/12%线/error-600/
 * v2-ring/text-500）——本批删除宿主桥会使其回落 :root 静态值（暗色回归）。
 * 映射 = 宿主桥证明的同一口径（构造上零视觉变化），并入本批。
 * 注：docx-parsing 的 --paper-light 此前解析到 :root 静态 #f7f4ee（无暗色翻转），
 * → --bg-100 后暗色修复（亮色 #f7f4ee→#faf9f5 微调）——如实注记。
 * material-admission-review 为无引用孤儿组件，不动（P2 清理候选）。
 */
const GUESTS = [
  "src/components/material-intake-review.module.css",
  "src/components/docx-parsing-review.module.css",
];
const GUEST_MAP = [
  ...COMMON,
  ["var(--paper-light)", "var(--bg-100)"],
];
for (const file of GUESTS) {
  let src = readFileSync(file, "utf8");
  const counts = [];
  for (const [from, to] of GUEST_MAP) {
    const n = src.split(from).length - 1;
    if (n > 0) {
      src = src.split(from).join(to);
      counts.push(`${from}→${to} ×${n}`);
      total += n;
    }
  }
  const lines = src.split("\n");
  const kept = lines.filter((l) => !ALIAS_LINE.test(l));
  const removed = lines.length - kept.length;
  if (removed > 0) counts.push(`别名行删除 ×${removed}`);
  writeFileSync(file, kept.join("\n"));
  console.log(`▸ ${file}${counts.length ? "\n    " + counts.join("\n    ") : "（无替换）"}`);
}

console.log(`\n总替换：${total} 处`);
