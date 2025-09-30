gsap.registerPlugin(ScrollTrigger);

//Lenis
const lenis = new Lenis({
    duration: 1.5,
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

// PAERALEX
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

// TEXT REVEAL
gsap.fromTo(".Ban-text",
    { opacity: 0, y: 50 }, // start hidden + moved down
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".Ban-text",
            start: "top 90%", // when text hits center of screen
            toggleActions: "play none none reverse"
        }
    }
);

//  BANNER HEAD + SUBHEAD
gsap.fromTo(".banner-head, .banner-sub-head",
    { opacity: 0, y: 100, scale: 0.5 },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
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
// Rotate the center image continuously while pinned
gsap.to(".center-image", {
    rotation: 180,
    scale: 1.4,
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
    { opacity: 0, y: 50, scale: 0.8, rotation: -5 },
    { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.5, ease: "back.out(1.7)" }
)
    .to(
        ".text1",
        { opacity: 0, y: -50, scale: 0.8, rotation: 5, duration: 1, delay: 1, ease: "power1.in" }
    );

// Second text reveal
sec2.fromTo(
    ".text2",
    { opacity: 0, y: 50, scale: 0.8, rotation: -5 },
    { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.5, ease: "back.out(1.7)" }
)
    .to(
        ".text2",
        { opacity: 0, y: -50, scale: 0.8, rotation: 5, duration: 1, delay: 1, ease: "power1.in" }
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
    { opacity: 0, y: 100, scale: 0.5 },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".pin-section",
            start: "top 70%",
            end: "bottom top",
            toggleActions: "play none none reverse"
        }
    }
);

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

// 
// Header moves slower (small y shift)
// Make section scroll slower (pin + longer end)
ScrollTrigger.create({
    trigger: ".parallax-section",
    start: "top top",
    end: "+=200%",   // <- extend scroll distance (slows section)
    pin: true,
    scrub: true
});

// Background/header moves slower
gsap.to(".header", {
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
gsap.to(".cards", {
    y: -1000,
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-section",
        start: "top top",
        end: "+=200%",
        scrub: true
    }
});

// NEW ****************************
const track = document.querySelector('.carousel-track');
const cards = gsap.utils.toArray('.card');

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


// SECTION 5
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

gsap.utils.toArray(".section-5 .content h3 span h6").forEach((textAnim) => {
    gsap.fromTo(textAnim,
        { y: 80, scale: 0.9 },
        {
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 1, // optional but good to control timing
            scrollTrigger: {
                trigger: textAnim,
                start: "top 95%", 
                toggleActions: "play none none reverse" // optional, smoother UX
            }
        }
    );
});








// SECTION 6
const tabs = document.querySelectorAll(".tabs button");
const leftCircle = document.querySelector(".left .circle-content");
const rightCircle = document.querySelector(".right .circle-content");
const centerText = document.querySelector(".center-text");

// Example text data for each tab
const tabData = {
    doctor: "Doctors provide expert medical guidance.",
    coach: "Health coaches keep you motivated and consistent.",
    scientist: "Data scientists analyze patterns for better care.",
    nutritionist: "Nutritionists design personalized food plans.",
    concierge: "Care concierge handles your appointments easily."
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
        leftRotation = -tabIndex * anglePerItem; // anticlockwise
        rightRotation = tabIndex * anglePerItem; // clockwise

        gsap.to(leftCircle, { rotation: leftRotation, duration: 1, ease: "power2.inOut" });
        gsap.to(rightCircle, { rotation: -rightRotation, duration: 1, ease: "power2.inOut" });

        // Keep items upright
        gsap.to(".section-6 .left .circle-content .circle-item", {
            rotation: -leftRotation,
            duration: 1,
            ease: "power2.inOut"
        });

        gsap.to(".section-6 .right .circle-content .circle-item", {
            rotation: rightRotation,
            duration: 1,
            ease: "power2.inOut"
        });

        // Animate center text
        gsap.to(centerText, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            onComplete: () => {
                centerText.textContent = tabData[key];
                gsap.to(centerText, { opacity: 1, y: 0, duration: 0.4 });
            }
        });
    });
});





// 
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