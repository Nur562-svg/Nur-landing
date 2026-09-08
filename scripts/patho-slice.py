import json, os

TEXT = "scripts/patho-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 18 个正文章节，PDF 起止页（书签页码即 PDF 页码；末章至 299）
chap = [
    ("ch01-细胞和组织的适应与损伤", 8, 22),
    ("ch02-损伤的修复", 23, 36),
    ("ch03-局部血液循环障碍", 37, 54),
    ("ch04-炎症", 55, 70),
    ("ch05-免疫性疾病", 71, 82),
    ("ch06-肿瘤", 83, 104),
    ("ch07-环境和营养性疾病", 105, 113),
    ("ch08-遗传性疾病和儿童疾病", 114, 121),
    ("ch09-心血管系统疾病", 122, 140),
    ("ch10-呼吸系统疾病", 141, 165),
    ("ch11-消化系统疾病", 166, 190),
    ("ch12-淋巴造血系统疾病", 191, 202),
    ("ch13-泌尿系统疾病", 203, 221),
    ("ch14-生殖系统和乳腺疾病", 222, 236),
    ("ch15-内分泌系统疾病", 237, 252),
    ("ch16-神经系统疾病", 253, 268),
    ("ch17-感染性疾病", 269, 292),
    ("ch18-疾病的病理学诊断和研究方法", 293, 299),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/patho-snippets", exist_ok=True)
order = []
summary = {}
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/patho-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_习题": "习题" in merged, "has_参考答案": "参考答案" in merged,
                     "has_名词解释": "名词解释" in merged, "has_填空题": "填空题" in merged,
                     "has_选择题": "选择题" in merged, "has_简答题": "简答题" in merged,
                     "has_论述题": "论述题" in merged}
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

data = {n: open(f"scripts/patho-snippets/{n}.txt", encoding="utf-8").read() for n in order}
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
    print(f"{n:28} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 名词={s['has_名词解释']} 填空={s['has_填空题']} 选择={s['has_选择题']} 简答={s['has_简答题']} 论述={s['has_论述题']} budget {budget[n]:>3}")

with open("scripts/patho-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/patho-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)
