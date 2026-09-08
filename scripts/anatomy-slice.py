import re
lines=open('scripts/ocr/anatomy-ocr.txt',encoding='utf-8').read().splitlines()
# find chapter headings: "^第X章..."
chaps=[]
for i,l in enumerate(lines):
    m=re.match(r'^•*第\s*([一二三四五六七八九十百]+)\s*章\s*([^\n]+)', l.strip())
    if m:
        chaps.append((i, m.group(1), m.group(2).strip('• ')))
# fix last answer boundary
chaps.append((len(lines), 'END', 'END'))
print(f'found {len(chaps)-1} chapters')
for i, (start, ord, name) in enumerate(chaps[:-1]):
    end = chaps[i+1][0]
    text = '\n'.join(lines[start:end])
    name_clean=re.sub(r'\s+','-',name)
    name_clean=name_clean.replace('•','').replace(',','').strip('-')
    if not name_clean: name_clean=f'ch{i}'
    with open(f'scripts/anatomy-snippets/ch{i}_{name_clean}.txt','w',encoding='utf-8') as f:
        f.write(f'TITLE: {name_clean}\n=====\n')
        f.write(text)
    chars=len(text)
    print(f'{i:2d}  {ord:>2}章  {name:<20} chars={chars:<5d}  pages ~{i+1}')