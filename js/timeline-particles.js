/* ==========================================================
 timeline-particles.js
 Part 4.4 - Luxury Gold Dust & Timeline Particles
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

const about=document.getElementById("about");
if(!about) return;

const layer=document.createElement("div");
layer.id="timelineParticles";
layer.style.cssText=`
position:absolute;
inset:0;
overflow:hidden;
pointer-events:none;
z-index:1;
`;
about.appendChild(layer);

function makeParticle(){

    const p=document.createElement("span");

    const s=2+Math.random()*6;

    p.style.cssText=`
    position:absolute;
    width:${s}px;
    height:${s}px;
    border-radius:50%;
    background:radial-gradient(circle,#ffe8a3,#d4af37 70%,transparent);
    box-shadow:0 0 ${8+s*2}px rgba(212,175,55,.9);
    left:${Math.random()*100}%;
    top:${100+Math.random()*20}%;
    opacity:${0.35+Math.random()*0.65};
    transform:translateZ(0);
    `;

    layer.appendChild(p);

    const drift=(Math.random()*200)-100;
    const duration=8+Math.random()*8;

    if(window.gsap){
        gsap.to(p,{
            y:-(window.innerHeight+400),
            x:drift,
            rotation:360,
            scale:0.2,
            opacity:0,
            duration:duration,
            ease:"none",
            onComplete:()=>p.remove()
        });
    }else{
        setTimeout(()=>p.remove(),duration*1000);
    }
}

for(let i=0;i<60;i++){
    setTimeout(makeParticle,i*180);
}

setInterval(makeParticle,220);

const dots=document.querySelectorAll(".timeline-dot");

dots.forEach(dot=>{
    if(!window.gsap) return;

    const aura=document.createElement("span");
    aura.style.cssText=`
    position:absolute;
    inset:-18px;
    border-radius:50%;
    border:1px solid rgba(255,220,120,.35);
    `;
    dot.style.position="relative";
    dot.appendChild(aura);

    gsap.to(aura,{
        scale:2.3,
        opacity:0,
        repeat:-1,
        duration:2.2,
        ease:"power2.out"
    });

    gsap.to(dot,{
        boxShadow:"0 0 45px rgba(255,215,100,.95)",
        repeat:-1,
        yoyo:true,
        duration:1.5
    });
});

});
