import json, re

slices = json.load(open("scripts/histo-chap-slices.json", encoding="utf-8"))
summary = slices["summary"]
order = slices["order"]

def exercise_chars(text, name):
    # find the 习题 heading; prefer the standalone line heading
    idx = text.find("\n习题")
    if idx < 0:
        idx = text.find("习题")
    if idx < 0:
        return 0
    return len(text[idx:])

rows = []
total_ex = 0
for name in order:
    ex = exercise_chars(summary[name].get("_text", ""), name) if False else 0
    rows.append(0)

# recompute with raw texts
import os
data = {}
for name in order:
    p = f"scripts/histo-snippets/{name}.txt"
    raw = open(p, encoding="utf-8").read()
    summary[name]["_text_len"] = len(raw)
    idx = raw.find("\n习题")
    if idx < 0:
        idx = raw.find("习题")
    ex = len(raw[idx:]) if idx >= 0 else 0
    summary[name]["ex_chars"] = ex
    data[name] = raw

total_ex = sum(summary[n]["ex_chars"] for n in order)
print(f"TOTAL exercise chars: {total_ex}")

# proportional budget round(600*ex/total)
budget = {}
alloc = 0
for name in order:
    b = round(600 * summary[name]["ex_chars"] / total_ex)
    budget[name] = b
    alloc += b

print(f"allocated sum: {alloc}")
for name in order:
    s = summary[name]
    print(f"{name:38} ex_chars {s['ex_chars']:>6}  budget {budget[name]:>3}")

with open("scripts/histo-budget.json", "w", encoding="utf-8") as f:
    json.dump({"budget": budget, "total_exercise_chars": total_ex, "allocated_sum": alloc}, f, ensure_ascii=False, indent=1)