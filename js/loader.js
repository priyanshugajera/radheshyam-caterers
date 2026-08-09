/* ==========================================================
 Part-1.5 - loader.js
 Radhe Shyam Caterers
 Cinematic Intro Controller (Foundation)
 Requires: GSAP
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const nav = document.querySelector(".glass-nav");
  const hero = document.getElementById("hero");

  if (!loader) return;

  if (nav) {
    nav.style.opacity = "0";
    nav.style.transform = "translateY(-80px)";
  }

  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "scale(1.04)";
  }
  const tl = gsap.timeline({
    defaults: {
        ease: "power4.out"
    }
});
tl.eventCallback("onComplete", finishIntro);

tl
.from("#introLogo",{
    scale:.65,
    opacity:0,
    rotationX:35,
    duration:.45
})

.from("#loader h1",{
    y:30,
    opacity:0,
    duration:.30
},"-=0.15")

.from("#loader h2",{
    y:20,
    opacity:0,
    duration:.30
},"-=0.15")

.to("#introLogo",{
    scale:1.08,
    duration:.15
})

.to("#loader",{
    opacity:0,
    duration:0.8
},"+=2.0");
  function finishIntro() {
    loader.classList.add("hide");

    if (nav) {
     gsap.to(nav,{
    opacity:1,
    y:0,
    duration:.8
});
    }

    if (hero) {
    gsap.to(hero,{
    opacity:1,
    scale:1,
    y:0
});

      const video = hero.querySelector("video");
      if (video) video.play().catch(() => {});
    }
  }
});
