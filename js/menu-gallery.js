/* ==========================================================
menu-gallery.js
Part 7.3 - Luxury 3D Image Hover + Reflection + Mouse Glow
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".menu-card").forEach(card=>{

card.style.transformStyle="preserve-3d";

const glow=document.createElement("div");
glow.className="menu-mouse-glow";
glow.style.cssText=`
position:absolute;
width:220px;
height:220px;
border-radius:50%;
pointer-events:none;
opacity:0;
left:0;top:0;
transform:translate(-50%,-50%);
background:radial-gradient(circle,
rgba(255,235,170,.35),
rgba(212,175,55,.18),
transparent 72%);
filter:blur(10px);
z-index:5;`;
card.appendChild(glow);

const reflection=document.createElement("div");
reflection.style.cssText=`
position:absolute;
inset:0;
border-radius:22px;
background:linear-gradient(120deg,
transparent 20%,
rgba(255,255,255,.14) 50%,
transparent 80%);
transform:translateX(-180%);
pointer-events:none;
z-index:4;`;
card.appendChild(reflection);

gsap.to(card,{
y:-8,
repeat:-1,
yoyo:true,
duration:2.6+Math.random(),
ease:"sine.inOut"
});

card.addEventListener("mousemove",e=>{
const r=card.getBoundingClientRect();
const x=e.clientX-r.left;
const y=e.clientY-r.top;
const ry=((x/r.width)-0.5)*10;
const rx=((y/r.height)-0.5)*-10;

gsap.to(card,{
rotateY:ry,
rotateX:rx,
duration:.25,
ease:"power2.out"
});

gsap.to(glow,{
opacity:1,
left:x,
top:y,
duration:.08
});
});

card.addEventListener("mouseenter",()=>{
gsap.fromTo(reflection,
{xPercent:-180},
{xPercent:180,duration:1,ease:"power2.out"});
gsap.to(card,{
scale:1.03,
boxShadow:"0 25px 60px rgba(212,175,55,.25)",
duration:.3
});
});

card.addEventListener("mouseleave",()=>{
gsap.to(card,{
rotateX:0,
rotateY:0,
scale:1,
duration:.4,
ease:"power3.out"
});
gsap.to(glow,{opacity:0,duration:.25});
});

});
});
