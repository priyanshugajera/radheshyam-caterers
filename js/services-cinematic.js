/* ==========================================================
services-cinematic.js
Part 5.4 - Cinematic HDR + Reflection Floor
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".svc-card").forEach(card=>{

const floor=document.createElement("div");
floor.style.cssText=`
position:absolute;
left:8%;
right:8%;
bottom:-55px;
height:70px;
background:radial-gradient(ellipse,
rgba(212,175,55,.22),
transparent 72%);
filter:blur(18px);
transform:perspective(500px) rotateX(78deg);
pointer-events:none;
`;
card.appendChild(floor);

const border=document.createElement("div");
border.style.cssText=`
position:absolute;
inset:-2px;
border-radius:30px;
padding:2px;
background:linear-gradient(135deg,
rgba(255,255,255,.18),
rgba(212,175,55,.65),
rgba(255,255,255,.15));
-webkit-mask:
linear-gradient(#fff 0 0) content-box,
linear-gradient(#fff 0 0);
-webkit-mask-composite:xor;
mask-composite:exclude;
pointer-events:none;
opacity:.45;
`;
card.appendChild(border);

const fog=document.createElement("div");
fog.style.cssText=`
position:absolute;
left:-20%;
right:-20%;
bottom:-15%;
height:160px;
background:radial-gradient(circle,
rgba(255,255,255,.08),
transparent 70%);
filter:blur(45px);
pointer-events:none;
opacity:.45;
`;
card.appendChild(fog);

gsap.to(border,{
 opacity:1,
 repeat:-1,
 yoyo:true,
 duration:1.6
});

gsap.to(floor,{
 scale:1.15,
 opacity:.9,
 repeat:-1,
 yoyo:true,
 duration:2
});

gsap.to(fog,{
 x:40,
 repeat:-1,
 yoyo:true,
 duration:6,
 ease:"sine.inOut"
});

card.addEventListener("mouseenter",()=>{
 gsap.to(card,{
   z:80,
   scale:1.03,
   duration:.35,
   boxShadow:"0 40px 80px rgba(212,175,55,.30)"
 });
});

card.addEventListener("mouseleave",()=>{
 gsap.to(card,{
   z:0,
   scale:1,
   duration:.35,
   boxShadow:"0 0 0 rgba(0,0,0,0)"
 });
});

});

});
