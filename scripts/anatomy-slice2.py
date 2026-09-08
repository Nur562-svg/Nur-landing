import re
lines=open('scripts/ocr/anatomy-ocr.txt',encoding='utf-8').read().splitlines()
CN=['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十']
def ord_to_num(o):
    idx=CN.index(o)
    return idx+1
# track pdf page per line
page=[0]*len(lines); cur=0
for i,l in enumerate(lines):
    m=re.match(r'===== PDF_PAGE_(\d+) =====',l)
    if m: cur=int(m.group(1))
    page[i]=cur
# header matches
matches=[]
for i,l in enumerate(lines):
    s=l.strip()
    m=re.match(r'^•*第\s*([一二三四五六七八九十]+)\s*章\s*(.*)$', s)
    if m:
        # skip header offset lines that are page footers/numbers
        matches.append((i, ord_to_num(m.group(1)), m.group(2).strip('• ')))
# group runs of same ordinal
runs=[]
start=0; ords=[m[1] for m in matches]
for i in range(1,len(matches)+1):
    if i==len(matches) or matches[i][1]!=matches[i-1][1]:
        runs.append((start,i-1)); start=i
# content runs = after 目录. 目录 = first 19 runs (ordinal 1..19 once)
content_runs=[]
for (a,b) in runs:
    if matches[a][1]==1 and a>0:  # first content run of ch1 = any ch1 run not the 目录 one (index 0)
        pass
# simpler: 目录 is exactly runs where the run spans the single 目录 lines; content starts at the 2nd run of ordinal 1
content_runs=[]  # (ord, min_line, max_line, pdftmin, pdfmax, chars)
seen={}
for idx,(a,b) in enumerate(runs):
    ord_n=matches[a][1]
    # 目录 run = first run of each ordinal has b==a (single line) AND it is in the 目录 block
first_content={}
for idx,(a,b) in enumerate(runs):
    ord_n=matches[a][1]
    first_content.setdefault(ord_n,idx)
# 目录 runs are those that are the very first run of each ordinal but before content ch1 (second occurrence of ord1)
# Determine content start = second run of ordinal 1
ord1_runs=[idx for idx,(a,b) in enumerate(runs) if matches[a][1]==1]
content_start=ord1_runs[1]  # second ch1 run = content
chapters={}
for idx in range(content_start, len(runs)):
    a,b=runs[idx]; ord_n=matches[a][1]
    chapters.setdefault(ord_n, [])
    chapters[ord_n].append((idx,a,b))
# build output
import os
os.makedirs('scripts/anatomy-snippets',exist_ok=True)
summary={}
for ord_n in sorted(chapters):
    segs=chapters[ord_n]
    a=segs[0][1]; b=segs[-1][2]
    name=matches[a][2].strip().replace('•','').strip() or f'ch{ord_n}'
    txt='\n'.join(lines[a:b+1])
    chars=len(txt); pmin=page[a]; pmax=page[b]
    summary[ord_n]=(name,chars,pmin,pmax)
    fn='骨学' if ord_n==1 else None
    with open(f'scripts/anatomy-snippets/ch{ord_n}.txt','w',encoding='utf-8') as f:
        f.write(f'TITLE: {name}\nPDF_PAGES: {pmin}-{pmax}\nCHARS: {chars}\n=====\n')
        f.write(txt)
    print(f'ch{ord_n:2d}  {name:<22} chars={chars:<6d} pdfpages={pmin}-{pmax}')
# 600 budget across chapters 1..18 (exclude ch19 填图作业)
base=sum(c[1] for o,c in summary.items() if o<=18)
print('EXCLUDE 填图作业 ch19; base chars (1..18) =', base)
bud={}
tot=0
for o,c in summary.items():
    if o>18: bud[o]=0; continue
    q=round(600*c[1]/base); bud[o]=q; tot+=q
for o in sorted(bud):
    print(f'  ch{o:2d} budget={bud[o]:3d}')
print('budget sum =', tot)