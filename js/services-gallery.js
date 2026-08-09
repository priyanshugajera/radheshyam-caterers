/* ==========================================================
services-gallery.js
Part 5.2 - Luxury Image Gallery Cards
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

document.querySelectorAll(".svc-card").forEach(card=>{

  const imgs=card.querySelectorAll(".img");

  imgs.forEach((img,i)=>{

    img.style.transformStyle="preserve-3d";

    gsap.to(img,{
      y:-3,
      repeat:-1,
      yoyo:true,
      duration:2+i*.25,
      ease:"sine.inOut"
    });

    img.addEventListener("mouseenter",()=>{
      gsap.to(img,{
        scale:1.02,
        rotateY:3,
        z:6,
        boxShadow:"0 0 35px rgba(212,175,55,.45)",
        duration:.35
      });
    });

    img.addEventListener("mouseleave",()=>{
      gsap.to(img,{
        scale:1,
        rotateY:0,
        z:0,
        boxShadow:"0 0 0 rgba(0,0,0,0)",
        duration:.35
      });
    });

  });

  const border=document.createElement("div");
  border.style.cssText=`
  position:absolute;
  inset:0;
  border-radius:28px;
  pointer-events:none;
  border:1px solid rgba(212,175,55,.18);
  `;
  card.appendChild(border);

  gsap.to(border,{
    boxShadow:"0 0 45px rgba(212,175,55,.35)",
    repeat:-1,
    yoyo:true,
    duration:1.8
  });

});

});
