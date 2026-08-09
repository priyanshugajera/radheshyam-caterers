/* ==========================================================
menu.js
Part 7.2 - Category Switch + GSAP + Dynamic Gallery
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const data={

Gujarati:["gujarati1","gujarati2","gujarati3","gujarati4"],

Rajasthani:["rajasthani1","rajasthani2","rajasthani3","rajasthani4"],

Punjabi:["punjabi1","punjabi2","punjabi3","punjabi4"],

Chinese:["chienese1","chienese2","chienese3","chienese4"],

"South Indian":["south1","south2","south3","south4"],

Mexican:["mexican1","mexican2","mexican3","mexican4"],

Italian:["italian1","italian2","italian3","italian4"],

Desserts:["desserts1","desserts2","desserts3","desserts4"],

Sweets:["sweets1","sweets2","sweets3","sweets4"]

};

const tabs=document.querySelectorAll(".menu-tab");
const grid=document.querySelector(".menu-grid");
if(!grid||!tabs.length) return;

function render(cat){
 gsap.to(grid,{opacity:0,y:25,duration:.2,onComplete:()=>{
   grid.innerHTML="";
   data[cat].forEach((img,i)=>{
     const card=document.createElement("div");
     card.className="menu-card";
     card.innerHTML=`
<img class="menu-image"
     data-name="${img}"
     alt="${cat}">
	 <div class="menu-info">
        <h3>${cat}</h3>
        <p>Premium Signature Dish ${i+1}</p>
      </div>`;
     grid.appendChild(card);
   });
   gsap.fromTo(".menu-card",
     {opacity:0,y:40,scale:.95},
     {opacity:1,y:0,scale:1,stagger:.08,duration:.5,ease:"power3.out"});
   gsap.to(grid,{opacity:1,y:0,duration:.25});
   document.querySelectorAll(".menu-image").forEach(img=>{

    const name = img.dataset.name;

    const exts = ["jpg","jpeg","png","webp"];

    let i = 0;

    function loadNext(){

        if(i >= exts.length){

            img.src = "assets/menu/no-image.png";

            return;

        }

        const test = new Image();

        test.onload = () => {

            img.src = test.src;

        };

        test.onerror = () => {

            i++;

            loadNext();

        };

        test.src = `assets/menu/${name}.${exts[i]}`;

    }

    loadNext();

});
 }});
}

tabs.forEach(tab=>{
 tab.addEventListener("click",()=>{
   tabs.forEach(t=>t.classList.remove("active"));
   tab.classList.add("active");
   render(tab.dataset.category||tab.textContent.trim());
 });
});

const first=tabs[0];
first.classList.add("active");
render(first.dataset.category||first.textContent.trim());

});
