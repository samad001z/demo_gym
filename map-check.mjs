import { chromium } from 'playwright';
const b = await chromium.launch();
for (const [w,h,name] of [[1440,900,'desk'],[390,844,'mob']]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h} });
  const p = await ctx.newPage();
  await p.goto('http://localhost:4311/gyms', { waitUntil:'networkidle' });
  await p.evaluate(()=>document.querySelector('#map-heading')?.scrollIntoView({block:'start'}));
  await p.waitForTimeout(1400);
  await p.screenshot({ path:`C:/tmp/map-${name}.png` });
  // pin collision + tap-target check
  const pins = await p.evaluate(()=>[...document.querySelectorAll('a[href^="/gyms/"]')]
    .filter(a=>a.className.includes('group/pin'))
    .map(a=>{const r=a.getBoundingClientRect();return{n:a.textContent.trim().slice(0,14),x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};}));
  let overlaps=0;
  for(let i=0;i<pins.length;i++)for(let j=i+1;j<pins.length;j++){
    const a=pins[i],c=pins[j];
    if(a.x<c.x+c.w&&a.x+a.w>c.x&&a.y<c.y+c.h&&a.y+a.h>c.y) overlaps++;
  }
  const small = pins.filter(p=>p.w<44||p.h<44).length;
  console.log(`${name}: pins=${pins.length} overlaps=${overlaps} under44px=${small}`);
  await ctx.close();
}
await b.close();
