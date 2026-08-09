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
">
<button id="nextBtn" style="position:absolute;right:30px;font-size:40px;">❯</button>
<button id="closeBtn" style="position:absolute;top:20px;right:30px;font-size:34px;">✕</button>
`;
document.body.appendChild(modal);

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
