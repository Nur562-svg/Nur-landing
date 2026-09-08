import json, os

TEXT = "scripts/microbio-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 37 sections by PDF start/end pages (from TOC): 绪论 + 36 chapters
chap = [
    ("ch00-绪论", 12, 15),
    ("ch01-细菌的形态与结构", 16, 25),
    ("ch02-细菌的生理", 26, 34),
    ("ch03-噬菌体", 35, 38),
    ("ch04-细菌的遗传与变异", 39, 44),
    ("ch05-细菌耐药性", 45, 49),
    ("ch06-细菌的感染与免疫", 50, 64),
    ("ch07-细菌感染的检测方法与防治原则", 65, 70),
    ("ch08-球菌", 71, 84),
    ("ch09-肠杆菌科", 85, 92),
    ("ch10-弧菌属", 93, 97),
    ("ch11-螺杆菌属", 98, 100),
    ("ch12-厌氧性细菌", 101, 107),
    ("ch13-分枝杆菌属", 108, 113),
    ("ch14-嗜血杆菌属", 114, 116),
    ("ch15-动物源性细菌", 117, 124),
    ("ch16-其他细菌", 125, 138),
    ("ch17-放线菌", 139, 143),
    ("ch18-支原体", 144, 149),
    ("ch19-立克次体", 150, 154),
    ("ch20-衣原体", 155, 161),
    ("ch21-螺旋体", 162, 167),
    ("ch22-病毒的基本性状", 168, 175),
    ("ch23-病毒的感染与免疫", 176, 185),
    ("ch24-病毒感染的检查方法与防治原则", 186, 192),
    ("ch25-呼吸道病毒", 193, 197),
    ("ch26-肠道病毒", 198, 204),
    ("ch27-急性胃肠炎病毒", 205, 210),
    ("ch28-肝炎病毒", 211, 219),
    ("ch29-虫媒病毒", 220, 225),
    ("ch30-出血热病毒", 226, 231),
    ("ch31-疱疹病毒", 232, 237),
    ("ch32-逆转录病毒", 238, 244),
    ("ch33-其他病毒", 245, 249),
    ("ch34-朊粒", 250, 253),
    ("ch35-真菌学总论", 254, 261),
    ("ch36-主要病原性真菌", 262, 273),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/microbio-snippets", exist_ok=True)
summary = {}
order = []
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/microbio-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_习题": "习题" in merged, "has_参考答案": "参考答案" in merged}
    order.append(name)

def exercise_chars(raw):
    idx = raw.find("\n习题")
    if idx < 0:
        idx = raw.find("习题")
    if idx < 0:
        idx = raw.find("思考题")
    if idx < 0:
        return 0
    return len(raw[idx:])

data = {n: open(f"scripts/microbio-snippets/{n}.txt", encoding="utf-8").read() for n in order}
for n in order:
    summary[n]["ex_chars"] = exercise_chars(data[n])
total_ex = sum(summary[n]["ex_chars"] for n in order)
TARGET = 600
# largest-remainder (Hamilton) allocation summing exactly to TARGET
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
    print(f"{n:44} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 习题={s['has_习题']} 答案={s['has_参考答案']} budget {budget[n]:>3}")

with open("scripts/microbio-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/microbio-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)
