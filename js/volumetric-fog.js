/* ==========================================================
 volumetric-fog.js
 Radhe Shyam Caterers
 Volumetric Fog Foundation
 Requires: THREE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(typeof THREE==="undefined"){
    console.warn("Three.js not found.");
    return;
}

window.RSC_FOG={};

window.RSC_FOG.init=function(scene){

    const group=new THREE.Group();

    const loader=new THREE.TextureLoader();

    // Replace with your own soft smoke texture if available
    const texture=loader.load("assets/textures/fog.png");

    const material=new THREE.SpriteMaterial({
        map:texture,
        color:0xf5e7b0,
        transparent:true,
        opacity:0.10,
        depthWrite:false
    });

    const sprites=[];

    for(let i=0;i<28;i++){

        const s=new THREE.Sprite(material.clone());

        s.position.set(
            (Math.random()-.5)*22,
            -3+Math.random()*7,
            -6+Math.random()*8
        );

        const scale=6+Math.random()*8;
        s.scale.set(scale,scale,1);

        s.userData={
            speed:.002+Math.random()*.003,
            drift:(Math.random()-.5)*.002,
            phase:Math.random()*Math.PI*2
        };

        group.add(s);
        sprites.push(s);

    }

    scene.add(group);

    function update(time){

        sprites.forEach((s,index)=>{

            s.position.y+=s.userData.speed;

            s.position.x+=Math.sin(time*0.0005+s.userData.phase)*0.0015;

            s.material.opacity=
                0.05+
                Math.sin(time*0.001+index)*0.03+
                0.05;

            s.material.rotation+=s.userData.drift;

            if(s.position.y>6){
                s.position.y=-4;
            }

        });

    }

    window.RSC_FOG.update=update;
    window.RSC_FOG.group=group;

    return group;

};

});
