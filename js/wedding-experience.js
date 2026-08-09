/* ==========================================================
wedding-experience.js
Part 5.0 - Luxury Wedding Experience
========================================================== */
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined") return;
gsap.registerPlugin(ScrollTrigger);

const sec=document.querySelector("#weddingExperience");
if(!sec) return;

sec.innerHTML=`
<div class="lux-bg"></div>
<div class="lux-overlay"></div>

<div class="lux-content">
 <div class="lux-left">
   <span class="tag">Luxury Wedding Experience</span>
   <h2>Royal Buffet Presentation</h2>
   <p>Elegant presentation, premium hospitality and authentic Gujarati taste crafted for unforgettable celebrations.</p>
 </div>

 <div class="lux-right">
   <div class="glass-card c1"></div>
   <div class="glass-card c2"></div>
   <div class="glass-card c3"></div>
 </div>
</div>`;

const style=document.createElement("style");
style.textContent=`
#weddingExperience{position:relative;min-height:100vh;background:#080808;overflow:hidden;padding:120px 6%}
.lux-bg{position:absolute;inset:0;background:radial-gradient(circle at top,#3b2807,#090909 55%,#050505);transform:scale(1.08)}
.lux-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,215,120,.05),transparent)}
.lux-content{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:60px}
.tag{color:#d4af37;letter-spacing:6px;font:600 18px Cinzel}
.lux-left h2{font:700 clamp(44px,5vw,72px) Cinzel;color:#fff;margin:20px 0}
.lux-left p{font:18px/1.8 Poppins;color:#ddd;max-width:560px}
.lux-right{display:flex;gap:28px;justify-content:center;perspective:1400px}
.glass-card{width:220px;height:360px;border-radius:30px;background:linear-gradient(rgba(255,255,255,.09),rgba(255,255,255,.03));backdrop-filter:blur(20px);border:1px solid rgba(212,175,55,.25);box-shadow:0 30px 80px rgba(0,0,0,.5)}
@media(max-width:900px){.lux-content{grid-template-columns:1fr}.lux-right{flex-wrap:wrap}}
`;
document.head.appendChild(style);

gsap.from(".lux-left",{x:-120,opacity:0,duration:1.2,scrollTrigger:{trigger:sec,start:"top 75%"}});
gsap.from(".glass-card",{y:120,opacity:0,stagger:.15,duration:1.1,scrollTrigger:{trigger:sec,start:"top 70%"}});

gsap.to(".lux-bg",{yPercent:15,ease:"none",scrollTrigger:{trigger:sec,start:"top bottom",end:"bottom top",scrub:true}});

document.querySelectorAll(".glass-card").forEach(card=>{
 card.addEventListener("mousemove",e=>{
   const r=card.getBoundingClientRect();
   const x=((e.clientX-r.left)/r.width-.5)*16;
   const y=((e.clientY-r.top)/r.height-.5)*16;
   gsap.to(card,{rotateY:x,rotateX:-y,duration:.25});
 });
 card.addEventListener("mouseleave",()=>gsap.to(card,{rotateX:0,rotateY:0,duration:.4}));
});

});
