/* ==========================================================
gallery-light.js
Part 9.5 - Cinematic Lighting + Lens Flare
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const gallery=document.getElementById("gallery");
if(!gallery) return;

const spotlight=document.createElement("div");
spotlight.style.cssText=`
position:absolute;
width:340px;
height:340px;
border-radius:50%;
background:radial-gradient(circle,
rgba(255,235,170,.22),
rgba(212,175,55,.10),
transparent 70%);
filter:blur(18px);
pointer-events:none;
opacity:0;
transform:translate(-50%,-50%);
z-index:2;`;
gallery.appendChild(spotlight);

gallery.addEventListener("mousemove",e=>{
 const r=gallery.getBoundingClientRect();
 gsap.to(spotlight,{
   left:e.clientX-r.left,
   top:e.clientY-r.top,
   opacity:1,
   duration:.15
 });
});

gallery.addEventListener("mouseleave",()=>{
 gsap.to(spotlight,{opacity:0,duration:.3});
});

document.querySelectorAll(".gallery-card").forEach((card,i)=>{

 const flare=document.createElement("div");
 flare.style.cssText=`
 position:absolute;
 top:-45px;
 right:-45px;
 width:140px;
 height:140px;
 border-radius:50%;
 background:radial-gradient(circle,
 rgba(255,225,120,.35),
 rgba(212,175,55,.12),
 transparent 72%);
 filter:blur(14px);
 pointer-events:none;
 opacity:.35;`;
 card.appendChild(flare);

 gsap.to(flare,{
   rotation:360,
   scale:1.15,
   repeat:-1,
   duration:8+i,
   ease:"none"
 });

 card.addEventListener("mouseenter",()=>{
   gsap.to(flare,{opacity:.75,scale:1.3,duration:.3});
 });

 card.addEventListener("mouseleave",()=>{
   gsap.to(flare,{opacity:.35,scale:1,duration:.3});
 });

});

});