import json, os

TEXT = "scripts/immuno-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 25 chapters by PDF start/end pages (from TOC)
chap = [
    ("ch01-免疫学概论", 8, 19),
    ("ch02-免疫器官和组织", 20, 30),
    ("ch03-抗原", 31, 41),
    ("ch04-抗体", 42, 53),
    ("ch05-补体系统", 54, 61),
    ("ch06-细胞因子", 62, 75),
    ("ch07-白细胞分化抗原和黏附分子", 76, 87),
    ("ch08-主要组织相容性复合体", 88, 98),
    ("ch09-B淋巴细胞", 99, 111),
    ("ch10-T淋巴细胞", 112, 122),
    ("ch11-抗原提呈细胞与抗原的加工及提呈", 123, 130),
    ("ch12-T淋巴细胞介导的适应性免疫应答", 131, 142),
    ("ch13-B淋巴细胞介导的特异性免疫应答", 143, 155),
    ("ch14-固有免疫系统及其介导的应答", 156, 166),
    ("ch15-黏膜免疫", 167, 176),
    ("ch16-免疫耐受", 177, 187),
    ("ch17-免疫调节", 188, 199),
    ("ch18-超敏反应", 200, 212),
    ("ch19-自身免疫病", 213, 223),
    ("ch20-免疫缺陷病", 224, 235),
    ("ch21-感染免疫", 236, 244),
    ("ch22-肿瘤免疫", 245, 256),
    ("ch23-移植免疫", 257, 269),
    ("ch24-免疫学检测技术", 270, 279),
    ("ch25-免疫学防治", 280, 289),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/immuno-snippets", exist_ok=True)
summary = {}
order = []
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/immuno-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_习题": "习题" in merged, "has_参考答案": "答案" in merged}
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

data = {n: open(f"scripts/immuno-snippets/{n}.txt", encoding="utf-8").read() for n in order}
for n in order:
    summary[n]["ex_chars"] = exercise_chars(data[n])
total_ex = sum(summary[n]["ex_chars"] for n in order)
TARGET = 600
# largest-remainder (Hamilton) allocation summing exactly to TARGET
base = {n: (TARGET * summary[n]["ex_chars"]) // total_ex for n in order}
rem = {n: (TARGET * summary[n]["ex_chars"]) % total_ex for n in order}
alloc0 = sum(base.values())
# assign remaining seats to chapters with largest fractional remainder
seats = TARGET - alloc0
for n in sorted(rem, key=lambda x: (rem[x], summary[x]["ex_chars"]), reverse=True)[:seats]:
    base[n] += 1
budget = base
alloc = sum(budget.values())

print(f"TOTAL exercise chars: {total_ex}  allocated sum: {alloc}")
for n in order:
    s = summary[n]
    print(f"{n:44} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 习题={s['has_习题']} 答案={s['has_参考答案']} budget {budget[n]:>3}")

with open("scripts/immuno-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/immuno-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)