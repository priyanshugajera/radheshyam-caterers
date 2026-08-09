/* =========================================================
   NAVBAR JS
   DESKTOP BEHAVIOUR PRESERVED
   MOBILE MENU ISOLATED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const nav = document.querySelector(".glass-nav");
    const menuBtn = document.querySelector(".mobileMenuBtn");
    const mobileNav = document.querySelector(".glass-nav nav");
    const hero = document.getElementById("hero");

    console.log("NAVBAR JS LOADED");
    console.log("nav:", nav);
    console.log("menuBtn:", menuBtn);
    console.log("mobileNav:", mobileNav);


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!nav) {
        console.error("Navbar .glass-nav not found");
        return;
    }


    /* =====================================================
       SCROLL
    ===================================================== */

    let lastScroll = window.pageYOffset;


    window.addEventListener("scroll", function () {

        const current = window.pageYOffset;

        const heroHeight = hero
            ? hero.offsetHeight
            : window.innerHeight;


        /* ===============================
           DESKTOP
        =============================== */

       /* ===============================
   DESKTOP
=============================== */

if (window.innerWidth > 768) {

    if (current < heroHeight) {

        nav.style.transform =
            "translateY(0)";

        nav.style.opacity = "1";

    }
    else if (current > lastScroll) {

        nav.style.transform =
            "translateY(-120%)";

        nav.style.opacity = "0";

    }
    else {

        nav.style.transform =
            "translateY(0)";

        nav.style.opacity = "1";
    }

}
        /* ===============================
           MOBILE
           DON'T TOUCH TRANSFORM
        =============================== */

        else {

            if (current < heroHeight) {

                nav.style.opacity = "1";

            }
            else if (current > lastScroll) {

                nav.style.opacity = "0";

            }
            else {

                nav.style.opacity = "1";
            }

        }


        lastScroll = current;

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (!menuBtn) {

        console.error(
            "❌ MOBILE MENU BUTTON NOT FOUND"
        );

        return;
    }


    if (!mobileNav) {

        console.error(
            "❌ MOBILE NAVIGATION NOT FOUND"
        );

        return;
    }


    console.log("✅ MOBILE MENU FOUND");


    /* =====================================================
       MENU CLICK
    ===================================================== */

    menuBtn.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();


        const opened =
            mobileNav.classList.toggle("active");


        menuBtn.classList.toggle(
            "active",
            opened
        );


        document.body.classList.toggle(
            "menuOpen",
            opened
        );


        menuBtn.setAttribute(
            "aria-expanded",
            opened ? "true" : "false"
        );

    });


    /* =====================================================
       CLOSE MENU AFTER LINK CLICK
    ===================================================== */

    mobileNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            mobileNav.classList.remove("active");

            menuBtn.classList.remove("active");

            document.body.classList.remove(
                "menuOpen"
            );

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            mobileNav.classList.remove("active");

            menuBtn.classList.remove("active");

            document.body.classList.remove(
                "menuOpen"
            );

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            nav.style.opacity = "1";

            nav.style.transform =
                "translateX(-50%) translateY(0)";
        }

    });

});