import json
class C:
    def __init__(s,w,h): s.w,s.h=w,h; s.g=[['.']*w for _ in range(h)]
    def p(s,x,y,c='#'):
        if 0<=x<s.w and 0<=y<s.h: s.g[y][x]=c
    def rect(s,x,y,w,h,c='#'):
        for i in range(x,x+w): s.p(i,y,c); s.p(i,y+h-1,c)
        for j in range(y,y+h): s.p(x,j,c); s.p(x+w-1,j,c)
    def fill(s,x,y,w,h,c='#'):
        for j in range(y,y+h):
            for i in range(x,x+w): s.p(i,j,c)
    def line(s,x0,y0,x1,y1,c='#'):
        dx,dy=abs(x1-x0),-abs(y1-y0);sx=1 if x0<x1 else -1;sy=1 if y0<y1 else -1;e=dx+dy
        while True:
            s.p(x0,y0,c)
            if x0==x1 and y0==y1: break
            e2=2*e
            if e2>=dy: e+=dy;x0+=sx
            if e2<=dx: e+=dx;y0+=sy
    def rows(s): return [''.join(r) for r in s.g]
def grid(rows): return rows
I={}
# UX/UI: phone with layout
c=C(10,16);c.rect(0,0,10,16);c.fill(2,2,6,4,'+');c.fill(2,7,3,1);c.fill(2,9,2,2);c.fill(5,9,3,2);c.fill(4,13,2,1);I['ux-ui']=c.rows()
# Graphic design: pen tool nib
I['grafik']=["....##....","...#..#...","..#....#..",".#......#.",".#..++..#.",".#..++..#.",".#......#.","..#....#..","..#....#..","...#..#...","...####...","..######..","..#....#..","..######.."]
# AI: sparkle
I['ai']=[".......#.....+.",".......#....+++","......###....+.","......###......",".....#####.....","....#######....","###############","....#######....",".....#####.....","......###......","......###......",".......#.......",".......#......."]
# Claude Code: </>
c=C(16,9)
for dx in (0,1):
    c.line(3+dx,0,0+dx,4);c.line(0+dx,4,3+dx,8);c.line(12-dx,0,15-dx,4);c.line(15-dx,4,12-dx,8)
c.line(9,0,6,8,'+');c.line(10,0,7,8,'+');I['claude-code']=c.rows()
# Webinar: video camera
c=C(16,10);c.rect(0,1,11,8);c.fill(2,3,2,2,'+');c.line(11,4,15,1);c.line(11,5,15,8);c.line(15,1,15,8);I['vebinar']=c.rows()
# Mentors: person
I['mentorner']=["....####....","...######...","...######...","...######...","....####....","............","..########..",".##########.","############","############"]
# Certificates: document + medal
c=C(14,14);c.rect(0,0,11,13);c.fill(2,2,7,1);c.fill(2,4,5,1);c.fill(2,6,6,1);c.fill(9,8,4,4,'+');c.p(9,8,'.');c.p(12,8,'.');c.p(9,11,'.');c.p(12,11,'.');c.fill(10,12,1,2,'+');c.fill(12,12,1,2,'+');I['vkayakan']=c.rows()
# Works: picture frame
c=C(16,12);c.rect(0,0,16,12);c.fill(11,2,2,2,'+');c.line(1,10,5,5);c.line(5,5,8,8);c.line(8,8,10,6);c.line(10,6,14,10);
for y in range(6,11):
    for x in range(1,15):
        pass
