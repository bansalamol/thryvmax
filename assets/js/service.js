

// SECTION 3

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo('.section-3 .img-container',
  { width: '40%' },      
  { 
    width: '90%',  
    ease: "none",
    scrollTrigger: {
      trigger: ".section-3",
      start: "top 90%",
      end: "bottom center",
      scrub: true,
    }
  }
);
