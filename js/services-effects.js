/* ==========================================================
services-effects.js
Part 5.3 - Reflection + Mouse Light + Gold Dust
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".svc-card").forEach(card=>{

  const light=document.createElement("div");
  light.className="svc-mouse-light";
  light.style.cssText=`
    position:absolute;
    width:160px;
    height:160px;
    border-radius:50%;
    pointer-events:none;
    background:radial-gradient(circle,
      rgba(255,235,170,.28) 0%,
      rgba(212,175,55,.16) 35%,
      transparent 72%);
    mix-blend-mode:screen;
    filter:blur(18px);
    opacity:.22;
    transform:translate(-50%,-50%);
    z-index:5;
  `;
  card.appendChild(light);

  const reflection=document.createElement("div");
  reflection.style.cssText=`
    position:absolute;
    inset:0;
    border-radius:28px;
    background:linear-gradient(115deg,
      transparent 20%,
      rgba(255,255,255,.12) 48%,
      transparent 75%);
    transform:translateX(-180%);
    pointer-events:none;
    z-index:4;
  `;
  card.appendChild(reflection);

  card.addEventListener("mouseenter",()=>{
      gsap.to(light,{opacity:1,duration:.25});
      gsap.fromTo(reflection,
        {xPercent:-180},
        {xPercent:180,duration:1.2,ease:"power2.out"});
  });

  card.addEventListener("mousemove",(e)=>{
      const r=card.getBoundingClientRect();
      gsap.to(light,{
          left:e.clientX-r.left,
          top:e.clientY-r.top,
          duration:.08
      });
  });

  card.addEventListener("mouseleave",()=>{
      gsap.to(light,{opacity:0,duration:.25});
  });

  for(let i=0;i<10;i++){
      const p=document.createElement("span");
      p.style.cssText=`
      position:absolute;
      width:${2+i%3}px;
      height:${2+i%3}px;
      border-radius:50%;
      background:#d4af37;
      left:${10+i*8}%;
      bottom:-12px;
      opacity:.55;
      box-shadow:0 0 10px rgba(212,175,55,.8);
      pointer-events:none;
      `;
      card.appendChild(p);

      gsap.to(p,{
        y:-320,
        x:(Math.random()*50)-25,
        opacity:0,
        repeat:-1,
        delay:i*.25,
        duration:4+Math.random()*2,
        ease:"none"
      });
  }

});

});
