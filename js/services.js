/* ==========================================================
services.js
Luxury Premium Services Animation
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = document.getElementById("services");
    if (!section) return;

    const cards = document.querySelectorAll(".svc-card");

    if (!cards.length) {
        console.warn("No Service Cards Found.");
        return;
    }

    /* ===========================
       Scroll Animation
    =========================== */

    gsap.from(cards, {
        opacity: 1,
        y: 100,
        scale: 0.9,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#services",
            start: "top 75%",
            once: true
        }
    });

    /* ===========================
       3D Mouse Hover
    =========================== */

    cards.forEach(card => {

        const shine = card.querySelector(".shine");

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const rotateY = ((mouseX / rect.width) - 0.5) * 6;
            const rotateX = ((mouseY / rect.height) - 0.5) * -6;

            gsap.to(card, {
                rotateY: rotateY,
                rotateX: rotateX,
                transformPerspective: 1000,
                transformOrigin: "center",
                duration: 0.25,
                ease: "power3.out"
            });

            if (shine) {

                gsap.to(shine, {
                    xPercent: 180,
                    duration: 0.8,
                    ease: "power2.out"
                });

            }

        });

        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power3.out"
            });

            if (shine) {

                gsap.set(shine, {
                    xPercent: -120
                });

            }

        });

    });

});