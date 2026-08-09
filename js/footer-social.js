/* ==========================================================
footer-social.js
Part 11.4 - Premium Social Icons
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{
if(typeof gsap==="undefined") return;

document.querySelectorAll(".social-icons a").forEach(icon=>{

const glow=document.createElement("span");
glow.style.cssText=`
position:absolute;inset:-25%;
border-radius:50%;
background:radial-gradient(circle,rgba(255,235,170,.35),transparent 70%);
opacity:0;pointer-events:none;filter:blur(10px);`;
icon.style.position="relative";
icon.style.overflow="hidden";
icon.appendChild(glow);

icon.addEventListener("mousemove",e=>{
 const r=icon.getBoundingClientRect();
 const x=e.clientX-r.left-r.width/2;
 const y=e.clientY-r.top-r.height/2;
 gsap.to(icon,{x:x*.15,y:y*.15,scale:1.12,duration:.2});
 gsap.to(glow,{opacity:1,duration:.2});
});

icon.addEventListener("mouseenter",()=>{
 const ripple=document.createElement("span");
 ripple.style.cssText=`
 position:absolute;left:50%;top:50%;
 width:10px;height:10px;border-radius:50%;
 background:rgba(255,255,255,.45);
 transform:translate(-50%,-50%) scale(0);
 pointer-events:none;`;
 icon.appendChild(ripple);
 gsap.to(ripple,{
   scale:9,opacity:0,duration:.7,
   onComplete:()=>ripple.remove()
 });
});

icon.addEventListener("mouseleave",()=>{
 gsap.to(icon,{x:0,y:0,scale:1,duration:.3,ease:"power2.out"});
 gsap.to(glow,{opacity:0,duration:.25});
});

});
});