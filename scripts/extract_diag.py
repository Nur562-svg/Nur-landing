"""抽取诊断学全书文本到工作文件，并在目录中标注 ^页码。"""
import pymupdf, os, re, json

SRC = "/Users/nukeab/projects/Nur-landing/src/source_pdfs: "
OUT = "/Users/nukeab/projects/Nur-landing/.qbwork/diagnostics_full.txt"
os.makedirs(os.path.dirname(OUT), exist_ok=True)
f = os.path.join(SRC, "3.诊断学学习指导与习题集-第4版-全书签.pdf")
doc = pymupdf.open(f)
lines_out = []
for i in range(len(doc)):
    t = doc[i].get_text("text")
    t = t.split("\n")  # keep lines
    lines_out.append(f"\n====PDFPAGE {i+1}====")
    lines_out.extend(t)
with open(OUT, "w", encoding="utf-8") as fh:
    fh.write("\n".join(lines_out))
print("已写出", OUT, "总行", len(lines_out), "页", len(doc))

# 章节标题检测：形如 "第X章 标题" 且与学习目标/习题相邻
chapter_starts = []
toc_candidate = []
for i in range(len(doc)):
    t = doc[i].get_text("text")
    lines = [l.strip() for l in t.split("\n")]
    for j, l in enumerate(lines):
        m = re.match(r"^(第[一二三四五六七八九十百零]+章)\s*([^\s　]{1,18})?$", l)
        if m and len(l) <= 22:
            nxt = " ".join(lines[j+1:j+4])
            is_section = ("学习目标" in nxt or "学习要求" in nxt or "习题" in nxt or "基本方法" in l)
            txt_mid = " ".join(lines[j:j+6])
            chapter_starts.append({"pdfpage": i+1, "line": l, "flag": "SECTION" if is_section else "", "after": txt_mid[:40]})
print("\n候选章节行:")
for c in chapter_starts:
    print(f"  p{c['pdfpage']}: {c['line']}  {c['flag']}  | {c['after']}")
doc.close()