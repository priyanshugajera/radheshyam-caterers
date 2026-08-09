/* ==========================================================
gallery.js
Part 9.2 - Horizontal Scroll + GSAP
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined") return;
gsap.registerPlugin(ScrollTrigger);

const track=document.querySelector(".gallery-track");
if(!track) return;

const cards=document.querySelectorAll(".gallery-card");

/* entrance */
gsap.from(cards,{
 opacity:0,
 y:80,
 scale:.9,
 stagger:.08,
 duration:1,
 ease:"power3.out",
 scrollTrigger:{
   trigger:"#gallery",
   start:"top 75%"
 }
});

/* wheel -> horizontal */
track.addEventListener("wheel",(e)=>{
 if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){
   e.preventDefault();
   track.scrollLeft += e.deltaY*1.2;
 }
},{passive:false});

/* floating */
cards.forEach((card,i)=>{
 gsap.to(card,{
   y:-8,
   repeat:-1,
   yoyo:true,
   duration:2+i*0.15,
   ease:"sine.inOut"
 });

 card.addEventListener("mouseenter",()=>{
   gsap.to(card,{
     scale:1.04,
     rotateY:6,
     z:20,
     duration:.35,
     ease:"power2.out"
   });
 });

 card.addEventListener("mouseleave",()=>{
   gsap.to(card,{
     scale:1,
     rotateY:0,
     z:0,
     duration:.35
   });
 });
});

/* drag scroll */
let down=false,startX,startScroll;

track.addEventListener("mousedown",(e)=>{
 down=true;
 startX=e.pageX-track.offsetLeft;
 startScroll=track.scrollLeft;
 track.style.cursor="grabbing";
});

window.addEventListener("mouseup",()=>{
 down=false;
 track.style.cursor="grab";
});

track.addEventListener("mousemove",(e)=>{
 if(!down) return;
 e.preventDefault();
 const x=e.pageX-track.offsetLeft;
 const walk=(x-startX)*2;
 track.scrollLeft=startScroll-walk;
});

});