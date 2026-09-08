import json

budget = json.load(open("scripts/pharmaco-budget.json", encoding="utf-8"))["budget"]
slices = json.load(open("scripts/pharmaco-chap-slices.json", encoding="utf-8"))
summary = slices["summary"]
for n in slices["order"]:
    raw = open(f"scripts/pharmaco-snippets/{n}.txt", encoding="utf-8").read()
    s, e = summary[n]["start"], summary[n]["end"]
    hdr = f"TITLE: {n}\nPDF_PAGES: {s}-{e}\nCHARS: {summary[n]['chars_total']}\nBUDGET: {budget[n]}\n=====\n"
    open(f"scripts/pharmaco-snippets/{n}.txt", "w", encoding="utf-8").write(hdr + raw)
print("headers written")
for n in slices["order"]:
    print(f"{n} {budget[n]}")
