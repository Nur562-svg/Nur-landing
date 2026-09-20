import json, os, re

TEXT = "scripts/ocr/infectious-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 10 个正文章节，PDF 起止页（书签页码即 PDF 页码；末章至 430）
chap = [
    ("ch01-总论", 8, 30),
    ("ch02-病毒性传染病", 31, 159),
    ("ch03-立克次体病", 160, 181),
    ("ch04-细菌性传染病", 182, 260),
    ("ch05-深部真菌病", 261, 285),
    ("ch06-螺旋体病", 286, 309),
    ("ch07-原虫病", 310, 336),
    ("ch08-蠕虫病", 337, 392),
    ("ch09-朊粒病", 393, 396),
    ("ch10-其他", 397, 430),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/infectious-snippets", exist_ok=True)
order = []
summary = {}
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/infectious-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_练习题": "【练习题】" in merged or "练习题" in merged,
                     "has_参考答案": "参考答案" in merged or "【参考答案】" in merged,
                     "has_名词解释": "名词解释" in merged, "has_填空题": "填空" in merged,
                     "has_选择题": "选择题" in merged, "has_问答题": "问答" in merged,
                     "has_病案分析": "病案" in merged or "病例" in merged,
                     "has_B型题": "B型" in merged, "has_A2型题": "A2型" in merged}
    order.append(name)

def exercise_chars(raw):
    idx = -1
    for marker in ["【练习题】", "练习题", "复习思考题"]:
        idx = raw.find(marker)
        if idx >= 0:
            break
    if idx < 0:
        return 0
    return len(raw[idx:])

data = {n: open(f"scripts/infectious-snippets/{n}.txt", encoding="utf-8").read() for n in order}
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
    print(f"{n:30} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 练习题={s['has_练习题']} 名词={s['has_名词解释']} 填空={s['has_填空题']} 选择={s['has_选择题']} A2={s['has_A2型题']} B1={s['has_B型题']} 问答={s['has_问答题']} 病案={s['has_病案分析']} 答案={s['has_参考答案']} budget {budget[n]:>3}")

with open("scripts/infectious-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/infectious-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)
