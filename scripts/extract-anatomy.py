import pymupdf, glob, os, re
DIR = "./src/source_pdfs: "
SRC = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "系统解剖" in p][0]
print("SRC:", repr(SRC))
doc = pymupdf.open(SRC)
OUT = "./scripts/anatomy-text.txt"
with open(OUT, "w", encoding="utf-8") as f:
    f.write(f"# PDF_PAGE_COUNT={doc.page_count}\n")
    for i, page in enumerate(doc, start=1):
        f.write(f"\n===== PDF_PAGE_{i:03d} =====\n")
        f.write(page.get_text("text"))
print("pages:", doc.page_count)
print("bytes:", os.path.getsize(OUT))
print("toc entries:", len(doc.get_toc()))
for lvl, title, page in doc.get_toc():
    print(f"  {lvl}\t{page}\t{title}")