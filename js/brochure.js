/* ==========================================================
brochure.js
Part 8.2 - Real 3D Page Flip + GSAP + Mouse Drag
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

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

const img=document.getElementById("brochurePage");
const book=document.querySelector(".flip-book");
const next=document.querySelector(".next");
const prev=document.querySelector(".prev");

if(!img||!book) return;

let index=0;

function render(dir=1){
gsap.timeline()
.to(book,{
rotateY:dir>0?-90:90,
scale:.98,
duration:.28,
ease:"power2.in"
})
.add(()=>{
img.src=pages[index];
})
.fromTo(book,
{rotateY:dir>0?90:-90},
{
rotateY:0,
scale:1,
duration:.45,
ease:"power3.out"
});
}

function nextPage(){
if(index<pages.length-1){
index++;
render(1);
}
}

function prevPage(){
if(index>0){
index--;
render(-1);
}
}

next?.addEventListener("click",nextPage);
prev?.addEventListener("click",prevPage);

document.addEventListener("keydown",e=>{
if(e.key==="ArrowRight") nextPage();
if(e.key==="ArrowLeft") prevPage();
});

/* Touch Swipe */
let sx=0;
book.addEventListener("touchstart",e=>{
sx=e.touches[0].clientX;
},{passive:true});

book.addEventListener("touchend",e=>{
let dx=e.changedTouches[0].clientX-sx;
if(dx<-60) nextPage();
if(dx>60) prevPage();
},{passive:true});

/* Mouse Drag */
let drag=false,start=0;

book.addEventListener("mousedown",e=>{
drag=true;
start=e.clientX;
});

window.addEventListener("mouseup",e=>{
if(!drag) return;
drag=false;
let dx=e.clientX-start;
if(dx<-80) nextPage();
if(dx>80) prevPage();
});

/* Floating camera */
gsap.to(book,{
y:-10,
repeat:-1,
yoyo:true,
duration:3,
ease:"sine.inOut"
});

book.addEventListener("mousemove",e=>{
const r=book.getBoundingClientRect();
const x=((e.clientX-r.left)/r.width-.5)*8;
const y=((e.clientY-r.top)/r.height-.5)*-8;
gsap.to(book,{
rotateY:x,
rotateX:y,
duration:.2
});
});

book.addEventListener("mouseleave",()=>{
gsap.to(book,{
rotateX:0,
rotateY:0,
duration:.35
});
});

});
