import re, glob

files = sorted(
    glob.glob("src/content/courses/human-anatomy/extracted-human-anatomy-ch*.ts"),
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
    distinct = sorted(set(orders))
    contiguous = distinct == list(range(1, max(orders) + 1)) if orders else True
    per_file[fp] = {
        "max_order": max(orders) if orders else 0,
        "n_ids": len(ids),
        "dup_in_file": dup_ids,
        "orders_contiguous": contiguous,
    }
    total += max(orders) if orders else 0
    for i in ids:
        all_ids.setdefault(i, []).append(fp)

global_dup = {i: v for i, v in all_ids.items() if len(v) > 1}
print(f"{'file':<55}{'max_order_budget':>18}{'n_ids':>8}{'contig':>8}")
for fp in files:
    d = per_file[fp]
    print(f"{fp.split('/')[-1]:<55}{d['max_order']:>18}{d['n_ids']:>8}{str(d['orders_contiguous']):>8}")
    if d["dup_in_file"]:
        print("   DUP-IN-FILE:", d["dup_in_file"])
print("=" * 90)
print("SUM max_order (independent scored items):", total)
print("GLOBAL duplicate IDs:", len(global_dup))
for i, v in list(global_dup.items())[:30]:
    print("   ", i, "->", [x.split('/')[-1] for x in v])
# expected budgets ch1..ch18
budgets = [33,35,43,41,20,17,13,24,7,63,18,28,19,118,77,23,14,7]
ch = sorted([int(re.search(r"ch(\d+)", f).group(1)) for f in files])
# map budget by ch index in files order
print("expected budget by ch:", dict(zip(ch, budgets)))
print("expected sum:", sum(budgets))