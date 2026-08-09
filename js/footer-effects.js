/* ==========================================================
footer-effects.js
Part 11.3 - Luxury Footer Effects
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const footer=document.querySelector("footer");
if(!footer) return;

// Ambient glow
const glow=document.createElement("div");
glow.style.cssText=`
position:absolute;inset:0;pointer-events:none;z-index:0;
background:
radial-gradient(circle at 20% 20%,rgba(212,175,55,.10),transparent 35%),
radial-gradient(circle at 80% 80%,rgba(255,235,170,.08),transparent 40%);
`;
footer.appendChild(glow);

// Light rays
for(let i=0;i<5;i++){
 const ray=document.createElement("div");
 ray.style.cssText=`
 position:absolute;
 left:${15+i*18}%;
 top:-20%;
 width:2px;
 height:150%;
 background:linear-gradient(to bottom,rgba(255,235,170,.18),transparent);
 transform:rotate(${i*4-8}deg);
 filter:blur(2px);
 opacity:.18;
 pointer-events:none;`;
 footer.appendChild(ray);

 gsap.to(ray,{
  y:40,
  opacity:.35,
  repeat:-1,
  yoyo:true,
  duration:3+i*.4,
  ease:"sine.inOut"
 });
}

// Gold particles
for(let i=0;i<70;i++){
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
 opacity:${0.3+Math.random()*.5};
 pointer-events:none;`;
 footer.appendChild(p);

 gsap.to(p,{
  y:-500,
  x:(Math.random()*100)-50,
  opacity:0,
  repeat:-1,
  delay:Math.random()*4,
  duration:6+Math.random()*3,
  ease:"none"
 });
}
/* =========================================================
   BACK TO TOP
   Scroll + Smooth Up
========================================================= */

const topBtn = document.getElementById("backTop");

if(topBtn){

    /* Initially hide */
    topBtn.style.opacity = "0";
    topBtn.style.pointerEvents = "none";

    /* Show button after scrolling */
    window.addEventListener("scroll", () => {

        if(window.scrollY > 400){

            topBtn.style.opacity = "1";
            topBtn.style.pointerEvents = "auto";

        }else{

            topBtn.style.opacity = "0";
            topBtn.style.pointerEvents = "none";

        }

    });


    /* Click → Smoothly go to top */

    topBtn.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();

        window.scrollTo({

            top:0,
            left:0,

            behavior:"smooth"

        });

    });

}
});