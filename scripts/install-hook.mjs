#!/usr/bin/env node

/**
 * install-hook.mjs — Install the pre-commit git hook.
 *
 * Creates a .git/hooks/pre-commit shim that delegates to scripts/pre-commit.mjs.
 * Runs automatically via `npm run prepare` (triggered on `npm install`).
 * Safe to run multiple times; skips if hook is already installed.
 */

import { existsSync, writeFileSync, chmodSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");

function exec(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: "utf-8" }).trim();
  } catch {
    return "";
  }
}

// Resolve .git directory (handles worktrees via .git file)
const gitDirRaw = resolve(ROOT, ".git");
let gitDir = gitDirRaw;

if (!existsSync(gitDirRaw)) {
  // Not a git repository
  console.log("[install-hook] Not a git repository — skipping hook installation.");
  process.exit(0);
}

// If .git is a file (worktree), read the actual git dir
const stat = execSync(`stat -f "%T" "${gitDirRaw}" 2>/dev/null || stat -c "%F" "${gitDirRaw}" 2>/dev/null`, {
  encoding: "utf-8",
}).trim();

if (stat === "Regular File" || stat === "regular file") {
  const content = execSync(`cat "${gitDirRaw}"`, { encoding: "utf-8" }).trim();
  const match = content.match(/^gitdir:\s*(.+)$/);
  if (match) {
    gitDir = resolve(ROOT, match[1]);
  }
}

const hooksDir = resolve(gitDir, "hooks");
const hookPath = resolve(hooksDir, "pre-commit");

// Check if hook already exists and points to our script
if (existsSync(hookPath)) {
  const existing = execSync(`cat "${hookPath}"`, { encoding: "utf-8" });
  if (existing.includes("scripts/pre-commit.mjs")) {
    console.log("[install-hook] Pre-commit hook already installed.");
    process.exit(0);
  }
  // Backup existing hook
  const backup = `${hookPath}.backup-${Date.now()}`;
  execSync(`mv "${hookPath}" "${backup}"`);
  console.log(`[install-hook] Backed up existing hook to ${backup}`);
}

// Ensure hooks directory exists
if (!existsSync(hooksDir)) {
  execSync(`mkdir -p "${hooksDir}"`);
}

// Write the hook shim
const hookContent = `#!/bin/sh
# Auto-installed by npm run prepare. Delegates to scripts/pre-commit.mjs.
exec node scripts/pre-commit.mjs "$@"
`;

writeFileSync(hookPath, hookContent, { mode: 0o755 });
chmodSync(hookPath, 0o755);

console.log("[install-hook] ✅ Pre-commit hook installed.");
console.log("[install-hook] Hook will run quick-check:staged on Tier 1-4 files before each commit.");
