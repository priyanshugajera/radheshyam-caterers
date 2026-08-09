/* ==========================================================
theatre-modal.js
Part 6.6 - Premium Theatre Video Modal
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

const cards=[...document.querySelectorAll(".video-card")];
if(!cards.length) return;

const modal=document.createElement("div");
modal.id="theatreModal";
modal.style.cssText=`
position:fixed;inset:0;background:rgba(0,0,0,.92);
display:none;align-items:center;justify-content:center;
z-index:99999;backdrop-filter:blur(12px);`;

modal.innerHTML=`
<button id="prevBtn" style="position:absolute;left:30px;font-size:40px;">❮</button>
<video id="modalVideo"
controls
autoplay
playsinline
style="
width:auto;
height:auto;
max-width:95vw;
max-height:92vh;
object-fit:contain;
border-radius:22px;
background:#000;
"></video>
<button id="nextBtn" style="position:absolute;right:30px;font-size:40px;">❯</button>
<button id="closeBtn" aria-label="Close video">
    <i class="fa-solid fa-xmark"></i>
</button>
`;
document.body.appendChild(modal);
const closeBtn = modal.querySelector("#closeBtn");

closeBtn.style.cssText = `
    position:absolute;
    top:22px;
    right:28px;
    width:52px;
    height:52px;
    border:none;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    background:linear-gradient(135deg,#f7df84,#d4af37,#b98a22);
    color:#111;
    font-size:24px;
    font-weight:700;
    cursor:pointer;
    z-index:100002;
    box-shadow:0 8px 30px rgba(212,175,55,.45);
    transition:all .3s ease;
`;

closeBtn.addEventListener("mouseenter",()=>{
    closeBtn.style.transform="scale(1.12) rotate(90deg)";
    closeBtn.style.boxShadow="0 12px 40px rgba(212,175,55,.7)";
});

closeBtn.addEventListener("mouseleave",()=>{
    closeBtn.style.transform="scale(1) rotate(0deg)";
    closeBtn.style.boxShadow="0 8px 30px rgba(212,175,55,.45)";
});
const mobileStyle = document.createElement("style");

mobileStyle.textContent = `
@media(max-width:640px){

    #closeBtn{
        top:14px !important;
        right:14px !important;
        width:46px !important;
        height:46px !important;
        font-size:20px !important;
    }

    #theatreModal #modalVideo{
        max-width:94vw !important;
        max-height:82vh !important;
        border-radius:14px !important;
    }

    #theatreModal #prevBtn{
        left:8px !important;
        font-size:28px !important;
        z-index:100001;
    }

    #theatreModal #nextBtn{
        right:8px !important;
        font-size:28px !important;
        z-index:100001;
    }
}
`;

document.head.appendChild(mobileStyle);
const player=modal.querySelector("#modalVideo");
let index=0;

function load(i){
 index=(i+cards.length)%cards.length;
 const src=cards[index].querySelector("source");
 if(src){
   player.src=src.getAttribute("src");
   player.load();
   player.play().catch(()=>{});
 }
}

cards.forEach((c,i)=>{
 c.style.cursor="pointer";
 c.addEventListener("click",()=>{
   modal.style.display="flex";
   load(i);
   if(window.gsap){
     gsap.fromTo(player,{scale:.85,opacity:0},{scale:1,opacity:1,duration:.35});
   }
 });
});

modal.querySelector("#closeBtn").onclick=()=>{
 player.pause();
 modal.style.display="none";
};

modal.querySelector("#nextBtn").onclick=()=>load(index+1);
modal.querySelector("#prevBtn").onclick=()=>load(index-1);

document.addEventListener("keydown",e=>{
 if(modal.style.display!=="flex") return;
 if(e.key==="Escape") modal.querySelector("#closeBtn").click();
 if(e.key==="ArrowRight") load(index+1);
 if(e.key==="ArrowLeft") load(index-1);
});

});
