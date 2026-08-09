/* ==========================================================
gallery-effects.js
Part 9.4 - Gold Dust + Ambient Effects
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const gallery=document.getElementById("gallery");
if(!gallery) return;

/* Ambient light */
const ambient=document.createElement("div");
ambient.style.cssText=`
position:absolute;
inset:0;
pointer-events:none;
background:
radial-gradient(circle at 20% 30%,rgba(212,175,55,.08),transparent 35%),
radial-gradient(circle at 80% 60%,rgba(255,220,120,.06),transparent 35%);
z-index:0;`;
gallery.appendChild(ambient);

/* Light rays */
for(let i=0;i<5;i++){
 const ray=document.createElement("div");
 ray.style.cssText=`
 position:absolute;
 top:-20%;
 left:${10+i*18}%;
 width:2px;
 height:140%;
 background:linear-gradient(to bottom,rgba(255,235,170,.18),transparent);
 transform:rotate(${(-12+i*6)}deg);
 filter:blur(2px);
 pointer-events:none;
 opacity:.18;`;
 gallery.appendChild(ray);
 gsap.to(ray,{opacity:.35,y:40,repeat:-1,yoyo:true,duration:3+i*.4,ease:"sine.inOut"});
}

/* Floating particles */
for(let i=0;i<70;i++){
 const p=document.createElement("span");
 const s=2+Math.random()*3;
 p.style.cssText=`
 position:absolute;
 left:${Math.random()*100}%;
 top:${100+Math.random()*20}%;
 width:${s}px;
 height:${s}px;
 border-radius:50%;
 background:#f7df84;
 box-shadow:0 0 10px rgba(255,220,120,.8);
 opacity:${0.2+Math.random()*0.6};
 pointer-events:none;`;
 gallery.appendChild(p);

 gsap.to(p,{
   y:-1200,
   x:(Math.random()*120)-60,
   opacity:0,
   repeat:-1,
   delay:Math.random()*6,
   duration:8+Math.random()*5,
   ease:"none"
 });
}

});