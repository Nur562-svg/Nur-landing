#!/usr/bin/env python3
"""医学影像学题库聚合一致性检查：index.ts 引用完整性、各章统计头与预算对齐、全卷合计 600、题型分布统计。"""
import json
import re
import sys

BUDGET = json.load(open("scripts/radiology-budget.json", encoding="utf-8"))["budget"]
CH_BUDGET = {}
for key, b in BUDGET.items():
    m = re.match(r"ch(\d+)-", key)
    CH_BUDGET[int(m.group(1))] = b

IDX = "src/content/courses/radiology-bank/index.ts"
idx = open(IDX, encoding="utf-8").read()

errors = []
# 1) index.ts 引用完整性
imported = sorted(
    int(m.group(1))
    for m in re.finditer(r'from "\./extracted-radiology-bank-ch(\d+)"', idx)
)
expected = list(range(1, 16))
if imported != expected:
    errors.append(f"index.ts 导入章节缺失/多余: {set(expected) ^ set(imported)}")
print(f"index.ts 聚合章节数: {len(imported)}（应 15）")

# 2) 各章统计头与预算对齐，求和 + 题型分布
total = 0
kind_totals = {}
for ch in expected:
    fp = f"src/content/courses/radiology-bank/extracted-radiology-bank-ch{ch:02d}.ts"
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
        "b1_members": len(re.findall(r"\bid:\s*\"ext-radiology-[^\"]*b\d{3}m\d+\"", txt)),
    }

print(f"各章统计头合计: {total}（应 600）")
if total != 600:
    errors.append(f"统计头合计 {total} != 600")

print(f"{'chapter':<12}{'term':>6}{'fill':>6}{'a1':>6}{'short':>7}{'case':>6}{'B1组':>6}{'成员':>6}")
for ch in expected:
    k = kind_totals[ch]
    print(f"ch{ch:02d}{'':<8}{k['term']:>6}{k['fill']:>6}{k['a1']:>6}{k['short']:>7}{k['case']:>6}{k['b1_groups']:>6}{k['b1_members']:>6}")

# 3) 导出名称
for name in ("radiologyBankExtractedItems", "radiologyBankExtractedGroups"):
    if f"export const {name}" not in idx:
        errors.append(f"index.ts 缺导出 {name}")

if errors:
    print("\nERRORS:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("ALL CONSISTENCY CHECKS PASSED")
