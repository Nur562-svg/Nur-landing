"""导出诊断学目录与正文抽样，观察章节/题型/题号排版。"""
import pymupdf, os
SRC = "/Users/nukeab/projects/Nur-landing/src/source_pdfs: "
f = os.path.join(SRC, "3.诊断学学习指导与习题集-第4版-全书签.pdf")
doc = pymupdf.open(f)
print("页数:", len(doc))
for i in range(len(doc)):
    t = doc[i].get_text("text").strip()
    if t and ("目录" in t[:100] or i < 8):
        print(f"===== 第{i+1}页 =====")
        print(t[:900])
doc.close()