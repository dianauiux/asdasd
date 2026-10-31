import json
src=open('../highlight-covers-pixel-extra/gen.py').read().split("labels=")[0]
ns={};exec(src,ns);C=ns['C'];I=ns['I']
X={}
c=C(16,12);c.rect(0,0,16,12)
for i,y in enumerate(range(3,9)):
    w=min(i,5-i)+1;c.fill(6,y,w*2-1 if w>1 else 1,1,'+')
X['tutorials']=c.rows()
c=C(16,14);c.line(0,4,7,0);c.line(15,4,8,0);c.fill(0,4,16,1);c.fill(7,2,2,1,'+')
for x in (2,5,9,12): c.fill(x,6,2,6)
c.fill(0,12,16,2);X['hamalsaran']=c.rows()
c=C(16,14);c.rect(0,0,16,10);c.fill(3,6,2,2,'+');c.fill(6,4,2,4,'+');c.fill(9,5,2,3,'+');c.fill(12,2,1,6,'+');c.line(7,10,4,13);c.line(8,10,11,13);X['seminarner']=c.rows()
c=C(15,11);c.rect(0,2,9,9);c.rect(6,0,9,9,'+');X['gortsynker']=c.rows()
c=C(14,14);c.fill(0,0,14,14);c.fill(4,4,6,6,'.');X['mer-masin']=c.rows()
c=C(14,14);c.fill(3,0,8,6);c.rect(0,1,4,4);c.rect(10,1,4,4);c.fill(6,2,2,2,'+');c.fill(4,6,6,1);c.fill(6,7,2,3);c.fill(3,10,8,2);X['expo']=c.rows()
c=C(10,16);c.fill(3,0,4,8);c.p(4,2,'+');c.p(5,4,'+');c.p(4,6,'+');c.line(1,5,1,8);c.line(8,5,8,8);c.line(1,8,3,10);c.line(8,8,6,10);c.fill(3,10,4,1);c.fill(4,11,2,3);c.fill(2,14,6,1);X['harcazruyc']=c.rows()
c=C(16,13);c.fill(0,0,6,2);c.rect(0,2,16,11);c.fill(0,2,16,1);c.rect(3,5,4,5,'+');c.rect(9,5,4,5,'+');c.fill(4,8,2,1,'+');c.fill(10,7,2,2,'+');X['portfolio']=c.rows()
I.update(X)
I['skisr']=["#...........","##..........","#+#.........","#++#........","#+++#.......","#++++#......","#+++++#.....","#++++++#....","#+++++++#...","#++++#####..","#+#+#.......","##..#+#.....","#...#+#.....",".....#+#....",".....###...."]
I['dasntacner']=["..############..","..#..........#..","..#....+.....#..","..#....++....#..","..#....+++...#..","..#....++....#..","..#....+.....#..","..#..........#..","..############..",".##############.","################"]
I['usanoxner']=["......####......","....########....","..############..","################","..############.+","....########...+","....#......#...+","....#......#..++","....##....##..++",".....######....."]
I['kartsiqner']=[".############.","#............#","#...++..++...#","#..++++++++..#","#..++++++++..#","#...++++++...#","#....++++....#","#.....++.....#","#............#",".#############","..##..........","..#..........."]
I['harcer']=["...######...","..########..",".###....###.",".###....###.","........###.","......####..",".....####...",".....###....",".....###....","............",".....+++....",".....+++...."]
# final order: (slug, icon, label, old name, new?)
ORDER=[("01-skisr-aystegh","skisr","Սկսիր այստեղ","Սկսիր այստեղ + About us",0),
("02-dasntacner","dasntacner","Դասընթացներ","Դասընթացներ",0),
("03-usanoxner","usanoxner","Ուսանողներ","Ուսանողներ",0),
("04-kartsiqner","kartsiqner","Կարծիքներ","Կարծիքներ",0),
("05-harcer","harcer","Հարցեր","Հարցեր",0),
("06-mentorner","mentorner","Մենթորներ","Pixel mentors",1),
("07-daserits","daserits","Դասերից","Հ1",1),
("08-ux-ui-khorhurdner","ux-ui","UX/UI հնարքներ","UIUX tricks",1),
("09-tutorialner","tutorials","Թյութորիալներ","YouTube Tutorials",1),
("10-harcazruycner","harcazruyc","Հարցազրույցներ","Students in…",1),
("11-seminarner","seminarner","Սեմինարներ","Seminars",1),
("12-hamalsaranner","hamalsaran","Համալսարաններ","University",1),
("13-gortsynkerner","gortsynker","Գործընկերներ","Partnership",1),
("14-pixel-expo","expo","Pixel Expo","PIXEL EXPO",1),
("15-mer-masin","mer-masin","Մեր մասին","About us",1),
("16-ux-ui","ux-ui","UX/UI","UXUI Level…",1),
("17-portfolio","portfolio","Պորտֆոլիո","նոր",1)]
sparks=[(-3,-2),(-2,-3),(17,1),(18,0),(16,15),(-2,14)]
def svg(rows,v):
    h=len(rows);w=max(len(r) for r in rows);G=18;ox=(G-w)/2;oy=(G-h)/2;o=[]
    main="#fff" if v=="a" else "url(#pg)"
    for y,r in enumerate(rows):
        for x,ch in enumerate(r):
            if ch in '#+': o.append(f'<rect x="{x+ox}" y="{y+oy}" width="1.02" height="1.02" fill="{main if ch=="#" else "#FFD23F"}"/>')
    for sx,sy in sparks: o.append(f'<rect x="{sx+1}" y="{sy+1.5}" width=".9" height=".9" fill="#FFD23F" opacity=".9"/>')
    return f'<svg viewBox="-3 -2 24 22" shape-rendering="crispEdges"><defs><pattern id="pg" patternUnits="userSpaceOnUse" x="0" y="0" width="18" height="18"><image href="../../brand/gradient-icon.png" width="18" height="18" preserveAspectRatio="none"/></pattern><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="18" y2="18"><stop offset="0" stop-color="#E43B25"/><stop offset=".55" stop-color="#E84F8B"/><stop offset="1" stop-color="#E86AE0"/></linearGradient></defs>{"".join(o)}</svg>'
