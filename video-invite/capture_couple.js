const { chromium } = require('playwright'); const fs=require('fs');
const OUT=process.argv[2]; fs.mkdirSync(OUT+'/couplehi',{recursive:true});
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:540,height:960},deviceScaleFactor:3});
 await p.goto('http://localhost:8123/index.html',{waitUntil:'load'});
 await p.addStyleTag({content:'.progress,.tap-hint{display:none!important}'});
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1200);
 await p.evaluate(()=>{const el=document.getElementById('couple');const r=el.offsetHeight-innerHeight;scrollTo(0,el.offsetTop+r*0.95);sy=scrollY;
   for(const a of document.getAnimations()){a.pause();a.currentTime=9000;}});
 await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))); await p.waitForTimeout(800);
 const box=await p.locator('#coupleFig').boundingBox(); console.log(JSON.stringify(box)); fs.writeFileSync(OUT+'/couplehi/fig.json',JSON.stringify(box));
 await p.screenshot({path:OUT+'/couplehi/full.png'});
 await p.addStyleTag({content:'#coupleFig{visibility:hidden!important}'});
 await p.screenshot({path:OUT+'/couplehi/back.png'});
 await p.addStyleTag({content:'#coupleFig{visibility:visible!important}#coupleStage>*:not(#coupleFig){visibility:hidden!important}#coupleStage{background:transparent!important}body{background:transparent!important}'});
 await p.locator('#coupleFig').screenshot({path:OUT+'/couplehi/fig.png',omitBackground:true});
 await b.close();})();
