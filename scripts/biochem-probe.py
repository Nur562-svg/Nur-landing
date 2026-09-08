import pymupdf, os, re

SRC = "src/source_pdfs: /15.生物化学与分子生物学学习指导与习题集-全书签.pdf"
doc = pymupdf.open(SRC)
print("pages:", doc.page_count)
# sample text from a few pages to detect text layer
for i in [0, 5, 10, 30, doc.page_count-1]:
    t = doc[i].get_text()
    print(f"---- page {i} len={len(t)} ----")
    print(repr(t[:200]))