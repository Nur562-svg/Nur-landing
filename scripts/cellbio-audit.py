import re, glob
from collections import Counter

files = sorted(
    glob.glob("src/content/courses/cell-biology/extracted-cell-bio-ch*.ts"),
    key=lambda p: int(re.search(r"ch(\d+)", p).group(1)),
)
all_ids = []
per_file = {}
total = 0
for fp in files:
    txt = open(fp, encoding="utf-8").read()
    ids = re.findall(r'id:\s*"(ext-[^"]+)"', txt)
    orders = [int(x) for x in re.findall(r"order:\s*(\d+)", txt)]
    dup_ids = [i for i in set(ids) if ids.count(i) > 1]
    distinct = sorted(set(orders))
    contiguous = distinct == list(range(1, max(orders) + 1))
    per_file[fp] = {
        "max_order": max(orders) if orders else 0,
        "n_ids": len(ids),
        "dup_in_file": dup_ids,
        "contig": contiguous,
    }
    total += max(orders) if orders else 0
    all_ids.extend(ids)

dup = {i: c for i, c in Counter(all_ids).items() if c > 1}
print(f"{'file':<58}{'max_order':>10}{'n_ids':>7}{'contig':>8}")
for fp in files:
    d = per_file[fp]
    print(f"{fp.split('/')[-1]:<58}{d['max_order']:>10}{d['n_ids']:>7}{str(d['contig']):>8}")
    if d["dup_in_file"]:
        print("   DUP-IN-FILE:", d["dup_in_file"])
print("=" * 86)
print("TOTAL max_order (independent scored items):", total)
print("GLOBAL duplicate IDs:", len(dup))
for i, c in list(dup.items())[:30]:
    print("   ", i, "x", c)