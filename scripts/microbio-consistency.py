import re, glob, json

files = sorted(
    glob.glob("src/content/courses/microbiology/extracted-microbiology-ch*.ts"),
    key=lambda p: int(re.search(r"ch(\d+)", p).group(1)),
)

def parse_strings(block):
    # extract all double-quoted strings (handles simple escapes)
    return re.findall(r'"((?:[^"\\]|\\.)*)"', block)

errors = []
a1_total = 0
b1_total = 0
for fp in files:
    txt = open(fp, encoding="utf-8").read()
    # Split into top-level item objects by scanning for '{' at 2-space indent followed by id:
    # Simpler: iterate over matches of 'id: "..."' and capture the object until next 'id:' at same level.
    # We'll do a bracket-matching parse.
    # Find all occurrences of 'id: "ext-...' and slice the enclosing {...} block.
    idxs = [m.start() for m in re.finditer(r'id:\s*"ext-microbiology-[^"]+"', txt)]
    for i, start in enumerate(idxs):
        # find the '{' that opens this object: search backwards from start for the nearest '{'
        brace = txt.rfind("{", 0, start)
        end = idxs[i + 1] if i + 1 < len(idxs) else len(txt)
        block = txt[brace:end]
        # determine if it's a group (has sharedChoices) or member (has correctChoiceIndex)
        if "sharedChoices:" in block and "members:" in block:
            continue  # group-level, skip
        if "correctChoiceIndex:" not in block:
            continue  # term/fill/short, skip
        # a1 item or b1 member
        cci = int(re.search(r"correctChoiceIndex:\s*(\d+)", block).group(1))
        if "choices:" in block:
            # a1 item: choices array
            cm = re.search(r"choices:\s*\[(.*?)\]", block, re.S)
            choices = parse_strings(cm.group(1))
            a1_total += 1
            # answer content[0]
            am = re.search(r"content:\s*\[(.*?)\]", block, re.S)
            ans0 = parse_strings(am.group(1))[0] if am else ""
            if cci >= len(choices):
                errors.append(f"{fp}: a1 cci {cci} out of range ({len(choices)} choices)")
            elif choices[cci] != ans0:
                errors.append(f"{fp}: a1 mismatch cci={cci} choice={choices[cci]!r} answer={ans0!r}")
        else:
            # b1 member: sharedChoices from the enclosing group
            # find the group's sharedChoices by searching backward
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

print(f"a1 items checked: {a1_total}")
print(f"b1 members checked: {b1_total}")
print(f"mismatch/out-of-range errors: {len(errors)}")
for e in errors[:40]:
    print("  ", e)
