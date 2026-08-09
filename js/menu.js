/* ==========================================================
menu.js
Part 7.2 - Category Switch + GSAP + Dynamic Gallery
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap==="undefined") return;

const data={

Gujarati:[
    ["gujarati1","Gujarati Royal Thali"],
    ["gujarati2","Kathiyawadi Subji & Roti"],
    ["gujarati3","Traditional Gujarati Thali"],
    ["gujarati4","Puri Shak"]
],

Rajasthani:[
    ["rajasthani1","Rajasthani Dish"],
    ["rajasthani2","Rajasthani Dal Baati Thali"],
    ["rajasthani3","Royal Rajasthani Thali"],
    ["rajasthani4","Dal Baati Platter"]
],

Punjabi:[
    ["punjabi1","Chole Bhature"],
    ["punjabi2","Paneer Butter Masala"],
    ["punjabi3","Paneer Tikka Masala"],
    ["punjabi4","Royal Paneer Curry"]
],

Chinese:[
    ["chienese1","Veg Manchurian"],
    ["chienese2","Schezwan Noodles"],
    ["chienese3","Manchurian Platter"],
    ["chienese4","Chinese Hot & Spicy Curry"]
],

"South Indian":[
    ["south1","Masala Dosa Platter"],
    ["south2","Idli Vada Platter"],
    ["south3","South Indian Royal Thali"],
    ["south4","Masala Dosa"]
],

Mexican:[
    ["mexican1","Mexican Enchiladas"],
    ["mexican2","Mexican Taco Fiesta"],
    ["mexican3","Mexican Taco Platter"],
    ["mexican4","Mexican Taco Selection"]
],

Italian:[
    ["italian1","Penne Arrabbiata"],
    ["italian2","Spaghetti Arrabbiata"],
    ["italian3","Italian Margherita Pizza"],
    ["italian4","Italian Caprese Salad"]
],

Desserts:[
    ["desserts1","Chocolate"],
    ["desserts2","Strawberry Snow Dessert"],
    ["desserts3","Mango Pudding"],
    ["desserts4","Ice Cream Selection"]
],

Sweets:[
    ["sweets1","Kaju Katli"],
    ["sweets2","Gulab Jamun"],
    ["sweets3","Mohanthal"],
    ["sweets4","Topra Pak"]
]

};

const tabs=document.querySelectorAll(".menu-tab");
const grid=document.querySelector(".menu-grid");
if(!grid||!tabs.length) return;

function render(cat){
 gsap.to(grid,{opacity:0,y:25,duration:.2,onComplete:()=>{
   grid.innerHTML="";
   data[cat].forEach((item,i)=>{

const img = item[0];
const dishName = item[1];

const card=document.createElement("div");

card.className="menu-card";

card.innerHTML=`
    <img class="menu-image"
         data-name="${img}"
         alt="${dishName}">

    <div class="menu-info">
        <h3>${cat}</h3>
        <p>${dishName}</p>
    </div>
`;

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
