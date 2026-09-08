import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
src = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "医学细胞生物学" in p][0]
print("SRC:", src)
doc = pymupdf.open(src)
print("PAGES:", doc.page_count)
with open("scripts/cellbio-text.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(doc):
        f.write(f"\n===== PDF_PAGE_{i+1:03d} =====\n")
        f.write(page.get_text("text"))
print("=== TOC ===")
for lvl, title, page in doc.get_toc():
    print(f"{lvl} | p{page} | {title}")