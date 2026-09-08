import os
import pymupdf

BASE = "/Users/nukeab/Downloads/2026~2027第一学年下学期学习资料/中医诊断学/output/pdf"
FILES = [
    "中医诊断学_第1天背诵内容及答案.pdf",
    "中医诊断学_第2天背诵内容及答案.pdf",
    "中医诊断学_第3天背诵内容及答案.pdf",
    "中医诊断学_第4天背诵内容及答案.pdf",
    "中医诊断学_第5天背诵内容及答案.pdf",
    "中医诊断学_第6天背诵内容及答案.pdf",
]
OUT = "scripts/tcmdx-booklets"
os.makedirs(OUT, exist_ok=True)
for i, fn in enumerate(FILES, start=1):
    path = os.path.join(BASE, fn)
    doc = pymupdf.open(path)
    text = "\n"
    for p in range(doc.page_count):
        text += f"\n===== PDF_PAGE_{p+1:03d} =====\n"
        text += doc[p].get_text()
    out = f"{OUT}/day{i}.txt"
    open(out, "w", encoding="utf-8").write(text)
    print(f"day{i}: pages={doc.page_count} chars={len(text)} -> {out}")