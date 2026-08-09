#!/usr/bin/env node

/**
 * pre-commit.mjs — Git pre-commit hook gate.
 *
 * Detects staged Tier 1-2 file changes and runs quick-check:staged
 * (lint + typecheck) to block commits that fail validation.
 *
 * Tier 1 (Content Truth):  src/content/courses/, src/content/materials/
 * Tier 2 (Validation):     src/lib/ (course-validation, fsrs, scoring, etc.)
 * Tier 3 (Builder/Agent):  src/lib/course-builder/, src/lib/nur-agent/
 * Tier 4 (Contracts):      src/types/
 *
 * Any staged change in these directories triggers the full staged check.
 * Free-zone files (components, app routes, styles) skip the gate.
 */

import { execSync } from "node:child_process";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

// Tier 1-4 path prefixes that require validation before commit.
const TIER_PREFIXES = [
  "src/content/courses/",   // Tier 1 — Content Truth
  "src/content/materials/", // Tier 1 — Material provenance
  "src/lib/",               // Tier 2 + Tier 3 — Validation, scoring, builder, agent
  "src/types/",             // Tier 4 — Data contracts
];

function exec(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: "utf-8" }).trim();
  } catch {
    return "";
  }
}

// Get staged files
const stagedRaw = exec("git diff --cached --name-only --diff-filter=ACMR");
const stagedFiles = stagedRaw.split("\n").filter(Boolean);

if (stagedFiles.length === 0) {
  console.log("[pre-commit] No staged files — skipping gate.");
  process.exit(0);
}

// Check if any staged file falls under Tier 1-4 paths
const tierFiles = stagedFiles.filter((f) =>
  TIER_PREFIXES.some((prefix) => f.startsWith(prefix))
);

if (tierFiles.length === 0) {
  console.log("[pre-commit] No Tier 1-4 files in staged changes — skipping gate.");
  console.log("[pre-commit] Tier 1-4 paths: src/content/{courses,materials}/, src/lib/, src/types/");
  process.exit(0);
}

console.log(`[pre-commit] Detected ${tierFiles.length} Tier 1-4 staged file(s):`);
for (const f of tierFiles) console.log(`  ${f}`);
console.log();
console.log("[pre-commit] Running quick-check:staged (lint + typecheck)…");
console.log();

try {
  execSync("npm run quick-check:staged", {
    cwd: ROOT,
    stdio: "inherit",
  });
  console.log();
  console.log("[pre-commit] ✅ Gate passed — proceeding with commit.");
  process.exit(0);
} catch {
  console.log();
  console.log("[pre-commit] ❌ Gate FAILED — commit blocked.");
  console.log("[pre-commit] Fix the above errors, re-stage, and try again.");
  console.log("[pre-commit] To skip (not recommended): git commit --no-verify");
  process.exit(1);
}
