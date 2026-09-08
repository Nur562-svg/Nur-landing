import pymupdf

SRC = "src/source_pdfs: /15.生物化学与分子生物学学习指导与习题集-全书签.pdf"
doc = pymupdf.open(SRC)
toc = doc.get_toc()
print("TOC entries:", len(toc))
for lvl, title, page in toc:
    print(f"{lvl}  p{page:>3}  {title}")