import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
SRC = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "医学微生物学" in p][0]
print("SRC:", repr(SRC))
doc = pymupdf.open(SRC)
OUT = "scripts/microbio-png"
os.makedirs(OUT, exist_ok=True)
print("pages:", doc.page_count)
zoom = 4.0
mat = pymupdf.Matrix(zoom, zoom)
for i, page in enumerate(doc, start=1):
    pix = page.get_pixmap(matrix=mat)
    pix.save(f"{OUT}/p{i:03d}.png")
print("rendered")
