// Global motion lifecycle: Lenis smooth scroll + GSAP/ScrollTrigger.
// ClientRouter keeps the same document between pages, so everything is
// set up on "astro:page-load" and torn down on "astro:before-swap".
// Page-specific scripts should follow the same pattern; any ScrollTrigger
// they create is killed here on swap.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;

const raf = (time: number) => lenis?.raf(time * 1000);

function startLenis() {
  lenis = new Lenis({ anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}

function stopLenis() {
  gsap.ticker.remove(raf);
  lenis?.destroy();
  lenis = null;
}

/** Elements with [data-reveal] fade up as they enter the viewport. */
function reveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 32,
      duration: 0.8,
      ease: 'power3.out',
      delay: Number(el.dataset.revealDelay ?? 0),
      // Hand transforms back to CSS afterwards so hover/rotate styles still work
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function setup() {
  if (reducedMotion.matches) return;

  startLenis();
  ctx = gsap.context(reveals);
  // Fonts change text heights, so recalculate trigger positions once loaded
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

function teardown() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  ctx?.revert();
  ctx = null;
  stopLenis();
}

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);

// The mobile menu locks scrolling while it is open
document.addEventListener('menu:toggle', (e) => {
  const { open } = (e as CustomEvent<{ open: boolean }>).detail;
  if (open) lenis?.stop();
  else lenis?.start();
});
