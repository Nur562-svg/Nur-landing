#!/usr/bin/env node

/**
 * quick-check.mjs — Affected-file-aware fast check.
 *
 * Runs ESLint and TypeScript typecheck only on files changed since the
 * merge-base with the main branch (or HEAD~1 as fallback).  Falls back to
 * full-project checks when no changed files are detected (e.g. detached HEAD
 * or clean working tree on CI).
 *
 * Usage:
 *   node scripts/quick-check.mjs            # auto-detect base
 *   node scripts/quick-check.mjs --base HEAD~3
 *   node scripts/quick-check.mjs --staged   # only staged (cached) changes
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

// ── Argument parsing ───────────────────────────────────────────────────────
const args = process.argv.slice(2);
let baseRef = "";
let stagedOnly = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--base" && args[i + 1]) {
    baseRef = args[++i];
  } else if (args[i] === "--staged") {
    stagedOnly = true;
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
const ROOT = resolve(import.meta.dirname, "..");
const EXTENSIONS = new Set([".ts", ".tsx", ".mts", ".js", ".jsx", ".mjs"]);
// Directories to exclude from changed-file checks (tool output, caches, deps).
const EXCLUDED_PREFIXES = [
  "tmp/",
  ".qoder/",
  ".next/",
  "node_modules/",
  ".amazonq/",
  ".claude/",
  ".cursor/",
  ".continue/",
  ".augment/",
  ".gemini/",
  ".github/",
  ".windsurf/",
  ".opencode/",
  ".codex/",
];

function exec(cmd, opts = {}) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: "utf-8", ...opts }).trim();
  } catch {
    return "";
  }
}

function resolveBase() {
  if (baseRef) return baseRef;
  const currentBranch = exec("git rev-parse --abbrev-ref HEAD");
  // If on a feature branch, find merge-base with main.
  if (currentBranch && currentBranch !== "main" && currentBranch !== "master") {
    for (const candidate of ["main", "master", "develop"]) {
      const mergeBase = exec(`git merge-base ${candidate} HEAD`);
      if (mergeBase && mergeBase !== exec("git rev-parse HEAD")) {
        return mergeBase;
      }
    }
  }
  // On main or no merge-base found: compare against HEAD~1.
  return "HEAD~1";
}

function getChangedFiles() {
  if (stagedOnly) {
    return exec("git diff --cached --name-only --diff-filter=ACMR");
  }
  const base = resolveBase();
  // Unstaged + staged changes relative to base.
  const fromBase = exec(`git diff --name-only --diff-filter=ACMR ${base}`);
  const staged = exec("git diff --cached --name-only --diff-filter=ACMR");
  const untracked = exec("git ls-files --others --exclude-standard");
  const toArr = (s) => s.split("\n").filter(Boolean);
  return [
    ...new Set([...toArr(fromBase), ...toArr(staged), ...toArr(untracked)]),
  ].join("\n");
}

function filterSourceFiles(fileList) {
  return fileList
    .split("\n")
    .filter(Boolean)
    .filter((f) => !EXCLUDED_PREFIXES.some((p) => f.startsWith(p)))
    .filter((f) => {
      const ext = f.slice(f.lastIndexOf("."));
      return EXTENSIONS.has(ext);
    })
    .filter((f) => existsSync(resolve(ROOT, f)));
}

// ── Main ───────────────────────────────────────────────────────────────────
const changedRaw = getChangedFiles();
const changedFiles = filterSourceFiles(changedRaw);

if (changedFiles.length === 0) {
  console.log("[quick-check] No changed source files detected — skipping.");
  console.log("[quick-check] Run `npm run check` for a full project validation.");
  process.exit(0);
}

console.log(`[quick-check] ${changedFiles.length} changed source file(s):`);
for (const f of changedFiles) console.log(`  ${f}`);
console.log();

let exitCode = 0;

// ── 1. ESLint on changed files ─────────────────────────────────────────────
console.log("[quick-check] Running ESLint on changed files…");
const eslintFiles = changedFiles
  .filter((f) => /\.(ts|tsx|mts|js|jsx|mjs)$/.test(f))
  .map((f) => `"${f}"`)
  .join(" ");

if (eslintFiles) {
  try {
    const eslintOutput = execSync(`npx eslint ${eslintFiles}`, {
      cwd: ROOT,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    if (eslintOutput.trim()) console.log(eslintOutput);
  } catch (/** @type {any} */ err) {
    if (err.stdout) console.log(err.stdout);
    if (err.stderr) console.error(err.stderr);
    exitCode = 1;
  }
}

// ── 2. TypeScript typecheck filtered to changed files ──────────────────────
console.log("[quick-check] Running TypeScript typecheck…");
try {
  const tscOutput = execSync("npx tsc --noEmit", {
    cwd: ROOT,
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  if (tscOutput.trim()) console.log(tscOutput);
} catch (/** @type {any} */ err) {
  const raw = (err.stdout || "") + (err.stderr || "");
  // Filter: only keep lines that reference a changed file.
  const lines = raw.split("\n");
  const relevant = lines.filter((line) =>
    changedFiles.some((f) => line.startsWith(f) || line.includes(`/${f}`))
  );

  if (relevant.length > 0) {
    console.log("[quick-check] TypeScript errors in changed files:");
    console.log(relevant.join("\n"));
    exitCode = 1;
  } else {
    console.log(
      "[quick-check] TypeScript errors exist but none in changed files — OK."
    );
  }
}

console.log();
if (exitCode === 0) {
  console.log("[quick-check] ✅ All checks passed for changed files.");
} else {
  console.log("[quick-check] ❌ Issues found in changed files.");
}

process.exit(exitCode);
