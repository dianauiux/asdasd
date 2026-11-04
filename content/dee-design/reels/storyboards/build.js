const fs=require('fs');
// figure: mood: neutral|smile|tired|shock ; look: screen|camera ; hands: type|face|count|phone|none ; night bool ; extra
function fig(o){
  const ink='#1d1d1f', night=o.night;
  const bg=night?'#22232a':'#f6f3ee', line=night?'#e9e6e0':ink;
  const glow=night?`<radialGradient id="g${o.id}" cx="50%" cy="62%" r="55%"><stop offset="0" stop-color="#ff7a30" stop-opacity=".45"/><stop offset="1" stop-color="#ff7a30" stop-opacity="0"/></radialGradient><rect width="270" height="480" fill="url(#g${o.id})"/>`:'';
  const hx=o.look==='camera'?135:122;
  let mouth={neutral:`<path d="M${hx-9} 214 h18"/>`,smile:`<path d="M${hx-10} 211 q10 9 20 0"/>`,tired:`<path d="M${hx-9} 216 q9 -6 18 0"/>`,shock:`<ellipse cx="${hx}" cy="214" rx="5" ry="7"/>`}[o.mood];
  let eyes=o.look==='camera'?`<circle cx="${hx-10}" cy="194" r="2.6" fill="${line}"/><circle cx="${hx+10}" cy="194" r="2.6" fill="${line}"/>`:`<circle cx="${hx-13}" cy="196" r="2.6" fill="${line}"/><circle cx="${hx+5}" cy="196" r="2.6" fill="${line}"/>`;
  let brows=o.brow==='up'?`<path d="M${hx-16} 182 q6 -7 12 -2"/><path d="M${hx+4} 186 h12"/>`:(o.mood==='tired'?`<path d="M${hx-16} 186 l11 -3"/><path d="M${hx+5} 183 l11 3"/>`:'');
  let hair=o.messy?`<path d="M${hx-34} 196 q-6 -52 34 -56 q42 2 36 58" /><path d="M${hx-10} 140 l-6 -12 M${hx+6} 140 l4 -14 M${hx+20} 146 l10 -10"/>`:`<path d="M${hx-34} 200 q-6 -56 34 -58 q42 2 36 60 l4 40" /><path d="M${hx-34} 200 l-4 40"/>`;
  let face=o.hands==='face'?`<path d="M${hx-30} 230 q0 -40 22 -44 M${hx+30} 230 q0 -40 -22 -44" stroke-width="7"/>`:'';
  let hands={type:`<path d="M90 300 l40 18 M180 300 l-40 18" />`,count:`<path d="M90 300 l40 18"/><path d="M190 300 l12 -50"/><path d="M196 248 l0 -16 M203 249 l2 -15 M209 252 l4 -12"/>`,phone:`<path d="M95 300 l40 18"/><rect x="178" y="214" width="34" height="58" rx="6"/><path d="M185 296 l10 -24"/>`,none:'',face:''}[o.hands||'type'];
  return `<svg viewBox="0 0 270 480" xmlns="http://www.w3.org/2000/svg"><rect width="270" height="480" fill="${bg}"/>${glow}
  ${o.window?`<rect x="168" y="40" width="80" height="96" rx="4" fill="none" stroke="${line}" stroke-width="2" opacity=".5"/><path d="M180 120 l12 -14 l10 8 l14 -22 l20 28" fill="none" stroke="${line}" stroke-width="2" opacity=".5"/><circle cx="226" cy="62" r="6" fill="none" stroke="${line}" opacity=".6"/>`:''}
  ${o.clock?`<circle cx="44" cy="70" r="22" fill="none" stroke="${line}" stroke-width="2.5"/><path d="M44 70 v-13 M44 70 l10 6" stroke="${line}" stroke-width="2.5"/><text x="44" y="112" font-family="Caveat" font-size="20" fill="${line}" text-anchor="middle">${o.clock}</text>`:''}
  <g fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
   <path d="M${hx-20} 232 v14 M${hx+20} 232 v14"/><path d="M70 330 q4 -78 65 -84 q61 6 65 84"/>
   <ellipse cx="${hx}" cy="200" rx="30" ry="36" fill="${bg}"/>${hair}${eyes}${brows}${mouth}${face}${hands}
   <path d="M20 330 h230"/><path d="M85 330 l12 -46 h76 l12 46" fill="${night?'#2e2f37':'#ecE7df'}"/>
   ${o.screen?`<text x="135" y="318" font-family="Caveat" font-size="15" fill="${line}" stroke="none" text-anchor="middle">${o.screen}</text>`:''}
   ${o.tabs?`<path d="M30 352 h210" stroke-dasharray="6 6" opacity=".5"/>`:''}
   ${o.coffee?`<path d="M212 330 v-22 h22 v22 z M234 314 q8 0 8 8 q0 6 -8 6"/><path d="M218 300 q3 -6 0 -12 M226 300 q3 -6 0 -12" opacity=".6"/>`:''}
  </g></svg>`;
}
function frame(f,i){return `<div class="fr"><div class="ph">${f.zoom?zoom(f):fig(Object.assign({id:f.k+i},f))}${f.text?`<div class="ov ${f.pos||"mid"}">${f.text}</div>`:""}<div class="n">${i+1}</div></div><div class="t">${f.time}</div><div class="a">${f.act}</div></div>`}
function zoom(f){return `<svg viewBox="0 0 270 480" xmlns="http://www.w3.org/2000/svg"><rect width="270" height="480" fill="#f6f3ee"/><rect x="18" y="120" width="234" height="260" rx="10" fill="#fff" stroke="#1d1d1f" stroke-width="3"/><path d="M18 150 h234" stroke="#1d1d1f" stroke-width="2"/><circle cx="34" cy="135" r="4" fill="#ff7a30"/><text x="135" y="${f.zoom==='logo'?300:260}" font-family="Syne" font-weight="700" font-size="${f.zoom==='logo'?92:28}" text-anchor="middle" fill="#1d1d1f">${f.zoom==='logo'?'LOGO':'✨ AI ✨'}</text>${f.zoom==='ai'?'<rect x="44" y="290" width="182" height="26" rx="13" fill="#ff7a30"/><rect x="44" y="180" width="80" height="12" rx="6" fill="#ddd"/><rect x="44" y="200" width="140" height="12" rx="6" fill="#ddd"/>':''}</svg>`}
const reels=[
 {k:'r5',title:'Reel #5 · 1:40 am in Yerevan',meta:'10 s · night, only laptop light · audio: calm lo-fi',frames:[
  {night:1,window:1,look:'screen',mood:'neutral',hands:'type',text:'1:40 am in Yerevan.',time:'0–2 s',act:'Lights off. Laptop light on your face. Typing.'},
  {night:1,window:1,look:'screen',mood:'neutral',hands:'type',text:'Everyone is asleep.',time:'2–5 s',act:'Short glance to the side (towards the bedroom).'},
  {night:1,window:1,look:'camera',mood:'smile',hands:'type',text:'New York is in a meeting.',time:'5–8 s',act:'Look at camera, small smile.'},
  {night:1,window:1,look:'screen',mood:'smile',hands:'type',text:'Who else is up? 👇',pos:'low',time:'8–10 s',act:'Back to typing. End.'}]},
 {k:'r1',title:'Reel #1 · "Can you make the logo bigger?"',meta:'8 s · daylight at desk · audio: trending "slow" sound',frames:[
  {look:'screen',mood:'neutral',hands:'type',coffee:1,screen:'new message',text:'Client: "Can you make the logo bigger?"',time:'0–2 s',act:'Reading a message on screen.'},
  {look:'camera',mood:'neutral',hands:'none',coffee:1,text:'Me, for the 4th time:',time:'2–4 s',act:'Slowly turn to the camera. No expression.'},
  {look:'camera',mood:'smile',brow:'up',hands:'none',coffee:1,text:'',time:'4–6 s',act:'Slow nod + polite smile.'},
  {zoom:'logo',text:'',time:'6–8 s',act:'Screen record: zoom the logo in Figma until it fills the screen.'}]},
 {k:'r6',title:'Reel #6 · AI design in 10 seconds',meta:'10 s · daylight → messy hair · audio: dramatic trending sound',frames:[
  {zoom:'ai',text:'AI: "Here\'s your design in 10 seconds"',pos:'top',time:'0–3 s',act:'Screen record: AI generating a UI (speed up).'},
  {look:'screen',mood:'neutral',hands:'type',clock:'0:00',text:'Me, fixing it:',time:'3–5 s',act:'Looking at screen, calm.'},
  {look:'screen',mood:'tired',hands:'type',messy:1,clock:'2:00',text:'2 hours later',time:'5–8 s',act:'Hair up and messy, same position.'},
  {look:'camera',mood:'tired',hands:'face',messy:1,text:'',time:'8–10 s',act:'Look at camera, deep breath, cover face.'}]}
];
const css=`*{margin:0;box-sizing:border-box}body{background:#ece8e1;font-family:Inter,sans-serif;color:#1d1d1f;padding:56px;width:1600px}
h1{font-family:Syne;font-size:40px;margin-bottom:6px}.m{font-size:20px;color:#6b665f;margin-bottom:34px}
.row{display:grid;grid-template-columns:repeat(4,1fr);gap:34px}.ph{position:relative;border:4px solid #1d1d1f;border-radius:28px;overflow:hidden;aspect-ratio:9/16;background:#fff}.ph svg{width:100%;height:100%;display:block}
.ov{position:absolute;left:50%;transform:translateX(-50%);width:max-content;max-width:86%;text-align:center;font-family:Syne;font-weight:700;font-size:22px;line-height:1.2;color:#fff;background:#111;padding:8px 12px;border-radius:10px}
.ov.mid{top:12%}.ov.top{top:10%}.ov.low{top:76%}.ov:empty{display:none}
.n{position:absolute;top:12px;left:12px;width:34px;height:34px;border-radius:50%;background:#ff7a30;color:#fff;font-weight:600;display:grid;place-items:center;font-size:17px}
.t{margin-top:14px;font-weight:600;font-size:20px}.a{font-family:Caveat;font-size:27px;line-height:1.1;color:#3a3732;margin-top:4px}
.foot{margin-top:30px;font-size:17px;color:#6b665f}`;
for(const r of reels){fs.writeFileSync(`${r.k}.html`,`<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Inter:wght@400;600&family=Syne:wght@700&display=swap" rel="stylesheet"><style>${css}</style></head><body><h1>${r.title}</h1><div class="m">${r.meta}</div><div class="row">${r.frames.map((f,i)=>frame(Object.assign({k:r.k},f),i)).join('')}</div><div class="foot">Dee Design · storyboard · your own footage only, no talking</div></body></html>`)}
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:900}});for(const r of reels){await p.goto('file://'+process.cwd()+'/'+r.k+'.html');await p.waitForTimeout(1200);await p.screenshot({path:r.k+'.png',fullPage:true})}await b.close()})();
