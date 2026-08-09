/* ==========================================================
 Part-1.5 - loader.js
 Radhe Shyam Caterers
 Cinematic Intro Controller
 Requires: GSAP
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const nav = document.querySelector(".glass-nav");
    const hero = document.getElementById("hero");

    if (!loader) return;


    /* =====================================================
       INTRO START
       Mobile + Desktop
    ===================================================== */

    document.body.classList.add("intro-not-ready");


    /* =====================================================
       NAVBAR HIDDEN DURING INTRO
    ===================================================== */

    if (nav) {

        gsap.set(nav, {
            opacity: 0,
            y: -80,
            visibility: "hidden"
        });

    }


    /* =====================================================
       HERO HIDDEN DURING INTRO
    ===================================================== */

    if (hero) {

        gsap.set(hero, {
            opacity: 0,
            scale: 1.04
        });

    }


    /* =====================================================
       INTRO TIMELINE
    ===================================================== */

    const tl = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });


    tl

    .from("#introLogo", {

        scale: .65,
        opacity: 0,
        rotationX: 35,
        duration: .45

    })


    .from("#loader h1", {

        y: 30,
        opacity: 0,
        duration: .30

    }, "-=0.15")


    .from("#loader h2", {

        y: 20,
        opacity: 0,
        duration: .30

    }, "-=0.15")


    .to("#introLogo", {

        scale: 1.08,
        duration: .15

    })


    /*
       Intro stays visible for 2 seconds
    */

    .to("#loader", {

        opacity: 0,
        duration: .8

    }, "+=2.0");


    /* =====================================================
       INTRO COMPLETE
    ===================================================== */

    tl.eventCallback("onComplete", finishIntro);


    function finishIntro() {

        /* Loader completely finished */

        loader.classList.add("hide");


        /*
           Remove intro lock
        */

        document.body.classList.remove("intro-not-ready");


        /* =================================================
           HERO SHOW
        ================================================= */

        if (hero) {

            gsap.to(hero, {

                opacity: 1,
                scale: 1,
                y: 0,
                duration: .8,
                ease: "power3.out"

            });


            const video =
                hero.querySelector("video");

            if (video) {

                video.play().catch(() => {});

            }

        }


        /* =================================================
           NAVBAR SHOW
           ONLY AFTER INTRO COMPLETES
        ================================================= */

        if (nav) {

            gsap.set(nav, {

                visibility: "visible"

            });


            gsap.to(nav, {

                opacity: 1,
                y: 0,

                duration: .8,

                ease: "power3.out"

            });

        }

    }

});
