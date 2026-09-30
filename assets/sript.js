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
// A static statement: both sentences stay on screen together. One quiet fade-in when it enters view.
if (!reduceMotion) {
    const statements = gsap.utils.toArray(".scroll-section .text-container");
    gsap.set(statements, { opacity: 0, y: 12 });
    const statementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            statementObserver.unobserve(entry.target);
            gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: entry.target.classList.contains("text2") ? 0.08 : 0 });
        });
    }, { rootMargin: "0px 0px -10% 0px" });
    statements.forEach((el) => statementObserver.observe(el));
}

// ABOUT US
// Pin the dark section
ScrollTrigger.create({
    trigger: ".pin-section",
    start: "top top",
    endTrigger: ".services-showcase", // stop pinning when the services grid arrives
    end: "top top",                 // unpin when the services grid hits the top
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






// Lazy images change the page height after load; recalculate scroll-trigger positions when they arrive
let scrollRefreshTimer;
document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', () => {
        clearTimeout(scrollRefreshTimer);
        scrollRefreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    }, { once: true });
});
