/* ==========================================================
about-stats.js
Part 4.6 - Premium Counters + Luxury Statistics
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined" || typeof ScrollTrigger==="undefined") return;
gsap.registerPlugin(ScrollTrigger);

const about=document.querySelector("#about .about-container");
if(!about) return;

const wrap=document.createElement("section");
wrap.className="about-stats";
wrap.innerHTML=`
<div class="stat-card"><span class="count" data-target="2008">0</span><small>Founded</small></div>
<div class="stat-card"><span class="count" data-target="500">0</span><small>Events</small></div>
<div class="stat-card"><span class="count" data-target="50000">0</span><small>Happy Guests</small></div>
<div class="stat-card"><span class="count" data-target="18">0</span><small>Years of Excellence</small></div>
`;
about.appendChild(wrap);

const style=document.createElement("style");
style.textContent=`
.about-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin:90px 0 40px}
.stat-card{padding:32px;border-radius:24px;background:rgba(255,255,255,.05);backdrop-filter:blur(14px);border:1px solid rgba(212,175,55,.25);text-align:center;transition:.4s}
.stat-card:hover{transform:translateY(-8px) scale(1.03);box-shadow:0 0 40px rgba(212,175,55,.25)}
.stat-card .count{display:block;font:700 54px Cinzel,serif;color:#f5d77a;text-shadow:0 0 18px rgba(212,175,55,.4)}
.stat-card small{display:block;margin-top:10px;color:#ddd;font:500 16px Poppins,sans-serif;letter-spacing:2px;text-transform:uppercase}
@media(max-width:900px){.about-stats{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.about-stats{grid-template-columns:1fr}}
`;
document.head.appendChild(style);

document.querySelectorAll(".count").forEach(el=>{
 const target=parseInt(el.dataset.target,10);
 ScrollTrigger.create({
   trigger:el,
   start:"top 85%",
   once:true,
   onEnter:()=>{
     let obj={v:0};
     gsap.to(obj,{
       v:target,
       duration:2,
       ease:"power2.out",
       onUpdate:()=>{
         let n=Math.floor(obj.v);
         if(target>=1000){
            el.textContent=n.toLocaleString()+"+";
         }else if(target==500){
            el.textContent=n+"+";
         }else{
            el.textContent=n;
         }
       }
     });
   }
 });
});

});
