import glob, os
import pymupdf

DIR = "./src/source_pdfs: "
cands = [
    "5.医学免疫学学习指导与习题集-第3版-全书签.pdf",
    "6.医学微生物学学习指导与习题集-第2版-全书签.pdf",
    "25.病理学学习指导与习题集-全书签.pdf",
    "23.局部解剖学学习指导与习题集-全书签.pdf",
    "16.药理学习指导与习题集配套第九版-全书签.pdf",
    "24.口腔科学学习指导与习题集-全书签.pdf",
]
for name in cands:
    p = os.path.join(DIR, name)
    if not os.path.exists(p):
        print(f"{name[:34]:36} MISSING"); continue
    doc = pymupdf.open(p)
    sample_chars = []
    # sample 12 pages spread across document
    n = doc.page_count
    for idx in [0, 1, n//4, n//2, (3*n)//4, n-1]:
        try:
            t = doc[idx].get_text("text")
            sample_chars.append(len(t.strip()))
        except Exception as e:
            sample_chars.append(-1)
    printable = doc[10].get_text("text").strip()[:40].replace("\n"," ") if n>10 else ""
    print(f"{name[:32]:34} pages={n:<4} sample_chars={sample_chars} page11_preview='{printable}'")