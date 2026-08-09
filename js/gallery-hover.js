/* ==========================================================
gallery-hover.js
Part 9.3 - Luxury Hover Effects
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".gallery-card").forEach(card=>{

card.style.transformStyle="preserve-3d";

const reflection=document.createElement("div");
reflection.style.cssText=`
position:absolute;
inset:0;
background:linear-gradient(120deg,
transparent 25%,
rgba(255,255,255,.16) 50%,
transparent 75%);
transform:translateX(-180%);
pointer-events:none;
z-index:3;`;
card.appendChild(reflection);

const glow=document.createElement("div");
glow.style.cssText=`
position:absolute;
width:220px;
height:220px;
border-radius:50%;
background:radial-gradient(circle,
rgba(255,235,170,.25),
rgba(212,175,55,.12),
transparent 70%);
transform:translate(-50%,-50%);
opacity:0;
pointer-events:none;
filter:blur(10px);
z-index:2;`;
card.appendChild(glow);

card.addEventListener("mousemove",e=>{
 const r=card.getBoundingClientRect();
 const x=e.clientX-r.left;
 const y=e.clientY-r.top;
 const rx=((y/r.height)-.5)*-10;
 const ry=((x/r.width)-.5)*10;

 gsap.to(card,{
   rotateX:rx,
   rotateY:ry,
   duration:.2
 });

 gsap.to(glow,{
   left:x,
   top:y,
   opacity:1,
   duration:.15
 });
});

card.addEventListener("mouseenter",()=>{
 gsap.fromTo(reflection,{xPercent:-180},{xPercent:180,duration:1,ease:"power2.out"});
 gsap.to(card,{
   boxShadow:"0 25px 80px rgba(212,175,55,.35)",
   borderColor:"#f7df84",
   duration:.3
 });
});

card.addEventListener("mouseleave",()=>{
 gsap.to(card,{
   rotateX:0,
   rotateY:0,
   boxShadow:"0 18px 50px rgba(0,0,0,.45)",
   duration:.35
 });
 gsap.to(glow,{opacity:0,duration:.2});
});

});

});