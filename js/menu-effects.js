/* ==========================================================
menu-effects.js
Part 7.4 - Luxury Smoke + Golden Dust + Cinematic Light Rays
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".menu-card").forEach(card=>{

card.style.position="relative";
card.style.overflow="hidden";

/* Light Rays */
const rays=document.createElement("div");
rays.style.cssText=`
position:absolute;
inset:-40%;
background:conic-gradient(from 180deg,
transparent,
rgba(212,175,55,.10),
transparent,
rgba(255,240,180,.08),
transparent);
mix-blend-mode:screen;
pointer-events:none;
opacity:.45;
filter:blur(12px);`;
card.appendChild(rays);

gsap.to(rays,{
rotation:360,
duration:18,
repeat:-1,
ease:"none"
});

/* Smoke */
for(let i=0;i<3;i++){
 const smoke=document.createElement("div");
 smoke.style.cssText=`
 position:absolute;
 left:${20+i*25}%;
 bottom:-40px;
 width:90px;
 height:140px;
 border-radius:50%;
 background:radial-gradient(circle,
 rgba(255,255,255,.12),
 transparent 70%);
 filter:blur(18px);
 opacity:.12;
 pointer-events:none;`;
 card.appendChild(smoke);

 gsap.to(smoke,{
   y:-170,
   x:(Math.random()*30)-15,
   opacity:0,
   duration:5+i,
   repeat:-1,
   ease:"none"
 });
}

/* Gold Dust */
for(let i=0;i<12;i++){
 const p=document.createElement("span");
 p.style.cssText=`
 position:absolute;
 width:${2+(i%3)}px;
 height:${2+(i%3)}px;
 border-radius:50%;
 background:#d4af37;
 box-shadow:0 0 10px rgba(212,175,55,.9);
 left:${Math.random()*100}%;
 bottom:-15px;
 pointer-events:none;`;
 card.appendChild(p);

 gsap.to(p,{
   y:-260,
   x:(Math.random()*60)-30,
   opacity:0,
   scale:0.3,
   duration:3+Math.random()*2,
   delay:i*.15,
   repeat:-1,
   ease:"none"
 });
}

});
});
