/* ==========================================================
page-flip.js
Part 8.3 - Ultra Realistic Page Curl + Spine Physics
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const book=document.querySelector(".flip-book");
const img=document.getElementById("brochurePage");
if(!book||!img) return;

const curl=document.createElement("div");
curl.style.cssText=`
position:absolute;
top:0;
right:0;
width:35%;
height:100%;
background:linear-gradient(to left,
rgba(0,0,0,.45),
rgba(255,255,255,.08),
transparent);
transform-origin:right center;
transform:rotateY(90deg);
pointer-events:none;
z-index:8;`;
book.appendChild(curl);

const shadow=document.createElement("div");
shadow.style.cssText=`
position:absolute;
left:0;
top:0;
width:100%;
height:100%;
background:radial-gradient(circle at center,
transparent 45%,
rgba(0,0,0,.28));
opacity:0;
pointer-events:none;
z-index:7;`;
book.appendChild(shadow);

function flip(dir=1){
 gsap.timeline()
 .to(curl,{rotateY:0,opacity:1,duration:.18,ease:"power2.in"})
 .to(book,{
    rotateY:dir>0?-88:88,
    duration:.30,
    ease:"power2.inOut"
 },0)
 .to(shadow,{opacity:.7,duration:.25},0)
 .to(book,{
    rotateY:0,
    duration:.42,
    ease:"power3.out"
 })
 .to(curl,{
    rotateY:90,
    opacity:0,
    duration:.28
 },0.30)
 .to(shadow,{opacity:0,duration:.25},0.30);
}

document.querySelector(".next")?.addEventListener("click",()=>flip(1));
document.querySelector(".prev")?.addEventListener("click",()=>flip(-1));

book.addEventListener("mousemove",e=>{
 const r=book.getBoundingClientRect();
 const px=(e.clientX-r.left)/r.width-.5;
 const py=(e.clientY-r.top)/r.height-.5;
 gsap.to(book,{
   rotateY:px*6,
   rotateX:-py*4,
   transformPerspective:1800,
   duration:.2
 });
});

book.addEventListener("mouseleave",()=>{
 gsap.to(book,{rotateX:0,rotateY:0,duration:.35});
});

});
