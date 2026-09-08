import json, os

budget = json.load(open("scripts/histo-budget.json", encoding="utf-8"))["budget"]
summary = json.load(open("scripts/histo-chap-slices.json", encoding="utf-8"))["summary"]

order = json.load(open("scripts/histo-chap-slices.json", encoding="utf-8"))["order"]
for name in order:
    raw = open(f"scripts/histo-snippets/{name}.txt", encoding="utf-8").read()
    # header
    b = budget[name]
    s, e = summary[name]["start"], summary[name]["end"]
    chars = summary[name]["chars_total"]
    header = f"TITLE: {name} 章{name[-1]}  \nPDF_PAGES: {s}-{e}\nCHARS: {chars}\nBUDGET: {b}\n=====\n"
    with open(f"scripts/histo-snippets/{name}.txt", "w", encoding="utf-8") as f:
        f.write(header + raw)
print("headers written")
for name in order[:3]:
    print("--", name, budget[name])