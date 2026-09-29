gsap.registerPlugin(ScrollTrigger);

//
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

// Respect the system Reduce Motion setting: skip movement, scaling and rotation
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//Lenis
if (!reduceMotion) {
    const lenis = new Lenis({
        duration: 3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
        smoothWheel: true,
        autoRaf: false
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}

if (!reduceMotion) {
    // Flip-up animation for every .main-head
    gsap.utils.toArray(".main-head").forEach((el) => {
        gsap.from(el, {
            duration: 1.2,
            rotationX: 90,
            opacity: 0,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom center",
                toggleActions: "restart none none none",
            }
        });
    });

    // Slide-up animation for every .sub-head
    gsap.utils.toArray(".sub-head").forEach((el) => {
        gsap.from(el, {
            duration: 1.2,
            y: 20,
            opacity: 0.4,
            scale: 0.9,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom center",
                toggleActions: "restart none none none",

            }
        });
    });



    // FLIP UP
    gsap.utils.toArray(".flip-up").forEach((el) => {
        gsap.from(el, {
            duration: 1.2,
            rotationX: 90,
            opacity: 0,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom center",
                // toggleActions: "play none none none",
            }
        });
    });

    // COMMON BVANNER IMAGE
    gsap.to('.common-banner-img', {
        ease: "none",
        scale: 1.4,
        y: -40,
        scrollTrigger: {
            trigger: ".common-banner",
            start: "top 20%",   // when the section reaches viewport
            end: "bottom top",  // dynamic end based on text width
            scrub: true,
        }
    });

    // BANNER SCOLLING TEXT
    const cards = document.querySelector(".common-banner-text h2");
    if (cards) {
        const totalScroll = cards.scrollWidth - window.innerWidth;

        gsap.to(cards, {
            x: -totalScroll,
            ease: "none",
            scale: 0.9,
            scrollTrigger: {
                trigger: ".common-banner-text",
                start: "top 80%",   // when the section reaches viewport
                end: () => "+=" + totalScroll,  // dynamic end based on text width
                scrub: true,
                pin: false,
            }
        });
    }

    //
    if (document.querySelector('.widning-image-section .img-container')) {
        gsap.fromTo('.widning-image-section .img-container',
            { width: '40%' },
            {
                width: '90%',
                ease: "none",
                scrollTrigger: {
                    trigger: ".widning-image-section",
                    start: "top 90%",
                    end: "bottom center",
                    scrub: true,
                }
            }
        );
    }



    //
    const marquee_left = document.getElementById("marquee-left");
    if (marquee_left) {
        const textWidth_left = marquee_left.offsetWidth - 400;

        marquee_left.innerHTML += marquee_left.innerHTML;

        gsap.fromTo(
            marquee_left,
            { x: 0 },
            {
                x: -textWidth_left,
                duration: 40,       // ⏳ adjust speed here
                ease: "none",
                repeat: -1          // ♾️ infinite loop
            }
        );
    }
} else {
    // Show the widening image at its final width without the scroll animation
    gsap.set('.widning-image-section .img-container', { width: '90%' });
}


// TO RIGHT MARQUE
// const marquee_right = document.getElementById("marquee-right");
// const containerWidth2 = window.innerWidth;
// const textWidth_right = marquee_right.offsetWidth;

// marquee_right.innerHTML += marquee_right.innerHTML;

// gsap.fromTo(
//   marquee_right,
//   { x: -textWidth_right },
//   {
//     x: 0,
//     duration: 20,
//     ease: "none",
//     repeat: -1
//   }
// );
