import re, glob, collections

files = sorted(
    glob.glob("src/content/courses/neurology/extracted-neurology-ch*.ts"),
    key=lambda p: int(re.search(r"ch(\d+)", p).group(1)),
)

def parse_strings(block):
    return re.findall(r'"((?:[^"\\]|\\.)*)"', block)

errors = []
a1_total = 0
b1_total = 0
kinds = collections.Counter()
for fp in files:
    txt = open(fp, encoding="utf-8").read()
    for m in re.finditer(r'questionKind:\s*"([^"]+)"', txt):
        kinds[m.group(1)] += 1
    idxs = [m.start() for m in re.finditer(r'id:\s*"ext-neurology-[^"]+"', txt)]
    for i, start in enumerate(idxs):
        brace = txt.rfind("{", 0, start)
        end = idxs[i + 1] if i + 1 < len(idxs) else len(txt)
        block = txt[brace:end]
        if "sharedChoices:" in block and "members:" in block:
            continue
        if "correctChoiceIndex:" not in block:
            continue
        cci = int(re.search(r"correctChoiceIndex:\s*(\d+)", block).group(1))
        if "choices:" in block:
            cm = re.search(r"choices:\s*\[(.*?)\]", block, re.S)
            choices = parse_strings(cm.group(1))
            a1_total += 1
            am = re.search(r"content:\s*\[(.*?)\]", block, re.S)
            ans0 = parse_strings(am.group(1))[0] if am else ""
            if cci >= len(choices):
                errors.append(f"{fp}: a1 cci {cci} out of range ({len(choices)} choices)")
            elif choices[cci] != ans0:
                errors.append(f"{fp}: a1 mismatch cci={cci} choice={choices[cci]!r} answer={ans0!r}")
        else:
            gstart = txt.rfind("sharedChoices:", 0, brace)
            gbrace = txt.rfind("{", 0, gstart)
            gend = txt.find("members:", gstart)
            gblock = txt[gbrace:gend]
            gm = re.search(r"sharedChoices:\s*\[(.*?)\]", gblock, re.S)
            shared = parse_strings(gm.group(1)) if gm else []
            b1_total += 1
            am = re.search(r"content:\s*\[(.*?)\]", block, re.S)
            ans0 = parse_strings(am.group(1))[0] if am else ""
            if cci >= len(shared):
                errors.append(f"{fp}: b1 cci {cci} out of range ({len(shared)} shared)")
            elif shared[cci] != ans0:
                errors.append(f"{fp}: b1 mismatch cci={cci} choice={shared[cci]!r} answer={ans0!r}")

print("questionKind counts (incl group-level b1):", dict(kinds))
print(f"a1 items checked: {a1_total}")
print(f"b1 members checked: {b1_total}")
print(f"mismatch/out-of-range errors: {len(errors)}")
for e in errors[:40]:
    print("  ", e)
