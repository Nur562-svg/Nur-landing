import re, os
lines=open('scripts/ocr/anatomy-ocr.txt',encoding='utf-8').read().splitlines()
CN=['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十']
def ord_to_num(o): return CN.index(o)+1
page=[0]*len(lines); cur=0
for i,l in enumerate(lines):
    m=re.match(r'===== PDF_PAGE_(\d+) =====',l)
    if m: cur=int(m.group(1))
    page[i]=cur
matches=[]
for i,l in enumerate(lines):
    s=l.strip()
    m=re.match(r'^•*第\s*([一二三四五六七八九十]+)\s*章\s*(.*)$', s)
    if m:
        gap='   '.join(lines[max(0,i-1):i+2])
        matches.append((i, ord_to_num(m.group(1)), m.group(2).strip('• ')))
# runs of consecutive same ordinal
runs=[];培=None
runs=[]
start=0
for i in range(1,len(matches)+1):
    if i==len(matches) or matches[i][1]!=matches[i-1][1]:
        runs.append((start,i-1)); start=i
# content runs: those with pdf page >= threshold 10
CONTENT_THRESHOLD=11
content=[]
for (a,b) in runs:
    if page[matches[a][0]]>=CONTENT_THRESHOLD:
        content.append((a,b,matches[a][1]))
# group content runs into chapters by ordinal
chapters={}
for (a,b,ordn) in content:
    chapters.setdefault(ordn,[]).append((a,b))
os.makedirs('scripts/anatomy-snippets',exist_ok=True)
summary={}
for ordn in chapters:
    segs=chapters[ordn]
    a=segs[0][0]; b=segs[-1][1]
    name=matches[a][2].strip() or f'ch{ordn}'
    start_line=matches[a][0]; end_line=matches[b][0]
    txt='\n'.join(lines[start_line:end_line+1])
    chars=len(txt); pmin=page[start_line]; pmax=page[end_line]
    summary[ordn]=(name,chars,pmin,pmax)
    fn=f'scripts/anatomy-snippets/ch{ordn}.txt'
    with open(fn,'w',encoding='utf-8') as f:
        f.write(f'TITLE: {name}\nPDF_PAGES: {pmin}-{pmax}\nCHARS: {chars}\n=====\n')
        f.write(txt)
# print
for ordn in sorted(summary):
    name,chars,pmin,pmax=summary[ordn]
    print(f'ch{ordn:2d} {name:<20} chars={chars:<6d} pdf={pmin}-{pmax}')
# budget over 1..18
base=sum(c[1] for o,c in summary.items() if o<=18)
bud={};tot=0
for o,c in summary.items():
    if o>18: bud[o]=0; continue
    q=round(600*c[1]/base); bud[o]=q; tot+=q
print('base(1..18)=',base,'budget sum=',tot)
for o in sorted(bud): print(f'  ch{o:2d}={bud[o]:3d}')
import json
json.dump({'summary':{str(k):v for k,v in summary.items()},'budget':{str(k):v for k,v in bud.items()}},open('scripts/anatomy-meta.json','w'))