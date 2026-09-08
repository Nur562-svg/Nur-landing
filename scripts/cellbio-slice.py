import json

TEXT = "scripts/cellbio-text.txt"
content = open(TEXT, encoding="utf-8").read()

# 18 习题集 chapters by PDF start/end pages (from TOC)
chap = [
    ("ch01-绪论", 103, 106),
    ("ch02-细胞的概念与分子基础", 107, 112),
    ("ch03-细胞生物学的研究方法", 113, 121),
    ("ch04-细胞膜与物质的穿膜运输", 122, 129),
    ("ch05-细胞的内膜系统与囊泡转运", 130, 137),
    ("ch06-线粒体与细胞的能量转换", 138, 143),
    ("ch07-细胞骨架与细胞的运动", 144, 151),
    ("ch08-细胞核", 152, 159),
    ("ch09-细胞内遗传信息的传递及调控", 160, 167),
    ("ch10-细胞连接与细胞黏附", 168, 174),
    ("ch11-细胞微环境及其与细胞的相互作用", 175, 180),
    ("ch12-细胞间信息传递", 181, 188),
    ("ch13-细胞分裂与细胞周期", 189, 196),
    ("ch14-生殖细胞与受精", 197, 201),
    ("ch15-细胞分化", 202, 208),
    ("ch16-细胞衰老与细胞死亡", 209, 214),
    ("ch17-干细胞与组织的维持和再生", 215, 221),
    ("ch18-细胞工程", 222, 226),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

summary = {}
order = []
import os
os.makedirs("scripts/cellbio-snippets", exist_ok=True)
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/cellbio-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_习题": "习题" in merged, "has_参考答案": "参考答案" in merged}
    order.append(name)

# exercise-region chars from "习题" heading
def exercise_chars(raw):
    idx = raw.find("\n习题")
    if idx < 0:
        idx = raw.find("习题")
    if idx < 0:
        idx = raw.find("习题\n")
    if idx < 0:
        return 0
    return len(raw[idx:])

data = {n: open(f"scripts/cellbio-snippets/{n}.txt", encoding="utf-8").read() for n in order}
for n in order:
    summary[n]["ex_chars"] = exercise_chars(data[n])
total_ex = sum(summary[n]["ex_chars"] for n in order)
budget = {n: round(600 * summary[n]["ex_chars"] / total_ex) for n in order}
alloc = sum(budget.values())

print(f"TOTAL exercise chars: {total_ex}  allocated sum: {alloc}")
for n in order:
    s = summary[n]
    print(f"{n:44} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>5} ex {s['ex_chars']:>5} 习题={s['has_习题']} 答案={s['has_参考答案']} budget {budget[n]:>3}")

with open("scripts/cellbio-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/cellbio-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)