/* ==========================================================
footer-premium.js
Part 11.5 - Ultra Luxury Footer Premium
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const footer=document.querySelector("footer");
if(!footer) return;

/* Floating camera */
gsap.to(footer,{
 y:-4,
 repeat:-1,
 yoyo:true,
 duration:5,
 ease:"sine.inOut"
});

/* Ambient lens flare */
const lens=document.createElement("div");
lens.style.cssText=`
position:absolute;
top:-120px;
right:-120px;
width:260px;
height:260px;
border-radius:50%;
background:radial-gradient(circle,
rgba(255,235,170,.35),
rgba(212,175,55,.15),
transparent 72%);
filter:blur(20px);
opacity:.35;
pointer-events:none;
z-index:1;`;
footer.appendChild(lens);

gsap.to(lens,{
 rotation:360,
 scale:1.15,
 duration:12,
 repeat:-1,
 ease:"none"
});

/* Gold shine sweep */
const shine=document.createElement("div");
shine.style.cssText=`
position:absolute;
inset:-180%;
background:linear-gradient(
120deg,
transparent 25%,
rgba(255,255,255,.12) 50%,
transparent 75%);
transform:translateX(-180%) rotate(20deg);
pointer-events:none;
z-index:2;`;
footer.appendChild(shine);

gsap.fromTo(shine,
{xPercent:-180},
{
xPercent:180,
repeat:-1,
duration:7,
ease:"none"
});

/* Premium hover */
document.querySelectorAll(".footer-grid > div").forEach(card=>{

card.style.transformStyle="preserve-3d";

card.addEventListener("mousemove",e=>{

const r=card.getBoundingClientRect();

const rx=((e.clientY-r.top)/r.height-.5)*-8;
const ry=((e.clientX-r.left)/r.width-.5)*8;

gsap.to(card,{
rotateX:rx,
rotateY:ry,
duration:.2
});

});

card.addEventListener("mouseleave",()=>{

gsap.to(card,{
rotateX:0,
rotateY:0,
duration:.35
});

});

});

});