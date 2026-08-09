/* ==========================================================
contact-effects.js
Part 10.4 - Luxury Contact Effects
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const section=document.getElementById("contact");
if(!section) return;

/* Ambient golden glow */
const glow=document.createElement("div");
glow.style.cssText=`
position:absolute;inset:0;pointer-events:none;z-index:0;
background:
radial-gradient(circle at 20% 20%,rgba(212,175,55,.10),transparent 35%),
radial-gradient(circle at 80% 80%,rgba(255,235,170,.08),transparent 40%);
`;
section.appendChild(glow);

/* Light rays */
for(let i=0;i<6;i++){
 const ray=document.createElement("div");
 ray.style.cssText=`
 position:absolute;
 top:-15%;
 left:${8+i*16}%;
 width:2px;
 height:140%;
 background:linear-gradient(to bottom,rgba(255,235,170,.22),transparent);
 transform:rotate(${i*4-10}deg);
 opacity:.18;
 filter:blur(2px);
 pointer-events:none;
 z-index:1;`;
 section.appendChild(ray);
 gsap.to(ray,{
   opacity:.35,
   y:50,
   repeat:-1,
   yoyo:true,
   duration:3+i*.35,
   ease:"sine.inOut"
 });
}

/* Floating gold particles */
for(let i=0;i<80;i++){
 const p=document.createElement("span");
 const s=2+Math.random()*3;
 p.style.cssText=`
 position:absolute;
 left:${Math.random()*100}%;
 bottom:-20px;
 width:${s}px;
 height:${s}px;
 border-radius:50%;
 background:#f7df84;
 box-shadow:0 0 12px rgba(212,175,55,.8);
 opacity:${0.2+Math.random()*0.7};
 pointer-events:none;
 z-index:1;`;
 section.appendChild(p);

 gsap.to(p,{
   y:-1200,
   x:(Math.random()*120)-60,
   opacity:0,
   duration:8+Math.random()*5,
   delay:Math.random()*5,
   repeat:-1,
   ease:"none"
 });
}

});