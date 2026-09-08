import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
SRC = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "医学免疫学" in p][0]
doc = pymupdf.open(SRC)
print("pages:", doc.page_count)
for lvl, title, page in doc.get_toc():
    if lvl <= 2:
        print(f"{lvl} | p{page} | {title}")