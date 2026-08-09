/* ==========================================================
services-premium-stack.js
Part 5.5 - Premium Image Stack + Steam + Lens Glow
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".svc-card").forEach(card=>{

const imgs=card.querySelectorAll(".img");

imgs.forEach((img,i)=>{

  img.style.position="relative";
  img.style.overflow="hidden";

  const glow=document.createElement("div");
  glow.style.cssText=`
  position:absolute;
  inset:-30%;
  background:radial-gradient(circle,
  rgba(255,240,170,.35),
  transparent 65%);
  opacity:0;
  pointer-events:none;`;
  img.appendChild(glow);

  const steam=document.createElement("div");
  steam.style.cssText=`
  position:absolute;
  left:50%;
  bottom:-20px;
  width:70px;
  height:120px;
  transform:translateX(-50%);
  background:radial-gradient(circle at 50% 90%,rgba(255,255,255,.18),transparent 70%);
  filter:blur(16px);
  opacity:.18;
  pointer-events:none;`;
  img.appendChild(steam);

  gsap.to(steam,{
   y:-8,
scale:1.04,
    opacity:.05,
    repeat:-1,
    yoyo:true,
    duration:2+i*.3,
    ease:"sine.inOut"
  });

  img.addEventListener("mouseenter",()=>{
    gsap.to(img,{
  scale:1.01,
rotateZ:(i%2?0.3:-0.3),
z:3,
  duration:.35,
  ease:"power2.out"
});
    gsap.to(glow,{opacity:1,duration:.25});
  });

  img.addEventListener("mouseleave",()=>{
    gsap.to(img,{
      scale:1,
      rotateZ:0,
      z:0,
      duration:.35
    });
    gsap.to(glow,{opacity:0,duration:.25});
  });

});

const lens=document.createElement("div");
lens.style.cssText=`
position:absolute;
top:-60px;
right:-60px;
width:180px;
height:180px;
border-radius:50%;
background:radial-gradient(circle,
rgba(255,225,120,.35),
rgba(212,175,55,.12),
transparent 72%);
filter:blur(18px);
pointer-events:none;
opacity:.35;`;
card.appendChild(lens);

gsap.to(lens,{
 rotation:360,
 scale:1.15,
 repeat:-1,
 duration:10,
 ease:"none"
});

});

});
