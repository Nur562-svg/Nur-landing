import json, os

TEXT = "scripts/neuro-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 23 chapters by PDF start/end pages (TOC corrected: page-40 dup entry is ch03 常见症状)
chap = [
    ("ch01-绪论", 6, 8),
    ("ch02-神经系统的解剖生理及病损的定位诊断", 9, 39),
    ("ch03-神经系统疾病的常见症状", 40, 60),
    ("ch04-神经系统疾病的病史采集和体格检查", 61, 84),
    ("ch05-神经系统疾病的辅助检查", 85, 111),
    ("ch06-神经心理学检查", 112, 120),
    ("ch07-神经系统疾病的诊断原则", 121, 124),
    ("ch08-头痛", 125, 138),
    ("ch09-脑血管疾病", 139, 188),
    ("ch10-脑血管病的介入诊疗", 189, 205),
    ("ch11-神经系统变性疾病", 206, 220),
    ("ch12-中枢神经系统感染性疾病", 221, 247),
    ("ch13-中枢神经系统脱髓鞘疾病", 248, 266),
    ("ch14-运动障碍性疾病", 267, 285),
    ("ch15-癫痫", 286, 303),
    ("ch16-脊髓疾病", 304, 321),
    ("ch17-周围神经疾病", 322, 342),
    ("ch18-自主神经系统疾病", 343, 349),
    ("ch19-神经肌肉接头和肌肉疾病", 350, 369),
    ("ch20-神经系统遗传性疾病", 370, 381),
    ("ch21-神经系统发育异常性疾病", 382, 390),
    ("ch22-睡眠障碍", 391, 399),
    ("ch23-内科系统疾病的神经系统并发症", 400, 414),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/neuro-snippets", exist_ok=True)
summary = {}
order = []
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/neuro-snippets/{name}.txt", "w", encoding="utf-8") as f:
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

data = {n: open(f"scripts/neuro-snippets/{n}.txt", encoding="utf-8").read() for n in order}
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
    print(f"{n:44} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 习题={s['has_习题']} 答案={s['has_参考答案']} budget {budget[n]:>3}")

with open("scripts/neuro-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/neuro-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)
