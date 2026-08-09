/* videos.js - Part 6.3 */
document.addEventListener("DOMContentLoaded",()=>{
if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.video-card').forEach((card,i)=>{
const video=card.querySelector('video');
gsap.from(card,{opacity:0,y:80,scale:.95,duration:1,delay:i*.08,ease:'power3.out',
scrollTrigger:{trigger:card,start:'top 85%',once:true}});
if(video){
ScrollTrigger.create({
trigger:card,start:'top bottom',end:'bottom top',
onEnter:()=>video.play(),
onEnterBack:()=>video.play(),
onLeave:()=>video.pause(),
onLeaveBack:()=>video.pause()
});
}
card.addEventListener('mousemove',e=>{
const r=card.getBoundingClientRect();
const rx=((e.clientY-r.top)/r.height-.5)*-8;
const ry=((e.clientX-r.left)/r.width-.5)*8;
gsap.to(card,{rotateX:rx,rotateY:ry,duration:.25});
});
card.addEventListener('mouseleave',()=>gsap.to(card,{rotateX:0,rotateY:0,duration:.4}));
});
});
