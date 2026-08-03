// // =========================================
// // REGISTER GSAP
// // =========================================

// gsap.registerPlugin(ScrollTrigger);

// // =========================================
// // SPLIT TYPE
// // =========================================

// const splitHeading = new SplitType(".about-heading", {
//     types: "lines, words"
// });

// // =========================================
// // HERO TITLE
// // =========================================

// gsap.from(".about-title", {
//     y: 80,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power4.out"
// });

// // =========================================
// // TAG
// // =========================================

// gsap.to(".section-tag", {
//     opacity: 1,
//     y: 0,
//     duration: 0.8,
//     ease: "power3.out",

//     scrollTrigger: {
//         trigger: ".about",
//         start: "top 70%"
//     }
// });

// // =========================================
// // HEADING WORD ANIMATION
// // =========================================

// gsap.from(splitHeading.words, {

//     y: 80,
//     opacity: 0,
//     rotateX: -90,

//     duration: .8,

//     stagger: .03,

//     ease: "power4.out",

//     scrollTrigger: {

//         trigger: ".about-heading",

//         start: "top 80%"

//     }

// });

// // =========================================
// // DESCRIPTION
// // =========================================

// gsap.to(".about-description", {

//     opacity:1,

//     y:0,

//     duration:1,

//     ease:"power3.out",

//     scrollTrigger:{

//         trigger:".about-description",

//         start:"top 80%"

//     }

// });

// // =========================================
// // CARDS
// // =========================================

// gsap.utils.toArray(".stat-card").forEach((card,index)=>{

//     gsap.to(card,{

//         opacity:1,

//         y:0,

//         duration:1,

//         delay:index*.12,

//         ease:"power4.out",

//         scrollTrigger:{

//             trigger:card,

//             start:"top 90%"

//         }

//     });

// });

// // =========================================
// // COUNTERS
// // =========================================

// const counters=document.querySelectorAll(".counter");

// counters.forEach(counter=>{

//     const target=+counter.dataset.target;

//     ScrollTrigger.create({

//         trigger:counter,

//         start:"top 90%",

//         once:true,

//         onEnter:()=>{

//             gsap.fromTo(counter,

//                 {

//                     innerText:0

//                 },

//                 {

//                     innerText:target,

//                     duration:2,

//                     ease:"power2.out",

//                     snap:{innerText:1},

//                     onUpdate:function(){

//                         counter.innerText=Math.floor(counter.innerText);

//                     }

//                 }

//             );

//         }

//     });

// });

// // =========================================
// // BUTTON HOVER
// // =========================================

// const button=document.querySelector(".circle-btn");

// button.addEventListener("mouseenter",()=>{

//     gsap.to(button,{

//         scale:1.08,

//         duration:.3

//     });

// });

// button.addEventListener("mouseleave",()=>{

//     gsap.to(button,{

//         scale:1,

//         duration:.3

//     });

// });

// // =========================================
// // MAGNETIC BUTTON
// // =========================================

// button.addEventListener("mousemove",(e)=>{

//     const rect=button.getBoundingClientRect();

//     const x=e.clientX-rect.left-rect.width/2;

//     const y=e.clientY-rect.top-rect.height/2;

//     gsap.to(button,{

//         x:x*.25,

//         y:y*.25,

//         duration:.35,

//         ease:"power2.out"

//     });

// });

// button.addEventListener("mouseleave",()=>{

//     gsap.to(button,{

//         x:0,

//         y:0,

//         duration:.5,

//         ease:"elastic.out(1,0.35)"

//     });

// });

// // =========================================
// // PARALLAX TITLE
// // =========================================

// gsap.to(".about-title",{

//     yPercent:-20,

//     ease:"none",

//     scrollTrigger:{

//         trigger:".about",

//         start:"top bottom",

//         end:"bottom top",

//         scrub:true

//     }

// });

// // =========================================
// // CARD HOVER
// // =========================================

// document.querySelectorAll(".stat-card").forEach(card=>{

//     card.addEventListener("mouseenter",()=>{

//         gsap.to(card,{

//             y:-12,

//             duration:.35

//         });

//     });

//     card.addEventListener("mouseleave",()=>{

//         gsap.to(card,{

//             y:0,

//             duration:.35

//         });

//     });

// });