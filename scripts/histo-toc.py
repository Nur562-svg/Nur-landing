import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
src = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "组织学与胚胎学" in p][0]
doc = pymupdf.open(src)
toc = doc.get_toc()
print("=== TOC (level, page, title) ===")
for t in toc:
    lvl, title, page = t
    print(f"{lvl} | p{page} | {title}")