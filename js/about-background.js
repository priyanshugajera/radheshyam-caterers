/* Part 4.9 background effects */
document.addEventListener("DOMContentLoaded",()=>{
 const about=document.getElementById("about");
 if(!about) return;

 about.insertAdjacentHTML("afterbegin",
 '<div class="about-hdr"></div><div class="about-vignette"></div>\
<div class="corner-ornament tl"></div><div class="corner-ornament tr"></div>\
<div class="corner-ornament bl"></div><div class="corner-ornament br"></div>');

 for(let i=0;i<180;i++){
   const d=document.createElement("span");
   d.className="gold-dust";
   d.style.left=Math.random()*100+"%";
   d.style.bottom=(-Math.random()*120)+"px";
   d.style.animationDuration=(8+Math.random()*8)+"s";
   d.style.animationDelay=(Math.random()*8)+"s";
   about.appendChild(d);
 }
});
