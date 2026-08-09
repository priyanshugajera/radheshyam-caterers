/* ==========================================================
contact-final.js
Part 10.6 - Ultimate Luxury Polish
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const section=document.getElementById("contact");
if(!section) return;

/* Floating camera */
gsap.to(section,{
 y:-6,
 duration:5,
 repeat:-1,
 yoyo:true,
 ease:"sine.inOut"
});

/* Ambient glow pulse */
const ambient=document.createElement("div");
ambient.style.cssText=`
position:absolute;
inset:0;
pointer-events:none;
background:
radial-gradient(circle at 50% 20%,rgba(212,175,55,.06),transparent 45%),
radial-gradient(circle at 50% 100%,rgba(255,220,120,.05),transparent 50%);
z-index:0;`;
section.appendChild(ambient);

gsap.to(ambient,{
 opacity:.6,
 repeat:-1,
 yoyo:true,
 duration:3,
 ease:"sine.inOut"
});

/* Premium polish for cards */
document.querySelectorAll(".glass-card,#contactForm").forEach((card,i)=>{

 const shine=document.createElement("div");
 shine.style.cssText=`
 position:absolute;
 inset:-160%;
 background:linear-gradient(120deg,
 transparent 25%,
 rgba(255,255,255,.14) 50%,
 transparent 75%);
 transform:translateX(-180%) rotate(22deg);
 pointer-events:none;
 z-index:5;`;
 card.appendChild(shine);

 gsap.to(card,{
   rotateZ:(i%2?0.3:-0.3),
   repeat:-1,
   yoyo:true,
   duration:4+i*.4,
   ease:"sine.inOut"
 });

 card.addEventListener("mouseenter",()=>{
   gsap.to(card,{
     scale:1.02,
     boxShadow:"0 35px 90px rgba(212,175,55,.35)",
     duration:.35
   });

   gsap.fromTo(shine,
     {xPercent:-180},
     {xPercent:180,duration:1.1,ease:"power2.out"});
 });

 card.addEventListener("mouseleave",()=>{
   gsap.to(card,{
     scale:1,
     boxShadow:"0 25px 70px rgba(0,0,0,.45)",
     duration:.35
   });
 });

});

/* Floating golden sparkles */
for(let i=0;i<25;i++){
 const s=document.createElement("span");
 s.style.cssText=`
 position:absolute;
 left:${Math.random()*100}%;
 top:${Math.random()*100}%;
 width:3px;
 height:3px;
 border-radius:50%;
 background:#f7df84;
 box-shadow:0 0 12px rgba(212,175,55,.8);
 opacity:.5;
 pointer-events:none;`;
 section.appendChild(s);

 gsap.to(s,{
   y:-80,
   opacity:0,
   repeat:-1,
   yoyo:true,
   delay:Math.random()*3,
   duration:2+Math.random()*2,
   ease:"sine.inOut"
 });
}

});