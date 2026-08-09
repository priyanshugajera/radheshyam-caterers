/* ==========================================================
contact-premium.js
Part 10.5 - Premium Contact Effects
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".glass-card,#contactForm").forEach((card,i)=>{

card.style.transformStyle="preserve-3d";
card.style.perspective="1200px";

/* Lens flare */
const lens=document.createElement("div");
lens.style.cssText=`
position:absolute;
top:-70px;
right:-70px;
width:180px;
height:180px;
border-radius:50%;
background:radial-gradient(circle,
rgba(255,235,170,.35),
rgba(212,175,55,.15),
transparent 72%);
filter:blur(18px);
pointer-events:none;
opacity:.35;
z-index:2;`;
card.appendChild(lens);

/* Reflection */
const reflection=document.createElement("div");
reflection.style.cssText=`
position:absolute;
inset:-120%;
background:linear-gradient(120deg,
transparent 25%,
rgba(255,255,255,.14) 50%,
transparent 75%);
transform:translateX(-160%) rotate(20deg);
pointer-events:none;
z-index:3;`;
card.appendChild(reflection);

/* Mouse glow */
const glow=document.createElement("div");
glow.style.cssText=`
position:absolute;
width:260px;
height:260px;
border-radius:50%;
background:radial-gradient(circle,
rgba(255,235,170,.28),
rgba(212,175,55,.12),
transparent 72%);
filter:blur(12px);
transform:translate(-50%,-50%);
opacity:0;
pointer-events:none;
z-index:2;`;
card.appendChild(glow);

gsap.to(lens,{
 rotation:360,
 duration:10+i,
 repeat:-1,
 ease:"none"
});

gsap.to(card,{
 y:-6,
 repeat:-1,
 yoyo:true,
 duration:3+i*.3,
 ease:"sine.inOut"
});

card.addEventListener("mousemove",e=>{
 const r=card.getBoundingClientRect();
 const x=e.clientX-r.left;
 const y=e.clientY-r.top;

 gsap.to(glow,{
  left:x,
  top:y,
  opacity:1,
  duration:.12
 });

 gsap.to(card,{
  rotateY:((x/r.width)-.5)*10,
  rotateX:((y/r.height)-.5)*-10,
  duration:.2
 });
});

card.addEventListener("mouseenter",()=>{
 gsap.fromTo(reflection,
  {xPercent:-160},
  {xPercent:180,duration:1,ease:"power2.out"});
 gsap.to(lens,{opacity:.8,scale:1.2,duration:.3});
});

card.addEventListener("mouseleave",()=>{
 gsap.to(card,{rotateX:0,rotateY:0,duration:.35});
 gsap.to(glow,{opacity:0,duration:.2});
 gsap.to(lens,{opacity:.35,scale:1,duration:.3});
});

});

});