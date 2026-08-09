/* ==========================================================
   about.js
   Part 4.3 - GSAP + 3D Timeline Animation
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

gsap.registerPlugin(ScrollTrigger);

gsap.set(".about-title",{opacity:0,y:80});
gsap.to(".about-title",{
 opacity:1,
 y:0,
 duration:1.2,
 ease:"power4.out",
 scrollTrigger:{
   trigger:"#about",
   start:"top 70%"
 }
});

gsap.utils.toArray(".timeline-card").forEach((card,i)=>{

 gsap.set(card,{
   opacity:0,
   y:120,
   rotateX:12,
   rotateY:i%2?8:-8,
   transformPerspective:1200
 });

 gsap.to(card,{
   opacity:1,
   y:0,
   rotateX:0,
   rotateY:0,
   duration:1.1,
   ease:"power3.out",
   scrollTrigger:{
      trigger:card,
      start:"top 85%"
   }
 });

 card.addEventListener("mousemove",(e)=>{
   const r=card.getBoundingClientRect();
   const x=(e.clientX-r.left)/r.width-.5;
   const y=(e.clientY-r.top)/r.height-.5;

   gsap.to(card,{
      rotateY:x*10,
      rotateX:-y*10,
      duration:.25
   });
 });

 card.addEventListener("mouseleave",()=>{
   gsap.to(card,{
      rotateX:0,
      rotateY:0,
      duration:.45,
      ease:"power2.out"
   });
 });

});

gsap.to(".timeline-line",{
 backgroundPosition:"0 400px",
 repeat:-1,
 duration:5,
 ease:"none"
});

gsap.utils.toArray(".timeline-dot").forEach(dot=>{
 gsap.to(dot,{
   scale:1.4,
   boxShadow:"0 0 50px rgba(255,220,120,.95)",
   repeat:-1,
   yoyo:true,
   duration:1.5
 });
});

for(let i=0;i<70;i++){
 const p=document.createElement("span");
 p.className="gold-particle";
 p.style.left=Math.random()*100+"%";
 p.style.animationDelay=(Math.random()*8)+"s";
 p.style.animationDuration=(6+Math.random()*6)+"s";
 document.getElementById("about").appendChild(p);
}

});
