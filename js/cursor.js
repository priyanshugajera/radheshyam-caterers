/* =====================================================
 cursor.js
 Luxury Cursor Foundation
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

const cursor=document.getElementById("cursor");
if(!cursor) return;

let mx=window.innerWidth/2;
let my=window.innerHeight/2;
let cx=mx;
let cy=my;

window.addEventListener("mousemove",(e)=>{
    mx=e.clientX;
    my=e.clientY;
});

function animate(){
    cx+=(mx-cx)*0.18;
    cy+=(my-cy)*0.18;

    cursor.style.left=cx+"px";
    cursor.style.top=cy+"px";

    requestAnimationFrame(animate);
}
animate();

document.querySelectorAll("a,button,.glass-card").forEach(el=>{

    el.addEventListener("mouseenter",()=>{
        cursor.style.width="48px";
        cursor.style.height="48px";
        cursor.style.borderColor="#F6E7A1";
        cursor.style.boxShadow="0 0 35px rgba(212,175,55,.8)";
        cursor.style.background="rgba(212,175,55,.15)";
    });

    el.addEventListener("mouseleave",()=>{
        cursor.style.width="18px";
        cursor.style.height="18px";
        cursor.style.borderColor="#D4AF37";
        cursor.style.boxShadow="0 0 0 rgba(0,0,0,0)";
        cursor.style.background="transparent";
    });

    el.addEventListener("mousemove",(e)=>{
        const r=el.getBoundingClientRect();
        const x=e.clientX-r.left-r.width/2;
        const y=e.clientY-r.top-r.height/2;
        el.style.transition="transform .18s ease";
        el.style.transform=
            `perspective(900px) rotateY(${x/18}deg) rotateX(${-y/18}deg) translateZ(8px)`;
    });

    el.addEventListener("mouseleave",()=>{
        el.style.transform="";
    });

});

window.addEventListener("mousedown",()=>{
    cursor.animate([
        {transform:"translate(-50%,-50%) scale(1)"},
        {transform:"translate(-50%,-50%) scale(.75)"},
        {transform:"translate(-50%,-50%) scale(1.25)"},
        {transform:"translate(-50%,-50%) scale(1)"}
    ],{
        duration:300,
        easing:"ease-out"
    });
});

});
