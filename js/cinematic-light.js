/* ==========================================================
cinematic-light.js
Part 6.4 - Cinema Hall Lighting + Golden Glow + Lens Effects
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const section=document.getElementById("videos");
if(!section) return;

const ambient=document.createElement("div");
ambient.className="cinema-ambient";
ambient.style.cssText=`
position:absolute;
inset:0;
pointer-events:none;
overflow:hidden;
z-index:1;
`;

ambient.innerHTML=`
<div class="gold-glow"></div>
<div class="gold-glow glow2"></div>
<div class="lens-flare"></div>
`;

section.appendChild(ambient);

gsap.to(".gold-glow",{
scale:1.15,
opacity:.7,
repeat:-1,
yoyo:true,
duration:4,
ease:"sine.inOut"
});

gsap.to(".glow2",{
x:80,
y:-40,
rotation:25,
repeat:-1,
yoyo:true,
duration:8,
ease:"sine.inOut"
});

gsap.to(".lens-flare",{
rotation:360,
repeat:-1,
duration:20,
ease:"none"
});

document.querySelectorAll(".video-card").forEach(card=>{
 card.addEventListener("mouseenter",()=>{
   gsap.to(card,{
     boxShadow:"0 0 50px rgba(212,175,55,.35)",
     duration:.3
   });
 });
 card.addEventListener("mouseleave",()=>{
   gsap.to(card,{
     boxShadow:"0 20px 60px rgba(0,0,0,.25)",
     duration:.3
   });
 });
});

});
