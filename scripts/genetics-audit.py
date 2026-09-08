import re, glob, os, sys

files = sorted(
    glob.glob("src/content/courses/medical-genetics/extracted-medical-genetics-ch*.ts"),
    key=lambda p: int(re.search(r"ch(\d+)", p).group(1)),
)
all_ids = {}
total = 0
per_file = {}
for fp in files:
    txt = open(fp, encoding="utf-8").read()
    ids = re.findall(r'id:\s*"(ext-[^"]+)"', txt)
    orders = [int(x) for x in re.findall(r"order:\s*(\d+)", txt)]
    dup_ids = [i for i in set(ids) if ids.count(i) > 1]
    # item/member order uniqueness: group orders duplicate a member order; collect all and check distinct==1..max
    distinct = sorted(set(orders))
    contiguous = distinct == list(range(1, max(orders) + 1))
    per_file[fp] = {
        "max_order": max(orders) if orders else 0,
        "n_ids": len(ids),
        "dup_in_file": dup_ids,
        "orders_contiguous_1_max": contiguous,
    }
    total += max(orders) if orders else 0
    for i in ids:
        all_ids.setdefault(i, []).append(fp)

global_dup = {i: v for i, v in all_ids.items() if len(v) > 1}
print(f"{'file':<70}{'max_order':>10}{'n_ids':>7}{'contig':>8}")
for fp in files:
    d = per_file[fp]
    print(f"{fp.split('/')[-1]:<70}{d['max_order']:>10}{d['n_ids']:>7}{str(d['orders_contiguous_1_max']):>8}")
    if d["dup_in_file"]:
        print("   DUP-IN-FILE:", d["dup_in_file"])
print("=" * 95)
print("SUM max_order (independent scored items):", total)
print("GLOBAL duplicate IDs:", len(global_dup))
for i, v in list(global_dup.items())[:30]:
    print("   ", i, "->", [x.split('/')[-1] for x in v])
# expected budget
budgets = [19,16,21,34,40,19,31,34,22,39,55,37,38,31,28,25,16,23,14,27,30]
# budgets pos -> order of files ch0..ch20
print("expected budget  ch0..ch20:", budgets, "sum", sum(budgets))