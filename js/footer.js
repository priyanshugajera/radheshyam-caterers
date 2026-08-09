/* ==========================================================
footer.js
Part 11.2 - GSAP Footer Animation
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

if(typeof ScrollTrigger!=="undefined"){
gsap.registerPlugin(ScrollTrigger);
}

const footer=document.querySelector("footer");
if(!footer) return;

gsap.from(".footer-grid",{
opacity:0,
y:80,
duration:1,
ease:"power3.out",
scrollTrigger:{
trigger:footer,
start:"top 90%"
}
});

gsap.from(".footer-title,.footer-links a,.footer-contact a",{
opacity:0,
y:25,
stagger:.06,
duration:.7,
ease:"power2.out",
scrollTrigger:{
trigger:footer,
start:"top 85%"
}
});

document.querySelectorAll(".social-icons a").forEach((icon,i)=>{

gsap.to(icon,{
y:-6,
repeat:-1,
yoyo:true,
duration:1.8+i*.15,
ease:"sine.inOut"
});

icon.addEventListener("mouseenter",()=>{
gsap.to(icon,{
scale:1.18,
rotate:10,
duration:.25
});
});

icon.addEventListener("mouseleave",()=>{
gsap.to(icon,{
scale:1,
rotate:0,
duration:.25
});
});

});

const topBtn=document.getElementById("backTop");

if(topBtn){

window.addEventListener("scroll",()=>{
topBtn.style.opacity=window.scrollY>400?"1":"0";
topBtn.style.pointerEvents=window.scrollY>400?"auto":"none";
});

topBtn.addEventListener("click",()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
});

}

});