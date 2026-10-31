import json,re,os,html as H
src=open('../profile-2026-11/highlight-covers-pixel-extra/gen.py').read()
src=src.split("labels=")[0]
ns={};exec(src,ns);I=ns['I']
I['skisr']=["#...........","##..........","#+#.........","#++#........","#+++#.......","#++++#......","#+++++#.....","#++++++#....","#+++++++#...","#++++#####..","#+#+#.......","##..#+#.....","#...#+#.....",".....#+#....",".....###...."]
I['dasntacner']=["..############..","..#..........#..","..#....+.....#..","..#....++....#..","..#....+++...#..","..#....++....#..","..#....+.....#..","..#..........#..","..############..",".##############.","################"]
I['usanoxner']=["......####......","....########....","..############..","################","..############.+","....########...+","....#......#...+","....#......#..++","....##....##..++",".....######....."]
I['kartsiqner']=[".############.","#............#","#...++..++...#","#..++++++++..#","#..++++++++..#","#...++++++...#","#....++++....#","#.....++.....#","#............#",".#############","..##..........","..#..........."]
I['harcer']=["...######...","..########..",".###....###.",".###....###.","........###.","......####..",".....####...",".....###....",".....###....","............",".....+++....",".....+++...."]
def icon(rows,cls='ic'):
    h=len(rows);w=max(len(r) for r in rows);o=[]
    for y,r in enumerate(rows):
        for x,c in enumerate(r):
            if c in '#+':o.append(f'<rect x="{x}" y="{y}" width="1.02" height="1.02" fill="{"url(#g)" if c=="#" else "#FFD23F"}"/>')
    return f'<svg class="{cls}" viewBox="0 0 {w} {h}" shape-rendering="crispEdges" style="aspect-ratio:{w}/{h}">{"".join(o)}</svg>'
E=H.escape
def t(s):  # *x* -> gradient em, [x] -> yellow placeholder
    s=E(s);s=re.sub(r'\*(.+?)\*',r'<em>\1</em>',s,flags=re.S);s=re.sub(r'\[(.+?)\]',r'<span class="fill">[\1]</span>',s);return s.replace('\n','<br>')
def frame(f):
    k=f['k'];o=''
    if k=='cover':
        o+=f'<div class="big">{icon(f["ic"],"bigic")}</div><h1>{t(f["h"])}</h1>'
        if f.get('p'):o+=f'<p class="lead">{t(f["p"])}</p>'
        if f.get('tags'):o+='<div class="tags">'+''.join(f'<span>{t(x)}</span>' for x in f['tags'])+'</div>'
    elif k=='list':
        o+=f'<h1 class="sm">{t(f["h"])}</h1>'
        if f.get('p'):o+=f'<p class="lead">{t(f["p"])}</p>'
        o+='<div class="cards">'+''.join(f'<div class="card"><b>{t(a)}</b>'+(f'<span>{t(b)}</span>' if b else '')+'</div>' for a,b in f['items'])+'</div>'
    elif k=='steps':
        o+=f'<h1 class="sm">{t(f["h"])}</h1><div class="cards">'+''.join(f'<div class="card st"><i>{n+1}</i><div><b>{t(a)}</b><span>{t(b)}</span></div></div>' for n,(a,b) in enumerate(f['items']))+'</div>'
    elif k=='chips':
        o+=f'<h1 class="sm">{t(f["h"])}</h1>'
        if f.get('p'):o+=f'<p class="lead">{t(f["p"])}</p>'
        o+='<div class="chips">'+''.join(f'<span>{t(x)}</span>' for x in f['items'])+'</div>'
    elif k=='stats':
        o+=f'<h1 class="sm">{t(f["h"])}</h1><div class="stats">'+''.join(f'<div class="stat"><b>{t(a)}</b><span>{t(b)}</span></div>' for a,b in f['items'])+'</div>'
    elif k=='qa':
        o+=f'<div class="qlabel">ՀԱՐՑ</div><h1 class="q">{t(f["q"])}</h1><div class="ans"><div class="qlabel y">ՊԱՏԱՍԽԱՆ</div><p>{t(f["a"])}</p></div>'
    elif k=='photo':
        o+=f'<h1 class="sm">{t(f["h"])}</h1><div class="ph"><div>{icon(I["daserits"],"phic")}<b>ՏԵՂԱԴՐԻՐ {E(f.get("what","ՆԿԱՐԸ"))}</b><span>{t(f.get("note","Instagram-ում ավելացրու նկարը այս հատվածի վրա"))}</span></div></div>'
        if f.get('p'):o+=f'<p class="lead c">{t(f["p"])}</p>'
    elif k=='quote':
        o+=f'<h1 class="sm">{t(f["h"])}</h1><div class="quote"><div class="qm">“</div><p>{t(f["q"])}</p><div class="who"><div class="av"></div><div><b>{t(f["n"])}</b><span>{t(f["r"])}</span></div></div></div>'
    elif k=='cta':
        o+=f'<div class="big">{icon(f["ic"],"bigic")}</div><h1 class="sm">{t(f["h"])}</h1>'
        if f.get('p'):o+=f'<p class="lead">{t(f["p"])}</p>'
        o+=f'<div class="ctabox"><span class="pill">{t(f["btn"])}</span>'+(f'<p class="hint">{t(f["hint"])}</p>' if f.get('hint') else '')+'</div>'
    return o
SITE="Սեղմիր հղմանը ↓"
LINK_NOTE=SITE
D=json.load(open('content.json'))
css=open('style.css').read()
out=['<!doctype html><html lang="hy"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@400;500;600;700;800&family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet"><style>'+css+'</style></head><body><svg width="0" height="0" style="position:absolute"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="16" y2="16"><stop offset="0" stop-color="#E43B25"/><stop offset=".55" stop-color="#E84F8B"/><stop offset="1" stop-color="#E86AE0"/></linearGradient></defs></svg>']
ids=[]
for hi,h in enumerate(D):
    n=len(h['frames'])
    for fi,f in enumerate(h['frames']):
        f.setdefault('ic',I[h['icon']])
        fid=f"{h['slug']}-{fi+1}";ids.append([h['slug'],fid])
        out.append(f'<section class="s" id="{fid}"><div class="logo"><svg viewBox="0 0 52 52" fill="none"><rect x="5" y="5" width="42" height="42" stroke="#fff" stroke-width="9"/></svg><div><b>PIXEL</b><i>ACADEMY</i></div></div><div class="hl">{icon(I[h["icon"]],"tinyic")}<span>{E(h["title"])}</span><em>{fi+1}/{n}</em></div><div class="body">{frame(f)}</div></section>')
out.append('</body></html>')
open('stories.html','w').write(''.join(out));json.dump(ids,open('ids.json','w'))
print(len(ids),'frames')
