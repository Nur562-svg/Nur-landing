import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
SRC = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "药理" in p and "配套第九版" in p][0]
print("SRC:", repr(SRC))
doc = pymupdf.open(SRC)
print("pages:", doc.page_count)
print("has TOC:", doc.get_toc() is not None, "len:", len(doc.get_toc()) if doc.get_toc() else 0)

# text layer probe: sample a few pages
for pno in [0, 5, 10, 20, 40, 80, 120, 160, 200, doc.page_count - 1]:
    txt = doc[pno].get_text().strip()
    print(f"p{pno+1}: text_len={len(txt)} preview={txt[:60]!r}")

# toc first 60
toc = doc.get_toc()
print("=== TOC first 80 ===")
for i, (lvl, title, page) in enumerate(toc[:80]):
    print(i, lvl, title, page)