I['ashxatanqner']=c.rows()
# Lesson moments: photo camera
c=C(16,12);c.fill(4,0,5,2);c.rect(0,2,16,10);c.rect(5,4,6,6,'+');c.fill(7,6,2,2,'+');c.p(13,4);I['daserits']=c.rows()
# Offers: percent
c=C(12,12);c.fill(0,0,3,3,'+');c.fill(9,9,3,3,'+')
for d in (0,1): c.line(10+d,0,0+d,11)
I['aktsianer']=c.rows()
# Contact: envelope
c=C(16,11);c.rect(0,0,16,11);c.line(0,0,7,6);c.line(15,0,8,6);c.fill(7,6,2,1,'+');I['kontakt']=c.rows()
# SMM: megaphone
c=C(16,12);c.rect(0,4,4,4);c.line(4,4,12,0);c.line(4,7,12,11);c.line(12,0,12,11);c.line(1,8,2,11);c.line(2,8,3,11)
for x,y in [(14,3),(15,2),(14,5),(15,5),(14,6),(15,6),(14,8),(15,9)]: c.p(x,y,'+')
I['smm']=c.rows()
# Vibe coding: lightning bolt
I['vayb-qoding']=[".......####",".....####..","....####...","...####....","..########.","......####.",".....####..","....####...","...###.....","..##.......",".#........."]
labels={'ux-ui':'UX/UI','grafik':'Գրաֆիկ դիզայն','ai':'AI','claude-code':'Claude Code','vebinar':'Վեբինարներ','mentorner':'Մենթորներ','vkayakan':'Վկայականներ','ashxatanqner':'Աշխատանքներ','daserits':'Դասերից','aktsianer':'Ակցիաներ','kontakt':'Կոնտակտ','smm':'SMM','vayb-qoding':'Վայբ քոդինգ'}
sparks=[(-3,-2),(-2,-3),(17,1),(18,0),(16,15),(-2,14)]
def svg(rows):
    h=len(rows);w=max(len(r) for r in rows);G=18;ox=(G-w)/2;oy=(G-h)/2;o=[]
    for y,r in enumerate(rows):
        for x,ch in enumerate(r):
            if ch in '#+': o.append(f'<rect x="{x+ox}" y="{y+oy}" width="1.02" height="1.02" fill="{"url(#g)" if ch=="#" else "#FFD23F"}"/>')
    for sx,sy in sparks: o.append(f'<rect x="{sx+1}" y="{sy+1.5}" width=".9" height=".9" fill="#FFD23F" opacity=".9"/>')
    return f'<svg viewBox="-3 -2 24 22" shape-rendering="crispEdges"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="18" y2="18"><stop offset="0" stop-color="#E43B25"/><stop offset=".55" stop-color="#E84F8B"/><stop offset="1" stop-color="#E86AE0"/></linearGradient></defs>{"".join(o)}</svg>'
css='''<style>*{margin:0;padding:0}body{display:flex;flex-wrap:wrap;gap:20px;padding:20px;background:#444}
.c{width:1080px;height:1920px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:#0E0E0E}
.c:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:40px 40px;background-position:center}
.c svg{width:820px;position:relative}</style>'''
names=list(I)
for i,n in enumerate(names,6):
    pass
html='<meta charset=utf-8>'+css+''.join(f'<div class="c" id="h{i}">{svg(I[n])}</div>' for i,n in enumerate(names))
open('covers.html','w').write(html)
files=[f'{i+6:02d}-{n}' for i,n in enumerate(names)]
json.dump(files,open('files.json','w'))
p='<meta charset=utf-8><body style="margin:0;background:#fff;font-family:sans-serif"><div id=p style="display:inline-grid;grid-template-columns:repeat(5,140px);gap:22px 20px;padding:24px">'
old=[('../highlight-covers-pixel/b-01-skisr-aystegh','Սկսիր այստեղ'),('../highlight-covers-pixel/b-02-dasntacner','Դասընթացներ'),('../highlight-covers-pixel/b-03-usanoxner','Ուսանողներ'),('../highlight-covers-pixel/b-04-kartsiqner','Կարծիքներ'),('../highlight-covers-pixel/b-05-harcer','Հարցեր')]
allc=old+[(f,labels[n]) for f,n in zip(files,names)]
p+=''.join(f'<div style="text-align:center;font-size:14px"><div style="width:124px;height:124px;border-radius:50%;padding:4px;border:2px solid #ddd;margin:auto"><div style="width:100%;height:100%;border-radius:50%;background:url({f}.png) center/cover"></div></div><div style="margin-top:8px">{l}</div></div>' for f,l in allc)
open('preview.html','w').write(p+'</div>')
