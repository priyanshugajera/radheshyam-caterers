/* ==========================================================
gallery-fullscreen.js
Part 9.6 - Fullscreen Poster Viewer
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

const posters=[...document.querySelectorAll(".gallery-card img")];
if(!posters.length) return;

let index=0,zoom=1;

const viewer=document.createElement("div");
viewer.style.cssText=`
position:fixed;inset:0;background:rgba(0,0,0,.92);
display:none;justify-content:center;align-items:center;
z-index:999999;overflow:hidden;`;

viewer.innerHTML=`
<img id="gvImg" style="max-width:88vw;max-height:84vh;border-radius:18px;transition:.25s">
<div style="position:fixed;top:18px;left:50%;transform:translateX(-50%);
display:flex;gap:10px;background:rgba(20,20,20,.7);padding:10px 16px;
border-radius:16px;border:1px solid rgba(212,175,55,.35);backdrop-filter:blur(10px)">
<button id="gPrev">⟨ Prev</button>
<button id="gNext">Next ⟩</button>
<button id="gIn">＋</button>
<button id="gOut">－</button>
<button id="gReset">100%</button>
<button id="gClose">✕</button>
</div>`;
document.body.appendChild(viewer);

const img=viewer.querySelector("#gvImg");

function render(){
 img.src=posters[index].src;
 img.style.transform=`scale(${zoom})`;
}
function open(i){
 index=i;zoom=1;render();
 viewer.style.display="flex";
}
function close(){viewer.style.display="none";}

posters.forEach((p,i)=>p.addEventListener("click",()=>open(i)));

viewer.querySelector("#gPrev").onclick=()=>{index=(index-1+posters.length)%posters.length;render();};
viewer.querySelector("#gNext").onclick=()=>{index=(index+1)%posters.length;render();};
viewer.querySelector("#gIn").onclick=()=>{zoom=Math.min(3,zoom+.2);render();};
viewer.querySelector("#gOut").onclick=()=>{zoom=Math.max(.5,zoom-.2);render();};
viewer.querySelector("#gReset").onclick=()=>{zoom=1;render();};
viewer.querySelector("#gClose").onclick=close;

document.addEventListener("keydown",e=>{
 if(viewer.style.display!=="flex") return;
 if(e.key==="Escape") close();
 if(e.key==="ArrowRight") viewer.querySelector("#gNext").click();
 if(e.key==="ArrowLeft") viewer.querySelector("#gPrev").click();
 if(e.key==="+"||e.key==="=") viewer.querySelector("#gIn").click();
 if(e.key==="-") viewer.querySelector("#gOut").click();
});

viewer.addEventListener("click",e=>{if(e.target===viewer) close();});

});
