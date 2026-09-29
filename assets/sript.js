// NAVBAR

window.addEventListener("scroll", function () {
    const nav = document.getElementById("navcontainer");
    if (!nav) return; // header.html is injected after load
    if (window.scrollY > 80) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

gsap.registerPlugin(ScrollTrigger);

// Respect the system Reduce Motion setting: keep fades, drop movement, scaling and rotation
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion = (props) => (reduceMotion ? {} : props);

//Lenis
if (!reduceMotion) {
    const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        autoRaf: false
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}

// PAERALEX
if (!reduceMotion) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.utils.toArray(".parallax").forEach(layer => {
        const depth = layer.dataset.depth;
        const movement = -(layer.offsetHeight * depth)
        tl.to(layer, { y: movement, ease: "none" }, 0)
    });
}

// TEXT REVEAL
gsap.fromTo(".Ban-text",
    {
        opacity: 0,
        ...motion({ y: 12 })
    },
    {
        opacity: 1,
        ...motion({ y: 0 }),
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".Ban-text",
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    }
);


//  BANNER HEAD + SUBHEAD
gsap.fromTo(".main-banner-head, .main-banner-sub-head",
    { opacity: 0, ...motion({ y: 24 }) },
    {
        opacity: 1,
        ...motion({ y: 0 }),
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".banner",
            start: "top 90%",
            end: "bottom top",
            toggleActions: "play none none reverse"
        }
    }
);

// gsap.fromTo(".banner-head, .banner-sub-head",
//     { y: 0, scale: 1 },
//     {
//         y: 200,
//         scale: 1.4,
//         ease: "power2.out",
//         scrollTrigger: {
//             trigger: ".banner",
//             start: "top top",
//             end: "bottom top",
//             scrub: true,
//             invalidateOnRefresh: true
//         }
//     }
// );

// SECOND SEC
// Rotate the center image continuously while pinned (the pin stays under Reduce Motion so the text sequence keeps its scroll distance)
gsap.to(".center-image", {
    ...motion({ rotation: 90, scale: 1.3 }),
    ease: "none",
    scrollTrigger: {
        trigger: ".scroll-section",
        start: "top top",
        end: "bottom top", // scroll distance
        scrub: true,
        pin: true
    }
});

// Timeline for text animations
const sec2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-section",
        start: "top 20%",
        end: "bottom top",
        scrub: true,
    }
});

// First text reveal
sec2.fromTo(
    ".text1",
    { opacity: 0, ...motion({ y: 24, scale: 0.96 }) },
    { opacity: 1, ...motion({ y: 0, scale: 1 }), duration: 1.5, ease: "power2.out" }
)
    .to(
        ".text1",
        { opacity: 0, ...motion({ y: -24, scale: 0.96 }), duration: 1, delay: 1, ease: "power2.inOut" }
    );

// Second text reveal
sec2.fromTo(
    ".text2",
    { opacity: 0, ...motion({ y: 24, scale: 0.96 }) },
    { opacity: 1, ...motion({ y: 0, scale: 1 }), duration: 1.5, ease: "power2.out" }
)
    .to(
        ".text2",
        { opacity: 0, ...motion({ y: -24, scale: 0.96 }), duration: 1, delay: 1, ease: "power2.inOut" }
    );





// ABOUT US
// Pin the dark section
ScrollTrigger.create({
    trigger: ".pin-section",
    start: "top top",
    endTrigger: ".overlap-section", // stop pinning when this starts
    end: "top top",                 // unpin when overlap-section hits top
    pin: true,
    pinSpacing: false
});

gsap.fromTo(".pin-section .main-head , .pin-section .sub-head , .pin-section p",
    { opacity: 0, ...motion({ y: 24 }) },
    {
        opacity: 1,
        ...motion({ y: 0 }),
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".pin-section",
            start: "top 70%",
            end: "bottom top",
            toggleActions: "play none none reverse"
        }
    }
);

if (!reduceMotion) {
    gsap.fromTo(".pin-section .main-head , .pin-section .sub-head , .pin-section p",
        { y: 0 },
        {
            y: -30,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".pin-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
            }
        }
    );

    gsap.fromTo(" .pin-section img",
        { y: 0, scale: 1 },
        {
            scale: 0.8,
            y: -50,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".pin-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
            }
        }
    );
}

//
// Header moves slower (small y shift)
// Make section scroll slower (pin + longer end)
// Under Reduce Motion the CSS shows the static card grid (.parallax-sm-section) instead
if (!reduceMotion) {
    ScrollTrigger.create({
        trigger: ".parallax-section",
        start: "top top",
        end: "+=200%",   // <- extend scroll distance (slows section)
        pin: true,
        scrub: true
    });

    // Background/header moves slower
    gsap.to(".parallax-section .header", {
        y: -100,
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-section",
            start: "top top",
            end: "+=200%", // must match pin distance
            scrub: true
        }
    });

    // Cards move faster
    gsap.to(".parallax-section .cards", {
        y: -1000,
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-section",
            start: "top top",
            end: "+=200%",
            scrub: true
        }
    });
}

// NEW ****************************
// Under Reduce Motion the logos stay still and the CSS wraps them into rows
if (!reduceMotion) {
    const track = document.querySelector('.carousel-track');

    // Duplicate cards for seamless looping
    track.innerHTML += track.innerHTML;

    const totalWidth = track.scrollWidth / 2; // width of original cards

    // Animate continuously from right to left
    const tween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        duration: 20, // speed of animation
        repeat: -1
    });

    // Stop on hover
    track.parentElement.addEventListener('mouseenter', () => tween.pause());
    track.parentElement.addEventListener('mouseleave', () => tween.resume());
}


