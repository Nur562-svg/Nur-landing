import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
SRC = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "药理" in p and "配套第九版" in p][0]
doc = pymupdf.open(SRC)
OUT = "scripts/pharmaco-front"
os.makedirs(OUT, exist_ok=True)
zoom = 4.0
mat = pymupdf.Matrix(zoom, zoom)
for i in range(14):
    pix = doc[i].get_pixmap(matrix=mat)
    pix.save(f"{OUT}/p{i+1:03d}.png")
print("rendered 14 front pages")
