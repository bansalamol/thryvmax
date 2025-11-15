// // Create timeline
// const loader = gsap.timeline({
//   defaults: { ease: "power2.out" }
// });

// // Pulse circle (smoother + low GPU load)
// loader.to(".loader-circle", {
//   scale: 1.2,
//   duration: 0.6,
//   repeat: 1,
//   yoyo: true,
//   ease: "power1.inOut"
// });

// // Slide loader up (very smooth)
// loader.to(".page-loader", {
//   yPercent: -100,
//   duration: 1,
//   ease: "power3.inOut"
// });

// // Fade in page (clean + smooth)
// loader.to(".page-content", {
//   opacity: 1,
//   duration: 0.8,
//   ease: "power1.out"
// }, "-=0.4");