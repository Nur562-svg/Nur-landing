import json, os

TEXT = "scripts/radiology-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 15 个正文章节，PDF 起止页（书签页码即 PDF 页码；末章至 200）
chap = [
    ("ch01-影像诊断学总论", 2, 21),
    ("ch02-中枢神经系统", 22, 37),
    ("ch03-头颈部", 38, 54),
    ("ch04-呼吸系统", 55, 70),
    ("ch05-循环系统", 71, 85),
    ("ch06-乳腺", 86, 92),
    ("ch07-消化系统与腹膜腔", 93, 119),
    ("ch08-泌尿生殖系统与腹膜后间隙", 120, 142),
    ("ch09-骨骼与肌肉系统", 143, 160),
    ("ch10-儿科影像诊断学", 161, 166),
    ("ch11-传染性疾病", 167, 169),
    ("ch12-介入放射学总论", 170, 175),
    ("ch13-血管疾病的介入治疗", 176, 186),
    ("ch14-非血管疾病的介入治疗", 187, 191),
    ("ch15-良恶性肿瘤的介入治疗", 192, 200),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/radiology-snippets", exist_ok=True)
order = []
summary = {}
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/radiology-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_复习思考题": "复习思考题" in merged,
                     "has_参考答案": "答案" in merged,
                     "has_名词解释": "名词解释" in merged, "has_填空题": "填空" in merged,
                     "has_选择题": "选择题" in merged, "has_简答题": "简答题" in merged,
                     "has_B型题": "B型" in merged, "has_A2型题": "A2型" in merged}
    order.append(name)

def exercise_chars(raw):
    # 习题区 = 首个「复习思考题」标题 → 章尾；含各题型习题 + 参考答案
    idx = -1
    for line in raw.splitlines():
        s = line.strip()
        if s == "复习思考题" or s == "三、复习思考题":
            idx = raw.find(line)
            break
    if idx < 0:
        idx = raw.find("复习思考题")
    if idx < 0:
        idx = raw.find("思考题")
    if idx < 0:
        return 0
    return len(raw[idx:])

data = {n: open(f"scripts/radiology-snippets/{n}.txt", encoding="utf-8").read() for n in order}
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
    print(f"{n:30} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 思考题={s['has_复习思考题']} 名词={s['has_名词解释']} 填空={s['has_填空题']} 选择={s['has_选择题']} A2={s['has_A2型题']} B1={s['has_B型题']} 简答={s['has_简答题']} 答案={s['has_参考答案']} budget {budget[n]:>3}")

with open("scripts/radiology-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/radiology-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)
