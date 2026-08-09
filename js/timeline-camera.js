/* ==========================================================
 timeline-camera.js
 Part 4.5 - Cinematic Timeline Camera + Light Burst + Parallax
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined" || typeof ScrollTrigger==="undefined") return;

gsap.registerPlugin(ScrollTrigger);

const about=document.querySelector("#about");
const cards=gsap.utils.toArray(".timeline-card");
const title=document.querySelector(".about-title");
const line=document.querySelector(".timeline-line");

if(!about) return;

/* Camera Push */
gsap.to(about,{
    backgroundPosition:"50% 100%",
    ease:"none",
    scrollTrigger:{
        trigger:about,
        start:"top bottom",
        end:"bottom top",
        scrub:1.2
    }
});

/* Title depth */
if(title){
gsap.fromTo(title,
    {scale:.92,y:80,opacity:0},
    {
        scale:1,
        y:0,
        opacity:1,
        ease:"power3.out",
        scrollTrigger:{
            trigger:title,
            start:"top 82%"
        }
    });
}

/* Timeline line glow */
if(line){
gsap.to(line,{
    boxShadow:"0 0 60px rgba(255,220,120,.95)",
    repeat:-1,
    yoyo:true,
    duration:1.8
});
}

/* Cards */
cards.forEach((card,i)=>{

ScrollTrigger.create({
    trigger:card,
    start:"top 75%",
    end:"bottom 35%",
    onEnter:()=>burst(card),
    onEnterBack:()=>burst(card)
});

card.addEventListener("mousemove",e=>{

const r=card.getBoundingClientRect();
const x=((e.clientX-r.left)/r.width-.5)*16;
const y=((e.clientY-r.top)/r.height-.5)*16;

gsap.to(card,{
    rotateY:x,
    rotateX:-y,
    x:x*.5,
    y:y*.25,
    duration:.25
});

});

card.addEventListener("mouseleave",()=>{

gsap.to(card,{
    rotateX:0,
    rotateY:0,
    x:0,
    y:0,
    duration:.45,
    ease:"power2.out"
});

});

});

/* Light burst */
function burst(target){

const flash=document.createElement("div");

flash.style.cssText=`
position:absolute;
inset:0;
border-radius:30px;
pointer-events:none;
background:radial-gradient(circle,
rgba(255,240,170,.45),
rgba(212,175,55,.18),
transparent 70%);
mix-blend-mode:screen;
`;

target.appendChild(flash);

gsap.fromTo(flash,
{opacity:1,scale:.6},
{
opacity:0,
scale:1.8,
duration:.9,
ease:"power2.out",
onComplete:()=>flash.remove()
});

}

});
