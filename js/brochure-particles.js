/* ==========================================================
brochure-particles.js
Part 8.5 - Luxury Gold Dust + Fireflies + Sparkles
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const stage=document.querySelector(".book-stage");
if(!stage) return;

stage.style.position="relative";
stage.style.overflow="hidden";

/* Gold Dust */
for(let i=0;i<80;i++){
 const p=document.createElement("span");
 const s=2+Math.random()*3;
 p.style.cssText=`
 position:absolute;
 left:${Math.random()*100}%;
 top:${Math.random()*100}%;
 width:${s}px;
 height:${s}px;
 border-radius:50%;
 background:#d4af37;
 box-shadow:0 0 10px rgba(212,175,55,.9);
 pointer-events:none;
 opacity:${0.2+Math.random()*0.8};
 z-index:20;`;
 stage.appendChild(p);

 gsap.to(p,{
   y:-220-Math.random()*120,
   x:(Math.random()*120)-60,
   scale:0.2,
   opacity:0,
   duration:4+Math.random()*5,
   delay:Math.random()*3,
   repeat:-1,
   ease:"none"
 });
}

/* Fireflies */
for(let i=0;i<18;i++){
 const f=document.createElement("div");
 f.style.cssText=`
 position:absolute;
 width:7px;
 height:7px;
 border-radius:50%;
 background:#fff4b0;
 box-shadow:0 0 18px #ffd966;
 left:${Math.random()*100}%;
 top:${Math.random()*100}%;
 pointer-events:none;
 z-index:21;`;
 stage.appendChild(f);

 gsap.to(f,{
   x:"+=80",
   y:"+=40",
   repeat:-1,
   yoyo:true,
   duration:3+Math.random()*4,
   ease:"sine.inOut"
 });

 gsap.to(f,{
   opacity:0.2,
   repeat:-1,
   yoyo:true,
   duration:1+Math.random()*2
 });
}

/* Sparkles */
setInterval(()=>{
 const s=document.createElement("div");
 s.style.cssText=`
 position:absolute;
 width:5px;
 height:5px;
 border-radius:50%;
 left:${10+Math.random()*80}%;
 top:${10+Math.random()*80}%;
 background:white;
 box-shadow:0 0 22px #ffe58a;
 pointer-events:none;
 z-index:22;`;
 stage.appendChild(s);

 gsap.fromTo(s,
 {scale:0,opacity:1},
 {scale:3,opacity:0,duration:1.2,onComplete:()=>s.remove()});

},450);

});
