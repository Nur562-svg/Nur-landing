import os
import pymupdf

SRC = "/Users/nukeab/Downloads/2026~2027第一学年下学期学习资料/中医诊断学/中医诊断学选择.pdf"
print("SRC:", SRC)
doc = pymupdf.open(SRC)
OUT = "scripts/tcmdx-png"
os.makedirs(OUT, exist_ok=True)
print("pages:", doc.page_count)
zoom = 4.0
mat = pymupdf.Matrix(zoom, zoom)
for i, page in enumerate(doc, start=1):
    pix = page.get_pixmap(matrix=mat)
    pix.save(f"{OUT}/p{i:03d}.png")
print("rendered")