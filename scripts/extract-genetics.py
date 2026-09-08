import pymupdf, glob, os

DIR = "./src/source_pdfs: "
matches = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "医学遗传学" in p]
for m in matches:
    print("MATCH:", repr(m))
if not matches:
    raise SystemExit("no genetics pdf found")

SRC = matches[0]
OUT = "./scripts/genetics-text.txt"
doc = pymupdf.open(SRC)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(f"# PDF_PAGE_COUNT={doc.page_count}\n")
    for i, page in enumerate(doc, start=1):
        f.write(f"\n===== PDF_PAGE_{i:03d} =====\n")
        f.write(page.get_text("text"))
print("pages:", doc.page_count)
print("bytes:", os.path.getsize(OUT))
print("toc items:", len(doc.get_toc()))