import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
SRC = [p for p in glob.glob(os.path.join(DIR, "*.pdf")) if "药理" in p and "配套第九版" in p][0]
print("SRC:", repr(SRC))
doc = pymupdf.open(SRC)
print("pages:", doc.page_count)
print("metadata:", doc.metadata.get("title"), "|", doc.metadata.get("producer"))
toc = doc.get_toc(simple=False)
print("toc(simple=False) len:", len(toc))
if toc:
    for t in toc[:40]:
        print(t)
