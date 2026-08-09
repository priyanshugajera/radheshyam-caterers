/* brochure-fullscreen.js */
document.addEventListener("DOMContentLoaded",()=>{
if(typeof gsap==="undefined") return;
const btn=document.querySelector(".fullscreen-btn");
const book=document.querySelector(".flip-book");
const img=document.getElementById("brochurePage");
if(!btn||!book||!img) return;

let zoom=1;
const pages=[
"assets/brochure/page1.jpg",
"assets/brochure/page2.jpg",
"assets/brochure/page3.jpg",
"assets/brochure/page4.jpg",
"assets/brochure/page5.jpg",
"assets/brochure/page6.jpg",
"assets/brochure/page7.jpg",
"assets/brochure/page8.jpg"
];

let current=0;

const toolbar=document.createElement("div");
toolbar.style.cssText="position:fixed;top:20px;left:50%;transform:translateX(-50%);display:none;gap:10px;z-index:99999;background:rgba(20,20,20,.75);backdrop-filter:blur(12px);padding:10px 14px;border-radius:16px;border:1px solid rgba(212,175,55,.3)";
toolbar.innerHTML=`
<button id="zin">＋</button>

<button id="zout">－</button>

<button id="zreset">100%</button>

<button id="fexit">✕</button>
`;
document.body.appendChild(toolbar);

function showTB(){toolbar.style.display="flex";gsap.fromTo(toolbar,{y:-30,opacity:0},{y:0,opacity:1,duration:.3});}
function hideTB(){toolbar.style.display="none";}
function apply(){gsap.to(img,{scale:zoom,duration:.25});}

btn.onclick=async()=>{
 try{
  if(!document.fullscreenElement){
    await book.requestFullscreen();
    showTB();
  }else{
    await document.exitFullscreen();
  }
 }catch(e){}
};

document.addEventListener("fullscreenchange",()=>{
 if(!document.fullscreenElement){zoom=1;apply();hideTB();}
});
function loadPage(){

gsap.to(img,{
opacity:0,
duration:.18,
onComplete:()=>{

img.src=pages[current];

gsap.fromTo(img,
{opacity:0,rotateY:20},
{
opacity:1,
rotateY:0,
duration:.45
});

}
});

}
const prevBtn=document.querySelector(".prev");
const nextBtn=document.querySelector(".next");if(prevBtn){

prevBtn.onclick=()=>{

current--;

if(current<0)
current=pages.length-1;

loadPage();

};

}

if(nextBtn){

nextBtn.onclick=()=>{

current++;

if(current>=pages.length)
current=0;

loadPage();

};

}

toolbar.querySelector("#zin").onclick=()=>{zoom=Math.min(3,zoom+.2);apply();};
toolbar.querySelector("#zout").onclick=()=>{zoom=Math.max(.6,zoom-.2);apply();};
toolbar.querySelector("#zreset").onclick=()=>{zoom=1;apply();};
toolbar.querySelector("#fexit").onclick=()=>document.exitFullscreen?.();

document.addEventListener("keydown",e=>{

if(!document.fullscreenElement) return;

if(e.key==="ArrowRight"){

current++;

if(current>=pages.length)
current=0;

loadPage();

}

if(e.key==="ArrowLeft"){

current--;

if(current<0)
current=pages.length-1;

loadPage();

}

if(e.key==="Escape")
document.exitFullscreen();

if(e.key==="+"||e.key==="="){
zoom=Math.min(3,zoom+.2);
apply();
}

if(e.key==="-"){
zoom=Math.max(.6,zoom-.2);
apply();
}

});
book.addEventListener("wheel",e=>{

if(!document.fullscreenElement) return;

e.preventDefault();

if(e.deltaY<0)
zoom=Math.min(3,zoom+.1);
else
zoom=Math.max(.6,zoom-.1);

apply();

});
img.addEventListener("dblclick",()=>{

zoom=(zoom==1)?2:1;

apply();

});

let sx=0,sy=0,drag=false;
img.style.cursor="grab";
img.addEventListener("mousedown",e=>{if(!document.fullscreenElement)return;});
img.addEventListener("mousedown",e=>{drag=true;sx=e.clientX;sy=e.clientY;});
window.addEventListener("mousemove",e=>{
 if(!drag)return;
 img.style.transform=`translate(${e.clientX-sx}px,${e.clientY-sy}px) scale(${zoom})`;
});
window.addEventListener("mouseup",()=>{drag=false;});
});
