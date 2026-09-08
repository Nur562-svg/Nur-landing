import json

TEXT = "scripts/histo-text.txt"
content = open(TEXT, encoding="utf-8").read()

# 28 chapters by PDF start/end pages (from TOC)
chap = [
    ("ch01-绪论", 9, 12), ("ch02-上皮组织", 13, 21), ("ch03-结缔组织", 22, 28),
    ("ch04-软骨和骨", 29, 38), ("ch05-血液", 39, 47), ("ch06-肌组织", 48, 54),
    ("ch07-神经组织", 55, 64), ("ch08-神经系统", 65, 72), ("ch09-循环系统", 73, 82),
    ("ch10-免疫系统", 83, 92), ("ch11-皮肤", 93, 99), ("ch12-眼与耳", 100, 108),
    ("ch13-内分泌系统", 109, 116), ("ch14-消化管", 117, 127), ("ch15-消化腺", 128, 135),
    ("ch16-呼吸系统", 136, 141), ("ch17-泌尿系统", 142, 149), ("ch18-男性生殖系统", 150, 156),
    ("ch19-女性生殖系统", 157, 167), ("ch20-胚胎学绪论", 168, 170), ("ch21-胚胎发生总论", 171, 182),
    ("ch22-颜面和四肢的发生", 183, 187), ("ch23-消化系统和呼吸系统的发生", 188, 193),
    ("ch24-泌尿系统和生殖系统的发生", 194, 200), ("ch25-心血管系统的发生", 201, 208),
    ("ch26-神经系统的发生", 209, 215), ("ch27-眼与耳的发生", 216, 219), ("ch28-先天性畸形概述", 220, 222),
]

def page_block(page):
    m = content.find(f"===== PDF_PAGE_{page:03d} =====")
    n = content.find(f"===== PDF_PAGE_{page+1:03d} =====")
    if m < 0:
        return ""
    return content[m:n] if n > m else content[m:]

# Extract per-chapter slice
out = {}
summary = {}
for name, s, e in chap:
    merged = "".join(page_block(p) for p in range(s, e + 1))
    out[name] = merged
    summary[name] = {"start": s, "end": e, "chars_total": len(merged),
                     "has_习题": "习题" in merged, "has_参考答案": "参考答案" in merged}
    with open(f"scripts/histo-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(merged)

print("chapter slices written")
for k, v in summary.items():
    print(f"{k:38} pages {v['start']}-{v['end']:<3} chars {v['chars_total']:>6} 习题={v['has_习题']} 参考答案={v['has_参考答案']}")

with open("scripts/histo-chap-slices.json", "w", encoding="utf-8") as f:
    json.dump({"summary": summary, "order": [n for n, _, _ in chap]}, f, ensure_ascii=False, indent=1)