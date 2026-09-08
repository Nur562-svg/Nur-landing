import json, os

TEXT = "scripts/topo-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 9 个正文章节（绪论 + 8 章），PDF 起止页（含习题与参考答案）
chap = [
    ("ch00-绪论", 11, 12),
    ("ch01-头部", 13, 24),
    ("ch02-颈部", 25, 50),
    ("ch03-胸部", 51, 70),
    ("ch04-腹部", 71, 108),
    ("ch05-盆部与会阴", 109, 126),
    ("ch06-脊柱区", 127, 145),
    ("ch07-上肢", 146, 165),
    ("ch08-下肢", 166, 187),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/topo-snippets", exist_ok=True)
order = []
summary = {}
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/topo-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_习题": "习题" in merged, "has_参考答案": "参考答案" in merged,
                     "has_名词解释": "名词解释" in merged, "has_选择题": "选择题" in merged,
                     "has_简答题": "简答题" in merged}
    order.append(name)

def exercise_chars(raw):
    # 习题区 = 首个「习题」标题（独立行或行内）→ 章尾；含各节习题+参考答案
    idx = -1
    for line in raw.splitlines():
        s = line.strip()
        if s == "习题":
            idx = raw.find(line)
            break
    if idx < 0:
        idx = raw.find("习题")
    if idx < 0:
        idx = raw.find("思考题")
    if idx < 0:
        return 0
    return len(raw[idx:])

data = {n: open(f"scripts/topo-snippets/{n}.txt", encoding="utf-8").read() for n in order}
for n in order:
    summary[n]["ex_chars"] = exercise_chars(data[n])
total_ex = sum(summary[n]["ex_chars"] for n in order)
TARGET = 600
base = {n: (TARGET * summary[n]["ex_chars"]) // total_ex for n in order}
rem = {n: (TARGET * summary[n]["ex_chars"]) % total_ex for n in order}
alloc0 = sum(base.values())
seats = TARGET - alloc0
for n in sorted(rem, key=lambda x: (rem[x], summary[x]["ex_chars"]), reverse=True)[:seats]:
    base[n] += 1
budget = base
alloc = sum(budget.values())

print(f"TOTAL exercise chars: {total_ex}  allocated sum: {alloc}")
for n in order:
    s = summary[n]
    print(f"{n:24} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 名词={s['has_名词解释']} 选择={s['has_选择题']} 简答={s['has_简答题']} budget {budget[n]:>3}")

with open("scripts/topo-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/topo-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)
