import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
src = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "组织学与胚胎学" in p][0]
print("SRC:", src)
doc = pymupdf.open(src)
print("PAGES:", doc.page_count)
with open("scripts/histo-text.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(doc):
        f.write(f"\n===== PDF_PAGE_{i+1:03d} =====\n")
        f.write(page.get_text("text"))
print("text dumped")
# print page labels
print("--- labels (first 30) ---")
for i in range(min(30, doc.page_count)):
    try:
        print(f"page{i+1}: label={doc._page_label(i) if hasattr(doc,'_page_label') else ''}")
    except Exception as e:
        print(i+1, e)