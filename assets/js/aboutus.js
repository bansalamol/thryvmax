gsap.registerPlugin(ScrollTrigger);


gsap.from('.about-img', {
    ease: "none",
    scale: 0.7,
    y: 300,
    y: -40,
    scrollTrigger: {
        trigger: ".section-2",
        start: "top 90%",
        end: "bottom center",
        scrub: true,
    }
});


// 

gsap.fromTo(".feature-card",
    { opacity: 0, scale: 0.8, y: 30 }, // start state
    {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2, // optional if multiple cards
        scrollTrigger: {
            trigger: ".section-3",
            start: "top 20%",
            toggleActions: "play none none none",
        }
    }
);
 

