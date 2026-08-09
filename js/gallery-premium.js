/* ==========================================================
gallery-premium.js
Part 9.7 - Final Premium Polish
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const gallery=document.getElementById("gallery");
if(!gallery) return;

/* Floating camera movement */
gsap.to(".gallery-track",{
 y:-8,
 duration:4,
 repeat:-1,
 yoyo:true,
 ease:"sine.inOut"
});

/* Premium polish per card */
document.querySelectorAll(".gallery-card").forEach((card,i)=>{

 const lens=document.createElement("div");
 lens.style.cssText=`
 position:absolute;
 top:-60px;
 right:-60px;
 width:170px;
 height:170px;
 border-radius:50%;
 background:radial-gradient(circle,
 rgba(255,235,170,.28),
 rgba(212,175,55,.12),
 transparent 72%);
 filter:blur(18px);
 pointer-events:none;
 opacity:.35;
 z-index:3;`;
 card.appendChild(lens);

 const shine=document.createElement("div");
 shine.style.cssText=`
 position:absolute;
 inset:-150%;
 background:linear-gradient(120deg,
 transparent 25%,
 rgba(255,255,255,.16) 50%,
 transparent 75%);
 transform:translateX(-160%) rotate(20deg);
 pointer-events:none;
 z-index:4;`;
 card.appendChild(shine);

 gsap.to(lens,{
   rotation:360,
   duration:10+i,
   repeat:-1,
   ease:"none"
 });

 gsap.to(card,{
   rotateZ:(i%2?0.4:-0.4),
   repeat:-1,
   yoyo:true,
   duration:3+i*0.2,
   ease:"sine.inOut"
 });

 card.addEventListener("mouseenter",()=>{
   gsap.to(card,{
     scale:1.05,
     z:30,
     boxShadow:"0 35px 90px rgba(212,175,55,.35)",
     duration:.35
   });
   gsap.fromTo(shine,
     {xPercent:-160},
     {xPercent:180,duration:1,ease:"power2.out"});
   gsap.to(lens,{opacity:.8,scale:1.2,duration:.3});
 });

 card.addEventListener("mouseleave",()=>{
   gsap.to(card,{
     scale:1,
     z:0,
     boxShadow:"0 20px 60px rgba(0,0,0,.45)",
     duration:.35
   });
   gsap.to(lens,{opacity:.35,scale:1,duration:.3});
 });

});

/* Ambient gallery glow */
const glow=document.createElement("div");
glow.style.cssText=`
position:absolute;
inset:0;
pointer-events:none;
background:
radial-gradient(circle at 50% 10%,rgba(212,175,55,.08),transparent 40%),
radial-gradient(circle at 50% 100%,rgba(255,220,120,.05),transparent 45%);
z-index:0;`;
gallery.appendChild(glow);

});