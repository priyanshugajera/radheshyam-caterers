/* ==========================================================
brochure-download.js
Part 8.6 - Premium Download Button
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const btn=document.querySelector(".download-btn");
if(!btn) return;

btn.style.position="relative";
btn.style.overflow="hidden";

const progress=document.createElement("div");
progress.style.cssText=`
position:absolute;
left:0;
top:0;
height:100%;
width:0%;
background:linear-gradient(90deg,#f7df84,#d4af37);
opacity:.25;
pointer-events:none;`;
btn.appendChild(progress);
btn.addEventListener("click",e=>{

    // ===== Download PDF =====
    const link=document.createElement("a");
    link.href="assets/brochure/brochure.pdf";
    link.download="Radhe-Shyam-Caterers-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // ===== Ripple =====
    const ripple=document.createElement("span");
    const r=btn.getBoundingClientRect();
    const size=Math.max(r.width,r.height);

    ripple.style.cssText=`
    position:absolute;
    width:${size}px;
    height:${size}px;
    left:${e.clientX-r.left-size/2}px;
    top:${e.clientY-r.top-size/2}px;
    border-radius:50%;
    background:rgba(255,255,255,.35);
    transform:scale(0);
    pointer-events:none;`;

    btn.appendChild(ripple);

    gsap.to(ripple,{
        scale:3,
        opacity:0,
        duration:.8,
        onComplete:()=>ripple.remove()
    });

    gsap.fromTo(progress,
        {width:"0%"},
        {width:"100%",duration:1,ease:"power2.out"}
    );

    gsap.to(btn,{
        scale:.96,
        duration:.08,
        yoyo:true,
        repeat:1
    });

    setTimeout(()=>{

        progress.style.width="0%";

        const old=btn.innerHTML;
        btn.innerHTML="✓ Download Started";

        gsap.fromTo(btn,
            {boxShadow:"0 0 0 rgba(0,0,0,0)"},
            {boxShadow:"0 0 35px rgba(80,255,140,.7)",duration:.4}
        );

        setTimeout(()=>{
            btn.innerHTML=old;
            btn.appendChild(progress);
        },2200);

    },1050);

});

});
