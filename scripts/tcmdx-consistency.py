#!/usr/bin/env python3
"""中医诊断学题库聚合一致性检查：index.ts 引用完整性、各章统计头与预算对齐、全卷合计、题型分布统计。"""
import json
import re
import sys

BUDGET_META = json.load(open("scripts/tcmdx-budget.json", encoding="utf-8"))
CHAPTERS = BUDGET_META["chapters"]
TARGET = BUDGET_META["totalExtractable"]
GAP = BUDGET_META["gap"]

CH_BUDGET = {}
for key, meta in CHAPTERS.items():
    CH_BUDGET[int(key[2:])] = meta["budget"]

IDX = "src/content/courses/tcm-diagnostics-bank/index.ts"
idx = open(IDX, encoding="utf-8").read()

errors = []
# 1) index.ts 引用完整性
imported = sorted(
    int(m.group(1))
    for m in re.finditer(r'from "\./extracted-tcm-diagnostics-bank-ch(\d+)"', idx)
)
expected = list(range(1, 13))
if imported != expected:
    errors.append(f"index.ts 导入章节缺失/多余: {set(expected) ^ set(imported)}")
print(f"index.ts 聚合章节数: {len(imported)}（应 12）")

# 2) 各章统计头与预算对齐，求和 + 题型分布
total = 0
kind_totals = {}
for ch in expected:
    fp = f"src/content/courses/tcm-diagnostics-bank/extracted-tcm-diagnostics-bank-ch{ch:02d}.ts"
    txt = open(fp, encoding="utf-8").read()
    m = re.search(r"独立记分题合计：(\d+) 题", txt)
    if not m:
        errors.append(f"{fp}: 缺统计头合计")
        continue
    n = int(m.group(1))
    budget = CH_BUDGET.get(ch)
    if budget is not None and n != budget:
        errors.append(f"{fp}: 统计头合计 {n} != 预算 {budget}")
    total += n
    kinds = re.findall(r"\bquestionKind:\s*\"([a-z0-9-]+)\"", txt)
    kind_totals[ch] = {
        "term": kinds.count("term"),
        "fill": kinds.count("fill"),
        "a1": kinds.count("a1-single"),
        "short": kinds.count("short-answer"),
        "case": kinds.count("case"),
        "b1_groups": len(re.findall(r"\bmembers:\s*\[", txt)),
    }

print(f"各章统计头合计: {total}（应 {TARGET}）")
if total != TARGET:
    errors.append(f"统计头合计 {total} != 实际可提取数 {TARGET}（目标 600，缺口 {GAP} 如实登记）")

print(f"{'chapter':<12}{'term':>6}{'fill':>6}{'a1':>6}{'short':>7}{'case':>6}{'B1组':>6}")
for ch in expected:
    k = kind_totals[ch]
    print(f"ch{ch:02d}{'':<8}{k['term']:>6}{k['fill']:>6}{k['a1']:>6}{k['short']:>7}{k['case']:>6}{k['b1_groups']:>6}")

kind_sum = {
    "term": sum(k["term"] for k in kind_totals.values()),
    "fill": sum(k["fill"] for k in kind_totals.values()),
    "a1": sum(k["a1"] for k in kind_totals.values()),
    "short": sum(k["short"] for k in kind_totals.values()),
    "case": sum(k["case"] for k in kind_totals.values()),
}
print(f"{'TOTAL':<12}{kind_sum['term']:>6}{kind_sum['fill']:>6}{kind_sum['a1']:>6}{kind_sum['short']:>7}{kind_sum['case']:>6}")

# 3) 导出名称
for name in ("tcmDiagnosticsBankExtractedItems", "tcmDiagnosticsBankExtractedGroups"):
    if f"export const {name}" not in idx:
        errors.append(f"index.ts 缺导出 {name}")

if errors:
    print("\nERRORS:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("ALL CONSISTENCY CHECKS PASSED")