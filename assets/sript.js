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

// The hero headline and feature labels are visible at first paint: no entrance animation,
// so a deferred script can never hide content that is already on screen.

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
            once: true
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


// Pause control for endless motion (WCAG 2.2.2): pauses on hover/focus and via a button
function addMotionToggle(container, tween, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'motion-toggle';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', 'Pause ' + label);
    button.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect class="icon-pause" x="3" y="2" width="3.5" height="12" rx="1"/><rect class="icon-pause" x="9.5" y="2" width="3.5" height="12" rx="1"/><path class="icon-play" d="M4 2.5v11a.5.5 0 0 0 .76.43l9-5.5a.5.5 0 0 0 0-.86l-9-5.5A.5.5 0 0 0 4 2.5z"/></svg>';
    let pausedByUser = false;
    button.addEventListener('click', () => {
        pausedByUser = !pausedByUser;
        pausedByUser ? tween.pause() : tween.resume();
        button.setAttribute('aria-pressed', String(pausedByUser));
        button.setAttribute('aria-label', (pausedByUser ? 'Play ' : 'Pause ') + label);
    });
    container.addEventListener('pointerenter', () => tween.pause());
    container.addEventListener('pointerleave', () => { if (!pausedByUser) tween.resume(); });
    container.addEventListener('focusin', () => tween.pause());
    container.addEventListener('focusout', () => { if (!pausedByUser) tween.resume(); });
    container.appendChild(button);
}

// NEW ****************************
// Under Reduce Motion the logos stay still and the CSS wraps them into rows
if (!reduceMotion) {
    const track = document.querySelector('.carousel-track');

    // Duplicate cards for seamless looping (the copies are decorative, so screen readers skip them)
    [...track.children].forEach((card) => {
        const copy = card.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        track.appendChild(copy);
    });

    const totalWidth = track.scrollWidth / 2; // width of original cards

    // Animate continuously from right to left
    const tween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        duration: 20, // speed of animation
        repeat: -1
    });

    addMotionToggle(track.parentElement, tween, 'client logo animation');
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
                    scrub: 0.5
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
                    once: true
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
const turnDuration = reduceMotion ? 0 : 0.4;
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

        gsap.to(leftCircle, { rotation: leftRotation, duration: turnDuration, ease: "power3.inOut" });
        gsap.to(rightCircle, { rotation: -rightRotation, duration: turnDuration, ease: "power3.inOut" });

        // Keep items upright
        gsap.to(".section-6 .left .circle-content .circle-item", {
            rotation: -leftRotation,
            duration: turnDuration,
            ease: "power3.inOut"
        });
        gsap.to(".section-6 .right .circle-content .circle-item", {
            rotation: rightRotation,
            duration: turnDuration,
            ease: "power3.inOut"
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
        scrub: 0.5,
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

// Lazy images change the page height after load; recalculate scroll-trigger positions when they arrive
let scrollRefreshTimer;
document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', () => {
        clearTimeout(scrollRefreshTimer);
        scrollRefreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    }, { once: true });
});
