import json, os

TEXT = "scripts/pharmacology-ocr.txt"
content = open(TEXT, encoding="utf-8").read()

# 49 chapters by PDF start/end pages (verified against OCR page headers + TOC)
chap = [
    ("ch01-药理学总论绪言", 6, 9),
    ("ch02-药物代谢动力学", 10, 26),
    ("ch03-药物效应动力学", 27, 34),
    ("ch04-影响药物效应的因素", 35, 38),
    ("ch05-传出神经系统药理概论", 39, 42),
    ("ch06-胆碱受体激动药", 43, 46),
    ("ch07-抗胆碱酯酶药和胆碱酯酶复活药", 47, 52),
    ("ch08-胆碱受体阻断药-M胆碱受体阻断药", 53, 56),
    ("ch09-胆碱受体阻断药-N胆碱受体阻断药", 57, 60),
    ("ch10-肾上腺素受体激动药", 61, 69),
    ("ch11-肾上腺素受体阻断药", 70, 76),
    ("ch12-中枢神经系统药理学概论", 77, 82),
    ("ch13-全身麻醉药", 83, 86),
    ("ch14-局部麻醉药", 87, 91),
    ("ch15-镇静催眠药", 92, 94),
    ("ch16-抗癫痫药和抗惊厥药", 95, 102),
    ("ch17-治疗中枢神经系统退行性疾病药", 103, 108),
    ("ch18-抗精神失常药", 109, 116),
    ("ch19-镇痛药", 117, 124),
    ("ch20-解热镇痛抗炎药", 125, 131),
    ("ch21-离子通道概论及钙通道阻滞药", 132, 137),
    ("ch22-抗心律失常药", 138, 147),
    ("ch23-作用于肾素血管紧张素系统的药物", 148, 152),
    ("ch24-利尿药", 153, 160),
    ("ch25-抗高血压药", 161, 167),
    ("ch26-治疗心力衰竭的药物", 168, 181),
    ("ch27-调血脂药与抗动脉粥样硬化药", 182, 189),
    ("ch28-抗心绞痛药", 190, 195),
    ("ch29-作用于血液及造血系统的药物", 196, 204),
    ("ch30-影响自体活性物质的药物", 205, 211),
    ("ch31-作用于呼吸系统的药物", 212, 217),
    ("ch32-作用于消化系统的药物", 218, 223),
    ("ch33-子宫平滑肌兴奋药和抑制药", 224, 228),
    ("ch34-性激素类药及避孕药", 229, 234),
    ("ch35-肾上腺皮质激素类药物", 235, 239),
    ("ch36-甲状腺激素及抗甲状腺药", 240, 244),
    ("ch37-胰岛素及其他降血糖药", 245, 249),
    ("ch38-抗骨质疏松药", 250, 255),
    ("ch39-抗菌药物概述", 256, 261),
    ("ch40-β内酰胺类抗生素", 262, 268),
    ("ch41-大环内酯类林可霉素类及多肽类抗生素", 269, 272),
    ("ch42-氨基苷类抗生素", 273, 278),
    ("ch43-四环素类及氯霉素类", 279, 283),
    ("ch44-人工合成抗菌药", 284, 289),
    ("ch45-抗病毒药和抗真菌药", 290, 296),
    ("ch46-抗结核药及抗麻风病药", 297, 302),
    ("ch47-抗寄生虫药", 303, 307),
    ("ch48-抗恶性肿瘤药", 308, 313),
    ("ch49-影响免疫功能的药物", 314, 319),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

os.makedirs("scripts/pharmaco-snippets", exist_ok=True)
summary = {}
order = []
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    with open(f"scripts/pharmaco-snippets/{name}.txt", "w", encoding="utf-8") as f:
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

data = {n: open(f"scripts/pharmaco-snippets/{n}.txt", encoding="utf-8").read() for n in order}
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
    print(f"{n:46} pages {s['start']}-{s['end']:<3} chars {s['chars_total']:>6} ex {s['ex_chars']:>5} 习题={s['has_习题']} 答案={s['has_参考答案']} budget {budget[n]:>3}")

with open("scripts/pharmaco-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_ex": total_ex, "allocated": alloc, "summary": summary},
              f, ensure_ascii=False, indent=1)
with open("scripts/pharmaco-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"order": order, "summary": summary}, f, ensure_ascii=False, indent=1)
