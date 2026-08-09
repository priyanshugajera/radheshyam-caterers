/* ==========================================================
video-particles.js
Part 6.5 - Luxury Gold Dust + Fireflies + Cinema Atmosphere
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

const section=document.getElementById("videos");
if(!section) return;

const layer=document.createElement("canvas");
layer.id="videoParticles";
layer.style.cssText=`
position:absolute;
inset:0;
width:100%;
height:100%;
pointer-events:none;
z-index:0;
`;
section.prepend(layer);

const ctx=layer.getContext("2d");

function resize(){
 layer.width=section.offsetWidth;
 layer.height=section.offsetHeight;
}
resize();
window.addEventListener("resize",resize);

const particles=[];
for(let i=0;i<180;i++){
 particles.push({
  x:Math.random()*layer.width,
  y:Math.random()*layer.height,
  r:Math.random()*2+0.5,
  a:Math.random()*0.8+0.2,
  vx:(Math.random()-0.5)*0.25,
  vy:-(Math.random()*0.4+0.1)
 });
}

function draw(){
 ctx.clearRect(0,0,layer.width,layer.height);
 particles.forEach(p=>{
   p.x+=p.vx;
   p.y+=p.vy;
   if(p.y<-10){p.y=layer.height+10;p.x=Math.random()*layer.width;}
   if(p.x<0)p.x=layer.width;
   if(p.x>layer.width)p.x=0;
   const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,12);
   g.addColorStop(0,`rgba(255,235,170,${p.a})`);
   g.addColorStop(0.5,`rgba(212,175,55,${p.a*0.7})`);
   g.addColorStop(1,"rgba(212,175,55,0)");
   ctx.fillStyle=g;
   ctx.beginPath();
   ctx.arc(p.x,p.y,12,0,Math.PI*2);
   ctx.fill();
 });
 requestAnimationFrame(draw);
}
draw();

});
