/* ==========================================================
 postprocessing.js
 Radhe Shyam Caterers
 Post Processing Foundation
 Requires:
 - THREE
 - EffectComposer
 - RenderPass
 - UnrealBloomPass
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(typeof THREE==="undefined"){
    console.warn("Three.js missing");
    return;
}

window.RSC_POSTFX={};

function initPostProcessing(renderer,scene,camera){

    if(typeof THREE.EffectComposer==="undefined"){
        console.warn("EffectComposer not loaded.");
        return null;
    }

    const composer=new THREE.EffectComposer(renderer);

    const renderPass=new THREE.RenderPass(scene,camera);
    composer.addPass(renderPass);

    const bloom=new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth,window.innerHeight),
        1.25,
        0.35,
        0.82
    );

    bloom.threshold=0.05;
    bloom.strength=1.35;
    bloom.radius=0.55;

    composer.addPass(bloom);

    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;
    renderer.outputColorSpace=THREE.SRGBColorSpace;

    window.RSC_POSTFX.composer=composer;
    window.RSC_POSTFX.bloom=bloom;

    window.addEventListener("resize",()=>{
        composer.setSize(window.innerWidth,window.innerHeight);
        bloom.setSize(window.innerWidth,window.innerHeight);
    });

    return composer;
}

window.RSC_POSTFX.init=initPostProcessing;

/* Optional cinematic pulse */

let t=0;
function update(){
    requestAnimationFrame(update);

    if(window.RSC_POSTFX.bloom){
        t+=0.01;
        window.RSC_POSTFX.bloom.strength=
            1.25 + Math.sin(t)*0.08;
    }
}
update();

});
