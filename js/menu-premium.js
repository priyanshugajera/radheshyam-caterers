/* ==========================================================
menu-premium.js
Part 7.5 - 3D Parallax + Lens Flare + Premium Shine
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".menu-card").forEach(card=>{

card.style.transformStyle="preserve-3d";
card.style.perspective="1200px";

/* Lens flare */
const lens=document.createElement("div");
lens.style.cssText=`
position:absolute;
top:-60px;
right:-60px;
width:180px;
height:180px;
border-radius:50%;
pointer-events:none;
background:radial-gradient(circle,
rgba(255,235,150,.35),
rgba(212,175,55,.12),
transparent 72%);
filter:blur(16px);
opacity:.35;
z-index:6;`;
card.appendChild(lens);

gsap.to(lens,{
rotation:360,
scale:1.15,
duration:12,
repeat:-1,
ease:"none"
});

/* Premium shine */
const shine=document.createElement("div");
shine.style.cssText=`
position:absolute;
inset:-150%;
background:linear-gradient(120deg,
transparent 25%,
rgba(255,255,255,.18) 50%,
transparent 75%);
transform:translateX(-140%) rotate(20deg);
pointer-events:none;
z-index:7;`;
card.appendChild(shine);

card.addEventListener("mouseenter",()=>{
 gsap.fromTo(shine,
 {xPercent:-160},
 {xPercent:180,duration:1,ease:"power2.out"});
});

card.addEventListener("mousemove",e=>{
 const r=card.getBoundingClientRect();
 const px=(e.clientX-r.left)/r.width-.5;
 const py=(e.clientY-r.top)/r.height-.5;

 gsap.to(card,{
   rotateY:px*12,
   rotateX:-py*12,
   x:px*8,
   y:py*8,
   duration:.25,
   ease:"power2.out"
 });

 const img=card.querySelector("img");
 if(img){
   gsap.to(img,{
      x:px*12,
      y:py*12,
      scale:1.05,
      duration:.3
   });
 }
});

card.addEventListener("mouseleave",()=>{
 gsap.to(card,{
   rotateX:0,
   rotateY:0,
   x:0,
   y:0,
   duration:.45,
   ease:"power3.out"
 });
 const img=card.querySelector("img");
 if(img){
   gsap.to(img,{x:0,y:0,scale:1,duration:.45});
 }
});

});
});
