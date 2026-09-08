#!/usr/bin/env python3
"""局部解剖学题库聚合一致性校验：index.ts 引用完整性、各章统计头与预算对齐、全书合计 600、题型分布统计。"""
import glob
import json
import re
import sys

ROOT = "src/content/courses/topographic-anatomy"
BUDGET = json.load(open("scripts/topo-budget.json", encoding="utf-8"))["budget"]
CH_BUDGET = {}
for key, b in BUDGET.items():
    m = re.match(r"ch(\d+)-", key)
    CH_BUDGET[int(m.group(1))] = b

errors = []

# 1) index.ts 引用完整性
idx = open(f"{ROOT}/index.ts", encoding="utf-8").read()
imported = sorted(
    int(m.group(1))
    for m in re.finditer(r'from "\./extracted-topographic-anatomy-ch(\d+)"', idx)
)
expected = list(range(0, 9))
if imported != expected:
    errors.append(f"index.ts 导入章节缺失/多余: {set(expected) ^ set(imported)}")

# 2) 各章文件统计头与预算对齐 + 题型计数
kind_totals = {}
total_independent = 0
missing_ans = 0
unreliable = 0
for ch in expected:
    fp = f"{ROOT}/extracted-topographic-anatomy-ch{ch:02d}.ts"
    txt = open(fp, encoding="utf-8").read()
    budget = CH_BUDGET.get(ch)
    if budget is None:
        errors.append(f"{fp}: 预算缺失")
        continue
    kinds = re.findall(r"\bquestionKind:\s*\"([a-z0-9-]+)\"", txt)
    n_terms = kinds.count("term")
    n_a1 = kinds.count("a1-single")
    n_short = kinds.count("short-answer")
    n_b1_groups = len(re.findall(r"\bmembers:\s*\[", txt))  # 每组一个 members 数组
    n_b1_members = len(re.findall(r"\bid:\s*\"ext-topographic-anatomy-[^\"]*b\d{3}m\d+\"", txt))
    # 独立记分题 = order 最大值（B1 组级 order 与首成员相同）
    orders = [int(m) for m in re.findall(r"\border:\s*(\d+)", txt)]
    independent = max(orders) if orders else 0
    kind_totals[ch] = {
        "term": n_terms,
        "a1": n_a1,
        "short": n_short,
        "b1_groups": n_b1_groups,
        "b1_members": n_b1_members,
        "independent": independent,
        "budget": budget,
    }
    total_independent += independent
    missing_ans += txt.count("缺失答案")  # 统计头声明
    unreliable += 0
    if independent != budget:
        errors.append(f"{fp}: 独立记分题 {independent} != 预算 {budget}")

print(f"{'chapter':<12}{'term':>6}{'a1':>6}{'short':>7}{'B1组':>6}{'成员':>6}{'独立题':>7}{'预算':>6}")
for ch in expected:
    k = kind_totals[ch]
    print(f"ch{ch:02d}{'':<8}{k['term']:>6}{k['a1']:>6}{k['short']:>7}{k['b1_groups']:>6}{k['b1_members']:>6}{k['independent']:>7}{k['budget']:>6}")

print("=" * 70)
print(f"TOTAL independent: {total_independent} (target 600)")
if total_independent != 600:
    errors.append(f"全书合计 {total_independent} != 600")

if errors:
    print(f"\nERRORS ({len(errors)}):")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("ALL CONSISTENCY CHECKS PASSED")
