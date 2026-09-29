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

//Lenis
if (!reduceMotion) {
    const lenis = new Lenis({
        duration: 1.1,
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
    // One-time reveals for labels and section titles. IntersectionObserver reads live positions,
    // so a reveal can't be left waiting on a trigger point that lazy images have since moved.
    const revealOnView = (selector, offsetY, duration) => {
        const elements = gsap.utils.toArray(selector);
        if (!elements.length) return;
        gsap.set(elements, { opacity: 0, y: offsetY });
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);
                gsap.to(entry.target, { opacity: 1, y: 0, duration: duration, ease: "power3.out" });
            });
        }, { rootMargin: "0px 0px -10% 0px" });
        elements.forEach((el) => observer.observe(el));
    };

    revealOnView(".main-head", 8, 0.5);
    revealOnView(".sub-head", 16, 0.6);
    revealOnView(".flip-up", 8, 0.5);

    // Banner badge: turns with the scroll instead of spinning forever
    gsap.to('.common-banner .circle-container .circle-img-2', {
        rotation: 120,
        ease: "none",
        scrollTrigger: {
            trigger: ".common-banner",
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });

    // COMMON BVANNER IMAGE
    gsap.to('.common-banner-img', {
        ease: "none",
        scale: 1.15,
        y: -24,
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
            { clipPath: 'inset(0% 30% 0% 30% round 12px)' },
            {
                clipPath: 'inset(0% 5% 0% 5% round 12px)',
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

        const marqueeTween = gsap.fromTo(
            marquee_left,
            { x: 0 },
            {
                x: -textWidth_left,
                duration: 40,       // ⏳ adjust speed here
                ease: "none",
                repeat: -1          // ♾️ infinite loop
            }
        );

        addMotionToggle(marquee_left.parentElement, marqueeTween, 'scrolling text');
    }
} else {
    // Show the widening image at its final width without the scroll animation
    gsap.set('.widning-image-section .img-container', { clipPath: 'inset(0% 5% 0% 5% round 12px)' });
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


// FORMS: show a busy state while the message is being sent, and prevent double submits
document.querySelectorAll('form[action$=".php"]').forEach((form) => {
    form.addEventListener('submit', () => {
        const button = form.querySelector('button[type="submit"]');
        if (!button || button.disabled) return;
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        button.textContent = 'Sending…';
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