css='''<style>*{margin:0;padding:0}body{display:flex;flex-wrap:wrap;gap:20px;padding:20px;background:#444}
.c{width:1080px;height:1920px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.a{background:#0D0304 url(../../brand/gradient-1080x1920.png) center/cover}.b{background:#0E0E0E}
.c:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:40px 40px;background-position:center}
.c svg{width:820px;position:relative}</style>'''
html='<meta charset=utf-8>'+css;files=[]
for v in "ab":
    for slug,ic,lab,old,new in ORDER:
        html+=f'<div class="c {v}" id="{v}-{slug}">{svg(I[ic],v)}</div>';files.append(f'{v}-{slug}')
open('covers.html','w').write(html);json.dump(files,open('files.json','w'))
p='<meta charset=utf-8><body style="margin:0;background:#111;font-family:sans-serif;color:#fff"><div id=p style="padding:28px">'
for v,tt in (("a","A · Գրադիենտ (ինչպես արդեն դրած 5-ը)"),("b","B · Սև")):
    p+=f'<div style="font-weight:700;margin:6px 0 16px">{tt}</div><div style="display:grid;grid-template-columns:repeat(8,128px);gap:20px 16px;margin-bottom:28px">'
    p+=''.join(f'<div style="text-align:center;font-size:13px"><div style="width:112px;height:112px;border-radius:50%;padding:4px;border:2px solid {"#E84F8B" if new else "#444"};margin:auto"><div style="width:100%;height:100%;border-radius:50%;background:url({v}-{s}.png) center/cover"></div></div><div style="margin-top:8px">{l}</div><div style="color:#888;font-size:11px;margin-top:2px">{o}</div></div>' for s,i,l,o,new in ORDER)+'</div>'
open('preview.html','w').write(p+'</div>');json.dump(ORDER,open('order.json','w'),ensure_ascii=False)
