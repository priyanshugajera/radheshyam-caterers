/* ==========================================================
   brochure-fullscreen.js
   Fullscreen + Zoom + Page Navigation + Close Button
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    const btn = document.querySelector(".fullscreen-btn");
    const book = document.querySelector(".flip-book");
    const img = document.getElementById("brochurePage");

    if (!btn || !book || !img) return;


    /* =====================================================
       VARIABLES
    ===================================================== */

    let zoom = 1;

    const pages = [
        "assets/brochure/page1.jpg",
        "assets/brochure/page2.jpg",
        "assets/brochure/page3.jpg",
        "assets/brochure/page4.jpg",
        "assets/brochure/page5.jpg",
        "assets/brochure/page6.jpg",
        "assets/brochure/page7.jpg",
        "assets/brochure/page8.jpg"
    ];

    let current = 0;


    /* =====================================================
       FULLSCREEN TOOLBAR
       IMPORTANT:
       Toolbar is inside BOOK so it remains visible
       when BOOK enters fullscreen.
    ===================================================== */

    const toolbar = document.createElement("div");

    toolbar.id = "brochureFullscreenToolbar";

    toolbar.innerHTML = `
        <button id="zin" type="button" aria-label="Zoom In">
            +
        </button>

        <button id="zout" type="button" aria-label="Zoom Out">
            −
        </button>

        <button id="zreset" type="button" aria-label="Reset Zoom">
            100%
        </button>

        <button id="fexit" type="button" aria-label="Close Fullscreen">
            ✕
        </button>
    `;

    /*
       IMPORTANT:
       Append inside book, NOT body.
    */

    book.appendChild(toolbar);


    /* =====================================================
       TOOLBAR CSS
    ===================================================== */

    const toolbarStyle = document.createElement("style");

    toolbarStyle.textContent = `

        #brochureFullscreenToolbar{

            position:fixed;

            top:20px;
            left:50%;

            transform:translateX(-50%);

            display:none;

            align-items:center;
            justify-content:center;

            gap:10px;

            z-index:999999;

            padding:10px 14px;

            border-radius:18px;

            background:rgba(20,20,20,.82);

            backdrop-filter:blur(14px);
            -webkit-backdrop-filter:blur(14px);

            border:1px solid rgba(212,175,55,.35);

            box-shadow:
                0 15px 45px rgba(0,0,0,.5);

        }


        #brochureFullscreenToolbar button{

            width:42px;
            height:42px;

            border:none;

            border-radius:12px;

            display:flex;

            align-items:center;
            justify-content:center;

            background:rgba(255,255,255,.08);

            color:#f7df84;

            font:700 20px Poppins,sans-serif;

            cursor:pointer;

            transition:
                transform .25s ease,
                background .25s ease,
                box-shadow .25s ease;

        }


        #brochureFullscreenToolbar #zreset{

            width:auto;

            min-width:60px;

            padding:0 12px;

            font-size:13px;

        }


        #brochureFullscreenToolbar button:hover{

            transform:translateY(-2px);

            background:
                linear-gradient(
                    135deg,
                    #f7df84,
                    #d4af37
                );

            color:#111;

            box-shadow:
                0 8px 25px
                rgba(212,175,55,.4);

        }


        /* ===============================================
           CLOSE BUTTON
        =============================================== */

        #brochureFullscreenToolbar #fexit{

            width:48px;
            height:48px;

            margin-left:5px;

            border-radius:50%;

            background:
                linear-gradient(
                    135deg,
                    #f7df84,
                    #d4af37,
                    #b98a22
                );

            color:#111;

            font-size:23px;
            font-weight:900;

            box-shadow:
                0 8px 28px
                rgba(212,175,55,.45);

        }


        #brochureFullscreenToolbar #fexit:hover{

            transform:
                scale(1.12)
                rotate(90deg);

            box-shadow:
                0 12px 40px
                rgba(212,175,55,.7);

        }


        /* ===============================================
           MOBILE
        =============================================== */

        @media(max-width:640px){

            #brochureFullscreenToolbar{

                top:12px;

                gap:7px;

                padding:8px 10px;

                border-radius:15px;

            }


            #brochureFullscreenToolbar button{

                width:38px;
                height:38px;

                font-size:18px;

                border-radius:10px;

            }


            #brochureFullscreenToolbar #zreset{

                min-width:52px;

                padding:0 8px;

                font-size:11px;

            }


            #brochureFullscreenToolbar #fexit{

                width:43px;
                height:43px;

                font-size:20px;

                margin-left:3px;

            }

        }

    `;

    document.head.appendChild(toolbarStyle);


    /* =====================================================
       BUTTON REFERENCES
    ===================================================== */

    const zoomInBtn = toolbar.querySelector("#zin");
    const zoomOutBtn = toolbar.querySelector("#zout");
    const zoomResetBtn = toolbar.querySelector("#zreset");
    const closeBtn = toolbar.querySelector("#fexit");


    /* =====================================================
       SHOW / HIDE TOOLBAR
    ===================================================== */

    function showTB(){

        toolbar.style.display = "flex";

        gsap.fromTo(
            toolbar,
            {
                y:-30,
                opacity:0
            },
            {
                y:0,
                opacity:1,
                duration:.3
            }
        );

    }


    function hideTB(){

        toolbar.style.display = "none";

    }


    /* =====================================================
       ZOOM
    ===================================================== */

    function apply(){

        gsap.to(img,{
            scale:zoom,
            duration:.25
        });

    }


    /* =====================================================
       FULLSCREEN OPEN
    ===================================================== */

    btn.onclick = async () => {

        try{

            if(!document.fullscreenElement){

                await book.requestFullscreen();

                showTB();

            }
            else{

                await document.exitFullscreen();

            }

        }
        catch(e){

            console.error(
                "Fullscreen error:",
                e
            );

        }

    };


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    closeBtn.onclick = async () => {

        try{

            if(document.fullscreenElement){

                await document.exitFullscreen();

            }

        }
        catch(e){

            console.error(
                "Close fullscreen error:",
                e
            );

        }

    };


    /* =====================================================
       FULLSCREEN CHANGE
    ===================================================== */

    document.addEventListener(
        "fullscreenchange",
        () => {

            if(document.fullscreenElement === book){

                showTB();

            }
            else{

                zoom = 1;

                gsap.set(img,{
                    scale:1,
                    x:0,
                    y:0
                });

                hideTB();

            }

        }
    );


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    function loadPage(){

        gsap.to(img,{

            opacity:0,

            duration:.18,

            onComplete:()=>{

                img.src = pages[current];

                gsap.fromTo(
                    img,
                    {
                        opacity:0,
                        rotateY:20
                    },
                    {
                        opacity:1,
                        rotateY:0,
                        duration:.45
                    }
                );

            }

        });

    }


    /* =====================================================
       PREVIOUS / NEXT
    ===================================================== */

    const prevBtn =
        document.querySelector(".prev");

    const nextBtn =
        document.querySelector(".next");


    if(prevBtn){

        prevBtn.onclick = () => {

            current--;

            if(current < 0){

                current =
                    pages.length - 1;

            }

            loadPage();

        };

    }


    if(nextBtn){

        nextBtn.onclick = () => {

            current++;

            if(current >= pages.length){

                current = 0;

            }

            loadPage();

        };

    }


    /* =====================================================
       ZOOM BUTTONS
    ===================================================== */

    zoomInBtn.onclick = () => {

        zoom =
            Math.min(
                3,
                zoom + .2
            );

        apply();

    };


    zoomOutBtn.onclick = () => {

        zoom =
            Math.max(
                .6,
                zoom - .2
            );

        apply();

    };


    zoomResetBtn.onclick = () => {

        zoom = 1;

        apply();

    };


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        e => {

            if(
                document.fullscreenElement !== book
            ){

                return;

            }


            /* CLOSE */

            if(e.key === "Escape"){

                document.exitFullscreen();

            }


            /* NEXT */

            if(e.key === "ArrowRight"){

                current++;

                if(current >= pages.length){

                    current = 0;

                }

                loadPage();

            }


            /* PREVIOUS */

            if(e.key === "ArrowLeft"){

                current--;

                if(current < 0){

                    current =
                        pages.length - 1;

                }

                loadPage();

            }


            /* ZOOM IN */

            if(
                e.key === "+" ||
                e.key === "="
            ){

                zoom =
                    Math.min(
                        3,
                        zoom + .2
                    );

                apply();

            }


            /* ZOOM OUT */

            if(e.key === "-"){

                zoom =
                    Math.max(
                        .6,
                        zoom - .2
                    );

                apply();

            }

        }
    );


    /* =====================================================
       MOUSE WHEEL ZOOM
    ===================================================== */

    book.addEventListener(
        "wheel",
        e => {

            if(
                document.fullscreenElement !== book
            ){

                return;

            }

            e.preventDefault();


            if(e.deltaY < 0){

                zoom =
                    Math.min(
                        3,
                        zoom + .1
                    );

            }
            else{

                zoom =
                    Math.max(
                        .6,
                        zoom - .1
                    );

            }

            apply();

        },
        {
            passive:false
        }
    );


    /* =====================================================
       DOUBLE CLICK ZOOM
    ===================================================== */

    img.addEventListener(
        "dblclick",
        () => {

            if(
                document.fullscreenElement !== book
            ){

                return;

            }

            zoom =
                zoom === 1
                    ? 2
                    : 1;

            apply();

        }
    );


    /* =====================================================
       DRAG
    ===================================================== */

    let sx = 0;
    let sy = 0;
    let drag = false;


    img.style.cursor = "grab";


    img.addEventListener(
        "mousedown",
        e => {

            if(
                document.fullscreenElement !== book
            ){

                return;

            }

            drag = true;

            sx = e.clientX;
            sy = e.clientY;

            img.style.cursor = "grabbing";

        }
    );


    window.addEventListener(
        "mousemove",
        e => {

            if(!drag) return;

            const dx =
                e.clientX - sx;

            const dy =
                e.clientY - sy;

            img.style.transform =
                `translate(${dx}px,${dy}px) scale(${zoom})`;

        }
    );


    window.addEventListener(
        "mouseup",
        () => {

            drag = false;

            img.style.cursor = "grab";

        }
    );

});
