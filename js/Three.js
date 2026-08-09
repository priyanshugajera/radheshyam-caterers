/* ==========================================================
 three-scene.js
 Radhe Shyam Caterers
 Three.js Luxury Scene Foundation
 Requires:
   three.min.js
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(typeof THREE==="undefined"){
    console.warn("Three.js not loaded.");
    return;
}

const hero=document.getElementById("hero");
if(!hero) return;

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z=12;

const renderer=new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.domElement.style.position="absolute";
renderer.domElement.style.inset="0";
renderer.domElement.style.pointerEvents="none";
renderer.domElement.style.zIndex="2";

hero.appendChild(renderer.domElement);

/* Ambient */

scene.add(new THREE.AmbientLight(0xffffff,.6));

const gold=new THREE.PointLight(0xd4af37,8,80);
gold.position.set(6,5,10);
scene.add(gold);

const purple=new THREE.PointLight(0x7b3fe4,4,60);
purple.position.set(-5,-3,8);
scene.add(purple);

/* Floating particles */

const COUNT=900;

const geo=new THREE.BufferGeometry();

const pos=new Float32Array(COUNT*3);

for(let i=0;i<COUNT;i++){

pos[i*3]=(Math.random()-.5)*26;
pos[i*3+1]=(Math.random()-.5)*16;
pos[i*3+2]=(Math.random()-.5)*18;

}

geo.setAttribute(
"position",
new THREE.BufferAttribute(pos,3)
);

const mat=new THREE.PointsMaterial({
color:0xd4af37,
size:.06,
transparent:true,
opacity:.85,
depthWrite:false
});

const stars=new THREE.Points(geo,mat);
scene.add(stars);

/* Mouse */

let mx=0,my=0;

window.addEventListener("mousemove",(e)=>{

mx=(e.clientX/window.innerWidth-.5)*2;
my=(e.clientY/window.innerHeight-.5)*2;

});

/* Animate */

function animate(){

requestAnimationFrame(animate);

stars.rotation.y+=0.0008;
stars.rotation.x+=0.0003;

camera.position.x+=(mx*1.2-camera.position.x)*0.04;
camera.position.y+=(-my*1.2-camera.position.y)*0.04;

gold.position.x=5+mx*4;
gold.position.y=5-my*3;

renderer.render(scene,camera);

}

animate();

/* Resize */

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});

});
