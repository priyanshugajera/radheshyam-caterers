/* ==========================================================
brochure-light.js
Part 8.4 - Cinema Hall Lighting + Golden Glow + Lens Flare
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const book=document.querySelector(".flip-book");
if(!book) return;

/* Ambient golden glow */
const glow=document.createElement("div");
glow.style.cssText=`
position:absolute;
inset:-25%;
background:radial-gradient(circle,
rgba(255,220,120,.18),
rgba(212,175,55,.08),
transparent 72%);
filter:blur(45px);
pointer-events:none;
z-index:-1;`;
book.parentElement.style.position="relative";
book.parentElement.appendChild(glow);

gsap.to(glow,{
scale:1.15,
opacity:.9,
repeat:-1,
yoyo:true,
duration:3,
ease:"sine.inOut"
});

/* Lens flare */
const flare=document.createElement("div");
flare.style.cssText=`
position:absolute;
top:8%;
left:12%;
width:220px;
height:220px;
border-radius:50%;
background:radial-gradient(circle,
rgba(255,245,180,.45),
rgba(212,175,55,.18),
transparent 75%);
filter:blur(24px);
mix-blend-mode:screen;
pointer-events:none;
z-index:10;`;
book.appendChild(flare);

gsap.to(flare,{
rotation:360,
duration:16,
repeat:-1,
ease:"none"
});

/* Moving spotlight */
const light=document.createElement("div");
light.style.cssText=`
position:absolute;
inset:0;
background:radial-gradient(circle at 50% 30%,
rgba(255,255,255,.12),
transparent 60%);
mix-blend-mode:screen;
pointer-events:none;
z-index:9;`;
book.appendChild(light);

book.addEventListener("mousemove",e=>{
const r=book.getBoundingClientRect();
const x=((e.clientX-r.left)/r.width)*100;
const y=((e.clientY-r.top)/r.height)*100;
gsap.to(light,{
background:`radial-gradient(circle at ${x}% ${y}%,
rgba(255,255,255,.16),
transparent 60%)`,
duration:.15
});
});

book.addEventListener("mouseleave",()=>{
gsap.to(light,{
background:"radial-gradient(circle at 50% 30%,rgba(255,255,255,.12),transparent 60%)",
duration:.3
});
});

});