// SECTION 5
if (!reduceMotion) {
    gsap.utils.toArray(".section-5 .sec-img").forEach((img) => {
        gsap.fromTo(img,
            { y: 40, scale: 0.9 },
            {
                scale: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: 2
                }
            }
        );
    });

    gsap.utils.toArray(".section-5 .content h3 .step-line").forEach((textAnim) => {
        gsap.fromTo(textAnim,
            { y: 40 },
            {
                y: 0,
                ease: "power3.out",
                duration: 0.6,
                scrollTrigger: {
                    trigger: textAnim,
                    start: "top 95%",
                    toggleActions: "play none none reverse" // optional, smoother UX
                }
            }
        );
    });
}







// SECTION 6
const tabs = document.querySelectorAll(".tabs button");
const leftCircle = document.querySelector(".left .circle-content");
const rightCircle = document.querySelector(".right .circle-content");
const centerText = document.querySelector(".center-text");
const turnDuration = reduceMotion ? 0 : 0.6;
const fadeDuration = reduceMotion ? 0 : 0.18;

// Example text data for each tab
const tabData = {
    doctor: "Smart and scalable systems",
    coach: "Delightful user experiences",
    scientist: "Actionable business insights",
    nutritionist: "Measurable business impact",
    concierge: "Resilient, future-ready tech"
};

// Position items in a circle
function arrangeCircleItems(circle, radius = 150, startAngle = 0) {
    const items = circle.querySelectorAll(".circle-item");
    const angleStep = (2 * Math.PI) / items.length;

    items.forEach((item, i) => {
        const angle = startAngle + i * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        item.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// left starts at 0
arrangeCircleItems(leftCircle);

// right starts at Math.PI to make first item on left
arrangeCircleItems(rightCircle, 150, Math.PI);

// --- ACTIVE STATE ---
// The active item sits on the dark shape (white text); the others sit on white (navy text, see .circle-item in style.css)
function setActiveItems(index) {
    document.querySelectorAll(".section-6 .circle-item").forEach(item => item.classList.remove("is-active"));
    document.querySelector(`.left .circle-item:nth-child(${index + 1})`).classList.add("is-active");
    document.querySelector(`.right .circle-item:nth-child(${index + 1})`).classList.add("is-active");
}

setActiveItems(0);

let leftRotation = 0;
let rightRotation = 0;

tabs.forEach(tab => {
    const tabIndexMap = {
        doctor: 0,
        coach: 1,
        scientist: 2,
        nutritionist: 3,
        concierge: 4
    };

    tab.addEventListener("click", () => {
        const key = tab.dataset.tab;
        const tabIndex = tabIndexMap[key];
        const itemCount = 5;
        const anglePerItem = 360 / itemCount;

        // --- Make clicked tab active ---
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Rotate circles
        leftRotation = -tabIndex * anglePerItem;
        rightRotation = tabIndex * anglePerItem;

        gsap.to(leftCircle, { rotation: leftRotation, duration: turnDuration, ease: "power2.inOut" });
        gsap.to(rightCircle, { rotation: -rightRotation, duration: turnDuration, ease: "power2.inOut" });

        // Keep items upright
        gsap.to(".section-6 .left .circle-content .circle-item", {
            rotation: -leftRotation,
            duration: turnDuration,
            ease: "power2.inOut"
        });
        gsap.to(".section-6 .right .circle-content .circle-item", {
            rotation: rightRotation,
            duration: turnDuration,
            ease: "power2.inOut"
        });

        setActiveItems(tabIndex);

        // Animate center text
        gsap.to(centerText, {
            opacity: 0,
            ...motion({ y: -6 }),
            duration: fadeDuration,
            onComplete: () => {
                centerText.textContent = tabData[key];
                gsap.to(centerText, { opacity: 1, ...motion({ y: 0 }), duration: fadeDuration });
            }
        });
    });
});






//
// Under Reduce Motion the CSS shows the swipe carousel (.curve-container-sm) instead of the scroll-driven wheel
if (!reduceMotion) {
    gsap.registerPlugin(MotionPathPlugin);

    const cards2 = document.querySelectorAll(".wheel__card"); // Select all cards2
    const path = "#path"; // Path selector

    const tlcurve = gsap.timeline({
        defaults: {
            ease: "none"
        }
    });

    // Set motion paths for all cards2
    cards2.forEach((wheel__card, index) => {

        const cardWidth = wheel__card.offsetWidth;
        const totalDistance = cardWidth + 0;

        gsap.set(wheel__card, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 1],
                autoRotate: true,
                start: 1,
                end: 1,
            }
        });

        // Define the timeline animation for each card
        tlcurve.to(wheel__card, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 1],
                autoRotate: true,
                start: 1,
                end: 0,
            },
            immediateRender: true,
        }, (totalDistance / 1000) * index / 3); // Adjust delay based on index
    });

    // Create the ScrollTrigger to control the timeline
    ScrollTrigger.create({
        trigger: ".curve-slider",
        start: "top 50%",
        end: '+=1000',
        scrub: 2,
        animation: tlcurve,
    });
}


//
var swiper = new Swiper(".cardSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    centeredSlides: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});
