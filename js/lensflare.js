/* ==========================================================
 lensflare.js
 Radhe Shyam Caterers
 Cinematic Lens Flare Foundation
 Requires: THREE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(typeof THREE==="undefined"){
    console.warn("Three.js not found.");
    return;
}

window.RSC_LENS={};

window.RSC_LENS.init=function(scene,camera){

    const group=new THREE.Group();

    const loader=new THREE.TextureLoader();

    // Replace with your own flare texture for best quality
    const flareTexture=loader.load("assets/textures/lensflare.png");

    const material=new THREE.SpriteMaterial({
        map:flareTexture,
        color:0xffe7a0,
        transparent:true,
        opacity:.55,
        depthWrite:false,
        blending:THREE.AdditiveBlending
    });

    const flare=new THREE.Sprite(material);
    flare.scale.set(4,4,1);
    flare.position.set(4,3,-3);

    const halo=new THREE.Sprite(material.clone());
    halo.material.opacity=.18;
    halo.scale.set(8,8,1);
    halo.position.copy(flare.position);

    group.add(flare);
    group.add(halo);

    scene.add(group);

    let mouseX=0;
    let mouseY=0;

    window.addEventListener("mousemove",(e)=>{
        mouseX=(e.clientX/window.innerWidth-.5);
        mouseY=(e.clientY/window.innerHeight-.5);
    });

    function update(time){

        flare.position.x=4+mouseX*2.5;
        flare.position.y=3-mouseY*1.5;

        halo.position.copy(flare.position);

        flare.material.opacity=
            .45+Math.sin(time*.0015)*.12;

        halo.material.opacity=
            .12+Math.cos(time*.0012)*.06;

        flare.material.rotation+=0.0008;
        halo.material.rotation-=0.0004;

        if(camera){
            flare.lookAt(camera.position);
            halo.lookAt(camera.position);
        }

    }

    window.RSC_LENS.group=group;
    window.RSC_LENS.update=update;

    return group;

};

});
