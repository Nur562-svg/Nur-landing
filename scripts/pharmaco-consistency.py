#!/usr/bin/env python3
"""药理学题库聚合一致性检查：index.ts 引用完整性、各章统计头与预算对齐、全卷合计 600。"""
import json
import re
import sys

BUDGET = json.load(open("scripts/pharmaco-budget.json", encoding="utf-8"))["budget"]
CH_BUDGET = {}
for key, b in BUDGET.items():
    m = re.match(r"ch(\d+)-", key)
    CH_BUDGET[int(m.group(1))] = b

IDX = "src/content/courses/pharmacology/index.ts"
idx = open(IDX, encoding="utf-8").read()

errors = []
# 1) index.ts 引用完整性
imported = sorted(
    int(m.group(1))
    for m in re.finditer(r'from "\./extracted-pharmacology-ch(\d+)"', idx)
)
expected = list(range(1, 50))
if imported != expected:
    errors.append(f"index.ts 导入章节缺失/多余: {set(expected) ^ set(imported)}")
print(f"index.ts 聚合章节数: {len(imported)}（应 49）")

# 2) 各章统计头与预算对齐，求和
total = 0
for ch in expected:
    fp = f"src/content/courses/pharmacology/extracted-pharmacology-ch{ch:02d}.ts"
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

print(f"各章统计头合计: {total}（应 600）")
if total != 600:
    errors.append(f"统计头合计 {total} != 600")

# 3) 导出名称
for name in ("pharmacologyExtractedItems", "pharmacologyExtractedGroups"):
    if f"export const {name}" not in idx:
        errors.append(f"index.ts 缺导出 {name}")

if errors:
    print("\nERRORS:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("ALL CONSISTENCY CHECKS PASSED")
