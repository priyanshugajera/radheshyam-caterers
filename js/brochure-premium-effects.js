/* ==========================================================
brochure-premium-effects.js
Part 8.8 - Final Premium Polish
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const stage=document.querySelector(".book-stage");
const book=document.querySelector(".flip-book");
if(!stage||!book) return;

/* Luxury hardcover depth */
book.style.transformStyle="preserve-3d";
book.style.boxShadow="0 40px 120px rgba(0,0,0,.55),0 0 50px rgba(212,175,55,.15)";

const cover=document.createElement("div");
cover.style.cssText=`
position:absolute;
inset:-4px;
border-radius:18px;
border:2px solid rgba(212,175,55,.35);
box-shadow:
0 0 25px rgba(212,175,55,.25),
inset 0 0 25px rgba(255,220,120,.12);
pointer-events:none;
z-index:50;`;
book.appendChild(cover);

/* Ambient glow */
const glow=document.createElement("div");
glow.style.cssText=`
position:absolute;
left:50%;
top:50%;
width:140%;
height:140%;
transform:translate(-50%,-50%);
background:radial-gradient(circle,
rgba(255,220,120,.14),
rgba(212,175,55,.06),
transparent 70%);
filter:blur(55px);
pointer-events:none;
z-index:-1;`;
stage.appendChild(glow);

gsap.to(glow,{
scale:1.08,
opacity:.9,
repeat:-1,
yoyo:true,
duration:4,
ease:"sine.inOut"
});

/* Dynamic light rays */
for(let i=0;i<6;i++){
 const ray=document.createElement("div");
 ray.style.cssText=`
 position:absolute;
 width:2px;
 height:420px;
 left:${15+i*14}%;
 top:-120px;
 opacity:.08;
 background:linear-gradient(to bottom,
 rgba(255,235,170,.9),
 transparent);
 transform:rotate(${(-20+i*8)}deg);
 filter:blur(2px);
 pointer-events:none;
 z-index:2;`;
 stage.appendChild(ray);

 gsap.to(ray,{
 y:40,
 opacity:.16,
 repeat:-1,
 yoyo:true,
 duration:3+i*.5,
 ease:"sine.inOut"
 });
}

/* Floating dust */
for(let i=0;i<45;i++){
 const d=document.createElement("span");
 const s=1+Math.random()*3;
 d.style.cssText=`
 position:absolute;
 width:${s}px;
 height:${s}px;
 border-radius:50%;
 background:#f7df84;
 left:${Math.random()*100}%;
 top:${100+Math.random()*20}%;
 box-shadow:0 0 12px rgba(255,220,120,.8);
 opacity:${.2+Math.random()*.6};
 pointer-events:none;`;
 stage.appendChild(d);

 gsap.to(d,{
 y:-900,
 x:(Math.random()*120)-60,
 opacity:0,
 repeat:-1,
 delay:Math.random()*5,
 duration:8+Math.random()*5,
 ease:"none"
 });
}

/* Cinematic camera movement */
gsap.to(book,{
 rotateX:1.5,
 rotateY:-1.5,
 y:-8,
 repeat:-1,
 yoyo:true,
 duration:5,
 ease:"sine.inOut"
});

/* Mouse parallax */
stage.addEventListener("mousemove",e=>{
 const r=stage.getBoundingClientRect();
 const px=(e.clientX-r.left)/r.width-.5;
 const py=(e.clientY-r.top)/r.height-.5;
 gsap.to(book,{
   rotateY:px*8,
   rotateX:-py*6,
   x:px*10,
   y:py*10,
   duration:.25,
   ease:"power2.out"
 });
});

stage.addEventListener("mouseleave",()=>{
 gsap.to(book,{
   rotateX:0,
   rotateY:0,
   x:0,
   y:0,
   duration:.45
 });
});

});
