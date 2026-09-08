import re, os, json

os.makedirs("scripts/biochem-snippets", exist_ok=True)
raw = open("scripts/biochem-text.txt", encoding="utf-8").read()
# pages keyed by number
parts = re.split(r"===== PDF_PAGE_(\d{3}) =====\n", raw)
pages = {}
for i in range(1, len(parts), 2):
    pages[int(parts[i])] = parts[i+1]

meta = json.load(open("scripts/biochem-meta.json", encoding="utf-8"))
summary = meta["summary"]
budget = meta["budget"]
names = list(summary.keys())
# build ordered chapter list with start/end and budget
for i, name in enumerate(names):
    d = summary[name]
    start, end = d["start"], d["end"]
    body = "".join(str(pages[p]) for p in range(start, end+1) if p in pages)
    chars = len(re.sub(r"\s", "", body))
    with open(f"scripts/biochem-snippets/ch{i+1}.txt", "w", encoding="utf-8") as f:
        f.write(f"TITLE: {name}\nPDF_PAGES: {start}-{end}\nCHARS: {chars}\nBUDGET: {budget[name]}\n=====\n{body}\n")
print("wrote", len(names), "snippets")
import glob
for f in sorted(glob.glob("scripts/biochem-snippets/ch*.txt"), key=lambda p:int(re.search(r"ch(\d+)",p).group(1))):
    print(f, os.path.getsize(f))